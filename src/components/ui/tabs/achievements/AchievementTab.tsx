import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import { AchievementItem, Section } from '@components';
import { useActions } from '@hooks/useActions';
import type { AchievementState, Completion } from '@types';
import { useMemo } from 'react';

interface Sections {
  completion: Completion;
  achievements: AchievementState;
}

const AchievementsTab = () => {
  const { completedAchievements, lockedAchievements, unlockedAchievements } = useActions();

  const sections: Array<Sections> = useMemo(
    () => [
      {
        completion: 'unlocked',
        achievements: unlockedAchievements
      },
      {
        completion: 'locked',
        achievements: lockedAchievements
      },
      {
        completion: 'completed',
        achievements: completedAchievements
      }
    ],
    [completedAchievements, lockedAchievements, unlockedAchievements]
  );

  return (
    <Stack direction="column" gap={2}>
      {sections.map(({ completion, achievements }) => (
        <Section key={completion} completion={completion} count={achievements.length}>
          <Grid spacing={2} container>
            {achievements.map(({ diary, difficulty, task }) => (
              <AchievementItem key={task} completion={completion} diary={diary} difficulty={difficulty} task={task} />
            ))}
          </Grid>
        </Section>
      ))}
    </Stack>
  );
};

export default AchievementsTab;
