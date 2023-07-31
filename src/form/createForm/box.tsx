import React from 'react';
import { useDrag } from 'react-dnd';
import { DNDTypes } from '../types/index';

function Box({ component }: any) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: DNDTypes.MENU,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    item: {
      type: component.type,
      ...component,
    },
  }));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div className='form-sider-menu ' ref={dragPreview} style={{ opacity }}>
      <div ref={drag}>{component.name}</div>
    </div>
  );
}

export default React.memo(Box);
