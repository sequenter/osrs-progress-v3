import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import { AchievementTab } from '@components';
import Paper from '@mui/material/Paper';
import { AchievementsIcon, CollectionsIcon, PetsIcon, QuestsIcon } from '@utils/icons';
import { useMemo, useState, type ReactNode } from 'react';

interface TabDetail {
  component: ReactNode;
  icon: string;
  label: string;
}

const TabHandler = () => {
  const [activeTab, setActiveTab] = useState('Achievements');

  const tabs: Array<TabDetail> = useMemo(
    () => [
      {
        component: <AchievementTab />,
        label: 'Achievements',
        icon: AchievementsIcon
      },
      {
        component: null,
        label: 'Quests',
        icon: QuestsIcon
      },
      {
        component: null,
        label: 'Collections',
        icon: CollectionsIcon
      },
      {
        component: null,
        label: 'Pets',
        icon: PetsIcon
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
        <Box
          component={Paper}
          elevation={3}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            top: '64px',
            overflow: 'hidden',
            position: 'sticky',
            'z-index': 999,
            '& .MuiTabs-root': { minHeight: 0 }
          }}
        >
          <TabList
            flexDirection="row"
            flexGrow={1}
            component={Stack}
            onChange={handleChange}
            sx={{
              '& .MuiTab-root': {
                minHeight: 0,
                maxWidth: '100%',
                padding: '16px 0 16px 0'
              }
            }}
          >
            {tabs.map(({ label, icon }) => (
              <Tab
                key={label}
                component={Stack}
                flexBasis={0}
                flexGrow={1}
                icon={<Box component="img" src={icon} width="2rem" height="2rem" paddingRight={1} />}
                iconPosition="start"
                label={<Typography variant="h6">{label}</Typography>}
                maxWidth="100%"
                value={label}
              />
            ))}
          </TabList>
        </Box>

        {tabs.map(({ component, label }) => (
          <TabPanel key={label} value={label} sx={{ paddingX: 0 }}>
            {component}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default TabHandler;
