import { Rule, AssessmentInput } from "@/types/assessment";

/**
 * Complete rule knowledge base with 18 rules
 * Each rule includes priority (1-10), condition logic, recommendation, and explanation
 */
export const RULES: Rule[] = [
  {
    id: "R1",
    priority: 9,
    condition: (input: AssessmentInput) => input.bedtime_consistent === "no",
    recommendation: "Try going to bed and waking up at the same time every day (±30 minutes).",
    explanation: (input: AssessmentInput) =>
      `Your irregular bedtime schedule disrupts your circadian rhythm. Consistency is key for quality sleep.`,
  },
  {
    id: "R2",
    priority: 10,
    condition: (input: AssessmentInput) => input.sleep_duration < 7,
    recommendation: "Aim for 7–9 hours of sleep nightly.",
    explanation: (input: AssessmentInput) =>
      `You're currently getting ${input.sleep_duration} hours of sleep, which is below the recommended 7-9 hours for optimal health and cognitive function.`,
  },
  {
    id: "R3",
    priority: 8,
    condition: (input: AssessmentInput) => input.caffeine_after_3pm === "yes",
    recommendation: "Avoid caffeine after 3 PM; switch to decaf in the afternoon.",
    explanation: (input: AssessmentInput) =>
      `Caffeine has a half-life of 5-6 hours. Consuming it after 3 PM can significantly interfere with your ability to fall asleep.`,
  },
  {
    id: "R4",
    priority: 7,
    condition: (input: AssessmentInput) => input.alcohol_before_bed === "yes",
    recommendation: "Avoid alcohol within 3 hours of bedtime — it fragments sleep.",
    explanation: (input: AssessmentInput) =>
      `While alcohol may help you fall asleep initially, it disrupts REM sleep and causes fragmented, poor-quality sleep later in the night.`,
  },
  {
    id: "R5",
    priority: 8,
    condition: (input: AssessmentInput) => input.late_screen_time >= 60,
    recommendation: "Stop using screens at least 60 minutes before bed or use blue-light filters.",
    explanation: (input: AssessmentInput) =>
      `You're using screens ${input.late_screen_time} minutes before bed. Blue light from screens suppresses melatonin production, making it harder to fall asleep.`,
  },
  {
    id: "R6",
    priority: 7,
    condition: (input: AssessmentInput) => input.daytime_nap_minutes >= 45,
    recommendation: "Limit naps to 20–30 minutes and avoid late-afternoon naps.",
    explanation: (input: AssessmentInput) =>
      `Your ${input.daytime_nap_minutes}-minute naps may be reducing your sleep drive. Long naps can interfere with nighttime sleep quality.`,
  },
  {
    id: "R7",
    priority: 6,
    condition: (input: AssessmentInput) => input.exercise_within_3hrs_of_bed === "yes",
    recommendation: "Finish vigorous exercise at least 3 hours before bedtime.",
    explanation: (input: AssessmentInput) =>
      `Exercise raises body temperature and adrenaline levels. Your body needs time to cool down and relax before sleep.`,
  },
  {
    id: "R8",
    priority: 8,
    condition: (input: AssessmentInput) => input.noise_level === "high",
    recommendation: "Use earplugs or white noise to reduce disruptive sounds.",
    explanation: (input: AssessmentInput) =>
      `High noise levels can prevent you from reaching deep sleep stages and cause frequent awakenings throughout the night.`,
  },
  {
    id: "R9",
    priority: 8,
    condition: (input: AssessmentInput) => input.light_level === "bright",
    recommendation: "Make the bedroom dark; blackout curtains or eye masks help.",
    explanation: (input: AssessmentInput) =>
      `Bright light in your bedroom suppresses melatonin production. Darkness signals your brain that it's time to sleep.`,
  },
  {
    id: "R10",
    priority: 9,
    condition: (input: AssessmentInput) => input.stress_level === "high",
    recommendation: "Practice relaxation (deep breathing, progressive muscle relaxation) before bed.",
    explanation: (input: AssessmentInput) =>
      `High stress levels activate your fight-or-flight response, making it difficult to relax and fall asleep. Relaxation techniques can help calm your nervous system.`,
  },
  {
    id: "R11",
    priority: 7,
    condition: (input: AssessmentInput) => input.room_temperature > 24,
    recommendation: "Keep bedroom temperature between 16–20°C for better sleep.",
    explanation: (input: AssessmentInput) =>
      `Your room temperature of ${input.room_temperature}°C is too warm. Core body temperature needs to drop for sleep onset. The ideal sleep temperature is 16-20°C.`,
  },
  {
    id: "R12",
    priority: 6,
    condition: (input: AssessmentInput) => input.uses_bed_for_work === "yes",
    recommendation: "Use the bed only for sleep and intimacy; avoid working in bed.",
    explanation: (input: AssessmentInput) =>
      `Using your bed for work creates a mental association between your bed and alertness, making it harder to relax and sleep there.`,
  },
  {
    id: "R13",
    priority: 10,
    condition: (input: AssessmentInput) =>
      input.medical_issues === "sleep_apnea" || input.medical_issues === "insomnia",
    recommendation: "Consult a healthcare professional for diagnosis and treatment options.",
    explanation: (input: AssessmentInput) =>
      `You've indicated ${input.medical_issues === "sleep_apnea" ? "sleep apnea" : "insomnia"}, which requires professional medical evaluation and treatment. This app provides general advice but cannot replace medical care.`,
  },
  {
    id: "R14",
    priority: 6,
    condition: (input: AssessmentInput) =>
      input.bedtime_consistent === "no" && input.light_level !== "dark",
    recommendation: "Increase daytime bright light exposure and dim lights in the evening.",
    explanation: (input: AssessmentInput) =>
      `Your inconsistent schedule combined with improper light exposure is confusing your circadian rhythm. Bright light during the day and dim light in evening helps regulate your sleep-wake cycle.`,
  },
  {
    id: "R15",
    priority: 9,
    condition: (input: AssessmentInput) =>
      input.late_screen_time >= 60 && input.caffeine_after_3pm === "yes",
    recommendation:
      "Both screen exposure and late caffeine are harming your sleep — avoid both in the evening.",
    explanation: (input: AssessmentInput) =>
      `You have two major sleep disruptors working against you: screens ${input.late_screen_time} minutes before bed AND afternoon caffeine. Eliminating both will significantly improve your sleep quality.`,
  },
  {
    id: "R16",
    priority: 9,
    condition: (input: AssessmentInput) =>
      input.sleep_duration < 6 && input.stress_level === "high",
    recommendation:
      "Combine sleep extension strategies with stress management and consider counseling if persistent.",
    explanation: (input: AssessmentInput) =>
      `You're only getting ${input.sleep_duration} hours of sleep and experiencing high stress. This creates a vicious cycle: stress prevents sleep, and lack of sleep increases stress. Professional support may be beneficial.`,
  },
  {
    id: "R17",
    priority: 8,
    condition: (input: AssessmentInput) =>
      input.daytime_nap_minutes >= 45 && input.sleep_duration < 7,
    recommendation:
      "Reduce long naps; improving night sleep should reduce daytime sleepiness.",
    explanation: (input: AssessmentInput) =>
      `Your ${input.daytime_nap_minutes}-minute naps are likely compensating for only ${input.sleep_duration} hours of night sleep. This creates a cycle where naps reduce nighttime sleep drive.`,
  },
  {
    id: "R18",
    priority: 8,
    condition: (input: AssessmentInput) =>
      input.noise_level === "high" ||
      input.light_level === "bright" ||
      input.room_temperature > 24,
    recommendation: "Address bedroom environment: optimize noise, light, and temperature.",
    explanation: (input: AssessmentInput) => {
      const issues: string[] = [];
      if (input.noise_level === "high") issues.push("high noise");
      if (input.light_level === "bright") issues.push("bright light");
      if (input.room_temperature > 24) issues.push(`warm temperature (${input.room_temperature}°C)`);
      return `Your bedroom environment has suboptimal conditions: ${issues.join(", ")}. Creating an ideal sleep environment is fundamental to good sleep hygiene.`;
    },
  },
];

/**
 * Get rule by ID
 */
export function getRuleById(id: string): Rule | undefined {
  return RULES.find((rule) => rule.id === id);
}

/**
 * Get all rule IDs
 */
export function getAllRuleIds(): string[] {
  return RULES.map((rule) => rule.id);
}
