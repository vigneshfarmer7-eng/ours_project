import { useState } from "react";
import { Activity, CheckCircle, Loader2, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

const HealthDemo = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ status: string; message: string; time?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // Real API call to backend
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/health`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Health check failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Server className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Live Demo</h3>
          <p className="text-sm text-muted-foreground">Test the /health endpoint</p>
        </div>
      </div>

      <Button
        onClick={checkHealth}
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Checking Health...
          </>
        ) : (
          <>
            <Activity className="h-4 w-4 mr-2" />
            Check Backend Health
          </>
        )}
      </Button>

      {error && (
        <div className="animate-fade-in p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-destructive">Error</span>
          </div>
          <p className="text-sm text-muted-foreground">{error}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Make sure the backend is running on port 5000
          </p>
        </div>
      )}

      {result && (
        <div className="animate-fade-in p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <span className="font-medium text-success">Response Received</span>
          </div>
          <pre className="font-mono text-sm text-muted-foreground bg-background/50 rounded p-3">
            {`{
  "status": "${result.status}",
  "message": "${result.message}"${result.time ? `,\n  "time": "${result.time}"` : ''}
}`}
          </pre>
        </div>
      )}
    </div>
  );
};

export default HealthDemo;
