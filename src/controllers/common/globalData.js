
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const commonCrudHandler = async (req, res, nxt) => {
  const payLoad = req.body;
  let relation = {};
  if(payLoad?.relation && Object.keys(payLoad?.relation).length){
    relation = payLoad?.relation;
  }
    try{
        const data = await prisma[req.params.page].findMany({
          include: relation
        });
        console.log(data);
        res.status(200).send({data})
    }catch(err){
         res.status(400).send(err)
    }
};


module.exports = {
  commonCrudHandler
}