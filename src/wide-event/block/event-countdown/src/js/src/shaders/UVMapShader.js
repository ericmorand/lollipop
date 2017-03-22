const Utils = require('../Utils');

var UVMapShader = {

    uniforms: {
    },

    vertexShader: require("../../../shaders/UVMapShader.vs.glsl"),

    fragmentShader: require("../../../shaders/UVMapShader.fs.glsl")

};

module.exports = UVMapShader;