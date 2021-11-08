import React from 'react';
import { Link } from "react-router-dom";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Button, Card, Row, Col } from 'antd';

const Cities = (props) => {

    const { cities, favouritesControl, iconFav, lg, md, xs } = props;
        
    return (
        <Row gutter={16} style={{ marginTop: '30px' }}>
            {cities && cities.map(city => {
                const { main, name, weather, id, coord, wind } = city;
                const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
                return (
                    <Col className="gutter-row" lg={{ span: {lg} }} md={{ span: {md} }} xs={{ span: {xs} }} key={id}>
                        <Card 
                            title={name} 
                            extra={<Link to={`/${coord.lat}:${coord.lon}`}>More</Link>}
                            style={{ width: 280, margin: '10px 0' }}>
                            <div>
                                <span style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 0, float: 'left' }}>{Math.round(main.temp)}°C</span>
                                <span style={{ fontSize: '16px', marginBottom: 0, float: 'right' }}>Feels like: {Math.round(main.feels_like)}°C</span>
                            </div>
                            <img className="city-icon" src={icon} alt={weather[0]["main"]} />
                            <p style={{ marginBottom: 0 }}>{(weather[0]["description"]).toUpperCase()}</p>
                            <p style={{ marginBottom: 0 }}>WIND SPEED: {wind.speed} m/s</p>
                            <Button 
                                style={{ float: 'right' }}
                                shape="circle" 
                                icon={iconFav}
                                onClick={() => favouritesControl(city)} 
                            />
                        </Card>
                    </Col>
                )
            })}
        </Row>
    )
};

export default Cities;