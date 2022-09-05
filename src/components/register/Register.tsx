import React, {ChangeEvent, FC, useState} from 'react';
import {Button, Form, Grid, Header, Icon, Image, Message, Segment} from "semantic-ui-react";
import {useAppDispatch} from "../../hooks/redux";
import './register.css';
import {registerUser} from "../../store/redusers/MainSlice";

export interface INewUser{
    username: string,
    password: string,
}

const Register: FC = () => {
    const [user, setUser] = useState<INewUser>({username: '', password: ''});

    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const addNewUser = (user: INewUser):void => {
        dispatch(registerUser(user)).then(res => {
            console.log(res.payload)
        });
    }
    return (
        <Grid textAlign='center' style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }} className='add_user'>
                <Header as={'h2'} >
                    <Icon.Group size='big'>
                        <Icon loading size='big' name='circle outline' />
                        <Icon name='user' />
                    </Icon.Group>
                </Header>
                <Form size='large' success={success} error={error}>
                    <Segment stacked>
                        <Form.Input
                            value={user.username}
                            fluid
                            icon='user'
                            iconPosition='left'
                            onChange={(e:ChangeEvent<HTMLInputElement>) => setUser({...user, username: e.target.value})}
                            placeholder='Login' />
                        <Form.Input
                            value={user.password}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={(e:ChangeEvent<HTMLInputElement>) => setUser({...user, password: e.target.value})}
                        />
                        <Message
                            size={"mini"}
                            success
                            header='Пользователь успешно добавлен'
                        />
                        <Message
                            size={"mini"}
                            error
                            header='Пользователь с таким именем уже существует'
                        />
                        <Button color='teal' fluid size='large' onClick={() => addNewUser(user)}>
                            Регистрация
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
};

export default Register;