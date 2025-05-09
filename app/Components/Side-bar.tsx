"use client"
import useTodoStore from "@/store/todoStore";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { BiTimeFive } from "react-icons/bi";
import { HiMiniCheck } from "react-icons/hi2";
import { IoMdHome } from "react-icons/io";
import { RiMenu2Fill } from "react-icons/ri";


export default function SideBar() {
  const {filter,setFilter}=useTodoStore()
  const {user}=useUser()
  return (
    <div className="max-w-[256px] min-h-auto border-2 border-[#1F1F1F] rounded-[15px] bg-neutral-900  flex flex-col items-center pt-[40px] w-full">
      <div className="max-w-[200px] w-full h-[70px] flex items-center gap-[10px] px-[10px]  bg-neutral-800 rounded-[10px]" >
        <div className="w-[50px] h-[50px]  rounded-full border">
          {user?.imageUrl && (
            <Image
              className="rounded-full"
              src={user?.imageUrl}
              alt="photo"
              width={70}
              height={70}
            />
          )}
        </div>
        <span className="text-white text-[25px] font-semibold">
          {user?.firstName}
        </span>
      </div>
      <div className="max-w-[256px] w-full h-[300px] flex flex-col  mt-[200px] ">
        <div
          onClick={() => setFilter("ALL")}
          className={`max-w-[2560px]  ${
            filter === "ALL" ? "bg-[#2C2C2C]" : ""
          } group cursor-pointer h-[50px] w-full  flex items-center justify-center`}
        >
          <div className="max-w-[200px] h-[50px] w-full flex items-center gap-[20px]  ">
            <IoMdHome
              className="group-hover:text-white text-[#8c8a8a]  !important"
              size={24}
            />
            <span className="text-[#8c8a8a] text-[20px] group-hover:text-white ">
              All tasks
            </span>
          </div>
        </div>
        <div
          onClick={() => setFilter("IMPORTANT")}
          className={`max-w-[2560px]  ${
            filter === "IMPORTANT" ? "bg-[#2C2C2C]" : ""
          } group cursor-pointer h-[50px] w-full  flex items-center justify-center`}
        >
          <div className="max-w-[200px] h-[50px] w-full flex items-center gap-[20px]  ">
            <RiMenu2Fill
              className="group-hover:text-white text-[#8c8a8a]  !important"
              size={24}
            />
            <span className="text-[#8c8a8a] text-[20px] group-hover:text-white ">
              Important!
            </span>
          </div>
        </div>
        <div
          onClick={() => setFilter("COMPLETED")}
          className={`max-w-[2560px]  ${
            filter === "COMPLETED" ? "bg-[#2C2C2C]" : ""
          } group cursor-pointer h-[50px] w-full  flex items-center justify-center`}
        >
          <div className="max-w-[200px] h-[50px] w-full flex items-center gap-[20px]  ">
            <HiMiniCheck
              className="group-hover:text-white text-[#8c8a8a]  !important"
              size={24}
            />
            <span className="text-[#8c8a8a] text-[20px] group-hover:text-white ">
              Completed
            </span>
          </div>
        </div>
        <div
          onClick={() => setFilter("NOW")}
          className={`max-w-[2560px]  ${
            filter === "NOW" ? "bg-[#2C2C2C]" : ""
          } group cursor-pointer h-[50px] w-full  flex items-center justify-center`}
        >
          <div className="max-w-[200px] h-[50px] w-full flex items-center gap-[20px]  ">
            <BiTimeFive
              className="group-hover:text-white text-[#8c8a8a]  !important"
              size={24}
            />
            <span className="text-[#8c8a8a] text-[20px] group-hover:text-white ">
              Do it now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
