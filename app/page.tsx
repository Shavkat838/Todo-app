export const dynamic = "force-dynamic";
import prisma from "@/lib/db";
import Header from "./_header/header";

import Modal from "./Components/Modal";
import Body, { Todo } from "./Components/Body";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
    return;
  }

  const data: Todo[] = await prisma.todos.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="max-w-[1220px] w-full px-[16px] min-h-screen border-2 pt-1 border-[#1F1F1F] rounded-[15px] bg-neutral-900">
      <Header />
      <Body body={data} />
      <Modal />
    </div>
  );
}
