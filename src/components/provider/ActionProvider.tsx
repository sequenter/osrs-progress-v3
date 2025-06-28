import { getAchievements } from '@redux/reducers/AchievementsReducer';
import { getPets } from '@redux/reducers/PetsReducer';
import { getQP, getQuests } from '@redux/reducers/QuestsReducer';
import { getCombat, getSkills } from '@redux/reducers/SkillsReducer';

import { useStoreSelector } from '@hooks';
import { ActionsContext } from '@hooks/useActions';
import type { PartialSkillState } from '@types';
import { bifilter, isRequirementsFulfilled, isRewardsFulfilled, trifilter, trifilterRequirements } from '@utils/common';
import { useMemo, type ReactNode } from 'react';

interface ActionsProps {
  children: ReactNode;
}

const ActionsProvider = ({ children }: ActionsProps) => {
  const { combat, combatLevel } = useStoreSelector((state) => getCombat(state));
  const achievements = useStoreSelector((state) => getAchievements(state));
  const pets = useStoreSelector((state) => getPets(state));
  const QP = useStoreSelector((state) => getQP(state));
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
     * Get skills that are at level 99.
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
     * Incomplete quests: all other non complete quests
     * @returns An array containing incomplete, and complete quests
     */
    () => {
      return bifilter(quests, ({ isComplete }) => isComplete);
    },
    [quests]
  );

  const [lockedQuests, unlockedQuests] = useMemo(
    /**
     * Get unlocked, and locked quests.
     * Unlocked quests: quests that have their requirements criteria met, and have their reward skills unlocked
     * Locked quests: quests that do not have their requirements criteria met
     * @returns An array containing locked, and unlocked quests
     */
    () => {
      return bifilter(
        incompleteQuests,
        ({ requirements, rewards }) =>
          isRequirementsFulfilled(combat, combatLevel, QP, completedQuests, unlockedSkills, requirements) &&
          isRewardsFulfilled(rewards, unlockedSkills)
      );
    },
    [combat, combatLevel, QP, completedQuests, incompleteQuests, unlockedSkills]
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
      trifilter(achievements, ({ isComplete, requirements }) =>
        trifilterRequirements(isComplete, combat, combatLevel, QP, completedQuests, unlockedSkills, requirements)
      ),

    [achievements, combat, combatLevel, QP, completedQuests, unlockedSkills]
  );

  const [completedPets, unlockedPets, lockedPets] = useMemo(
    /**
     * Get completed, unlocked, and locked pets.
     * Completed pets: pets marked complete
     * Unlocked pets: pets that have their requirements criteria met
     * Locked pets: pets that do not have their requirements criteria met
     * @returns An array containing completed, unlocked, and locked pets
     */
    () =>
      trifilter(pets, ({ isComplete, requirements }) =>
        trifilterRequirements(isComplete, combat, combatLevel, QP, completedQuests, unlockedSkills, requirements)
      ),
    [pets, combat, combatLevel, QP, completedQuests, unlockedSkills]
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
        completedPets,
        unlockedPets,
        lockedPets,
        completedQuests,
        unlockedQuests,
        lockedQuests,
        combat,
        combatLevel,
        QP
      }}
    >
      {children}
    </ActionsContext.Provider>
  );
};

export default ActionsProvider;
