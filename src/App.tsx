import React, { useState } from 'react'
import TimeSeriesGraph from './components/time-series-graph'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function App() {
  const datasetOptions = [
    {
      function: 'WTI',
      label: 'West Texas Intermediate'
    },
    {
      function: 'BRENT',
      label: 'Brent Crude Oil'
    },
    {
      function: 'NATURAL_GAS',
      label: 'Henry Hub Natural Gas Spot'
    }
  ];

  const [dataset, setDataset] = useState(datasetOptions[0])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container fixed>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'center' }}>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              color='inherit'
              endIcon={<KeyboardArrowDownIcon />}
            >
              {dataset.label}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {datasetOptions.map((option) => (
                <MenuItem
                  key={option.function}
                  selected={option.function === dataset.function}
                  onClick={() => {
                    setDataset(option);
                    handleClose();
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <TimeSeriesGraph dataset={dataset} />
    </Container>
  )
}

export default App
