import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { setIsIronman } from '@redux/reducers/SettingsReducer';

import { useStoreDispatch } from '@hooks';
import { useActions } from '@hooks/useActions';
import { IronmanIcon } from '@utils/icons';
import { useCallback } from 'react';

/**
 * Header AppBar.
 * @returns JSX Element
 */
const Header = () => {
  const { isIronman } = useActions();

  const dispatch = useStoreDispatch();

  const handleChange = useCallback(
    /**
     * Dispatch update to ironman settings state.
     */
    () => {
      dispatch(setIsIronman({ isIronman: !isIronman }));
    },
    [isIronman, dispatch]
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'var(--AppBar-background)', color: 'var(--AppBar-color)' }}>
      <Toolbar>
        <Stack alignItems="center" direction="row" justifyContent="space-between" width="100%">
          <Typography variant="h6" component="div">
            OSRS Progress Tracker
          </Typography>

          <Stack
            alignItems="center"
            direction="row"
            gap={1}
            paddingX={1}
            sx={(theme) => ({
              backgroundColor: theme.palette.background.paper,
              borderRadius: '8px',
              color: theme.palette.neutral.main
            })}
          >
            <Box component="img" height="1.5rem" width="1.5rem" src={IronmanIcon} />

            <FormControlLabel
              label="Ironman"
              control={<Switch color="secondary" checked={isIronman} onChange={handleChange} />}
              sx={{
                marginRight: 0
              }}
            />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
