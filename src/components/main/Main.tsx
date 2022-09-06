import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Form, Loader, Segment, Table} from "semantic-ui-react";
import './main.css';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getLengthStatistic, getStatistic, sendShortLink} from "../../store/redusers/MainSlice";
import {useAuth} from "../../App";
import LinkRow from "../linksRow/LinkRow";
import Paginator from "../linksRow/Paginator";

const Main: FC = () => {
    const {token} = useAuth();
    const [link, setLink] = useState<string>('');
    const [sort, setSort] = useState<'ascending' | 'descending' | undefined>('ascending');
    const [column, setColumn] = useState<string>('');
    const {links, loadLinks, limit, offset} = useAppSelector(state => state.MainSlice);
    const dispatch = useAppDispatch();

    const initialData = {limit, token, offset}

    useEffect(() => {
        dispatch(getStatistic(initialData));
        dispatch(getLengthStatistic(token));
    }, [])

    const shortLink = (link: string) => {
        const shortData = {link, token, limit};
        dispatch(sendShortLink(shortData));
        setLink('');
    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value);
    }

    const sortColumn = (col: string) => {
        if (column != ''){
            const data = {token, limit, offset, order: sort === 'ascending' ? `desc_${col}` : `asc_${col}`}
            dispatch(getStatistic(data));
            sort === 'ascending' ? setSort('descending') : setSort('ascending');
            setColumn(col);
        }
        else{
            const data = {token, limit, offset, order: `asc_${col}`}
            dispatch(getStatistic(data));
            setColumn(col);
        }
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
                                    onClick={() => sortColumn('short')}
                                    sorted={column == 'short' ? sort : undefined}>
                                        Короткая ссылка
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                    onClick={() => sortColumn('target')}
                                    sorted={column == 'target' ? sort : undefined}>
                                        Исходная ссылка
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                    onClick={() => sortColumn('counter')}
                                    sorted={column == 'counter' ? sort : undefined}>
                                        Кол-во пререходов по ссылке
                                </Table.HeaderCell>
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
                                    <Paginator links={links} order={
                                        column != ''
                                            ? sort === 'ascending' ? `asc_${column}` : `desc_${column}`
                                            : null} />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
            }
        </>
    );
};

export default Main;