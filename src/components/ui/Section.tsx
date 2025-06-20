import ExpandCircleDown from '@mui/icons-material/ExpandCircleDown';

import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { Children, useState, type ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  title: string;
}

/**
 * A container utilised to show unlocked, locked, and completed tasks for achievements, quests, collections, and pets.
 * @param {object} props Properties object
 * @param {ReactNode} props.children Children to render within the container
 * @param {string} props.title The title of the container
 * @returns JSX Element
 */
const Section = ({ children, title }: SectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Stack direction="column" gap={1}>
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        <Typography color="neutral" variant="h5" textTransform="capitalize">
          {title}
        </Typography>

        <Stack alignItems="center" direction="row" gap={1}>
          <Chip
            color="neutral"
            size="small"
            label={<Typography variant="subtitle1">{Children.count(children)}</Typography>}
          />

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

      <Grid component={Stack} display={isExpanded ? 'flex' : 'none'} spacing={2} container>
        {children}
      </Grid>
    </Stack>
  );
};

export default Section;
