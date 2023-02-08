const fastifyPlugin=require('fastify-plugin')


(async(fastify)=>{
    fastify.decorate('jwtauthentication',async(req,reply)=>{
        try{
            await req.jwtVerify();
        }
        catch(err){
            reply.send(err);
        }
    })
})
module.exports=fastifyPlugin