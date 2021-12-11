import { useState, useEffect } from "react";

export default function useFetchTags() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const loadTags = async () => {
      const response = await fetch("http://localhost:3010/tags");
      const responseJson = await response.json();

      setTags(responseJson);
    };

    loadTags();
  }, []);

  return [tags, setTags];
}
