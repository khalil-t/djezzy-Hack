import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connectToMongoDB.js";
import router from "./routes/auth.routes.js";
import PostRoutes from "./routes/Post.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', router);
app.use('/', PostRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
