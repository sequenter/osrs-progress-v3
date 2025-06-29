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

import { useStoreDispatch } from '@hooks';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit/react';
import type { AchievementDifficulty, Completion, QuestDifficulty, Requirements, Rewards } from '@types';
import { WIKI_IMAGES_ERROR } from '@utils/constants';
import { memo, useCallback, useMemo, useState } from 'react';

interface SectionItemProps {
  completion: Completion;
  description?: string;
  difficulty?: AchievementDifficulty | QuestDifficulty;
  icon: string;
  id: string;
  requirements: Requirements;
  rewards?: Rewards;
  title: string;
  onCompletion: ActionCreatorWithPayload<{ id: string; isComplete: boolean }>;
}

/**
 * A Grid item utilised to display an achievement, task, or pet.
 * @param {object} props Properties object
 * @param {Completion} props.completion Completion type
 * @param {string} props.completionId Identifier for the onCompletion callback
 * @param {string} [props.description = undefined] Optional description to render
 * @param {AchievementDifficulty | QuestDifficulty} [props.difficulty = undefined] Optional difficulty to render
 * @param {string} props.icon The icon to render to the left of the title
 * @param {Requirements} props.requirements The requirements of the section item
 * @param {Rewards} [props.rewards=undefined] Optional rewards of the section item
 * @param {string} props.title The title of the section item
 * @param {ActionCreatorWithPayload<{ id: string; isComplete: boolean }>} props.onCompletion Completion dispatch function
 * @returns JSX Element
 */
const SectionItem = ({
  completion,
  description,
  difficulty,
  icon,
  id,
  requirements,
  rewards,
  title,
  onCompletion
}: SectionItemProps) => {
  const [iconSrc, setIconSrc] = useState(icon);

  const dispatch = useStoreDispatch();

  const requirementsEnabled = useMemo(() => {
    return (
      Object.keys(requirements).length > 0 ||
      (rewards !== undefined && rewards.skills && Object.keys(rewards.skills).length > 0)
    );
  }, [requirements, rewards]);

  const handleIconError = useCallback(() => {
    setIconSrc(WIKI_IMAGES_ERROR);
  }, []);

  const handleCompletion = useCallback(
    (isComplete: boolean) => {
      dispatch(onCompletion({ isComplete, id }));
    },
    [id, dispatch, onCompletion]
  );

  return (
    <Grid component={Stack} size={{ xs: 12, md: 6, lg: 4 }}>
      <Stack component={Paper} divider={<Divider />} direction="column" elevation={2} flexGrow={1} gap={1} padding={2}>
        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <Stack alignItems="center" direction="row" gap={1}>
            <Box component="img" height="1.5rem" width="1.5rem" src={iconSrc} onError={handleIconError} />

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

          <Tooltip
            placement="top"
            title={<Typography>{`${!requirementsEnabled ? 'No ' : ''}Requirements`}</Typography>}
            arrow
          >
            <span>
              <IconButton
                color="neutral"
                disabled={!requirementsEnabled}
                sx={[{ padding: 0 }, !requirementsEnabled && { opacity: '20%' }]}
                onClick={() => {}}
              >
                <Info />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default memo(SectionItem);
