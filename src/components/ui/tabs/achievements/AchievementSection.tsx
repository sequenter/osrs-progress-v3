import { ExpandCircleDown } from '@mui/icons-material';

import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { AchievementItem } from '@components';
import type { AchievementState, Completion } from '@types';
import { useState } from 'react';

interface AchievementSectionProps {
  achievements: AchievementState;
  completion: Completion;
}

const AchievementSection = ({ achievements, completion }: AchievementSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Stack direction="column" gap={1}>
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        <Typography color="neutral" variant="h5" textTransform="capitalize">
          {completion}
        </Typography>

        <Stack alignItems="center" direction="row" gap={1}>
          <Tooltip placement="top" title={<Typography>Tasks {completion}</Typography>} arrow>
            <Chip
              color={completion === 'unlocked' ? 'neutral' : completion === 'locked' ? 'error' : 'success'}
              size="small"
              label={<Typography variant="subtitle1">{achievements.length}</Typography>}
            />
          </Tooltip>

          <IconButton
            color="neutral"
            sx={{ transform: `rotate(${isExpanded ? 180 : 0}deg)` }}
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            <ExpandCircleDown />
          </IconButton>
        </Stack>
      </Stack>

      {isExpanded && (
        <Grid spacing={2} container sx={{ visibility: isExpanded ? 'visible' : 'hidden' }}>
          {achievements.map(({ diary, difficulty, task }) => (
            <AchievementItem key={task} completion={completion} diary={diary} difficulty={difficulty} task={task} />
          ))}
        </Grid>
      )}
    </Stack>
  );
};

export default AchievementSection;
