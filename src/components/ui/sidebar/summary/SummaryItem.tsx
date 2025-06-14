import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

interface SummaryItemProps {
  complete: number;
  title: string;
  total: number;
}

const SummaryItem = ({ complete, title, total }: SummaryItemProps) => {
  return (
    <Stack direction="column" component={Paper} elevation={4} gap={2} padding={2}>
      <Typography variant="h5">{title}</Typography>

      <LinearProgress
        variant="determinate"
        value={(complete / total) * 100}
        sx={(theme) => ({
          backgroundColor: theme.palette.summary.skills.light,
          borderRadius: 5,
          height: 10,
          '& .MuiLinearProgress-bar': { backgroundColor: theme.palette.summary.skills.dark }
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

export default SummaryItem;
