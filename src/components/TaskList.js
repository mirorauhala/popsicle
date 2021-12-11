import Task from "./Task";
import NewTask from "./NewTask";
import TaskHeading from "./TaskHeading";
import { TaskContext } from "../Board";
import { useContext } from "react";

export default function TaskList(props) {
  const tasks = useContext(TaskContext);

  const filteredTasks = () => {
    const filteredTasks = tasks.filter((task) => task.listId === props.list.id);
    return filteredTasks.map((task) => <Task key={task.id} task={task} />);
  };

  return (
    <div className="h-full w-80  rounded-lg">
      <TaskHeading name={props.list.name}></TaskHeading>
      <div className="flex flex-col gap-2">
        <NewTask list={props.list} />
        {filteredTasks()}
      </div>
    </div>
  );
}
