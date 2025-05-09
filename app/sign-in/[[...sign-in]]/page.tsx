import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="max-w-full w-full min-h-screen flex items-center justify-center">
      <SignIn />
    </div>
  );
}
