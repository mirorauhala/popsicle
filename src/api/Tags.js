import {endpoint} from "./endpoint";

export const TagAll = async () => {
  try {
    const result = await endpoint.get( '/tags')

    return result.data;
  } catch(e) {
    throw new Error(e);
  }
}
