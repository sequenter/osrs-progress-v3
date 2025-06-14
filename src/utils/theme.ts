import { createTheme, type ThemeOptions } from '@mui/material/styles';

interface SimplePaletteOptions {
  light: string;
  dark: string;
}

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    summary: {
      skills: Palette['primary'];
    };
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    summary?: {
      skills: SimplePaletteOptions;
    };
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
      main: '#E2EF70'
    },
    summary: {
      skills: { dark: '#FFA400', light: '#FFE0AE' }
    }
  },
  typography: {
    fontFamily: 'VT323, monospace'
  }
});
