import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Card, Row, Col } from 'antd';

const API_KEY = "ad92f2fdefbf4f10b9d7dc8bc19e1fd2";

const CityPage = () => {

    const { coord } = useParams();
    const [lat, lon] = coord.split(':');
    const [weather, setWeather] = useState([]);
    const [timezone, setTimezone] = useState();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${API_KEY}&units=metric`)
            .then(res => res.json())
            .then(
                (result) => {
                    setWeather(result.daily)
                    setTimezone(result.timezone)
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [lat, lon]);

    return (
        <>
            <div style={{fontWeight: 'bold', fontSize: '16px'}}>7 day weather forecast for time zone {timezone}</div>
            <Row gutter={8} style={{ marginTop: '30px' }}>
                {weather && weather.map((data, idx) => {
                    const d = new Date();
                    let dayName = days[d.getDay() + idx%6];
                    if(idx === 0) {
                        dayName = 'Today';
                    }
                    const { temp: { day }, weather } = data;
                    const iconImg = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
                    return (
                        <Col className="gutter-row" lg={{ span: 6 }} md={{ span: 8 }} xs={{ span: 12 }} key={idx}>
                            <Card 
                                title={dayName} 
                                style={{ width: 200, margin: '10px 0' }}>
                                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{Math.round(day)}°C</p>
                                <img className="city-icon" src={iconImg} alt={weather[0].icon} />
                                <p>{weather[0].description.toUpperCase()}</p>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
};

export default CityPage;