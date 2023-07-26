require("dotenv").config();
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("loading_screen", (percent, message) => {
  console.log("LOADING SCREEN", percent, message);
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.on("auth_failure", (msg) => {
  // Fired if session restore was unsuccessful
  console.error("AUTHENTICATION FAILURE", msg);
});

client.on("ready", () => {
  console.log("READY!");
});

client.initialize();

const sendMessage = async (req, res) => {
  const authkey = req.headers.authorization;
  const number = req.body.number;
  const message = req.body.message;
  if (authkey !== process.env.AUTHKEY) {
    return res.status(403).json({
      status: "anda tidak memiliki akses",
    });
  }
  try {
    const user = await client.isRegisteredUser(number);
    if (user) {
      client.sendMessage(number, message);
      res.status(200).json({
        status: "berhasil kirim",
      });
    } else {
      res.status(404).json({
        status: "nomor tidak terdaftar wa",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "server error",
    });
  }
};

module.exports = sendMessage;
