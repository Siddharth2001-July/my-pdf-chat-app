import React from 'react';

export const ProfileVariantsIcon = ({ fill = '#777CF0', size = 24, ...rest }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ?? 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M12 0C12 6.6275 6.62732 12 0 12C6.62732 12 12 17.3725 12 24C12 17.3725 17.3727 12 24 12C17.3727 12 12 6.6275 12 0Z" />
    </svg>
  );
};

export default ProfileVariantsIcon;