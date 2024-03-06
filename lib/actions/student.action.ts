"use server"

import { StudentRegisterParams, loginStudentParams } from "@/types";
import connectToDatabase from "../db";
import Student from "../db/models/student.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


//  CREATING SERVER ACTION FOR THE REGISTERING THE STUDENT


export const RegisterStudent = async ({student} : StudentRegisterParams ) =>{
    try {
        await connectToDatabase();
        const existUser = await Student.findOne({email:student.email});
        if(existUser){
            return JSON.parse(JSON.stringify({message:"User Already Exist , try with another email address"}));
        }
        const hashPassword = await bcrypt.hash(student.password , 10);
        const registeredStudent = await Student.create({...student , password:hashPassword});
        if(!registeredStudent){
            return JSON.parse(JSON.stringify(registeredStudent));
        }

    } catch (error) {
        console.log(error);
        
    }
}

// CREATING API FOR STUDENT LOGIN 

export const LoginStudent = async  ({email , password}:loginStudentParams)=>{
    try {
        await connectToDatabase();
        const ExistUser = await Student.findOne({email:email});
        if(!ExistUser){
            return JSON.parse(JSON.stringify({message:"Email address not available"}));
        }
        const isMatch = await bcrypt.compare(password , ExistUser.password);
        if(!isMatch){
            return JSON.parse(JSON.stringify({message:"Invalid Password"}));
        }
        const token = jwt.sign({id:ExistUser._id} , "x-auth-token-secure-key");
        return JSON.parse(JSON.stringify({...ExistUser._doc , token}));
    } catch (error) {
        console.log(error);
        
    }
}