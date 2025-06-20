import Cancel from '@mui/icons-material/Cancel';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Info from '@mui/icons-material/Info';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import type { AchievementDifficulty, Completion, QuestDifficulty } from '@types';
import { memo } from 'react';

interface SectionItemProps {
  completion: Completion;
  completionId: string;
  description?: string;
  difficulty?: AchievementDifficulty | QuestDifficulty;
  icon: string;
  title: string;
  test: string;
  onCompletion: (isComplete: boolean, completionId: string) => void;
}

/**
 * A Grid item utilised to display an achievement, task, or pet.
 * @param {object} props Properties object
 * @param {Completion} props.completion Completion type
 * @param {string} props.completionId Identifier for the onCompletion callback
 * @param {string} [props.description = undefined] Optional description to render
 * @param {AchievementDifficulty | QuestDifficulty} [props.difficulty = undefined] Optional difficulty to render
 * @param {string} props.icon The icon to render to the left of the title
 * @param {string} props.title The title of the section item
 * @param {Consumer<boolean>} props.onCompletion On mark complete/incomplete callback
 * @returns JSX Element
 */
const SectionItem = ({
  completion,
  completionId,
  description,
  difficulty,
  icon,
  title,
  onCompletion
}: SectionItemProps) => {
  return (
    <Grid component={Stack} size={{ xs: 12, md: 6, lg: 4 }}>
      <Stack component={Paper} divider={<Divider />} direction="column" elevation={2} flexGrow={1} gap={1} padding={2}>
        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <Stack alignItems="center" direction="row" gap={1}>
            <Box component="img" src={icon} />

            <Typography color="neutral" variant="h6">
              {title}
            </Typography>
          </Stack>

          {difficulty && (
            <Typography sx={(theme) => ({ color: theme.palette.difficulty.achievements[difficulty] })}>
              {difficulty}
            </Typography>
          )}
        </Stack>

        {description && (
          <Typography color="secondary" component={Stack} flexGrow={1}>
            {description}
          </Typography>
        )}

        <Stack alignItems="center" direction="row" justifyContent={completion === 'locked' ? 'end' : 'space-between'}>
          {completion === 'unlocked' && (
            <Tooltip placement="top" title={<Typography>Mark as complete</Typography>} arrow>
              <IconButton
                color="success"
                sx={{ padding: 0 }}
                onClick={() => {
                  onCompletion(true, completionId);
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
                  onCompletion(false, completionId);
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

export default memo(SectionItem);
