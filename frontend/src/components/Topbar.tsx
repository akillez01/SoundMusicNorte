import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { useAuthStore } from "../stores/useAuthStore";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { buttonVariants } from "./ui/button";

// Resto do código...

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  console.log({ isAdmin });

  return (
    <div
      className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10
    '
    >
      <div className='flex gap-2 items-center'>
        <img src='/guitar.png' className='size-8' alt='Musinorte logo' />
        SoundMusiNorte
      </div>
      <div className='flex items-center gap-4'>
        {isAdmin && (
          <Link to={"/admin"} className={cn(buttonVariants({ variant: "outline" }))}>
            <LayoutDashboardIcon className='size-4  mr-2' />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};
export default Topbar;