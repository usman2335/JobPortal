import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Slider } from "../ui/slider";

export function FilterList({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) {
  // Local filter state
  const [jobType, setJobType] = useState<string[]>([]);
  const [workLocation, setWorkLocation] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState<number[]>([5000]);

  const handleCheckboxChange = (
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const resetFilters = () => {
    setJobType([]);
    setWorkLocation([]);
    setLocation("");
    onFilterChange({});
    setSalary([0]);
  };

  const applyFilters = () => {
    onFilterChange({ jobType, workLocation, location });
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-full">
              <CardTitle>Filters</CardTitle>
              <Button
                variant="ghost"
                onClick={resetFilters}
                className="text-primary p-0 gap-0 border-0"
              >
                Reset All
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* Job Type */}
          <div>
            <Label className="text-sm font-medium">Job Type</Label>
            <div className="space-y-2 mt-2 border-b pb-4">
              {[
                "full-time",
                "part-time",
                "contract",
                "remote",
                "internship",
              ].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`job-${type}`}
                    checked={jobType.includes(type)}
                    onCheckedChange={() =>
                      handleCheckboxChange(type, jobType, setJobType)
                    }
                    className="text-primary"
                  />
                  <Label
                    htmlFor={`job-${type}`}
                    className="capitalize text-muted-foreground"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Work Location */}
          <div>
            <Label className="text-sm font-medium">Work Location</Label>
            <div className="space-y-2 mt-2 border-b pb-4">
              {["remote", "hybrid", "on-site"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`work-${type}`}
                    checked={workLocation.includes(type)}
                    onCheckedChange={() =>
                      handleCheckboxChange(type, workLocation, setWorkLocation)
                    }
                  />
                  <Label
                    htmlFor={`work-${type}`}
                    className="capitalize text-muted-foreground"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Location Input */}
          <div>
            <Label className="text-sm font-medium">Salary</Label>
            <div className="mt-2 space-y-2">
              <Slider
                min={0}
                max={200000}
                step={5000}
                value={salary}
                onValueChange={setSalary}
              />
              <p className="text-muted-foreground text-sm">
                {salary.toLocaleString()} PKR
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
