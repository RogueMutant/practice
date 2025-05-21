import React from "react";

interface ProgressProps {
  total: number;
  completed: number;
}
const Progress: React.FC<ProgressProps> = ({ total, completed }) => {
  return (
    <div className="w-full h-15 my-5 flex flex-col items-start justify-center gap-1">
      <p className="text-[#00000099] font-semibold">
        You have {completed}/{total} completed
      </p>
      <div className="w-full h-1 bg-[#69BCFF] rounded-full overflow-hidden ">
        <div
          className="h-full bg-[#5C6BC0] rounded-full overflow-hidden"
          style={{ width: `${total ? (completed / total) * 100 : 0}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
