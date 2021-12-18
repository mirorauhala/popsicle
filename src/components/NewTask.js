import { Plus } from "../icons/plus";
import {useRef} from "react";

export default function NewTask({list, handleNewTask}) {
  const boardRef = useRef()
  const taskRef = useRef()

  const onSubmit = (e) => {
    e.preventDefault();

    handleNewTask(boardRef.current.value, taskRef.current.value)

    taskRef.current.value = ''
  }

  return (
    <form className="flex mx-3 mb-2" onSubmit={onSubmit}>
      <input type="hidden" ref={boardRef} value={list.id} />
      <input
        className="w-full px-3 py-2 ease-out duration-150 bg-white/60 hover:bg-white focus:bg-white placeholder:text-indigo-900/70 font-medium text-indigo-700 rounded-l-md"
        type="text"
        ref={taskRef}
        placeholder="Uusi tehtävä"
        required
      />

      <button
        type="submit"
        className="ease-out duration-150 bg-white/60 hover:bg-white p-2 pr-3 rounded-r-md"
      >
        <Plus />
      </button>
    </form>
  );
}
