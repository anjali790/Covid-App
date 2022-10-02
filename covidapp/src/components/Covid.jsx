import React, { useState, useEffect } from 'react';
import './Covid.css';
// import axios from 'axios';

export function Covid() {
    const [data, setData] = useState([]);
    const [theme, setTheme] = useState('dark-mode');

    useEffect(() => {
        document.body.className = theme;

    }, [theme]);

    const toggle = () => {
        if (theme === "dark-mode") {
            setTheme('light-mode');
        } else {
            setTheme('dark-mode');
        }
    }

    const getCoviddata = async () => {
        try {
            const res = await fetch('https://api.covid19api.com/summary');
            const actualData = await res.json();
            console.log(actualData.Global);
            setData(actualData.Global)
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        getCoviddata();
    }, []);

    return (
        <>
            <div class="container">
                <h1 class="main-heading">Covid 19 Live Data Update</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th class="tr">New Confirmed</th>
                            <th class="tr">New Deaths</th>
                            <th class="tr">New Recovered</th>
                            <th class="tr">Total Cases</th>
                            <th class="tr">Total Deaths</th>
                            <th class="tr">Total Recovered</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td class="data">{data['NewConfirmed']}</td>
                        <td class="data">{data['NewDeaths']}</td>
                        <td class="data">{data['NewRecovered']}</td>
                        <td class="data">{data['TotalConfirmed']}</td>
                        <td class="data">{data['TotalDeaths']}</td>
                        <td class="data">{data['TotalRecovered']}</td>
                    </tbody>
                </table>
                <div className='toggleDiv'>
                    <p>Date & Time : {data.Date}</p>
                    <button class="btn" onClick={() => toggle()}>Toggle Mode</button>
                </div>
            </div>
        </>
    )
}