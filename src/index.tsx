import { ThemeProvider } from '@emotion/react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { store } from '@redux';
import { Provider } from 'react-redux';

import { ActionProvider, Header, SkillDrawer, Summary, TabHandler } from '@components';
import { setItem } from '@utils/storage';
import { themeDark } from '@utils/theme';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

store.subscribe(() => {
  setItem('store', store.getState());
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ActionProvider>
        <ThemeProvider theme={themeDark}>
          <Stack direction="column" height="100vh">
            <Header />
            <Stack component={Paper} direction="row" flexGrow={1}>
              <Box component="aside" width="24rem" flexShrink={0}>
                <Summary />
              </Box>
              <Container component="main" maxWidth={false}>
                <TabHandler />
                <SkillDrawer />
              </Container>
            </Stack>
          </Stack>
        </ThemeProvider>
      </ActionProvider>
    </Provider>
  </StrictMode>
);
