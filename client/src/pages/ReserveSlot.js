import { useState } from "react";
import axios from "axios";

const ReserveSlot = () => {
  const [customerName, setCustomerName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  const reserveSlot = async () => {
    const data = {
      slotId: 1,
      customerName,
      vehicleNumber,
      startTime: "10:00 AM",
      endTime: "12:00 PM",
    };

    const response = await axios.post(
      "http://localhost:5000/reserve-slot",
      data,
    );

    alert(response.data);
  };

  const reserveSlot = async (slotId) => {
    const data = {
      slotId,
      customerName: "Bunny",
      vehicleNumber: "TS09AB1234",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
    };

    await axios.post("http://localhost:5000/reserve-slot", data);

    getSlots();
  };

  return (
    <div>
      <h1>Reserve Parking Slot</h1>

      <input
        type="text"
        placeholder="Customer Name"
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Vehicle Number"
        onChange={(e) => setVehicleNumber(e.target.value)}
      />

      <br />
      <br />

      <button onClick={reserveSlot}>Reserve Slot</button>
    </div>
  );
};

export default ReserveSlot;
