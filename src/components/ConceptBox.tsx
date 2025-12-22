import { Info, CheckCircle, AlertTriangle } from 'lucide-react';

interface ConceptBoxProps {
  title: string;
  content: string;
  type?: 'info' | 'success' | 'warning';
}

const ConceptBox = ({ title, content, type = 'info' }: ConceptBoxProps) => {
  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
  };

  const styles = {
    info: 'bg-info/10 border-info/30 text-info',
    success: 'bg-success/10 border-success/30 text-success',
    warning: 'bg-gold/10 border-gold/30 text-gold',
  };

  const Icon = icons[type];

  return (
    <div className={`concept-highlight border-l-4 ${styles[type].split(' ').slice(0, 2).join(' ')}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${styles[type].split(' ').slice(2).join(' ')}`} />
        <div>
          <h4 className="font-semibold text-foreground mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ConceptBox;
