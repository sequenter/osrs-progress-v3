import { createTheme, type ThemeOptions } from '@mui/material/styles';

import type { AchievementDifficulty, QuestDifficulty, Summary } from '@types';

interface SimplePaletteOptions {
  light: string;
  dark: string;
}

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    summary: Record<Summary, SimplePaletteOptions>;
    difficulty: {
      achievements: Record<AchievementDifficulty | QuestDifficulty, string>;
    };
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    summary?: Record<Summary, SimplePaletteOptions>;
    difficulty?: {
      achievements: Record<AchievementDifficulty | QuestDifficulty, string>;
    };
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    'summary.skills': true;
  }
}

export const themeDark: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#101319',
      paper: '#101319'
    },
    neutral: {
      main: '#77797c'
    },
    primary: {
      main: '#6CCFF6'
    },
    secondary: {
      main: '#FACC15'
    },
    summary: {
      skills: { dark: '#FFA400', light: '#FFE0AE' },
      achievements: { dark: '#00A3FF', light: '#B7DEFF' }
    },
    difficulty: {
      achievements: {
        Easy: '#4CAF50',
        Medium: '#009688',
        Hard: '#673AB7',
        Elite: '#FFC107',
        Novice: '#4CAF50',
        Intermediate: '#009688',
        Experienced: '#673AB7',
        Master: '#FFC107',
        Grandmaster: '#F44336',
        Special: '#77797c'
      }
    }
  },
  typography: {
    fontFamily: 'VT323, monospace'
  }
});
