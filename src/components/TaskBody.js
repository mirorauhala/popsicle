import './TaskBody.css'
import sanitizeHtml from "sanitize-html";
import {useEffect, useRef, useState} from "react";

export default function TaskBody({value, isEditable, setEditable, onUpdate, onCommit}) {
  const taskRef = useRef()

  /**
   * Focus the contentEditable area when editable.
   */
  useEffect(() => {
    if(isEditable) {
      taskRef.current.focus()
    }
  }, [isEditable])


  /**
   * Return the sanitized output of the contentEditable.
   * @returns {string|*}
   */
  const getCleanOutput = () => {
    const innerHTML = taskRef.current.innerHTML;

    return sanitizeHtml(innerHTML, {
      allowedTags: [],
      allowedAttributes: {}
    }).replace(/\r\n|\n\r|\n|\r/g, '')
  }

  const handleKeyDown = (e) => {
    const output = getCleanOutput()

    // if the onUpdate function is provided, call it
    if(onUpdate) {
      onUpdate(output)
    }

    // commit to current value
    if(e.key === "Enter") {
      setEditable(false)
      onCommit(output)
    }

    // allow user to reset the input by hitting the escape key
    if(e.key === "Escape") {
      setEditable(false)
      taskRef.current.innerHTML = value
    }
  }

  /**
   * Disable editing when the user clicks outside of the task body.
   *
   * @param event
   */
  const handleClickOutside = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setEditable(false)
      const output = getCleanOutput()

      // don't continue if there are no changes
      if(output === value) {
        return;
      }

      onCommit(output)
    }
  };

  /**
   * Attach event listeners for clicking elsewhere.
   */
  useEffect(() => {
    if(isEditable) {
      document.addEventListener('click', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isEditable]);

  /**
   * Turn pasted content into plaintext.
   *
   * @param {ClipboardEvent} e
   */
  const handlePaste = (e) => {
    e.preventDefault()
    const plainText = e.clipboardData.getData("text/plain")
    document.execCommand('insertHTML', false, plainText)
  }

  return (
    <p
      ref={taskRef}
      contentEditable={isEditable}
      suppressContentEditableWarning={true}
      onPaste={handlePaste}
      className={`TaskBody rounded font-bold outline-none break-all ${isEditable ? 'cursor-text' : ''}`}
      onClick={() => setEditable(true)}
      onKeyDown={handleKeyDown}
    >{value}</p>
  )
}
