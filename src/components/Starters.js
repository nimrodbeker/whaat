import React from 'react'
import MultiSelect from "./MultiSelect";
import {removeStarter, updateStarter} from "../redux/actions";
import {connect} from "react-redux";
import {Remove} from "../utils"


const Starter = ({groupName, groupOptions, onGroupRemove, onGroupUpdate}) => {
    return <tr>
        <th>
            <Remove onClick={() => {onGroupRemove(groupName)}} />
        </th>
        <th>
            {groupName.toUpperCase()}
        </th>
        <td>
            <MultiSelect values={groupOptions}
                         onValuesChange={(newValues) => {onGroupUpdate(groupName, newValues);}}
            />
        </td>
    </tr>
};

const mapStateToProps = (state) => {
    return {groups: state.starters}
};
const mapDispatchToProps = (dispatch) => {
    return {
        onGroupUpdate: (groupName, groupValues) => dispatch(updateStarter(groupName, groupValues)),
        onGroupRemove: groupName => dispatch(removeStarter(groupName))
    }
};


const Starters = ({groups, onGroupUpdate, onGroupRemove}) => {
    const starters = [];
    for (let key in groups) {
        starters.push(<Starter key={key} groupName={key} groupOptions={groups[key]} onGroupRemove={onGroupRemove}
                               onGroupUpdate={onGroupUpdate}/>);
    }
    return <div>
        <table>
            <tbody>{starters}</tbody>
        </table>
    </div>
};
export default connect(mapStateToProps, mapDispatchToProps)(Starters)