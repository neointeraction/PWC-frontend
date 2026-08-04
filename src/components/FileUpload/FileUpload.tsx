import React, { useState, useRef, useCallback } from 'react';
import { RiUploadCloud2Line, RiFileExcel2Line, RiCloseLine } from 'react-icons/ri';
import { formatFileSize } from '@/utils/excelParser';
import {
  FileUploadWrapper,
  FileUploadLabel,
  DropZone,
  UploadIconWrapper,
  UploadLabel,
  UploadHint,
  BrowseLink,
  FileInfoContainer,
  FileIconWrapper,
  FileDetails,
  FileName,
  FileSize,
  RemoveButton,
} from './FileUpload.styles';

interface FileUploadProps {
  accept?: string;
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  label?: string;
  hint?: string;
  selectedFile?: File | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = '.csv,.xlsx,.xls',
  onFileSelect,
  onFileRemove,
  label,
  hint = 'Supported formats: CSV, XLSX, XLS',
  selectedFile = null,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
      // Reset input so re-uploading the same file triggers change
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [onFileSelect]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onFileRemove?.();
    },
    [onFileRemove]
  );

  return (
    <FileUploadWrapper>
      {label && <FileUploadLabel>{label}</FileUploadLabel>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        hidden
        aria-label={label || 'Upload file'}
      />
      <DropZone
        $isDragOver={isDragOver}
        $hasFile={Boolean(selectedFile)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Drop zone for file upload"
      >
        <UploadIconWrapper>
          <RiUploadCloud2Line size={24} />
        </UploadIconWrapper>
        <UploadLabel>
          Drag & drop your file here, or <BrowseLink>browse</BrowseLink>
        </UploadLabel>
        <UploadHint>{hint}</UploadHint>
      </DropZone>
      {selectedFile && (
        <FileInfoContainer>
          <FileIconWrapper>
            <RiFileExcel2Line size={18} />
          </FileIconWrapper>
          <FileDetails>
            <FileName>{selectedFile.name}</FileName>
            <FileSize>{formatFileSize(selectedFile.size)}</FileSize>
          </FileDetails>
          <RemoveButton onClick={handleRemove} aria-label="Remove file">
            <RiCloseLine size={16} />
          </RemoveButton>
        </FileInfoContainer>
      )}
    </FileUploadWrapper>
  );
};
