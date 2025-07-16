import CandidateTabs from "@/components/Navigation/CandidateTabs";
import { useState } from "react";
import JobSection from "./JobSection";

import CompanySection from "./CompanySection";

const FindJob = () => {
  const [activeTab, setActiveTab] = useState<"jobs" | "companies">("jobs");

  return (
    <div className="w-full flex flex-col justify-center items-center mt-5">
      <CandidateTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "jobs" && <JobSection />}
      {activeTab === "companies" && <CompanySection />}
    </div>
  );
};

export default FindJob;
