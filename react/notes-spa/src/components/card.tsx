import React from "react";
import type { btnProps } from "../custom";
import Hint from "./hint";

interface cardProps extends btnProps {
  description: string;
  date: string;
  onEdit: () => void;
  onDelete: () => void;
  onChck: () => void;
  showHint?: boolean;
  onShowHint?: () => void;
  onCloseHint?: () => void;
}

const Card: React.FC<cardProps> = ({
  text,
  description,
  date,
  colors,
  imgSrc,
  onEdit,
  onDelete,
  onChck,
  showHint = false,
  onShowHint,
  onCloseHint,
}) => {
  const colorVariants = {
    all: "bg-[#69BCFF]",
    home: "bg-[#FF9100]",
    personal: "bg-[#5C6BC0]",
    work: "bg-[#66BB6A]",
    completed: "bg-[#282E2999]",
    none: "bg-transparent",
  };

  return (
    <div
      className={`relative w-full h-[200px] text-white font-light text-base
       rounded-lg shadow-md p-4 flex flex-col justify-between gap-4 ${
         colors ? colorVariants[colors] : colorVariants.all
       }`}
    >
      {showHint && <Hint onCancel={onCloseHint} onDelete={onDelete} />}

      <div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <img
              className="hover:cursor-pointer"
              src={
                colors === "completed"
                  ? imgSrc
                    ? imgSrc[3]
                    : ""
                  : imgSrc
                  ? imgSrc[1]
                  : ""
              }
              alt=""
              onClick={() => onChck()}
            />
            <p
              className={`font-bold ${
                colors === "completed" ? "line-through" : ""
              }`}
            >
              {text}
            </p>
          </div>
          <div className="flex gap-3">
            <img
              className={`${
                colors === "completed"
                  ? "hover: cursor-not-allowed"
                  : "hover:cursor-pointer"
              }`}
              src={imgSrc ? imgSrc[0] : ""}
              alt=""
              onClick={() => (colors === "completed" ? () => {} : onEdit())}
            />
            <img
              className="hover:cursor-pointer"
              src={imgSrc ? imgSrc[2] : ""}
              alt=""
              onClick={onShowHint}
            />
          </div>
        </div>
        <p className={`mt-2 ${colors === "completed" ? "line-through" : ""}`}>
          {description}
        </p>
      </div>
      <p className="justify-items-end text-xs opacity-80">{date}</p>
    </div>
  );
};

export default Card;
