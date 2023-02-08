const { Database } = require('sqlite3');
const db = new Database(':memory:');
const fastify = require('fastify')({logger: true}) 
const route  = require('./routes')
require('./auth_middleware')
var jwt  = require('jsonwebtoken');
require('dotenv').config()


fastify.register(require('fastify-jwt'), {
    secret:process.env.JWT_SECRET
  })


  fastify.decorate('jwtauthentication',async(req,reply)=>{
    try{
        // await reply.jwtVerify()
       // await reply.send.jwtVerify()
    }
    catch(err){
        reply.send(err);
    }
    // await req.jwtVerify()
})
//const fastifyEnv = require('@fastify/env')
const dbconnector = require('./db')
fastify.register(dbconnector)
fastify.register(route)
// fastify.register(require("fastify-swagger"),{
//     exposeRoute:true,
//     routePrefix:"/docs",
//     swagger:{
//      info:{
//         title: "fastify-api",
//      }   
//     }
// })
// fastify.register(require('@fastify/jwt'),{
//     secret:'mysecret'
// })
// fastify.get('/generateToken/:id',(req,reply)=>{
//     const data ={
//         name:req.parmas.id}
//         console.log(parmas.id);
//         const token=fastify.jwt.sign(data)
//         reply.send({token});
//         console.log(token);

//     }
// )

let amount = 1000;
let baseamount=1000
let distance=500
amount=baseamount+(distance*10)
console.log("amount:"+amount)
async function start()  { 
    try{ 
        await fastify.listen({ port: 3000 }) 
    } catch(err) { 
        fastify.log.error(err) 
        process.exit(1) 
    } 
} 
start()