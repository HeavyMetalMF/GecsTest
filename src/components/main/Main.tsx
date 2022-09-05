import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Form, Loader, Segment, Table} from "semantic-ui-react";
import './main.css';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getStatistic, sendShortLink} from "../../store/redusers/MainSlice";
import {useAuth} from "../../App";
import LinkRow from "../linksRow/LinkRow";
import Paginator from "../linksRow/Paginator";

const Main: FC = () => {
    const {token} = useAuth();
    const [link, setLink] = useState<string>('');
    const [sort, setSort] = useState<'ascending' | 'descending' | undefined>('ascending');
    const [column, setColumn] = useState<string>('');
    // const [column, setColumn] = useState<string>('');
    const dispatch = useAppDispatch();
    const {links, loadLinks} = useAppSelector(state => state.MainSlice)
    const data = {limit: 5, token, offset: 0}

    useEffect(() => {
        dispatch(getStatistic(data));
    }, [])

    const shortLink = (link: string) => {
        const shortData = {link, token};
        dispatch(sendShortLink(shortData));
        setLink('');
    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value);
    }

    const sortColumn = (column: string) => {
        console.log(column)
        if (column == 'count'){
            // сделать обартную сортировку
            //то есть сделать запрос с обратной сортировкой
            setSort('descending');
        }
        setColumn('count');
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
            {
                loadLinks
                    ?<Loader active inline='centered' />
                    :<Table sortable celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                    onClick={() => sortColumn(column)}
                                    sorted={column == 'count' ? sort : undefined}>
                                        Короткая ссылка
                                </Table.HeaderCell>
                                <Table.HeaderCell>Исходная ссылка</Table.HeaderCell>
                                <Table.HeaderCell>Кол-во пререходов по ссылке</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                links.map(link =>
                                    <LinkRow key={link.id} id={link.id} target={link.target} counter={link.counter} short={link.short} />
                                )
                            }
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='3'>
                                    <Paginator />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
            }
        </>
    );
};

export default Main;