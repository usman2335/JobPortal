import { cn } from "@/lib/utils";

type StepIndicatorProps = {
  steps: string[];
  currentStep: number; // 0-based
};

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="flex items-center justify-between w-full mb-1">
      {steps.flatMap((label, index) => {
        const isLast = index === steps.length - 1;

        return [
          // Step circle + label
          <div
            key={`step-${index}`}
            className={cn(
              "flex flex-col items-center",
              index === 0 && "ml-20", // left space for first step
              index === steps.length - 1 && "mr-20" // right space for last step
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border text-sm font-semibold",
                index === currentStep
                  ? "bg-primary text-white border-primary"
                  : index < currentStep
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-2 text-center text-muted-foreground">
              {label}
            </span>
          </div>,

          // Line connector (except after the last step)
          !isLast && (
            <div
              key={`line-${index}`}
              className="h-0.5 bg-border flex-1 mx-2 relative bottom-2"
            />
          ),
        ];
      })}
    </div>
  );
};
