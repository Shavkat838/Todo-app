"use client";

import useTodoStore from "@/store/todoStore";
import { useUser } from "@clerk/nextjs";

import { FiPlus } from "react-icons/fi";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";



export default  function Header() {
  const { setOpen, filter,} = useTodoStore();
  const { user } = useUser();
  useEffect(()=>{
    if(!user){
      redirect("/sign-in")
    }
  },[user])



  return (
    <div className="max-[1180px] h-[80px]    flex  justify-between items-center">
      <div className="max-w-[100px] sm:hidden w-full h-[50px] flex items-center gap-[10px] px-[10px] rounded-[10px]">
        <div className="w-[50px] h-[50px]  rounded-full flex items-center justify-center">
          {user && <UserButton />}
        </div>
      </div>
      <div className="max-w-[154px] w-full h-[64px] flex flex-col justify-center">
        <span className=" text-[22px] sm:text-[28px] font-bold text-white ">
          {filter}
        </span>
        <div className="max-w-[112px] w-full h-[8px] bg-white rounded-[10px]  "></div>
      </div>
      {/* <div className="max-w-[64px] sm:ml-[740px] bg-white  w-full h-[60x] border rounded-full flex items-center justify-between   ">
        <MdDarkMode
        onClick={()=>updateMode("TUN")}
          size={24}
          className={` ${
            ismode === "TUN" ? "bg-[#0c699f]" : ""
          }  cursor-pointer w-[30px] rounded-full `}
        />
        <LuSunDim
        onClick={()=>updateMode("KUN")}
          size={24}
          className={`${
            ismode === "KUN" ? "bg-[#0c699f]" : ""
          } w-[30px] cursor-pointer rounded-full `}
        />
      </div> */}
      <div
        onClick={() => setOpen()}
        className="max-w-[44px] cursor-pointer   w-full shadow-[20px]  h-[44px] rounded-full border-2 border-[#1F1F1F]  flex items-center justify-center"
      >
        <FiPlus size={26} color="grey" />
      </div>
    </div>
  );
}
