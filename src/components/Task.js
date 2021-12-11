export default function Task(props) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-white font-medium rounded-md text-slate-600 ease-out duration-75 hover:shadow-lg hover:shadow-indigo-800/20">
      <input type="checkbox" />
      <p>{props.task.body}</p>
    </div>
  );
}
