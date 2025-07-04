import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { AchievementsTab, CollectionsTab, PetsTab, QuestsTab } from '@components';
import { useActions } from '@hooks/useActions';
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

  const { unlockedAchievements, unlockedCollections, unlockedPets, unlockedQuests } = useActions();

  const tabs = useMemo(
    /**
     * Mapped tabs.
     * @returns {Array<TabDetail>}
     */
    (): Array<TabDetail> => [
      {
        component: <AchievementsTab />,
        label: 'Achievements',
        icon: AchievementsIcon,
        unlocked: unlockedAchievements.length
      },
      {
        component: <QuestsTab />,
        label: 'Quests',
        icon: QuestsIcon,
        unlocked: unlockedQuests.length
      },
      {
        component: <CollectionsTab />,
        label: 'Collections',
        icon: CollectionsIcon,
        unlocked: unlockedCollections.length
      },
      {
        component: <PetsTab />,
        label: 'Pets',
        icon: PetsIcon,
        unlocked: unlockedPets.length
      }
    ],
    [unlockedAchievements, unlockedPets, unlockedQuests]
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
    <TabContext value={activeTab}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          backdropFilter: 'blur(6px)',
          boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.75)',
          WebkitBoxShadow: '0px 5px 10px 0px rgba(0,0,0,0.75)',
          top: '64px',
          overflow: 'hidden',
          position: 'sticky',
          zIndex: 1000,
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
              padding: '16px 0 16px 0',
              '& .MuiTab-iconWrapper': {
                flexGrow: 1
              }
            }
          }}
        >
          {tabs.map(({ label, icon, unlocked }, index) => (
            <Tab
              key={label}
              component={Stack}
              flexBasis={0}
              flexGrow={1}
              icon={
                <Box display="flex" justifyContent="end" paddingRight={1}>
                  <Box component="img" src={icon} width="2rem" height="2rem" />
                </Box>
              }
              iconPosition="start"
              label={
                <>
                  <Stack alignItems="center" direction="row" flexGrow="1" justifyContent="space-between">
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
                  </Stack>

                  {index < tabs.length - 1 && <Divider orientation="vertical" />}
                </>
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
  );
};

export default TabHandler;
