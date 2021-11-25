import Task from './Task'
import NewTask from './NewTask'
import { TaskContext } from '../context/TasksContext'
import { useContext } from 'react'

export default function TaskList(props) {
    const [tasks, addTask] = useContext(TaskContext)

    const filteredTasks = () => {
        console.log(tasks)
        // const filteredTasks = tasks.filter(task => task.boardId === props.list.id)
        // return filteredTasks.map(task => <Task key={task.id} task={task} />)
    }

    return (
        <div>
            <h5 className="my-3">{props.list.name}</h5>
            <div className="flex flex-col gap-3">
                <NewTask list={props.list} />
                {filteredTasks()}
            </div>
        </div>
    )
}
