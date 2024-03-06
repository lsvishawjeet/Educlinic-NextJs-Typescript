"use server"

import mongoose, { Schema, model, models , Document } from "mongoose"


export interface IOrg extends Document {
    _id: string,
    orgname:string,
    orgemail:string,
    orgcategory:string,
    servicecategory:string,
    orgphone:string,
    orgservice:[
        {
            _id: string,
        }
    ]
}


const OrgSchema = new Schema({
    orgname:{
        type:String,
    },
    orgemail:{
        type:String,
    },
    orgcategory:{
        type:String,
    },
    servicecategory:{
        type:String,
    },
    orgLogo:{
        type:String
    },
    orgphone:{
        type:String,
    },
    orgservice:[
        {
            type: Schema.Types.ObjectId , ref:'Service',
        }
    ]
    
});


const Org = models.Org || model("Org" , OrgSchema);

export default Org;
