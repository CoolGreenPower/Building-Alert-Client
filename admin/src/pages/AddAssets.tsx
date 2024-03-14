import { Asset, Building } from "../../common.types";
import CreationForm from "../components/CreationForm";
import EditableCodeBlock from "../components/EditableCodeBlock";
import Layout from "./Layout"
import { useState } from "react";

const AddAssets = () => {
    const [buildingId, setBuildingId] = useState<string>("");
    const [building, setBuilding] = useState<Building>({} as Building);
    const [asset, setAsset] = useState<Asset>({} as Asset);

    const [confirm, setConfirm] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);
    const [serverOutput, setServerOutput] = useState<Object>({});

    // useEffect(() => {
    //     console.log(asset);
    // }, [asset])

    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBuildingId(event.target.value)
    }

    const handleBuildingLoad = async() => {
        setProcessing(true);
        const response = await fetch(`/api/admin/buildings/${buildingId}`);
        setProcessing(false);
        if (!response.ok) { alert("Something went wrong fetching the building") }
        setBuilding(await response.json());
    }

    const handleDatabaseSubmit = async() => {
        if (confirm) {
            setProcessing(true);
            console.log("Submitted");
            console.log(asset);
            setConfirm(false);

            const response = await fetch("/api/admin/assets/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...asset,
                    buildingId: buildingId
                })
            });
            if (!response.ok) {
                setServerOutput({
                    "status": "error",
                    "message": "Something went wrong",
                    "err": await response.json()
                })
            }
            else {
                setServerOutput({
                    "status": "success",
                    "message": "Successfully added asset",
                    "asset": await response.json()
                });
            }
            setProcessing(false);
        } else {
            setConfirm(true);
        }
    }

  return (
    <Layout>

    <div className="p-5">
        <h1 className="text-4xl mb-5">Add Assets</h1>

        <div className="flex flex-row">
            <div className="flex-1">
                <input 
                    className="bg-slate-500 p-3 rounded"
                    onChange={handleIdChange} 
                    value={buildingId} 
                    placeholder="Building ID" />
                <button 
                    className={`bg-secondary p-2 rounded ml-2 hover:bg-slate-500`}
                    onClick={handleBuildingLoad}
                    disabled={processing}
                >
                    { processing ? "Processing" : "Load Building" }
                </button>
            </div>
            <div className="flex-col">
                <button
                    className={`bg-secondary p-2 rounded ml-2 hover:bg-slate-500`}
                    disabled={confirm || processing}
                    onClick={handleDatabaseSubmit}
                >
                    { processing ? "Processing" : "Submit to Database" }  
                </button>
                <div className={`${confirm ? "flex": "hidden"}  justify-around`}>
                    <button className="hover:bg-secondary bg-slate-500 p-1 rounded" onClick={handleDatabaseSubmit}>Yes</button>
                    <button className="hover:bg-secondary bg-slate-500 p-1 rounded" onClick={() => setConfirm(false)}>No</button>
                </div>
            </div>
           

        </div>
        <div>
            <p>{ Object.keys(building).length > 0 && building.name }</p>
            <p>{ Object.keys(building).length > 0 && `${building.address} ${building.city}, ${building.state} ${building.zipcode}` }</p>
        </div>
        {/* grid grid-cols-1 md:grid-cols-2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 p-2 gap-2">
            {
                // Object.keys(building).length > 0 &&

                <div className="block h-full lg:h-[90vh] overflow-scroll">
                    {/* @ts-ignore */}
                    { Object.keys(building).length > 0 && <CreationForm setData={(value: Asset) => setAsset(value)} formFields={fields} /> }
                </div>
            }
            <div className="block h-full lg:h-[90vh] overflow-scroll">
                { Object.keys(building).length > 0 && <EditableCodeBlock data={asset} setData={(e) => setAsset(e)} edit={true}/> }

                {
                    Object.keys(serverOutput).length > 0 &&
                    <div className="mt-10">
                        <h1 className="text-center text-3xl m-5">Output</h1>
                        <EditableCodeBlock data={serverOutput} setData={() => {}} edit={false}/>
                    </div>
                }
               
            </div>
        </div>
    </div>

    </Layout>
  )
}

const fields = [
    {
        name: "assetType", // the name of the key used in Mongoose model
        label: "Asset Type *", // label
        type: "select", // HTML form type
        options: ["electricity", "gas", "water", "HVAC", "thermostat", "other"], // options for selection
        required: true // required or not
    },
    {
        name: "name",
        label: "Asset Name",
        type: "text",
        required: true
    },
    {
        name: "manufacturer",
        label: "Manufacturer",
        type: "text"
    },
    {
        name: "make",
        label: "Make",
        type: "text"
    },
    {
        name: "modelNumber",
        label: "Model Number",
        type: "text"
    },
    {
        name: "serialNumber",
        label: "Serial Number",
        type: "text"
    },
    {
        name: "location",
        label: "Location",
        type: "text"
    },
    {
        name: "energySource",
        label: "Energy Source (Primarily for Water heaters)",
        type: "select",
        options: ["Boiler", "Electric", "Propane", "Gas", "Other"]
    },
    {
        name: "HVACtype",
        label: "Type (Primarily for HVAC)",
        type: "select",
        options: ["Packaged RTU", "Rooftop RTU", "Split System-Ducted", "Mini-Split System-Ductless", "VAV", "VAF", "Other"]
    },
    {
        name: "supportedSuites",
        label: "Suites Supported (Separated by commas)",
        type: "text",
        array: true
    },
    {
        name: "supports",
        label: "Supports",
        type: "select",
        options: ["Dedicated to a suite", "Shared by multiple suites", "A combination of both", "One system for the building"]
    },
    {
        name: "dateInstalled",
        label: "Date Installed",
        type: "date"
    },
    {
        name: "warrantyExpiration",
        label: "Warranty Expiration",
        type: "date"
    },
    {
        name: "lastService",
        label: "Last Service",
        type: "date"
    },
    {
        name: "serviceContract",
        label: "Service Contract",
        type: "select",
        options: ["true", "false"],
    },
    {
        name: "occupiedDays",
        label: "Occupied/Utilized Days (Separated by commas) (Monday, Tuesday, etc.)",
        type: "text",
        array: true,
        options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    {
        name: "HVACSettings",
        label: "HVAC Settings",
        type: "object",
        options: [
            {
                name: "compressorCount",
                label: "Compressor Count",
                type: "number"
            },
            { // compressor
                name: "comp1PH",
                label: "Compressor 1 PH",
                type: "number",
                step: 0.05
            },
            {
                name: "comp1RLA",
                label: "Compressor 1 RLA",
                type: "number",
                step: 0.05
            },
            {
                name: "comp1LRA",
                label: "Compressor 1 RLA",
                type: "number",
                step: 0.05
            },
            {
                name: "comp2PH",
                label: "Compressor 2 PH",
                type: "number",
                step: 0.05
            },
            {
                name: "comp2RLA",
                label: "Compressor 2 RLA",
                type: "number",
                step: 0.05
            },
            {
                name: "comp2LRA",
                label: "Compressor 2 LRA",
                type: "number",
                step: 0.05
            },
            {
                name: "comp3PH",
                label: "Compressor 3 PH",
                type: "number",
                step: 0.05
            },
            {
                name: "comp3RLA",
                label: "Compressor 3 RLA",
                type: "number",
                step: 0.05
            },
            {
                name: "comp3LRA",
                label: "Compressor 3 LRA",
                type: "number",
                step: 0.05
            },
            {
                name: "fanPH",
                label: "Fan PH",
                type: "number",
                step: 0.05
            },
            {
                name: "fanFLA",
                label: "Fan FLA",
                type: "number",
                step: 0.05
            },
            {
                name: "fanHP",
                label: "Fan HP",
                type: "number",
                step: 0.05
            }
        ]
    },
    {
        name: "thermostatSettings",
        label: "Thermostat Settings",
        type: "object",
        options: [
            {
                name: "occupiedHeat",
                label: "Occupied Heat",
                type: "number",
            },
            {
                name: "unoccupiedHeat",
                label: "Unoccupied Heat",
                type: "number",
            },
            {
                name: "occupiedCooling",
                label: "Occupied Cooling",
                type: "number",
            },
            {
                name: "unoccupiedCooling",
                label: "Unoccupied Cooling",
                type: "number",
            },
            {
                name: "weekdayOccupiedStartTime",
                label: "Weekday Occupied Start Time",
                type: "time"
            },
            {
                name: "weekdayUnoccupiedStartTime",
                label: "Weekday Unoccupied Start Time",
                type: "time"
            },
            {
                name: "weekendOccupiedStartTime",
                label: "Weekend Occupied Start Time",
                type: "time"
            },
            {
                name: "weekendUnoccupiedStartTime",
                label: "Weekend Unoccupied Start Time",
                type: "time"
            },
            {
                name: "fanSetting",
                label: "Fan Setting (auto, on, off, etc.)",
                type: "select",
                options: ["auto", "on", "off", "other"]
            },
            {
                name: "hasBatteries",
                label: "Has Batteries? (true/false)",
                type: "select",
                options: ["true", "false"]
            },
            {
                name: "batteriesLastChanged",
                label: "Batteries Last Changed",
                type: "date"
            }
        ]
    },
    {
        name: "waterHeaterSettings",
        label: "Water Heater Settings",
        type: "object",
        options: [
            {
                name: "waterTemperature",
                label: "Water Temperature",
                type: "number",
                step: 0.5
            }
        ]
    }
];

export default AddAssets