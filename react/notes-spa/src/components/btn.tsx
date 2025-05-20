import React from "react";
import type { btnProps } from "../custom";

const Btn: React.FC<btnProps> = ({ text, onClick, imgSrc, colors }) => {
  const colorVariants = {
    all: "bg-[#69BCFF]",
    home: "bg-[#FF9100]",
    personal: "bg-[#5C6BC0]",
    work: "bg-[#66BB6A]",
    completed: "bg-[#282E2999]",
  };

  return (
    <div
      onClick={onClick}
      className={`text-white ${
        colors ? colorVariants[colors] : colorVariants.all
      } font-medium whitespace-nowrap text-sm px-4 py-2  min-w-fit rounded inline-flex justify-center gap-3 items-center cursor-pointer`}
    >
      {imgSrc && <img src={imgSrc[0]} alt={"svg icon"} />}
      <span>{text}</span>
    </div>
  );
};

export default Btn;
