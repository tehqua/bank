const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/userTracking")
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.log("❌ MongoDB connection error:", err));


app.use(cors());
app.use(bodyParser.json());

// Tạo schema MongoDB để lưu hoạt động của người dùng
const UserActivitySchema = new mongoose.Schema({
    event: String,    // Loại sự kiện (click, scroll, page load, ...)
    page: String,     // Trang nào bị tác động
    timestamp: { type: Date, default: Date.now }
});

const UserActivity = mongoose.model("UserActivity", UserActivitySchema);

// API để lưu hoạt động của người dùng
app.post("/track", async (req, res) => {
    try {
        const { event, page } = req.body;
        const activity = new UserActivity({ event, page });
        await activity.save();
        res.status(200).json({ message: "✅ Activity logged" });
    } catch (err) {
        res.status(500).json({ message: "❌ Error logging activity", error: err });
    }
});

// API để xem dữ liệu hoạt động của người dùng
app.get("/activities", async (req, res) => {
    try {
        const activities = await UserActivity.find().sort({ timestamp: -1 });
        res.status(200).json(activities);
    } catch (err) {
        res.status(500).json({ message: "❌ Lỗi khi tải dữ liệu hoạt động", error: err });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
