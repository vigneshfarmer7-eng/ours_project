import { useState } from "react";
import { Check, Copy, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  filename: string;
  language: string;
  code: string;
  icon?: React.ReactNode;
}

const CodeBlock = ({ filename, language, code, icon }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block animate-fade-in">
      <div className="code-header">
        <div className="flex items-center gap-2">
          {icon || <FileCode className="h-4 w-4 text-muted-foreground" />}
          <span className="text-sm font-medium text-foreground">{filename}</span>
          <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded">
            {language}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 px-2 hover:bg-muted"
        >
          {copied ? (
            <Check className="h-4 w-4 text-success" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
      <pre className="code-content text-muted-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
