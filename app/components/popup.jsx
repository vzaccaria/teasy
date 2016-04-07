import React from 'react';
import _ from 'lodash'

import '../../semantic/src/definitions/modules/popup'
import '../../semantic/src/definitions/modules/transition'

import $ from 'jquery'


function asPopup(iconName, popup) {

    let IconPopup = React.createClass({
        componentDidMount: function() {
            let element = $('.popact');
            element.popup({
                inline   : true,
                hoverable: true,
                position : 'bottom left',
                delay: {
                    show: 100
                }}
            )
        },
        render: function() {
            if(_.isUndefined(this.props.className)) {
                return (<a className="ui basic icon item popact">
                    <i className={`${iconName} icon`} />
                </a>);
            } else {
                return (<a className="ui basic icon item popact">
                    <i className={`${this.props.className}`} />
                </a>);

                }
        }
    });
    let IconPopupContent = React.createClass({
        render: function() {
            return (
                <div className="ui popup">
                    {popup}
                </div>);
        }
    });
    return { IconPopup, IconPopupContent }
}


module.exports = { asPopup }
