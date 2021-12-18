import Tags from "./Tags";
import {Draggable} from "react-beautiful-dnd";
import {getId} from "../utilities";
import {useEffect, useRef, useState} from "react";
import TaskBody from "./TaskBody";
import {TaskEdit} from "../api/Tasks";
import Spinner from "./Spinner";
import {TagCreate} from "../api/Tags";

export default function Task({task, list, index, tags, handleTaskDelete, onTaskUpdate, onTagCreate}) {
  const menuRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditable, setIsEditable] = useState(false)

  /**
   * Handle selecting tags.
   * @param newTags
   * @returns {Promise<void>}
   */
  const handleTagSelect = async (newTags) => {
    await handleTaskUpdate({
      tags: newTags
    })
  };

  /**
   * Create a new tag.
   *
   * @param tag
   * @returns {Promise<void>}
   */
  const handleTagCreate = async (tag) => {
    const newTag = await TagCreate(tag.label)

    // save to state
    onTagCreate(newTag)

    return newTag
  }

  /**
   * Get the selected tags for this task.
   */
  const selectedTags = () => {
    if (tags.length === 0) {
      return [];
    }

    return task.tags.map((id) => {
      return tags.find((tag) => tag.id === id);
    });
  };

  /**
   * Save the edited task on commit.
   *
   * There are multiple triggers for commits. One is when the user
   * hits the enter key, another when clicking outside the
   * editable task body.
   *
   * @param {string} body
   * @returns {Promise<void>}
   */
  const handleTaskCommit = async (body) => {
    await handleTaskUpdate({
      body
    })
  }

  /**
   * Unified handler for updating tasks.
   * @param data
   * @returns {Promise<void>}
   */
  const handleTaskUpdate = async ({...data}) => {
    setIsEditable(false)
    setIsLoading(true)
    const newTask = await TaskEdit({
      taskId:task.id,
      ...data
    })

    // at minimum 500ms loading animation
    setTimeout(() => {
      setIsLoading(false)
      setIsEditable(true)
    }, 500)

    onTaskUpdate(newTask)
  }

  /**
   * Close the menu when clicking outside the menu.
   * @param {PointerEvent} event
   */
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false)
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <Draggable draggableId={getId('task', task.id)} index={index}>
      {(provided, snapshot) => (

        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`relative group flex gap-2 p-3 mb-2 justify-between rounded-md text-slate-600 transition-shadow ease-in-out duration-300
            ${isLoading ? 'bg-white/70 shadow' : 'bg-white shadow hover:shadow-lg hover:shadow-indigo-800/20'}`}
        >
          <div className="flex shrink-0 items-center flex-col w-6">
            <input type="checkbox" className="mt-1 w-4 mb-3 h-4" />
            {isLoading ? <Spinner /> : null}
          </div>

          <div className="flex shrink grow-0 basis-full flex-col">
            <TaskBody
              value={task.body}
              isEditable={isEditable}
              setEditable={(value) => setIsEditable(value)}
              onCommit={handleTaskCommit}
            />

            <Tags
              onTagCreate={handleTagCreate}
              selectedTags={selectedTags()}
              onSelectedTags={handleTagSelect}
              isLoading={isLoading}
              tags={tags}
            />
          </div>

          <button
            className="opacity-0 focus:opacity-100 group-hover:opacity-100 transition ease-in-out delay-100 w-6 h-6 rounded bg-indigo-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open actions</span>
            <div className="flex gap-[2px] p-1 justify-center">
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
            </div>
          </button>

          {
            isMenuOpen
              ? (
                <div ref={menuRef} className="flex flex-col border border-indigo-900/10 px-2 py-3 rounded-lg absolute bg-white w-28 top-[46px] right-0 z-50 shadow-xl shadow-indigo-800/20">
                  <button className="py-2 px-3 rounded-lg font-medium text-left hover:bg-gray-100">Edit</button>
                  <button className="py-2 px-3 rounded-lg font-medium text-left hover:bg-gray-100">Tags</button>
                  <button
                    className="py-2 px-3 rounded-lg font-medium text-left hover:bg-gray-100"
                    onClick={() => {
                      setIsMenuOpen(false)
                      handleTaskDelete(task.id, list.id)
                    }}
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
