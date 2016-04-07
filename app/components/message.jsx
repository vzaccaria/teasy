import React from 'react';

module.exports = React.createClass({
    render: function() {

        let cstyle = {
            width: this.props.width,
            height: this.props.height,
            paddingTop: this.props.height/3
        };

        return (
            <div style={cstyle} className="ui equal width center aligned padded grid">
                <div className="row">
                    <div className="column">
                        <div>{this.props.title}</div>
                        <p> {this.props.message}</p>
                    </div>
                </div>
            </div>);
    }
})
