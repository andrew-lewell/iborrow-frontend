import React, { useState } from "react";
import { Input, Button } from "semantic-ui-react";

import "./Search.css";
import API from "../Adapters/API";

const Search = ({ handleSearch, handleReset }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    console.log(searchValue);

    if (
      searchValue === "" ||
      parseFloat(searchValue) === null ||
      parseFloat(searchValue) < 1 ||
      isNaN(parseFloat(searchValue)) ||
      /^\s+$/.test(parseFloat(searchValue))
    ) {
      setIsError(true);
      setErrorMessage("Please enter a valid Loan ID value.");
    } else {
      API.getLoan(parseInt(searchValue, 10))
        .then(resp => {
          handleSearch(resp);
        })
        .catch(error => {
          setIsError(true);
          setErrorMessage("No Loan found with that ID");
        });
    }
  };

  const handleChange = event => {
    setSearchValue(event.target.value);
  };

  return (
    <div className='searchBar'>
      <Input
        type='text'
        action
        placeholder='Search by ID...'
        onChange={handleChange}
      >
        <input />
        <Button type='submit' onClick={handleSubmit}>
          Search
        </Button>
        <Button
          type='submit'
          onClick={() => {
            setIsError(false);
            setErrorMessage("");
            handleReset();
          }}
        >
          Reset
        </Button>
      </Input>
      <br />
      <span className='error'> {isError ? errorMessage : null} </span>
      <br />
    </div>
  );
};

export default Search;
