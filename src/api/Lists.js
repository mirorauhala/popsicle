import axios from "axios";

export const ListFind = async (listId) => {
  try {
    const result = await axios.get(process.env.REACT_APP_BACKEND_ENDPOINT + '/lists/' + listId)

    return result.data
  } catch(e) {
    throw new Error(e)
  }
}
