import { useState, useEffect } from "react";
import sortList from "../api/sortList";

export default function useFetchLists() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const loadLists = async () => {
      const response = await fetch("http://localhost:3010/lists");
      const responseJson = await response.json();

      // need to reverse the list order
      setLists(sortList(responseJson).reverse());
    };

    loadLists();
  }, []);

  return [lists, setLists];
}
