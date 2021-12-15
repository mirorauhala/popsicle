import Task from "./Task";
import NewTask from "./NewTask";
import TaskHeading from "./TaskHeading";
import {Draggable, Droppable} from "react-beautiful-dnd";

export default function List({tasks, index, list, tags}) {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}
            className="flex flex-col  mr-3 w-80 shrink-0 bg-indigo-50 rounded-lg">
          <TaskHeading name={list.name} dragHandleProps={provided.dragHandleProps}></TaskHeading>
          <NewTask list={list} />

          <Droppable droppableId={list.id} type="task" className="overflow-x-auto">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex flex-col min-h-[150px] transition-colors duration-300 rounded-b-lg p-3 ${snapshot.isDraggingOver ? 'bg-indigo-900/5': ''}`}
              >

                {tasks.length > 0 && tasks.map((task, index) => (
                  <Task key={task.id} index={index} task={task} tags={tags} />
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}
