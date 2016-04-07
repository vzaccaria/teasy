import React from 'react';
import _ from 'lodash'


function isInverted(props) {
    return !_.isUndefined(props.inverted) && _.isEqual(props.inverted, "1");
}

export default class Loader extends React.Component {

    render()  {
        let cn = "ui active dimmer"
        if(isInverted(this.props)) {
            cn = "ui active dimmer inverted";
        }
        return (
            <div style={this.props.style} className={cn} >
                <div className="ui text loader">
                    {this.props.message}
                </div>
            </div>
        )
    }
}
