import React from "react";
import type { btnProps } from "../custom";

interface BtnPropsExtended extends btnProps {
  active?: boolean;
}

const Btn: React.FC<BtnPropsExtended> = ({
  text,
  onClick,
  imgSrc,
  colors = "none",
  active = false,
}) => {
  const colorVariants = {
    all: "bg-[#69BCFF]",
    home: "bg-[#FF9100]",
    personal: "bg-[#5C6BC0]",
    work: "bg-[#66BB6A]",
    completed: "bg-[#282E2999]",
    none: "bg-transparent",
  };

  const bgColor = active ? colorVariants[colors] : "bg-transparent";
  const textColor = active ? "text-white" : "text-[#00000099]";

  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <div
          onClick={onClick}
          className={` ${
            text === "Add Note" ? colorVariants.all : bgColor
          } ${textColor} font-medium whitespace-nowrap text-sm px-4 py-2 h-[33px] min-w-fit rounded inline-flex justify-center gap-3 items-center cursor-pointer hover:opacity-90 transition-opacity`}
        >
          {imgSrc && <img src={imgSrc[0]} alt={"svg icon"} />}
          <span>{text}</span>
        </div>
        {(colors === "home" || colors === "personal" || colors === "work") && (
          <span
            className={`rounded-full size-1.5 block ${
              colorVariants[colors as keyof typeof colorVariants]
            }`}
          ></span>
        )}
      </div>
    </>
  );
};

export default Btn;
