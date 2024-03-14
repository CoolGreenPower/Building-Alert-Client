import Layout from "./Layout"
import { Building } from "../../common.types"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfoListing from "../components/InfoListing";
import { buildingViewSections, buildingDetailsFields } from "../constants/index";
import { FormControlLabel, Switch } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Listing from "../components/Listing";
// import Loading from "../components/Loading";


const switchStyling = {
  ".MuiSwitch-track": {
    backgroundColor: "gray"
  }
}

// the fields to put in the tables when viewing certain building info
// the dbFields dont really matter here, it's more the field name has the match 
// the fieldname to be put into the table
const tableFields = {
  users: [
    { dbField: "username", field: 'username', headerName: 'Username', flex: 1 },
    { dbField: "email", field: 'email', headerName: 'Email', flex: 2 },
    { dbField: "permissions", field: 'permissions', headerName: 'Role', flex: 1 },
    { dbField: "_id", field: '_id', headerName: '_id', flex: 1 },
  ],
  assets: [
    { dbField: "name", field: 'name', headerName: 'Name', flex: 1 },
    { dbField: "assetType", field: 'assetType', headerName: 'Asset Type', flex: 1 },
    { dbField: "_id", field: '_id', headerName: '_id', flex: 1 },
  ],
  devices:[
    { dbField: "device", field: 'device', headerName: 'Name', flex: 1 },
    { dbField: "deviceSource", field: 'deviceSource', headerName: 'Source', flex: 1 },
    { dbField: "_id", field: '_id', headerName: '_id', flex: 1 },
    { dbField: "gatewayId", field: 'gatewayId', headerName: 'Gateway _id', flex: 1 },
    
  ],
  tenants:[
    { dbField: "name", field: 'name', headerName: 'Name', flex: 2 },
    { dbField: "suiteId.suite", field: 'suite', headerName: 'Suite', flex: 1 },
    { dbField: "_id", field: '_id', headerName: '_id', flex: 2 },
  ],
  suites: [
    { dbField: "suite", field: 'suite', headerName: 'Suite', flex: 1 },
    { dbField: "occupied", field: "occupied", headerName: "Occupied", flex: 1},
    { dbField: "tenant.name", field: 'tenantName', headerName: 'Tenant', flex: 2 },
    { dbField: "_id", field: '_id', headerName: '_id', flex: 1 },
  ],
  gateways: [
    { dbField: "sourceAPI", field: 'sourceAPI', headerName: 'Source API', flex: 1 },
    { dbField: "_id", field: '_id', headerName: '_id', flex: 1 },
  ],
  utilities: [
    { dbField: "type", field: 'type', headerName: 'Type', flex: 1 },
    { dbField: "_id", field: '_id', headerName: '_id', flex: 1 },
  ]
}


const ViewBuilding = () => {
  
  const [showKeys, setShowKeys] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [rows, setRows] = useState<object[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [building, setBuilding] = useState<Building>({} as Building);
  // const [users, setUsers] = useState<User[]>([] as User[]);
  // const [assets, setAssets] = useState<Asset[]>([] as Asset[]);
  // const [devices, setDevices] = useState<Device[]>([] as Device[]);

  // run on page load only. There is overhead but better performance
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const fetchBuilding = async() => {
      const response = await fetch(`/api/admin/buildings/${id}`)
      if (!response.ok) { alert("Something went wrong") }
      setBuilding(await response.json());
    }

    fetchBuilding();
    setActiveSection("details");
  }, [])

  useEffect(() => {
    const populateListing = async() => {
      let rows: Array<any> = [];
      //console.log(activeSection)
      setLoading(true);
      const response = await fetch(`/api/admin/${activeSection}/building/${building._id}`);
      if (!response.ok) { alert(`Something went wrong loading ${activeSection}`); setLoading(false); }
      let data = await response.json();
      //console.log(data);
      //console.log(data);
      data.forEach((item: any) => {
        rows.push({
          id: item._id,
          suite: item.suiteId?.suite,
          tenantName: item.tenant?.name,
          ...item
        })
      });
      setLoading(false);
      setRows(rows);
      setColumns(tableFields[activeSection as keyof typeof tableFields]);
      
    }

    if (activeSection != "details" && building._id) {
      populateListing();
    }
    
  }, [activeSection])


  return (
    <Layout>
        <div className="flex flex-row w-full">
          <div className="fixed left-0 h-full border-r-2 border-gray-500 bg-background p-4 z-20 w-[10rem]">
            <div className="flex flex-col items-start">
              <div className="border-b-2 border-gray-500 pb-2">
                <h1 className="text-lg">Building Details</h1>
                <Link to="/"><button className="w-full bg-transparent border-2 border-lightslate p-1 my-2 rounded font-bold text-md hover:bg-lightslate">Return</button></Link>
              </div>

              <div className="border-b-2 border-gray-500">
                {
                  buildingViewSections.map((item) => (
                    <button onClick={() => setActiveSection(item.id)} className={`w-full py-3 hover:bg-slate-500 ${activeSection == item.id ? `bg-slate-500` : ``}`}>{ item.title }</button>
                  ))
                }
              </div>

              <div className="flex flex-col justify-between mt-5">
                <FormControlLabel control={<Switch sx={switchStyling} onChange={() => setShowKeys(!showKeys)}/>} label="Show Hidden" />
              </div>
            </div>
          </div>
          
          <div className="pl-[11rem] pt-5 pr-5 flex flex-1 flex-col">
            <h1 className="text-4xl mb-5">{ building.name }</h1>
            { (activeSection == "details" && Object.keys(building).length > 0) && <InfoListing showHidden={showKeys} data={building} formFields={buildingDetailsFields}/> }
            
            {/* you can use an array.map here but I got lazy */}

            {
              activeSection == "assets" &&
              <Listing loading={loading} type={activeSection} rows={rows} columns={columns} />
            }

            {
              activeSection == "users" &&
              <Listing loading={loading} type={activeSection} rows={rows} columns={columns} />
            } 

            {
              activeSection == "devices" &&
              <Listing loading={loading} type={activeSection} rows={rows} columns={columns} />
            }

            {
              activeSection == "gateways" &&
              <Listing loading={loading} type={activeSection} rows={rows} columns={columns} />
            } 

            {
              activeSection == "suites" &&
              <Listing loading={loading} type={activeSection} rows={rows} columns={columns} />
            }

            {
              activeSection == "tenants" &&
              <Listing loading={loading} type={activeSection} rows={rows} columns={columns} />
            }

            {
              activeSection == "utilities" &&
              <Listing loading={loading} type={activeSection} rows={rows} columns={columns} />
            }
          
          </div>
        </div>
    </Layout>

  )
}

export default ViewBuilding