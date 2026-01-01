import React, { forwardRef, InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, rightIcon, className, id, disabled, ...props }, ref) => {
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
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          )}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            className={cn(
              'form-input',
              Icon && 'pl-12',
              rightIcon && 'pr-12',
              error && 'border-destructive focus:ring-destructive',
              disabled && 'bg-muted cursor-not-allowed opacity-60',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-destructive animate-fade-in">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
