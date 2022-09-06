import React, {FC} from 'react';
import {Icon, Menu} from "semantic-ui-react";
import {getStatistic, ILink} from "../../store/redusers/MainSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useAuth} from "../../App";

interface IPaginator {
    order: string | null
    links: ILink[]
}

interface IData {
    offset: number,
    limit: number,
    token: string | null,
    order?: string
}

const Paginator: FC<IPaginator> = ({order, links}) => {
    const {offset, limit, linksLength} = useAppSelector(state => state.MainSlice)
    const {token} = useAuth();
    const dispatch = useAppDispatch();

    const getNewPage = () => {
        const data: IData = {offset: offset + 5, limit, token}
        if (order)
            data['order'] = order
        dispatch(getStatistic(data));
    }

    const getPrevPage = () => {
        const data: IData = {offset: offset - 5, limit, token}
        if (order)
            data['order'] = order
        dispatch(getStatistic(data));
    }

    return (
        <Menu floated='right' pagination>
            {
                offset > 1 && <Menu.Item onClick={() => getPrevPage()} as='a' icon>
                <Icon name='chevron left'/>
            </Menu.Item>
            }
            {
                linksLength > limit && links.length >= limit ?
                     <Menu.Item onClick={() => getNewPage()} as='a' icon>
                        <Icon name='chevron right' />
                    </Menu.Item>
                    : ''
            }
        </Menu>
    );
};

export default Paginator;