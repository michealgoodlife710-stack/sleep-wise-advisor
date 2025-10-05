import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, Moon, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Animated particles */}
      <div className="absolute inset-0 -z-10 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 blur-2xl opacity-50 bg-secondary rounded-full" />
              <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20">
                <Moon className="w-16 h-16 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            SleepSense
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Brain className="w-5 h-5 text-secondary" />
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              Rule-Based Sleep Hygiene Advisor
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Get personalized, evidence-based sleep hygiene recommendations powered by an explainable
            AI system. Understand exactly why each tip matters for your sleep quality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={() => navigate("/assessment")}
              className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-6 rounded-xl group"
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Start Assessment
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm text-lg px-8 py-6 rounded-xl"
            >
              How It Works
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-white/70 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span>18 Evidence-Based Rules</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span>Explainable Recommendations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span>Privacy-First Design</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60 text-center"
        >
          <div className="text-sm mb-2">Learn More</div>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full mx-auto relative">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-white/60 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
