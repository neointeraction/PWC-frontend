import React, { useState, useMemo } from 'react';
import {
  RiDeleteBinLine,
  RiCheckDoubleLine,
  RiTimeLine,
  RiHistoryLine,
} from 'react-icons/ri';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { AlertModal } from '@/components/AlertModal';
import { Select } from '@/components/Select';
import { DASHBOARD_MOCKS } from '@/mocks/dashboard.mock';
import {
  WidgetHeaderRow,
  WidgetTitleGroup,
  WidgetTitle,
  WidgetSubtitle,
  HeaderActionsGroup,
  TableContainer,
  Table,
  StatusBadge,
  LogDetailText,
} from './DataPurgingLogWidget.styles';

export const DataPurgingLogWidget: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');
  const [isPurgeModalOpen, setIsPurgeModalOpen] = useState(false);
  const [isPurging, setIsPurging] = useState(false);
  const [purgeSuccessMessage, setPurgeSuccessMessage] = useState<string | null>(null);

  const projectOptions = useMemo(
    () => [
      { value: 'all', label: 'All Projects' },
      ...DASHBOARD_MOCKS.projects.map(p => ({
        value: p.id,
        label: p.name,
      })),
    ],
    []
  );

  const filteredLogs = useMemo(() => {
    const logs = DASHBOARD_MOCKS.dataPurgingLogs;
    if (selectedProjectId !== 'all') {
      return logs.filter(l => l.projectId === selectedProjectId);
    }
    return logs;
  }, [selectedProjectId]);

  const handleConfirmPurge = async () => {
    setIsPurging(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsPurging(false);
    setIsPurgeModalOpen(false);
    setPurgeSuccessMessage('Project data retention purge executed successfully. Purge audit log updated.');
  };

  return (
    <>
      <Card>
        <WidgetHeaderRow>
          <WidgetTitleGroup>
            <WidgetTitle style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <RiHistoryLine size={18} /> Project Wise Data Purging Log
            </WidgetTitle>
            <WidgetSubtitle>Audit log of data minimization and automated data purging schedules</WidgetSubtitle>
          </WidgetTitleGroup>

          <HeaderActionsGroup>
            <Select
              value={selectedProjectId}
              onChange={e => setSelectedProjectId(e.target.value)}
              options={projectOptions}
              fullWidth={false}
              style={{ minWidth: 180 }}
            />
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<RiDeleteBinLine size={16} />}
              onClick={() => setIsPurgeModalOpen(true)}
            >
              Run Data Purge
            </Button>
          </HeaderActionsGroup>
        </WidgetHeaderRow>

        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Purged By</th>
                <th>Date & Time</th>
                <th>Records / Data Purged</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td style={{ fontWeight: 600, color: '#1E293B' }}>{log.projectName}</td>
                  <td>{log.purgedBy}</td>
                  <td>{log.purgeDate}</td>
                  <td style={{ fontWeight: 500 }}>{log.recordsPurged}</td>
                  <td>
                    <StatusBadge $status={log.status}>
                      {log.status === 'Completed' ? (
                        <RiCheckDoubleLine size={14} />
                      ) : (
                        <RiTimeLine size={14} />
                      )}
                      {log.status}
                    </StatusBadge>
                  </td>
                  <td>
                    <LogDetailText>{log.details}</LogDetailText>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </Card>

      {/* Confirmation Modal for Data Purging */}
      <AlertModal
        isOpen={isPurgeModalOpen}
        onClose={() => setIsPurgeModalOpen(false)}
        title="Trigger Data Purging Routine"
        description="Are you sure you want to run the project data purging routine? This will minimize old temporary files, export caches, and expired drafts in accordance with data retention rules."
        variant="warning"
        confirmText={isPurging ? 'Purging...' : 'Execute Data Purge'}
        onConfirm={handleConfirmPurge}
      />

      {/* Success Notification Alert Modal */}
      {purgeSuccessMessage && (
        <AlertModal
          isOpen={!!purgeSuccessMessage}
          onClose={() => setPurgeSuccessMessage(null)}
          title="Data Purge Completed"
          description={purgeSuccessMessage}
          variant="info"
          confirmText="Done"
          onConfirm={() => setPurgeSuccessMessage(null)}
        />
      )}
    </>
  );
};
