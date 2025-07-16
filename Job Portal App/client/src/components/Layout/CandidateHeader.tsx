import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/authStore";
import { UserDropdown } from "../Navigation/UserDropdown";
import { CandidateNavMenu } from "../Navigation/CandidateNavMenu";

interface CandidateHeaderProps {
  title: string;
}
export function CandidateHeader({ title }: CandidateHeaderProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full justify-between items-center gap-1 px-4 lg:gap-2 lg:px-10 mb-2">
        <h1 className="text-base font-medium">{title}</h1>
        <CandidateNavMenu></CandidateNavMenu>
        <div className="flex items-center gap-2 ">
          {user && <UserDropdown user={user}></UserDropdown>}
        </div>
      </div>
    </header>
  );
}
