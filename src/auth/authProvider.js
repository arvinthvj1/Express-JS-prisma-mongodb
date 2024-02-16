const secretKey =  "black"


// Middleware to check JWT for authentication
 const authenticateToken = (req, res, next) => {
    console.log("entered authenticateToken")
  const token = req.cookies.token;
    console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


module.exports={
    authenticateToken
}