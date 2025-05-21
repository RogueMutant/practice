import React, { useEffect, useState } from "react";
interface HintProp {
  onCancel?: () => void;
  onDelete?: () => void;
}

const Hint: React.FC<HintProp> = ({ onCancel, onDelete }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      className={`
        -mt-[120px] absolute  h-[100px] w-[300px] flex flex-col justify-between bg-white p-2
        transition-all duration-300
        ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
      `}
    >
      <p className="text-black font-medium text-sm">Delete note?</p>
      <div className="text-right">
        <button className="font-medium mr-2 text-[#69BCFF]" onClick={onCancel}>
          cancel
        </button>
        <button className="font-medium text-[#69BCFF]" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Hint;
