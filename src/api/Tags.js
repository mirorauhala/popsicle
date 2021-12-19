import { endpoint } from "./endpoint";

export const TagAll = async () => {
  try {
    const result = await endpoint.get("/tags");

    return result.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const TagCreate = async (name) => {
  try {
    const data = { name };
    const result = await endpoint.post("/tags", data);

    return result.data;
  } catch (e) {
    throw new Error(e);
  }
};
