const express = require("express");
const cors = require("cors");
const path = require("path");
console.log("BUILD PATH:", path.join(__dirname, "../client/build"));
console.log(
  "INDEX EXISTS:",
  require("fs").existsSync(path.join(__dirname, "../client/build/index.html")),
);

const initializeDB = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

let db = null;

const startServer = async () => {
  db = await initializeDB();

  const bcrypt = require("bcrypt");

  app.get("/create-admin", async (req, res) => {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await db.run(`
    INSERT INTO admins
    (username, password)
    VALUES (
      'admin',
      '${hashedPassword}'
    )
  `);

    res.send("Admin Created");
  });

  const jwt = require("jsonwebtoken");

  app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await db.get(`
    SELECT * FROM admins
    WHERE username = '${username}'
  `);

    if (!user) {
      res.status(400);
      res.send("Invalid User");
      return;
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      res.status(400);
      res.send("Invalid Password");
      return;
    }

    const payload = {
      username,
    };

    const token = jwt.sign(payload, "MY_SECRET_TOKEN");

    res.send({ jwtToken: token });
  });

  app.get("/", (req, res) => {
    res.send("Parking Backend Running");
  });

  app.get("/dashboard", async (req, res) => {
    const totalSlots = await db.get(`
    SELECT COUNT(*) AS count
    FROM parking_slots
  `);

    const availableSlots = await db.get(`
    SELECT COUNT(*) AS count
    FROM parking_slots
    WHERE status = 'Available'
  `);

    const reservedSlots = await db.get(`
    SELECT COUNT(*) AS count
    FROM parking_slots
    WHERE status = 'Reserved'
  `);

    const occupiedSlots = await db.get(`
    SELECT COUNT(*) AS count
    FROM parking_slots
    WHERE status = 'Occupied'
  `);

    res.send({
      total: totalSlots.count,
      available: availableSlots.count,
      reserved: reservedSlots.count,
      occupied: occupiedSlots.count,
    });
  });

  app.get("/slots", async (req, res) => {
    const slots = await db.all(`
      SELECT * FROM parking_slots
    `);

    res.send(slots);
  });

  app.get("/add-slots", async (req, res) => {
    await db.run(`
        INSERT INTO parking_slots
        (slot_number, vehicle_type, status)
        VALUES
        ('A1', 'Car', 'Available'),
        ('A2', 'Bike', 'Available'),
        ('A3', 'Car', 'Occupied'),
        ('B1', 'Truck', 'Available')
    `);

    res.send("Slots Added");
  });

  app.get("/reservations", async (req, res) => {
    const reservations = await db.all(`
    SELECT * FROM reservations
  `);

    res.send(reservations);
  });

  app.post("/reserve-slot", async (req, res) => {
    const { slotId, customerName, vehicleNumber, startTime, endTime } =
      req.body;

    const slot = await db.get(`
    SELECT * FROM parking_slots
    WHERE id = ${slotId}
  `);

    if (slot.status !== "Available") {
      res.status(400);
      res.send("Slot Not Available");
      return;
    }

    await db.run(`
    INSERT INTO reservations
    (
      slot_id,
      customer_name,
      vehicle_number,
      start_time,
      end_time,
      status
    )
    VALUES (
      ${slotId},
      '${customerName}',
      '${vehicleNumber}',
      '${startTime}',
      '${endTime}',
      'Reserved'
    )
  `);

    await db.run(`
    UPDATE parking_slots
    SET status = 'Reserved'
    WHERE id = ${slotId}
  `);

    res.send("Slot Reserved Successfully");
  });

  app.delete("/reservations/:id", async (req, res) => {
    const { id } = req.params;

    const reservation = await db.get(`
      SELECT * FROM reservations
      WHERE id = ${id}
    `);

    await db.run(`
      DELETE FROM reservations
      WHERE id = ${id}
    `);

    await db.run(`
      UPDATE parking_slots
      SET status = 'Available'
      WHERE id = ${reservation.slot_id}
    `);

    res.send("Reservation Cancelled");
  });

  app.use(express.static(path.join(__dirname, "../client/build")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

startServer();
