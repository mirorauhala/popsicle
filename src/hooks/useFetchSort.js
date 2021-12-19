import { useState, useEffect } from "react";
import { GetSetting } from "../api/Settings";

export default function useFetchSort() {
  const [sort, setSort] = useState(0);

  useEffect(() => {
    (async () => {
      const sort = await GetSetting("sort");

      setSort(sort.value);
    })();
  }, []);

  return [sort, setSort];
}
