import React from 'react';
import moment from 'moment'
import _ from 'lodash'

export default class Time extends React.Component {

    render()  {
        let curtime = moment();

        let showBreakTime = _.get(this.props, "state.liveView.time.breakTime", false);
        let __ = _.get(this.props, "state.__", () => "");
        let message = __(curtime, {short: true });
        if(showBreakTime !== false) {
            let diff = moment(showBreakTime, "HH:mm").diff(curtime);
            let duration = moment.duration(diff);
            if(diff > 0) {
                message = `${message} - ${__(duration, {duration: true})}`;
            } else {
                message = `${message} - ${__('timeFinished')}`;
            }
        }

        if(_.get(this.props, 'asDimmer', false)) {
            let cn = "ui active dimmer";

            return (
                <div className={cn} >
                    <div style={{fontSize: 40}} className="ui text loader">
                        {message}
                    </div>
                </div>
            )
        } else {
            let cstyle = {
                fontSize: 40,
                width: this.props.width,
                height: this.props.height,
                paddingTop: this.props.height/3,
                background: "black",
                color: "white"
            };
            return (
                <div style={cstyle} className="ui equal width center aligned padded grid">
                    <div className="row">
                        <div className="column">
                            {message}
                        </div>
                    </div>
                </div>);

        }
    }
}
