import { setIsComplete } from '@redux/reducers/AchievementsReducer';

import { SectionItem, Tab } from '@components';
import { useActions } from '@hooks/useActions';
import type { Achievement, Completion } from '@types';
import { diaryIconMap } from '@utils/icons';

/**
 * Renders unlocked, locked, and completed achievements.
 * @returns JSX Element
 */
const AchievementsTab = () => {
  const { completedAchievements, lockedAchievements, unlockedAchievements } = useActions();

  /**
   * Returns a section item utilising a given Achievement.
   */
  const handleItemDetails = ({ diary, difficulty, task }: Achievement, completion: Completion) => (
    <SectionItem
      key={task}
      completion={completion}
      description={task}
      difficulty={difficulty}
      icon={diaryIconMap[diary]}
      id={task}
      title={diary}
      onCompletion={setIsComplete}
    />
  );

  return (
    <Tab<Achievement>
      completed={completedAchievements}
      locked={lockedAchievements}
      unlocked={unlockedAchievements}
      getItem={handleItemDetails}
    />
  );
};

export default AchievementsTab;
