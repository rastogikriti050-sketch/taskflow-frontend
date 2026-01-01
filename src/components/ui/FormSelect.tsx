import React, { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, disabled, ...props }, ref) => {
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
        <select
          ref={ref}
          id={id}
          disabled={disabled}
          className={cn(
            'form-input',
            error && 'border-destructive focus:ring-destructive',
            disabled && 'bg-muted cursor-not-allowed opacity-60',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1.5 text-sm text-destructive animate-fade-in">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
