import TaskList from '../components/TaskList'
import useFetchTasks from '../hooks/useFetchTasks'
import useFetchLists from '../hooks/useFetchLists'
import { TaskContext } from '../context/TasksContext'

export default function Home() {

    const [lists, setLists] = useFetchLists()
    const [tasks, setTasks] = useFetchTasks()

    const addTask = (e) => {
        e.preventDefault();

        const board = parseInt(e.target.elements['board'].value)
        const body = e.target.elements[1].value

        setTasks([...tasks, {id: 9, body: body, boardId: board}])
    }

    const taskContextValue = {
        tasks,
        addTask
    }

    return (
        <div className="flex gap-3 p-4">
            <TaskContext.Provider value={taskContextValue}>
                {lists && lists.map(list => <TaskList
                            key={list.id}
                            list={list} /> )}
            </TaskContext.Provider>

        </div>
    )
}
