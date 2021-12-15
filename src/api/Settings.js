import axios from "axios";

export const GetSetting = async (key) => {
  try {
    const result = await axios.get(process.env.REACT_APP_BACKEND_ENDPOINT + '/settings/?key=' + key)

    return result.data[0]
  } catch(e) {
    throw new Error(e)
  }
}

export const SetSetting = async (settingId, value) => {
  try {
    const data = {
      value: value
    }
    const result = await axios.patch(process.env.REACT_APP_BACKEND_ENDPOINT + '/settings/'+settingId, data)

    return result.data
  } catch(e) {
    throw new Error(e)
  }
}
