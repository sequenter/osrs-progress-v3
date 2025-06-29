import Cancel from '@mui/icons-material/Cancel';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Info from '@mui/icons-material/Info';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { setIsComplete, setIsItemComplete } from '@redux/reducers/CollectionsReducer';

import { useStoreDispatch } from '@hooks';
import type { Completion, ItemState, Requirements } from '@types';
import { WIKI_IMAGES_ERROR } from '@utils/constants';
import { wikiIcon } from '@utils/icons';
import { memo, useCallback, useMemo, useState } from 'react';

interface CollectionItemProps {
  completion: Completion;
  icon: string;
  items: Array<ItemState>;
  requirements: Requirements;
  title: string;
}

const CollectionItem = ({ completion, icon, items, requirements, title }: CollectionItemProps) => {
  const [iconSrc, setIconSrc] = useState(icon);

  const dispatch = useStoreDispatch();

  const requirementsEnabled = useMemo(() => {
    return Object.keys(requirements).length > 0;
  }, [requirements]);

  const completedTotal = useMemo(() => {
    const totalComplete = items.filter(({ isComplete }) => isComplete).length;

    return `${totalComplete}/${items.length}`;
  }, [items]);

  const handleCompletion = useCallback(
    (isComplete: boolean) => {
      dispatch(setIsComplete({ id: title, isComplete }));
    },
    [title, dispatch]
  );

  const handleItemCompletion = useCallback(
    (isComplete: boolean, itemId: string) => {
      dispatch(setIsItemComplete({ id: title, isComplete, itemId }));
    },
    [title, dispatch]
  );

  const handleIconError = useCallback(() => {
    setIconSrc(WIKI_IMAGES_ERROR);
  }, []);

  return (
    <Grid component={Stack} size={{ xs: 12, md: 6, lg: 4 }}>
      <Stack component={Paper} divider={<Divider />} direction="column" elevation={2} flexGrow={1} gap={1} padding={2}>
        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <Stack alignItems="center" direction="row" gap={1}>
            <Box component="img" height="1.5rem" width="1.5rem" src={iconSrc} onError={handleIconError} />

            <Typography color="neutral" variant="h6">
              {title}
            </Typography>
          </Stack>

          <Typography color="neutral">{completedTotal}</Typography>
        </Stack>

        <List
          component={Stack}
          maxHeight="8.5rem"
          flexGrow={1}
          gap={1}
          sx={{ overflowY: 'scroll', paddingTop: 0, paddingBottom: 0, paddingRight: '8px' }}
        >
          {items.map(({ icon, isComplete, name }) => (
            <ListItem component={Paper} key={name}>
              <Stack alignItems="center" direction="row" gap={1} justifyContent="space-between" width="100%">
                <Stack direction="row" gap={1} minWidth={0}>
                  <Box component="img" height="1.5rem" width="1.5rem" src={wikiIcon(icon)} />
                  <Typography
                    color={isComplete ? 'neutral' : 'secondary'}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {name}
                  </Typography>
                </Stack>

                {completion !== 'locked' && (
                  <Tooltip
                    placement="top"
                    title={<Typography>{`Mark as ${isComplete ? 'incomplete' : 'complete'}`}</Typography>}
                    arrow
                  >
                    <IconButton
                      color={isComplete ? 'error' : 'success'}
                      sx={{ padding: 0 }}
                      onClick={() => {
                        handleItemCompletion(!isComplete, name);
                      }}
                    >
                      {isComplete ? <Cancel /> : <CheckCircle />}
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            </ListItem>
          ))}
        </List>

        <Stack alignItems="center" direction="row" justifyContent={completion === 'locked' ? 'end' : 'space-between'}>
          {completion === 'unlocked' && (
            <Tooltip placement="top" title={<Typography>Mark all as complete</Typography>} arrow>
              <IconButton
                color="success"
                sx={{ padding: 0 }}
                onClick={() => {
                  handleCompletion(true);
                }}
              >
                <CheckCircle />
              </IconButton>
            </Tooltip>
          )}

          {completion === 'completed' && (
            <Tooltip placement="top" title={<Typography>Mark all as incomplete</Typography>} arrow>
              <IconButton
                color="error"
                sx={{ padding: 0 }}
                onClick={() => {
                  handleCompletion(false);
                }}
              >
                <Cancel />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip
            placement="top"
            title={<Typography>{`${!requirementsEnabled ? 'No ' : ''}Requirements`}</Typography>}
            arrow
          >
            <span>
              <IconButton
                color="neutral"
                disabled={!requirementsEnabled}
                sx={[{ padding: 0 }, !requirementsEnabled && { opacity: '20%' }]}
                onClick={() => {}}
              >
                <Info />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default memo(CollectionItem);
