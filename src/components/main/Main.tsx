import React, {ChangeEvent, FC, useState} from 'react';
import {Form, Icon, Menu, Segment, Table} from "semantic-ui-react";
import './main.css';
import {useAppDispatch} from "../../hooks/redux";
import {sendShortLink} from "../../store/redusers/MainSlice";
import {useAuth} from "../../App";

const Main: FC = () => {
    const {token} = useAuth();
    const [link, setLink] = useState<string>('');
    const dispatch = useAppDispatch();

    const shortLink = (link: string) => {
        console.log(link)
        const shortData = {link, token}
        dispatch(sendShortLink(shortData))
        setLink('')
    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value)
    }

    return (
        <>
        <Form >
            <Segment>
                <Form.Input value={link} onChange={(e: ChangeEvent<HTMLInputElement>) => inputHandler(e)} placeholder={'Введите URL'}/>
                <Form.Button onClick={() => shortLink(link)}>
                    Отправить
                </Form.Button>
            </Segment>
        </Form>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Header</Table.HeaderCell>
                    <Table.HeaderCell>Header</Table.HeaderCell>
                    <Table.HeaderCell>Header</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        first
                    </Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                </Table.Row>
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='3'>
                        <Menu floated='right' pagination>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron left' />
                            </Menu.Item>
                            <Menu.Item as='a'>1</Menu.Item>
                            <Menu.Item as='a'>2</Menu.Item>
                            <Menu.Item as='a'>3</Menu.Item>
                            <Menu.Item as='a'>4</Menu.Item>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron right' />
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
        </>
    );
};

export default Main;