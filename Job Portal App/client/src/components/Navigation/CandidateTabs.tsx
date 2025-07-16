import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type CandidateTabsProps = {
  activeTab: "jobs" | "companies";
  onTabChange: (tab: "jobs" | "companies") => void;
};

export default function CandidateTabs({
  activeTab,
  onTabChange,
}: CandidateTabsProps) {
  const onValueChange = (val: string) => {
    if (val === "jobs" || val === "companies") {
      onTabChange(val);
    }
  };
  return (
    <div className="">
      <Tabs
        value={activeTab}
        onValueChange={onValueChange}
        defaultValue="jobs"
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs">
          {/* Render job listings with filters here */}
          <div className="mt-4">{/* JobList component or logic */}</div>
        </TabsContent>

        <TabsContent value="companies">
          {/* Render company search and listings here */}
          <div className="mt-4">{/* CompanyList component or logic */}</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
