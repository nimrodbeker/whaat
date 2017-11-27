import React from 'react'
import {changeSort} from "../redux/actions";
import {connect} from "react-redux";
import {getNumberCompareFunction} from "../utils";

export const headers = {
    id: {display: '#', sortable: true},
    name: {display: 'Name', sortable: true},
    interval: {display: 'Interval(Days)', sortable: true, sortFunction: getNumberCompareFunction},
    starters: {display: 'Starters', sortable: false},
    msgCount: {display: 'Messages(#)', sortable: true, sortFunction: getNumberCompareFunction},
    lastMsg: {display: 'Last Msg', sortable: true, sortFunction: getNumberCompareFunction},
    remove: {display: 'Remove Contact', sortable: false}
};
const displayOrder = ['id', 'name', 'interval', 'starters', 'lastMsg']; // 'msgCount'

const Header = ({header, onHeaderClick}) => {
    return <th>
            {header.sortable &&
            <span role="button" onClick={(e) => {
                e.preventDefault();
                onHeaderClick(header.key);
            }}>
            {header.name.toUpperCase()}
        </span>}
            {!header.sortable && <span>{header.name.toUpperCase()}</span>}
    </th>
};
export const HeadersDisplay = ({headers, onHeaderClick}) => {
    return <thead>
    <tr>
        <td>&nbsp;</td>
        {headers.map((header) => <Header key={header.key} header={header} onHeaderClick={onHeaderClick}/>)}
    </tr>
    </thead>
};
const getHeaders = (sort) => {
    return displayOrder.map((item) => ({
        key: item,
        name: headers[item].display,
        sortable: headers[item].sortable,
        active: item === sort.key
    }));
};
const mapStateToProps = state => {
    return {
        headers: getHeaders(state.sort)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onHeaderClick: key => {
            dispatch(changeSort(key))
        }
    }
};
export default connect(
    mapStateToProps, mapDispatchToProps
)(HeadersDisplay);

