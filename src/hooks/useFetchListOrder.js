import { useState, useEffect } from "react";
import {GetSetting} from "../api/Settings";

export default function useFetchListOrder() {
  const [listOrder, setListOrder] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadListOrder = async () => {
      const listOrder = await GetSetting('listOrder')

      setListOrder(listOrder.value);
      setIsReady(true)
    };

    loadListOrder();
  }, []);

  return [listOrder, setListOrder, isReady];
}
