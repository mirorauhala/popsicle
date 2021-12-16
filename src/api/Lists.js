import axios from "axios";
import {GetSetting, SetSetting} from "./Settings";

export const ListCreate = async (name) => {
  try {
    const data = {
      name: name,
      tasks: []
    }

    const result = await axios.post(process.env.REACT_APP_BACKEND_ENDPOINT + '/lists', data)
    const newList = result.data

    const newListOrder = await AddToListOrder(newList.id)

    return [newList, newListOrder]
  } catch(e) {
    throw new Error(e)
  }
}

export const ListFind = async (listId) => {
  try {
    const result = await axios.get(process.env.REACT_APP_BACKEND_ENDPOINT + '/lists/' + listId)

    return result.data
  } catch(e) {
    throw new Error(e)
  }
}

/**
 * Add new list to list order.
 *
 * @param {number} listId
 * @returns {Promise<*>}
 * @constructor
 */
export const AddToListOrder = async (listId) => {
  try {
    const orderListSetting = await GetSetting("listOrder")
    const newOrder = new Set()

    // add
    newOrder.add(listId)

    // add existing lists at the end
    orderListSetting.value.forEach(task => newOrder.add(task))

    const result = await SetSetting(orderListSetting.id, Array.from(newOrder))

    return result.value;
  } catch(e) {
    throw new Error(e);
  }
}

/**
 * Save new list order.
 * @param {number[]} listOrder
 * @returns {Promise<*>}
 * @constructor
 */
export const SaveListOrder = async (listOrder) => {
  try {
    const orderListSetting = await GetSetting("listOrder")
    const result = await SetSetting(orderListSetting.id, Array.from(listOrder))

    return result.value;
  } catch(e) {
    throw new Error(e);
  }
}

export const SaveTasksToList = async (listId, tasks) => {
  try {
    const data = {
      tasks: tasks
    }

    const result = await axios.patch(process.env.REACT_APP_BACKEND_ENDPOINT + '/lists/' + listId, data)

    return result.data;
  } catch(e) {
    throw new Error(e);
  }
}


