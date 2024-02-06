const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createUser = async(req,res,nxt)=>{
    const {name, email} = req.body;
    console.log(name, email);
    const createdUser = await prisma.user.create({
        data: {
            name : name, email : email
        }
    });
    console.log(createdUser);
    res.send(createdUser);
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


module.exports = {
    createUser,
    findUser, 
    deleteUser
}