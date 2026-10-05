//creates express application, leads configuration, register routes, starts server, connects database

const express = require("express");
const dotenv = require("dotenv");

//connects database
const connectDB = require("./config/db");
//registers routes
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();

const app = express();

// Middleware- parses json data
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes - any request with api/*** should be handled by these event routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/bookings", bookingRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to EventHive API"
  });
});
//starts the server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});