import { useEffect, useState } from 'react'
import Listing from '../components/Listing'
import { GridColDef } from '@mui/x-data-grid/models'
import Layout from './Layout'

// should eventually move these into a constants file if it gets cluttered
// defines all the categories that can be viewed
const categories = [
  {
    "id": "buildings",
    "title": "Buildings"
  },
  {
    "id": "users",
    "title": "Users"
  },
  {
    "id": "assets",
    "title": "Assets"
  },
  {
    "id": "devices",
    "title": "Devices"
  },
  {
    "id": "alerts",
    "title": "Alerts"
  },
  {
    "id": "suites",
    "title": "Suites"
  },
  {
    "id": "tenants",
    "title": "Tenants"
  },
  {
    "id": "gateways",
    "title": "Gateways"
  },
  {
    "id": "utilities",
    "title": "Utility Bills"
  }
]

/**
 * Add to this to change the table fields.
 * dbField specifies the field name in the database
 * field specifies the field name in the table.
 * 
 * For more specific handling, in the useEffect callback, in the loop for pushing into rows,
 * you can add a new field to the object that is being pushed in.
 */
const tableFields = {
  buildings: [
    { dbField: "name", field: 'name', headerName: 'Name', flex: 2 },
    { dbField: "alias", field: "alias", headerName: "Alias", flex: 1 },
    { dbField: "address", field: 'address', headerName: 'Address', flex: 3},
    { dbField: "_id", field: '_id', headerName: '_id', flex: 2},
  ],
  users: [
    { dbField: "username", field: 'username', headerName: 'Username', flex: 1 },
    { dbField: "email", field: 'email', headerName: 'Email', flex: 2 },
    { dbField: "permissions", field: 'permissions', headerName: 'Role', flex: 1 },
    { dbField: "_id", field: '_id', headerName: '_id', flex: 1 },
  ],
  assets: [
    { dbField: "name", field: 'name', headerName: 'Name', flex: 1 },
    { dbField: "buildingId", field: 'buildingName', headerName: 'Attached Building', flex: 2 },
    { dbField: "assetType", field: 'assetType', headerName: 'Asset Type', flex: 1 },
    { dbField: "_id", field: '_id', headerName: '_id', flex: 1 },
  ],
  devices:[
    { dbField: "location.buildingId", field: 'attachedBuilding', headerName: 'Building', flex: 1 },
    { dbField: "device", field: 'device', headerName: 'Name', flex: 1 },
    { dbField: "deviceSource", field: 'deviceSource', headerName: 'Source', flex: 1 },
    { dbField: "_id", field: '_id', headerName: '_id', flex: 1 },
  ],
  alerts: [
    { dbField: "alert_id", field: 'alert_id', headerName: 'Alert Id', flex: 1 },
    { dbField: "alert_desc", field: 'alert_desc', headerName: 'Description', flex: 1 },
    { dbField: "status", field: 'status', headerName: 'Status', flex: 1 },
    { dbField: "buildingId.name", field: 'buildingName', headerName: 'Building', flex: 2 },
    { dbField: "deviceId.device", field: 'deviceName', headerName: 'Device', flex: 1 },
    { dbField: "_id", field: '_id', headerName: '_id', flex: 1 },
  ],
  suites: [
    { dbField: "suite", field: "suite", headerName: "Suite", flex: 1 },
    { dbField: "buildingId", field: "buildingName", headerName: "Building", flex: 1 },
    { dbField: "occupied", field: "occupied", headerName: "Occupied", flex: 1 },
    { dbField: "_id", field: '_id', headerName: '_id', flex: 1 },
  ],
  tenants: [
    { dbField: "name", field: "name", headerName: "Name", flex: 1 },
    { dbField: "Building", field: "buildingName", headerName: "Building", flex: 1 },
    { dbField: "suite._id", field: "suite._id", headerName: "Suite _id", flex: 1 },
    { dbField: "_id", field: '_id', headerName: '_id', flex: 1 },
  ],
  gateways: [
    { dbField: "sourceAPI", field: "sourceAPI", headerName: "Source API", flex: 1 },
    { dbField: "buildingId", field: "buildingName", headerName: "Attached building", flex: 1 },
    { dbField: "_id", field: '_id', headerName: '_id', flex: 1 },
  ],
  utilities: [
    { dbField: "buildingId", field: "buildingName", headerName: "Building", flex: 2 },
    { dbField: "type", field: "type", headerName: "Type", flex: 1 },
    { dbField: "startDate", field: "startDate", headerName: "Start Date (ISO String)", flex: 2 },
    { dbField: "endDate", field: "endDate", headerName: "End Date (ISO String)", flex: 2 },
  ]
}

function Dashboard() {
  const [rows, setRows] = useState<object[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const [selection, setSelection] = useState<string>("buildings");
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const populateListing = async() => {
      setLoading(true);
      let query = tableFields[selection as keyof typeof tableFields]
        .map((category: any) => category.dbField);

      let rows: Array<any> = [];
      const response = await fetch(`/api/admin/${selection}?select=${String(query)}&populate=${String(query)}`);
      if (!response.ok) { alert("Something went wrong") }
      let data = await response.json();
      //console.log(data);
      //console.log(data);
      data.forEach((item: any) => {
        rows.push({
          id: item._id,
          buildingName: item.buildingId?.name || item.location?.buildingId?.name || "N/A",
          deviceName: item.deviceId?.device,
          attachedBuilding: item.location?.buildingId?.name,
          "suite._id": item.suiteId?._id || item || "N/A",
          ...item
        })
      });

      setLoading(false);
      setRows(rows);
      setColumns(tableFields[selection as keyof typeof tableFields]);

    }
    populateListing();
    //console.log(selection);

  }, [selection])

  return (
    <Layout>
      <h1 className="p-5 text-4xl">Dashboard</h1>
      <div className="flex flex-row">
        {/* The sidebar */}
        <div className="bg-slate-600">
          <ul className="">
            {
              categories.map((category) => (
                <li key={category.id} className="text-white text-l w-full">
                  <button 
                    onClick={() => setSelection(category.id)}
                    className={`hover:bg-slate-500 p-5 w-full text-left ${selection === category.id ? "bg-slate-500" : ""}`}
                  >  
                    {category.title}
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="flex-1 z-10">
          { columns && <Listing loading={loading} type={selection} rows={rows} columns={columns}/> }
        </div>
      </div>
    </Layout>
      
      
  )
}

export default Dashboard