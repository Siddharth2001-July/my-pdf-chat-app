import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

// Use this wrapper to resolve errors with baseline-ui Menu component when not used with baseline-ui interactive elements
export const MenuContentWrapper = forwardRef(({ children, className }, ref) => {
  return (
    <div className={twMerge(clsx(['h-full', className]))} ref={ref}>
      {children}
    </div>
  );
});

MenuContentWrapper.displayName = 'MenuContentWrapper';

export default MenuContentWrapper;