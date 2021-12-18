import {ListFind} from "./Lists";
import {endpoint} from "./endpoint";

export const TaskAll = async () => {
  try {
    const result = await endpoint.get( '/tasks')

    return result.data;
  } catch(e) {
    throw new Error(e);
  }
}

export const TaskSearch = async (query) => {
  try {
    const result = await endpoint.get( '/tasks?q='+query)

    return result.data;
  } catch(e) {
    throw new Error(e);
  }
}


export const TaskCreate = async ({body, tags, done, listId}) => {
  const data = {
    body: body,
    updated_at: new Date().toISOString(),
    tags: tags || [],
    done: false
  }

  try {
    const result = await endpoint.post( '/tasks', data)
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

    const result = await endpoint.patch( '/lists/' + listId, data)

    return result.data;
  } catch(e) {
    throw new Error(e);
  }
}

export const TaskDelete = async (taskId, listId) => {
  try {
    const newList = await DeleteTaskFromList(taskId, listId)
    await endpoint.delete('/tasks/' + taskId)

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

    const result = await endpoint.patch( '/lists/' + listId, data)

    return result.data;
  } catch(e) {
    throw new Error(e);
  }
}

export const TaskEdit = async ({taskId, body, tags, done}) => {
  const data = {
    body,
    tags,
    done,
    updated_at: new Date().toISOString(),
  }

  try {
    const result = await endpoint.patch('/tasks/'+ taskId, data)

    return result.data;
  } catch(e) {
    throw new Error(e);
  }
}

