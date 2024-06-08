require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoute.js");

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.use("/", userRouter);


mongoose.connect(process.env.MONGODB_URI);

app.listen(port, () => console.log(`Server running on port ${port}`));
