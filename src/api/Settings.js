import { endpoint } from "./endpoint";

export const GetSetting = async (key) => {
  try {
    const result = await endpoint.get("/settings/?key=" + key);

    return result.data[0];
  } catch (e) {
    throw new Error(e);
  }
};

export const SetSetting = async (settingId, value) => {
  try {
    const data = {
      value: value,
    };
    const result = await endpoint.patch("/settings/" + settingId, data);

    return result.data;
  } catch (e) {
    throw new Error(e);
  }
};
