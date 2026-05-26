import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";

import Navbar from "../components/Navbar";
import SlotCard from "../components/SlotCard";
import ReservationForm from "../components/ReservationForm";
import PaymentForm from "../components/PaymentForm";

import "./Slots.css";

const Slots = () => {
  const [slots, setSlots] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [pendingReservation, setPendingReservation] = useState(null);

  useEffect(() => {
    getSlots();
  }, []);

  const getSlots = async () => {
    const response = await axios.get("http://localhost:5000/slots");
    setSlots(response.data);
  };

  const onSubmitReservation = (data) => {
    setPendingReservation(data);

    setSelectedSlotId(null);
    setShowPayment(true);
  };

  const onPaymentSuccess = async (data) => {
    try {
      await axios.post("http://localhost:5000/reserve-slot", data);
      toast.success("Payment & Reservation Successful");

      getSlots();

      setSelectedSlotId(null);
      setShowPayment(false);
    } catch (error) {
      toast.error("Reservation Failed");
    }
  };

  const filteredSlots = slots.filter((eachSlot) => {
    const matchesSearch = eachSlot.slot_number
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : eachSlot.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <Navbar />
      <div className="slots-container">
        <h1>Parking Slots</h1>

        <div className="filter-container">
          <input
            type="search"
            placeholder="Search Slot"
            className="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Occupied">Occupied</option>
          </select>
        </div>

        <div className="slots-content">
          <Popup
            open={selectedSlotId !== null}
            modal
            className="popup"
            closeOnDocumentClick
            onClose={() => setSelectedSlotId(null)}
          >
            <div className="popup-container">
              <ReservationForm
                slotId={selectedSlotId}
                onSubmitReservation={onSubmitReservation}
              />
            </div>
          </Popup>

          <Popup
            open={showPayment && selectedSlotId === null}
            modal
            className="popup"
            closeOnDocumentClick
            onClose={() => setShowPayment(false)}
          >
            <div className="popup-container">
              <PaymentForm
                reservationData={pendingReservation}
                onPaymentSuccess={onPaymentSuccess}
              />
            </div>
          </Popup>

          <div className="slots-list">
            {filteredSlots.map((eachSlot) => (
              <SlotCard
                key={eachSlot.id}
                slotDetails={eachSlot}
                onReserve={setSelectedSlotId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slots;
