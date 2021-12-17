import { useState, useEffect } from "react";
import {ListAll} from "../api/Lists";

export default function useFetchLists() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    (async () => {
      setLists(await ListAll());
    })()
  }, []);

  return [lists, setLists];
}
