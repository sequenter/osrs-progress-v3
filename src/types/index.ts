import type {
  ACHIEVEMENT,
  ACHIEVEMENT_DIARIES,
  ACHIEVEMENT_DIFFICULTY,
  COLLECTION,
  COMBAT_SKILLS,
  ITEM,
  PET,
  QUEST,
  QUEST_DIFFICULTY,
  QUEST_LENGTH,
  REQUIREMENTS,
  REWARDS,
  SKILLING_SKILLS,
  SKILLS_REQUIREMENT,
  SUMMARY_ITEMS
} from '@utils/schema';
import type z from 'zod/v4';

/* UNIONS */

export type AchievementDifficulty = (typeof ACHIEVEMENT_DIFFICULTY)[number];
export type AchievementDiary = (typeof ACHIEVEMENT_DIARIES)[number];
export type QuestDifficulty = (typeof QUEST_DIFFICULTY)[number];
export type QuestLength = (typeof QUEST_LENGTH)[number];

export type CombatSkill = (typeof COMBAT_SKILLS)[number];
export type SkillingSkill = (typeof SKILLING_SKILLS)[number];
export type Skill = CombatSkill | SkillingSkill;

export type Completion = 'unlocked' | 'locked' | 'completed';

export type Summary = (typeof SUMMARY_ITEMS)[number];

/* COMMON */

export type Requirements = z.infer<typeof REQUIREMENTS>;

export type SkillsRequirement = z.infer<typeof SKILLS_REQUIREMENT>;

/* SKILLS */

interface SkillDetail {
  level: number;
  isLocked: boolean;
}

export type SkillState = Record<Skill, SkillDetail>;

export type PartialSkillState = Partial<Record<Skill, SkillDetail>>;

/* ACHIEVEMENTS */

export type Achievement = z.infer<typeof ACHIEVEMENT>;

export interface AchievementState extends Achievement {
  isComplete: boolean;
}

export type AchievementsState = Array<AchievementState>;

/* QUESTS */

export type Rewards = z.infer<typeof REWARDS>;

export type Quest = z.infer<typeof QUEST>;

export interface QuestState extends Quest {
  isComplete: boolean;
}

export type QuestsState = Array<QuestState>;

/* PETS */

export type Pet = z.infer<typeof PET>;

export interface PetState extends Pet {
  isComplete: boolean;
}

export type PetsState = Array<PetState>;

/* COLLECTIONS */

type Item = z.infer<typeof ITEM>;

export type Collection = z.infer<typeof COLLECTION>;

export interface ItemState extends Item {
  isComplete: boolean;
}

export interface CollectionState extends Omit<Collection, 'items'> {
  items: Array<ItemState>;
  isComplete: boolean;
}

export type CollectionsState = Array<CollectionState>;
