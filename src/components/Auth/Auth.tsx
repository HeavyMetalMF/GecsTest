import React, {ChangeEvent, FC, useState} from 'react';
import {Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';
import {useAppDispatch} from "../../hooks/redux";
import './auth.css';
import {NavLink, useNavigate} from "react-router-dom";
import {loginUser} from "../../store/redusers/MainSlice";
import {useAuth} from "../../App";

interface IUser{
    username: string,
    password: string,
}

const Auth: FC = () => {
    const [authUser, setAuthUser] = useState<IUser>({username: '', password: ''});
    const [error, setError] = useState<boolean>(false);
    const {token, setToken} = useAuth();
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    const login = async (user: IUser) => {
        await dispatch(loginUser(user)).then(res => {
            setToken(res.data.access_token)
            navigate('/', { replace: true })
        });
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }} className='auth'>
                <Header color='teal' textAlign='center'>
                    </Header>
                <Form size='large' error={error}>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            onChange={(e:ChangeEvent<HTMLInputElement>) => setAuthUser({...authUser, username: e.target.value})}
                            placeholder='Login' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={(e:ChangeEvent<HTMLInputElement>) => setAuthUser({...authUser, password: e.target.value})}
                        />
                        <Message
                            size={"mini"}
                            error
                            header='Ошибка авторизации'
                            content='Неверный логин или пароль'
                        />
                        <Button color='teal' fluid size='large' onClick={() => login(authUser)}>
                            Войти
                        </Button>
                    </Segment>
                </Form>
                <Message>
                     Нет аккаунта?
                     <div>
                         <NavLink to={'/register'}>Регистрация</NavLink>
                     </div>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default Auth;