/* 
Class to display options to admin account
*/

import { useState, useEffect } from 'react';
import { Card, Container, Table, Button } from 'react-bootstrap'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { LOCAL_HOST, PORT } from '../constants/constants';
import { MdEdit, MdRestaurant } from 'react-icons/md'
import { FiDelete } from 'react-icons/fi'
import { RiBankFill } from 'react-icons/ri'
import UtilitiesComponent from './UtilitiesComponent';

export default function Admin() {

    const [adminDataCategory, setAdminDataCategory] = useState('')
    const [buildings, setBuildings] = useState([])
    const [isBuildTable, setIsBuildTable] = useState(false)
    const [siteSelected, setSiteSelected] = useState('')
    const userId = useSelector((state) => state.userId)
    const [active, setActive] = useState('white')
    const [isSubTable, setIsSubTable] = useState(false)
    const [utilities, setUtilities] = useState(new Map())
    const [isUtilitiesMenu, setUtilitiesMenu] = useState(false)

    useEffect(() => {

        if ((adminDataCategory === 'buildings' || adminDataCategory === 'thermostats') && buildings.length === 0) {

            axios.post(`${LOCAL_HOST}:${PORT}/buildings`, {
                "userId": "60d6199057c4af195410cbb5"
                // "userId": userId
            },
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                        'content-type': 'application/json'
                    }
                })
                .then(res => {
                    let builds = []
                    let pb = res.data[0].sites

                    let tempUtils = new Map()

                    pb.forEach(p => {

                        for (let i = 0; i < p.buildings.length; i++) {
                            builds.push(p.buildings[i])
                            let key = p.buildings[i].name
                            tempUtils.set(key, p.buildings[i].utility)

                        }
                    })

                    setUtilities(tempUtils)
                    setBuildings(builds)
                    setIsBuildTable(true)
                })
        }
    }, [adminDataCategory])

    //to select business and buildings
    const selectSite = (name) => {
        setSiteSelected(name)
        setIsSubTable(true)
        setActive('lightblue')
        setTimeout(() => { setActive('white') }, 1000)
        setUtilitiesMenu(false)
    }

    const onClickBusinessBuildings = (b) => {
        setCategoryBuildings(b)
        setUtilitiesMenu(false)
    }

    // To select thermostats and HVACs
    const selectAdminCategory = (category) => {
        setAdminDataCategory(category)
        //hide build table
        setIsBuildTable(false)
        //hide subtable
        setIsSubTable(false)

        //make visible utils menu when thermostats and HVACs are selected
        setUtilitiesMenu(true)
    }

    const setCategoryBuildings = (category) => {
        setAdminDataCategory(category)
        setIsBuildTable(true)
        setIsSubTable(false)
    }

    return <div>
        <Card className="box"
            border="success"
            style={{ width: '28rem' }}
            bg="success"
        >
            <Card.Header>
                <Card.Title>
                    Users & Roles
                </Card.Title>
            </Card.Header>
        </Card>

        <div onClick={() => onClickBusinessBuildings('buildings')}>
            <Card className="box"
                border="warning"
                style={{ width: '28rem' }}
                bg="warning"
            >
                <Card.Header>
                    <Card.Title>
                        Businesses & Buildings
                    </Card.Title>
                </Card.Header>
            </Card>
        </div>

        <div onClick={() => selectAdminCategory('thermostats')}>
            <Card className="box"
                border="info"
                style={{ width: '28rem' }}
                bg="info"
            >
                <Card.Header>
                    <Card.Title>
                        Thermostats & HVACs
                    </Card.Title>
                </Card.Header>
            </Card>
        </div>

        <Card className="box"
            border="danger"
            style={{ width: '28rem' }}
            bg="danger"
        >
            <Card.Header>
                <Card.Title>
                    Data Logger
                </Card.Title>
            </Card.Header>
        </Card>

        {/* Main table of buildings */}
        <Container>
            {
                isBuildTable &&
                <Container>
                    <Table hover>
                        <thead>
                            <th>Businesses & Buildings</th>
                        </thead>
                        <tbody>
                            {
                                buildings.map(b => {
                                    return (
                                        <tr size="lg" onClick={() => selectSite(b.name)}>
                                            <td style={{ width: 200 }}>
                                                {(b.type === 'Bank') && <RiBankFill />}
                                                {(b.type === 'Deli') && <MdRestaurant />} {b.name}</td>
                                            <td>Edit <MdEdit /></td>
                                            <td>Retire <FiDelete /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>

                    <Button style={{ width: 216 }} variant="success" size="lg">
                        Add Business
                    </Button>
                    {'     '}
                    <Button style={{ width: 216 }} variant="success" size="lg">
                        Add Building
                    </Button>
                </Container>
            }
            <br />
        </Container>

        {
            isUtilitiesMenu &&
            <UtilitiesComponent buildingNameUtilsMap={utilities} />
        }

        {/*Sub table of buildings- the more detailed one */}
        <Container>
            {
                //loop thru businesses
                isSubTable &&
                buildings.map(b => {
                    return (
                        <Container>
                            <div>
                                {
                                    b.name === siteSelected &&
                                    <Table bordered hover size="sm">
                                        <thead>
                                            <th>Building Details</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ backgroundColor: 'lightgrey', width: 150 }}>Building Type</td>
                                                <td style={{ backgroundColor: active }}>{b.type}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ backgroundColor: 'lightgrey' }}>Building Name</td>
                                                <td style={{ backgroundColor: active }}>{b.name}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ backgroundColor: 'lightgrey' }}>Building Owner</td>
                                                <td style={{ backgroundColor: active }}>{b.owner}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ backgroundColor: 'lightgrey' }}>Address</td>
                                                <td style={{ backgroundColor: active }}>{b.address}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ backgroundColor: 'lightgrey' }}>Phone</td>
                                                <td style={{ backgroundColor: active }}>{b.phone}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                }
                            </div>
                        </Container>
                    )
                })
            }
            <Container>
                {
                    isSubTable &&
                    <div>
                        <Button style={{ width: 216 }} variant="success" size="lg">
                            Edit
                        </Button>
                        {' '}
                        <Button style={{ width: 216 }} variant="success" size="lg">
                            Retire
                        </Button>
                    </div>
                }
            </Container>
        </Container>
    </div>

}