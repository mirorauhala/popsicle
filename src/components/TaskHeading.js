export default function TaskHeading({name, dragHandleProps}) {
  return (
    <h5
      className="py-2 px-2 mb-3 w-full font-bold text-indigo-900 rounded-md cursor-pointer"
      {...dragHandleProps}
    >
      {name}
    </h5>
  );
}
