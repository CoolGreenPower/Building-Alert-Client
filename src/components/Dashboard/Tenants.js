import React, { useState } from 'react'
import "./Tenants.css"
import { TextField, Grid, Button, ThemeProvider } from '@mui/material';
import {theme} from '../../constants/constants'
const Tenants = () => {
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
  });

  const handleInputChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className='tenant_info' >
        <h1>Add Tenant</h1>
        <div className='tenant_body'>
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
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="assignedLocation"
                  value={form.assignedLocation}
                  onChange={handleInputChange}
                  label="Assigned Location"
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
            </Grid>
            <Button 
            className='form_btn'
              variant="outlined"
              style={{backgroundColor: "#FFFFFF", color: "#07502d", borderColor: "#07502d", marginTop: '10px'}}
            >
              Save
            </Button>
          </form>
          </ThemeProvider>
        </div>
    </div>
  )
}

export default Tenants
