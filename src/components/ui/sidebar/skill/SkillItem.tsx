import { AddCircle, Lock, RemoveCircle } from '@mui/icons-material';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { memo, useEffect, useState } from 'react';
import { setIsLocked, setLevel } from '@redux/reducers/SkillsReducer';
import type { Skill } from '@types';
import { skillIconMap } from '@utils/icons';
import { useDispatch } from 'react-redux';

interface SkillItemProps {
  isLocked: boolean;
  level: number;
  maxLevel: number;
  minLevel: number;
  skill: Skill;
}

const SkillItem = ({ isLocked, level, maxLevel, minLevel, skill }: SkillItemProps) => {
  const [pressed, setPressed] = useState(false);

  const dispatch = useDispatch();

  /**
   * On skill increment/decrement level press, increment the skill level.
   * @param increment Value to increment skill level by
   */
  const handleIncrement = (increment: number) => {
    const incrementedLevel = Math.min(maxLevel, Math.max(minLevel, level + increment));

    dispatch(setLevel({ skill, level: incrementedLevel }));
  };

  /**
   * On skill lock clicked which is only visible when the skill is locked, toggle the skill locked state.
   */
  const handleLock = () => {
    dispatch(setIsLocked({ skill, isLocked: !isLocked }));
  };

  /**
   * On skill item mouse down, set the skill press state for the long press timer to begin.
   * @param pressed Whether or not the skill is being pressed
   */
  const handlePress = (pressed: boolean) => {
    // Only allow the skill to be pressed and therefore lock when it is unlocked
    if (!isLocked) {
      setPressed(pressed);
    }
  };

  // Effect to handle long press for locking skills
  useEffect(() => {
    const timer = pressed
      ? setTimeout(() => {
          dispatch(setIsLocked({ skill, isLocked: true }));
          setPressed(false);
        }, 1000)
      : null;

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [dispatch, pressed, skill]);

  return (
    <Grid key={skill} size={3}>
      <Stack
        alignItems="center"
        direction="column"
        height="100%"
        component={Paper}
        sx={(theme) => ({ ...(!isLocked && { cursor: 'pointer', '&:hover': { outline: `solid ${theme.palette.primary.main}` } }) })}
        onMouseDown={() => handlePress(true)}
        onMouseUp={() => handlePress(false)}
      >
        <Stack
          alignItems="center"
          direction="column"
          justifyContent="space-between"
          flexGrow={1}
          sx={(theme) => ({
            opacity: isLocked ? '20%' : '100%',
            transition: 'opacity',
            transitionDuration: `${theme.transitions.duration.short}ms`
          })}
        >
          <Typography color="neutral" variant="h6">
            {skill}
          </Typography>

          <Box component="img" src={skillIconMap[skill]} height="4rem" width="4rem" />
        </Stack>

        <Stack alignItems="center" direction="row" gap={1}>
          {isLocked ? (
            <Stack>
              <IconButton color="primary" size="small" onClick={handleLock}>
                <Lock />
              </IconButton>
            </Stack>
          ) : (
            <>
              <IconButton
                color="neutral"
                size="small"
                disabled={level === minLevel}
                onClick={() => {
                  handleIncrement(-1);
                }}
                sx={{
                  '&.Mui-disabled': {
                    opacity: '20%'
                  }
                }}
              >
                <RemoveCircle />
              </IconButton>

              <Typography textAlign="center" width="1rem">
                {level}
              </Typography>

              <IconButton
                color="neutral"
                size="small"
                disabled={level === maxLevel}
                onClick={() => {
                  handleIncrement(1);
                }}
                sx={{
                  '&.Mui-disabled': {
                    opacity: '20%'
                  }
                }}
              >
                <AddCircle />
              </IconButton>
            </>
          )}
        </Stack>
      </Stack>
    </Grid>
  );
};

export default memo(SkillItem);
