import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: { id: string };
};



export async function DELETE(request:NextRequest,{params}:Props){
  try {
      const data= await prisma.todos.delete({
        where:{
          id:parseInt(params.id)
        }
       })
       return NextResponse.json(data)
  } catch (error) {
    return new NextResponse(`Internal server error${error}`,{status:500})
  }
}


export async function PUT(request:NextRequest,{params}:Props){
  try {
    const obj=await request.json()
    const data=await prisma.todos.update({
      where:{id:parseInt(params.id)},
        data:obj
    })
    return NextResponse.json(data)
  } catch (error) {
    return new NextResponse(`Internal server Error${error}`,{status:500})
  }
}