import { useState, useEffect } from "react";
import { TagAll } from "../api/Tags";

export default function useFetchTags() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    (async () => {
      setTags(await TagAll());
    })();
  }, []);

  return [tags, setTags];
}
