import React, {Component} from 'react'
import {addContact, addStarter} from "../redux/actions";
import {connect} from "react-redux";
import {Contact} from "../ContactUtils";
import {DialogActions, Button, Dialog, DialogContent, DialogTitle, Textfield} from "react-mdl";
import MultiSelect from "../components/MultiSelect";


class AddContact extends Component {
    resetState() {
        this.setState(() => (
            {
                id: '972',
                name: '',
                starters: [],
                interval: 7
            }));
        if(this.multiselect !== null) {
            this.multiselect.setState({values:[]});
        }
    }

    componentWillMount() {
        this.resetState();
    }

    constructor(props) {
        super(props);
        this.state = {};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.multiselect = null
    }

    handleOpenDialog() {
        this.setState({
            openDialog: true
        });
    }

    handleCloseDialog() {
        this.setState({
            openDialog: false
        });
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        this.props.addContact(new Contact(this.state.id, this.state.name, this.state.interval, this.state.starters));
        this.resetState();
        this.handleCloseDialog();
        e.preventDefault();
    }

    render() {
        return (<div>
                <Button colored onClick={this.handleOpenDialog} raised ripple>Add Contact</Button>
                <Dialog open={this.state.openDialog}>
                    <DialogTitle>ADD CONTACT</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <Textfield
                                name="id"
                                onChange={this.handleInputChange}
                                value={this.state.id}
                                label="Phone \ Group Name.."
                                floatingLabel
                                required
                            /><br/>
                            <Textfield
                                name="name"
                                onChange={this.handleInputChange}
                                value={this.state.name}
                                label="Name..."
                                floatingLabel
                                required
                            /><br/>
                            <Textfield
                                name="interval"
                                onChange={this.handleInputChange}
                                value={this.state.interval}
                                label="Interval (Days).."
                                pattern="-?[0-9]*(\.[0-9]+)?"
                                error="Input is not a number!"
                                floatingLabel
                                required
                            /><br/>
                            <MultiSelect
                                inputRef={(item)=>{this.multiselect = item}}
                                placeholder="Starters"
                                onValuesChange={(newValues) => {
                                    this.setState({starters: newValues});
                                    this.props.onStartersChange(newValues)
                                }}
                                options={this.props.starters}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={this.handleSubmit}>Add</Button>
                        <Button type='button' onClick={this.handleCloseDialog}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {starters: Object.keys(state.starters)}
};
const mapDispatchToProps = dispatch => {
    return {
        onStartersChange: newValues => {
            newValues.map((item) => {return dispatch(addStarter(item))})
        },
        addContact: contact => {
            dispatch(addContact(contact));
        }
    }
};
AddContact = connect(mapStateToProps, mapDispatchToProps)(AddContact);
export {AddContact}