import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Separator } from "../ui/separator";
import Navlist from "./nav-list";
import { LucideMenu } from "lucide-react";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle cursor-pointer rounded-md p-2 hover:bg-gray-100">
          <LucideMenu />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <SheetTitle />
          <SheetDescription />
          <img src="/images/logo.png" alt="logo" width={128} height={38} />
          <Separator className="border border-gray-50" />
          <Navlist />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
