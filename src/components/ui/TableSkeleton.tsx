import React from 'react';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="flex border-b border-border py-3 px-4 gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div 
            key={`header-${i}`} 
            className="h-4 bg-muted rounded flex-1"
            style={{ maxWidth: i === 0 ? '200px' : '100px' }}
          />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div 
          key={`row-${rowIndex}`} 
          className="flex border-b border-border py-4 px-4 gap-4"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div 
              key={`cell-${rowIndex}-${colIndex}`} 
              className="h-4 bg-muted rounded flex-1"
              style={{ 
                maxWidth: colIndex === 0 ? '200px' : '100px',
                animationDelay: `${(rowIndex * columns + colIndex) * 50}ms`
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
