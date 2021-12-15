import Tags from "./Tags";
import {Draggable} from "react-beautiful-dnd";
import {getId} from "../utilities";
import {useEffect, useRef, useState} from "react";

export default function Task({task, list, index, tags, handleTaskDelete}) {
  let menuRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false)

  const filterTags = () => {
    if (tags.length === 0) {
      return [];
    }

    return task.tags.map((id) => {
      return tags.find((tag) => tag.id === id);
    });
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false)
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const openMenu = () => {

    setShowMenu(true)

  }

  const closeMenu = () => {
    setShowMenu(false);
    //document.removeEventListener('click', closeMenu);
  }

  const closeMenuAfter = (cb) => {
    cb()
    closeMenu()
  }

  return (
    <Draggable draggableId={getId('task', task.id)} index={index}>
      {(provided, snapshot) => (

        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="relative group flex gap-2 p-3 mb-2 justify-between bg-white rounded-md text-slate-600 transition-shadow ease-in-out duration-300 shadow hover:shadow-lg hover:shadow-indigo-800/20"
        >
          <input type="checkbox" className="mt-1 mx-1" />

          <div className="flex grow flex-col">
            <p className="font-bold items-start break-all	">{task.body}</p>
            <Tags tags={filterTags()} />
          </div>

          <button
            className="opacity-0 group-hover:opacity-100 transition ease-in-out delay-100 w-6 h-6 rounded bg-indigo-100"
            onClick={openMenu}>
            <span className="sr-only">Open actions</span>
            <div className="flex gap-[2px] p-1 justify-center">
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
            </div>
          </button>

          {
            showMenu
              ? (
                <div ref={menuRef} className="flex flex-col border border-indigo-900/10 px-2 py-3 rounded-lg absolute bg-white w-28 top-[46px] right-0 z-50 shadow-xl shadow-indigo-800/20">
                  <button className="py-2 px-3 rounded-lg font-medium text-left hover:bg-gray-100">Edit</button>
                  <button className="py-2 px-3 rounded-lg font-medium text-left hover:bg-gray-100">Tags</button>
                  <button
                    className="py-2 px-3 rounded-lg font-medium text-left hover:bg-gray-100"
                    onClick={() => closeMenuAfter(() => handleTaskDelete(task.id, list.id))}
                  >Delete</button>
                </div>
              )
              : null
          }

        </div>
      )}

    </Draggable>
  );
}
