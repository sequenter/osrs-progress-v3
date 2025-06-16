import './index.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@emotion/react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { ActionProvider, Header, SkillDrawer, Summary, TabHandler } from '@components';
import { themeDark } from '@utils/theme';

import { Provider } from 'react-redux';
import { store } from '@redux';
import { setItem } from '@utils/storage';

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
