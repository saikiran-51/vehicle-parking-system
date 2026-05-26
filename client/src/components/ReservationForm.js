import { useState } from "react";
import { toast } from "react-toastify";

import "./ReservationForm.css";

const ReservationForm = (props) => {
  const { slotId, onSubmitReservation } = props;

  const [customerName, setCustomerName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const submitForm = (event) => {
    event.preventDefault();

    if (
      customerName.trim() === "" ||
      vehicleNumber.trim() === "" ||
      startTime.trim() === "" ||
      endTime.trim() === ""
    ) {
      toast.error("All fields are required");
      return;
    }

    onSubmitReservation({
      slotId,
      customerName,
      vehicleNumber,
      startTime,
      endTime,
    });

    setCustomerName("");
    setVehicleNumber("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <div className="reservation-form-container">
      <form onSubmit={submitForm} className="form-container">
        <input
          type="text"
          className="input-field"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          className="input-field"
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
        />

        <input
          type="text"
          className="input-field"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          className="input-field"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <br />
        <br />

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
