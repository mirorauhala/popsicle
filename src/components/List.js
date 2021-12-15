import Task from "./Task";
import NewTask from "./NewTask";
import TaskHeading from "./TaskHeading";
import { TaskContext } from "../Board";
import { useContext } from "react";
import {Draggable} from "react-beautiful-dnd";

export default function List({tasks, index, list, tags}) {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}
             className="h-full w-80 p-3 bg-indigo-50 rounded-lg">
          <TaskHeading name={list.name} dragHandleProps={provided.dragHandleProps}></TaskHeading>
          <div className="flex flex-col gap-2">
            <NewTask list={list} />
            {tasks.map((task, index) => (
              <Task key={task.id} index={index} task={task} tags={tags} />
            ))}
          </div>
        </div>
      )}
    </Draggable>
  );
}
