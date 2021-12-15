import { useState, useEffect } from "react";

export default function useFetchListOrder() {
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    const loadListOrder = async () => {
      const response = await fetch("http://localhost:3010/listOrder");
      const responseJson = await response.json();

      setListOrder(responseJson);
    };

    loadListOrder();
  }, []);

  return [listOrder, setListOrder];
}
