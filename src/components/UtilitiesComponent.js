import React, { useEffect, useState } from 'react'
import { Button, Container, Dropdown, Table } from 'react-bootstrap'
import { CgThermostat } from 'react-icons/cg'
import { FiDelete } from 'react-icons/fi'
import { MdEdit } from 'react-icons/md'
import { RiWindyFill } from 'react-icons/ri'


export default function UtilitiesComponent(props) {

    const [firstKey, setFirstKey] = useState('')
    //buildings to utilities map
    const [utilities, setUtilities] = useState(new Map())
    //utilIds to utils map
    const [idsToUtilsMap, setIdsToUtilsMap] = useState(new Map())
    const [buildingIds, setBuildingIds] = useState([])
    const [isSubTable, setIsSubTable] = useState(false)
    const [active, setActive] = useState('white')
    const [currUtilSelected, setCurrUtilSelected] = useState('')

    useEffect(() => {
        // console.log("props.buildingNameUtilsMap", props.buildingNameUtilsMap)
        setFirstKey(props.buildingNameUtilsMap.keys().next().value)
        let tempUtilsMap = new Map()
        let tempBuildIds = []

        let tempIdsToUtilsMap = new Map()

        props.buildingNameUtilsMap.forEach((value, key) => {
            tempUtilsMap.set(key, value)
            tempBuildIds.push(key)

            value.forEach(v => {
                tempIdsToUtilsMap.set(v.name, v)
            })

        });

        setUtilities(tempUtilsMap)
        setIdsToUtilsMap(tempIdsToUtilsMap)
        setBuildingIds(tempBuildIds)

    }, [])

    const selectUtility = (utilityName) => {
        // setFirstKey(utilityName)
        setIsSubTable(true)
        setCurrUtilSelected(utilityName)
    }

    return <div>
        <Container>
            <Dropdown>
                <Dropdown.Toggle
                    style={{ width: '28rem' }}
                    variant="success" id="dropdown-basic">
                    {firstKey}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        buildingIds.map((k) => {
                            return (
                                <Dropdown.Item
                                    onSelect={() => {
                                        setFirstKey(k)
                                    }}
                                >
                                    {k}
                                </Dropdown.Item>
                            )
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>

        </Container>

        {/* Main table of buildings */}
        {/* <Container> */}
            {
                <Container>
                    <Table hover>
                        <thead>
                            <th>Thermostats & HVACs</th>
                        </thead>
                        <tbody>
                            {
                                props.buildingNameUtilsMap.get(firstKey) !== undefined &&
                                props.buildingNameUtilsMap.get(firstKey).map(b => {
                                    return (
                                        <tr size="lg" onClick={() => selectUtility(b.name)}>
                                            <td style={{width:200}}>
                                                {(b.utilityType === 'Thermostat') && <CgThermostat />}
                                                {(b.utilityType === 'HVAC') && <RiWindyFill />} {b.name}</td>
                                            <td>Edit <MdEdit /></td>
                                            <td>Retire <FiDelete /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>

                    <Button style={{ width: 212 }} variant="success" size="lg">
                        Add Thermostat
                    </Button>
                    {'     '}
                    <Button style={{ width: 212 }} variant="success" size="lg">
                        Add HVAC
                    </Button>
                </Container>
            }
            <br />
        {/* </Container> */}

        {/*Sub table of buildings- the more detailed one */}
        <Container>
            {
                isSubTable &&
                <div>idsToUtilsMap.get(currUtilSelected).utilityType)</div> &&
                // idsToUtilsMap.get(currUtilSelected).length > 0 &&

                <Container>
                    <div>
                        {
                            <Table bordered hover size="sm">
                                <thead>
                                    <th>Utility Details</th>
                                </thead>
                                <tbody>
                                <tr>
                                        <td style={{ backgroundColor: 'lightgrey' }}>Name</td>
                                        <td style={{ backgroundColor: active }}>{idsToUtilsMap.get(currUtilSelected).name}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ backgroundColor: 'lightgrey', width: 150 }}>Type</td>
                                        <td style={{ backgroundColor: active }}>{idsToUtilsMap.get(currUtilSelected).utilityType}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ backgroundColor: 'lightgrey' }}>Brand</td>
                                        <td style={{ backgroundColor: active }}>{idsToUtilsMap.get(currUtilSelected).brand}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ backgroundColor: 'lightgrey' }}>Model</td>
                                        <td style={{ backgroundColor: active }}>{idsToUtilsMap.get(currUtilSelected).model}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ backgroundColor: 'lightgrey' }}>Busy From</td>
                                        <td style={{ backgroundColor: active }}>{idsToUtilsMap.get(currUtilSelected).timeFrom}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ backgroundColor: 'lightgrey' }}>To</td>
                                        <td style={{ backgroundColor: active }}>{idsToUtilsMap.get(currUtilSelected).timeTo}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ backgroundColor: 'lightgrey' }}>Busy Days</td>
                                        <td style={{ backgroundColor: active }}>{idsToUtilsMap.get(currUtilSelected).daysOfWeek}</td>
                                    </tr>
                                </tbody>
                            </Table>


                        }
                    </div>

                </Container>


            }
            <Container>
                {
                    isSubTable &&
                    <div>
                        <Button style={{ width: 212 }} variant="success" size="lg">
                            Edit
                        </Button>
                        {' '}
                        <Button style={{ width: 212 }} variant="success" size="lg">
                            Retire
                        </Button>
                    </div>
                }
            </Container>
        </Container>

    </div>
}