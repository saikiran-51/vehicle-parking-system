const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const path = require("path");

const dbPath = path.join(__dirname, "parking.db");

const initializeDB = async () => {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS parking_slots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slot_number TEXT,
      vehicle_type TEXT,
      status TEXT
    );

    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slot_id INTEGER,
      customer_name TEXT,
      vehicle_number TEXT,
      start_time TEXT,
      end_time TEXT,
      status TEXT
    );

    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT
    );
  `);

  console.log("Database Connected");

  return db;
};

module.exports = initializeDB;
