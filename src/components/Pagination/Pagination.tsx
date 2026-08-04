import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { Select } from '@/components/Select';
import {
  PaginationWrapper,
  PaginationInfo,
  PaginationControls,
  PageButton,
  PageSizeSelectGroup,
  RightGroup,
  SelectWrapper,
} from './Pagination.styles';

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  onLimitChange,
}) => {
  const start = Math.min((page - 1) * limit + 1, total);
  const end = Math.min(page * limit, total);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    p => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  const withEllipsis: (number | '...')[] = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - (pages[i - 1] as number) > 1) withEllipsis.push('...');
    withEllipsis.push(p);
  });

  const pageSizeOptions = [
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
  ];

  return (
    <PaginationWrapper>
      <PaginationInfo>
        Showing {start}–{end} of {total} results
      </PaginationInfo>
      <RightGroup>
        {onLimitChange && (
          <PageSizeSelectGroup>
            <span>Rows per page:</span>
            <SelectWrapper>
              <Select
                options={pageSizeOptions}
                value={String(limit)}
                onChange={e => onLimitChange(Number(e.target.value))}
                fullWidth={false}
              />
            </SelectWrapper>
          </PageSizeSelectGroup>
        )}
        <PaginationControls>
          <PageButton
            aria-label="Previous Page"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <RiArrowLeftSLine size={16} />
          </PageButton>
          {withEllipsis.map((p, idx) =>
            p === '...' ? (
              <span key={`ellipsis-${idx}`} style={{ padding: '0 4px', color: '#94a3b8' }}>
                ...
              </span>
            ) : (
              <PageButton
                key={p}
                $active={p === page}
                onClick={() => onPageChange(p as number)}
              >
                {p}
              </PageButton>
            )
          )}
          <PageButton
            aria-label="Next Page"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            <RiArrowRightSLine size={16} />
          </PageButton>
        </PaginationControls>
      </RightGroup>
    </PaginationWrapper>
  );
};
