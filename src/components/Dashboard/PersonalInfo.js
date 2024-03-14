import React, { useState } from 'react'
import "./PersonalInfo.css"
import { Avatar, TextField, Grid, Button } from '@mui/material'

const PersonalInfo = () => {
  const [form, setForm] = useState({
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
    <div className='personal_info' >
        <h1>Personal Information</h1>
        <div className='personal_head'>
            <div className='personal_pic' >
                <Avatar sx={{width:'90px',height:"90px"}} >RB</Avatar>
            </div>
            <div className='personal_details' >
                <h3>Robin Singh</h3>
                <h6>172D Bryant Lane, New Bedford, Massachusetts - 02740</h6>
                <h6>+1 7745038589</h6>
                <h6>robin25tech@gmail.com</h6>
            </div>
        </div>
        <div className='personal_body'>
          <form>
            <Grid container spacing={2}>
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
        </div>
    </div>
  )
}

export default PersonalInfo
