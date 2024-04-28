import React, { useState, useEffect } from 'react';
import '../styles/Table.css'

function Table() {
    return (
        <div className="Table">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Entrada</th>
                        <th>Saida</th>
                        <th>Entrada</th>
                        <th>Saida</th>
                        <th>Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>24/04/2024</td>
                        <td>08:00</td>
                        <td>12:00</td>
                        <td>13:00</td>
                        <td>17:00</td>
                        <td>08:00</td>
                    </tr>
                    <tr>
                        <td>24/04/2024</td>
                        <td>08:00</td>
                        <td>12:00</td>
                        <td>13:00</td>
                        <td>17:00</td>
                        <td>08:00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table;