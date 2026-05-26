import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import "./Reservations.css";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getReservations();
  }, []);

  const getReservations = async () => {
    const response = await axios.get(
      "https://parknova.onrender.com/reservations",
    );

    setReservations(response.data);
  };

  const cancelReservation = async (id) => {
    await axios.delete(`https://parknova.onrender.com/reservations/${id}`);

    getReservations();
    toast.info("Reservation Cancelled");
  };

  return (
    <div>
      <Navbar />
      <div className="reservations-container">
        <h1>Reservations</h1>

        {reservations.map((eachReservation) => (
          <div key={eachReservation.id}>
            <h2 className="reservation-customer-name">
              {eachReservation.customer_name}
            </h2>

            <p className="reservation-vehicle-number">
              {eachReservation.vehicle_number}
            </p>

            <p className="reservation-slot-id">
              Slot ID:{""}
              {eachReservation.slot_id}
            </p>

            <p className="reservation-start-time">
              {eachReservation.start_time}
            </p>

            <p className="reservation-end-time">{eachReservation.end_time}</p>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => cancelReservation(eachReservation.id)}
            >
              Cancel Reservation
            </button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
