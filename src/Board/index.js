import TaskList from "../components/TaskList";
import useFetchTasks from "../hooks/useFetchTasks";
import useFetchLists from "../hooks/useFetchLists";
import { createContext } from "react";

export const TaskContext = createContext([]);

export default function Board() {
  const [lists, setLists] = useFetchLists();
  const [tasks, setTasks] = useFetchTasks();

  const addTask = (e) => {
    e.preventDefault();

    const board = parseInt(e.target.elements["board"].value);
    const body = e.target.elements[1].value;

    setTasks([...tasks, { id: 9, body: body, boardId: board }]);
  };

  return (
    <div className="flex gap-3 p-4">
      <TaskContext.Provider value={tasks}>
        {lists.length > 0 &&
          lists.map((list) => <TaskList key={list.id} list={list} />)}
      </TaskContext.Provider>
    </div>
  );
}
