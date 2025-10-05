import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Loader2, Moon } from "lucide-react";
import { AssessmentInput } from "@/types/assessment";
import { inferenceEngine } from "@/lib/inference-engine";
import { toast } from "sonner";

const Assessment = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [formData, setFormData] = useState<AssessmentInput>({
    bedtime_consistent: "yes",
    sleep_duration: 7,
    caffeine_after_3pm: "no",
    alcohol_before_bed: "no",
    late_screen_time: 30,
    daytime_nap_minutes: 0,
    exercise_within_3hrs_of_bed: "no",
    noise_level: "low",
    light_level: "dark",
    stress_level: "medium",
    room_temperature: 20,
    uses_bed_for_work: "no",
    medical_issues: "none",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsAnalyzing(true);
    
    // Simulate API delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    try {
      const result = inferenceEngine.analyze(formData);
      
      // Store results in sessionStorage
      sessionStorage.setItem("assessmentInput", JSON.stringify(formData));
      sessionStorage.setItem("assessmentResult", JSON.stringify(result));
      
      toast.success("Analysis complete!", {
        description: `Found ${result.recommendations.length} personalized recommendations`,
      });
      
      navigate("/results");
    } catch (error) {
      toast.error("Analysis failed", {
        description: "Please check your inputs and try again.",
      });
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const updateField = <K extends keyof AssessmentInput>(
    field: K,
    value: AssessmentInput[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
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
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Moon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Sleep Assessment</h1>
              <p className="text-muted-foreground">Tell us about your sleep habits</p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sleep Schedule */}
            <Card className="p-6 card-elevated">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Sleep Schedule
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bedtime_consistent">
                    Do you go to bed at consistent times?
                  </Label>
                  <RadioGroup
                    value={formData.bedtime_consistent}
                    onValueChange={(value) =>
                      updateField("bedtime_consistent", value as "yes" | "no")
                    }
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="bedtime-yes" />
                      <Label htmlFor="bedtime-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="bedtime-no" />
                      <Label htmlFor="bedtime-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="sleep_duration">
                    Average sleep duration (hours): {formData.sleep_duration}h
                  </Label>
                  <Slider
                    id="sleep_duration"
                    min={3}
                    max={12}
                    step={0.5}
                    value={[formData.sleep_duration]}
                    onValueChange={([value]) => updateField("sleep_duration", value)}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Recommended: 7-9 hours
                  </p>
                </div>
              </div>
            </Card>

            {/* Stimulants & Substances */}
            <Card className="p-6 card-elevated">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                Stimulants & Substances
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Do you consume caffeine after 3 PM?</Label>
                  <RadioGroup
                    value={formData.caffeine_after_3pm}
                    onValueChange={(value) =>
                      updateField("caffeine_after_3pm", value as "yes" | "no")
                    }
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="caffeine-yes" />
                      <Label htmlFor="caffeine-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="caffeine-no" />
                      <Label htmlFor="caffeine-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Do you drink alcohol before bed?</Label>
                  <RadioGroup
                    value={formData.alcohol_before_bed}
                    onValueChange={(value) =>
                      updateField("alcohol_before_bed", value as "yes" | "no")
                    }
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="alcohol-yes" />
                      <Label htmlFor="alcohol-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="alcohol-no" />
                      <Label htmlFor="alcohol-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Card>

            {/* Screen Time & Activity */}
            <Card className="p-6 card-elevated">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                Screen Time & Activity
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label>
                    Screen time before bed (minutes): {formData.late_screen_time}min
                  </Label>
                  <Slider
                    min={0}
                    max={180}
                    step={15}
                    value={[formData.late_screen_time]}
                    onValueChange={([value]) => updateField("late_screen_time", value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>
                    Daytime nap duration (minutes): {formData.daytime_nap_minutes}min
                  </Label>
                  <Slider
                    min={0}
                    max={120}
                    step={15}
                    value={[formData.daytime_nap_minutes]}
                    onValueChange={([value]) => updateField("daytime_nap_minutes", value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Do you exercise within 3 hours of bedtime?</Label>
                  <RadioGroup
                    value={formData.exercise_within_3hrs_of_bed}
                    onValueChange={(value) =>
                      updateField("exercise_within_3hrs_of_bed", value as "yes" | "no")
                    }
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="exercise-yes" />
                      <Label htmlFor="exercise-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="exercise-no" />
                      <Label htmlFor="exercise-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Card>

            {/* Sleep Environment */}
            <Card className="p-6 card-elevated">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Sleep Environment
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="noise_level">Bedroom noise level</Label>
                  <Select
                    value={formData.noise_level}
                    onValueChange={(value) =>
                      updateField("noise_level", value as "low" | "medium" | "high")
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (quiet)</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High (noisy)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="light_level">Bedroom light level</Label>
                  <Select
                    value={formData.light_level}
                    onValueChange={(value) =>
                      updateField("light_level", value as "dark" | "dim" | "bright")
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="dim">Dim</SelectItem>
                      <SelectItem value="bright">Bright</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>
                    Room temperature: {formData.room_temperature}°C
                  </Label>
                  <Slider
                    min={14}
                    max={28}
                    step={1}
                    value={[formData.room_temperature]}
                    onValueChange={([value]) => updateField("room_temperature", value)}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Optimal: 16-20°C
                  </p>
                </div>
              </div>
            </Card>

            {/* Stress & Medical */}
            <Card className="p-6 card-elevated">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                Stress & Medical History
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="stress_level">Stress level</Label>
                  <Select
                    value={formData.stress_level}
                    onValueChange={(value) =>
                      updateField("stress_level", value as "low" | "medium" | "high")
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Do you use your bed for work?</Label>
                  <RadioGroup
                    value={formData.uses_bed_for_work}
                    onValueChange={(value) =>
                      updateField("uses_bed_for_work", value as "yes" | "no")
                    }
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="work-yes" />
                      <Label htmlFor="work-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="work-no" />
                      <Label htmlFor="work-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="medical_issues">Sleep-related medical conditions</Label>
                  <Select
                    value={formData.medical_issues}
                    onValueChange={(value) =>
                      updateField(
                        "medical_issues",
                        value as "none" | "insomnia" | "sleep_apnea" | "other"
                      )
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="insomnia">Insomnia</SelectItem>
                      <SelectItem value="sleep_apnea">Sleep Apnea</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {(formData.medical_issues === "insomnia" ||
                    formData.medical_issues === "sleep_apnea") && (
                    <p className="text-sm text-warning mt-2">
                      ⚠️ Please consult a healthcare professional for proper diagnosis and treatment.
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Submit */}
            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                disabled={isAnalyzing}
                className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all text-lg px-8 py-6 rounded-xl"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Get Recommendations
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Assessment;
