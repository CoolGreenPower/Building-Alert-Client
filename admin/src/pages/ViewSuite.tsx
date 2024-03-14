import Layout from "./Layout"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FormControlLabel, Switch } from "@mui/material"
import { Suite } from "../../common.types"
import InfoListing from "../components/InfoListing"
import { suiteDetailsFields } from "../constants"


const switchStyling = {
    ".MuiSwitch-track": {
      backgroundColor: "gray"
    }
}

const ViewSuite = () => {
    const [showKeys, setShowKeys] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<string>("");
    const [suite, setSuite] = useState<Suite>({} as Suite);

    // const [loading, setLoading] = useState<boolean>(true);
    // const [rows, setRows] = useState<object[]>([]);
    // const [columns, setColumns] = useState<GridColDef[]>([]);
    
    // run only once on page load
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        const fetchSuite = async() => {
            const response = await fetch(`/api/admin/suites/${id}`)
            if (!response.ok) { alert("Something went wrong fetching suite details") }
            setSuite(await response.json());
        }

        fetchSuite();
        setActiveSection("details");
        console.log(id)
    }, [])


  return (
    <Layout>
        <div className="flex flex-row w-full">
            <div className="fixed left-0 h-full border-r-2 border-gray-500 bg-background p-4 z-20 w-[10rem]">
                <div className="flex flex-col items-start">
                    <div className="border-b-2 border-gray-500 pb-2">
                        <h1 className="text-lg">Suite Details</h1>
                        <Link to="/"><button className="w-full bg-transparent border-2 border-lightslate p-1 my-2 rounded font-bold text-md hover:bg-lightslate">Return</button></Link>
                    </div>

                    <div className="border-b-2 border-gray-500">
                        {/* {
                        buildingViewSections.map((item) => (
                            <button onClick={() => setActiveSection(item.id)} className={`w-full py-3 hover:bg-slate-500 ${activeSection == item.id ? `bg-slate-500` : ``}`}>{ item.title }</button>
                        ))
                        } */}
                        <p>Add extra functionalities here (i.e. add/remove tenants)</p>
                    </div>

                    <div className="flex flex-col justify-between mt-5">
                        <FormControlLabel control={<Switch sx={switchStyling} onChange={() => setShowKeys(!showKeys)}/>} label="Show Hidden" />
                    </div>
                </div>

           
            </div>
            <div className="pl-[11rem] pt-5 pr-5 flex flex-1 flex-col">
                <h1 className="text-4xl mb-5 w-full">{ suite.suite }</h1>
                { (activeSection == "details" && Object.keys(suite).length > 0) &&
                    <InfoListing showHidden={showKeys} data={suite} formFields={suiteDetailsFields}/>
                }
                {/* <InfoListing showHidden={showKeys} data={building} formFields={buildingDetailsFields}/> } */}
            </div>
        </div>
    </Layout>
  )
}

export default ViewSuite