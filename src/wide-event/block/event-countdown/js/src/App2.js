const THREE = require('three');
const ParticleEngine = require('./ParticleEngine');
const UVMapAnimator = require('./UVMapAnimator');

let App = function () {
  const Utils = require('./Utils');
  const ShaderPass = require('./ShaderPass');
  const SimShader = require('./shaders/SimShader');
  const ParticleShader = require('./shaders/ParticleShader');

  var _engine;
  var _currPreset = Utils.getParameterByName("shape") || "custom02"; // initial preset
  var _currSimMode;
  var _uvAnim;

  // DEFINES

  var _params = {
    size: 280,
    simMat: createShaderMaterial(SimShader),
    drawMat: createShaderMaterial(ParticleShader),
    update: undefined,  // defined later in the file
  };

  var _params02 = {
    size: 280,
    simMat: createShaderMaterial(SimShader),
    drawMat: createShaderMaterial(ParticleShader),
    update: undefined,  // defined later in the file
  };

  var _simModes = [
    "SIM_CUSTOM01",
    "SIM_CUSTOM02",
    "SIM_CYLINDER",
    "SIM_NOISE",
    "SIM_TEXTURE"
  ];

  // must have same name as preset, for async loading to work properly
  var _meshes = {

  };

  var _presets = {
    "none": {"user gravity": 3, "shape gravity": 1, _shape: ""},
    "custom01": {"user gravity": 3, "shape gravity": 1, _shape: "SIM_CUSTOM01"},
    "custom02": {"user gravity": 3, "shape gravity": 1, _shape: "SIM_CUSTOM02"},
    "cylinder": {"user gravity": 3, "shape gravity": 1, _shape: "SIM_CYLINDER"},
  };


  // FUNCTIONS

  var _setSimMode = function (name) {
    if (name === _currSimMode)
      return;
    _currSimMode = name;  // cache mode, prevent shader recompile

    _simModes.forEach(function (s) {
      delete _params.simMat.defines[s];
      delete _params02.simMat.defines[s];
    });
    if (name)
      _params.simMat.defines[name] = "";
    _params02.simMat.defines['SIM_CUSTOM01'] = "";

    _params.simMat.needsUpdate = true;
    _params02.simMat.needsUpdate = true;
  };

  var _setPreset = function (name) {
    var preset = _presets[name] || _presets.none;
    _currPreset = name;

    // set shape
    if (preset._shape.length >= 0) {
      _setSimMode(preset._shape);
      _uvAnim.setMesh();  // set no mesh
    }
    else {
      _setSimMode("SIM_TEXTURE");
      _uvAnim.setMesh(preset._shape.mesh);
    }

    //_guiFields["user gravity"]  = _params.simMat.uniforms.uInputAccel.value = _params02.simMat.uniforms.uInputAccel.value = preset["user gravity"];
    //_guiFields["shape gravity"] = _params.simMat.uniforms.uShapeAccel.value = _params02.simMat.uniforms.uShapeAccel.value = preset["shape gravity"];
  };

  var _takeScreenshot = function () {
    _engine.renderer.getImageData(function (dataUrl) {
      var url = Utils.dataUrlToBlobUrl(dataUrl);
      Utils.openUrlInNewWindow(url, window.innerWidth, window.innerHeight);
    });
  };


  // UPDATE

  var _update = _params.update = function (dt, t) {
    _params.drawMat.uniforms.uTime.value = t;  // for ParticleShader.vs
    _params02.drawMat.uniforms.uTime.value = t;  // for ParticleShader.vs
    _uvAnim.update(dt, t);
  };


  // INIT

  var _init = function () {
    _engine = new ParticleEngine(_params, _params02);

    _uvAnim = new UVMapAnimator(_engine.renderer.getRenderer(), _params.size);
    _params.simMat.uniforms.tTarget = {type: "t", value: _uvAnim.target};
    _params02.simMat.uniforms.tTarget = {type: "t", value: _uvAnim.target};
  };

  var _loadMeshes = function () {
    var loader = new THREE.JSONLoader(true);
    Object.keys(_meshes).forEach(function (k) {
      loader.load(_meshes[k].url, function (geometry) {
        var mesh = new THREE.MorphAnimMesh(geometry);  // no material
        mesh.scale.set(_meshes[k].scale, _meshes[k].scale, _meshes[k].scale);
        mesh.position.y = _meshes[k].yOffset;
        mesh.duration = 1000 / _meshes[k].speed;
        mesh.name = k; // for debugging
        _meshes[k].mesh = mesh;

        // refresh mesh if same name as preset
        if (_currPreset === k)
          _uvAnim.setMesh(mesh);
      });
    });
  };


  // RUN PROGRAM

  _loadMeshes();
  _init();
  _setPreset(_currPreset);
  _engine.start();

};

module.exports = App;