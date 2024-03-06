"use server"

import { registerOrgParams , LoginOrgparams } from "@/types";
import connectToDatabase from "../db";
import Org from "../db/models/org.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import exp from "constants";
import { existsSync } from "fs";

//  CREATING SERVER ACTION FOR REGISTERING THE ORGANIZATION 

export const registerorg = async  ({org} : registerOrgParams)=>{
    try {
        await connectToDatabase();
        const existOrg = await Org.findOne({orgemail:org.orgemail});
        if(existOrg){
            return JSON.parse(JSON.stringify({message:"Organization already registerd with this email address , try another email addrerss"}));
        }
        const hashPass = await bcrypt.hash(org.orgpassword , 10);
        const registeredOrg = await Org.create({...org , orgpassword:hashPass});
        if(!registeredOrg){
            return JSON.parse(JSON.stringify({message:"Some error while registering check your registering data , might be you are passing data which is not accetable"}));
        }
        return JSON.parse(JSON.stringify({registeredOrg}));
    } catch (error) {
        console.log(error);
        
    }
}



//  CREATING SERVER ACTION FOR LOGIN ORGANIZATION


export const Loginorg = async ({email , password} : LoginOrgparams)=>{
        try {
            await connectToDatabase();
            const Existuser = await Org.findOne({orgemail:email});
            if(!Existuser){
                return JSON.parse(JSON.stringify({message:"Email address is not registered"}));
            }
            const isMatch = await bcrypt.compare(password , Existuser.orgpassword);
            if(!isMatch){
                return JSON.parse(JSON.stringify({message:"Invalid password"}));
            }
            const token = jwt.sign({id:Existuser._id} , "x-auth-token-secure-key");
            return JSON.parse(JSON.stringify({...Existuser._doc , token}));
        } catch (error) {
            console.log(error);
            
        }
}