import { Github, Rocket, Box } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg glow-green">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AutoDeploy Hub</h1>
              <p className="text-xs text-muted-foreground">CI/CD Demo Project</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <Box className="h-4 w-4 text-docker" />
              <span>Docker</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <Github className="h-4 w-4 text-github" />
              <span>Actions</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
