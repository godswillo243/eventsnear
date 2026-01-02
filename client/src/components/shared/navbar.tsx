import { Link } from "react-router-dom";
import MobileNav from "./mobile-sidebar";
import Navlist from "./nav-list";
import { cn } from "@/lib/utils";
import { useAuthStore, type AuthState } from "@/store/auth-store";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideLogOut } from "lucide-react";
import { signOutUser } from "@/actions/auth.actions";

export function AvatarDropDown({ user }: { user: AuthState["user"] }) {
  if (!user) return;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button asChild className="rounded-full">
          <Avatar className="size-8 ">
            <AvatarImage src={user.photoURL} />

            <AvatarFallback className="p-medium-18">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 space-y-2 p-regular-14 text-muted-foreground"
        align="start"
      >
        <DropdownMenuGroup className="space-y-2 *:p-2 *:cursor-pointer">
          <DropdownMenuItem className="" asChild>
            <Link to={"/profile"}>Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <Button
            variant={"ghost"}
            className="w-full py-0! h-fit! p-regular-14! text-muted-foreground"
            onClick={() => {
              signOutUser().then(() => useAuthStore.setState({ user: null }));
            }}
          >
            <LucideLogOut />
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Navbar = () => {
  const { user } = useAuthStore();

  console.log(user);

  return (
    <nav
      className={cn(
        "w-full py-4 px-8 max-sm:px-4 max-sm:py-2 flex items-center justify-between bg-background/80 backdrop-blur-md",
        "sticky top-0 left-0 z-50 shadow-2xs "
      )}
    >
      <Link to="/" className="">
        <img
          src="/images/logo.png"
          alt="EventsNear Logo"
          width={120}
          height={40}
          style={{ objectFit: "contain" }}
        />
      </Link>
      <div className="max-md:hidden">
        <Navlist />
      </div>
      <div className="flex items-center">
        <MobileNav />
        {user ? (
          <>
            <AvatarDropDown user={user} />
          </>
        ) : (
          <Link to="/sign-in" className="btn btn-primary">
            <Button className="rounded-full">Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
