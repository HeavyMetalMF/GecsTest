import React, {FC} from 'react';
import {Table} from "semantic-ui-react";
import {ILink} from "../../store/redusers/MainSlice";


const LinkRow: FC<ILink> = ({short, id, target, counter}) => {
    return (
        <Table.Row>
            <Table.Cell>{short}</Table.Cell>
            <Table.Cell>{target}</Table.Cell>
            <Table.Cell>{counter}</Table.Cell>
        </Table.Row>
    );
};

export default LinkRow;