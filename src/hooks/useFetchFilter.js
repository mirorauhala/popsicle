import { useState, useEffect } from "react";
import { GetSetting } from "../api/Settings";

export default function useFetchFilter() {
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    (async () => {
      const filter = await GetSetting("filter");

      setFilter(filter.value);
    })();
  }, []);

  return [filter, setFilter];
}
