const { EMPTY } = require('sqlite3')
const db = require('./db')
const { addcustomer,addbyid,addbooking1,updatecustomer,getcustomerbyid,deleteid,addplace,updateplace,deleteplace,adddistance,loginSchema,distanceupdate,addtones,updateweight,deletetonesid,addtruck,updatetruck,addbooking,updatebooking} = require('./schemas')
const { query } = require('fastify')


async function routes(fastify, options, next) {
    const client = fastify.db.client

    
    fastify.get('/user_details', {}, async function (request, reply) {
        try {
            const {rows} = await client.query('SELECT * FROM customer12 ORDER BY cus_id ASC')
            console.log(rows)
            reply.send(rows)
        } catch(err) {
            throw new Error(err)
        }
    })

     fastify.post('/', {schema: addcustomer}, async function(request, reply) {
        const {cus_id,name,mobile_number,address,password} = request.body
        const done = false
       console.log(request.body);
        const query = {
            text: `INSERT INTO customer12 (cus_id,name,mobile_number,address,password)
                    VALUES($1,$2,$3,$4,$5) RETURNING *`,
            values: [cus_id,name,mobile_number,address,password]
            }
            console.log("query :",query);
        try {
            const {rows} = await client.query(query)
            console.log(rows[0])
            
            reply.code(200).send(rows)
          
            //return {created: true}
        } catch (err) {
            console.log(err);
            throw new Error(err)
        }
        
    })
    fastify.post('/login',{schema:loginSchema}, async (request, reply) => {
        const {cus_id,password} = request.body
            const done = false
           console.log(request.body);
        const { rows } = await client.query(`SELECT * FROM customer12 WHERE cus_id ='${cus_id}' AND password = '${password}'`)
        
            if (rows.length === 0) {
              reply.status(401).send({ message: 'Invalid name or password' })
            // reply.send( token = GenerateToken(email));
            // reply. isAvailableresponse.email = userlogin.email;
            // reply. isAvailableresponse.isAvailable = 1;
            
            } else {
                
              const token = fastify.jwt.sign({ rows },{ expiresIn: '20sec' })
              console.log(rows)
              console.log("avalability=1")
              //console.log(token)
              reply.send({ token})
            }
        
          })
          fastify.get('/decode', async (request, reply) => {
            const auth = request.headers.authorization;
            const token = auth.split(' ')[1]
        
            fastify.jwt.verify(token, (err, decoded) => {
              if (err) fastify.log.error(err)
              fastify.log.info('name : ' + decoded.name)
              reply.send({ foo: decoded })
              //reply.send("success")
              reply.send(request.body)
              
            })
          })
    
    fastify.put('/:id',{schema: updatecustomer}, async function (request, reply) {
        const cus_id = request.params.id
        const {name,address,password,mobile_number} = request.body
        const query = {
            text:  'UPDATE customer12 SET name = $1, address = $2 ,mobile_number=$4 password = $5 WHERE cus_id = $3 RETURNING *',
            values : [name,address,password,mobile_number,cus_id]
        }
        console.log("query:",query)
        try {
            const {rows} = await client.query(query)
            console.log(rows)
            reply.code(200).send(rows)
          
        } catch (err) {
            throw new Error(err)
        }
    } )
    fastify.delete('/delete/:id', {schema: deleteid}, async function(request, reply) {
        console.log(request.params)
        try {
            const {rows} = await client.query('DELETE FROM customer12 WHERE cus_id = $1 RETURNING *', [request.params.id])
            console.log(rows[0])
            reply.code(200).send("successfully deleted")
            
        } catch(err) {
            throw new Error(err)
        }
    })

    fastify.get('/get/:id',{schema:getcustomerbyid}, async function  (request, reply) {
        
        try{
            //console.log($1);debugger
            const {rows} = await client.query('SELECT * FROM customer12 WHERE cus_id = $1', [request.params.id])
                console.log(rows)

                reply.send(rows)
        } catch(err) {
                throw new Error(err)
            }
        })

        fastify.get('/place', {}, async function (request, reply) {
            try {
                const {rows} = await client.query('SELECT * FROM place ORDER BY id ASC')
                console.log(rows)
                reply.send(rows)
            } catch(err) {
                throw new Error(err)
            }
        })


        fastify.post('/place/ins', {schema: addplace}, async function(request, reply) {
            const {id,place} = request.body
            const done = false
           console.log(request.body);
            const query = {
                text: `INSERT INTO place (id,place)
                        VALUES($1,$2) RETURNING *`,
                values: [id,place]
                }
                console.log("query :",query);
                if(place=place){
                    return reply.send({error:'place are same'})
                }
                if(id=id){
                    return reply.send({error:'id are same'})
                }
            try {
                const {rows} = await client.query(query)
                console.log(rows[0])
                
                reply.code(200).send(rows)
              
                //return {created: true}
            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
            
        })
        fastify.put('/place/:id',{schema: updateplace}, async function (request, reply) {
            const id = request.params.id
            const {place} = request.body
            const query = {
                text:  'UPDATE place SET place= $1 WHERE id = $2 RETURNING *',
                values : [place,id]
            }
            console.log("query:",query)
            try {
                const {rows} = await client.query(query)
                console.log(rows)
                reply.code(200).send(rows)
              
            } catch (err) {
                throw new Error(err)
            }
        } )

        fastify.delete('/delete/place/:id', {schema: deleteplace}, async function(request, reply) {
            console.log(request.params)
            try {
                const {rows} = await client.query('DELETE FROM place WHERE id = $1 RETURNING *', [request.params.id])
                console.log(rows[0])
                reply.code(200).send("successfully deleted")
                
            } catch(err) {
                throw new Error(err)
            }
        })






        fastify.get('/distanceby', {}, async function (request, reply) {
            try {
                const {rows} = await client.query('SELECT * FROM distance ORDER BY id ASC')
                console.log(rows)
                reply.send(rows)
            } catch(err) {
                throw new Error(err)
            }
        })
        fastify.post('/distance', {schema: adddistance}, async function(request, reply) {
            const {id,pickupid,dropid,kms} = request.body
            const done = false
           console.log(request.body);
            const query = {
                text: `INSERT INTO distance (id,pickupid,dropid,kms)
                        VALUES($1,$2,$3,$4) RETURNING *`,
                        
                values: [id,pickupid,dropid,kms]
                
                }
                if(pickupid==dropid){
                    return reply.send({error:'pickup and drop same change the location'})

                }

                if(Math.abs(kms<100)){
                    return reply.send({error:'distance'})
                }
                console.log("query :",query);
              
            try {
                
                const {rows} = await client.query(query)
                console.log(rows[0])
                
                reply.code(200).send(rows)
              
                //return {created: true}
            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
            
        })


        fastify.put('/distance/:id',{schema: distanceupdate}, async function (request, reply) {
            const id = request.params.id
            const {pickupid,dropid,kms} = request.body
            const query = {
                text:  'UPDATE distance SET pickupid= $1 ,dropid =$2,kms=$3 WHERE id = $4 RETURNING *',
                values : [pickupid,dropid,kms,id]
            }
            console.log("query:",query)
            if(Math.abs(kms)<100){
                returnreply.send({error})
            }
            try {
                const {rows} = await client.query(query)
                console.log(rows)
                reply.code(200).send(rows)
              
            } catch (err) {
                throw new Error(err)
            }
        } )
        fastify.post('/tones/ins', {schema: addtones}, async function(request, reply) {
            const {id,weight} = request.body
            const done = false
           console.log(request.body);
            const query = {
                text: `INSERT INTO tones (id,weight)
                        VALUES($1,$2) RETURNING *`,
                values: [id,weight]
                }
                console.log("query :",query);
            try {
                const {rows} = await client.query(query)
                console.log(rows[0])
                
                reply.code(200).send(rows)
              
                //return {created: true}
            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
            
        })


        fastify.get('/tonesby', {}, async function (request, reply) {
            try {
                const {rows} = await client.query('SELECT * FROM tones ORDER BY id ASC')
                console.log(rows)
                reply.send(rows)
            } catch(err) {
                throw new Error(err)
            }
        })
        fastify.put('/updatetones/:id',{schema: updateweight}, async function (request, reply) {
            const id = request.params.id
            const {weight} = request.body
            const query = {
                text:  'UPDATE tones SET weight= $1 WHERE id = $2 RETURNING *',
                values : [weight,id]
            }
            console.log("query:",query)
            try {
                const {rows} = await client.query(query)
                console.log(rows)
                reply.code(200).send(rows)
              
            } catch (err) {
                throw new Error(err)
            }
        } )


        fastify.delete('/deletetones/:id', {schema: deletetonesid}, async function(request, reply) {
            console.log(request.params)
            try {
                const {rows} = await client.query('DELETE FROM tones WHERE id = $1 RETURNING *', [request.params.id])
                console.log(rows[0])
                reply.code(200).send("successfully deleted")
                
            } catch(err) {
                throw new Error(err)
            }
        })
        fastify.post('/transaction', {schema: addtruck}, async function(request, reply) {
            const {id,weight,length,amount} = request.body
            const done = false
           console.log(request.body);
            const query = {
                text: `INSERT INTO transaction (id,weight,length,amount)
                        VALUES($1,$2,$3,$4) RETURNING *`,
                values: [id,weight,length,amount]
                }
                console.log("query :",query);
            try {
                const {rows} = await client.query(query)
                console.log(rows[0])
                
                reply.code(200).send(rows)
              
                //return {created: true}
            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
            
        })
        fastify.put('/totalcalucation/:id',{schema:addbyid}, async function  (request, reply) {
        
            try{
                //console.log($1);debugger
                const {rows} = await client.query('UPDATE transaction SET percentage=  total * 50 / 100 WHERE id = $1;', [request.params.id])
                    console.log(rows)
    
                    reply.send(rows)
            } catch(err) {
                    throw new Error(err)
                }
            })
    

        fastify.put('/updatetruck/:id',{schema: updatetruck}, async function (request, reply) {
            const id = request.params.id
            const {length,amount} = request.body
            const query = {
                text:  'UPDATE transaction SET length= $1 amount =$3 WHERE id = $2 RETURNING *',
                values : [length,id,amount]
            }
            console.log("query:",query)
            try {
                const {rows} = await client.query(query)
                console.log(rows)
                reply.code(200).send(rows)
              
            } catch (err) {
                throw new Error(err)
            }
        } )

        fastify.get('/truckby', {}, async function (request, reply) {
            try {
                const {rows} = await client.query('SELECT * FROM transaction ORDER BY id ASC')
                console.log(rows)
                reply.send(rows)
            } catch(err) {
                throw new Error(err)
            }
        })


        fastify.post('/booking', {schema: addbooking}, async function(request, reply) {
            const {cus_id,pickupid,dropid,weight,length,advance} = request.body
            const done = false
            
            const total = request.body.total
           console.log(request.body);
            const query = {
                text: `INSERT INTO bookings(cus_id,pickupid,dropid,weight,length)
                        VALUES($1,$2,$3,$4,$5) RETURNING *`,
                values: [cus_id,pickupid,dropid,weight,length]
                }
                console.log("query :",query);
                if(pickupid==dropid){
                    return reply.send({error:'pickup and drop same change the location'})

                }
                    
                if(advance !=null)
                {

                }
                else{
                    return reply.send({error:'advance'})}
                
                // if(place=place){
                //     return reply.send({error:'place'})
                // }

            //     {
            //     let amount = 0;
            //    let baseamount=1000
            //  let distance=500
            //  amount=baseamount+(distance*10)
            //   console.log("amount:"+amount)
            //     }
            //     if( advance >amount *0.5)
            //     return reply.send({error:'advance'})
            //     // if(Math.abs(pickupid-dropid)<100){
            //     //     returnreply.send({error})
            //     // }
                
            try {
                const {rows} = await client.query(query)
                console.log(rows[0])
                
                reply.code(200).send(rows)
              
                //return {created: true}
            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
            
        })


        fastify.put('/updatebooking/:id',{schema: updatebooking}, async function (request, reply) {
            const id = request.params.id
            const {cus_id,pickupid,dropid,length,advance,weight} = request.body
            const query = {
                text:  'UPDATE bookings SET cus_id= $1 pickupid =$3,dropid =$4,length=$5,advance=$6,weight=$7 WHERE id = $2 RETURNING *',
                values : [cus_id,pickupid,dropid,length,advance,weight]
            }
            console.log("query:",query)
            try {
                const {rows} = await client.query(query)
                console.log(rows)
                reply.code(200).send(rows)
              
            } catch (err) {
                throw new Error(err)
            }
        } )
        fastify.get('/list', {}, async function (request, reply) {
            try {
                const {rows} = await client.query('select length,weightid from transaction')
                console.log(rows)
                reply.send(rows)
            } catch(err) {
                throw new Error(err)
            }
        })
        fastify.get('/list1', {}, async function (request, reply) {
            try {
                const {rows} = await client.query(' SELECT distance.kms, tones.weightid, transaction.length, distance.kms * transaction.amount  as amount FROM distance JOIN tones ON distance.id = tones.id  JOIN transaction ON distance.id = transaction.id;   ')
                console.log(rows)
                reply.send(rows)
            } catch(err) {
                throw new Error(err)
            }
        })

        fastify.get('/sampledata', {}, async function (request, reply) {
            try {
                const {rows} = await client.query(' select u.weightid,ta.length,ta.amount from tones as u left join transaction as ta on u.id = ta.id  ')
                console.log(rows)
                reply.send(rows)
            } catch(err) {
                throw new Error(err)
            }
        })

        fastify.get('/sampledata1', {}, async function (request, reply) {
            try {
                const {rows} = await client.query(' select u.place,ta.pickupid,ta.dropid,ta.kms from place as u left join distance as ta on u.id=ta.id ')
                console.log(rows)
                reply.send(rows)
            } catch(err) {
                throw new Error(err)
            }
        })


        fastify.get('/drop', {}, async function (request, reply) {
            try {
                const {rows} = await client.query(' SELECT u.dropid,ta.place from distance as u left join place as ta on u.id=ta.id  ')
                console.log(rows)
                reply.send(rows)
            } catch(err) {
                throw new Error(err)
            }
        })
        fastify.get('/1', {}, async function (request, reply) {
            try {
                const {rows} = await client.query(' select u.id ,u.kms,ta.id,p.length,p.amount,p.total from distance as u left join tones as ta on u.id = ta.id  left join transaction as p on ta.id =p.id  ')
                console.log(rows)
                reply.send(rows)
            } catch(err) {
                throw new Error(err)
            }
        })
      

          
        // db.all = await client.query("SELECT distance.id, distance.kms, tones.weightid, transaction.amount ,transaction.length FROM distance JOIN tones ON distance.id = tones.id JOIN transaction ON transaction.id = tones.id ", function (err, rows) {
        //         rows.forEach(function (row) {
        //       const amount = row.kms * row.weightid * row.amount;
        //       console.log("The amount for id " + row.id + " is " + amount);
        //     });
        //   });



        fastify.post('/booking1', {schema: addbooking1}, async function(request, reply) {
            const {id,cus_id,pickupid,dropid,weight,length,advance} = request.body
            const done = false
            
            const total = request.body.total
           console.log(request.body);
            const query = {
                text: `INSERT INTO bookings(id,cus_id,pickupid,dropid,weight,length)
                        VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
                values: [id,cus_id,pickupid,dropid,weight,length]
                }
                console.log("query :",query);
                if(pickupid==dropid){
                    return reply.send({error:'pickup and drop same change the location'})

                }

                if(advance=advance){
                    return reply.send({error:'advance'})}
                // if(place=place){
                //     return reply.send({error:'place'})
                // }

            //     {
            //     let amount = 0;
            //    let baseamount=1000
            //  let distance=500
            //  amount=baseamount+(distance*10)
            //   console.log("amount:"+amount)
            //     }
            //     if( advance >amount *0.5)
            //     return reply.send({error:'advance'})
            //     // if(Math.abs(pickupid-dropid)<100){
            //     //     returnreply.send({error})
            //     // }
                
            try {
                const {rows} = await client.query(query)
                console.log(rows[0])
                
                reply.code(200).send(rows)
              
                //return {created: true}
            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
            
        })

          
        
}
    module.exports= routes