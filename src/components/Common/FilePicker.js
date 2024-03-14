import { Close } from "@material-ui/icons";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import React, { useRef, useState } from "react";

const FilePicker = ({ onChange, accept }) => {
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleTextClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const removeFile = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };

    return (
        <div className="flex-col">
            <div className="mt-2 flex min-w-fit justify-start" onClick={handleTextClick}>
                <AttachFileIcon style={{ marginRight: "10px" }} />
                <p className="min-w-fit" style={{ cursor: "pointer" }}>
                    Attach a photo (Optional)
                </p>
                <input
                    type="file"
                    multiple
                    onChange={(e) => {
                        setSelectedFiles([...selectedFiles, ...e.target.files]);
                        onChange(e);
                    }}
                    accept={accept}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                />
            </div>
            <div className="flex">
                {selectedFiles.length > 0 && (
                    <ul>
                        {selectedFiles.map((file, index) => (
                            <li key={index}>
                                {file.name}
                                <Close
                                    style={{ cursor: "pointer" }}
                                    onClick={() => removeFile(index)}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FilePicker;