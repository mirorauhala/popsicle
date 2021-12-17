import { useState, useEffect } from "react";
import {TaskAll} from "../api/Tasks";

export default function useFetchTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      setTasks(await TaskAll());
    })()
  }, []);

  return [tasks, setTasks];
}
