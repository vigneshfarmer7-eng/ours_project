import { GitBranch, Box, CheckCircle, Rocket, ArrowRight } from "lucide-react";

const steps = [
  { icon: GitBranch, label: "Push Code", color: "text-github" },
  { icon: Box, label: "Build Containers", color: "text-docker" },
  { icon: CheckCircle, label: "Run Tests", color: "text-primary" },
  { icon: Rocket, label: "Deploy", color: "text-primary" },
];

const PipelineVisualization = () => {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-6 text-center">CI/CD Pipeline Flow</h3>
      
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className={`p-3 bg-secondary rounded-xl ${step.color}`}>
                <step.icon className="h-6 w-6" />
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground text-center whitespace-nowrap">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="h-5 w-5 text-muted-foreground hidden sm:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineVisualization;
