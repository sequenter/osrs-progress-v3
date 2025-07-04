import { useActions } from '@hooks/useActions';
import Cancel from '@mui/icons-material/Cancel';
import CheckCircle from '@mui/icons-material/CheckCircle';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Skill } from '@types';
import { useCallback, type ReactNode } from 'react';

interface SkillsRewardsProps {
  children: ReactNode;
  skills: Array<Skill>;
}

const SkillsRewards = ({ children, skills }: SkillsRewardsProps) => {
  const { unlockedSkills } = useActions();

  const isSkillUnlocked = useCallback(
    (skill: Skill) => {
      return skill in unlockedSkills;
    },
    [unlockedSkills]
  );

  return (
    <>
      <Typography color="neutral" paddingY={1}>
        {children}
      </Typography>

      <Stack alignItems="center" direction="row" flexWrap="wrap" gap={1}>
        {skills.map((skill) => (
          <Typography
            component={Stack}
            alignItems="center"
            direction="row"
            color="neutral"
            padding={1}
            gap={0.5}
            sx={(theme) => ({ backgroundColor: theme.palette.background.default, borderRadius: '8px' })}
          >
            {isSkillUnlocked(skill) ? <CheckCircle color="success" /> : <Cancel color="error" />}
            {skill}
          </Typography>
        ))}
      </Stack>
    </>
  );
};

export default SkillsRewards;
