import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { Select } from '@/components/Select';
import {
  PaginationWrapper,
  PaginationInfo,
  PaginationControls,
  PageButton,
  PageSizeSelectGroup,
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {onLimitChange && (
          <PageSizeSelectGroup>
            <span>Rows per page:</span>
            <div style={{ width: '80px' }}>
              <Select
                options={pageSizeOptions}
                value={String(limit)}
                onChange={e => onLimitChange(Number(e.target.value))}
                fullWidth={false}
              />
            </div>
          </PageSizeSelectGroup>
        )}
        <PaginationControls>
        <PageButton
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <RiArrowLeftSLine size={18} />
        </PageButton>
        {withEllipsis.map((p, i) =>
          p === '...' ? (
            <PageButton key={`ellipsis-${i}`} disabled>
              …
            </PageButton>
          ) : (
            <PageButton
              key={p}
              $active={p === page}
              onClick={() => onPageChange(p as number)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </PageButton>
          )
        )}
        <PageButton
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <RiArrowRightSLine size={18} />
        </PageButton>
      </PaginationControls>
      </div>
    </PaginationWrapper>
  );
};
