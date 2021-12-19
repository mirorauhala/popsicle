import { useState } from "react";
import CreatableSelect from "react-select/creatable";

/**
 * Helper for creating new options.
 * @param label
 * @returns {{label, value: string}}
 */
const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});

export default function Tags(props) {
  const { tags, selectedTags, onSelectedTags, onTagCreate, isLoading } = props;
  const [placeholder, setPlaceholder] = useState("Add tags...");

  /**
   * Check whether the current input is creatable.
   * @param inputValue
   * @returns {boolean}
   */
  const isValidNewOption = (inputValue) => {
    if (inputValue === "") {
      return false;
    }

    if (tags.length === 0) {
      return true;
    }

    return !tags.findIndex(
      (tag) => tag.name.toLowerCase() !== inputValue.toLowerCase(),
    );
  };

  /**
   * Return tags in react-select's option format.
   * @param inputTags
   * @returns {label: string, value: number}
   */
  const getTagsAsOptions = (inputTags) => {
    return inputTags.map((tag) => ({
      label: tag.name,
      value: tag.id,
    }));
  };

  /**
   * Handle creating new tags.
   * @param inputValue
   */
  const handleCreate = async (inputValue) => {
    // set loading text
    setPlaceholder("Loading...");

    // create react-select style option {label: 'moi', value:'1'}
    const plainTag = createOption(inputValue);

    // create tag and get its object
    const newTag = await onTagCreate(plainTag);

    // revert placeholder text
    setPlaceholder("Add tags...");

    // get the current tagset
    const newTags = [...selectedTags, newTag];

    // save tagset as current tags
    onSelectedTags(newTags.map((tag) => tag.id));
  };

  /**
   * Listen for changes on the tag field. Send a request for them.
   * @param options
   * @param actionMeta
   */
  const handleChange = (options, actionMeta) => {
    onSelectedTags(options.map((option) => option.value));
  };

  /**
   * Change react-select's branding.
   * @type {{noOptionsMessage: (function(*): *&{padding: string, color: string, fontWeight: number}), menuList: (function(*): *&{borderColor: string}), valueContainer: (function(*): *&{padding: null}), multiValueLabel: (function(*): *&{cursor: string, color: string}), multiValueRemove: (function(*): *&{fontWeight: number}), control: (function(*): {border: string, minHeight: null, width: string}), indicatorsContainer: (function(*): {display: string}), multiValue: (function(*): *&{backgroundColor: string, color: string, fontWeight: number}), menu: (function(*): *&{boxShadow: string, padding: string, borderColor: string, borderRadius: string, borderWidth: string}), menuPortal: (function(*): *), option: (function(*, *): {cursor: string, backgroundColor: string, paddingBottom: string, borderRadius: string, paddingRight: string, paddingTop: string, paddingLeft: string, fontWeight: number})}}
   */
  const customStyles = {
    control: (provided) => {
      return {
        width: "100%",
        border: "none",
        minHeight: null,
      };
    },

    valueContainer: (provided) => {
      return {
        ...provided,
        padding: null,
      };
    },
    indicatorsContainer: (provided) => ({ display: "none" }),
    multiValue: (provided) => {
      return {
        ...provided,
        fontWeight: 500,
        backgroundColor: "#dcfce7", // tw-green-100
        color: "#166534", // tw-green-800
      };
    },
    multiValueLabel: (provided) => {
      return {
        ...provided,
        color: "#166534", // tw-green-800
        cursor: "pointer",
      };
    },
    multiValueRemove: (provided) => {
      return {
        ...provided,
        fontWeight: 500,
      };
    },
    menu: (provided) => {
      return {
        ...provided,
        borderRadius: "0.5rem",
        borderWidth: "1px",
        borderColor: "rgb(49 46 129 / 0.1)",
        boxShadow:
          "0 20px 25px -5px rgb(55 48 163 / 0.2), 0 8px 10px -6px rgb(55 48 163 / 0.2)",
        padding: "0.5rem",
      };
    },
    menuList: (provided) => {
      return {
        ...provided,
        borderColor: "red",
      };
    },
    menuPortal: (provided) => {
      return {
        ...provided,
      };
    },
    option: (provided, state) => ({
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      paddingTop: ".5rem",
      paddingBottom: ".5rem",
      cursor: "pointer",
      fontWeight: 500,
      borderRadius: "0.5rem",
      backgroundColor: state.isFocused ? "#f3f4f6" : "", // tw-gray-100
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      padding: "0.1rem",
      color: "#475569", // tw-slate-600
      fontWeight: 500,
    }),
  };

  const noOptionsMessage = () =>
    "Create new tags by typing and hitting return.";

  return (
    <div className="flex flex-wrap gap-1 empty:hidden mt-2">
      <CreatableSelect
        className="w-full break-words"
        classNamePrefix="react-select"
        closeMenuOnSelect={false}
        allowCreateWhileLoading={false}
        isValidNewOption={isValidNewOption}
        styles={customStyles}
        options={getTagsAsOptions(tags)}
        placeholder={placeholder}
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={handleChange}
        isMulti
        onCreateOption={handleCreate}
        value={getTagsAsOptions(selectedTags)}
        noOptionsMessage={noOptionsMessage}
      />
    </div>
  );
}
