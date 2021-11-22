import {useState} from 'react'
import TaskList from '../components/TaskList'

export default function Home() {

    const [lists, setLists] = useState([
        {id: 1, name: "Backlog"},
        {id: 2, name: "Ongoing"},
        {id: 3, name: "Repro"},
        {id: 4, name: "Done"},
    ])

    const [items, setItems] = useState([
        {id: 1, body: "Create react ", boardId: 1},
        {id: 2, body: "read context api docs", boardId: 1},
        {id: 3, body: "read drag and drop docs", boardId: 1},
        {id: 4, body: "stuff", boardId: 1},
        {id: 5, body: "create vue ", boardId: 2},
        {id: 6, body: "read news", boardId: 3},
        {id: 7, body: "use colors", boardId: 4},
        {id: 8, body: "create things", boardId: 2},
    ])


    const addItem = (e) => {
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
