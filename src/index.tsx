import { ThemeProvider } from '@emotion/react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { store } from '@redux';
import { Provider } from 'react-redux';

import { ActionProvider, Header, SkillPanel, SummaryPanel, TabHandler } from '@components';
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
          <Stack direction="column" minHeight="100vh">
            <Header />

            <Stack component={Paper} direction="row" flexGrow={1} square>
              <Box
                component="aside"
                width="24rem"
                flexShrink={0}
                sx={{ position: 'sticky', height: 'calc(100vh - 64px)', top: '64px' }}
              >
                <SummaryPanel />
              </Box>

              <Container component="main" maxWidth={false}>
                <TabHandler />

                <SkillPanel />
              </Container>
            </Stack>
          </Stack>
        </ThemeProvider>
      </ActionProvider>
    </Provider>
  </StrictMode>
);
