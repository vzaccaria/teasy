import color from 'color'

const listWidth = 350;
const previewWidth = listWidth;
const previewHeight = 300;
const topBarSize = 40;

const getAppWindowStyle = () => {
    return {
        width: listWidth,
        height: 800
    }
}


const dividerGray = color('#FFFFFF').darken(0.1).hexString()

const WindowListStyle = (window) => {
    return {
        boxSizing: 'border-box',
        width: listWidth,
        position: 'fixed',
        top: topBarSize + previewHeight,
        height: window.size.height - topBarSize - previewHeight,
        overflowY:  'auto',
        borderRight: `1px solid ${dividerGray}`,
        cursor: 'pointer',
        background: color('#FFFFFF').darken(0.05).hslString()
    }
}



const getPreviewSize = (window) => {
    return {
        width: previewWidth,
        height: previewHeight
    }
}

const PreviewStyle = {
    bxSizing: 'border-box',
    position: 'fixed',
    width: previewWidth,
    top: topBarSize,
    height: previewHeight
}

const MenuStyle = {

}

module.exports = {
    WindowListStyle, PreviewStyle, getPreviewSize, MenuStyle, dividerGray, getAppWindowStyle
}
