import { useState, useEffect } from "react";
import { GetSetting } from "../api/Settings";

export default function useFetchListOrder() {
  const [listOrder, setListOrder] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const listOrder = await GetSetting("listOrder");

      setListOrder(listOrder.value);
      setIsReady(true);
    })();
  }, []);

  return [listOrder, setListOrder, isReady];
}
