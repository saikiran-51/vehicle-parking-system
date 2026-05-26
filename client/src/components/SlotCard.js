import "./SlotCard.css";

const SlotCard = (props) => {
  const { slotDetails, onReserve } = props;

  const { id, slot_number, vehicle_type, status } = slotDetails;

  const reserveSlot = () => {
    onReserve(slotDetails.id);
  };

  const getStatusColor = () => {
    if (status === "Available") {
      return "green";
    }

    if (status === "Reserved") {
      return "orange";
    }

    return "red";
  };

  return (
    <div className="slot-card">
      <h2 className="slot-number">{slot_number}</h2>
      <p className="vehicle-type">{vehicle_type}</p>
      <p className={status.toLowerCase()}>{status}</p>
      {status === "Available" && (
        <button
          className="reserve-btn"
          onClick={() => onReserve(slotDetails.id)}
        >
          Reserve
        </button>
      )}
    </div>
  );
};

export default SlotCard;
