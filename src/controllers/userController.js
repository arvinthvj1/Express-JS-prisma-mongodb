const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const createUser = async(req,res,nxt)=>{
    const {name, email ,password} = req.body;
    // encrypt:
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
    res.send({token : generatedToken});
};

const findUser = async(req,res,nxt)=>{
    const {name, email} = req.body;
    console.log(name, email);
    const foundUser = await prisma.user.findUnique({
        where: { email: email },
      });
      res.status(201).send(foundUser)
      console.log(foundUser);
};


const deleteUser = async(req,res,nxt)=>{
    const {email} = req.body;
    console.log(email);
    const deletedUser = await prisma.user.delete({
        where: { email: email },
      });
      res.send(`Delete the user successfully`)
      console.log("Deleted: ", deletedUser);
};

const updateUser= async(req,res,nxt)=>{
    const {email, name} = req.body;
    const user = await prisma.user.update({
    where: { email : email},
    data: { name : name},
    });

    console.log("User: updated ", user);
    res.send(user);
}


module.exports = {
    createUser,
    findUser, 
    deleteUser,
    updateUser
}