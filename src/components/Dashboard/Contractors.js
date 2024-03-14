import React, { useState } from 'react';
import './Contractors.css';
import { TextField, Grid, Button, ThemeProvider, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { theme } from '../../constants/constants';

const Contractors = () => {
  const [form, setForm] = useState({
    businessName: '',
    assignedLocation: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    streetAddress: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    assignedDevices: ''
  });

  const handleInputChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };


  return (
    <div className='contractor_info'>
      <h1>Add Contractor</h1>
      <div className='contractor_body'>
        <ThemeProvider theme={theme}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="businessName"
                  value={form.businessName}
                  onChange={handleInputChange}
                  label="Business Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  value={form.firstName}
                  onChange={handleInputChange}
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  value={form.lastName}
                  onChange={handleInputChange}
                  label="Last Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  label="Email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="mobile"
                  value={form.mobile}
                  onChange={handleInputChange}
                  label="Mobile Number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="streetAddress"
                  value={form.streetAddress}
                  onChange={handleInputChange}
                  label="Street Address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="city"
                  value={form.city}
                  onChange={handleInputChange}
                  label="City"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="state"
                  value={form.state}
                  onChange={handleInputChange}
                  label="State"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="country"
                  value={form.country}
                  onChange={handleInputChange}
                  label="Country"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="zipCode"
                  value={form.zipCode}
                  onChange={handleInputChange}
                  label="Zip Code"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="assigned-location">Assigned Location</InputLabel>
                  <Select
                    labelId="assigned-location"
                    name="assignedLocation"
                    value={form.assignedLocation}
                    onChange={handleInputChange}
                    label="Assigned Location"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {/* Provide the locations */}
                    <MenuItem value={10}>Location 1</MenuItem>
                    <MenuItem value={20}>Location 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="assigned-devices">Assigned Devices</InputLabel>
                  <Select
                    labelId="assigned-devices"
                    name="assignedDevices"
                    value={form.assignedDevices}
                    onChange={handleInputChange}
                    label="Assigned Devices"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {/* Provide the devices */}
                    <MenuItem value={10}>Device 1</MenuItem>
                    <MenuItem value={20}>Device 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  style={{ backgroundColor: "#FFFFFF", color: "#07502d", borderColor: "#07502d", marginTop: '10px', borderRadius: "100px" }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Contractors;
