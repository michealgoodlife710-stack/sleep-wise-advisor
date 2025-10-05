import {
  AssessmentInput,
  AnalysisResult,
  Recommendation,
  FiredRule,
} from "@/types/assessment";
import { RULES } from "./rules";

/**
 * Forward-chaining inference engine
 * Evaluates all rules against input facts, tracks fired rules,
 * deduplicates recommendations, and prioritizes output
 */
export class InferenceEngine {
  /**
   * Run inference on assessment input
   */
  public analyze(input: AssessmentInput): AnalysisResult {
    const startTime = performance.now();

    // Track fired rules with metadata
    const firedRules: FiredRule[] = [];
    const recommendationMap = new Map<string, {
      recommendation: string;
      priority: number;
      firedRuleIds: string[];
      explanations: string[];
      conditionsMatched: number[];
    }>();

    // Forward-chaining: evaluate all rules
    for (const rule of RULES) {
      try {
        const conditionsMatched = this.countConditionsMatched(rule.condition, input);
        
        if (rule.condition(input)) {
          // Rule fired
          firedRules.push({
            ruleId: rule.id,
            priority: rule.priority,
            conditionsMatched,
          });

          // Get or create recommendation entry
          const existing = recommendationMap.get(rule.recommendation);
          if (existing) {
            // Deduplicate: merge fired rules
            existing.firedRuleIds.push(rule.id);
            existing.explanations.push(rule.explanation(input));
            existing.conditionsMatched.push(conditionsMatched);
            // Keep highest priority
            existing.priority = Math.max(existing.priority, rule.priority);
          } else {
            // New recommendation
            recommendationMap.set(rule.recommendation, {
              recommendation: rule.recommendation,
              priority: rule.priority,
              firedRuleIds: [rule.id],
              explanations: [rule.explanation(input)],
              conditionsMatched: [conditionsMatched],
            });
          }
        }
      } catch (error) {
        console.error(`Error evaluating rule ${rule.id}:`, error);
      }
    }

    // Convert map to recommendations array with confidence scores
    const recommendations: Recommendation[] = Array.from(recommendationMap.values()).map(
      (item, index) => {
        const avgConditionsMatched = item.conditionsMatched.reduce((a, b) => a + b, 0) / item.conditionsMatched.length;
        const confidence = this.calculateConfidence(item.priority, avgConditionsMatched);
        const category = this.getPriorityCategory(item.priority);

        return {
          id: `REC-${index + 1}`,
          text: item.recommendation,
          priority: item.priority,
          confidence,
          firedRules: item.firedRuleIds,
          explanation: item.explanations[0], // Use first explanation as primary
          category,
        };
      }
    );

    // Sort by priority (descending), then by rule ID
    recommendations.sort((a, b) => {
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }
      return a.firedRules[0].localeCompare(b.firedRules[0]);
    });

    const endTime = performance.now();
    const inferenceTimeMs = Math.round((endTime - startTime) * 100) / 100;

    return {
      recommendations,
      firedRules,
      meta: {
        inferenceTimeMs,
        totalRulesEvaluated: RULES.length,
        rulesMatched: firedRules.length,
      },
    };
  }

  /**
   * Calculate confidence score for a recommendation
   * Formula: min(1.0, 0.5 + 0.05 * priority + 0.1 * conditionsMatched)
   */
  private calculateConfidence(priority: number, conditionsMatched: number): number {
    const confidence = 0.5 + 0.05 * priority + 0.1 * conditionsMatched;
    return Math.min(1.0, Math.round(confidence * 100) / 100);
  }

  /**
   * Approximate count of conditions matched in a rule
   * This is a heuristic based on the rule's condition complexity
   */
  private countConditionsMatched(
    condition: (input: AssessmentInput) => boolean,
    input: AssessmentInput
  ): number {
    // Parse the condition function to count AND/OR conditions
    const conditionStr = condition.toString();
    const andCount = (conditionStr.match(/&&/g) || []).length + 1;
    const orCount = (conditionStr.match(/\|\|/g) || []).length;
    
    // Simple heuristic: count unique condition checks
    return Math.max(1, andCount + Math.floor(orCount / 2));
  }

  /**
   * Categorize priority into human-readable levels
   */
  private getPriorityCategory(priority: number): "critical" | "high" | "medium" | "low" {
    if (priority >= 9) return "critical";
    if (priority >= 7) return "high";
    if (priority >= 5) return "medium";
    return "low";
  }

  /**
   * Get top N priority recommendations
   */
  public getTopPriority(result: AnalysisResult, n: number = 3): Recommendation[] {
    return result.recommendations.slice(0, n);
  }

  /**
   * Export result as JSON for download
   */
  public exportAsJSON(input: AssessmentInput, result: AnalysisResult): string {
    return JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        input,
        analysis: result,
      },
      null,
      2
    );
  }
}

// Singleton instance
export const inferenceEngine = new InferenceEngine();
