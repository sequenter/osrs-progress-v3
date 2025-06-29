import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SummaryItem } from '@components';
import { useActions } from '@hooks/useActions';
import type { Summary } from '@types';
import { ACHIEVEMENTS, COLLECTIONS, PETS, QUESTS, SKILLS } from '@utils/constants';
import { ProgressIcon } from '@utils/icons';
import { useMemo } from 'react';

interface SummaryItems {
  adornment?: string;
  summary: Summary;
  complete: number;
  total: number;
}

/**
 * A summary panel to display progress towards completed skills, achievements, quests, collections, and pets.
 * @returns JSX Element
 */
const SummaryPanel = () => {
  const { completedAchievements, completedCollections, completedPets, completedQuests, completedSkills, QP } =
    useActions();

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
      },
      {
        adornment: `QP: ${QP}`,
        summary: 'quests',
        complete: completedQuests.length,
        total: QUESTS.length
      },
      {
        summary: 'collections',
        complete: completedCollections.length,
        total: COLLECTIONS.length
      },
      {
        summary: 'pets',
        complete: completedPets.length,
        total: PETS.length
      }
    ],
    [completedAchievements, completedCollections, completedPets, completedQuests, completedSkills, QP]
  );

  return (
    <Stack component={Paper} direction="column" elevation={2} flexGrow={1} padding={2} gap={2} square>
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
  );
};

export default SummaryPanel;
