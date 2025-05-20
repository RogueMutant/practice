import React from "react";

interface ProgressProps {
  total: number;
  completed: number;
}
const Progress: React.FC<ProgressProps> = ({ total, completed }) => {
  return (
    <div className="w-full h-15 flex flex-col items-center justify-center gap-4">
      <p>
        You have {completed}/{total} completed
      </p>
      <div className="w-full h-3 bg-[#69BCFF] rounded-full overflow-hidden ">
        <div
          className="h-full bg-[#5C6BC0] rounded-full overflow-hidden"
          style={{ width: `${total ? (completed / total) * 100 : 0}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
