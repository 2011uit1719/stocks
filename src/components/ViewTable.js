import React from 'react';

const ViewTable = (props) => {
    let tr = Object.keys(props.stockList).map((stockItem, i) => {
        return (
            <tr key={i} className={props.stockList[stockItem].change}>
                <td> {stockItem.toUpperCase()} </td>
                <td>{props.stockList[stockItem].price}</td>
                <td>{props.stockList[stockItem].lastUpdated}</td>
            </tr>
        );
    });
    return tr;
}

export default ViewTable;