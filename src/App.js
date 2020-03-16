import React, { useState, useEffect } from "react";

import "./App.css";
import API from "./Adapters/API";
import LoansContainer from "./Containers/LoansContainer";
import NewLoanForm from "./Components/NewLoanForm";
import Header from "./Components/Header";

const App = () => {
  const [loansData, setLoansData] = useState([]);

  // fetch all loans on page load.
  useEffect(() => {
    handleLoansFetch();
  }, []);

  const handleLoansFetch = () => {
    API.getAllLoans().then(loans => {
      setLoansData(loans);
    });
  };

  const handleNewLoan = newLoan => {
    setLoansData(prevLoansData => [...prevLoansData, newLoan]);
  };

  const handleLoanDelete = loanId => {
    const updatedLoansList = loansData.filter(loan => loan.id !== loanId);

    API.deleteLoan(loanId).then(setLoansData(updatedLoansList));
  };

  const handleSearchByID = loan => {
    if (loan) {
      setLoansData([loan]);
    } else {
      setLoansData([]);
    }
  };

  return (
    <div className='App'>
      <header>
        <br />
        <Header />
        <br />
        <br />
      </header>
      <NewLoanForm handlePost={handleNewLoan} /> <br />
      <br />
      <LoansContainer
        loans={loansData}
        handleDelete={handleLoanDelete}
        handleSearch={handleSearchByID}
        handleReset={handleLoansFetch}
      />
    </div>
  );
};

export default App;
