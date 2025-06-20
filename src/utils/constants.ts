import type { Achievement } from '@types';

import { default as AchievementsJson } from '@assets/json/achievements.json';

/* COMMON */

export const WIKI_IMAGES_URL = 'https://oldschool.runescape.wiki/images/';

export const WIKI_IMAGES_ERROR = 'https://oldschool.runescape.wiki/images/Bank_filler.png';

/* DATA EXPORTS */

export const ACHIEVEMENTS = AchievementsJson as Array<Achievement>;

/* UNIONS */

export const SUMMARY_ITEMS = ['skills', 'achievements'] as const;

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
