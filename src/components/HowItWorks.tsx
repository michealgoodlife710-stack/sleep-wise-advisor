import { motion } from "framer-motion";
import { Brain, CheckCircle, FileText, Sparkles } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Answer Questions",
    description: "Complete a comprehensive assessment about your sleep habits, environment, and lifestyle.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our forward-chaining inference engine evaluates 18 evidence-based rules against your data.",
  },
  {
    icon: Sparkles,
    title: "Get Recommendations",
    description: "Receive prioritized, personalized tips with full explainability of why each matters for you.",
  },
  {
    icon: CheckCircle,
    title: "Track Progress",
    description: "Implement changes and retake the assessment to see improvements in your sleep hygiene.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A transparent, rule-based expert system that explains every recommendation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="card-elevated bg-card p-6 rounded-2xl h-full">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 mt-2">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-2xl p-8 card-elevated">
            <h3 className="text-2xl font-bold mb-6 text-center">Why SleepSense?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Explainable AI",
                  description: "See exactly which rules fired and why each recommendation applies to you.",
                },
                {
                  title: "Evidence-Based",
                  description: "All recommendations are backed by sleep science and clinical research.",
                },
                {
                  title: "Privacy-First",
                  description: "Your data stays local in your browser. No accounts, no tracking.",
                },
                {
                  title: "Actionable Insights",
                  description: "Get a prioritized action plan with clear next steps to improve sleep.",
                },
              ].map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
