import React from "react";
import { useDrag } from "react-dnd";

const Block = ({ label, type, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 border ${isDragging ? "bg-gray-300" : "bg-gray-100"}`}
      onClick={() => onClick(label)}
    >
      {label}
    </div>
  );
};

export default Block;
