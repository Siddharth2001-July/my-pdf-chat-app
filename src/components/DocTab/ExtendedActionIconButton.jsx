import { ActionIconButton as BUIActionIconButton } from '@baseline-ui/core';
import { ProfileVariantsIcon } from './icons/ProfileVariantsIcon';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const ExtendedActionIconButton = ({
  thumbnail,
  chat,
  variant,
  size,
  icon,
  ariaLabel = 'Icon button',
  className,
  ...rest
}) => {
  return (
    <BUIActionIconButton
      variant={thumbnail ? 'tertiary' : variant}
      size={chat ? 'md' : size}
      className={twMerge(
        clsx([
          thumbnail && [
            'h-[164px] w-[124px]',
            'bg-[var(--bui-color-background-secondary-medium)]',
            'transition-colors',
            'hover:bg-[var(--bui-color-background-secondary-strong)]',
            'disabled:bg-[var(--bui-color-background-secondary-medium)]',
          ],
          chat && [
            'h-[64px] w-[64px]',
            'bg-[var(--bui-color-background-primary-subtle)]',
            'rounded-[var(--bui-rounded-lg)]',
            'shadow-elevation-md',
          ],
        ]),
        className,
      )}
      aria-label={ariaLabel}
      icon={chat ? ProfileVariantsIcon : icon ?? ProfileVariantsIcon}
      {...rest}
    />
  );
};