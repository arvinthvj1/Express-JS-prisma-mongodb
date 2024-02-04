const express = require("express");
const { PrismaClient } = require('@prisma/client')
require("dotenv").config();
const prisma = new PrismaClient();




const server = express();

// middleware to parse all data incoming to the server:
server.use(express.json());


server.post("/createUser",async(req,res,nxt)=>{
    const {name, email} = req.body;
    console.log(name, email);
    const createdUser = await prisma.user.create({
        data: {
            name : name, email : email
        }
    });
    console.log(createdUser);
});


server.get("/findbyemail",async(req,res,nxt)=>{
    const {name, email} = req.body;
    console.log(name, email);
    const foundUser = await prisma.user.findUnique({
        where: { email: email },
      });
      res.status(201).send(foundUser)
      console.log(foundUser);
});

server.delete("/deletebyemail",async(req,res,nxt)=>{
    const {email} = req.body;
    console.log(email);
    const deletedUser = await prisma.user.delete({
        where: { email: email },
      });
      res.send(`Delete the user successfully`)
      console.log("Deleted: ", deletedUser);
});



server.listen("3000", ()=>{
    console.log("listening")
})



