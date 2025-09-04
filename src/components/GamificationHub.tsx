import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Target, Zap, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface GamificationHubProps {
  resumeScore: number;
  onNewAchievement?: (achievement: Achievement) => void;
}

export const GamificationHub = ({ resumeScore, onNewAchievement }: GamificationHubProps) => {
  const [userLevel, setUserLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [streak, setStreak] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const achievements: Achievement[] = [
    {
      id: 'first-analysis',
      title: 'First Steps',
      description: 'Complete your first resume analysis',
      icon: Target,
      unlocked: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: 'score-master',
      title: 'Score Master',
      description: 'Achieve a resume score of 80+',
      icon: Trophy,
      unlocked: resumeScore >= 80,
      progress: Math.min(resumeScore, 80),
      maxProgress: 80
    },
    {
      id: 'perfectionist',
      title: 'Perfectionist',
      description: 'Get a perfect 100 resume score',
      icon: Star,
      unlocked: resumeScore >= 100,
      progress: Math.min(resumeScore, 100),
      maxProgress: 100
    },
    {
      id: 'improvement-streak',
      title: 'On Fire',
      description: 'Maintain a 3-day improvement streak',
      icon: Zap,
      unlocked: streak >= 3,
      progress: Math.min(streak, 3),
      maxProgress: 3
    }
  ];

  const experienceNeeded = userLevel * 100;
  const progressToNextLevel = (experience / experienceNeeded) * 100;

  useEffect(() => {
    // Award experience based on resume score
    const newExperience = Math.floor(resumeScore * 1.5);
    setExperience(newExperience);

    // Check for level up
    if (newExperience >= experienceNeeded && userLevel < 10) {
      setUserLevel(prev => prev + 1);
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  }, [resumeScore, experienceNeeded, userLevel]);

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const totalAchievements = achievements.length;

  return (
    <div className="space-y-6">
      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-primary to-accent p-8 rounded-2xl text-center shadow-glow"
              initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 180 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">Level Up!</h2>
              <p className="text-white/90 text-lg">You've reached Level {userLevel}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="hover:shadow-glow transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="text-3xl font-bold text-primary">{userLevel}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{experience}/{experienceNeeded} XP</span>
              </div>
              <Progress value={progressToNextLevel} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-glow transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resume Score</p>
                <p className="text-3xl font-bold text-accent">{resumeScore}</p>
              </div>
              <div className="p-3 bg-accent/10 rounded-full">
                <Target className="w-6 h-6 text-accent" />
              </div>
            </div>
            <Badge variant={resumeScore >= 80 ? "default" : "secondary"} className="mt-2">
              {resumeScore >= 90 ? "Excellent" : resumeScore >= 70 ? "Good" : "Needs Work"}
            </Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-glow transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="text-3xl font-bold text-warning">{streak}</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-full">
                <Zap className="w-6 h-6 text-warning" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">days improving</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Achievements ({unlockedAchievements.length}/{totalAchievements})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  achievement.unlocked
                    ? 'bg-success/5 border-success/20 hover:bg-success/10'
                    : 'bg-muted/50 border-muted hover:bg-muted/70'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    achievement.unlocked
                      ? 'bg-success/20 text-success'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <achievement.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${
                      achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {achievement.description}
                    </p>
                    {achievement.progress < achievement.maxProgress && (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-1.5"
                        />
                      </div>
                    )}
                    {achievement.unlocked && (
                      <Badge variant="default" className="mt-2 text-xs">
                        Unlocked!
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};