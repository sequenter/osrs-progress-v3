import { Cancel, CheckCircle, Info } from '@mui/icons-material';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { setIsComplete } from '@redux/reducers/AchievementsReducer';
import { useDispatch } from 'react-redux';

import type { AchievementDiary, AchievementDifficulty, Completion } from '@types';
import { diaryIconMap } from '@utils/icons';
import { memo, useCallback } from 'react';

interface AchievementItemProps {
  completion: Completion;
  diary: AchievementDiary;
  difficulty: AchievementDifficulty;
  task: string;
}

const AchievementItem = ({ completion, diary, difficulty, task }: AchievementItemProps) => {
  const dispatch = useDispatch();

  const handleCompletion = useCallback(
    (isComplete: boolean) => {
      dispatch(setIsComplete({ task, isComplete }));
    },
    [task, dispatch]
  );

  return (
    <Grid key={task} component={Stack} size={{ xs: 12, md: 6, lg: 4 }}>
      <Stack direction="column" component={Paper} elevation={2} flexGrow={1} gap={1} padding={2}>
        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <Stack alignItems="center" direction="row" gap={1}>
            <Box component="img" src={diaryIconMap[diary]} />
            <Typography color="neutral" variant="h6">
              {diary}
            </Typography>
          </Stack>

          <Typography sx={(theme) => ({ color: theme.palette.difficulty.achievements[difficulty] })}>
            {difficulty}
          </Typography>
        </Stack>

        <Divider />

        <Typography color="secondary" component={Stack} flexGrow={1}>
          {task}
        </Typography>

        <Divider />

        <Stack alignItems="center" justifyContent={completion === 'locked' ? 'end' : 'space-between'} direction="row">
          {completion === 'unlocked' && (
            <Tooltip placement="top" title={<Typography>Mark as complete</Typography>} arrow>
              <IconButton
                color="success"
                sx={{ padding: 0 }}
                onClick={() => {
                  handleCompletion(true);
                }}
              >
                <CheckCircle />
              </IconButton>
            </Tooltip>
          )}

          {completion === 'completed' && (
            <Tooltip placement="top" title={<Typography>Mark as incomplete</Typography>} arrow>
              <IconButton
                color="error"
                sx={{ padding: 0 }}
                onClick={() => {
                  handleCompletion(false);
                }}
              >
                <Cancel />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip placement="top" title={<Typography>Requirements</Typography>} arrow>
            <IconButton color="neutral" sx={{ padding: 0 }} onClick={() => {}}>
              <Info />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default memo(AchievementItem);
