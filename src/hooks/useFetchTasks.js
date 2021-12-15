import { useState, useEffect } from "react";

export default function useFetchTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const response = await fetch("http://localhost:3010/tasks");
      const responseJson = await response.json();

      setTasks(responseJson);
    };

    loadTasks();
  }, []);

  return [tasks, setTasks];
}
