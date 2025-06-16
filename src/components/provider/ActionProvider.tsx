import type { RootState } from '@redux';
import { getAchievements } from '@redux/reducers/AchievementsReducer';
import { getSkills } from '@redux/reducers/SkillsReducer';

import { ActionsContext } from '@hooks/useActions';
import type { PartialSkillState } from '@types';
import { isRequirementsFulfilled, trifilter } from '@utils/common';
import { useMemo, type ReactNode } from 'react';
import { useSelector } from 'react-redux';

interface ActionsProps {
  children: ReactNode;
}

const ActionsProvider = ({ children }: ActionsProps) => {
  const achievements = useSelector((state: RootState) => getAchievements(state));
  const skills = useSelector((state: RootState) => getSkills(state));

  const unlockedSkills = useMemo(
    () =>
      Object.entries(skills).reduce(
        (acc, [skill, detail]) => (detail.isLocked ? acc : { ...acc, [skill]: detail }),
        {} as PartialSkillState
      ),
    [skills]
  );

  const completedSkills = useMemo(
    () =>
      Object.entries(unlockedSkills).reduce(
        (acc, [skill, detail]) => (detail.level < 99 ? acc : { ...acc, [skill]: detail }),
        {} as PartialSkillState
      ),

    [unlockedSkills]
  );

  const [completedAchievements, unlockedAchievements, lockedAchievements] = useMemo(
    () =>
      trifilter(achievements, ({ isComplete, requirements }) =>
        isComplete ? 0 : isRequirementsFulfilled(unlockedSkills, requirements) ? 1 : 2
      ),
    [achievements, unlockedSkills]
  );

  return (
    <ActionsContext.Provider
      value={{
        skills,
        completedSkills,
        unlockedSkills,
        completedAchievements,
        unlockedAchievements,
        lockedAchievements
      }}
    >
      {children}
    </ActionsContext.Provider>
  );
};

export default ActionsProvider;
