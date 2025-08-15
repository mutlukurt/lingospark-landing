export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

export const features: Feature[] = [
  {
    id: 'exercises',
    title: '5000+ Curated Exercises',
    description: 'Master English with our carefully crafted exercises covering grammar, vocabulary, pronunciation, and conversation skills.',
    icon: 'BookOpen',
    gradient: 'from-blue-400 to-purple-500'
  },
  {
    id: 'dictionary',
    title: 'Personal Dictionary with Spaced Repetition',
    description: 'Build your vocabulary with our intelligent spaced repetition system that helps you remember words effectively.',
    icon: 'Brain',
    gradient: 'from-green-400 to-blue-500'
  },
  {
    id: 'tracking',
    title: 'Progress Tracking & Analytics',
    description: 'Monitor your learning journey with detailed analytics, streaks, and personalized insights to stay motivated.',
    icon: 'TrendingUp',
    gradient: 'from-orange-400 to-pink-500'
  }
];
