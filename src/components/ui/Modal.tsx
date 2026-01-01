import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md' 
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className={cn(
          'relative bg-card rounded-xl shadow-elevated p-6 w-full animate-scale-in',
          sizes[size]
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
