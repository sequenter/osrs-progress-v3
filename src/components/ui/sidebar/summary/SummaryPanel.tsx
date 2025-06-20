import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SummaryItem } from '@components';
import { useActions } from '@hooks/useActions';
import type { Summary } from '@types';
import { ACHIEVEMENTS, SKILLS } from '@utils/constants';
import { ProgressIcon } from '@utils/icons';
import { useMemo } from 'react';

interface SummaryItems {
  summary: Summary;
  complete: number;
  total: number;
}

/**
 * A summary panel to display progress towards completed skills, achievements, quests, collections, and pets.
 * @returns JSX Element
 */
const SummaryPanel = () => {
  const { completedAchievements, completedSkills } = useActions();

  const summaryItems = useMemo(
    /**
     * Mapped summary items.
     * @returns {Array<SummaryItems>}
     */
    (): Array<SummaryItems> => [
      {
        summary: 'skills',
        complete: Object.keys(completedSkills).length,
        total: SKILLS.length
      },
      {
        summary: 'achievements',
        complete: completedAchievements.length,
        total: ACHIEVEMENTS.length
      }
    ],
    [completedAchievements, completedSkills]
  );

  return (
    <Paper elevation={2} sx={{ height: '100%' }} square>
      <Stack direction="column" padding={2} gap={2}>
        <Stack alignItems="center" direction="row" gap={2}>
          <Box component="img" height="2rem" width="2rem" src={ProgressIcon} />
          <Typography color="neutral" variant="h5">
            Progress
          </Typography>
        </Stack>

        {summaryItems.map((summaryItem) => (
          <SummaryItem key={summaryItem.summary} {...summaryItem} />
        ))}
      </Stack>
    </Paper>
  );
};

export default SummaryPanel;
