export default function TaskHeading({name, dragHandleProps}) {
  return (
    <h5
      className="pt-4 pb-2 px-4 w-full font-bold text-indigo-900 rounded-md cursor-pointer"
      {...dragHandleProps}
    >
      {name}
    </h5>
  );
}
