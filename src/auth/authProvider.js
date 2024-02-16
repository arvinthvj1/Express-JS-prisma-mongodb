const secretKey =  "black";
var jwt = require('jsonwebtoken');

// Middleware to check JWT for authentication
 const authenticateToken = (req, res, next) => {
    console.log("entered authenticateToken")
  const token = req.body.token;
    console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("userid",req.userId)
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


module.exports={
    authenticateToken
}