// Create functions to integrate with PaperMerge API

const documentEntry = (title, id) => {
    return {
        "data": {
            "type": "documents",
            "attributes": {
                "title": title // title for the document to be uploaded
            },
            "relationships": {
                "parent": {
                    "data": {
                        "type": "folders",
                        "id": id // id of the folder to which the document should be uploaded
                    }
                }
            }
        }
    };
}

const folderEntry = (title, id) => {
    return {
        "data": {
            "type": "folders",
            "attributes": {
                "title": title // title for the document to be uploaded
            },
            "relationships": {
                "parent": {
                    "data": {
                        "type": "folders",
                        "id": id // id of the parent folder where the folder must be created
                    }
                }
            }
        }
    };
}


const token = `${process.env.REACT_APP_PAPER_MERGE_TOKEN}`;

// Create a new document
export const createDocumentEntry = async (file, parentId) => {
    try {
        const url = `${process.env.REACT_APP_PAPER_MERGE_BASE_URL}/api/nodes/`;
        console.log("url=", url, 'token=', token);
        console.log('body=', JSON.stringify(documentEntry(file.name, parentId)));
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(documentEntry(file.name, parentId)),
        });

        const data = await response.json();
        if (response.status === 201) {
            console.log('Document created successfully', data);
            return data;
        } else {
            console.log('Error creating document', data);
            return null
        }
    } catch (e) {
        console.log(e);
    }
}

export const uploadDocument = async (file, parentId) => {
    const resp = await createDocumentEntry(file, parentId);
    if (resp === null) {
        console.log('Error creating document');
        return null;
    }
    const docId = resp.data.id; // id of the created document
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${process.env.REACT_APP_PAPER_MERGE_BASE_URL}/api/documents/${docId}/upload/${file.name}`, {
        method: 'PUT',
        body: formData,
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${file.name}`,
        }
    });

    if (response.status === 201) {
        console.log('Document uploaded successfully', response.data);
        const resp = await response.json();
        // id of the created document 
        // const id = resp.data.id;
        return resp;
    }

};


// Creates a new folder within the specified parent folder
export const createFolder = async (folderName, parentId) => {
    const response = await fetch(`${process.env.REACT_APP_PAPER_MERGE_BASE_URL}api/nodes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(folderEntry(folderName, parentId)),
    });
    const resp = await response.json();
    if (response.status === 201) {
        // const id = resp.data.id; // id of the created folder
        return resp;
    } else {
        throw new Error('Error creating folder');
    }
}

// Get all folders and documents in a folder
export const getFolder = async (folderId) => {
    const response = await fetch(`${process.env.REACT_APP_PAPER_MERGE_BASE_URL}/api/nodes/${folderId}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Token ${token}`,
        },
    });

    const data = await response.json();
    return data;
}

//  get user details
export const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_PAPER_MERGE_BASE_URL}/api/users/me/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Token ${token}`,
        },
    });

    const data = await response.json();
    return data;
}
