import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

interface TabHandleProps {
  label: string;
  value: string;
}

const TabHandle = ({ label, value }: TabHandleProps) => {
  return <Tab component={Stack} flexGrow={1} label={<Typography variant="h6">{label}</Typography>} value={value} />;
};

export default TabHandle;
