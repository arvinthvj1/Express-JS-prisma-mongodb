const secretKey =  "black";
var jwt = require('jsonwebtoken');
const { decryptText } = require('../utility/crptojs');

// Middleware to check JWT for authentication
 const authenticateToken = (req, res, next) => {
  console.log("entered authenticateToken")
  const tokenGot = req.body.token;

  if (!tokenGot) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  let token;
  try{
    const decryptedToken = decryptText(tokenGot, "secretkey")
    token = decryptedToken;
    console.log(token, "decrypted")
  }catch(err){
    res.status(401).json({ message: err })
    return 
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