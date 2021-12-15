import List from "../components/List";
import useFetchTasks from "../hooks/useFetchTasks";
import useFetchLists from "../hooks/useFetchLists";
import useFetchTags from "../hooks/useFetchTags";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import useFetchListOrder from "../hooks/useFetchListOrder";
import {getId} from "../utilities";
import axios from "axios";
import {TaskCreate} from "../api/Tasks";

export default function Board() {
  const [listOrder, setListOrder] = useFetchListOrder();
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

  const onDragEnd = () => {
    //
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
             id="board">
              {tasks.length > 0 && lists.length > 0 && listOrder.length > 0 && listOrder.map((listId, index) => {
                const list = lists.find(list => {
                  return getId('list', list.id) === getId('list', listId)
                })
                const tasksForList = list.tasks.map(taskId => {
                  return tasks.find(task => getId('task', task.id) === getId('task', taskId))
                })

                return (
                  <List
                    key={getId('list', list.id)}
                    index={index}
                    tasks={tasksForList}
                    list={list}
                    tags={tags}
                    handleNewTask={handleNewTask}
                  />
                )
              })}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
