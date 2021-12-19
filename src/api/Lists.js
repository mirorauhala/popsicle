import { GetSetting, SetSetting } from "./Settings";
import { TaskDelete } from "./Tasks";
import { endpoint } from "./endpoint";

export const ListAll = async () => {
  try {
    const result = await endpoint.get("/lists");

    return result.data;
  } catch (e) {
    throw new Error(e);
  }
};
export const ListCreate = async (name) => {
  try {
    const data = {
      name: name,
      tasks: [],
    };

    const result = await endpoint.post("/lists", data);
    const newList = result.data;

    const newListOrder = await AddToListOrder(newList.id);

    return [newList, newListOrder];
  } catch (e) {
    throw new Error(e);
  }
};

export const ListFind = async (listId) => {
  try {
    const result = await endpoint.get("/lists/" + listId);

    return result.data;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Deletes all tasks from list, the list itself, and deletes the list from the list order.
 *
 * @param {number} listId
 * @returns {Promise<any>}
 * @constructor
 */
export const ListDelete = async (listId) => {
  try {
    const list = await ListFind(listId);

    // delete all tasks that belong to this list
    list.tasks.forEach((task) => {
      // delete each task
      TaskDelete(task, list.id);
    });

    // delete the list from list order
    await DeleteFromListOrder(listId);

    // delete list itself
    const result = await endpoint.delete("/lists/" + listId);
    return result.data;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Add new list to list order.
 *
 * @param {number} listId
 * @returns {Promise<*>}
 * @constructor
 */
export const AddToListOrder = async (listId) => {
  try {
    const orderListSetting = await GetSetting("listOrder");
    const newOrder = new Set();

    // add
    newOrder.add(listId);

    // add existing lists at the end
    orderListSetting.value.forEach((task) => newOrder.add(task));

    const result = await SetSetting(orderListSetting.id, Array.from(newOrder));

    return result.value;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Delete from list order.
 *
 * @param {number} listId
 * @returns {Promise<*>}
 * @constructor
 */
export const DeleteFromListOrder = async (listId) => {
  try {
    const listOrderSetting = await GetSetting("listOrder");
    const listOrder = Array.from(listOrderSetting.value);

    const listIndex = listOrder.indexOf(listId);

    listOrder.splice(listIndex, 1);

    const result = await SetSetting(listOrderSetting.id, listOrder);

    return result.value;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Save new list order.
 * @param {number[]} listOrder
 * @returns {Promise<*>}
 * @constructor
 */
export const SaveListOrder = async (listOrder) => {
  try {
    const orderListSetting = await GetSetting("listOrder");
    const result = await SetSetting(orderListSetting.id, Array.from(listOrder));

    return result.value;
  } catch (e) {
    throw new Error(e);
  }
};

export const SaveTasksToList = async (listId, tasks) => {
  try {
    const data = {
      tasks: tasks,
    };

    const result = await endpoint.patch("/lists/" + listId, data);

    return result.data;
  } catch (e) {
    throw new Error(e);
  }
};
