import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { React, useState } from 'react';
import '../../services/PaperMergeService';
import { uploadDocument } from '../../services/PaperMergeService';
import BAAppBar from '../BAAppBar';
import FilePicker from '../Common/FilePicker';
import "../Guest.css";
import './CreateRequest.css';

const CreateRequest = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Handle file selection
    const handleFileChange = (e) => {
        const files = e.target.files;
        setSelectedFiles(files);
    };

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            // Validate the form
            if (selectedFiles.length === 0) {
                alert('Please select a file');
                setIsLoading(false);
                return;
            }
            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append("files", selectedFiles[i]);
            }
            const homeId = process.env.REACT_APP_PAPER_MERGE_HOME_UUID;
            console.log("homeId=", homeId);
            const resp = await uploadDocument(selectedFiles[0], homeId);
            if (resp != null) {
                alert('File uploaded successfully');
                setSelectedFiles([]);
                // clear the form
            }
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            console.log(e);
            alert('Error uploading file');
        }
    }


    const addresses = [
        'Colombo',
        'Gampaha',
        'Kalutara',
        'Boston',
        'New York',
        'California',
        'Texas',
        'Washington',
        'Florida',
        'Illinois',
        'Pennsylvania',
        'Ohio',
        'Georgia',
        'North Carolina',
        'Michigan',
        'New Jersey',
        'Virginia',
        'Washington',
        'Arizona',
        'Massachusetts',
    ]

    return (
        <div className='w-full flex-col' >
            <BAAppBar
                className='baappbar'
                title="Create a Request"
                leading={<div className='w-8' />}
            />
            <div className='px-4 pt-[70px]'>
                <h4 className='text-primaryColor w-1/3 font-bold mb-4' >What issue would you like to report?</h4>
                <form className='' noValidate autoComplete="off">
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        maxRows={4}
                        minRows={4}
                        variant="outlined"
                        placeholder="Type your report..."
                        fullWidth
                    />
                    <FilePicker
                        removeFile={() => setSelectedFiles([])}
                        onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" />

                </form>
                {/* <h6 className='text-primaryColor w-1/3 my-2 font-bold mb-4' >

                    </h6> */}

                <div className='flex flex-row items-center justify-center  w-full' >
                    <div className='flex flex-col w-full md:w-2/4'>
                        <h5 className='text-primaryColor w-1/3 my-2 font-bold mb-4' >Select Properties</h5>
                        <div className='properties flex flex-col p-4 border-2 items-start justify-start' >
                            {/* Checkbox ListTile */}
                            {addresses.map((address, index) => (
                                <div className='flex flex-row items-center justify-start w-full' >
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                    <label for="vehicle1" className='text-brown ml-2' >  123, Main Street, Colombo 05</label>
                                </div>))}
                        </div>
                        <div className='flex flex-row items-center mt-2 w-full' >
                            <h5 className='text-primaryColor w-1/3 my-2 font-bold mb-4' >Contractor</h5>
                            <div className='relative w-1/3'>
                                <select className='block appearance-none w-full bg-white border border-primaryColor text-primaryColor py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-primaryColor'>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    <option>Option 3</option>
                                </select>
                                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                                    <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M7 10l5 5 5-5z' /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-16 items-center justify-center">
                    {
                        !isLoading ?
                            <Button className='guest_btn font-bold px-4 py-2 mb-4'
                                onClick={onSubmit}
                            >
                                Submit Request
                            </Button> :
                            <CircularProgress />
                    }
                </div>

            </div>
        </div>
    );
}

export default CreateRequest