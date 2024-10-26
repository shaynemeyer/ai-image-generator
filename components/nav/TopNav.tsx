import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import { Toaster } from "../ui/toaster";

function TopNav() {
  return (
    <div className="flex items-center justify-between p-5 shadow">
      <div className="text-2xl font-bold">
        <Link href="/">
          <Image src="images/logo.svg" alt="logo" width={50} height={50} />
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <SignedOut>
          <SignInButton>
            <LogIn className="h-10 w-10 text-[#6a5acd] cursor-pointer" />
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Toaster />
      </div>
    </div>
  );
}
export default TopNav;
