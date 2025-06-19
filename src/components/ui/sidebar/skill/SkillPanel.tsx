import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { setCombat } from '@redux/reducers/SkillsReducer';
import { useDispatch } from 'react-redux';

import { SkillItem } from '@components';
import { useActions } from '@hooks/useActions';
import type { Skill } from '@types';
import { CombatIcon, StatsIcon } from '@utils/icons';
import { useCallback, useState } from 'react';

const SkillPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { combat, combatLevel, skills } = useActions();

  const dispatch = useDispatch();

  const handleCombat = useCallback(() => {
    dispatch(setCombat({ combat: !combat }));
  }, [combat, dispatch]);

  return (
    <Drawer
      anchor="right"
      variant="persistent"
      component={Box}
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      sx={{
        '& .MuiPaper-root': {
          overflow: 'visible'
        }
      }}
    >
      <Tooltip title={<Typography>{`${isOpen ? 'Close' : 'Show'} skills`}</Typography>} arrow>
        <Button
          variant="contained"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          sx={{
            bottom: '1.5rem',
            borderRadius: '50%',
            left: '-5.5rem',
            minWidth: '0',
            padding: '0.5rem',
            position: 'absolute',
            visibility: 'visible'
          }}
        >
          <Box component="img" padding="0.5rem" height="2rem" width="2rem" src={StatsIcon} />
        </Button>
      </Tooltip>

      <Box width="32rem" flexGrow={1} padding={2}>
        <Grid direction="row" spacing={2} sx={{ alignItems: 'stretch', height: '100%' }} container>
          {Object.entries(skills).map(([skill, { isLocked, level }]) => (
            <SkillItem
              key={skill}
              isLocked={isLocked}
              level={level}
              minLevel={skill === 'Hitpoints' ? 10 : 1}
              maxLevel={99}
              skill={skill as Skill}
            />
          ))}

          <Grid size={3}>
            <Stack alignItems="center" direction="column" height="100%" justifyContent="space-between">
              <Typography color="neutral" variant="body2" sx={{ marginTop: '8px' }}>
                Combat Level: {combatLevel}
              </Typography>

              <Box
                component="img"
                src={CombatIcon}
                height="4rem"
                width="4rem"
                sx={(theme) => ({
                  transition: `all ${theme.transitions.duration.shorter}ms`,
                  filter: `grayscale(${combat ? 0 : 80}%)`
                })}
              />

              <Tooltip title={<Typography>{`Toggle combat ${combat ? 'off' : 'on'}`}</Typography>}>
                <Switch
                  color="secondary"
                  size="small"
                  slotProps={{ input: { 'aria-label': 'Toggle combat' } }}
                  sx={{ marginBottom: '4px' }}
                  checked={combat}
                  value={combat}
                  onChange={handleCombat}
                />
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default SkillPanel;
