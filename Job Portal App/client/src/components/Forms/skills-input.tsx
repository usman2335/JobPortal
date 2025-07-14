import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";

type SkillsInputProps = {
  skills: string[];
  onChange: (skills: string[]) => void;
};

export const SkillsInput = ({ skills, onChange }: SkillsInputProps) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      const newSkill = input.trim();
      if (!skills.includes(newSkill)) {
        onChange([...skills, newSkill]);
      }
      setInput("");
    }
  };

  const removeSkill = (skill: string) => {
    onChange(skills.filter((s) => s !== skill));
  };

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <Badge
            key={idx}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-1 hover:text-red-500"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        placeholder="Type a skill and press Enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
