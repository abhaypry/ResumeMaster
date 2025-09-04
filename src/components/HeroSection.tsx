import { Brain, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              AI-Powered
              <br />
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Resume Analyzer
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Get instant, intelligent feedback on your resume. Powered by advanced AI 
              to help you land your dream job.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 py-8">
            <div className="flex items-center gap-3 text-white/90">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Brain className="w-6 h-6" />
              </div>
              <span className="text-lg font-medium">AI Analysis</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-lg font-medium">Instant Results</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-lg font-medium">Targeted Insights</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="text-xl px-12 py-6 bg-white text-primary hover:bg-white/90 shadow-large hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              Analyze My Resume
            </Button>
          </div>

          {/* Stats */}
          <div className="pt-12">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">10K+</div>
                <div className="text-white/70">Resumes Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">95%</div>
                <div className="text-white/70">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">24/7</div>
                <div className="text-white/70">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};