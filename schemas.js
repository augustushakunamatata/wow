   
    const addcustomer = {
        response: {
            201: {
        body: {
    
            type: 'object',
            required: ['cus_id','name','password','address','mobile_number'],
            properties: {
                cus_id: {type: 'integer'},
                address:{type:'string'},
                mobile_number:{type:'integer'},
                password:{type:'string'},
                name:{type:'string'},
                
            }
        }
    }
        }
    
    }

    const updatecustomer = {
        body: {
            type: 'object',
            properties: {
                name: {type: 'string'},
                address: {type: 'string'},
                mobile_number:{type:'integer'},
                password:{type:'string'}
                
            }
        },
        params: {
            type: 'object',
            properties: {
              cus_id: { type: 'integer'}
            }
        }
    }
    const deleteid = {
    
        params: {
            type: 'object',
            properties: {
                cus_id: {type:'integer'}
            }
        }
    }


    const getcustomerbyid = {
    
        params: {
            type: 'object',
            properties: {
                cus_id: {type:'integer'}
            }
        }
    }


     
    const addplace = {
        response: {
            201: {
        body: {
    
            type: 'object',
            required: ['id','place'],
            properties: {
                id: {type: 'integer'},
                place:{type:'string'},
            }
        }
    }
}
    }

    const updateplace = {
        body: {
            type: 'object',
            properties: {
              
                place:{type:'string'}
                
            }
        },
        params: {
            type: 'object',
            properties: {
              id: { type: 'integer'}
            }
        }
    }


    const deleteplace = {
    
        params: {
            type: 'object',
            properties: {
                id: {type:'integer'}
            }
        }
    }

    const adddistance = {
        response: {
            201: {
        body: {
    
            type: 'object',
            required: ['id','pickupid','dropid','kms'],
            properties: {
                id: {type: 'integer'},
                pickupid:{type:'integer'},
                dropid:{type:'integer'},
               
                kms:{type:'integer'},
                
            }
        }
    }
        }
    
    }


    const distanceupdate = {
        body: {
            type: 'object',
            properties: {
              
                pickupid:{type:'integer'},
                dropid:{type:'integer'},
                kms:{type:'integer'}
                
            }
        },
        params: {
            type: 'object',
            properties: {
              id: { type: 'integer'}
            }
        }
    }
    const addtones = {
        response: {
            201: {
        body: {
    
            type: 'object',
            required: ['id','weight'],
            properties: {
                id: {type: 'integer'},
                weight:{type:'integer'},
            }
        }
    }
}
    }



    const updatetruck = {
        body: {
            type: 'object',
            properties: {
              
                length:{type:'integer'},
                amount:{type:'integer'},
                
            }
        },
        params: {
            type: 'object',
            properties: {
              id: { type: 'integer'}
            }
        }
    }

    const deletetonesid = {
    
        params: {
            type: 'object',
            properties: {
                cus_id: {type:'integer'}
            }
        }
    }


    const addtruck = {
        response: {
            201: {
        body: {
    
            type: 'object',
            required: ['id','weight','length','amount'],
            properties: {
                id: {type: 'integer'},
                weight:{type:'integer'},
                length:{type:'integer'},
                amount:{type:'integer'}
            }
        }
    }
}
    }


    const addbooking = {
        response: {
            201: {
        body: {
    
            type: 'object',
            required: ['cus_id','pickupid','dropid','weight','length'],
            properties: {
               // id: {type: 'integer'},
                pickupid:{type:'integer'},
                dropid:{type:'integer'},
                weight:{type:'integer'},
                length:{type:'integer'},
              //  advance:{type:'integer'},
                cus_id:{type:'integer'}
               
              
                
            }
        }
    }
        }
    
    }

    const updatebooking = {
        body: {
            type: 'object',
            properties: {
              
                length:{type:'integer'},
                advance:{type:'integer'},
                cus_id:{type:'integer'},
                dropid:{type:'integer'},
                length:{type:'integer'},
                pickupid:{type:'integer'}
                
            }
        },
        params: {
            type: 'object',
            properties: {
              id: { type: 'integer'}
            }
        }
    }
    
    const  addbyid= {
    
        params: {
            type: 'object',
            properties: {
                id: {type:'integer'}
            }
        }
    }






    const addbooking1 = {
        response: {
            201: {
        body: {
    
            type: 'object',
            required: ['id','cus_id','pickupid','dropid','weight','length'],
            properties: {
                id: {type: 'integer'},
                pickupid:{type:'integer'},
                dropid:{type:'integer'},
                weight:{type:'integer'},
                length:{type:'integer'},
              //  advance:{type:'integer'},
                cus_id:{type:'integer'}
               
              
                
            }
        }
    }
        }
    
    }