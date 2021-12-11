import { useEffect, useRef, useState } from "react";

export default function TaskHeading(props) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const nameInputRef = useRef();

  useEffect(() => {
    setNewName(props.name);
  }, []);

  useEffect(() => {
    if (editing) {
      nameInputRef.current.focus();
    }
  }, [editing]);

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleNewName = (e) => {
    e.preventDefault();
    setNewName(nameInputRef.current.value);
  };

  const handleOnBlur = (e) => {
    if (props.name !== newName) {
      setNewName(props.name);
    }

    toggleEditing();
  };

  const heading = (
    <h5
      className="py-2 px-2 mb-3 w-full font-bold text-indigo-900 rounded-md cursor-pointer"
      onClick={toggleEditing}
    >
      {props.name}
    </h5>
  );

  const edit = (
    <input
      ref={nameInputRef}
      className="py-2 px-2 mb-3 w-full rounded-md font-bold text-indigo-900 outline-0 bg-indigo-900/10"
      value={newName}
      onChange={handleNewName}
      onBlur={handleOnBlur}
    />
  );

  return editing ? edit : heading;
}
