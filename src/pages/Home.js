import List from "../components/List";
import useFetchTasks from "../hooks/useFetchTasks";
import useFetchLists from "../hooks/useFetchLists";
import useFetchTags from "../hooks/useFetchTags";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import useFetchListOrder from "../hooks/useFetchListOrder";
import {getId} from "../utilities";
import {TaskCreate, TaskDelete} from "../api/Tasks";
import {ListCreate} from "../api/Lists";
import Button from "../components/Button";

export default function Home() {
  const [listOrder, setListOrder, isReady] = useFetchListOrder();
  const [lists, setLists] = useFetchLists();
  const [tasks, setTasks] = useFetchTasks();
  const [tags, setTags] = useFetchTags();

  const handleNewTask = async (listId, body) => {
    const [newTask, newList] = await TaskCreate(body, listId)

    setTasks([newTask, ...tasks])
    setLists((lists) => {
      return lists.map((list => {
        if(list.id === newList.id) {
          return newList
        }

        return list;
      }))

    })
  }

  const handleTaskDelete = async (taskId, listId) => {
    const newList = await TaskDelete(taskId, listId)

    setLists((lists) => {
      return lists.map(list => {
        if(list.id === newList.id) {
          return newList;
        }

        return list
      })
    })
  }

  const onDragEnd = () => {
    //
  }

  const isBoardEmpty = () => {
    return listOrder?.length > 0 && lists?.length > 0
  }

  const renderLists = () => {
    return listOrder.map((listId, index) => {
      const list = lists.find(list => {
        return getId('list', list.id) === getId('list', listId)
      })

      const tasksForList = tasks.length > 0 ? list.tasks.map(taskId => {
        return tasks.find(task => getId('task', task.id) === getId('task', taskId))
      }) : []

      console.log(tasks)

      return (
        <List
          key={getId('list', list.id)}
          index={index}
          tasks={tasksForList}
          list={list}
          tags={tags}
          handleNewTask={handleNewTask}
          handleTaskDelete={handleTaskDelete}
        />
      )
    })
  }

  const addList = async () => {
    // eslint-disable-next-line no-restricted-globals
    const name = prompt('List name:') || ""

    if(name.trim() === "") {
      return
    }

    const [newList, newListOrder] = await ListCreate(name);

    setLists((lists) => {
      return [
        ...lists,
        newList
      ]
    });

    console.log(newListOrder)
    setListOrder(newListOrder);
  }

  const onBoarding = () => {
    return isReady ? (
      <div className="flex flex-col gap-5 justify-center items-center w-full h-full pb-32">
        <h1 className="text-2xl font-medium text-indigo-900">Start by adding a new list</h1>
        <Button onClick={addList}>Create a new list</Button>
      </div>
    ) : null
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >

      <div className="flex gap-2 items-center px-4 pb-4">
        <Button onClick={addList}>New list</Button>
        <input type="search" className="px-4 py-2 rounded-lg border" placeholder="Search tasks..." />

        <div className="ml-auto flex gap-2 items-center">
          <label className="sr-only font-medium">Filter by</label>
          <select className="border rounded-lg px-3 py-2">
            <option>Filter by (none)</option>
            <option>Lol</option>
          </select>

          <label className="sr-only font-medium">Sort by</label>
          <select className="border rounded-lg px-3 py-2">
            <option>Sort by (none)</option>
            <option>Lol</option>
          </select>
        </div>
      </div>

      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            id="board">
            {isBoardEmpty() ? renderLists() : onBoarding()}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
