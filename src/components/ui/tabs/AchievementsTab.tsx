import { setIsComplete } from '@redux/reducers/AchievementsReducer';

import { SectionItem, Tab } from '@components';
import { useActions } from '@hooks/useActions';
import type { AchievementState, Completion } from '@types';
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
  const handleItemDetails = ({ diary, difficulty, requirements, task }: AchievementState, completion: Completion) => (
    <SectionItem
      key={task}
      completion={completion}
      description={task}
      difficulty={difficulty}
      icon={diaryIconMap[diary]}
      id={task}
      requirements={requirements}
      title={diary}
      onCompletion={setIsComplete}
    />
  );

  return (
    <Tab<AchievementState>
      completed={completedAchievements}
      locked={lockedAchievements}
      unlocked={unlockedAchievements}
      getItem={handleItemDetails}
    />
  );
};

export default AchievementsTab;
