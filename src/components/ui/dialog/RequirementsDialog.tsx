import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { AchievementDifficulty, QuestDifficulty, Requirements, Rewards } from '@types';
import SkillsRewards from './SkillsRewards';

interface RequirementsDialogProps {
  description?: string;
  difficulty?: AchievementDifficulty | QuestDifficulty;
  icon: string;
  isOpen: boolean;
  requirements: Requirements;
  rewards?: Rewards;
  title: string;
  onClose: () => void;
}

const RequirementsDialog = ({
  description,
  difficulty,
  icon,
  isOpen,
  requirements,
  rewards,
  title,
  onClose
}: RequirementsDialogProps) => {
  return (
    <Dialog maxWidth="sm" open={isOpen} onClose={onClose} disableScrollLock fullWidth>
      <DialogTitle component={Stack}>
        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <Stack alignItems="center" direction="row" gap={2}>
            <Box component="img" height="1.5rem" width="1.5rem" src={icon} />
            <Typography color="secondary" variant="h5">
              {title}
            </Typography>
          </Stack>

          {difficulty && (
            <Typography variant="h6" sx={(theme) => ({ color: theme.palette.difficulty[difficulty] })}>
              {difficulty}
            </Typography>
          )}
        </Stack>

        {description && (
          <Typography color="neutral" variant="h6">
            {description}
          </Typography>
        )}

        <Divider sx={{ paddingTop: '16px' }} />
      </DialogTitle>

      <DialogContent>
        <Stack direction="column" divider={<Divider />} gap={1}>
          {rewards && rewards.skills && (
            <Stack>
              <Typography color="neutral" fontWeight="bold" variant="h6">
                Rewards
              </Typography>

              {rewards.skills.all && (
                <SkillsRewards skills={rewards.skills.all}>
                  Requires <b>all</b> of the below skills to be unlocked:
                </SkillsRewards>
              )}

              {rewards.skills.any && (
                <SkillsRewards skills={rewards.skills.any}>
                  Requires <b>any</b> of the below skills to be unlocked:
                </SkillsRewards>
              )}
            </Stack>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequirementsDialog;
