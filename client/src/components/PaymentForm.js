import { useState } from "react";

import "./PaymentForm.css";

const PaymentForm = (props) => {
  const { onPaymentSuccess, reservationData } = props;

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const submitPayment = (event) => {
    event.preventDefault();

    onPaymentSuccess({
      ...reservationData,
      paymentMethod,
    });
  };

  return (
    <div className="payment-container">
      <form className="payment-form" onSubmit={submitPayment}>
        <h2>Payment</h2>

        <p className="amount">Parking Fee: ₹100</p>

        <select
          className="payment-select"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="UPI">UPI</option>

          <option value="Card">Card</option>

          <option value="Cash">Cash</option>
        </select>

        <button type="submit" className="pay-btn">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
