import Stack from '@mui/material/Stack';

import { AchievementSection } from '@components';
import { useActions } from '@hooks/useActions';

const AchievementsTab = () => {
  const { completedAchievements, lockedAchievements, unlockedAchievements } = useActions();

  return (
    <Stack direction="column" gap={2}>
      <AchievementSection achievements={unlockedAchievements} completion="unlocked" />
      <AchievementSection achievements={lockedAchievements} completion="locked" />
      <AchievementSection achievements={completedAchievements} completion="completed" />
    </Stack>
  );
};

export default AchievementsTab;
