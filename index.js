import express from "express";
import router from "./router.js";
// import router from "./src/routers/men.js";
import mongoose from "mongoose";
// import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected!"))
  .catch((err) => console.log("no connection===>", err));

const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//   })
// );

const port = process.env.port || 5000;

app.use(express.json());

// app.use("/api/users", router);

app.get("/", async (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`connection succesful at ${port}`));

app.use('/api',router)