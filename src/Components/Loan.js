import React, { useState } from "react";
import { Card, Button, Confirm } from "semantic-ui-react";

const Loan = ({ loan, handleDelete }) => {
  const [open, setOpen] = useState(false);

  const toggleConfirm = () => {
    setOpen(!open);
  };

  return (
    <>
      <Card>
        <Card.Content>
          <Card.Header>{loan.borrowerName}</Card.Header>
          <Card.Meta>Loan ID: {loan.id}</Card.Meta>
          <Card.Description>
            Funding Amount: £{loan.fundingAmount} <br />
            Repayment Amount: £{loan.repaymentAmount}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button onClick={() => toggleConfirm()}>Delete</Button>
          <Confirm
            open={open}
            onCancel={() => toggleConfirm()}
            onConfirm={() => {
              handleDelete(loan.id);
              toggleConfirm();
            }}
          />
        </Card.Content>
      </Card>
    </>
  );
};

export default Loan;
