const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Safeguard License API is running");
});

app.post("/api/verify", (req, res) => {
  const { licenseKey } = req.body;

  if (!licenseKey) {
    return res.status(400).json({
      valid: false,
      message: "No license key provided"
    });
  }

  const data = JSON.parse(fs.readFileSync("./licenses.json", "utf8"));
  const valid = data.licenses.includes(licenseKey);

  if (valid) {
    return res.json({ valid: true });
  } else {
    return res.json({ valid: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("API running on port " + PORT);
});
