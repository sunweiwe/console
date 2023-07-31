import React, { lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuid } from 'uuid';
import { selectColumns, addBlock, reOrder } from 'Src/store/reducers/formSlice';
import { DNDTypes } from '../types/index';
import { Spin } from 'antd';

const Block = lazy(() => import('./block'));

function Container() {
  const columns = useSelector(selectColumns);
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DNDTypes.MENU,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item: any) => {
      dispatch(
        addBlock({
          from: columns.length + 1,
          block: {
            text: item.type,
            id: uuid(),
            name: item.name,
            column: '',
            dataType: item.dataType,
            type: item.type,
            style: {},
          },
        })
      );
    },
  }));

  const moveCard = (dragIndex: any, hoverIndex: any) => {
    dispatch(
      reOrder({
        from: dragIndex,
        to: hoverIndex,
      })
    );
  };

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? '#f6f7ff' : '',
        height: '100%',
        overflow: 'auto',
        scrollBehavior: 'smooth',
      }}
    >
      {columns.map((item: any, key: number) => {
        return (
          <Suspense fallback={<Spin spinning />}>
            <Block
              index={key}
              key={item.id}
              column={item}
              moveCard={moveCard}
            />
          </Suspense>
        );
      })}
    </div>
  );
}

export default Container;
