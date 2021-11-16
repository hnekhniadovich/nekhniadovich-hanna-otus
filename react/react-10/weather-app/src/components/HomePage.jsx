import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import Cities from './Cities';
import { getWeatherByCity } from '../services/api-service';


const HomePage = () => {

    const [form] = Form.useForm();
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([]);
    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || []);

    console.log('test favourites', favourites);

    const onFinish = ({ city }) => {
        setCity(city);
        form.resetFields();
    };

    const addToFavourites = (city) => {
        setFavourites([...favourites, city]);
        localStorage.setItem('favourites', JSON.stringify([...favourites, city]));
        setCities(cities.filter(c => c.id !== city.id));
    }

    const removeFromFavourites = (city) => {
        setFavourites(favourites.filter(c => c.id !== city.id));
        localStorage.setItem('favourites', JSON.stringify(favourites.filter(c => c.id !== city.id)));
    }

    useEffect(() => {
        getWeatherByCity(city)
        .then(
            (result) => {
                if(result && result.cod === 200) {
                    setCities([...cities, result]);
                }
            },
            (error) => {
                console.log(error);
            }
        )
    }, [city]);

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
            <Row>
                <Col span={18}>
                    <Cities 
                        cities={cities} 
                        favouritesControl={addToFavourites} 
                        iconFav={<HeartOutlined />} 
                        lg={8} 
                        md={12} 
                        xs={24}
                    />
                </Col> 
                <Col span={6}>
                    <div>Your favourite cities are here:</div>
                    <Cities 
                        cities={favourites} 
                        favouritesControl={removeFromFavourites} 
                        iconFav={<HeartFilled />}
                        lg={24} 
                        md={24} 
                        xs={24}
                    />
                </Col> 
            </Row>
        </>
    );
};

export default HomePage;