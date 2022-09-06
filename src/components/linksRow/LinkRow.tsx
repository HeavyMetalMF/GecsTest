import React, {FC} from 'react';
import {Table} from "semantic-ui-react";
import {ILink} from "../../store/redusers/MainSlice";


const LinkRow: FC<ILink> = ({short, id, target, counter}) => {

    const copyText = async (text: string) => {
        await navigator.clipboard.writeText(`http://79.143.31.216/s/${text}`);
        alert('Текст скопирован, вставьте в поисковую строку');
    }

    return (
        <Table.Row>
            <Table.Cell onClick={() => copyText(short)}>{short}</Table.Cell>
            <Table.Cell>{target}</Table.Cell>
            <Table.Cell>{counter}</Table.Cell>
        </Table.Row>
    );
};

export default LinkRow;