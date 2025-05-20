import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./assets/search-icon.svg";
import plusIcon from "./assets/add.svg";
import editIcon from "./assets/edit.svg";
import trashIcon from "./assets/trash.svg";
import chkBox from "./assets/empty-checkbox.svg";
import chkBoxFill from "./assets/fill-checkbox.svg";
import addNote from "./assets/add-note-illustration.svg";
import Progress from "./components/progress";
import Btn from "./components/btn";
import Card from "./components/card";
import Modal from "./components/modal";

type task = {
  title: string;
  description: string;
  date: string;
  category: string;
  completed: boolean;
};
function App() {
  const [hideModal, setHideModal] = useState(false);
  const [hideProgress, setHideProgress] = useState(false);
  const [tasks, setTasks] = useState<task[]>([]);
  const [filter, setFilter] = useState<task[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [editingTask, setEditingTask] = useState<task | null>(null);

  const addTask = (newTask: {
    title: string;
    description: string;
    date: string;
    category: string;
    completed: boolean;
  }) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  let total = 0;
  let complete = 0;
  const totalTask = () => {
    tasks.forEach((task) => {
      if (task.completed) {
        complete++;
      }
      total++;
    });
  };
  totalTask();

  const editing = (taskToEdit: task): void => {
    setHideModal(true);
    setEditingTask(taskToEdit);
  };

  const checking = (taskToEdit: task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t === taskToEdit ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const del = (title: string) => {
    const newTask = tasks.filter((task) => title !== task.title);
    setTasks(newTask);
  };

  const searchTask = (str: string) => {
    if (!str) {
      console.log("empty search");
      return setFilter(tasks);
    }
    if (typeof str === "string") {
      const filteredTask = tasks.filter((t) => str === t.title);
      setFilter(filteredTask);
      console.log("search");
      return;
    }

    setError(false);
  };

  const filterTask = (
    category: "all" | "personal" | "work" | "home" = "all"
  ) => {
    if (category === "all") {
      setFilter(tasks);
    } else {
      const filteredTask = tasks.filter((task) => category === task.category);
      setFilter(filteredTask);
    }
  };
  useEffect(() => {
    setFilter(tasks);
  }, [tasks]);

  return (
    <>
      <div className="bg-[#F5F5F5] min-h-screen w-screen flex flex-col items-center justify-start">
        <section className="mt-10 p-2 w-2/3 h-full border-red-500 flex flex-col items-center justify-start gap-4">
          <header className="border border-gray-300 rounded px-4 py-2 shadow-md bg-white w-full flex items-center">
            <img
              src={searchIcon}
              onClick={() => searchTask(search)}
              className="mr-3 hover: cursor-pointer"
              alt="search icon"
            />
            <input
              type="text"
              className=" bg-transparent w-full h-10 p-1 outline-none text-lg"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                searchTask(e.target.value);
              }}
            />
          </header>
          <p className={`${error ? "block" : "hidden"} text-red-600`}>
            No such task
          </p>
          <main className="h-3/4 w-full border-red-60050">
            <nav className="flex justify-between items-center mt-4 ">
              <div className="flex gap-2">
                <Btn
                  text="All"
                  onClick={() => filterTask("all")}
                  colors="all"
                />
                <Btn
                  text="Home"
                  onClick={() => filterTask("home")}
                  colors="home"
                />
                <Btn
                  text="Personal"
                  onClick={() => filterTask("personal")}
                  colors="personal"
                />
                <Btn
                  text="Work"
                  onClick={() => filterTask("work")}
                  colors="work"
                />
              </div>
              <div>
                <Btn
                  text="Add Note"
                  onClick={() => {
                    setHideModal(true);
                  }}
                  imgSrc={[plusIcon]}
                  colors="all"
                />
              </div>
            </nav>
            {hideModal && (
              <Modal
                onClose={() => {
                  setHideModal(false);
                  setEditingTask(null);
                }}
                onSubmitTask={(newTask) => {
                  if (editingTask) {
                    setTasks((prev) =>
                      prev.map((t) =>
                        t === editingTask ? { ...t, ...newTask } : t
                      )
                    );
                  } else {
                    addTask(newTask);
                  }
                  setHideModal(false);
                  setHideProgress(true);
                }}
                task={editingTask}
              />
            )}
            {hideProgress && <Progress total={total} completed={complete} />}
            <section className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 relative">
              {filter.length > 0 ? (
                filter.map((task, index) => (
                  <Card
                    key={index}
                    description={task.description}
                    date={task.date}
                    text={task.title}
                    colors={
                      task.completed
                        ? "completed"
                        : (task.category as
                            | "all"
                            | "personal"
                            | "work"
                            | "home")
                    }
                    imgSrc={[editIcon, chkBox, trashIcon, chkBoxFill]}
                    onEdit={() => editing(task)}
                    onChck={() => checking(task)}
                    onDelete={() => del(task.title)}
                  />
                ))
              ) : (
                <div className="absolute my-5 size-full items-center gap-20 flex flex-col">
                  <h2 className="text-2xl sm:text-3xl size-full text-[#00000099] text-center">
                    You don't have any notes
                  </h2>
                  <img src={addNote} alt="no image icon" />
                </div>
              )}
            </section>
          </main>
        </section>
      </div>
    </>
  );
}

export default App;
