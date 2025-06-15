import { default as ArdougneIcon } from '@assets/icons/diaries/ardougne.png';
import { default as DesertIcon } from '@assets/icons/diaries/desert.png';
import { default as FaladorIcon } from '@assets/icons/diaries/falador.png';
import { default as FremennikIcon } from '@assets/icons/diaries/fremennik.png';
import { default as LumbridgeIcon } from '@assets/icons/diaries/lumbridge.png';
import { default as KandarinIcon } from '@assets/icons/diaries/kandarin.png';
import { default as KaramjaIcon } from '@assets/icons/diaries/karamja.png';
import { default as KourendIcon } from '@assets/icons/diaries/kourend.png';
import { default as MorytaniaIcon } from '@assets/icons/diaries/morytania.png';
import { default as VarrockIcon } from '@assets/icons/diaries/varrock.png';
import { default as WesternProvincesIcon } from '@assets/icons/diaries/westernprovinces.png';
import { default as WildernessIcon } from '@assets/icons/diaries/wilderness.png';

import { default as AgilityIcon } from '@assets/icons/skills/agility.png';
import { default as AttackIcon } from '@assets/icons/skills/attack.png';
import { default as ConstructionIcon } from '@assets/icons/skills/construction.png';
import { default as CookingIcon } from '@assets/icons/skills/cooking.png';
import { default as CraftingIcon } from '@assets/icons/skills/crafting.png';
import { default as DefenceIcon } from '@assets/icons/skills/defence.png';
import { default as FarmingIcon } from '@assets/icons/skills/farming.png';
import { default as FiremakingIcon } from '@assets/icons/skills/firemaking.png';
import { default as FishingIcon } from '@assets/icons/skills/fishing.png';
import { default as FletchingIcon } from '@assets/icons/skills/fletching.png';
import { default as HerbloreIcon } from '@assets/icons/skills/herblore.png';
import { default as HitpointsIcon } from '@assets/icons/skills/hitpoints.png';
import { default as HunterIcon } from '@assets/icons/skills/hunter.png';
import { default as MagicIcon } from '@assets/icons/skills/magic.png';
import { default as MiningIcon } from '@assets/icons/skills/mining.png';
import { default as PrayerIcon } from '@assets/icons/skills/prayer.png';
import { default as RangedIcon } from '@assets/icons/skills/ranged.png';
import { default as RunecraftIcon } from '@assets/icons/skills/runecraft.png';
import { default as SlayerIcon } from '@assets/icons/skills/slayer.png';
import { default as SmithingIcon } from '@assets/icons/skills/smithing.png';
import { default as StrengthIcon } from '@assets/icons/skills/strength.png';
import { default as ThievingIcon } from '@assets/icons/skills/thieving.png';
import { default as WoodcuttingIcon } from '@assets/icons/skills/woodcutting.png';

import type { AchievementDiary, Skill } from '@types';

export { default as StatsIcon } from '@assets/icons/stats.png';
export { default as ProgressIcon } from '@assets/icons/progress.png';
export { default as AchievementsIcon } from '@assets/icons/achievements.png';
export { default as QuestsIcon } from '@assets/icons/quests.png';
export { default as CollectionsIcon } from '@assets/icons/collections.png';
export { default as PetsIcon } from '@assets/icons/pets.png';

export const achievementDiaryMap: Record<AchievementDiary, string> = {
  Ardougne: ArdougneIcon,
  Desert: DesertIcon,
  Falador: FaladorIcon,
  Fremennik: FremennikIcon,
  Kandarin: KandarinIcon,
  Karamja: KaramjaIcon,
  'Kourend & Kebos': KourendIcon,
  'Lumbridge & Draynor': LumbridgeIcon,
  Morytania: MorytaniaIcon,
  Varrock: VarrockIcon,
  'Western Provinces': WesternProvincesIcon,
  Wilderness: WildernessIcon
};

export const skillIconMap: Record<Skill, string> = {
  Agility: AgilityIcon,
  Attack: AttackIcon,
  Construction: ConstructionIcon,
  Cooking: CookingIcon,
  Crafting: CraftingIcon,
  Defence: DefenceIcon,
  Farming: FarmingIcon,
  Firemaking: FiremakingIcon,
  Fishing: FishingIcon,
  Fletching: FletchingIcon,
  Herblore: HerbloreIcon,
  Hitpoints: HitpointsIcon,
  Hunter: HunterIcon,
  Magic: MagicIcon,
  Mining: MiningIcon,
  Prayer: PrayerIcon,
  Ranged: RangedIcon,
  Runecraft: RunecraftIcon,
  Slayer: SlayerIcon,
  Smithing: SmithingIcon,
  Strength: StrengthIcon,
  Thieving: ThievingIcon,
  Woodcutting: WoodcuttingIcon
};
