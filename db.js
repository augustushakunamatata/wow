const fastifyPlugin = require('fastify-plugin') 
const { Client } = require('pg') 
require('dotenv').config() 
const client = new Client({ 
    user: 'postgres', 
    password:process.env.PASSWORD, 
    host: 'localhost', 
    port: 5432, 
    database: process.env.DATABASE 
}) 
async function dbconnector(express, options) { 
    try { 
        await client.connect() 
        console.log("db connected succesfully") 
        express.decorate('db', {client}) 
    } catch(err) { 
        console.error(err) 
    } 
} 
module.exports= fastifyPlugin(dbconnector)
