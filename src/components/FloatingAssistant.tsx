import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Zap, Brain, Target, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FloatingAssistantProps {
  currentStep: 'hero' | 'upload' | 'results';
}

export const FloatingAssistant = ({ currentStep }: FloatingAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getContextualTips = () => {
    switch (currentStep) {
      case 'hero':
        return [
          { icon: Brain, text: "AI analysis takes only 30 seconds", color: "text-primary" },
          { icon: Target, text: "Works with PDF, DOC, and DOCX files", color: "text-accent" },
          { icon: Zap, text: "No signup required - completely free", color: "text-warning" }
        ];
      case 'upload':
        return [
          { icon: Brain, text: "Drag & drop your resume file here", color: "text-primary" },
          { icon: Target, text: "Files are processed securely and not stored", color: "text-accent" },
          { icon: Zap, text: "Analysis will begin automatically", color: "text-warning" }
        ];
      case 'results':
        return [
          { icon: Brain, text: "Focus on the lowest-scoring sections first", color: "text-primary" },
          { icon: Target, text: "Use the recommendations to improve your resume", color: "text-accent" },
          { icon: Zap, text: "You can analyze another resume anytime", color: "text-warning" }
        ];
    }
  };

  const tips = getContextualTips();

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-glow bg-primary hover:bg-primary/90 text-primary-foreground"
          size="sm"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-80"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="shadow-glow border-primary/20 bg-card/95 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`p-1.5 rounded-md bg-background ${tip.color}`}>
                      <tip.icon className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tip.text}
                    </p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};