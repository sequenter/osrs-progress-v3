import * as z from 'zod/v4';

/* UTILS */

/**
 * Parse a JSON object against a given schema.
 * @param schema The schema to verify JSON against
 * @param json The JSON to parse
 * @returns The parsed JSON object
 */
export const parseJSON = <T extends z.ZodObject>(schema: T, json: unknown) => {
  try {
    return z.array(schema).parse(json);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
    }
  }

  return [];
};

/* UNION ARRAYS */

export const SUMMARY_ITEMS = ['skills', 'achievements', 'quests', 'collections', 'pets'] as const;

export const ACHIEVEMENT_DIFFICULTY = ['Easy', 'Medium', 'Hard', 'Elite'] as const;

export const ACHIEVEMENT_DIARIES = [
  'Ardougne',
  'Desert',
  'Falador',
  'Fremennik',
  'Kandarin',
  'Karamja',
  'Kourend & Kebos',
  'Lumbridge & Draynor',
  'Morytania',
  'Varrock',
  'Western Provinces',
  'Wilderness'
] as const;

export const QUEST_DIFFICULTY = ['Novice', 'Intermediate', 'Experienced', 'Master', 'Grandmaster', 'Special'] as const;

export const QUEST_LENGTH = ['Very Short', 'Short', 'Medium', 'Long', 'Very Long'] as const;

export const COMBAT_SKILLS = ['Attack', 'Strength', 'Defence', 'Ranged', 'Prayer', 'Magic', 'Hitpoints'] as const;

export const SKILLING_SKILLS = [
  'Runecraft',
  'Construction',
  'Agility',
  'Herblore',
  'Thieving',
  'Crafting',
  'Fletching',
  'Slayer',
  'Hunter',
  'Mining',
  'Smithing',
  'Fishing',
  'Cooking',
  'Firemaking',
  'Woodcutting',
  'Farming'
] as const;

export const SKILLS = [...COMBAT_SKILLS, ...SKILLING_SKILLS] as const;

/* COMMON SCHEMAS */

/**
 * A record containing skills and their corresponding required level.
 * @example { "Agility": 15 }
 */
const SKILL_LEVEL = z.partialRecord(z.literal(SKILLS), z.number()).optional();

/**
 * An object containing records of 'all' and 'any' skills requirements.
 * all: Every {@link SKILL_LEVEL} must be fulfilled
 * any: At least one {@link SKILL_LEVEL} must be fulfilled
 * @example { "all": {...}, "any": {...} }
 */
export const SKILLS_REQUIREMENT = z.object({
  all: SKILL_LEVEL.optional(),
  any: SKILL_LEVEL.optional()
});

/**
 * An object containing requirement details.
 * combat: Whether or not combat is required, such as having to defeat enemies
 * combatLevel: Combat level required
 * QP: Quest points required
 * quests: A list of quests that need to be completed, by quest name
 * skills: A record containing {@link SKILLS_REQUIREMENT}
 * @example
 * {
 *   "combat": true,
 *   "combatLevel": 40,
 *   "QP": 12,
 *   "quests": ["Demon Slayer"],
 *   "skills": {...}
 * }
 */
const ANY_REQUIREMENT = z.object({
  combat: z.boolean().optional(),
  combatLevel: z.number().optional(),
  QP: z.number().optional(),
  quests: z.array(z.string()).optional(),
  skills: SKILLS_REQUIREMENT.optional()
});

/**
 * An object containing requirements and a description.
 * description: The description of the requirement
 * required: An array of {@link ANY_REQUIREMENT}, where at least one must be fulfilled
 * @example
 * {
 *   "description": "Partial completion of 'Ratcatchers'",
 *   "required": [...]
 * }
 */
const ALL_REQUIREMENT = z.object({
  description: z.string().optional(),
  required: z.array(ANY_REQUIREMENT)
});

/**
 * An object containing either main or ironman requirements, all of which need to be filfilled.
 * main: {@link ALL_REQUIREMENT} that need to be fulfilled regardless of account type
 * ironman: {@link ALL_REQUIREMENT} that are specific to ironmen
 * @example
 * {
 *   main: [...],
 *   ironman: [...]
 * }
 */
export const REQUIREMENTS = z.object({
  main: z.array(ALL_REQUIREMENT).optional(),
  ironman: z.array(ALL_REQUIREMENT).optional()
});

/* ACHIEVEMENT */

/**
 * An object detailing an achievement.
 * diary: The name of the {@link ACHIEVEMENT_DIARIES}
 * difficulty: The {@link ACHIEVEMENT_DIFFICULTY} of the achievement
 * task: The task to complete for the achievement
 * requirements: A record of {@link REQUIREMENTS}
 * @example
 * {
 *   "diary": "Ardougne",
 *   "difficulty": "Medium",
 *   "task": "Cast the Ardougne Teleport spell",
 *   "requirements": {...}
 * }
 */
export const ACHIEVEMENT = z.object({
  diary: z.literal(ACHIEVEMENT_DIARIES),
  difficulty: z.literal(ACHIEVEMENT_DIFFICULTY),
  task: z.string(),
  requirements: REQUIREMENTS
});

/* QUEST */

/**
 * An object containing records of 'all' and 'any' skill rewards.
 * all: A list of skills that will always be rewarded with xp
 * any: A list of skills that can potentially be rewarded with xp
 * @example { "all": {...}, "any": {...} }
 */
const SKILL_REWARDS = z.object({
  all: z.array(z.literal(SKILLS)).optional(),
  any: z.array(z.literal(SKILLS)).optional()
});

/**
 * An object containing quest rewards.
 * QP: The amount of quest points rewarded
 * skills: {@link SKILL_REWARDS}
 * @example { "QP": 2, "skills": {...} }
 */
export const REWARDS = z.object({
  QP: z.number().optional(),
  skills: SKILL_REWARDS.optional()
});

/**
 * An object detailing a quest.
 * difficulty: The {@link QUEST_DIFFICULTY} of the quest
 * icon: The name of the icon from the wiki
 * length: The {@link QUEST_LENGTH} of the quest
 * name: The name of the quest
 * release: The date of release of the quest
 * requirements: A record of {@link REQUIREMENTS}
 * rewards: A record of {@link REWARDS}
 * @example
 * {
 *   "difficulty": "Master",
 *   "icon": "Scythe of vitur",
 *   "length": "Medium",
 *   "name": "A Night at the Theatre",
 *   "release": "3 June 2021",
 *   "requirements": {...},
 *   "rewards": {...}
 * }
 */
export const QUEST = z.object({
  difficulty: z.literal(QUEST_DIFFICULTY),
  icon: z.string(),
  length: z.literal(QUEST_LENGTH),
  name: z.string(),
  release: z.string(),
  requirements: REQUIREMENTS,
  rewards: REWARDS
});

/* PET */

/**
 * An object detailing a pet.
 * icon: The name of the icon from the wiki
 * name: The name of the pet
 * requirements: A record of {@link REQUIREMENTS}
 * @example
 * {
 *   "icon": "Youngllef",
 *   "name": "Youngllef",
 *   "requirements": {...}
 * }
 */
export const PET = z.object({
  icon: z.string(),
  name: z.string(),
  requirements: REQUIREMENTS
});

/* COLLECTION */

/**
 * An object containing the icon and name of a collection item.
 * icon: The name of the icon from the wiki
 * name: The name of the collection item
 * @example { "icon": "Graceful boots (Agility Arena)", "name": "Graceful boots" }
 */
export const ITEM = z.object({
  icon: z.string(),
  name: z.string()
});

/**
 * An object containing a collection.
 * icon: The name of the icon from the wiki
 * items: An array of {@link ITEM}
 * name: The name of the collection
 * requirements: A record of {@link REQUIREMENTS}
 */
export const COLLECTION = z.object({
  icon: z.string(),
  items: z.array(ITEM),
  name: z.string(),
  requirements: REQUIREMENTS
});
