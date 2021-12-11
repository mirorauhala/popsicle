export default function Tag(props) {
  return (
    <span className="p-2 py-1 rounded bg-green-100 text-green-800 text-sm font-medium">
      {props.tag.name}
    </span>
  );
}
