import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceAssistantProps {
  onUpload?: (file: File) => void;
  currentStep: 'hero' | 'upload' | 'results';
}

export const VoiceAssistant = ({ onUpload, currentStep }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { toast } = useToast();

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Speech recognition not supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Speak your command now"
      });
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript.toLowerCase();
      setTranscript(text);
      handleVoiceCommand(text);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      toast({
        title: "Speech recognition error",
        description: "Please try again",
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleVoiceCommand = (command: string) => {
    if (command.includes('upload') || command.includes('analyze') || command.includes('resume')) {
      speakResponse("Please click on the upload area or drag and drop your resume file.");
    } else if (command.includes('help') || command.includes('how')) {
      speakResponse("I can help you upload and analyze your resume. Just say 'upload resume' or click the microphone button for assistance.");
    } else if (command.includes('score') || command.includes('result')) {
      if (currentStep === 'results') {
        speakResponse("Your resume analysis is complete. Check the detailed breakdown on the screen.");
      } else {
        speakResponse("Please upload your resume first to see the analysis results.");
      }
    } else {
      speakResponse("I didn't understand that command. Try saying 'upload resume' or 'help'.");
    }
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      <div className="flex flex-col items-start gap-2">
        {/* Voice Controls */}
        <div className="flex gap-2">
          <Button
            onClick={() => isListening ? null : startListening()}
            disabled={isListening}
            className={`w-12 h-12 rounded-full shadow-glow transition-all duration-300 ${
              isListening 
                ? 'bg-destructive hover:bg-destructive/90 animate-pulse' 
                : 'bg-accent hover:bg-accent/90'
            }`}
            size="sm"
          >
            <AnimatePresence mode="wait">
              {isListening ? (
                <motion.div
                  key="recording"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <MicOff className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="mic"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Mic className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          {isSpeaking && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Button
                onClick={stopSpeaking}
                className="w-12 h-12 rounded-full bg-warning hover:bg-warning/90 shadow-glow"
                size="sm"
              >
                <VolumeX className="w-5 h-5" />
              </Button>
            </motion.div>
          )}
        </div>

        {/* Status Badges */}
        <AnimatePresence>
          {(isListening || isSpeaking) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex gap-2"
            >
              {isListening && (
                <Badge variant="destructive" className="animate-pulse">
                  Listening...
                </Badge>
              )}
              {isSpeaking && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Volume2 className="w-3 h-3" />
                  Speaking
                </Badge>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transcript */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-64"
            >
              <Card className="bg-card/95 backdrop-blur-sm border-accent/20">
                <CardContent className="p-3">
                  <p className="text-sm text-muted-foreground mb-1">You said:</p>
                  <p className="text-sm font-medium">"{transcript}"</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};