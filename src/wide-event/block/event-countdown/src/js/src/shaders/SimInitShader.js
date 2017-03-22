const Utils = require('../Utils');
const THREE = require('three');

var SimInitShader = {

    uniforms: {
        "tDiffuse": { type: "t", value: null },
        "uColor": { type: "f", value: new THREE.Vector4(1.0, 1.0, 1.0, 1.0) }
    },

    vertexShader: require("../../../shaders/Basic.vs.glsl"),

    fragmentShader: require("../../../shaders/SimInitShader.fs.glsl")

};

module.exports = SimInitShader;