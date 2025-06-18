import type { RootState } from '@redux';
import { getAchievements } from '@redux/reducers/AchievementsReducer';
import { getCombat, getSkills } from '@redux/reducers/SkillsReducer';

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
  const { combat, combatLevel } = useSelector((state: RootState) => getCombat(state));

  const unlockedSkills = useMemo(
    /**
     * Get currently unlocked skills.
     * @returns {PartialSkillState} An object containing unlocked skills
     */
    (): PartialSkillState => {
      console.time('unlockedSkills');

      const ret = Object.entries(skills).reduce(
        (acc, [skill, detail]) => (detail.isLocked ? acc : { ...acc, [skill]: detail }),
        {} as PartialSkillState
      );

      console.timeEnd('unlockedSkills');

      return ret;
    },
    [skills]
  );

  const completedSkills = useMemo(
    /**
     * Get skills levelled to 99.
     * @returns {PartialSkillState} An object containing completed skills
     */
    (): PartialSkillState => {
      console.time('completedSkills');

      const ret = Object.entries(unlockedSkills).reduce(
        (acc, [skill, detail]) => (detail.level < 99 ? acc : { ...acc, [skill]: detail }),
        {} as PartialSkillState
      );

      console.timeEnd('completedSkills');

      return ret;
    },
    [unlockedSkills]
  );

  const [completedAchievements, unlockedAchievements, lockedAchievements] = useMemo(
    /**
     * Get completed, unlocked, and locked achievements.
     * Completed achievements: achievements marked complete
     * Unlocked achievements: achievements that have their requirements criteria met
     * Locked achievements: achievements that do not have their requirements criteria met
     * @returns An array containing completed, unlocked, and locked achievements
     */
    () => {
      console.time('achievements');

      const ret = trifilter(achievements, ({ isComplete, requirements }) =>
        isComplete ? 0 : isRequirementsFulfilled(combat, unlockedSkills, requirements) ? 1 : 2
      );

      console.timeEnd('achievements');

      return ret;
    },
    [achievements, combat, unlockedSkills]
  );

  return (
    <ActionsContext.Provider
      value={{
        skills,
        completedSkills,
        unlockedSkills,
        completedAchievements,
        unlockedAchievements,
        lockedAchievements,
        combat,
        combatLevel
      }}
    >
      {children}
    </ActionsContext.Provider>
  );
};

export default ActionsProvider;
