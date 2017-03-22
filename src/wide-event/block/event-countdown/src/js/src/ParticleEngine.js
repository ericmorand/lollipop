const SimInitShader = require('./shaders/SimInitShader');
const UpdateLoop = require('./UpdateLoop');
const RenderContext = require('./RenderContext');
const ParticleSimulation = require('./ParticleSimulation');
const THREE = require('three');
const OrbitControls = require('../lib/OrbitControls');
const Utils = require('./Utils');

var ParticleEngine = function (params, params02) {

  var _this = this;

  var _canvas, _stats;
  var _updateLoop;
  var _renderer, _camera, _scene;
  var _sim, _simMat, _initMat, _drawMat;
  var _sim02, _simMat02, _initMat02, _drawMat02;
  var _controls, _raycaster;
  var _customUpdate;
  var _pauseSim = false;
  var _size, _size02, _customUpdate02;


  // PARAMS

  params = params || {};
  _size = params.size || 512;
  _simMat = params.simMat || createShaderMaterial(BasicSimShader);
  _initMat = params.initMat || createShaderMaterial(SimInitShader);
  _drawMat = params.drawMat || createShaderMaterial(BasicParticleShader);
  _customUpdate = params.update;

  params02 = params02 || {};
  _size02 = params02.size || 512;
  _simMat02 = params02.simMat || createShaderMaterial(BasicSimShader);
  _initMat02 = params02.initMat || createShaderMaterial(SimInitShader);
  _drawMat02 = params02.drawMat || createShaderMaterial(BasicParticleShader);
  _customUpdate02 = params02.update;

  // EVENTS

  var _onWindowResize = function () {
    _renderer.setSize(window.innerWidth, window.innerHeight);
  };

  var _onFrameUpdate = function (dt, t) {
    _inputUpdate();

    if (_customUpdate) _customUpdate(dt, t);

    _renderer.update(dt);
  };

  var _onFixedUpdate = function (dt, t) {
    if (!_pauseSim) {
      _sim.update(dt, t);
      _sim02.update(dt, t)
    }
  };


  // PRIVATE FUNCTIONS

  var _init = function () {
    window.addEventListener("resize", _onWindowResize, false);

    //_stats = new Stats();
    //document.body.appendChild(_stats.domElement);

    _updateLoop = new UpdateLoop();
    _updateLoop.frameCallback = _onFrameUpdate;
    _updateLoop.fixedCallback = _onFixedUpdate;

    _canvas = document.querySelector(".header-particles .webgl-canvas");

    _renderer = new RenderContext(_canvas);
    _renderer.init();
    _camera = _renderer.getCamera();
    _scene = _renderer.getScene();

    _onWindowResize();
  };

  var _sceneInit = function () {
    _sim = new ParticleSimulation(_renderer.getRenderer(), _size, {
      simMat: _simMat,
      initMat: _initMat,
      drawMat: _drawMat
    });

    _sim02 = new ParticleSimulation(_renderer.getRenderer(), _size02, {
      simMat: _simMat02,
      initMat: _initMat02,
      drawMat: _drawMat02
    });

    //_sim.position = new THREE.Vector3(100, 100, 100);
    //_sim.rotation.x += _sim.rotation.x * Math.PI / 180

    var newSim = _sim.getParticleObject();
    //newSim.rotation.z = 90;

    _scene.add(newSim);

    _scene.add(_sim02.getParticleObject());

    _camera.position.set(0, 0, 8);
    //_camera.position.set(0,-8,-2);
    //_camera.up = new THREE.Vector3(0,0,0);
    _controls = new THREE.OrbitControls(_camera, _canvas);
    _controls.rotateUp(Math.PI / 6);
    _controls.autoRotate = true;
    _controls.autoRotateSpeed = 1.0;
    _controls.noPan = true;
    _controls.enabled = false;  // disable user input

    _raycaster = new THREE.Raycaster();

    var tmat = (new THREE.Matrix4()).compose(
      new THREE.Vector3(0.0, -3.0, -_camera.position.z),
      new THREE.Quaternion(),
      new THREE.Vector3(0.015, 0.015, 0.015));
    _simMat.defines.MULTIPLE_INPUT = "";    // TODO_NOP: at least even hardcode numbers for this in shader
    _simMat.needsUpdate = true;

    _simMat02.defines.MULTIPLE_INPUT = "";    // TODO_NOP: at least even hardcode numbers for this in shader
    _simMat02.needsUpdate = true;
  };

  var _inputUpdate = function () {
    // reset input accels
    _simMat.uniforms.uInputPosAccel.value.set(0, 0, 0, 0);
    _simMat02.uniforms.uInputPosAccel.value.set(0, 0, 0, 0);
  };


  // PUBLIC FUNCTIONS

  this.start = function () {
    _updateLoop.start();
  };

  this.stop = function () {
    _updateLoop.stop();
  };

  this.pauseSimulation = function (value) {
    _pauseSim = value;
  };

  this.enableCameraAutoRotate = function (value) {
    _controls.autoRotate = value;
  };

  this.enableCameraControl = function (value) {
    _controls.enabled = value;
  };


  // INIT

  _init();

  _sceneInit();

  // expose variables
  this.renderer = _renderer;
  this.scene = _scene;
  this.camera = _camera;
};

module.exports = ParticleEngine;