import { ProgressSpinner } from '@baseline-ui/core';
import { PlusIcon } from '@baseline-ui/icons/20';
import { ExtendedActionIconButton } from './ExtendedActionIconButton';
import React, { useRef } from 'react';

const inputAcceptedFileTypes = '.pdf,.doc,.docx'; // adjust based on your needs

export const FileUploadThumb = ({ 
  onFileChange, 
  isDisabled, 
  isLoading = false, 
  ...rest 
}) => {
  const inputRef = useRef(null);
  const spinner = () => <ProgressSpinner aria-label="Label" size="md" />;

  return (
    <div>
      <input 
        accept={inputAcceptedFileTypes} 
        onChange={onFileChange} 
        ref={inputRef} 
        type="file" 
        className="hidden" 
      />
      <ExtendedActionIconButton
        icon={isLoading ? spinner : PlusIcon}
        ariaLabel="add"
        thumbnail
        isDisabled={isDisabled || isLoading}
        onPress={() => {
          if (!inputRef?.current) return;
          inputRef.current.value = '';
          inputRef.current.click();
        }}
        {...rest}
      />
    </div>
  );
};

export default FileUploadThumb;