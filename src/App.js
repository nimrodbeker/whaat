import React, {Component} from 'react'
import {Tab, Header, HeaderTabs, Layout, Content} from "react-mdl";
import ContactsPage from "./pages/Contacts";
import {StartersPage} from "./pages/Starters";

const tabs = [<ContactsPage/>, <StartersPage/>];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {activeTab: 0};
    }

    render() {
        return <div style={{width: '800px', height: '600px', paddingLeft: '3px'}}>
            <Layout fixedHeader fixedTabs>
                <div>
                    <Header style={{marginBottom: '5px', display: 'block'}}>
                        <HeaderTabs activeTab={this.state.activeTab}
                                    onChange={(tabId) => this.setState({activeTab: tabId})} ripple>
                            <Tab to="/contacts">Contacts</Tab>
                            <Tab to="/starters">Starters</Tab>
                        </HeaderTabs>
                    </Header>
                    <Content className="full-width">
                        {tabs[this.state.activeTab]}
                    </Content>
                </div>
            </Layout>
        </div>;
    }
}

export default App