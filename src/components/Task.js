import Tags from "./Tags";
import {Draggable} from "react-beautiful-dnd";

export default function Task({task, index, tags}) {
  const filterTags = () => {
    if (tags.length === 0) {
      return [];
    }

    return task.tags.map((id) => {
      return tags.find((tag) => tag.id === id);
    });
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (

      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="group flex gap-2 p-3 mb-2 justify-between bg-white rounded-md text-slate-600 transition-shadow ease-in-out duration-300 shadow hover:shadow-lg shadow-indigo-800/20"
      >
          <input type="checkbox" className="mt-1 mx-1" />

          <div className="flex grow flex-col">
            <p className="font-bold">{task.body}</p>
            {/*<Tags tags={filterTags()} />*/}
          </div>

          <button className="opacity-0 group-hover:opacity-100 transition ease-in-out delay-100 w-6 h-6 rounded bg-indigo-100">
            <span className="sr-only">Open actions</span>
            <div className="flex gap-[2px] justify-center">
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
            </div>
          </button>
        </div>
      )}

    </Draggable>
  );
}
