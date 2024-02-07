
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();


// const auth = (req, res, nxt) => {
//     console.log("entered authenticateToken")
//   const token = req.headers.Authorization;
//     console.log(token);
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     // const decoded = jwt.verify(token, secretKey) as { userId: number };
//     // req.userId = decoded.userId; // Attach userId to request for further use
//     nxt();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

// modules.export = {
//     auth
// }