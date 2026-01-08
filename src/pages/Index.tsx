import { useState } from "react";
import { Box, GitBranch, Server, Zap, FileCode } from "lucide-react";
import Header from "@/components/Header";
import FileExplorer from "@/components/FileExplorer";
import CodeBlock from "@/components/CodeBlock";
import HealthDemo from "@/components/HealthDemo";
import ConceptCard from "@/components/ConceptCard";
import PipelineVisualization from "@/components/PipelineVisualization";
import FolderStructure from "@/components/FolderStructure";
import { projectFiles } from "@/data/projectFiles";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState("backend/server.js");

  const currentFile = projectFiles[selectedFile as keyof typeof projectFiles];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6 animate-fade-in">
            <Zap className="h-4 w-4" />
            Beginner-Friendly CI/CD Demo
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            <span className="text-gradient">AutoDeploy</span>{" "}
            <span className="text-foreground">Hub</span>
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in">
            Learn CI/CD with Docker and GitHub Actions through a complete, 
            working example. Perfect for college projects!
          </p>
        </div>

        {/* Concept Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <ConceptCard
            icon={<Server className="h-5 w-5" />}
            title="Full-Stack App"
            description="React frontend + Express backend working together"
            color="green"
          />
          <ConceptCard
            icon={<Box className="h-5 w-5" />}
            title="Docker Containers"
            description="Package your apps for consistent deployment anywhere"
            color="blue"
          />
          <ConceptCard
            icon={<GitBranch className="h-5 w-5" />}
            title="GitHub Actions"
            description="Automate builds and deployments on every push"
            color="purple"
          />
        </div>

        {/* Pipeline Visualization */}
        <PipelineVisualization />
      </section>

      {/* File Explorer Section */}
      <section className="container mx-auto px-4 py-12 border-t border-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-secondary rounded-lg">
            <FileCode className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Project Files</h2>
            <p className="text-muted-foreground">Click any file to view its code</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* File Explorer */}
          <div className="lg:col-span-4">
            <FileExplorer 
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile}
            />
          </div>
          
          {/* Code Viewer */}
          <div className="lg:col-span-8">
            <CodeBlock
              filename={selectedFile}
              language={currentFile.language}
              code={currentFile.code}
            />
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="container mx-auto px-4 py-12 border-t border-border">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">You push code to GitHub</p>
                  <p className="text-sm">Any commit to the main branch triggers the pipeline</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-docker/10 flex items-center justify-center text-docker font-bold text-sm">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Docker builds containers</p>
                  <p className="text-sm">Your app is packaged into portable containers</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-github/10 flex items-center justify-center text-github font-bold text-sm">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">GitHub Actions runs tests</p>
                  <p className="text-sm">Automated tests verify everything works</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  4
                </div>
                <div>
                  <p className="font-medium text-foreground">App is deployed!</p>
                  <p className="text-sm">Your changes go live automatically</p>
                </div>
              </div>
            </div>
          </div>
          
          <HealthDemo />
        </div>
      </section>

      {/* Folder Structure Overview */}
      <section className="container mx-auto px-4 py-12 border-t border-border">
        <h2 className="text-2xl font-bold mb-6">Complete Project Structure</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <FolderStructure />
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4">Quick Start Commands</h3>
            <div className="space-y-4 font-mono text-sm">
              <div>
                <p className="text-muted-foreground mb-1"># Clone and run with Docker</p>
                <code className="text-primary">docker-compose up --build</code>
              </div>
              <div>
                <p className="text-muted-foreground mb-1"># Access your app</p>
                <code className="text-docker">Frontend: http://localhost:3000</code>
                <br />
                <code className="text-success">Backend: http://localhost:5000</code>
              </div>
              <div>
                <p className="text-muted-foreground mb-1"># Stop services</p>
                <code className="text-primary">docker-compose down</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border text-center text-muted-foreground">
        <p className="text-sm">
          AutoDeploy Hub – A beginner-friendly CI/CD learning project 🚀
        </p>
      </footer>
    </div>
  );
};

export default Index;
