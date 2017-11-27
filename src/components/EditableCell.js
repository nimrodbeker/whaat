import React, {Component} from 'react'
import {Textfield} from "react-mdl";

export default class EditableCell extends Component {
    constructor(props) {
        super(props);
        this.oldId = this.props.contact.id;
        this.state = {editMode: false};
        this.edit = this.edit.bind(this);
    }

    edit(e) {
        if (this.state.editMode) {
            e.preventDefault();
            this.props.contact[this.props.property] = this.props.int ? Number.parseInt(this.textInput.inputRef.value, 10) : this.textInput.inputRef.value;
            this.props.onCellEdit(this.oldId, this.props.contact);
        }
        this.setState({editMode: !this.state.editMode});
    }

    componentDidUpdate() {
        if (this.state.editMode) {
            this.textInput.inputRef.focus();
        }
    }

    editMode() {
        return <form onBlur={this.edit} onSubmit={this.edit}>
            <Textfield ref={(input) => {
                this.textInput = input;
            }}
                       defaultValue={this.props.contact[this.props.property]}
                       label="Press ENTER to change"
                       required
                       floatingLabel
            />
        </form>;
    }

    regularMode() {
        return <div onClick={this.edit}>{this.props.contact[this.props.property]}</div>
    }

    render() {
        return <td>
            {this.state.editMode ? this.editMode() : this.regularMode()}
        </td>
    }
}
