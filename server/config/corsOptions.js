const whitelist = ["http://localhost:5173", "http://127.0.0.1:5500"];

const corsOptions = {
  origin: (origin, callback) => {
    const isValidOrigin = whitelist.indexOf(origin) !== -1 || !origin;
    if (isValidOrigin) callback(null, true);
    else callback(new Error("Not Allowed by CORS"));
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;
