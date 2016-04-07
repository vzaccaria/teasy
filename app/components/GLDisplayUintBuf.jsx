const GL = require("gl-react");
const React = GL.React;

const shaders = GL.Shaders.create({
    justDisplay: {
        frag: `
        precision highp float;
        varying vec2 uv;
        uniform sampler2D image;
        uniform sampler2D tex;
        void main () {

            vec4 c = texture2D(image, uv);
            vec4 o = texture2D(tex, uv);
            c.r = mix(c.r , o.r , o.a);
            c.g = mix(c.g , o.g , o.a);
            c.b = mix(c.b , o.b , o.a);
            gl_FragColor = c;
        }
        `
    }
});


let GLDisplayUintBuf = GL.createComponent(
    ({ width, height, image, children: tex, className }) => {
        width = parseInt(width);
        height = parseInt(height);
        return (
            <GL.Node width={(width)}
                     height={(height)}
                     shader={shaders.justDisplay}
                     uniforms={{ image, tex }} >
            </GL.Node>
        );
    },
    { displayName: "GLDisplayUintBuf"}
);

module.exports = { GLDisplayUintBuf }
