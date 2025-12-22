import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations: Record<string, Record<Language, string>> = {
  // Header
  'site.title': {
    ar: 'القياسات والأجهزة',
    en: 'Measurements & Devices',
  },
  'site.subtitle': {
    ar: 'معهد هندسة وتكنولوجيا الطيران',
    en: 'Institute of Aviation Engineering & Technology',
  },
  'instructor.name': {
    ar: 'د. محمود النجم',
    en: 'Dr. Mahmoud El-Negm',
  },
  'instructor.title': {
    ar: 'أستاذ المادة',
    en: 'Course Instructor',
  },
  
  // Navigation
  'nav.home': {
    ar: 'الرئيسية',
    en: 'Home',
  },
  'nav.lectures': {
    ar: 'المحاضرات',
    en: 'Lectures',
  },
  'nav.references': {
    ar: 'المراجع',
    en: 'References',
  },
  
  // Home page
  'home.hero.title': {
    ar: 'مرحباً بكم في مادة القياسات والأجهزة',
    en: 'Welcome to Measurements & Devices',
  },
  'home.hero.description': {
    ar: 'منهج شامل يغطي أساسيات القياسات الإلكترونية، الأجهزة الرقمية، راسمات الذبذبات، والمحولات. مصمم لطلاب الهندسة الكهربائية والإلكترونية.',
    en: 'A comprehensive curriculum covering electronic measurement fundamentals, digital instruments, oscilloscopes, and transducers. Designed for electrical and electronic engineering students.',
  },
  'home.hero.start': {
    ar: 'ابدأ التعلم',
    en: 'Start Learning',
  },
  'home.hero.syllabus': {
    ar: 'محتوى المنهج',
    en: 'View Syllabus',
  },
  
  // Lecture sections
  'lecture.objectives': {
    ar: 'أهداف المحاضرة',
    en: 'Learning Objectives',
  },
  'lecture.content': {
    ar: 'محتوى المحاضرة',
    en: 'Lecture Content',
  },
  'lecture.circuits': {
    ar: 'الدوائر الكهربائية',
    en: 'Circuit Diagrams',
  },
  'lecture.examples': {
    ar: 'أمثلة تطبيقية',
    en: 'Practical Examples',
  },
  'lecture.summary': {
    ar: 'ملخص المحاضرة',
    en: 'Summary',
  },
  'lecture.next': {
    ar: 'المحاضرة التالية',
    en: 'Next Lecture',
  },
  'lecture.prev': {
    ar: 'المحاضرة السابقة',
    en: 'Previous Lecture',
  },
  
  // Lectures list
  'lectures.title': {
    ar: 'محاضرات المادة',
    en: 'Course Lectures',
  },
  'lectures.description': {
    ar: 'اختر محاضرة للبدء في دراستها',
    en: 'Select a lecture to start studying',
  },
  
  // Lecture titles
  'lecture1.title': {
    ar: 'مقدمة في القياسات والأجهزة',
    en: 'Introduction to Measurements & Instrumentation',
  },
  'lecture1.description': {
    ar: 'الوحدات الأساسية، أنظمة القياس، مقارنة بين الأجهزة التماثلية والرقمية',
    en: 'Fundamental units, measurement systems, analog vs digital instruments',
  },
  'lecture2.title': {
    ar: 'أجهزة قياس الجهد الرقمية (DVM)',
    en: 'Digital Voltmeters (DVM)',
  },
  'lecture2.description': {
    ar: 'أنواع DVM، مبدأ العمل، Ramp-type و Dual-slope',
    en: 'DVM types, working principles, Ramp-type and Dual-slope integrating',
  },
  'lecture3.title': {
    ar: 'عدادات التردد الرقمية',
    en: 'Digital Frequency Meters',
  },
  'lecture3.description': {
    ar: 'مبدأ قياس التردد، الدوائر الأساسية، نطاقات التردد',
    en: 'Frequency measurement principles, basic circuits, frequency ranges',
  },
  'lecture4.title': {
    ar: 'مولدات الإشارات',
    en: 'Function Generators',
  },
  'lecture4.description': {
    ar: 'مولد الموجة المثلثة والمربعة، دائرة Schmitt trigger، المذبذبات',
    en: 'Triangular and square wave generators, Schmitt trigger, oscillators',
  },
  'lecture5.title': {
    ar: 'راسم الذبذبات (الأوسيلوسكوب)',
    en: 'Oscilloscopes',
  },
  'lecture5.description': {
    ar: 'أنبوب الأشعة الكاثودية CRT، مبدأ العمل، أنواع الأوسيلوسكوب',
    en: 'Cathode Ray Tube (CRT), working principles, oscilloscope types',
  },
  'lecture6.title': {
    ar: 'قياس الجهد والتردد والطور',
    en: 'Voltage, Frequency & Phase Measurement',
  },
  'lecture6.description': {
    ar: 'قياس Vp-p، حساب التردد، قياس فرق الطور باستخدام الأوسيلوسكوب',
    en: 'Peak-to-peak voltage, frequency calculation, phase measurement using oscilloscope',
  },
  'lecture7.title': {
    ar: 'الأوسيلوسكوب التخزيني الرقمي',
    en: 'Digital Storage Oscilloscope',
  },
  'lecture7.description': {
    ar: 'عناصر التحكم، واجهة العرض، القياسات التلقائية',
    en: 'Controls, display interface, automatic measurements',
  },
  'lecture8.title': {
    ar: 'المحولات والجسور',
    en: 'Transducers & Bridge Circuits',
  },
  'lecture8.description': {
    ar: 'جسر ويتستون، جسور التيار المتردد، محولات الإزاحة والحرارة',
    en: 'Wheatstone bridge, AC bridges, displacement and temperature transducers',
  },
  
  // Common terms
  'term.voltage': {
    ar: 'الجهد',
    en: 'Voltage',
  },
  'term.current': {
    ar: 'التيار',
    en: 'Current',
  },
  'term.resistance': {
    ar: 'المقاومة',
    en: 'Resistance',
  },
  'term.frequency': {
    ar: 'التردد',
    en: 'Frequency',
  },
  'term.accuracy': {
    ar: 'الدقة',
    en: 'Accuracy',
  },
  'term.resolution': {
    ar: 'الوضوح',
    en: 'Resolution',
  },
  'term.sensitivity': {
    ar: 'الحساسية',
    en: 'Sensitivity',
  },
  
  // Footer
  'footer.rights': {
    ar: 'جميع الحقوق محفوظة',
    en: 'All rights reserved',
  },
  'footer.contact': {
    ar: 'للتواصل',
    en: 'Contact',
  },
  
  // References
  'references.title': {
    ar: 'المراجع العلمية',
    en: 'Scientific References',
  },
  'references.book1': {
    ar: 'القياسات والأجهزة الإلكترونية - Alan S. Morris & Reza Langari',
    en: 'Measurement and Electronic Instrumentation - Alan S. Morris & Reza Langari',
  },
  'references.book2': {
    ar: 'نظرية وتطبيقات القياسات والأجهزة - K. Lal Kishore',
    en: 'Measurements and Instrumentation Theory and Application - K. Lal Kishore',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
