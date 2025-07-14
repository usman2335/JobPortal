import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/authStore";
import { UserDropdown } from "../Navigation/UserDropdown";

interface SiteHeaderProps {
  title: string;
}
export function SiteHeader({ title }: SiteHeaderProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center  gap-1 px-4 lg:gap-2 lg:px-6 mb-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2 ">
          {/* <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            user?.fullName
          </Button> */}
          {user && <UserDropdown user={user}></UserDropdown>}
        </div>
      </div>
    </header>
  );
}
