const ENDPOINT = "https://localhost:5001/api/Loans";

const jsonify = resp => {
  if (resp.ok) {
    return resp.json();
  } else {
    throw resp.json();
  }
};

// GET all loans
const getAllLoans = () =>
  fetch(ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(jsonify);

// GET loan by id
const getLoan = loanId =>
  fetch(`${ENDPOINT}/${loanId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(jsonify);

// POST new loan
const postLoan = (borrowerName, repaymentAmount, fundingAmount) =>
  fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      BorrowerName: borrowerName,
      RepaymentAmount: repaymentAmount,
      FundingAmount: fundingAmount
    })
  }).then(jsonify);

// DELETE loan by id
const deleteLoan = loanId =>
  fetch(`${ENDPOINT}/${loanId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });

export default {
  getAllLoans,
  getLoan,
  postLoan,
  deleteLoan
};
