import React from 'react';
import _ from 'lodash'


let Icon = React.createClass({
    render: function() {
        return (
            <a className="ui basic icon item" onClick={this.props.onClick} >
                <i className={`${this.props.type} icon`} />
            </a>);
    }
});




module.exports = { Icon };
