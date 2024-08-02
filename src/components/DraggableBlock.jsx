import React from "react";
import { useDrag, useDrop } from "react-dnd";

const DraggableBlock = ({ label, index, moveBlock, deleteBlock }) => {
  const [, ref] = useDrag({
    type: "block",
    item: { index },
  });
  const [, drop] = useDrop({
    accept: "block",
    hover: (item) => {
      if (item.inedex != index) {
        moveBlock(item.index, index);
        item.index = index;
      }
    },
  });
  return (
    <div
      ref={(node) => ref(drop(node))}
      className="p-2 border bg-gray-100 flex justify-between items-center"
    >
      <span>{label}</span>
      <button onClick={() => deleteBlock(index)}>Delete</button>
    </div>
  );
};

export default DraggableBlock;
