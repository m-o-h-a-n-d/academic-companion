import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, BookOpen, Zap, Cpu, Gauge, Radio, Thermometer, Activity, Waves } from 'lucide-react';
import LectureCard from '@/components/LectureCard';

const HomePage = () => {
  const { t, dir, language } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const features = [
    { icon: Gauge, title: language === 'ar' ? 'الوحدات الأساسية' : 'Fundamental Units', description: language === 'ar' ? 'تعلم نظام SI للوحدات' : 'Learn the SI unit system' },
    { icon: Cpu, title: language === 'ar' ? 'الأجهزة الرقمية' : 'Digital Instruments', description: language === 'ar' ? 'DVM, عدادات التردد' : 'DVM, Frequency Counters' },
    { icon: Waves, title: language === 'ar' ? 'راسمات الذبذبات' : 'Oscilloscopes', description: language === 'ar' ? 'CRT والتخزين الرقمي' : 'CRT and Digital Storage' },
    { icon: Thermometer, title: language === 'ar' ? 'المحولات' : 'Transducers', description: language === 'ar' ? 'محولات الحرارة والإزاحة' : 'Temperature & Displacement' },
  ];

  const lectures = [
    { id: 1, title: t('lecture1.title'), description: t('lecture1.description'), topics: 6, duration: '45 min' },
    { id: 2, title: t('lecture2.title'), description: t('lecture2.description'), topics: 8, duration: '60 min' },
    { id: 3, title: t('lecture3.title'), description: t('lecture3.description'), topics: 5, duration: '40 min' },
    { id: 4, title: t('lecture4.title'), description: t('lecture4.description'), topics: 7, duration: '55 min' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-hero py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
              <Activity className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'ar' ? 'معهد هندسة الطيران' : 'IAET Course'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              {t('home.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="btn-primary-gradient px-8">
                <Link to="/lectures" className="flex items-center gap-2">
                  {t('home.hero.start')}
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/references" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {t('home.hero.syllabus')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-interactive p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Recent Lectures */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('lectures.title')}
            </h2>
            <p className="text-muted-foreground">
              {t('lectures.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {lectures.map((lecture, index) => (
              <LectureCard
                key={lecture.id}
                {...lecture}
                delay={index * 0.1}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Button asChild variant="outline" size="lg">
              <Link to="/lectures" className="flex items-center gap-2">
                {language === 'ar' ? 'عرض جميع المحاضرات' : 'View All Lectures'}
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '8+', label: language === 'ar' ? 'محاضرات' : 'Lectures' },
              { value: '50+', label: language === 'ar' ? 'موضوع' : 'Topics' },
              { value: '30+', label: language === 'ar' ? 'دائرة كهربائية' : 'Circuits' },
              { value: '100+', label: language === 'ar' ? 'مثال تطبيقي' : 'Examples' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
