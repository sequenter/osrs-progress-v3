import { getAchievements } from '@redux/reducers/AchievementsReducer';
import { getQuests } from '@redux/reducers/QuestsReducer';
import { getCombat, getSkills } from '@redux/reducers/SkillsReducer';

import { useStoreSelector } from '@hooks';
import { ActionsContext } from '@hooks/useActions';
import type { PartialSkillState } from '@types';
import { bifilter, isRequirementsFulfilled, isRewardsFulfilled, trifilter } from '@utils/common';
import { useMemo, type ReactNode } from 'react';

interface ActionsProps {
  children: ReactNode;
}

const ActionsProvider = ({ children }: ActionsProps) => {
  const { combat, combatLevel } = useStoreSelector((state) => getCombat(state));
  const achievements = useStoreSelector((state) => getAchievements(state));
  const quests = useStoreSelector((state) => getQuests(state));
  const skills = useStoreSelector((state) => getSkills(state));

  const unlockedSkills = useMemo(
    /**
     * Get currently unlocked skills.
     * @returns {PartialSkillState} An object containing unlocked skills
     */
    (): PartialSkillState =>
      Object.entries(skills).reduce(
        (acc, [skill, detail]) => (detail.isLocked ? acc : { ...acc, [skill]: detail }),
        {} as PartialSkillState
      ),

    [skills]
  );

  const completedSkills = useMemo(
    /**
     * Get skills levelled to 99.
     * @returns {PartialSkillState} An object containing completed skills
     */
    (): PartialSkillState =>
      Object.entries(unlockedSkills).reduce(
        (acc, [skill, detail]) => (detail.level < 99 ? acc : { ...acc, [skill]: detail }),
        {} as PartialSkillState
      ),

    [unlockedSkills]
  );

  const [incompleteQuests, completedQuests] = useMemo(
    /**
     * Get complete, and incomplete quests.
     * Complete quests: quests marked complete
     * Incomplete quests: quests marked incomplete
     * @returns An array containing incomplete, and complete quests
     */
    () => {
      return bifilter(quests, ({ isComplete }) => isComplete);
    },
    [quests]
  );

  const [lockedQuests, unlockedQuests] = useMemo(
    /**
     * Get unlocked, and locked achievements.
     * Unlocked quests: quests that have their requirements criteria met, and have their reward skills unlocked
     * Locked quests: quests that do not have their requirements criteria met
     * @returns An array containing locked, and unlocked quests
     */
    () => {
      return bifilter(
        incompleteQuests,
        ({ requirements, rewards }) =>
          isRequirementsFulfilled(combat, completedQuests, unlockedSkills, requirements) &&
          isRewardsFulfilled(rewards, unlockedSkills)
      );
    },
    [combat, completedQuests, incompleteQuests, unlockedSkills]
  );

  const [completedAchievements, unlockedAchievements, lockedAchievements] = useMemo(
    /**
     * Get completed, unlocked, and locked achievements.
     * Completed achievements: achievements marked complete
     * Unlocked achievements: achievements that have their requirements criteria met
     * Locked achievements: achievements that do not have their requirements criteria met
     * @returns An array containing completed, unlocked, and locked achievements
     */
    () =>
      trifilter(achievements, ({ isComplete, requirements }) => {
        // Complete
        if (isComplete) {
          return 0;
        }

        // Unlocked
        if (isRequirementsFulfilled(combat, completedQuests, unlockedSkills, requirements)) {
          return 1;
        }

        // Locked
        return 2;
      }),

    [achievements, combat, completedQuests, unlockedSkills]
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
        completedQuests,
        unlockedQuests,
        lockedQuests,
        combat,
        combatLevel
      }}
    >
      {children}
    </ActionsContext.Provider>
  );
};

export default ActionsProvider;
