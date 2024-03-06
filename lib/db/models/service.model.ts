"user server"

import exp from "constants";
import { Schema, model, models } from "mongoose"


const ServiceSchema = new Schema ({
    title:{
        type:String,
    },
    detail:{
        type:String,
    },
    category:{
        type:String,
    },
    thumbnail:{
        type:String,
    },
    isPaid:{
        type: Boolean,
    },
    fees:{
        type:Number,
    },
    expires:{
        type: Date,
    },
    skillIncluded:[
        {
            type:String,
        }
    ],
    owner:{
        type: Schema.Types.ObjectId , ref :'Org',
    }
});


const Service = models.Service || model("Service" , ServiceSchema);

export default Service;
