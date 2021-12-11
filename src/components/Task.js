import Tags from "./Tags";

export default function Task(props) {
  const filterTags = () => {
    if (props.tags.length === 0) {
      return [];
    }

    return props.task.tags.map((id) => {
      return props.tags.find((tag) => tag.id === id);
    });
  };

  return (
    <div className="group flex gap-2 p-3 justify-between bg-white rounded-md text-slate-600 transition ease-in-out duration-300 shadow hover:shadow-lg hover:shadow-indigo-800/20">
      <input type="checkbox" className="mt-1 mx-1" />

      <div className="flex grow flex-col">
        <p className="font-bold">{props.task.body}</p>
        <Tags tags={filterTags()} />
      </div>

      <button className="opacity-0 group-hover:opacity-100 transition ease-in-out delay-100 w-6 h-6 rounded bg-indigo-100">
        <span class="sr-only">Open actions</span>
        <div className="flex gap-[2px] justify-center">
          <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
          <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
          <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
        </div>
      </button>
    </div>
  );
}
