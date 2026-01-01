import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, title, message, onClose }) => {
  const styles = {
    success: {
      bg: 'bg-success/10 border-success/20',
      text: 'text-success',
      icon: CheckCircle,
    },
    error: {
      bg: 'bg-destructive/10 border-destructive/20',
      text: 'text-destructive',
      icon: XCircle,
    },
    warning: {
      bg: 'bg-warning/10 border-warning/20',
      text: 'text-warning',
      icon: AlertCircle,
    },
    info: {
      bg: 'bg-primary/10 border-primary/20',
      text: 'text-primary',
      icon: Info,
    },
  };

  const { bg, text, icon: Icon } = styles[type];

  return (
    <div 
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border animate-fade-in',
        bg
      )}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', text)} />
      <div className="flex-1">
        {title && (
          <p className={cn('font-medium mb-1', text)}>{title}</p>
        )}
        <p className="text-foreground/80 text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
