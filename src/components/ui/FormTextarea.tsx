import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, disabled, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={id} 
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          disabled={disabled}
          className={cn(
            'form-input min-h-[100px] resize-none',
            error && 'border-destructive focus:ring-destructive',
            disabled && 'bg-muted cursor-not-allowed opacity-60',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-destructive animate-fade-in">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
