const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const secretKey = "black";

const createUser = async(req,res,nxt)=>{
    const {name, email ,password} = req.body;
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    // Check if the user exists
    if (user) {
        return res.status(401).send({ message: 'Already exisits pls login' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(name, email);
    const createdUser = await prisma.user.create({
        data: {
            name : name, email : email, password : hashedPassword
        }
    });
    console.log(createdUser);
    let generatedToken = jwt.sign({ userId: createdUser.id }, secretKey, { expiresIn: '1h' });
    // req.userId = createdUser.id;
    res.send({token : generatedToken});
};



const login = async (req, res, nxt) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    // Check if the user exists
    if (!user) {
        return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords match, generate a new token and send it back
    if (passwordMatch) {
        const generatedToken = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        return res.send({ token: generatedToken });
    } else {
        // If passwords don't match, return an authentication error
        return res.status(401).send({ message: 'Invalid email or password' });
    }
};

const deleteUser = async(req,res,nxt)=>{
    const { userId } = req;
    const deletedUser = await prisma.user.delete({
        where: { id: userId },
      });
      res.send(`Delete the user successfully`)
      console.log("Deleted: ", deletedUser);
};

const updateUser= async(req,res,nxt)=>{
    const {email, name} = req.body;
    console.log(email,name)
    const user = await prisma.user.update({
    where: { id : req.userId},
    data: { name : name, email: email},
    });

    console.log("User: updated ", user);
    res.send(user);
}
const isAuthCheck = async(req,res,nxt)=>{
   res.status(201).send("authenticated")
}


module.exports = {
    createUser,
    deleteUser,
    updateUser,
    login,
    isAuthCheck
}