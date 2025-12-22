import { Lightbulb } from 'lucide-react';

interface FormulaBoxProps {
  formula: string;
  explanation?: string;
  title?: string;
}

const FormulaBox = ({ formula, explanation, title }: FormulaBoxProps) => {
  return (
    <div className="formula-box">
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-accent" />
          <span className="font-semibold text-foreground text-sm">{title}</span>
        </div>
      )}
      <code className="block text-base text-primary font-bold mb-2">
        {formula}
      </code>
      {explanation && (
        <p className="text-sm text-muted-foreground mt-2">
          {explanation}
        </p>
      )}
    </div>
  );
};

export default FormulaBox;
