import { Plus } from "../icons/plus";

export default function NewTask(props) {
  return (
    <form className="flex" onSubmit={(e) => console.log("submit")}>
      <input type="hidden" name="board" value={props.list.id} />
      <input
        className="w-full px-3 py-2 border-2 border-gray-100 rounded-l-xl"
        type="text"
        placeholder="New task"
        required
      />

      <button type="submit" className="p-2 pr-3 bg-gray-100 rounded-r-xl">
        <Plus />
      </button>
    </form>
  );
}
