import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import styles from "./header.module.scss";
import { HeaderTypes } from "./header.types";

const Header = ({ searchImages, isLoading }: HeaderTypes) => {
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function searchForImages() {
    searchImages(inputValue);
  }

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.headerText}>Gallery</h1>
        <div className={styles.searchItems}>
          <input
            type="search"
            placeholder="Search Images"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            disabled={!inputValue || isLoading}
            onClick={searchForImages}
          >
            Search
          </button>
        </div>
      </header>
      <div style={{ height: "95px" }}></div>
    </>
  );
};

export default Header;
