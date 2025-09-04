import { Brain, Zap, Target, Star, Shield, Award, CheckCircle, ArrowRight, Users, TrendingUp, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-image.jpg';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero/90" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-12 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 text-sm font-medium">
              <Star className="w-4 h-4 text-yellow-400" />
              Trusted by 50,000+ professionals
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight">
                Transform Your
                <br />
                <span className="bg-gradient-to-r from-white via-primary-light to-accent bg-clip-text text-transparent">
                  Career Story
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                Get instant AI-powered resume analysis with personalized insights, 
                ATS optimization, and expert recommendations to land your dream job faster.
              </p>
            </div>

            {/* CTA Section */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="text-xl px-12 py-6 bg-white text-primary hover:bg-white/90 shadow-large hover:shadow-glow transition-all duration-300 transform hover:scale-105 group"
                >
                  Analyze My Resume
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Shield className="w-4 h-4" />
                  Free • No signup required • 30-second analysis
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 pt-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Brain className="w-8 h-8 text-primary-light" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Analysis</h3>
                  <p className="text-white/70">Advanced algorithms analyze every section of your resume for maximum impact</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-3 bg-accent/20 rounded-xl">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">ATS Optimization</h3>
                  <p className="text-white/70">Ensure your resume passes Applicant Tracking Systems used by 99% of employers</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-3 bg-warning/20 rounded-xl">
                  <Zap className="w-8 h-8 text-warning" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">Instant Results</h3>
                  <p className="text-white/70">Get comprehensive feedback and actionable insights in under 30 seconds</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="pt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">50K+</div>
                  <div className="text-white/70 text-sm">Resumes Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
                  <div className="text-white/70 text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">3x</div>
                  <div className="text-white/70 text-sm">More Interviews</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
                  <div className="text-white/70 text-sm">Always Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Everything You Need to 
              <span className="text-primary"> Stand Out</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive analysis covers every aspect of your resume to maximize your chances of landing interviews.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-glow transition-all duration-300 border-border hover:border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Content Analysis</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Deep analysis of your work experience, skills, and achievements with suggestions for improvement.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Impact statement optimization
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Skill relevance scoring
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Achievement quantification
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-glow transition-all duration-300 border-border hover:border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">ATS Compatibility</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Ensure your resume passes through Applicant Tracking Systems used by most companies.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Format compatibility check
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Keyword optimization
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Section structure analysis
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-glow transition-all duration-300 border-border hover:border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-warning/10 rounded-xl group-hover:bg-warning/20 transition-colors">
                    <TrendingUp className="w-6 h-6 text-warning" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Performance Scoring</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Get detailed scores for each section with specific recommendations for improvement.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Overall resume score
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Section-by-section breakdown
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Priority improvement areas
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Trusted by Professionals
              <span className="text-primary"> Worldwide</span>
            </h2>
            <div className="flex justify-center items-center gap-12 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-accent rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-warning rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-destructive rounded-full border-2 border-background"></div>
                </div>
                <span className="text-muted-foreground">50,000+ users</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-muted-foreground ml-2">4.9/5 rating</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">
                  "This tool helped me identify weak points in my resume that I never noticed. Got 3 interview calls within a week!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">SM</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Sarah Martinez</div>
                    <div className="text-sm text-muted-foreground">Software Engineer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">
                  "The ATS optimization suggestions were game-changing. Finally passed the initial screening at top companies."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-semibold">MJ</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Michael Johnson</div>
                    <div className="text-sm text-muted-foreground">Marketing Manager</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">
                  "Incredibly detailed analysis with actionable insights. Landed my dream job at a Fortune 500 company!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                    <span className="text-warning font-semibold">EP</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Emily Parker</div>
                    <div className="text-sm text-muted-foreground">Data Analyst</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Ready to Transform Your Resume?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of professionals who've boosted their career prospects with our AI-powered analysis.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={onGetStarted}
                size="lg"
                variant="hero"
                className="text-xl px-12 py-6 shadow-large hover:shadow-glow transition-all duration-300 transform hover:scale-105 group"
              >
                Start Free Analysis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground pt-8">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                30-second analysis
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Secure & private
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                No signup required
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};