import { AddCircle, Lock, RemoveCircle } from '@mui/icons-material';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { setIsLocked, setLevel } from '@redux/reducers/SkillsReducer';

import { useStoreDispatch } from '@hooks';
import type { Skill } from '@types';
import { skillIconMap } from '@utils/icons';
import { memo, useCallback, useEffect, useState } from 'react';

interface SkillItemProps {
  isLocked: boolean;
  level: number;
  maxLevel: number;
  minLevel: number;
  skill: Skill;
}

/**
 * A skill item that is able to be unlocked/locked, as well as increment and decrement its level.
 * @param {object} props Properties object
 * @param {boolean} props.isLocked Skill locked state
 * @param {number} props.level Skill level
 * @param {number} props.maxLevel Max level of the skill
 * @param {number} props.minlevel Min level of the skill
 * @param {Skill} props.skill The skill to render
 * @returns JSX Element
 */
const SkillItem = ({ isLocked, level, maxLevel, minLevel, skill }: SkillItemProps) => {
  const [pressed, setPressed] = useState(false);

  const dispatch = useStoreDispatch();

  const handleIncrement = useCallback(
    /**
     * On skill increment/decrement level press, increment the skill level.
     * @param increment Value to increment skill level by
     */
    (increment: number) => {
      const incrementedLevel = Math.min(maxLevel, Math.max(minLevel, level + increment));

      dispatch(setLevel({ skill, level: incrementedLevel }));
    },
    [level, maxLevel, minLevel, skill, dispatch]
  );

  const handleLock = useCallback(
    /**
     * On skill lock clicked, toggle the skill locked state.
     */
    () => {
      dispatch(setIsLocked({ skill, isLocked: !isLocked }));
    },
    [isLocked, skill, dispatch]
  );

  const handlePress = useCallback(
    /**
     * On skill item mouse down, set the skill press state for the long press timer to begin.
     * @param pressed Whether or not the skill is being pressed
     */
    (pressed: boolean) => {
      // Only allow the skill to be pressed and therefore lock when it is unlocked
      if (!isLocked) {
        setPressed(pressed);
      }
    },
    [isLocked]
  );

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
        sx={(theme) => ({
          ...(!isLocked && { cursor: 'pointer', '&:hover': { outline: `solid ${theme.palette.primary.main}` } })
        })}
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

          <Box component="img" src={skillIconMap[skill]} height="3.5rem" width="3.5rem" />
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
