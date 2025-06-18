import { ExpandCircleDown } from '@mui/icons-material';

import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import type { Completion } from '@types';
import { useState, type ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  completion: Completion;
  count: number;
}

const Section = ({ children, completion, count }: SectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Stack direction="column" gap={1}>
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        <Typography color="neutral" variant="h5" textTransform="capitalize">
          {completion}
        </Typography>

        <Stack alignItems="center" direction="row" gap={1}>
          <Chip color="neutral" size="small" label={<Typography variant="subtitle1">{count}</Typography>} />

          <Tooltip placement="top" title={<Typography>{isExpanded ? 'Collapse' : 'Expand'}</Typography>} arrow>
            <IconButton
              color="neutral"
              sx={{ transform: `rotate(${isExpanded ? 180 : 0}deg)` }}
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            >
              <ExpandCircleDown />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Stack display={isExpanded ? 'flex' : 'none'}>{children}</Stack>
    </Stack>
  );
};

export default Section;
