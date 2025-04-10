const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  console.log(tokenHeader)
  const token = tokenHeader.split(" ")[1]
  console.log(token)
  if (!token) return res.status(401).json({ error: "Acceso denegado" });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    /*
    payload -> const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    decoded (payload) =
    {
      userId: string
    }
    */
   req.userId = decoded.userId;
   console.log('User id:', req.userId)
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

