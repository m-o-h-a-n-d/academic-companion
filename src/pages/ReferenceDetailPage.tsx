import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, ArrowLeft, ArrowRight, User, Calendar, Building, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ReferenceDetailPage = () => {
  const { id } = useParams();
  const { language, dir } = useLanguage();
  const ArrowBack = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const references: Record<string, {
    title: { ar: string; en: string };
    authors: string;
    year: string;
    publisher: string;
    description: { ar: string; en: string };
    chapters: { ar: string; en: string }[];
    relatedLectures: number[];
  }> = {
    '1': {
      title: {
        ar: 'القياسات والأجهزة الإلكترونية',
        en: 'Measurement and Electronic Instrumentation'
      },
      authors: 'Alan S. Morris & Reza Langari',
      year: '2015',
      publisher: 'Academic Press',
      description: {
        ar: 'مرجع شامل يغطي أساسيات القياس، المحولات، الدوائر الإلكترونية، وأنظمة الأجهزة الحديثة. يتضمن الكتاب شرحاً مفصلاً للنظريات الأساسية مع تطبيقات عملية متعددة.',
        en: 'A comprehensive reference covering measurement fundamentals, transducers, electronic circuits, and modern instrumentation systems. The book includes detailed explanations of fundamental theories with multiple practical applications.'
      },
      chapters: [
        { ar: 'مقدمة في أنظمة القياس', en: 'Introduction to Measurement Systems' },
        { ar: 'خصائص الأجهزة', en: 'Instrument Characteristics' },
        { ar: 'أخطاء القياس', en: 'Measurement Errors' },
        { ar: 'المحولات والحساسات', en: 'Transducers and Sensors' },
        { ar: 'الدوائر الإلكترونية للقياس', en: 'Electronic Circuits for Measurement' },
        { ar: 'أجهزة القياس الرقمية', en: 'Digital Measuring Instruments' },
        { ar: 'راسمات الذبذبات', en: 'Oscilloscopes' },
        { ar: 'قياس التردد والزمن', en: 'Frequency and Time Measurement' },
      ],
      relatedLectures: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    '2': {
      title: {
        ar: 'نظرية وتطبيقات القياسات والأجهزة',
        en: 'Measurements and Instrumentation Theory and Application'
      },
      authors: 'K. Lal Kishore',
      year: '2010',
      publisher: 'Pearson Education India',
      description: {
        ar: 'يركز على التطبيقات العملية للقياسات في الصناعة والبحث العلمي مع أمثلة متعددة. يشمل الكتاب دراسات حالة واقعية ومسائل محلولة.',
        en: 'Focuses on practical applications of measurements in industry and scientific research with numerous examples. The book includes real-world case studies and solved problems.'
      },
      chapters: [
        { ar: 'أساسيات القياس', en: 'Fundamentals of Measurement' },
        { ar: 'وحدات القياس والمعايير', en: 'Units of Measurement and Standards' },
        { ar: 'تحليل الأخطاء', en: 'Error Analysis' },
        { ar: 'الجسور الكهربائية', en: 'Electrical Bridges' },
        { ar: 'أجهزة الفولتميتر الرقمية', en: 'Digital Voltmeters' },
        { ar: 'مولدات الإشارات', en: 'Signal Generators' },
        { ar: 'راسمات الذبذبات الرقمية', en: 'Digital Oscilloscopes' },
        { ar: 'المحولات', en: 'Transducers' },
      ],
      relatedLectures: [1, 2, 3, 4, 5, 8]
    }
  };

  const reference = references[id || '1'];

  if (!reference) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'المرجع غير موجود' : 'Reference not found'}
          </h1>
          <Button asChild>
            <Link to="/references">
              {language === 'ar' ? 'العودة للمراجع' : 'Back to References'}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button asChild variant="ghost" className="gap-2">
            <Link to="/references">
              <ArrowBack className="w-4 h-4" />
              {language === 'ar' ? 'العودة للمراجع' : 'Back to References'}
            </Link>
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-elevated p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 w-24 h-32 bg-primary/10 rounded-xl flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {reference.title[language]}
              </h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4 text-accent" />
                  <span className="text-sm">{reference.authors}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="text-sm">{reference.year}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="w-4 h-4 text-accent" />
                  <span className="text-sm">{reference.publisher}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {reference.description[language]}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Chapters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-elevated p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            {language === 'ar' ? 'محتويات الكتاب' : 'Book Contents'}
          </h2>
          
          <div className="space-y-3">
            {reference.chapters.map((chapter, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-foreground">{chapter[language]}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Related Lectures */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-elevated p-6"
        >
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            {language === 'ar' ? 'المحاضرات المرتبطة' : 'Related Lectures'}
          </h2>
          
          <div className="flex flex-wrap gap-3">
            {reference.relatedLectures.map((num) => (
              <Link
                key={num}
                to={`/lecture/${num}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <span className="font-medium">
                  {language === 'ar' ? `المحاضرة ${num}` : `Lecture ${num}`}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReferenceDetailPage;
