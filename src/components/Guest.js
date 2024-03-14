// import Button from '@material-ui/core/Button';
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormLabel from '@material-ui/core/FormLabel';
// import InputLabel from '@material-ui/core/InputLabel';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import TextField from '@material-ui/core/TextField';
// import { React, useState } from 'react';
// import "./Guest.css";
// // import SearchIcon from '@material-ui/icons/Search';
// import { CircularProgress } from '@material-ui/core';
// import SearchIcon from '@mui/icons-material/Search';
// import { Link } from "react-router-dom";
// import Colors from '../constants/Colors';
// import { uploadDocument } from '../services/PaperMergeService';
// import BAAppBar from './BAAppBar';
// import FilePicker from './Common/FilePicker';

// const Guest = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   // Handle file selection
//   const handleFileChange = (e) => {
//     const files = e.target.files;
//     setSelectedFiles(files);
//   };


//   const onSubmit = async () => {
//     try {
//       setIsLoading(true);
//       // Validate the form
//       if (selectedFiles.length === 0) {
//         alert('Please select a file');
//         setIsLoading(false);
//         return;
//       }
//       const formData = new FormData();
//       for (let i = 0; i < selectedFiles.length; i++) {
//         formData.append("files", selectedFiles[i]);
//       }
//       const homeId = process.env.REACT_APP_PAPER_MERGE_HOME_UUID;
//       console.log("homeId=", homeId);
//       const resp = await uploadDocument(selectedFiles[0], homeId);
//       if (resp != null) {
//         alert('File uploaded successfully');
//         setSelectedFiles([]);
//         // clear the form
//       }
//       setIsLoading(false);
//     } catch (e) {
//       setIsLoading(false);
//       console.log(e);
//       alert('Error uploading file');
//     }
//   }

//   return (
//     <div className='guest' >
//       <div className='guest__form lg:w-3/5 w-full' >
//         < BAAppBar title="Create a Report"
//         />
//         <div className='px-4'>
//           <h4 className='text-brown w-1/3 my-2 font-bold mb-4' >What issue would you like to report?</h4>
//           <form className='' noValidate autoComplete="off">
//             <TextField
//               id="outlined-multiline-static"
//               multiline
//               maxRows={4}
//               minRows={4}
//               variant="outlined"
//               placeholder="Type your report..."
//               fullWidth
//             />
//             <FilePicker
//               removeFile={() => setSelectedFiles([])}
//               onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" />
//             <InputLabel form_head style={{ marginTop: '20px', fontWeight: 'bold' }}>Where is the issue located?</InputLabel>

//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               {/* <SearchIcon style={{ marginRight: '10px' }} /> */}
//               <SearchIcon />
//               <TextField
//                 // style={{ border: '1px solid #000', borderRadius: '20px' }}
//                 id="standard-basic" placeholder='search for an address' fullWidth ></TextField>
//             </div>
//             <FormControl component="fieldset" style={{ marginTop: '20px' }}>
//               <FormLabel className='form_head' component="legend">Would You Like To Be Contacted? <span className='form_light' >Optionally</span></FormLabel>
//               <RadioGroup aria-label="resolve" name="resolve" row>
//                 <FormControlLabel value="yes" control={<Radio className='guestRadio' />} label="Yes" />
//                 <FormControlLabel value="no" control={<Radio className='guestRadio' />} label="No" />
//               </RadioGroup>
//             </FormControl>

//           </form>
//           <div className="flex flex-col mt-16 items-center justify-center">


//             {
//               !isLoading ?
//                 <Button className='guest_btn font-bold px-4 py-2 mb-4'
//                   onClick={onSubmit}>
//                   Submit Request
//                 </Button> :
//                 <CircularProgress />
//             }
//             <Link to='/' style={{ color: Colors.gray, textDecoration: 'underline', textDecorationColor: 'black' }}  > Cancel </Link>
//           </div>
//         </div>
//       </div>
//     </div >
//   );
// }

// export default Guest;
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Guest.css'; // Make sure to create a CreateReport.css file for styling
import Header from './Header';
import Footer from './Footer';
import logo from '../images/New Logo.png'
import AllBuildings from '../images/Building.png'

const Guest = () => {
  const [report, setReport] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState(true);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form submission here
    console.log({ report, location, contact });
  };

  return (
    <div className="create-report">
      <Header /> {/* Include the Header component */}
      <div className="headerr">
        <button className="back-button" onClick={() => history.goBack()}>&lt;</button>
        <h1>Create a Report</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="Issue" htmlFor="report">What issue would you like to report?</label>
        <textarea id="report" value={report} onChange={(e) => setReport(e.target.value)} placeholder="Type your report ..." />

        <label htmlFor="photo-upload"className="Attach">Attach a photo (optional)</label>
        <input type="file" id="photo-upload" />
        <label className="Where" htmlFor="location-search">Where is the issue located?</label>
        <input type="search" id="location-search" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Search for an address" />

        <label className="Contacted">Would you like to be contacted?</label>
        <div className="radio-group">
          <input type="radio" className="Yes" id="contact-yes" name="contact" checked={contact} onChange={() => setContact(true)} />
          <label htmlFor="contact-yes" className="Yess">Yes</label>
          <input type="radio" id="contact-no" className="No" name="contact" checked={!contact} onChange={() => setContact(false)} />
          <label htmlFor="contact-no" className="Yess">No</label>
        </div>

        <button type="submit" className="submit-button">Submit Request</button>
        <Link to='/' className="Cancel" style={{ textDecoration: 'underline', textDecorationColor: 'black' }}  > Cancel </Link>
      </form>
      <Footer/>
    </div>
  );
};

export default Guest;