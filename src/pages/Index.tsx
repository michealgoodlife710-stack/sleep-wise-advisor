import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, Heart, Brain, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      
      {/* Medical Disclaimer */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 border-2 border-warning/20 bg-card">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-warning flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-3">Medical Disclaimer</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      SleepSense provides general sleep hygiene recommendations based on established
                      scientific principles. This tool is for educational purposes only and does not
                      provide medical advice, diagnosis, or treatment.
                    </p>
                    <p>
                      If you have persistent sleep problems, medical conditions, or concerns about
                      your sleep health, please consult a qualified healthcare professional. Do not
                      use this tool as a substitute for professional medical care.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* About the System */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About the System
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn how our rule-based expert system works
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 h-full card-elevated">
                <Brain className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Forward-Chaining Engine</h3>
                <p className="text-muted-foreground mb-4">
                  Our system uses a data-driven approach where facts (your answers) trigger rules
                  that produce recommendations. This mimics how human experts reason from
                  observations to conclusions.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                    <span>18 evidence-based rules derived from sleep science research</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                    <span>Priority-weighted recommendations (1-10 scale)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                    <span>Confidence scoring based on rule strength and match quality</span>
                  </li>
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 h-full card-elevated">
                <FileText className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Explainable AI</h3>
                <p className="text-muted-foreground mb-4">
                  Unlike "black box" machine learning models, our rule-based system provides complete
                  transparency. You can see exactly which rules fired and why.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2" />
                    <span>Each recommendation shows fired rule IDs (e.g., R3, R5)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2" />
                    <span>Detailed explanations reference your specific inputs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2" />
                    <span>Full audit trail available for download (JSON export)</span>
                  </li>
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 h-full card-elevated">
                <Heart className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-4">Evidence-Based</h3>
                <p className="text-muted-foreground">
                  All recommendations are grounded in peer-reviewed sleep research and clinical
                  guidelines from organizations like the American Academy of Sleep Medicine and
                  National Sleep Foundation.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-8 h-full card-elevated">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Privacy-First</h3>
                <p className="text-muted-foreground">
                  Your assessment data never leaves your device. All processing happens locally in
                  your browser using JavaScript. No accounts, no tracking, no data collection.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            SleepSense • Rule-Based Sleep Hygiene Advisor
          </p>
          <p className="text-xs text-muted-foreground">
            Built with React, TypeScript, and Framer Motion • Powered by forward-chaining inference
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
