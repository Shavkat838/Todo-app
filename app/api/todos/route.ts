import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";





export async function  GET(_request:NextRequest){
    const user=await currentUser()
    if(!user){
        return NextResponse.json("Siz tizimga kirmagansiz")
    }
    try {
         const todos= await prisma.todos.findMany({
            where:{
                userId:user.id
            }
         })
         return NextResponse.json(todos,{status:200})
    } catch (error) {
        return new NextResponse("Internal server error")
    }
     
}

 export  async function  POST(request:NextRequest){
   
    try {
        const {title,description,isCompleted,isImportant,date,userId}=await request.json()
         const formattedDate = new Date(date);
         const data=await prisma.todos.create({
        data:{
          title,
          description,
          isCompleted,
          isImportant,
          date:formattedDate,
          userId
        }
        })
        return NextResponse.json(data,{status:201})
    } catch (error) {
        return new NextResponse(`Internal server Error! ${error}`,{status:500})
    }
}