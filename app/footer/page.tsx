'use client'

import useTodoStore from "@/store/todoStore"
import { IoMdHome } from "react-icons/io"

export default function FooterPage() {
   const {setFilter,filter}=useTodoStore()
  return (
    <div className="max-w-[400px] w-full fixed px-[5px]  bg-neutral-800 z-50 bottom-0 flex gap-[10px]  sm:hidden  ">
      <span
        onClick={() => setFilter("ALL")}
        className={`max-w-[200px]  ${
          filter === "ALL" ? "" : ""
        } group cursor-pointer h-[50px] w-full  flex items-center justify-center`}
      >
        <span className="text-[white] text-[14px] group-hover:text-white ">
          All tasks
        </span>
      </span>
      <span
        onClick={() => setFilter("IMPORTANT")}
        className={`max-w-[200px]  ${
          filter === "IMPORTANT" ? "" : ""
        } group cursor-pointer h-[50px] w-full  flex items-center justify-center`}
      >
        <span className="text-[white] text-[14px] group-hover:text-white ">
          Important
        </span>
      </span>
      <span
        onClick={() => setFilter("COMPLATED")}
        className={`max-w-[200px]  ${
          filter === "COMPLATED" ? "" : ""
        } group cursor-pointer h-[50px] w-full  flex items-center justify-center`}
      >
        <span className="text-[white] text-[14px] group-hover:text-white ">
          Completed
        </span>
      </span>
      <span
        onClick={() => setFilter("NOW")}
        className={`max-w-[200px]  ${
          filter === "NOW" ? "" : ""
        } group cursor-pointer h-[50px] w-full  flex items-center justify-center`}
      >
        <span className="text-[white] text-[14px] group-hover:text-white ">
          Do it now
        </span>
      </span>
    </div>
  );
}
