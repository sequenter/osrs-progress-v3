import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'var(--AppBar-background)', color: 'var(--AppBar-color)' }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          OSRS Progress Tracker
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
