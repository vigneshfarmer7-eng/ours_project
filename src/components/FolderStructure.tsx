import { Folder, FileCode, FileText, Settings } from "lucide-react";

const FolderStructure = () => {
  return (
    <div className="code-block animate-fade-in">
      <div className="code-header">
        <div className="flex items-center gap-2">
          <Folder className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Project Structure</span>
        </div>
      </div>
      <div className="code-content font-mono text-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <Folder className="h-4 w-4" />
            <span>autodeploy-hub/</span>
          </div>
          
          <div className="ml-4 space-y-1">
            <div className="flex items-center gap-2 text-docker">
              <Folder className="h-4 w-4" />
              <span>frontend/</span>
            </div>
            <div className="ml-8 space-y-1 text-muted-foreground">
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4" />
                <span>package.json</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4" />
                <span>vite.config.js</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4" />
                <span>Dockerfile</span>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4 text-docker" />
                <span className="text-docker">src/</span>
              </div>
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2">
                  <FileCode className="h-4 w-4" />
                  <span>App.jsx</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCode className="h-4 w-4" />
                  <span>main.jsx</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-success">
              <Folder className="h-4 w-4" />
              <span>backend/</span>
            </div>
            <div className="ml-8 space-y-1 text-muted-foreground">
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4" />
                <span>package.json</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4" />
                <span>server.js</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4" />
                <span>Dockerfile</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-github">
              <Folder className="h-4 w-4" />
              <span>.github/</span>
            </div>
            <div className="ml-8 space-y-1 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4 text-github" />
                <span className="text-github">workflows/</span>
              </div>
              <div className="ml-4 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>ci-cd.yml</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-foreground">
              <Settings className="h-4 w-4 text-docker" />
              <span>docker-compose.yml</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <FileText className="h-4 w-4 text-primary" />
              <span>README.md</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderStructure;
