const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const authJWT = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) res.sendStatus(404);

  const verify = jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
    if (error) {
      console.log(error);
      res.sendStatus(404);
    }

    console.log(decodedToken);
    next();
  });
};

module.exports = { authJWT };
