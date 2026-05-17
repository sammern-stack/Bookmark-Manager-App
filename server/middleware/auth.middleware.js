const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const authJWT = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) res.sendStatus(404);

  const verify = jwt.verify(token, ACCESS_TOKEN_SECRET, (error, decodedToken) => {
    if (error) {
      console.log(error);
      res.sendStatus(404);
    }

    console.log(decodedToken);
    next();
  });
};

module.exports = { authJWT };
