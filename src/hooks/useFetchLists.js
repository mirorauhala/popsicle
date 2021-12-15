import { useState, useEffect } from "react";

export default function useFetchLists() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const loadLists = async () => {
      const response = await fetch("http://localhost:3010/lists");
      const responseJson = await response.json();

      setLists(responseJson);
    };

    loadLists();
  }, []);

  return [lists, setLists];
}
