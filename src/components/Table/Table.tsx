import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import { Loader } from '@/components/Loader';
import { Checkbox } from '@/components/Checkbox';
import { Pagination } from '@/components/Pagination';
import {
  TableOuterContainer,
  TableWrapper,
  StyledTable,
  THead,
  TBody,
  TableEmpty,
  PaginationWrapperContainer,
} from './Table.styles';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  cell?: (row: T, index: number) => React.ReactNode;
  accessor?: string;
  sortable?: boolean;
  width?: string;
  sticky?: 'left' | 'right';
  stickyOffset?: string;
}

export interface PaginationConfig {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  keyExtractor: (row: T) => string;
  selectable?: boolean;
  selectedRowIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  pagination?: PaginationConfig;
}

export function Table<T>({
  columns,
  data,
  isLoading,
  emptyMessage = 'No data found.',
  keyExtractor,
  selectable = false,
  selectedRowIds = [],
  onSelectionChange,
  pagination,
}: TableProps<T>) {
  const orderedColumns = useMemo(() => columns, [columns]);

  const allRowIds = useMemo(() => data.map(keyExtractor), [data, keyExtractor]);
  const isAllSelected = useMemo(
    () => allRowIds.length > 0 && allRowIds.every(id => selectedRowIds.includes(id)),
    [allRowIds, selectedRowIds]
  );
  const isSomeSelected = useMemo(
    () => allRowIds.some(id => selectedRowIds.includes(id)),
    [allRowIds, selectedRowIds]
  );

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    if (isAllSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(allRowIds);
    }
  };

  const handleSelectRow = (id: string) => {
    if (!onSelectionChange) return;
    if (selectedRowIds.includes(id)) {
      onSelectionChange(selectedRowIds.filter(item => item !== id));
    } else {
      onSelectionChange([...selectedRowIds, id]);
    }
  };

  const tableColumns = useMemo<ColumnDef<T, unknown>[]>(() => {
    return orderedColumns.map(col => ({
      id: col.key,
      header: () => col.header,
      accessorFn: (row: T) => (row as Record<string, unknown>)[col.key],
      cell: info => {
        const renderFn = col.render || col.cell;
        if (renderFn) {
          return renderFn(info.row.original, info.row.index);
        }
        const val = (info.row.original as Record<string, unknown>)[col.key];
        return val != null ? String(val) : '—';
      },
      size: col.width ? parseInt(col.width, 10) : undefined,
    }));
  }, [orderedColumns]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalColsLength = (selectable ? 1 : 0) + columns.length + 1;

  return (
    <TableOuterContainer>
      <TableWrapper>
        <StyledTable>
          <THead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {selectable && (
                  <th style={{ width: '48px', minWidth: '48px', textAlign: 'center' }}>
                    <Checkbox
                      checked={isAllSelected}
                      indeterminate={isSomeSelected && !isAllSelected}
                      onChange={handleSelectAll}
                    />
                  </th>
                )}
                {headerGroup.headers.map(header => {
                  const colDef = orderedColumns.find(c => c.key === header.id);
                  const isActions = colDef?.key === 'actions' || header.id === 'actions';
                  return (
                    <th
                      key={header.id}
                      className={colDef?.sortable ? 'sortable' : ''}
                      style={{
                        width: colDef?.width || (isActions ? '100px' : undefined),
                        minWidth: isActions ? '100px' : undefined,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  );
                })}
                <th style={{ width: '100%', minWidth: 0, padding: 0 }} />
              </tr>
            ))}
          </THead>
          <TBody>
            {isLoading ? (
              <tr>
                <td colSpan={totalColsLength}>
                  <Loader />
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={totalColsLength}>
                  <TableEmpty>{emptyMessage}</TableEmpty>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => {
                const rowId = keyExtractor(row.original);
                const isSelected = selectedRowIds.includes(rowId);
                return (
                  <tr key={rowId}>
                    {selectable && (
                      <td style={{ width: '48px', minWidth: '48px', textAlign: 'center' }}>
                        <Checkbox checked={isSelected} onChange={() => handleSelectRow(rowId)} />
                      </td>
                    )}
                    {row.getVisibleCells().map(cell => {
                      const colDef = orderedColumns.find(c => c.key === cell.column.id);
                      const isActions = colDef?.key === 'actions' || cell.column.id === 'actions';
                      return (
                        <td
                          key={cell.id}
                          style={{
                            width: colDef?.width || (isActions ? '100px' : undefined),
                            minWidth: isActions ? '100px' : undefined,
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                    <td style={{ width: '100%', minWidth: 0, padding: 0 }} />
                  </tr>
                );
              })
            )}
          </TBody>
        </StyledTable>
      </TableWrapper>
      {pagination && pagination.totalPages > 0 && (
        <PaginationWrapperContainer>
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={pagination.onPageChange}
            onLimitChange={pagination.onLimitChange}
          />
        </PaginationWrapperContainer>
      )}
    </TableOuterContainer>
  );
}
