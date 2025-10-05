/**
 * Assessment input types matching the exact specification
 */
export interface AssessmentInput {
  bedtime_consistent: "yes" | "no";
  sleep_duration: number;
  caffeine_after_3pm: "yes" | "no";
  alcohol_before_bed: "yes" | "no";
  late_screen_time: number;
  daytime_nap_minutes: number;
  exercise_within_3hrs_of_bed: "yes" | "no";
  noise_level: "low" | "medium" | "high";
  light_level: "dark" | "dim" | "bright";
  stress_level: "low" | "medium" | "high";
  room_temperature: number;
  uses_bed_for_work: "yes" | "no";
  medical_issues: "none" | "insomnia" | "sleep_apnea" | "other";
}

/**
 * Rule definition structure
 */
export interface Rule {
  id: string;
  priority: number;
  condition: (input: AssessmentInput) => boolean;
  recommendation: string;
  explanation: (input: AssessmentInput) => string;
}

/**
 * Fired rule information
 */
export interface FiredRule {
  ruleId: string;
  priority: number;
  conditionsMatched: number;
}

/**
 * Recommendation with explainability
 */
export interface Recommendation {
  id: string;
  text: string;
  priority: number;
  confidence: number;
  firedRules: string[];
  explanation: string;
  category: "critical" | "high" | "medium" | "low";
}

/**
 * Analysis result
 */
export interface AnalysisResult {
  recommendations: Recommendation[];
  firedRules: FiredRule[];
  meta: {
    inferenceTimeMs: number;
    totalRulesEvaluated: number;
    rulesMatched: number;
  };
}

/**
 * Assessment run for persistence
 */
export interface AssessmentRun {
  id: string;
  timestamp: string;
  input: AssessmentInput;
  output: AnalysisResult;
}
