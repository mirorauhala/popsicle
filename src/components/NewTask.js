import { Plus } from "../icons/plus";

export default function NewTask(props) {
  return (
    <form className="flex" onSubmit={(e) => console.log("submit")}>
      <input type="hidden" name="board" value={props.list.id} />
      <input
        className="w-full px-3 py-2 ease-out duration-150 bg-white/60 hover:bg-white focus:bg-white placeholder:text-indigo-900/70 font-medium text-indigo-700 rounded-l-md"
        type="text"
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
