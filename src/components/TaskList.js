import Task from './Task'
import NewTask from './NewTask'

export default function TaskList(props) {

    const filteredItems = () => {
        const myItems = props.listItems.filter(item => item.boardId === props.listData.id)
        return myItems.map(item => <Task key={item.id} item={item} />)
    }

    return (
        <div>
            <h5 className="my-3">{props.listData.name}</h5>
            <div className="flex flex-col gap-3">
                <NewTask listData={props.listData} addItem={props.addItem} />
                {filteredItems()}
            </div>
        </div>
    )
}
