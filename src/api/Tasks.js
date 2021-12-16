import axios from "axios";
import {ListFind} from "./Lists";

export const TaskCreate = async (body, listId) => {
  const data = {
    body: body,
    updated_at: new Date().toISOString(),
    tags: []
  }

  try {
    const result = await axios.post(process.env.REACT_APP_BACKEND_ENDPOINT + '/tasks', data)
    const newTask = result.data;
    const newList = await TaskAddToList(newTask.id, listId)

    return [newTask, newList];
  } catch(e) {
    throw new Error(e);
  }
}

export const TaskAddToList = async (taskId, listId) => {
  try {
    const list = await ListFind(listId)

    // add the new task as the first element on the list
    const currentTasks = new Set([taskId])

    // add the existing tasks below the new task
    list.tasks.forEach(task => currentTasks.add(task))

    // create axios patch body
    const data = {
      tasks: Array.from(currentTasks)
    }

    const result = await axios.patch(process.env.REACT_APP_BACKEND_ENDPOINT + '/lists/' + listId, data)

    return result.data;
  } catch(e) {
    throw new Error(e);
  }
}

export const TaskDelete = async (taskId, listId) => {
  try {
    const newList = await DeleteTaskFromList(taskId, listId)
    await axios.delete(process.env.REACT_APP_BACKEND_ENDPOINT + '/tasks/' + taskId)

    return newList
  } catch(e) {
    throw new Error(e);
  }
}

export const DeleteTaskFromList = async (taskId, listId) => {
  try {
    const list = await ListFind(listId)

    // remove the task from the list
    const newTasksList = list.tasks.filter(task => task !== taskId)

    // create axios patch body
    const data = {
      tasks: newTasksList
    }

    const result = await axios.patch(process.env.REACT_APP_BACKEND_ENDPOINT + '/lists/' + listId, data)

    return result.data;
  } catch(e) {
    throw new Error(e);
  }
}

export const TaskEdit = async (taskId, body) => {
  const data = {
    body: body,
    updated_at: new Date().toISOString(),
    tags: []
  }

  try {
    const result = await axios.patch(process.env.REACT_APP_BACKEND_ENDPOINT + '/tasks/'+ taskId, data)

    return result.data;
  } catch(e) {
    throw new Error(e);
  }
}
