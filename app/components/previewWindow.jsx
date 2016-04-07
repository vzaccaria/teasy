import React from 'react';
import _ from 'lodash'
import color from 'color'

import AppStore from '../stores/AppStore'
import AppActions from '../actions/AppActions'
import { getPreviewSize } from '../styles/Layout'
import { asPopup } from '../components/popup'
import TimeChooser from '../components/TimeChooser'
import Time from '../components/time'
import { WindowCapture } from '../components/windowCaptureGLReact.jsx';
import { LanguageChooser, getLanguageFlag } from '../components/languageChooser'
import ColorChooser from '../components/ColorChooser'

let {IconPopup: IconPopupLang  , IconPopupContent: IconPopupContentLang} = asPopup("spinner"     , <LanguageChooser />);
let {IconPopup: IconPopupTime  , IconPopupContent: IconPopupContentTime} = asPopup("spinner"     , <TimeChooser />);
let {IconPopup: IconPopupColor , IconPopupContent: IconPopupContentColor} = asPopup("eyedropper" , <ColorChooser />);

import { Icon } from '../components/icon';

const showingTime = (state) => {
    return (!_.isNull(state) && !_.isUndefined(state) && state.liveView.time.showTime)
}

let barSize = 40

const previewCanvasSize = (state) => {
    let s = getPreviewSize(state.window.size);
    let width = s.width;
    let height = s.height - barSize;
    return { width, height }
}


export default class PreviewWindow extends React.Component {

    render()  {
        var state = this.props.state
        let { width, height } = previewCanvasSize(state);

        let clw = state.currentLiveWindow;

        let closeHandler = () => {
            AppActions.updateCurrentLiveWindow(0);
        }

        let toggleTimeHandler = () => {
            AppActions.updateLiveViewTime({showTime: !state.liveView.time.showTime})
        }

        let toggleShowTopBar = () => {
            AppActions.toggleShowTopBar();
        }

        let overlayMenu = (
            <div style={{ background: color("#000000").rgbaString(), width: width, height: barSize }} >
                <div className="ui small floated right secondary menu inverted">

                    <IconPopupColor />
                    <IconPopupContentColor />

                    <IconPopupLang className={`${getLanguageFlag(state.currentLanguage)} flag`} />
                    <IconPopupContentLang />

                    <Icon type="maximize" onClick={toggleShowTopBar} />

                    <IconPopupTime />
                    <IconPopupContentTime />

                    <Icon type="time" onClick={toggleTimeHandler} />
                    <Icon type="remove" onClick={closeHandler} />
                </div>
            </div>);


        let windowCapture = <WindowCapture
                                width={width}
                                height={height}
                                wid={clw}
                                type="preview"
                                iscurrent={true}
                                {...state.pointerSettings} />;

        let timeMessage = <Time width={width} height={height} state={state}/>;

        let whatToShow = (showingTime(state) ? timeMessage  : windowCapture );

        return (
            <div style={{background: 'black'}}>
                {whatToShow}
                {overlayMenu}
            </div>
        );

    }

}
