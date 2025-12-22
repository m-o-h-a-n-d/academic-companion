import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, ExternalLink, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ReferencesPage = () => {
  const { t, language } = useLanguage();

  const references = [
    {
      title: language === 'ar' 
        ? 'القياسات والأجهزة الإلكترونية' 
        : 'Measurement and Electronic Instrumentation',
      authors: 'Alan S. Morris & Reza Langari',
      year: '2015',
      publisher: 'Academic Press',
      description: language === 'ar'
        ? 'مرجع شامل يغطي أساسيات القياس، المحولات، الدوائر الإلكترونية، وأنظمة الأجهزة الحديثة.'
        : 'A comprehensive reference covering measurement fundamentals, transducers, electronic circuits, and modern instrumentation systems.',
    },
    {
      title: language === 'ar'
        ? 'نظرية وتطبيقات القياسات والأجهزة'
        : 'Measurements and Instrumentation Theory and Application',
      authors: 'K. Lal Kishore',
      year: '2010',
      publisher: 'Pearson Education India',
      description: language === 'ar'
        ? 'يركز على التطبيقات العملية للقياسات في الصناعة والبحث العلمي مع أمثلة متعددة.'
        : 'Focuses on practical applications of measurements in industry and scientific research with numerous examples.',
    },
  ];

  const topics = [
    { title: language === 'ar' ? 'الوحدات الأساسية SI' : 'SI Fundamental Units', lectures: [1] },
    { title: language === 'ar' ? 'أجهزة الفولتميتر الرقمية' : 'Digital Voltmeters (DVM)', lectures: [2] },
    { title: language === 'ar' ? 'عدادات التردد' : 'Frequency Counters', lectures: [3] },
    { title: language === 'ar' ? 'مولدات الإشارات' : 'Signal Generators', lectures: [4] },
    { title: language === 'ar' ? 'راسمات الذبذبات' : 'Oscilloscopes', lectures: [5, 6, 7] },
    { title: language === 'ar' ? 'المحولات والجسور' : 'Transducers & Bridges', lectures: [8] },
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
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('references.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'المراجع والكتب المعتمدة في هذا المنهج'
              : 'Approved references and textbooks for this curriculum'}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* References Cards */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              {language === 'ar' ? 'الكتب المرجعية' : 'Reference Books'}
            </h2>
            <div className="space-y-4">
              {references.map((ref, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-elevated p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-20 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {ref.title}
                      </h3>
                      <p className="text-sm text-accent font-medium mb-2">
                        {ref.authors} • {ref.year}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {ref.description}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {language === 'ar' ? 'الناشر:' : 'Publisher:'} {ref.publisher}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Course Topics */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent" />
              {language === 'ar' ? 'محتوى المنهج' : 'Course Content'}
            </h2>
            <div className="card-elevated overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-start text-sm font-semibold text-foreground">
                      {language === 'ar' ? 'الموضوع' : 'Topic'}
                    </th>
                    <th className="px-6 py-3 text-start text-sm font-semibold text-foreground">
                      {language === 'ar' ? 'المحاضرات' : 'Lectures'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {topics.map((topic, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-foreground">
                        {topic.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {topic.lectures.map((num) => (
                            <span
                              key={num}
                              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium"
                            >
                              {num}
                            </span>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReferencesPage;
