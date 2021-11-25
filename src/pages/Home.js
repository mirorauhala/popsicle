import {useState} from 'react'
import TaskList from '../components/TaskList'
import useFetchTasks from '../hooks/useFetchTasks'
import useFetchLists from '../hooks/useFetchLists'

export default function Home() {

    const [lists, setLists] = useFetchLists()
    const [tasks, setTasks] = useFetchTasks()

        e.preventDefault();

        const board = parseInt(e.target.elements['board'].value)
        const body = e.target.elements[1].value

        setItems([...items, {id: 9, body: body, boardId: board}])
    }

    return (
        <>
            <div className="flex gap-3 p-4
            ">
                {lists.map(list => <TaskList
                                        key={list.id}
                                        listData={list}
                                        listItems={items}
                                        addItem={addItem} />)}
            </div>
        </>
    )
}
