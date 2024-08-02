
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableBlock = ({ label, index, moveBlock, deleteBlock }) => {
  const [, drag] = useDrag({
    type: 'block',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'block',
    hover: (item) => {
      if (item.index !== index) {
        moveBlock(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="bg-gray-200 p-2 m-2 rounded cursor-move"
    >
      {label}
      <button className="ml-2 text-red-500" onClick={() => deleteBlock(index)}>
        X
      </button>
    </div>
  );
};

export default DraggableBlock;
