// src/components/Block.jsx

import React from 'react';
import { useDrag } from 'react-dnd';

const Block = ({ label, type, onClick }) => {
  const [, drag] = useDrag({
    type: type,
    item: { label },
  });

  return (
    <div
      ref={drag}
      onClick={() => onClick(label)}
      className="p-4 mb-2 bg-gray-300 border rounded cursor-pointer"
    >
      {label}
    </div>
  );
};

export default Block;
