import { CheckCircle, AlertCircle, TrendingUp, FileText, Users, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface AnalysisData {
  overallScore: number;
  sections: {
    name: string;
    score: number;
    status: 'excellent' | 'good' | 'needs-improvement';
    feedback: string;
  }[];
  insights: string[];
  recommendations: string[];
}

interface AnalysisResultsProps {
  analysisData: AnalysisData;
}

export const AnalysisResults = ({ analysisData }: AnalysisResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'excellent': return 'default';
      case 'good': return 'secondary';
      case 'needs-improvement': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <Card className="p-8 bg-gradient-card backdrop-blur-sm border-border/50 shadow-medium">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full">
            <Award className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Resume Score
            </h2>
            <div className={`text-6xl font-bold ${getScoreColor(analysisData.overallScore)} mb-4`}>
              {analysisData.overallScore}
              <span className="text-2xl text-muted-foreground">/100</span>
            </div>
            <Progress 
              value={analysisData.overallScore} 
              className="w-64 mx-auto h-3" 
            />
          </div>
        </div>
      </Card>

      {/* Section Breakdown */}
      <Card className="p-8 bg-gradient-card backdrop-blur-sm border-border/50 shadow-medium">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Section Analysis</h3>
        </div>
        
        <div className="space-y-6">
          {analysisData.sections.map((section, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h4 className="font-medium text-foreground">{section.name}</h4>
                  <Badge variant={getStatusVariant(section.status)}>
                    {section.status.replace('-', ' ')}
                  </Badge>
                </div>
                <span className={`text-lg font-semibold ${getScoreColor(section.score)}`}>
                  {section.score}%
                </span>
              </div>
              <Progress value={section.score} className="h-2" />
              <p className="text-sm text-muted-foreground">{section.feedback}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Insights */}
      <Card className="p-8 bg-gradient-card backdrop-blur-sm border-border/50 shadow-medium">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Key Insights</h3>
        </div>
        
        <div className="space-y-4">
          {analysisData.insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <p className="text-foreground">{insight}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-8 bg-gradient-card backdrop-blur-sm border-border/50 shadow-medium">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Recommendations</h3>
        </div>
        
        <div className="space-y-4">
          {analysisData.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
              <p className="text-foreground">{recommendation}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};