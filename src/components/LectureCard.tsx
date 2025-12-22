import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LectureCardProps {
  id: number;
  title: string;
  description: string;
  duration?: string;
  topics?: number;
  delay?: number;
}

const LectureCard = ({ id, title, description, duration = "45 min", topics = 5, delay = 0 }: LectureCardProps) => {
  const { dir } = useLanguage();
  const ChevronIcon = dir === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={`/lecture/${id}`}
        className="group block card-interactive p-6 h-full"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg">
                {id}
              </span>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {title}
              </h3>
            </div>
            
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                {duration}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <BookOpen className="w-3.5 h-3.5" />
                {topics} topics
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            <ChevronIcon className="w-5 h-5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default LectureCard;
