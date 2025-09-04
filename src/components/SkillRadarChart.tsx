import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SkillData {
  category: string;
  score: number;
  skills: string[];
}

interface SkillRadarChartProps {
  data: SkillData[];
}

export const SkillRadarChart = ({ data }: SkillRadarChartProps) => {
  const maxScore = 100;
  const centerX = 150;
  const centerY = 150;
  const radius = 120;

  const getPolygonPoints = (scores: number[]) => {
    return scores.map((score, index) => {
      const angle = (index * 2 * Math.PI) / scores.length - Math.PI / 2;
      const distance = (score / maxScore) * radius;
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  const getPointPosition = (index: number, distance: number) => {
    const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
    const x = centerX + distance * Math.cos(angle);
    const y = centerY + distance * Math.sin(angle);
    return { x, y, angle };
  };

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const scores = data.map(item => item.score);

  return (
    <Card className="hover:shadow-glow transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-center">Skills Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          {/* Radar Chart SVG */}
          <div className="relative">
            <svg width="300" height="300" className="overflow-visible">
              {/* Grid circles */}
              {gridLevels.map((level, index) => (
                <circle
                  key={index}
                  cx={centerX}
                  cy={centerY}
                  r={radius * level}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-muted opacity-20"
                />
              ))}

              {/* Grid lines */}
              {data.map((_, index) => {
                const { x, y } = getPointPosition(index, radius);
                return (
                  <line
                    key={index}
                    x1={centerX}
                    y1={centerY}
                    x2={x}
                    y2={y}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-muted opacity-20"
                  />
                );
              })}

              {/* Data polygon */}
              <motion.polygon
                points={getPolygonPoints(scores)}
                fill="hsl(var(--primary))"
                fillOpacity="0.2"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {/* Data points */}
              {data.map((item, index) => {
                const { x, y } = getPointPosition(index, (item.score / maxScore) * radius);
                return (
                  <motion.circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="hsl(var(--primary))"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.3 }}
                    whileHover={{ scale: 1.5 }}
                    className="cursor-pointer"
                  />
                );
              })}

              {/* Labels */}
              {data.map((item, index) => {
                const { x, y } = getPointPosition(index, radius + 30);
                return (
                  <motion.text
                    key={index}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-medium fill-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 1 }}
                  >
                    {item.category}
                  </motion.text>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {data.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 1.2 }}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{item.category}</span>
                    <Badge variant={item.score >= 80 ? "default" : item.score >= 60 ? "secondary" : "outline"}>
                      {item.score}%
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span key={skillIndex} className="text-xs text-muted-foreground">
                        {skill}
                        {skillIndex < Math.min(item.skills.length, 3) - 1 && ", "}
                        {skillIndex === 2 && item.skills.length > 3 && "..."}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};