"use server"

import mongoose, { Schema, model, models } from "mongoose"


const studentSchema = new Schema({
    username:{
        type:String,
    },
    fullname:{
        type:String,
    },
    avatar:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    phone:{
        type:String,
    },
    degree:{
        type:String,
    },
    college:{
        type:String,
    },
    futureGoal:{
        type:String,
    },
    
    skills:[
        {
            type:String,
        }
    ],
    expertise:[
        {
            type:String,
        }
    ],

    service:[
        {
            module:{
                modulename:{
                    type:String,
                },
                moduledetail:{
                    type:String,
                },
                moduleImage:{
                    type:String,
                }
            }
        }
    ]
});



const Student = models.Student || model("Student" , studentSchema);

export default Student;