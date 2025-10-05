import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AlertCircle, ChevronDown, Sparkles } from "lucide-react";
import { Recommendation } from "@/types/assessment";
import { useState } from "react";

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
}

const priorityConfig = {
  critical: {
    color: "hsl(var(--priority-critical))",
    label: "Critical",
    bgClass: "bg-destructive/10 text-destructive",
  },
  high: {
    color: "hsl(var(--secondary))",
    label: "High Priority",
    bgClass: "bg-secondary/10 text-secondary",
  },
  medium: {
    color: "hsl(var(--warning))",
    label: "Medium",
    bgClass: "bg-warning/10 text-warning",
  },
  low: {
    color: "hsl(var(--priority-low))",
    label: "Low Priority",
    bgClass: "bg-muted text-muted-foreground",
  },
};

export const RecommendationCard = ({ recommendation, index }: RecommendationCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const config = priorityConfig[recommendation.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="p-6 card-elevated hover:shadow-lg transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={config.bgClass}>{config.label}</Badge>
              <div className="flex gap-1">
                {recommendation.firedRules.map((ruleId) => (
                  <Badge key={ruleId} variant="outline" className="text-xs">
                    {ruleId}
                  </Badge>
                ))}
              </div>
            </div>
            <h3 className="text-lg font-semibold leading-tight">{recommendation.text}</h3>
          </div>
          
          {/* Confidence indicator */}
          <div className="flex-shrink-0 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center border-4 font-bold"
              style={{
                borderColor: config.color,
                color: config.color,
              }}
            >
              {Math.round(recommendation.confidence * 100)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Match</p>
          </div>
        </div>

        {/* Collapsible explanation */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between hover:bg-muted/50"
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Why this recommendation?
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <p className="text-sm leading-relaxed">{recommendation.explanation}</p>
              
              <div className="flex items-start gap-2 pt-2 border-t border-border">
                <AlertCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Rules matched:</span>{" "}
                  {recommendation.firedRules.join(", ")} (Priority: {recommendation.priority}/10)
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </motion.div>
  );
};
