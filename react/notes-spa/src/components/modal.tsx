import { useState, useEffect } from "react";

import "../App.css";

interface modalProps {
  onClose: () => void;
  onSubmitTask: (task: {
    title: string;
    description: string;
    date: string;
    category: string;
    completed: boolean;
  }) => void;
  task?: {
    title: string;
    description: string;
    date: string;
    category: string;
    completed: boolean;
  } | null;
}
const Modal = ({ onClose, onSubmitTask, task }: modalProps) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [category, setCategory] = useState(task?.category || "");

  const handleClose = () => {
    onClose();
    console.log("Closed the modal");
  };

  const handleAdd = () => {
    try {
      if (title && description && category) {
        const newTask = {
          title,
          description,
          date: new Date().toISOString().split("T")[0], // Current date
          category,
          completed: false,
        };
        onSubmitTask(newTask);
        console.log("Succesfully created a task", newTask);
      }
      console.log("Missing input values");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
    setCategory(task?.category || "");
  }, [task]);
  return (
    <section className="backdrop-blur-sm w-full h-full absolute z-10 top-0 left-0">
      <div className="bg-white sm:w-2/3 sm:h-1/2 w-3/4 h-1/2 flex flex-col items-center justify-start mx-auto mt-40">
        <header className="border-b px-4 py-2 w-full flex items-center">
          <h1 className="text-lg font-bold">Add Note</h1>
        </header>
        <main className="h-full w-full text-[#00000099] flex box-border gap-2 px-4 pt-2">
          <div className="flex flex-col gap-5 w-[70%]">
            <input
              className="w-full p-2 h-10 bg-[#e1e1e1] rounded"
              type="text"
              value={title}
              placeholder="Add title..."
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="size-full bg-[#e1e1e1] p-2 border rounded resize-none"
              placeholder="Add description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <select
            name="category"
            id=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-[30%] h-10 bg-[#e1e1e1] p-2 rounded"
          >
            <option value="">Select a category</option>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </select>
        </main>
        <footer className="w-full flex justify-end px-4 py-1 text-sm font-semibold">
          <button
            className=" text-[#69BCFF] px-4 py-2 border-none"
            onClick={handleClose}
          >
            CANCEL
          </button>
          <button
            className=" text-[#69BCFF] px-2 py-2 border-none"
            onClick={handleAdd}
          >
            ADD
          </button>
        </footer>
      </div>
    </section>
  );
};

export default Modal;
