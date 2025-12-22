import { useLanguage } from '@/contexts/LanguageContext';
import { GraduationCap, Mail, BookOpen } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Course Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-foreground">{t('site.title')}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('site.subtitle')}
            </p>
          </div>

          {/* Instructor */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-foreground">{t('instructor.title')}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('instructor.name')}
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-foreground">{t('footer.contact')}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              IAET - Egypt
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t('site.title')} - {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
