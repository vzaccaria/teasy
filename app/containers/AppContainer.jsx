import React from 'react';
import SystemWindowList from '../components/systemWindowList';
import PreviewContainer from './PreviewContainer'
import AppStore from '../stores/AppStore';
import moment from 'moment'
import { asPopup } from '../components/popup'
import { LanguageChooser, getLanguageFlag } from '../components/languageChooser'
import { Icon } from '../components/icon'

import { WindowListStyle, PreviewStyle } from '../styles/Layout.js'

import _debug from 'debug';
const debug = _debug('app:containers/AppContainer');

debug('loaded!!');

const validState = (state) => {
    return (state !== null)
}


let {IconPopup, IconPopupContent} = asPopup("spinner", <LanguageChooser />);


export default class AppContainer extends React.Component {

    constructor() {
        super();
        AppStore.getState();
    }

    onStoreChange(state) {
        this.setState(state)
    }

    componentDidMount() {
        AppStore.listen(this.onStoreChange.bind(this))
    }


    componentWillUnmount() {
        AppStore.unlisten(this.onStoreChange.bind(this))
    }

    render() {
        debug("Rendering");
        if(validState(this.state)) {
            let { __ } = this.state;
            return (
                <div>
                    <div className="ui inverted menu fixed">
                        <div className="item"> Teasy 2.0 </div>
                        <div className="right menu">
                            <div className="item">
                                {__(moment())}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={WindowListStyle(this.state.window)}>
                            <SystemWindowList />
                        </div>
                        <div style={PreviewStyle}>
                            <PreviewContainer />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div> </div>
            );

        }
    }

}
