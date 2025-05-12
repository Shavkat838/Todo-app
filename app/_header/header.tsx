"use client"

import useTodoStore from "@/store/todoStore";
import { useUser } from "@clerk/nextjs";

import { FiPlus } from "react-icons/fi";
import { UserButton } from "@clerk/nextjs";


export default function Header() {
 const { setOpen,filter } = useTodoStore();
 const {user}=useUser()

 
  return (
    <div className="max-[1180px] h-[80px]   flex  justify-between items-center">
            <div className="max-w-[100px] sm:hidden w-full h-[50px] flex items-center gap-[10px] px-[10px] rounded-[10px]" >
              <div className="w-[50px] h-[50px]  rounded-full flex items-center justify-center">
                {user&& (
                  < UserButton  />
                )}
              </div>
            </div>
      <div className="max-w-[154px] w-full h-[64px] flex flex-col justify-center">
        <span className=" text-[22px] sm:text-[28px] font-bold text-white ">{filter}</span>
        <div className="max-w-[112px] w-full h-[8px] bg-white rounded-[10px] "></div>
      </div>
      <div
        onClick={() => setOpen()}
        className="max-w-[44px] cursor-pointer w-full shadow-[20px]  h-[44px] rounded-full border-2 border-[#1F1F1F]  flex items-center justify-center"
      >
        <FiPlus size={26} color="grey" />
      </div>
    </div>
  );
}
