import { useState } from "react";
import { Folder, FileCode, FileText, Settings, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileExplorerProps {
  onFileSelect: (filename: string) => void;
  selectedFile: string;
}

interface FileNode {
  name: string;
  type: "folder" | "file";
  children?: FileNode[];
  path?: string;
  icon?: "docker" | "github" | "code" | "text" | "settings";
}

const fileTree: FileNode[] = [
  {
    name: "backend",
    type: "folder",
    children: [
      { name: "package.json", type: "file", path: "backend/package.json", icon: "code" },
      { name: "server.js", type: "file", path: "backend/server.js", icon: "code" },
      { name: "Dockerfile", type: "file", path: "backend/Dockerfile", icon: "docker" },
    ],
  },
  {
    name: "frontend",
    type: "folder",
    children: [
      { name: "package.json", type: "file", path: "frontend/package.json", icon: "code" },
      { name: "vite.config.js", type: "file", path: "frontend/vite.config.js", icon: "code" },
      { name: "index.html", type: "file", path: "frontend/index.html", icon: "text" },
      { name: "Dockerfile", type: "file", path: "frontend/Dockerfile", icon: "docker" },
      {
        name: "src",
        type: "folder",
        children: [
          { name: "App.jsx", type: "file", path: "frontend/src/App.jsx", icon: "code" },
          { name: "main.jsx", type: "file", path: "frontend/src/main.jsx", icon: "code" },
        ],
      },
    ],
  },
  {
    name: ".github",
    type: "folder",
    children: [
      {
        name: "workflows",
        type: "folder",
        children: [
          { name: "ci-cd.yml", type: "file", path: ".github/workflows/ci-cd.yml", icon: "github" },
        ],
      },
    ],
  },
  { name: "docker-compose.yml", type: "file", path: "docker-compose.yml", icon: "docker" },
  { name: "README.md", type: "file", path: "README.md", icon: "text" },
];

const getIcon = (node: FileNode, isOpen?: boolean) => {
  if (node.type === "folder") {
    return isOpen ? (
      <ChevronDown className="h-4 w-4 text-muted-foreground" />
    ) : (
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    );
  }
  
  switch (node.icon) {
    case "docker":
      return <FileCode className="h-4 w-4 text-docker" />;
    case "github":
      return <Settings className="h-4 w-4 text-github" />;
    case "text":
      return <FileText className="h-4 w-4 text-primary" />;
    default:
      return <FileCode className="h-4 w-4 text-muted-foreground" />;
  }
};

const FileNode = ({ 
  node, 
  depth = 0, 
  onFileSelect, 
  selectedFile 
}: { 
  node: FileNode; 
  depth?: number; 
  onFileSelect: (filename: string) => void;
  selectedFile: string;
}) => {
  const [isOpen, setIsOpen] = useState(depth < 2);

  const handleClick = () => {
    if (node.type === "folder") {
      setIsOpen(!isOpen);
    } else if (node.path) {
      onFileSelect(node.path);
    }
  };

  const isSelected = node.path === selectedFile;

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors text-left",
          isSelected 
            ? "bg-primary/10 text-primary" 
            : "hover:bg-muted text-muted-foreground hover:text-foreground"
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {node.type === "folder" && getIcon(node, isOpen)}
        {node.type === "folder" ? (
          <Folder className={cn("h-4 w-4", isOpen ? "text-primary" : "text-muted-foreground")} />
        ) : (
          getIcon(node)
        )}
        <span>{node.name}</span>
      </button>
      
      {node.type === "folder" && isOpen && node.children && (
        <div className="animate-slide-in">
          {node.children.map((child, index) => (
            <FileNode
              key={index}
              node={child}
              depth={depth + 1}
              onFileSelect={onFileSelect}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorer = ({ onFileSelect, selectedFile }: FileExplorerProps) => {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-2">
          <Folder className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">autodeploy-hub</span>
        </div>
      </div>
      <div className="p-2 max-h-[500px] overflow-y-auto">
        {fileTree.map((node, index) => (
          <FileNode
            key={index}
            node={node}
            onFileSelect={onFileSelect}
            selectedFile={selectedFile}
          />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
