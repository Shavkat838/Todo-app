import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};



export async function DELETE(_request:NextRequest,{params}:Props){
  const id=(await params).id
  try {
      const data= await prisma.todos.delete({
        where:{
          id:parseInt(id)
        }
       })
       return NextResponse.json(data)
  } catch (error) {
    return new NextResponse(`Internal server error${error}`,{status:500})
  }
}


export async function PUT(request:NextRequest,{params}:Props){
  const id = (await params).id;
  try {
    const obj=await request.json()
    const data=await prisma.todos.update({
      where:{id:parseInt(id)},
        data:obj
    })
    return NextResponse.json(data)
  } catch (error) {
    return new NextResponse(`Internal server Error${error}`,{status:500})
  }
}