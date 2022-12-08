import { Button, Form, Input, message } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const HandlerSubmit = async (value) => {
        //console.log(value);
            try {
                dispatch({
                    type: "SHOW_LOADING",
                });
                const res = await axios.post('/api/users/login');
                message.success("User Login Successfully!")
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate("/");
                dispatch({
                    type: "HIDE_LOADING",
                });
                
                
            } catch (error) {
                dispatch({
                    type: "HIDE_LOADING",
                });
                message.error("Error!")
                console.log(error);
            }
    }

    useEffect(() => {
        if(localStorage.getItem("auth")) {
            localStorage.getItem("auth");
        navigate("/");
        }
    }, [navigate]);

    return (
        <div className='form'>
            <h2>TIPSY GARDEN</h2>
            <p>Login</p>
            <div className="form-group">
            <Form layout='vertical' onFinish={HandlerSubmit}> 
                <FormItem name="email" label="Email">
                    <Input />
                </FormItem>
                    <FormItem name="password" label="Password">
                    <Input type="password" />
                </FormItem>
                    <div className='form-btn-add'>
                        <Button htmlType='submit' className='add-new'>Login</Button>
                        <Link className='form-group' to="/register">Register Here!</Link>
                    </div>
            </Form>
            </div>
        </div>
    )
}

export default Login