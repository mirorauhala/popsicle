import TaskList from "../components/TaskList";
import useFetchTasks from "../hooks/useFetchTasks";
import useFetchLists from "../hooks/useFetchLists";
import useFetchTags from "../hooks/useFetchTags";
import { createContext } from "react";

export const TaskContext = createContext([]);

export default function Board() {
  const [lists, setLists] = useFetchLists();
  const [tasks, setTasks] = useFetchTasks();
  const [tags, setTags] = useFetchTags();

  const addTask = (e) => {
    e.preventDefault();

    const list = parseInt(e.target.elements["board"].value);
    const body = e.target.elements[1].value;

    setTasks([...tasks, { id: 9, body: body, listId: list }]);
  };

  const TaskContextValue = { tasks, tags };

  return (
    <div className="flex gap-3 w-full">
      <TaskContext.Provider value={TaskContextValue}>
        {lists.length > 0 &&
          lists.map((list) => <TaskList key={list.id} list={list} />)}
      </TaskContext.Provider>
    </div>
  );
}
