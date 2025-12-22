import { useLanguage } from '@/contexts/LanguageContext';
import { ZoomIn, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CircuitDiagramProps {
  src: string;
  title: string;
  description: string;
  alt?: string;
}

const CircuitDiagram = ({ src, title, description, alt }: CircuitDiagramProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const { dir } = useLanguage();

  return (
    <>
      <div className="circuit-image group relative overflow-hidden">
        <div className="absolute top-3 start-3 z-10">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
            {title}
          </span>
        </div>
        
        <div className="absolute top-3 end-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => setIsZoomed(true)}
            className="w-8 h-8"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>

        <img
          src={src}
          alt={alt || title}
          className="w-full h-auto object-contain cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
          onClick={() => setIsZoomed(true)}
        />

        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/80 backdrop-blur-sm"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-card rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsZoomed(false)}
                >
                  ✕
                </Button>
              </div>
              <div className="p-4 overflow-auto max-h-[calc(90vh-100px)]">
                <img
                  src={src}
                  alt={alt || title}
                  className="w-full h-auto object-contain"
                />
                <p className="mt-4 text-sm text-muted-foreground">{description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CircuitDiagram;
