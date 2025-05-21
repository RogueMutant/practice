import React from "react";
import addNote from "../assets/add-note-illustration.svg";
import notFound from "../assets/search-image.svg";

interface ErrorImage {
  emptySearch: boolean;
  noTask: boolean;
}

const NotFound: React.FC<ErrorImage> = ({ noTask, emptySearch }) => {
  return (
    <>
      {noTask && (
        <div className="absolute w-[50vw] my-5 items-center gap-20 translate-x-[20%] flex flex-col">
          <h2 className="text-2xl sm:text-3xl size-full text-[#00000099] text-center">
            You don't have any notes
          </h2>
          <img src={addNote} alt="no image icon" />
        </div>
      )}
      {emptySearch && (
        <div className="absolute my-5 w-[50vw] translate-x-[20%] items-center gap-20 flex flex-col">
          <h2 className="text-2xl sm:text-3xl size-full text-[#00000099] text-center">
            Couldn't find any notes
          </h2>
          <img src={notFound} alt="no image icon" />
        </div>
      )}
    </>
  );
};

export default NotFound;
