export default function Task(props) {
    return (
        <div className="p-4 bg-gray-100 w-64 rounded-xl">{props.item.body}</div>
    )
}
