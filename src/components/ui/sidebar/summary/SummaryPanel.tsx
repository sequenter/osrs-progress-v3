import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ACHIEVEMENTS, SKILLS } from '@utils/constants';
import { ProgressIcon } from '@utils/icons';
import { SummaryItem } from '@components';
import { useActions } from '@hooks/useActions';

const Summary = () => {
  const { completedAchievements, completedSkills } = useActions();

  return (
    <Paper elevation={2} sx={{ height: '100%' }} square>
      <Stack direction="column" padding={2} gap={2}>
        <Stack alignItems="center" direction="row" gap={2}>
          <Box component="img" height="2rem" width="2rem" src={ProgressIcon} />
          <Typography color="neutral" variant="h5">
            Progress
          </Typography>
        </Stack>

        <SummaryItem item="skills" complete={Object.keys(completedSkills).length} total={SKILLS.length} />
        <SummaryItem item="achievements" complete={completedAchievements.length} total={ACHIEVEMENTS.length} />
      </Stack>
    </Paper>
  );
};

export default Summary;
