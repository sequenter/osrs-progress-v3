import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { AchievementsIcon, CollectionsIcon, PetsIcon, QuestsIcon } from '@utils/icons';

import { useMemo, useState } from 'react';
import { AchievementTab } from '@components';

interface TabDetail {
  icon: string;
  label: string;
  unlocked: number;
}

const TabHandler = () => {
  const [activeTab, setActiveTab] = useState('Achievements');

  const tabs: Array<TabDetail> = useMemo(
    () => [
      {
        label: 'Achievements',
        icon: AchievementsIcon,
        unlocked: 2
      },
      {
        label: 'Quests',
        icon: QuestsIcon,
        unlocked: 0
      },
      {
        label: 'Collections',
        icon: CollectionsIcon,
        unlocked: 0
      },
      {
        label: 'Pets',
        icon: PetsIcon,
        unlocked: 0
      }
    ],
    []
  );

  const handleChange = (_: React.SyntheticEvent, tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', '& .MuiTabs-root': { minHeight: 0 } }}>
          <TabList
            aria-label="lab API tabs example"
            flexDirection="row"
            flexGrow={1}
            component={Stack}
            onChange={handleChange}
            sx={{ '& .MuiTab-root': { minHeight: 0, maxWidth: '100%', padding: '16px 0 16px 0' } }}
          >
            {tabs.map(({ label, icon, unlocked }) => (
              <Tab
                component={Stack}
                flexBasis={0}
                flexGrow={1}
                icon={<Box component="img" src={icon} width="2rem" height="2rem" paddingRight={1} />}
                iconPosition="start"
                label={
                  <Stack alignItems="center" direction="row" gap={2}>
                    <Typography variant="h6">{label}</Typography>
                    {unlocked > 0 && (
                      <Tooltip placement="top" title={<Typography>Tasks to complete</Typography>} arrow>
                        <Chip color="warning" size="small" label={<Typography variant="subtitle1">{unlocked}</Typography>} />
                      </Tooltip>
                    )}
                  </Stack>
                }
                maxWidth="100%"
                value={label}
              />
            ))}
          </TabList>
        </Box>

        <TabPanel value="Achievements" sx={{ paddingX: 0 }}>
          <AchievementTab />
        </TabPanel>

        <TabPanel value="Quests" sx={{ paddingX: 0 }}>
          Item Two
        </TabPanel>

        <TabPanel value="Collections" sx={{ paddingX: 0 }}>
          Item Three
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TabHandler;
