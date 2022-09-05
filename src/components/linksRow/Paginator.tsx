import React, {FC, useState} from 'react';
import {Icon, Menu} from "semantic-ui-react";
import {getStatistic} from "../../store/redusers/MainSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useAuth} from "../../App";

// interface IPaginator {
//     totalUsersCount: number,
//     pageSize: number,
//     portionSize: number,
//     currentPage: number,
// }

const Paginator: FC = () => {
    const {offset, limit} = useAppSelector(state => state.MainSlice)
    const {token} = useAuth();
    const dispatch = useAppDispatch();

    const getNewPage = () => {
        const data = {offset: offset + 5, limit, token}
        dispatch(getStatistic(data));
    }

    const getPrevPage = () => {
        const data = {offset: offset - 5, limit, token}
        dispatch(getStatistic(data));
    }

    return (
        <Menu floated='right' pagination>
            {
                offset > 1 && <Menu.Item onClick={() => getPrevPage()} as='a' icon>
                <Icon name='chevron left'/>
            </Menu.Item>
            }
            <Menu.Item onClick={() => getNewPage()} as='a' icon>
                <Icon name='chevron right' />
            </Menu.Item>
        </Menu>
    );
};

export default Paginator;