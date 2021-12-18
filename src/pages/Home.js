import List from "../components/List";
import useFetchTasks from "../hooks/useFetchTasks";
import useFetchLists from "../hooks/useFetchLists";
import useFetchTags from "../hooks/useFetchTags";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import useFetchListOrder from "../hooks/useFetchListOrder";
import {getId, getIdAsNumber} from "../utilities";
import {TaskCreate, TaskDelete} from "../api/Tasks";
import {ListCreate, ListDelete, SaveListOrder, SaveTasksToList} from "../api/Lists";
import Button from "../components/Button";
import Filters from "../components/Filters";
import useFetchFilter from "../hooks/useFetchFilter";
import {GetSetting, SetSetting} from "../api/Settings";
import useFetchSearch from "../hooks/useFetchSearch";

export default function Home() {
  const [listOrder, setListOrder, isReady] = useFetchListOrder();
  const [lists, setLists] = useFetchLists();
  const [tasks, setTasks] = useFetchTasks();
  const [tags, setTags] = useFetchTags();
  const [filter, setFilter] = useFetchFilter()
  const [search, setSearch] = useFetchSearch()

  /**
   * Handle new task.
   * @param listId
   * @param body
   * @returns {Promise<void>}
   */
  const handleNewTask = async (listId, body) => {
    const [newTask, newList] = await TaskCreate({
      listId,
      body,
      tags: (filter !== 0 ? [filter] : [])
    })

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

  /**
   * Handle task deletion.
   * @param taskId
   * @param listId
   * @returns {Promise<void>}
   */
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

  /**
   * Handle task update to state.
   * @param newTask
   * @returns {Promise<void>}
   */
  const handleTaskUpdate = async (newTask) => {
    setTasks(tasks => {
      return tasks.map(task => {
        if(task.id === newTask.id) {
          return newTask
        }

        return task;
      })
    })
  }

  /**
   * Handle saving new tag to state.
   * @param newTag
   */
  const handleTagCreate = (newTag) => {
    setTags([...tags, newTag])
  }

  const isBoardEmpty = () => {
    return listOrder?.length > 0 && lists?.length > 0
  }

  /**
   * Filter tasks by tag id
   * @param filterTasks
   * @param filterId
   * @returns {*}
   */
  const filterTasksByTagId = (filterTasks, filterId) => {

    if(filterId === 0) {
      return filterTasks
    }

    return filterTasks.filter(task => {
      return task.tags.includes(filterId)
    })
  }

  const filterTasksBySearch = (filterTasks) => {
    if(search === "") {
      return filterTasks;
    }

    return filterTasks.filter(task => {
      return task.body.startsWith(search)
    })
  }

  /**
   * Handle filter change.
   * @param filterId
   * @returns {Promise<void>}
   */
  const handleFilterChange = async (filterId) => {
    // set state
    setFilter(filterId)

    // set the setting
    const filterSetting = await GetSetting('filter') // dumb but needed
    await SetSetting(filterSetting.id, filterId)
  }

  /**
   * Filter task by search query.
   * @param event
   * @returns {Promise<void>}
   */
  const handleSearch = async (event) => {
    const query = event.target.value
    console.log(query)
    setSearch(query)

    const searchSetting = await GetSetting('search') // dumb but needed
    await SetSetting(searchSetting.id, query)
  }

  /**
   * Render the lists.
   *
   * @returns {*}
   */
  const renderLists = () => {
    return listOrder.map((listId, index) => {
      const list = lists.find(list => {
        return getId('list', list.id) === getId('list', listId)
      })

      const tasksForList = tasks.length > 0 ? list.tasks.map(taskId => {
        return tasks.find(task => getId('task', task.id) === getId('task', taskId))
      }) : []


      const filterByTags = filterTasksByTagId(tasksForList, filter)
      const filterBySearch = filterTasksBySearch(filterByTags)

      return (
        <List
          key={getId('list', list.id)}
          index={index}
          tasks={filterBySearch}
          list={list}
          tags={tags}
          handleNewTask={handleNewTask}
          handleTaskDelete={handleTaskDelete}
          onTaskUpdate={handleTaskUpdate}
          onListDelete={handleListDelete}
          onTagCreate={handleTagCreate}
          isDragDisabled={filter !== 0}
        />
      )
    })
  }

  /**
   * Handler for new list creation.
   * @returns {Promise<void>}
   */
  const handleNewList = async () => {
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

    setListOrder(newListOrder);
  }

  /**
   * Handler for list deletion.
   * @param {number} listId
   * @returns {Promise<void>}
   */
  const handleListDelete = async (listId) => {

    // delete the list from list order
    setListOrder(listIds => {
      return listIds.filter(id => id !== listId)
    })

    // delete the lists' tasks
    const list = lists.find(list => list.id === listId)

    setTasks(tasks => {
      return tasks.filter(task => {
        return !list.tasks.includes(task.id)
      })
    })

    // delete the list from lists
    setLists(lists => {
      return lists.filter(list => {
        return list.id !== listId
      })
    })

    // delete the list from server
    await ListDelete(listId);
  }

  /**
   * Message shown to user when application starts from an empty state.
   *
   * @returns {JSX.Element|null}
   */
  const onBoarding = () => {
    return isReady ? (
      <div className="flex flex-col gap-5 justify-center items-center w-full h-full pb-32">
        <h1 className="text-2xl font-medium text-indigo-900">Start by adding a new list</h1>
        <Button onClick={handleNewList}>Create a new list</Button>
      </div>
    ) : null
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // if we're moving columns aka lists
    if (type === 'column') {
      const newOrder = Array.from(listOrder);
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, getIdAsNumber(draggableId));

      // save new list order
      SaveListOrder(newOrder).then(_ => console.log('Saved new list order!'))
      setListOrder(newOrder);
      return;
    }

    const home = lists.find(list => list.id === getIdAsNumber(source.droppableId));
    const foreign = lists.find(list => list.id === getIdAsNumber(destination.droppableId));

    // if we're moving tasks inside the same list
    if (home.id === foreign.id) {
      const newTasks = Array.from(home.tasks);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, getIdAsNumber(draggableId));

      const newHome = {
        ...home,
        tasks: newTasks,
      };

      SaveTasksToList(home.id, newTasks)

      const newLists = lists.map(list => {
        if(list.id === home.id) {
          return newHome
        }

        return list
      })

      setLists(newLists);

      return;
    }

    // moving from one list to another
    const homeTasks = Array.from(home.tasks);
    homeTasks.splice(source.index, 1);
    const newHome = {
      ...home,
      tasks: homeTasks,
    };

    // save "home" list
    SaveTasksToList(home.id, homeTasks)

    const foreignTasks = Array.from(foreign.tasks);
    foreignTasks.splice(destination.index, 0, getIdAsNumber(draggableId));
    const newForeign = {
      ...foreign,
      tasks: foreignTasks,
    };

    // save "foreign" list
    SaveTasksToList(foreign.id, foreignTasks)

    // add lists to state
    const newList = lists.map(list => {
      if(list.id === home.id) {
        return newHome
      }

      if(list.id === foreign.id) {
        return newForeign
      }

      return list
    })



    setLists(newList);
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >

      <Filters
        onNewList={handleNewList}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        search={search}
        currentFilter={filter}
        tags={tags}
      />

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
