const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Khalti API");
});

app.post("/khalti-api", async (req, res) => {
  try {
    const payload = req.body;
    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );

    res.json({
      success: true,
      data: khaltiResponse.data,
    });
  } catch (error) {
    console.error("Error calling Khalti API:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.post("/epayment/lookup", async (req, res) => {
  try {
    const payload = req.body;
    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      payload,
      {
        headers: {
          Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );

    res.json({
      success: true,
      data: khaltiResponse.data,
    });
  } catch (error) {
    console.error("Error calling Khalti API:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));