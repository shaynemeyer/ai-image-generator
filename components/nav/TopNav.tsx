import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LaptopMinimal, LogIn } from "lucide-react";
import { Toaster } from "../ui/toaster";
import { currentUser } from "@clerk/nextjs/server";
import { ModeToggle } from "./ModeToggle";
import Credits from "./Credits";

async function TopNav() {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-between p-5 shadow">
      <div className="text-2xl font-bold">
        <Link href="/">
          <Image src="images/logo.svg" alt="logo" width={50} height={50} />
        </Link>
      </div>

      <div className="flex flex-row gap-2">
        {user && (
          <Link href="/dashboard">
            <LaptopMinimal className="h-10 w-10 text-primary" />
          </Link>
        )}

        {user && (
          <div>
            <Link href="/buy-credits">
              <Credits />
            </Link>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <SignedOut>
          <SignInButton>
            <LogIn className="h-10 w-10 text-primary cursor-pointer" />
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Toaster />
        <ModeToggle />
      </div>
    </div>
  );
}
export default TopNav;
