import { motion } from 'framer-motion';
import { Check, Upload, Brain, FileText } from 'lucide-react';

interface InteractiveProgressProps {
  currentStep: 'hero' | 'upload' | 'results';
  isAnalyzing: boolean;
}

export const InteractiveProgress = ({ currentStep, isAnalyzing }: InteractiveProgressProps) => {
  const steps = [
    { key: 'upload', label: 'Upload Resume', icon: Upload },
    { key: 'analyze', label: 'AI Analysis', icon: Brain },
    { key: 'results', label: 'View Results', icon: FileText }
  ];

  const getStepStatus = (stepKey: string) => {
    if (stepKey === 'upload') return 'completed';
    if (stepKey === 'analyze') {
      if (isAnalyzing) return 'active';
      if (currentStep === 'results') return 'completed';
      return 'upcoming';
    }
    if (stepKey === 'results') {
      return currentStep === 'results' ? 'completed' : 'upcoming';
    }
    return 'upcoming';
  };

  if (currentStep === 'upload' || currentStep === 'results') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: "0%" }}
              animate={{ 
                width: currentStep === 'results' ? "100%" : isAnalyzing ? "50%" : "33%" 
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          {steps.map((step, index) => {
            const status = getStepStatus(step.key);
            const Icon = step.icon;

            return (
              <div key={step.key} className="flex flex-col items-center relative z-10">
                {/* Step Circle */}
                <motion.div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    status === 'completed'
                      ? 'bg-primary border-primary text-primary-foreground'
                      : status === 'active'
                      ? 'bg-background border-primary text-primary animate-pulse'
                      : 'bg-background border-muted text-muted-foreground'
                  }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {status === 'completed' ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : status === 'active' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </motion.div>

                {/* Step Label */}
                <motion.p
                  className={`mt-3 text-sm font-medium transition-colors ${
                    status === 'completed' || status === 'active'
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.1 }}
                >
                  {step.label}
                </motion.p>

                {/* Active Step Animation */}
                {status === 'active' && (
                  <motion.div
                    className="absolute -inset-2 rounded-full border border-primary/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};