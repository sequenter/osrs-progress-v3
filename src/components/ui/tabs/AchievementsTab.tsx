import { Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ACHIEVEMENTS } from '@utils/constants';
import { achievementDiaryMap } from '@utils/icons';

const AchievementsTab = () => {
  return (
    <Grid spacing={2} container>
      {ACHIEVEMENTS.map(({ diary, difficulty, task }) => (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Stack direction="column" component={Paper} elevation={2} gap={1} padding={2}>
            <Stack alignItems="center" direction="row" justifyContent="space-between">
              <Stack alignItems="center" direction="row" gap={1}>
                <Box component="img" src={achievementDiaryMap[diary]} width="1.5rem" height="1.5rem" />
                <Typography color="neutral" variant="h6">
                  {diary}
                </Typography>
              </Stack>

              <Typography sx={(theme) => ({ color: theme.palette.difficulty.achievements[difficulty] })}>{difficulty}</Typography>
            </Stack>

            <Divider />

            <Typography color="secondary">{task}</Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export default AchievementsTab;
