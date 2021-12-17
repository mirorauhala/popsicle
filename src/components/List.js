import Task from "./Task";
import NewTask from "./NewTask";
import ListHeading from "./ListHeading";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getId } from "../utilities";

export default function List({
  tasks,
  index,
  list,
  tags,
  handleNewTask,
  handleTaskDelete,
  onTaskUpdate,
  onListDelete,
}) {
  return (
    <Draggable draggableId={getId("list", list.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="flex flex-col relative mr-3 w-80 shrink-0 bg-indigo-50 rounded-lg"
        >
          <ListHeading
            name={list.name}
            dragHandleProps={provided.dragHandleProps}
            listId={list.id}
            onDelete={onListDelete}
          />
          <NewTask list={list} handleNewTask={handleNewTask} />

          <Droppable
            droppableId={getId("list", list.id)}
            type="task"
            className="overflow-x-auto"
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex flex-col min-h-[150px] transition-colors duration-300 rounded-b-lg p-3 ${
                  snapshot.isDraggingOver ? "bg-indigo-900/5" : ""
                }`}
              >
                {tasks.length > 0 &&
                  tasks.map((task, index) => {
                    return (
                      <Task
                        key={getId("task", task.id)}
                        list={list}
                        index={index}
                        task={task}
                        tags={tags}
                        handleTaskDelete={handleTaskDelete}
                        onTaskUpdate={onTaskUpdate}
                      />
                    );
                  })}

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
