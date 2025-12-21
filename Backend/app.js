const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.options("*", cors());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
// Middleware
app.use(express.json());

app.use(cors()); // 👈 YE LINE MOST IMPORTANT
app.use(express.json());
// Routes
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/Events");

app.use("/api/auth", authRoutes);
app.use("/api/Events", eventRoutes);

// MongoDB Atlas Connection
mongoose.connect("mongodb+srv://ArbaazHussain:keyboard3108@cluster0.ejj3klo.mongodb.net/eventbase?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));