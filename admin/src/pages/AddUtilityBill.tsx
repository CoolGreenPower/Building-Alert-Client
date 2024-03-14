import { UtilityBill, Building } from "../../common.types";
import CreationForm from "../components/CreationForm";
import EditableCodeBlock from "../components/EditableCodeBlock";
import Layout from "./Layout"
import { useState } from "react";

const AddUtilityBill = () => {
    const [buildingId, setBuildingId] = useState<string>("");
    const [building, setBuilding] = useState<Building>({} as Building);
    const [utility, setUtility] = useState<UtilityBill>({} as UtilityBill);

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
            console.log("Submitted");
            console.log(utility);
            setConfirm(false);
            setProcessing(true);

            const response = await fetch("/api/admin/utilities/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    buildingId: buildingId,
                    ...utility,
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
                    "message": "Successfully added utility bill",
                    "utility": await response.json()
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
        <h1 className="text-4xl mb-5">Add Utility Bills</h1>

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
                    { Object.keys(building).length > 0 && <CreationForm setData={(value: UtilityBill) => setUtility(value)} formFields={fields} /> }
                </div>
            }
            <div className="block h-full lg:h-[90vh] overflow-scroll">
                { Object.keys(building).length > 0 && <EditableCodeBlock data={utility} setData={(e) => setUtility(e)} edit={true}/> }

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
        name: "startDate",
        label: "Start Date",
        type: "date",
    },
    {
        name: "endDate",
        label: "End Date",
        type: "date",
    },
    {
        name: "type",
        label: "Utility Type",
        type: "select",
        options: [
            "electric",
            "gas",
            "water",
            "other"
        ]
    },
    {
        name: "location",
        label: "Location",
        type: "object",
        options: [
            {
                name: "suiteId",
                label: "Suite ID",
                type: "text",
            }
        ]
    },
    {
        name: "data",
        label: "Data (Add to JSON editor with any fields you want)",
        type: "text",
        disabled: true
    }
];

export default AddUtilityBill