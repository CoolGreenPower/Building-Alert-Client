import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box, OutlinedInput, SvgIcon, ThemeProvider } from '@mui/material';
import './MainDash.css';
import Cards from '../Cards/Cards';
import { SidebarData3 } from '../Sidebar/DummyData';
import { theme } from '../../constants/constants';

const HomeIcon = (props) => (
  <SvgIcon {...props}>
    {/* This is a sample SVG of a home icon. Replace this with your desired address icon. */}
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

const OfficeIcon = (props) => (
  <SvgIcon {...props}>
    {/* This is a sample SVG of an office icon. Replace this with your desired office icon. */}
    <path d="M12 2L2 12h3v8h14v-8h3L12 2z" />
  </SvgIcon>
);

const MainDash = () => {
  const initialAddress = SidebarData3[0]?.address || '';
  const initialOffice = SidebarData3[0]?.office || '';

  const [address, setAddress] = useState(initialAddress);
  const [office, setOffice] = useState(initialOffice);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const data = SidebarData3.find((item) => item.address === address && item.office === office);
    setFilteredData(data);
  }, [address, office]);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleOfficeChange = (event) => {
    setOffice(event.target.value);
  };

  return (
    <div className='MainDash'>
      <h1>Dashboard</h1>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '20px' }}>
          <FormControl variant="outlined" sx={{ width: ['100%', '45%'], backgroundColor: 'white', marginBottom: ['10px', 0] }}>
            <InputLabel id='address-label'>Address</InputLabel>
            <Select
              labelId='address-label'
              value={address}
              onChange={handleAddressChange}
              label="Address"
              input={
                <OutlinedInput
                  startAdornment={<HomeIcon color="#07502d" />}
                  notched={false}
                  sx={{ fontSize: '0.875rem', '& .MuiSelect-icon': { color: '#07502d' }, '& .MuiInputBase-input': { color: '#07502d' }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                />
              }
            >
              <MenuItem value={'Address 1'}>Address 1</MenuItem>
              <MenuItem value={'Address 2'}>Address 2</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" sx={{ width: ['100%', '45%'], backgroundColor: 'white', marginBottom: ['10px', 0] }}>
            <InputLabel id='office-label'>Office</InputLabel>
            <Select
              labelId='office-label'
              value={office}
              onChange={handleOfficeChange}
              label="Office"
              input={
                <OutlinedInput
                  startAdornment={<OfficeIcon color="#07502d" />}
                  notched={false}
                  sx={{ fontSize: '0.875rem', '& .MuiSelect-icon': { color: '#07502d' }, '& .MuiInputBase-input': { color: '#07502d' }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                />
              }
            >
              <MenuItem value={'Office 1'}>Office 1</MenuItem>
              <MenuItem value={'Office 2'}>Office 2</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </ThemeProvider>
      {/* Pass filtered data as props to Cards component */}
      {filteredData && <Cards data={filteredData.data} />}
    </div>
  );
}

export default MainDash;
