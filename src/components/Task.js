import Tags from "./Tags";
import { Draggable } from "react-beautiful-dnd";
import { getId } from "../utilities";
import { useEffect, useRef, useState } from "react";
import TaskBody from "./TaskBody";
import { TaskEdit } from "../api/Tasks";
import Spinner from "./Spinner";
import { TagCreate } from "../api/Tags";
import Button from "./Button";
import ReactModal from "react-modal";

export default function Task({
  task,
  list,
  index,
  tags,
  handleTaskDelete,
  onTaskUpdate,
  onTagCreate,
  isDragDisabled,
}) {
  const menuRef = useRef(null);
  const alertRef = useRef();
  const [areNotificationsGranted, setAreNotificationsGranted] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  ReactModal.setAppElement("#modal-root");

  useEffect(() => setAreNotificationsGranted(Notification.permission), []);

  /**
   * Handle selecting tags.
   * @param newTags
   * @returns {Promise<void>}
   */
  const handleTagSelect = async (newTags) => {
    await handleTaskUpdate({
      tags: newTags,
    });
  };

  /**
   * Create a new tag.
   *
   * @param tag
   * @returns {Promise<void>}
   */
  const handleTagCreate = async (tag) => {
    const newTag = await TagCreate(tag.label);

    // save to state
    onTagCreate(newTag);

    return newTag;
  };

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
      body,
    });
  };

  /**
   * Handle task done checkbox.
   */
  const handleTaskDone = async () => {
    handleTaskUpdate({ done: !task.done });
  };

  /**
   * Handle task alert addition.
   */
  const handleTaskAlert = async (event) => {
    event.preventDefault();
    const datetime = alertRef.current.value;

    if (datetime === "") {
      setError("Alarm date cannot be empty.");
      // show error
      return;
    }

    if (new Date(datetime) <= new Date()) {
      setError("Alarms cannot be set in the past.");
      // show error
      return;
    }

    setError("");
    setIsModalOpen(false);

    handleTaskUpdate({ alert: new Date(datetime).toISOString() });
  };

  /**
   * Unified handler for updating tasks.
   * @param data
   * @returns {Promise<void>}
   */
  const handleTaskUpdate = async ({ ...data }) => {
    setIsEditable(false);
    setIsLoading(true);
    const newTask = await TaskEdit({
      taskId: task.id,
      ...data,
    });

    // at minimum 500ms loading animation
    setTimeout(() => {
      setIsLoading(false);
      setIsEditable(true);
    }, 500);

    onTaskUpdate(newTask);
  };

  /**
   * Handle opening alert modal.
   */
  const handleModalOpen = () => {
    setError(""); // clear any previous errors
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  /**
   * Handle notification permission request.
   */
  const handleNotificationGrant = () => {
    Notification.requestPermission().then(function (result) {
      setAreNotificationsGranted(result);
    });
  };

  /**
   * Close the menu when clicking outside the menu.
   * @param {PointerEvent} event
   */
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <Draggable
      draggableId={getId("task", task.id)}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`relative group flex gap-2 p-3 mb-2 justify-between rounded-md text-slate-600 transition-shadow ease-in-out duration-300
            ${
              isLoading
                ? "bg-white/70 shadow"
                : "bg-white shadow hover:shadow-lg hover:shadow-indigo-800/20"
            }`}
        >
          <div className="flex shrink-0 items-center flex-col w-6">
            <input
              type="checkbox"
              disabled={isLoading}
              className="mt-1 w-4 mb-3 h-4"
              defaultChecked={task.done}
              onChange={handleTaskDone}
            />
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
              <div className="w-1 h-1 bg-slate-500 rounded-full" />
              <div className="w-1 h-1 bg-slate-500 rounded-full" />
              <div className="w-1 h-1 bg-slate-500 rounded-full" />
            </div>
          </button>

          <ReactModal
            isOpen={isModalOpen}
            contentLabel={`Set alarm for: ${task.body}`}
            className="relative bg-white p-10 shadow-xl shadow-indigo-900/20 rounded-2xl w-[450px] max-w-[450px]"
            overlayClassName="fixed top-0 z-50 w-full h-full flex justify-center items-center backdrop-blur backdrop-brightness-95"
          >
            <button
              className="absolute right-5 top-5 p-3 bg-indigo-50 rounded-full"
              onClick={() => setIsModalOpen(false)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h1 className="flex flex-wrap flex-col mb-5">
              <span className="font-medium uppercase tracking-wide text-sm text-indigo-500">
                Set an alarm for task
              </span>
              <span className="font-black text-3xl text-indigo-900">
                {task.body}
              </span>
            </h1>

            {task.done ? (
              <>
                <p className="mb-3 bg-amber-50 text-amber-600 border-amber-200 border-2 px-3 py-1 font-medium rounded-lg">
                  This task is marked as done. Tasks marked as done cannot have
                  an alarm.
                </p>
                <Button onClick={() => setIsModalOpen(false)}>Okay</Button>
              </>
            ) : areNotificationsGranted !== "granted" ? (
              <>
                <p className="bg-indigo-50 border-indigo-200 border-2 text-indigo-600 px-3 py-1 mb-3 rounded-lg">
                  Your browser has not granted notification permission.
                </p>
                <Button onClick={handleNotificationGrant}>
                  Grant permissions
                </Button>
              </>
            ) : (
              <form
                onSubmit={handleTaskAlert}
                className="flex flex-wrap items-start flex-col"
              >
                <p className="rounded-lg px-3 py-1 mb-3 text-red-600 bg-red-50 border-red-200 border-2 font-medium empty:hidden">
                  {error}
                </p>

                <input
                  ref={alertRef}
                  type="datetime-local"
                  className="mb-5"
                  //required
                />
                <Button>Set</Button>
              </form>
            )}
          </ReactModal>

          {isMenuOpen ? (
            <div
              ref={menuRef}
              className="flex flex-col border border-indigo-900/10 px-2 py-3 rounded-lg absolute bg-white w-30 top-[46px] right-0 z-50 shadow-xl shadow-indigo-800/20"
            >
              <button
                className="py-2 px-3 rounded-lg font-medium text-left hover:bg-gray-100"
                onClick={handleModalOpen}
              >
                Set alarm
              </button>
              <button
                className="py-2 px-3 rounded-lg font-medium text-left hover:bg-gray-100"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleTaskDelete(task.id, list.id);
                }}
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      )}
    </Draggable>
  );
}
