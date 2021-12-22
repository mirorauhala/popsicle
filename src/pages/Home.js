import List from "../components/List";
import useFetchLists from "../hooks/useFetchLists";
import useFetchTags from "../hooks/useFetchTags";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useFetchListOrder from "../hooks/useFetchListOrder";
import { getId, getIdAsNumber } from "../utilities";
import {
  TaskAll,
  TaskCreate,
  TaskDelete,
  TaskEdit,
  TaskSearch,
} from "../api/Tasks";
import {
  ListCreate,
  ListDelete,
  ListEdit,
  SaveListOrder,
  SaveTasksToList,
} from "../api/Lists";
import Button from "../components/Button";
import Filters from "../components/Filters";
import useFetchFilter from "../hooks/useFetchFilter";
import { GetSetting, SetSetting } from "../api/Settings";
import useFetchSearch from "../hooks/useFetchSearch";
import useFetchSort from "../hooks/useFetchSort";
import { useEffect, useState } from "react";

export default function Home() {
  const [listOrder, setListOrder, isReady] = useFetchListOrder();
  const [lists, setLists] = useFetchLists();
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useFetchTags();
  const [filter, setFilter] = useFetchFilter();
  const [search, setSearch] = useFetchSearch();
  const [sort, setSort] = useFetchSort();

  /**
   * Fetch new results when searching.
   */
  useEffect(() => {
    (async () => {
      const results = await TaskSearch(search);
      setTasks(results);
    })();
  }, [search]);

  /**
   * Display the notifications to the user when they are due.
   */
  useEffect(() => {
    const alertInterval = setInterval(async () => {
      const alerts = await TaskAll();

      alerts.forEach((task) => {
        // no alert
        if (task.alert === "") {
          return;
        }

        // don't show alert for task that isn't due yet
        if (new Date(task.alert) > new Date()) {
          return false;
        }

        // don't show alert for task that's already done
        if (task.done) {
          // reset alert for the done task
          TaskEdit({ alert: "", taskId: task.id });
          return false;
        }

        // clear alert for this task in the database
        TaskEdit({ alert: "", taskId: task.id });

        if ("Notification" in window) {
          // show alert
          new Notification("Popsicle", {
            body: task.body,
          });
        }
      });
    }, 2500);

    return () => {
      clearInterval(alertInterval);
    };
  }, []);

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
      tags: filter !== 0 ? [filter] : [],
    });

    setTasks([newTask, ...tasks]);
    setLists((lists) => {
      return lists.map((list) => {
        if (list.id === newList.id) {
          return newList;
        }

        return list;
      });
    });
  };

  /**
   * Handle task deletion.
   * @param taskId
   * @param listId
   * @returns {Promise<void>}
   */
  const handleTaskDelete = async (taskId, listId) => {
    const newList = await TaskDelete(taskId, listId);

    setLists((lists) => {
      return lists.map((list) => {
        if (list.id === newList.id) {
          return newList;
        }

        return list;
      });
    });
  };

  /**
   * Handle task update to state.
   * @param newTask
   * @returns {Promise<void>}
   */
  const handleTaskUpdate = async (newTask) => {
    setTasks((tasks) => {
      return tasks.map((task) => {
        if (task.id === newTask.id) {
          return newTask;
        }

        return task;
      });
    });
  };

  /**
   * Handle saving new tag to state.
   * @param newTag
   */
  const handleTagCreate = (newTag) => {
    setTags([...tags, newTag]);
  };

  const isBoardEmpty = () => {
    return listOrder?.length > 0 && lists?.length > 0;
  };

  /**
   * Filter tasks by tag id
   * @param filterTasks
   * @param filterId
   * @returns {*}
   */
  const filterTasksByTagId = (filterTasks, filterId) => {
    if (filterId === 0) {
      return filterTasks;
    }

    return filterTasks.filter((task) => {
      return task.tags.includes(filterId);
    });
  };

  /**
   * Sort tasks based on their edit times.
   *
   * @param tasks
   * @returns {*}
   */
  const sortTasks = (tasks) => {
    // no sorting applied
    if (sort === 0) {
      return tasks;
    }

    return tasks.sort((first, second) => {
      const firstDate = new Date(first.updated_at).getTime();
      const secondDate = new Date(second.updated_at).getTime();

      // if ascending
      if (sort === 1) {
        if (firstDate < secondDate) {
          return -1;
        }
        if (firstDate > secondDate) {
          return 1;
        }
      }

      // if descending
      if (firstDate < secondDate) {
        return 1;
      }

      if (firstDate > secondDate) {
        return -1;
      }

      // sort expects a return
      return 0;
    });
  };

  /**
   * Handle filter change.
   * @param filterId
   * @returns {Promise<void>}
   */
  const handleFilterChange = async (filterId) => {
    // set state
    setFilter(filterId);

    // set the setting
    const filterSetting = await GetSetting("filter"); // dumb but needed
    await SetSetting(filterSetting.id, filterId);
  };

  const handleSortChange = async (sort) => {
    // set sort state
    setSort(sort);

    // set the setting
    const sortSetting = await GetSetting("sort"); // dumb but needed
    await SetSetting(sortSetting.id, sort);
  };

  /**
   * Filter task by search query.
   * @param event
   * @returns {Promise<void>}
   */
  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearch(query);

    const searchSetting = await GetSetting("search"); // dumb but needed
    await SetSetting(searchSetting.id, query);
  };

  /**
   * Handler for new list creation.
   * @returns {Promise<void>}
   */
  const handleNewList = async () => {
    // eslint-disable-next-line no-restricted-globals
    const name = prompt("List name:") || "";

    if (name.trim() === "") {
      return;
    }

    const [newList, newListOrder] = await ListCreate(name);

    setLists((lists) => {
      return [...lists, newList];
    });

    setListOrder(newListOrder);
  };

  /**
   * Handler for list deletion.
   * @param {number} listId
   * @returns {Promise<void>}
   */
  const handleListDelete = async (listId) => {
    // delete the list from list order
    setListOrder((listIds) => {
      return listIds.filter((id) => id !== listId);
    });

    // delete the lists' tasks
    const list = lists.find((list) => list.id === listId);

    setTasks((tasks) => {
      return tasks.filter((task) => {
        return !list.tasks.includes(task.id);
      });
    });

    // delete the list from lists
    setLists((lists) => {
      return lists.filter((list) => {
        return list.id !== listId;
      });
    });

    // delete the list from server
    await ListDelete(listId);
  };

  /**
   * Handler for list deletion.
   * @param {number} listId
   * @returns {Promise<void>}
   */
  const handleListRename = async (listId, name) => {
    setLists((lists) => {
      return lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            name,
          };
        }

        return list;
      });
    });

    // update the list
    ListEdit({ listId, name });
  };

  /**
   * Message shown to user when application starts from an empty state.
   *
   * @returns {JSX.Element|null}
   */
  const onBoarding = () => {
    return isReady ? (
      <div className="flex flex-col gap-5 justify-center items-center w-full h-full pb-32">
        <h1 className="text-2xl font-medium text-indigo-900">
          Start by adding a new list
        </h1>
        <Button onClick={handleNewList}>Create a new list</Button>
      </div>
    ) : null;
  };

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
    if (type === "column") {
      const newOrder = Array.from(listOrder);
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, getIdAsNumber(draggableId));

      // save new list order
      SaveListOrder(newOrder).then((_) => console.log("Saved new list order!"));
      setListOrder(newOrder);
      return;
    }

    const home = lists.find(
      (list) => list.id === getIdAsNumber(source.droppableId),
    );
    const foreign = lists.find(
      (list) => list.id === getIdAsNumber(destination.droppableId),
    );

    // if we're moving tasks inside the same list
    if (home.id === foreign.id) {
      const newTasks = Array.from(home.tasks);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, getIdAsNumber(draggableId));

      const newHome = {
        ...home,
        tasks: newTasks,
      };

      SaveTasksToList(home.id, newTasks);

      const newLists = lists.map((list) => {
        if (list.id === home.id) {
          return newHome;
        }

        return list;
      });

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
    SaveTasksToList(home.id, homeTasks);

    const foreignTasks = Array.from(foreign.tasks);
    foreignTasks.splice(destination.index, 0, getIdAsNumber(draggableId));
    const newForeign = {
      ...foreign,
      tasks: foreignTasks,
    };

    // save "foreign" list
    SaveTasksToList(foreign.id, foreignTasks);

    // add lists to state
    const newList = lists.map((list) => {
      if (list.id === home.id) {
        return newHome;
      }

      if (list.id === foreign.id) {
        return newForeign;
      }

      return list;
    });

    setLists(newList);
  };

  /**
   * Render the lists.
   *
   * @returns {*}
   */
  const renderLists = () => {
    return listOrder.map((listId, index) => {
      const list = lists.find((list) => {
        return getId("list", list.id) === getId("list", listId);
      });

      const tasksForList =
        tasks.length > 0
          ? list.tasks.map((taskId) => {
              return tasks.find((task) => task.id === taskId);
            })
          : [];

      // remove all undefined tasks
      const cleanTaskList = tasksForList.filter(
        (taskId) => taskId !== undefined,
      );

      const filterByTags = filterTasksByTagId(cleanTaskList, filter);
      const sortedTasks = sortTasks(filterByTags);

      return (
        <List
          key={getId("list", list.id)}
          index={index}
          tasks={sortedTasks}
          list={list}
          tags={tags}
          handleNewTask={handleNewTask}
          handleTaskDelete={handleTaskDelete}
          onTaskUpdate={handleTaskUpdate}
          onListDelete={handleListDelete}
          onListRename={handleListRename}
          onTagCreate={handleTagCreate}
          isDragDisabled={filter !== 0 || sort !== 0 || search.length > 0}
        />
      );
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Filters
        onNewList={handleNewList}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onSearch={handleSearch}
        search={search}
        sort={sort}
        currentFilter={filter}
        tags={tags}
      />

      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} id="board">
            {isBoardEmpty() ? renderLists() : onBoarding()}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
