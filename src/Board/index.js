import List from "../components/List";
import useFetchTasks from "../hooks/useFetchTasks";
import useFetchLists from "../hooks/useFetchLists";
import useFetchTags from "../hooks/useFetchTags";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import useFetchListOrder from "../hooks/useFetchListOrder";

export default function Board() {
  const [listOrder, setListOrder] = useFetchListOrder();
  const [lists, setLists] = useFetchLists();
  const [tasks, setTasks] = useFetchTasks();
  const [tags, setTags] = useFetchTags();

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
            className="flex gap-3 justify-between mb-3">
              {tasks.length > 0 && lists.length > 0 && listOrder.length > 0 && listOrder.map((listId, index) => {
                const list = lists.find(list => list.id === listId)
                const tasksForList = list.tasks.map(taskId => {
                  return tasks.find(task => task.id === taskId)
                })

                return (
                  <List
                    key={list.id}
                    index={index}
                    tasks={tasksForList}
                    list={list}
                    tags={tags}
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
