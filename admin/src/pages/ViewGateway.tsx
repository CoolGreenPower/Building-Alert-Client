import Layout from "./Layout"
import { Gateway } from "../../common.types"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfoListing from "../components/InfoListing";
import { gatewayViewSections, gatewayDetailsFields } from "../constants/index";
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
  devices:[
    { dbField: "device", field: 'device', headerName: 'Name', flex: 1 },
    { dbField: "location.data", field: 'deviceLocation', headerName: 'Location', flex: 1 },
    { dbField: "deviceSource", field: 'deviceSource', headerName: 'Source', flex: 1 },
    { dbField: "_id", field: '_id', headerName: '_id', flex: 1 },

  ]
}


const ViewGateway = () => {
  
  const [showKeys, setShowKeys] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [rows, setRows] = useState<object[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [gateway, setGateway] = useState<Gateway>({} as Gateway);
  // const [users, setUsers] = useState<User[]>([] as User[]);
  // const [assets, setAssets] = useState<Asset[]>([] as Asset[]);
  // const [devices, setDevices] = useState<Device[]>([] as Device[]);

  // run on page load only. There is overhead but better performance
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const fetchGateway = async() => {
      const response = await fetch(`/api/admin/gateways/${id}`)
      if (!response.ok) { alert("Something went wrong") }
      setGateway(await response.json());
    }

    fetchGateway();
    setActiveSection("details");
  }, [])

  useEffect(() => {
    const populateListing = async() => {
      let rows: Array<any> = [];
      //console.log(activeSection)
      setLoading(true);
        const data = gateway.devices;

      data?.forEach((item: any) => {
        rows.push({
          id: item._id,
          deviceLocation: item.location?.data,
          ...item
        })
      });
      setLoading(false);
      setRows(rows);
      setColumns(tableFields[activeSection as keyof typeof tableFields]);
      
    }

    if (activeSection != "details" && gateway._id) {
      populateListing();
    }
    
  }, [activeSection])


  return (
    <Layout>
        <div className="flex flex-row w-full">
          <div className="fixed left-0 h-full border-r-2 border-gray-500 bg-background p-4 z-20 w-[10rem]">
            <div className="flex flex-col items-start">
              <div className="border-b-2 border-gray-500 pb-2">
                <h1 className="text-lg">Gateway Details</h1>
                <Link to="/"><button className="w-full bg-transparent border-2 border-lightslate p-1 my-2 rounded font-bold text-md hover:bg-lightslate">Return</button></Link>
              </div>

              <div className="border-b-2 border-gray-500">
                {
                  gatewayViewSections.map((item) => (
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
            <h1 className="text-4xl mb-5">Gateway { gateway._id }</h1>
            { (activeSection == "details" && Object.keys(gateway).length > 0) && <InfoListing showHidden={showKeys} data={gateway} formFields={gatewayDetailsFields}/> }
            
            {/* you can use an array.map here but I got lazy */}

            {
              activeSection == "devices" &&
              <Listing loading={loading} type={activeSection} rows={rows} columns={columns} />
            }

          
          </div>
        </div>
    </Layout>

  )
}

export default ViewGateway