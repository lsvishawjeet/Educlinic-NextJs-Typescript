


export type StudentRegisterParams  = {
    student:{
        username: string,
        fullname:string
        email:string,
        avatar:string,
        password:string,
        phone:string,
        college:string,
        degree:string,
        futureGoal:string,
        skills?:[],
        expertise:[],
        service?:[]
    }
}

export type loginStudentParams = {
    email:string,
    password:string,
}