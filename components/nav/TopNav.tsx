import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Bot, LaptopMinimal, LogIn } from "lucide-react";
import { Toaster } from "../ui/toaster";
import { currentUser } from "@clerk/nextjs/server";
import { ModeToggle } from "./ModeToggle";
import Credits from "./Credits";
import IconWithText from "../icons/IconWithText";

async function TopNav() {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-center space-x-10 p-5 shadow">
      <div className="flex items-center overflow-x-auto space-x-4 md:space-x-10">
        <div className="flex flex-col items-center cursor-pointer">
          <Link href="/">
            <Image src="images/logo.svg" alt="logo" width={50} height={50} />
          </Link>
          <span className="text-xs text-gray-500 mt-1 cursor-pointer hidden sm:inline-block">
            AI Image Generator
          </span>
        </div>
        {user && (
          <IconWithText
            href="/dashboard"
            icon={LaptopMinimal}
            text="Dashboard"
          />
        )}
        {user && <IconWithText href="/chat" icon={Bot} text="Chat" />}
        {user && (
          <div className="flex flex-col items-center cursor-pointer">
            <Link href="/buy-credits">
              <Credits />
            </Link>
            <span className="text-xs text-gray-500 mt-1 cursor-pointer">
              Credits
            </span>
          </div>
        )}
        <div className="flex flex-col items-center cursor-pointer">
          <SignedOut>
            <SignInButton>
              <LogIn className="h-10 w-10 text-primary cursor-pointer" />
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex justify-center h-10 w-10">
              <UserButton />
            </div>
          </SignedIn>
          <span className="text-xs text-gray-500 mt-1 cursor-pointer">
            Account
          </span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <ModeToggle />
          <span className="text-xs text-gray-500 mt-1 cursor-pointer">
            Theme
          </span>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
export default TopNav;
