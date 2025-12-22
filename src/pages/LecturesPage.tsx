import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import LectureCard from '@/components/LectureCard';
import { BookOpen } from 'lucide-react';

const LecturesPage = () => {
  const { t, language } = useLanguage();

  const lectures = [
    { id: 1, title: t('lecture1.title'), description: t('lecture1.description'), topics: 6, duration: '45 min' },
    { id: 2, title: t('lecture2.title'), description: t('lecture2.description'), topics: 8, duration: '60 min' },
    { id: 3, title: t('lecture3.title'), description: t('lecture3.description'), topics: 5, duration: '40 min' },
    { id: 4, title: t('lecture4.title'), description: t('lecture4.description'), topics: 7, duration: '55 min' },
    { id: 5, title: t('lecture5.title'), description: t('lecture5.description'), topics: 9, duration: '70 min' },
    { id: 6, title: t('lecture6.title'), description: t('lecture6.description'), topics: 6, duration: '50 min' },
    { id: 7, title: t('lecture7.title'), description: t('lecture7.description'), topics: 5, duration: '45 min' },
    { id: 8, title: t('lecture8.title'), description: t('lecture8.description'), topics: 10, duration: '75 min' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('lectures.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('lectures.description')}
          </p>
        </motion.div>

        {/* Lectures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {lectures.map((lecture, index) => (
            <LectureCard
              key={lecture.id}
              {...lecture}
              delay={index * 0.05}
            />
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="card-elevated p-6 text-center">
            <h3 className="font-semibold text-foreground mb-2">
              {language === 'ar' ? 'نصيحة للدراسة' : 'Study Tip'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' 
                ? 'ابدأ بالمحاضرة الأولى لفهم الأساسيات، ثم انتقل تدريجياً للمواضيع المتقدمة. كل محاضرة تبني على سابقتها.'
                : 'Start with Lecture 1 to understand the fundamentals, then gradually move to advanced topics. Each lecture builds on the previous one.'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LecturesPage;
