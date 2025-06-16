import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { SkillItem } from '@components';
import { useActions } from '@hooks/useActions';
import type { Skill } from '@types';
import { StatsIcon } from '@utils/icons';
import { useState } from 'react';

const SkillDrawer = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { skills } = useActions();

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
        </Grid>
      </Box>
    </Drawer>
  );
};

export default SkillDrawer;
