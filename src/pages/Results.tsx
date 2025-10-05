import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Download,
  RefreshCw,
  CheckCircle,
  Clock,
  FileJson,
  AlertCircle,
} from "lucide-react";
import { AnalysisResult, AssessmentInput } from "@/types/assessment";
import { RecommendationCard } from "@/components/RecommendationCard";
import { inferenceEngine } from "@/lib/inference-engine";
import { toast } from "sonner";

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [input, setInput] = useState<AssessmentInput | null>(null);

  useEffect(() => {
    // Load results from sessionStorage
    const storedResult = sessionStorage.getItem("assessmentResult");
    const storedInput = sessionStorage.getItem("assessmentInput");

    if (!storedResult || !storedInput) {
      toast.error("No assessment found", {
        description: "Please complete the assessment first.",
      });
      navigate("/assessment");
      return;
    }

    try {
      setResult(JSON.parse(storedResult));
      setInput(JSON.parse(storedInput));
    } catch (error) {
      console.error("Failed to parse results:", error);
      navigate("/assessment");
    }
  }, [navigate]);

  const handleDownloadJSON = () => {
    if (!result || !input) return;

    const jsonData = inferenceEngine.exportAsJSON(input, result);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sleepsense-analysis-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Downloaded!", {
      description: "Your analysis has been saved as JSON.",
    });
  };

  const handleCopyToClipboard = () => {
    if (!result || !input) return;

    const jsonData = inferenceEngine.exportAsJSON(input, result);
    navigator.clipboard.writeText(jsonData);

    toast.success("Copied to clipboard!", {
      description: "Your analysis is ready to share.",
    });
  };

  if (!result || !input) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading results...</div>
      </div>
    );
  }

  const topPriority = inferenceEngine.getTopPriority(result, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Sleep Analysis</h1>
              <p className="text-muted-foreground">
                Personalized recommendations based on your sleep habits
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("/assessment")}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retake
              </Button>
              <Button variant="outline" onClick={handleCopyToClipboard}>
                <FileJson className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button onClick={handleDownloadJSON}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-4 mb-8"
        >
          <Card className="p-6 card-elevated">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{result.recommendations.length}</p>
                <p className="text-sm text-muted-foreground">Recommendations</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 card-elevated">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{result.meta.rulesMatched}</p>
                <p className="text-sm text-muted-foreground">Rules Matched</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 card-elevated">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{result.meta.inferenceTimeMs}ms</p>
                <p className="text-sm text-muted-foreground">Analysis Time</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Top Priority Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6 md:p-8 card-elevated bg-gradient-to-br from-primary/5 to-secondary/5">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              What to Change First
            </h2>
            <p className="text-muted-foreground mb-6">
              Focus on these top {topPriority.length} high-impact changes for immediate sleep quality improvement
            </p>
            <div className="space-y-3">
              {topPriority.map((rec, index) => (
                <div
                  key={rec.id}
                  className="flex items-start gap-3 p-4 bg-background rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{rec.text}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Priority: {rec.priority}/10 • Confidence: {Math.round(rec.confidence * 100)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Medical Disclaimer */}
        {result.recommendations.some((r) => r.firedRules.includes("R13")) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Card className="p-6 border-warning bg-warning/5">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">Medical Attention Required</h3>
                  <p className="text-sm text-muted-foreground">
                    You've indicated a medical sleep condition. While these recommendations may help,
                    they cannot replace professional medical care. Please consult a healthcare provider
                    for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* All Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6">All Recommendations</h2>
          <div className="space-y-4">
            {result.recommendations.map((recommendation, index) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Explainability Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="p-6 md:p-8 card-elevated">
            <h2 className="text-xl font-bold mb-4">Understanding Your Analysis</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Forward-Chaining Inference:</strong> Our system evaluated{" "}
                {result.meta.totalRulesEvaluated} evidence-based rules against your sleep habits. {result.meta.rulesMatched}{" "}
                rules matched your profile, generating {result.recommendations.length} unique recommendations.
              </p>
              <p>
                <strong className="text-foreground">Explainability:</strong> Each recommendation shows which
                rules fired (e.g., R3, R5) and explains exactly why it applies to you. This transparency
                allows you to understand and trust the advice.
              </p>
              <p>
                <strong className="text-foreground">Confidence Score:</strong> Calculated based on rule
                priority and the number of conditions matched. Higher scores indicate stronger evidence
                that this change will benefit your sleep.
              </p>
              <p className="text-xs pt-2 border-t border-border">
                Analysis completed in {result.meta.inferenceTimeMs}ms • {new Date().toLocaleString()}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
