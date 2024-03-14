import React from 'react'
import { Container, Table } from 'react-bootstrap'

export default function DummyData() {
    return <Container>
    <Table>
        <thead>
            <tr>
                <th>Sensor Data</th>
                <th>Low</th>
                <th>Current</th>
                <th>High</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>HVAC - CMP</th>
                <td>XX.XX</td>
                <td>XX.XX</td>
                <td>XX.XX</td>
            </tr>
            <tr>
                <th>HVAC - FAN</th>
                <td>XX.XX</td>
                <td>XX.XX</td>
                <td>XX.XX</td>
            </tr>
            <tr>
                <th>COMFORT - TEMP</th>
                <td>XX.XX</td>
                <td>XX.XX</td>
                <td>XX.XX</td>
            </tr>
            <tr>
                <th>COMFORT - WEATHER</th>
                <td>XX.XX</td>
                <td>XX.XX</td>
                <td>XX.XX</td>
            </tr>
            <tr>
                <th>RH%</th>
                <td>XX.XX</td>
                <td>XX.XX</td>
                <td>XX.XX</td>
            </tr>
        </tbody>
    </Table>
</Container>
}