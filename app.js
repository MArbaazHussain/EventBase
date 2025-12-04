const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// MongoDB Atlas Connection
mongoose.connect("mongodb+srv://ArbaazHussain:keyboard3108@cluster0.ejj3klo.mongodb.net/eventbase?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
