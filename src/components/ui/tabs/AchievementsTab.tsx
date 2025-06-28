import { setIsComplete } from '@redux/reducers/AchievementsReducer';

import { Tab } from '@components';
import { useActions } from '@hooks/useActions';
import type { Achievement } from '@types';
import { diaryIconMap } from '@utils/icons';

/**
 * Renders unlocked, locked, and completed achievements.
 * @returns JSX Element
 */
const AchievementsTab = () => {
  const { completedAchievements, lockedAchievements, unlockedAchievements } = useActions();

  /**
   * Get details for an Achievement item.
   */
  const handleItemDetails = ({ diary, difficulty, task }: Achievement) => ({
    difficulty,
    description: task,
    icon: diaryIconMap[diary],
    id: task,
    title: diary
  });

  return (
    <Tab<Achievement>
      completed={completedAchievements}
      locked={lockedAchievements}
      unlocked={unlockedAchievements}
      getItemDetails={handleItemDetails}
      onCompletion={setIsComplete}
    />
  );
};

export default AchievementsTab;
