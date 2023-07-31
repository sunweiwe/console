import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import Icon from 'Src/component/icon';

// types
import { setCurrentColumn, removeBlock } from 'Src/store/reducers/formSlice';
import { DNDTypes, ColumnType } from '../types/index';

import { formRender } from '../component/index';

function Block({
  column,
  index,
  moveCard,
}: {
  column: ColumnType;
  index: any;
  moveCard: any;
}) {
  const currentColumn = useSelector((state: any) => state.form.currentColumn);
  const dispatch = useDispatch();

  const ref = useRef(null);
  const [{ handlerId, isOver, xPos = 0 }, drop] = useDrop({
    accept: DNDTypes.BLOCK,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
        xPos: monitor.getDifferenceFromInitialOffset()?.x,
      };
    },
    hover(item: any, monitor: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;

      if (item.type === 'block') {
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        moveCard(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: DNDTypes.BLOCK,
    item: () => {
      return { index, id: column.id, type: 'block' };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const className = classNames({
    'form-content-block': true,
    'form-content-block-active': currentColumn === column.id,
    'form-content-block-hover-down': isOver && xPos < 0,
    'form-content-block-hover-up': isOver && xPos > 0,
  });

  const changeCurrentColumn = () => {
    dispatch(setCurrentColumn(column.id));
  };

  const handleRemove = () => {
    dispatch(removeBlock(index));
  };

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      style={{
        opacity,
      }}
      onClick={changeCurrentColumn}
      className={className}
    >
      <div className='form-content-block-btn'>
        <Icon
          icon='iconshanchu2'
          style={{ color: 'red', fontSize: '20px' }}
          onClick={handleRemove}
        />
      </div>
      <div className='form-content-block-content'>{formRender(column)}</div>
    </div>
  );
}

export default Block;
