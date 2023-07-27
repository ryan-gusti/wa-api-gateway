require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const router = require("./routers");

app.use(express.json());
app.use("/api", router);
app.listen(PORT, () => {
  console.log(`server berjalan di port ${PORT}`);
});
