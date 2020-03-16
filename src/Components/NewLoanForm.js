import React, { useState } from "react";
import { Form, Button, Input } from "semantic-ui-react";

import API from "../Adapters/API";

const NewLoanForm = ({ handlePost }) => {
  const [formData, setFormData] = useState({
    borrowerName: "",
    repaymentAmount: 0,
    fundingAmount: 0
  });

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event, data) => {
    setFormData({
      ...formData,
      [data.name]: data.value
    });
  };

  const resetErrors = () => {
    setIsError(false);
    setErrorMessage("");
  };

  const handleSubmit = event => {
    event.preventDefault();
    resetErrors();

    // Form error handling
    if (
      formData.repaymentAmount === "" ||
      parseFloat(formData.repaymentAmount) === null ||
      parseFloat(formData.repaymentAmount) < 1 ||
      isNaN(parseFloat(formData.repaymentAmount)) ||
      /^\s+$/.test(parseFloat(formData.repaymentAmount)) ||
      parseFloat(formData.repaymentAmount) < parseFloat(formData.fundingAmount)
    ) {
      setIsError(true);
      setErrorMessage("Please enter a valid repayment amount.");
    } else if (
      parseFloat(formData.fundingAmount) === "" ||
      parseFloat(formData.fundingAmount) === null ||
      parseFloat(formData.fundingAmount) < 1 ||
      isNaN(parseFloat(formData.fundingAmount)) ||
      /^\s+$/.test(parseFloat(formData.fundingAmount))
    ) {
      setIsError(true);
      setErrorMessage("Please enter a valid funding amount.");
    } else if (formData.borrowerName === "" || formData.borrowerName === null) {
      setIsError(true);
      setErrorMessage("Please enter a valid borrower name.");
    } else {
      API.postLoan(
        formData.borrowerName,
        parseFloat(formData.repaymentAmount),
        parseFloat(formData.fundingAmount)
      ).then(resp => handlePost(resp));
    }
  };

  const formStyle = {
    margin: "0 auto",
    width: "200px"
  };

  return (
    <div>
      <span className='error'> {isError ? errorMessage : null} </span>
      <Form style={formStyle} onSubmit={handleSubmit}>
        <Form.Field>
          <Input
            placeholder='Borrower Name...'
            name='borrowerName'
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder='Funding Amount...'
            name='fundingAmount'
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder='Repayment Amount...'
            name='repaymentAmount'
            onChange={handleChange}
          />
        </Form.Field>
        <Button type='submit'>Add New Loan</Button>
      </Form>
    </div>
  );
};

export default NewLoanForm;
