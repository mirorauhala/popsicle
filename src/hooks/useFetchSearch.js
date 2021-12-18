import { useState, useEffect } from "react";
import {TaskAll} from "../api/Tasks";
import {GetSetting} from "../api/Settings";

export default function useFetchSearch() {
  const [search, setSearch] = useState([]);

  useEffect(() => {
    (async () => {
      const searchSetting = await GetSetting('search')
      setSearch(searchSetting.value);
    })()
  }, []);

  return [search, setSearch];
}
