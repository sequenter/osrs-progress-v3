import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { getCompletedSkillCount } from '@redux/reducers/SkillsReducer';
import type { RootState } from '@redux';

import { ProgressIcon } from '@utils/icons';
import { SKILLS } from '@utils/constants';
import { SummaryItem } from '@components';
import { useSelector } from 'react-redux';

const Summary = () => {
  const completedSkillCount = useSelector((state: RootState) => getCompletedSkillCount(state));

  return (
    <Paper elevation={2} sx={{ height: '100%' }} square>
      <Stack direction="column" padding={2} gap={2}>
        <Stack alignItems="center" direction="row" gap={2}>
          <Box component="img" height="2rem" width="2rem" src={ProgressIcon} />
          <Typography color="neutral" variant="h5">
            Progress
          </Typography>
        </Stack>

        <SummaryItem title="Maxed Skills" complete={completedSkillCount} total={SKILLS.length} />
      </Stack>
    </Paper>
  );
};

export default Summary;
