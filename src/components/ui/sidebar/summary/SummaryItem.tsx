import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import type { Summary } from '@types';
import { memo } from 'react';

interface SummaryItemProps {
  adornment?: string;
  complete: number;
  summary: Summary;
  total: number;
}

/**
 * A summary item, that displays a progress bar and complete, incomplete, and total counts to show progress.
 * @param {object} props Properties object
 * @param {number} props.complete Complete count
 * @param {Summary} props.summary Summary type used as a title
 * @param {number} props.total Total count
 * @returns JSX Element
 */
const SummaryItem = ({ adornment, complete, summary, total }: SummaryItemProps) => {
  return (
    <Stack direction="column" component={Paper} elevation={4} flexGrow={1} gap={2} padding={2}>
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        <Stack direction="row" gap={2}>
          <Typography color="neutral" variant="h5" textTransform="capitalize">
            {summary}
          </Typography>

          {adornment && (
            <Typography color="neutral" variant="h6">
              {adornment}
            </Typography>
          )}
        </Stack>

        <Typography color="neutral" variant="h6">{`${((complete / total) * 100).toFixed(2)}%`}</Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={(complete / total) * 100}
        sx={(theme) => ({
          backgroundColor: theme.palette.summary[summary].light,
          borderRadius: 5,
          height: 10,
          '& .MuiLinearProgress-bar': { backgroundColor: theme.palette.summary[summary].dark }
        })}
      />

      <Stack direction="row" justifyContent="space-between" gap={1}>
        <Tooltip title={<Typography>Complete</Typography>} arrow>
          <Typography
            alignItems="center"
            fontWeight="bold"
            component={Stack}
            flexGrow={1}
            sx={(theme) => ({
              backgroundColor: theme.palette.background.default,
              borderRadius: '4px 0 0 4px',
              color: theme.palette.success.light
            })}
          >
            {complete}
          </Typography>
        </Tooltip>

        <Tooltip title={<Typography>Total</Typography>} arrow>
          <Typography
            alignItems="center"
            fontWeight="bold"
            component={Stack}
            flexGrow={1}
            sx={(theme) => ({ backgroundColor: theme.palette.background.default, color: theme.palette.neutral.main })}
          >
            {total}
          </Typography>
        </Tooltip>

        <Tooltip title={<Typography>Incomplete</Typography>} arrow>
          <Typography
            alignItems="center"
            fontWeight="bold"
            component={Stack}
            flexGrow={1}
            sx={(theme) => ({
              backgroundColor: theme.palette.background.default,
              borderRadius: '0 4px 4px 0',
              color: theme.palette.error.light
            })}
          >
            {total - complete}
          </Typography>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default memo(SummaryItem);
