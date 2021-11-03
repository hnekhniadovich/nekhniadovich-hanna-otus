import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Form, Input, Button, Card, Row, Col } from 'antd';

const API_KEY = "ad92f2fdefbf4f10b9d7dc8bc19e1fd2";

const HomePage = () => {

    const [form] = Form.useForm();
    const [city, setCity] = useState('');
    const [cities, setCities] = useState(JSON.parse(localStorage.getItem('allCities')) || []);

    const onFinish = ({ city }) => {
        setCity(city);
        form.resetFields();
    };

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(res => res.json())
            .then(
                (result) => {
                    if(result && result.cod === 200) {
                        setCities([...cities, result]);
                        localStorage.setItem("allCities", JSON.stringify([...cities, result]));
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [city]);

    const renderCards = (cities) => {
        
        return (
            <Row gutter={16} style={{ marginTop: '30px' }}>
                {cities && cities.map(city => {
                    const { main, name, weather, id, coord } = city;
                    const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
                    return (
                        <Col className="gutter-row" lg={{ span: 8 }} md={{ span: 12 }} xs={{ span: 24 }} key={id}>
                            <Card 
                                title={name} 
                                extra={<Link to={`/${coord.lat}:${coord.lon}`}>More</Link>}
                                style={{ width: 280, margin: '10px 0' }}>
                                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{Math.round(main.temp)}°C</p>
                                <img className="city-icon" src={icon} alt={weather[0]["main"]} />
                                <p>{(weather[0]["description"]).toUpperCase()}</p>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        )

    };

    return (
        <>
            <div style={{fontSize: '26px', fontWeight: 'bold', marginBottom: '30px'}}>Simple weather app</div>
            <Form
                form={form}
                size="large"
                layout="inline"
                name="weather"
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="city"
                    rules={[{ required: true, message: 'Please input your city!' }]}
                >
                    <Input placeholder="Search for a city"/>
                </Form.Item>
        
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <div>
                {renderCards(cities)}
            </div>
        </>
    );
};

export default HomePage;