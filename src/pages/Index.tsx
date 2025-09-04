import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { ResumeUpload } from '@/components/ResumeUpload';
import { AnalysisResults } from '@/components/AnalysisResults';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Mock analysis data - in a real app, this would come from an API
const mockAnalysisData = {
  overallScore: 78,
  sections: [
    {
      name: 'Contact Information',
      score: 95,
      status: 'excellent' as const,
      feedback: 'Complete and professional contact details provided.'
    },
    {
      name: 'Professional Summary',
      score: 72,
      status: 'good' as const,
      feedback: 'Good summary but could be more impactful with specific achievements.'
    },
    {
      name: 'Work Experience',
      score: 85,
      status: 'excellent' as const,
      feedback: 'Well-structured with quantifiable achievements.'
    },
    {
      name: 'Skills',
      score: 68,
      status: 'needs-improvement' as const,
      feedback: 'Skills section needs more specific technical competencies.'
    },
    {
      name: 'Education',
      score: 90,
      status: 'excellent' as const,
      feedback: 'Educational background is clearly presented.'
    }
  ],
  insights: [
    'Your resume demonstrates strong professional experience with measurable achievements.',
    'Contact information is complete and professional.',
    'Work experience section effectively showcases career progression.',
    'Resume length is appropriate for your experience level.'
  ],
  recommendations: [
    'Add more specific technical skills relevant to your target role.',
    'Include keywords from job descriptions to pass ATS systems.',
    'Strengthen your professional summary with quantified achievements.',
    'Consider adding a projects or certifications section.'
  ]
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'hero' | 'upload' | 'results'>('hero');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleGetStarted = () => {
    setCurrentStep('upload');
  };

  const handleUpload = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with a delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setCurrentStep('results');
    }, 3000);
  };

  const handleBackToUpload = () => {
    setCurrentStep('upload');
  };

  const handleStartOver = () => {
    setCurrentStep('hero');
    setIsAnalyzing(false);
  };

  if (currentStep === 'hero') {
    return <HeroSection onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {currentStep === 'results' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToUpload}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <h1 className="text-2xl font-bold text-foreground">
                AI Resume Analyzer
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={handleStartOver}
              className="text-muted-foreground hover:text-foreground"
            >
              Start Over
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {currentStep === 'upload' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                Upload Your Resume
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload your resume and get instant AI-powered analysis with personalized 
                recommendations to improve your chances of landing your dream job.
              </p>
            </div>
            <ResumeUpload onUpload={handleUpload} isAnalyzing={isAnalyzing} />
          </div>
        )}

        {currentStep === 'results' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                Analysis Complete
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Here's your comprehensive resume analysis with actionable insights 
                to help you stand out to employers.
              </p>
            </div>
            <AnalysisResults analysisData={mockAnalysisData} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;