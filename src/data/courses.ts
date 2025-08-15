export interface Course {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: number;
  duration: string;
  tags: string[];
  color: string;
}

export const courses: Course[] = [
  {
    id: 'business',
    title: 'Business English',
    level: 'Intermediate',
    lessons: 24,
    duration: '6 weeks',
    tags: ['Professional', 'Communication'],
    color: 'bg-gradient-to-br from-blue-500 to-indigo-600'
  },
  {
    id: 'conversation',
    title: 'Daily Conversation',
    level: 'Beginner',
    lessons: 18,
    duration: '4 weeks',
    tags: ['Speaking', 'Listening'],
    color: 'bg-gradient-to-br from-green-500 to-emerald-600'
  },
  {
    id: 'grammar',
    title: 'Advanced Grammar',
    level: 'Advanced',
    lessons: 30,
    duration: '8 weeks',
    tags: ['Grammar', 'Writing'],
    color: 'bg-gradient-to-br from-purple-500 to-pink-600'
  },
  {
    id: 'pronunciation',
    title: 'Pronunciation Master',
    level: 'Intermediate',
    lessons: 15,
    duration: '3 weeks',
    tags: ['Speaking', 'Phonetics'],
    color: 'bg-gradient-to-br from-orange-500 to-red-600'
  },
  {
    id: 'travel',
    title: 'Travel English',
    level: 'Beginner',
    lessons: 12,
    duration: '3 weeks',
    tags: ['Travel', 'Practical'],
    color: 'bg-gradient-to-br from-cyan-500 to-blue-600'
  },
  {
    id: 'academic',
    title: 'Academic Writing',
    level: 'Advanced',
    lessons: 20,
    duration: '5 weeks',
    tags: ['Writing', 'Academic'],
    color: 'bg-gradient-to-br from-indigo-500 to-purple-600'
  }
];
