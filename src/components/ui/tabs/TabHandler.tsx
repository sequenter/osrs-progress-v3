import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import { AchievementTab, QuestTab } from '@components';
import { useActions } from '@hooks/useActions';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { AchievementsIcon, CollectionsIcon, PetsIcon, QuestsIcon } from '@utils/icons';
import { useMemo, useState, type ReactNode } from 'react';

interface TabDetail {
  component: ReactNode;
  icon: string;
  label: string;
  unlocked: number;
}

/**
 * Renders the tab container, allowing to switch between achievements, quests, collections, and pets tabs.
 * @returns JSX Element
 */
const TabHandler = () => {
  const [activeTab, setActiveTab] = useState('Achievements');

  const { unlockedAchievements, unlockedQuests } = useActions();

  const tabs = useMemo(
    /**
     * Mapped tabs.
     * @returns {Array<TabDetail>}
     */
    (): Array<TabDetail> => [
      {
        component: <AchievementTab />,
        label: 'Achievements',
        icon: AchievementsIcon,
        unlocked: unlockedAchievements.length
      },
      {
        component: <QuestTab />,
        label: 'Quests',
        icon: QuestsIcon,
        unlocked: unlockedQuests.length
      },
      {
        component: null,
        label: 'Collections',
        icon: CollectionsIcon,
        unlocked: 0
      },
      {
        component: null,
        label: 'Pets',
        icon: PetsIcon,
        unlocked: 0
      }
    ],
    [unlockedAchievements]
  );

  /**
   * On tab selection, set the active tab state.
   * @param _
   * @param tab The selected tab
   */
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
            {tabs.map(({ label, icon, unlocked }) => (
              <Tab
                key={label}
                component={Stack}
                flexBasis={0}
                flexGrow={1}
                icon={<Box component="img" src={icon} width="2rem" height="2rem" paddingRight={1} />}
                iconPosition="start"
                label={
                  <Stack alignItems="center" direction="row" gap={2}>
                    <Typography variant="h6">{label}</Typography>

                    <Tooltip
                      title={
                        <Typography>
                          {unlocked} {label} to complete
                        </Typography>
                      }
                    >
                      <Chip
                        color="warning"
                        size="small"
                        label={<Typography variant="subtitle1">{unlocked}</Typography>}
                        sx={(theme) => ({
                          transition: `all ${theme.transitions.duration.shorter}ms`,
                          transform: `scale(${unlocked > 0 ? 100 : 0}%)`
                        })}
                      />
                    </Tooltip>
                  </Stack>
                }
                maxWidth="100%"
                value={label}
              />
            ))}
          </TabList>
        </Box>

        {tabs.map(({ component, label }) => (
          <TabPanel key={label} value={label} sx={{ paddingX: 0 }} keepMounted>
            {component}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default TabHandler;
