import { useState, useEffect } from "react";
import sortList from "../api/sortList";

export default function useFetchTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const response = await fetch("http://localhost:3010/tasks");
      const responseJson = await response.json();

      setTasks(sortList(responseJson));
    };

    loadTasks();
  }, []);

  return [tasks, setTasks];
}
