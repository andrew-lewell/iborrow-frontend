import React from "react";
import { Card } from "semantic-ui-react";

import Loan from "../Components/Loan";
import Search from "../Components/Search";

const LoansContainer = ({ loans, handleDelete, handleSearch, handleReset }) => {
  return (
    <div>
      <Search handleSearch={handleSearch} handleReset={handleReset} />
      <Card.Group centered itemsPerRow={4}>
        {loans.map((loan, index) => (
          <Loan loan={loan} key={index} handleDelete={handleDelete} />
        ))}
      </Card.Group>
    </div>
  );
};

export default LoansContainer;
