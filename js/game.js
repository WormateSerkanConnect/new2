var GoogleAuth;
var zE;
window.sectorSystem = {
  settings: {
    lineWidth: 0.15,
    lineColor: 16711680,
    lineAlpha: 0.3,
    backgroundColor: 0,
    backgroundAlpha: 0.6,
    sectorTextStyle: {
      fontFamily: "Arial",
      fontSize: 14,
      fill: 16777215
    },
    quarterTextStyle: {
      fontFamily: "Arial",
      fontSize: 20,
      fill: 16777215
    },
    showLines: true
  },
  state: {
    container: null,
    graphics: null,
    isActive: false,
    currentMode: null,
    texts: [],
    initialized: false,
    renderContainer: null,
    restored: false
  },
  findRenderContainer: function () {
    if (this.state.renderContainer) {
      return this.state.renderContainer;
    }
    if (window.laserGraphics?.parent) {
      this.state.renderContainer = window.laserGraphics.parent;
      return this.state.renderContainer;
    }
    if (window.ooo?.Mh?.Lh?.Wf) {
      this.state.renderContainer = window.ooo.Mh.Lh.Wf;
      return this.state.renderContainer;
    }
    const _0x41b887 = (_0x1e5076, _0x37af10 = new Set(), _0x888e87 = 0) => {
      if (!_0x1e5076 || typeof _0x1e5076 !== "object" || _0x888e87 > 3 || _0x37af10.has(_0x1e5076)) {
        return null;
      }
      _0x37af10.add(_0x1e5076);
      if (_0x1e5076.Wf instanceof PIXI.Container) {
        this.state.renderContainer = _0x1e5076.Wf;
        return _0x1e5076.Wf;
      }
      for (let _0x42c9a0 in _0x1e5076) {
        if (_0x42c9a0 !== "parent" && _0x42c9a0 !== "children" && _0x1e5076[_0x42c9a0] && typeof _0x1e5076[_0x42c9a0] === "object") {
          const _0x521d03 = _0x41b887(_0x1e5076[_0x42c9a0], _0x37af10, _0x888e87 + 1);
          if (_0x521d03) {
            return _0x521d03;
          }
        }
      }
      return null;
    };
    return _0x41b887(window.ooo);
  },
  cachedRadius: 0,
  lastRadiusTime: 0,
  getRadius: function () {
    const _0x4fa148 = Date.now();
    if (_0x4fa148 - this.lastRadiusTime > 1000) {
      this.cachedRadius = window.ooo?.Mh?.Qh?.gh || window.ooo?.Mh?.Lh?.Qh?.gh || 500;
      this.lastRadiusTime = _0x4fa148;
    }
    return this.cachedRadius;
  },
  clearTexts: function () {
    this.state.texts.forEach(_0x3ab744 => {
      if (_0x3ab744 && _0x3ab744.parent) {
        _0x3ab744.parent.removeChild(_0x3ab744);
      }
    });
    this.state.texts = [];
  },
  initDrawing: function (_0x38b8) {
    this.clearTexts();
    this.state.graphics.clear();
    this.state.graphics.lineStyle(this.settings.lineWidth, this.settings.lineColor, this.settings.lineAlpha);
    this.state.graphics.beginFill(this.settings.backgroundColor, this.settings.backgroundAlpha);
    this.state.graphics.drawCircle(0, 0, _0x38b8);
    this.state.graphics.endFill();
    return _0x38b8;
  },
  drawSectors: function () {
    const _0x2d4fb7 = this.initDrawing(this.getRadius());
    const _0x390f2e = _0x2d4fb7 / 3;
    if (this.settings.showLines) {
      for (let _0x293820 = 1; _0x293820 < 3; _0x293820++) {
        this.state.graphics.drawCircle(0, 0, _0x2d4fb7 - _0x293820 * _0x390f2e);
      }
      for (let _0x56cf86 = 0; _0x56cf86 < 4; _0x56cf86++) {
        const _0x96ba4c = _0x56cf86 * Math.PI / 2;
        this.state.graphics.moveTo(0, 0);
        this.state.graphics.lineTo(Math.cos(_0x96ba4c) * _0x2d4fb7, Math.sin(_0x96ba4c) * _0x2d4fb7);
      }
    }
    for (let _0x2edd53 = 0; _0x2edd53 < 4; _0x2edd53++) {
      const _0x287fba = _0x2edd53 * Math.PI / 2;
      for (let _0x200f7b = 0; _0x200f7b < 3; _0x200f7b++) {
        const _0x3f670c = _0x2d4fb7 - (_0x200f7b * _0x390f2e + _0x390f2e / 2);
        const _0x5ed706 = _0x287fba + Math.PI / 4;
        const _0x23d97d = ["S", "D", "F"][_0x200f7b] + (_0x2edd53 + 1);
        const _0x3d71df = new PIXI.Text(_0x23d97d, this.settings.sectorTextStyle);
        _0x3d71df.anchor.set(0.5);
        _0x3d71df.position.set(Math.cos(_0x5ed706) * _0x3f670c, Math.sin(_0x5ed706) * _0x3f670c);
        this.state.container.addChild(_0x3d71df);
        this.state.texts.push(_0x3d71df);
      }
    }
  },
  drawQuarters: function () {
    const _0x1c3f00 = this.initDrawing(this.getRadius());
    if (this.settings.showLines) {
      this.state.graphics.moveTo(-_0x1c3f00, 0);
      this.state.graphics.lineTo(_0x1c3f00, 0);
      this.state.graphics.moveTo(0, -_0x1c3f00);
      this.state.graphics.lineTo(0, _0x1c3f00);
    }
    [{
      n: "UP 1",
      x: 1,
      y: -1
    }, {
      n: "UP 2",
      x: -1,
      y: -1
    }, {
      n: "UP 3",
      x: -1,
      y: 1
    }, {
      n: "UP 4",
      x: 1,
      y: 1
    }].forEach(_0x448bbd => {
      const _0x284e18 = new PIXI.Text(_0x448bbd.n, this.settings.quarterTextStyle);
      _0x284e18.anchor.set(0.5);
      _0x284e18.position.set(_0x448bbd.x * _0x1c3f00 / 3, _0x448bbd.y * _0x1c3f00 / 3);
      this.state.container.addChild(_0x284e18);
      this.state.texts.push(_0x284e18);
    });
  },
  initGraphics: function () {
    if (this.state.initialized) {
      return true;
    }
    const _0x4f5088 = this.findRenderContainer();
    if (!_0x4f5088) {
      return false;
    }
    this.state.container = new PIXI.Container();
    this.state.graphics = new PIXI.Graphics();
    this.state.container.addChild(this.state.graphics);
    _0x4f5088.addChild(this.state.container);
    this.state.container.zIndex = 10;
    this.state.container.visible = false;
    this.state.initialized = true;
    return true;
  },
  toggleMode: function (_0x26d020) {
    if (!this.initGraphics()) {
      return;
    }
    if (this.state.isActive && this.state.currentMode === _0x26d020) {
      this.state.container.visible = false;
      this.state.isActive = false;
      this.state.currentMode = null;
      if (document.getElementById("sector_system_toggle")) {
        document.getElementById("sector_system_toggle").checked = false;
      }
      this.saveSettings();
      return;
    }
    this.state.isActive = true;
    this.state.currentMode = _0x26d020;
    this.state.container.visible = true;
    if (document.getElementById("sector_system_toggle")) {
      document.getElementById("sector_system_toggle").checked = true;
    }
    if (_0x26d020 === "sectors") {
      this.drawSectors();
    } else {
      this.drawQuarters();
    }
    this.saveSettings();
  },
  setupKeyboardEvents: function () {
    const _0x558a90 = {
      83: () => this.toggleMode("sectors"),
      187: () => this.toggleMode("sectors"),
      61: () => this.toggleMode("sectors"),
      88: () => this.toggleMode("quarters")
    };
    document.addEventListener("keydown", _0x46bf72 => {
      const _0x3bfa02 = _0x46bf72.keyCode || _0x46bf72.which;
      if (_0x558a90[_0x3bfa02]) {
        _0x558a90[_0x3bfa02]();
        if (typeof this.initUserInterface === "function") {
          this.initUserInterface();
        }
      }
    });
  },
  saveSettings: function () {
    try {
      localStorage.setItem("sectorSystemSettings", JSON.stringify(this.settings));
      localStorage.setItem("sectorSystemActive", this.state.isActive ? "1" : "0");
      if (this.state.currentMode) {
        localStorage.setItem("sectorSystemMode", this.state.currentMode);
      }
      console.log("Saved sector system state:", {
        active: this.state.isActive,
        mode: this.state.currentMode
      });
    } catch (_0x15c704) {
      console.error("Error saving sector system settings:", _0x15c704);
    }
  },
  loadSettings: function () {
    try {
      const _0x2c11ac = JSON.parse(localStorage.getItem("sectorSystemSettings"));
      if (_0x2c11ac) {
        this.settings = {
          ...this.settings,
          ..._0x2c11ac
        };
      }
      const _0x5f3483 = localStorage.getItem("sectorSystemActive") === "1";
      let _0x314405 = localStorage.getItem("sectorSystemMode");
      if (!_0x314405) {
        _0x314405 = "sectors";
      }
      this.savedState = {
        isActive: _0x5f3483,
        currentMode: _0x314405
      };
    } catch (_0xb76a49) {
      console.error("Error loading sector system settings:", _0xb76a49);
    }
  },
  applySettings: function () {
    if (this.state.isActive && this.state.currentMode) {
      if (this.state.currentMode === "sectors") {
        this.drawSectors();
      } else {
        this.drawQuarters();
      }
    }
  },
  init: function () {
    if (typeof PIXI === "undefined") {
      setTimeout(() => this.init(), 1000);
      return;
    }
    this.loadSettings();
    const _0x3c0ba9 = this.initGraphics();
    this.setupKeyboardEvents();
    if (!_0x3c0ba9) {
      setTimeout(() => this.init(), 1000);
      return;
    }
    setTimeout(() => {
      if (this.savedState && this.savedState.isActive) {
        this.state.isActive = true;
        this.state.currentMode = this.savedState.currentMode;
        this.state.container.visible = true;
        if (this.state.currentMode === "sectors") {
          this.drawSectors();
        } else {
          this.drawQuarters();
        }
        if (document.getElementById("sector_system_toggle")) {
          document.getElementById("sector_system_toggle").checked = true;
        }
        this.state.restored = true;
        if ($("#sector_system_toggle").length > 0) {
          this.initUserInterface();
        }
      }
    }, 1000);
  },
  initUserInterface: function () {
    function _0x581874(_0x5eb347) {
      return "#" + _0x5eb347.toString(16).padStart(6, "0");
    }
    function _0x8b8b14(_0x22fee2) {
      return parseInt(_0x22fee2.replace("#", ""), 16);
    }
    if (!this.state.restored && this.savedState && this.savedState.isActive) {
      console.log("Restoring state from UI initialization");
      this.toggleMode(this.savedState.currentMode || "sectors");
      this.state.restored = true;
    }
    const _0x1ae7f5 = () => {
      $("#sector_system_toggle").prop("checked", this.state.isActive);
      $("#sector_display_mode").val(this.state.currentMode || "sectors");
      $("#sector_bg_color").val(_0x581874(this.settings.backgroundColor));
      $("#sector_line_color").val(_0x581874(this.settings.lineColor));
      $("#sector_bg_opacity").val(this.settings.backgroundAlpha * 100);
      $("#sector_bg_opacity_value").text(Math.round(this.settings.backgroundAlpha * 100) + "%");
      $("#sector_line_opacity").val(this.settings.lineAlpha * 100);
      $("#sector_line_opacity_value").text(Math.round(this.settings.lineAlpha * 100) + "%");
      $("#sector_show_lines").prop("checked", this.settings.showLines);
      if (!this.settings.showLines) {
        $("#sector_lines_options").slideUp(200);
      } else {
        $("#sector_lines_options").slideDown(200);
      }
      if (this.state.isActive) {
        $("#sector_settings_panel").slideDown(300);
      } else {
        $("#sector_settings_panel").slideUp(200);
      }
    };
    $("#sector_system_toggle").off("change").on("change", function () {
      const _0x27ffb0 = $(this).prop("checked");
      if (_0x27ffb0) {
        const _0x302a44 = $("#sector_display_mode").val() || "sectors";
        window.sectorSystem.toggleMode(_0x302a44);
      } else if (window.sectorSystem.state.isActive) {
        window.sectorSystem.toggleMode(window.sectorSystem.state.currentMode);
      }
      _0x1ae7f5();
    });
    $("#sector_display_mode").off("change").on("change", function () {
      const _0x354112 = $(this).val();
      if (window.sectorSystem.state.isActive) {
        window.sectorSystem.toggleMode(window.sectorSystem.state.currentMode);
        window.sectorSystem.toggleMode(_0x354112);
        _0x1ae7f5();
      }
    });
    $("#sector_bg_color").off("change").on("change", function () {
      window.sectorSystem.settings.backgroundColor = _0x8b8b14($(this).val());
      window.sectorSystem.applySettings();
      window.sectorSystem.saveSettings();
    });
    $("#sector_line_color").off("change").on("change", function () {
      window.sectorSystem.settings.lineColor = _0x8b8b14($(this).val());
      window.sectorSystem.applySettings();
      window.sectorSystem.saveSettings();
    });
    $("#sector_bg_opacity").off("input").on("input", function () {
      const _0x4fe227 = parseInt($(this).val()) / 100;
      window.sectorSystem.settings.backgroundAlpha = _0x4fe227;
      $("#sector_bg_opacity_value").text(Math.round(_0x4fe227 * 100) + "%");
      window.sectorSystem.applySettings();
      window.sectorSystem.saveSettings();
    });
    $("#sector_line_opacity").off("input").on("input", function () {
      const _0x11f4a5 = parseInt($(this).val()) / 100;
      window.sectorSystem.settings.lineAlpha = _0x11f4a5;
      $("#sector_line_opacity_value").text(Math.round(_0x11f4a5 * 100) + "%");
      window.sectorSystem.applySettings();
      window.sectorSystem.saveSettings();
    });
    $("#sector_show_lines").off("change").on("change", function () {
      window.sectorSystem.settings.showLines = $(this).prop("checked");
      if (!window.sectorSystem.settings.showLines) {
        $("#sector_lines_options").slideUp(200);
      } else {
        $("#sector_lines_options").slideDown(200);
      }
      window.sectorSystem.applySettings();
      window.sectorSystem.saveSettings();
    });
    _0x1ae7f5();
  }
};
var StoreSkinID;
$(document).ready(function () {
  if ($(".store-view-cont").length) {
    $(".store-view-cont").append("<div id=\"idReplaceSkin\"></div>");
    StoreSkinID = $("#idReplaceSkin");
  }
});
var myGameSettings = {
  unlimitedRespawn: false,
  respawnDelay: 50
};
window.laserOptions = {
  enabled: false,
  color: 16766720,
  opacity: 0.5,
  thickness: 0.1
};
window.laserGraphics = null;
const ctx = {
  fontStyle: {
    blanco: new PIXI.TextStyle({
      align: "center",
      fill: "#FF0000",
      fontSize: 14,
      fontWeight: "bold",
      lineJoin: "round",
      stroke: "#FFFFFF",
      strokeThickness: 1.5,
      whiteSpace: "normal",
      wordWrap: true
    })
  }
};
ctx.pointsContainer = new PIXI.Container();
let lastKnownCoords = {
  x: null,
  y: null
};
let blinkTimerId = null;
let removeMarkTimerId = null;
const createCircle = function () {
  if (!window.coords || typeof window.coords.playerX === "undefined" || typeof window.coords.playerY === "undefined") {
    return;
  }
  let _0x15c040 = "m_2";
  if (lastKnownCoords.x !== null) {
    const _0x475393 = Math.sqrt(Math.pow(window.coords.playerX - lastKnownCoords.x, 2) + Math.pow(window.coords.playerY - lastKnownCoords.y, 2));
    if (_0x475393 > 100) {
      if (ctx[_0x15c040]) {
        if (ctx.pointsContainer && ctx.pointsContainer.children.includes(ctx[_0x15c040])) {
          ctx.pointsContainer.removeChild(ctx[_0x15c040]);
        }
        ctx[_0x15c040] = null;
      }
      if (blinkTimerId) {
        clearInterval(blinkTimerId);
        blinkTimerId = null;
      }
      if (removeMarkTimerId) {
        clearTimeout(removeMarkTimerId);
        removeMarkTimerId = null;
      }
    }
  }
  lastKnownCoords.x = window.coords.playerX;
  lastKnownCoords.y = window.coords.playerY;
  if (!ctx[_0x15c040]) {
    ctx[_0x15c040] = new PIXI.Text("X", ctx.fontStyle.blanco);
    ctx[_0x15c040].zIndex = 2;
    ctx[_0x15c040].alpha = 0.9;
    ctx[_0x15c040].anchor.set(0.5, 0.5);
    if (ctx.pointsContainer) {
      ctx.pointsContainer.sortableChildren = true;
      ctx.pointsContainer.zIndex = 2;
    }
    if (!blinkTimerId) {
      let _0x3abe3b = true;
      blinkTimerId = setInterval(() => {
        if (ctx[_0x15c040]) {
          _0x3abe3b = !_0x3abe3b;
          ctx[_0x15c040].visible = _0x3abe3b;
        } else {
          clearInterval(blinkTimerId);
          blinkTimerId = null;
        }
      }, 500);
    }
    if (!removeMarkTimerId) {
      removeMarkTimerId = setTimeout(() => {
        if (ctx[_0x15c040]) {
          if (ctx.pointsContainer && ctx.pointsContainer.children.includes(ctx[_0x15c040])) {
            ctx.pointsContainer.removeChild(ctx[_0x15c040]);
          }
          ctx[_0x15c040] = null;
        }
        if (blinkTimerId) {
          clearInterval(blinkTimerId);
          blinkTimerId = null;
        }
        removeMarkTimerId = null;
      }, 20000);
    }
  }
  if (ctx[_0x15c040]) {
    ctx[_0x15c040].x = window.coords.playerX;
    ctx[_0x15c040].y = window.coords.playerY;
    if (ctx.pointsContainer && !ctx.pointsContainer.children.includes(ctx[_0x15c040])) {
      ctx.pointsContainer.addChild(ctx[_0x15c040]);
    }
  }
  if (window.ooo && ooo.Xg && ooo.Xg.Kf && ooo.Xg.Kf.Wg && ooo.Xg.Kf.Wg.Ah && ooo.Xg.Kf.Wg.Ah.Sh) {
    ooo.Xg.Kf.Wg.Ah.Sh.zIndex = 9999;
    if (ooo.Xg.Kf.Wg.Ah.sortableChildren !== true) {
      ooo.Xg.Kf.Wg.Ah.sortableChildren = true;
    }
    if (ooo.Xg.Kf.Wg.sortableChildren !== true) {
      ooo.Xg.Kf.Wg.sortableChildren = true;
    }
  }
};
function _typeof(_0x3158ca) {
  return (_typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (_0x1ae357) {
    return typeof _0x1ae357;
  } : function (_0x26e9a3) {
    if (_0x26e9a3 && typeof Symbol == "function" && _0x26e9a3.constructor === Symbol && _0x26e9a3 !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof _0x26e9a3;
    }
  })(_0x3158ca);
}
(function () {
  var _0x56b227 = {};
  var _0x2c8e1f = {};
  var _0x4a5ec2 = {};
  var _0x3f64b5 = {};
  _0x4a5ec2.a = function (_0x3bc962) {
    var _0x30420f = new String();
    var _0x2c1121 = parseInt(_0x3bc962.substring(0, 2), 16);
    for (var _0x438627 = 2; _0x438627 < _0x3bc962.length; _0x438627 += 2) {
      var _0x258976 = parseInt(_0x3bc962.substring(_0x438627, _0x438627 + 2), 16);
      _0x30420f += String.fromCharCode(_0x258976 ^ (_0x2c1121 = 3793 + _0x2c1121 * 4513 & 255));
    }
    ;
    return _0x30420f;
  };
  _0x4a5ec2.b = function (_0x83636e) {
    return Function(`return ${_0x83636e}; `)();
  };
  _0x56b227.c = _0x4a5ec2.b("window");
  _0x56b227.d = _0x56b227.c.document;
  _0x4a5ec2.e = function () {
    return _0x56b227.c.devicePixelRatio || 1;
  };
  _0x56b227.c.addEventListener("load", function () {
    let _0xafdd52 = {
      eie: null,
      joystick: {
        positionMode: "L",
        checked: true,
        size: 90,
        mode: "dynamic",
        position: {
          left: "110px",
          bottom: "110px"
        },
        color: "red",
        pxy: 110
      },
      on: false,
      vj: null,
      uj: null,
      m: null,
      n: null
    };
    var _0x772baf;
    let _0x40085c = {
      s_l: "https://wormateserkanconnect.github.io/new2",
      fullscreen: null,
      headshot: 0,
      s_headshot: 0,
      mobile: false,
      mo: 1,
      mo1: {
        x: -1,
        y: -1
      },
      mo2: {
        x: -1,
        y: -1
      },
      s_kill: 0,
      kill: 0,
      died: 0,
      saveGame: false,
      forceUseLocalImages: false,
      localStorageEnabled: true,
      pm: {},
      joystick: _0xafdd52.joystick,
      j: null,
      pk: 0,
      pk0: "",
      pk1: "",
      pk2: "",
      pk3: "",
      pk4: "",
      pk5: "",
      pk6: "",
      z: 1,
      c_v: 222,
      c_1: "UP",
      c_2: "TeamUP",
      c_3: "wormup",
      c_4: "wormate.io",
      c_5: "please don't copy my code",
      d_1: "VlZBPQ==",
      d_2: "VkdWaGJWVlE=",
      d_3: "ZDI5eWJYVnc=",
      d_4: "VjI5eWJXRjBaUzVwYnc9PQ==",
      d_5: "VUd4bFlYTmxJR1J2YmlkMElHTnZjSGtnYlhrZ1kyOWtaUT09",
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: "",
      g: 36,
      s_w: false,
      s_n: "",
      v_z: 14,
      h: false,
      sn: true,
      s: false,
      hz: false,
      fz: true,
      tt: false,
      vh: false,
      vp: false,
      iq: true,
      ctrl: false,
      r1: true,
      sc: 0,
      wi: 0,
      to: 10,
      sm: 20,
      pi: "",
      pn: "",
      se: {
        a: [],
        b: [],
        c: [],
        d: [],
        e: [],
        f: [],
        g: [],
        h: [],
        i: [],
        j: [],
        k: []
      },
      st: false,
      hh: 0,
      sh: [],
      ws: [],
      we: [],
      wm: [],
      wg: [],
      wh: [],
      sg: [],
      gg: null,
      ig: -1,
      so: 1,
      re: false,
      dg: null
    };
    let _0x1693e1 = localStorage.getItem("SaveGameup");
    if (_0x1693e1 && _0x1693e1 !== "null") {
      let _0x317a21 = JSON.parse(_0x1693e1);
      for (let _0x17f62a in _0x317a21) {
        _0x40085c[_0x17f62a] = _0x317a21[_0x17f62a];
      }
    }
    ;
    if (!_0x40085c.favoriteSkins) {
      _0x40085c.favoriteSkins = [];
      localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
    }
    if (_0x40085c.currentFavSkinIndex === undefined) {
      _0x40085c.currentFavSkinIndex = 0;
      localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
    }
    if (!_0x40085c.selectedHats) {
      _0x40085c.selectedHats = [];
      localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
    }
    if (_0x40085c.currentHatIndex === undefined) {
      _0x40085c.currentHatIndex = 0;
      localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
    }
    if (!window.globalHatTextureCache) {
      window.globalHatTextureCache = {};
    }
    window.Objects = window.Objects || {
      eat_animation: 0.0025,
      smoothCamera: 0.5,
      PortionSize: 2,
      PortionAura: 1.2,
      PortionTransparent: 0.8,
      FoodTransparent: 0.3,
      FoodSize: 2,
      FoodShadow: 2,
      zoomSpeed: 0.003,
      soundEnabled: true,
      soundVolume: 50,
      soundEffect: "https://wormateup.live/images/store/hs_2.mp3"
    };
    try {
      if (localStorage.SaveGameXT) {
        const _0x5576dc = JSON.parse(localStorage.SaveGameXT);
        for (const _0x41f6ba in _0x5576dc) {
          if (Objects.hasOwnProperty(_0x41f6ba)) {
            Objects[_0x41f6ba] = _0x5576dc[_0x41f6ba];
          }
        }
      }
    } catch (_0xd33076) {
      console.error("Error loading settings:", _0xd33076);
    }
    ;
    function _0x550be4() {
      try {
        if (typeof localStorage === "undefined") {
          console.error("Ø§Ù„ØªØ®Ø²ÙŠÙ† Ø§Ù„Ù…Ø­Ù„ÙŠ ØºÙŠØ± Ù…ØªØ§Ø­");
          return false;
        }
        var _0x1a7ce6 = localStorage.getItem("wupi");
        var _0x24d6d2 = localStorage.getItem("wupit");
        if (_0x1a7ce6 && _0x24d6d2) {
          if (typeof _0x40085c !== "undefined") {
            _0x40085c.v_z = _0x24d6d2;
            _0x40085c.forceUseLocalImages = true;
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          }
          return true;
        } else {
          console.log("Ù„Ø§ ØªÙˆØ¬Ø¯ ØµÙˆØ± Ù…Ø­Ù„ÙŠØ©");
          return false;
        }
      } catch (_0x4a0615) {
        console.error("Ø®Ø·Ø£ ÙÙŠ Ø§Ù„ØªØ®Ø²ÙŠÙ† Ø§Ù„Ù…Ø­Ù„ÙŠ:", _0x4a0615);
        return false;
      }
    }
    _0x550be4();
    let _0x65d30 = function () {
      let _0x352552 = false;
      _0x40085c.mobile = false;
      var _0x46fb06 = navigator.userAgent || navigator.vendor || window.opera;
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(_0x46fb06) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(_0x46fb06.substr(0, 4))) {
        _0x352552 = true;
        _0x40085c.mobile = true;
      }
      return _0x352552;
    };
    let _0x3b9e9d = function (_0x161214) {
      _0x40085c.joystick ||= _0xafdd52.joystick;
      _0x40085c.joystick.checked = _0x161214.checked;
      localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
    };
    let _0x4f8266 = function (_0x3dc174) {
      _0x40085c.joystick ||= _0xafdd52.joystick;
      _0x40085c.joystick.color = _0x3dc174.value;
      localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
    };
    let _0xc6bd44 = function (_0x4341c9) {
      _0x40085c.joystick ||= _0xafdd52.joystick;
      _0x40085c.joystick.mode = _0x4341c9.value;
      localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
    };
    let _0x4f7e86 = function (_0x14c635) {
      _0x40085c.joystick ||= _0xafdd52.joystick;
      _0x40085c.joystick.position = {
        left: "75px",
        bottom: "75px"
      };
      if (_0x14c635.value === "R") {
        _0x40085c.joystick.position = {
          right: "75px",
          bottom: "75px"
        };
      }
      _0x40085c.joystick.positionMode = _0x14c635.value;
      localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
    };
    let _0x22f36a = function (_0x3322e8) {
      _0x40085c.joystick ||= _0xafdd52.joystick;
      _0x40085c.joystick.position = {
        left: (parseInt(_0x3322e8.value) + 10).toString() + "px",
        bottom: _0x3322e8.value + "px"
      };
      if (_0x40085c.joystick.positionMode === "R") {
        _0x40085c.joystick.position = {
          right: (parseInt(_0x3322e8.value) + 10).toString() + "px",
          bottom: _0x3322e8.value + "px"
        };
      }
      _0x40085c.joystick.pxy = _0x3322e8.value;
      localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
    };
    let _0x5633fb = function (_0x1fe755) {
      _0x40085c.joystick ||= _0xafdd52.joystick;
      _0x40085c.joystick.size = _0x1fe755.value;
      localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
    };
    let _0x52ea4a = function (_0x18045b, _0x29409f, _0x1b29dc, _0x58fe70, _0x11307a, _0x1b46ba) {
      let _0x577e1e = {
        a: "",
        b: 0,
        c: ""
      };
      if (_0x18045b > _0x40085c.g * 100 + 100 || _0x18045b < _0x40085c.g * 10 || _0x18045b === undefined) {
        _0x40085c.a = _0x18045b;
        if (_0x18045b === undefined) {
          _0x40085c.a = Math.floor(Math.random() * (_0x40085c.g / 9) + (_0x40085c.g - _0x40085c.g / 9));
        }
        _0x577e1e.a = "00";
      } else {
        _0x40085c.a = _0x18045b - _0x40085c.g * 10;
        _0x577e1e.b = _0x40085c.a;
        _0x40085c.a = _0x40085c.a % (_0x40085c.g / 9);
        _0x577e1e.b = (_0x577e1e.b - _0x40085c.a) / (_0x40085c.g / 9) + 1;
        _0x40085c.a = _0x40085c.a + (_0x40085c.g - _0x40085c.g / 9);
        _0x577e1e.a = _0x577e1e.b.toString(_0x40085c.g).padStart(2, 0);
      }
      if (_0x29409f > _0x40085c.g * 20 || _0x29409f < _0x40085c.g / 9 * 100 || _0x29409f === undefined) {
        if (_0x29409f > _0x40085c.g * 20 && _0x29409f < _0x40085c.g * 30) {
          _0x40085c.b = _0x29409f - _0x40085c.g * 20;
          _0x577e1e.a = _0x577e1e.a + _0x40085c.b.toString(_0x40085c.g);
          _0x40085c.b = 0;
          _0x577e1e.c = _0x577e1e.c + "1";
        } else {
          _0x40085c.b = _0x29409f;
          if (_0x29409f === undefined) {
            _0x40085c.b = 0;
          }
          _0x577e1e.a = _0x577e1e.a + "0";
          _0x577e1e.c = _0x577e1e.c + "0";
        }
      } else {
        _0x40085c.b = _0x29409f - _0x40085c.g / 9 * 100 + _0x40085c.g / _0x40085c.g;
        _0x577e1e.a = _0x577e1e.a + _0x40085c.b.toString(_0x40085c.g);
        _0x40085c.b = 0;
        _0x577e1e.c = _0x577e1e.c + "0";
      }
      if (_0x1b29dc > _0x40085c.g * 20 || _0x1b29dc < _0x40085c.g / 9 * 100 || _0x1b29dc === undefined) {
        if (_0x1b29dc > _0x40085c.g * 20 && _0x1b29dc < _0x40085c.g * 30) {
          _0x40085c.c = _0x1b29dc - _0x40085c.g * 20;
          _0x577e1e.a = _0x577e1e.a + _0x40085c.c.toString(_0x40085c.g);
          _0x40085c.c = 0;
          _0x577e1e.c = _0x577e1e.c + "1";
        } else {
          _0x40085c.c = _0x1b29dc;
          if (_0x1b29dc === undefined) {
            _0x40085c.c = 0;
          }
          _0x577e1e.a = _0x577e1e.a + "0";
          _0x577e1e.c = _0x577e1e.c + "0";
        }
      } else {
        _0x40085c.c = _0x1b29dc - _0x40085c.g / 9 * 100 + _0x40085c.g / _0x40085c.g;
        _0x577e1e.a = _0x577e1e.a + _0x40085c.c.toString(_0x40085c.g);
        _0x40085c.c = 0;
        _0x577e1e.c = _0x577e1e.c + "0";
      }
      if (_0x58fe70 > _0x40085c.g * 20 || _0x58fe70 < _0x40085c.g / 9 * 100 || _0x58fe70 === undefined) {
        if (_0x58fe70 > _0x40085c.g * 20 && _0x58fe70 < _0x40085c.g * 30) {
          _0x40085c.d = _0x58fe70 - _0x40085c.g * 20;
          if (_0x40085c.d.toString(_0x40085c.g) === "N") {
            _0x577e1e.a = _0x577e1e.a + "0";
          } else {
            _0x577e1e.a = _0x577e1e.a + _0x40085c.d.toString(_0x40085c.g);
          }
          _0x40085c.d = 0;
          _0x577e1e.c = _0x577e1e.c + "1";
        } else {
          _0x40085c.d = _0x58fe70;
          if (_0x58fe70 === undefined) {
            _0x40085c.d = 0;
          }
          _0x577e1e.a = _0x577e1e.a + "0";
          _0x577e1e.c = _0x577e1e.c + "0";
        }
      } else {
        _0x40085c.d = _0x58fe70 - _0x40085c.g / 9 * 100 + _0x40085c.g / _0x40085c.g;
        if (_0x40085c.d.toString(_0x40085c.g) === "N") {
          _0x577e1e.a = _0x577e1e.a + "0";
        } else {
          _0x577e1e.a = _0x577e1e.a + _0x40085c.d.toString(_0x40085c.g);
        }
        _0x40085c.d = 0;
        _0x577e1e.c = _0x577e1e.c + "0";
      }
      if (_0x11307a > _0x40085c.g * 20 || _0x11307a < _0x40085c.g / 9 * 100 || _0x11307a === undefined) {
        if (_0x11307a > _0x40085c.g * 20 && _0x11307a < _0x40085c.g * 30) {
          _0x577e1e.b = _0x40085c.g / _0x40085c.g;
          if (_0x11307a <= _0x40085c.g * 20 + (_0x40085c.g - 1)) {
            _0x40085c.e = _0x11307a - _0x40085c.g * 20;
          } else if (_0x11307a <= _0x40085c.g * 20 + (_0x40085c.g - 1) * 2) {
            _0x577e1e.b = _0x577e1e.b * 2;
            _0x40085c.e = _0x11307a - _0x40085c.g * 20 - (_0x40085c.g - 1);
          } else if (_0x11307a <= _0x40085c.g * 20 + (_0x40085c.g - 1) * 3) {
            _0x40085c.e = _0x11307a - _0x40085c.g * 20 - (_0x40085c.g - 1) * 2;
          } else if (_0x11307a <= _0x40085c.g * 20 + (_0x40085c.g - 1) * 4) {
            _0x577e1e.b = _0x577e1e.b * 2;
            _0x40085c.e = _0x11307a - _0x40085c.g * 20 - (_0x40085c.g - 1) * 3;
          } else {
            _0x40085c.e = 0;
          }
          if (_0x40085c.e >= _0x40085c.g) {
            _0x577e1e.b = 2;
            _0x40085c.e = _0x40085c.e - (_0x40085c.g - 1);
          }
          _0x577e1e.a = _0x577e1e.a + _0x40085c.e.toString(_0x40085c.g);
          _0x40085c.e = 0;
          _0x577e1e.c = _0x577e1e.c + "1";
        } else {
          _0x40085c.e = _0x11307a;
          if (_0x11307a === undefined) {
            _0x40085c.e = 0;
          }
          _0x577e1e.a = _0x577e1e.a + "0";
          _0x577e1e.c = _0x577e1e.c + "0";
          _0x577e1e.b = 0;
        }
      } else {
        _0x577e1e.b = _0x40085c.g / _0x40085c.g;
        if (_0x11307a - _0x40085c.g / 9 * 100 + 1 >= _0x40085c.g) {
          _0x40085c.e = _0x11307a - (_0x40085c.g / 9 * 100 + (_0x40085c.g - 1));
          _0x577e1e.b = _0x577e1e.b * 2;
        } else {
          _0x40085c.e = _0x11307a - _0x40085c.g / 9 * 100 + _0x577e1e.b;
        }
        _0x577e1e.a = _0x577e1e.a + _0x40085c.e.toString(_0x40085c.g);
        _0x40085c.e = 0;
        _0x577e1e.c = _0x577e1e.c + "0";
      }
      if (_0x577e1e.a == "000000") {
        _0x40085c.f = _0x1b46ba.substr(0, 22).padEnd(22);
      } else {
        let _0x2e6115 = parseInt(_0x577e1e.c, 2);
        if (_0x11307a > 790 && _0x11307a <= 860) {
          _0x2e6115 += 16;
        }
        if (_0x577e1e.b <= 1) {
          _0x577e1e.a = _0x577e1e.a.substr(0, 5) + "." + _0x577e1e.a.substr(5, 1);
        } else {
          _0x577e1e.a = _0x577e1e.a.substr(0, 4) + "." + _0x577e1e.a.substr(4, 2);
        }
        if (_0x1b46ba == "") {
          _0x1b46ba = ".                       .";
        }
        if (_0x577e1e.c == "0000") {
          if (_0x1b46ba.substr(23, 1) == ".") {
            _0x1b46ba = _0x1b46ba.substr(0, 23).padEnd(23) + " " + _0x1b46ba.substr(24, 1).padEnd(1);
          }
          _0x40085c.f = (_0x1b46ba.length >= 32 ? _0x1b46ba.substr(0, 25) : _0x1b46ba.substr(0, 25).padEnd(25)) + _0x577e1e.a;
        } else {
          _0x40085c.f = (_0x1b46ba.length >= 32 ? _0x1b46ba.substr(0, 23) : _0x1b46ba.substr(0, 23).padEnd(23)) + "." + _0x2e6115.toString(_0x40085c.g) + _0x577e1e.a;
        }
        _0x40085c.f = _0x40085c.f.replaceAll(" ", "_");
      }
    };
    let _0x2f64de = function (_0x57b13e) {
      let _0x28b8b3;
      try {
        _0x40085c.joystick ||= _0xafdd52.joystick;
        if (_0x65d30() && _0x57b13e && _0x40085c.joystick.checked) {
          (_0x28b8b3 = nipplejs.create(_0x40085c.joystick)).on("move", function (_0x27140b, _0x46d937) {
            _0xafdd52.eie.fo = _0x46d937.angle.radian <= Math.PI ? _0x46d937.angle.radian * -1 : Math.PI - (_0x46d937.angle.radian - Math.PI);
          });
        }
        return _0x28b8b3;
      } catch (_0x27ca69) {
        console.error(_0x27ca69);
      }
    };
    let _0x1e5629 = function (_0x48d1d5) {
      let _0x33fb8b = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: "",
        g: 0,
        h: "",
        i: ""
      };
      let _0x2d7cdd = 0;
      _0x33fb8b.h = _0x48d1d5.substr(-9);
      if (_0x33fb8b.h.substr(0, 1) != ".") {
        _0x33fb8b.i = "0000";
      } else if ((_0x2d7cdd = parseInt(_0x33fb8b.h.substr(1, 1), _0x40085c.g)) > 15) {
        _0x2d7cdd -= 16;
        _0x33fb8b.i = _0x2d7cdd.toString(2).padStart(4, 0);
      } else {
        _0x33fb8b.i = _0x2d7cdd.toString(2).padStart(4, 0);
        _0x2d7cdd = 0;
      }
      _0x33fb8b.f = _0x48d1d5.substr(-7);
      if (_0x33fb8b.f.substr(0, 2) != "00") {
        _0x33fb8b.a = parseInt(_0x33fb8b.f.substr(0, 2), _0x40085c.g);
        _0x33fb8b.a = (_0x33fb8b.a - 1) * (_0x40085c.g / 9) + _0x40085c.g * 10 - (_0x40085c.g - 4);
      }
      if (_0x33fb8b.f.substr(5, 1) == ".") {
        if (_0x33fb8b.f.substr(6, 1) != "0") {
          _0x33fb8b.e = parseInt(_0x33fb8b.f.substr(6, 1), _0x40085c.g);
          if (_0x33fb8b.i.substr(3, 1) != "0") {
            if (_0x2d7cdd > 0) {
              _0x33fb8b.e = _0x33fb8b.e + _0x40085c.g * 20 + (_0x40085c.g - 1) * 2;
            } else {
              _0x33fb8b.e = _0x33fb8b.e + _0x40085c.g * 20;
            }
          } else {
            _0x33fb8b.e = _0x33fb8b.e - 1 + _0x40085c.g / 9 * 100;
          }
        }
      } else {
        _0x33fb8b.e = parseInt(_0x33fb8b.f.substr(6, 1), _0x40085c.g);
        if (_0x33fb8b.i.substr(3, 1) != "0") {
          if (_0x2d7cdd > 0) {
            _0x33fb8b.e = _0x33fb8b.e + _0x40085c.g * 20 + (_0x40085c.g - 1) * 3;
          } else {
            _0x33fb8b.e = _0x33fb8b.e + _0x40085c.g * 20 + (_0x40085c.g - 1);
          }
        } else {
          _0x33fb8b.e = _0x33fb8b.e + (_0x40085c.g / 9 * 100 + (_0x40085c.g - 1));
        }
      }
      _0x33fb8b.f = _0x33fb8b.f.replace(".", "");
      if (_0x33fb8b.f.substr(2, 1) != "0") {
        _0x33fb8b.b = parseInt(_0x33fb8b.f.substr(2, 1), _0x40085c.g);
        if (_0x33fb8b.i.substr(0, 1) != "0") {
          _0x33fb8b.b = _0x33fb8b.b + _0x40085c.g * 20;
        } else {
          _0x33fb8b.b = _0x33fb8b.b - 1 + _0x40085c.g / 9 * 100;
        }
      }
      if (_0x33fb8b.f.substr(3, 1) != "0") {
        _0x33fb8b.c = parseInt(_0x33fb8b.f.substr(3, 1), _0x40085c.g);
        if (_0x33fb8b.i.substr(1, 1) != "0") {
          _0x33fb8b.c = _0x33fb8b.c + _0x40085c.g * 20;
        } else {
          _0x33fb8b.c = _0x33fb8b.c - 1 + _0x40085c.g / 9 * 100;
        }
      }
      if (_0x33fb8b.f.substr(4, 1) != "0") {
        _0x33fb8b.d = parseInt(_0x33fb8b.f.substr(4, 1), _0x40085c.g);
        if (_0x33fb8b.i.substr(2, 1) != "0") {
          _0x33fb8b.d = _0x33fb8b.d + _0x40085c.g * 20;
        } else {
          _0x33fb8b.d = _0x33fb8b.d - 1 + _0x40085c.g / 9 * 100;
        }
      }
      return _0x33fb8b;
    };
    let _0x4a7961 = function (_0x160e77) {
      return !(_0x160e77 > _0x40085c.g * 30) && !(_0x160e77 < _0x40085c.g / 9 * 100) || _0x160e77 == 0;
    };
    let _0x1fde79 = function (_0x176bb9) {
      return /^(.{25})(\w{5}\.\w{1})$/.test(_0x176bb9) || /^(.{25})(\w{4}\.\w{2})$/.test(_0x176bb9);
    };
    let _0x368dc3 = function (_0x3c1b0b) {
      _0x3c1b0b = _0x3c1b0b.replaceAll("_", " ");
      if (/^(.{25})(\w{7})$/.test(_0x3c1b0b)) {
        for (_0x3c1b0b = _0x3c1b0b.substr(0, 15).trim(); _0x3c1b0b.substr(_0x3c1b0b.length - 1, 1) == ".";) {
          _0x3c1b0b = _0x3c1b0b.substr(0, _0x3c1b0b.length - 1);
        }
        ;
        return _0x3c1b0b;
      }
      ;
      if (/^(.{25})(\w{5}\.\w{1})$/.test(_0x3c1b0b) || /^(.{25})(\w{4}\.\w{2})$/.test(_0x3c1b0b)) {
        if (_0x3c1b0b.substr(-9).substr(0, 1) != ".") {
          return _0x3c1b0b.substr(0, 25).trim();
        } else {
          return _0x3c1b0b.substr(0, 23).trim();
        }
      } else {
        return _0x3c1b0b;
      }
    };
    _0x40085c.loading = true;
    var _0x48dee5 = localStorage.getItem("oco");
    localStorage.setItem("ccg_0", "Kill and Headshot stats will be removed?");
    localStorage.setItem("ccg_1", "There was a problem connecting!");
    localStorage.setItem("ccg_2", "Your account has been locked.");
    var _0x14d81c = localStorage.getItem("wupsw");
    var _0x330c6f = localStorage.getItem("wupi") != null ? localStorage.getItem("wupi").split(",") : localStorage.getItem("wupi");
    var _0x528cd6 = localStorage.getItem("wupit");
    var _0x37d8fb = localStorage.getItem("custom_wear");
    var _0x2f4d8e = localStorage.getItem("custom_skin");
    $("<input type=\"hidden\" id=\"port_id\" value=\"\">").insertAfter(".description-text");
    $("<input type=\"hidden\" id=\"port_id_s\" value=\"\">").insertAfter(".description-text");
    $("<input type=\"hidden\" id=\"port_name\" value=\"\">").insertAfter(".description-text");
    $("<input type=\"hidden\" id=\"port_name_s\" value=\"\">").insertAfter(".description-text");
    $("#mm-action-buttons").hover(function () {
      $("#port_id").val("");
      $("#port_name").val("");
    });
    $("#final-share-fb").css("display", "none");
    $("#unl6wj4czdl84o9b").css("display", "none");
    $("#mm-action-guest").css("display", "none");
    $("#mm-menu-cont").css("display", "block");
    $("#mm-bottom-buttons").css("display", "block");
    $("#mm-player-info").css("display", "block");
    var _0x52ab14 = $("<img>", {
      id: "orange-frame",
      src: "https://wormup.in/images/cors-proxy.php?img=img/orange-frame.png",
      alt: "orange-frame"
    });
    $("#mm-player-avatar").after(_0x52ab14);
    $("#orange-frame").addClass("position-left");
    $("#mm-player-info").css("display", "block");
    $("#relojHelp").css("position", "absolute");
    $("#relojHelp").css("top", "12px");
    $("#relojHelp").css("left", "5px");
    $("#delete-account-view").css("display", "none");
    var _0x4ed629 = null;
    var _0x52dd56 = null;
    var _0x2f98b4 = false;
    var _0x180844 = 55;
    var _0x1f9818 = 1;
    var _0x2d01c8 = true;
    if (_0x330c6f && _0x528cd6 && _0x528cd6 == _0x40085c.v_z) ;else {
      fetch(_0x40085c.s_l + "/store/index.php", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          img: "i2"
        })
      }).then(async function (_0x5b18a7) {
        _0x330c6f = (_0x5b18a7 = await _0x5b18a7.json()).i.split(".");
        localStorage.setItem("wupi", _0x330c6f);
        localStorage.setItem("wupit", _0x5b18a7.vs);
        _0x40085c.v_z = _0x5b18a7.vs;
        localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
        window.location.reload();
      }).catch(function (_0x177aca) {});
    }
    ;
    var _0x6d9730 = PIXI.Texture.from(_0x40085c.s_l + "/get_store.php?item=close_q.png");
    var _0x309e8f = PIXI.Texture.from(_0x40085c.s_l + "/get_store.php?item=open_q.png");
    var _0x113e6c = PIXI.Texture.from(_0x40085c.s_l + "/get_store.php?item=close_w.png");
    var _0x69c8af = PIXI.Texture.from(_0x40085c.s_l + "/get_store.php?item=open_w.png");
    var _0x1e2b71 = PIXI.Texture.from(_0x40085c.s_l + "/get_store.php?item=close_z.png");
    var _0x51adae = PIXI.Texture.from(_0x40085c.s_l + "/get_store.php?item=open_z.png");
    var _0x46de81 = PIXI.Texture.from(_0x40085c.s_l + "/get_store.php?item=z_i.png");
    var _0x5b3eee = PIXI.Texture.from(_0x40085c.s_l + "/get_store.php?item=z_o.png");
    var _0x1858a1 = new PIXI.Sprite(_0x6d9730);
    _0x1858a1.buttonMode = true;
    _0x1858a1.anchor.set(0.5);
    _0x1858a1.x = -65;
    _0x1858a1.y = 25;
    _0x1858a1.interactive = true;
    _0x1858a1.buttonMode = true;
    var _0x4d02d3 = new PIXI.Sprite(_0x113e6c);
    _0x4d02d3.buttonMode = true;
    _0x4d02d3.anchor.set(0.5);
    _0x4d02d3.x = -33;
    _0x4d02d3.y = 25;
    _0x4d02d3.interactive = true;
    _0x4d02d3.buttonMode = true;
    var _0x2de66c = new PIXI.Sprite(_0x1e2b71);
    _0x2de66c.buttonMode = true;
    _0x2de66c.anchor.set(0.5);
    _0x2de66c.x = -1;
    _0x2de66c.y = 25;
    _0x2de66c.interactive = true;
    _0x2de66c.buttonMode = true;
    var _0x34cb21 = new PIXI.Sprite(_0x5b3eee);
    _0x34cb21.buttonMode = true;
    _0x34cb21.anchor.set(0.5);
    _0x34cb21.x = -1;
    _0x34cb21.y = 25;
    _0x34cb21.interactive = true;
    _0x34cb21.buttonMode = true;
    var _0x2c4a4e = new PIXI.Sprite(_0x46de81);
    _0x2c4a4e.buttonMode = true;
    _0x2c4a4e.anchor.set(0.5);
    _0x2c4a4e.x = -33;
    _0x2c4a4e.y = 25;
    _0x2c4a4e.interactive = true;
    _0x2c4a4e.buttonMode = true;
    _0x4d02d3.alpha = 0.25;
    _0x1858a1.alpha = 0.25;
    _0x2de66c.alpha = 0.25;
    _0x2c4a4e.alpha = 0.25;
    _0x34cb21.alpha = 0.25;
    var _0x33f351 = new PIXI.Text("SRV UP", {
      fontFamily: "PTSans",
      fill: "#fff009",
      fontSize: 12
    });
    _0x33f351.anchor.x = 0.5;
    _0x33f351.position.x = 110;
    var _0x5ae2bb = document.getElementById("game-cont");
    var _0x357c81 = document.getElementById("game-view");
    var _0x4266ee = $("#mm-params-game-mode");
    _0x56b227.d.getElementById("game-wrap").style.display = "block";
    (function (_0x317a6b, _0x1ae1f8, _0xb1ed1f) {
      function _0x222055(_0x5e8799, _0x585fb2) {
        return _typeof(_0x5e8799) === _0x585fb2;
      }
      function _0x4dfe48() {
        if (_typeof(_0x1ae1f8.createElement) != "function") {
          return _0x1ae1f8.createElement(arguments[0]);
        } else if (_0x6d58be) {
          return _0x1ae1f8.createElementNS.call(_0x1ae1f8, "http://www.w3.org/2000/svg", arguments[0]);
        } else {
          return _0x1ae1f8.createElement.apply(_0x1ae1f8, arguments);
        }
      }
      var _0x4ba4d0 = [];
      var _0x4995ad = [];
      var _0x5a47ce = {
        _version: "3.3.1",
        _config: {
          classPrefix: "",
          enableClasses: true,
          enableJSClass: true,
          usePrefixes: true
        },
        _q: [],
        on: function (_0x2827ee, _0x49278c) {
          var _0x3fb0b6 = this;
          setTimeout(function () {
            _0x49278c(_0x3fb0b6[_0x2827ee]);
          }, 0);
        },
        addTest: function (_0x394120, _0x355c8c, _0x5d72c0) {
          _0x4995ad.push({
            name: _0x394120,
            fn: _0x355c8c,
            options: _0x5d72c0
          });
        },
        addAsyncTest: function (_0x3b6bc1) {
          _0x4995ad.push({
            name: null,
            fn: _0x3b6bc1
          });
        }
      };
      function _0x56b2ec() {}
      _0x56b2ec.prototype = _0x5a47ce;
      _0x56b2ec = new _0x56b2ec();
      var _0xb12b6f = false;
      try {
        _0xb12b6f = "WebSocket" in _0x317a6b && _0x317a6b.WebSocket.CLOSING === 2;
      } catch (_0x53022f) {}
      ;
      _0x56b2ec.addTest("websockets", _0xb12b6f);
      var _0x512daa = _0x1ae1f8.documentElement;
      var _0x6d58be = _0x512daa.nodeName.toLowerCase() === "svg";
      _0x56b2ec.addTest("canvas", function () {
        var _0x59ac5d = _0x4dfe48("canvas");
        return !!_0x59ac5d.getContext && !!_0x59ac5d.getContext("2d");
      });
      _0x56b2ec.addTest("canvastext", function () {
        return _0x56b2ec.canvas !== false && _typeof(_0x4dfe48("canvas").getContext("2d").fillText) == "function";
      });
      (function () {
        var _0x51261e;
        var _0x450bc0;
        var _0x23059a;
        var _0x435962;
        var _0x4f4bc4;
        var _0x1b24a6;
        var _0x279d3f;
        for (var _0x1074cf in _0x4995ad) {
          if (_0x4995ad.hasOwnProperty(_0x1074cf)) {
            _0x51261e = [];
            if ((_0x450bc0 = _0x4995ad[_0x1074cf]).name && (_0x51261e.push(_0x450bc0.name.toLowerCase()), _0x450bc0.options && _0x450bc0.options.aliases && _0x450bc0.options.aliases.length)) {
              for (_0x23059a = 0; _0x23059a < _0x450bc0.options.aliases.length; _0x23059a++) {
                _0x51261e.push(_0x450bc0.options.aliases[_0x23059a].toLowerCase());
              }
            }
            ;
            _0x435962 = _0x222055(_0x450bc0.fn, "function") ? _0x450bc0.fn() : _0x450bc0.fn;
            _0x4f4bc4 = 0;
            for (; _0x4f4bc4 < _0x51261e.length; _0x4f4bc4++) {
              if ((_0x279d3f = (_0x1b24a6 = _0x51261e[_0x4f4bc4]).split(".")).length === 1) {
                _0x56b2ec[_0x279d3f[0]] = _0x435962;
              } else {
                if (!!_0x56b2ec[_0x279d3f[0]] && !(_0x56b2ec[_0x279d3f[0]] instanceof Boolean)) {
                  _0x56b2ec[_0x279d3f[0]] = new Boolean(_0x56b2ec[_0x279d3f[0]]);
                }
                _0x56b2ec[_0x279d3f[0]][_0x279d3f[1]] = _0x435962;
              }
              _0x4ba4d0.push((_0x435962 ? "" : "no-") + _0x279d3f.join("-"));
            }
          }
        }
      })();
      (function (_0x5cbf04) {
        var _0x1739ea = _0x512daa.className;
        var _0x5d788f = _0x56b2ec._config.classPrefix || "";
        if (_0x6d58be) {
          _0x1739ea = _0x1739ea.baseVal;
        }
        if (_0x56b2ec._config.enableJSClass) {
          var _0x41632f = RegExp("(^|\\s)" + _0x5d788f + "no-js(\\s|$)");
          _0x1739ea = _0x1739ea.replace(_0x41632f, "$1" + _0x5d788f + "js$2");
        }
        ;
        if (_0x56b2ec._config.enableClasses) {
          _0x1739ea += " " + _0x5d788f + _0x5cbf04.join(" " + _0x5d788f);
          if (_0x6d58be) {
            _0x512daa.className.baseVal = _0x1739ea;
          } else {
            _0x512daa.className = _0x1739ea;
          }
        }
      })(_0x4ba4d0);
      delete _0x5a47ce.addTest;
      delete _0x5a47ce.addAsyncTest;
      for (var _0x352ef5 = 0; _0x352ef5 < _0x56b2ec._q.length; _0x352ef5++) {
        _0x56b2ec._q[_0x352ef5]();
      }
      ;
      _0x317a6b.Modernizr = _0x56b2ec;
    })(window, document);
    if (!Modernizr.websockets || !Modernizr.canvas || !Modernizr.canvastext) {
      _0x56b227.d.getElementById("error-view").style.display = "block";
      return;
    }
    ;
    _0x3f64b5.f = {
      g: function (_0xac2b1b, _0x5a8265, _0x36435c) {
        _0xac2b1b.stop();
        _0xac2b1b.fadeIn(_0x5a8265, _0x36435c);
      },
      h: function (_0xd22c3b, _0x3103b7, _0x561c4e) {
        _0xd22c3b.stop();
        _0xd22c3b.fadeOut(_0x3103b7, _0x561c4e);
      }
    };
    _0x3f64b5.i = _0x4a5ec2.b("WebSocket");
    _0x3f64b5.j = _0x4a5ec2.b("Float32Array");
    _0x2d9ab8 = (_0x151a3f = _0x4a5ec2.b("PIXI")).BLEND_MODES;
    _0x42a3b5 = _0x151a3f.WRAP_MODES;
    _0x3f64b5.k = {
      l: _0x151a3f.Container,
      m: _0x151a3f.BaseTexture,
      n: _0x151a3f.Texture,
      o: _0x151a3f.Renderer,
      p: _0x151a3f.Graphics,
      q: _0x151a3f.Shader,
      r: _0x151a3f.Rectangle,
      s: _0x151a3f.Sprite,
      t: _0x151a3f.Text,
      u: _0x151a3f.Geometry,
      v: _0x151a3f.Mesh,
      w: {
        z: _0x2d9ab8.ADD,
        A: _0x2d9ab8.SCREEN,
        B: _0x2d9ab8.MULTIPLY
      },
      C: {
        D: _0x42a3b5.REPEAT
      },
      F: {
        G: function (_0x5163f2) {
          var _0x5199fc = _0x5163f2.parent;
          if (_0x5199fc != null) {
            _0x5199fc.removeChild(_0x5163f2);
          }
        }
      }
    };
    _0x2c8e1f.H = {
      I: _0x56b227.c.runtimeHash,
      J: "https://gateway.wormate.io",
      K: "https://resources.wormate.io",
      L: "/images/linelogo-valday2024.png",
      M: "/images/guest-avatar-valday2024.png",
      N: "/images/confetti-valday2024.png",
      O: "/images/bg-event-pattern-valday2024.png"
    };
    _0x2c8e1f.H.P = ((_0xef60ff = _0x56b227.c.I18N_LANG) || (_0xef60ff = "en"), _0xef60ff);
    _0x2c8e1f.H.Q = function () {
      var _0x1455a5;
      switch (_0x2c8e1f.H.P) {
        case "uk":
          _0x1455a5 = "uk_UA";
          break;
        case "de":
          _0x1455a5 = "de_DE";
          break;
        case "fr":
          _0x1455a5 = "fr_FR";
          break;
        case "es":
          _0x1455a5 = "es_ES";
          break;
        default:
          _0x1455a5 = "en_US";
      }
      ;
      return _0x1455a5;
    }();
    moment.locale(_0x2c8e1f.H.Q);
    ooo = null;
    _0x2c8e1f.S = 6.283185307179586;
    _0x2c8e1f.T = 3.141592653589793;
    _0x480d37 = _0x56b227.c.I18N_MESSAGES;
    _0x4a5ec2.U = function (_0x29e410) {
      return _0x480d37[_0x29e410];
    };
    _0x4a5ec2.V = function (_0x5da10) {
      if (_0x5da10[_0x2c8e1f.H.P]) {
        return _0x5da10[_0x2c8e1f.H.P];
      } else if (_0x5da10.en) {
        return _0x5da10.en;
      } else {
        return _0x5da10.x;
      }
    };
    _0x4a5ec2.W = function (_0x4d2f37) {
      return encodeURI(_0x4d2f37);
    };
    _0x4a5ec2.X = function (_0x46bc98, _0x1c3c00) {
      return setInterval(_0x46bc98, _0x1c3c00);
    };
    _0x4a5ec2.Y = function (_0x133838, _0x96bb0e) {
      return setTimeout(_0x133838, _0x96bb0e);
    };
    _0x4a5ec2.Z = function (_0xa2dc7f) {
      clearTimeout(_0xa2dc7f);
    };
    _0x4a5ec2.$ = function (_0x35e0cd) {
      var _0x4a3307 = (_0x4a5ec2._(_0x35e0cd) % 60).toString();
      var _0x2cc3e5 = (_0x4a5ec2._(_0x35e0cd / 60) % 60).toString();
      var _0x33db52 = (_0x4a5ec2._(_0x35e0cd / 3600) % 24).toString();
      var _0x4a871e = _0x4a5ec2._(_0x35e0cd / 86400).toString();
      var _0x52ba44 = _0x4a5ec2.U("util.time.days");
      var _0xaadba7 = _0x4a5ec2.U("util.time.hours");
      var _0x42752c = _0x4a5ec2.U("util.time.min");
      var _0x5b083c = _0x4a5ec2.U("util.time.sec");
      if (_0x4a871e > 0) {
        return _0x4a871e + " " + _0x52ba44 + " " + _0x33db52 + " " + _0xaadba7 + " " + _0x2cc3e5 + " " + _0x42752c + " " + _0x4a3307 + " " + _0x5b083c;
      } else if (_0x33db52 > 0) {
        return _0x33db52 + " " + _0xaadba7 + " " + _0x2cc3e5 + " " + _0x42752c + " " + _0x4a3307 + " " + _0x5b083c;
      } else if (_0x2cc3e5 > 0) {
        return _0x2cc3e5 + " " + _0x42752c + " " + _0x4a3307 + " " + _0x5b083c;
      } else {
        return _0x4a3307 + " " + _0x5b083c;
      }
    };
    _0x4a5ec2.aa = function (_0xc248dc) {
      if (_0xc248dc.includes("href")) {
        return _0xc248dc.replaceAll("href", "target=\"_black\" href");
      } else {
        return _0xc248dc;
      }
    };
    _0x4a5ec2.ba = function (_0x39df12, _0x50231f, _0x55295d) {
      var _0x20e1b2 = _0x56b227.d.createElement("script");
      var _0x35d373 = true;
      if (_typeof(_0x50231f) !== "undefined" && _0x50231f !== null) {
        if (_typeof(_0x50231f.id) !== "undefined") {
          _0x20e1b2.id = _0x50231f.id;
        }
        if (_typeof(_0x50231f.async) !== "undefined" && _0x50231f.async) {
          _0x20e1b2.async = "async";
        }
        if (_typeof(_0x50231f.defer) !== "undefined" && _0x50231f.defer) {
          _0x20e1b2.defer = "defer";
        }
        if (_typeof(_0x50231f.crossorigin) !== "undefined") {
          _0x20e1b2.crossorigin = _0x50231f.crossorigin;
        }
      }
      _0x20e1b2.type = "text/javascript";
      _0x20e1b2.src = _0x39df12;
      if (_0x55295d) {
        _0x20e1b2.onload = _0x20e1b2.onreadystatechange = function () {
          _0x35d373 = false;
          try {
            _0x55295d();
          } catch (_0x1edff5) {}
          ;
          _0x20e1b2.onload = _0x20e1b2.onreadystatechange = null;
        };
      }
      (_0x56b227.d.head || _0x56b227.d.getElementsByTagName("head")[0]).appendChild(_0x20e1b2);
    };
    _0x4a5ec2.ca = function (_0x9c3767, _0x18edcb) {
      var _0x14a75f = _0x18edcb;
      _0x14a75f.prototype = Object.create(_0x9c3767.prototype);
      _0x14a75f.prototype.constructor = _0x14a75f;
      _0x14a75f.parent = _0x9c3767;
      return _0x14a75f;
    };
    _0x4a5ec2.da = function (_0x138a4a) {
      if ((_0x138a4a %= _0x2c8e1f.S) < 0) {
        return _0x138a4a + _0x2c8e1f.S;
      } else {
        return _0x138a4a;
      }
    };
    _0x4a5ec2.ea = function (_0x211cb5, _0x383e19, _0x436457) {
      return _0x4a5ec2.fa(_0x436457, _0x211cb5, _0x383e19);
    };
    _0x4a5ec2.fa = function (_0x213363, _0x1a9e2e, _0x56e1ae) {
      if (_0x213363 > _0x56e1ae) {
        return _0x56e1ae;
      } else if (_0x213363 < _0x1a9e2e) {
        return _0x1a9e2e;
      } else if (Number.isFinite(_0x213363)) {
        return _0x213363;
      } else {
        return (_0x1a9e2e + _0x56e1ae) * 0.5;
      }
    };
    _0x4a5ec2.ga = function (_0x279150, _0x5efe7e, _0x31b3e2, _0xec47fa) {
      if (_0x5efe7e > _0x279150) {
        return _0x4a5ec2.ha(_0x5efe7e, _0x279150 + _0x31b3e2 * _0xec47fa);
      } else {
        return _0x4a5ec2.ia(_0x5efe7e, _0x279150 - _0x31b3e2 * _0xec47fa);
      }
    };
    _0x4a5ec2.ja = function (_0x440a2c, _0x168ff6, _0x165ea5, _0x483117, _0x34ee1a) {
      return _0x168ff6 + (_0x440a2c - _0x168ff6) * Math.pow(1 - _0x483117, _0x165ea5 / _0x34ee1a);
    };
    _0x4a5ec2.ka = function (_0x2d65bf, _0x3cb3d2, _0x1af8fa) {
      return _0x2d65bf - (_0x2d65bf - _0x3cb3d2) * _0x1af8fa;
    };
    _0x4a5ec2.la = function (_0xe7933a, _0x364e32) {
      return Math.sqrt(_0xe7933a * _0xe7933a + _0x364e32 * _0x364e32);
    };
    _0x4a5ec2.ma = function () {
      return Math.random();
    };
    _0x4a5ec2._ = function (_0x121f81) {
      return Math.floor(_0x121f81);
    };
    _0x4a5ec2.na = function (_0xcd1e52) {
      return Math.abs(_0xcd1e52);
    };
    _0x4a5ec2.ha = function (_0x34e673, _0x27411c) {
      return Math.min(_0x34e673, _0x27411c);
    };
    _0x4a5ec2.ia = function (_0xee968a, _0x563516) {
      return Math.max(_0xee968a, _0x563516);
    };
    _0x4a5ec2.oa = function (_0x554196) {
      return Math.sin(_0x554196);
    };
    _0x4a5ec2.pa = function (_0x572070) {
      return Math.cos(_0x572070);
    };
    _0x4a5ec2.qa = function (_0x2fd15a) {
      return Math.sqrt(_0x2fd15a);
    };
    _0x4a5ec2.ra = function (_0x2aaec4, _0x59cb04) {
      return Math.pow(_0x2aaec4, _0x59cb04);
    };
    _0x4a5ec2.sa = function (_0x20e7ce) {
      return Math.atan(_0x20e7ce);
    };
    _0x4a5ec2.ta = function (_0x21f33f, _0x144543) {
      return Math.atan2(_0x21f33f, _0x144543);
    };
    _0x4a5ec2.ua = function (_0x36701d, _0x56519c, _0x272ce3, _0x482410) {
      var _0x2a432d = _0x56519c + _0x482410;
      if (_0x36701d == null) {
        throw TypeError();
      }
      ;
      var _0x59ee64 = _0x36701d.length >>> 0;
      var _0x52bed4 = _0x272ce3 >> 0;
      var _0x4ee5d6 = _0x52bed4 < 0 ? Math.max(_0x59ee64 + _0x52bed4, 0) : Math.min(_0x52bed4, _0x59ee64);
      var _0x516b63 = _0x56519c >> 0;
      var _0x47f6e6 = _0x516b63 < 0 ? Math.max(_0x59ee64 + _0x516b63, 0) : Math.min(_0x516b63, _0x59ee64);
      var _0x370cab = _0x2a432d === undefined ? _0x59ee64 : _0x2a432d >> 0;
      var _0x16d07f = Math.min((_0x370cab < 0 ? Math.max(_0x59ee64 + _0x370cab, 0) : Math.min(_0x370cab, _0x59ee64)) - _0x47f6e6, _0x59ee64 - _0x4ee5d6);
      var _0x4d6c26 = 1;
      for (_0x47f6e6 < _0x4ee5d6 && _0x4ee5d6 < _0x47f6e6 + _0x16d07f && (_0x4d6c26 = -1, _0x47f6e6 += _0x16d07f - 1, _0x4ee5d6 += _0x16d07f - 1); _0x16d07f > 0;) {
        if (_0x47f6e6 in _0x36701d) {
          _0x36701d[_0x4ee5d6] = _0x36701d[_0x47f6e6];
        } else {
          delete _0x36701d[_0x4ee5d6];
        }
        _0x47f6e6 += _0x4d6c26;
        _0x4ee5d6 += _0x4d6c26;
        _0x16d07f--;
      }
      ;
      return _0x36701d;
    };
    _0x4a5ec2.va = function (_0x37823b, _0x1b477a) {
      return _0x37823b + (_0x1b477a - _0x37823b) * _0x4a5ec2.ma();
    };
    _0x4a5ec2.wa = function (_0x432c9e) {
      return _0x432c9e[parseInt(_0x4a5ec2.ma() * _0x432c9e.length)];
    };
    _0x1a2e8b = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].map(function (_0x1981a8) {
      return _0x1981a8.charCodeAt(0);
    });
    _0x4a5ec2.xa = function (_0x2d181) {
      if (_typeof(_0x2d181) == "undefined") {
        _0x2d181 = 16;
      }
      var _0x3fd559 = "";
      for (var _0x147f4a = 0; _0x147f4a < _0x2d181; _0x147f4a++) {
        _0x3fd559 += String.fromCharCode(_0x1a2e8b[_0x4a5ec2._(_0x4a5ec2.ma() * _0x1a2e8b.length)]);
      }
      ;
      return _0x3fd559;
    };
    _0x4a5ec2.ya = function (_0x54289e, _0x48c613, _0x2fdf1b) {
      var _0x2cf0f2 = _0x2fdf1b * (1 - _0x48c613 * 0.5);
      var _0x3e8c22 = Math.min(_0x2cf0f2, 1 - _0x2cf0f2);
      return _0x4a5ec2.za(_0x54289e, _0x3e8c22 ? (_0x2fdf1b - _0x2cf0f2) / _0x3e8c22 : 0, _0x2cf0f2);
    };
    _0x4a5ec2.za = function (_0x2df436, _0x3c4bed, _0x5db762) {
      var _0x5f5b47 = (1 - _0x4a5ec2.na(_0x5db762 * 2 - 1)) * _0x3c4bed;
      var _0x5c3cad = _0x5f5b47 * (1 - _0x4a5ec2.na(_0x2df436 / 60 % 2 - 1));
      var _0x1e1515 = _0x5db762 - _0x5f5b47 / 2;
      if (_0x2df436 >= 0 && _0x2df436 < 60) {
        return [_0x1e1515 + _0x5f5b47, _0x1e1515 + _0x5c3cad, _0x1e1515];
      } else if (_0x2df436 >= 60 && _0x2df436 < 120) {
        return [_0x1e1515 + _0x5c3cad, _0x1e1515 + _0x5f5b47, _0x1e1515];
      } else if (_0x2df436 >= 120 && _0x2df436 < 180) {
        return [_0x1e1515, _0x1e1515 + _0x5f5b47, _0x1e1515 + _0x5c3cad];
      } else if (_0x2df436 >= 180 && _0x2df436 < 240) {
        return [_0x1e1515, _0x1e1515 + _0x5c3cad, _0x1e1515 + _0x5f5b47];
      } else if (_0x2df436 >= 240 && _0x2df436 < 300) {
        return [_0x1e1515 + _0x5c3cad, _0x1e1515, _0x1e1515 + _0x5f5b47];
      } else {
        return [_0x1e1515 + _0x5f5b47, _0x1e1515, _0x1e1515 + _0x5c3cad];
      }
    };
    _0x4a5ec2.Aa = function (_0x214148, _0x3459df, _0x373623) {
      $.get(_0x214148).fail(_0x3459df).done(_0x373623);
    };
    _0x4a5ec2.Ba = function (_0x1b14ad, _0x5cd88f, _0x2c2a22, _0x730e72) {
      var _0x334ef6 = {
        type: "GET",
        url: _0x1b14ad
      };
      var _0x2dc054 = {
        responseType: "arraybuffer"
      };
      _0x2dc054.onprogress = function (_0x2e1fa5) {
        if (_0x2e1fa5.lengthComputable) {
          _0x730e72(_0x2e1fa5.loaded / _0x2e1fa5.total * 100);
        }
      };
      _0x334ef6.xhrFields = _0x2dc054;
      $.ajax(_0x334ef6).fail(_0x5cd88f).done(_0x2c2a22);
    };
    _0x4a5ec2.Ca = function () {
      return Date.now();
    };
    _0x4a5ec2.Da = function (_0x580963, _0x401f33) {
      for (var _0x150934 in _0x580963) {
        if (_0x580963.hasOwnProperty(_0x150934)) {
          _0x401f33(_0x150934, _0x580963[_0x150934]);
        }
      }
    };
    _0x4a5ec2.Ea = function (_0x207d35) {
      for (var _0x18c179 = _0x207d35.length - 1; _0x18c179 > 0; _0x18c179--) {
        var _0x74df71 = _0x4a5ec2._(_0x4a5ec2.ma() * (_0x18c179 + 1));
        var _0x2e3ce3 = _0x207d35[_0x18c179];
        _0x207d35[_0x18c179] = _0x207d35[_0x74df71];
        _0x207d35[_0x74df71] = _0x2e3ce3;
      }
      ;
      return _0x207d35;
    };
    _0x56b227.Fa = _0x4a5ec2.b("ArrayBuffer");
    _0x56b227.Ga = _0x4a5ec2.b("DataView");
    _0x56b227.Ha = function () {
      function _0x4cc574(_0x44b6df) {
        this.Ia = _0x44b6df;
        this.Ja = 0;
      }
      var _0x1fae9c = "getInt8";
      _0x4cc574.prototype.Ka = function () {
        var _0x31252c = this.Ia[_0x1fae9c](this.Ja);
        this.Ja += 1;
        return _0x31252c;
      };
      var _0x176b3 = "getInt16";
      _0x4cc574.prototype.La = function () {
        var _0x94daff = this.Ia[_0x176b3](this.Ja);
        this.Ja += 2;
        return _0x94daff;
      };
      var _0x5bf33f = "getInt32";
      _0x4cc574.prototype.Ma = function () {
        var _0x188fe6 = this.Ia[_0x5bf33f](this.Ja);
        this.Ja += 4;
        return _0x188fe6;
      };
      var _0x2f7bab = "getFloat32";
      _0x4cc574.prototype.Na = function () {
        var _0x3d262e = this.Ia[_0x2f7bab](this.Ja);
        this.Ja += 4;
        return _0x3d262e;
      };
      return _0x4cc574;
    }();
    _0x56b227.Oa = function () {
      function _0x1af5c2(_0x437c98) {
        this.Ia = _0x437c98;
        this.Ja = 0;
      }
      var _0x3858d1 = "setInt8";
      _0x1af5c2.prototype.Pa = function (_0x5b8419) {
        this.Ia[_0x3858d1](this.Ja, _0x5b8419);
        this.Ja += 1;
      };
      var _0x4f877d = "setInt16";
      _0x1af5c2.prototype.Qa = function (_0x4dba1d) {
        this.Ia[_0x4f877d](this.Ja, _0x4dba1d);
        this.Ja += 2;
      };
      return _0x1af5c2;
    }();
    _0x4a5ec2.Ra = function () {
      var _0x5aea1 = false;
      function _0x5e585e() {}
      var _0x554ebb = {};
      var _0x252c5e = "1eaom01c3pxu9wd3";
      var _0xf39b9d = $("#" + _0x252c5e);
      var _0x2250c3 = "JDHnkHtYwyXyVgG9";
      var _0x33461d = $("#" + _0x2250c3);
      $("#adbl-continue").click(function () {
        _0x33461d.fadeOut(500);
        _0x5e585e(false);
      });
      _0x554ebb.Sa = function (_0x37a577) {
        _0x5e585e = _0x37a577;
        if (!_0x5aea1) {
          try {
            aiptag.cmd.player.push(function () {
              var _0x5a337e = {
                AD_WIDTH: 960,
                AD_HEIGHT: 540,
                AD_FULLSCREEN: true,
                AD_CENTERPLAYER: false
              };
              _0x5a337e.LOADING_TEXT = "loading advertisement";
              _0x5a337e.PREROLL_ELEM = function () {
                return _0x56b227.d.getElementById(_0x252c5e);
              };
              _0x5a337e.AIP_COMPLETE = function (_0x52089e) {
                _0x5e585e(true);
                _0x3f64b5.f.h(_0xf39b9d, 1);
                _0x3f64b5.f.h(_0x33461d, 1);
                try {
                  ga("send", "event", "preroll", _0x2c8e1f.H.I + "_complete");
                } catch (_0x987b39) {}
              };
              _0x5a337e.AIP_REMOVE = function () {};
              aiptag.adplayer = new aipPlayer(_0x5a337e);
            });
            _0x5aea1 = true;
          } catch (_0x349b23) {}
        }
      };
      _0x554ebb.Ta = function () {
        if (_typeof(aiptag.adplayer) !== "undefined") {
          try {
            ga("send", "event", "preroll", _0x2c8e1f.H.I + "_request");
          } catch (_0x195d29) {}
          ;
          _0x3f64b5.f.g(_0xf39b9d, 1);
          if (!_0xafdd52.on) {
            aiptag.cmd.player.push(function () {
              aiptag.adplayer.startPreRoll();
            });
          }
        } else {
          try {
            ga("send", "event", "antiadblocker", _0x2c8e1f.H.I + "_start");
          } catch (_0x5aad7a) {}
          ;
          (function _0x5a257c() {
            $("#adbl-1").text(_0x4a5ec2.U("index.game.antiadblocker.msg1"));
            $("#adbl-2").text(_0x4a5ec2.U("index.game.antiadblocker.msg2"));
            $("#adbl-3").text(_0x4a5ec2.U("index.game.antiadblocker.msg3"));
            $("#adbl-4").text(_0x4a5ec2.U("index.game.antiadblocker.msg4").replace("{0}", 10));
            $("#adbl-continue span").text(_0x4a5ec2.U("index.game.antiadblocker.continue"));
            _0x3f64b5.f.h($("#adbl-continue"), 1);
            _0x3f64b5.f.g(_0x33461d, 500);
            var _0x1ea57f = 10;
            for (var _0x148695 = 0; _0x148695 < 10; _0x148695++) {
              _0x4a5ec2.Y(function () {
                _0x1ea57f--;
                $("#adbl-4").text(_0x4a5ec2.U("index.game.antiadblocker.msg4").replace("{0}", _0x1ea57f));
                if (_0x1ea57f === 0) {
                  try {
                    ga("send", "event", "antiadblocker", _0x2c8e1f.H.I + "_complete");
                  } catch (_0x4517dc) {}
                  ;
                  _0x3f64b5.f.g($("#adbl-continue"), 200);
                }
              }, (_0x148695 + 1) * 1000);
            }
          })();
        }
      };
      return _0x554ebb;
    };
    _0x4a5ec2.Ua = function (_0x3f8306, _0x23c7a2) {
      var _0x20a8a8 = $("#" + _0x3f8306);
      var _0xf44fcf = _0x23c7a2;
      var _0x152c84 = {};
      var _0x2e636f = false;
      _0x152c84.Sa = function () {
        if (!_0x2e636f) {
          _0x20a8a8.empty();
          _0x20a8a8.append("<div id='" + _0xf44fcf + "'></div>");
          try {
            try {
              ga("send", "event", "banner", _0x2c8e1f.H.I + "_display");
            } catch (_0x2fbf31) {}
            ;
            if (!_0xafdd52.on) {
              aiptag.cmd.display.push(function () {
                aipDisplayTag.display(_0xf44fcf);
              });
            }
            _0x2e636f = true;
          } catch (_0x5336c6) {}
        }
      };
      _0x152c84.Va = function () {
        try {
          try {
            ga("send", "event", "banner", _0x2c8e1f.H.I + "_refresh");
          } catch (_0x5db325) {}
          ;
          if (!_0xafdd52.on) {
            aiptag.cmd.display.push(function () {
              aipDisplayTag.display(_0xf44fcf);
            });
          }
        } catch (_0x560d6e) {}
      };
      return _0x152c84;
    };
    _0x56b227.Wa = function () {
      function _0x5d01e9(_0x2718e1, _0xce09dc, _0x303738, _0x295e88, _0xfd027c, _0x591a57, _0x5d6f0d, _0x4fda75, _0x4480fe, _0x562b3d) {
        this.Xa = _0x2718e1;
        this.Ya = _0xce09dc;
        this.Za = null;
        this.$a = false;
        this._a = _0x303738;
        this.ab = _0x295e88;
        this.bb = _0xfd027c;
        this.cb = _0x591a57;
        this.db = _0x5d6f0d || (_0x4480fe || _0xfd027c) / 2;
        this.eb = _0x4fda75 || (_0x562b3d || _0x591a57) / 2;
        this.fb = _0x4480fe || _0xfd027c;
        this.gb = _0x562b3d || _0x591a57;
        this.hb = 0.5 - (this.db - this.fb * 0.5) / this.bb;
        this.ib = 0.5 - (this.eb - this.gb * 0.5) / this.cb;
        this.jb = this.bb / this.fb;
        this.kb = this.cb / this.gb;
      }
      _0x5d01e9.lb = function () {
        return new _0x5d01e9("", null, 0, 0, 0, 0, 0, 0, 0, 0);
      };
      _0x5d01e9.mb = function (_0x45980c, _0x3a2087, _0x2aec6f) {
        return new _0x5d01e9(_0x45980c, _0x3a2087, _0x2aec6f.x, _0x2aec6f.y, _0x2aec6f.w, _0x2aec6f.h, _0x2aec6f.px, _0x2aec6f.py, _0x2aec6f.pw, _0x2aec6f.ph);
      };
      _0x5d01e9.prototype.nb = function () {
        if (!this.$a) {
          if (this.Ya != null) {
            this.Za = new _0x3f64b5.k.n(this.Ya, new _0x3f64b5.k.r(this._a, this.ab, this.bb, this.cb));
          }
          this.$a = true;
        }
        return this.Za;
      };
      _0x5d01e9.prototype.ob = function () {
        if (this.Za != null) {
          this.Za.destroy();
        }
      };
      return _0x5d01e9;
    }();
    _0x56b227.pb = function () {
      function _0x43fd28(_0x3c53e2, _0xe116be, _0x26b6e1, _0x3e0b7c, _0x308d44, _0x57e985, _0x31edfa, _0x399ed9, _0x46359b, _0xc07ebf, _0x594571, _0x166a35, _0x55841d, _0x216081, _0x468133, _0x111010, _0x2c76af, _0x3c9f66) {
        this.qb = _0x3c53e2;
        this.rb = _0xe116be;
        this.sb = _0x26b6e1;
        this.tb = _0x3e0b7c;
        this.ub = _0x308d44;
        this.vb = _0x57e985;
        this.wb = _0x31edfa;
        this.xb = _0x399ed9;
        this.yb = _0x46359b;
        this.zb = _0xc07ebf;
        this.Ab = _0x594571;
        this.Bb = _0x166a35;
        this.Cb = _0x55841d;
        this.Db = _0x216081;
        this.Eb = _0x468133;
        this.Fb = _0x111010;
        this.Gb = _0x2c76af;
        this.Hb = _0x3c9f66;
      }
      _0x43fd28.prototype.ob = function () {
        for (var _0x1344a1 = 0; _0x1344a1 < this.qb.length; _0x1344a1++) {
          this.qb[_0x1344a1].dispose();
          this.qb[_0x1344a1].destroy();
        }
        ;
        this.qb = [];
        for (var _0x5982f6 = 0; _0x5982f6 < this.rb.length; _0x5982f6++) {
          this.rb[_0x5982f6].ob();
        }
        ;
        this.rb = [];
      };
      _0x43fd28.lb = function () {
        var _0x365f68 = new _0x43fd28.Ib(_0x56b227.Kb.Jb, _0x56b227.Kb.Jb);
        var _0xa8a2e4 = new _0x43fd28.Lb("#ffffff", [_0x56b227.Kb.Jb], [_0x56b227.Kb.Jb]);
        return new _0x43fd28([], [], {}, _0x365f68, {}, new _0x43fd28.Mb(_0x56b227.Kb.Jb), {}, _0xa8a2e4, {}, new _0x43fd28.Nb("", _0xa8a2e4, _0x365f68), {}, new _0x43fd28.Ob([_0x56b227.Kb.Jb]), {}, new _0x43fd28.Ob([_0x56b227.Kb.Jb]), {}, new _0x43fd28.Ob([_0x56b227.Kb.Jb]), {}, new _0x43fd28.Ob([_0x56b227.Kb.Jb]));
      };
      _0x43fd28.Pb = function (_0x198002, _0x4d3579, _0x5b33fa, _0xf5eff9) {
        var _0x9cfaa9 = new _0x43fd28.Ib(_0x56b227.Kb.Jb, _0x56b227.Kb.Jb);
        var _0x41a58e = new _0x43fd28.Lb("#ffffff", [_0x198002], [_0x4d3579]);
        return new _0x43fd28([], [], {}, _0x9cfaa9, {}, new _0x43fd28.Mb(_0x56b227.Kb.Jb), {}, _0x41a58e, {}, new _0x43fd28.Nb("", _0x41a58e, _0x9cfaa9), {}, new _0x43fd28.Ob([_0x5b33fa]), {}, new _0x43fd28.Ob([_0xf5eff9]), {}, new _0x43fd28.Ob([_0x56b227.Kb.Jb]), {}, new _0x43fd28.Ob([_0x56b227.Kb.Jb]));
      };
      _0x43fd28.Qb = function (_0x163657, _0x5d1b4d, _0x40cb87, _0x579bba) {
        var _0x2b1731 = {};
        _0x4a5ec2.Da(_0x163657.colorDict, function (_0x4fe9ac, _0x205a27) {
          _0x2b1731[_0x4fe9ac] = "#" + _0x205a27;
        });
        var _0x1a21df = {};
        for (var _0x34fd89 = 0; _0x34fd89 < _0x163657.skinArrayDict.length; _0x34fd89++) {
          var _0x2319c4 = _0x163657.skinArrayDict[_0x34fd89];
          _0x1a21df[_0x2319c4.id] = new _0x43fd28.Lb(_0x2b1731[_0x2319c4.prime], _0x2319c4.base.map(function (_0x611ed5) {
            return _0x5d1b4d[_0x611ed5];
          }), _0x2319c4.glow.map(function (_0x211612) {
            return _0x5d1b4d[_0x211612];
          }));
        }
        ;
        var _0x1a2532;
        var _0x58093a = _0x163657.skinUnknown;
        _0x1a2532 = new _0x43fd28.Lb(_0x2b1731[_0x58093a.prime], _0x58093a.base.map(function (_0x3e47fd) {
          return _0x5d1b4d[_0x3e47fd];
        }), _0x58093a.glow.map(function (_0x58303e) {
          return _0x5d1b4d[_0x58303e];
        }));
        var _0x19b219 = {};
        _0x4a5ec2.Da(_0x163657.eyesDict, function (_0xb8a125, _0x570ae9) {
          _0x19b219[parseInt(_0xb8a125)] = new _0x43fd28.Ob(_0x570ae9.base.map(function (_0x167ffa) {
            return _0x5d1b4d[_0x167ffa.region];
          }));
        });
        var _0x3bf6af = new _0x43fd28.Ob(_0x163657.eyesUnknown.base.map(function (_0x11ff58) {
          return _0x5d1b4d[_0x11ff58.region];
        }));
        var _0x1e5afd = {};
        _0x4a5ec2.Da(_0x163657.mouthDict, function (_0x754fbc, _0x33bda5) {
          _0x1e5afd[parseInt(_0x754fbc)] = new _0x43fd28.Ob(_0x33bda5.base.map(function (_0x33f08e) {
            return _0x5d1b4d[_0x33f08e.region];
          }));
        });
        var _0x2ecb40 = new _0x43fd28.Ob(_0x163657.mouthUnknown.base.map(function (_0x2cf9fa) {
          return _0x5d1b4d[_0x2cf9fa.region];
        }));
        var _0x14f3e6 = {};
        _0x4a5ec2.Da(_0x163657.hatDict, function (_0x2324d0, _0x5a2583) {
          _0x14f3e6[parseInt(_0x2324d0)] = new _0x43fd28.Ob(_0x5a2583.base.map(function (_0x2fe61f) {
            return _0x5d1b4d[_0x2fe61f.region];
          }));
        });
        var _0x20c4d6 = new _0x43fd28.Ob(_0x163657.hatUnknown.base.map(function (_0xefbf7a) {
          return _0x5d1b4d[_0xefbf7a.region];
        }));
        var _0x42ee5f = {};
        _0x4a5ec2.Da(_0x163657.glassesDict, function (_0x415325, _0x39c834) {
          _0x42ee5f[parseInt(_0x415325)] = new _0x43fd28.Ob(_0x39c834.base.map(function (_0x4c393e) {
            return _0x5d1b4d[_0x4c393e.region];
          }));
        });
        var _0x2d0548 = new _0x43fd28.Ob(_0x163657.glassesUnknown.base.map(function (_0xfbc34a) {
          return _0x5d1b4d[_0xfbc34a.region];
        }));
        var _0x1ddde6 = {};
        _0x4a5ec2.Da(_0x163657.portionDict, function (_0x478e3a, _0x2379fa) {
          _0x1ddde6[_0x478e3a = parseInt(_0x478e3a)] = new _0x43fd28.Ib(_0x5d1b4d[_0x2379fa.base], _0x5d1b4d[_0x2379fa.glow]);
        });
        var _0x1a83ef;
        var _0xde4f95 = _0x163657.portionUnknown;
        _0x1a83ef = new _0x43fd28.Ib(_0x5d1b4d[_0xde4f95.base], _0x5d1b4d[_0xde4f95.glow]);
        var _0x1102fb = {};
        _0x4a5ec2.Da(_0x163657.abilityDict, function (_0x430414, _0x2c4cc6) {
          _0x1102fb[_0x430414 = parseInt(_0x430414)] = new _0x43fd28.Mb(_0x5d1b4d[_0x2c4cc6.base]);
        });
        var _0x270e3f;
        var _0x3fa5bc = _0x163657.abilityUnknown;
        _0x270e3f = new _0x43fd28.Mb(_0x5d1b4d[_0x3fa5bc.base]);
        var _0x3aa944 = {};
        _0x4a5ec2.Da(_0x163657.teamDict, function (_0x1d50e2, _0x330001) {
          _0x3aa944[_0x1d50e2 = parseInt(_0x1d50e2)] = new _0x43fd28.Nb(_0x330001.title, new _0x43fd28.Lb(_0x2b1731[_0x330001.skin.prime], null, _0x330001.skin.glow.map(function (_0x2804b4) {
            return _0x5d1b4d[_0x2804b4];
          })), new _0x43fd28.Ib(null, _0x5d1b4d[_0x330001.portion.glow]));
        });
        var _0x3f9114 = new _0x43fd28.Nb({}, _0x1a2532, _0x1a83ef);
        return new _0x43fd28(_0x40cb87, _0x579bba, _0x1ddde6, _0x1a83ef, _0x1102fb, _0x270e3f, _0x1a21df, _0x1a2532, _0x3aa944, _0x3f9114, _0x19b219, _0x3bf6af, _0x1e5afd, _0x2ecb40, _0x14f3e6, _0x20c4d6, _0x42ee5f, _0x2d0548);
      };
      _0x43fd28.prototype.Rb = function (_0xef4013) {
        var _0x4a3806 = _0x4a5ec2.Ea(Object.keys(this.wb)).slice(0, _0xef4013);
        var _0x5b6b82 = _0x4a5ec2.Ea(Object.keys(this.Ab)).slice(0, _0xef4013);
        var _0x451c3c = _0x4a5ec2.Ea(Object.keys(this.Cb)).slice(0, _0xef4013);
        var _0x1a62ca = _0x4a5ec2.Ea(Object.keys(this.Eb)).slice(0, _0xef4013);
        var _0x488f13 = _0x4a5ec2.Ea(Object.keys(this.Gb)).slice(0, _0xef4013);
        var _0x57d649 = [];
        for (var _0x3d9c2c = 0; _0x3d9c2c < _0xef4013; _0x3d9c2c++) {
          var _0x6a6f49 = _0x4a3806.length > 0 ? _0x4a3806[_0x3d9c2c % _0x4a3806.length] : 0;
          var _0x24199e = _0x5b6b82.length > 0 ? _0x5b6b82[_0x3d9c2c % _0x5b6b82.length] : 0;
          var _0x18f631 = _0x451c3c.length > 0 ? _0x451c3c[_0x3d9c2c % _0x451c3c.length] : 0;
          var _0x3c68a9 = _0x1a62ca.length > 0 ? _0x1a62ca[_0x3d9c2c % _0x1a62ca.length] : 0;
          var _0x135f8e = _0x488f13.length > 0 ? _0x488f13[_0x3d9c2c % _0x488f13.length] : 0;
          _0x57d649.push(new _0x56b227.Sb(_0x6a6f49, _0x24199e, _0x18f631, _0x3c68a9, _0x135f8e));
        }
        ;
        return _0x57d649;
      };
      _0x43fd28.prototype.Tb = function (_0x2de42c) {
        if (this.wb.hasOwnProperty(_0x2de42c)) {
          return this.wb[_0x2de42c];
        } else {
          return this.xb;
        }
      };
      _0x43fd28.prototype.Ub = function (_0x5c0373) {
        if (this.yb.hasOwnProperty(_0x5c0373)) {
          return this.yb[_0x5c0373];
        } else {
          return this.zb;
        }
      };
      _0x43fd28.prototype.Vb = function (_0x5b1f5d) {
        if (this.Ab.hasOwnProperty(_0x5b1f5d)) {
          return this.Ab[_0x5b1f5d];
        } else {
          return this.Bb;
        }
      };
      _0x43fd28.prototype.Wb = function (_0x29e97c) {
        if (this.Cb.hasOwnProperty(_0x29e97c)) {
          return this.Cb[_0x29e97c];
        } else {
          return this.Db;
        }
      };
      _0x43fd28.prototype.Xb = function (_0xfb70f9) {
        if (this.Gb.hasOwnProperty(_0xfb70f9)) {
          return this.Gb[_0xfb70f9];
        } else {
          return this.Hb;
        }
      };
      _0x43fd28.prototype.Yb = function (_0x5f1bea) {
        if (this.Eb.hasOwnProperty(_0x5f1bea)) {
          return this.Eb[_0x5f1bea];
        } else {
          return this.Fb;
        }
      };
      _0x43fd28.prototype.Zb = function (_0x1468bd) {
        if (this.sb.hasOwnProperty(_0x1468bd)) {
          return this.sb[_0x1468bd];
        } else {
          return this.tb;
        }
      };
      _0x43fd28.prototype.$b = function (_0xc14009) {
        if (this.ub.hasOwnProperty(_0xc14009)) {
          return this.ub[_0xc14009];
        } else {
          return this.vb;
        }
      };
      _0x43fd28.Nb = function _0x6134bc(_0x36827d, _0xb095ec, _0x49b304) {
        this._b = _0x36827d;
        this.ac = _0xb095ec;
        this.bc = _0x49b304;
      };
      _0x43fd28.Lb = function _0x32e6c3(_0x2719be, _0x42fdfe, _0x15b32b) {
        this.cc = _0x2719be;
        this.dc = _0x42fdfe;
        this.ec = _0x15b32b;
      };
      _0x43fd28.Ob = function _0x5a67ed(_0x57b891) {
        this.dc = _0x57b891;
      };
      _0x43fd28.Ib = function _0xbb1da1(_0x24c731, _0x1e2bf8) {
        this.dc = _0x24c731;
        this.ec = _0x1e2bf8;
      };
      _0x43fd28.Mb = function _0x592ce3(_0x4ef5d8) {
        this.dc = _0x4ef5d8;
      };
      return _0x43fd28;
    }();
    _0x56b227.Kb = function () {
      function _0x2e047f() {
        var _0xc26ae = _0x3f64b5.k.m.from("/images/wear-ability.png");
        this.fc = new _0x56b227.Wa("magnet_ability", _0xc26ae, 158, 86, 67, 124, 148, 63.5, 128, 128);
        this.gc = new _0x56b227.Wa("velocity_ability", _0xc26ae, 158, 4, 87, 74, 203, 63.5, 128, 128);
        this.hc = new _0x56b227.Wa("flex_ability", _0xc26ae, 4, 4, 146, 146, 63.5, 63.5, 128, 128);
        var _0x52f0e4 = _0x3f64b5.k.m.from("https://i.imgur.com/LFiCido.png");
        this.pwrFlex = new _0x56b227.Wa("flex_ability", _0x52f0e4, 156, 140, 87, 60, 170, 128.5, 128, 128);
        var _0x4845ca;
        var _0x2abe73 = _0x3f64b5.k.m.from("/images/def-look.png");
        var _0x287f0b = new _0x56b227.Wa("def_eyes", _0x2abe73, 0, 0, 42, 80, 75, 64, 128, 128);
        var _0x3cdd45 = new _0x56b227.Wa("def_mouth", _0x2abe73, 46, 0, 20, 48, 109, 63, 128, 128);
        var _0x11e583 = new _0x56b227.Wa("def_skin_glow", _0x2abe73, 70, 0, 32, 32, 0, 0, 0, 0);
        var _0x17aa68 = new _0x56b227.Wa("def_skin_base", _0x2abe73, 46, 52, 64, 64, 0, 0, 0, 0);
        var _0x10a5c3 = _0x56b227.pb.Pb(_0x17aa68, _0x11e583, _0x287f0b, _0x3cdd45);
        this.ic = new _0x56b227.jc({}, _0x10a5c3);
        this.kc = -10000;
        this.lc = -10000;
        this.mc = ((_0x4845ca = _0x56b227.c.document.createElement("canvas")).width = 80, _0x4845ca.height = 80, {
          nc: _0x4845ca,
          oc: _0x4845ca.getContext("2d"),
          Za: new _0x3f64b5.k.n(_0x3f64b5.k.m.from(_0x4845ca))
        });
        this.pc = null;
        this.qc = [];
      }
      _0x2e047f.Jb = _0x56b227.Wa.lb();
      _0x2e047f.prototype.Sa = function () {};
      _0x2e047f.prototype.rc = function (_0x36597f, _0x331116, _0x24ed32) {
        var _0x5d9962 = this;
        var _0x4ff641 = this.ic.sc();
        if (_0x4ff641 > 0 && _0x4a5ec2.Ca() - this.kc < 1200000) {
          if (_0x36597f != null) {
            _0x36597f();
          }
          return;
        }
        ;
        if (this.pc != null && !this.pc.tc()) {
          if (_0x4a5ec2.Ca() - this.kc < 300000) {
            if (_0x36597f != null) {
              _0x36597f();
            }
            return;
          }
          ;
          this.pc.uc();
          this.pc = null;
        }
        ;
        var _0x368fa6 = new _0x56b227.vc(_0x4ff641);
        _0x368fa6.wc(function (_0x41ab74, _0x3cdbcb) {
          if (_0x368fa6 === _0x5d9962.pc && _0x24ed32 != null) {
            _0x24ed32(_0x41ab74, _0x3cdbcb);
          }
        });
        _0x368fa6.xc(function (_0x2b4b43) {
          if (_0x368fa6 === _0x5d9962.pc && _0x331116 != null) {
            _0x331116(_0x2b4b43);
          }
        });
        _0x368fa6.yc(function () {
          if (_0x368fa6 === _0x5d9962.pc && _0x331116 != null) {
            _0x331116(Error());
          }
        });
        _0x368fa6.zc(function () {
          if (_0x368fa6 === _0x5d9962.pc && _0x36597f != null) {
            _0x36597f();
          }
        });
        _0x368fa6.Ac(function (_0x11361c) {
          if (_0x368fa6 === _0x5d9962.pc) {
            _0x5d9962.lc = _0x4a5ec2.Ca();
            _0x5d9962.pc = null;
            _0x5d9962.Bc();
            _0x5d9962.ic.Cc().ob();
            _0x5d9962.ic = _0x11361c;
            if (_0x36597f != null) {
              _0x36597f();
            }
            _0x5d9962.Dc();
            return;
          }
          ;
          try {
            _0x11361c.Cc().ob();
          } catch (_0xee9aaf) {}
        });
        _0x368fa6.Ec();
        this.kc = _0x4a5ec2.Ca();
        this.pc = _0x368fa6;
      };
      _0x2e047f.prototype.Bc = function () {};
      _0x2e047f.prototype.Fc = function () {
        return this.ic.sc() > 0;
      };
      _0x2e047f.prototype.Gc = function () {
        return this.ic.Hc();
      };
      _0x2e047f.prototype.Ic = function () {
        return this.mc;
      };
      _0x2e047f.prototype.Jc = function (_0x448e93) {
        this.qc.push(_0x448e93);
      };
      _0x2e047f.prototype.Dc = function () {
        for (var _0x351139 = 0; _0x351139 < this.qc.length; _0x351139++) {
          this.qc[_0x351139]();
        }
      };
      _0x2e047f.prototype.Cc = function () {
        return this.ic.Cc();
      };
      return _0x2e047f;
    }();
    _0x56b227.Kc = function () {
      function _0x5701dc(_0x558d61) {
        this.Lc = _0x558d61;
      }
      _0x5701dc.prototype.Mc = function (_0x1b2adb) {
        return this.Lc[_0x1b2adb];
      };
      _0x5701dc.Nc = function () {
        function _0x5ceda8() {
          this.Oc = [];
        }
        _0x5ceda8.prototype.Pc = function (_0x3152e9, _0x20436f) {
          for (var _0x1bf418 = 0; _0x1bf418 < this.Oc.length; _0x1bf418++) {
            if (this.Oc[_0x1bf418].Qc === _0x3152e9) {
              throw Error();
            }
          }
          ;
          this.Oc.push(new _0x5701dc.Rc(_0x3152e9, _0x20436f));
          return this;
        };
        _0x5ceda8.prototype.Sc = function () {
          var _0x207f14 = 0;
          for (var _0x48759b = 0; _0x48759b < this.Oc.length; _0x48759b++) {
            _0x207f14 += this.Oc[_0x48759b].Tc;
          }
          ;
          var _0x487da8 = {};
          var _0x38fbc1 = 0;
          for (var _0x41519b = 0; _0x41519b < this.Oc.length; _0x41519b++) {
            var _0x10e37d = this.Oc[_0x41519b];
            _0x10e37d.Tc = _0x10e37d.Tc / _0x207f14;
            _0x10e37d.Uc = _0x38fbc1;
            _0x10e37d.Vc = _0x38fbc1 + _0x10e37d.Tc;
            _0x38fbc1 = _0x10e37d.Vc;
            _0x487da8[_0x10e37d.Qc] = _0x10e37d;
          }
          ;
          return new _0x5701dc(_0x487da8);
        };
        return _0x5ceda8;
      }();
      _0x5701dc.Rc = function () {
        function _0x5e2767(_0x443071, _0x4dc818) {
          this.Qc = _0x443071;
          this.Tc = _0x4dc818;
          this.Uc = 0;
          this.Vc = 0;
        }
        _0x5e2767.prototype.Wc = function (_0x4f824a) {
          return this.Uc + (this.Vc - this.Uc) * _0x4f824a;
        };
        return _0x5e2767;
      }();
      return _0x5701dc;
    }();
    _0x56b227.Xc = function () {
      function _0x3b4496() {
        this.Yc = new _0x3f64b5.k.l();
        this.Yc.sortableChildren = true;
        this.Zc = new _0x19acad();
        this.Zc.zIndex = _0x3aaf93 * ((_0x1656e5 + 1) * 2 + 1 + 3);
        this.$c = 0;
        this._c = Array(_0x1656e5);
        this._c[0] = this.ad(0, new _0x56b227.bd(), new _0x56b227.bd());
        for (var _0x2d260e = 1; _0x2d260e < _0x1656e5; _0x2d260e++) {
          this._c[_0x2d260e] = this.ad(_0x2d260e, new _0x56b227.bd(), new _0x56b227.bd());
        }
        ;
        this.cd = 0;
        this.dd = 0;
        this.ed = 0;
      }
      var _0x4ae21f;
      var _0x3aaf93 = 0.001;
      var _0x1656e5 = 797;
      var _0x813022 = _0x2c8e1f.T * 0.1;
      _0x3b4496.fd = _0x1656e5;
      _0x3b4496.prototype.ad = function (_0x83edc0, _0xc00d7d, _0x50202b) {
        var _0xeafc4c = new _0x1b3abe(_0xc00d7d, _0x50202b);
        _0xc00d7d.gd.zIndex = _0x3aaf93 * ((_0x1656e5 - _0x83edc0) * 2 + 1 + 3);
        _0x50202b.gd.zIndex = _0x3aaf93 * ((_0x1656e5 - _0x83edc0) * 2 - 2 + 3);
        return _0xeafc4c;
      };
      _0x3b4496.prototype.hd = function (_0x5317f7, _0x487b5b, _0x57df73, _0xd39379, _0x4c4bed, _0x979f4b, _0x5aa2c5, _0x414159) {
        var _0x3068d6 = _0x57df73.dc;
        var _0x56d4f0 = _0x5317f7 === _0x56b227.jd.id ? _0x487b5b.ac.ec : _0x57df73.ec;
        if (_0x3068d6.length > 0 && _0x56d4f0.length > 0) {
          for (var _0x2c05f0 = 0; _0x2c05f0 < this._c.length; _0x2c05f0++) {
            this._c[_0x2c05f0].ld.kd(_0x3068d6[_0x2c05f0 % _0x3068d6.length]);
            this._c[_0x2c05f0].md.kd(_0x56d4f0[_0x2c05f0 % _0x56d4f0.length]);
            this._c[_0x2c05f0].ld.nd(_0x414159);
            this._c[_0x2c05f0].md.nd(_0x414159);
          }
        }
        ;
        this.Zc.hd(_0xd39379, _0x4c4bed, _0x979f4b, _0x5aa2c5);
      };
      (_0x4ae21f = _0x4a5ec2.ca(_0x3f64b5.k.l, function () {
        _0x3f64b5.k.l.call(this);
        this.sortableChildren = true;
        this.od = [];
        this.pd = [];
        this.qd = [];
        this.rd = [];
        this.sd = new _0x3f64b5.k.l();
        this.td = [];
        for (var _0x5411f6 = 0; _0x5411f6 < 4; _0x5411f6++) {
          var _0xffa7bf = new _0x56b227.bd();
          _0xffa7bf.kd(ooo.ud.fc);
          this.sd.addChild(_0xffa7bf.gd);
          this.td.push(_0xffa7bf);
        }
        ;
        this.sd.zIndex = 0.0011;
        this.addChild(this.sd);
        this.vd();
        this.wd = new _0x56b227.bd();
        this.wd.kd(ooo.ud.gc);
        this.wd.gd.zIndex = 0.001;
        this.addChild(this.wd.gd);
        this.xd();
        this.pwr_flex = new _0x56b227.bd();
        this.pwr_flex.kd(ooo.ud.pwrFlex);
        this.pwr_flex.gd.zIndex = 0.001;
        this.addChild(this.pwr_flex.gd);
        this.disableFlex();
      })).prototype.hd = function (_0x2535b1, _0x2673cd, _0x50a2d3, _0x4aa126) {
        this.yd(0.002, this.od, _0x2535b1.dc);
        this.yd(0.003, this.pd, _0x2673cd.dc);
        this.yd(0.004, this.rd, _0x4aa126.dc);
        this.yd(0.005, this.qd, _0x50a2d3.dc);
      };
      _0x4ae21f.prototype.yd = function (_0x4e4ede, _0x5d8d9e, _0x35412a) {
        while (_0x35412a.length > _0x5d8d9e.length) {
          var _0x17a074 = new _0x56b227.bd();
          _0x5d8d9e.push(_0x17a074);
          this.addChild(_0x17a074.zd());
        }
        ;
        while (_0x35412a.length < _0x5d8d9e.length) {
          _0x5d8d9e.pop().G();
        }
        ;
        var _0x4ea189 = _0x4e4ede;
        for (var _0x4b9fde = 0; _0x4b9fde < _0x35412a.length; _0x4b9fde++) {
          _0x4ea189 += 0.0001;
          var _0x2219ac = _0x5d8d9e[_0x4b9fde];
          _0x2219ac.kd(_0x35412a[_0x4b9fde]);
          _0x2219ac.gd.zIndex = _0x4ea189;
        }
      };
      _0x4ae21f.prototype.Ad = function (_0x426906, _0x2ab0d7, _0x28a3e9, _0x103767) {
        this.visible = true;
        this.position.set(_0x426906, _0x2ab0d7);
        this.rotation = _0x103767;
        for (var _0x45c535 = 0; _0x45c535 < this.od.length; _0x45c535++) {
          this.od[_0x45c535].Bd(_0x28a3e9);
        }
        ;
        for (var _0x3807fd = 0; _0x3807fd < this.pd.length; _0x3807fd++) {
          this.pd[_0x3807fd].Bd(_0x28a3e9);
        }
        ;
        for (var _0x2fe750 = 0; _0x2fe750 < this.qd.length; _0x2fe750++) {
          this.qd[_0x2fe750].Bd(_0x28a3e9);
        }
        ;
        for (var _0x164e6d = 0; _0x164e6d < this.rd.length; _0x164e6d++) {
          this.rd[_0x164e6d].Bd(_0x28a3e9);
        }
      };
      _0x4ae21f.prototype.Cd = function () {
        this.visible = false;
      };
      _0x4ae21f.prototype.Dd = function (_0x1416c7, _0x1ce51c, _0x364a97, _0x786c4b) {
        this.sd.visible = true;
        var _0x26e1aa = _0x364a97 / 1000;
        var _0x19ea60 = 1 / this.td.length;
        for (var _0x3cceb5 = 0; _0x3cceb5 < this.td.length; _0x3cceb5++) {
          var _0x22cc40 = 1 - (_0x26e1aa + _0x19ea60 * _0x3cceb5) % 1;
          this.td[_0x3cceb5].gd.alpha = 1 - _0x22cc40;
          this.td[_0x3cceb5].Bd(_0x1ce51c * (0.5 + _0x22cc40 * 4.5));
        }
      };
      _0x4ae21f.prototype.vd = function () {
        this.sd.visible = false;
      };
      _0x4ae21f.prototype.Ed = function (_0x2ff176, _0x1ad90a, _0x4c6d69, _0x54834f) {
        this.wd.gd.visible = _0x40085c.vp;
        this.wd.gd.alpha = _0x4a5ec2.ga(this.wd.gd.alpha, _0x2ff176.Fd ? 0.9 : 0.2, _0x54834f, 0.0025);
        this.wd.Bd(_0x1ad90a);
      };
      _0x4ae21f.prototype.xd = function () {
        this.wd.gd.visible = false;
      };
      _0x4ae21f.prototype.activeFlex = function (_0xe5cd87, _0x5b6d5b, _0x48e5fa, _0x1a1445) {
        this.pwr_flex.gd.visible = _0x40085c.flx;
        this.pwr_flex.gd.alpha = _0x4a5ec2.ga(this.wd.gd.alpha, _0xe5cd87.Fd ? 0.9 : 0.2, _0x1a1445, 0.0025);
        this.pwr_flex.Bd(_0x5b6d5b);
      };
      _0x4ae21f.prototype.disableFlex = function () {
        this.pwr_flex.gd.visible = false;
      };
      var _0x19acad = _0x4ae21f;
      _0x3b4496.prototype.Gd = function (_0x368e67) {
        return this.dd + this.ed * _0x4a5ec2.oa(_0x368e67 * _0x813022 - this.cd);
      };
      _0x3b4496.prototype.Hd = function (_0x1b67e2, _0x1c23c4, _0x17a3c0, _0xbc53e9) {
        var _0x40912d;
        var _0x3e19cf;
        var _0x3ff55d;
        var _0x3d279f;
        var _0x5b1865;
        var _0x4c4b7e;
        var _0x2ca6af;
        var _0x2518c7;
        var _0x247636 = _0x1b67e2.Id * 2;
        var _0x5a7dbb = _0x1b67e2.Jd;
        var _0x36755b = _0x1b67e2.Kd;
        var _0x36b191 = _0x36755b * 4 - 3;
        var _0x39f322 = _0x36b191;
        this.cd = _0x1c23c4 / 400 * _0x2c8e1f.T;
        this.dd = _0x247636 * 1.5;
        this.ed = _0x247636 * 0.15 * _0x1b67e2.Ld;
        if (_0xbc53e9(_0x3e19cf = _0x5a7dbb[0], _0x4c4b7e = _0x5a7dbb[1])) {
          _0x3ff55d = _0x5a7dbb[2];
          _0x2ca6af = _0x5a7dbb[3];
          _0x3d279f = _0x5a7dbb[4];
          _0x2518c7 = _0x5a7dbb[5];
          var _0x57b1bb = _0x4a5ec2.ta(_0x2518c7 + _0x4c4b7e * 2 - _0x2ca6af * 3, _0x3d279f + _0x3e19cf * 2 - _0x3ff55d * 3);
          this.Zc.Ad(_0x3e19cf, _0x4c4b7e, _0x247636, _0x57b1bb);
          this._c[0].Ad(_0x3e19cf, _0x4c4b7e, _0x247636, this.Gd(0), _0x57b1bb);
          this._c[1].Ad(_0x3e19cf * 0.64453125 + _0x3ff55d * 0.45703125 + _0x3d279f * -0.1015625, _0x4c4b7e * 0.64453125 + _0x2ca6af * 0.45703125 + _0x2518c7 * -0.1015625, _0x247636, this.Gd(1), _0x1b3abe.Md(this._c[0], this._c[2]));
          this._c[2].Ad(_0x3e19cf * 0.375 + _0x3ff55d * 0.75 + _0x3d279f * -0.125, _0x4c4b7e * 0.375 + _0x2ca6af * 0.75 + _0x2518c7 * -0.125, _0x247636, this.Gd(2), _0x1b3abe.Md(this._c[1], this._c[3]));
          this._c[3].Ad(_0x3e19cf * 0.15234375 + _0x3ff55d * 0.94921875 + _0x3d279f * -0.1015625, _0x4c4b7e * 0.15234375 + _0x2ca6af * 0.94921875 + _0x2518c7 * -0.1015625, _0x247636, this.Gd(3), _0x1b3abe.Md(this._c[2], this._c[4]));
        } else {
          this.Zc.Cd();
          this._c[0].Cd();
          this._c[1].Cd();
          this._c[2].Cd();
          this._c[3].Cd();
        }
        ;
        var _0x1d1b3d = 4;
        for (var _0x15701d = 2, _0x40a218 = _0x36755b * 2 - 4; _0x15701d < _0x40a218; _0x15701d += 2) {
          if (_0xbc53e9(_0x3e19cf = _0x5a7dbb[_0x15701d], _0x4c4b7e = _0x5a7dbb[_0x15701d + 1])) {
            _0x40912d = _0x5a7dbb[_0x15701d - 2];
            _0x5b1865 = _0x5a7dbb[_0x15701d - 1];
            _0x3ff55d = _0x5a7dbb[_0x15701d + 2];
            _0x2ca6af = _0x5a7dbb[_0x15701d + 3];
            _0x3d279f = _0x5a7dbb[_0x15701d + 4];
            _0x2518c7 = _0x5a7dbb[_0x15701d + 5];
            this._c[_0x1d1b3d].Ad(_0x3e19cf, _0x4c4b7e, _0x247636, this.Gd(_0x1d1b3d), _0x1b3abe.Md(this._c[_0x1d1b3d - 1], this._c[_0x1d1b3d + 1]));
            _0x1d1b3d++;
            this._c[_0x1d1b3d].Ad(_0x40912d * -0.06640625 + _0x3e19cf * 0.84375 + _0x3ff55d * 0.2578125 + _0x3d279f * -0.03515625, _0x5b1865 * -0.06640625 + _0x4c4b7e * 0.84375 + _0x2ca6af * 0.2578125 + _0x2518c7 * -0.03515625, _0x247636, this.Gd(_0x1d1b3d), _0x1b3abe.Md(this._c[_0x1d1b3d - 1], this._c[_0x1d1b3d + 1]));
            _0x1d1b3d++;
            this._c[_0x1d1b3d].Ad(_0x40912d * -0.0625 + _0x3e19cf * 0.5625 + _0x3ff55d * 0.5625 + _0x3d279f * -0.0625, _0x5b1865 * -0.0625 + _0x4c4b7e * 0.5625 + _0x2ca6af * 0.5625 + _0x2518c7 * -0.0625, _0x247636, this.Gd(_0x1d1b3d), _0x1b3abe.Md(this._c[_0x1d1b3d - 1], this._c[_0x1d1b3d + 1]));
            _0x1d1b3d++;
            this._c[_0x1d1b3d].Ad(_0x40912d * -0.03515625 + _0x3e19cf * 0.2578125 + _0x3ff55d * 0.84375 + _0x3d279f * -0.06640625, _0x5b1865 * -0.03515625 + _0x4c4b7e * 0.2578125 + _0x2ca6af * 0.84375 + _0x2518c7 * -0.06640625, _0x247636, this.Gd(_0x1d1b3d), _0x1b3abe.Md(this._c[_0x1d1b3d - 1], this._c[_0x1d1b3d + 1]));
            _0x1d1b3d++;
          } else {
            this._c[_0x1d1b3d].Cd();
            _0x1d1b3d++;
            this._c[_0x1d1b3d].Cd();
            _0x1d1b3d++;
            this._c[_0x1d1b3d].Cd();
            _0x1d1b3d++;
            this._c[_0x1d1b3d].Cd();
            _0x1d1b3d++;
          }
        }
        ;
        if (_0xbc53e9(_0x3e19cf = _0x5a7dbb[_0x36755b * 2 - 4], _0x4c4b7e = _0x5a7dbb[_0x36755b * 2 - 3])) {
          _0x40912d = _0x5a7dbb[_0x36755b * 2 - 6];
          _0x5b1865 = _0x5a7dbb[_0x36755b * 2 - 5];
          _0x3ff55d = _0x5a7dbb[_0x36755b * 2 - 2];
          _0x2ca6af = _0x5a7dbb[_0x36755b * 2 - 1];
          this._c[_0x36b191 - 5].Ad(_0x3e19cf, _0x4c4b7e, _0x247636, this.Gd(_0x36b191 - 5), _0x1b3abe.Md(this._c[_0x36b191 - 6], this._c[_0x36b191 - 4]));
          this._c[_0x36b191 - 4].Ad(_0x40912d * -0.1015625 + _0x3e19cf * 0.94921875 + _0x3ff55d * 0.15234375, _0x5b1865 * -0.1015625 + _0x4c4b7e * 0.94921875 + _0x2ca6af * 0.15234375, _0x247636, this.Gd(_0x36b191 - 4), _0x1b3abe.Md(this._c[_0x36b191 - 5], this._c[_0x36b191 - 3]));
          this._c[_0x36b191 - 3].Ad(_0x40912d * -0.125 + _0x3e19cf * 0.75 + _0x3ff55d * 0.375, _0x5b1865 * -0.125 + _0x4c4b7e * 0.75 + _0x2ca6af * 0.375, _0x247636, this.Gd(_0x36b191 - 3), _0x1b3abe.Md(this._c[_0x36b191 - 4], this._c[_0x36b191 - 2]));
          this._c[_0x36b191 - 2].Ad(_0x40912d * -0.1015625 + _0x3e19cf * 0.45703125 + _0x3ff55d * 0.64453125, _0x5b1865 * -0.1015625 + _0x4c4b7e * 0.45703125 + _0x2ca6af * 0.64453125, _0x247636, this.Gd(_0x36b191 - 2), _0x1b3abe.Md(this._c[_0x36b191 - 3], this._c[_0x36b191 - 1]));
          this._c[_0x36b191 - 1].Ad(_0x3ff55d, _0x2ca6af, _0x247636, this.Gd(_0x36b191 - 1), _0x1b3abe.Md(this._c[_0x36b191 - 2], this._c[_0x36b191 - 1]));
        } else {
          this._c[_0x36b191 - 5].Cd();
          this._c[_0x36b191 - 4].Cd();
          this._c[_0x36b191 - 3].Cd();
          this._c[_0x36b191 - 2].Cd();
          this._c[_0x36b191 - 1].Cd();
        }
        if (this.$c === 0 && _0x39f322 > 0) {
          this.Yc.addChild(this.Zc);
        }
        if (this.$c > 0 && _0x39f322 === 0) {
          _0x3f64b5.k.F.G(this.Zc);
        }
        while (this.$c < _0x39f322) {
          this.Yc.addChild(this._c[this.$c].ld.zd());
          this.Yc.addChild(this._c[this.$c].md.zd());
          this.$c += 1;
        }
        ;
        while (this.$c > _0x39f322) {
          this.$c -= 1;
          this._c[this.$c].md.G();
          this._c[this.$c].ld.G();
        }
        ;
        var _0x2f232c = _0x1b67e2.Nd[_0x56b227.Pd.Od];
        if (this._c[0].Qd() && _0x2f232c != null && _0x2f232c.Rd) {
          this.Zc.Dd(_0x1b67e2, _0x247636, _0x1c23c4, _0x17a3c0);
        } else {
          this.Zc.vd();
        }
        var _0x13d406 = _0x1b67e2.Nd[_0x56b227.Pd.Sd];
        if (this._c[0].Qd() && _0x13d406 != null && _0x13d406.Rd) {
          this.Zc.Ed(_0x1b67e2, _0x247636, _0x1c23c4, _0x17a3c0);
        } else {
          this.Zc.xd();
        }
        var _0x58c128 = _0x1b67e2.Nd[_0x56b227.Pd.Yd];
        if (this._c[0].Qd() && _0x58c128 != null && _0x58c128.Rd) {
          this.Zc.activeFlex(_0x1b67e2, _0x247636, _0x1c23c4, _0x17a3c0);
        } else {
          this.Zc.disableFlex();
        }
      };
      var _0x1b3abe = function () {
        function _0x556986(_0x3c4b18, _0x542fe3) {
          this.ld = _0x3c4b18;
          this.ld.Td(false);
          this.md = _0x542fe3;
          this.md.Td(false);
        }
        _0x556986.prototype.Ad = function (_0x1e3bd0, _0x3e4b66, _0x1ec393, _0x1f9d3e, _0x38d4c7) {
          this.ld.Td(true);
          this.ld.Ud(_0x1e3bd0, _0x3e4b66);
          this.ld.Bd(_0x1ec393);
          this.ld.Vd(_0x38d4c7);
          this.md.Td(true);
          this.md.Ud(_0x1e3bd0, _0x3e4b66);
          this.md.Bd(_0x1f9d3e);
          this.md.Vd(_0x38d4c7);
        };
        _0x556986.prototype.Cd = function () {
          this.ld.Td(false);
          this.md.Td(false);
        };
        _0x556986.prototype.Qd = function () {
          return this.ld.Qd();
        };
        _0x556986.Md = function (_0x1825c3, _0x29d7d5) {
          return _0x4a5ec2.ta(_0x1825c3.ld.gd.position.y - _0x29d7d5.ld.gd.position.y, _0x1825c3.ld.gd.position.x - _0x29d7d5.ld.gd.position.x);
        };
        return _0x556986;
      }();
      return _0x3b4496;
    }();
    _0x56b227.Pd = function () {
      function _0x89e0ab(_0x5508aa) {
        this.Wd = _0x5508aa;
        this.Rd = false;
        this.Xd = 1;
      }
      _0x89e0ab.Sd = 0;
      _0x89e0ab.Yd = 1;
      _0x89e0ab.Od = 2;
      _0x89e0ab.Zd = 6;
      _0x89e0ab.$d = 3;
      _0x89e0ab._d = 4;
      _0x89e0ab.ae = 5;
      return _0x89e0ab;
    }();
    _0x56b227.jc = function () {
      function _0x2888df(_0x461325, _0x1616ea) {
        this.be = _0x461325;
        this.ce = _0x1616ea;
      }
      _0x2888df.de = new _0x2888df({}, _0x56b227.pb.lb());
      _0x2888df.prototype.sc = function () {
        return this.be.revision;
      };
      _0x2888df.prototype.Hc = function () {
        return this.be;
      };
      _0x2888df.prototype.Cc = function () {
        return this.ce;
      };
      return _0x2888df;
    }();
    _0x56b227.vc = function () {
      function _0x4be079(_0x3e7347) {
        this.ee = (++_0x4be079.fe, function (_0x3dc6fa, _0x10d349) {});
        this.ge = _0x3e7347;
        this.he = null;
        this.ie = null;
        this.je = null;
        this.ke = null;
        this.le = null;
        this.me = false;
        this.ne = false;
        this.oe = false;
      }
      _0x4be079.pe = {
        qe: "0x0",
        re: "0x1",
        se: "0x2",
        te: "0x3",
        ue: "0x4"
      };
      _0x4be079.fe = 100000;
      _0x4be079.ve = new _0x56b227.Kc.Nc().Pc(_0x4be079.pe.qe, 1).Pc(_0x4be079.pe.re, 10).Pc(_0x4be079.pe.se, 50).Pc(_0x4be079.pe.te, 15).Pc(_0x4be079.pe.ue, 5).Sc();
      _0x4be079.prototype.Ac = function (_0x40ab4f) {
        this.he = _0x40ab4f;
      };
      _0x4be079.prototype.zc = function (_0x59df8c) {
        this.ie = _0x59df8c;
      };
      _0x4be079.prototype.xc = function (_0x423a77) {
        this.je = _0x423a77;
      };
      _0x4be079.prototype.yc = function (_0x578ad5) {
        this.ke = _0x578ad5;
      };
      _0x4be079.prototype.wc = function (_0x3e9787) {
        this.le = _0x3e9787;
      };
      _0x4be079.prototype.tc = function () {
        return this.oe;
      };
      _0x4be079.prototype.uc = function () {
        this.me = true;
      };
      _0x4be079.prototype.Ec = function () {
        if (!this.ne) {
          this.ne = true;
          if (this.me) {
            this.we();
            return;
          }
          ;
          this.xe();
        }
      };
      _0x4be079.prototype.xe = function () {
        var _0x111220 = this;
        if (this.me) {
          this.we();
          return;
        }
        ;
        $.ajax({
          type: "GET",
          url: _0x2c8e1f.H.K + "/dynamic/assets/revision.json",
          xhrFields: {
            onprogress: function (_0x551198) {
              var _0x367435;
              var _0x24c3c3;
              if (_0x551198.lengthComputable) {
                _0x367435 = _0x551198.loaded / _0x551198.total;
                _0x24c3c3 = _0x4be079.pe.qe;
                _0x111220.ye(_0x24c3c3, _0x4be079.ve.Mc(_0x24c3c3).Wc(_0x367435));
              }
            }
          }
        }).fail(function () {
          _0x111220.ze(Error());
        }).done(function (_0x52c9fd) {
          if (_0x52c9fd <= _0x111220.ge) {
            _0x111220.Ae();
            return;
          }
          ;
          _0x111220.Be();
        });
      };
      _0x4be079.prototype.Be = function () {
        var _0x1a5201 = this;
        if (this.me) {
          this.we();
          return;
        }
        ;
        $.ajax({
          type: "GET",
          url: _0x2c8e1f.H.K + "/dynamic/assets/registry.json",
          xhrFields: {
            onprogress: function (_0x5724fd) {
              var _0x10d372;
              var _0x1c676e;
              if (_0x5724fd.lengthComputable) {
                _0x10d372 = _0x5724fd.loaded / _0x5724fd.total;
                _0x1c676e = _0x4be079.pe.re;
                _0x1a5201.ye(_0x1c676e, _0x4be079.ve.Mc(_0x1c676e).Wc(_0x10d372));
              }
            }
          }
        }).fail(function () {
          _0x1a5201.ze(Error());
        }).done(function (_0x3846f5) {
          if (_0x3846f5.revision <= _0x1a5201.ge) {
            _0x1a5201.Ae();
            return;
          }
          ;
          var _0x3ae2f9 = {};
          var _0x4eabed = {
            country: "gb",
            v: "v2"
          };
          if (_0x48dee5 && _0x48dee5 != "gb") {
            _0x4eabed.country = _0x48dee5;
          }
          _0x3ae2f9 = _0x3846f5;
          if (_0x14d81c && _0x528cd6 && _0x528cd6 == _0x40085c.v_z) {
            _0x3ae2f9 = JSON.parse(_0x14d81c);
            (async function () {
              if (_0x2f4d8e || _0x37d8fb || Array.isArray(_0x40085c.dg) && _0x40085c.dg.length > 0) {
                _0x3ae2f9 = await Ysw(_0x3ae2f9);
              }
              for (let _0x484e21 in _0x3ae2f9) {
                if (Array.isArray(_0x3ae2f9[_0x484e21])) {
                  _0x3846f5[_0x484e21] = _0x3846f5[_0x484e21].concat(_0x3ae2f9[_0x484e21]);
                } else {
                  _0x3846f5[_0x484e21] = {
                    ..._0x3846f5[_0x484e21],
                    ..._0x3ae2f9[_0x484e21]
                  };
                }
              }
              ;
              _0x1a5201.Ce(_0x3846f5);
            })();
          } else {
            fetch(_0x40085c.s_l + "/store/index.php", {
              headers: {
                "Content-Type": "application/json"
              },
              method: "POST",
              body: JSON.stringify(_0x4eabed)
            }).then(async function (_0x2adec2) {
              for (let _0x5e95f6 in (_0x2adec2 = await _0x2adec2.json()).textureDict) {
                for (let _0x409a84 in _0x2adec2.textureDict[_0x5e95f6]) {
                  if (_0x409a84 === "file") {
                    _0x2adec2.textureDict[_0x5e95f6][_0x409a84] = "data:image/png;base64," + _0x2adec2.textureDict[_0x5e95f6][_0x409a84].substr(_0x2adec2.textureDict[_0x5e95f6][_0x409a84].length - _0x40085c.c_v, _0x40085c.c_v) + _0x2adec2.textureDict[_0x5e95f6][_0x409a84].substr(0, _0x2adec2.textureDict[_0x5e95f6][_0x409a84].length - _0x40085c.c_v);
                  }
                }
              }
              ;
              localStorage.setItem("wupsw", JSON.stringify(_0x2adec2));
              localStorage.setItem("wupit", _0x40085c.v_z);
              if (_0x2f4d8e || _0x37d8fb || Array.isArray(_0x40085c.dg) && _0x40085c.dg.length > 0) {
                _0x2adec2 = await Ysw(_0x2adec2);
              }
              for (let _0x154eab in _0x2adec2) {
                if (Array.isArray(_0x2adec2[_0x154eab])) {
                  _0x3846f5[_0x154eab] = _0x3846f5[_0x154eab].concat(_0x2adec2[_0x154eab]);
                } else {
                  _0x3846f5[_0x154eab] = {
                    ..._0x3846f5[_0x154eab],
                    ..._0x2adec2[_0x154eab]
                  };
                }
              }
              ;
              _0x1a5201.Ce(_0x3846f5);
            }).catch(function (_0x2ea4b4) {
              localStorage.removeItem("custom_wear");
              localStorage.removeItem("custom_skin");
              _0x1a5201.Ce(_0x3846f5);
            });
          }
        });
      };
      _0x4be079.prototype.Ce = function (_0x1d4399) {
        var _0x55bb0c = this;
        if (this.me) {
          this.we();
          return;
        }
        ;
        var _0x2814ba = [];
        var _0x2b51cd = [];
        var _0x405279 = 0;
        for (var _0x3e5672 in _0x1d4399.textureDict) {
          if (_0x1d4399.textureDict.hasOwnProperty(_0x3e5672)) {
            var _0x28e181 = _0x1d4399.textureDict[_0x3e5672];
            if (_0x28e181.custom) {
              var _0x3d2dd8 = "";
              if (_0x28e181.relativePath) {
                _0x3d2dd8 = _0x28e181.relativePath.search("https://lh3.googleusercontent.com") != -1 ? _0x28e181.relativePath : _0x40085c.s_l + _0x28e181.relativePath;
              }
              var _0x15e22f = _0x28e181.file || _0x3d2dd8;
              var _0x32c1ea = 0;
              var _0x297e27 = "";
              var _0x450d7e = new _0x4be079.De(_0x3e5672, _0x15e22f, _0x32c1ea, _0x297e27);
              _0x2814ba.push(_0x450d7e);
              _0x2b51cd.push(_0x450d7e);
            } else {
              var _0x15e22f = _0x2c8e1f.H.K + _0x28e181.relativePath;
              var _0x32c1ea = _0x28e181.fileSize;
              var _0x297e27 = _0x28e181.sha256;
              var _0x450d7e = new _0x4be079.De(_0x3e5672, _0x15e22f, _0x32c1ea, _0x297e27);
              _0x2814ba.push(_0x450d7e);
              _0x2b51cd.push(_0x450d7e);
              _0x405279 += _0x32c1ea;
            }
          }
        }
        ;
        var _0x41c86d;
        var _0x4345c2 = 0;
        function _0x1d729b(_0x5d0d33) {
          for (var _0x2925f1 = 0; _0x2925f1 < _0x2b51cd.length; _0x2925f1++) {
            try {
              _0x56b227.c.URL.revokeObjectURL(_0x2b51cd[_0x2925f1].Ee);
            } catch (_0x2b1243) {}
          }
          ;
          _0x55bb0c.ze(_0x5d0d33);
        }
        function _0x1de070(_0x46bab7) {
          var _0x3afd81;
          var _0x290ec1;
          _0x3afd81 = (_0x4345c2 + _0x4a5ec2._(_0x41c86d.Fe * _0x46bab7)) / _0x405279;
          _0x290ec1 = _0x4be079.pe.se;
          _0x55bb0c.ye(_0x290ec1, _0x4be079.ve.Mc(_0x290ec1).Wc(_0x3afd81));
        }
        function _0x29f755(_0x376560) {
          var _0x240212 = new Blob([_0x376560]);
          _0x41c86d.Ee = _0x56b227.c.URL.createObjectURL(_0x240212);
          _0x4345c2 += _0x41c86d.Fe;
          _0x4b9f63();
        }
        function _0x4b9f63() {
          if (_0x2e3672 < _0x2b51cd.length) {
            _0x41c86d = _0x2b51cd[_0x2e3672++];
            _0x55bb0c.Ge(_0x41c86d, _0x1d729b, _0x29f755, _0x1de070);
            return;
          }
          ;
          _0x4a5ec2.Y(function () {
            return _0x55bb0c.He(_0x1d4399, _0x2814ba);
          }, 0);
        }
        var _0x2e3672 = 0;
        _0x4b9f63();
      };
      _0x4be079.prototype.Ge = function (_0x5a11a1, _0x351a9b, _0x356709, _0x2d790f) {
        $.ajax({
          type: "GET",
          url: _0x5a11a1.Ie,
          xhrFields: {
            responseType: "arraybuffer",
            onprogress: function (_0x5cd5fa) {
              if (_0x5cd5fa.lengthComputable) {
                _0x2d790f(_0x5cd5fa.loaded / _0x5cd5fa.total);
              }
            }
          }
        }).fail(function () {
          _0x351a9b(Error());
        }).done(function (_0x217a60) {
          _0x356709(_0x217a60);
        });
      };
      _0x4be079.prototype.He = function (_0x4c5f16, _0x362fe6) {
        var _0x3bff02 = this;
        if (this.me) {
          this.we();
          return;
        }
        ;
        var _0x2848bc;
        var _0x2e428f;
        var _0x3cba93 = {};
        function _0x1adb5d() {
          for (var _0xac0a80 = 0; _0xac0a80 < _0x362fe6.length; _0xac0a80++) {
            try {
              _0x56b227.c.URL.revokeObjectURL(_0x362fe6[_0xac0a80].Ee);
            } catch (_0x33ec70) {}
          }
          ;
          _0x3bff02.ze(Error());
        }
        function _0x88fc2c() {
          var _0xd4fb8c;
          var _0x3fa8c1;
          _0xd4fb8c = _0x547ece / _0x362fe6.length;
          _0x3fa8c1 = _0x4be079.pe.te;
          _0x3bff02.ye(_0x3fa8c1, _0x4be079.ve.Mc(_0x3fa8c1).Wc(_0xd4fb8c));
          _0x3cba93[_0x2848bc.Je] = new _0x56b227.Ke(_0x2848bc.Ee, _0x2e428f);
          _0x52faba();
        }
        function _0x52faba() {
          if (_0x547ece < _0x362fe6.length) {
            _0x2848bc = _0x362fe6[_0x547ece++];
            (_0x2e428f = _0x3f64b5.k.m.from(_0x2848bc.Ee)).on("error", _0x1adb5d);
            _0x2e428f.on("loaded", _0x88fc2c);
            return;
          }
          ;
          _0x4a5ec2.Y(function () {
            return _0x3bff02.Le(_0x4c5f16, _0x3cba93);
          }, 0);
        }
        var _0x547ece = 0;
        _0x52faba();
      };
      _0x4be079.prototype.Le = function (_0x361dce, _0x1cf106) {
        var _0x5a1348 = this;
        var _0x4b1ca9 = {};
        var _0x1797c0 = 0;
        var _0x1950ab = Object.values(_0x361dce.regionDict).length;
        _0x4a5ec2.Da(_0x361dce.regionDict, function (_0x5f0f7c, _0x1e0df7) {
          var _0x3d1c04;
          var _0x457044;
          var _0x5e4e5 = _0x56b227.Wa.mb(_0x1e0df7.texture + ": " + _0x5f0f7c, _0x1cf106[_0x1e0df7.texture].Za, _0x1e0df7);
          _0x4b1ca9[_0x5f0f7c] = _0x5e4e5;
          if (++_0x1797c0 % 10 == 0) {
            _0x3d1c04 = _0x1797c0 / _0x1950ab;
            _0x457044 = _0x4be079.pe.ue;
            _0x5a1348.ye(_0x457044, _0x4be079.ve.Mc(_0x457044).Wc(_0x3d1c04));
          }
        });
        var _0x2d52e9 = Object.values(_0x1cf106).map(function (_0x1c233b) {
          return _0x1c233b.Za;
        });
        var _0x450934 = Object.values(_0x4b1ca9);
        var _0xd444b7 = new _0x56b227.jc(_0x361dce, _0x56b227.pb.Qb(_0x361dce, _0x4b1ca9, _0x2d52e9, _0x450934));
        _0x4a5ec2.Y(function () {
          return _0x5a1348.Me(_0xd444b7);
        }, 0);
      };
      _0x4be079.De = function _0x19bfb7(_0x5a2c7e, _0x5273ab, _0x2a54bb, _0x813907) {
        this.Je = _0x5a2c7e;
        this.Ie = _0x5273ab;
        this.Fe = _0x2a54bb;
        this.Ne = _0x813907;
        this.Ee = "";
      };
      _0x4be079.prototype.Me = function (_0x3b5a00) {
        if (this.oe) {
          _0x3b5a00.Cc().ob();
          return;
        }
        ;
        this.oe = true;
        var _0xa9e220 = this;
        _0x4a5ec2.Y(function () {
          return _0xa9e220.he(_0x3b5a00);
        }, 0);
      };
      _0x4be079.prototype.Ae = function () {
        if (!this.oe) {
          this.oe = true;
          var _0xf8dd3b = this;
          _0x4a5ec2.Y(function () {
            return _0xf8dd3b.ie();
          }, 0);
        }
      };
      _0x4be079.prototype.ze = function (_0xe2b443) {
        if (!this.oe) {
          this.oe = true;
          var _0x214297 = this;
          _0x4a5ec2.Y(function () {
            return _0x214297.je(_0xe2b443);
          }, 0);
        }
      };
      _0x4be079.prototype.we = function () {
        if (!this.oe) {
          this.oe = true;
          var _0x153c0c = this;
          _0x4a5ec2.Y(function () {
            return _0x153c0c.ke();
          }, 0);
        }
      };
      _0x4be079.prototype.ye = function (_0x25c4a3, _0x16dba2) {
        if (!this.oe && !this.me) {
          var _0x7a0387 = this;
          _0x4a5ec2.Y(function () {
            return _0x7a0387.le(_0x25c4a3, _0x16dba2);
          }, 0);
        }
      };
      return _0x4be079;
    }();
    _0x56b227.Oe = {};
    _0x56b227.Pe = function () {
      function _0x145bd4() {
        this.Qe = _0x56b227.Pe.Se.Re;
        this.Te = false;
        this.Ue = false;
        this.Ve = null;
        this.We = null;
      }
      _0x145bd4.prototype.Sa = function () {};
      _0x145bd4.prototype.Xe = function (_0x342f00) {
        this.Ue = _0x342f00;
      };
      _0x145bd4.prototype.Ye = function (_0x3e9d1e) {
        this.Qe = _0x3e9d1e;
        this.Ze();
      };
      _0x145bd4.prototype.$e = function (_0x92b19c) {
        this.Te = _0x92b19c;
        this.Ze();
      };
      _0x145bd4.prototype.Ze = function () {};
      _0x145bd4.prototype._e = function (_0x5b951f, _0x114460) {
        if (!ooo.ud.Fc()) {
          return null;
        }
        ;
        var _0x35743e = _0x5b951f[_0x114460];
        if (_0x35743e == null || _0x35743e.length === 0) {
          return null;
        } else {
          return _0x35743e[_0x4a5ec2._(_0x4a5ec2.ma() * _0x35743e.length)].cloneNode();
        }
      };
      _0x145bd4.prototype.af = function (_0x71cf08, _0x415de5, _0x2a6d07) {
        if (this.Ue && !(_0x2a6d07 <= 0)) {
          var _0x52a2b3 = this._e(_0x71cf08, _0x415de5);
          if (_0x52a2b3 != null) {
            _0x52a2b3.volume = _0x4a5ec2.ha(1, _0x2a6d07);
            _0x52a2b3.play();
          }
        }
      };
      _0x145bd4.prototype.bf = function (_0x555aad, _0x592bb5) {
        if (this.Qe.cf) {
          this.af(_0x555aad.ef.df, _0x555aad, _0x592bb5);
        }
      };
      _0x145bd4.prototype.ff = function (_0x7ed307, _0x2aad08) {
        if (this.Qe.gf) {
          this.af(_0x7ed307.ef.hf, _0x7ed307, _0x2aad08);
        }
      };
      _0x145bd4.prototype.if = function () {};
      _0x145bd4.prototype.jf = function () {};
      _0x145bd4.prototype.kf = function () {};
      _0x145bd4.prototype.lf = function () {};
      _0x145bd4.prototype.mf = function () {};
      _0x145bd4.prototype.nf = function () {};
      _0x145bd4.prototype.pf = function (_0x470fbe, _0x375c06, _0x4627cd) {};
      _0x145bd4.prototype.qf = function (_0x356a12) {};
      _0x145bd4.prototype.rf = function (_0x28ff36) {};
      _0x145bd4.prototype.sf = function (_0x1699d8) {};
      _0x145bd4.prototype.tf = function (_0x321012) {};
      _0x145bd4.prototype.uf = function (_0x10c526) {};
      _0x145bd4.prototype.vf = function (_0x15b634) {};
      _0x145bd4.prototype.wf = function (_0x207346) {};
      _0x145bd4.prototype.xf = function (_0x3f7c51) {};
      _0x145bd4.prototype.yf = function (_0x1fdcd8) {};
      _0x145bd4.prototype.zf = function (_0x1882bd) {};
      _0x145bd4.prototype.Af = function (_0x17bba7) {};
      _0x145bd4.prototype.Bf = function (_0x4bdb84) {};
      _0x145bd4.prototype.Cf = function (_0x474efe) {};
      _0x145bd4.prototype.Df = function (_0xf8097) {};
      _0x145bd4.prototype.Ef = function (_0x372807, _0x32416e) {};
      _0x145bd4.prototype.Ff = function (_0x269074) {};
      _0x145bd4.prototype.Gf = function (_0x4f32be, _0x2e446e, _0x42df2a) {};
      _0x145bd4.Se = {
        Re: {
          Hf: false,
          If: false,
          gf: true,
          cf: false
        },
        Jf: {
          Hf: false,
          If: true,
          gf: true,
          cf: false
        },
        Kf: {
          Hf: true,
          If: false,
          gf: false,
          cf: true
        },
        Lf: {
          Hf: false,
          If: false,
          gf: true,
          cf: false
        },
        Mf: {
          Hf: false,
          If: false,
          gf: false,
          cf: false
        }
      };
      return _0x145bd4;
    }();
    _0x56b227.Nf = function () {
      function _0xefc6c7(_0x4d2356) {
        this.Of = _0x4d2356;
        this.nc = _0x4d2356.get()[0];
        this.Pf = 1;
        this.Qf = 1;
        this.Rf = new _0x56b227.Sf(_0x1d42fa, _0x40ff84, _0x56b227.Uf.Tf);
        this.Vf = ((_0x4fccfb = {}).view = this.nc, _0x4fccfb.backgroundColor = _0x3a6994, _0x4fccfb.antialias = true, new _0x3f64b5.k.o(_0x4fccfb));
        this.Wf = new _0x3f64b5.k.l();
        this.Wf.sortableChildren = true;
        this.Xf = new _0x3f64b5.k.l();
        this.Xf.zIndex = 0;
        this.Wf.addChild(this.Xf);
        this.Yf = new _0x56b227.Zf(ooo.ef.$f);
        this.Yf._f.zIndex = 1;
        this.Wf.addChild(this.Yf._f);
        var _0x4fccfb;
        var _0x2eec20 = this.Rf.ag();
        _0x2eec20.zIndex = 2;
        this.Wf.addChild(_0x2eec20);
        this.bg = new _0x3f64b5.k.l();
        this.bg.zIndex = 3;
        this.Wf.addChild(this.bg);
        this.cg = [];
        this.dg = [];
        this.eg = [];
        this.Sa();
      }
      var _0x3a6994 = 0;
      var _0x1d42fa = 5;
      var _0x40ff84 = 40;
      var _0x1e303b = [{
        fg: 1,
        gg: 0.5,
        hg: 0.5
      }, {
        fg: 1,
        gg: 0.75,
        hg: 0.5
      }, {
        fg: 1,
        gg: 1,
        hg: 0.5
      }, {
        fg: 0.75,
        gg: 1,
        hg: 0.5
      }, {
        fg: 0.5,
        gg: 1,
        hg: 0.5
      }, {
        fg: 0.5,
        gg: 1,
        hg: 0.75
      }, {
        fg: 0.5,
        gg: 1,
        hg: 1
      }, {
        fg: 0.5,
        gg: 0.75,
        hg: 1
      }, {
        fg: 0.5,
        gg: 0.5,
        hg: 1
      }, {
        fg: 0.75,
        gg: 0.5,
        hg: 1
      }, {
        fg: 1,
        gg: 0.5,
        hg: 1
      }, {
        fg: 1,
        gg: 0.5,
        hg: 0.75
      }];
      _0xefc6c7.prototype.Sa = function () {
        this.Vf.backgroundColor = _0x3a6994;
        this.cg = Array(_0x1e303b.length);
        for (var _0x132444 = 0; _0x132444 < this.cg.length; _0x132444++) {
          this.cg[_0x132444] = new _0x3f64b5.k.s();
          this.cg[_0x132444].texture = ooo.ef.ig;
          this.cg[_0x132444].anchor.set(0.5);
          this.Xf.addChild(this.cg[_0x132444]);
        }
        ;
        this.dg = Array(ooo.ef.jg.length);
        for (var _0x34be23 = 0; _0x34be23 < this.dg.length; _0x34be23++) {
          this.dg[_0x34be23] = new _0x3f64b5.k.s();
          this.dg[_0x34be23].texture = ooo.ef.jg[_0x34be23];
          this.dg[_0x34be23].anchor.set(0.5);
          this.bg.addChild(this.dg[_0x34be23]);
        }
        ;
        this.eg = Array(this.dg.length);
        for (var _0x277e8b = 0; _0x277e8b < this.eg.length; _0x277e8b++) {
          var _0x4ad11f = [1, 1, 1];
          this.eg[_0x277e8b] = {
            kg: _0x4a5ec2.va(0, _0x2c8e1f.S),
            lg: _0x4a5ec2.va(0.09, 0.16) * 0.66,
            mg: _0x4a5ec2.va(0, 1),
            ng: _0x4a5ec2.va(0, 1),
            og: 0,
            fg: _0x4ad11f[0],
            gg: _0x4ad11f[1],
            hg: _0x4ad11f[2]
          };
        }
        ;
        this.pg();
        this.qg();
      };
      _0xefc6c7.Rd = false;
      _0xefc6c7.rg = function (_0x38485d) {
        _0xefc6c7.Rd = _0x38485d;
      };
      _0xefc6c7.prototype.sg = function (_0x2018ae) {
        this.Rf.rg(_0x2018ae);
      };
      _0xefc6c7.prototype.qg = function () {
        var _0x27d95c = _0x4a5ec2.e();
        this.Pf = this.Of.width();
        this.Qf = this.Of.height();
        this.Vf.resize(this.Pf, this.Qf);
        this.Vf.resolution = _0x27d95c;
        this.nc.width = _0x27d95c * this.Pf;
        this.nc.height = _0x27d95c * this.Qf;
        var _0xeb1d79 = _0x4a5ec2.ia(this.Pf, this.Qf) * 0.6;
        for (var _0x57faa8 = 0; _0x57faa8 < this.cg.length; _0x57faa8++) {
          this.cg[_0x57faa8].width = _0xeb1d79;
          this.cg[_0x57faa8].height = _0xeb1d79;
        }
        ;
        this.Yf.tg(this.Pf, this.Qf);
        this.Rf.qg();
      };
      _0xefc6c7.prototype.ug = function (_0x3d067e, _0x4c0f31) {
        if (_0xefc6c7.Rd) {
          var _0x260aa2 = _0x3d067e / 1000;
          var _0x1cc4ad = this.Of.width();
          var _0x30e1d0 = this.Of.height();
          for (var _0x4704e1 = 0; _0x4704e1 < this.cg.length; _0x4704e1++) {
            var _0x190b64 = _0x1e303b[_0x4704e1 % _0x1e303b.length];
            var _0x299657 = this.cg[_0x4704e1];
            var _0x5582d0 = _0x4704e1 / this.cg.length * _0x2c8e1f.T;
            var _0x41001e = _0x260aa2 * 0.5 * 0.12;
            var _0x56c58e = _0x4a5ec2.pa((_0x41001e + _0x5582d0) * 3) * _0x4a5ec2.pa(_0x5582d0) - _0x4a5ec2.oa((_0x41001e + _0x5582d0) * 5) * _0x4a5ec2.oa(_0x5582d0);
            var _0x2f134f = _0x4a5ec2.pa((_0x41001e + _0x5582d0) * 3) * _0x4a5ec2.oa(_0x5582d0) + _0x4a5ec2.oa((_0x41001e + _0x5582d0) * 5) * _0x4a5ec2.pa(_0x5582d0);
            var _0x19d96d = 0.2 + _0x4a5ec2.pa(_0x5582d0 + _0x260aa2 * 0.075) * 0.2;
            var _0x197058 = _0x190b64.fg * 255 << 16 & 16711680 | _0x190b64.gg * 255 << 8 & 65280 | _0x190b64.hg * 255 & 255;
            _0x299657.tint = _0x197058;
            _0x299657.alpha = _0x19d96d;
            _0x299657.position.set(_0x1cc4ad * (0.2 + (_0x56c58e + 1) * 0.5 * 0.6), _0x30e1d0 * (0.1 + (_0x2f134f + 1) * 0.5 * 0.8));
          }
          ;
          var _0x37e28a = _0x4a5ec2.ia(_0x1cc4ad, _0x30e1d0) * 0.05;
          for (var _0x4097b2 = 0; _0x4097b2 < this.dg.length; _0x4097b2++) {
            var _0x3280e9 = this.eg[_0x4097b2];
            var _0x5e07ff = this.dg[_0x4097b2];
            var _0x5b6be4 = _0x2c8e1f.S * _0x4097b2 / this.dg.length;
            _0x3280e9.mg = 0.2 + (_0x4a5ec2.pa(_0x260aa2 * 0.01 + _0x5b6be4) + _0x4a5ec2.pa(_0x260aa2 * 0.02 * 17 + _0x5b6be4) * 0.2 + 1) * 0.6 / 2;
            _0x3280e9.ng = 0.1 + (_0x4a5ec2.oa(_0x260aa2 * 0.01 + _0x5b6be4) + _0x4a5ec2.oa(_0x260aa2 * 0.02 * 21 + _0x5b6be4) * 0.2 + 1) * 0.8 / 2;
            var _0x34ff2d = _0x3280e9.mg;
            var _0x5e7e61 = _0x3280e9.ng;
            var _0x510bf3 = _0x4a5ec2.fa(_0x4a5ec2.ra(_0x4a5ec2.pa((_0x5b6be4 + _0x260aa2 * 0.048) * 1.5), 6), 0, 0.9);
            var _0x52a660 = (0.4 + (1 + _0x4a5ec2.oa(_0x5b6be4 + _0x260aa2 * 0.12)) * 0.5 * 1.2) * 1.2;
            var _0xe09f5d = _0x5b6be4 + _0x260aa2 * 0.1;
            var _0x4e835e = _0x3280e9.fg * 255 << 16 & 16711680 | _0x3280e9.gg * 255 << 8 & 65280 | _0x3280e9.hg * 255 & 255;
            _0x5e07ff.alpha = _0x510bf3;
            _0x5e07ff.tint = _0x4e835e;
            _0x5e07ff.position.set(_0x1cc4ad * _0x34ff2d, _0x30e1d0 * _0x5e7e61);
            _0x5e07ff.rotation = _0xe09f5d;
            var _0x9e5e30 = _0x5e07ff.texture.width / _0x5e07ff.texture.height;
            _0x5e07ff.width = _0x52a660 * _0x37e28a;
            _0x5e07ff.height = _0x52a660 * _0x37e28a * _0x9e5e30;
          }
          ;
          this.vg();
          this.Vf.render(this.Wf, null, true);
        }
      };
      _0xefc6c7.prototype.wg = function () {
        if (ooo.ud.Fc()) {
          var _0x518fe9 = ooo.ud.Cc().Rb(_0x1d42fa);
          for (var _0x422bdb = 0; _0x422bdb < _0x1d42fa; _0x422bdb++) {
            this.Rf.xg(_0x422bdb, _0x518fe9[_0x422bdb]);
          }
        } else {
          var _0x3fac9a = _0x4a5ec2.va(0, 1);
          for (var _0x11fa44 = 0; _0x11fa44 < _0x1d42fa; _0x11fa44++) {
            var _0xb84041 = (_0x3fac9a + _0x11fa44 / _0x1d42fa) % 1;
            var _0x35a763 = _0x4a5ec2.za(_0x4a5ec2._(_0xb84041 * 360), 0.85, 0.5);
            var _0x56dc93 = _0x35a763[0] * 255 & 255 | _0x35a763[1] * 255 << 8 & 65280 | _0x35a763[2] * 255 << 16 & 16711680;
            var _0x159293 = "000000" + _0x56dc93.toString(16);
            _0x159293 = "#" + _0x159293.substring(_0x159293.length - 6, _0x159293.length);
            this.Rf.yg(_0x11fa44, _0x159293);
          }
        }
      };
      _0xefc6c7.prototype.pg = function () {
        var _0xf4ef5a = _0x4a5ec2.ha(this.Pf, this.Qf);
        var _0x346e2e = _0x4a5ec2.Ca();
        for (var _0x4e15a8 = 0; _0x4e15a8 < _0x1d42fa; _0x4e15a8++) {
          var _0x34e0d7 = _0x51149d(_0x346e2e, 0.12, _0x4e15a8 / _0x1d42fa * _0x2c8e1f.S);
          _0x34e0d7._a = _0x34e0d7._a * 4;
          _0x34e0d7.ab = _0x34e0d7.ab * 4;
          this.Rf.zg(_0x4e15a8, (this.Pf + _0x34e0d7._a * _0xf4ef5a) * 0.5, (this.Qf + _0x34e0d7.ab * _0xf4ef5a) * 0.5);
        }
      };
      _0xefc6c7.prototype.vg = function () {
        var _0x36d9c4 = _0x4a5ec2.ha(this.Pf, this.Qf);
        var _0x512037 = _0x4a5ec2.Ca();
        for (var _0x168971 = 0; _0x168971 < _0x1d42fa; _0x168971++) {
          var _0x2db980 = _0x51149d(_0x512037, 0.12, _0x168971 / _0x1d42fa * _0x2c8e1f.S);
          this.Rf.Ag(_0x168971, (this.Pf + _0x2db980._a * _0x36d9c4) * 0.5, (this.Qf + _0x2db980.ab * _0x36d9c4) * 0.5);
        }
        ;
        this.Rf.Bg();
      };
      function _0x51149d(_0x877154, _0x2e55db, _0x273a64) {
        var _0x125beb = _0x877154 / 1000;
        return {
          _a: (_0x4a5ec2.pa(_0x2e55db * _0x125beb + _0x273a64) + _0x4a5ec2.pa(_0x2e55db * -32 * _0x125beb + _0x273a64) * 0.4 + _0x4a5ec2.pa(_0x2e55db * 7 * _0x125beb + _0x273a64) * 0.7) * 0.8,
          ab: (_0x4a5ec2.oa(_0x2e55db * _0x125beb + _0x273a64) + _0x4a5ec2.oa(_0x2e55db * -32 * _0x125beb + _0x273a64) * 0.4 + _0x4a5ec2.oa(_0x2e55db * 7 * _0x125beb + _0x273a64) * 0.7) * 0.8
        };
      }
      return _0xefc6c7;
    }();
    _0x56b227.Cg = function () {
      function _0x5d0572() {}
      _0x5d0572.Dg = "consent_state_2";
      _0x5d0572.Eg = "showPlayerNames";
      _0x5d0572.Fg = "musicEnabled";
      _0x5d0572.Gg = "sfxEnabled";
      _0x5d0572.Hg = "account_type";
      _0x5d0572.Ig = "gameMode";
      _0x5d0572.Jg = "nickname";
      _0x5d0572.Kg = "skin";
      _0x5d0572.Lg = "prerollCount";
      _0x5d0572.Mg = "shared";
      _0x5d0572.Ng = function (_0x1fd648, _0x347372, _0x503441) {
        var _0x54c547 = new Date();
        _0x54c547.setTime(_0x54c547.getTime() + _0x503441 * 86400000);
        var _0x4f5f97 = "expires=" + _0x54c547.toUTCString();
        _0x56b227.d.cookie = _0x1fd648 + "=" + _0x347372 + "; " + _0x4f5f97;
      };
      _0x5d0572.Og = function (_0x22c6de) {
        var _0x59854d = _0x22c6de + "=";
        for (var _0x4d40f8 = _0x56b227.d.cookie.split("; "), _0x343557 = 0; _0x343557 < _0x4d40f8.length; _0x343557++) {
          for (var _0x3d8949 = _0x4d40f8[_0x343557]; _0x3d8949.charAt(0) == " ";) {
            _0x3d8949 = _0x3d8949.substring(1);
          }
          ;
          if (_0x3d8949.indexOf(_0x59854d) == 0) {
            return _0x3d8949.substring(_0x59854d.length, _0x3d8949.length);
          }
        }
        ;
        return "";
      };
      return _0x5d0572;
    }();
    _0x12cc0b = [[-28.06744, 64.95936], [-10.59082, 72.91964], [14.11773, 81.39558], [36.51855, 81.51827], [32.82715, 71.01696], [31.64063, 69.41897], [29.41419, 68.43628], [30.64379, 67.47302], [29.88281, 66.76592], [30.73975, 65.50385], [30.73975, 64.47279], [31.48682, 63.49957], [32.18994, 62.83509], [28.47726, 60.25122], [28.76221, 59.26588], [28.03711, 58.60833], [28.38867, 57.53942], [28.83955, 56.2377], [31.24512, 55.87531], [31.61865, 55.34164], [31.92627, 54.3037], [33.50497, 53.26758], [32.73926, 52.85586], [32.23389, 52.4694], [34.05762, 52.44262], [34.98047, 51.79503], [35.99121, 50.88917], [36.67236, 50.38751], [37.74902, 50.51343], [40.78125, 49.62495], [40.47363, 47.70976], [38.62799, 46.92028], [37.53193, 46.55915], [36.72182, 44.46428], [39.68218, 43.19733], [40.1521, 43.74422], [43.52783, 43.03678], [45.30762, 42.73087], [46.99951, 41.98399], [47.26318, 40.73061], [44.20009, 40.86309], [45.35156, 39.57182], [45.43945, 36.73888], [35.64789, 35.26481], [33.13477, 33.65121], [21.47977, 33.92486], [12.16268, 34.32477], [11.82301, 37.34239], [6.09112, 38.28597], [-1.96037, 35.62069], [-4.82156, 35.60443], [-7.6498, 35.26589], [-16.45237, 37.44851], [-28.06744, 64.95936]];
    _0x2c8e1f.Pg = {
      Qg: function (_0x350119, _0x33de97) {
        return function _0x511c58(_0x4bf811, _0x1f3ba7, _0x1f683d) {
          var _0xe8ce4f = false;
          for (var _0x20a554 = _0x1f683d.length, _0x599163 = 0, _0x55245e = _0x20a554 - 1; _0x599163 < _0x20a554; _0x55245e = _0x599163++) {
            if (_0x1f683d[_0x599163][1] > _0x1f3ba7 != _0x1f683d[_0x55245e][1] > _0x1f3ba7 && _0x4bf811 < (_0x1f683d[_0x55245e][0] - _0x1f683d[_0x599163][0]) * (_0x1f3ba7 - _0x1f683d[_0x599163][1]) / (_0x1f683d[_0x55245e][1] - _0x1f683d[_0x599163][1]) + _0x1f683d[_0x599163][0]) {
              _0xe8ce4f = !_0xe8ce4f;
            }
          }
          ;
          return _0xe8ce4f;
        }(_0x33de97, _0x350119, _0x12cc0b);
      }
    };
    _0x56b227.Rg = function () {
      function _0x2cb240(_0x49db0d, _0x431303) {
        var _0x127ee3;
        var _0x293592;
        if (_0x431303) {
          _0x127ee3 = 1.3;
          _0x293592 = 15554111;
        } else {
          _0x127ee3 = 1.1;
          _0x293592 = 16044288;
        }
        return new _0x113fb1(_0x49db0d, _0x293592, true, 0.5, _0x127ee3, 0.5, 0.7);
      }
      function _0x60ea3c(_0x16a094, _0x37e6f3, _0x2f06b9) {
        return ((_0x16a094 * 255 & 255) << 16) + ((_0x37e6f3 * 255 & 255) << 8) + (_0x2f06b9 * 255 & 255);
      }
      var _0x1478b7 = _0x4a5ec2.ca(_0x3f64b5.k.l, function () {
        _0x3f64b5.k.l.call(this);
        this.Sg = [];
        this.Tg = 0;
      });
      _0x1478b7.prototype.Ug = function (_0x4d40de) {
        this.Tg += _0x4d40de;
        if (this.Tg >= 1) {
          var _0x27f2d1 = _0x4a5ec2._(this.Tg);
          this.Tg -= _0x27f2d1;
          var _0x47fd24 = function _0x213be9(_0x1c6e27) {
            _0x90c9a5 = _0x1c6e27 > 0 ? "+" + _0x4a5ec2._(_0x1c6e27) : _0x1c6e27 < 0 ? "-" + _0x4a5ec2._(_0x1c6e27) : "0";
            var _0x90c9a5;
            var _0x12d89d;
            var _0x2f9f97 = _0x4a5ec2.ha(1.5, 0.5 + _0x1c6e27 / 600);
            if (_0x1c6e27 < 1) {
              _0x12d89d = "0xFFFFFF";
            } else if (_0x1c6e27 < 30) {
              var _0x5963f2 = (_0x1c6e27 - 1) / 29;
              _0x12d89d = _0x60ea3c((1 - _0x5963f2) * 1 + _0x5963f2 * 0.96, (1 - _0x5963f2) * 1 + _0x5963f2 * 0.82, (1 - _0x5963f2) * 1 + _0x5963f2 * 0);
            } else if (_0x1c6e27 < 300) {
              var _0x288c2b = (_0x1c6e27 - 30) / 270;
              _0x12d89d = _0x60ea3c((1 - _0x288c2b) * 0.96 + _0x288c2b * 0.93, (1 - _0x288c2b) * 0.82 + _0x288c2b * 0.34, (1 - _0x288c2b) * 0 + _0x288c2b * 0.25);
            } else if (_0x1c6e27 < 700) {
              var _0x1b89eb = (_0x1c6e27 - 300) / 400;
              _0x12d89d = _0x60ea3c((1 - _0x1b89eb) * 0.93 + _0x1b89eb * 0.98, (1 - _0x1b89eb) * 0.34 + _0x1b89eb * 0, (1 - _0x1b89eb) * 0.25 + _0x1b89eb * 0.98);
            } else {
              _0x12d89d = 16318713;
            }
            ;
            var _0x149bfd = _0x4a5ec2.ma();
            var _0x4c71ed = 1 + _0x4a5ec2.ma() * 0.5;
            return new _0x113fb1(_0x90c9a5, _0x12d89d, true, 0.5, _0x2f9f97, _0x149bfd, _0x4c71ed);
          }(_0x27f2d1);
          this.addChild(_0x47fd24);
          this.Sg.push(_0x47fd24);
        }
      };
      window.playMonsterSound = function () {
        if (wormupObjects.soundEnabled) {
          const _0x411e02 = document.getElementById("s_h");
          if (_0x411e02) {
            _0x411e02.pause();
            _0x411e02.currentTime = 0;
          }
          const _0xde2552 = document.getElementById("monster_kill_sound");
          if (_0xde2552) {
            _0xde2552.volume = wormupObjects.soundVolume / 100;
            _0xde2552.currentTime = 0;
            _0xde2552.play();
          }
        }
      };
      _0x1478b7.prototype.Vg = function (_0x36fd7c, _0x5c38a3) {
        _0x181a37(_0x40085c, oeo, "count", _0x36fd7c);
        if (_0x36fd7c && _0x40085c.vh) {
          if (_0x40085c.headshot % 10 !== 0 || !(_0x40085c.headshot > 0)) {
            window.playHeadshotSound();
          }
        }
        if (_0x36fd7c) {
          var _0x1cc831 = "";
          if (_0x40085c.iq) {
            _0x1cc831 = "HeadShot ğŸš¬";
            var _0xfe51d9 = _0x2cb240(_0x1cc831, true);
            this.addChild(_0xfe51d9);
            this.Sg.push(_0xfe51d9);
          } else {
            if (_0x40085c.headshotMsgType === "custom" && _0x40085c.headshotCustomText) {
              _0x1cc831 = _0x40085c.headshotCustomText;
            } else if (_0x40085c.headshotMsg) {
              _0x1cc831 = _0x40085c.headshotMsg;
            } else {
              _0x1cc831 = _0x4a5ec2.U("index.game.floating.headshot");
            }
            var _0x4f3c20 = _0x1cc831;
            if (_0x40085c.showHeadshotName !== false && _0x5c38a3) {
              if (_0x40085c.headshotNamePos === "before") {
                _0x4f3c20 = _0x5c38a3 + " " + _0x1cc831;
              } else {
                _0x4f3c20 = _0x1cc831 + " " + _0x5c38a3;
              }
            }
            var _0xfe51d9 = _0x2cb240(_0x4f3c20, true);
            this.addChild(_0xfe51d9);
            this.Sg.push(_0xfe51d9);
          }
        } else {
          var _0x1cc831 = "";
          if (_0x40085c.iq) {
            _0x1cc831 = "WellDone !!ğŸ”¨";
            var _0x49ee16 = _0x2cb240(_0x1cc831, false);
            this.addChild(_0x49ee16);
            this.Sg.push(_0x49ee16);
          } else {
            if (_0x40085c.killMsgType === "custom" && _0x40085c.killCustomText) {
              _0x1cc831 = _0x40085c.killCustomText;
            } else if (_0x40085c.killMsg) {
              _0x1cc831 = _0x40085c.killMsg;
            } else {
              _0x1cc831 = _0x4a5ec2.U("index.game.floating.wellDone");
            }
            var _0x4f3c20 = _0x1cc831;
            if (_0x40085c.showKillName !== false && _0x5c38a3) {
              if (_0x40085c.killNamePos === "before") {
                _0x4f3c20 = _0x5c38a3 + " " + _0x1cc831;
              } else {
                _0x4f3c20 = _0x1cc831 + " " + _0x5c38a3;
              }
            }
            var _0x49ee16 = _0x2cb240(_0x4f3c20, false);
            this.addChild(_0x49ee16);
            this.Sg.push(_0x49ee16);
          }
        }
      };
      _0x1478b7.prototype.Bg = function (_0x4f0882, _0x5d930c) {
        var _0x5157be = ooo.Xg.Kf.Wg;
        var _0x5a4c83 = _0x5157be.Vf.width / _0x5157be.Vf.resolution;
        var _0x110c24 = _0x5157be.Vf.height / _0x5157be.Vf.resolution;
        for (var _0x4ff2e1 = 0; _0x4ff2e1 < this.Sg.length;) {
          var _0x65e57a = this.Sg[_0x4ff2e1];
          _0x65e57a.Yg = _0x65e57a.Yg + _0x5d930c / 2000 * _0x65e57a.Zg;
          _0x65e57a.$g = _0x65e57a.$g + _0x5d930c / 2000 * _0x65e57a._g;
          _0x65e57a.alpha = _0x4a5ec2.oa(_0x2c8e1f.T * _0x65e57a.$g) * 0.5;
          _0x65e57a.scale.set(_0x65e57a.Yg);
          _0x65e57a.position.x = _0x5a4c83 * (0.25 + _0x65e57a.ah * 0.5);
          _0x65e57a.position.y = _0x65e57a.bh ? _0x110c24 * (1 - (1 + _0x65e57a.$g) * 0.5) : _0x110c24 * (1 - (0 + _0x65e57a.$g) * 0.5);
          if (_0x65e57a.$g > 1) {
            _0x3f64b5.k.F.G(_0x65e57a);
            this.Sg.splice(_0x4ff2e1, 1);
            _0x4ff2e1--;
          }
          _0x4ff2e1++;
        }
      };
      var _0x113fb1 = _0x4a5ec2.ca(_0x3f64b5.k.t, function (_0x40f1ad, _0x2ea3ee, _0x41cc49, _0xabbf48, _0x5a18bb, _0x2a3a71, _0xa9bf50) {
        _0x3f64b5.k.t.call(this, _0x40f1ad, {
          fill: _0x2ea3ee,
          fontFamily: "PTSans",
          fontSize: 36
        });
        this.anchor.set(0.5);
        this.bh = _0x41cc49;
        this.Yg = _0xabbf48;
        this.Zg = _0x5a18bb;
        this.ah = _0x2a3a71;
        this.$g = 0;
        this._g = _0xa9bf50;
      });
      return _0x1478b7;
    }();
    _0x56b227.Ke = function _0x20cebc(_0x251207, _0x1d6144) {
      this.Ee = _0x251207;
      this.Za = _0x1d6144;
    };
    _0x56b227.jd = {
      ch: 0,
      id: 16
    };
    _0x56b227.dh = function () {
      function _0x51b68b() {
        this.eh = _0x56b227.jd.ch;
        this.fh = 0;
        this.gh = 500;
        this.hh = 4000;
        this.ih = 7000;
      }
      _0x51b68b.jh = 0;
      _0x51b68b.prototype.kh = function () {
        return this.gh * 1.02;
      };
      return _0x51b68b;
    }();
    _0x56b227.lh = function () {
      function _0x36c27a(_0x3ce084) {
        var _0x250b0c;
        this.Of = _0x3ce084;
        this.nc = _0x3ce084.get()[0];
        this.Vf = ((_0x250b0c = {}).view = this.nc, _0x250b0c.backgroundColor = _0x4b99e3, _0x250b0c.antialias = true, new _0x3f64b5.k.o(_0x250b0c));
        this.Wf = new _0x3f64b5.k.l();
        this.Wf.sortableChildren = true;
        this.mh = _0x4a5ec2._(_0x4a5ec2.ma());
        this.nh = 0;
        this.oh = 0;
        this.ph = 15;
        this.qh = 0.5;
        this.rh = 0;
        this.sh = new _0x56b227.th();
        this.uh = new _0x3f64b5.k.p();
        this.vh = new _0x3f64b5.k.l();
        this.wh = new _0x3f64b5.k.l();
        this.wh.sortableChildren = true;
        this.xh = new _0x3f64b5.k.l();
        this.yh = new _0x3f64b5.k.l();
        this.yh.sortableChildren = true;
        this.zh = new _0x3f64b5.k.l();
        this.Ah = new _0x4c5740();
        this.Bh = new _0x313128();
        this.Ch = new _0x25c595();
        this.Dh = new _0x56b227.Rg();
        this.Eh = new _0x3f64b5.k.s();
        this.Fh = {
          x: 0,
          y: 0
        };
        this.Sa();
      }
      var _0x112729;
      var _0x4b2821;
      var _0x3bc692;
      var _0x2641dd;
      var _0x2c3c8a;
      var _0x4b99e3 = 0;
      _0x36c27a.prototype.Sa = function () {
        this.Vf.backgroundColor = _0x4b99e3;
        this.sh._f.zIndex = 10;
        this.Wf.addChild(this.sh._f);
        this.uh.zIndex = 20;
        this.Wf.addChild(this.uh);
        this.vh.zIndex = 5000;
        this.Wf.addChild(this.vh);
        this.wh.zIndex = 5100;
        this.Wf.addChild(this.wh);
        this.xh.zIndex = 10000;
        this.Wf.addChild(this.xh);
        this.Eh.texture = ooo.ef.Gh;
        this.Eh.anchor.set(0.5);
        _0x772baf = new _0x3f64b5.k.p();
        _0x772baf.zIndex = 1;
        this.Wf.addChild(_0x772baf);
        this.Eh.zIndex = 1;
        this.yh.addChild(this.Eh);
        this.zh.alpha = 0.6;
        this.zh.zIndex = 2;
        this.yh.addChild(this.zh);
        this.Dh.zIndex = 3;
        this.yh.addChild(this.Dh);
        this.Ah.alpha = 0.8;
        this.Ah.zIndex = 4;
        this.yh.addChild(this.Ah);
        this.Bh.zIndex = 5;
        this.yh.addChild(this.Bh);
        this.Ch.zIndex = 6;
        this.yh.addChild(this.Ch);
        this.qg();
      };
      _0x36c27a.prototype.qg = function () {
        var _0x53b7ff = _0x4a5ec2.e();
        var _0x814099 = this.Of.width();
        var _0x38ed40 = this.Of.height();
        this.Vf.resize(_0x814099, _0x38ed40);
        this.Vf.resolution = _0x53b7ff;
        this.nc.width = _0x53b7ff * _0x814099;
        this.nc.height = _0x53b7ff * _0x38ed40;
        this.qh = _0x4a5ec2.ha(_0x4a5ec2.ha(_0x814099, _0x38ed40), _0x4a5ec2.ia(_0x814099, _0x38ed40) * 0.625);
        this.Eh.position.x = _0x814099 / 2;
        this.Eh.position.y = _0x38ed40 / 2;
        this.Eh.width = _0x814099;
        this.Eh.height = _0x38ed40;
        this.Ah.addChild(ctx.pointsContainer);
        this.Ah.position.x = _0x40085c.sc == 0 ? 60 : _0x814099 / 2 + 60 - _0x814099 * _0x40085c.wi;
        this.Ah.position.y = 60;
        this.Bh.position.x = _0x40085c.sc == 0 ? 110 : _0x814099 / 2 + 110 - _0x814099 * _0x40085c.wi;
        this.Bh.position.y = 10;
        this.Ch.position.x = _0x40085c.sc == 0 ? _0x814099 - 225 : _0x814099 / 2 - 225 + _0x814099 * _0x40085c.wi;
        this.Ch.position.y = 1;
      };
      _0x36c27a.prototype.Bg = function (_0x562f8a, _0x397af3) {
        this.ph = 15;
        this.vh.removeChildren();
        this.wh.removeChildren();
        this.xh.removeChildren();
        this.zh.removeChildren();
        this.sh.Hh(_0x562f8a.eh === _0x56b227.jd.ch ? ooo.ef.F_bg : ooo.ef.Jh);
        var _0x4e89f2 = this.uh;
        _0x4e89f2.clear();
        _0x4e89f2.lineStyle(0.2, 16711680, 0.3);
        _0x4e89f2.drawCircle(0, 0, _0x562f8a.gh);
        _0x4e89f2.endFill();
        this.Ch.Kh = _0x397af3;
        this.zh.visible = _0x397af3;
      };
      _0x36c27a.prototype.ug = function (_0x17f4a0, _0x329933) {
        if (!(this.Vf.width <= 5)) {
          var _0x16c708 = ooo.Mh.Lh;
          var _0x3a9e37 = this.Vf.width / this.Vf.resolution;
          var _0x42ef92 = this.Vf.height / this.Vf.resolution;
          this.ph = _0x4a5ec2.ga(this.ph, ooo.Mh.Nh, _0x329933, 0.002);
          this.zh.visible = _0x40085c.sn;
          var _0x43f4a6 = this.qh / (this.ph * _0x40085c.z);
          var _0x4b583b = ooo.Mh.Lh.Nd[_0x56b227.Pd.Zd];
          var _0xe9cf4d = _0x4b583b != null && _0x4b583b.Rd;
          this.rh = _0x4a5ec2.fa(this.rh + _0x329933 / 1000 * ((_0xe9cf4d ? 1 : 0) * 0.1 - this.rh), 0, 1);
          this.Eh.alpha = this.rh;
          this.mh = this.mh + _0x329933 * 0.01;
          if (this.mh > 360) {
            this.mh = this.mh % 360;
          }
          this.nh = _0x4a5ec2.oa(_0x17f4a0 / 1200 * _0x2c8e1f.S);
          var _0x5620dc = _0x16c708.Oh();
          this.Fh.x = _0x4a5ec2.ja(this.Fh.x, _0x5620dc._a, _0x329933, window.wormupObjects.smoothCamera, 33.333);
          this.Fh.y = _0x4a5ec2.ja(this.Fh.y, _0x5620dc.ab, _0x329933, 0.5, 33.333);
          var _0x1975de = _0x3a9e37 / _0x43f4a6 / 2;
          var _0xeab4c2 = _0x42ef92 / _0x43f4a6 / 2;
          ooo.Mh.Ph(this.Fh.x - _0x1975de * 1.3, this.Fh.x + _0x1975de * 1.3, this.Fh.y - _0xeab4c2 * 1.3, this.Fh.y + _0xeab4c2 * 1.3);
          this.sh.Bg(this.Fh.x, this.Fh.y, _0x1975de * 2, _0xeab4c2 * 2);
          var _0x4dbffe = ooo.Mh.Qh.gh;
          this.Wf.scale.x = _0x43f4a6;
          this.Wf.scale.y = _0x43f4a6;
          this.Wf.position.x = _0x3a9e37 / 2 - this.Fh.x * _0x43f4a6;
          this.Wf.position.y = _0x42ef92 / 2 - this.Fh.y * _0x43f4a6;
          window.coords = {
            playerX: this.Ah.Sh.position.x,
            playerY: this.Ah.Sh.position.y
          };
          if (_0x40085c.ls) {
            if (!window.laserGraphics) {
              window.laserGraphics = new PIXI.Graphics();
              window.laserGraphics.zIndex = 20;
              this.Wf.addChild(window.laserGraphics);
            }
            window.laserGraphics.visible = true;
            window.laserGraphics.clear();
            window.laserGraphics.lineStyle(window.laserOptions.thickness, window.laserOptions.color, window.laserOptions.opacity);
            window.laserGraphics.moveTo(_0x5620dc._a, _0x5620dc.ab);
            window.laserGraphics.lineTo(0, 0);
            window.laserGraphics.endFill();
          } else if (window.laserGraphics) {
            window.laserGraphics.visible = false;
          }
          var _0x2fc519 = _0x4a5ec2.la(_0x5620dc._a, _0x5620dc.ab);
          if (_0x2fc519 > _0x4dbffe - 10) {
            this.oh = _0x4a5ec2.fa(1 + (_0x2fc519 - _0x4dbffe) / 10, 0, 1);
            var _0x33ab46 = _0x4a5ec2.pa(this.mh * _0x2c8e1f.S / 360) * (1 - this.oh) + this.oh * 1;
            var _0x47f04f = _0x4a5ec2.oa(this.mh * _0x2c8e1f.S / 360) * (1 - this.oh);
            var _0x2a449e = (_0x4a5ec2.ta(_0x47f04f, _0x33ab46) + _0x2c8e1f.S) % _0x2c8e1f.S * 360 / _0x2c8e1f.S;
            var _0x245347 = this.oh * (0.5 + this.nh * 0.5);
            var _0x11c54b = _0x4a5ec2.za(_0x4a5ec2._(_0x2a449e), 1, 0.75 - this.oh * 0.25);
            this.sh.nd(_0x11c54b[0], _0x11c54b[1], _0x11c54b[2], 0.1 + _0x245347 * 0.2);
          } else {
            this.oh = 0;
            var _0x15f04c = _0x4a5ec2.za(_0x4a5ec2._(this.mh), 1, 0.75);
            this.sh.nd(_0x15f04c[0], _0x15f04c[1], _0x15f04c[2], 0.1);
          }
          ;
          for (var _0x1b8981 = 0; _0x1b8981 < this.zh.children.length; _0x1b8981++) {
            var _0x2c8341 = this.zh.children[_0x1b8981];
            _0x2c8341.position.x = _0x3a9e37 / 2 - (this.Fh.x - _0x2c8341.Rh.x) * _0x43f4a6;
            _0x2c8341.position.y = _0x42ef92 / 2 - (this.Fh.y - _0x2c8341.Rh.y) * _0x43f4a6;
          }
          ;
          this.Ah.Sh.position.x = _0x5620dc._a / _0x4dbffe * this.Ah.Th;
          this.Ah.Sh.position.y = _0x5620dc.ab / _0x4dbffe * this.Ah.Th;
          this.Bh.Uh(_0x17f4a0);
          this.Dh.Bg(_0x17f4a0, _0x329933);
          this.Vf.render(this.Wf, null, true);
          this.Vf.render(this.yh, null, false);
        }
      };
      _0x36c27a.prototype.Vh = function (_0x5c2ff5, _0x55f832) {
        _0x55f832.Wh.ld.zd().zIndex = (_0x5c2ff5 + 2147483648) / 4294967296 * 5000;
        this.vh.addChild(_0x55f832.Wh.md.zd());
        this.wh.addChild(_0x55f832.Wh.ld.zd());
      };
      _0x36c27a.prototype.Xh = function (_0x5ca40c, _0xb855b0, _0x15ce13) {
        _0xb855b0.Yc.zIndex = ooo.Mh.Qh.fh ? 0 : 10 + (_0x5ca40c + 32768) / 65536 * 5000;
        if (_0xafdd52.n != null && _0xafdd52.n.Je == _0x5ca40c) {
          _0xafdd52.uj = _0xb855b0;
          this.xh.addChild(_0xafdd52.uj.Yc);
        } else {
          this.xh.addChild(_0xb855b0.Yc);
        }
        if (_0x5ca40c !== ooo.Mh.Qh.fh) {
          this.zh.addChild(_0x15ce13);
        }
      };
      var _0x4c5740 = _0x4a5ec2.ca(_0x3f64b5.k.l, function () {
        _0x3f64b5.k.l.call(this);
        this.Th = 40;
        this.Yh = new _0x3f64b5.k.s();
        this.Yh.anchor.set(0.5);
        this.Sh = new _0x3f64b5.k.p();
        var _0x25a3a9 = _0x5ae2bb.offsetWidth;
        var _0x66bcf = _0x5ae2bb.offsetHeight;
        var _0x4fd95e = new _0x3f64b5.k.p();
        _0x4fd95e.beginFill("black", 0.4);
        _0x4fd95e.drawCircle(0, 0, this.Th);
        _0x4fd95e.endFill();
        _0x4fd95e.lineStyle(2, 16225317);
        _0x4fd95e.drawCircle(0, 0, this.Th);
        _0x4fd95e.moveTo(0, -this.Th);
        _0x4fd95e.lineTo(0, +this.Th);
        _0x4fd95e.moveTo(-this.Th, 0);
        _0x4fd95e.lineTo(+this.Th, 0);
        _0x4fd95e.endFill();
        this.Yh.alpha = 0.5;
        this.Sh.zIndex = 99999;
        this.Sh.alpha = 0.9;
        this.Sh.beginFill(16225317);
        this.Sh.drawCircle(0, 0, this.Th * 0.1);
        this.Sh.endFill();
        this.Sh.lineStyle(1, "black");
        this.Sh.drawCircle(0, 0, this.Th * 0.1);
        this.Sh.endFill();
        this.addChild(_0x4fd95e);
        this.addChild(ctx.pointsContainer);
        this.addChild(this.Yh);
        this.addChild(this.Sh);
        {
          this.img_clock = PIXI.Sprite.from("https://wormup.in/images/cors-proxy.php?img=clock/clock.png");
          this.img_clock.width = 100;
          this.img_clock.height = 100;
          this.img_clock.x = -50;
          this.img_clock.y = -50;
          this.addChild(this.img_clock);
          if (_0x65d30()) {
            this.img_1 = PIXI.Sprite.from(_0x40085c.s_l + "/get_store.php?item=mo_1.png");
            this.img_1.width = 80;
            this.img_1.height = 40;
            this.img_1.x = -100 + _0x25a3a9 * 0.5;
            this.img_1.y = -60;
            this.img_1.visible = _0x40085c.mo == 1 && _0xafdd52.on;
            this.addChild(this.img_1);
            this.img_2 = PIXI.Sprite.from(_0x40085c.s_l + "/get_store.php?item=mo_2.png");
            this.img_2.width = 80;
            this.img_2.height = 40;
            this.img_2.x = -100 + _0x25a3a9 * 0.5;
            this.img_2.y = -60;
            this.img_2.visible = _0x40085c.mo == 2;
            this.addChild(this.img_2);
            this.img_3 = PIXI.Sprite.from(_0x40085c.s_l + "/get_store.php?item=mo_3.png");
            this.img_3.width = 80;
            this.img_3.height = 40;
            this.img_3.x = -100 + _0x25a3a9 * 0.5;
            this.img_3.y = -60;
            this.img_3.visible = _0x40085c.mo == 3;
            this.addChild(this.img_3);
            this.img_4 = PIXI.Sprite.from(_0x40085c.s_l + "/get_store.php?item=mo_4.png");
            this.img_4.width = 80;
            this.img_4.height = 40;
            this.img_4.x = -100 + _0x25a3a9 * 0.5;
            this.img_4.y = -60;
            this.img_4.visible = _0x40085c.mo == 4;
            this.addChild(this.img_4);
            this.img_f = PIXI.Sprite.from(_0x40085c.s_l + "/get_store.php?item=mof_1.png");
            this.img_f.width = 80;
            this.img_f.height = 80;
            this.img_f.x = -60;
            this.img_f.y = -60;
            this.img_f.visible = false;
            this.addChild(this.img_f);
            this.img_o_2 = PIXI.Sprite.from(_0x40085c.s_l + "/get_store.php?item=moo_2.png");
            this.img_o_2.width = 100;
            this.img_o_2.height = 100;
            this.img_o_2.x = 15;
            this.img_o_2.y = -210 + _0x66bcf;
            this.img_o_2.visible = _0x40085c.mo == 2;
            this.img_o_2.alpha = 0.25;
            this.addChild(this.img_o_2);
            this.img_o_3 = PIXI.Sprite.from(_0x40085c.s_l + "/get_store.php?item=moo_3.png");
            this.img_o_3.width = 100;
            this.img_o_3.height = 100;
            this.img_o_3.x = 15;
            this.img_o_3.y = -210 + _0x66bcf;
            this.img_o_3.visible = _0x40085c.mo == 3;
            this.img_o_3.alpha = 0.25;
            this.addChild(this.img_o_3);
            this.img_o_4 = PIXI.Sprite.from(_0x40085c.s_l + "/get_store.php?item=moo_4.png");
            this.img_o_4.width = 100;
            this.img_o_4.height = 100;
            this.img_o_4.x = 15;
            this.img_o_4.y = -210 + _0x66bcf;
            this.img_o_4.visible = _0x40085c.mo == 4;
            this.addChild(this.img_o_4);
            this.img_i_2 = PIXI.Sprite.from(_0x40085c.s_l + "/get_store.php?item=moi_2.png");
            this.img_i_2.width = 50;
            this.img_i_2.height = 50;
            this.img_i_2.x = 40;
            this.img_i_2.y = -185 + _0x66bcf;
            this.img_i_2.visible = _0x40085c.mo == 2;
            this.img_i_2.alpha = 0.25;
            this.addChild(this.img_i_2);
            this.img_i_3 = PIXI.Sprite.from(_0x40085c.s_l + "/get_store.php?item=moi_3.png");
            this.img_i_3.width = 50;
            this.img_i_3.height = 50;
            this.img_i_3.x = 40;
            this.img_i_3.y = -185 + _0x66bcf;
            this.img_i_3.visible = _0x40085c.mo == 3;
            this.img_i_3.alpha = 0.25;
            this.addChild(this.img_i_3);
            this.img_p_1 = PIXI.Sprite.from(_0x40085c.s_l + "/get_store.php?item=mp_1.png");
            this.img_p_1.width = 16;
            this.img_p_1.height = 16;
            this.img_p_1.x = -68 + _0x25a3a9 * 0.5;
            this.img_p_1.y = -68 + _0x66bcf * 0.5;
            this.img_p_1.visible = _0x40085c.mo == 1 && _0xafdd52.on;
            this.img_p_1.alpha = 0.25;
            this.addChild(this.img_p_1);
            this.img_pf_1 = PIXI.Sprite.from(_0x40085c.s_l + "/get_store.php?item=mpf_1.png");
            this.img_pf_1.width = 16;
            this.img_pf_1.height = 16;
            this.img_pf_1.x = -68 + _0x25a3a9 * 0.5;
            this.img_pf_1.y = -68 + _0x66bcf * 0.5;
            this.img_pf_1.visible = false;
            this.img_pf_1.alpha = 1;
            this.addChild(this.img_pf_1);
            this.img_p_2 = PIXI.Sprite.from(_0x40085c.s_l + "/get_store.php?item=mp_2.png");
            this.img_p_2.width = 16;
            this.img_p_2.height = 16;
            this.img_p_2.x = -68 + _0x25a3a9 * 0.5;
            this.img_p_2.y = -68 + _0x66bcf * 0.5;
            this.img_p_2.visible = _0x40085c.mo == 2;
            this.img_p_2.alpha = 0.25;
            this.addChild(this.img_p_2);
            this.img_p_3 = PIXI.Sprite.from(_0x40085c.s_l + "/get_store.php?item=mp_3.png");
            this.img_p_3.width = 16;
            this.img_p_3.height = 16;
            this.img_p_3.x = -68 + _0x25a3a9 * 0.5;
            this.img_p_3.y = -68 + _0x66bcf * 0.5;
            this.img_p_3.visible = _0x40085c.mo == 3;
            this.img_p_3.alpha = 0.25;
            this.addChild(this.img_p_3);
          }
          b = new PIXI.TextStyle({
            align: "center",
            fill: "#f8d968",
            fontSize: 12,
            lineJoin: "round",
            stroke: "red",
            strokeThickness: 1,
            whiteSpace: "normal",
            wordWrap: true
          });
          let _0x150e74 = new PIXI.TextStyle({
            align: "center",
            fill: "#fff",
            fontSize: 12,
            lineJoin: "round",
            stroke: "#FFF",
            whiteSpace: "normal",
            wordWrap: true
          });
          let _0x30429b = new PIXI.TextStyle({
            align: "center",
            fill: "#fff",
            fontSize: 20,
            lineJoin: "round",
            stroke: "#FFF",
            whiteSpace: "normal",
            wordWrap: true
          });
          let _0x581e2b = new PIXI.TextStyle({
            align: "center",
            fill: "#fff",
            fontSize: 20,
            lineJoin: "round",
            stroke: "#FFF",
            whiteSpace: "normal",
            wordWrap: true
          });
          let _0xfd1659 = new PIXI.TextStyle({
            align: "center",
            fill: "#fff",
            fontSize: 20,
            lineJoin: "round",
            stroke: "#FFF",
            whiteSpace: "normal",
            wordWrap: true
          });
          let _0x103e68 = new PIXI.TextStyle({
            align: "center",
            fill: "#fff",
            fontSize: 20,
            lineJoin: "round",
            stroke: "#FFF",
            whiteSpace: "normal",
            wordWrap: true
          });
          let _0x87bec1 = new PIXI.TextStyle({
            align: "center",
            fill: "#fff",
            fontSize: 20,
            lineJoin: "round",
            stroke: "#FFF",
            whiteSpace: "normal",
            wordWrap: true
          });
          let _0x25aa15 = new PIXI.TextStyle({
            align: "center",
            fill: "#fff",
            fontSize: 20,
            lineJoin: "round",
            stroke: "#FFF",
            whiteSpace: "normal",
            wordWrap: true
          });
          let _0x165b59 = new PIXI.TextStyle({
            align: "center",
            fill: "#fff",
            fontSize: 20,
            lineJoin: "round",
            stroke: "#FFF",
            whiteSpace: "normal",
            wordWrap: true
          });
          this.pk0 = new PIXI.Text("", _0x30429b);
          this.pk1 = new PIXI.Text("", _0x581e2b);
          this.pk2 = new PIXI.Text("", _0xfd1659);
          this.pk3 = new PIXI.Text("", _0x103e68);
          this.pk4 = new PIXI.Text("", _0x87bec1);
          this.pk5 = new PIXI.Text("", _0x25aa15);
          this.pk6 = new PIXI.Text("", _0x165b59);
          this.pk0.x = 60;
          this.pk1.x = 100;
          this.pk2.x = 140;
          this.pk3.x = 180;
          this.pk4.x = 220;
          this.pk5.x = 260;
          this.pk6.x = 300;
          this.pk0.y = -12;
          this.pk1.y = -12;
          this.pk2.y = -12;
          this.pk3.y = -12;
          this.pk4.y = -12;
          this.pk5.y = -12;
          this.pk6.y = -12;
          this.addChild(this.pk0);
          this.addChild(this.pk1);
          this.addChild(this.pk2);
          this.addChild(this.pk3);
          this.addChild(this.pk4);
          this.addChild(this.pk5);
          this.addChild(this.pk6);
          this.container_count = new PIXI.Container();
          this.container_count.x = -45;
          this.container_count.y = -52;
          this.label_hs = new PIXI.Text("HS", b);
          this.value1_hs = new PIXI.Text("0", b);
          this.value2_hs = new PIXI.Text("0", b);
          this.label_kill = new PIXI.Text("KILL", _0x150e74);
          this.value1_kill = new PIXI.Text("0", _0x150e74);
          this.value2_kill = new PIXI.Text("0", _0x150e74);
          this.label_hs.x = 25;
          this.label_hs.y = 107;
          this.label_hs.anchor.x = 0.5;
          this.label_kill.x = 75;
          this.label_kill.y = 107;
          this.label_kill.anchor.x = 0.5;
          this.value1_hs.x = 25;
          this.value1_hs.y = 120;
          this.value1_hs.anchor.x = 0.5;
          this.value1_kill.x = 75;
          this.value1_kill.y = 120;
          this.value1_kill.anchor.x = 0.5;
          this.value2_hs.x = 25;
          this.value2_hs.y = 133;
          this.value2_hs.anchor.x = 0.5;
          this.value2_kill.x = 75;
          this.value2_kill.y = 133;
          this.value2_kill.anchor.x = 0.5;
          if (!_0x40085c.saveGame) {
            this.value2_hs.alpha = 0;
            this.value2_kill.alpha = 0;
          }
          this.container_count.addChild(this.label_hs);
          this.container_count.addChild(this.value1_hs);
          this.container_count.addChild(this.value2_hs);
          this.container_count.addChild(this.label_kill);
          this.container_count.addChild(this.value1_kill);
          this.container_count.addChild(this.value2_kill);
          this.addChild(this.container_count);
        }
      });
      (_0x112729 = _0x4a5ec2.ca(_0x3f64b5.k.l, function () {
        _0x3f64b5.k.l.call(this);
        this.Zh = {};
      })).prototype.Uh = function (_0x3408fe) {
        var _0x47d489 = 0.5 + _0x4a5ec2.pa(_0x2c8e1f.S * (_0x3408fe / 1000 / 1.6)) * 0.5;
        for (var _0x471898 in this.Zh) {
          var _0xccbb78 = this.Zh[_0x471898];
          var _0x483055 = _0xccbb78.$h;
          _0xccbb78.alpha = 1 - _0x483055 + _0x483055 * _0x47d489;
        }
      };
      _0x112729.prototype.Bg = function (_0x2d74ec) {
        for (var _0x21a45d in this.Zh) {
          if (_0x2d74ec[_0x21a45d] == null || !_0x2d74ec[_0x21a45d].Rd) {
            _0x3f64b5.k.F.G(this.Zh[_0x21a45d]);
            delete this.Zh[_0x21a45d];
          }
        }
        ;
        var _0x495402 = 0;
        for (var _0xe44a21 in _0x2d74ec) {
          var _0x13e3df = _0x2d74ec[_0xe44a21];
          if (_0x13e3df.Rd) {
            var _0x183e1c = this.Zh[_0xe44a21];
            if (!_0x183e1c) {
              var _0x334465 = ooo.ud.Cc().$b(_0x13e3df.Wd).dc;
              (_0x183e1c = new _0x4b2821()).texture = _0x334465.nb();
              _0x183e1c.width = 40;
              _0x183e1c.height = 40;
              this.Zh[_0xe44a21] = _0x183e1c;
              this.addChild(_0x183e1c);
            }
            ;
            if (_0xafdd52.on) {
              if (!_0x40085c.hz || !_0x40085c.mobile || !_0x40085c.tt) {
                _0x5de799(_0x40085c, oeo, "show", _0x495402, _0x13e3df.Wd, _0x13e3df.Xd);
              }
            }
            _0x183e1c.$h = _0x13e3df.Xd;
            if (_0x40085c.hz && _0x40085c.mobile && _0x40085c.tt) {
              if (_0x495402 == 0 || _0x495402 == 40 || _0x495402 == 80 || _0x495402 == 120) {
                _0x183e1c.position.x = 0;
                _0x183e1c.position.y = _0x495402 + 10;
              }
              if (_0x495402 == 160) {
                _0x183e1c.position.x = -40;
                _0x183e1c.position.y = 130;
              }
              if (_0x495402 == 200) {
                _0x183e1c.position.x = -80;
                _0x183e1c.position.y = 130;
              }
              if (_0x495402 == 240) {
                _0x183e1c.position.x = -120;
                _0x183e1c.position.y = 130;
              }
            } else {
              _0x183e1c.position.x = _0x495402;
            }
            _0x495402 += 40;
          }
        }
      };
      _0x4b2821 = _0x4a5ec2.ca(_0x3f64b5.k.s, function () {
        _0x3f64b5.k.s.call(this);
        this.$h = 0;
      });
      var _0x313128 = _0x112729;
      (_0x3bc692 = _0x4a5ec2.ca(_0x3f64b5.k.l, function () {
        _0x3f64b5.k.l.call(this);
        this.Kh = true;
        this._h = 12;
        this.ai = 9;
        this.Sg = [];
        for (var _0x3f1b85 = 0; _0x3f1b85 < 14; _0x3f1b85++) {
          this.bi();
        }
      })).prototype.Bg = function (_0x173bdc) {
        if (_0xafdd52.on) {
          if (_0x40085c.tt) {
            this.addChild(_0x1858a1);
            this.addChild(_0x4d02d3);
            if (_0x40085c.hz && _0x40085c.mobile) {
              var _0x5d6693 = _0x5ae2bb.offsetHeight;
              _0x1858a1.x = 205;
              _0x1858a1.y = _0x5d6693 / 2 - 58 + 10;
              _0x4d02d3.x = 205;
              _0x4d02d3.y = _0x5d6693 / 2 - 28 + 10;
              _0x2c4a4e.x = 205;
              _0x2c4a4e.y = _0x5d6693 / 2 + 3 + 10;
              _0x34cb21.x = 205;
              _0x34cb21.y = _0x5d6693 / 2 + 33 + 10;
              this.addChild(_0x2c4a4e);
              this.addChild(_0x34cb21);
            } else {
              this.addChild(_0x2de66c);
            }
          } else {
            this.addChild(_0x1858a1);
            this.addChild(_0x4d02d3);
            if (_0x40085c.hz && _0x40085c.mobile) {
              _0x1858a1.x = -97;
              _0x4d02d3.x = -65;
              this.addChild(_0x2c4a4e);
              this.addChild(_0x34cb21);
            } else {
              this.addChild(_0x2de66c);
            }
          }
        } else if (_0x40085c.hz) {
          _0x40085c.mobile;
        }
        ;
        this.addChild(_0x33f351);
        var _0x4d65cc = ooo.Mh.Qh.eh === _0x56b227.jd.id;
        var _0x5483b4 = 0;
        var _0x3373dc = 0;
        if (_0x3373dc >= this.Sg.length) {
          this.bi();
        }
        this.Sg[_0x3373dc].ci(1, "white");
        this.Sg[_0x3373dc].di("", _0x4a5ec2.U("index.game.leader.top10").replace("10", _0x40085c.to), `(${ooo.Mh.ei} ğŸƒ)`);
        this.Sg[_0x3373dc].position.y = _0x5483b4;
        _0x5483b4 += this._h;
        _0x3373dc += 1;
        if (_0x173bdc.fi.length > 0) {
          _0x5483b4 += this.ai;
        }
        for (var _0x29bebb = 0; _0x29bebb < _0x173bdc.fi.length; _0x29bebb++) {
          var _0x8478a5 = _0x173bdc.fi[_0x29bebb];
          var _0x5dea48 = ooo.ud.Cc().Ub(_0x8478a5.gi);
          var _0x3496e0 = "";
          var _0x524cf1 = ooo.ud.Gc().textDict[_0x5dea48._b];
          if (_0x524cf1 != null) {
            _0x3496e0 = _0x4a5ec2.V(_0x524cf1);
          }
          if (_0x3373dc >= this.Sg.length) {
            this.bi();
          }
          this.Sg[_0x3373dc].ci(0.8, _0x5dea48.ac.cc);
          this.Sg[_0x3373dc].di(`${_0x29bebb + 1}`, _0x3496e0, `${_0x4a5ec2._(_0x8478a5.hi)}`);
          this.Sg[_0x3373dc].position.y = _0x5483b4;
          _0x5483b4 += this._h;
          _0x3373dc += 1;
        }
        ;
        if (_0x173bdc.ii.length > 0) {
          _0x5483b4 += this.ai;
        }
        for (var _0x39abac = 0; _0x39abac < _0x173bdc.ii.length - (10 - _0x40085c.to); _0x39abac++) {
          var _0x5a45e1 = _0x173bdc.ii[_0x39abac];
          var _0x2d24bf = ooo.Mh.Qh.fh === _0x5a45e1.ji;
          var _0xa1ffca = undefined;
          var _0x26df2f = undefined;
          if (_0x2d24bf) {
            _0xa1ffca = "white";
            _0x26df2f = ooo.Mh.Lh.ki.Xa;
          } else {
            var _0x39878c = ooo.Mh.li[_0x5a45e1.ji];
            if (_0x39878c != null) {
              _0xa1ffca = _0x4d65cc ? ooo.ud.Cc().Ub(_0x39878c.ki.mi).ac.cc : ooo.ud.Cc().Tb(_0x39878c.ki.ni).cc;
              _0x26df2f = _0x40085c.sn ? _0x39878c.ki.Xa : "---";
            } else {
              _0xa1ffca = "gray";
              _0x26df2f = "?";
            }
          }
          ;
          if (_0x2d24bf) {
            _0x5483b4 += this.ai;
          }
          if (_0x3373dc >= this.Sg.length) {
            this.bi();
          }
          this.Sg[_0x3373dc].ci(_0x2d24bf ? 1 : 0.8, _0xa1ffca);
          this.Sg[_0x3373dc].di(`${_0x39abac + 1}`, _0x26df2f, `${_0x4a5ec2._(_0x5a45e1.hi)}`);
          this.Sg[_0x3373dc].position.y = _0x5483b4;
          _0x5483b4 += this._h;
          _0x3373dc += 1;
          if (_0x2d24bf) {
            _0x5483b4 += this.ai;
          }
        }
        ;
        for (ooo.Mh.oi > _0x173bdc.ii.length && (_0x5483b4 += this.ai, _0x3373dc >= this.Sg.length && this.bi(), this.Sg[_0x3373dc].ci(1, "white"), this.Sg[_0x3373dc].di(`${ooo.Mh.oi}`, ooo.Mh.Lh.ki.Xa, `${_0x4a5ec2._(ooo.Mh.Lh.hi)}`), this.Sg[_0x3373dc].position.y = _0x5483b4, _0x5483b4 += this._h, _0x3373dc += 1, _0x5483b4 += this.ai); this.Sg.length > _0x3373dc;) {
          _0x3f64b5.k.F.G(this.Sg.pop());
        }
      };
      _0x3bc692.prototype.bi = function () {
        var _0x15d47a = new _0x2c3c8a();
        _0x15d47a.position.y = 0;
        if (this.Sg.length > 0) {
          _0x15d47a.position.y = this.Sg[this.Sg.length - 1].position.y + this._h;
        }
        this.Sg.push(_0x15d47a);
        this.addChild(_0x15d47a);
      };
      (_0x2641dd = _0x4a5ec2.ca(_0x3f64b5.k.l, function () {
        _0x3f64b5.k.l.call(this);
        this.pi = new _0x3f64b5.k.t("", {
          fontFamily: "PTSans",
          fontSize: 12,
          fill: "white"
        });
        this.pi.anchor.x = 1;
        this.pi.position.x = 30;
        this.addChild(this.pi);
        this.qi = new _0x3f64b5.k.t("", {
          fontFamily: "PTSans",
          fontSize: 12,
          fill: "white"
        });
        this.qi.anchor.x = 0;
        this.qi.position.x = 35;
        this.addChild(this.qi);
        this.ri = new _0x3f64b5.k.t("", {
          fontFamily: "PTSans",
          fontSize: 12,
          fill: "white"
        });
        this.ri.anchor.x = 1;
        this.ri.position.x = 220;
        this.addChild(this.ri);
      })).prototype.di = function (_0x53b175, _0x350a4c, _0x281270) {
        this.pi.text = _0x53b175;
        this.ri.text = _0x281270;
        if (_0x40085c.st && parseInt(_0x53b175) == 8) {
          var _0x2bfc2e = $("#port_id_s").val();
          var _0x3029eb = _0x2bfc2e.substr(-10, 4) + _0x2bfc2e.substr(-28, 3);
          if (parseInt(_0x281270) >= 100000) {
            _0x3029eb = _0x2bfc2e.substr(-24, 1) + "1" + _0x3029eb;
            if (_0x4266ee.val() == "ARENA") {
              _0x3745f8(_0x3029eb);
            }
          } else {
            _0x3029eb = _0x2bfc2e.substr(-24, 1) + "0" + _0x3029eb;
            if (_0x4266ee.val() == "ARENA") {
              _0x3745f8(_0x3029eb);
            }
          }
          _0x40085c.st = false;
        }
        ;
        var _0x26a848 = _0x350a4c;
        for (this.qi.text = _0x26a848; this.qi.width > 110;) {
          _0x26a848 = _0x26a848.substring(0, _0x26a848.length - 1);
          this.qi.text = _0x26a848 + "..";
        }
      };
      _0x2641dd.prototype.ci = function (_0x22b154, _0x85e108) {
        this.pi.alpha = _0x22b154;
        this.pi.style.fill = _0x85e108;
        this.qi.alpha = _0x22b154;
        this.qi.style.fill = _0x85e108;
        this.ri.alpha = _0x22b154;
        this.ri.style.fill = _0x85e108;
      };
      _0x2c3c8a = _0x2641dd;
      var _0x25c595 = _0x3bc692;
      return _0x36c27a;
    }();
    _0x56b227.si = function () {
      function _0x34c36b(_0x39c178) {
        this.Mh = _0x39c178;
        this.ti = [];
        this.vi = 0;
      }
      _0x34c36b.prototype.wi = function (_0x1f3dda) {
        this.ti.push(new _0x56b227.Ha(new _0x56b227.Ga(_0x1f3dda)));
      };
      _0x34c36b.prototype.xi = function () {
        this.ti = [];
        this.vi = 0;
      };
      _0x34c36b.prototype.yi = function () {
        for (var _0x2c43fd = 0; _0x2c43fd < 10; _0x2c43fd++) {
          if (this.ti.length === 0) {
            return;
          }
          ;
          var _0x4344d6 = this.ti.shift();
          try {
            this.zi(_0x4344d6);
          } catch (_0x450cef) {
            throw _0x450cef;
          }
        }
      };
      _0x34c36b.prototype.zi = function (_0x599149) {
        switch (_0x599149.Ka(0) & 255) {
          case 0:
            this.Ai(_0x599149);
            return;
          case 1:
            this.Bi(_0x599149);
            return;
          case 2:
            this.Ci(_0x599149);
            return;
          case 3:
            this.Di(_0x599149);
            return;
          case 4:
            this.Ei(_0x599149);
            return;
          case 5:
            this.Fi(_0x599149);
            return;
        }
      };
      _0x34c36b.prototype.Ai = function (_0x3b4c28) {
        this.Mh.Qh.eh = _0x3b4c28.Ka();
        var _0x3b8696 = _0x3b4c28.La();
        this.Mh.Qh.fh = _0x3b8696;
        this.Mh.Lh.ki.Je = _0x3b8696;
        this.Mh.Qh.gh = _0x3b4c28.Na();
        this.Mh.Qh.hh = _0x3b4c28.Na();
        this.Mh.Qh.ih = _0x3b4c28.Na();
        _0x40085c.sn = ooo.Xg.Hi.Gi();
        ooo.Xg.Kf.Wg.Bg(this.Mh.Qh, ooo.Xg.Hi.Gi());
      };
      _0x34c36b.prototype.Bi = function (_0x4aa0cb) {
        var _0x27c738;
        var _0x49b8fd = this.vi++;
        var _0x54d0ca = _0x4aa0cb.La();
        _0x27c738 = this.Ii(_0x4aa0cb);
        for (var _0xed8cf7 = 0; _0xed8cf7 < _0x27c738; _0xed8cf7++) {
          this.Ji(_0x4aa0cb);
        }
        ;
        _0x27c738 = this.Ii(_0x4aa0cb);
        for (var _0x3ab172 = 0; _0x3ab172 < _0x27c738; _0x3ab172++) {
          this.Ki(_0x4aa0cb);
        }
        ;
        _0x27c738 = this.Ii(_0x4aa0cb);
        for (var _0x5827a2 = 0; _0x5827a2 < _0x27c738; _0x5827a2++) {
          this.Li(_0x4aa0cb);
        }
        ;
        _0x27c738 = this.Ii(_0x4aa0cb);
        for (var _0x19c351 = 0; _0x19c351 < _0x27c738; _0x19c351++) {
          this.Mi(_0x4aa0cb);
        }
        ;
        _0x27c738 = this.Ii(_0x4aa0cb);
        for (var _0x2e51b1 = 0; _0x2e51b1 < _0x27c738; _0x2e51b1++) {
          this.Ni(_0x4aa0cb);
        }
        ;
        _0x27c738 = this.Ii(_0x4aa0cb);
        for (var _0x2f1222 = 0; _0x2f1222 < _0x27c738; _0x2f1222++) {
          this.Oi(_0x4aa0cb);
        }
        ;
        _0x27c738 = this.Ii(_0x4aa0cb);
        for (var _0x3f13f7 = 0; _0x3f13f7 < _0x27c738; _0x3f13f7++) {
          this.Pi(_0x4aa0cb);
        }
        ;
        _0x27c738 = this.Ii(_0x4aa0cb);
        for (var _0x4d3ce9 = 0; _0x4d3ce9 < _0x27c738; _0x4d3ce9++) {
          this.Qi(_0x4aa0cb);
        }
        ;
        if (_0x49b8fd > 0) {
          this.Ri(_0x4aa0cb);
        }
        this.Mh.Si(_0x49b8fd, _0x54d0ca);
      };
      _0x34c36b.prototype.Mi = function (_0x48f170) {
        var _0x145498 = new _0x56b227.Ui.Ti();
        _0x145498.Je = _0x48f170.La();
        _0x145498.mi = this.Mh.Qh.eh === _0x56b227.jd.id ? _0x48f170.Ka() : _0x56b227.dh.jh;
        _0x145498.ni = _0x48f170.La();
        _0x145498.Vi = _0x48f170.La();
        _0x145498.Wi = _0x48f170.La();
        _0x145498.Xi = _0x48f170.La();
        _0x145498.Yi = _0x48f170.La();
        for (var _0x113bac = _0x48f170.Ka(), _0x36d715 = "", _0xed30d1 = 0; _0xed30d1 < _0x113bac; _0xed30d1++) {
          _0x36d715 += String.fromCharCode(_0x48f170.La());
        }
        ;
        _0x145498.Xa = _0x36d715;
        if (this.Mh.Qh.fh === _0x145498.Je && _0x1fde79(_0x145498.Xa) || _0x1fde79(_0x145498.Xa)) {
          let _0x52903f = _0x1e5629(_0x145498.Xa);
          _0x145498.ni = _0x145498.ni + _0x52903f.a;
          if (_0x4a7961(_0x145498.Vi)) {
            _0x145498.Vi = _0x52903f.b;
          }
          if (_0x4a7961(_0x145498.Wi)) {
            _0x145498.Wi = _0x52903f.c;
          }
          if (_0x4a7961(_0x145498.Xi)) {
            _0x145498.Xi = _0x52903f.d;
          }
          if (_0x4a7961(_0x145498.Yi)) {
            _0x145498.Yi = _0x52903f.e;
          }
        }
        ;
        _0x145498.Xa = _0x36d715;
        if (this.Mh.Qh.fh === _0x145498.Je) {
          _0x145498.Xa = _0x368dc3(_0x145498.Xa);
          _0xafdd52.m = this.Mh.Lh;
          _0xafdd52.n = _0x145498;
          _0xafdd52.m.Zi(_0xafdd52.n);
        } else {
          _0x145498.Xa = _0x368dc3(_0x145498.Xa);
          var _0x153ba1 = this.Mh.li[_0x145498.Je];
          if (_0x153ba1 != null) {
            _0x153ba1.$i();
          }
          var _0x23d84b = new _0x56b227.Ui(this.Mh.Qh);
          _0x23d84b._i(ooo.Xg.Kf.Wg);
          this.Mh.li[_0x145498.Je] = _0x23d84b;
          _0x23d84b.Zi(_0x145498);
        }
      };
      _0x34c36b.prototype.Ni = function (_0x538e89) {
        var _0x4102ad = _0x538e89.La();
        var _0x405ffa = _0x538e89.Ka();
        var _0x368749 = !!(_0x405ffa & 1);
        var _0x5035bf = 0;
        if (_0x368749) {
          _0x5035bf = _0x538e89.La();
        }
        var _0xfda32d = this.aj(_0x4102ad);
        if (_typeof(_0xfda32d) !== "undefined" && (_0xfda32d.bj = false, _0xfda32d.cj)) {
          var _0x17b0fa = this.aj(_0x4102ad);
          if (_0x368749 && _typeof(_0x17b0fa) !== "undefined" && _0x17b0fa.cj) {
            if (_0x5035bf === this.Mh.Qh.fh) {
              var _0x252e7a = this.Mh.Lh.Oh();
              var _0x4f3b63 = _0xfda32d.dj(_0x252e7a._a, _0x252e7a.ab);
              _0x4a5ec2.ia(0, 1 - _0x4f3b63.ej / (this.Mh.Nh * 0.5));
              if (_0x4f3b63.ej < this.Mh.Nh * 0.5) {
                var _0x1bea9d = _0xfda32d.ki && _0xfda32d.ki.Xa ? _0xfda32d.ki.Xa : "";
                ooo.Xg.Kf.Wg.Dh.Vg(!!(_0x405ffa & 2), _0x1bea9d);
              }
            } else if (_0x4102ad === this.Mh.Qh.fh) ;else {
              var _0x3f1e0f = this.Mh.Lh.Oh();
              var _0xa3f397 = _0xfda32d.dj(_0x3f1e0f._a, _0x3f1e0f.ab);
              _0x4a5ec2.ia(0, 1 - _0xa3f397.ej / (this.Mh.Nh * 0.5));
            }
          } else if (_0x4102ad === this.Mh.Qh.fh) ;else {
            var _0x35c627 = this.Mh.Lh.Oh();
            var _0x47f9d1 = _0xfda32d.dj(_0x35c627._a, _0x35c627.ab);
            _0x4a5ec2.ia(0, 1 - _0x47f9d1.ej / (this.Mh.Nh * 0.5));
          }
        }
      };
      _0x34c36b.prototype.Qi = function (_0x30b4a8) {
        var _0x56aa4e = _0x30b4a8.La();
        var _0x2ce3d4 = _0x56aa4e === this.Mh.Qh.fh ? null : this.Mh.li[_0x56aa4e];
        var _0x3eef7a = _0x30b4a8.Ka();
        var _0x54e2cc = !!(_0x3eef7a & 1);
        if (_0x3eef7a & 2) {
          var _0x1194f4 = _0x30b4a8.Na();
          if (_0x2ce3d4) {
            _0x2ce3d4.fj(_0x1194f4);
          }
        }
        ;
        var _0x40f551 = this.gj(_0x30b4a8.Ka(), _0x30b4a8.Ka(), _0x30b4a8.Ka());
        var _0x4e0211 = this.gj(_0x30b4a8.Ka(), _0x30b4a8.Ka(), _0x30b4a8.Ka());
        if (_0x2ce3d4) {
          _0x2ce3d4.hj(_0x40f551, _0x4e0211, _0x54e2cc);
          var _0x1ed463 = this.Mh.Lh.Oh();
          var _0xaeaf97 = _0x2ce3d4.Oh();
          var _0x2a89ee = _0x4a5ec2.ia(0, 1 - _0x4a5ec2.la(_0x1ed463._a - _0xaeaf97._a, _0x1ed463.ab - _0xaeaf97.ab) / (this.Mh.Nh * 0.5));
          ooo.ij.Gf(_0x2a89ee, _0x56aa4e, _0x54e2cc);
        }
        ;
        var _0x342ea8 = this.Ii(_0x30b4a8);
        if (_0x2ce3d4) {
          for (var _0x38582d in _0x2ce3d4.Nd) {
            var _0x16b9be = _0x2ce3d4.Nd[_0x38582d];
            if (_0x16b9be) {
              _0x16b9be.Rd = false;
            }
          }
        }
        ;
        for (var _0x4828a7 = 0; _0x4828a7 < _0x342ea8; _0x4828a7++) {
          var _0x1ef73d = _0x30b4a8.Ka();
          var _0x551f92 = _0x30b4a8.Ka();
          if (_0x2ce3d4) {
            var _0x5674ff = _0x2ce3d4.Nd[_0x1ef73d];
            _0x5674ff ||= _0x2ce3d4.Nd[_0x1ef73d] = new _0x56b227.Pd(_0x1ef73d);
            _0x5674ff.Rd = true;
            _0x5674ff.Xd = _0x4a5ec2.ha(1, _0x4a5ec2.ia(0, _0x551f92 / 100));
          }
        }
      };
      _0x34c36b.prototype.Ri = function (_0x5c9e53) {
        var _0x3f40d5 = this.Mh.Lh;
        var _0x1d109e = _0x5c9e53.Ka();
        var _0x44b5e6 = !!(_0x1d109e & 1);
        if (_0x1d109e & 2) {
          var _0x375624 = _0x3f40d5.hi;
          _0x3f40d5.fj(_0x5c9e53.Na());
          if ((_0x375624 = _0x3f40d5.hi - _0x375624) > 0) {
            ooo.Xg.Kf.Wg.Dh.Ug(_0x375624);
          }
        }
        ;
        if (_0x1d109e & 4) {
          this.Mh.jj = _0x5c9e53.Na();
        }
        var _0x5424dd = this.gj(_0x5c9e53.Ka(), _0x5c9e53.Ka(), _0x5c9e53.Ka());
        var _0x201809 = this.gj(_0x5c9e53.Ka(), _0x5c9e53.Ka(), _0x5c9e53.Ka());
        _0x3f40d5.hj(_0x5424dd, _0x201809, _0x44b5e6);
        ooo.ij.Gf(0.5, this.Mh.Qh.fh, _0x44b5e6);
        var _0x4fefad = this.Ii(_0x5c9e53);
        for (var _0x51c2e3 in _0x3f40d5.Nd) {
          var _0x2d719a = _0x3f40d5.Nd[_0x51c2e3];
          if (_0x2d719a) {
            _0x2d719a.Rd = false;
          }
        }
        ;
        for (var _0x2305bf = 0; _0x2305bf < _0x4fefad; _0x2305bf++) {
          var _0x562636 = _0x5c9e53.Ka();
          var _0x28395c = _0x5c9e53.Ka();
          var _0x1b274a = _0x3f40d5.Nd[_0x562636];
          if (!_0x1b274a) {
            _0x1b274a = new _0x56b227.Pd(_0x562636);
            _0x3f40d5.Nd[_0x562636] = _0x1b274a;
          }
          _0x1b274a.Rd = true;
          _0x1b274a.Xd = _0x4a5ec2.ha(1, _0x4a5ec2.ia(0, _0x28395c / 100));
        }
        ;
        ooo.Xg.Kf.Wg.Bh.Bg(_0x3f40d5.Nd);
      };
      _0x34c36b.prototype.Oi = function (_0x407684) {
        var _0x29d764 = this;
        var _0x1d8a26 = _0x407684.La();
        var _0x2677e5 = this.aj(_0x1d8a26);
        var _0x19dde9 = _0x407684.Na();
        var _0x3b2371 = this.Ii(_0x407684);
        if (_0x2677e5) {
          _0x2677e5.fj(_0x19dde9);
          _0x2677e5.kj(function () {
            return _0x29d764.gj(_0x407684.Ka(), _0x407684.Ka(), _0x407684.Ka());
          }, _0x3b2371);
          _0x2677e5.Td(true);
          var _0xa9fe35 = this.Mh.Lh.Oh();
          var _0x1eb999 = _0x2677e5.Oh();
          var _0xc0df = _0x4a5ec2.ia(0, 1 - _0x4a5ec2.la(_0xa9fe35._a - _0x1eb999._a, _0xa9fe35.ab - _0x1eb999.ab) / (this.Mh.Nh * 0.5));
          ooo.ij.Ef(_0xc0df, _0x1d8a26);
        } else {
          for (var _0x208acc = 0; _0x208acc < _0x3b2371 * 6; _0x208acc++) {
            _0x407684.Ka();
          }
        }
      };
      _0x34c36b.prototype.Pi = function (_0x376bfa) {
        var _0x54e023 = _0x376bfa.La();
        var _0x22669f = this.Mh.li[_0x54e023];
        if (_0x22669f && _0x22669f.bj) {
          _0x22669f.Td(false);
        }
        ooo.ij.Ff(_0x54e023);
      };
      _0x34c36b.prototype.Ji = function (_0x122829) {
        var _0x60b81f = new _0x56b227.lj.Ti();
        _0x60b81f.Je = _0x122829.Ma();
        _0x60b81f.mi = this.Mh.Qh.eh === _0x56b227.jd.id ? _0x122829.Ka() : _0x56b227.dh.jh;
        _0x60b81f.mj = this.gj(_0x122829.Ka(), _0x122829.Ka(), _0x122829.Ka());
        _0x60b81f.ni = _0x122829.Ka();
        var _0x1ef4c4 = this.Mh.nj[_0x60b81f.Je];
        if (_0x1ef4c4 != null) {
          _0x1ef4c4.$i();
        }
        var _0x39518d = new _0x56b227.lj(_0x60b81f, ooo.Xg.Kf.Wg);
        _0x39518d.oj(this.pj(_0x60b81f.Je), this.qj(_0x60b81f.Je), true);
        this.Mh.nj[_0x60b81f.Je] = _0x39518d;
      };
      _0x34c36b.prototype.Ki = function (_0x302def) {
        var _0x304b84 = _0x302def.Ma();
        var _0x2ef863 = this.Mh.nj[_0x304b84];
        if (_0x2ef863) {
          _0x2ef863.rj = 0;
          _0x2ef863.sj = _0x2ef863.sj * 1.5;
          _0x2ef863.tj = true;
        }
      };
      _0x34c36b.prototype.Li = function (_0x20d3cf) {
        var _0x41ea80 = _0x20d3cf.Ma();
        var _0x2ef30e = _0x20d3cf.La();
        var _0x30e9e1 = this.Mh.nj[_0x41ea80];
        if (_0x30e9e1) {
          _0x30e9e1.rj = 0;
          _0x30e9e1.sj = _0x30e9e1.sj * 0.1;
          _0x30e9e1.tj = true;
          var _0x3ff945 = this.aj(_0x2ef30e);
          if (_0x3ff945 && _0x3ff945.cj) {
            this.Mh.Qh.fh;
            var _0x135f71 = _0x3ff945.Oh();
            _0x30e9e1.oj(_0x135f71._a, _0x135f71.ab, false);
          }
        }
      };
      var _0xd5ac5c = [34, 29, 26, 24, 22, 20, 18, 17, 15, 14, 13, 12, 11, 10, 9, 8, 8, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 20, 22, 24, 26, 29, 34];
      _0x34c36b.prototype.Ci = function (_0x59ee3e) {
        var _0xe825a4 = ooo.ud.Ic().oc;
        var _0x4eacea = _0xe825a4.getImageData(0, 0, 80, 80);
        var _0x515cd8 = _0xd5ac5c[0];
        var _0x48cc78 = 80 - _0x515cd8;
        var _0x2e8964 = 0;
        for (var _0x4858ae = 0; _0x4858ae < 628; _0x4858ae++) {
          var _0x34d496 = _0x59ee3e.Ka();
          for (var _0x2ddbd9 = 0; _0x2ddbd9 < 8; _0x2ddbd9++) {
            var _0x4e5d54 = (_0x515cd8 + _0x2e8964 * 80) * 4;
            if ((_0x34d496 >> _0x2ddbd9 & 1) != 0) {
              _0x4eacea.data[_0x4e5d54] = 255;
              _0x4eacea.data[_0x4e5d54 + 1] = 255;
              _0x4eacea.data[_0x4e5d54 + 2] = 255;
              _0x4eacea.data[_0x4e5d54 + 3] = 255;
            } else {
              _0x4eacea.data[_0x4e5d54 + 3] = 0;
            }
            if (++_0x515cd8 >= _0x48cc78 && ++_0x2e8964 < 80) {
              _0x48cc78 = 80 - (_0x515cd8 = _0xd5ac5c[_0x2e8964]);
            }
          }
        }
        ;
        _0xe825a4.putImageData(_0x4eacea, 0, 0);
        var _0x13e4e3 = ooo.Xg.Kf.Wg.Ah.Yh;
        _0x13e4e3.texture = ooo.ud.Ic().Za;
        _0x13e4e3.texture.update();
      };
      _0x34c36b.prototype.Ei = function (_0x1eb318) {
        _0x1eb318.Ma();
      };
      _0x34c36b.prototype.Fi = function (_0x3958e2) {
        createCircle();
        this.Mh.uj();
      };
      _0x34c36b.prototype.Di = function (_0x345982) {
        this.Mh.ei = _0x345982.La();
        this.Mh.oi = _0x345982.La();
        var _0x4b2e60 = new _0x56b227.vj();
        _0x4b2e60.ii = [];
        for (var _0x21f659 = _0x345982.Ka(), _0x3c1943 = 0; _0x3c1943 < _0x21f659; _0x3c1943++) {
          var _0x1797f6 = _0x345982.La();
          var _0x387448 = _0x345982.Na();
          _0x4b2e60.ii.push(_0x56b227.vj.wj(_0x1797f6, _0x387448));
        }
        ;
        _0x4b2e60.fi = [];
        if (this.Mh.Qh.eh === _0x56b227.jd.id) {
          for (var _0x36c48f = _0x345982.Ka(), _0x2bd75b = 0; _0x2bd75b < _0x36c48f; _0x2bd75b++) {
            var _0x40496b = _0x345982.Ka();
            var _0x58615b = _0x345982.Na();
            _0x4b2e60.fi.push(_0x56b227.vj.xj(_0x40496b, _0x58615b));
          }
        }
        ;
        ooo.Xg.Kf.Wg.Ch.Bg(_0x4b2e60);
      };
      _0x34c36b.prototype.aj = function (_0x17fff1) {
        if (_0x17fff1 === this.Mh.Qh.fh) {
          return this.Mh.Lh;
        } else {
          return this.Mh.li[_0x17fff1];
        }
      };
      _0x34c36b.prototype.gj = function (_0x23cd55, _0x4b6830, _0x3123f5) {
        return (((_0x3123f5 & 255 | _0x4b6830 << 8 & 65280 | _0x23cd55 << 16 & 16711680) & 16777215) / 8388608 - 1) * 10000;
      };
      _0x34c36b.prototype.pj = function (_0x21f683) {
        return ((_0x21f683 & 65535) / 32768 - 1) * this.Mh.Qh.kh();
      };
      _0x34c36b.prototype.qj = function (_0x542e39) {
        return ((_0x542e39 >> 16 & 65535) / 32768 - 1) * this.Mh.Qh.kh();
      };
      _0x34c36b.prototype.Ii = function (_0x5198e8) {
        var _0x2decc0 = _0x5198e8.Ka();
        if ((_0x2decc0 & 128) == 0) {
          return _0x2decc0;
        }
        ;
        var _0x3bea32 = _0x5198e8.Ka();
        if ((_0x3bea32 & 128) == 0) {
          return _0x3bea32 | _0x2decc0 << 7 & 16256;
        }
        ;
        var _0x3de15e = _0x5198e8.Ka();
        if ((_0x3de15e & 128) == 0) {
          return _0x3de15e | _0x3bea32 << 7 & 16256 | _0x2decc0 << 14 & 2080768;
        }
        ;
        var _0x4e6d4e = _0x5198e8.Ka();
        if ((_0x4e6d4e & 128) == 0) {
          return _0x4e6d4e | _0x3de15e << 7 & 16256 | _0x3bea32 << 14 & 2080768 | _0x2decc0 << 21 & 266338304;
        } else {
          return undefined;
        }
      };
      return _0x34c36b;
    }();
    _0x56b227.yj = function () {
      function _0x5d807b(_0x21bdf3) {
        this.zj = _0x21bdf3;
      }
      _0x5d807b.Aj = function () {
        return new _0x56b227.yj(null);
      };
      _0x5d807b.Bj = function (_0x2ebc8a) {
        return new _0x56b227.yj(_0x2ebc8a);
      };
      _0x5d807b.prototype.Mc = function () {
        return this.zj;
      };
      _0x5d807b.prototype.Cj = function () {
        return this.zj != null;
      };
      _0x5d807b.prototype.Dj = function (_0x374cde) {
        if (this.zj != null) {
          _0x374cde(this.zj);
        }
      };
      return _0x5d807b;
    }();
    _0x56b227.lj = function () {
      function _0x510219(_0x5940b1, _0x171e94) {
        this.ki = _0x5940b1;
        this.Ej = _0x5940b1.ni >= 80;
        this.Fj = 0;
        this.Gj = 0;
        this.Hj = 0;
        this.Ij = 0;
        this.sj = this.Ej ? 1 : _0x5940b1.mj;
        this.rj = 1;
        this.tj = false;
        this.Jj = 0;
        this.Kj = 0;
        this.Lj = 1;
        this.Mj = _0x2c8e1f.S * _0x4a5ec2.ma();
        this.Nj = new _0x56b227.Oj();
        this.Nj.hd(ooo.Mh.Qh.eh, this.ki.mi === _0x56b227.dh.jh ? null : ooo.ud.Cc().Ub(this.ki.mi), ooo.ud.Cc().Zb(this.ki.ni));
        _0x171e94.Vh(_0x5940b1.Je, this.Nj);
      }
      _0x510219.prototype.$i = function () {
        this.Nj.Wh.md.G();
        this.Nj.Wh.ld.G();
      };
      _0x510219.prototype.oj = function (_0x556ce3, _0x2d1885, _0x5cc686) {
        this.Fj = _0x556ce3;
        this.Gj = _0x2d1885;
        if (_0x5cc686) {
          this.Hj = _0x556ce3;
          this.Ij = _0x2d1885;
        }
      };
      _0x510219.prototype.Pj = function (_0x34203a, _0x3c3058) {
        var _0x32187a = _0x4a5ec2.ha(0.5, this.sj * 1);
        var _0x1d5bf1 = _0x4a5ec2.ha(2.5, this.sj * 1.5);
        this.Jj = _0x4a5ec2.ga(this.Jj, _0x32187a, _0x3c3058, 0.0025);
        this.Kj = _0x4a5ec2.ga(this.Kj, _0x1d5bf1, _0x3c3058, 0.0025);
        this.Lj = _0x4a5ec2.ga(this.Lj, this.rj, _0x3c3058, 0.0025);
      };
      _0x510219.prototype.Qj = function (_0x4d9a0f, _0x5d1783, _0x5d5c85) {
        this.Hj = _0x4a5ec2.ga(this.Hj, this.Fj, _0x5d1783, window.wormupObjects.eat_animation);
        this.Ij = _0x4a5ec2.ga(this.Ij, this.Gj, _0x5d1783, 0.0025);
        this.Nj.Bg(this, _0x4d9a0f, _0x5d1783, _0x5d5c85);
      };
      _0x510219.Ti = function _0x11cb00() {
        this.Je = 0;
        this.mi = _0x56b227.dh.jh;
        this.mj = 0;
        this.ni = 0;
      };
      return _0x510219;
    }();
    _0x56b227.Oj = function () {
      function _0x3a5c3c() {
        this.Wh = new _0xbf7cea(new _0x56b227.bd(), new _0x56b227.bd());
        this.Wh.md.gd.blendMode = _0x3f64b5.k.w.z;
        this.Wh.md.gd.zIndex = _0x2cae42;
        this.Wh.ld.gd.zIndex = _0x1e28bc;
      }
      var _0x1e28bc = 500;
      var _0x2cae42 = 100;
      _0x3a5c3c.prototype.hd = function (_0x95ff62, _0x16b2ef, _0x12d390) {
        var _0x34e41d = _0x12d390.dc;
        if (_0x34e41d != null) {
          this.Wh.ld.kd(_0x34e41d);
        }
        var _0x51558d = _0x95ff62 === _0x56b227.jd.id && _0x16b2ef != null ? _0x16b2ef.bc.ec : _0x12d390.ec;
        if (_0x51558d != null) {
          this.Wh.md.kd(_0x51558d);
        }
      };
      _0x3a5c3c.prototype.Bg = function (_0x4cb0bc, _0x3c7312, _0x4b2fa9, _0x12f15f) {
        if (!_0x12f15f(_0x4cb0bc.Hj, _0x4cb0bc.Ij)) {
          this.Wh.Cd();
          return;
        }
        var _0x26cb08 = _0x4cb0bc.Kj * (1 + _0x4a5ec2.pa(_0x4cb0bc.Mj + _0x3c7312 / 200) * 0.3);
        if (_0x4cb0bc.Ej) {
          this.Wh.Ad(_0x4cb0bc.Hj, _0x4cb0bc.Ij, window.wormupObjects.PortionSize * _0x4cb0bc.Jj, _0x4cb0bc.Lj * 1, window.wormupObjects.PortionAura * _0x26cb08, window.wormupObjects.PortionTransparent * _0x4cb0bc.Lj);
        } else {
          this.Wh.Ad(_0x4cb0bc.Hj, _0x4cb0bc.Ij, window.wormupObjects.FoodSize * _0x4cb0bc.Jj, _0x4cb0bc.Lj * 1, window.wormupObjects.FoodShadow * _0x26cb08, window.wormupObjects.FoodTransparent * _0x4cb0bc.Lj);
        }
      };
      var _0xbf7cea = function () {
        function _0x4e43aa(_0xc61c0f, _0x4e78a0) {
          this.ld = _0xc61c0f;
          this.md = _0x4e78a0;
        }
        _0x4e43aa.prototype.Ad = function (_0x5b7e0e, _0x5a32cf, _0x2800dd, _0x387c3a, _0x2fd573, _0x1561cd) {
          this.ld.Td(true);
          this.ld.Ud(_0x5b7e0e, _0x5a32cf);
          this.ld.Bd(_0x2800dd);
          this.ld.Rj(_0x387c3a);
          this.md.Td(true);
          this.md.Ud(_0x5b7e0e, _0x5a32cf);
          this.md.Bd(_0x2fd573);
          this.md.Rj(_0x1561cd);
        };
        _0x4e43aa.prototype.Cd = function () {
          this.ld.Td(false);
          this.md.Td(false);
        };
        return _0x4e43aa;
      }();
      return _0x3a5c3c;
    }();
    _0x56b227.Sj = function () {
      function _0x2aba43() {
        this.Tj = 0;
        this.Uj = 0;
        this.Vj = 0;
        this.Wj = 0;
        this.Xj = 0;
        this.Yj = [];
      }
      function _0x2a0495(_0x5a986b, _0x53f57d) {
        for (var _0x468d58 = 0; _0x468d58 < _0x5a986b.length; _0x468d58++) {
          if (parseInt(_0x5a986b[_0x468d58].id) === _0x53f57d) {
            return _0x468d58;
          }
        }
        ;
        return -1;
      }
      _0x2aba43.prototype.Sa = function () {};
      _0x2aba43.prototype.Zj = function (_0xda6c1a) {
        if (!_0x40085c.loading) {
          _0x40085c.pm = {
            ...this
          };
          localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
        }
        switch (_0xda6c1a) {
          case _0x56b227._j.$j:
            return this.Tj;
          case _0x56b227._j.ak:
            return this.Uj;
          case _0x56b227._j.bk:
            return this.Vj;
          case _0x56b227._j.ck:
            return this.Wj;
          case _0x56b227._j.dk:
            return this.Xj;
        }
        ;
        return 0;
      };
      _0x2aba43.prototype.ek = function () {
        return new _0x56b227.Sb(this.Tj, this.Uj, this.Vj, this.Wj, this.Xj);
      };
      _0x2aba43.prototype.fk = function (_0x4816e9) {
        this.Yj.push(_0x4816e9);
        this.gk();
      };
      _0x2aba43.prototype.hk = function () {
        if (!ooo.ud.Fc()) {
          return _0x4a5ec2.wa([32, 33, 34, 35]);
        }
        ;
        var _0x6f736f = [];
        for (var _0x3c05de = ooo.ud.Gc().skinArrayDict, _0x38d114 = 0; _0x38d114 < _0x3c05de.length; _0x38d114++) {
          var _0x41284a = _0x3c05de[_0x38d114];
          if (this.ik(_0x41284a.id, _0x56b227._j.$j)) {
            _0x6f736f.push(_0x41284a);
          }
        }
        ;
        if (_0x6f736f.length === 0) {
          return 0;
        } else {
          return _0x6f736f[parseInt(_0x6f736f.length * _0x4a5ec2.ma())].id;
        }
      };
      _0x2aba43.prototype.jk = function () {
        if (ooo.ud.Fc()) {
          var _0x1a98fb = ooo.ud.Gc().skinArrayDict;
          var _0xaaa478 = _0x2a0495(_0x1a98fb, this.Tj);
          if (!(_0xaaa478 < 0)) {
            for (var _0x16b0e6 = _0xaaa478 + 1; _0x16b0e6 < _0x1a98fb.length; _0x16b0e6++) {
              if (this.ik(_0x1a98fb[_0x16b0e6].id, _0x56b227._j.$j) && _0x1a98fb[_0x16b0e6].g !== true) {
                this.Tj = _0x1a98fb[_0x16b0e6].id;
                this.gk();
                return;
              }
            }
            ;
            for (var _0x233e25 = 0; _0x233e25 < _0xaaa478; _0x233e25++) {
              if (this.ik(_0x1a98fb[_0x233e25].id, _0x56b227._j.$j) && _0x1a98fb[_0x233e25].g !== true) {
                this.Tj = _0x1a98fb[_0x233e25].id;
                this.gk();
                return;
              }
            }
          }
        }
      };
      _0x2aba43.prototype.kk = function () {
        if (ooo.ud.Fc) {
          var _0x2d6461 = ooo.ud.Gc().skinArrayDict;
          var _0xfbb22b = _0x2a0495(_0x2d6461, this.Tj);
          if (!(_0xfbb22b < 0)) {
            for (var _0xa7035f = _0xfbb22b - 1; _0xa7035f >= 0; _0xa7035f--) {
              if (this.ik(_0x2d6461[_0xa7035f].id, _0x56b227._j.$j) && _0x2d6461[_0xa7035f].g !== true) {
                this.Tj = _0x2d6461[_0xa7035f].id;
                this.gk();
                return;
              }
            }
            ;
            for (var _0x21ad03 = _0x2d6461.length - 1; _0x21ad03 > _0xfbb22b; _0x21ad03--) {
              if (this.ik(_0x2d6461[_0x21ad03].id, _0x56b227._j.$j) && _0x2d6461[_0x21ad03].g !== true) {
                this.Tj = _0x2d6461[_0x21ad03].id;
                this.gk();
                return;
              }
            }
          }
        }
      };
      _0x2aba43.prototype.lk = function (_0x43f4e5, _0x4b2913) {
        if (!ooo.ud.Fc() || this.ik(_0x43f4e5, _0x4b2913)) {
          switch (_0x4b2913) {
            case _0x56b227._j.$j:
              if (this.Tj !== _0x43f4e5) {
                this.Tj = _0x43f4e5;
                this.gk();
              }
              return;
            case _0x56b227._j.ak:
              if (this.Uj !== _0x43f4e5) {
                this.Uj = _0x43f4e5;
                this.gk();
              }
              return;
            case _0x56b227._j.bk:
              if (this.Vj !== _0x43f4e5) {
                this.Vj = _0x43f4e5;
                this.gk();
              }
              return;
            case _0x56b227._j.ck:
              if (this.Wj !== _0x43f4e5) {
                this.Wj = _0x43f4e5;
                this.gk();
              }
              return;
            case _0x56b227._j.dk:
              if (this.Xj !== _0x43f4e5) {
                this.Xj = _0x43f4e5;
                this.gk();
              }
              return;
          }
        }
      };
      _0x2aba43.prototype.ik = function (_0x2df7f0, _0x4a8d3b) {
        var _0x328a4c = this.mk(_0x2df7f0, _0x4a8d3b);
        return _0x328a4c != null && (ooo.ok.nk() ? _0x328a4c.pk() === 0 && !_0x328a4c.qk() || ooo.ok.rk(_0x2df7f0, _0x4a8d3b) : _0x328a4c.sk());
      };
      _0x2aba43.prototype.mk = function (_0x498345, _0x1b32b2) {
        if (!ooo.ud.Fc()) {
          return null;
        }
        ;
        var _0x234562 = ooo.ud.Gc();
        if (_0x1b32b2 === _0x56b227._j.$j) {
          var _0xcba1d2 = _0x2a0495(_0x234562.skinArrayDict, _0x498345);
          if (_0xcba1d2 < 0) {
            return null;
          } else {
            return _0x56b227.uk.tk(_0x234562.skinArrayDict[_0xcba1d2]);
          }
        }
        ;
        var _0x1eeec4 = null;
        switch (_0x1b32b2) {
          case _0x56b227._j.ak:
            _0x1eeec4 = _0x234562.eyesDict[_0x498345];
            break;
          case _0x56b227._j.bk:
            _0x1eeec4 = _0x234562.mouthDict[_0x498345];
            break;
          case _0x56b227._j.ck:
            _0x1eeec4 = _0x234562.hatDict[_0x498345];
            break;
          case _0x56b227._j.dk:
            _0x1eeec4 = _0x234562.glassesDict[_0x498345];
        }
        ;
        if (_0x1eeec4 != null) {
          return _0x56b227.uk.vk(_0x1eeec4);
        } else {
          return null;
        }
      };
      _0x2aba43.prototype.gk = function () {
        for (var _0x37e62d = 0; _0x37e62d < this.Yj.length; _0x37e62d++) {
          this.Yj[_0x37e62d]();
        }
      };
      return _0x2aba43;
    }();
    _0x56b227._j = function () {
      function _0xd30f6a() {}
      _0xd30f6a.$j = "SKIN";
      _0xd30f6a.ak = "EYES";
      _0xd30f6a.bk = "MOUTH";
      _0xd30f6a.dk = "GLASSES";
      _0xd30f6a.ck = "HAT";
      return _0xd30f6a;
    }();
    _0x56b227.wk = function () {
      function _0x3869e3() {
        this.fn_o = _0x4c01fc;
        this.ig = new _0x3f64b5.k.n(_0x3f64b5.k.m.from("/images/bg-obstacle.png"));
        this.F_bg = new _0x3f64b5.k.n(_0x4c01fc());
        var _0x448284;
        var _0x37ec1c;
        var _0x1297f9;
        var _0x1d5e0d;
        var _0x5c60cb = _0x3f64b5.k.m.from("https://wormate.io/images/confetti-valday2025.png" || _0x2c8e1f.H.N);
        var _0x4a8a3c = new _0x3f64b5.k.n(_0x5c60cb, new _0x3f64b5.k.r(0, 0, 256, 256));
        var _0x5386cd = new _0x3f64b5.k.n(_0x5c60cb, new _0x3f64b5.k.r(352, 96, 64, 64));
        this.jg = Array(16);
        for (var _0x178984 = 0; _0x178984 < this.jg.length; _0x178984++) {
          this.jg[_0x178984] = _0x178984 % 2 == 0 ? _0x4a8a3c : _0x5386cd;
        }
        ;
        this.Ih = new _0x3f64b5.k.n(((_0x448284 = _0x3f64b5.k.m.from("/images/bg-pattern-pow2-ARENA.png")).wrapMode = _0x3f64b5.k.C.D, _0x448284));
        this.Jh = new _0x3f64b5.k.n(((_0x37ec1c = _0x3f64b5.k.m.from("/images/bg-pattern-pow2-TEAM2.png")).wrapMode = _0x3f64b5.k.C.D, _0x37ec1c));
        this.Gh = new _0x3f64b5.k.n(_0x3f64b5.k.m.from("/images/lens.png"));
        this.$f = new _0x3f64b5.k.n(((_0x1297f9 = _0x3f64b5.k.m.from(_0x2c8e1f.H.O)).wrapMode = _0x3f64b5.k.C.D, _0x1297f9));
        this.mc = ((_0x1d5e0d = _0x56b227.d.createElement("canvas")).width = 80, _0x1d5e0d.height = 80, {
          nc: _0x1d5e0d,
          oc: _0x1d5e0d.getContext("2d"),
          Za: new _0x3f64b5.k.n(_0x3f64b5.k.m.from(_0x1d5e0d))
        });
        this.hf = {};
        this.df = {};
        this.xk = [];
        this.yk = null;
      }
      function _0x4c01fc(_0x305202) {
        (_0x305202 = _0x3f64b5.k.m.from(_0x305202 || _0x40085c.background || "/images/bg-pattern-pow2-ARENA.png")).wrapMode = _0x3f64b5.k.C.D;
        return _0x305202;
      }
      _0x3869e3.prototype.Sa = function (_0x4ac950) {
        function _0x2e754d() {
          if (--_0x2fc451 == 0) {
            _0x4ac950();
          }
        }
        var _0x2fc451 = 4;
        this.hf = {};
        _0x2e754d();
        this.df = {};
        _0x2e754d();
        this.xk = [];
        _0x2e754d();
        this.yk = null;
        _0x2e754d();
      };
      return _0x3869e3;
    }();
    _0x56b227.zk = function () {
      function _0x2c835c() {
        this.Ak = null;
        this.Kf = new _0x56b227.Bk();
        this.Jf = new _0x56b227.Ck();
        this.Dk = new _0x56b227.Ek();
        this.Fk = new _0x56b227.Gk();
        this.Hk = new _0x56b227.Ik();
        this.Jk = new _0x56b227.Kk();
        this.Lk = new _0x56b227.Mk();
        this.Nk = new _0x56b227.Ok();
        this.Hi = new _0x56b227.Pk();
        this.Qk = new _0x56b227.Rk();
        this.Sk = new _0x56b227.Tk();
        this.Uk = new _0x56b227.Vk();
        this.Wk = new _0x56b227.Xk();
        this.Yk = new _0x56b227.Zk();
        this.Re = new _0x56b227.$k();
        this._k = new _0x56b227.al();
        this.bl = new _0x56b227.cl();
        this.dl = new _0x56b227.el();
        this.fl = [];
      }
      function _0x25c369(_0x499881, _0x22d591) {
        if (_0x22d591 !== _0x499881.length + 1) {
          var _0x2af532 = _0x499881[_0x22d591];
          _0x4a5ec2.ua(_0x499881, _0x22d591 + 1, _0x22d591, _0x499881.length - _0x22d591 - 1);
          _0x499881[_0x499881.length - 1] = _0x2af532;
        }
      }
      _0x2c835c.prototype.Sa = function () {
        this.Ak = new _0x56b227.Nf(_0x56b227.Uf.Tf);
        this.fl = [this.Kf, this.Jf, this.Dk, this.Fk, this.Hk, this.Jk, this.Lk, this.Nk, this.Hi, this.Qk, this.Sk, this.Uk, this.Wk, this.Yk, this.Re, this._k, this.bl, this.dl];
        for (var _0x47ee86 = 0; _0x47ee86 < this.fl.length; _0x47ee86++) {
          this.fl[_0x47ee86].Sa();
        }
      };
      _0x2c835c.prototype.Uh = function (_0x3020dc, _0x289234) {
        for (var _0x4c218a = this.fl.length - 1; _0x4c218a >= 0; _0x4c218a--) {
          this.fl[_0x4c218a].ug(_0x3020dc, _0x289234);
        }
        ;
        if (this.fl[0] !== this.Kf && this.fl[0] !== this.dl && this.Ak != null) {
          this.Ak.ug(_0x3020dc, _0x289234);
        }
      };
      _0x2c835c.prototype.qg = function () {
        for (var _0x4bc730 = this.fl.length - 1; _0x4bc730 >= 0; _0x4bc730--) {
          this.fl[_0x4bc730].qg();
        }
        ;
        if (this.Ak != null) {
          this.Ak.qg();
        }
      };
      _0x2c835c.prototype.gl = function (_0x261b30) {
        var _0xd96062 = function _0x25adb8(_0x14fd7c, _0x3c1669) {
          for (var _0x2a1f21 = 0; _0x2a1f21 < _0x14fd7c.length; _0x2a1f21++) {
            if (_0x14fd7c[_0x2a1f21] === _0x3c1669) {
              return _0x2a1f21;
            }
          }
          ;
          return -1;
        }(this.fl, _0x261b30);
        if (!(_0xd96062 < 0)) {
          this.fl[0].hl();
          (function _0x3fc34c(_0x315f3f, _0x2b9c78) {
            if (_0x2b9c78 !== 0) {
              var _0x298276 = _0x315f3f[_0x2b9c78];
              _0x4a5ec2.ua(_0x315f3f, 0, 1, _0x2b9c78);
              _0x315f3f[0] = _0x298276;
            }
          })(this.fl, _0xd96062);
          this.il();
        }
      };
      _0x2c835c.prototype.jl = function () {
        this.fl[0].hl();
        do {
          _0x25c369(this.fl, 0);
        } while (this.fl[0].Wd !== _0x56b227.ll.kl);
        ;
        this.il();
      };
      _0x2c835c.prototype.il = function () {
        var _0x2bc65d = this.fl[0];
        _0x2bc65d.ml();
        _0x2bc65d.nl();
        this.ol();
      };
      _0x2c835c.prototype.pl = function () {
        return this.fl.length !== 0 && this.fl[0].Wd === _0x56b227.ll.kl && this.Yk.ql();
      };
      _0x2c835c.prototype.rl = function () {
        if (this.fl.length === 0) {
          return null;
        } else {
          return this.fl[0];
        }
      };
      _0x2c835c.prototype.ol = function () {
        if (this.pl()) {
          this.gl(this.Yk);
        }
      };
      return _0x2c835c;
    }();
    _0x56b227.vj = function () {
      function _0x471db5() {
        this.ii = [];
        this.fi = [];
      }
      _0x471db5.wj = function (_0x18a048, _0x22d1be) {
        return {
          ji: _0x18a048,
          hi: _0x22d1be
        };
      };
      _0x471db5.xj = function (_0x357458, _0x4ea980) {
        return {
          gi: _0x357458,
          hi: _0x4ea980
        };
      };
      return _0x471db5;
    }();
    _0x56b227.sl = function () {
      function _0x33fe3b() {
        this.tl = [];
        this.ul = [];
        this.vl = false;
        this.wl = _0x264e72;
        this.xl = {};
      }
      var _0x264e72 = "guest";
      var _0x27ff25 = "guest";
      var _0x5a7417 = "fb";
      var _0x468df1 = "gg";
      _0x33fe3b.yl = new (function () {
        function _0x29557d() {}
        _0x29557d.zl = function _0x4d2576(_0x213e10) {
          this.Al = _0x213e10;
        };
        _0x29557d.prototype.Bl = function () {
          return (typeof FB == "undefined" ? "undefined" : _typeof(FB)) != "undefined";
        };
        _0x29557d.prototype.Cl = function (_0x5a02d2, _0x299d0c, _0x720aab) {
          var _0x377f6c = "https://graph.facebook.com/me?access_token=" + _0x5a02d2;
          $.get(_0x377f6c).fail(function () {
            _0x299d0c();
          }).done(function () {
            _0x720aab();
          });
        };
        _0x29557d.prototype.Dl = function (_0x3fefd1, _0x23e551) {
          if (!this.Bl()) {
            _0x3fefd1();
            return;
          }
          ;
          this.El(function () {
            FB.login(function (_0x56bbaf) {
              if (_0x56bbaf.status !== "connected") {
                _0x3fefd1();
                return;
              }
              ;
              var _0x547b89 = _0x56bbaf.authResponse.accessToken;
              _0x23e551(new _0x29557d.zl(_0x547b89));
            });
          }, function (_0x19600f) {
            _0x23e551(_0x19600f);
          });
        };
        _0x29557d.prototype.El = function (_0x443a40, _0x1e6dd2) {
          var _0x1cd347 = this;
          if (!this.Bl()) {
            _0x443a40();
            return;
          }
          ;
          FB.getLoginStatus(function (_0x5ed859) {
            if (_0x5ed859.status !== "connected") {
              _0x443a40();
              return;
            }
            ;
            var _0x20da9c = _0x5ed859.authResponse.accessToken;
            _0x1cd347.Cl(_0x20da9c, function () {
              _0x443a40();
            }, function () {
              _0x1e6dd2(new _0x29557d.zl(_0x20da9c));
            });
          });
        };
        _0x29557d.prototype.Fl = function () {
          if (this.Bl()) {
            FB.logout();
          }
        };
        return _0x29557d;
      }())();
      _0x33fe3b.Gl = new (function () {
        function _0x20939a() {}
        _0x20939a.Hl = function _0x21060c(_0x51a864, _0x4b3886) {
          this.Al = _0x51a864;
          this.Il = _0x4b3886;
        };
        _0x20939a.prototype.Bl = function () {
          return _typeof(GoogleAuth) != "undefined";
        };
        _0x20939a.prototype.Dl = function (_0x3f32e6, _0x289d59) {
          if (_typeof(GoogleAuth) == "undefined") {
            _0x3f32e6();
            return;
          }
          ;
          GoogleAuth.then(function () {
            if (GoogleAuth.isSignedIn.get()) {
              var _0x3e4192 = GoogleAuth.currentUser.get();
              var _0x37ae9c = _0x3e4192.getAuthResponse().id_token;
              var _0x5560b4 = new Date().getTime() + _0x3e4192.getAuthResponse().expires_in * 1000;
              if (new Date().getTime() < _0x5560b4) {
                _0x289d59(new _0x20939a.Hl(_0x37ae9c, _0x5560b4));
                return;
              }
            }
            ;
            GoogleAuth.signIn().then(function (_0x4e74b7) {
              if (_typeof(_0x4e74b7.error) !== "undefined" || !_0x4e74b7.isSignedIn()) {
                _0x3f32e6();
                return;
              }
              ;
              var _0x1ee415 = _0x4e74b7.getAuthResponse().id_token;
              var _0x10aeca = new Date().getTime() + _0x4e74b7.getAuthResponse().expires_in * 1000;
              _0x289d59(new _0x20939a.Hl(_0x1ee415, _0x10aeca));
            });
          });
        };
        _0x20939a.prototype.El = function (_0x124616, _0x53fac7) {
          if (_typeof(GoogleAuth) == "undefined") {
            _0x124616();
            return;
          }
          ;
          GoogleAuth.then(function () {
            if (GoogleAuth.isSignedIn.get()) {
              var _0x456874 = GoogleAuth.currentUser.get();
              var _0x57f358 = _0x456874.getAuthResponse().id_token;
              var _0xa43d90 = new Date().getTime() + _0x456874.getAuthResponse().expires_in * 1000;
              if (new Date().getTime() < _0xa43d90) {
                _0x53fac7(new _0x20939a.Hl(_0x57f358, _0xa43d90));
                return;
              }
            }
            ;
            _0x124616();
          });
        };
        _0x20939a.prototype.Fl = function () {
          if (_typeof(GoogleAuth) != "undefined") {
            GoogleAuth.signOut();
          }
        };
        return _0x20939a;
      }())();
      _0x33fe3b.prototype.Sa = function () {
        this.Jl();
      };
      _0x33fe3b.prototype.Kl = function () {
        if (this.vl) {
          return this.xl.userId;
        } else {
          return "";
        }
      };
      _0x33fe3b.prototype.Ll = function () {
        if (this.vl) {
          return this.xl.username;
        } else {
          return "";
        }
      };
      _0x33fe3b.prototype.Ml = function () {
        if (this.vl) {
          return this.xl.nickname;
        } else {
          return "";
        }
      };
      _0x33fe3b.prototype.Nl = function () {
        if (this.vl) {
          return this.xl.avatarUrl;
        } else {
          return _0x2c8e1f.H.M;
        }
      };
      _0x33fe3b.prototype.Ol = function () {
        return this.vl && this.xl.isBuyer;
      };
      _0x33fe3b.prototype.Pl = function () {
        return this.vl && this.xl.isConsentGiven;
      };
      _0x33fe3b.prototype.Ql = function () {
        if (this.vl) {
          return this.xl.coins;
        } else {
          return 0;
        }
      };
      _0x33fe3b.prototype.Rl = function () {
        if (this.vl) {
          return this.xl.level;
        } else {
          return 1;
        }
      };
      _0x33fe3b.prototype.Sl = function () {
        if (this.vl) {
          return this.xl.expOnLevel;
        } else {
          return 0;
        }
      };
      _0x33fe3b.prototype.Tl = function () {
        if (this.vl) {
          return this.xl.expToNext;
        } else {
          return 50;
        }
      };
      _0x33fe3b.prototype.Ul = function () {
        if (this.vl) {
          return this.xl.skinId;
        } else {
          return 0;
        }
      };
      _0x33fe3b.prototype.Vl = function () {
        if (this.vl) {
          return this.xl.eyesId;
        } else {
          return 0;
        }
      };
      _0x33fe3b.prototype.Wl = function () {
        if (this.vl) {
          return this.xl.mouthId;
        } else {
          return 0;
        }
      };
      _0x33fe3b.prototype.Xl = function () {
        if (this.vl) {
          return this.xl.glassesId;
        } else {
          return 0;
        }
      };
      _0x33fe3b.prototype.Yl = function () {
        if (this.vl) {
          return this.xl.hatId;
        } else {
          return 0;
        }
      };
      _0x33fe3b.prototype.Zl = function () {
        if (this.vl) {
          return this.xl.highScore;
        } else {
          return 0;
        }
      };
      _0x33fe3b.prototype.$l = function () {
        if (this.vl) {
          return this.xl.bestSurvivalTimeSec;
        } else {
          return 0;
        }
      };
      _0x33fe3b.prototype._l = function () {
        if (this.vl) {
          return this.xl.kills;
        } else {
          return 0;
        }
      };
      _0x33fe3b.prototype.am = function () {
        if (this.vl) {
          return this.xl.headShots;
        } else {
          return 0;
        }
      };
      _0x33fe3b.prototype.bm = function () {
        if (this.vl) {
          return this.xl.sessionsPlayed;
        } else {
          return 0;
        }
      };
      _0x33fe3b.prototype.cm = function () {
        if (this.vl) {
          return this.xl.totalPlayTimeSec;
        } else {
          return 0;
        }
      };
      _0x33fe3b.prototype.dm = function () {
        if (this.vl) {
          return this.xl.regDate;
        } else {
          return {};
        }
      };
      _0x33fe3b.prototype.em = function (_0x24f0cd) {
        this.tl.push(_0x24f0cd);
        _0x24f0cd();
      };
      _0x33fe3b.prototype.fm = function (_0x211671) {
        this.ul.push(_0x211671);
        _0x211671();
      };
      _0x33fe3b.prototype.rk = function (_0x4cd32f, _0x3b1438) {
        var _0x14bcc5 = this.xl.propertyList.concat(_0x40085c.pL || []);
        if (_0x14bcc5 == null) {
          return false;
        }
        ;
        for (_0x27ff25 = 0; _0x27ff25 < _0x14bcc5.length; _0x27ff25++) {
          var _0x3aaa1a = _0x14bcc5[_0x27ff25];
          if (_0x3aaa1a.id == _0x4cd32f && _0x3aaa1a.type === _0x3b1438) {
            return true;
          }
        }
        ;
        return false;
      };
      _0x33fe3b.prototype.nk = function () {
        return this.vl;
      };
      _0x33fe3b.prototype.gm = function () {
        return this.wl;
      };
      _0x33fe3b.prototype.hm = function (_0x120cf7) {
        var _0x128d95 = this;
        var _0x5d8f69 = this.Kl();
        var _0x85de5d = this.Ql();
        var _0x526276 = this.Rl();
        this.im(function () {
          if (_0x120cf7 != null) {
            _0x120cf7();
          }
        }, function (_0x1138cf) {
          _0x128d95.xl = _0x1138cf.user_data;
          _0x128d95.jm();
          var _0x44cee5 = _0x128d95.Kl();
          var _0x35715f = _0x128d95.Ql();
          var _0x38c831 = _0x128d95.Rl();
          if (_0x5d8f69 === _0x44cee5) {
            if (_0x38c831 > 1 && _0x38c831 !== _0x526276) {
              ooo.Xg.Yk.km(new _0x56b227.lm(_0x38c831));
            }
            var _0x572014 = _0x35715f - _0x85de5d;
            if (_0x572014 >= 20) {
              ooo.Xg.Yk.km(new _0x56b227.mm(_0x572014));
            }
          }
          ;
          if (_0x120cf7 != null) {
            _0x120cf7();
          }
        });
      };
      _0x33fe3b.prototype.im = function (_0x274b24, _0x24e767) {
        var _0x47999a = _0x2c8e1f.H.J + "/pub/wuid/" + this.wl + "/getUserData";
        _0x4a5ec2.Aa(_0x47999a, _0x274b24, function (_0x249026) {
          if (_0x249026.code !== 1200) {
            _0x274b24();
          } else {
            _0x24e767(_0x249026);
          }
        });
      };
      _0x33fe3b.prototype.nm = function (_0x19c860, _0x1ac8b4, _0x3872e5, _0xa997c5) {
        var _0x41ebc6 = _0x2c8e1f.H.J + "/pub/wuid/" + this.wl + "/buyProperty?id=" + _0x19c860 + "&type=" + _0x1ac8b4;
        _0x4a5ec2.Aa(_0x41ebc6, function () {
          _0x3872e5();
        }, function (_0x41a30a) {
          if (_0x41a30a.code !== 1200) {
            _0x3872e5();
          } else {
            _0xa997c5();
          }
        });
      };
      _0x33fe3b.prototype.om = function (_0x29470c, _0x4fe0cc) {
        var _0x595878 = _0x2c8e1f.H.J + "/pub/wuid/" + this.wl + "/deleteAccount";
        _0x4a5ec2.Aa(_0x595878, _0x29470c, function (_0x3461f1) {
          if (_0x3461f1.code !== 1200) {
            _0x29470c();
          } else {
            _0x4fe0cc();
          }
        });
      };
      _0x33fe3b.prototype.pm = function (_0x19d006) {
        var _0x2716ce = this;
        if (this.vl) {
          this.qm();
        }
        _0x33fe3b.yl.Dl(function () {
          _0x19d006();
        }, function (_0x5589e0) {
          _0x2716ce.rm(_0x5a7417, _0x5589e0.Al, _0x19d006);
        });
      };
      _0x33fe3b.prototype.sm = function (_0x399d32) {
        var _0x45e42b = this;
        if (this.vl) {
          this.qm();
        }
        _0x33fe3b.Gl.Dl(function () {
          _0x399d32();
        }, function (_0x42383b) {
          _0x45e42b.rm(_0x468df1, _0x42383b.Al, _0x399d32);
        });
      };
      _0x33fe3b.prototype.rm = function (_0x410cde, _0xcd02b2, _0x34247f) {
        var _0x555d0a = this;
        var _0x2e33b1 = _0x410cde + "_" + _0xcd02b2;
        var _0x91d1a5 = _0x2c8e1f.H.J + "/pub/wuid/" + _0x2e33b1 + "/login";
        _0x4a5ec2.Aa(_0x91d1a5, function () {
          _0x555d0a.tm();
        }, function (_0x25097f) {
          if (_0x25097f.code !== 1200) {
            _0x555d0a.tm();
          } else {
            _0x555d0a.um(_0x410cde, _0xcd02b2, _0x25097f.user_data);
            if (_0x34247f != null) {
              _0x34247f();
            }
          }
        });
      };
      _0x33fe3b.prototype.qm = function () {
        try {
          this.vm();
          this.wm();
        } catch (_0x52c738) {}
        ;
        this.xm();
      };
      _0x33fe3b.prototype.ym = function () {
        if (this.vl) {
          this.om(function () {}, function () {});
        }
      };
      _0x33fe3b.prototype.tm = function () {
        ooo.Xg.gl(ooo.Xg._k);
      };
      _0x33fe3b.prototype.um = function (_0x5528ac, _0x59ffa3, _0x4e5174) {
        var _0x3de936 = this;
        _0x10c6a9(_0x4e5174, function (_0x326df4) {
          var _0x141754 = _0x3de936.vl ? _0x3de936.xl.userId : _0x326df4;
          _0x3de936.vl = true;
          _0x3de936.wl = _0x5528ac + "_" + _0x59ffa3;
          _0x3de936.xl = _0x326df4;
          _0x56b227.Cg.Ng(_0x56b227.Cg.Hg, _0x5528ac, 60);
          if (_0x141754 !== _0x3de936.xl.userId) {
            _0x3de936.zm();
          } else {
            _0x3de936.jm();
          }
          ooo.Xp(true, true);
          _0x40085c.loading = false;
        });
      };
      _0x33fe3b.prototype.xm = function () {
        var _0x1ea8e1 = this.vl ? this.xl.userId : _0x27ff25;
        this.vl = false;
        this.wl = _0x264e72;
        this.xl = {};
        _0x56b227.Cg.Ng(_0x56b227.Cg.Hg, "", 60);
        if (_0x1ea8e1 !== this.xl.userId) {
          this.zm();
        } else {
          this.jm();
        }
      };
      _0x33fe3b.prototype.Jl = function () {
        var _0x5dd579 = _0x56b227.Cg.Og(_0x56b227.Cg.Hg);
        var _0x2efb98 = this;
        if (_0x5a7417 === _0x5dd579) {
          var _0x11b346 = 1;
          (function _0x27346e() {
            if (!_0x33fe3b.yl.Bl() && _0x11b346++ < 5) {
              _0x4a5ec2.Y(_0x27346e, 1000);
              return;
            }
            ;
            _0x33fe3b.yl.El(function () {}, function (_0x2864c3) {
              _0x2efb98.rm(_0x5a7417, _0x2864c3.Al);
            });
          })();
        } else if (_0x468df1 === _0x5dd579) {
          var _0x56d64c = 1;
          (function _0x3a8156() {
            if (!_0x33fe3b.Gl.Bl() && _0x56d64c++ < 5) {
              _0x4a5ec2.Y(_0x3a8156, 1000);
              return;
            }
            ;
            _0x33fe3b.Gl.El(function () {}, function (_0x110612) {
              _0x2efb98.rm(_0x468df1, _0x110612.Al);
            });
          })();
        }
      };
      _0x33fe3b.prototype.zm = function () {
        for (var _0x4813b8 = 0; _0x4813b8 < this.tl.length; _0x4813b8++) {
          this.tl[_0x4813b8]();
        }
        ;
        this.jm();
      };
      _0x33fe3b.prototype.jm = function () {
        for (var _0x33ce42 = 0; _0x33ce42 < this.ul.length; _0x33ce42++) {
          this.ul[_0x33ce42]();
        }
      };
      _0x33fe3b.prototype.vm = function () {
        _0x33fe3b.yl.Fl();
      };
      _0x33fe3b.prototype.wm = function () {
        _0x33fe3b.Gl.Fl();
      };
      return _0x33fe3b;
    }();
    _0x56b227.Sf = function () {
      function _0x1720dd(_0x1cce74, _0x3d1a3e, _0x5efbb8) {
        this.Of = _0x5efbb8;
        this.Rd = false;
        this.Yc = new _0x3f64b5.k.l();
        this.Yc.visible = false;
        this.Am = Array(_0x1cce74);
        for (var _0x47dc99 = 0; _0x47dc99 < this.Am.length; _0x47dc99++) {
          var _0x7eaceb = new _0x56b227.Bm(new _0x3f64b5.j(_0x3d1a3e * 3));
          _0x7eaceb.Cm(_0x3d1a3e);
          this.Am[_0x47dc99] = _0x7eaceb;
          this.Yc.addChild(_0x7eaceb.ag());
        }
        ;
        this.Pf = 1;
        this.Qf = 1;
        this.qg();
      }
      _0x1720dd.prototype.ag = function () {
        return this.Yc;
      };
      _0x1720dd.prototype.rg = function (_0x2b9775) {
        this.Rd = _0x2b9775;
        this.Yc.visible = _0x2b9775;
      };
      _0x1720dd.prototype.qg = function () {
        this.Pf = this.Of.width();
        this.Qf = this.Of.height();
        var _0x176553 = this.Qf / 30;
        for (var _0xa096bd = 0; _0xa096bd < this.Am.length; _0xa096bd++) {
          this.Am[_0xa096bd].Dm(_0x176553);
        }
      };
      _0x1720dd.prototype.Bg = function () {
        if (this.Rd) {
          for (var _0x599ebe = 0; _0x599ebe < this.Am.length; _0x599ebe++) {
            this.Am[_0x599ebe].Bg(this.Vf);
          }
        }
      };
      _0x1720dd.prototype.Em = function () {
        return this.Pf;
      };
      _0x1720dd.prototype.Fm = function () {
        return this.Qf;
      };
      _0x1720dd.prototype.xg = function (_0x213254, _0x182afe) {
        this.Am[_0x213254].Gm(_0x182afe);
      };
      _0x1720dd.prototype.yg = function (_0x328518, _0x44d7fc) {
        this.Am[_0x328518].Hm(_0x44d7fc);
      };
      _0x1720dd.prototype.zg = function (_0x1db41b, _0x159f48, _0x5f3ee4) {
        var _0x199090 = this.Am[_0x1db41b];
        for (var _0x143f24 = _0x199090.Im(), _0x596f32 = _0x199090.Jm, _0x25552c = 0; _0x25552c < _0x143f24; _0x25552c++) {
          _0x596f32[_0x25552c * 3] = _0x159f48;
          _0x596f32[_0x25552c * 3 + 1] = _0x5f3ee4;
          _0x596f32[_0x25552c * 3 + 2] = 0;
        }
      };
      _0x1720dd.prototype.Ag = function (_0x59511a, _0x3fe8b5, _0x6a4125) {
        var _0x71655b;
        var _0x23ac3e;
        var _0x2071fd = this.Am[_0x59511a];
        var _0x540cb0 = _0x2071fd.Im();
        var _0x5d9843 = _0x2071fd.Jm;
        var _0xe691f4 = _0x2071fd.Km();
        var _0x190079 = _0x5d9843[0];
        var _0x1b9b8c = _0x5d9843[1];
        var _0x8a066e = _0x3fe8b5 - _0x190079;
        var _0x37b615 = _0x6a4125 - _0x1b9b8c;
        var _0x19ac8c = _0x4a5ec2.la(_0x8a066e, _0x37b615);
        if (_0x19ac8c > 0) {
          _0x5d9843[0] = _0x3fe8b5;
          _0x5d9843[1] = _0x6a4125;
          _0x5d9843[2] = _0x4a5ec2.ta(_0x37b615, _0x8a066e);
          var _0x6a8e47 = _0xe691f4 * 0.25 / (_0xe691f4 * 0.25 + _0x19ac8c);
          var _0x5b82a2 = 1 - _0x6a8e47 * 2;
          for (var _0x52461b = 1, _0x160035 = _0x540cb0; _0x52461b < _0x160035; _0x52461b++) {
            _0x71655b = _0x5d9843[_0x52461b * 3];
            _0x5d9843[_0x52461b * 3] = _0x5d9843[_0x52461b * 3 - 3] * _0x5b82a2 + (_0x71655b + _0x190079) * _0x6a8e47;
            _0x190079 = _0x71655b;
            _0x23ac3e = _0x5d9843[_0x52461b * 3 + 1];
            _0x5d9843[_0x52461b * 3 + 1] = _0x5d9843[_0x52461b * 3 - 2] * _0x5b82a2 + (_0x23ac3e + _0x1b9b8c) * _0x6a8e47;
            _0x1b9b8c = _0x23ac3e;
            _0x5d9843[_0x52461b * 3 + 2] = _0x4a5ec2.ta(_0x5d9843[_0x52461b * 3 - 2] - _0x5d9843[_0x52461b * 3 + 1], _0x5d9843[_0x52461b * 3 - 3] - _0x5d9843[_0x52461b * 3]);
          }
        }
      };
      return _0x1720dd;
    }();
    _0x56b227.Lm = function () {
      function _0x589e63(_0x5403dd) {
        var _0x58fa1c;
        var _0x365e71 = this;
        this.Of = _0x5403dd;
        this.nc = _0x5403dd.get()[0];
        this.Vf = ((_0x58fa1c = {}).view = _0x365e71.nc, _0x58fa1c.transparent = true, new _0x3f64b5.k.o(_0x58fa1c));
        this.Rd = false;
        this.Mm = new _0x56b227.Bm(new _0x3f64b5.j(_0x4e6158 * 3));
        this.Pf = 1;
        this.Qf = 1;
        this.Nm = _0xae22e6.Om;
        this.Pm = _0xae22e6.Om;
        this.Qm = _0xae22e6.Om;
        this.Rm = _0xae22e6.Om;
        this.Sm = _0xae22e6.Om;
        this.qg();
        ooo.ud.Jc(function () {
          _0x365e71.Mm.Tm();
        });
      }
      var _0x4e6158 = _0x4a5ec2.ha(100, _0x56b227.Xc.fd);
      var _0xae22e6 = {
        Om: "0lt0",
        Um: "0lt1",
        Vm: "0lt2"
      };
      _0x589e63.prototype.rg = function (_0x4b0bde) {
        this.Rd = _0x4b0bde;
      };
      _0x589e63.prototype.qg = function () {
        var _0x299ea0 = _0x4a5ec2.e();
        this.Pf = this.Of.width();
        this.Qf = this.Of.height();
        this.Vf.resize(this.Pf, this.Qf);
        this.Vf.resolution = _0x299ea0;
        this.nc.width = _0x299ea0 * this.Pf;
        this.nc.height = _0x299ea0 * this.Qf;
        var _0x1a805a = this.Qf / 4;
        this.Mm.Dm(_0x1a805a);
        var _0x284328 = _0x4a5ec2.fa(_0x4a5ec2._(this.Pf / _0x1a805a) * 2 - 5, 1, _0x4e6158);
        this.Mm.Cm(_0x284328);
      };
      _0x589e63.prototype.ug = function () {
        if (this.Rd) {
          var _0xd24a80 = _0x4a5ec2.Ca() / 200;
          var _0x5404d2 = _0x4a5ec2.oa(_0xd24a80);
          this.Mm.Wm(this.Xm(this.Nm, _0x5404d2), this.Ym(this.Nm, _0x5404d2));
          this.Mm.Zm(this.$m(this.Pm, _0x5404d2), this.$m(this.Qm, _0x5404d2), this.$m(this.Rm, _0x5404d2), this.$m(this.Sm, _0x5404d2));
          var _0x368065 = this.Mm.Km();
          for (var _0x3a162d = this.Mm.Im(), _0xd6df10 = this.Mm.Jm, _0x1657f1 = this.Pf - (this.Pf - _0x368065 * 0.5 * (_0x3a162d - 1)) * 0.5, _0x30fddd = this.Qf * 0.5, _0x1f9938 = 0, _0x4bfd2c = 0, _0x4cee82 = -1; _0x4cee82 < _0x3a162d; _0x4cee82++) {
            var _0x1ce55d = _0x4cee82;
            var _0x48b660 = _0x4a5ec2.pa(_0x1ce55d * 1 / 12 * _0x2c8e1f.T - _0xd24a80) * (1 - _0x4a5ec2.ra(16, _0x1ce55d * -1 / 12));
            if (_0x4cee82 >= 0) {
              _0xd6df10[_0x4cee82 * 3] = _0x1657f1 - _0x368065 * 0.5 * _0x1ce55d;
              _0xd6df10[_0x4cee82 * 3 + 1] = _0x30fddd + _0x368065 * 0.5 * _0x48b660;
              _0xd6df10[_0x4cee82 * 3 + 2] = _0x4a5ec2.ta(_0x4bfd2c - _0x48b660, _0x1ce55d - _0x1f9938);
            }
            _0x1f9938 = _0x1ce55d;
            _0x4bfd2c = _0x48b660;
          }
          ;
          this.Mm.Bg();
          this.Mm._m(this.Vf);
        }
      };
      _0x589e63.prototype.Gm = function (_0x3f8542) {
        this.Mm.Gm(_0x3f8542);
      };
      _0x589e63.prototype.an = function (_0x4bfbe8) {
        this.Nm = _0x4bfbe8 ? _0xae22e6.Vm : _0xae22e6.Um;
        this.Pm = _0xae22e6.Om;
        this.Qm = _0xae22e6.Om;
        this.Rm = _0xae22e6.Om;
        this.Sm = _0xae22e6.Om;
      };
      _0x589e63.prototype.bn = function (_0x3e0478) {
        this.Nm = _0xae22e6.Om;
        this.Pm = _0x3e0478 ? _0xae22e6.Vm : _0xae22e6.Um;
        this.Qm = _0xae22e6.Om;
        this.Rm = _0xae22e6.Om;
        this.Sm = _0xae22e6.Om;
      };
      _0x589e63.prototype.cn = function (_0x168a7b) {
        this.Nm = _0xae22e6.Om;
        this.Pm = _0xae22e6.Om;
        this.Qm = _0x168a7b ? _0xae22e6.Vm : _0xae22e6.Um;
        this.Rm = _0xae22e6.Om;
        this.Sm = _0xae22e6.Om;
      };
      _0x589e63.prototype.dn = function (_0x3bf224) {
        this.Nm = _0xae22e6.Om;
        this.Pm = _0xae22e6.Om;
        this.Qm = _0xae22e6.Om;
        this.Rm = _0x3bf224 ? _0xae22e6.Vm : _0xae22e6.Um;
        this.Sm = _0xae22e6.Om;
      };
      _0x589e63.prototype.en = function (_0x52b9da) {
        this.Nm = _0xae22e6.Om;
        this.Pm = _0xae22e6.Om;
        this.Qm = _0xae22e6.Om;
        this.Rm = _0xae22e6.Om;
        this.Sm = _0x52b9da ? _0xae22e6.Vm : _0xae22e6.Um;
      };
      _0x589e63.prototype.Xm = function (_0x53c600, _0x57f7a9) {
        switch (_0x53c600) {
          case _0xae22e6.Um:
            return 0.9 + _0x57f7a9 * 0.1;
          case _0xae22e6.Vm:
            return 0.4 + _0x57f7a9 * 0.3;
        }
        ;
        return 1;
      };
      _0x589e63.prototype.Ym = function (_0x4b2b88, _0x2f4368) {
        switch (_0x4b2b88) {
          case _0xae22e6.Um:
            return 0.6 + _0x2f4368 * 0.5;
          case _0xae22e6.Vm:
            return 0.3 + _0x2f4368 * 0.3;
        }
        ;
        return 1;
      };
      _0x589e63.prototype.$m = function (_0x3bb678, _0x2aac15) {
        switch (_0x3bb678) {
          case _0xae22e6.Um:
            return 0.9 + _0x2aac15 * 0.1;
          case _0xae22e6.Vm:
            return 0.6 + _0x2aac15 * 0.4;
        }
        ;
        return 1;
      };
      return _0x589e63;
    }();
    _0x56b227.uk = function () {
      function _0x460d75(_0x38bd60, _0x1256c6, _0x4508a3, _0x1e47c4, _0xec1f1c) {
        this.gn = _0x38bd60;
        this.hn = _0x1256c6;
        this.in = _0x4508a3;
        this.jn = _0x1e47c4;
        this.kn = _0xec1f1c;
      }
      _0x460d75.tk = function (_0x509138) {
        return new _0x460d75(_0x509138.price, _0x509138.guest, _0x509138.nonbuyable, _0x509138.nonbuyableCause, _0x509138.description);
      };
      _0x460d75.vk = function (_0x14d9e4) {
        return new _0x460d75(_0x14d9e4.price, _0x14d9e4.guest, _0x14d9e4.nonbuyable, _0x14d9e4.nonbuyableCause, _0x14d9e4.description);
      };
      _0x460d75.prototype.pk = function () {
        return this.gn;
      };
      _0x460d75.prototype.sk = function () {
        return this.hn;
      };
      _0x460d75.prototype.qk = function () {
        return this.in;
      };
      _0x460d75.prototype.ln = function () {
        return this.jn;
      };
      _0x460d75.prototype.mn = function () {
        return this.kn;
      };
      return _0x460d75;
    }();
    _0x56b227.Zf = function () {
      function _0x966fd(_0x209adf) {
        this.nn = {};
        this.nn[_0x57659b] = _0x209adf;
        var _0x3c24df = _0x3f64b5.k.q.from(_0x4a0b40, _0x44a552, this.nn);
        this._f = new _0x3f64b5.k.v(_0x26c88a, _0x3c24df);
        this._f.blendMode = _0x3f64b5.k.w.B;
      }
      var _0x28cb45 = "a1_" + _0x4a5ec2.xa();
      var _0x4f7c72 = "a2_" + _0x4a5ec2.xa();
      var _0x487804 = "translationMatrix";
      var _0x3984d5 = "projectionMatrix";
      var _0x57659b = "u3_" + _0x4a5ec2.xa();
      var _0x3948ec = "u4_" + _0x4a5ec2.xa();
      var _0x3064d7 = "v1_" + _0x4a5ec2.xa();
      var _0x26c88a = new _0x3f64b5.k.u().addAttribute(_0x28cb45, [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1], 2).addAttribute(_0x4f7c72, [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1], 2);
      var _0x4a0b40 = "precision mediump float; attribute vec2 " + _0x28cb45 + "; attribute vec2 " + _0x4f7c72 + "; uniform mat3 " + _0x487804 + "; uniform mat3 " + _0x3984d5 + "; uniform vec4 " + _0x3948ec + "; varying vec2 " + _0x3064d7 + "; const float ROT_ANGLE_DEG = 7.5; const float ROT_COS = cos(ROT_ANGLE_DEG/180.0*3.14159265358979); const float ROT_SIN = sin(ROT_ANGLE_DEG/180.0*3.14159265358979); void main() { " + _0x3064d7 + " = " + _0x4f7c72 + "; gl_Position = vec4((" + _0x3984d5 + " * " + _0x487804 + " * vec3(" + _0x28cb45 + ", 1.0)).xy, 0.0, 1.0); vec4 ScreenParams = " + _0x3948ec + "; vec2 uv = " + _0x4f7c72 + "; vec2 mul = 0.5 * vec2(ScreenParams.x * (ScreenParams.w - 1.0) + 1.0, ScreenParams.y * (ScreenParams.z - 1.0) + 1.0); vec2 v2 = (uv - vec2(0.5, 0.5)) * mul * 1.25; v2 = vec2(v2.x * ROT_COS - v2.y * ROT_SIN, v2.x * ROT_SIN + v2.y * ROT_COS) * vec2(1.0, 2.0); " + _0x3064d7 + " = v2; }";
      var _0x44a552 = "precision highp float; varying vec2 " + _0x3064d7 + "; uniform sampler2D " + _0x57659b + "; void main() { gl_FragColor = texture2D(" + _0x57659b + ", " + _0x3064d7 + "); }";
      _0x966fd.prototype.tg = function (_0x21ae5b, _0x28e65b) {
        this._f.scale.x = _0x21ae5b;
        this._f.scale.y = _0x28e65b;
        this.nn[_0x3948ec] = [_0x21ae5b, _0x28e65b, 1 / _0x21ae5b + 1, 1 / _0x28e65b + 1];
      };
      return _0x966fd;
    }();
    _0x56b227.th = function () {
      function _0x3b86e4() {
        this.nn = {};
        this.nn[_0x4eced6] = [1, 0.5, 0.25, 0.5];
        this.nn[_0x193e9d] = _0x3f64b5.k.n.WHITE;
        this.nn[_0xeaabab] = [0, 0];
        this.nn[_0x3ef52c] = [0, 0];
        var _0x396926 = _0x3f64b5.k.q.from(_0x5bcf64, _0x3e4b32, this.nn);
        this._f = new _0x3f64b5.k.v(_0x56e749, _0x396926);
      }
      var _0x371126 = "a1_" + _0x4a5ec2.xa();
      var _0x2a356a = "a2_" + _0x4a5ec2.xa();
      var _0x5e8e30 = "translationMatrix";
      var _0x31410f = "projectionMatrix";
      var _0x4eced6 = "u3_" + _0x4a5ec2.xa();
      var _0x193e9d = "u4_" + _0x4a5ec2.xa();
      var _0xeaabab = "u5_" + _0x4a5ec2.xa();
      var _0x3ef52c = "u6_" + _0x4a5ec2.xa();
      var _0x53a014 = "v1_" + _0x4a5ec2.xa();
      var _0x56e749 = new _0x3f64b5.k.u().addAttribute(_0x371126, [-0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5], 2).addAttribute(_0x2a356a, [-0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5], 2);
      var _0x5bcf64 = `precision mediump float; attribute vec2 ${_0x371126}; attribute vec2 ${_0x2a356a}; uniform mat3 ${_0x5e8e30}; uniform mat3 ${_0x31410f}; varying vec2 ${_0x53a014}; void main(){${_0x53a014}=${_0x2a356a}; gl_Position=vec4((${_0x31410f}*${_0x5e8e30}*vec3(${_0x371126}, 1.0)).xy, 0.0, 1.0); }`;
      var _0x3e4b32 = `precision highp float; varying vec2 ${_0x53a014}; uniform vec4 ${_0x4eced6}; uniform sampler2D ${_0x193e9d}; uniform vec2 ${_0xeaabab}; uniform vec2 ${_0x3ef52c}; void main(){vec4 color=texture2D(${_0x193e9d}, ${_0x53a014}*${_0xeaabab}+${_0x3ef52c}); vec4 colorMix=${_0x4eced6}; gl_FragColor=color*0.3+colorMix.a*vec4(colorMix.rgb, 0.0); }`;
      _0x3b86e4.prototype.nd = function (_0xd60549, _0x1a1629, _0x2ef90d, _0x96d51f) {
        var _0x39f451 = this.nn[_0x4eced6];
        _0x39f451[0] = _0xd60549;
        _0x39f451[1] = _0x1a1629;
        _0x39f451[2] = _0x2ef90d;
        _0x39f451[3] = _0x96d51f;
      };
      _0x3b86e4.prototype.Hh = function (_0x83b00a) {
        this.nn[_0x193e9d] = _0x83b00a;
      };
      _0x3b86e4.prototype.Bg = function (_0x399a55, _0x36fb6f, _0x269101, _0x43d85e) {
        this._f.position.x = _0x399a55;
        this._f.position.y = _0x36fb6f;
        this._f.scale.x = _0x269101;
        this._f.scale.y = _0x43d85e;
        var _0x112e51 = this.nn[_0xeaabab];
        _0x112e51[0] = _0x269101 * 0.2520615384615385;
        _0x112e51[1] = _0x43d85e * 0.4357063736263738;
        var _0x3d9017 = this.nn[_0x3ef52c];
        _0x3d9017[0] = _0x399a55 * 0.2520615384615385;
        _0x3d9017[1] = _0x36fb6f * 0.4357063736263738;
      };
      return _0x3b86e4;
    }();
    _0x56b227.bd = function () {
      function _0x27d8d9() {
        this.gd = new _0x3f64b5.k.s();
        this.pn = 0;
        this.qn = 0;
      }
      _0x27d8d9.prototype.kd = function (_0xa4786e) {
        this.gd.texture = _0xa4786e.nb();
        this.gd.anchor.set(_0xa4786e.hb, _0xa4786e.ib);
        this.pn = _0xa4786e.jb;
        this.qn = _0xa4786e.kb;
      };
      _0x27d8d9.prototype.nd = function (_0x2640fc) {
        this.gd.tint = parseInt(_0x2640fc.substring(1), 16);
      };
      _0x27d8d9.prototype.Bd = function (_0x2c2825) {
        this.gd.width = _0x2c2825 * this.pn;
        this.gd.height = _0x2c2825 * this.qn;
      };
      _0x27d8d9.prototype.Vd = function (_0x210627) {
        this.gd.rotation = _0x210627;
      };
      _0x27d8d9.prototype.Ud = function (_0x8c34a7, _0x33f4d5) {
        this.gd.position.set(_0x8c34a7, _0x33f4d5);
      };
      _0x27d8d9.prototype.Td = function (_0x344bd9) {
        this.gd.visible = _0x344bd9;
      };
      _0x27d8d9.prototype.Qd = function () {
        return this.gd.visible;
      };
      _0x27d8d9.prototype.Rj = function (_0x5f2d19) {
        this.gd.alpha = _0x5f2d19;
      };
      _0x27d8d9.prototype.zd = function () {
        return this.gd;
      };
      _0x27d8d9.prototype.G = function () {
        _0x3f64b5.k.F.G(this.gd);
      };
      return _0x27d8d9;
    }();
    _0x56b227.Ui = function () {
      function _0x23e112(_0x3ff6f3) {
        this.Qh = _0x3ff6f3;
        this.ki = new _0x56b227.Ui.Ti();
        this.cj = false;
        this.bj = true;
        this.Fd = false;
        this.Id = 0;
        this.rn = 0;
        this.Lj = 1;
        this.Ld = 0;
        this.hi = 0;
        this.Nd = {};
        this.Kd = 0;
        this.sn = new _0x3f64b5.j(_0x115f40 * 2);
        this.tn = new _0x3f64b5.j(_0x115f40 * 2);
        this.Jd = new _0x3f64b5.j(_0x115f40 * 2);
        this.un = null;
        this.vn = null;
        this.wn = null;
        this.xn();
      }
      var _0x115f40 = 200;
      _0x23e112.prototype.$i = function () {
        if (this.vn != null) {
          _0x3f64b5.k.F.G(this.vn.Yc);
        }
        if (this.wn != null) {
          _0x3f64b5.k.F.G(this.wn);
        }
      };
      _0x23e112.prototype.xn = function () {
        this.fj(0.25);
        this.ki.Xa = "";
        this.bj = true;
        this.Nd = {};
        this.Td(false);
      };
      _0x23e112.prototype.Zi = function (_0x1cf58a) {
        this.ki = _0x1cf58a;
        this.yn(this.cj);
      };
      _0x23e112.prototype.Td = function (_0x59a2fb) {
        var _0x11870c = this.cj;
        this.cj = _0x59a2fb;
        this.yn(_0x11870c);
      };
      _0x23e112.prototype.fj = function (_0x12e31e) {
        this.hi = _0x12e31e * 50;
        var _0x24ac57 = _0x12e31e;
        if (_0x12e31e > this.Qh.hh) {
          _0x24ac57 = _0x4a5ec2.sa((_0x12e31e - this.Qh.hh) / this.Qh.ih) * this.Qh.ih + this.Qh.hh;
        }
        var _0x300098 = _0x4a5ec2.qa(_0x4a5ec2.ra(_0x24ac57 * 5, 0.707106781186548) * 4 + 25);
        var _0x23c6bc = _0x4a5ec2.ha(_0x115f40, _0x4a5ec2.ia(3, (_0x300098 - 5) * 5 + 1));
        var _0xd0f191 = this.Kd;
        this.Id = (5 + _0x300098 * 0.9) * 0.025;
        this.Kd = _0x4a5ec2._(_0x23c6bc);
        this.rn = _0x23c6bc - this.Kd;
        if (_0xd0f191 > 0 && _0xd0f191 < this.Kd) {
          var _0x26886f = this.sn[_0xd0f191 * 2 - 2];
          var _0x56db13 = this.sn[_0xd0f191 * 2 - 1];
          var _0x41b9c3 = this.tn[_0xd0f191 * 2 - 2];
          var _0x1918d6 = this.tn[_0xd0f191 * 2 - 1];
          var _0x49b2c6 = this.Jd[_0xd0f191 * 2 - 2];
          var _0x33794b = this.Jd[_0xd0f191 * 2 - 1];
          for (var _0x9293f4 = _0xd0f191; _0x9293f4 < this.Kd; _0x9293f4++) {
            this.sn[_0x9293f4 * 2] = _0x26886f;
            this.sn[_0x9293f4 * 2 + 1] = _0x56db13;
            this.tn[_0x9293f4 * 2] = _0x41b9c3;
            this.tn[_0x9293f4 * 2 + 1] = _0x1918d6;
            this.Jd[_0x9293f4 * 2] = _0x49b2c6;
            this.Jd[_0x9293f4 * 2 + 1] = _0x33794b;
          }
        }
      };
      _0x23e112.prototype.kj = function (_0x211baa, _0x55fd58) {
        this.Kd = _0x55fd58;
        for (var _0x145a00 = 0; _0x145a00 < this.Kd; _0x145a00++) {
          this.sn[_0x145a00 * 2] = this.tn[_0x145a00 * 2] = this.Jd[_0x145a00 * 2] = _0x211baa();
          this.sn[_0x145a00 * 2 + 1] = this.tn[_0x145a00 * 2 + 1] = this.Jd[_0x145a00 * 2 + 1] = _0x211baa();
        }
      };
      _0x23e112.prototype.hj = function (_0x574a93, _0x5a0816, _0x30579c) {
        this.Fd = _0x30579c;
        for (var _0x54a3e1 = 0; _0x54a3e1 < this.Kd; _0x54a3e1++) {
          this.sn[_0x54a3e1 * 2] = this.tn[_0x54a3e1 * 2];
          this.sn[_0x54a3e1 * 2 + 1] = this.tn[_0x54a3e1 * 2 + 1];
        }
        ;
        var _0x10655e = _0x574a93 - this.tn[0];
        var _0x4c019c = _0x5a0816 - this.tn[1];
        this.zn(_0x10655e, _0x4c019c, this.Kd, this.tn);
      };
      _0x23e112.prototype.zn = function (_0xa54a10, _0x4fa4de, _0x2410e3, _0x49507d) {
        var _0x434400 = _0x4a5ec2.la(_0xa54a10, _0x4fa4de);
        if (!(_0x434400 <= 0)) {
          var _0x604b5e;
          var _0x39af3d = _0x49507d[0];
          _0x49507d[0] += _0xa54a10;
          var _0x4a396e;
          var _0x2b1bf3 = _0x49507d[1];
          _0x49507d[1] += _0x4fa4de;
          var _0x49503c = this.Id / (this.Id + _0x434400);
          var _0x35c8a7 = 1 - _0x49503c * 2;
          for (var _0x4e8105 = 1, _0x2e13a6 = _0x2410e3 - 1; _0x4e8105 < _0x2e13a6; _0x4e8105++) {
            _0x604b5e = _0x49507d[_0x4e8105 * 2];
            _0x49507d[_0x4e8105 * 2] = _0x49507d[_0x4e8105 * 2 - 2] * _0x35c8a7 + (_0x604b5e + _0x39af3d) * _0x49503c;
            _0x39af3d = _0x604b5e;
            _0x4a396e = _0x49507d[_0x4e8105 * 2 + 1];
            _0x49507d[_0x4e8105 * 2 + 1] = _0x49507d[_0x4e8105 * 2 - 1] * _0x35c8a7 + (_0x4a396e + _0x2b1bf3) * _0x49503c;
            _0x2b1bf3 = _0x4a396e;
          }
          ;
          _0x35c8a7 = 1 - (_0x49503c = this.rn * this.Id / (this.rn * this.Id + _0x434400)) * 2;
          _0x49507d[_0x2410e3 * 2 - 2] = _0x49507d[_0x2410e3 * 2 - 4] * _0x35c8a7 + (_0x49507d[_0x2410e3 * 2 - 2] + _0x39af3d) * _0x49503c;
          _0x49507d[_0x2410e3 * 2 - 1] = _0x49507d[_0x2410e3 * 2 - 3] * _0x35c8a7 + (_0x49507d[_0x2410e3 * 2 - 1] + _0x2b1bf3) * _0x49503c;
        }
      };
      _0x23e112.prototype.Oh = function () {
        return {
          _a: this.Jd[0],
          ab: this.Jd[1]
        };
      };
      _0x23e112.prototype.dj = function (_0x1dea0b, _0x85fd46) {
        var _0x1f94bc = 1000000;
        var _0x1f54ea = _0x1dea0b;
        var _0x249fe3 = _0x85fd46;
        for (var _0x5e532b = 0; _0x5e532b < this.Kd; _0x5e532b++) {
          var _0x5f0fdb = this.Jd[_0x5e532b * 2];
          var _0xf975d5 = this.Jd[_0x5e532b * 2 + 1];
          var _0x444a2b = _0x4a5ec2.la(_0x1dea0b - _0x5f0fdb, _0x85fd46 - _0xf975d5);
          if (_0x444a2b < _0x1f94bc) {
            _0x1f94bc = _0x444a2b;
            _0x1f54ea = _0x5f0fdb;
            _0x249fe3 = _0xf975d5;
          }
        }
        ;
        return {
          _a: _0x1f54ea,
          ab: _0x249fe3,
          ej: _0x1f94bc
        };
      };
      _0x23e112.prototype._i = function (_0x2503d2) {
        this.un = _0x2503d2;
      };
      _0x23e112.prototype.Pj = function (_0x3806f5, _0x3b206d) {
        this.Lj = _0x4a5ec2.ga(this.Lj, this.bj ? this.Fd ? 0.9 + _0x4a5ec2.pa(_0x3806f5 / 400 * _0x2c8e1f.T) * 0.1 : 1 : 0, _0x3b206d, 1 / 800);
        this.Ld = _0x4a5ec2.ga(this.Ld, this.bj ? this.Fd ? 1 : 0 : 1, _0x3b206d, 0.0025);
        if (this.vn != null) {
          this.vn.Yc.alpha = this.Lj;
        }
        if (this.wn != null) {
          this.wn.alpha = this.Lj;
        }
      };
      _0x23e112.prototype.Qj = function (_0xae94e4, _0x50b59e, _0x647dea, _0x367a3a) {
        if (this.cj && this.bj) {
          var _0x5d90bc = _0x4a5ec2.ra(0.11112, _0x50b59e / 95);
          for (var _0x258062 = 0; _0x258062 < this.Kd; _0x258062++) {
            var _0x3923d6 = _0x4a5ec2.ka(this.sn[_0x258062 * 2], this.tn[_0x258062 * 2], _0x647dea);
            var _0x306f40 = _0x4a5ec2.ka(this.sn[_0x258062 * 2 + 1], this.tn[_0x258062 * 2 + 1], _0x647dea);
            this.Jd[_0x258062 * 2] = _0x4a5ec2.ka(_0x3923d6, this.Jd[_0x258062 * 2], _0x5d90bc);
            this.Jd[_0x258062 * 2 + 1] = _0x4a5ec2.ka(_0x306f40, this.Jd[_0x258062 * 2 + 1], _0x5d90bc);
          }
        }
        ;
        if (this.vn != null && this.cj) {
          this.vn.Hd(this, _0xae94e4, _0x50b59e, _0x367a3a);
        }
        if (this.wn != null) {
          this.wn.Rh.x = this.Jd[0];
          this.wn.Rh.y = this.Jd[1] - this.Id * 3;
        }
      };
      _0x23e112.prototype.yn = function (_0x312860) {
        if (this.cj) {
          if (!_0x312860) {
            this.An();
          }
        } else {
          if (this.vn != null) {
            _0x3f64b5.k.F.G(this.vn.Yc);
          }
          if (this.wn != null) {
            _0x3f64b5.k.F.G(this.wn);
          }
        }
      };
      _0x23e112.prototype.An = function () {
        if (this.vn == null) {
          this.vn = new _0x56b227.Xc();
        } else {
          _0x3f64b5.k.F.G(this.vn.Yc);
        }
        this.vn.hd(ooo.Mh.Qh.eh, ooo.ud.Cc().Ub(this.ki.mi), ooo.ud.Cc().Tb(this.ki.ni), ooo.ud.Cc().Vb(this.ki.Vi), ooo.ud.Cc().Wb(this.ki.Wi), ooo.ud.Cc().Xb(this.ki.Xi), ooo.ud.Cc().Yb(this.ki.Yi), "#ffffff");
        if (this.wn == null) {
          this.wn = new _0x56b227.Bn("");
          this.wn.style.fontFamily = "PTSans";
          this.wn.anchor.set(0.5);
        } else {
          _0x3f64b5.k.F.G(this.wn);
        }
        this.wn.style.fontSize = 14;
        this.wn.style.fill = ooo.ud.Cc().Tb(this.ki.ni).cc;
        this.wn.text = this.ki.Xa;
        this.un.Xh(this.ki.Je, this.vn, this.wn);
        if (_0xafdd52.n != null && _0xafdd52.n.Je == this.ki.Je) {
          _0xafdd52.vj = this.wn;
          let _0xbf964f = _0x40085c.sg.indexOf(_0xafdd52.n.ni);
          if (_0xbf964f == -1) {
            if (_0x40085c.ig != -1) {
              _0x40085c.ig = -1;
            }
          } else {
            _0x40085c.ig = _0x40085c.gg[_0xbf964f].s;
            _0x40085c.re = false;
            _0x5e6f3c();
          }
        }
      };
      _0x23e112.Ti = function _0x1f5165() {
        this.Je = 0;
        this.mi = _0x56b227.dh.jh;
        this.ni = 0;
        this.Vi = 0;
        this.Wi = 0;
        this.Xi = 0;
        this.Yi = 0;
        this.Xa = "";
      };
      return _0x23e112;
    }();
    _0x56b227.Bn = _0x4a5ec2.ca(_0x3f64b5.k.t, function (_0x1c1bd8, _0x153ebf, _0x2c54b1) {
      _0x3f64b5.k.t.call(this, _0x1c1bd8, _0x153ebf, _0x2c54b1);
      this.Rh = {
        x: 0,
        y: 0
      };
    });
    _0x56b227.Sb = function () {
      function _0x1135e2(_0x21310c, _0x3d61ba, _0x3b9be2, _0x338506, _0x1102d5) {
        this.Tj = _0x21310c;
        this.Uj = _0x3d61ba;
        this.Vj = _0x3b9be2;
        this.Wj = _0x338506;
        this.Xj = _0x1102d5;
      }
      _0x1135e2.prototype.Cn = function (_0x2e8c44) {
        return new _0x1135e2(_0x2e8c44, this.Uj, this.Vj, this.Wj, this.Xj);
      };
      _0x1135e2.prototype.Dn = function (_0x1f54a3) {
        return new _0x1135e2(this.Tj, _0x1f54a3, this.Vj, this.Wj, this.Xj);
      };
      _0x1135e2.prototype.En = function (_0x7c4415) {
        return new _0x1135e2(this.Tj, this.Uj, _0x7c4415, this.Wj, this.Xj);
      };
      _0x1135e2.prototype.Fn = function (_0x4cb31e) {
        return new _0x1135e2(this.Tj, this.Uj, this.Vj, _0x4cb31e, this.Xj);
      };
      _0x1135e2.prototype.Gn = function (_0x318429) {
        return new _0x1135e2(this.Tj, this.Uj, this.Vj, this.Wj, _0x318429);
      };
      return _0x1135e2;
    }();
    _0x56b227.Bm = function () {
      function _0xe756f5(_0x217dc7) {
        this.Hn = new _0x56b227.Xc();
        this.Hn.Yc.addChild(this.Hn.Zc);
        this.In = null;
        this.Jn = null;
        this.Jm = _0x217dc7;
        this.$c = 0;
        this.mj = 1;
        this.Kn = 1;
        this.Ln = 1;
        this.Mn = 1;
        this.Nn = 1;
        this.On = 1;
        this.Pn = 1;
        this.Hm("#ffffff");
      }
      var _0x290821 = new _0x56b227.Sb(0, 0, 0, 0, 0);
      _0xe756f5.prototype.ag = function () {
        return this.Hn.Yc;
      };
      _0xe756f5.prototype.Cm = function (_0x1eccd2) {
        this.$c = _0x1eccd2;
        if (this.Hn.$c !== _0x1eccd2) {
          for (var _0x57915c = _0x1eccd2; _0x57915c < this.Hn._c.length; _0x57915c++) {
            this.Hn._c[_0x57915c].Cd();
          }
          ;
          while (this.Hn.$c > _0x1eccd2) {
            this.Hn.$c -= 1;
            var _0x18ee1c = this.Hn._c[this.Hn.$c];
            _0x18ee1c.md.G();
            _0x18ee1c.ld.G();
          }
          ;
          while (this.Hn.$c < _0x1eccd2) {
            var _0x51c51c = this.Hn._c[this.Hn.$c];
            this.Hn.$c += 1;
            this.Hn.Yc.addChild(_0x51c51c.ld.zd());
            this.Hn.Yc.addChild(_0x51c51c.md.zd());
            _0x51c51c.ld.Rj(this.Kn);
            _0x51c51c.md.Rj(this.Ln);
          }
          ;
          for (var _0x26ae41 = 0; _0x26ae41 < this.Hn.Zc.od.length; _0x26ae41++) {
            this.Hn.Zc.od[_0x26ae41].Rj(this.Mn);
          }
          ;
          for (var _0x2cf642 = 0; _0x2cf642 < this.Hn.Zc.pd.length; _0x2cf642++) {
            this.Hn.Zc.pd[_0x2cf642].Rj(this.Nn);
          }
          ;
          for (var _0x53f708 = 0; _0x53f708 < this.Hn.Zc.rd.length; _0x53f708++) {
            this.Hn.Zc.rd[_0x53f708].Rj(this.On);
          }
          ;
          for (var _0x46a3df = 0; _0x46a3df < this.Hn.Zc.qd.length; _0x46a3df++) {
            this.Hn.Zc.qd[_0x46a3df].Rj(this.Pn);
          }
        }
      };
      _0xe756f5.prototype.Im = function () {
        return this.$c;
      };
      _0xe756f5.prototype.Gm = function (_0x305105) {
        this.In = _0x305105;
        this.Jn = "#ffffff";
        this.Tm();
      };
      _0xe756f5.prototype.Hm = function (_0x4f4abc) {
        this.In = _0x290821;
        this.Jn = _0x4f4abc;
        this.Tm();
      };
      _0xe756f5.prototype.Tm = function () {
        this.Hn.hd(_0x56b227.jd.ch, null, ooo.ud.Cc().Tb(this.In.Tj), ooo.ud.Cc().Vb(this.In.Uj), ooo.ud.Cc().Wb(this.In.Vj), ooo.ud.Cc().Xb(this.In.Xj), ooo.ud.Cc().Yb(this.In.Wj), this.Jn);
      };
      _0xe756f5.prototype.Dm = function (_0x3390f5) {
        this.mj = _0x3390f5;
      };
      _0xe756f5.prototype.Km = function () {
        return this.mj;
      };
      _0xe756f5.prototype.Wm = function (_0x565bf0, _0x718cc5) {
        this.Kn = _0x565bf0;
        this.Ln = _0x718cc5;
        for (var _0x40750c = 0; _0x40750c < this.$c; _0x40750c++) {
          var _0x13859f = this.Hn._c[_0x40750c];
          _0x13859f.ld.Rj(this.Kn);
          _0x13859f.md.Rj(this.Ln);
        }
      };
      _0xe756f5.prototype.Zm = function (_0x52ec34, _0x1688a2, _0x3fa7dc, _0x3b79c3) {
        this.Mn = _0x52ec34;
        this.Nn = _0x1688a2;
        this.On = _0x3fa7dc;
        this.Pn = _0x3b79c3;
        for (var _0x50f1d1 = 0; _0x50f1d1 < this.Hn.Zc.od.length; _0x50f1d1++) {
          this.Hn.Zc.od[_0x50f1d1].Rj(this.Mn);
        }
        ;
        for (var _0x1ca99e = 0; _0x1ca99e < this.Hn.Zc.pd.length; _0x1ca99e++) {
          this.Hn.Zc.pd[_0x1ca99e].Rj(this.Nn);
        }
        ;
        for (var _0x50c4e6 = 0; _0x50c4e6 < this.Hn.Zc.rd.length; _0x50c4e6++) {
          this.Hn.Zc.rd[_0x50c4e6].Rj(this.On);
        }
        ;
        for (var _0x434ace = 0; _0x434ace < this.Hn.Zc.qd.length; _0x434ace++) {
          this.Hn.Zc.qd[_0x434ace].Rj(this.Pn);
        }
      };
      _0xe756f5.prototype.Bg = function () {
        var _0x58e4b0 = this.mj * 2;
        var _0x31c5d5 = this.mj * 2 * 1.5;
        if (this.$c > 0) {
          var _0x33b503 = this.Jm[0];
          var _0x2d55b2 = this.Jm[1];
          var _0x4c6e5a = this.Jm[2];
          this.Hn._c[0].Ad(_0x33b503, _0x2d55b2, _0x58e4b0, _0x31c5d5, _0x4c6e5a);
          this.Hn.Zc.Ad(_0x33b503, _0x2d55b2, _0x58e4b0, _0x4c6e5a);
        }
        ;
        for (var _0x1c7211 = 1; _0x1c7211 < this.$c; _0x1c7211++) {
          var _0x1c0a5c = this.Jm[_0x1c7211 * 3];
          var _0x1f38e3 = this.Jm[_0x1c7211 * 3 + 1];
          var _0x24559b = this.Jm[_0x1c7211 * 3 + 2];
          this.Hn._c[_0x1c7211].Ad(_0x1c0a5c, _0x1f38e3, _0x58e4b0, _0x31c5d5, _0x24559b);
        }
      };
      _0xe756f5.prototype._m = function (_0x3db101) {
        _0x3db101.render(this.Hn.Yc);
      };
      return _0xe756f5;
    }();
    _0x56b227.Uf = function () {
      function _0xa38c78(_0x3df755) {
        this.Wd = _0x3df755;
      }
      _0xa38c78.Tf = $("#background-canvas");
      _0xa38c78.Qn = $("#stretch-box");
      _0xa38c78.Rn = $("#social-buttons");
      _0xa38c78.Sn = $("#markup-wrap");
      _0xa38c78.Tn = $("#game-view");
      _0xa38c78.Un = $("#results-view");
      _0xa38c78.Vn = $("#main-menu-view");
      _0xa38c78.Wn = $("#popup-view");
      _0xa38c78.Xn = $("#toaster-view");
      _0xa38c78.Yn = $("#loading-view");
      _0xa38c78.Zn = $("#restricted-view");
      _0xa38c78.$n = $("#error-gateway-connection-view");
      _0xa38c78._n = $("#error-game-connection-view");
      _0xa38c78.prototype.Sa = function () {};
      _0xa38c78.prototype.ml = function () {};
      _0xa38c78.prototype.nl = function () {};
      _0xa38c78.prototype.hl = function () {};
      _0xa38c78.prototype.qg = function () {};
      _0xa38c78.prototype.ug = function (_0x289a95, _0x282402) {};
      return _0xa38c78;
    }();
    _0xfca6f8 = $("#final-caption");
    _0x238a63 = $("#final-continue");
    _0x330679 = $("#congrats-bg");
    _0x40073e = $("#unl6wj4czdl84o9b");
    _0x539f74 = $("#final-share-fb");
    _0x3eb89d = $("#final-message");
    _0x57049b = $("#final-score");
    _0x286536 = $("#final-place");
    _0x321967 = $("#final-board");
    _0x10836f = $("#game-canvas");
    (_0x34f829 = _0x4a5ec2.ca(_0x56b227.Uf, function () {
      _0x56b227.Uf.call(this, _0x56b227.ll.ao);
      var _0xd83147 = this;
      var _0xbf3c54 = _0x10836f.get()[0];
      _0x539f74.toggle(_0x2c8e1f.co.bo);
      _0xfca6f8.text(_0x4a5ec2.U("index.game.result.title"));
      _0x238a63.text(_0x4a5ec2.U("index.game.result.continue"));
      _0x238a63.html("Continue (Home)");
      _0x238a63.after("<div id='final-replay'>Replay</div>");
      _0x238a63.click(function () {
        ooo.ij.if();
        _0x2c8e1f.co.do.Va();
        ooo.ij.Ye(_0x56b227.Pe.Se.Jf);
        ooo.Xg.gl(ooo.Xg.Jf);
      });
      $("#final-replay").click(function () {
        ooo.ij.if();
        ooo.to();
      });
      $("html").keydown(function (_0x48c526) {
        if (_0x48c526.keyCode !== 17 || !(_0x40085c.ctrl = true)) {
          if (_0x48c526.keyCode !== 17) {
            _0x40085c.ctrl = false;
          }
        }
        if (_0x48c526.keyCode === 32) {
          _0xd83147.eo = true;
        }
        if (_0x48c526.keyCode === 49) {
          _0x32e53c();
        }
        if (_0x48c526.keyCode === 50) {
          if (_0xafdd52.on && _0x40085c.s) {
            if (_0x40085c.selectedHats && _0x40085c.selectedHats.length > 0) {
              _0x40085c.currentHatIndex = (_0x40085c.currentHatIndex + 1) % _0x40085c.selectedHats.length;
              let _0x7d2e98 = _0x40085c.selectedHats[_0x40085c.currentHatIndex];
              _0x5694d3(_0x7d2e98);
              localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
            }
          }
        }
      }).keyup(function (_0x14ee84) {
        _0x40085c.ctrl = false;
        if (_0xafdd52.on && _0x40085c.s) {
          if (_0x14ee84.keyCode == 81 || _0x14ee84.keyCode == 87) {
            if (_0x14ee84.keyCode == 81) {
              _0x1858a1.texture = _0x309e8f;
              _0x4d02d3.texture = _0x113e6c;
              _0x1858a1.alpha = 1;
              _0x4d02d3.alpha = 0.25;
              _0x31925f();
            }
            if (_0x14ee84.keyCode == 87) {
              _0x4d02d3.texture = _0x69c8af;
              _0x1858a1.texture = _0x6d9730;
              _0x1858a1.alpha = 0.25;
              _0x4d02d3.alpha = 1;
              _0x3fa971();
            }
          } else {
            _0x4d02d3.texture = _0x113e6c;
            _0x1858a1.texture = _0x6d9730;
            _0x4d02d3.alpha = 0.25;
            _0x1858a1.alpha = 0.25;
            _0x2f98b4 = false;
            _0x180844 = 55;
            _0x1f9818 = 1;
            _0x2d01c8 = true;
            clearInterval(_0x4ed629);
            _0x4ed629 = null;
          }
          if (_0x14ee84.keyCode == 90) {
            if (_0x40085c.z == 1) {
              if (_0x40085c.h) {
                _0x40085c.z = 1.6;
              } else {
                _0x40085c.z = 1.2;
              }
              _0x2de66c.texture = _0x51adae;
              _0x2de66c.alpha = 1;
            } else {
              _0x40085c.z = 1;
              _0x2de66c.texture = _0x1e2b71;
              _0x2de66c.alpha = 0.25;
            }
          }
          if (_0x40085c.hz && !_0x40085c.mobile) {
            if (_0x14ee84.keyCode == 188 && _0x40085c.z >= 0.2) {
              _0x40085c.z = _0x40085c.z - 0.1;
            }
            if (_0x14ee84.keyCode == 190 && _0x40085c.z <= 25) {
              _0x40085c.z = _0x40085c.z + 0.1;
            }
          }
        }
        if (_0xafdd52.on && _0x14ee84.keyCode == 82) {
          if (!window.lastRespawnTime) {
            window.lastRespawnTime = 0;
          }
          const _0x28e1b7 = new Date().getTime();
          const _0x360a1c = _0x28e1b7 - window.lastRespawnTime;
          if (_0x360a1c < 1000) {
            console.log("Ø§Ù†ØªØ¸Ø± Ù„Ø­Ø¸Ø©...");
            return;
          }
          window.lastRespawnTime = _0x28e1b7;
          if (_0x40085c.pi && _0x40085c.pn) {
            $("#port_id_s").val(_0x40085c.pi);
            $("#port_name_s").val(_0x40085c.pn);
            $("#port_id").val($("#port_id_s").val());
            $("#port_name").val($("#port_name_s").val());
          }
          _0x40085c.r1 = true;
          try {
            if (ooo.Mh && typeof ooo.Mh.uj === "function") {
              ooo.Mh.uj();
              setTimeout(function () {
                document.getElementById("mm-action-play").click();
              }, 300);
              return;
            }
          } catch (_0x3c60ba) {
            console.log("ÙØ´Ù„ ÙÙŠ ØªÙ†ÙÙŠØ° Ø¯Ø§Ù„Ø© Ø§Ù„Ù…ÙˆØª Ø§Ù„Ø·Ø¨ÙŠØ¹ÙŠØ©");
          }
          try {
            if (ooo.Mh && typeof ooo.Mh.gr === "function") {
              ooo.Mh.gr();
            } else if (ooo.Mh && ooo.Mh.Rq) {
              try {
                ooo.Mh.go = 3;
              } catch (_0x2147d6) {}
              ooo.Mh.Rq.close();
            }
            setTimeout(function () {
              try {
                const _0x197e9a = document.querySelectorAll(".error, .alert, .modal, .popup, .notification");
                _0x197e9a.forEach(_0x5d0be2 => {
                  try {
                    _0x5d0be2.style.display = "none";
                  } catch (_0xefe77b) {}
                });
              } catch (_0xfaebc9) {}
              document.getElementById("mm-action-play").click();
            }, 350);
          } catch (_0x4353d2) {
            console.log("Ø®Ø·Ø£ ÙÙŠ Ø¹Ù…Ù„ÙŠØ© Ø§Ù„Ø±Ø³Ø¨ÙˆÙ†:", _0x4353d2);
            document.getElementById("mm-action-play").click();
          }
        }
        if (_0xafdd52.on && _0x14ee84.keyCode == 56) {
          document.getElementById("settings-show-names-switch").click();
          if (_0x40085c.sn) {
            _0x40085c.sn = false;
          } else {
            _0x40085c.sn = true;
          }
        }
        if (_0x14ee84.keyCode === 32) {
          _0xd83147.eo = false;
        }
      });
      _0xbf3c54.addEventListener("touchmove", function (_0x55d068) {
        if (_0xafdd52.on && _0x40085c.mobile && _0x40085c.mo != 6 && _0x40085c.s) {
          var _0x1e81f6 = btoa(_0x40085c.c_1);
          if (_0x40085c.mo1.x != -1 && _0x40085c.mo1.y == -1 && btoa(_0x1e81f6) == _0x40085c.d_1 || _0x40085c.mo2.x == -1 && _0x40085c.mo2.y != -1 && btoa(_0x1e81f6) == _0x40085c.d_1) {
            var _0x34936c = ooo.Xg.Kf.Wg.Ah;
            var _0x4630ba = _0xbf3c54.offsetHeight;
            var _0x44c414 = _0xbf3c54.offsetWidth;
            var _0x2ef3f6 = _0x4630ba * 0.5;
            var _0xf7c37b = _0x44c414 * 0.5;
            var _0x4dd6b7 = btoa(_0x40085c.c_2);
            for (let _0xfd0c75 = 0; _0xfd0c75 < _0x55d068.changedTouches.length; _0xfd0c75++) {
              var _0x27f7cd = _0x55d068.changedTouches[_0xfd0c75].pageX;
              var _0x59a83c = _0x55d068.changedTouches[_0xfd0c75].pageY;
              var _0x1827bf = _0x55d068.changedTouches[_0xfd0c75].identifier;
              if (_0x40085c.mo == 1 && btoa(_0x4dd6b7) == _0x40085c.d_2) {
                _0x4630ba *= 0.5;
                _0x44c414 *= 0.5;
              }
              if (_0x40085c.mo == 2 && btoa(_0x4dd6b7) == _0x40085c.d_2) {
                _0x4630ba = _0x34936c.img_o_2.y + 110;
                _0x44c414 = _0x34936c.img_o_2.x + 110;
              }
              if (_0x40085c.mo == 3 && btoa(_0x4dd6b7) == _0x40085c.d_2) {
                _0x4630ba = _0x34936c.img_o_3.y + 110;
                _0x44c414 = _0x34936c.img_o_3.x + 110;
              }
              if (_0x40085c.mo == 4 && btoa(_0x4dd6b7) == _0x40085c.d_2 || _0x40085c.mo == 5 && btoa(_0x4dd6b7) == _0x40085c.d_2) {
                _0x4630ba = _0x34936c.img_o_4.y + 110;
                _0x44c414 = _0x34936c.img_o_4.x + 110;
              }
              var _0xc57214 = btoa(_0x40085c.c_5);
              var _0x7258be = Math.atan2(_0x59a83c - _0x4630ba, _0x27f7cd - _0x44c414);
              var _0x2d4826 = Math.cos(_0x7258be);
              var _0x3a8c50 = Math.sin(_0x7258be);
              var _0x355399 = btoa(_0x40085c.c_4);
              var _0x5d0c83 = _0x40085c.mo1.x == _0x1827bf;
              btoa(_0x40085c.c_3);
              if (_0x5d0c83 && btoa(_0x355399) == _0x40085c.d_4) {
                if (_0x27f7cd <= 0 || _0x59a83c <= 0) {
                  _0x40085c.mo1.x = -1;
                  if (_0x40085c.mo == 1) {
                    _0x34936c.img_p_1.alpha = 0.25;
                  }
                  if (_0x40085c.mo == 2) {
                    _0x34936c.img_o_2.alpha = 0.25;
                    _0x34936c.img_i_2.alpha = 0.25;
                    _0x34936c.img_p_2.alpha = 0.25;
                  }
                  if (_0x40085c.mo == 3) {
                    _0x34936c.img_o_3.alpha = 0.25;
                    _0x34936c.img_i_3.alpha = 0.25;
                    _0x34936c.img_p_3.alpha = 0.25;
                  }
                  if (_0x40085c.mo == 4 || _0x40085c.mo == 5) {
                    _0x34936c.img_p_2.alpha = 0.25;
                  }
                } else {
                  _0xd83147.fo = _0x7258be;
                  var _0x41b7c2 = 50;
                  if (_0x40085c.mo == 1 || _0x40085c.mo == 4 || _0x40085c.mo == 5) {
                    _0x41b7c2 = 110;
                  }
                  var _0x2cd04a = _0x44c414 - _0x27f7cd;
                  var _0x31f0ea = _0x4630ba - _0x59a83c;
                  var _0x4bc23e = Math.sqrt(_0x2cd04a * _0x2cd04a + _0x31f0ea * _0x31f0ea);
                  var _0x425bed = _0xf7c37b + _0x4bc23e * _0x2d4826 - 68;
                  var _0x53706f = _0x2ef3f6 + _0x4bc23e * _0x3a8c50 - 68;
                  var _0x392a77 = _0xf7c37b + _0x41b7c2 * _0x2d4826 - 68;
                  var _0x480f0a = _0x2ef3f6 + _0x41b7c2 * _0x3a8c50 - 68;
                  var _0x46667c = _0xf7c37b + _0x2d4826 * 75 - 68;
                  var _0x11d14a = _0x2ef3f6 + _0x3a8c50 * 75 - 68;
                  var _0x319268 = _0x27f7cd - 85;
                  var _0x2a244e = _0x59a83c - 85;
                  var _0x36abee = _0x44c414 + _0x41b7c2 * _0x2d4826 - 85;
                  var _0x482a67 = _0x4630ba + _0x41b7c2 * _0x3a8c50 - 85;
                  var _0x555ab8 = _0x44c414 + _0x2d4826 * 3 - 110;
                  var _0x1a3405 = _0x4630ba + _0x3a8c50 * 3 - 110;
                  if (_0x4bc23e < _0x41b7c2) {
                    if (_0x40085c.mo2.x == -1 && _0x40085c.mo2.y != -1) {
                      _0x34936c.img_pf_1.x = _0x425bed;
                      _0x34936c.img_pf_1.y = _0x53706f;
                    } else {
                      if (_0x40085c.mo == 1) {
                        _0x34936c.img_p_1.x = _0x425bed;
                        _0x34936c.img_p_1.y = _0x53706f;
                      }
                      if (_0x40085c.mo == 2 || _0x40085c.mo == 4 || _0x40085c.mo == 5) {
                        _0x34936c.img_p_2.x = _0x425bed;
                        _0x34936c.img_p_2.y = _0x53706f;
                      }
                      if (_0x40085c.mo == 3) {
                        _0x34936c.img_p_3.x = _0x425bed;
                        _0x34936c.img_p_3.y = _0x53706f;
                      }
                    }
                    if (_0x40085c.mo == 2) {
                      _0x34936c.img_i_2.y = _0x2a244e;
                      _0x34936c.img_i_2.x = _0x319268;
                    }
                    if (_0x40085c.mo == 3) {
                      _0x34936c.img_i_3.y = _0x2a244e;
                      _0x34936c.img_i_3.x = _0x319268;
                    }
                  } else {
                    if (_0x40085c.mo2.x == -1 && _0x40085c.mo2.y != -1) {
                      _0x34936c.img_pf_1.x = _0x392a77;
                      _0x34936c.img_pf_1.y = _0x480f0a;
                      if (_0x40085c.mo == 2 || _0x40085c.mo == 3) {
                        if (_0x4bc23e < 75) {
                          _0x34936c.img_pf_1.x = _0x425bed;
                          _0x34936c.img_pf_1.y = _0x53706f;
                        } else {
                          _0x34936c.img_pf_1.x = _0x46667c;
                          _0x34936c.img_pf_1.y = _0x11d14a;
                        }
                      }
                    } else {
                      if (_0x40085c.mo == 1) {
                        _0x34936c.img_p_1.x = _0x392a77;
                        _0x34936c.img_p_1.y = _0x480f0a;
                      }
                      if (_0x40085c.mo == 2 || _0x40085c.mo == 4 || _0x40085c.mo == 5) {
                        _0x34936c.img_p_2.x = _0x392a77;
                        _0x34936c.img_p_2.y = _0x480f0a;
                        if (_0x40085c.mo == 2) {
                          if (_0x4bc23e < 75) {
                            _0x34936c.img_p_2.x = _0x425bed;
                            _0x34936c.img_p_2.y = _0x53706f;
                          } else {
                            _0x34936c.img_p_2.x = _0x46667c;
                            _0x34936c.img_p_2.y = _0x11d14a;
                          }
                        }
                      }
                      if (_0x40085c.mo == 3) {
                        if (_0x4bc23e < 75) {
                          _0x34936c.img_p_3.x = _0x425bed;
                          _0x34936c.img_p_3.y = _0x53706f;
                        } else {
                          _0x34936c.img_p_3.x = _0x46667c;
                          _0x34936c.img_p_3.y = _0x11d14a;
                        }
                      }
                    }
                    if (_0x40085c.mo == 2) {
                      _0x34936c.img_i_2.y = _0x482a67;
                      _0x34936c.img_i_2.x = _0x36abee;
                    }
                    if (_0x40085c.mo == 3) {
                      _0x34936c.img_i_3.y = _0x482a67;
                      _0x34936c.img_i_3.x = _0x36abee;
                      _0x34936c.img_o_3.y = _0x1a3405;
                      _0x34936c.img_o_3.x = _0x555ab8;
                    }
                  }
                }
              } else if ((_0x5d0c83 = _0x40085c.mo2.y == _0x1827bf) && btoa(_0xc57214) == _0x40085c.d_5) {
                if (_0x27f7cd <= 0 || _0x59a83c <= 0) {
                  _0x40085c.mo2.y = -1;
                  _0x34936c.img_f.visible = false;
                  _0x34936c.img_pf_1.visible = false;
                  if (_0x40085c.mo == 1) {
                    _0x34936c.img_p_1.visible = true;
                  }
                  if (_0x40085c.mo == 2 || _0x40085c.mo == 4 || _0x40085c.mo == 5) {
                    _0x34936c.img_p_2.visible = true;
                  }
                  if (_0x40085c.mo == 3) {
                    _0x34936c.img_p_3.visible = true;
                  }
                  if (_0x40085c.mo == 4 || _0x40085c.mo == 5) {
                    _0x34936c.img_f.visible = true;
                  }
                  _0xd83147.eo = false;
                } else if (_0x40085c.mo == 3) {
                  _0x2d4826 = Math.cos(_0x7258be = Math.atan2(_0x59a83c - (_0x4630ba = _0x34936c.img_f.y + 100), _0x27f7cd - (_0x44c414 = _0x34936c.img_f.x + 100)));
                  _0x3a8c50 = Math.sin(_0x7258be);
                  var _0x319268 = _0x44c414 + _0x2d4826 * 3 - 100;
                  var _0x2a244e = _0x4630ba + _0x3a8c50 * 3 - 100;
                  var _0x2cd04a = _0x44c414 - _0x27f7cd;
                  var _0x31f0ea = _0x4630ba - _0x59a83c;
                  var _0x4bc23e = Math.sqrt(_0x2cd04a * _0x2cd04a + _0x31f0ea * _0x31f0ea);
                  if (_0x4bc23e >= 40) {
                    _0x34936c.img_f.y = _0x319268;
                    _0x34936c.img_f.x = _0x2a244e;
                  }
                }
              }
            }
          }
        } else if (!_0x65d30() || !_0x40085c.joystick.checked) {
          if (_0x55d068 = _0x55d068 || window.event) {
            if ((_0x55d068 = _0x55d068.touches[0]).clientX !== undefined) {
              _0xd83147.fo = Math.atan2(_0x55d068.clientY - _0xbf3c54.offsetHeight * 0.5, _0x55d068.clientX - _0xbf3c54.offsetWidth * 0.5);
            } else {
              _0xd83147.fo = Math.atan2(_0x55d068.pageY - _0xbf3c54.offsetHeight * 0.5, _0x55d068.pageX - _0xbf3c54.offsetWidth * 0.5);
            }
          }
        }
      }, true);
      _0xbf3c54.addEventListener("touchstart", function (_0x30e3a1) {
        if (_0xafdd52.on && _0x40085c.mobile && _0x40085c.mo != 6 && _0x40085c.s) {
          var _0x2ac068 = ooo.Xg.Kf.Wg.Ah;
          var _0x4edf5d = btoa(_0x40085c.c_4);
          var _0x220ed2 = _0xbf3c54.offsetHeight;
          var _0x1b18f6 = btoa(_0x40085c.c_3);
          var _0x4a5c9a = _0xbf3c54.offsetWidth;
          var _0x2f9af1 = btoa(_0x40085c.c_5);
          var _0x41b2a7 = (_0x30e3a1 = _0x30e3a1 || window.event).touches.item(0).pageX;
          var _0x4934b2 = btoa(_0x40085c.c_2);
          var _0x536cb8 = _0x30e3a1.touches.item(0).pageY;
          var _0x5afe7b = _0x30e3a1.touches.length;
          var _0x2bb248 = btoa(_0x40085c.c_1);
          var _0xeb0c8e = _0x30e3a1.touches.item(0).identifier;
          for (let _0x326daa = 0; _0x326daa < _0x5afe7b; _0x326daa++) {
            if (_0x40085c.mo2.x == -1 && _0x40085c.mo2.y != -1) {
              if (_0x30e3a1.touches.item(_0x326daa).identifier != _0x40085c.mo2.y) {
                _0x41b2a7 = _0x30e3a1.touches.item(_0x326daa).pageX;
                _0x536cb8 = _0x30e3a1.touches.item(_0x326daa).pageY;
                _0xeb0c8e = _0x30e3a1.touches.item(_0x326daa).identifier;
              }
            } else {
              _0x41b2a7 = _0x30e3a1.touches.item(_0x326daa).pageX;
              _0x536cb8 = _0x30e3a1.touches.item(_0x326daa).pageY;
              _0xeb0c8e = _0x30e3a1.touches.item(_0x326daa).identifier;
            }
          }
          ;
          var _0x233386 = 0;
          if (_0x40085c.mo == 4 && btoa(_0x2f9af1) == _0x40085c.d_5 || _0x40085c.mo == 5 && btoa(_0x4edf5d) == _0x40085c.d_4) {
            _0x233386 = Math.sqrt((_0x41b2a7 - _0x2ac068.img_f.x - 100) * (_0x41b2a7 - _0x2ac068.img_f.x - 100) + (_0x536cb8 - _0x2ac068.img_f.y - 100) * (_0x536cb8 - _0x2ac068.img_f.y - 100));
          }
          if (_0x5afe7b == 1 && (_0x40085c.mo == 4 && _0x233386 > 40 || _0x40085c.mo != 4) && (_0x40085c.mo == 5 && _0x233386 > 40 || _0x40085c.mo != 5)) {
            _0x40085c.mo2.y = -1;
            _0x2ac068.img_f.visible = false;
            _0x2ac068.img_pf_1.visible = false;
            if (_0x40085c.mo == 1) {
              _0x2ac068.img_p_1.alpha = 0.25;
              _0x2ac068.img_p_1.visible = true;
            }
            if (_0x40085c.mo == 2) {
              _0x2ac068.img_o_2.alpha = 0.25;
              _0x2ac068.img_i_2.alpha = 0.25;
              _0x2ac068.img_p_2.alpha = 0.25;
              _0x2ac068.img_p_2.visible = true;
            }
            if (_0x40085c.mo == 3) {
              _0x2ac068.img_o_3.alpha = 0.25;
              _0x2ac068.img_i_3.alpha = 0.25;
              _0x2ac068.img_p_3.alpha = 0.25;
              _0x2ac068.img_p_3.visible = true;
            }
            if (_0x40085c.mo == 4 || _0x40085c.mo == 5) {
              _0x2ac068.img_p_2.alpha = 0.25;
              _0x2ac068.img_p_2.visible = true;
              _0x2ac068.img_f.visible = true;
            }
            _0xd83147.eo = false;
          }
          if (_0x40085c.mo1.x == -1 && _0x40085c.mo1.y == -1 && btoa(_0x4edf5d) == _0x40085c.d_4 && (_0x40085c.mo == 4 && _0x233386 > 40 || _0x40085c.mo != 4 && btoa(_0x1b18f6) == _0x40085c.d_3) && (_0x40085c.mo == 5 && _0x233386 > 40 || _0x40085c.mo != 5 && btoa(_0x4934b2) == _0x40085c.d_2)) {
            _0x40085c.mo1.x = _0xeb0c8e;
            if (_0x40085c.mo1.x == _0x40085c.mo2.y && _0x40085c.mo1.y == _0x40085c.mo2.x) {
              _0x41b2a7 = _0x30e3a1.touches.item(1).pageX;
              _0x536cb8 = _0x30e3a1.touches.item(1).pageY;
            }
            var _0x5f032b = _0x4a5c9a * 0.5 - 68;
            var _0x33015f = _0x220ed2 * 0.5 - 68;
            var _0x522285 = _0x41b2a7 - 110;
            var _0x1dd6cc = _0x536cb8 - 110;
            var _0x41c687 = _0x41b2a7 - 85;
            var _0x457a4a = _0x536cb8 - 85;
            if (_0x40085c.mo == 1 && _0x40085c.mo2.x == -1 && _0x40085c.mo2.y == -1) {
              _0x2ac068.img_p_1.alpha = 1;
              _0x2ac068.img_p_1.x = _0x5f032b;
              _0x2ac068.img_p_1.y = _0x33015f;
              _0x2ac068.img_p_1.visible = true;
            }
            if (_0x40085c.mo == 2) {
              _0x2ac068.img_o_2.alpha = 1;
              _0x2ac068.img_o_2.x = _0x522285;
              _0x2ac068.img_o_2.y = _0x1dd6cc;
              _0x2ac068.img_i_2.alpha = 1;
              _0x2ac068.img_i_2.x = _0x41c687;
              _0x2ac068.img_i_2.y = _0x457a4a;
              if (_0x40085c.mo2.x == -1 && _0x40085c.mo2.y == -1) {
                _0x2ac068.img_p_2.alpha = 1;
                _0x2ac068.img_p_2.x = _0x5f032b;
                _0x2ac068.img_p_2.y = _0x33015f;
                _0x2ac068.img_p_2.visible = true;
              }
            }
            if (_0x40085c.mo == 3 && btoa(_0x2f9af1) == _0x40085c.d_5) {
              _0x2ac068.img_o_3.alpha = 1;
              _0x2ac068.img_o_3.x = _0x522285;
              _0x2ac068.img_o_3.y = _0x1dd6cc;
              _0x2ac068.img_i_3.alpha = 1;
              _0x2ac068.img_i_3.x = _0x41c687;
              _0x2ac068.img_i_3.y = _0x457a4a;
              if (_0x40085c.mo2.x == -1 && _0x40085c.mo2.y == -1) {
                _0x2ac068.img_p_3.alpha = 1;
                _0x2ac068.img_p_3.x = _0x5f032b;
                _0x2ac068.img_p_3.y = _0x33015f;
                _0x2ac068.img_p_3.visible = true;
              }
            }
            if (_0x40085c.mo == 4 && btoa(_0x4934b2) == _0x40085c.d_2 && _0x40085c.mo2.x == -1 && _0x40085c.mo2.y == -1) {
              _0x2ac068.img_p_2.alpha = 1;
              _0x2ac068.img_p_2.x = _0x5f032b;
              _0x2ac068.img_p_2.y = _0x33015f;
              _0x2ac068.img_p_2.visible = true;
            }
            if (_0x40085c.mo == 5 && btoa(_0x1b18f6) == _0x40085c.d_3 && _0x40085c.mo2.x == -1 && _0x40085c.mo2.y == -1) {
              _0x2ac068.img_p_2.alpha = 1;
              _0x2ac068.img_p_2.x = _0x5f032b;
              _0x2ac068.img_p_2.y = _0x33015f;
              _0x2ac068.img_p_2.visible = true;
            }
          } else if (_0x5afe7b >= 2 && _0x40085c.mo2.x == -1 && _0x40085c.mo2.y == -1 && btoa(_0x1b18f6) == _0x40085c.d_3 || _0x5afe7b == 1 && _0x40085c.mo == 4 && _0x233386 <= 40 && btoa(_0x2bb248) == _0x40085c.d_1 || _0x5afe7b == 1 && _0x40085c.mo == 5 && _0x233386 <= 40 && btoa(_0x4934b2) == _0x40085c.d_2) {
            _0x40085c.mo2.y = _0xeb0c8e;
            _0x2ac068.img_f.visible = true;
            _0x2ac068.img_pf_1.visible = true;
            if (_0x40085c.mo == 1) {
              _0x2ac068.img_p_1.visible = false;
              _0x2ac068.img_pf_1.x = _0x2ac068.img_p_1.x;
              _0x2ac068.img_pf_1.y = _0x2ac068.img_p_1.y;
            }
            if (_0x40085c.mo == 2 || _0x40085c.mo == 4 || _0x40085c.mo == 5) {
              _0x2ac068.img_p_2.visible = false;
              _0x2ac068.img_pf_1.x = _0x2ac068.img_p_2.x;
              _0x2ac068.img_pf_1.y = _0x2ac068.img_p_2.y;
            }
            if (_0x40085c.mo == 3 && btoa(_0x1b18f6) == _0x40085c.d_3) {
              _0x2ac068.img_p_3.visible = false;
              _0x2ac068.img_pf_1.x = _0x2ac068.img_p_3.x;
              _0x2ac068.img_pf_1.y = _0x2ac068.img_p_3.y;
            }
            if (_0x40085c.mo != 4 && _0x40085c.mo != 5) {
              _0x2ac068.img_f.x = _0x41b2a7 - 100;
              _0x2ac068.img_f.y = _0x536cb8 - 100;
            }
            _0xd83147.eo = true;
          }
          ;
          _0x30e3a1.preventDefault();
        } else {
          if (_0x30e3a1 = _0x30e3a1 || window.event) {
            _0xd83147.eo = _0x30e3a1.touches.length >= 2;
          }
          _0x30e3a1.preventDefault();
        }
      }, true);
      _0xbf3c54.addEventListener("touchend", function (_0x4b6a2b) {
        if (_0xafdd52.on && _0x40085c.mobile && _0x40085c.mo != 6 && _0x40085c.s) {
          var _0x19763d = ooo.Xg.Kf.Wg.Ah;
          var _0x394718 = btoa(_0x40085c.c_1);
          if (_0x4b6a2b = _0x4b6a2b || window.event) {
            if ((_0x4b6a2b = _0x4b6a2b.changedTouches[0]).clientX !== undefined) {
              _0x3048cc(_0x4b6a2b.clientX, _0x4b6a2b.clientY);
            } else {
              _0x3048cc(_0x4b6a2b.pageX, _0x4b6a2b.pageY);
            }
          }
          var _0x18d2db = btoa(_0x40085c.c_2);
          var _0x3a4d60 = _0x4b6a2b.identifier;
          if (_0x3a4d60 == _0x40085c.mo1.x && _0x40085c.mo1.y == -1 && btoa(_0x18d2db) == _0x40085c.d_2) {
            _0x40085c.mo1.x = -1;
            if (_0x40085c.mo == 1) {
              _0x19763d.img_p_1.alpha = 0.25;
            }
            if (_0x40085c.mo == 2) {
              _0x19763d.img_o_2.alpha = 0.25;
              _0x19763d.img_i_2.alpha = 0.25;
              _0x19763d.img_p_2.alpha = 0.25;
            }
            if (_0x40085c.mo == 3 && btoa(_0x394718) == _0x40085c.d_1) {
              _0x19763d.img_o_3.alpha = 0.25;
              _0x19763d.img_i_3.alpha = 0.25;
              _0x19763d.img_p_3.alpha = 0.25;
            }
            if (_0x40085c.mo == 4) {
              _0x19763d.img_p_2.alpha = 0.25;
            }
            if (_0x40085c.mo == 5) {
              _0x19763d.img_p_2.alpha = 0.25;
            }
          }
          var _0x5e5130 = btoa(_0x40085c.c_3);
          if (_0x40085c.mo2.x == -1 && _0x3a4d60 == _0x40085c.mo2.y && btoa(_0x5e5130) == _0x40085c.d_3) {
            _0x40085c.mo2.y = -1;
            _0x19763d.img_f.visible = false;
            _0x19763d.img_pf_1.visible = false;
            if (_0x40085c.mo == 1) {
              _0x19763d.img_p_1.visible = true;
            }
            if (_0x40085c.mo == 2 || _0x40085c.mo == 4 && btoa(_0x18d2db) == _0x40085c.d_2 || _0x40085c.mo == 5 && btoa(_0x5e5130) == _0x40085c.d_3) {
              _0x19763d.img_p_2.visible = true;
            }
            if (_0x40085c.mo == 3) {
              _0x19763d.img_p_3.visible = true;
            }
            if (_0x40085c.mo == 4 || _0x40085c.mo == 5) {
              _0x19763d.img_f.visible = true;
            }
            _0xd83147.eo = false;
          }
        } else {
          if (_0x4b6a2b = _0x4b6a2b || window.event) {
            _0xd83147.eo = _0x4b6a2b.touches.length >= 2;
          }
          if (_0x40085c.mobile && _0x40085c.s && (_0x4b6a2b = _0x4b6a2b || window.event)) {
            if ((_0x4b6a2b = _0x4b6a2b.changedTouches[0]).clientX !== undefined) {
              _0x3048cc(_0x4b6a2b.clientX, _0x4b6a2b.clientY);
            } else {
              _0x3048cc(_0x4b6a2b.pageX, _0x4b6a2b.pageY);
            }
          }
        }
      }, true);
      _0xbf3c54.addEventListener("mousemove", function (_0x1d5f38) {
        if (_0x1d5f38 = _0x1d5f38 || _0x56b227.c.event && _typeof(_0x1d5f38.clientX) != "undefined") {
          _0xd83147.fo = _0x4a5ec2.ta(_0x1d5f38.clientY - _0xbf3c54.offsetHeight * 0.5, _0x1d5f38.clientX - _0xbf3c54.offsetWidth * 0.5);
        }
      }, true);
      _0xbf3c54.addEventListener("mousedown", function (_0x2e2d61) {
        _0xd83147.eo = true;
      }, true);
      _0xbf3c54.addEventListener("mouseup", function (_0x344e02) {
        _0xd83147.eo = false;
      }, true);
      this.Wg = new _0x56b227.lh(_0x10836f);
      this.go = _0x5303b4.ho;
      this.fo = 0;
      this.eo = false;
      _0xafdd52.eie = _0xd83147;
    })).prototype.Sa = function () {};
    _0x34f829.prototype.ml = function () {
      _0x56b227.Nf.rg(false);
      _0x3f64b5.f.h(_0x56b227.Uf.Tf, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Qn, 1);
      _0x3f64b5.f.h(_0x56b227.Uf.Rn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Sn, 50);
      _0x3f64b5.f.g(_0x56b227.Uf.Tn, 500);
      if (this.go === _0x5303b4.ho) {
        _0x3f64b5.f.h(_0x56b227.Uf.Un, 1);
      } else {
        _0x3f64b5.f.g(_0x56b227.Uf.Un, 500);
      }
      _0x3f64b5.f.h(_0x56b227.Uf.Vn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Wn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Xn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Yn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Zn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.$n, 50);
      _0x3f64b5.f.h(_0x56b227.Uf._n, 50);
    };
    _0x34f829.prototype.ho = function () {
      this.go = _0x5303b4.ho;
      return this;
    };
    _0x34f829.prototype.io = function () {
      _0x3f64b5.f.h(_0x330679, 1);
      _0x4a5ec2.Y(function () {
        _0x3f64b5.f.g(_0x330679, 500);
      }, 3000);
      _0x3f64b5.f.h(_0x40073e, 1);
      _0x4a5ec2.Y(function () {
        _0x3f64b5.f.g(_0x40073e, 500);
      }, 500);
      this.go = _0x5303b4.io;
      return this;
    };
    _0x34f829.prototype.nl = function () {
      this.eo = false;
      this.Wg.qg();
      if (this.go === _0x5303b4.io) {
        ooo.ij.mf();
      }
    };
    _0x34f829.prototype.qg = function () {
      this.Wg.qg();
    };
    _0x34f829.prototype.ug = function (_0x4fe84c, _0x5c5a58) {
      this.Wg.ug(_0x4fe84c, _0x5c5a58);
    };
    _0x34f829.prototype.jo = function (_0x210bf5, _0x452923, _0x351a34) {
      var _0x581a39;
      var _0x2e85ad;
      var _0x4296bc;
      if (_0x452923 >= 1 && _0x452923 <= 10) {
        _0x581a39 = _0x4a5ec2.U("index.game.result.place.i" + _0x452923);
        _0x2e85ad = _0x4a5ec2.U("index.game.result.placeInBoard");
        _0x4296bc = _0x4a5ec2.U("index.game.social.shareResult.messGood").replace("{0}", _0x351a34).replace("{1}", _0x210bf5).replace("{2}", _0x581a39);
      } else {
        _0x581a39 = "";
        _0x2e85ad = _0x4a5ec2.U("index.game.result.tryHit");
        _0x4296bc = _0x4a5ec2.U("index.game.social.shareResult.messNorm").replace("{0}", _0x351a34).replace("{1}", _0x210bf5);
      }
      _0x3eb89d.html(_0x4a5ec2.U("index.game.result.your"));
      _0x57049b.html(_0x210bf5);
      _0x286536.html(_0x581a39);
      _0x321967.html(_0x2e85ad);
      if (_0x2c8e1f.co.bo) {
        var _0x3e2c2d;
        var _0x561f07;
        var _0x5cf23a;
        var _0x52cf13;
        var _0xced6a1;
        var _0x580ebb;
        var _0x5a3e5b;
        var _0x24886a = _0x4a5ec2.U("index.game.result.share");
        _0x4a5ec2.U("index.game.social.shareResult.caption");
        _0x539f74.empty().append((_0x3e2c2d = _0x24886a, _0x561f07 = "https://wormate.io", _0x5cf23a = "wormate.io", _0x52cf13 = _0x4296bc, _0xced6a1 = _0x4296bc, _0x580ebb = "https://wormate.io/images/og-share-img-new.jpg", (_0x5a3e5b = $("<div><svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" x=\"0\" y=\"0\" viewBox=\"0 0 456 456\" xml: space=\"preserve\"><rect x=\"0\" y=\"0\" width=\"456\" height=\"456\" fill=\"#517AD1\"/><path d=\"M242.7 456V279.7h-59.3v-71.9h59.3v-60.4c0-43.9 35.6-79.5 79.5-79.5h62v64.6h-44.4c-13.9 0-25.3 11.3-25.3 25.3v50h68.5l-9.5 71.9h-59.1V456z\" fill=\"#fff\"/></svg><span>" + _0x3e2c2d + "</span></div>")).click(function () {
          if ((typeof FB == "undefined" ? "undefined" : _typeof(FB)) !== "undefined" && _typeof(FB.ui) != "undefined") {
            FB.ui({
              method: "feed",
              display: "popup",
              link: _0x561f07,
              name: _0x5cf23a,
              caption: _0x52cf13,
              description: _0xced6a1,
              picture: _0x580ebb
            }, function () {});
          }
        }), _0x5a3e5b));
      }
    };
    _0x34f829.prototype.ko = function () {
      return this.fo;
    };
    _0x34f829.prototype.lo = function () {
      return this.eo;
    };
    _0x5303b4 = {
      ho: 0,
      io: 1
    };
    _0x56b227.Bk = _0x34f829;
    _0x219bd0 = $("#loading-progress-cont");
    _0x470fa1 = $("#loading-progress-bar");
    _0x1c24bd = $("#loading-progress-text");
    (_0x227f62 = _0x4a5ec2.ca(_0x56b227.Uf, function () {
      _0x56b227.Uf.call(this, _0x56b227.ll.ao);
      this.mo = -1;
      this.no = "";
    })).prototype.Sa = function () {};
    _0x227f62.prototype.ml = function () {
      _0x56b227.Nf.rg(true);
      _0x3f64b5.f.g(_0x56b227.Uf.Tf, 500);
      _0x3f64b5.f.g(_0x56b227.Uf.Qn, 1);
      _0x3f64b5.f.h(_0x56b227.Uf.Rn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Sn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Tn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Un, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Vn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Wn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Xn, 50);
      _0x3f64b5.f.g(_0x56b227.Uf.Yn, 500);
      _0x3f64b5.f.h(_0x56b227.Uf.Zn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.$n, 50);
      _0x3f64b5.f.h(_0x56b227.Uf._n, 50);
    };
    _0x227f62.prototype.nl = function () {
      ooo.ij.Ye(_0x56b227.Pe.Se.Re);
      ooo.Xg.Ak.wg();
      ooo.Xg.Ak.sg(true);
    };
    _0x227f62.prototype.hl = function () {
      ooo.Xg.Ak.sg(false);
    };
    _0x227f62.prototype.oo = function () {
      this.po("", 0);
      _0x3f64b5.f.g(_0x219bd0, 100);
    };
    _0x227f62.prototype.qo = function () {
      _0x3f64b5.f.h(_0x219bd0, 100);
    };
    _0x227f62.prototype.po = function (_0xbf7747, _0x329caa) {
      if (this.no !== _0xbf7747) {
        this.no = _0xbf7747;
      }
      var _0x369736 = _0x4a5ec2.fa(_0x4a5ec2._(_0x329caa * 100), 0, 100);
      if (this.mo !== _0x369736) {
        _0x470fa1.css("width", _0x369736 + "%");
        _0x1c24bd.html(_0x369736 + " %");
      }
    };
    _0x56b227.$k = _0x227f62;
    _0x1caeac = $("#mm-line-top");
    $("#mm-line-center");
    $("#mm-line-bottom");
    _0x496b7b = $("#mm-bottom-buttons");
    _0x1c1fd8 = $("#mm-menu-cont");
    _0x19cb5a = $("#mm-loading");
    _0x1c2e3d = $("#mm-loading-progress-bar");
    _0x5a2f6a = $("#mm-loading-progress-text");
    $("#mm-event-text");
    _0x3e8997 = $("#mm-skin-canv");
    _0x342001 = $("#mm-skin-prev");
    _0x2cb247 = $("#mm-skin-next");
    _0x4a45ba = $("#mm-skin-over");
    _0xcfdb38 = $("#mm-skin-over-button-list");
    _0xeb3f51 = $("#mm-params-nickname");
    _0x83c299 = $("#mm-params-game-mode");
    _0x343d40 = $("#mm-action-play");
    _0x56133a = $("#mm-action-guest");
    _0x2baa02 = $("#mm-action-login");
    _0x3a6da5 = $("#mm-player-info");
    _0x1eea98 = $("#mm-store");
    _0xac0b7a = $("#mm-leaders");
    _0x594a21 = $("#mm-settings");
    _0x471b0c = $("#mm-coins-box");
    _0x14e181 = $("#mm-player-avatar");
    _0x79e23e = $("#mm-player-username");
    _0x1268a4 = $("#mm-coins-val");
    _0x16b6f5 = $("#mm-player-exp-bar");
    _0x5a6d9a = $("#mm-player-exp-val");
    _0x26dd41 = $("#mm-player-level");
    (_0x199ee2 = _0x4a5ec2.ca(_0x56b227.Uf, function () {
      _0x56b227.Uf.call(this, _0x56b227.ll.kl);
      this.mo = -1;
      this.no = "";
      var _0xbe313a = ["ÙƒÙ„Ø¨", "fuck", "fuak", "Ø¬Ø­Ø´", "Ø£Ù† Ø§Ù„Ù„Ù‡ ÙŠØ±Ø§Ùƒ", "Ø¹Ø±Ø¶Ùƒ", "Ù†Ø¸ÙŠÙ", "Ø·ÙŠØ¨Ø©", "Ø§Ø®ÙˆÙƒ", "Ø§Ø®ØªÙƒ", "Ø§Ù…Ùƒ", "Ø§Ø¨ÙˆÙƒ", "Ù‚ÙˆØ§Ø¯", "Ù…Ù„Ø¹ÙˆÙ†"];
      function _0x177957(_0x585887) {
        if (!_0x585887) {
          return "";
        }
        return _0x585887.toLowerCase().replace(/[^a-zA-Z0-9\u0600-\u06FF*]/g, "").replace(/[Ù€]/g, "").replace(/[Ù‹ÙŒÙÙÙÙÙ‘Ù’]/g, "").replace(/[Ø£Ø¥Ø¢Ø§]/g, "Ø§").replace(/[Ù‰ÙŠ]/g, "ÙŠ").replace(/[Ø©]/g, "Ù‡");
      }
      function _0x2b8d9a(_0x9d6ed9, _0x30515c) {
        if (!_0x9d6ed9) {
          return false;
        }
        var _0x196a16 = _0x9d6ed9.replace(/\*$/, "");
        var _0x534b8f = _0x177957(_0x196a16);
        var _0x7b4999 = Array.isArray(_0x30515c) ? _0x30515c : Object.values(_0x30515c);
        return _0x7b4999.some(function (_0x3b9d13) {
          var _0xad4719 = _0x177957(_0x3b9d13);
          return _0x534b8f.includes(_0xad4719);
        });
      }
      window.handleNicknameChange = function (_0x58ae7d) {
        if (!_0x58ae7d || _0x58ae7d.trim() === "") {
          return "";
        }
        if (_0x2b8d9a(_0x58ae7d, _0xbe313a)) {
          return "Ø£Ù† Ø§Ù„Ù„Ù‡ ÙŠØ±Ø§Ùƒ*";
        }
        return _0x58ae7d;
      };
      fetch("https://wormup.in/api/words/get_banned_words.php").then(_0x418863 => _0x418863.json()).then(_0x4aeaad => {
        _0xbe313a = Array.isArray(_0x4aeaad) ? _0x4aeaad : Object.values(_0x4aeaad);
      }).catch(_0x3cf2c5 => {
        console.error("Error loading banned words:", _0x3cf2c5);
      });
      this.ro = new _0x56b227.Lm(_0x3e8997);
      _0x83c299.click(function () {
        ooo.ij.if();
      });
      _0x3e8997.click(function () {
        if (ooo.ok.nk()) {
          ooo.ij.if();
          ooo.Xg.gl(ooo.Xg.Qk);
        }
      });
      _0x342001.click(function () {
        ooo.ij.if();
        ooo.so.kk();
      });
      _0x2cb247.click(function () {
        ooo.ij.if();
        ooo.so.jk();
      });
      _0xeb3f51.keypress(function (_0x236853) {
        _0x40085c.r1 = false;
        if (_0x236853.keyCode === 13) {
          ooo.to();
        }
      });
      _0x343d40.click(function () {
        var _0x415ad3 = _0xeb3f51.val();
        if (_0x415ad3 && _0x415ad3.trim() !== "") {
          _0xeb3f51.val(window.handleNicknameChange(_0x415ad3));
        }
        ooo.ij.if();
        ooo.to();
      });
      _0x56133a.click(function () {
        var _0x4114e1 = _0xeb3f51.val();
        if (_0x4114e1 && _0x4114e1.trim() !== "") {
          _0xeb3f51.val(window.handleNicknameChange(_0x4114e1));
        }
        ooo.ij.if();
        ooo.to();
      });
      _0x2baa02.click(function () {
        ooo.ij.if();
        ooo.Xg.gl(ooo.Xg.Nk);
      });
      _0x594a21.click(function () {
        ooo.ij.if();
        ooo.Xg.gl(ooo.Xg.Hi);
      });
      _0x3a6da5.click(function () {
        if (ooo.ok.nk()) {
          ooo.ij.if();
          ooo.Xg.gl(ooo.Xg.Lk);
        }
      });
      _0xac0b7a.click(function () {
        if (ooo.ok.nk()) {
          ooo.ij.if();
          ooo.Xg.gl(ooo.Xg.Jk);
        }
      });
      _0x1eea98.click(function () {
        if (ooo.ok.nk()) {
          ooo.ij.if();
          ooo.Xg.gl(ooo.Xg.Sk);
        }
      });
      _0x471b0c.click(function () {
        if (ooo.ok.nk()) {
          ooo.ij.if();
          ooo.Xg.gl(ooo.Xg.Hk);
        }
      });
      this.uo();
      this.vo();
      var _0x75c8d6 = _0x56b227.Cg.Og(_0x56b227.Cg.Ig);
      if (_0x75c8d6 !== "ARENA" && _0x75c8d6 !== "TEAM2") {
        _0x75c8d6 = "ARENA";
      }
      _0x83c299.val(_0x75c8d6);
    })).prototype.Sa = function () {
      var _0x26e984 = this;
      function _0x5549de(_0x349278, _0x28e5d6) {
        if (_0x349278.pm) {
          _0x28e5d6.skinId = _0x349278.pm.Tj;
          _0x28e5d6.eyesId = _0x349278.pm.Uj;
          _0x28e5d6.mouthId = _0x349278.pm.Vj;
          _0x28e5d6.hatId = _0x349278.pm.Wj;
          _0x28e5d6.glassesId = _0x349278.pm.Xj;
        }
      }
      ooo.ok.fm(function () {
        if (ooo.ok.nk()) {
          _0x5549de(_0x40085c, ooo.ok.xl);
          ooo.so.lk(ooo.ok.Ul(), _0x56b227._j.$j);
          ooo.so.lk(ooo.ok.Vl(), _0x56b227._j.ak);
          ooo.so.lk(ooo.ok.Wl(), _0x56b227._j.bk);
          ooo.so.lk(ooo.ok.Xl(), _0x56b227._j.dk);
          ooo.so.lk(ooo.ok.Yl(), _0x56b227._j.ck);
        } else {
          ooo.so.lk(ooo.wo(), _0x56b227._j.$j);
          ooo.so.lk(0, _0x56b227._j.ak);
          ooo.so.lk(0, _0x56b227._j.bk);
          ooo.so.lk(0, _0x56b227._j.dk);
          ooo.so.lk(0, _0x56b227._j.ck);
        }
      });
      ooo.ok.fm(function () {
        _0x343d40.toggle(ooo.ok.nk());
        _0x2baa02.toggle(!ooo.ok.nk());
        _0x56133a.toggle(!ooo.ok.nk());
        _0xac0b7a.toggle(ooo.ok.nk());
        _0x1eea98.toggle(ooo.ok.nk());
        _0x471b0c.toggle(ooo.ok.nk());
        _0x3a6da5.toggle(true);
        _0x594a21.toggle(true);
        if (ooo.ok.nk()) {
          _0x4a45ba.hide();
          _0x79e23e.html(ooo.ok.Ll());
          _0x14e181.attr("src", ooo.ok.Nl());
          _0x1268a4.html(ooo.ok.Ql());
          _0x16b6f5.width(ooo.ok.Sl() * 100 / ooo.ok.Tl() + "%");
          _0x5a6d9a.html(ooo.ok.Sl() + " / " + ooo.ok.Tl());
          _0x26dd41.html(ooo.ok.Rl());
          _0xeb3f51.val(ooo.ok.Ml());
        } else {
          _0x4a45ba.toggle(_0x2c8e1f.co.bo && !ooo.xo());
          _0x79e23e.html(_0x79e23e.data("guest"));
          _0x14e181.attr("src", _0x2c8e1f.H.M);
          _0x1268a4.html("10");
          _0x16b6f5.width("0");
          _0x5a6d9a.html("");
          _0x26dd41.html(1);
          _0xeb3f51.val(_0x56b227.Cg.Og(_0x56b227.Cg.Jg));
        }
      });
      ooo.so.fk(function () {
        _0x26e984.ro.Gm(ooo.so.ek());
      });
    };
    _0x199ee2.prototype.ml = function () {
      _0x56b227.Nf.rg(true);
      _0x3f64b5.f.g(_0x56b227.Uf.Tf, 500);
      _0x3f64b5.f.g(_0x56b227.Uf.Qn, 1);
      _0x3f64b5.f.g(_0x56b227.Uf.Rn, 500);
      _0x3f64b5.f.g(_0x56b227.Uf.Sn, 500);
      _0x3f64b5.f.h(_0x56b227.Uf.Tn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Un, 50);
      _0x3f64b5.f.g(_0x56b227.Uf.Vn, 500);
      _0x3f64b5.f.h(_0x56b227.Uf.Wn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Xn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Yn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Zn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.$n, 50);
      _0x3f64b5.f.h(_0x56b227.Uf._n, 50);
    };
    _0x199ee2.prototype.yo = function () {
      _0x3f64b5.f.g(_0x1caeac, 500);
      _0x3f64b5.f.g(_0x496b7b, 500);
      _0x3f64b5.f.g(_0x1c1fd8, 500);
      _0x3f64b5.f.h(_0x19cb5a, 100);
    };
    _0x199ee2.prototype.zo = function () {
      _0x3f64b5.f.h(_0x1caeac, 100);
      _0x3f64b5.f.h(_0x496b7b, 100);
      _0x3f64b5.f.h(_0x1c1fd8, 100);
      _0x3f64b5.f.g(_0x19cb5a, 500);
    };
    _0x199ee2.prototype.po = function (_0x1766f5, _0x2a95d1) {
      if (this.no !== _0x1766f5) {
        this.no = _0x1766f5;
      }
      var _0x38e958 = _0x4a5ec2.fa(_0x4a5ec2._(_0x2a95d1 * 100), 0, 100);
      if (this.mo !== _0x38e958) {
        _0x1c2e3d.css("width", _0x38e958 + "%");
        _0x5a2f6a.html(_0x38e958 + " %");
      }
    };
    _0x199ee2.prototype.nl = function () {
      ooo.ij.jf();
      this.ro.rg(true);
    };
    _0x199ee2.prototype.hl = function () {
      this.ro.rg(false);
    };
    _0x199ee2.prototype.qg = function () {
      this.ro.qg();
    };
    _0x199ee2.prototype.ug = function (_0x4d086b, _0x1fdd06) {
      this.ro.ug();
    };
    _0x199ee2.prototype.Ml = function () {
      return _0xeb3f51.val();
    };
    _0x199ee2.prototype.Ao = function () {
      return _0x83c299.val();
    };
    _0x199ee2.prototype.uo = function () {
      var _0x514099 = $("#mm-advice-cont").children();
      var _0x5394c5 = 0;
      _0x4a5ec2.X(function () {
        _0x514099.eq(_0x5394c5).fadeOut(500, function () {
          if (++_0x5394c5 >= _0x514099.length) {
            _0x5394c5 = 0;
          }
          _0x514099.eq(_0x5394c5).fadeIn(500).css("display", "inline-block");
        });
      }, 3000);
    };
    _0x199ee2.prototype.vo = function () {
      if (_0x2c8e1f.co.bo && !ooo.xo()) {
        _0x4a45ba.show();
        var _0x644811 = _0x4a5ec2.U("index.game.main.menu.unlockSkins.share");
        var _0x33865b = encodeURIComponent(_0x4a5ec2.U("index.game.main.menu.unlockSkins.comeAndPlay"));
        _0xcfdb38.append($("<a class=\"mm-skin-over-button\" id=\"mm-skin-over-fb\" target=\"_blank\" href=\"https://www.facebook.com/dialog/share?app_id=861926850619051&display=popup&href=https%3A%2F%2Fwormate.io&redirect_uri=https%3A%2F%2Fwormate.io&hashtag=%23wormateio&quote=" + _0x33865b + "\"><img src=\"data: image/svg+xml; base64, PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ1NiA0NTYiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGQ9Ik0yNDQuMyA0NTZWMjc5LjdoLTU5LjN2LTcxLjloNTkuM3YtNjAuNGMwLTQzLjkgMzUuNi03OS41IDc5LjUtNzkuNWg2MnY2NC42aC00NC40Yy0xMy45IDAtMjUuMyAxMS4zLTI1LjMgMjUuM3Y1MGg2OC41bC05LjUgNzEuOWgtNTkuMVY0NTZ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+\"/><span>" + _0x644811 + "</span></a>").click(function _0x34391a() {
          ooo.Bo(true);
          _0x4a5ec2.Y(function () {
            _0x4a45ba.hide();
          }, 3000);
        }));
      }
    };
    _0x56b227.Ck = _0x199ee2;
    (_0x25c99f = _0x4a5ec2.ca(_0x56b227.Uf, function () {
      _0x56b227.Uf.call(this, _0x56b227.ll.ao);
    })).prototype.Sa = function () {};
    _0x25c99f.prototype.ml = function () {
      _0x56b227.Nf.rg(true);
      _0x3f64b5.f.h(_0x56b227.Uf.Tf, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Qn, 1);
      _0x3f64b5.f.h(_0x56b227.Uf.Rn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Sn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Tn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Un, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Vn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Wn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Xn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Yn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Zn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.$n, 50);
      _0x3f64b5.f.h(_0x56b227.Uf._n, 50);
    };
    _0x56b227.el = _0x25c99f;
    (_0x5cd705 = _0x4a5ec2.ca(_0x56b227.Uf, function () {
      _0x56b227.Uf.call(this, _0x56b227.ll.ao);
    })).prototype.Sa = function () {};
    _0x5cd705.prototype.ml = function () {
      _0x56b227.Nf.rg(true);
      _0x3f64b5.f.g(_0x56b227.Uf.Tf, 500);
      _0x3f64b5.f.g(_0x56b227.Uf.Qn, 1);
      _0x3f64b5.f.h(_0x56b227.Uf.Rn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Sn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Tn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Un, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Vn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Wn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Xn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Yn, 50);
      _0x3f64b5.f.g(_0x56b227.Uf.Zn, 500);
      _0x3f64b5.f.h(_0x56b227.Uf.$n, 50);
      _0x3f64b5.f.h(_0x56b227.Uf._n, 50);
    };
    _0x5cd705.prototype.nl = function () {};
    _0x56b227.Xk = _0x5cd705;
    _0x386186 = $("#toaster-stack");
    (_0x598181 = _0x4a5ec2.ca(_0x56b227.Uf, function () {
      _0x56b227.Uf.call(this, _0x56b227.ll.ao);
      this.Co = [];
      this.Do = null;
    })).prototype.Sa = function () {};
    _0x598181.prototype.ml = function () {
      _0x56b227.Nf.rg(true);
      _0x3f64b5.f.g(_0x56b227.Uf.Tf, 500);
      _0x3f64b5.f.g(_0x56b227.Uf.Qn, 1);
      _0x3f64b5.f.h(_0x56b227.Uf.Rn, 50);
      _0x3f64b5.f.g(_0x56b227.Uf.Sn, 500);
      _0x3f64b5.f.h(_0x56b227.Uf.Tn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Un, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Vn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Wn, 50);
      _0x3f64b5.f.g(_0x56b227.Uf.Xn, 500);
      _0x3f64b5.f.h(_0x56b227.Uf.Yn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Zn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.$n, 50);
      _0x3f64b5.f.h(_0x56b227.Uf._n, 50);
    };
    _0x598181.prototype.nl = function () {
      this.Eo();
    };
    _0x598181.prototype.ql = function () {
      return this.Do != null || this.Co.length > 0;
    };
    _0x598181.prototype.Fo = function (_0x558110) {
      this.Co.unshift(_0x558110);
      _0x4a5ec2.Y(function () {
        ooo.Xg.ol();
      }, 0);
    };
    _0x598181.prototype.km = function (_0x2b2dcb) {
      this.Co.push(_0x2b2dcb);
      _0x4a5ec2.Y(function () {
        ooo.Xg.ol();
      }, 0);
    };
    _0x598181.prototype.Eo = function () {
      var _0x15f89e = this;
      if (this.Do == null) {
        if (this.Co.length === 0) {
          ooo.Xg.jl();
          return;
        }
        ;
        var _0x59c40b = this.Co.shift();
        this.Do = _0x59c40b;
        var _0xa15ba9 = _0x59c40b.ag();
        _0x3f64b5.f.g(_0xa15ba9, 300);
        _0x386186.append(_0xa15ba9);
        _0x59c40b.Go = function () {
          _0xa15ba9.fadeOut(300);
          _0x4a5ec2.Y(function () {
            _0xa15ba9.remove();
          }, 300);
          if (_0x15f89e.Do === _0x59c40b) {
            _0x15f89e.Do = null;
          }
          _0x15f89e.Eo();
        };
        _0x59c40b.nl();
      }
    };
    _0x56b227.Zk = _0x598181;
    _0x56b227.ll = {
      ao: 0,
      kl: 1
    };
    _0x3d76d0 = $("#popup-menu-label");
    _0xaa7462 = $("#popup-menu-coins-box");
    _0x4fb406 = $("#popup-menu-coins-val");
    $("#popup-menu-back").click(function () {
      ooo.ij.if();
      ooo.Xg.jl();
    });
    _0xaa7462.click(function () {
      if (ooo.ok.nk()) {
        ooo.ij.if();
        ooo.Xg.gl(ooo.Xg.Hk);
      }
    });
    (_0x5bfc6d = _0x4a5ec2.ca(_0x56b227.Uf, function (_0x5ec843, _0x2ffe63) {
      _0x56b227.Uf.call(this, _0x56b227.ll.kl);
      this.Xa = _0x5ec843;
      this.Io = _0x2ffe63;
      this.Jo = [];
    })).prototype.Sa = function () {
      _0x5bfc6d.parent.prototype.Sa.call(this);
      if (!_0x5bfc6d.Ko) {
        _0x5bfc6d.Ko = true;
        ooo.ok.fm(function () {
          if (ooo.ok.nk()) {
            _0x4fb406.html(ooo.ok.Ql());
          } else {
            _0x4fb406.html("0");
          }
        });
      }
      _0x3f64b5.f.h(_0x56b227.Ho.Lo, 100);
    };
    _0x5bfc6d.Mo = $("#coins-view");
    _0x5bfc6d.No = $("#leaders-view");
    _0x5bfc6d.Oo = $("#profile-view");
    _0x5bfc6d.Po = $("#login-view");
    _0x5bfc6d.Qo = $("#settings-view");
    _0x5bfc6d.Ro = $("#skins-view");
    _0x5bfc6d.So = $("#store-view");
    _0x5bfc6d.To = $("#wear-view");
    _0x5bfc6d.Uo = $("#withdraw-consent-view");
    _0x5bfc6d.Vo = $("#delete-account-view");
    _0x5bfc6d.Lo = $("#please-wait-view");
    _0x5bfc6d.prototype.ml = function () {
      _0x56b227.Nf.rg(true);
      _0x3f64b5.f.g(_0x56b227.Uf.Tf, 1);
      _0x3f64b5.f.g(_0x56b227.Uf.Qn, 500);
      _0x3f64b5.f.g(_0x56b227.Uf.Rn, 200);
      _0x3f64b5.f.g(_0x56b227.Uf.Sn, 200);
      _0x3f64b5.f.h(_0x56b227.Uf.Tn, 200);
      _0x3f64b5.f.h(_0x56b227.Uf.Un, 200);
      _0x3f64b5.f.h(_0x56b227.Uf.Vn, 200);
      _0x3f64b5.f.g(_0x56b227.Uf.Wn, 200);
      _0x3f64b5.f.h(_0x56b227.Uf.Xn, 200);
      _0x3f64b5.f.h(_0x56b227.Uf.Yn, 200);
      _0x3f64b5.f.h(_0x56b227.Uf.Zn, 200);
      _0x3f64b5.f.h(_0x56b227.Uf.$n, 200);
      _0x3f64b5.f.h(_0x56b227.Uf._n, 200);
      _0x3d76d0.html(this.Xa);
      _0xaa7462.toggle(this.Io);
      this.Wo();
    };
    _0x5bfc6d.prototype.Wo = function () {};
    _0x5bfc6d.prototype.Xo = function (_0x11b8a5) {
      var _0x20e3ee = this;
      var _0x459f16 = _0x4a5ec2.va(0, 2147483647) & 2147483647;
      this.Jo.push(_0x459f16);
      _0x3f64b5.f.g(_0x56b227.Ho.Lo, 100);
      _0x4a5ec2.Y(function () {
        _0x20e3ee.Yo(_0x459f16);
      }, _0x11b8a5);
      return new _0x5c2c59(this, _0x459f16);
    };
    _0x5bfc6d.prototype.Yo = function (_0x407d15) {
      var _0x1aa108 = this.Jo.indexOf(_0x407d15);
      if (!(_0x1aa108 < 0)) {
        this.Jo.splice(_0x1aa108, 1);
        if (this.Jo.length === 0) {
          _0x3f64b5.f.h(_0x56b227.Ho.Lo, 100);
        }
      }
    };
    _0x56b227.Ho = _0x5bfc6d;
    var _0x151a3f;
    var _0x2d9ab8;
    var _0x42a3b5;
    var _0xef60ff;
    var _0x480d37;
    var _0x1a2e8b;
    var _0x12cc0b;
    var _0xfca6f8;
    var _0x238a63;
    var _0x330679;
    var _0x40073e;
    var _0x539f74;
    var _0x3eb89d;
    var _0x57049b;
    var _0x286536;
    var _0x321967;
    var _0x10836f;
    var _0x34f829;
    var _0x5303b4;
    var _0x219bd0;
    var _0x470fa1;
    var _0x1c24bd;
    var _0x227f62;
    var _0x1caeac;
    var _0x496b7b;
    var _0x1c1fd8;
    var _0x19cb5a;
    var _0x1c2e3d;
    var _0x5a2f6a;
    var _0x3e8997;
    var _0x342001;
    var _0x2cb247;
    var _0x4a45ba;
    var _0xcfdb38;
    var _0xeb3f51;
    var _0x83c299;
    var _0x343d40;
    var _0x56133a;
    var _0x2baa02;
    var _0x3a6da5;
    var _0x1eea98;
    var _0xac0b7a;
    var _0x594a21;
    var _0x471b0c;
    var _0x14e181;
    var _0x79e23e;
    var _0x1268a4;
    var _0x16b6f5;
    var _0x5a6d9a;
    var _0x26dd41;
    var _0x199ee2;
    var _0x25c99f;
    var _0x5cd705;
    var _0x386186;
    var _0x598181;
    var _0x3d76d0;
    var _0xaa7462;
    var _0x4fb406;
    var _0x5bfc6d;
    var _0x5956a2;
    var _0x3b1a67;
    var _0x372f1d;
    var _0x13b4c6;
    var _0x380a1c;
    var _0x38fd37;
    var _0x5e711e;
    var _0x353637;
    var _0x2f49cf;
    var _0x4099d3;
    var _0x2bb379;
    var _0x329d46;
    var _0x4456d9;
    var _0x152c5f;
    var _0x1c650f;
    var _0x443fb9;
    var _0x1e7983;
    var _0x16d4e9;
    var _0x4852bb;
    var _0x21e783;
    var _0x52032b;
    var _0x2cc3da;
    var _0x227bdc;
    var _0x41e9a8;
    var _0x5243c8;
    var _0x3d463a;
    var _0x1b25be;
    var _0xd35a4b;
    var _0xf75723;
    var _0x378a6a;
    var _0x5190ff;
    var _0x5b8cf2;
    var _0x24f8ab;
    var _0x1622cf;
    var _0x4356cc;
    var _0x291b3c;
    var _0x528516;
    var _0x48df28;
    var _0x340207;
    var _0x2c4d0d;
    var _0x3ca7f8;
    var _0x2ccd9a;
    var _0x436fd3;
    var _0x47dfbf;
    var _0x5912ef;
    var _0x3cf00;
    var _0xc36d69;
    var _0x1ddcfc;
    var _0xaeb566;
    var _0x5dc0c7;
    var _0xa4b654;
    var _0x1e46f1;
    var _0x2adbb5;
    var _0x1baae2;
    var _0x3dd96b;
    var _0xada470;
    var _0xd8006f;
    var _0x3c021b;
    var _0x2aee75;
    var _0x28a8c2;
    var _0x58be73;
    var _0x48aca7;
    var _0x14cb21;
    var _0xd3a2db;
    var _0x1bbeb1;
    var _0x1978e7;
    var _0x1b237c;
    var _0x16af68;
    var _0x38c8cc;
    var _0x5d0302;
    var _0x2d9153;
    var _0x185567;
    var _0xcd6d6f;
    var _0x3bf75e;
    var _0x334742;
    var _0x54a15c;
    var _0x13c81c;
    var _0x5f01c5;
    var _0x511e57;
    var _0x76d816;
    var _0x206918;
    var _0x312b23;
    var _0x134f14;
    var _0x242922;
    var _0x23a739;
    var _0x4ed1bd;
    var _0x30cd21;
    var _0x694c5;
    var _0x4fc3b8;
    var _0x37ce6e;
    var _0x10c812;
    var _0x5962d0;
    var _0x5c2c59 = function () {
      function _0x42b4d0(_0xad74d4, _0x56cf01) {
        this.Zo = _0xad74d4;
        this.$o = _0x56cf01;
      }
      _0x42b4d0.prototype._o = function () {
        this.Zo.Yo(this.$o);
      };
      return _0x42b4d0;
    }();
    _0x5956a2 = $("#store-buy-coins_125000");
    _0x3b1a67 = $("#store-buy-coins_50000");
    _0x372f1d = $("#store-buy-coins_16000");
    _0x13b4c6 = $("#store-buy-coins_7000");
    _0x380a1c = $("#store-buy-coins_3250");
    _0x38fd37 = $("#store-buy-coins_1250");
    (_0x5e711e = _0x4a5ec2.ca(_0x56b227.Ho, function () {
      _0x56b227.Ho.call(this, _0x4a5ec2.U("index.game.popup.menu.coins.tab"), false);
      var _0x1dea52 = this;
      _0x5956a2.click(function () {
        ooo.ij.if();
        _0x1dea52.ap("coins_125000");
      });
      _0x3b1a67.click(function () {
        ooo.ij.if();
        _0x1dea52.ap("coins_50000");
      });
      _0x372f1d.click(function () {
        ooo.ij.if();
        _0x1dea52.ap("coins_16000");
      });
      _0x13b4c6.click(function () {
        ooo.ij.if();
        _0x1dea52.ap("coins_7000");
      });
      _0x380a1c.click(function () {
        ooo.ij.if();
        _0x1dea52.ap("coins_3250");
      });
      _0x38fd37.click(function () {
        ooo.ij.if();
        _0x1dea52.ap("coins_1250");
      });
    })).prototype.Sa = function () {
      _0x5e711e.parent.prototype.Sa.call(this);
    };
    _0x5e711e.prototype.Wo = function () {
      _0x3f64b5.f.g(_0x56b227.Ho.Mo, 200);
      _0x3f64b5.f.h(_0x56b227.Ho.No, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Oo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Po, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Qo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Ro, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.So, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.To, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Uo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Vo, 50);
    };
    _0x5e711e.prototype.nl = function () {
      ooo.ij.jf();
    };
    _0x5e711e.prototype.ap = function (_0x50de9a) {};
    _0x56b227.Ik = _0x5e711e;
    _0x353637 = $("#highscore-table");
    _0x2f49cf = $("#leaders-button-level");
    _0x4099d3 = $("#leaders-button-highscore");
    _0x2bb379 = $("#leaders-button-kills");
    _0x329d46 = "byLevel";
    _0x4456d9 = "byHighScore";
    _0x152c5f = "byKillsAndHeadShots";
    (_0x1c650f = _0x4a5ec2.ca(_0x56b227.Ho, function () {
      _0x56b227.Ho.call(this, _0x4a5ec2.U("index.game.popup.menu.leaders.tab"), true);
      var _0x25e475 = this;
      this.bp = {};
      this.cp = {
        dp: {
          ep: _0x2f49cf,
          fp: _0x329d46
        },
        gp: {
          ep: _0x4099d3,
          fp: _0x4456d9
        },
        hp: {
          ep: _0x2bb379,
          fp: _0x152c5f
        }
      };
      _0x2f49cf.click(function () {
        ooo.ij.if();
        _0x25e475.ip(_0x25e475.cp.dp);
      });
      _0x4099d3.click(function () {
        ooo.ij.if();
        _0x25e475.ip(_0x25e475.cp.gp);
      });
      _0x2bb379.click(function () {
        ooo.ij.if();
        _0x25e475.ip(_0x25e475.cp.hp);
      });
    })).prototype.Sa = function () {
      _0x1c650f.parent.prototype.Sa.call(this);
    };
    _0x1c650f.prototype.Wo = function () {
      _0x3f64b5.f.h(_0x56b227.Ho.Mo, 50);
      _0x3f64b5.f.g(_0x56b227.Ho.No, 200);
      _0x3f64b5.f.h(_0x56b227.Ho.Oo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Po, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Qo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Ro, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.So, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.To, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Uo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Vo, 50);
    };
    _0x1c650f.prototype.nl = function () {
      var _0x35e08d = this;
      ooo.ij.jf();
      var _0x37875f = this.Xo(5000);
      var _0x61d650 = _0x2c8e1f.H.J + "/pub/leaders";
      _0x4a5ec2.Aa(_0x61d650, function () {
        var _0x32906b = {
          [_0x329d46]: [],
          [_0x4456d9]: [],
          [_0x152c5f]: []
        };
        _0x35e08d.bp = _0x32906b;
        _0x35e08d.ip(_0x35e08d.jp ?? _0x35e08d.cp.dp);
        _0x37875f._o();
      }, function (_0x4d4bbb) {
        _0x35e08d.bp = _0x4d4bbb;
        _0x35e08d.ip(_0x35e08d.jp ?? _0x35e08d.cp.dp);
        _0x37875f._o();
      });
    };
    _0x1c650f.prototype.ip = function (_0x5e923a) {
      this.jp = _0x5e923a;
      for (var _0x33cb7f in this.cp) {
        if (this.cp.hasOwnProperty(_0x33cb7f)) {
          this.cp[_0x33cb7f].ep.removeClass("pressed");
        }
      }
      ;
      this.jp.ep.addClass("pressed");
      for (var _0xa3829e = this.bp[this.jp.fp], _0x13bef8 = "", _0x205df2 = 0; _0x205df2 < _0xa3829e.length; _0x205df2++) {
        var _0x4a52e4 = _0xa3829e[_0x205df2];
        _0x13bef8 += `<div class="table-row"><span>${_0x205df2 + 1}</span><span><img src="${_0x4a52e4.avatarUrl}"/></span><span>${_0x4a52e4.username}</span><span>${_0x4a52e4.level}</span><span>${_0x4a52e4.highScore}</span><span>${_0x4a52e4.headShots} / ${_0x4a52e4.kills}</span></div>`;
      }
      ;
      _0x353637.empty();
      _0x353637.append(_0x13bef8);
    };
    _0x56b227.Kk = _0x1c650f;
    _0x443fb9 = $("#popup-login-gg");
    _0x1e7983 = $("#popup-login-fb");
    (_0x16d4e9 = _0x4a5ec2.ca(_0x56b227.Ho, function () {
      var _0x2f78d9 = this;
      _0x56b227.Ho.call(this, _0x4a5ec2.U("index.game.popup.menu.login.tab"), false);
      _0x443fb9.click(function () {
        ooo.ij.if();
        var _0x584c24 = _0x2f78d9.Xo(10000);
        _0x4a5ec2.Y(function () {
          ooo.ok.sm(function () {
            if (ooo.ok.nk()) {
              ooo.ij.mf();
            }
            _0x584c24._o();
          });
        }, 500);
      });
      _0x1e7983.click(function () {
        ooo.ij.if();
        var _0x576f4c = _0x2f78d9.Xo(10000);
        _0x4a5ec2.Y(function () {
          ooo.ok.pm(function () {
            if (ooo.ok.nk()) {
              ooo.ij.mf();
            }
            _0x576f4c._o();
          });
        }, 500);
      });
    })).prototype.Sa = function () {
      _0x16d4e9.parent.prototype.Sa.call(this);
    };
    _0x16d4e9.prototype.Wo = function () {
      _0x3f64b5.f.h(_0x56b227.Ho.Mo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.No, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Oo, 50);
      _0x3f64b5.f.g(_0x56b227.Ho.Po, 200);
      _0x3f64b5.f.h(_0x56b227.Ho.Qo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Ro, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.So, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.To, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Uo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Vo, 50);
    };
    _0x16d4e9.prototype.nl = function () {
      ooo.ij.jf();
    };
    _0x56b227.Ok = _0x16d4e9;
    _0x4852bb = $("#profile-avatar");
    _0x21e783 = $("#profile-username");
    _0x52032b = $("#profile-experience-bar");
    _0x2cc3da = $("#profile-experience-val");
    _0x227bdc = $("#profile-level");
    _0x41e9a8 = $("#profile-stat-highScore");
    _0x5243c8 = $("#profile-stat-bestSurvivalTime");
    _0x3d463a = $("#profile-stat-kills");
    _0x1b25be = $("#profile-stat-headshots");
    _0xd35a4b = $("#profile-stat-gamesPlayed");
    _0xf75723 = $("#profile-stat-totalTimeSpent");
    _0x378a6a = $("#profile-stat-registrationDate");
    (_0x5190ff = _0x4a5ec2.ca(_0x56b227.Ho, function () {
      _0x56b227.Ho.call(this, _0x4a5ec2.U("index.game.popup.menu.profile.tab"), true);
    })).prototype.Sa = function () {
      _0x5190ff.parent.prototype.Sa.call(this);
    };
    _0x5190ff.prototype.Wo = function () {
      _0x3f64b5.f.h(_0x56b227.Ho.Mo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.No, 50);
      _0x3f64b5.f.g(_0x56b227.Ho.Oo, 200);
      _0x3f64b5.f.h(_0x56b227.Ho.Po, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Qo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Ro, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.So, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.To, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Uo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Vo, 50);
    };
    _0x5190ff.prototype.nl = function () {
      ooo.ij.jf();
      var _0x3525a2 = ooo.ok.dm();
      var _0x1f9228 = moment([_0x3525a2.year, _0x3525a2.month - 1, _0x3525a2.day]).format("LL");
      _0x21e783.html(ooo.ok.Ll());
      _0x4852bb.attr("src", ooo.ok.Nl());
      _0x52032b.width(ooo.ok.Sl() * 100 / ooo.ok.Tl() + "%");
      _0x2cc3da.html(ooo.ok.Sl() + " / " + ooo.ok.Tl());
      _0x227bdc.html(ooo.ok.Rl());
      _0x41e9a8.html(ooo.ok.Zl());
      _0x5243c8.html(_0x4a5ec2.$(ooo.ok.$l()));
      _0x3d463a.html(ooo.ok._l());
      _0x1b25be.html(ooo.ok.am());
      _0xd35a4b.html(ooo.ok.bm());
      _0xf75723.html(_0x4a5ec2.$(ooo.ok.cm()));
      _0x378a6a.html(_0x1f9228);
    };
    _0x56b227.Mk = _0x5190ff;
    _0x5b8cf2 = $("#settings-music-enabled-switch");
    _0x24f8ab = $("#settings-sfx-enabled-switch");
    _0x1622cf = $("#settings-show-names-switch");
    _0x4356cc = $("#popup-logout");
    _0x291b3c = $("#popup-logout-container");
    _0x528516 = $("#popup-delete-account");
    _0x48df28 = $("#popup-delete-account-container");
    _0x340207 = $("#popup-withdraw-consent");
    (_0x2c4d0d = _0x4a5ec2.ca(_0x56b227.Ho, function () {
      _0x56b227.Ho.call(this, _0x4a5ec2.U("index.game.popup.menu.settings.tab"), false);
      var _0x2bce79 = this;
      _0x5b8cf2.click(function () {
        var _0x2105cd = !!_0x5b8cf2.prop("checked");
        _0x56b227.Cg.Ng(_0x56b227.Cg.Fg, _0x2105cd, 30);
        ooo.ij.$e(_0x2105cd);
        ooo.ij.if();
      });
      _0x24f8ab.click(function () {
        var _0xad87ad = !!_0x24f8ab.prop("checked");
        _0x56b227.Cg.Ng(_0x56b227.Cg.Gg, _0xad87ad, 30);
        ooo.ij.Xe(_0xad87ad);
        ooo.ij.if();
      });
      _0x1622cf.click(function () {
        ooo.ij.if();
      });
      _0x4356cc.click(function () {
        ooo.ij.if();
        _0x2bce79.Xo(500);
        ooo.ok.qm();
      });
      _0x528516.click(function () {
        if (ooo.ok.nk()) {
          ooo.ij.if();
          ooo.Xg.gl(ooo.Xg.Fk);
        } else {
          ooo.ij.nf();
        }
      });
      _0x340207.click(function () {
        if (ooo.kp()) {
          ooo.ij.if();
          ooo.Xg.gl(ooo.Xg.Dk);
        } else {
          ooo.ij.nf();
        }
      });
    })).prototype.Sa = function () {
      var _0x133848;
      var _0x444e9a;
      var _0x199747;
      _0x2c4d0d.parent.prototype.Sa.call(this);
      _0x133848 = _0x56b227.Cg.Og(_0x56b227.Cg.Fg) !== "false";
      _0x5b8cf2.prop("checked", _0x133848);
      ooo.ij.$e(_0x133848);
      _0x444e9a = _0x56b227.Cg.Og(_0x56b227.Cg.Gg) !== "false";
      _0x24f8ab.prop("checked", _0x444e9a);
      ooo.ij.Xe(_0x444e9a);
      _0x199747 = _0x56b227.Cg.Og(_0x56b227.Cg.Eg) !== "false";
      _0x1622cf.prop("checked", _0x199747);
      ooo.ok.em(function () {
        _0x291b3c.toggle(ooo.ok.nk());
        _0x48df28.toggle(ooo.ok.nk());
      });
    };
    _0x2c4d0d.prototype.Wo = function () {
      _0x3f64b5.f.h(_0x56b227.Ho.Mo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.No, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Oo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Po, 50);
      _0x3f64b5.f.g(_0x56b227.Ho.Qo, 200);
      _0x3f64b5.f.h(_0x56b227.Ho.Ro, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.So, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.To, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Uo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Vo, 50);
    };
    _0x2c4d0d.prototype.nl = function () {
      ooo.ij.jf();
      if (ooo.kp()) {
        _0x340207.show();
      } else {
        _0x340207.hide();
      }
    };
    _0x2c4d0d.prototype.Gi = function () {
      return _0x1622cf.prop("checked");
    };
    _0x56b227.Pk = _0x2c4d0d;
    _0x3ca7f8 = $("#store-view-canv");
    _0x2ccd9a = $("#skin-description-text");
    _0x436fd3 = $("#skin-group-description-text");
    _0x47dfbf = $("#store-locked-bar");
    _0x5912ef = $("#store-locked-bar-text");
    _0x3cf00 = $("#store-buy-button");
    _0xc36d69 = $("#store-item-price");
    _0x1ddcfc = $("#store-groups");
    _0xaeb566 = $("#store-view-prev");
    _0x5dc0c7 = $("#store-view-next");
    (_0xa4b654 = _0x4a5ec2.ca(_0x56b227.Ho, function () {
      _0x56b227.Ho.call(this, _0x4a5ec2.U("index.game.popup.menu.skins.tab"), true);
      var _0x56729d = this;
      this.lp = null;
      this.mp = [];
      this.np = {};
      this.op = new _0x56b227.Lm(_0x3ca7f8);
      _0x3cf00.click(function () {
        ooo.ij.if();
        _0x56729d.pp();
      });
      _0xaeb566.click(function () {
        ooo.ij.if();
        _0x56729d.lp.qp();
      });
      _0x5dc0c7.click(function () {
        ooo.ij.if();
        _0x56729d.lp.rp();
      });
    })).prototype.Sa = function () {
      _0xa4b654.parent.prototype.Sa.call(this);
      var _0xefd9e7 = this;
      ooo.ud.Jc(function () {
        var _0x1a322e = ooo.ud.Gc();
        _0xefd9e7.mp = [];
        for (var _0x4f6575 = 0; _0x4f6575 < _0x1a322e.skinGroupArrayDict.length; _0x4f6575++) {
          _0xefd9e7.mp.push(new _0x1e46f1(_0xefd9e7, _0x1a322e.skinGroupArrayDict[_0x4f6575]));
        }
        ;
        _0xefd9e7.np = {};
        for (var _0x150316 = 0; _0x150316 < _0x1a322e.skinArrayDict.length; _0x150316++) {
          var _0x3c071b = _0x1a322e.skinArrayDict[_0x150316];
          _0xefd9e7.np[_0x3c071b.id] = _0x3c071b;
        }
        ;
        _0xefd9e7.sp();
      });
      this.tp(false);
      ooo.so.fk(function () {
        _0xefd9e7.tp(false);
      });
    };
    _0xa4b654.prototype.Wo = function () {
      _0x3f64b5.f.h(_0x56b227.Ho.Mo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.No, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Oo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Po, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Qo, 50);
      _0x3f64b5.f.g(_0x56b227.Ho.Ro, 200);
      _0x3f64b5.f.h(_0x56b227.Ho.So, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.To, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Uo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Vo, 50);
    };
    _0xa4b654.prototype.nl = function () {
      ooo.ij.Ye(_0x56b227.Pe.Se.Jf);
      ooo.ij.jf();
      this.sp();
      this.op.rg(true);
    };
    _0xa4b654.prototype.hl = function () {
      this.op.rg(false);
    };
    _0xa4b654.prototype.qg = function () {
      this.op.qg();
    };
    _0xa4b654.prototype.ug = function (_0x3d615d, _0x343998) {
      this.op.ug();
    };
    _0xa4b654.prototype.sp = function () {
      var _0x209169 = this;
      var _0x29cb36 = this;
      _0x1ddcfc.empty();
      for (var _0x13fdc1 = 0; _0x13fdc1 < this.mp.length; _0x13fdc1++) {
        (function (_0x80c0f0) {
          var _0x3461c8 = _0x209169.mp[_0x80c0f0];
          var _0x5e8018 = _0x56b227.d.createElement("li");
          _0x1ddcfc.append(_0x5e8018);
          var _0x48e04c = $(_0x5e8018);
          if (_0x29cb36.xp && _0x29cb36.xp.isCustom) {
            _0x48e04c.addClass("iscustom");
          }
          _0x48e04c.html(_0x3461c8.up());
          _0x48e04c.click(function () {
            ooo.ij.if();
            _0x29cb36.vp(_0x3461c8);
          });
          _0x3461c8.wp = _0x48e04c;
        })(_0x13fdc1);
      }
      ;
      if (this.mp.length > 0) {
        var _0x1bb917 = ooo.so.Zj(_0x56b227._j.$j);
        for (var _0xe933c6 = 0; _0xe933c6 < this.mp.length; _0xe933c6++) {
          var _0x32b5f7 = this.mp[_0xe933c6];
          for (var _0x4b5d11 = _0x32b5f7.xp.list, _0x3c0749 = 0; _0x3c0749 < _0x4b5d11.length; _0x3c0749++) {
            if (_0x4b5d11[_0x3c0749] === _0x1bb917) {
              _0x32b5f7.yp = _0x3c0749;
              this.vp(_0x32b5f7);
              return;
            }
          }
        }
        ;
        this.vp(this.mp[0]);
      }
    };
    _0xa4b654.prototype.vp = function (_0x2c2a2d) {
      if (this.lp !== _0x2c2a2d) {
        this.lp = _0x2c2a2d;
        _0x1ddcfc.children().removeClass("pressed");
        if (this.lp.wp) {
          this.lp.wp.addClass("pressed");
        }
        _0x436fd3.html("");
        if (_0x2c2a2d.xp != null) {
          var _0x38a530 = ooo.ud.Gc().textDict[_0x2c2a2d.xp.description];
          if (_0x38a530 != null) {
            _0x436fd3.html(_0x4a5ec2.aa(_0x4a5ec2.V(_0x38a530)));
          }
        }
        ;
        this.tp(true);
      }
    };
    _0xa4b654.prototype.zp = function () {
      if (this.lp == null) {
        return _0x56b227.yj.Aj();
      } else {
        return this.lp.Ap();
      }
    };
    _0xa4b654.prototype.pp = function () {
      var _0x5872ef = this.zp();
      if (_0x5872ef.Cj()) {
        var _0x17dd82 = _0x5872ef.Mc();
        this.Bp(_0x17dd82);
      }
    };
    _0xa4b654.prototype.Bp = function (_0xee606f) {
      var _0x5d8f19 = ooo.so.mk(_0xee606f, _0x56b227._j.$j);
      if (_0x5d8f19 != null) {
        var _0xece116 = _0x5d8f19.pk();
        if (!(ooo.ok.Ql() < _0xece116)) {
          var _0x4f1151 = ooo.so.Zj(_0x56b227._j.$j);
          var _0x1a1432 = ooo.so.Zj(_0x56b227._j.ak);
          var _0x35f208 = ooo.so.Zj(_0x56b227._j.bk);
          var _0x37fd2c = ooo.so.Zj(_0x56b227._j.dk);
          var _0x6ffc19 = ooo.so.Zj(_0x56b227._j.ck);
          var _0x2128fa = this.Xo(5000);
          ooo.ok.nm(_0xee606f, _0x56b227._j.$j, function () {
            _0x2128fa._o();
            ooo.Xg.gl(ooo.Xg._k);
          }, function () {
            ooo.ok.hm(function () {
              ooo.so.lk(_0x4f1151, _0x56b227._j.$j);
              ooo.so.lk(_0x1a1432, _0x56b227._j.ak);
              ooo.so.lk(_0x35f208, _0x56b227._j.bk);
              ooo.so.lk(_0x37fd2c, _0x56b227._j.dk);
              ooo.so.lk(_0x6ffc19, _0x56b227._j.ck);
              ooo.so.lk(_0xee606f, _0x56b227._j.$j);
              _0x2128fa._o();
            });
          });
        }
      }
    };
    _0xa4b654.prototype.tp = function (_0x5ed8c8) {
      var _0x1b495b = ooo.so.ek();
      var _0x1fe669 = this.zp();
      if (_0x1fe669.Cj()) {
        var _0x5e739e = _0x1fe669.Mc();
        var _0x329fc9 = ooo.so.mk(_0x5e739e, _0x56b227._j.$j);
        var _0x3d3207 = false;
        $("#add-to-favorites-skin").remove();
        $("#manage-favorites-skin").remove();
        $("#skin-info-text").remove();
        $(".fav-buttons-container").remove();
        $(".favorites-popup").remove();
        if (ooo.so.ik(_0x5e739e, _0x56b227._j.$j)) {
          _0x47dfbf.hide();
          _0x3cf00.hide();
          var _0x4524c4 = $("<div class='fav-buttons-container' style='margin:10px;display:flex;gap:5px;position:fixed;left:140px;top:110px;z-index:1000;'></div>");
          var _0x1f6262 = $("<button id='add-to-favorites-skin' class='favorite-button' style='background:#4CAF50;color:white;border:none;padding:5px 10px;border-radius:3px;cursor:pointer;white-space:nowrap;box-shadow:0 2px 4px rgba(0,0,0,0.2);'><span style='font-size:14px;'>â˜…</span> Add</button>");
          var _0x2ae6ff = $("<button id='manage-favorites-skin' class='favorite-button' style='background:#2196F3;color:white;border:none;padding:5px 10px;border-radius:3px;cursor:pointer;white-space:nowrap;box-shadow:0 2px 4px rgba(0,0,0,0.2);'><span style='font-size:14px;'>â˜°</span> Favorite</button>");
          _0x4524c4.append(_0x1f6262);
          _0x4524c4.append(_0x2ae6ff);
          _0x1ddcfc.append(_0x4524c4);
          var _0x1346e9 = $("<div>").attr("id", "skin-info-text").css({
            position: "fixed",
            left: "150px",
            top: "160px",
            "font-size": "12px",
            color: "#fff",
            "z-index": "1000"
          }).text("Press '( 1 )' to toggle skins during gameplay").appendTo(_0x1ddcfc);
          var _0x259c30 = $("<div class='favorites-popup' style='display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#1e1e2f;border:1px solid #333345;border-radius:8px;padding:0;width:450px;max-height:400px;overflow:hidden;z-index:1000;box-shadow:0 4px 8px rgba(0,0,0,0.5);color:white;'><div style='padding:15px 20px;background-color:#252538;border-bottom:1px solid #333345;position:relative;display:flex;justify-content:space-between;align-items:center;'><button class='close-favorites' style='position:absolute;top:8px;left:10px;font-size:22px;background:none;border:none;color:#aaa;cursor:pointer;padding:0 5px;line-height:1;font-weight:bold;'>&times;</button><h3 style='margin:0 0 0 5px;font-size:18px;color:white;padding-left:15px;'>Favorite</h3><button class='clear-all-favorites' style='padding:4px 8px;background-color:#f44336;color:white;border:none;border-radius:4px;cursor:pointer;font-size:12px;'>Clear All</button></div><div class='favorites-content' style='padding:15px 20px;overflow-y:auto;max-height:330px;'><div class='favorites-grid' style='display:grid;grid-template-columns:1fr 1fr;gap:15px;padding:0;margin:0;'></div></div></div>");
          $("body").append(_0x259c30);
          $(".close-favorites").click(function () {
            $(".favorites-popup").hide();
          });
          $(document).mouseup(function (_0x3723cb) {
            var _0x5f5643 = $(".favorites-popup");
            if (!_0x5f5643.is(_0x3723cb.target) && _0x5f5643.has(_0x3723cb.target).length === 0) {
              _0x5f5643.hide();
            }
          });
          $.each($("[id^='skin-info-text']"), function () {
            if ($(this).attr("id") !== "skin-info-text") {
              $(this).remove();
            }
          });
          $(".favorites-content").on("scroll", function () {
            $(this).css("pointer-events", "auto");
          });
          $(".favorites-popup").on("shown", function () {
            setTimeout(function () {
              $(".favorites-content").scrollTop(0);
            }, 100);
          });
          $(".clear-all-favorites").click(function () {
            if (confirm("Are you sure you want to remove all favorite skins?")) {
              _0x40085c.favoriteSkins = [];
              localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
              _0x387c4b();
              if (_0x1f6262 && _0x1f6262.is(":visible")) {
                _0x1f6262.text("â˜… Add").css("background-color", "#4CAF50");
              }
            }
          });
          _0x1f6262.click(function () {
            var _0x29bed6 = _0x5e739e;
            if (!_0x40085c.favoriteSkins) {
              _0x40085c.favoriteSkins = [];
            }
            var _0x3e701a = false;
            try {
              for (var _0x684d6d = 0; _0x684d6d < _0x40085c.favoriteSkins.length; _0x684d6d++) {
                if (_0x40085c.favoriteSkins[_0x684d6d] === _0x29bed6) {
                  _0x3e701a = true;
                  break;
                }
              }
            } catch (_0x52cb8a) {
              _0x40085c.favoriteSkins = [];
            }
            if (!_0x3e701a) {
              _0x40085c.favoriteSkins.push(_0x29bed6);
              localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
              $(this).text("X").css("background-color", "#f44336");
            } else {
              var _0x14295f = _0x40085c.favoriteSkins.indexOf(_0x29bed6);
              _0x40085c.favoriteSkins.splice(_0x14295f, 1);
              localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
              $(this).text("â˜… Add").css("background-color", "#4CAF50");
            }
          });
          _0x2ae6ff.click(function () {
            $.each($("[id^='skin-info-text']"), function (_0x3b9e95) {
              if (_0x3b9e95 > 0) {
                $(this).remove();
              }
            });
            _0x387c4b();
            $(".favorites-popup").show();
          });
        } else if (_0x329fc9 == null || _0x329fc9.qk()) {
          _0x3d3207 = true;
          _0x47dfbf.show();
          _0x3cf00.hide();
          _0x5912ef.text(_0x4a5ec2.U("index.game.popup.menu.store.locked"));
          if (_0x329fc9 != null && _0x329fc9.qk()) {
            var _0x52d9a2 = ooo.ud.Gc().textDict[_0x329fc9.ln()];
            if (_0x52d9a2 != null) {
              _0x5912ef.text(_0x4a5ec2.V(_0x52d9a2));
            }
          }
        } else {
          _0x47dfbf.hide();
          _0x3cf00.show();
          _0xc36d69.html(_0x329fc9.pk());
        }
        _0x2ccd9a.html("");
        if (_0x329fc9 != null && _0x329fc9.mn() != null) {
          var _0x45cf44 = ooo.ud.Gc().textDict[_0x329fc9.mn()];
          if (_0x45cf44 != null) {
            _0x2ccd9a.html(_0x4a5ec2.aa(_0x4a5ec2.V(_0x45cf44)));
          }
        }
        if (StoreSkinID && _0x5e739e) {
          StoreSkinID.html(_0x5e739e);
        }
        this.op.Gm(_0x1b495b.Cn(_0x5e739e));
        this.op.an(_0x3d3207);
        if (_0x5ed8c8) {
          ooo.so.lk(_0x5e739e, _0x56b227._j.$j);
        }
      }
    };
    function _0x32e53c() {
      if (!_0x40085c.favoriteSkins) {
        _0x40085c.favoriteSkins = [];
        localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
      }
      if (_0x40085c.favoriteSkins.length > 0) {
        if (_0x40085c.currentFavSkinIndex === undefined) {
          _0x40085c.currentFavSkinIndex = 0;
        } else {
          _0x40085c.currentFavSkinIndex = (_0x40085c.currentFavSkinIndex + 1) % _0x40085c.favoriteSkins.length;
        }
        var _0x5307d7 = _0x40085c.favoriteSkins[_0x40085c.currentFavSkinIndex];
        _0x4d989b(_0x5307d7);
        localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
      }
    }
    function _0x4d989b(_0x5a55ec) {
      ooo.so.lk(_0x5a55ec, _0x56b227._j.$j);
      if (_0xafdd52 && _0xafdd52.n && _0xafdd52.n.Je) {
        var _0x32a63b = ooo.ud.Cc().Tb(_0x5a55ec);
        if (_0xafdd52.uj && _0x32a63b) {
          _0xafdd52.uj.hd(ooo.Mh.Qh.eh, ooo.ud.Cc().Ub(_0xafdd52.n.mi), _0x32a63b, ooo.ud.Cc().Vb(_0xafdd52.n.Vi), ooo.ud.Cc().Wb(_0xafdd52.n.Wi), ooo.ud.Cc().Xb(_0xafdd52.n.Xi), ooo.ud.Cc().Yb(_0xafdd52.n.Yi), "#ffffff");
        }
      }
    }
    function _0x15eb52(_0x2f94a7, _0x3b696d) {
      if (!_0x2f94a7) {
        return "";
      }
      if (_0x2f94a7.startsWith("data:")) {
        return _0x2f94a7;
      }
      if (_0x2f94a7.includes("get_skin.php")) {
        if (_0x2f94a7.startsWith("http")) {
          return _0x2f94a7.replace(/https?:\/\/[^\/]+/, "https://wormateserkanconnect.github.io/new2");
        } else {
          return "https://wormateserkanconnect.github.io/new2" + _0x2f94a7;
        }
      }
      if (_0x2f94a7.includes("/images/skins/")) {
        return "https://wormateserkanconnect.github.io/new2/" + _0x2f94a7;
      }
      if (_0x2f94a7.includes("/static/assets/")) {
        return "https://resources.wormate.io" + _0x2f94a7;
      }
      if (_0x2f94a7.includes("/images/skins/")) {
        return "https://wormateserkanconnect.github.io/new2" + _0x2f94a7;
      }
      if (!_0x2f94a7.startsWith("http")) {
        return "https://wormate.io" + _0x2f94a7;
      }
      return _0x2f94a7;
    }
    function _0x43c456(_0xa675c2) {
      if (!_0x40085c.favoriteSkins) {
        _0x40085c.favoriteSkins = [];
      }
      var _0x136f2a = false;
      for (var _0x2a84af = 0; _0x2a84af < _0x40085c.favoriteSkins.length; _0x2a84af++) {
        if (_0x40085c.favoriteSkins[_0x2a84af] === _0xa675c2) {
          _0x136f2a = true;
          break;
        }
      }
      if (!_0x136f2a) {
        _0x40085c.favoriteSkins.push(_0xa675c2);
        localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
      }
    }
    function _0x5f26a4() {
      if ($("#open-favorites-btn").length === 0) {
        var _0x3ccb5b = $("<button id='open-favorites-btn' class='favorites-button'>Ø¹Ø±Ø¶ Ø§Ù„Ø³ÙƒÙ†Ø§Øª Ø§Ù„Ù…ÙØ¶Ù„Ø©</button>");
        $("<style>#open-favorites-btn { position: absolute; top: 10px; right: 10px; background: #4CAF50; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; z-index: 1000; }#open-favorites-btn:hover { background: #45a049; }</style>").appendTo("head");
        _0x3ccb5b.click(function () {
          _0x387c4b();
          $(".favorites-popup").show();
        });
        if ($("#mm-skin-canv").length > 0) {
          $("#mm-skin-canv").parent().css("position", "relative");
          $("#mm-skin-canv").parent().append(_0x3ccb5b);
        }
      }
    }
    function _0x442b38(_0x44fe6f) {
      if (_0x40085c.favoriteSkins && _0x44fe6f >= 0 && _0x44fe6f < _0x40085c.favoriteSkins.length) {
        _0x40085c.favoriteSkins.splice(_0x44fe6f, 1);
        localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
        _0x387c4b();
      }
    }
    function _0x387c4b() {
      var _0x88764c = $(".favorites-grid");
      _0x88764c.empty();
      if (!_0x40085c.favoriteSkins) {
        _0x40085c.favoriteSkins = [];
        localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
      }
      try {
        if (_0x40085c.favoriteSkins.length > 0) {
          for (var _0x53bfe1 = 0; _0x53bfe1 < _0x40085c.favoriteSkins.length; _0x53bfe1++) {
            var _0x58b6d9 = _0x40085c.favoriteSkins[_0x53bfe1];
            var _0x286c50 = $("<div>").attr("data-index", _0x53bfe1).attr("data-skin-id", _0x58b6d9).css({
              display: "flex",
              "flex-direction": "column",
              "align-items": "center",
              padding: "2px",
              background: "#252538",
              "border-radius": "6px",
              position: "relative",
              height: "50px",
              width: "100%"
            });
            var _0x365bef = $("<div>").css({
              width: "100%",
              height: "46px",
              background: "transparent",
              "border-radius": "4px",
              overflow: "visible",
              position: "relative",
              display: "flex",
              "justify-content": "center",
              "align-items": "center"
            }).appendTo(_0x286c50);
            var _0x174911 = $("<button>").text("X").css({
              position: "absolute",
              top: "3px",
              right: "3px",
              background: "#f44336",
              color: "white",
              border: "none",
              padding: "1px 5px",
              "border-radius": "3px",
              cursor: "pointer",
              "font-size": "11px",
              "z-index": "20"
            }).appendTo(_0x286c50);
            var _0x2322b8 = _0x47b1d6(_0x58b6d9);
            _0x365bef.append(_0x2322b8);
            _0x88764c.append(_0x286c50);
            _0x174911.click(function () {
              var _0x149325 = $(this).closest("[data-index]");
              var _0x579c96 = parseInt(_0x149325.attr("data-index"));
              if (_0x40085c.favoriteSkins && _0x579c96 >= 0 && _0x579c96 < _0x40085c.favoriteSkins.length) {
                _0x40085c.favoriteSkins.splice(_0x579c96, 1);
                localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
                _0x149325.fadeOut(300, function () {
                  $(this).remove();
                  _0x88764c.find("[data-index]").each(function (_0x5adaaf) {
                    $(this).attr("data-index", _0x5adaaf);
                  });
                  if (_0x40085c.favoriteSkins.length === 0) {
                    _0x527131(_0x88764c);
                  }
                });
              }
            });
          }
        } else {
          _0x527131(_0x88764c);
        }
      } catch (_0x23b522) {
        _0x88764c.append("<div style='text-align:center;padding:10px;color:#ff6b6b;grid-column:1/span 2;'>Error loading favorites</div>");
      }
    }
    function _0x527131(_0x5ee96c) {
      _0x5ee96c.append("<div style='text-align:center;padding:10px;color:#aaa;margin:20px 0;grid-column:1/span 2;'>You don't have any favorite skins yet.</div>");
    }
    function _0x47b1d6(_0x4a1200) {
      if (!window.textureCache) {
        window.textureCache = {};
      }
      try {
        let _0x352ff2 = null;
        if (typeof ooo !== "undefined") {
          if (ooo.ud && ooo.ud.Gc) {
            _0x352ff2 = ooo.ud.Gc();
          } else if (ooo.ok && ooo.ok.xl && ooo.ok.xl.skinData) {
            _0x352ff2 = ooo.ok.xl.skinData;
          } else if (window.globalGameData) {
            _0x352ff2 = window.globalGameData;
          }
        }
        if (!_0x352ff2) {
          const _0x563e8b = localStorage.getItem("wupsw");
          if (_0x563e8b) {
            try {
              _0x352ff2 = JSON.parse(_0x563e8b);
            } catch (_0x5216ff) {}
          }
        }
        if (!_0x352ff2) {
          throw new Error("Game data not available");
        }
        let _0x533faa = null;
        if (_0x352ff2.skinArrayDict && Array.isArray(_0x352ff2.skinArrayDict)) {
          _0x533faa = _0x352ff2.skinArrayDict;
        } else if (_0x352ff2.skins && Array.isArray(_0x352ff2.skins)) {
          _0x533faa = _0x352ff2.skins;
        } else {
          throw new Error("Skin list not found in game data");
        }
        let _0x111e93 = null;
        for (let _0xa78078 = 0; _0xa78078 < _0x533faa.length; _0xa78078++) {
          if (_0x533faa[_0xa78078] && _0x533faa[_0xa78078].id === _0x4a1200) {
            _0x111e93 = _0x533faa[_0xa78078];
            break;
          }
        }
        if (!_0x111e93) {
          throw new Error("Skin not found");
        }
        const _0x21d49e = document.createElement("div");
        _0x21d49e.style.cssText = "\n            width: 100%;\n            height: 100%;\n            position: relative;\n            overflow: visible;\n        ";
        const _0x1a2dc1 = document.createElement("div");
        _0x1a2dc1.textContent = "#" + _0x4a1200;
        _0x1a2dc1.style.cssText = "\n            position: absolute;\n            top: 3px;\n            left: 2px;\n            background-color: rgba(0,0,0,0.6);\n            color: white;\n            font-size: 11px;\n            padding: 1px 4px;\n            border-radius: 3px;\n            z-index: 10;\n        ";
        _0x21d49e.appendChild(_0x1a2dc1);
        const _0x530ac9 = document.createElement("canvas");
        _0x530ac9.width = 600;
        _0x530ac9.height = 80;
        _0x530ac9.style.cssText = "\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            object-fit: contain;\n            padding: 5px;\n        ";
        _0x21d49e.appendChild(_0x530ac9);
        const _0x406fee = _0x530ac9.getContext("2d");
        _0x406fee.clearRect(0, 0, _0x530ac9.width, _0x530ac9.height);
        if (_0x111e93.base && Array.isArray(_0x111e93.base) && _0x111e93.base.length > 0) {
          let _0x344b6d = {};
          let _0x5c7b5a = [];
          _0x111e93.base.forEach(_0xa0a2c6 => {
            if (!_0xa0a2c6) {
              return;
            }
            if (_0x352ff2.regionDict && _0x352ff2.regionDict[_0xa0a2c6]) {
              const _0x2598e3 = _0x352ff2.regionDict[_0xa0a2c6];
              if (_0x352ff2.textureDict && _0x2598e3.texture && _0x352ff2.textureDict[_0x2598e3.texture]) {
                const _0x4405c2 = _0x352ff2.textureDict[_0x2598e3.texture];
                if (_0x4405c2 && (_0x4405c2.file || _0x4405c2.relativePath)) {
                  let _0x22dd32 = _0x15eb52(_0x4405c2.relativePath || _0x4405c2.file, _0x2598e3.texture);
                  if (!_0x344b6d[_0x22dd32]) {
                    _0x344b6d[_0x22dd32] = [];
                  }
                  _0x344b6d[_0x22dd32].push({
                    id: _0xa0a2c6,
                    region: _0x2598e3
                  });
                  _0x5c7b5a.push({
                    id: _0xa0a2c6,
                    region: _0x2598e3
                  });
                }
              }
            }
          });
          const _0x48fb47 = [..._0x5c7b5a].reverse();
          let _0x1e1ef1 = [..._0x48fb47];
          while (_0x1e1ef1.length < 27) {
            const _0x150f1d = 27 - _0x1e1ef1.length;
            const _0x1ebac8 = _0x48fb47.slice(0, Math.min(_0x150f1d, _0x48fb47.length));
            _0x1e1ef1 = [..._0x1e1ef1, ..._0x1ebac8];
          }
          const _0xad5a60 = 80;
          const _0x100e2f = _0xad5a60 / 2;
          const _0x4e7a81 = 0.2;
          const _0x1930e9 = _0xad5a60 * _0x4e7a81 * _0x1e1ef1.length + _0xad5a60 * 0.75;
          _0x530ac9.width = Math.max(600, _0x1930e9);
          _0x406fee.clearRect(0, 0, _0x530ac9.width, _0x530ac9.height);
          let _0x2e820e = 0;
          const _0x15f098 = Object.keys(_0x344b6d).length;
          function _0x47c4d8(_0x30bbb2) {
            _0x3916b3(_0x30bbb2);
          }
          function _0x3916b3(_0x406e26) {
            const _0xad9261 = _0x530ac9.height / 2;
            _0x1e1ef1.forEach((_0x41ecf6, _0x2e3c7a) => {
              if (!_0x41ecf6) {
                return;
              }
              const _0x25665c = _0x41ecf6.region;
              const _0x15412c = _0x100e2f + _0x2e3c7a * _0x100e2f * 2 * _0x4e7a81;
              _0x406fee.save();
              _0x406fee.beginPath();
              _0x406fee.arc(_0x15412c, _0xad9261, _0x100e2f, 0, Math.PI * 2);
              _0x406fee.clip();
              const _0x4adcaf = Math.max(_0x25665c.w, _0x25665c.h);
              const _0x53a4f2 = _0x100e2f * 2 / _0x4adcaf;
              const _0xb7adf = _0x15412c - _0x25665c.w * _0x53a4f2 / 2;
              const _0x2a8c89 = _0xad9261 - _0x25665c.h * _0x53a4f2 / 2;
              _0x406fee.drawImage(_0x406e26, _0x25665c.x, _0x25665c.y, _0x25665c.w, _0x25665c.h, _0xb7adf, _0x2a8c89, _0x25665c.w * _0x53a4f2, _0x25665c.h * _0x53a4f2);
              _0x406fee.restore();
            });
          }
          Object.keys(_0x344b6d).forEach(_0x196bd4 => {
            if (window.textureCache[_0x196bd4]) {
              _0x47c4d8(window.textureCache[_0x196bd4]);
              return;
            }
            const _0x393b49 = new Image();
            _0x393b49.onload = () => {
              window.textureCache[_0x196bd4] = _0x393b49;
              _0x47c4d8(_0x393b49);
              _0x2e820e++;
            };
            _0x393b49.onerror = () => {
              _0x2e820e++;
            };
            _0x393b49.src = _0x196bd4;
          });
          return _0x21d49e;
        }
      } catch (_0x32ab09) {
        const _0x1a0809 = document.createElement("div");
        _0x1a0809.style.cssText = "\n            width: 100%;\n            height: 100%;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            color: white;\n            background-color: #333;\n        ";
        _0x1a0809.textContent = "âš ï¸";
        return _0x1a0809;
      }
      const _0x3957bd = document.createElement("div");
      _0x3957bd.style.cssText = "\n        width: 100%;\n        height: 100%;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        color: white;\n        background-color: #333;\n    ";
      _0x3957bd.textContent = "ğŸ®";
      return _0x3957bd;
    }
    _0x1e46f1 = function () {
      function _0x1cefe5(_0x34c53b, _0x4c73ce) {
        this.Cp = _0x34c53b;
        this.yp = 0;
        this.xp = _0x4c73ce;
      }
      _0x1cefe5.prototype.qp = function () {
        if (--this.yp < 0) {
          this.yp = this.xp.list.length - 1;
        }
        this.Cp.tp(true);
      };
      _0x1cefe5.prototype.rp = function () {
        if (++this.yp >= this.xp.list.length) {
          this.yp = 0;
        }
        this.Cp.tp(true);
      };
      _0x1cefe5.prototype.up = function () {
        let _0xc00c8f = _0x4a5ec2.V(this.xp.name);
        if (this.xp.img) {
          if ((this.xp.img.search("data:image/png;base64,") == -1 || !(_0xc00c8f = "<img src=\"" + this.xp.img + "\" height=\"40\" />")) && (this.xp.img.search("https://lh3.googleusercontent.com") == -1 || !(_0xc00c8f = "<img src=\"" + this.xp.img + "\" height=\"40\" />"))) {
            _0xc00c8f = "<img src=\"" + _0x40085c.s_l + "/images/" + this.xp.img + "\" height=\"40\" />";
          }
        }
        return _0xc00c8f;
      };
      _0x1cefe5.prototype.Ap = function () {
        if (this.yp >= this.xp.list.length) {
          return _0x56b227.yj.Aj();
        } else {
          return _0x56b227.yj.Bj(this.xp.list[this.yp]);
        }
      };
      return _0x1cefe5;
    }();
    _0x56b227.Rk = _0xa4b654;
    _0x2adbb5 = $("#store-go-coins-button");
    _0x1baae2 = $("#store-go-skins-button");
    _0x3dd96b = $("#store-go-wear-button");
    (_0xada470 = _0x4a5ec2.ca(_0x56b227.Ho, function () {
      _0x56b227.Ho.call(this, _0x4a5ec2.U("index.game.popup.menu.store.tab"), true);
      _0x2adbb5.click(function () {
        ooo.ij.if();
        ooo.Xg.gl(ooo.Xg.Hk);
      });
      _0x1baae2.click(function () {
        ooo.ij.if();
        ooo.Xg.gl(ooo.Xg.Qk);
      });
      _0x3dd96b.click(function () {
        ooo.ij.if();
        ooo.Xg.gl(ooo.Xg.Uk);
      });
    })).prototype.Sa = function () {
      _0xada470.parent.prototype.Sa.call(this);
    };
    _0xada470.prototype.Wo = function () {
      _0x3f64b5.f.h(_0x56b227.Ho.Mo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.No, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Oo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Po, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Qo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Ro, 50);
      _0x3f64b5.f.g(_0x56b227.Ho.So, 200);
      _0x3f64b5.f.h(_0x56b227.Ho.To, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Uo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Vo, 50);
    };
    _0xada470.prototype.nl = function () {
      ooo.ij.jf();
    };
    _0x56b227.Tk = _0xada470;
    _0xd8006f = $("#wear-view-canv");
    _0x3c021b = $("#wear-description-text");
    _0x2aee75 = $("#wear-locked-bar");
    _0x28a8c2 = $("#wear-locked-bar-text");
    _0x58be73 = $("#wear-buy-button");
    _0x48aca7 = $("#wear-item-price");
    _0x14cb21 = $("#wear-eyes-button");
    _0xd3a2db = $("#wear-mouths-button");
    _0x1bbeb1 = $("#wear-glasses-button");
    _0x1978e7 = $("#wear-hats-button");
    _0x1b237c = $("#wear-tint-chooser");
    _0x16af68 = $("#wear-view-prev");
    _0x38c8cc = $("#wear-view-next");
    (_0x5d0302 = _0x4a5ec2.ca(_0x56b227.Ho, function () {
      var _0x3a7615 = this;
      _0x56b227.Ho.call(this, _0x4a5ec2.U("index.game.popup.menu.wear.tab"), true);
      var _0xe0e163 = this;
      this.Dp = [];
      this.ak = new _0x2d9153(this, _0x56b227._j.ak, _0x14cb21);
      this.bk = new _0x2d9153(this, _0x56b227._j.bk, _0xd3a2db);
      this.dk = new _0x2d9153(this, _0x56b227._j.dk, _0x1bbeb1);
      this.ck = new _0x2d9153(this, _0x56b227._j.ck, _0x1978e7);
      this.Ep = null;
      this.Fp = null;
      this.Gp = null;
      this.Hp = null;
      this.Ip = null;
      this.Jp = null;
      this.op = new _0x56b227.Lm(_0xd8006f);
      _0x58be73.click(function () {
        ooo.ij.if();
        _0xe0e163.Kp();
      });
      _0x16af68.click(function () {
        ooo.ij.if();
        _0xe0e163.Ep.Lp();
      });
      _0x38c8cc.click(function () {
        ooo.ij.if();
        _0xe0e163.Ep.Mp();
      });
      _0x14cb21.click(function () {
        ooo.ij.if();
        _0xe0e163.Np(_0x3a7615.ak);
      });
      _0xd3a2db.click(function () {
        ooo.ij.if();
        _0xe0e163.Np(_0x3a7615.bk);
      });
      _0x1bbeb1.click(function () {
        ooo.ij.if();
        _0xe0e163.Np(_0x3a7615.dk);
      });
      _0x1978e7.click(function () {
        ooo.ij.if();
        _0xe0e163.Np(_0x3a7615.ck);
      });
      this.Dp.push(this.ak);
      this.Dp.push(this.bk);
      this.Dp.push(this.dk);
      this.Dp.push(this.ck);
    })).prototype.Sa = function () {
      _0x5d0302.parent.prototype.Sa.call(this);
      var _0x2dfe38 = this;
      ooo.ud.Jc(function () {
        var _0x59a0a7 = ooo.ud.Gc();
        _0x2dfe38.Fp = _0x59a0a7.eyesDict;
        _0x2dfe38.Gp = _0x59a0a7.mouthDict;
        _0x2dfe38.Hp = _0x59a0a7.glassesDict;
        _0x2dfe38.Ip = _0x59a0a7.hatDict;
        _0x2dfe38.Jp = _0x59a0a7.colorDict;
        _0x2dfe38.ak.Op(_0x59a0a7.eyesVariantArray);
        _0x2dfe38.ak.Pp(_0x2dfe38.Fp);
        _0x2dfe38.bk.Op(_0x59a0a7.mouthVariantArray);
        _0x2dfe38.bk.Pp(_0x2dfe38.Gp);
        _0x2dfe38.dk.Op(_0x59a0a7.glassesVariantArray);
        _0x2dfe38.dk.Pp(_0x2dfe38.Hp);
        _0x2dfe38.ck.Op(_0x59a0a7.hatVariantArray);
        _0x2dfe38.ck.Pp(_0x2dfe38.Ip);
      });
      this.tp(false);
      ooo.so.fk(function () {
        _0x2dfe38.tp(false);
      });
    };
    _0x5d0302.prototype.Wo = function () {
      _0x3f64b5.f.h(_0x56b227.Ho.Mo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.No, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Oo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Po, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Qo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Ro, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.So, 50);
      _0x3f64b5.f.g(_0x56b227.Ho.To, 200);
      _0x3f64b5.f.h(_0x56b227.Ho.Uo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Vo, 50);
    };
    _0x5d0302.prototype.nl = function () {
      ooo.ij.Ye(_0x56b227.Pe.Se.Jf);
      ooo.ij.jf();
      this.Np(this.Ep ?? this.ak);
      this.op.rg(true);
    };
    _0x5d0302.prototype.hl = function () {
      this.op.rg(false);
    };
    _0x5d0302.prototype.qg = function () {
      this.op.qg();
    };
    _0x5d0302.prototype.ug = function (_0x5240f8, _0x5a3db5) {
      this.op.ug();
    };
    _0x5d0302.prototype.Np = function (_0x3ffa70) {
      this.Ep = _0x3ffa70;
      for (var _0x500f98 = 0; _0x500f98 < this.Dp.length; _0x500f98++) {
        this.Dp[_0x500f98].ep.removeClass("pressed");
      }
      ;
      this.Ep.ep.addClass("pressed");
      this.Ep.ml();
    };
    _0x5d0302.prototype.Qp = function () {
      if (this.Ep == null) {
        return _0x56b227.yj.Aj();
      } else {
        return _0x56b227.yj.Bj({
          Je: this.Ep.Ap(),
          Wd: this.Ep.Wd
        });
      }
    };
    _0x5d0302.prototype.Kp = function () {
      var _0x817125 = this.Qp();
      if (_0x817125.Cj()) {
        var _0x24d345 = _0x817125.Mc();
        this.Rp(_0x24d345.Je, _0x24d345.Wd);
      }
    };
    _0x5d0302.prototype.Rp = function (_0x5b85eb, _0x155f30) {
      var _0x1ff052 = ooo.so.mk(_0x5b85eb, _0x155f30);
      if (_0x1ff052 != null) {
        var _0x3f99e6 = _0x1ff052.pk();
        if (!(ooo.ok.Ql() < _0x3f99e6)) {
          var _0x4c0886 = ooo.so.Zj(_0x56b227._j.$j);
          var _0x53bd58 = ooo.so.Zj(_0x56b227._j.ak);
          var _0x418101 = ooo.so.Zj(_0x56b227._j.bk);
          var _0x73e09d = ooo.so.Zj(_0x56b227._j.dk);
          var _0x27108f = ooo.so.Zj(_0x56b227._j.ck);
          var _0x9275bb = this.Xo(5000);
          ooo.ok.nm(_0x5b85eb, _0x155f30, function () {
            _0x9275bb._o();
            ooo.Xg.gl(ooo.Xg._k);
          }, function () {
            ooo.ok.hm(function () {
              ooo.so.lk(_0x4c0886, _0x56b227._j.$j);
              ooo.so.lk(_0x53bd58, _0x56b227._j.ak);
              ooo.so.lk(_0x418101, _0x56b227._j.bk);
              ooo.so.lk(_0x73e09d, _0x56b227._j.dk);
              ooo.so.lk(_0x27108f, _0x56b227._j.ck);
              ooo.so.lk(_0x5b85eb, _0x155f30);
              _0x9275bb._o();
            });
          });
        }
      }
    };
    window.globalHatTextureCache = window.globalHatTextureCache || {};
    _0x5d0302.prototype.tp = function (_0x3764ba) {
      var _0x5a15d0 = ooo.so.ek();
      var _0x2f6996 = this.Qp();
      if (_0x2f6996.Cj()) {
        var _0x2b9884 = _0x2f6996.Mc();
        var _0x5a6fb4 = ooo.so.mk(_0x2b9884.Je, _0x2b9884.Wd);
        var _0x344f48 = false;
        if (!_0x2b9884.selectedHats) {
          _0x2b9884.selectedHats = [];
        }
        if (ooo.so.ik(_0x2b9884.Je, _0x2b9884.Wd)) {
          _0x2aee75.hide();
          _0x58be73.hide();
          if (_0x2b9884.Wd === "HAT") {
            this.addSelectedHatButton(_0x2b9884.Je);
          } else {
            this.removeHatButtons();
          }
        } else if (_0x5a6fb4 == null || _0x5a6fb4.qk()) {
          _0x344f48 = true;
          _0x2aee75.show();
          _0x58be73.hide();
          _0x28a8c2.text(_0x4a5ec2.U("index.game.popup.menu.store.locked"));
          if (_0x5a6fb4 != null && _0x5a6fb4.qk()) {
            var _0x538ecd = ooo.ud.Gc().textDict[_0x5a6fb4.ln()];
            if (_0x538ecd != null) {
              _0x28a8c2.text(_0x4a5ec2.V(_0x538ecd));
            }
          }
          this.removeHatButtons();
        } else {
          _0x2aee75.hide();
          _0x58be73.show();
          _0x48aca7.html(_0x5a6fb4.pk());
          this.removeHatButtons();
        }
        _0x3c021b.html("");
        if (_0x5a6fb4 != null && _0x5a6fb4.mn() != null) {
          var _0x21e524 = ooo.ud.Gc().textDict[_0x5a6fb4.mn()];
          if (_0x21e524 != null) {
            _0x3c021b.html(_0x4a5ec2.aa(_0x4a5ec2.V(_0x21e524)));
          }
        }
        var _0x2db01d = this.op;
        switch (_0x2b9884.Wd) {
          case "EYES":
            _0x2db01d.Gm(_0x5a15d0.Dn(_0x2b9884.Je));
            _0x2db01d.bn(_0x344f48);
            break;
          case "MOUTH":
            _0x2db01d.Gm(_0x5a15d0.En(_0x2b9884.Je));
            _0x2db01d.cn(_0x344f48);
            break;
          case "GLASSES":
            _0x2db01d.Gm(_0x5a15d0.Gn(_0x2b9884.Je));
            _0x2db01d.en(_0x344f48);
            break;
          case "HAT":
            _0x2db01d.Gm(_0x5a15d0.Fn(_0x2b9884.Je));
            _0x2db01d.dn(_0x344f48);
            break;
        }
        if (_0x3764ba) {
          ooo.so.lk(_0x2b9884.Je, _0x2b9884.Wd);
        }
      }
    };
    _0x5d0302.prototype.addSelectedHatButton = function (_0x21cff1) {
      this.currentHatId = _0x21cff1;
      if (!this.hatButtonContainer) {
        this.hatButtonContainer = $("<div>").attr("id", "hat-button-container").css({
          position: "absolute",
          bottom: "30px",
          left: "-10px",
          display: "flex",
          gap: "5px"
        }).appendTo("#wear-view");
        this.hatToggleButton = $("<button>").attr("id", "hat-toggle-button").css({
          padding: "5px 10px",
          "background-color": "#4CAF50",
          color: "white",
          border: "none",
          "border-radius": "4px",
          cursor: "pointer",
          "min-width": "32px"
        }).appendTo(this.hatButtonContainer);
        this.hatFavoritesButton = $("<button>").attr("id", "hat-favorites-button").css({
          padding: "5px 10px",
          "background-color": "#2196F3",
          color: "white",
          border: "none",
          "border-radius": "4px",
          cursor: "pointer"
        }).text("â˜° Favorites").appendTo(this.hatButtonContainer);
        this.hatInfoText = $("<div>").attr("id", "hat-info-text").css({
          position: "absolute",
          bottom: "10px",
          left: "-5px",
          "font-size": "12px",
          color: "#fff"
        }).text("Press '( 2 )' to toggle hats during gameplay").appendTo("#wear-view");
        var _0x311e02 = this;
        this.hatFavoritesButton.on("click", function () {
          _0x311e02.showFavoritesDialog();
        });
      }
      let _0x1d00b3 = _0x40085c.selectedHats.includes(_0x21cff1);
      this.hatToggleButton.text(_0x1d00b3 ? "X" : "â˜… Add");
      this.hatToggleButton.css("background-color", _0x1d00b3 ? "#f44336" : "#4CAF50");
      this.hatToggleButton.off("click");
      var _0x311e02 = this;
      this.hatToggleButton.on("click", function () {
        let _0x60dfc7 = _0x40085c.selectedHats.indexOf(_0x21cff1);
        if (_0x60dfc7 >= 0) {
          _0x40085c.selectedHats.splice(_0x60dfc7, 1);
          $(this).text("Add").css("background-color", "#4CAF50");
        } else {
          _0x40085c.selectedHats.push(_0x21cff1);
          $(this).text("X").css("background-color", "#f44336");
        }
        localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
      });
      this.hatButtonContainer.show();
      this.hatInfoText.show();
    };
    _0x5d0302.prototype.removeHatButtons = function () {
      if (this.hatButtonContainer) {
        this.hatButtonContainer.hide();
      }
      if (this.hatInfoText) {
        this.hatInfoText.hide();
      }
    };
    function _0x97f232(_0x287201) {
      try {
        if (window.globalHatTextureCache[_0x287201] && window.globalHatTextureCache[_0x287201].valid) {
          return window.globalHatTextureCache[_0x287201];
        }
        const _0x3d933d = ooo.ud.Cc().Yb(_0x287201);
        if (!_0x3d933d || !_0x3d933d.dc || !_0x3d933d.dc.length) {
          return null;
        }
        const _0x1290ac = _0x3d933d.dc[0];
        let _0xb60b4a = null;
        if (_0x1290ac._a !== undefined) {
          _0xb60b4a = {
            x: _0x1290ac._a || 0,
            y: _0x1290ac.ab || 0,
            width: _0x1290ac.bb || 0,
            height: _0x1290ac.cb || 0
          };
        } else if (_0x1290ac._frame) {
          _0xb60b4a = {
            x: _0x1290ac._frame.x || 0,
            y: _0x1290ac._frame.y || 0,
            width: _0x1290ac._frame.width || 0,
            height: _0x1290ac._frame.height || 0
          };
        } else if (_0x1290ac.orig) {
          _0xb60b4a = {
            x: _0x1290ac.orig.x || 0,
            y: _0x1290ac.orig.y || 0,
            width: _0x1290ac.orig.width || 0,
            height: _0x1290ac.orig.height || 0
          };
        } else if (_0x1290ac.va && _0x1290ac.va.length >= 4) {
          _0xb60b4a = {
            x: _0x1290ac.va[0] || 0,
            y: _0x1290ac.va[1] || 0,
            width: _0x1290ac.va[2] || 0,
            height: _0x1290ac.va[3] || 0
          };
        }
        let _0x21ef98 = null;
        if (_0x1290ac.Za && _0x1290ac.Za.baseTexture && _0x1290ac.Za.baseTexture.resource && _0x1290ac.Za.baseTexture.resource.source) {
          _0x21ef98 = _0x1290ac.Za.baseTexture.resource.source;
        } else if (_0x1290ac.baseTexture && _0x1290ac.baseTexture.resource && _0x1290ac.baseTexture.resource.source) {
          _0x21ef98 = _0x1290ac.baseTexture.resource.source;
        } else if (_0x1290ac.baseTexture && _0x1290ac.baseTexture.resource && _0x1290ac.baseTexture.resource.data) {
          _0x21ef98 = _0x1290ac.baseTexture.resource.data;
        } else if (_0x1290ac.baseTexture && _0x1290ac.baseTexture.source) {
          _0x21ef98 = _0x1290ac.baseTexture.source;
        }
        const _0x1503df = {
          hatId: _0x287201,
          image: _0x21ef98 || null,
          coords: _0xb60b4a || null,
          textureData: _0x1290ac,
          hatData: _0x3d933d,
          valid: _0x21ef98 && _0xb60b4a ? true : false
        };
        window.globalHatTextureCache[_0x287201] = _0x1503df;
        return _0x1503df;
      } catch (_0x3aba9f) {
        return null;
      }
    }
    function _0x322023(_0x1a5e34) {
      try {
        const _0xa72afe = document.createElement("div");
        _0xa72afe.style.cssText = "\n            width: 100%;\n            height: 100%;\n            position: relative;\n            overflow: visible;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n        ";
        const _0xa2a4f3 = document.createElement("div");
        _0xa2a4f3.textContent = "#" + _0x1a5e34;
        _0xa2a4f3.style.cssText = "\n            position: absolute;\n            top: 4px;\n            left: 4px;\n            background-color: rgba(0,0,0,0.6);\n            color: white;\n            font-size: 12px;\n            padding: 2px 5px;\n            border-radius: 3px;\n            z-index: 10;\n        ";
        _0xa72afe.appendChild(_0xa2a4f3);
        const _0x7b32c4 = document.createElement("canvas");
        _0x7b32c4.width = 80;
        _0x7b32c4.height = 80;
        _0x7b32c4.style.cssText = "\n            display: block;\n            object-fit: contain;\n        ";
        _0xa72afe.appendChild(_0x7b32c4);
        const _0x52a2ae = _0x7b32c4.getContext("2d", {
          willReadFrequently: true
        });
        _0x52a2ae.clearRect(0, 0, _0x7b32c4.width, _0x7b32c4.height);
        const _0x2fb93e = _0x97f232(_0x1a5e34);
        if (!_0x2fb93e || !_0x2fb93e.image || !_0x2fb93e.coords) {
          _0x52a2ae.fillStyle = "#333";
          _0x52a2ae.fillRect(0, 0, _0x7b32c4.width, _0x7b32c4.height);
          _0x52a2ae.fillStyle = "white";
          _0x52a2ae.font = "18px Arial";
          _0x52a2ae.textAlign = "center";
          _0x52a2ae.fillText("#" + _0x1a5e34, _0x7b32c4.width / 2, _0x7b32c4.height / 2);
          return _0xa72afe;
        }
        try {
          if (_0x2fb93e.coords) {
            _0x52a2ae.save();
            const _0x407a7c = Math.min((_0x7b32c4.width - 10) / _0x2fb93e.coords.width, (_0x7b32c4.height - 10) / _0x2fb93e.coords.height) * 0.9;
            const _0x1eeb6c = _0x2fb93e.coords.width * _0x407a7c;
            const _0xa7079a = _0x2fb93e.coords.height * _0x407a7c;
            const _0x101bb5 = (_0x7b32c4.width - _0x1eeb6c) / 2;
            const _0x43940c = (_0x7b32c4.height - _0xa7079a) / 2;
            _0x52a2ae.drawImage(_0x2fb93e.image, _0x2fb93e.coords.x, _0x2fb93e.coords.y, _0x2fb93e.coords.width, _0x2fb93e.coords.height, _0x101bb5, _0x43940c, _0x1eeb6c, _0xa7079a);
            _0x52a2ae.restore();
          } else {
            const _0x5b95d4 = Math.min((_0x7b32c4.width - 10) / _0x2fb93e.image.width, (_0x7b32c4.height - 10) / _0x2fb93e.image.height) * 0.8;
            const _0x133f50 = _0x2fb93e.image.width * _0x5b95d4;
            const _0x4adc9a = _0x2fb93e.image.height * _0x5b95d4;
            const _0x30de00 = (_0x7b32c4.width - _0x133f50) / 2;
            const _0x2fcf85 = (_0x7b32c4.height - _0x4adc9a) / 2;
            _0x52a2ae.drawImage(_0x2fb93e.image, _0x30de00, _0x2fcf85, _0x133f50, _0x4adc9a);
          }
        } catch (_0x4313c5) {
          _0x52a2ae.fillStyle = "#333";
          _0x52a2ae.fillRect(0, 0, _0x7b32c4.width, _0x7b32c4.height);
          _0x52a2ae.fillStyle = "white";
          _0x52a2ae.font = "18px Arial";
          _0x52a2ae.textAlign = "center";
          _0x52a2ae.fillText("#" + _0x1a5e34, _0x7b32c4.width / 2, _0x7b32c4.height / 2);
        }
        return _0xa72afe;
      } catch (_0xdcc2a3) {
        const _0xeffff7 = document.createElement("div");
        _0xeffff7.style.cssText = "\n            width: 100%;\n            height: 100%;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            color: white;\n            background-color: #333;\n        ";
        _0xeffff7.textContent = "#" + _0x1a5e34;
        return _0xeffff7;
      }
    }
    _0x5d0302.prototype.showFavoritesDialog = function () {
      $("#favorites-dialog, #favorites-overlay").remove();
      var _0x5eb3a5 = $("<div>").attr("id", "favorites-overlay").css({
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        "background-color": "rgba(0, 0, 0, 0.5)",
        "z-index": "999"
      }).appendTo("body");
      var _0x348fc3 = $("<div>").attr("id", "favorites-dialog").css({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        "background-color": "#1e1e2f",
        "border-radius": "8px",
        "box-shadow": "0 4px 8px rgba(0, 0, 0, 0.5)",
        "z-index": "1000",
        width: "500px",
        overflow: "hidden",
        color: "white"
      }).appendTo("body");
      var _0x5262df = $("<div>").css({
        padding: "15px 20px",
        "background-color": "#252538",
        "border-bottom": "1px solid #333345",
        position: "relative",
        display: "flex",
        "justify-content": "space-between",
        "align-items": "center"
      }).appendTo(_0x348fc3);
      $("<h3>").text("Favorite Hats").css({
        margin: "0 0 0 5px",
        "font-size": "18px",
        color: "white",
        "padding-left": "15px"
      }).appendTo(_0x5262df);
      var _0x1d8a15 = $("<button>").html("&times;").css({
        position: "absolute",
        top: "8px",
        left: "10px",
        "font-size": "22px",
        background: "none",
        border: "none",
        color: "#aaa",
        cursor: "pointer",
        padding: "0 5px",
        "line-height": "1",
        "font-weight": "bold"
      }).appendTo(_0x5262df);
      var _0x104d85 = $("<button>").text("Clear All").css({
        padding: "4px 8px",
        "background-color": "#f44336",
        color: "white",
        border: "none",
        "border-radius": "4px",
        cursor: "pointer",
        "font-size": "12px"
      }).appendTo(_0x5262df);
      var _0x26730d = $("<div>").attr("id", "favorites-content").css({
        padding: "15px 20px",
        "max-height": "420px",
        "overflow-y": "auto"
      }).appendTo(_0x348fc3);
      var _0x598ca2 = $("<div>").attr("class", "favorites-grid").css({
        display: "grid",
        "grid-template-columns": "1fr 1fr 1fr",
        gap: "12px",
        padding: "0",
        margin: "0"
      }).appendTo(_0x26730d);
      var _0x3d2f7a = this;
      _0x104d85.on("click", function () {
        if (confirm("Are you sure you want to remove all favorite hats?")) {
          _0x40085c.selectedHats = [];
          localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          _0x598ca2.empty();
          $("<div>").css({
            "text-align": "center",
            padding: "10px",
            color: "#aaa",
            margin: "20px 0",
            "grid-column": "1 / span 3"
          }).text("You don't have any favorite hats yet.").appendTo(_0x598ca2);
          if (_0x3d2f7a.hatToggleButton && _0x3d2f7a.hatToggleButton.is(":visible")) {
            _0x3d2f7a.hatToggleButton.text("â˜… Add").css("background-color", "#4CAF50");
          }
        }
      });
      function _0x5b89c8() {
        _0x348fc3.remove();
        _0x5eb3a5.remove();
      }
      _0x1d8a15.on("click", _0x5b89c8);
      _0x5eb3a5.on("click", _0x5b89c8);
      if (!_0x40085c.selectedHats || _0x40085c.selectedHats.length === 0) {
        $("<div>").css({
          "text-align": "center",
          padding: "10px",
          color: "#aaa",
          margin: "20px 0",
          "grid-column": "1 / span 2"
        }).text("You don't have any favorite hats yet.").appendTo(_0x598ca2);
      } else {
        _0x40085c.selectedHats.forEach(function (_0x56b2fc) {
          _0x97f232(_0x56b2fc);
        });
        _0x40085c.selectedHats.forEach(function (_0x196c2b, _0x289d4b) {
          var _0x39b0be = $("<div>").attr("data-index", _0x289d4b).attr("data-hat-id", _0x196c2b).css({
            display: "flex",
            "flex-direction": "column",
            "align-items": "center",
            padding: "2px",
            background: "#252538",
            "border-radius": "6px",
            position: "relative",
            height: "87px",
            width: "100%"
          }).appendTo(_0x598ca2);
          var _0xcfa024 = $("<div>").css({
            width: "100%",
            height: "82px",
            background: "transparent",
            "border-radius": "4px",
            overflow: "visible",
            position: "relative",
            display: "flex",
            "justify-content": "center",
            "align-items": "center"
          }).appendTo(_0x39b0be);
          var _0x1cbbb7 = $("<button>").text("X").css({
            position: "absolute",
            top: "4px",
            right: "4px",
            background: "#f44336",
            color: "white",
            border: "none",
            padding: "2px 6px",
            "border-radius": "3px",
            cursor: "pointer",
            "font-size": "12px",
            "z-index": "20"
          }).appendTo(_0x39b0be);
          var _0x2b8777 = _0x322023(_0x196c2b);
          _0xcfa024.append(_0x2b8777);
          _0x1cbbb7.on("click", function (_0x33846c) {
            _0x33846c.stopPropagation();
            var _0x53d8a2 = $(this).closest("[data-index]");
            var _0xe811c = parseInt(_0x53d8a2.attr("data-index"));
            var _0x3fc5db = _0x53d8a2.attr("data-hat-id");
            if (_0x40085c.selectedHats && _0xe811c >= 0 && _0xe811c < _0x40085c.selectedHats.length) {
              _0x40085c.selectedHats.splice(_0xe811c, 1);
              localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
              _0x53d8a2.fadeOut(300, function () {
                $(this).remove();
                _0x598ca2.find("[data-index]").each(function (_0x3e32b4) {
                  $(this).attr("data-index", _0x3e32b4);
                });
                if (_0x40085c.selectedHats.length === 0) {
                  _0x598ca2.empty();
                  $("<div>").css({
                    "text-align": "center",
                    padding: "10px",
                    color: "#aaa",
                    margin: "20px 0",
                    "grid-column": "1 / span 3"
                  }).text("You don't have any favorite hats yet.").appendTo(_0x598ca2);
                }
                if (_0x3d2f7a.currentHatId === _0x3fc5db && _0x3d2f7a.hatToggleButton) {
                  _0x3d2f7a.hatToggleButton.text("â˜… Add").css("background-color", "#4CAF50");
                }
              });
            }
          });
        });
      }
      $(".favorites-content").on("scroll", function () {
        $(this).css("pointer-events", "auto");
      });
      $(".favorites-popup").on("shown", function () {
        setTimeout(function () {
          $(".favorites-content").scrollTop(0);
        }, 100);
      });
    };
    function _0x5694d3(_0x261a49) {
      try {
        if (ooo && ooo.Mh && ooo.Mh.Lh && ooo.Mh.Lh.ki) {
          const _0x196b82 = ooo.Mh.Lh.ki.Yi;
          ooo.Mh.Lh.ki.Yi = _0x261a49;
          if (ooo.Mh.Qh && ooo.Mh.Qh.fh && ooo.Mh.li && ooo.Mh.li[ooo.Mh.Qh.fh] && ooo.Mh.li[ooo.Mh.Qh.fh].ki) {
            ooo.Mh.li[ooo.Mh.Qh.fh].ki.Yi = _0x261a49;
          }
          if (_0xafdd52 && _0xafdd52.uj && _0xafdd52.n) {
            const _0x86d138 = _0x419581(_0xafdd52.uj);
            if (_0x86d138) {
              _0x5dccfa(_0x86d138, _0x261a49);
              return true;
            } else {
              const _0x53f8da = ooo.ud.Cc().Yb(_0x261a49);
              if (_0x53f8da) {
                _0x353828(_0xafdd52.uj, _0x53f8da);
                return true;
              }
            }
          }
          return true;
        }
      } catch (_0x46dcfd) {}
      return false;
    }
    function _0x419581(_0x2421f4) {
      if (_0x2421f4.Zc && _0x2421f4.Zc.rd) {
        return _0x2421f4.Zc.rd;
      }
      return null;
    }
    function _0x5dccfa(_0xd0d7bc, _0x5c3444) {
      if (_0xd0d7bc && _0xd0d7bc.length > 0) {
        const _0x1ea6c4 = ooo.ud.Cc().Yb(_0x5c3444);
        if (_0x1ea6c4 && _0x1ea6c4.dc && _0x1ea6c4.dc.length > 0) {
          try {
            _0xd0d7bc[0].kd(_0x1ea6c4.dc[0]);
            return true;
          } catch (_0x1b365c) {}
        }
      }
      return false;
    }
    function _0x353828(_0x2a5362, _0x2b1940) {
      if (_0x2a5362 && _0x2a5362.Zc && _0x2b1940) {
        try {
          _0x2a5362.Zc.yd(0.004, _0x2a5362.Zc.rd, _0x2b1940);
          return true;
        } catch (_0x38d663) {}
      }
      return false;
    }
    function _0x1a9db9() {
      if (!_0x40085c.selectedHats) {
        _0x40085c.selectedHats = [];
        localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
        return;
      }
      if (_0x40085c.selectedHats.length > 0) {
        if (_0x40085c.currentHatIndex === undefined) {
          _0x40085c.currentHatIndex = 0;
        } else {
          _0x40085c.currentHatIndex = (_0x40085c.currentHatIndex + 1) % _0x40085c.selectedHats.length;
        }
        let _0x4ee1ac = _0x40085c.selectedHats[_0x40085c.currentHatIndex];
        const _0x10b9ed = _0x5694d3(_0x4ee1ac);
        localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
      }
    }
    function _0x51f5d4() {
      if (window.hatCyclingInitialized) {
        return;
      }
      $(document).on("keydown", function (_0x183145) {
        if (_0x183145.keyCode === 50 || _0x183145.which === 50) {
          _0x1a9db9();
        }
      });
      window.hatCyclingInitialized = true;
    }
    function _0x4578a8() {
      if (!_0x40085c.selectedHats || _0x40085c.selectedHats.length === 0) {
        return;
      }
      _0x40085c.selectedHats.forEach(function (_0x58fb4d) {
        _0x97f232(_0x58fb4d);
      });
    }
    $(document).ready(function () {
      setTimeout(function () {
        _0x51f5d4();
        _0x4578a8();
        window.openHatFavorites = function () {
          if (_0x5d0302.prototype.showFavoritesDialog) {
            var _0xa44dd = new _0x5d0302();
            _0xa44dd.showFavoritesDialog();
          }
        };
        window.hatHelp = function () {};
      }, 1000);
    });
    function _0x4fbee7() {
      try {
        const _0x239a75 = [];
        const _0x1338d5 = ooo.ud.Cc();
        if (!_0x1338d5) {
          return _0x239a75;
        }
        for (let _0x463929 in _0x1338d5.Vb) {
          if (_0x1338d5.Vb.hasOwnProperty(_0x463929)) {
            _0x239a75.push(_0x463929);
          }
        }
        return _0x239a75;
      } catch (_0x5b670a) {
        return [];
      }
    }
    function _0x11f6f7() {}
    window.addEventListener("load", function () {
      setTimeout(function () {
        _0x4578a8();
        _0x11f6f7();
      }, 2000);
    });
    _0x2d9153 = function () {
      function _0x4cba26(_0x36e052, _0x2cefbe, _0x5480eb) {
        this.Cp = _0x36e052;
        this.Wd = _0x2cefbe;
        this.ep = _0x5480eb;
        this.Lc = {};
        this.Sp = [[]];
        this.Tp = -10;
        this.Up = -10;
      }
      _0x4cba26.prototype.Op = function (_0x4fc9e3) {
        this.Sp = _0x4fc9e3;
      };
      _0x4cba26.prototype.Pp = function (_0xafe689) {
        this.Lc = _0xafe689;
      };
      _0x4cba26.prototype.ml = function () {
        var _0x2ad1b3 = ooo.so.Zj(this.Wd);
        for (var _0x280e86 = 0; _0x280e86 < this.Sp.length; _0x280e86++) {
          for (var _0x581c0f = 0; _0x581c0f < this.Sp[_0x280e86].length; _0x581c0f++) {
            if (this.Sp[_0x280e86][_0x581c0f] === _0x2ad1b3) {
              this.Vp(_0x280e86);
              this.Wp(_0x581c0f);
              return;
            }
          }
        }
        ;
        this.Vp(0);
        this.Wp(0);
      };
      _0x4cba26.prototype.Lp = function () {
        var _0x4b44aa = this.Tp - 1;
        if (_0x4b44aa < 0) {
          _0x4b44aa = this.Sp.length - 1;
        }
        this.Vp(_0x4b44aa);
        this.Wp(this.Up % this.Sp[_0x4b44aa].length);
      };
      _0x4cba26.prototype.Mp = function () {
        var _0x271c06 = this.Tp + 1;
        if (_0x271c06 >= this.Sp.length) {
          _0x271c06 = 0;
        }
        this.Vp(_0x271c06);
        this.Wp(this.Up % this.Sp[_0x271c06].length);
      };
      _0x4cba26.prototype.Vp = function (_0x5e838a) {
        var _0x3c867e = this;
        if (!(_0x5e838a < 0) && !(_0x5e838a >= this.Sp.length)) {
          this.Tp = _0x5e838a;
          _0x1b237c.empty();
          var _0x3acceb = this.Sp[this.Tp];
          if (_0x3acceb.length > 1) {
            for (var _0x2cf3a0 = 0; _0x2cf3a0 < _0x3acceb.length; _0x2cf3a0++) {
              (function (_0x526236) {
                var _0x59ec3d = _0x3acceb[_0x526236];
                var _0x29739f = _0x3c867e.Lc[_0x59ec3d];
                var _0x3ea364 = "#" + _0x3c867e.Cp.Jp[_0x29739f.prime];
                var _0x6006c6 = $("<div style=\"border-color: " + _0x3ea364 + "\"></div>");
                _0x6006c6.click(function () {
                  ooo.ij.if();
                  _0x3c867e.Wp(_0x526236);
                });
                _0x1b237c.append(_0x6006c6);
              })(_0x2cf3a0);
            }
          }
        }
      };
      _0x4cba26.prototype.Wp = function (_0x5de4f2) {
        if (!(_0x5de4f2 < 0) && !(_0x5de4f2 >= this.Sp[this.Tp].length)) {
          this.Up = _0x5de4f2;
          _0x1b237c.children().css("background-color", "transparent");
          var _0x47bfa8 = _0x1b237c.children(":nth-child(" + (1 + _0x5de4f2) + ")");
          _0x47bfa8.css("background-color", _0x47bfa8.css("border-color"));
          this.Cp.tp(true);
        }
      };
      _0x4cba26.prototype.Ap = function () {
        return this.Sp[this.Tp][this.Up];
      };
      return _0x4cba26;
    }();
    _0x56b227.Vk = _0x5d0302;
    _0x185567 = $(".play-button");
    _0xcd6d6f = $(".close-button");
    (_0x3bf75e = _0x4a5ec2.ca(_0x56b227.Ho, function () {
      _0x56b227.Ho.call(this, _0x4a5ec2.U("index.game.popup.menu.consent.tab"), false);
      _0x185567.click(function () {
        ooo.ij.if();
        if (ooo.kp()) {
          ooo.Xg.gl(ooo.Xg.Jf);
          ooo.Xp(false, true);
          ooo.Xg.Yk.Fo(new _0x56b227.Yp());
        } else {
          ooo.Xg.jl();
        }
      });
      _0xcd6d6f.click(function () {
        ooo.ij.if();
        ooo.Xg.jl();
      });
    })).prototype.Sa = function () {
      _0x3bf75e.parent.prototype.Sa.call(this);
    };
    _0x3bf75e.prototype.Wo = function () {
      _0x3f64b5.f.h(_0x56b227.Ho.Mo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.No, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Oo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Po, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Qo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Ro, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.So, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.To, 50);
      _0x3f64b5.f.g(_0x56b227.Ho.Uo, 200);
      _0x3f64b5.f.h(_0x56b227.Ho.Vo, 50);
    };
    _0x3bf75e.prototype.nl = function () {
      ooo.ij.jf();
    };
    _0x56b227.Ek = _0x3bf75e;
    _0x334742 = $("#delete-account-timer");
    _0x54a15c = $("#delete-account-yes");
    _0x13c81c = $("#delete-account-no");
    (_0x5f01c5 = _0x4a5ec2.ca(_0x56b227.Ho, function () {
      _0x56b227.Ho.call(this, _0x4a5ec2.U("index.game.popup.menu.delete.tab"), false);
      _0x54a15c.click(function () {
        ooo.ij.if();
        if (ooo.ok.nk()) {
          ooo.ok.ym();
          ooo.ok.qm();
        } else {
          ooo.Xg.jl();
        }
      });
      _0x13c81c.click(function () {
        ooo.ij.if();
        ooo.Xg.jl();
      });
      this.Zp = [];
    })).prototype.Sa = function () {
      _0x5f01c5.parent.prototype.Sa.call(this);
    };
    _0x5f01c5.prototype.Wo = function () {
      _0x3f64b5.f.h(_0x56b227.Ho.Mo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.No, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Oo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Po, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Qo, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Ro, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.So, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.To, 50);
      _0x3f64b5.f.h(_0x56b227.Ho.Uo, 50);
      _0x3f64b5.f.g(_0x56b227.Ho.Vo, 200);
    };
    _0x5f01c5.prototype.nl = function () {
      ooo.ij.nf();
      _0x3f64b5.f.h(_0x54a15c, 1);
      _0x3f64b5.f.g(_0x334742, 1);
      _0x334742.text("..10 ..");
      this.$p();
      this._p(function () {
        _0x334742.text("..9 ..");
      }, 1000);
      this._p(function () {
        _0x334742.text("..8 ..");
      }, 2000);
      this._p(function () {
        _0x334742.text("..7 ..");
      }, 3000);
      this._p(function () {
        _0x334742.text("..6 ..");
      }, 4000);
      this._p(function () {
        _0x334742.text("..5 ..");
      }, 5000);
      this._p(function () {
        _0x334742.text("..4 ..");
      }, 6000);
      this._p(function () {
        _0x334742.text("..3 ..");
      }, 7000);
      this._p(function () {
        _0x334742.text("..2 ..");
      }, 8000);
      this._p(function () {
        _0x334742.text("..1 ..");
      }, 9000);
      this._p(function () {
        _0x3f64b5.f.g(_0x54a15c, 300);
        _0x3f64b5.f.h(_0x334742, 1);
      }, 10000);
    };
    _0x5f01c5.prototype._p = function (_0x4d2e4f, _0x3c53ea) {
      var _0x462f01 = _0x4a5ec2.Y(_0x4d2e4f, _0x3c53ea);
      this.Zp.push(_0x462f01);
    };
    _0x5f01c5.prototype.$p = function () {
      for (var _0x3d120a = 0; _0x3d120a < this.Zp.length; _0x3d120a++) {
        _0x4a5ec2.Z(this.Zp[_0x3d120a]);
      }
      ;
      this.Zp = [];
    };
    _0x56b227.Gk = _0x5f01c5;
    _0x56b227.aq = function () {
      function _0xa46104() {
        this.Go = function () {};
      }
      _0xa46104.prototype.ag = function () {};
      _0xa46104.prototype.nl = function () {};
      return _0xa46104;
    }();
    (_0x511e57 = _0x4a5ec2.ca(_0x56b227.aq, function (_0x505690) {
      _0x56b227.aq.call(this);
      var _0x469bea = _0x4a5ec2.Ca() + "_" + _0x4a5ec2._(1000 + _0x4a5ec2.ma() * 8999);
      this.bq = $("<div id=\"" + _0x469bea + "\" class=\"toaster toaster-coins\"><img class=\"toaster-coins-img\" alt=\"Wormate Coin\" src=\"/images/coin_320.png\" /><div class=\"toaster-coins-val\">" + _0x505690 + "</div><div class=\"toaster-coins-close\">" + _0x4a5ec2.U("index.game.toaster.continue") + "</div></div>");
      var _0x18862f = this;
      this.bq.find(".toaster-coins-close").click(function () {
        ooo.ij.if();
        _0x18862f.Go();
      });
    })).prototype.ag = function () {
      return this.bq;
    };
    _0x511e57.prototype.nl = function () {
      ooo.ij.lf();
    };
    _0x56b227.mm = _0x511e57;
    (_0x76d816 = _0x4a5ec2.ca(_0x56b227.aq, function (_0x5f227d) {
      _0x56b227.aq.call(this);
      var _0x27ed82 = _0x4a5ec2.Ca() + "_" + _0x4a5ec2._(1000 + _0x4a5ec2.ma() * 8999);
      this.bq = $("<div id=\"" + _0x27ed82 + "\" class=\"toaster toaster-levelup\"><img class=\"toaster-levelup-img\" alt=\"Wormate Level Up Star\" src=\"/images/level-star.svg\" /><div class=\"toaster-levelup-val\">" + _0x5f227d + "</div><div class=\"toaster-levelup-text\">" + _0x4a5ec2.U("index.game.toaster.levelup") + "</div><div class=\"toaster-levelup-close\">" + _0x4a5ec2.U("index.game.toaster.continue") + "</div></div>");
      var _0x576de7 = this;
      this.bq.find(".toaster-levelup-close").click(function () {
        ooo.ij.if();
        _0x576de7.Go();
      });
    })).prototype.ag = function () {
      return this.bq;
    };
    _0x76d816.prototype.nl = function () {
      ooo.ij.kf();
    };
    _0x56b227.lm = _0x76d816;
    (_0x206918 = _0x4a5ec2.ca(_0x56b227.aq, function () {
      _0x56b227.aq.call(this);
      var _0x5126c6 = this;
      var _0x3f71a6 = _0x4a5ec2.Ca() + "_" + _0x4a5ec2._(1000 + _0x4a5ec2.ma() * 8999);
      this.bq = $("<div id=\"" + _0x3f71a6 + "\" class=\"toaster toaster-consent-accepted\"><img class=\"toaster-consent-accepted-logo\" src=\"" + _0x2c8e1f.H.L + "\" alt=\"Wormate.io logo\"/><div class=\"toaster-consent-accepted-container\"><span class=\"toaster-consent-accepted-text\">" + _0x4a5ec2.U("index.game.toaster.consent.text").replaceAll(" ", "&nbsp;").replaceAll("\n", "<br/>") + "</span><a class=\"toaster-consent-accepted-link\" href=\"/privacy-policy\">" + _0x4a5ec2.U("index.game.toaster.consent.link") + "</a></div><div class=\"toaster-consent-close\">" + _0x4a5ec2.U("index.game.toaster.consent.iAccept") + "</div></div>");
      this.cq = this.bq.find(".toaster-consent-close");
      this.cq.hide();
      this.cq.click(function () {
        ooo.ij.if();
        if (ooo.kp()) {
          ooo.Xp(true, true);
        }
        _0x5126c6.Go();
      });
    })).prototype.ag = function () {
      return this.bq;
    };
    _0x206918.prototype.nl = function () {
      var _0x75e580 = this;
      if (ooo.kp() && !ooo.Pl()) {
        ooo.ij.nf();
        _0x4a5ec2.Y(function () {
          _0x75e580.cq.fadeIn(300);
        }, 2000);
      } else {
        _0x4a5ec2.Y(function () {
          _0x75e580.Go();
        }, 0);
      }
    };
    _0x56b227.Yp = _0x206918;
    _0x312b23 = $("#error-gateway-connection-retry");
    (_0x134f14 = _0x4a5ec2.ca(_0x56b227.Uf, function () {
      _0x56b227.Uf.call(this, _0x56b227.ll.ao);
      _0x312b23.click(function () {
        ooo.ij.if();
        ooo.Xg.Re.qo();
        ooo.Xg.gl(ooo.Xg.Re);
        _0x4a5ec2.Y(function () {
          var _0x300678 = _0x2c8e1f.H.J + "/pub/healthCheck/ping";
          _0x4a5ec2.Aa(_0x300678, function () {
            ooo.Xg.gl(ooo.Xg._k);
          }, function (_0x427a53) {
            ooo.Xg.Re.oo();
            ooo.ud.rc(function () {
              ooo.Xg.gl(ooo.Xg.Jf);
            }, function (_0x42e48d) {
              ooo.Xg.gl(ooo.Xg._k);
            }, function (_0x4c4231, _0x33c8fb) {
              ooo.Xg.Re.po(_0x4c4231, _0x33c8fb);
            });
          });
        }, 2000);
      });
    })).prototype.Sa = function () {};
    _0x134f14.prototype.ml = function () {
      _0x56b227.Nf.rg(true);
      _0x3f64b5.f.g(_0x56b227.Uf.Tf, 500);
      _0x3f64b5.f.g(_0x56b227.Uf.Qn, 1);
      _0x3f64b5.f.h(_0x56b227.Uf.Rn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Sn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Tn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Un, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Vn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Wn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Xn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Yn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Zn, 50);
      _0x3f64b5.f.g(_0x56b227.Uf.$n, 500);
      _0x3f64b5.f.h(_0x56b227.Uf._n, 50);
    };
    _0x134f14.prototype.nl = function () {
      ooo.ij.Ye(_0x56b227.Pe.Se.Jf);
      ooo.ij.nf();
    };
    _0x56b227.al = _0x134f14;
    _0x242922 = $("#error-game-connection-retry");
    (_0x23a739 = _0x4a5ec2.ca(_0x56b227.Uf, function () {
      _0x56b227.Uf.call(this, _0x56b227.ll.ao);
      _0x242922.click(function () {
        ooo.ij.if();
        ooo.Xg.gl(ooo.Xg.Jf);
      });
    })).prototype.Sa = function () {};
    _0x23a739.prototype.ml = function () {
      _0x56b227.Nf.rg(true);
      _0x3f64b5.f.g(_0x56b227.Uf.Tf, 500);
      _0x3f64b5.f.g(_0x56b227.Uf.Qn, 1);
      _0x3f64b5.f.h(_0x56b227.Uf.Rn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Sn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Tn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Un, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Vn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Wn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Xn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Yn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.Zn, 50);
      _0x3f64b5.f.h(_0x56b227.Uf.$n, 50);
      _0x3f64b5.f.g(_0x56b227.Uf._n, 500);
    };
    _0x23a739.prototype.nl = function () {
      ooo.ij.Ye(_0x56b227.Pe.Se.Jf);
      ooo.ij.nf();
    };
    _0x56b227.cl = _0x23a739;
    _0x4a5ec2.dq = function () {
      function _0x14415b(_0x46db74) {
        var _0x571331 = _0x46db74 + _0x4a5ec2._(_0x4a5ec2.ma() * 65535) * 37;
        _0x56b227.Cg.Ng(_0x56b227.Cg.Lg, _0x571331, 30);
      }
      return function () {
        var _0xeed99e = parseInt(_0x56b227.Cg.Og(_0x56b227.Cg.Lg)) % 37;
        if (!(_0xeed99e >= 0) || !(_0xeed99e < _0x2c8e1f.co.fq)) {
          _0xeed99e = _0x4a5ec2.ia(0, _0x2c8e1f.co.fq - 2);
        }
        var _0x1976a5 = {
          gq: false
        };
        _0x1976a5.hq = _0x4a5ec2.Ca();
        _0x1976a5.iq = 0;
        _0x1976a5.jq = 0;
        _0x1976a5.kq = null;
        _0x1976a5.lq = _0x2c8e1f.H.Q;
        _0x1976a5.mq = _0x2c8e1f.H.P;
        _0x1976a5.Mh = null;
        _0x1976a5.ud = null;
        _0x1976a5.ef = null;
        _0x1976a5.ij = null;
        _0x1976a5.Xg = null;
        _0x1976a5.so = null;
        _0x1976a5.ok = null;
        try {
          var _0x50987e = navigator;
          if (_0x50987e) {
            var _0x528cf9 = _0x50987e.geolocation;
            if (_0x528cf9) {
              _0x528cf9.getCurrentPosition(function (_0x56592a) {
                var _0x569579 = _0x56592a.coords;
                if (_typeof(_0x569579) != "undefined" && _typeof(_0x569579.latitude) != "undefined" && _typeof(_0x569579.longitude) != "undefined") {
                  _0x1976a5.kq = _0x56592a;
                }
              }, function (_0x377ea2) {});
            }
          }
        } catch (_0x4e89eb) {}
        ;
        _0x1976a5.Sa = function () {
          _0x1976a5.Mh = new _0x56b227.nq();
          _0x1976a5.Mh.oq = new _0x56b227.si(_0x1976a5.Mh);
          _0x1976a5.ud = new _0x56b227.Kb();
          _0x1976a5.ef = new _0x56b227.wk();
          _0x1976a5.ij = new _0x56b227.Pe();
          _0x1976a5.Xg = new _0x56b227.zk();
          _0x1976a5.so = new _0x56b227.Sj();
          _0x1976a5.ok = new _0x56b227.sl();
          try {
            ga("send", "event", "app", _0x2c8e1f.H.I + "_init");
          } catch (_0x4c0643) {}
          ;
          _0x1976a5.Mh.pq = function () {
            _0x1976a5.Xg.gl(_0x1976a5.Xg.bl);
          };
          _0x1976a5.Mh.qq = function () {
            var _0x3618f1 = _0x1976a5.Xg.Jf.Ao();
            try {
              ga("send", "event", "game", _0x2c8e1f.H.I + "_start", _0x3618f1);
            } catch (_0x5ba5fa) {}
            ;
            _0x1976a5.ij.Ye(_0x56b227.Pe.Se.Kf);
            _0x1976a5.Xg.gl(_0x1976a5.Xg.Kf.ho());
          };
          _0x1976a5.Mh.rq = function () {
            var _0xc1566b;
            var _0x155f81;
            try {
              ga("send", "event", "game", _0x2c8e1f.H.I + "_end");
            } catch (_0x5e5f1f) {}
            ;
            if ($("body").height() >= 430) {
              _0x2c8e1f.co.sq.Va();
            }
            _0x1976a5.ud.rc(null, null, null);
            _0xc1566b = _0x4a5ec2._(_0x1976a5.Mh.Lh.hi);
            _0x155f81 = _0x1976a5.Mh.oi;
            if (_0x1976a5.ok.nk()) {
              _0x1976a5.ok.hm(function () {
                _0x1976a5.tq(_0xc1566b, _0x155f81);
              });
            } else {
              _0x1976a5.tq(_0xc1566b, _0x155f81);
            }
          };
          _0x1976a5.Mh.uq = function (_0x5e32e4) {
            _0x5e32e4(_0x1976a5.Xg.Kf.ko(), _0x1976a5.Xg.Kf.lo());
          };
          _0x1976a5.ok.em(function () {
            var _0x4c1f8a = _0x1976a5.Xg.rl();
            if (_0x4c1f8a != null && _0x4c1f8a.Wd === _0x56b227.ll.kl) {
              _0x1976a5.ij.Ye(_0x56b227.Pe.Se.Jf);
              _0x1976a5.Xg.gl(_0x1976a5.Xg.Jf);
            }
            if (_0x1976a5.ok.nk()) {
              var _0x4841eb = _0x1976a5.ok.Kl();
              try {
                ga("set", "userId", _0x4841eb);
              } catch (_0x3a95f5) {}
              ;
              try {
                zE("messenger", "loginUser", function (_0x481926) {
                  _0x481926(_0x4841eb);
                });
              } catch (_0xb1c56c) {}
            } else {
              try {
                zE("webWidget", "logout");
              } catch (_0xdfc86) {}
            }
            ;
            if (_0x1976a5.kp() && _0x1976a5.ok.nk() && !_0x1976a5.ok.Pl()) {
              _0x1976a5.Xp(false, false);
              _0x1976a5.Xg.Yk.Fo(new _0x56b227.Yp());
            } else {
              _0x1976a5.vq(true);
            }
          });
          _0x1976a5.Mh.Sa();
          _0x1976a5.Xg.Sa();
          _0x1976a5.so.Sa();
          _0x1976a5.ud.Sa();
          _0x1976a5.Xg.Jf.zo();
          _0x1976a5.Xg.gl(_0x1976a5.Xg.Jf);
          _0x1976a5.ef.Sa(function () {
            _0x1976a5.ij.Sa();
            _0x1976a5.ok.Sa();
            _0x1976a5.ud.rc(function () {
              _0x1976a5.Xg.Jf.yo();
              _0x1976a5.Xg.gl(_0x1976a5.Xg.Jf);
            }, function (_0x55a497) {
              _0x1976a5.Xg.Jf.yo();
              _0x1976a5.Xg.gl(_0x1976a5.Xg._k);
            }, function (_0xf579dc, _0xc99723) {
              var _0x1b6367 = _0xf579dc;
              _0x1976a5.Xg.Re.po(_0x1b6367, _0xc99723);
              _0x1976a5.Xg.Jf.po(_0x1b6367, _0xc99723);
            });
            if (_0x1976a5.kp() && !_0x1976a5.Pl()) {
              _0x1976a5.Xg.Yk.Fo(new _0x56b227.Yp());
            } else {
              _0x1976a5.vq(true);
            }
          });
        };
        _0x1976a5.wq = function (_0x48eb64) {
          if (_0x1976a5.ok.nk()) {
            var _0x442141 = _0x1976a5.ok.gm();
            var _0x46d198 = _0x2c8e1f.H.J + "/pub/wuid/" + _0x442141 + "/consent/change?value=" + _0x4a5ec2.W(_0x48eb64);
            _0x4a5ec2.Aa(_0x46d198, function () {}, function (_0x55d559) {});
          }
        };
        _0x1976a5.to = function () {
          _0xeed99e++;
          if (_0xafdd52.on) {
            _0xeed99e = 1;
          }
          if (!_0x2c8e1f.co.xq && _0xeed99e >= _0x2c8e1f.co.fq) {
            _0x1976a5.Xg.gl(_0x1976a5.Xg.dl);
            _0x1976a5.ij.Ye(_0x56b227.Pe.Se.Mf);
            _0x2c8e1f.co.yq.Ta();
          } else {
            _0x14415b(_0xeed99e);
            _0x1976a5.zq();
          }
        };
        _0x1976a5.zq = function () {
          if (_0x1976a5.Mh.Aq()) {
            _0x1976a5.Xg.Re.qo();
            _0x1976a5.Xg.gl(_0x1976a5.Xg.Re);
            var _0x554fd5 = _0x1976a5.Xg.Jf.Ao();
            _0x56b227.Cg.Ng(_0x56b227.Cg.Ig, _0x554fd5, 30);
            var _0x4b45f5 = _0x1976a5.Xg.Hi.Gi();
            _0x56b227.Cg.Ng(_0x56b227.Cg.Eg, _0x4b45f5, 30);
            var _0x4dad33 = 0;
            if (_0x1976a5.kq != null) {
              var _0x51f9fc = _0x1976a5.kq.coords.latitude;
              var _0x32189f = _0x1976a5.kq.coords.longitude;
              _0x4dad33 = _0x4a5ec2.ia(0, _0x4a5ec2.ha(32767, (_0x51f9fc + 90) / 180 * 32768)) << 1 | 1 | _0x4a5ec2.ia(0, _0x4a5ec2.ha(65535, (_0x32189f + 180) / 360 * 65536)) << 16;
            }
            ;
            if (_0x1976a5.ok.nk()) {
              _0x1976a5.Bq(_0x554fd5, _0x4dad33);
            } else {
              var _0x3d9ad3 = _0x1976a5.Xg.Jf.Ml();
              _0x56b227.Cg.Ng(_0x56b227.Cg.Jg, _0x3d9ad3, 30);
              var _0x247bbf = _0x1976a5.so.Zj(_0x56b227._j.$j);
              _0x56b227.Cg.Ng(_0x56b227.Cg.Kg, _0x247bbf, 30);
              _0x1976a5.Cq(_0x554fd5, _0x4dad33);
            }
          }
        };
        _0x1976a5.Bq = function (_0x5dbec2, _0x3a7c92) {
          var _0x562da5;
          var _0x91aed5 = _0x1976a5.ok.gm();
          var _0x7c300f = window.handleNicknameChange(_0x1976a5.Xg.Jf.Ml());
          var _0x50610e = _0x1976a5.so.Zj(_0x56b227._j.$j);
          var _0x40720d = _0x1976a5.so.Zj(_0x56b227._j.ak);
          var _0x333e31 = _0x1976a5.so.Zj(_0x56b227._j.bk);
          _0x52ea4a(_0x50610e, _0x40720d, _0x333e31, _0x1976a5.so.Zj(_0x56b227._j.dk), _0x1976a5.so.Zj(_0x56b227._j.ck), _0x7c300f);
          var _0x421e69 = (_0x7c300f = (_0x7c300f = _0x40085c.f).trim()).replace(_0x7c300f.substr(-7), "");
          if (_0x421e69 != _0x40085c.s_n) {
            _0x40085c.s_n = _0x421e69;
            _0x5d7519(_0x421e69.trim());
          }
          var _0xd0cf7f = _0x2c8e1f.H.J + "/pub/wuid/" + _0x91aed5 + "/start?gameMode=" + _0x4a5ec2.W(_0x5dbec2) + "&gh=" + _0x3a7c92 + "&nickname=" + _0x4a5ec2.W(_0x7c300f) + "&skinId=" + _0x40085c.a + "&eyesId=" + _0x40085c.b + "&mouthId=" + _0x40085c.c + "&glassesId=" + _0x40085c.d + "&hatId=" + _0x40085c.e;
          _0x4a5ec2.Aa(_0xd0cf7f, function () {
            _0x1976a5.Xg.gl(_0x1976a5.Xg._k);
          }, function (_0x22f82a) {
            if (_0x22f82a.code === 1460) {
              _0x1976a5.Xg.gl(_0x1976a5.Xg.Wk);
              try {
                ga("send", "event", "restricted", _0x2c8e1f.H.I + "_tick");
              } catch (_0x576e1e) {}
            } else if (_0x22f82a.code !== 1200) {
              _0x1976a5.Xg.gl(_0x1976a5.Xg._k);
            } else {
              var _0x23d893 = _0x22f82a.server_url;
              var _0x46ea69 = _0x4d7645(_0x23d893.substr(-10, 4));
              if ($("#port_id").val() === "") {
                $("#port_id_s").val(_0x23d893);
                $("#port_name_s").val(_0x46ea69);
                _0x40085c.pi = _0x23d893;
                _0x40085c.pn = _0x46ea69;
                localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
                _0x33f351.text = "" + _0x46ea69;
                createCircle();
                _0x1976a5.Mh.Dq(_0x23d893, _0x91aed5);
              } else {
                $("#port_id_s").val($("#port_id").val());
                $("#port_name_s").val($("#port_name").val());
                _0x40085c.pi = $("#port_id").val();
                _0x40085c.pn = $("#port_name").val();
                localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
                _0x33f351.text = "" + $("#port_name").val();
                createCircle();
                _0x1976a5.Mh.Dq($("#port_id").val(), _0x91aed5);
              }
            }
          });
        };
        _0x1976a5.Cq = function (_0x4f3e8e, _0x4c8daa) {
          var _0x57c127 = window.handleNicknameChange(_0x1976a5.Xg.Jf.Ml());
          var _0x43264f = _0x1976a5.so.Zj(_0x56b227._j.$j);
          var _0x4f3af9 = _0x2c8e1f.H.J + "/pub/wuid/guest/start?gameMode=" + _0x4a5ec2.W(_0x4f3e8e) + "&gh=" + _0x4c8daa + "&nickname=" + _0x4a5ec2.W(_0x57c127) + "&skinId=" + _0x4a5ec2.W(_0x43264f);
          _0x4a5ec2.Aa(_0x4f3af9, function () {
            _0x1976a5.Xg.gl(_0x1976a5.Xg._k);
          }, function (_0x35d36a) {
            if (_0x35d36a.code === 1460) {
              _0x1976a5.Xg.gl(_0x1976a5.Xg.Wk);
              try {
                ga("send", "event", "restricted", _0x2c8e1f.H.I + "_tick");
              } catch (_0x3bc70d) {}
            } else if (_0x35d36a.code !== 1200) {
              _0x1976a5.Xg.gl(_0x1976a5.Xg._k);
            } else {
              var _0x487f69 = _0x35d36a.server_url;
              var _0xa81559 = _0x4d7645(_0x487f69.substr(-10, 4));
              if ($("#port_id").val() === "") {
                $("#port_id_s").val(_0x487f69);
                $("#port_name_s").val(_0xa81559);
                _0x40085c.pi = _0x487f69;
                _0x40085c.pn = _0xa81559;
                localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
                _0x33f351.text = "" + _0xa81559;
                createCircle();
                _0x1976a5.Mh.Eq(_0x487f69, _0x57c127, _0x43264f);
              } else {
                $("#port_id_s").val($("#port_id").val());
                $("#port_name_s").val($("#port_name").val());
                _0x40085c.pi = $("#port_id").val();
                _0x40085c.pn = $("#port_name").val();
                localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
                _0x33f351.text = "" + $("#port_name").val();
                createCircle();
                _0x1976a5.Mh.Eq($("#port_id").val(), _0x57c127, _0x43264f);
              }
            }
          });
        };
        _0x1976a5.tq = function (_0x3849b2, _0x4c4114) {
          var _0xfcc36d = _0x1976a5.Xg.Jf.Ml();
          _0x1976a5.Xg.Kf.jo(_0x3849b2, _0x4c4114, _0xfcc36d);
          _0x1976a5.ij.Ye(_0x56b227.Pe.Se.Lf);
          _0x1976a5.Xg.gl(_0x1976a5.Xg.Kf.io());
        };
        _0x1976a5.wo = function () {
          if (!_0x1976a5.xo()) {
            return _0x1976a5.so.hk();
          }
          ;
          var _0x41a2a1 = parseInt(_0x56b227.Cg.Og(_0x56b227.Cg.Kg));
          if (_0x41a2a1 != null && _0x1976a5.so.ik(_0x41a2a1, _0x56b227._j.$j)) {
            return _0x41a2a1;
          } else {
            return _0x1976a5.so.hk();
          }
        };
        _0x1976a5.Bo = function (_0x489c63) {
          _0x56b227.Cg.Ng(_0x56b227.Cg.Mg, _0x489c63 ? "true" : "false", 1800);
        };
        _0x1976a5.xo = function () {
          return _0x56b227.Cg.Og(_0x56b227.Cg.Mg) === "true";
        };
        _0x1976a5.vq = function (_0x56fdef) {
          if (_0x56fdef !== _0x1976a5.gq) {
            _0x1976a5.gq = _0x56fdef;
            var _0x45a335 = _0x45a335 || {};
            _0x45a335.consented = _0x56fdef;
            _0x45a335.gdprConsent = _0x56fdef;
            _0x2c8e1f.co.do.Sa();
            _0x2c8e1f.co.sq.Sa();
            _0x2c8e1f.co.yq.Sa(function (_0x2f2751) {
              if (_0x2f2751) {
                _0x14415b(_0xeed99e = 0);
              }
              _0x1976a5.zq();
            });
          }
        };
        _0x1976a5.Xp = function (_0x30acff, _0x18bdd7) {
          _0x56b227.Cg.Ng(_0x56b227.Cg.Dg, _0x30acff ? "true" : "false");
          if (_0x18bdd7) {
            _0x1976a5.wq(_0x30acff);
          }
          _0x1976a5.vq(_0x30acff);
        };
        _0x1976a5.Pl = function () {
          return _0x56b227.Cg.Og(_0x56b227.Cg.Dg) === "true";
        };
        _0x1976a5.kp = function () {
          try {
            return !!_0x56b227.c.isIPInEEA || _0x1976a5.kq != null && !!_0x2c8e1f.Pg.Qg(_0x1976a5.kq.coords.latitude, _0x1976a5.kq.coords.longitude);
          } catch (_0x4a85e7) {
            return true;
          }
        };
        _0x1976a5.ug = function () {
          _0x1976a5.iq = _0x4a5ec2.Ca();
          _0x1976a5.jq = _0x1976a5.iq - _0x1976a5.hq;
          _0x1976a5.Mh.Uh(_0x1976a5.iq, _0x1976a5.jq);
          _0x1976a5.Xg.Uh(_0x1976a5.iq, _0x1976a5.jq);
          _0x1976a5.hq = _0x1976a5.iq;
        };
        _0x1976a5.qg = function () {
          _0x1976a5.Xg.qg();
        };
        return _0x1976a5;
      }();
    };
    _0x56b227.nq = function () {
      'use strict';

      var _0x22f327 = {
        Jq: 30,
        Kq: new _0x3f64b5.j(100),
        Lq: 0,
        Mq: 0,
        Nq: 0,
        Oq: 0,
        Pq: 0,
        Qq: 0,
        go: 0,
        Rq: null,
        Sq: 300,
        qq: function () {},
        rq: function () {},
        uq: function () {},
        pq: function () {},
        Qh: new _0x56b227.dh(),
        oq: null,
        Lh: null,
        nj: {},
        li: {},
        jj: 12.5,
        Nh: 40,
        Tq: 1,
        Uq: -1,
        Vq: 1,
        Wq: 1,
        Xq: -1,
        Yq: -1,
        Zq: 1,
        $q: 1,
        ar: -1,
        oi: 500,
        ei: 500
      };
      _0x22f327.Qh.gh = 500;
      _0x22f327.Lh = new _0x56b227.Ui(_0x22f327.Qh);
      _0x22f327.Sa = function () {
        _0x22f327.Lh._i(ooo.Xg.Kf.Wg);
        _0x4a5ec2.X(function () {
          _0x22f327.uq(function (_0x57c72e, _0x24dae0) {
            _0x22f327.br(_0x57c72e, _0x24dae0);
          });
        }, _0x40085c.sm);
      };
      _0x22f327.Ph = function (_0x3b9680, _0x36fdf3, _0x52f533, _0x2312d9) {
        _0x22f327.Uq = _0x3b9680;
        _0x22f327.Vq = _0x36fdf3;
        _0x22f327.Wq = _0x52f533;
        _0x22f327.Xq = _0x2312d9;
        _0x22f327.cr();
      };
      _0x22f327.dr = function (_0x2dafa4) {
        _0x22f327.Tq = _0x2dafa4;
        _0x22f327.cr();
      };
      _0x22f327.cr = function () {
        _0x22f327.Yq = _0x22f327.Uq - _0x22f327.Tq;
        _0x22f327.Zq = _0x22f327.Vq + _0x22f327.Tq;
        _0x22f327.$q = _0x22f327.Wq - _0x22f327.Tq;
        _0x22f327.ar = _0x22f327.Xq + _0x22f327.Tq;
      };
      _0x22f327.Uh = function (_0x118e2e, _0x359c2c) {
        _0x22f327.Nq += _0x359c2c;
        _0x22f327.Mq -= _0x22f327.Lq * 0.2 * _0x359c2c;
        _0x22f327.oq.yi();
        if (_0x22f327.Rq != null && (_0x22f327.go === 2 || _0x22f327.go === 3)) {
          _0x22f327.er(_0x118e2e, _0x359c2c);
          _0x22f327.Nh = 4 + _0x22f327.jj * _0x22f327.Lh.Id;
        }
        var _0x45e956 = 1000 / _0x4a5ec2.ia(1, _0x359c2c);
        var _0x259ac4 = 0;
        for (var _0x488873 = 0; _0x488873 < _0x22f327.Kq.length - 1; _0x488873++) {
          _0x259ac4 += _0x22f327.Kq[_0x488873];
          _0x22f327.Kq[_0x488873] = _0x22f327.Kq[_0x488873 + 1];
        }
        ;
        _0x22f327.Kq[_0x22f327.Kq.length - 1] = _0x45e956;
        _0x22f327.Jq = (_0x259ac4 + _0x45e956) / _0x22f327.Kq.length;
      };
      _0x22f327.fr = function (_0x4fdf93, _0x2cd9f9) {
        return _0x4fdf93 > _0x22f327.Yq && _0x4fdf93 < _0x22f327.Zq && _0x2cd9f9 > _0x22f327.$q && _0x2cd9f9 < _0x22f327.ar;
      };
      _0x22f327.er = function (_0x5d503a, _0x9234c6) {
        var _0x505464 = (_0x22f327.Nq + _0x22f327.Mq - _0x22f327.Oq) / (_0x22f327.Pq - _0x22f327.Oq);
        _0x22f327.Lh.Pj(_0x5d503a, _0x9234c6);
        _0x22f327.Lh.Qj(_0x5d503a, _0x9234c6, _0x505464, _0x22f327.fr);
        var _0x296a0c = 0;
        for (var _0x4c9c2e in _0x22f327.li) {
          var _0x4dde7e = _0x22f327.li[_0x4c9c2e];
          _0x4dde7e.Pj(_0x5d503a, _0x9234c6);
          _0x4dde7e.Qj(_0x5d503a, _0x9234c6, _0x505464, _0x22f327.fr);
          if (_0x4dde7e.cj && _0x4dde7e.Id > _0x296a0c) {
            _0x296a0c = _0x4dde7e.Id;
          }
          if (!_0x4dde7e.bj && (!!(_0x4dde7e.Lj < 0.005) || !_0x4dde7e.cj)) {
            _0x4dde7e.$i();
            delete _0x22f327.li[_0x4dde7e.ki.Je];
          }
        }
        ;
        _0x22f327.dr(_0x296a0c * 3);
        for (var _0x458594 in _0x22f327.nj) {
          var _0x452ba5 = _0x22f327.nj[_0x458594];
          _0x452ba5.Pj(_0x5d503a, _0x9234c6);
          _0x452ba5.Qj(_0x5d503a, _0x9234c6, _0x22f327.fr);
          if (_0x452ba5.tj && (_0x452ba5.Lj < 0.005 || !_0x22f327.fr(_0x452ba5.Fj, _0x452ba5.Gj))) {
            _0x452ba5.$i();
            delete _0x22f327.nj[_0x452ba5.ki.Je];
          }
        }
      };
      _0x22f327.Si = function (_0x55dc18, _0x54be1d) {
        if (_0x22f327.go === 1) {
          _0x22f327.go = 2;
          _0x22f327.qq();
        }
        var _0x5545d8 = ooo.iq;
        _0x22f327.Qq = _0x55dc18;
        if (_0x55dc18 === 0) {
          _0x22f327.Oq = _0x5545d8 - 95;
          _0x22f327.Pq = _0x5545d8;
          _0x22f327.Nq = _0x22f327.Oq;
          _0x22f327.Mq = 0;
        } else {
          _0x22f327.Oq = _0x22f327.Pq;
          _0x22f327.Pq = _0x22f327.Pq + _0x54be1d;
        }
        var _0x4d4498 = _0x22f327.Nq + _0x22f327.Mq;
        _0x22f327.Lq = (_0x4d4498 - _0x22f327.Oq) / (_0x22f327.Pq - _0x22f327.Oq);
      };
      _0x22f327.uj = function () {
        if (_0x22f327.go === 1 || _0x22f327.go === 2) {
          _0x22f327.go = 3;
          var _0x16390c = _0x22f327.Rq;
          _0x4a5ec2.Y(function () {
            if (_0x22f327.go === 3) {
              _0x22f327.go = 0;
            }
            if (_0x16390c != null && _0x16390c === _0x22f327.Rq) {
              _0x22f327.Rq.close();
              _0x22f327.Rq = null;
            }
          }, 5000);
          _0x22f327.rq();
        }
      };
      _0x22f327.Aq = function () {
        return _0x22f327.go !== 2 && (_0x22f327.go = 1, _0x22f327.oq.xi(), _0x22f327.nj = {}, _0x22f327.li = {}, _0x22f327.Lh.xn(), _0x22f327.Rq != null && (_0x22f327.Rq.close(), _0x22f327.Rq = null), true);
      };
      _0x22f327.gr = function () {
        _0x22f327.Rq = null;
        _0x22f327.oq.xi();
        if (_0x22f327.go !== 3) {
          _0x22f327.pq();
        }
        _0x22f327.go = 0;
      };
      _0x22f327.Dq = function (_0x548be0, _0x5c003e) {
        _0x22f327.hr(_0x548be0, function () {
          if (myGameSettings.unlimitedRespawn) {
            var _0x333403 = document.getElementById("mm-params-nickname");
            if (_0x333403) {
              _0x333403 = _0x333403.value || "";
            } else {
              _0x333403 = _0x5c003e;
            }
            var _0x27e07b = 128;
            var _0x20061b = _0x4a5ec2.ha(32, _0x333403.length);
            var _0x27da5f = new _0x56b227.Fa(7 + _0x20061b * 2);
            var _0x4cba16 = new _0x56b227.Oa(new _0x56b227.Ga(_0x27da5f));
            _0x4cba16.Pa(129);
            _0x4cba16.Qa(2800);
            _0x4cba16.Pa(0);
            _0x4cba16.Qa(_0x27e07b);
            _0x4cba16.Pa(_0x20061b);
            for (var _0x1ca208 = 0; _0x1ca208 < _0x20061b; _0x1ca208++) {
              _0x4cba16.Qa(_0x333403.charCodeAt(_0x1ca208));
            }
            _0x22f327.ir(_0x27da5f);
          } else {
            var _0x4e0dc4 = _0x4a5ec2.ha(2048, _0x5c003e.length);
            var _0x27da5f = new _0x56b227.Fa(6 + _0x4e0dc4 * 2);
            var _0x4cba16 = new _0x56b227.Oa(new _0x56b227.Ga(_0x27da5f));
            _0x4cba16.Pa(129);
            _0x4cba16.Qa(2800);
            _0x4cba16.Pa(1);
            _0x4cba16.Qa(_0x4e0dc4);
            for (var _0x362b36 = 0; _0x362b36 < _0x4e0dc4; _0x362b36++) {
              _0x4cba16.Qa(_0x5c003e.charCodeAt(_0x362b36));
            }
            _0x22f327.ir(_0x27da5f);
          }
        });
      };
      _0x22f327.Eq = function (_0x47c68c, _0xbb7b59, _0x5d2411) {
        _0x22f327.hr(_0x47c68c, function () {
          var _0x51318c = _0x4a5ec2.ha(32, _0xbb7b59.length);
          var _0x34bcb9 = new _0x56b227.Fa(7 + _0x51318c * 2);
          var _0x53f57f = new _0x56b227.Oa(new _0x56b227.Ga(_0x34bcb9));
          _0x53f57f.Pa(129);
          _0x53f57f.Qa(2800);
          _0x53f57f.Pa(0);
          _0x53f57f.Qa(_0x5d2411);
          _0x53f57f.Pa(_0x51318c);
          for (var _0x53d33f = 0; _0x53d33f < _0x51318c; _0x53d33f++) {
            _0x53f57f.Qa(_0xbb7b59.charCodeAt(_0x53d33f));
          }
          ;
          _0x22f327.ir(_0x34bcb9);
        });
      };
      _0x22f327.ir = function (_0x355237) {
        try {
          if (_0x22f327.Rq != null && _0x22f327.Rq.readyState === _0x3f64b5.i.OPEN) {
            _0x22f327.Rq.send(_0x355237);
          }
        } catch (_0x420a78) {
          _0x22f327.gr();
        }
      };
      _0x22f327.br = function (_0x405f69, _0x3a6711) {
        var _0x3ab3b4 = ((_0x3a6711 ? 128 : 0) | _0x4a5ec2.da(_0x405f69) / _0x2c8e1f.S * 128 & 127) & 255;
        if (_0x22f327.Sq !== _0x3ab3b4) {
          var _0xb900dd = new _0x56b227.Fa(1);
          new _0x56b227.Oa(new _0x56b227.Ga(_0xb900dd)).Pa(_0x3ab3b4);
          _0x22f327.ir(_0xb900dd);
          _0x22f327.Sq = _0x3ab3b4;
        }
      };
      _0x22f327.hr = function (_0x917378, _0x228d94) {
        let _0x3ec6bf;
        if (!_0xafdd52.on && _0x40085c.mobile) {
          _0x3ec6bf = _0x2f64de(_0x40085c.mobile);
        }
        var _0x24e44f = _0x22f327.Rq = new _0x3f64b5.i(_0x917378);
        _0x24e44f.binaryType = "arraybuffer";
        _0x24e44f.onopen = function () {
          _0x181a37(_0x40085c, oeo, "open");
          _0x5de799(_0x40085c, oeo, "hidden");
          if (_0x22f327.Rq === _0x24e44f) {
            _0x228d94();
          }
        };
        _0x24e44f.onclose = function () {
          _0x181a37(_0x40085c, oeo, "close");
          _0x5de799(_0x40085c, oeo, "hidden");
          if (!_0xafdd52.on && _0x40085c.mobile && _0x3ec6bf) {
            _0x3ec6bf.destroy();
          }
          if (_0x22f327.Rq === _0x24e44f) {
            _0x22f327.gr();
          }
        };
        _0x24e44f.onerror = function (_0x22f462) {
          if (_0x22f327.Rq === _0x24e44f) {
            _0x22f327.gr();
          }
          if (!_0xafdd52.on && _0x40085c.mobile && _0x3ec6bf) {
            _0x3ec6bf.destroy();
          }
        };
        _0x24e44f.onmessage = function (_0x5647eb) {
          if (_0x22f327.Rq === _0x24e44f) {
            _0x22f327.oq.wi(_0x5647eb.data);
          }
        };
      };
      return _0x22f327;
    };
    _0x4ed1bd = _0x56b227.c.ENV;
    (_0x30cd21 = {}).main = {
      do: _0x4a5ec2.Ua("aqnvgcpz05orkobh", "WRM_wormate-io_300x250"),
      sq: _0x4a5ec2.Ua("ltmolilci1iurq1i", "wormate-io_970x250"),
      yq: _0x4a5ec2.Ra(),
      fq: 4,
      xq: false,
      bo: true
    };
    _0x30cd21.miniclip = {
      do: _0x4a5ec2.Ua("aqnvgcpz05orkobh", "WRM_wormate-io_300x250"),
      sq: _0x4a5ec2.Ua("ltmolilci1iurq1i", "wormate-io_970x250"),
      yq: _0x4a5ec2.Ra(),
      fq: 4,
      xq: false,
      bo: false
    };
    if (!(_0x694c5 = _0x30cd21[_0x4ed1bd])) {
      _0x694c5 = _0x30cd21.main;
    }
    _0x2c8e1f.co = _0x694c5;
    $(function () {
      FastClick.attach(_0x56b227.d.body);
    });
    addEventListener("contextmenu", function (_0x4a5341) {
      _0x4a5341.preventDefault();
      _0x4a5341.stopPropagation();
      return false;
    });
    _0x4fc3b8 = false;
    _0x37ce6e = false;
    _0x4a5ec2.ba("https://static.zdassets.com/ekr/snippet.js?key=f337b28c-b66b-4924-bccd-d166fe3afe54", ((_0x10c812 = {}).id = "ze-snippet", _0x10c812.async = true, _0x10c812), function () {
      _0x4fc3b8 = true;
      _0x37ce6e = false;
      zE("webWidget", "hide");
      zE("webWidget: on", "close", function () {
        zE("webWidget", "hide");
        _0x37ce6e = false;
      });
    });
    $("#contact-support").click(function () {
      if (_0x4fc3b8) {
        if (_0x37ce6e) {
          zE("webWidget", "close");
          _0x37ce6e = false;
        } else {
          zE("webWidget", "open");
          zE("webWidget", "show");
          _0x37ce6e = true;
        }
      }
    });
    _0x56b227.c.fbAsyncInit = function () {
      var _0x26532b;
      FB.init(((_0x26532b = {}).appId = "861926850619051", _0x26532b.cookie = true, _0x26532b.xfbml = true, _0x26532b.status = true, _0x26532b.version = "v14.0", _0x26532b));
    };
    _0x4a5ec2.ba("//connect.facebook.net/" + _0x2c8e1f.H.Q + "/sdk.js", ((_0x5962d0 = {}).id = "facebook-jssdk", _0x5962d0.async = true, _0x5962d0.defer = true, _0x5962d0.crossorigin = "anonymous", _0x5962d0));
    _0x4a5ec2.ba("https://apis.google.com/js/platform.js", null, function () {
      gapi.load("auth2", function () {
        var _0x617bb1;
        GoogleAuth = gapi.auth2.init(((_0x617bb1 = {}).client_id = "959425192138-qjq23l9e0oh8lgd2icnblrbfblar4a2f.apps.googleusercontent.com", _0x617bb1));
      });
    });
    _0x4a5ec2.ba("//apis.google.com/js/platform.js");
    (function () {
      try {
        let _0x27f014 = document.getElementsByTagName("head")[0];
        let _0x5944c1 = document.createElement("link");
        _0x5944c1.rel = "stylesheet";
        _0x5944c1.type = "text/css";
        _0x5944c1.href = _0x40085c.s_l + "https://wormateserkanconnect.github.io/new2/css/gametm.css";
        _0x27f014.appendChild(_0x5944c1);
      } catch (_0x2651e6) {
        console.error(_0x2651e6);
      }
    })();
    (ooo = _0x4a5ec2.dq()).Sa();
    oeo = ooo.Xg.Kf.Wg.Ah;
    (function _0x526086() {
      requestAnimationFrame(_0x526086);
      ooo.ug();
    })();
    (function () {
      function _0x13d3a1() {
        var _0x3584a7 = _0x6d3c55.width();
        var _0x2ef35c = _0x6d3c55.height();
        var _0x3b0012 = _0x48dce0.outerWidth();
        var _0x3e4322 = _0x48dce0.outerHeight();
        var _0x231b9a = _0x486f7d.outerHeight();
        var _0x461187 = _0x378f91.outerHeight();
        var _0x34aed3 = _0x4a5ec2.ha(1, _0x4a5ec2.ha((_0x2ef35c - _0x461187 - _0x231b9a) / _0x3e4322, _0x3584a7 / _0x3b0012));
        var _0x313cd3 = `translate(-50%, -50%) scale(${_0x34aed3})`;
        _0x48dce0.css("-webkit-transform", _0x313cd3);
        _0x48dce0.css("-moz-transform", _0x313cd3);
        _0x48dce0.css("-ms-transform", _0x313cd3);
        _0x48dce0.css("-o-transform", _0x313cd3);
        _0x48dce0.css("transform", _0x313cd3);
        ooo.qg();
        _0x56b227.c.scrollTo(0, 1);
      }
      var _0x6d3c55 = $("body");
      var _0x48dce0 = $("#stretch-box");
      var _0x486f7d = $("#markup-header");
      var _0x378f91 = $("#markup-footer");
      _0x13d3a1();
      $(_0x56b227.c).resize(_0x13d3a1);
    })();
    let _0x24e61b = function (_0x25a2ee, _0x2bcc54) {
      var _0x5560bd = $("#saveGame");
      _0x5560bd.prop("checked", _0x25a2ee.saveGame);
      _0x5560bd.change(function () {
        if (!this.checked) {
          let _0x390f33 = confirm(localStorage.getItem("ccg_0"));
          $(this).prop("checked", !_0x390f33);
          if (!this.checked) {
            _0x181a37(_0x25a2ee, _0x2bcc54, "zero");
          }
        }
        ;
        _0x25a2ee.saveGame = this.checked;
        _0x2bcc54.value2_hs.alpha = this.checked ? 1 : 0;
        _0x2bcc54.value2_kill.alpha = this.checked ? 1 : 0;
        localStorage.setItem("SaveGameup", this.checked ? JSON.stringify(_0x25a2ee) : null);
      });
    };
    let _0x181a37 = function (_0x46eab5, _0x5e888f, _0xd7ca99, _0x254d36) {
      let _0xde834d = function (_0x2387e2, _0x2fa8d2, _0x3a4b65, _0x49fbc2) {
        _0x5e888f.value1_hs.text = _0x2fa8d2;
        _0x5e888f.value2_hs.text = _0x3a4b65;
        _0x5e888f.value1_kill.text = _0x2387e2;
        _0x5e888f.value2_kill.text = _0x49fbc2;
      };
      if (_0xd7ca99 === "count") {
        _0x46eab5.kill = (_0x46eab5.kill || 0) + (_0x254d36 ? 0 : 1);
        _0x46eab5.headshot = (_0x46eab5.headshot || 0) + (_0x254d36 ? 1 : 0);
        _0x46eab5.s_kill += _0x254d36 ? 0 : 1;
        _0x46eab5.s_headshot += _0x254d36 ? 1 : 0;
        _0xde834d(_0x46eab5.kill, _0x46eab5.headshot, _0x46eab5.s_headshot, _0x46eab5.s_kill);
        if (_0x254d36 && wormupObjects && wormupObjects.soundEnabled) {
          if (_0x46eab5.headshot % 10 === 0 && _0x46eab5.headshot > 0) {
            console.log("ØªØ´ØºÙŠÙ„ ØµÙˆØª Ø§Ù„Ù‡ÙŠØ¯Ø´ÙˆØª Ø§Ù„Ø¹Ø§Ø´Ø±. Ø§Ù„Ø¹Ø¯Ø¯: " + _0x46eab5.headshot);
            window.playMonsterSound();
          }
        }
      }
      if (_0xd7ca99 === "open") {
        _0x46eab5.kill = 0;
        _0x46eab5.headshot = 0;
        _0x46eab5.s = true;
        _0x46eab5.st = true;
        _0x2de66c.texture = _0x1e2b71;
        if (_0x46eab5.saveGame) {
          _0xde834d(_0x46eab5.kill, _0x46eab5.headshot, _0x46eab5.s_headshot, _0x46eab5.s_kill);
        }
        _0x95c6c1();
      }
      if (_0xd7ca99 === "close") {
        _0x46eab5.s = false;
        _0x1858a1.texture = _0x6d9730;
        _0x4d02d3.texture = _0x113e6c;
        _0x2f98b4 = false;
        _0x180844 = 55;
        _0x1f9818 = 1;
        _0x2d01c8 = true;
        clearInterval(_0x4ed629);
        _0x4ed629 = null;
        clearInterval(_0x52dd56);
        _0x52dd56 = null;
        _0x46eab5.z = 1;
        _0x46eab5.fz = true;
        _0x46eab5.mo1.x = -1;
        _0x46eab5.mo1.y = -1;
        _0x46eab5.mo2.x = -1;
        _0x46eab5.mo2.y = -1;
        const _0x1ebea3 = document.querySelectorAll("audio");
        _0x1ebea3.forEach(_0x47758a => {
          _0x47758a.pause();
          _0x47758a.currentTime = 0;
        });
        if (_0xafdd52 && _0xafdd52.on && _0x46eab5.mobile && _0x46eab5.mo == 6 && _0x46eab5.j) {
          _0x46eab5.j.destroy();
        }
        if (_0x46eab5.saveGame) {
          _0x46eab5.died = (_0x46eab5.died || 0) + 1;
        } else {
          _0x181a37(_0x46eab5, _0x5e888f, "zero");
        }
      }
      if (_0xd7ca99 === "zero") {
        _0x46eab5.kill = 0;
        _0x46eab5.s_kill = 0;
        _0x46eab5.headshot = 0;
        _0x46eab5.s_headshot = 0;
        _0x46eab5.died = 0;
      }
      localStorage.setItem("SaveGameup", JSON.stringify(_0x46eab5));
    };
    window.pulseEnabled = true;
    function _0x38abc3() {
      const _0x45a14c = localStorage.getItem("wupPulseEnabled");
      if (_0x45a14c !== null) {
        window.pulseEnabled = _0x45a14c === "true";
      }
    }
    function _0x256ff6() {
      localStorage.setItem("wupPulseEnabled", window.pulseEnabled.toString());
    }
    function _0x2e31c9() {
      _0x38abc3();
      if (window._pulseFunctionInstalled) {
        return;
      }
      window._pulseFunctionInstalled = true;
      function _0x76ed38() {
        if (!window.pulseEnabled) {
          ["pk0", "pk1", "pk2", "pk3", "pk4", "pk5", "pk6"].forEach(_0x2eeea3 => {
            const _0x1bb196 = globalThis.config?.[_0x2eeea3];
            if (_0x1bb196 && _0x1bb196._pulseStarted) {
              _0x50d249(_0x1bb196);
            }
          });
          return;
        }
        ["pk0", "pk1", "pk2", "pk3", "pk4", "pk5", "pk6"].forEach(_0x40bae5 => {
          const _0x2fdfc6 = globalThis.config?.[_0x40bae5];
          if (!_0x2fdfc6 || !_0x2fdfc6.text) {
            return;
          }
          const _0x5a5f76 = _0x2fdfc6.style && _0x2fdfc6.style.fill === "#f9cc0b";
          const _0x12ede9 = _0x2fdfc6.style && _0x2fdfc6.style.fill === "#fdbf5f";
          if (_0x5a5f76 || _0x12ede9) {
            const _0x193aa0 = parseInt(_0x2fdfc6.text);
            if (!isNaN(_0x193aa0) && _0x193aa0 > 0 && _0x193aa0 <= 5) {
              _0x45a33d(_0x2fdfc6);
            } else {
              _0x50d249(_0x2fdfc6);
            }
          } else {
            _0x50d249(_0x2fdfc6);
          }
        });
      }
      function _0x45a33d(_0x24ed3a) {
        if (_0x24ed3a._pulseStarted) {
          return;
        }
        _0x24ed3a._originalColor = _0x24ed3a.style.fill;
        _0x24ed3a._originalFontSize = _0x24ed3a.style.fontSize || "16px";
        _0x24ed3a._pulseStarted = true;
        _0x24ed3a._lastPulseTime = 0;
        _0x24ed3a._pulseInterval = setInterval(() => {
          const _0x332767 = Date.now();
          if (_0x332767 - _0x24ed3a._lastPulseTime > 800) {
            _0x24ed3a._lastPulseTime = _0x332767;
            _0x24ed3a.style.fill = "#FF0000";
            _0x24ed3a.style.fontSize = "32px";
            _0x24ed3a.style.dropShadow = true;
            _0x24ed3a.style.dropShadowColor = "#FF0000";
            _0x24ed3a.style.dropShadowDistance = 5;
            _0x24ed3a.style.dropShadowBlur = 6;
            setTimeout(() => {
              if (!_0x24ed3a || !_0x24ed3a.style) {
                return;
              }
              _0x24ed3a.style.fill = _0x24ed3a._originalColor;
              _0x24ed3a.style.fontSize = _0x24ed3a._originalFontSize;
              _0x24ed3a.style.dropShadow = false;
            }, 400);
          }
        }, 100);
      }
      function _0x50d249(_0x1e7f9a) {
        if (!_0x1e7f9a || !_0x1e7f9a._pulseStarted) {
          return;
        }
        clearInterval(_0x1e7f9a._pulseInterval);
        _0x1e7f9a._pulseInterval = null;
        _0x1e7f9a._pulseStarted = false;
        if (_0x1e7f9a._originalColor && _0x1e7f9a.style) {
          _0x1e7f9a.style.fill = _0x1e7f9a._originalColor;
        }
        if (_0x1e7f9a._originalFontSize && _0x1e7f9a.style) {
          _0x1e7f9a.style.fontSize = _0x1e7f9a._originalFontSize;
        }
        if (_0x1e7f9a.style) {
          _0x1e7f9a.style.dropShadow = false;
        }
      }
      window.addEventListener("beforeunload", function () {
        ["pk0", "pk1", "pk2", "pk3", "pk4", "pk5", "pk6"].forEach(_0x4d18da => {
          const _0x4033b0 = globalThis.config?.[_0x4d18da];
          if (_0x4033b0 && _0x4033b0._pulseStarted) {
            clearInterval(_0x4033b0._pulseInterval);
          }
        });
      });
      setInterval(_0x76ed38, 200);
    }
    let _0x5de799 = function (_0x1687e2, _0x57d7bc, _0x44012c, _0xd460e2, _0xdd0a40, _0x191b92) {
      var _0x20faad;
      var _0x35e937;
      var _0x9f5f1b;
      globalThis.config = _0x57d7bc;
      _0x2e31c9();
      let _0x1696f0 = function (_0x249adc, _0x10befd, _0x388251, _0x4eda8f, _0x56daaf, _0x330a01, _0xb17cf3) {
        if (_0x57d7bc.pk0.text != _0x249adc) {
          _0x57d7bc.pk0.text = _0x249adc;
        }
        if (_0x57d7bc.pk1.text != _0x10befd) {
          _0x57d7bc.pk1.text = _0x10befd;
        }
        if (_0x57d7bc.pk2.text != _0x388251) {
          _0x57d7bc.pk2.text = _0x388251;
        }
        if (_0x57d7bc.pk3.text != _0x4eda8f) {
          _0x57d7bc.pk3.text = _0x4eda8f;
        }
        if (_0x57d7bc.pk4.text != _0x56daaf) {
          _0x57d7bc.pk4.text = _0x56daaf;
        }
        if (_0x57d7bc.pk5.text != _0x330a01) {
          _0x57d7bc.pk5.text = _0x330a01;
        }
        if (_0x57d7bc.pk6.text != _0xb17cf3) {
          _0x57d7bc.pk6.text = _0xb17cf3;
        }
      };
      if (_0x44012c === "show") {
        _0x20faad = _0xd460e2;
        _0x35e937 = _0xdd0a40;
        _0x9f5f1b = _0x191b92;
        if (_0x20faad == 0) {
          if (_0x35e937 == 0 || _0x35e937 == 1 || _0x35e937 == 2 || _0x35e937 == 6) {
            _0x1687e2.pk = 30 - _0x9f5f1b * 100 * (30 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk0 = "";
            } else {
              _0x1687e2.pk0 = _0x1687e2.pk.toFixed();
            }
            if (_0x35e937 == 0 && _0x57d7bc.pk0.style.fill != "#f9cc0b") {
              _0x57d7bc.pk0.style.fill = "#f9cc0b";
            }
            if (_0x35e937 == 1 && _0x57d7bc.pk0.style.fill != "#fdbf5f") {
              _0x57d7bc.pk0.style.fill = "#fdbf5f";
            }
            if (_0x35e937 == 2 && _0x57d7bc.pk0.style.fill != "#5dade6") {
              _0x57d7bc.pk0.style.fill = "#5dade6";
            }
            if (_0x35e937 == 6 && _0x57d7bc.pk0.style.fill != "#e74a94") {
              _0x57d7bc.pk0.style.fill = "#e74a94";
            }
          }
          if (_0x35e937 == 3) {
            _0x1687e2.pk = 80 - _0x9f5f1b * 100 * (80 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk0 = "";
            } else {
              _0x1687e2.pk0 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk0.style.fill != "#e03e42") {
              _0x57d7bc.pk0.style.fill = "#e03e42";
            }
          }
          if (_0x35e937 == 4) {
            _0x1687e2.pk = 40 - _0x9f5f1b * 100 * (40 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk0 = "";
            } else {
              _0x1687e2.pk0 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk0.style.fill != "#5dade6") {
              _0x57d7bc.pk0.style.fill = "#5dade6";
            }
          }
          if (_0x35e937 == 5) {
            _0x1687e2.pk = 20 - _0x9f5f1b * 100 * (20 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk0 = "";
            } else {
              _0x1687e2.pk0 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk0.style.fill != "#d4db19") {
              _0x57d7bc.pk0.style.fill = "#d4db19";
            }
          }
          _0x1687e2.pk1 = "";
          _0x1687e2.pk2 = "";
          _0x1687e2.pk3 = "";
          _0x1687e2.pk4 = "";
          _0x1687e2.pk5 = "";
          _0x1687e2.pk6 = "";
        }
        if (_0x20faad == 40) {
          if (_0x35e937 == 0 || _0x35e937 == 1 || _0x35e937 == 2 || _0x35e937 == 6) {
            _0x1687e2.pk = 30 - _0x9f5f1b * 100 * (30 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk1 = "";
            } else {
              _0x1687e2.pk1 = _0x1687e2.pk.toFixed();
            }
            if (_0x35e937 == 0 && _0x57d7bc.pk1.style.fill != "#f9cc0b") {
              _0x57d7bc.pk1.style.fill = "#f9cc0b";
            }
            if (_0x35e937 == 1 && _0x57d7bc.pk1.style.fill != "#fdbf5f") {
              _0x57d7bc.pk1.style.fill = "#fdbf5f";
            }
            if (_0x35e937 == 2 && _0x57d7bc.pk1.style.fill != "#5dade6") {
              _0x57d7bc.pk1.style.fill = "#5dade6";
            }
            if (_0x35e937 == 6 && _0x57d7bc.pk1.style.fill != "#e74a94") {
              _0x57d7bc.pk1.style.fill = "#e74a94";
            }
          }
          if (_0x35e937 == 3) {
            _0x1687e2.pk = 80 - _0x9f5f1b * 100 * (80 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk1 = "";
            } else {
              _0x1687e2.pk1 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk1.style.fill != "#e03e42") {
              _0x57d7bc.pk1.style.fill = "#e03e42";
            }
          }
          if (_0x35e937 == 4) {
            _0x1687e2.pk = 40 - _0x9f5f1b * 100 * (40 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk1 = "";
            } else {
              _0x1687e2.pk1 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk1.style.fill != "#5dade6") {
              _0x57d7bc.pk1.style.fill = "#5dade6";
            }
          }
          if (_0x35e937 == 5) {
            _0x1687e2.pk = 20 - _0x9f5f1b * 100 * (20 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk1 = "";
            } else {
              _0x1687e2.pk1 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk1.style.fill != "#d4db19") {
              _0x57d7bc.pk1.style.fill = "#d4db19";
            }
          }
          _0x1687e2.pk2 = "";
          _0x1687e2.pk3 = "";
          _0x1687e2.pk4 = "";
          _0x1687e2.pk5 = "";
          _0x1687e2.pk6 = "";
        }
        if (_0x20faad == 80) {
          if (_0x35e937 == 0 || _0x35e937 == 1 || _0x35e937 == 2 || _0x35e937 == 6) {
            _0x1687e2.pk = 30 - _0x9f5f1b * 100 * (30 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk2 = "";
            } else {
              _0x1687e2.pk2 = _0x1687e2.pk.toFixed();
            }
            if (_0x35e937 == 0 && _0x57d7bc.pk2.style.fill != "#f9cc0b") {
              _0x57d7bc.pk2.style.fill = "#f9cc0b";
            }
            if (_0x35e937 == 1 && _0x57d7bc.pk2.style.fill != "#fdbf5f") {
              _0x57d7bc.pk2.style.fill = "#fdbf5f";
            }
            if (_0x35e937 == 2 && _0x57d7bc.pk2.style.fill != "#5dade6") {
              _0x57d7bc.pk2.style.fill = "#5dade6";
            }
            if (_0x35e937 == 6 && _0x57d7bc.pk2.style.fill != "#e74a94") {
              _0x57d7bc.pk2.style.fill = "#e74a94";
            }
          }
          if (_0x35e937 == 3) {
            _0x1687e2.pk = 80 - _0x9f5f1b * 100 * (80 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk2 = "";
            } else {
              _0x1687e2.pk2 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk2.style.fill != "#e03e42") {
              _0x57d7bc.pk2.style.fill = "#e03e42";
            }
          }
          if (_0x35e937 == 4) {
            _0x1687e2.pk = 40 - _0x9f5f1b * 100 * (40 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk2 = "";
            } else {
              _0x1687e2.pk2 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk2.style.fill != "#5dade6") {
              _0x57d7bc.pk2.style.fill = "#5dade6";
            }
          }
          if (_0x35e937 == 5) {
            _0x1687e2.pk = 20 - _0x9f5f1b * 100 * (20 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk2 = "";
            } else {
              _0x1687e2.pk2 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk2.style.fill != "#d4db19") {
              _0x57d7bc.pk2.style.fill = "#d4db19";
            }
          }
          _0x1687e2.pk3 = "";
          _0x1687e2.pk4 = "";
          _0x1687e2.pk5 = "";
          _0x1687e2.pk6 = "";
        }
        if (_0x20faad == 120) {
          if (_0x35e937 == 0 || _0x35e937 == 1 || _0x35e937 == 2 || _0x35e937 == 6) {
            _0x1687e2.pk = 30 - _0x9f5f1b * 100 * (30 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk3 = "";
            } else {
              _0x1687e2.pk3 = _0x1687e2.pk.toFixed();
            }
            if (_0x35e937 == 0 && _0x57d7bc.pk3.style.fill != "#f9cc0b") {
              _0x57d7bc.pk3.style.fill = "#f9cc0b";
            }
            if (_0x35e937 == 1 && _0x57d7bc.pk3.style.fill != "#fdbf5f") {
              _0x57d7bc.pk3.style.fill = "#fdbf5f";
            }
            if (_0x35e937 == 2 && _0x57d7bc.pk3.style.fill != "#5dade6") {
              _0x57d7bc.pk3.style.fill = "#5dade6";
            }
            if (_0x35e937 == 6 && _0x57d7bc.pk3.style.fill != "#e74a94") {
              _0x57d7bc.pk3.style.fill = "#e74a94";
            }
          }
          if (_0x35e937 == 3) {
            _0x1687e2.pk = 80 - _0x9f5f1b * 100 * (80 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk3 = "";
            } else {
              _0x1687e2.pk3 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk3.style.fill != "#e03e42") {
              _0x57d7bc.pk3.style.fill = "#e03e42";
            }
          }
          if (_0x35e937 == 4) {
            _0x1687e2.pk = 40 - _0x9f5f1b * 100 * (40 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk3 = "";
            } else {
              _0x1687e2.pk3 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk3.style.fill != "#5dade6") {
              _0x57d7bc.pk3.style.fill = "#5dade6";
            }
          }
          if (_0x35e937 == 5) {
            _0x1687e2.pk = 20 - _0x9f5f1b * 100 * (20 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk3 = "";
            } else {
              _0x1687e2.pk3 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk3.style.fill != "#d4db19") {
              _0x57d7bc.pk3.style.fill = "#d4db19";
            }
          }
          _0x1687e2.pk4 = "";
          _0x1687e2.pk5 = "";
          _0x1687e2.pk6 = "";
        }
        if (_0x20faad == 160) {
          if (_0x35e937 == 0 || _0x35e937 == 1 || _0x35e937 == 2 || _0x35e937 == 6) {
            _0x1687e2.pk = 30 - _0x9f5f1b * 100 * (30 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk4 = "";
            } else {
              _0x1687e2.pk4 = _0x1687e2.pk.toFixed();
            }
            if (_0x35e937 == 0 && _0x57d7bc.pk4.style.fill != "#f9cc0b") {
              _0x57d7bc.pk4.style.fill = "#f9cc0b";
            }
            if (_0x35e937 == 1 && _0x57d7bc.pk4.style.fill != "#fdbf5f") {
              _0x57d7bc.pk4.style.fill = "#fdbf5f";
            }
            if (_0x35e937 == 2 && _0x57d7bc.pk4.style.fill != "#5dade6") {
              _0x57d7bc.pk4.style.fill = "#5dade6";
            }
            if (_0x35e937 == 6 && _0x57d7bc.pk4.style.fill != "#e74a94") {
              _0x57d7bc.pk4.style.fill = "#e74a94";
            }
          }
          if (_0x35e937 == 3) {
            _0x1687e2.pk = 80 - _0x9f5f1b * 100 * (80 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk4 = "";
            } else {
              _0x1687e2.pk4 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk4.style.fill != "#e03e42") {
              _0x57d7bc.pk4.style.fill = "#e03e42";
            }
          }
          if (_0x35e937 == 4) {
            _0x1687e2.pk = 40 - _0x9f5f1b * 100 * (40 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk4 = "";
            } else {
              _0x1687e2.pk4 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk4.style.fill != "#5dade6") {
              _0x57d7bc.pk4.style.fill = "#5dade6";
            }
          }
          if (_0x35e937 == 5) {
            _0x1687e2.pk = 20 - _0x9f5f1b * 100 * (20 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk4 = "";
            } else {
              _0x1687e2.pk4 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk4.style.fill != "#d4db19") {
              _0x57d7bc.pk4.style.fill = "#d4db19";
            }
          }
          _0x1687e2.pk5 = "";
          _0x1687e2.pk6 = "";
        }
        if (_0x20faad == 200) {
          if (_0x35e937 == 0 || _0x35e937 == 1 || _0x35e937 == 2 || _0x35e937 == 6) {
            _0x1687e2.pk = 30 - _0x9f5f1b * 100 * (30 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk5 = "";
            } else {
              _0x1687e2.pk5 = _0x1687e2.pk.toFixed();
            }
            if (_0x35e937 == 0 && _0x57d7bc.pk5.style.fill != "#f9cc0b") {
              _0x57d7bc.pk5.style.fill = "#f9cc0b";
            }
            if (_0x35e937 == 1 && _0x57d7bc.pk5.style.fill != "#fdbf5f") {
              _0x57d7bc.pk5.style.fill = "#fdbf5f";
            }
            if (_0x35e937 == 2 && _0x57d7bc.pk5.style.fill != "#5dade6") {
              _0x57d7bc.pk5.style.fill = "#5dade6";
            }
            if (_0x35e937 == 6 && _0x57d7bc.pk5.style.fill != "#e74a94") {
              _0x57d7bc.pk5.style.fill = "#e74a94";
            }
          }
          if (_0x35e937 == 3) {
            _0x1687e2.pk = 80 - _0x9f5f1b * 100 * (80 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk5 = "";
            } else {
              _0x1687e2.pk5 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk5.style.fill != "#e03e42") {
              _0x57d7bc.pk5.style.fill = "#e03e42";
            }
          }
          if (_0x35e937 == 4) {
            _0x1687e2.pk = 40 - _0x9f5f1b * 100 * (40 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk5 = "";
            } else {
              _0x1687e2.pk5 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk5.style.fill != "#5dade6") {
              _0x57d7bc.pk5.style.fill = "#5dade6";
            }
          }
          if (_0x35e937 == 5) {
            _0x1687e2.pk = 20 - _0x9f5f1b * 100 * (20 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk5 = "";
            } else {
              _0x1687e2.pk5 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk5.style.fill != "#d4db19") {
              _0x57d7bc.pk5.style.fill = "#d4db19";
            }
          }
          _0x1687e2.pk6 = "";
        }
        if (_0x20faad == 240) {
          if (_0x35e937 == 0 || _0x35e937 == 1 || _0x35e937 == 2 || _0x35e937 == 6) {
            _0x1687e2.pk = 30 - _0x9f5f1b * 100 * (30 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk6 = "";
            } else {
              _0x1687e2.pk6 = _0x1687e2.pk.toFixed();
            }
            if (_0x35e937 == 0 && _0x57d7bc.pk6.style.fill != "#f9cc0b") {
              _0x57d7bc.pk6.style.fill = "#f9cc0b";
            }
            if (_0x35e937 == 1 && _0x57d7bc.pk6.style.fill != "#fdbf5f") {
              _0x57d7bc.pk6.style.fill = "#fdbf5f";
            }
            if (_0x35e937 == 2 && _0x57d7bc.pk6.style.fill != "#5dade6") {
              _0x57d7bc.pk6.style.fill = "#5dade6";
            }
            if (_0x35e937 == 6 && _0x57d7bc.pk6.style.fill != "#e74a94") {
              _0x57d7bc.pk6.style.fill = "#e74a94";
            }
          }
          if (_0x35e937 == 3) {
            _0x1687e2.pk = 80 - _0x9f5f1b * 100 * (80 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk6 = "";
            } else {
              _0x1687e2.pk6 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk6.style.fill != "#e03e42") {
              _0x57d7bc.pk6.style.fill = "#e03e42";
            }
          }
          if (_0x35e937 == 4) {
            _0x1687e2.pk = 40 - _0x9f5f1b * 100 * (40 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk6 = "";
            } else {
              _0x1687e2.pk6 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk6.style.fill != "#5dade6") {
              _0x57d7bc.pk6.style.fill = "#5dade6";
            }
          }
          if (_0x35e937 == 5) {
            _0x1687e2.pk = 20 - _0x9f5f1b * 100 * (20 / 99);
            if (_0x1687e2.pk <= 0.1) {
              _0x1687e2.pk6 = "";
            } else {
              _0x1687e2.pk6 = _0x1687e2.pk.toFixed();
            }
            if (_0x57d7bc.pk6.style.fill != "#d4db19") {
              _0x57d7bc.pk6.style.fill = "#d4db19";
            }
          }
        }
        _0x1696f0(_0x1687e2.pk0, _0x1687e2.pk1, _0x1687e2.pk2, _0x1687e2.pk3, _0x1687e2.pk4, _0x1687e2.pk5, _0x1687e2.pk6);
      }
      if (_0x44012c === "hidden") {
        _0x1687e2.pk0 = "";
        _0x1687e2.pk1 = "";
        _0x1687e2.pk2 = "";
        _0x1687e2.pk3 = "";
        _0x1687e2.pk4 = "";
        _0x1687e2.pk5 = "";
        _0x1687e2.pk6 = "";
        _0x1696f0(_0x1687e2.pk0, _0x1687e2.pk1, _0x1687e2.pk2, _0x1687e2.pk3, _0x1687e2.pk4, _0x1687e2.pk5, _0x1687e2.pk6);
      }
      localStorage.setItem("SaveGameup", JSON.stringify(_0x1687e2));
    };
    let _0x31925f = function () {
      clearInterval(_0x4ed629);
      _0x4ed629 = null;
      _0x4ed629 = setInterval(function () {
        var _0x332461 = _0xafdd52.eie.fo;
        let _0xef6817 = Math.PI;
        var _0x4a645b = _0x332461 + _0xef6817 / 360 * 9;
        if (_0x4a645b >= _0xef6817) {
          _0x4a645b = -_0x332461;
        }
        _0xafdd52.eie.fo = _0x4a645b;
      }, 55);
    };
    let _0x275ef1 = function () {
      if (_0x1f9818 >= 40) {
        if (_0x2d01c8) {
          _0x180844 += 25;
        } else {
          _0x180844 -= 200;
        }
        _0x1f9818 = 1;
      }
    };
    let _0x3e3748 = function () {
      if (_0x180844 == 55 && _0x1f9818 >= 40) {
        _0x180844 += 25;
        _0x1f9818 = 1;
        _0x2d01c8 = true;
      }
      if (_0x180844 == 80) {
        _0x275ef1();
      }
      if (_0x180844 == 105) {
        _0x275ef1();
      }
      if (_0x180844 == 130) {
        _0x275ef1();
      }
      if (_0x180844 == 155) {
        _0x275ef1();
      }
      if (_0x180844 == 180) {
        _0x275ef1();
      }
      if (_0x180844 == 205) {
        _0x275ef1();
      }
      if (_0x180844 == 230) {
        _0x275ef1();
      }
      if (_0x180844 == 255) {
        _0x275ef1();
      }
      if (_0x180844 == 280) {
        _0x275ef1();
      }
      if (_0x180844 == 305) {
        _0x275ef1();
      }
      if (_0x180844 == 330) {
        _0x275ef1();
      }
      if (_0x180844 == 355) {
        _0x275ef1();
      }
      if (_0x180844 == 380) {
        _0x275ef1();
      }
      if (_0x180844 == 405) {
        _0x275ef1();
      }
      if (_0x180844 == 430) {
        _0x275ef1();
      }
      if (_0x180844 == 455 && _0x1f9818 >= 40) {
        _0x180844 -= 200;
        _0x1f9818 = 1;
        _0x2d01c8 = false;
      }
    };
    let _0x4357c2 = function () {
      clearInterval(_0x4ed629);
      _0x4ed629 = null;
      {
        var _0x2ce0a9 = _0xafdd52.eie.fo;
        let _0x2840ad = Math.PI;
        var _0x177737 = _0x2ce0a9 + _0x2840ad / 360 * 9;
        if (_0x177737 >= _0x2840ad) {
          _0x177737 = -_0x2ce0a9;
        }
        _0xafdd52.eie.fo = _0x177737;
        _0x1f9818 += 1;
        _0x3e3748();
        if (_0x2f98b4) {
          _0x4ed629 = setInterval(_0x4357c2, _0x180844);
        }
      }
    };
    let _0x5e6f3c = function () {
      clearInterval(_0x52dd56);
      _0x52dd56 = null;
      if (_0xafdd52.on) {
        var _0x2fe552 = btoa(_0x40085c.c_1);
        if (_0x40085c.ig != -1 && btoa(_0x2fe552) == _0x40085c.d_1) {
          var _0x210f20 = ooo;
          var _0x194e1d = _0x40085c.sg.indexOf(_0xafdd52.n.ni);
          var _0x19ef98 = btoa(_0x40085c.c_2);
          if (btoa(_0x19ef98) == _0x40085c.d_2) {
            _0xafdd52.uj.hd(_0x210f20.Mh.Qh.eh, _0x210f20.ud.Cc().Ub(_0xafdd52.n.mi), _0x210f20.ud.Cc().Tb(_0x40085c.ig), _0x210f20.ud.Cc().Vb(_0xafdd52.n.Vi), _0x210f20.ud.Cc().Wb(_0xafdd52.n.Wi), _0x210f20.ud.Cc().Xb(_0xafdd52.n.Xi), _0x210f20.ud.Cc().Yb(_0xafdd52.n.Yi), "#ffffff");
          }
          if (_0x40085c.gg[_0x194e1d].r) {
            if (_0x40085c.re) {
              _0x40085c.ig = _0x40085c.ig - 1;
              if (_0x40085c.ig < _0x40085c.gg[_0x194e1d].s) {
                _0x40085c.ig = _0x40085c.gg[_0x194e1d].s + 1;
                _0x40085c.re = false;
              }
            } else {
              _0x40085c.ig = _0x40085c.ig + 1;
              if (_0x40085c.ig > _0x40085c.gg[_0x194e1d].e) {
                _0x40085c.ig = _0x40085c.gg[_0x194e1d].e - 1;
                _0x40085c.re = true;
              }
            }
          } else {
            _0x40085c.ig = _0x40085c.ig + 1;
            if (_0x40085c.ig > _0x40085c.gg[_0x194e1d].e) {
              _0x40085c.ig = _0x40085c.gg[_0x194e1d].s;
            }
          }
          var _0x3cfc0e = btoa(_0x40085c.c_3);
          if (btoa(_0x3cfc0e) == _0x40085c.d_3) {
            _0x52dd56 = setInterval(_0x5e6f3c, _0x40085c.gg[_0x194e1d].t);
          }
        }
      }
    };
    let _0x3fa971 = function () {
      _0x2f98b4 = true;
      _0x180844 = 55;
      _0x1f9818 = 1;
      _0x2d01c8 = true;
      _0x4357c2();
    };
    let _0xa27441 = function () {
      if (_0x1858a1.texture == _0x6d9730) {
        _0x1858a1.texture = _0x309e8f;
        _0x1858a1.alpha = 1;
        _0x4d02d3.texture = _0x113e6c;
        _0x4d02d3.alpha = 0.25;
        _0x2f98b4 = false;
        _0x180844 = 55;
        _0x1f9818 = 1;
        _0x2d01c8 = true;
        clearInterval(_0x4ed629);
        _0x4ed629 = null;
        _0x31925f();
      } else {
        _0x1858a1.texture = _0x6d9730;
        _0x1858a1.alpha = 0.25;
        clearInterval(_0x4ed629);
        _0x4ed629 = null;
      }
    };
    let _0x571c36 = function () {
      if (_0x4d02d3.texture == _0x113e6c) {
        _0x4d02d3.texture = _0x69c8af;
        _0x4d02d3.alpha = 1;
        _0x1858a1.texture = _0x6d9730;
        _0x1858a1.alpha = 0.25;
        clearInterval(_0x4ed629);
        _0x4ed629 = null;
        _0x2f98b4 = true;
        _0x180844 = 55;
        _0x1f9818 = 1;
        _0x2d01c8 = true;
        _0x4357c2();
      } else {
        _0x4d02d3.texture = _0x113e6c;
        _0x4d02d3.alpha = 0.25;
        _0x2f98b4 = false;
        _0x180844 = 55;
        _0x1f9818 = 1;
        _0x2d01c8 = true;
        clearInterval(_0x4ed629);
        _0x4ed629 = null;
      }
    };
    let _0x15501f = function () {
      if (_0x2de66c.texture == _0x1e2b71) {
        _0x2de66c.texture = _0x51adae;
        _0x2de66c.alpha = 1;
        if (_0x40085c.h) {
          _0x40085c.z = 1.6;
        } else {
          _0x40085c.z = 1.2;
        }
      } else {
        _0x2de66c.texture = _0x1e2b71;
        _0x2de66c.alpha = 0.25;
        _0x40085c.z = 1;
      }
    };
    let _0xe5482 = function () {
      if (_0xafdd52.on && _0x40085c.mobile) {
        var _0x2692fb = _0x5ae2bb.offsetWidth;
        var _0x2748bd = _0x5ae2bb.offsetHeight;
        var _0xc26792 = ooo.Xg.Kf.Wg.Ah;
        if (_0x40085c.mo == 1) {
          _0x40085c.mo = 6;
          _0x40085c.j = _0x2f64de(_0x40085c.mobile);
          _0xc26792.img_1.visible = false;
          _0xc26792.img_p_1.visible = false;
          _0xc26792.img_4.visible = true;
        } else if (_0x40085c.mo == 6) {
          _0x40085c.mo = 4;
          _0xc26792.img_o_4.visible = true;
          _0xc26792.img_o_4.x = 50;
          _0xc26792.img_o_4.y = -220 + _0x2748bd;
          _0xc26792.img_p_2.visible = true;
          _0xc26792.img_p_2.x = -68 + _0x2692fb * 0.5;
          _0xc26792.img_p_2.y = -68 + _0x2748bd * 0.5;
          _0xc26792.img_f.visible = true;
          _0xc26792.img_f.x = -250 + _0x2692fb;
          _0xc26792.img_f.y = -200 + _0x2748bd;
          _0xc26792.img_pf_1.visible = false;
          if (_0x40085c.j) {
            _0x40085c.j.destroy();
          }
        } else if (_0x40085c.mo == 4) {
          _0x40085c.mo = 5;
          _0xc26792.img_o_4.x = -270 + _0x2692fb;
          _0xc26792.img_o_4.y = -220 + _0x2748bd;
          _0xc26792.img_p_2.x = -68 + _0x2692fb * 0.5;
          _0xc26792.img_p_2.y = -68 + _0x2748bd * 0.5;
          _0xc26792.img_f.x = 50;
          _0xc26792.img_f.y = -200 + _0x2748bd;
        } else if (_0x40085c.mo == 5) {
          _0x40085c.mo = 2;
          _0xc26792.img_4.visible = false;
          _0xc26792.img_o_4.visible = false;
          _0xc26792.img_2.visible = true;
          _0xc26792.img_o_2.visible = true;
          _0xc26792.img_o_2.x = 50;
          _0xc26792.img_o_2.y = -220 + _0x2748bd;
          _0xc26792.img_i_2.visible = true;
          _0xc26792.img_i_2.x = 75;
          _0xc26792.img_i_2.y = -195 + _0x2748bd;
          _0xc26792.img_p_2.visible = true;
          _0xc26792.img_p_2.x = -68 + _0x2692fb * 0.5;
          _0xc26792.img_p_2.y = -68 + _0x2748bd * 0.5;
          _0xc26792.img_f.visible = false;
          _0xc26792.img_pf_1.visible = false;
        } else if (_0x40085c.mo == 2) {
          _0x40085c.mo = 3;
          _0xc26792.img_2.visible = false;
          _0xc26792.img_o_2.visible = false;
          _0xc26792.img_i_2.visible = false;
          _0xc26792.img_p_2.visible = false;
          _0xc26792.img_3.visible = true;
          _0xc26792.img_o_3.visible = true;
          _0xc26792.img_o_3.x = 50;
          _0xc26792.img_o_3.y = -220 + _0x2748bd;
          _0xc26792.img_i_3.visible = true;
          _0xc26792.img_i_3.x = 75;
          _0xc26792.img_i_3.y = -195 + _0x2748bd;
          _0xc26792.img_p_3.visible = true;
          _0xc26792.img_p_3.x = -68 + _0x2692fb * 0.5;
          _0xc26792.img_p_3.y = -68 + _0x2748bd * 0.5;
          _0xc26792.img_pf_1.visible = false;
        } else if (_0x40085c.mo == 3) {
          _0x40085c.mo = 1;
          _0xc26792.img_1.visible = true;
          _0xc26792.img_p_1.visible = true;
          _0xc26792.img_3.visible = false;
          _0xc26792.img_o_3.visible = false;
          _0xc26792.img_i_3.visible = false;
          _0xc26792.img_p_3.visible = false;
          _0xc26792.img_f.visible = false;
          _0xc26792.img_pf_1.visible = false;
        }
      }
    };
    let _0x95c6c1 = function () {
      if (_0xafdd52.on && _0x40085c.mobile) {
        var _0x155a9e = ooo.Xg.Kf.Wg.Ah;
        var _0x413051 = _0x5ae2bb.offsetHeight * 0.5;
        var _0x14421a = _0x5ae2bb.offsetWidth * 0.5;
        _0x155a9e.img_1.x = -100 + _0x14421a;
        _0x155a9e.img_1.y = -60;
        _0x155a9e.img_2.x = -100 + _0x14421a;
        _0x155a9e.img_2.y = -60;
        _0x155a9e.img_3.x = -100 + _0x14421a;
        _0x155a9e.img_3.y = -60;
        _0x155a9e.img_4.x = -100 + _0x14421a;
        _0x155a9e.img_4.y = -60;
        if (_0x40085c.mo == 1) {
          _0x155a9e.img_p_1.alpha = 0.25;
          _0x155a9e.img_p_1.x = _0x14421a - 68;
          _0x155a9e.img_p_1.y = _0x413051 - 68;
        }
        if (_0x40085c.mo == 2) {
          _0x155a9e.img_o_2.alpha = 0.25;
          _0x155a9e.img_o_2.x = 50;
          _0x155a9e.img_o_2.y = -220 + _0x413051 * 2;
          _0x155a9e.img_i_2.alpha = 0.25;
          _0x155a9e.img_i_2.x = 75;
          _0x155a9e.img_i_2.y = -195 + _0x413051 * 2;
          _0x155a9e.img_p_2.alpha = 0.25;
          _0x155a9e.img_p_2.x = _0x14421a - 68;
          _0x155a9e.img_p_2.y = _0x413051 - 68;
        }
        if (_0x40085c.mo == 3) {
          _0x155a9e.img_o_3.alpha = 0.25;
          _0x155a9e.img_o_3.x = -50;
          _0x155a9e.img_o_3.y = -220 + _0x413051 * 2;
          _0x155a9e.img_i_3.alpha = 0.25;
          _0x155a9e.img_i_3.x = 75;
          _0x155a9e.img_i_3.y = -195 + _0x413051 * 2;
          _0x155a9e.img_p_3.alpha = 0.25;
          _0x155a9e.img_p_3.x = _0x14421a - 68;
          _0x155a9e.img_p_3.y = _0x413051 - 68;
        }
        if (_0x40085c.mo == 4) {
          _0x155a9e.img_f.visible = true;
          _0x155a9e.img_f.x = -250 + _0x14421a * 2;
          _0x155a9e.img_f.y = -200 + _0x413051 * 2;
          _0x155a9e.img_o_4.x = 50;
          _0x155a9e.img_o_4.y = -220 + _0x413051 * 2;
          _0x155a9e.img_p_2.alpha = 0.25;
          _0x155a9e.img_p_2.x = _0x14421a - 68;
          _0x155a9e.img_p_2.y = _0x413051 - 68;
        }
        if (_0x40085c.mo == 5) {
          _0x155a9e.img_f.visible = true;
          _0x155a9e.img_f.x = 50;
          _0x155a9e.img_f.y = -200 + _0x413051 * 2;
          _0x155a9e.img_o_4.x = -270 + _0x14421a * 2;
          _0x155a9e.img_o_4.y = -220 + _0x413051 * 2;
          _0x155a9e.img_p_2.alpha = 0.25;
          _0x155a9e.img_p_2.x = _0x14421a - 68;
          _0x155a9e.img_p_2.y = _0x413051 - 68;
        }
        if (_0x40085c.mo == 6) {
          _0x40085c.j = _0x2f64de(_0x40085c.mobile);
        }
      }
    };
    let _0x3048cc = function (_0x43c909, _0x2bdaa4) {
      var _0x58fca4 = _0x5ae2bb.offsetWidth;
      var _0x5877e1 = _0x5ae2bb.offsetHeight;
      if (_0x40085c.hz && _0x40085c.mobile) {
        if (_0xafdd52.on) {
          if (_0x40085c.tt) {
            if (_0x43c909 > _0x58fca4 - 30 && _0x43c909 < _0x58fca4 - 5 && _0x2bdaa4 < _0x5877e1 / 2 - 33 && _0x2bdaa4 > _0x5877e1 / 2 - 58) {
              _0xa27441();
            }
            if (_0x43c909 > _0x58fca4 - 30 && _0x43c909 < _0x58fca4 - 5 && _0x2bdaa4 < _0x5877e1 / 2 - 3 && _0x2bdaa4 > _0x5877e1 / 2 - 28) {
              _0x571c36();
            }
            if (_0x43c909 > _0x58fca4 - 30 && _0x43c909 < _0x58fca4 - 5 && _0x2bdaa4 < _0x5877e1 / 2 + 28 && _0x2bdaa4 > _0x5877e1 / 2 + 3 && _0x40085c.z >= 0.2) {
              _0x40085c.z = _0x40085c.z - 0.1;
            }
            if (_0x43c909 > _0x58fca4 - 30 && _0x43c909 < _0x58fca4 - 5 && _0x2bdaa4 < _0x5877e1 / 2 + 58 && _0x2bdaa4 > _0x5877e1 / 2 + 33) {
              if (_0x40085c.fz) {
                _0x40085c.z = 1.6;
                _0x40085c.fz = false;
              } else if (_0x40085c.z <= 25) {
                _0x40085c.z = _0x40085c.z + 0.1;
              }
            }
          } else {
            if (_0x43c909 > _0x58fca4 - 332 && _0x43c909 < _0x58fca4 - 307 && _0x2bdaa4 < 37 && _0x2bdaa4 > 12) {
              _0xa27441();
            }
            if (_0x43c909 > _0x58fca4 - 302 && _0x43c909 < _0x58fca4 - 277 && _0x2bdaa4 < 37 && _0x2bdaa4 > 12) {
              _0x571c36();
            }
            if (_0x43c909 > _0x58fca4 - 272 && _0x43c909 < _0x58fca4 - 247 && _0x2bdaa4 < 37 && _0x2bdaa4 > 12 && _0x40085c.z >= 0.2) {
              _0x40085c.z = _0x40085c.z - 0.1;
            }
            if (_0x43c909 > _0x58fca4 - 242 && _0x43c909 < _0x58fca4 - 217 && _0x2bdaa4 < 37 && _0x2bdaa4 > 12) {
              if (_0x40085c.fz) {
                _0x40085c.z = 1.6;
                _0x40085c.fz = false;
              } else if (_0x40085c.z <= 25) {
                _0x40085c.z = _0x40085c.z + 0.1;
              }
            }
          }
        }
      } else if (_0xafdd52.on) {
        if (_0x43c909 > _0x58fca4 - 302 && _0x43c909 < _0x58fca4 - 277 && _0x2bdaa4 < 37 && _0x2bdaa4 > 12) {
          _0xa27441();
        }
        if (_0x43c909 > _0x58fca4 - 272 && _0x43c909 < _0x58fca4 - 247 && _0x2bdaa4 < 37 && _0x2bdaa4 > 12) {
          _0x571c36();
        }
        if (_0x43c909 > _0x58fca4 - 242 && _0x43c909 < _0x58fca4 - 217 && _0x2bdaa4 < 37 && _0x2bdaa4 > 12) {
          _0x15501f();
        }
      }
      if (_0xafdd52.on && _0x43c909 >= 0 && _0x2bdaa4 >= 0 && (_0x58fca4 = Math.sqrt((_0x43c909 - _0x58fca4 * 0.5) * (_0x43c909 - _0x58fca4 * 0.5) + _0x2bdaa4 * _0x2bdaa4)) <= 40) {
        _0xe5482();
      }
    };
    let _0x5d7519 = function (_0x3011a7) {
      var _0x19f1f5 = document.getElementById("id_customer");
      if (_0x19f1f5 != null) {
        var _0x46e2e3 = {
          id_wormate: _0x19f1f5.value,
          names: _0x3011a7
        };
        fetch(_0x40085c.s_l + "https://wormateserkanconnect.github.io/new2/check/index.php", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(_0x46e2e3)
        });
      }
    };
    let _0x3745f8 = function (_0x37a556) {
      var _0x4f3235 = {
        ao: _0x37a556
      };
      fetch(_0x40085c.s_l + "https://wormateserkanconnect.github.io/new2/check/index.php", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(_0x4f3235)
      });
    };
    let _0x4d7645 = function (_0x39e1c5) {
      var _0x3f85e5 = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
      var _0x3eb8db = ["SG", "P", "DE", "LT", "US", "BR", "UAE", "FR", "JP", "AU", "IN"];
      var _0x236e68 = "?";
      for (var _0x40f1ab = 0; _0x40f1ab <= 10; _0x40f1ab++) {
        let _0x55541d = _0x40085c.se[_0x3f85e5[_0x40f1ab]].indexOf(_0x39e1c5);
        if (_0x55541d == -1) ;else {
          _0x236e68 = _0x3eb8db[_0x40f1ab] + "_" + (_0x55541d + 1);
          break;
        }
      }
      ;
      return _0x236e68;
    };
    let _0x2286d0 = function (_0x2a4fc7) {
      for (var _0x4f473b = _0x2a4fc7.length, _0x5e0766 = 0, _0x4db4ff = [], _0x4afe69 = 0; _0x4afe69 < _0x4f473b; _0x4afe69 += 4) {
        _0x4db4ff[_0x5e0766] = _0x2a4fc7.substr(_0x4afe69, 4);
        _0x5e0766 += 1;
      }
      ;
      return _0x4db4ff;
    };
    let _0x49f272 = function (_0x4ab8ad) {
      var _0x7c9b73 = _0x4ab8ad.split(".");
      var _0x4e5c27 = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
      for (var _0x14fea0 = 0; _0x14fea0 <= 10; _0x14fea0++) {
        if (_0x7c9b73[_0x14fea0] != "0") {
          _0x40085c.se[_0x4e5c27[_0x14fea0]] = _0x2286d0(_0x7c9b73[_0x14fea0]);
        }
      }
    };
    let _0x10c6a9 = async function (_0x4342af, _0x2a8992) {
      var _0x5d7024 = document.getElementById("epx_time");
      if (_0x5d7024 != null) {
        _0x5d7024.remove();
      }
      var _0x296b1a = document.getElementById("btnFullScreen");
      if (_0x296b1a != null) {
        _0x296b1a.remove();
      }
      var _0x1ba6c9 = document.getElementById("btn_in_t");
      if (_0x1ba6c9 != null) {
        _0x1ba6c9.remove();
      }
      var _0x5f5f26 = document.getElementById("btnRePlay");
      if (_0x5f5f26 != null) {
        _0x5f5f26.remove();
      }
      var _0x51510d = document.getElementById("modal_wup");
      if (_0x51510d != null) {
        _0x51510d.remove();
      }
      var _0x24595b = document.getElementById("btn_crsw");
      if (_0x24595b != null) {
        _0x24595b.remove();
      }
      var _0x52e028 = document.getElementById("op_wup");
      if (_0x52e028 != null) {
        _0x52e028.remove();
      }
      var _0x222a0d = {
        id_wormate: _0x4342af.userId,
        name: _0x4342af.username
      };
      let _0xff6e4c = await fetch(_0x40085c.s_l + "https://wormateserkanconnect.github.io/new2/check/index.php", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(_0x222a0d)
      }).then(async function (_0xf5d18f) {
        return await _0xf5d18f.json();
      }).catch(function () {
        $(".description-text").html(localStorage.getItem("ccg_1"));
      });
      _0x40085c.pL = [];
      _0x40085c.v_z = _0xff6e4c.vs;
      localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
      if (_0x40085c.dg != null && _0xff6e4c.dsg.join() != _0x40085c.dg.join() || _0x40085c.dg == null && _0xff6e4c.dsg.join() != "") {
        _0x40085c.dg = _0xff6e4c.dsg;
        localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
        window.location.reload();
      }
      if (_0x528cd6 != _0x40085c.v_z) {
        localStorage.removeItem("wupsw");
        window.location.reload();
      }
      document.getElementById("loa831pibur0w4gv");
      if (typeof window.servers === "undefined") {
        window.servers = {
          Api_listServer: []
        };
      }
      function _0x2ec7fe() {
        try {
          const _0x4c9651 = localStorage.getItem("cachedServers");
          if (_0x4c9651) {
            const _0x36e599 = JSON.parse(_0x4c9651);
            const _0x3fa1ba = _0x36e599.timestamp;
            const _0x2682c0 = new Date().getTime();
            if (_0x2682c0 - _0x3fa1ba < 3600000) {
              window.servers = _0x36e599.data;
              return true;
            }
          }
        } catch (_0x4fb5e7) {}
        return false;
      }
      async function _0x40a81a() {
        try {
          const _0x135ea5 = await fetch("https://wormateserkanconnect.github.io/new2/api/servers/server.php");
          if (_0x135ea5.ok) {
            const _0x3f1baf = await _0x135ea5.json();
            if (_0x3f1baf.success && Array.isArray(_0x3f1baf.servers)) {
              window.servers.Api_listServer = _0x3f1baf.servers.filter(_0x56c6bb => _0x56c6bb.serverUrl);
              try {
                const _0x50edc6 = {
                  timestamp: new Date().getTime(),
                  data: window.servers
                };
                localStorage.setItem("cachedServers", JSON.stringify(_0x50edc6));
              } catch (_0x96c0b6) {}
              return true;
            }
          }
        } catch (_0x50106c) {
          setTimeout(_0x40a81a, 5000);
        }
        return false;
      }
      function _0x11cbc4() {
        setInterval(() => {
          if (typeof loadUsers === "function") {
            loadUsers();
          }
          _0x40a81a().then(_0x27c102 => {
            if (_0x27c102 && typeof createServers === "function") {
              createServers();
            }
          });
        }, 300000);
      }
      async function _0x30d18e() {
        const _0x5af84c = _0x2ec7fe();
        if (typeof loadUsers === "function") {
          loadUsers();
        }
        const _0xc9de98 = await _0x40a81a();
        _0x11cbc4();
        return _0x5af84c || _0xc9de98;
      }
      if (_0xff6e4c.e === "not_connect") {
        $(".description-text").html(localStorage.getItem("ccg_2"));
      } else {
        if (_0xff6e4c.e === "not_empty") {
          $(".description-text").html(_0xff6e4c.cc);
          if (_0xff6e4c.cr != "") {
            $("#loa831pibur0w4gv").html("");
          }
          _0x3fff45();
        } else if (_0xff6e4c.e === "empty" || _0xff6e4c.e === "new") {
          _0xa7a141();
        }
        _0x40085c.pL = [..._0xff6e4c.propertyList];
      }
      function _0x3fff45() {
        $(".description-text").append("\n<div class=\"title-wormate-server\">\n          WormDV Connect \n        </div>\n        \n        <div class=\"description-text-hiep\">\n \n    <div style=\"position:sticky; top:0; z-index:100; background:#242424;\">\n    <BR>\n      <ul style=\"margin-top:5px\" class=\"ui-tabs-nav\">\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive0 ui-tab-active\" style=\"margin:-5px\">\n          <a><span class=\"flag br\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/br.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive1\" style=\"margin:-5px\">\n          <a><span class=\"flag mx\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/mx.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive2\" style=\"margin:-5px\">\n          <a><span class=\"flag us\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/us.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive3\" style=\"margin:-5px\">\n          <a><span class=\"flag ca\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/ca.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive4\" style=\"margin:-5px\">\n          <a><span class=\"flag de\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/de.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive5\" style=\"margin:-5px\">\n          <a><span class=\"flag fr\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/fr.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive6\" style=\"margin:-5px\">\n          <a><span class=\"flag sg\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/sg.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive7\" style=\"margin:-5px\">\n          <a><span class=\"flag jp\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/jp.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive8\" style=\"margin:-5px\">\n          <a><span class=\"flag au\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/au.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive9\" style=\"margin:-5px\">\n          <a><span class=\"flag gb\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/gb.png\"></span></a>\n        </li>\n      </ul>\n      \n      <!-- Ø²Ø± Ø§Ù„ØªØ¨Ø¯ÙŠÙ„ Ø£Ø³ÙÙ„ Ø§Ù„Ø£Ø¹Ù„Ø§Ù… Ù…Ø¨Ø§Ø´Ø±Ø© -->\n      <div style=\"text-align: center; margin: 2px 0; padding: 2px;\">\n        <button id=\"sort-toggle\" style=\"font-size: 10px; padding: 1px 6px; background-color: #333; color: #ddd; border: 1px solid #666; border-radius: 3px; cursor: pointer; outline: none;\">Timmap Servers</button>\n      </div>\n      \n      <div class=\"gachngang\"></div>\n      <div class=\"server-header\">\n        <div class=\"header-name\">SERVER</div>\n        <div class=\"header-region\">REGION</div>\n        <div class=\"header-status\">STATUS</div>\n        <div class=\"header-score\">SCORE</div>\n      </div>\n      <div class=\"gachngang\"></div>\n    </div>\n    \n    <!-- Ø¥Ø¶Ø§ÙØ© ØµÙˆØ±Ø© Ø§Ù„Ø®Ù„ÙÙŠØ© Ù‡Ù†Ø§ Ù‚Ø¨Ù„ Ø­Ø§ÙˆÙŠØ© Ø§Ù„Ø³ÙŠØ±ÙØ±Ø§Øª -->\n    <div class=\"background-image-container\">\n      <img src=\"https://wormup.in/images/cors-proxy.php?img=Background/serverbg.jpg\" class=\"background-image\">\n    </div>\n    \n    <div class=\"servers-container\">\n      <div class=\"servers-peru\"></div>\n      <div class=\"servers-mexico\" style=\"display:none\"></div>\n      <div class=\"servers-eeuu\" style=\"display:none\"></div>\n      <div class=\"servers-canada\" style=\"display:none\"></div>\n      <div class=\"servers-germania\" style=\"display:none\"></div>\n      <div class=\"servers-francia\" style=\"display:none\"></div>\n      <div class=\"servers-singapur\" style=\"display:none\"></div>\n      <div class=\"servers-japon\" style=\"display:none\"></div>\n      <div class=\"servers-australia\" style=\"display:none\"></div>\n      <div class=\"servers-granbretana\" style=\"display:none\"></div>\n    </div>\n  </div>\n</div>\n  ");
        _0x457261();
      }
      function _0xa7a141() {
        $(".description-text").html("\n<div class=\"title-wormate-server\">\n          S E R V E R S\n        </div>\n        \n        <div class=\"description-text-hiep\">\n \n    <div style=\"position:sticky; top:0; z-index:100; background:#242424;\">\n    <BR>\n      <ul style=\"margin-top:5px\" class=\"ui-tabs-nav\">\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive0 ui-tab-active\" style=\"margin:-5px\">\n          <a><span class=\"flag br\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/br.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive1\" style=\"margin:-5px\">\n          <a><span class=\"flag mx\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/mx.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive2\" style=\"margin:-5px\">\n          <a><span class=\"flag us\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/us.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive3\" style=\"margin:-5px\">\n          <a><span class=\"flag ca\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/ca.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive4\" style=\"margin:-5px\">\n          <a><span class=\"flag de\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/de.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive5\" style=\"margin:-5px\">\n          <a><span class=\"flag fr\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/fr.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive6\" style=\"margin:-5px\">\n          <a><span class=\"flag sg\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/sg.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive7\" style=\"margin:-5px\">\n          <a><span class=\"flag jp\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/jp.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive8\" style=\"margin:-5px\">\n          <a><span class=\"flag au\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/au.png\"></span></a>\n        </li>\n        <li class=\"ui-tabs-tab ui-tab ui-tab-inactive9\" style=\"margin:-5px\">\n          <a><span class=\"flag gb\" value=\"https://wormup.in/images/cors-proxy.php?img=flg/gb.png\"></span></a>\n        </li>\n      </ul>\n      \n      <!-- Ø²Ø± Ø§Ù„ØªØ¨Ø¯ÙŠÙ„ Ø£Ø³ÙÙ„ Ø§Ù„Ø£Ø¹Ù„Ø§Ù… Ù…Ø¨Ø§Ø´Ø±Ø© -->\n      <div style=\"text-align: center; margin: 2px 0; padding: 2px;\">\n        <button id=\"sort-toggle\" style=\"font-size: 10px; padding: 1px 6px; background-color: #333; color: #ddd; border: 1px solid #666; border-radius: 3px; cursor: pointer; outline: none;\">Timmap Servers</button>\n      </div>\n      \n      <div class=\"gachngang\"></div>\n      <div class=\"server-header\">\n        <div class=\"header-name\">SERVER</div>\n        <div class=\"header-region\">REGION</div>\n        <div class=\"header-status\">STATUS</div>\n        <div class=\"header-score\">SCORE</div>\n      </div>\n      <div class=\"gachngang\"></div>\n    </div>\n    \n    <!-- Ø¥Ø¶Ø§ÙØ© ØµÙˆØ±Ø© Ø§Ù„Ø®Ù„ÙÙŠØ© Ù‡Ù†Ø§ Ù‚Ø¨Ù„ Ø­Ø§ÙˆÙŠØ© Ø§Ù„Ø³ÙŠØ±ÙØ±Ø§Øª -->\n    <div class=\"background-image-container\">\n      <img src=\"https://wormup.in/images/cors-proxy.php?img=Background/serverbg.jpg\" class=\"background-image\">\n    </div>\n    \n    <div class=\"servers-container\">\n      <div class=\"servers-peru\"></div>\n      <div class=\"servers-mexico\" style=\"display:none\"></div>\n      <div class=\"servers-eeuu\" style=\"display:none\"></div>\n      <div class=\"servers-canada\" style=\"display:none\"></div>\n      <div class=\"servers-germania\" style=\"display:none\"></div>\n      <div class=\"servers-francia\" style=\"display:none\"></div>\n      <div class=\"servers-singapur\" style=\"display:none\"></div>\n      <div class=\"servers-japon\" style=\"display:none\"></div>\n      <div class=\"servers-australia\" style=\"display:none\"></div>\n      <div class=\"servers-granbretana\" style=\"display:none\"></div>\n    </div>\n  </div>\n</div>\n  ");
        _0x457261();
      }
      function _0x457261() {
        $("body").append("<div id=\"custom-tooltip\" style=\"display: none; position: absolute; z-index: 9999; background: rgba(0,0,0,0.9); padding: 5px 10px; border-radius: 4px; font-size: 10px; pointer-events: none; text-align: center;\"><div style=\"display: flex; justify-content: space-between; align-items: center;\"><span style=\"color: #ffd700; text-align: right;\">TimMap Servers </span><span style=\"color: white; margin: 0 5px;\">âŸ· </span><span style=\"color: #ffd700; text-align: left;\">WormWorld Servers</span></div></div>");
        $("body").append("<div id=\"image-tooltip\" class=\"image-tooltip\"></div>");
        function _0x379255() {
          const _0x367494 = {
            mx: "servers-mexico",
            br: "servers-peru",
            us: "servers-eeuu",
            ca: "servers-canada",
            de: "servers-germania",
            fr: "servers-francia",
            sg: "servers-singapur",
            jp: "servers-japon",
            au: "servers-australia",
            gb: "servers-granbretana"
          };
          Object.keys(_0x367494).forEach((_0x4c666f, _0x2f4055) => {
            $("." + _0x4c666f).on("click", function () {
              for (let _0x49ae01 = 0; _0x49ae01 < 10; _0x49ae01++) {
                $(".ui-tab-inactive" + _0x49ae01).removeClass("ui-tab-active");
              }
              $(".ui-tab-inactive" + _0x2f4055).attr("class", "ui-tab-active ui-tab-inactive" + _0x2f4055);
              $("#addflag").attr("class", "flag " + _0x4c666f);
              $(".servers-peru, .servers-mexico, .servers-eeuu, .servers-canada, .servers-germania, .servers-francia, .servers-singapur, .servers-japon, .servers-australia, .servers-granbretana").hide();
              $("." + _0x367494[_0x4c666f]).fadeIn(300);
            });
          });
        }
        function _0x569118() {
          $(".servers-peru, .servers-mexico, .servers-eeuu, .servers-canada, .servers-germania, .servers-francia, .servers-singapur, .servers-japon, .servers-australia, .servers-granbretana").empty();
          const _0x2ddf45 = {
            peru: "DE",
            mexico: "UAE",
            eeuu: "USA",
            canada: "LT",
            germania: "BR",
            francia: "FR",
            singapur: "SG",
            japon: "JP",
            australia: "IN",
            granbretana: "UK"
          };
          const _0x420686 = {
            peru: "https://wormup.in/images/cors-proxy.php?img=flg/de.png",
            mexico: "https://wormup.in/images/cors-proxy.php?img=flg/mx.png",
            eeuu: "https://wormup.in/images/cors-proxy.php?img=flg/us.png",
            canada: "https://wormup.in/images/cors-proxy.php?img=flg/ca.png",
            germania: "https://wormup.in/images/cors-proxy.php?img=flg/br.png",
            francia: "https://wormup.in/images/cors-proxy.php?img=flg/fr.png",
            singapur: "https://wormup.in/images/cors-proxy.php?img=flg/sg.png",
            japon: "https://wormup.in/images/cors-proxy.php?img=flg/jp.png",
            australia: "https://wormup.in/images/cors-proxy.php?img=flg/au.png",
            granbretana: "https://wormup.in/images/cors-proxy.php?img=flg/gb.png"
          };
          const _0x2ccfd6 = {};
          Object.keys(_0x2ddf45).forEach(_0x341230 => {
            _0x2ccfd6[_0x341230] = [];
          });
          if (window.servers && window.servers.Api_listServer && window.servers.Api_listServer.length > 0) {
            let _0x2f6abb = window.currentDisplayMode || "timmap";
            window.servers.Api_listServer.forEach(_0x39540d => {
              let _0x36fae6 = null;
              if (_0x2f6abb === "timmap" && _0x39540d.timmap) {
                _0x36fae6 = _0x39540d.timmap;
              } else if (_0x2f6abb === "wormworld" && _0x39540d.wormworld) {
                _0x36fae6 = _0x39540d.wormworld;
              }
              if (_0x36fae6 && _0x2ccfd6[_0x39540d.region]) {
                _0x39540d.displayNumber = _0x36fae6;
                _0x2ccfd6[_0x39540d.region].push(_0x39540d);
              }
            });
            Object.keys(_0x2ccfd6).forEach(_0x535029 => {
              const _0x3a7f32 = _0x2ccfd6[_0x535029];
              const _0x276f2f = _0x2ddf45[_0x535029];
              if (_0x3a7f32.length > 0) {
                _0x3a7f32.sort((_0x1302b3, _0x3751fd) => (_0x1302b3.displayNumber || 0) - (_0x3751fd.displayNumber || 0));
                for (let _0x1e8a7a = 0; _0x1e8a7a < _0x3a7f32.length; _0x1e8a7a++) {
                  const _0x498cf8 = _0x3a7f32[_0x1e8a7a];
                  const _0x52ef22 = _0x498cf8.displayNumber;
                  const _0x33bb71 = _0x498cf8.image || "https://wormup.in/images/cors-proxy.php?img=flg/default-server.png";
                  const _0x731bcb = _0x498cf8.imageUrl || "";
                  const _0x23ade6 = $("<div></div>").addClass("selectSala").attr({
                    id: _0x535029,
                    value: _0x498cf8.serverUrl,
                    "data-server-name": _0x498cf8.name || "Server " + _0x52ef22,
                    "data-region-name": _0x276f2f,
                    "data-region-flag": _0x420686[_0x535029],
                    "data-server-number": _0x52ef22,
                    "data-server-image": _0x33bb71
                  });
                  const _0x5a9942 = _0x731bcb && _0x731bcb.trim() !== "";
                  const _0x710a22 = $("<div></div>").addClass("server-image");
                  if (_0x5a9942) {
                    _0x710a22.addClass("server-image-with-link").data("url", _0x731bcb);
                  }
                  _0x710a22.append($("<img>").attr("src", _0x33bb71));
                  const _0x15d656 = $("<div></div>").addClass("server-info").append($("<span></span>").addClass("server-number").text(_0x52ef22 + "."), $("<span></span>").addClass("server-name").text(_0x498cf8.name || "Server " + _0x52ef22));
                  const _0x39f144 = $("<div></div>").addClass("server-region").text(_0x276f2f + " " + _0x52ef22);
                  const _0x4ea8ec = $("<div></div>").addClass("server-status").append($("<span></span>").addClass("green-dot"));
                  const _0x646083 = $("<div></div>").addClass("server-score");
                  _0x23ade6.append(_0x710a22, _0x15d656, _0x39f144, _0x4ea8ec, _0x646083);
                  $(".servers-" + _0x535029).append(_0x23ade6);
                  _0x23ade6.click(function () {
                    const _0xc7f916 = $(this).attr("data-region-name");
                    const _0x5c6e95 = $(this).attr("data-server-number");
                    const _0x4b3296 = $(this).attr("value");
                    const _0x521434 = $(this).attr("data-region-flag");
                    const _0x258268 = $(this).attr("data-server-image");
                    const _0x4b07e5 = _0xc7f916 + " " + _0x5c6e95;
                    window.realServerName = _0x4b07e5;
                    window.selectedServerInfo = {
                      regionName: _0xc7f916,
                      serverNumber: _0x5c6e95,
                      regionFlag: _0x521434,
                      serverImage: _0x258268,
                      displayName: _0x4b07e5
                    };
                    $("#port_id_s").val(_0x4b3296);
                    $("#port_name_s").val(_0x4b07e5);
                    $("#port_id").val($("#port_id_s").val());
                    $("#port_name").val($("#port_name_s").val());
                    try {
                      const _0x55f194 = JSON.parse(localStorage.getItem("SaveGameup") || "{}");
                      _0x55f194.realServerName = _0x4b07e5;
                      localStorage.setItem("SaveGameup", JSON.stringify(_0x55f194));
                    } catch (_0x160bbd) {
                      console.error("Ø®Ø·Ø£ ÙÙŠ Ø­ÙØ¸ Ø§Ø³Ù… Ø§Ù„Ø³ÙŠØ±ÙØ±:", _0x160bbd);
                    }
                    if (typeof ctx !== "undefined") {
                      if (ctx.containerImgS && ctx.onclickServer) {
                        ctx.containerImgS.texture = ctx.onclickServer;
                      }
                    }
                    if (typeof retundFlagError === "function") {
                      retundFlagError();
                    }
                    window.server_url = _0x4b3296;
                    $("#mm-action-play").click();
                    $("#adbl-continue").click();
                    setTimeout(_0x2cc59e, 500);
                    setTimeout(_0x2cc59e, 2000);
                  });
                }
              } else {
                $(".servers-" + _0x535029).append("\n            <div style=\"text-align:center; padding:20px; color:#aaa;\">\n              No servers available in this region\n            </div>\n          ");
              }
            });
          } else {
            $(".servers-peru, .servers-mexico, .servers-eeuu, .servers-canada, .servers-germania, .servers-francia, .servers-singapur, .servers-japon, .servers-australia, .servers-granbretana").html("\n        <div style=\"text-align:center; padding:20px; color:#aaa;\">\n          Loading servers... Please wait.\n        </div>\n      ");
          }
          _0x95dce5();
        }
        function _0x329f08(_0x2632ac) {
          if (_0x2632ac >= 1000000) {
            return (_0x2632ac / 1000000).toFixed(2) + "M";
          } else if (_0x2632ac >= 1000) {
            return (_0x2632ac / 1000).toFixed(1) + "K";
          } else {
            return _0x2632ac.toFixed(0);
          }
        }
        function _0x2cc59e() {
          if (!window.realServerName) {
            return;
          }
          document.querySelectorAll("text, span, div").forEach(_0x3f77c3 => {
            const _0x267acd = _0x3f77c3.textContent || "";
            if (_0x267acd.includes("wss://") || _0x267acd.includes(".wormate.io") || _0x267acd.includes("/wormy") || _0x267acd.match(/[a-z]+-\d+/i)) {
              _0x3f77c3.textContent = window.realServerName;
              if (_0x3f77c3.text !== undefined) {
                _0x3f77c3.text = window.realServerName;
              }
            }
          });
          if (window.mapText && window.mapText.text !== undefined) {
            window.mapText.text = window.realServerName;
          }
        }
        function _0x29120d() {
          try {
            const _0x58dfff = window.savedData || window.savedData;
            if (_0x58dfff && typeof _0x58dfff.Bq === "function") {
              const _0x171295 = _0x58dfff.Bq;
              _0x58dfff.Bq = function (_0x20a195, _0x3dbc3e) {
                const _0x371c65 = _0x171295.apply(this, arguments);
                setTimeout(function () {
                  try {
                    const _0xc9e944 = window.realServerName || function () {
                      try {
                        const _0x3dcec8 = JSON.parse(localStorage.getItem("SaveGameup") || "{}");
                        return _0x3dcec8.realServerName || "";
                      } catch (_0x12e443) {
                        return "";
                      }
                    }();
                    if (window.mapText && window.mapText.text && _0xc9e944) {
                      window.mapText.text = _0xc9e944;
                    }
                  } catch (_0x292d2c) {
                    console.error("Ø®Ø·Ø£ ÙÙŠ ØªØ­Ø¯ÙŠØ« Ø¹Ø±Ø¶ Ø§Ø³Ù… Ø§Ù„Ø³ÙŠØ±ÙØ±:", _0x292d2c);
                  }
                }, 100);
                return _0x371c65;
              };
              console.log("âœ… ØªÙ… ØªØ¹Ø¯ÙŠÙ„ Ø¯Ø§Ù„Ø© Ø¹Ø±Ø¶ Ø§Ø³Ù… Ø§Ù„Ø³ÙŠØ±ÙØ± Ø¨Ù†Ø¬Ø§Ø­");
            }
          } catch (_0x6557d7) {
            console.error("âŒ Ø®Ø·Ø£ ÙÙŠ ØªØ¹Ø¯ÙŠÙ„ Ø¯Ø§Ù„Ø© Ø¹Ø±Ø¶ Ø§Ø³Ù… Ø§Ù„Ø³ÙŠØ±ÙØ±:", _0x6557d7);
          }
        }
        function _0x95dce5() {
          fetch("https://wormup.in:4000/active-servers?t=" + Date.now()).then(_0x18abc5 => _0x18abc5.json()).then(_0x5dfc60 => {
            if (_0x5dfc60 && _0x5dfc60.servers) {
              $(".selectSala").each(function () {
                const _0x1b9554 = $(this);
                const _0x5c3e57 = _0x1b9554.attr("value");
                const _0x1fa739 = _0x5dfc60.servers[_0x5c3e57];
                _0x1b9554.find(".green-dot").css("display", "none");
                if (_0x1fa739 && _0x1fa739.topPlayers && _0x1fa739.topPlayers.length) {
                  _0x1b9554.data("players", JSON.stringify(_0x1fa739.topPlayers));
                  const _0x9f9559 = _0x1fa739.topPlayers[0];
                  const _0x5345d8 = _0x329f08(_0x9f9559.score);
                  const _0x5d9933 = _0x9f9559.score >= 1000000;
                  _0x1b9554.find(".server-score").html("<span class=\"score-display " + (_0x5d9933 ? "million" : "regular") + "\">" + _0x5345d8 + "</span>");
                  if (_0x1fa739.topPlayers.length >= 4) {
                    const _0x2cacbe = _0x1fa739.topPlayers.slice(0, 4).every(_0x13426b => _0x13426b.score >= 1000000);
                    if (_0x2cacbe) {
                      _0x1b9554.find(".green-dot").css("display", "block");
                    }
                  }
                } else {
                  _0x1b9554.find(".server-score").html("-");
                }
              });
            }
          }).catch(_0x1c07a9 => console.error("Error updating servers:", _0x1c07a9));
        }
        function _0x536906() {
          $(document).on("mouseenter", ".server-score", function (_0x44e2b7) {
            $(".player-tooltip").remove();
            const _0x48903a = $(this).closest(".selectSala");
            const _0x275ccd = _0x48903a.data("players");
            if (!_0x275ccd) {
              return;
            }
            let _0xcf24da = [];
            try {
              _0xcf24da = typeof _0x275ccd === "string" ? JSON.parse(_0x275ccd) : _0x275ccd;
            } catch (_0x315d52) {
              return;
            }
            if (!_0xcf24da || !_0xcf24da.length) {
              return;
            }
            let _0x7b1824 = "<table>";
            const _0x385653 = Math.min(_0xcf24da.length, 10);
            for (let _0x24c8ff = 0; _0x24c8ff < _0x385653; _0x24c8ff++) {
              const _0x239a89 = _0xcf24da[_0x24c8ff];
              _0x7b1824 += "<tr>\n          <td class=\"rank\">" + (_0x24c8ff + 1) + "-</td>\n          <td class=\"name\">" + (_0x239a89.name || "Player_" + _0x239a89.id) + "</td>\n          <td class=\"score\">" + _0x329f08(_0x239a89.score) + "</td>\n        </tr>";
            }
            _0x7b1824 += "</table>";
            const _0x228661 = $("<div class=\"player-tooltip\"></div>").html(_0x7b1824).css({
              top: _0x44e2b7.pageY + 10,
              left: _0x44e2b7.pageX + 10
            });
            $("body").append(_0x228661);
            $(this).data("tooltip", _0x228661);
          });
          $(document).on("mouseleave", ".server-score", function () {
            const _0x1d9c61 = $(this).data("tooltip");
            if (_0x1d9c61) {
              setTimeout(function () {
                _0x1d9c61.remove();
              }, 100);
            }
          });
          $(document).on("mousemove", ".server-score", function (_0x2088fa) {
            const _0x468333 = $(this).data("tooltip");
            if (_0x468333) {
              _0x468333.css({
                top: _0x2088fa.pageY + 10,
                left: _0x2088fa.pageX + 10
              });
            }
          });
        }
        $("#sort-toggle").on({
          mouseenter: function (_0x147acc) {
            var _0x5a2cd5 = $("#custom-tooltip");
            var _0x3111bc = $(this).offset();
            var _0x214d45 = $(this).outerWidth();
            var _0x3d640a = _0x5a2cd5.outerWidth();
            _0x5a2cd5.css({
              left: _0x3111bc.left + _0x214d45 / 2 - _0x3d640a / 2,
              top: _0x3111bc.top + 30
            }).fadeIn(200);
          },
          mouseleave: function () {
            $("#custom-tooltip").fadeOut(200);
          }
        });
        $("#sort-toggle").click(function () {
          if (window.currentDisplayMode === "timmap") {
            window.currentDisplayMode = "wormworld";
            $(this).addClass("wormworld").text("WormWorld Servers");
            $(".server-number").css("color", "#00a8ff");
          } else {
            window.currentDisplayMode = "timmap";
            $(this).removeClass("wormworld").text("Timmap Servers");
            $(".server-number").css("color", "#f00");
          }
          _0x569118();
        });
        $(".ui-tab").on("click", _0x379255);
        $(".flag").click(function () {
          let _0x19451e = $(this).attr("value");
          if (typeof theoKzObjects !== "undefined") {
            theoKzObjects.flag = _0x19451e;
          }
          if (typeof ctx !== "undefined" && ctx.containerImgS) {
            ctx.containerImgS.texture = ctx.onclickServer;
          }
          if (typeof retundFlagError === "function") {
            retundFlagError();
          }
        });
        setTimeout(function () {
          let _0x5e916b = 0;
          let _0x1c5189 = setInterval(function () {
            if (_0x5e916b >= 6) {
              clearInterval(_0x1c5189);
              return;
            }
            if (_0x5e916b % 2 === 0) {
              window.currentDisplayMode = "wormworld";
              $("#sort-toggle").addClass("wormworld").text("WormWorld Servers");
              $(".server-number").css("color", "#00a8ff");
            } else {
              window.currentDisplayMode = "timmap";
              $("#sort-toggle").removeClass("wormworld").text("Timmap Servers");
              $(".server-number").css("color", "#f00");
            }
            _0x569118();
            _0x5e916b++;
          }, 700);
        }, 1500);
        _0x379255();
        _0x536906();
        _0x29120d();
        window.currentDisplayMode = "timmap";
        _0x30d18e().then(_0x59c6ec => {
          if (_0x59c6ec) {
            _0x569118();
          }
        });
      }
      _0x2a8992(_0x4342af);
      window.PerformanceMonitor = {
        lastTime: performance.now(),
        frameCount: 0,
        fps: 0,
        cpuUsage: 0,
        fpsDisplay: null,
        cpuDisplay: null,
        isFpsVisible: false,
        isCpuVisible: false,
        cpuSamples: [],
        cpuSampleSize: 10,
        lastCpuTime: 0,
        isInitialized: false,
        _cpuMonitoringInterval: null,
        _animFrameId: null,
        init() {
          if (this.isInitialized) {
            return;
          }
          this.isInitialized = true;
          const _0x14226b = localStorage.getItem("showFpsCpu");
          if (_0x14226b !== null) {
            this.isFpsVisible = _0x14226b === "true";
            this.isCpuVisible = _0x14226b === "true";
          }
          this.createDisplayElements();
          if (this.isFpsVisible || this.isCpuVisible) {
            this.startAllMonitoring();
          }
          this.setupKeyboardControls();
          this.updateDisplays();
          this.setupToggleButton();
        },
        startAllMonitoring() {
          if (this.isFpsVisible && !this._animFrameId) {
            this.startMonitoring();
          }
          if (this.isCpuVisible && !this._cpuMonitoringInterval) {
            this.startCpuMonitoring();
          }
        },
        stopAllMonitoring() {
          if (this._cpuMonitoringInterval) {
            console.log("Stopping CPU monitoring completely");
            clearInterval(this._cpuMonitoringInterval);
            this._cpuMonitoringInterval = null;
          }
          if (this._animFrameId) {
            console.log("Stopping FPS monitoring completely");
            cancelAnimationFrame(this._animFrameId);
            this._animFrameId = null;
          }
        },
        setupToggleButton() {
          const _0x47a1ca = document.getElementById("performance-monitor-toggle");
          if (_0x47a1ca) {
            _0x47a1ca.checked = this.isFpsVisible || this.isCpuVisible;
            _0x47a1ca.addEventListener("change", () => {
              const _0x20ef64 = _0x47a1ca.checked;
              this.toggle(_0x20ef64);
            });
          } else {
            setTimeout(() => {
              const _0x112358 = document.getElementById("performance-monitor-toggle");
              if (_0x112358) {
                _0x112358.checked = this.isFpsVisible || this.isCpuVisible;
                _0x112358.addEventListener("change", () => {
                  this.toggle(_0x112358.checked);
                });
              }
            }, 1000);
          }
        },
        createDisplayElements() {
          const _0x5587cb = document.getElementById("performance-monitor-style");
          if (!_0x5587cb) {
            const _0x2cb6cf = document.createElement("style");
            _0x2cb6cf.id = "performance-monitor-style";
            _0x2cb6cf.textContent = "\n                .performance-monitor-container {\n                    position: fixed;\n                    right: 5px;\n                    bottom: 5px;\n                    display: flex;\n                    gap: 5px;\n                    z-index: 9999;\n                    font-family: Arial, sans-serif;\n                    pointer-events: none;\n                    user-select: none;\n                }\n                .monitor-element {\n                    background-color: rgba(0, 0, 0, 0.5);\n                    font-size: 12px;\n                    height: 20px;\n                    line-height: 20px;\n                    border-radius: 4px;\n                    font-weight: bold;\n                    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);\n                    padding: 0 8px;\n                    white-space: nowrap;\n                    box-sizing: border-box;\n                    display: none;\n                }\n            ";
            document.head.appendChild(_0x2cb6cf);
          }
          let _0x39f97e = document.querySelector(".performance-monitor-container");
          if (!_0x39f97e) {
            _0x39f97e = document.createElement("div");
            _0x39f97e.className = "performance-monitor-container";
            document.body.appendChild(_0x39f97e);
          }
          if (!this.fpsDisplay) {
            this.fpsDisplay = document.createElement("div");
            this.fpsDisplay.className = "monitor-element";
            _0x39f97e.appendChild(this.fpsDisplay);
          }
          if (!this.cpuDisplay) {
            this.cpuDisplay = document.createElement("div");
            this.cpuDisplay.className = "monitor-element";
            _0x39f97e.appendChild(this.cpuDisplay);
          }
        },
        startCpuMonitoring() {
          if (!this.isCpuVisible) {
            console.log("CPU monitoring not started because it's disabled");
            return;
          }
          if (this._cpuMonitoringInterval) {
            clearInterval(this._cpuMonitoringInterval);
          }
          this.lastCpuTime = performance.now();
          this.cpuSamples = [];
          console.log("Starting CPU monitoring...");
          this._cpuMonitoringInterval = setInterval(() => {
            if (!this.isCpuVisible) {
              clearInterval(this._cpuMonitoringInterval);
              this._cpuMonitoringInterval = null;
              console.log("CPU monitoring stopped because it was disabled");
              return;
            }
            this.measureCpuUsage();
          }, 500);
        },
        measureCpuUsage() {
          const _0x2e2a06 = performance.now();
          const _0x4a0bb8 = _0x2e2a06 - this.lastCpuTime;
          const _0x49c406 = 60;
          const _0x5b9fda = Math.max(0, _0x49c406 - this.fps) / _0x49c406;
          let _0x45fc9f = 0;
          if (window.performance && window.performance.timing) {
            const _0x3dfc9a = window.performance.timing;
            _0x45fc9f = _0x3dfc9a.domComplete - _0x3dfc9a.navigationStart;
          }
          const _0x2fb81e = Math.min(1, window.anApp ? 0.7 : 0.3);
          const _0xd71e6c = Math.min(100, Math.round((_0x5b9fda * 70 + _0x45fc9f / 1000 * 30) * _0x2fb81e));
          this.cpuSamples.push(_0xd71e6c);
          if (this.cpuSamples.length > this.cpuSampleSize) {
            this.cpuSamples.shift();
          }
          this.cpuUsage = Math.round(this.cpuSamples.reduce((_0x43d392, _0x221ad1) => _0x43d392 + _0x221ad1, 0) / this.cpuSamples.length);
          this.lastCpuTime = _0x2e2a06;
          this.updateDisplays();
        },
        startMonitoring() {
          if (!this.isFpsVisible) {
            return;
          }
          if (this._animFrameId) {
            cancelAnimationFrame(this._animFrameId);
          }
          const _0x51b197 = () => {
            if (!this.isFpsVisible) {
              cancelAnimationFrame(this._animFrameId);
              this._animFrameId = null;
              return;
            }
            const _0x8db407 = performance.now();
            const _0x2d593e = _0x8db407 - this.lastTime;
            this.frameCount++;
            if (_0x2d593e >= 1000) {
              this.fps = Math.round(this.frameCount * 1000 / _0x2d593e);
              this.frameCount = 0;
              this.lastTime = _0x8db407;
              this.updateDisplays();
            }
            this._animFrameId = requestAnimationFrame(_0x51b197);
          };
          this._animFrameId = requestAnimationFrame(_0x51b197);
        },
        updateDisplays() {
          if (!this.fpsDisplay || !this.cpuDisplay) {
            return;
          }
          if (this.isFpsVisible) {
            this.fpsDisplay.textContent = "FPS: " + this.fps;
            if (this.fps >= 58) {
              this.fpsDisplay.style.color = "white";
            } else if (this.fps >= 30) {
              this.fpsDisplay.style.color = "gold";
            } else {
              this.fpsDisplay.style.color = "red";
            }
            this.fpsDisplay.style.display = "block";
          } else {
            this.fpsDisplay.style.display = "none";
          }
          if (this.isCpuVisible) {
            this.cpuDisplay.textContent = "CPU: " + this.cpuUsage + "%";
            if (this.cpuUsage <= 50) {
              this.cpuDisplay.style.color = "white";
            } else if (this.cpuUsage <= 80) {
              this.cpuDisplay.style.color = "gold";
            } else {
              this.cpuDisplay.style.color = "red";
            }
            this.cpuDisplay.style.display = "block";
          } else {
            this.cpuDisplay.style.display = "none";
          }
        },
        setupKeyboardControls() {
          if (this._hasSetupKeyboardControls) {
            return;
          }
          this._hasSetupKeyboardControls = true;
          document.addEventListener("keydown", _0x2ffe88 => {
            if (_0x2ffe88.key === "F2" || _0x2ffe88.code === "F2" || _0x2ffe88.keyCode === 113) {
              _0x2ffe88.preventDefault();
              this.isCpuVisible = !this.isCpuVisible;
              if (this.isCpuVisible && !this._cpuMonitoringInterval) {
                this.startCpuMonitoring();
              }
              this.saveSettings();
              this.updateDisplays();
              this.updateToggleButton();
              return false;
            } else if (_0x2ffe88.key === "F4" || _0x2ffe88.code === "F4" || _0x2ffe88.keyCode === 115) {
              _0x2ffe88.preventDefault();
              this.isFpsVisible = !this.isFpsVisible;
              if (this.isFpsVisible && !this._animFrameId) {
                this.startMonitoring();
              }
              this.saveSettings();
              this.updateDisplays();
              this.updateToggleButton();
              return false;
            } else if (_0x2ffe88.altKey && (_0x2ffe88.key === "2" || _0x2ffe88.keyCode === 50)) {
              _0x2ffe88.preventDefault();
              this.isCpuVisible = !this.isCpuVisible;
              if (this.isCpuVisible && !this._cpuMonitoringInterval) {
                this.startCpuMonitoring();
              }
              this.saveSettings();
              this.updateDisplays();
              this.updateToggleButton();
              return false;
            } else if (_0x2ffe88.altKey && (_0x2ffe88.key === "4" || _0x2ffe88.keyCode === 52)) {
              _0x2ffe88.preventDefault();
              this.isFpsVisible = !this.isFpsVisible;
              if (this.isFpsVisible && !this._animFrameId) {
                this.startMonitoring();
              }
              this.saveSettings();
              this.updateDisplays();
              this.updateToggleButton();
              return false;
            }
          }, true);
        },
        saveSettings() {
          const _0x34e8ae = this.isFpsVisible || this.isCpuVisible;
          localStorage.setItem("showFpsCpu", _0x34e8ae);
        },
        updateToggleButton() {
          const _0x354320 = document.getElementById("performance-monitor-toggle");
          if (_0x354320) {
            _0x354320.checked = this.isFpsVisible || this.isCpuVisible;
          }
        },
        toggle(_0x1804f6) {
          if (typeof _0x1804f6 !== "boolean") {
            _0x1804f6 = !this.isFpsVisible && !this.isCpuVisible;
          }
          const _0x5affc7 = this.isFpsVisible;
          const _0x2da5aa = this.isCpuVisible;
          this.isFpsVisible = _0x1804f6;
          this.isCpuVisible = _0x1804f6;
          this.saveSettings();
          if (_0x1804f6) {
            if (!_0x5affc7 && this.isFpsVisible) {
              this.startMonitoring();
            }
            if (!_0x2da5aa && this.isCpuVisible) {
              this.startCpuMonitoring();
            }
          } else {
            this.stopAllMonitoring();
          }
          this.updateDisplays();
        },
        enable(_0x28caf9) {
          if (_0x28caf9) {
            if (!this.isInitialized) {
              this.init();
            } else {
              this.toggle(true);
            }
          } else {
            this.toggle(false);
          }
        }
      };
      $(".profile-user").append("<div class=\"idwormate\"><input type=\"text\" value=\"" + _0x4342af.userId + "\" style=\"max-width: 300px; width: 350px !important; height: 22px !important border-radius: 6px; font-size: 14px; text-align: center; background-color: #fff; color: #0a6928; font-weight: 630; display: inline-block; margin-right: 10px;\"/>\n<button id=\"btn_copy\" style=\"width: 100px; height: 35px; border-radius: 6px; font-size: 15px; background-color: #fff; color: white; border: none; cursor: pointer;\" onclick=\"navigator.clipboard.writeText('" + _0x4342af.userId + "').then(()=> alert('Your ID " + _0x4342af.userId + " copied!'));\">Copy</button></div>");
      var _0x406209 = "";
      if (_0xff6e4c.e === "not_empty") {
        _0x406209 = "<input type=\"button\" value=\"" + _0xff6e4c.ccg[3] + "\" id=\"btnRePlay\">";
        _0x40085c.s_w = _0xff6e4c.sw == 1;
      }
      _0x49f272(_0xff6e4c.s11);
      $("#mm-advice-cont").html("<div class=\"div_FullScreen\"><input type=\"button\" value=\"" + _0xff6e4c.ccg[4] + "\" id=\"btnFullScreen\"/><input type=\"button\" value=\"" + _0xff6e4c.ccg[5] + "\" id=\"btn_in_t\" style=\"display:none;\"/>" + _0x406209 + "</div>");
      document.getElementById("btnFullScreen").addEventListener("click", function () {
        let _0x49c064 = document.documentElement.requestFullScreen || document.documentElement.webkitRequestFullScreen || document.documentElement.mozRequestFullScreen;
        if (_0x49c064 && !_0x40085c.fullscreen) {
          try {
            _0x40085c.fullscreen = true;
            _0x49c064.call(document.documentElement);
          } catch (_0x2829ee) {}
        } else {
          _0x40085c.fullscreen = false;
          document.exitFullscreen();
        }
      });
      if (_0xff6e4c.e === "not_empty") {
        document.getElementById("btnRePlay").addEventListener("click", function () {
          $("#port_id_s").val(_0x40085c.pi);
          $("#port_name_s").val(_0x40085c.pn);
          $("#port_id").val($("#port_id_s").val());
          $("#port_name").val($("#port_name_s").val());
          document.getElementById("mm-action-play").click();
        });
      }
      if (!window.wormupObjects) {
        window.wormupObjects = {
          eat_animation: 0.0025,
          smoothCamera: 0.5,
          PortionSize: 2,
          PortionAura: 1.2,
          PortionTransparent: 0.8,
          FoodTransparent: 0.3,
          FoodSize: 2,
          FoodShadow: 2,
          zoomSpeed: 0.003,
          soundEnabled: true,
          soundVolume: 50,
          soundEffect: "https://wormateup.live/images/store/hs_2.mp3"
        };
      }
      try {
        const _0x6dd92 = JSON.parse(localStorage.getItem("wormupSettings"));
        if (_0x6dd92) {
          for (const _0x26c5cf in _0x6dd92) {
            if (wormupObjects.hasOwnProperty(_0x26c5cf)) {
              wormupObjects[_0x26c5cf] = _0x6dd92[_0x26c5cf];
            }
          }
        }
      } catch (_0x28b3c4) {
        console.error("Error loading wormup settings:", _0x28b3c4);
      }
      function _0xe63025() {
        try {
          localStorage.setItem("wormupSettings", JSON.stringify(wormupObjects));
        } catch (_0x47720e) {
          console.error("Error saving wormup settings:", _0x47720e);
        }
      }
      if (_0x40085c.s_w) {
        $("\n<link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css' rel='stylesheet'/>\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css\">\n<button id=\"btn_crsw\" style=\"display: none;\">ğŸ’¡</button> \n<button id=\"op_wup\" class=\"op_wup\">âš™ï¸ Settings</button> \n<div id=\"modal_wup\" class=\"modal\"> \n  <div class=\"modal-content\"> \n    <div class=\"modal-header\"> \n      <span class=\"close\">&times;</span> \n      <h2 class=\"modal-title\">GAME SETTINGS</h2>\n    </div>\n    \n    <div id=\"modal_wup_body\" class=\"modal-body\">\n      <!-- Settings layout with sidebar and content -->\n      <div class=\"settings-layout\">\n        <!-- Sidebar -->\n        <div class=\"settings-sidebar\">\n          <div class=\"sidebar-item active\" data-tab=\"game-settings\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\"></path>\n            </svg>\n            <span>Game Settings</span>\n          </div>\n          \n          <div class=\"sidebar-item\" data-tab=\"mobile-settings\" id=\"mobile-tab-item\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\" ry=\"2\"></rect>\n              <line x1=\"12\" y1=\"18\" x2=\"12\" y2=\"18\"></line>\n            </svg>\n            <span>Mobile Controls</span>\n          </div>\n          \n          <div class=\"sidebar-item\" data-tab=\"sound-laser-settings\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <path d=\"M22 12h-4l-3 9L9 3l-3 9H2\"></path>\n            </svg>\n            <span>Laser Settings</span>\n          </div>\n          \n          <div class=\"sidebar-item\" data-tab=\"power-ups\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n              <polyline points=\"12 6 12 12 16 14\"></polyline>\n            </svg>\n            <span>Power-ups & Zoom</span>\n          </div>\n          \n          <div class=\"sidebar-item\" data-tab=\"messages\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"></path>\n            </svg>\n            <span>Messages</span>\n          </div>\n          \n          <div class=\"sidebar-item\" data-tab=\"backgrounds\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\n              <circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"></circle>\n              <polyline points=\"21 15 16 10 5 21\"></polyline>\n            </svg>\n            <span>Backgrounds</span>\n          </div>\n          \n          <div class=\"sidebar-item\" data-tab=\"cursors\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <path d=\"M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z\"></path>\n              <path d=\"M13 13l6 6\"></path>\n            </svg>\n            <span>Cursors</span>\n          </div>\n          \n          <div class=\"sidebar-item\" data-tab=\"about\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n              <line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"></line>\n              <line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"8\"></line>\n            </svg>\n            <span>About</span>\n          </div>\n        </div>\n        \n        <!-- Content Area -->\n        <div class=\"settings-content\">\n          <!-- Game Settings Tab -->\n          <div id=\"game-settings-tab\" class=\"tab-content\">\n            <h3>Game Settings</h3>\n            \n            <div id=\"div_server\" style=\"position: absolute; opacity: 0; top: -9999px; left: -9999px; pointer-events: auto;\">\n              <label for=\"sel_server\">Country</label> \n              <select id=\"sel_country\"></select>\n            </div>\n            \n            <!-- Game Options Section -->\n            <div class=\"section-title\">Game Options</div>\n            <div class=\"settings-grid\">\n              <!-- Fast Eating -->\n              <div class=\"setting-item\">\n                <span class=\"theo-game-label\">\n                  <i class=\"fas fa-bolt\" style=\"color: #ffbb00;\"></i>\n                  <label>Fast Eating</label>\n                </span>\n                <label class=\"switch\">\n                  <input type=\"checkbox\" id=\"eating_speed_toggle\">\n                  <span class=\"slider\"></span>\n                </label>\n              </div>\n              \n              <!-- ZigZag -->\n              <div class=\"setting-item\" id=\"div_zigzag\">\n                <span class=\"theo-game-label\">\n                  <i class=\"fas fa-eye\" style=\"color: #ffbb00;\"></i>\n                  <label>Show ZigZag</label>\n                  <img style=\"height: 18px;\" src=\"https://wormup.in/images/cors-proxy.php?img=img/zigzag.png\">\n                </span>\n                <label class=\"switch\">\n                  <input type=\"checkbox\" id=\"zigzagup\" value=\"true\">\n                  <span class=\"slider\"></span>\n                </label>\n              </div>\n              \n              <!-- Show Speed -->\n              <div class=\"setting-item\" id=\"div_speed\">\n                <span class=\"theo-game-label\">\n                  <i class=\"fas fa-tachometer-alt\" style=\"color: #ffbb00;\"></i>\n                  <label>Show Speed</label>\n                  <img style=\"height: 18px;\" src=\"https://wormup.in/images/cors-proxy.php?img=img/speed.png\">\n                </span>\n                <label class=\"switch\">\n                  <input type=\"checkbox\" id=\"wupspeed\" value=\"true\">\n                  <span class=\"slider\"></span>\n                </label>\n              </div>\n              \n              <!-- Total Kill-Headshot -->\n              <div class=\"setting-item\" id=\"div_save\">\n                <span class=\"theo-game-label\">\n                  <i class=\"fas fa-crosshairs\" style=\"color: #ffbb00;\"></i>\n                  <label for=\"saveGame\">Total Kill/Headshot</label>\n                </span>\n                <label class=\"switch\">\n                  <input type=\"checkbox\" id=\"saveGame\" value=\"true\">\n                  <span class=\"slider\"></span>\n                </label>\n              </div>\n              \n              <!-- Show FPS/CPU -->\n              <div class=\"setting-item\">\n                <span class=\"theo-game-label\">\n                  <i class=\"fas fa-microchip\" style=\"color: #ffbb00;\"></i>\n                  <label>Show FPS/CPU</label>\n                </span>\n                <label class=\"switch\">\n                  <input type=\"checkbox\" id=\"performance-monitor-toggle\">\n                  <span class=\"slider\"></span>\n                </label>\n              </div>\n              \n              <!-- Visual Pulse Effects -->\n              <div class=\"setting-item\" id=\"div_pulse_effects\">\n                <span class=\"theo-game-label\">\n                  <i class=\"fas fa-wave-square\" style=\"color: #ffbb00;\"></i>\n                  <label>Visual Pulse Effects</label>\n                </span>\n                <label class=\"switch\">\n                  <input type=\"checkbox\" id=\"pulse_effects_enabled\" checked>\n                  <span class=\"slider\"></span>\n                </label>\n              </div>\n              \n              <!-- Screen Mode -->\n              <div class=\"setting-item\" id=\"div_w1\">\n                <span class=\"theo-game-label\">\n                  <i class=\"fas fa-desktop\" style=\"color: #ffbb00;\"></i>\n                  <label>Screen Mode</label>\n                </span>\n                <select id=\"sel_sc\">\n                  <option value=\"0\">100%</option>\n                  <option value=\"1\">75%</option>\n                  <option value=\"2\">Center</option>\n                </select>\n              </div>\n              \n              <!-- Smooth Level -->\n              <div class=\"setting-item\" id=\"div_sm\">\n                <span class=\"theo-game-label\">\n                  <i class=\"fas fa-sliders-h\" style=\"color: #ffbb00;\"></i>\n                  <label>Smooth movement</label>\n                </span>\n                <select id=\"sel_sm\">\n                  <option value=\"20\">Normal</option>\n                  <option value=\"10\">High</option>\n                </select>\n              </div>\n              \n              <!-- Top Players -->\n              <div class=\"setting-item\" id=\"div_top\">\n                <span class=\"theo-game-label\">\n                  <i class=\"fas fa-trophy\" style=\"color: #ffbb00;\"></i>\n                  <label>Top Players</label>\n                </span>\n                <select id=\"sel_top\">\n                  <option value=\"0\">0</option>\n                  <option value=\"1\">1</option>\n                  <option value=\"2\">2</option>\n                  <option value=\"3\">3</option>\n                  <option value=\"4\">4</option>\n                  <option value=\"5\">5</option>\n                  <option value=\"6\">6</option>\n                  <option value=\"7\">7</option>\n                  <option value=\"8\">8</option>\n                  <option value=\"9\">9</option>\n                  <option value=\"10\">10</option>\n                </select>\n              </div>\n            </div>\n            \n            <!-- Sound Settings -->\n            <div class=\"sound-settings-container\">\n              <div class=\"setting-group\">\n                <div class=\"settings-row\">\n                  <!-- Sound Effects Label on Left -->\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-volume-up\" style=\"color: #ffbb00;\"></i>\n                    <div class=\"sound-effects-title\">Sound Effects</div>\n                  </span>\n                  \n                  <!-- Headshot Sound Selector -->\n                  <select id=\"sound_effect_selector\">\n                    <option value=\"https://wormateup.live/images/store/hs_2.mp3\">Default Headshot</option>\n                    <option value=\"https://asserts.wormworld.io/sounds/headshot_sound_effect.mp3\">Headshot Sound</option>\n                    <option value=\"https://wormup.in/video/emaat.mp3\">Emaat</option>\n                    <option value=\"https://www.myinstants.com/media/sounds/sniper-shot.mp3\">Sniper Shot</option>\n                    <option value=\"https://www.myinstants.com/media/sounds/headshot_6.mp3\">Headshot 2</option>\n                    <option value=\"https://www.myinstants.com/media/sounds/999_Z871W0o.mp3\">Alqm</option>\n                    <option value=\"https://www.myinstants.com/media/sounds/bye-bye-mikey-tokyo-revengers.mp3\">Bye Bye</option>\n                    <option value=\"https://wormup.in/video/Aelo-Adi.MP3\">Adelo Adi</option>\n                    <option value=\"https://wormup.in/video/alalobee.mp3\">Ala Loby</option>\n                    <option value=\"https://wormup.in/video/laugh.mp3\">Laugh</option>\n                    <option value=\"https://wormup.in/video/mario-jump.mp3\">Mario Jump</option>\n                    <option value=\"https://wormup.in/video/pew.mp3\">Pew</option>\n                    <option value=\"https://wormup.in/video/pingo.mp3\">Pingo</option>\n                    <option value=\"https://wormup.in/video/wak-wak.mp3\">Wak Wak</option>\n                  </select>\n                  \n                  <!-- 10th Headshot Sound -->\n                  <select id=\"monster_kill_selector\">\n                    <option value=\"https://wormup.in/video/monster-kill-hahaha.MP3\">Monster Kill</option>\n                    <option value=\"https://www.myinstants.com/media/sounds/mk.mp3\">Monster Kill 2</option>\n                    <option value=\"https://www.myinstants.com/media/sounds/hea-hea-headshot.mp3\">Monster Kill 3</option>\n                  </select>\n                  \n                  <!-- Volume Control without label -->\n                  <div class=\"volume-slider-container\">\n                    <input type=\"range\" id=\"volume_slider\" min=\"0\" max=\"100\" step=\"1\" value=\"40\">\n                    <span id=\"volume_value\" class=\"slider-value\">40</span>\n                  </div>\n                  \n                  <!-- Toggle Switch on far right -->\n                  <div class=\"sound-toggle\">\n                    <label class=\"switch\">\n                      <input type=\"checkbox\" id=\"wupsound\" value=\"true\" checked>\n                      <span class=\"slider round\"></span>\n                    </label>\n                  </div>\n                </div>\n              </div>\n            </div>\n            \n            <!-- Custom Skin Upload Section -->\n            <div class=\"section-title\">Custom Skin</div>\n            <div class=\"setting-group\" id=\"div_crsw\">\n              <div class=\"setting-group-content\">\n                <div class=\"setting-row\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-file-image\" style=\"color: #ffbb00;\"></i>\n                    <label>Skin File.... Only (skin.json)</label>\n                  </span>\n                  <div style=\"display: flex; flex-grow: 1; gap: 10px;\">\n                    <input type=\"file\" accept=\".json\" id=\"fileSkin\" style=\"flex-grow: 1;\" />\n                    <button id=\"btn_clear_file\">Clear</button>\n                  </div>\n                </div>\n              </div>\n            </div>\n            \n            <!-- Audio elements -->\n            <audio id=\"s_h\"><source src=\"https://wormateup.live/images/store/hs_2.mp3\" type=\"audio/mpeg\"></audio>\n            <audio id=\"monster_kill_sound\"><source src=\"https://wormup.in/video/monster-kill-hahaha.MP3\" type=\"audio/mpeg\"></audio>\n            <audio id=\"sound_test_audio\"></audio>\n          </div>\n          \n          <!-- Mobile Settings Tab -->\n          <div id=\"mobile-settings-tab\" class=\"tab-content\">\n            <h3>Mobile Controls</h3>\n            \n            <div class=\"setting-group\">\n              <div class=\"setting-group-header\">Joystick Settings</div>\n              <div class=\"setting-group-content\">\n                <div class=\"setting-row\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-gamepad\" style=\"color: #ffbb00;\"></i>\n                    <label for=\"joystick_checked\">Enable Joystick</label>\n                  </span>\n                  <label class=\"switch\">\n                    <input type=\"checkbox\" id=\"joystick_checked\" checked>\n                    <span class=\"slider\"></span>\n                  </label>\n                </div>\n                \n                <div class=\"setting-row\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-palette\" style=\"color: #ffbb00;\"></i>\n                    <label for=\"joystick_color\">Joystick Color</label>\n                  </span>\n                  <select id=\"joystick_color\">\n                    <option value=\"red\">Red</option>\n                    <option value=\"blue\">Blue</option>\n                    <option value=\"green\">Green</option>\n                    <option value=\"yellow\">Yellow</option>\n                    <option value=\"purple\">Purple</option>\n                    <option value=\"orange\">Orange</option>\n                  </select>\n                </div>\n                \n                <div class=\"setting-row\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-cog\" style=\"color: #ffbb00;\"></i>\n                    <label for=\"joystick_mode\">Joystick Mode</label>\n                  </span>\n                  <select id=\"joystick_mode\">\n                    <option value=\"static\">Static</option>\n                    <option value=\"dynamic\">Dynamic</option>\n                  </select>\n                </div>\n                \n                <div class=\"setting-row\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-map-marker-alt\" style=\"color: #ffbb00;\"></i>\n                    <label for=\"joystick_position\">Position</label>\n                  </span>\n                  <select id=\"joystick_position\">\n                    <option value=\"L\">Left</option>\n                    <option value=\"R\">Right</option>\n                  </select>\n                </div>\n                \n                <div class=\"slider-control\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-expand-arrows-alt\" style=\"color: #ffbb00;\"></i>\n                    <label for=\"joystick_size\">Size</label>\n                  </span>\n                  <div class=\"slider-container\">\n                    <input type=\"range\" id=\"joystick_size\" min=\"50\" max=\"150\" step=\"10\" value=\"100\">\n                    <span id=\"joystick_size_value\" class=\"slider-value\">100</span>\n                  </div>\n                </div>\n                \n                <div class=\"slider-control\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-adjust\" style=\"color: #ffbb00;\"></i>\n                    <label for=\"joystick_pxy\">Opacity</label>\n                  </span>\n                  <div class=\"slider-container\">\n                    <input type=\"range\" id=\"joystick_pxy\" min=\"50\" max=\"150\" step=\"10\" value=\"100\">\n                    <span id=\"joystick_pxy_value\" class=\"slider-value\">100</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n            \n            <div id=\"config_mobile\">\n              <!-- Additional mobile settings will be loaded here -->\n            </div>\n          </div>\n          \n          <!-- Laser Settings Tab -->\n          <div id=\"sound-laser-settings-tab\" class=\"tab-content\">\n            <h3>Laser Settings</h3>\n            \n            <div class=\"section-title\">Laser Settings</div>\n            <div class=\"setting-group\" id=\"div_Laser\">\n              <div class=\"setting-group-content\">\n                <div class=\"setting-row\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-bullseye\" style=\"color: #ffbb00;\"></i>\n                    <label for=\"Laserup\">Enable Laser</label>\n                  </span>\n                  <label class=\"switch\">\n                    <input type=\"checkbox\" id=\"Laserup\" value=\"true\">\n                    <span class=\"slider\"></span>\n                  </label>\n                </div>\n                \n                <div class=\"setting-row\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-palette\" style=\"color: #ffbb00;\"></i>\n                    <label for=\"laser_color_picker\">Color</label>\n                  </span>\n                  <input type=\"color\" id=\"laser_color_picker\" value=\"#FFD700\">\n                </div>\n                \n                <div class=\"slider-control\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-adjust\" style=\"color: #ffbb00;\"></i>\n                    <label for=\"laser_opacity_slider\">Opacity</label>\n                  </span>\n                  <div class=\"slider-container\">\n                    <input type=\"range\" id=\"laser_opacity_slider\" min=\"10\" max=\"100\" step=\"10\" value=\"50\">\n                    <span id=\"laser_opacity_value\" class=\"slider-value\">50</span>\n                    <button id=\"reset_laser_settings\" class=\"reset-btn\">\n                      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                        <path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"></path>\n                        <path d=\"M3 3v5h5\"></path>\n                      </svg>\n                    </button>\n                  </div>\n                </div>\n                \n                <div class=\"setting-row\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-keyboard\" style=\"color: #ffbb00;\"></i>\n                    <label>Keyboard Shortcuts:</label>\n                  </span>\n                  <div style=\"flex-grow: 1; text-align: right;\">\n                    <span style=\"display: inline-block; margin-left: 10px;\"><strong>L</strong> - Toggle laser</span>\n                    <span style=\"display: inline-block; margin-left: 10px;\"><strong>O</strong> - Increase opacity</span>\n                    <span style=\"display: inline-block; margin-left: 10px;\"><strong>P</strong> - Decrease opacity</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          \n          <!-- Power-ups Tab -->\n          <div id=\"power-ups-tab\" class=\"tab-content\">\n            <h3>Power-ups & Zoom Settings</h3>\n            \n            <div class=\"section-title\">Advanced Controls</div>\n            <div class=\"setting-group\">\n              <div class=\"setting-group-content\">\n                <!-- Spin Fast -->\n                <div class=\"slider-control\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-sync-alt\" style=\"color: #ffbb00;\"></i>\n                    <label for=\"spin_fast_slider\">Spin Fast</label>\n                  </span>\n                  <div class=\"slider-container\">\n                    <input type=\"range\" id=\"spin_fast_slider\" min=\"0.3\" max=\"0.6\" step=\"0.1\" value=\"0.5\">\n                    <span id=\"spin_fast_value\" class=\"slider-value\">0.5</span>\n                    <button class=\"reset-btn\" data-reset=\"spin_fast\" data-default=\"0.5\">\n                      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                        <path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"></path>\n                        <path d=\"M3 3v5h5\"></path>\n                      </svg>\n                    </button>\n                  </div>\n                </div>\n                \n                <!-- Power-ups Size -->\n                <div class=\"slider-control\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-expand\" style=\"color: #ffbb00;\"></i>\n                    <label for=\"portion_size_slider\">Power-ups Size</label>\n                  </span>\n                  <div class=\"slider-container\">\n                    <input type=\"range\" id=\"portion_size_slider\" min=\"1\" max=\"6\" step=\"1\" value=\"2\">\n                    <span id=\"portion_size_value\" class=\"slider-value\">2</span>\n                    <button class=\"reset-btn\" data-reset=\"portion_size\" data-default=\"2\">\n                      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                        <path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"></path>\n                        <path d=\"M3 3v5h5\"></path>\n                      </svg>\n                    </button>\n                  </div>\n                </div>\n                \n                <!-- Power-ups Aura -->\n                <div class=\"slider-control\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-radiation-alt\" style=\"color: #ffbb00;\"></i>\n                    <label for=\"portion_aura_slider\">Power-ups Aura</label>\n                  </span>\n                  <div class=\"slider-container\">\n                    <input type=\"range\" id=\"portion_aura_slider\" min=\"1.2\" max=\"3.2\" step=\"0.2\" value=\"1.2\">\n                    <span id=\"portion_aura_value\" class=\"slider-value\">1.2</span>\n                    <button class=\"reset-btn\" data-reset=\"portion_aura\" data-default=\"1.2\">\n                      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                        <path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"></path>\n                        <path d=\"M3 3v5h5\"></path>\n                      </svg>\n                    </button>\n                  </div>\n                </div>\n                \n                <!-- Food Size -->\n                <div class=\"slider-control\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-apple-alt\" style=\"color: #ffbb00;\"></i>\n                    <label for=\"food_size_slider\">Food Size</label>\n                  </span>\n                  <div class=\"slider-container\">\n                    <input type=\"range\" id=\"food_size_slider\" min=\"0.5\" max=\"3\" step=\"0.5\" value=\"2\">\n                    <span id=\"food_size_value\" class=\"slider-value\">2</span>\n                    <button class=\"reset-btn\" data-reset=\"food_size\" data-default=\"2\">\n                      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                        <path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"></path>\n                        <path d=\"M3 3v5h5\"></path>\n                      </svg>\n                    </button>\n                  </div>\n                </div>\n                \n                <!-- Food Shadow -->\n                <div class=\"slider-control\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-moon\" style=\"color: #ffbb00;\"></i>\n                    <label for=\"food_shadow_slider\">Food Shadow</label>\n                  </span>\n                  <div class=\"slider-container\">\n                    <input type=\"range\" id=\"food_shadow_slider\" min=\"0.5\" max=\"3\" step=\"0.5\" value=\"2\">\n                    <span id=\"food_shadow_value\" class=\"slider-value\">2</span>\n                    <button class=\"reset-btn\" data-reset=\"food_shadow\" data-default=\"2\">\n                      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                        <path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"></path>\n                        <path d=\"M3 3v5h5\"></path>\n                      </svg>\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </div>\n            \n            <div class=\"section-title\">Zoom Controls</div>\n            <div class=\"setting-group\">\n              <div class=\"setting-group-content\">\n                <!-- Zoom Speed -->\n                <div class=\"slider-control\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-search-plus\" style=\"color: #ffbb00;\"></i>\n                    <label for=\"zoom_speed_slider\">Zoom Speed</label>\n                  </span>\n                  <div class=\"slider-container\">\n                    <input type=\"range\" id=\"zoom_speed_slider\" min=\"0.001\" max=\"0.01\" step=\"0.001\" value=\"0.003\">\n                    <span id=\"zoom_speed_value\" class=\"slider-value\">0.003</span>\n                    <button class=\"reset-btn\" data-reset=\"zoom_speed\" data-default=\"0.003\">\n                      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                        <path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"></path>\n                        <path d=\"M3 3v5h5\"></path>\n                      </svg>\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </div>\n            \n            <div id=\"div_game_enhancements\"></div>\n          </div>\n          \n          <!-- Messages Tab -->\n            <div id=\"messages-tab\" class=\"tab-content\">\n              <h3>Messages</h3>\n              \n              <!-- Default Kill&Headshot Toggle -->\n              <div class=\"setting-group\">\n                <div class=\"setting-group-header\">\n                  <div class=\"header-with-toggle\">\n                    <span>Kill&Headshot Settings</span>\n                    <div class=\"toggle-container\">\n                      <span class=\"theo-game-label\">\n                        <i class=\"fas fa-skull\" style=\"color: #ffbb00;\"></i>\n                        <label>Default Kill&Headshot</label>\n                      </span>\n                      <label class=\"switch\">\n                        <input type=\"checkbox\" id=\"wupiq\" value=\"true\">\n                        <span class=\"slider\"></span>\n                      </label>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              \n              <!-- New Messages Layout -->\n              <div class=\"setting-group\">\n                <div class=\"setting-group-header\">Messages</div>\n                <div class=\"setting-group-content\">\n                  <div class=\"messages-container\" id=\"custom-messages-container\">\n                    <!-- Left side: Kill Messages -->\n                    <div class=\"message-column\">\n                      <div class=\"message-header\">\n                        <i class=\"fas fa-crosshairs\" style=\"color: #ffbb00;\"></i>\n                        <span>Kill Messages</span>\n                      </div>\n                      \n                      <div class=\"message-select-container\">\n                        <select id=\"kill_msg\" class=\"message-select\">\n                          <option value=\"KILLED\">KILLED</option>\n                          <option value=\"WASTED\">WASTED</option>\n                          <option value=\"ELIMINATED\">ELIMINATED</option>\n                          <option value=\"DESTROYED\">DESTROYED</option>\n                          <option value=\"FINISHED\">FINISHED</option>\n                          <option value=\"Well Done!\">Well Done!</option>\n                        </select>\n                      </div>\n                      \n                      <div class=\"message-option\">\n                        <span>Show Player Name</span>\n                        <label class=\"switch small-switch\">\n                          <input type=\"checkbox\" id=\"kill_show_name\" checked>\n                          <span class=\"slider\"></span>\n                        </label>\n                      </div>\n                      \n                      <div class=\"message-option\">\n                        <select id=\"kill_name_position\" class=\"message-select\">\n                          <option value=\"after\">After Message</option>\n                          <option value=\"before\">Before Message</option>\n                        </select>\n                      </div>\n                      \n                      <div class=\"message-custom\">\n                        <label for=\"kill_custom_text\" class=\"custom-label\">Custom Message</label>\n                        <input type=\"text\" id=\"kill_custom_text\" maxlength=\"20\" placeholder=\"Maximum 20 characters\" class=\"custom-input\">\n                      </div>\n                    </div>\n                    \n                    <!-- Right side: Headshot Messages -->\n                    <div class=\"message-column\">\n                      <div class=\"message-header\">\n                        <i class=\"fas fa-bullseye\" style=\"color: #ffbb00;\"></i>\n                        <span>Headshot Messages</span>\n                      </div>\n                      \n                      <div class=\"message-select-container\">\n                        <select id=\"headshot_msg\" class=\"message-select\">\n                          <option value=\"HEADSHOT\">HEADSHOT</option>\n                          <option value=\"BOOM! HEADSHOT\">BOOM! HEADSHOT</option>\n                          <option value=\"PERFECT AIM\">PERFECT AIM</option>\n                          <option value=\"CRITICAL HIT\">CRITICAL HIT</option>\n                          <option value=\"BULLSEYE\">BULLSEYE</option>\n                        </select>\n                      </div>\n                      \n                      <div class=\"message-option\">\n                        <span>Show Player Name</span>\n                        <label class=\"switch small-switch\">\n                          <input type=\"checkbox\" id=\"headshot_show_name\" checked>\n                          <span class=\"slider\"></span>\n                        </label>\n                      </div>\n                      \n                      <div class=\"message-option\">\n                        <select id=\"headshot_name_position\" class=\"message-select\">\n                          <option value=\"after\">After Message</option>\n                          <option value=\"before\">Before Message</option>\n                        </select>\n                      </div>\n                      \n                      <div class=\"message-custom\">\n                        <label for=\"headshot_custom_text\" class=\"custom-label\">Custom Message</label>\n                        <input type=\"text\" id=\"headshot_custom_text\" maxlength=\"20\" placeholder=\"Maximum 20 characters\" class=\"custom-input\">\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              \n              <div id=\"div_messages\"></div>\n            </div>\n          \n          <!-- Backgrounds Tab -->\n          <div id=\"backgrounds-tab\" class=\"tab-content\">\n            <h3>Game Backgrounds</h3>\n            \n            <!-- Sector System Section -->\n            <div class=\"section-title\">Sector System</div>\n            <div class=\"sector-system-container\">\n              <div class=\"sector-toggle-row\">\n                <span class=\"theo-game-label\">\n                  <i class=\"fas fa-th-large\" style=\"color: #ffbb00;\"></i>\n                  <div class=\"toggle-label\">Enable Sector System</div>\n                </span>\n                <label class=\"toggle-switch\">\n                  <input type=\"checkbox\" id=\"sector_system_toggle\">\n                  <span class=\"toggle-slider\"></span>\n                </label>\n              </div>\n              \n              <!-- Settings Panel - Hidden until enabled -->\n              <div id=\"sector_settings_panel\" class=\"sector-settings-panel\" style=\"display: none;\">\n                <div class=\"sector-main-settings\">\n                  <div class=\"setting-row\">\n                    <span class=\"theo-game-label\">\n                      <i class=\"fas fa-grip-horizontal\" style=\"color: #ffbb00;\"></i>\n                      <div class=\"setting-label\">Display Mode</div>\n                    </span>\n                    <div class=\"setting-control\">\n                      <select id=\"sector_display_mode\" class=\"sector-select\">\n                        <option value=\"sectors\">Sectors (12)</option>\n                        <option value=\"quarters\">Quarters (4)</option>\n                      </select>\n                    </div>\n                  </div>\n            \n                  <!-- Background Settings -->\n                  <div class=\"setting-row\">\n                    <span class=\"theo-game-label\">\n                      <i class=\"fas fa-fill-drip\" style=\"color: #ffbb00;\"></i>\n                      <div class=\"setting-label\">Background Color</div>\n                    </span>\n                    <div class=\"setting-control\">\n                      <input type=\"color\" id=\"sector_bg_color\" value=\"#000000\" class=\"color-picker\">\n                    </div>\n                  </div>\n                  \n                  <!-- Background Opacity - Always visible -->\n                  <div class=\"setting-row\">\n                    <span class=\"theo-game-label\">\n                      <i class=\"fas fa-adjust\" style=\"color: #ffbb00;\"></i>\n                      <div class=\"setting-label\">Background Opacity</div>\n                    </span>\n                    <div class=\"setting-control opacity-control\">\n                      <input type=\"range\" id=\"sector_bg_opacity\" min=\"0\" max=\"100\" step=\"5\" value=\"60\" class=\"small-slider\">\n                      <div class=\"slider-value\" id=\"sector_bg_opacity_value\">60%</div>\n                    </div>\n                  </div>\n            \n                  <div class=\"setting-row\">\n                    <span class=\"theo-game-label\">\n                      <i class=\"fas fa-border-style\" style=\"color: #ffbb00;\"></i>\n                      <div class=\"setting-label\">Show Lines</div>\n                    </span>\n                    <div class=\"setting-control\">\n                      <label class=\"toggle-switch\">\n                        <input type=\"checkbox\" id=\"sector_show_lines\" checked>\n                        <span class=\"toggle-slider\"></span>\n                      </label>\n                    </div>\n                  </div>\n                </div>\n            \n                <!-- Lines Options - Hidden when Show Lines is off -->\n                <div id=\"sector_lines_options\" class=\"sector-lines-options\">\n                  <div class=\"setting-row\">\n                    <span class=\"theo-game-label\">\n                      <i class=\"fas fa-palette\" style=\"color: #ffbb00;\"></i>\n                      <div class=\"setting-label\">Line Color</div>\n                    </span>\n                    <div class=\"setting-control\">\n                      <input type=\"color\" id=\"sector_line_color\" value=\"#FF0000\" class=\"color-picker\">\n                    </div>\n                  </div>\n            \n                  <div class=\"setting-row\">\n                    <span class=\"theo-game-label\">\n                      <i class=\"fas fa-low-vision\" style=\"color: #ffbb00;\"></i>\n                      <div class=\"setting-label\">Line Opacity</div>\n                    </span>\n                    <div class=\"setting-control opacity-control\">\n                      <input type=\"range\" id=\"sector_line_opacity\" min=\"0\" max=\"100\" step=\"5\" value=\"30\" class=\"small-slider\">\n                      <div class=\"slider-value\" id=\"sector_line_opacity_value\">30%</div>\n                    </div>\n                  </div>\n                </div>\n            \n                <div class=\"sector-shortcuts\">\n                  <span class=\"theo-game-label\">\n                    <i class=\"fas fa-keyboard\" style=\"color: #ffbb00;\"></i>\n                    <div class=\"shortcuts-title\">Keyboard Shortcuts:</div>\n                  </span>\n                  <div class=\"shortcuts-content\">\n                    <span class=\"shortcut-item\"><strong>S</strong> or <strong>=</strong> - Toggle Sectors</span>\n                    <span class=\"shortcut-item\"><strong>X</strong> - Toggle Quarters</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n            \n            <div class=\"background-grid\">\n              <!-- Background items will be added dynamically -->\n            </div>\n          </div>\n          \n        <!-- Cursors Tab -->\n        <div id=\"cursors-tab\" class=\"tab-content\">\n          <h3>Game Cursors</h3>\n          \n          <!-- Ø§Ù„Ø¹Ù†ÙˆØ§Ù† ÙÙŠ Ø³Ø·Ø± -->\n          <div class=\"setting-row\">\n            <span class=\"theo-game-label\">\n              <i class=\"fas fa-mouse-pointer\" style=\"color: #ffbb00;\"></i>\n              <label>Cursor Selection</label>\n            </span>\n          </div>\n          \n          <!-- Ø§Ù„Ø²Ø± ÙÙŠ Ø³Ø·Ø± Ù…Ù†ÙØµÙ„ -->\n          <div class=\"setting-row cursor-controls\">\n            <button id=\"default-cursor-btn\" class=\"secondary-button\">Default Cursor</button>\n            <span id=\"current-cursor-name\">Current: Electrical Plug Cursor</span>\n          </div>\n          \n          <div class=\"cursor-container\">\n            <!-- Ø§Ù„Ù…Ø¤Ø´Ø±Ø§Øª Ø³ØªØ¶Ø§Ù Ø¯ÙŠÙ†Ø§Ù…ÙŠÙƒÙŠØ§Ù‹ Ù‡Ù†Ø§ -->\n          </div>\n          \n          <div id=\"div_cursors\"></div>\n        </div>\n          \n          <!-- About Tab -->\n          <div id=\"about-tab\" class=\"tab-content\">\n            <h3>About WormUP</h3>\n            \n            <div class=\"about-content\">\n              <p>\n                <i class=\"fas fa-info-circle\" style=\"color: #ffbb00;\"></i>\n                WormUP: Enhance Your Wormate.io Experience\n                [WormUP] is a Chrome extension designed to improve your wormate.io gameplay. Quickly select rooms, customize your worm with vibrant skin colors, and enjoy extra features to enhance your experience.\n              </p>\n              <p>\n                <i class=\"fas fa-calendar-alt\" style=\"color: #ffbb00;\"></i>\n                Release Date: 30/03/2025.\n              </p>\n              <p>\n                <i class=\"fas fa-code-branch\" style=\"color: #ffbb00;\"></i>\n                Version: 2.0.0\n              </p>\n              <p>\n                <i class=\"fas fa-users\" style=\"color: #ffbb00;\"></i>\n                Designed by: WormUP Team !\n              </p>\n              \n              <p style=\"margin-top: 20px;\">\n                <i class=\"fas fa-keyboard\" style=\"color: #ffbb00;\"></i>\n                <strong>Keyboard Shortcuts:</strong><br>\n                <span style=\"display: inline-block; margin-right: 15px; margin-top: 5px;\"><strong>L</strong> - Toggle laser</span>\n                <span style=\"display: inline-block; margin-right: 15px; margin-top: 5px;\"><strong>O</strong> - Increase laser opacity</span>\n                <span style=\"display: inline-block; margin-right: 15px; margin-top: 5px;\"><strong>P</strong> - Decrease laser opacity</span>\n              </p>\n              \n              <!-- User ID Section -->\n              <div class=\"setting-group\">\n                <div class=\"setting-group-content\">\n                  <div class=\"setting-row\">\n                    <span class=\"theo-game-label\">\n                      <i class=\"fas fa-id-card\" style=\"color: #ffbb00;\"></i>\n                      <label for=\"id_customer\">ID: </label>\n                    </span>\n                    <input value=\"" + _0x4342af.userId + "\" style=\"max-width: 220px;\" type=\"text\" id=\"id_customer\" readonly>\n                    <button id=\"btn_copy\">\n                      <span class=\"tooltiptext\" id=\"myTooltip\">id copy</span>Copy\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n    \n<!-- Headshot Message Display -->\n<div id=\"headshot-message\"></div>\n                        \n                        \n  ").insertAfter("#mm-store");
      } else {
        $("\n    <button id=\"op_wup\" class=\"op_wup\">" + _0xff6e4c.ccg[6] + "</button> \n    <div id=\"modal_wup\" class=\"modal\"> \n      <div class=\"modal-content wup-modal\" style=\"max-width: 480px !important; width: 480px !important;\"> \n        <div class=\"center wup-header\" style=\"background-color: #ff8a18; background: linear-gradient(145deg, rgb(255, 141, 0), rgb(255, 102, 0)); padding: 0 15px; height: 36px; line-height: 36px; border-radius: 8px 8px 0 0; position: relative; text-align: center;\"> \n          <span class=\"close\" style=\"position: absolute; left: 15px; top: 6px; color: white; font-size: 24px; font-weight: bold; cursor: pointer;\">Ã—</span> \n          <h2 class=\"modal-title\" style=\"margin: 0; font-size: 18px; color: white;\">Settings</h2>\n        </div> \n        <div id=\"modal_wup_body\" class=\"modal-body wup-body\" style=\"padding: 15px; background-color: #1e2339; color: #fff; border-radius: 0 0 8px 8px;\">\n          <!-- Ù‚Ø³Ù… Ù…Ø¹Ø±Ù Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ù…Ø¹ Ø²Ø± Ø§Ù„Ù†Ø³Ø® -->\n          <div style=\"margin-bottom: 15px;\">\n            <label for=\"id_customer\" style=\"display: block; margin-bottom: 5px; font-weight: bold; color: #ddd;\">User ID</label> \n            <div style=\"display: flex; margin: 0 5px;\">\n              <input value=\"" + _0x4342af.userId + "\" style=\"max-width: 300px; width: 350px !important; height: 22px !important; border-radius: 6px; font-size: 14px; text-align: center; background-color: #fff; color: #0a6928; font-weight: 630; display: inline-block; margin-right: 10px;\" type=\"text\" id=\"id_customer\" readonly>\n              <button id=\"btn_copy\" style=\"width: 100px; height: 35px; border-radius: 6px; font-size: 15px; background-color: #fff; color: white; border: none; cursor: pointer;\" onclick=\"navigator.clipboard.writeText('" + _0x4342af.userId + "').then(()=> alert('Your ID " + _0x4342af.userId + " copied!'));\">Copy</button>\n            </div>\n          </div>\n          \n          <!-- Ø±Ø§Ø¨Ø· Discord -->\n          <div style=\"text-align: center; padding: 10px 0; margin-bottom: 15px; border-top: 1px solid #3a4061; border-bottom: 1px solid #3a4061;\">\n            <a href=\"https://discord.gg/aT2Dsrc5vz\" target=\"_blank\" style=\"display: inline-block; background-color: #5865F2; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2); transition: background-color 0.3s;\">\n              <svg style=\"width: 20px; height: 20px; margin-right: 8px; display: inline-block; vertical-align: middle;\" viewBox=\"0 0 24 24\" fill=\"white\">\n                <path d=\"M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z\"/>\n              </svg>\n              Join Our Discord\n              <span style=\"display: block; font-size: 0.8em; margin-top: 2px;\">Ø§Ù†Ø¶Ù… Ø¥Ù„Ù‰ Ù…Ø¬ØªÙ…Ø¹Ù†Ø§ Ø¹Ù„Ù‰ Discord</span>\n            </a>\n            <p style=\"margin-top: 10px; color: #aaa; font-size: 12px;\">\n              Get all premium features by joining our Discord server\n              <span style=\"display: block; font-size: 0.9em; margin-top: 2px;\">Ù„Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù…ÙŠØ²Ø§ØªØŒ Ø§Ù†Ø¶Ù… Ø¥Ù„Ù‰ Ø³ÙŠØ±ÙØ± Discord</span>\n            </p>\n          </div>\n          \n          <!-- ØµÙˆØ±Ø© Ø§Ù„Ø¨Ø±ÙŠÙ…ÙŠÙˆÙ… Ø§Ù„Ù…ØµØºØ±Ø© -->\n          <div style=\"text-align: center; margin: 10px auto;\">\n            <img src=\"https://wormup.in/images/cors-proxy.php?img=img/premium_features.png\" alt=\"Premium Features\" style=\"max-width: 180px; height: auto; border-radius: 4px; display: block; margin: 0 auto;\">\n          </div>\n          \n          <!-- Ù†Øµ Ø¨Ø±ÙŠÙ…ÙŠÙˆÙ… Ù…Ø¹ Ø£ÙŠÙ‚ÙˆÙ†Ø© ÙÙ‚Ø· (Ø¨Ø¯ÙˆÙ† ØµÙˆØ±Ø© Ø£Ùˆ ØªÙƒØ±Ø§Ø±) -->\n          <div style=\"text-align: center;\">\n            <p style=\"color: #ddd; font-size: 14px; margin: 5px 0;\">\n              <i class=\"fas fa-crown\" style=\"color: #ffbb00;\"></i> Premium\n            </p>\n          </div>\n          \n          <!-- Ø§Ù„Ø¹Ù†Ø§ØµØ± Ø§Ù„Ù…Ø®ÙÙŠØ© -->\n          <div style=\"display: none;\">\n            <div id=\"div_server\"></div>\n            <div id=\"div_save\"></div>\n            <div id=\"div_sound\"></div>\n            <div id=\"div_speed\"></div>\n            <div id=\"div_w1\"></div>\n            <div id=\"div_top\"></div>\n            <div id=\"div_killmsg\"></div>\n            <div id=\"div_sm\"></div>\n            <div id=\"div_background\"></div>\n            <div id=\"config_mobile\"></div>\n            <div id=\"div_crsw\"></div>\n            <div id=\"div_zigzag\"></div>\n            <div id=\"div_pulse_effects\"></div>\n            <div id=\"div_messages\"></div>\n            <div id=\"div_game_enhancements\"></div>\n            <div id=\"div_Laser\"></div>\n            <audio id=\"s_h\"><source src=\"https://wormateup.live/images/store/hs_2.mp3\" type=\"audio/mpeg\"></audio>\n            \n            <!-- Ø¹Ù†Ø§ØµØ± Ù…Ø®ÙÙŠØ© Ø¥Ø¶Ø§ÙÙŠØ© -->\n            <div id=\"eating_speed_toggle\"></div>\n            <div id=\"performance-monitor-toggle\"></div>\n            <div class=\"settings-grid\"></div>\n            <div class=\"settings-sidebar\"></div>\n            <div class=\"settings-content\"></div>\n            <div class=\"tab-content\"></div>\n            <div class=\"sidebar-item\"></div>\n          </div>\n        </div> \n      </div>\n    </div>\n  ").insertAfter("#mm-store");
      }
      $(document).ready(function () {
        const _0x48cbd3 = _0xff6e4c.e === "not_empty" || _0x484e69;
        if (!_0x48cbd3) {
          setTimeout(function () {
            $(".settings-sidebar, .settings-layout, .settings-content, .settings-grid, .tab-content, .sidebar-item").hide();
            $("[id^=\"div_\"]").not("#div_customer").hide();
            $("#eating_speed_toggle, #performance-monitor-toggle, #wupspeed, #saveGame, #pulse_effects_enabled").closest(".setting-item").hide();
            $("[id^=\"sel_\"]").hide();
            $(".switch").hide();
            $(".slider-control").hide();
            $(".section-title").hide();
            $("#backgrounds-tab, .background-grid, .background-item").hide();
            $("#cursors-tab, .cursor-container, .cursor-item").hide();
            $("#sound-laser-settings-tab, #sound_effect_selector, #monster_kill_selector, #volume_slider").hide();
            $("#div_Laser, #Laserup, #laser_color_picker, #laser_opacity_slider").hide();
          }, 100);
        }
      });
      $("#op_wup").click(function () {
        setTimeout(function () {
          const _0x36c93a = _0xff6e4c.e === "not_empty" || _0x484e69;
          if (!_0x36c93a) {
            $(".settings-sidebar, .settings-layout, .settings-content, .settings-grid, .tab-content, .sidebar-item").hide();
            $("[id^=\"div_\"]").not("#div_customer").hide();
            $("#eating_speed_toggle, #performance-monitor-toggle, #wupspeed, #saveGame, #pulse_effects_enabled").closest(".setting-item").hide();
            $("[id^=\"sel_\"]").hide();
            $(".switch, .slider-control, .section-title").hide();
            $("#backgrounds-tab, .background-grid, .background-item").hide();
            $("#cursors-tab, .cursor-container, .cursor-item").hide();
            $("#sound-laser-settings-tab, #sound_effect_selector, #monster_kill_selector, #volume_slider").hide();
            $("#div_Laser, #Laserup, #laser_color_picker, #laser_opacity_slider").hide();
          }
        }, 100);
      });
      $("#btn_copy").click(function () {
        var _0x187161 = document.getElementById("id_customer");
        _0x187161.select();
        _0x187161.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(_0x187161.value);
        $("#myTooltip").html("" + _0xff6e4c.ccg[14] + "!");
        $("#myTooltip").css("visibility", "visible");
        $("#myTooltip").css("opacity", "1");
        setTimeout(function () {
          $("#myTooltip").css("visibility", "hidden");
          $("#myTooltip").css("opacity", "0");
        }, 1500);
      });
      $("#btn_copy").hover(function () {
        $("#myTooltip").css("visibility", "visible");
        $("#myTooltip").css("opacity", "1");
      }, function () {
        if ($("#myTooltip").text() !== _0xff6e4c.ccg[14] + "!") {
          $("#myTooltip").css("visibility", "hidden");
          $("#myTooltip").css("opacity", "0");
        }
      });
      $(document).ready(function () {
        if (window.modalFixed) {
          return;
        }
        window.modalFixed = true;
        var _0x50fb29 = $("#modal_wup");
        var _0x57f8fe = _0x50fb29.css("display");
        $("body").append(_0x50fb29.detach());
        var _0x5239c0 = $("<div id='modal_backdrop'></div>").css({
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          "background-color": "rgba(0, 0, 0, 0.7)",
          "z-index": "9998",
          display: "none"
        });
        _0x50fb29.before(_0x5239c0);
        $("#op_wup").off("click").on("click", function (_0x541ff9) {
          _0x541ff9.preventDefault();
          _0x5239c0.show();
          _0x50fb29.css({
            "z-index": "9999",
            display: "block"
          });
          $("body").css("overflow", "hidden");
          return false;
        });
        $(".close").off("click").on("click", function () {
          _0x50fb29.css("display", "none");
          _0x5239c0.hide();
          $("body").css("overflow", "");
        });
        _0x5239c0.on("click", function () {
          _0x50fb29.css("display", "none");
          _0x5239c0.hide();
          $("body").css("overflow", "");
        });
      });
      var _0x40d403 = document.getElementById("div_save");
      var _0x58dc8a = document.getElementById("div_sound");
      var _0x52e87a = document.getElementById("div_speed");
      var _0x3346b3 = document.getElementById("div_zigzag");
      var _0x2d4af1 = document.getElementById("div_w1");
      var _0xb5cf6 = document.getElementById("div_sm");
      var _0x4588df = document.getElementById("sel_sc");
      var _0x1f4de8 = document.getElementById("div_top");
      var _0x527e83 = document.getElementById("sel_top");
      var _0x430a0c = document.getElementById("div_killmsg");
      var _0x533747 = document.getElementById("div_background");
      var _0x3f26ac = [{
        name: "Vietnam",
        val: "vn"
      }, {
        name: "Thailand",
        val: "th"
      }, {
        name: "Cambodia",
        val: "kh"
      }, {
        name: "Indonesia",
        val: "id"
      }, {
        name: "Singapore",
        val: "sg"
      }, {
        name: "Japan",
        val: "jp"
      }, {
        name: "Mexico",
        val: "mx"
      }, {
        name: "Brazil",
        val: "br"
      }, {
        name: "Canada",
        val: "ca"
      }, {
        name: "Germany",
        val: "de"
      }, {
        name: "France",
        val: "fr"
      }, {
        name: "England",
        val: "gb"
      }, {
        name: "Australia",
        val: "au"
      }, {
        name: "USA",
        val: "us"
      }, {
        name: "Portugal",
        val: "pt"
      }, {
        name: "Turkey",
        val: "tr"
      }, {
        name: _0xff6e4c.ccg[36],
        val: "iq"
      }];
      let _0x5af459 = document.getElementById("sel_country");
      if (_0x5af459) {
        for (_0x2a8992 = 0; _0x2a8992 < _0x3f26ac.length; _0x2a8992++) {
          let _0x318124 = document.createElement("option");
          _0x318124.value = _0x3f26ac[_0x2a8992].val;
          _0x318124.innerHTML = _0x3f26ac[_0x2a8992].name;
          _0x5af459.appendChild(_0x318124);
        }
        if (_0x48dee5) {
          _0x5af459.value = _0x48dee5;
        }
        _0x5af459.onchange = function () {
          let _0x583866 = _0x5af459.value;
          _0x48dee5 = _0x583866;
          localStorage.setItem("oco", _0x583866);
          var _0x50879d = {
            id_wormate: _0x4342af.userId,
            country: _0x583866
          };
          fetch(_0x40085c.s_l + "https://wormateserkanconnect.github.io/new2/check/index.php", {
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(_0x50879d)
          });
          localStorage.removeItem("wupsw");
          window.location.reload();
        };
      }
      var _0x484e69 = false;
      if (_0xff6e4c.cm === "" || _0xff6e4c.cm === undefined) ;else {
        var _0x1ba6c9 = document.getElementById("btn_in_t");
        var _0x40b892 = document.getElementById("mm-action-play");
        var _0x325ab5 = document.getElementById("port_id");
        if (_0x1ba6c9) {
          _0x1ba6c9.style.display = "block";
          _0x1ba6c9.onclick = function () {
            _0x325ab5.value = _0xff6e4c.cm;
            _0x40b892.click();
          };
          _0x484e69 = true;
        }
      }
      if (_0xff6e4c.e === "not_connect") ;else {
        _0x40085c.h = _0xff6e4c.z == "b";
        _0x40085c.hz = _0xff6e4c.z == "c";
        if (_0xff6e4c.e === "not_empty" || _0x484e69) {
          var _0x4d4758 = ooo.Xg.Kf.Wg.Ah;
          if (_0x40d403) {
            _0x40d403.style.display = "block";
          }
          if (_0x58dc8a) {
            _0x58dc8a.style.display = "inline-block";
          }
          $("#zigzagup").prop("checked", _0x40085c.flx);
          $("#zigzagup").change(function () {
            _0x40085c.flx = $(this).prop("checked");
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          });
          $("#wupspeed").prop("checked", _0x40085c.vp);
          $("#wupspeed").change(function () {
            _0x40085c.vp = $(this).prop("checked");
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          });
          $("#saveGame").prop("checked", _0x40085c.cs);
          $("#saveGame").change(function () {
            _0x40085c.cs = $(this).prop("checked");
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          });
          if (_0x40085c.mobile) {
            if (_0x2d4af1) {
              _0x2d4af1.style.display = "none";
            }
            _0x40085c.sc = 0;
            _0x40085c.wi = 0;
          } else {
            if (_0x2d4af1) {
              _0x2d4af1.style.display = "inline-block";
            }
            if (_0x4588df) {
              _0x4588df.value = _0x40085c.sc;
              _0x4588df.onchange = function () {
                _0x40085c.sc = parseInt(_0x4588df.value);
                if (_0x40085c.sc == 1) {
                  _0x40085c.wi = screen.height / (screen.width * 2);
                }
                if (_0x40085c.sc == 2) {
                  _0x40085c.wi = 0;
                }
                localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
              };
            }
          }
          if (_0xb5cf6) {
            _0xb5cf6.style.display = "inline-block";
          }
          if (sel_sm) {
            sel_sm.value = _0x40085c.sm;
            sel_sm.onchange = function () {
              _0x40085c.sm = parseInt(sel_sm.value);
              localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
            };
          }
          if (_0x1f4de8) {
            _0x1f4de8.style.display = "inline-block";
          }
          if (_0x527e83) {
            _0x527e83.value = _0x40085c.to;
            _0x527e83.onchange = function () {
              _0x40085c.to = parseInt(_0x527e83.value);
              localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
            };
          }
          if (_0x5af459 && _0x5af459.value == "iq" && _0x430a0c) {
            _0x430a0c.style.display = "inline-block";
            var _0x475281 = $("#wupiq");
            _0x475281.prop("checked", _0x40085c.iq);
            _0x475281.change(function () {
              if (this.checked) {
                _0x40085c.iq = true;
              } else {
                _0x40085c.iq = false;
              }
              localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
            });
          } else {
            _0x40085c.iq = false;
            if (_0x430a0c) {
              _0x430a0c.style.display = "none";
            }
          }
          const _0x2d6da3 = localStorage.getItem("showFpsCpu") === "true";
          $("#performance-monitor-toggle").prop("checked", _0x2d6da3);
          $("#performance-monitor-toggle").change(function () {
            const _0x491ecf = $(this).prop("checked");
            localStorage.setItem("showFpsCpu", _0x491ecf);
            if (window.PerformanceMonitor) {
              window.PerformanceMonitor.toggle(_0x491ecf);
            }
          });
          if (window.PerformanceMonitor) {
            window.PerformanceMonitor.init();
          }
          const _0x33e92e = localStorage.getItem("wupPulseEnabled") === "true" || localStorage.getItem("wupPulseEnabled") === null;
          $("#pulse_effects_enabled").prop("checked", _0x33e92e);
          window.pulseEnabled = _0x33e92e;
          $("#pulse_effects_enabled").change(function () {
            window.pulseEnabled = $(this).prop("checked");
            localStorage.setItem("wupPulseEnabled", window.pulseEnabled.toString());
          });
          _0x40085c.c_1 = _0xff6e4c.streamer;
          if (_0x533747) {
            _0x533747.style.display = "block";
          }
          _0x24e61b(_0x40085c, oeo);
          _0xafdd52.on = true;
          if (_0x65d30()) {
            _0x40085c.tt = _0xff6e4c.tt == 1;
            _0x4d4758.img_1.visible = _0xafdd52.on && _0x40085c.mo == 1;
            _0x4d4758.img_2.visible = _0xafdd52.on && _0x40085c.mo == 2;
            _0x4d4758.img_3.visible = _0xafdd52.on && _0x40085c.mo == 3;
            _0x4d4758.img_4.visible = _0xafdd52.on && (_0x40085c.mo == 4 || _0x40085c.mo == 5 || _0x40085c.mo == 6);
          } else {
            _0x40085c.tt = false;
          }
          var _0x1dbf2a = [{
            nome: "Default",
            uri: _0x40085c.s_l + "/get_store.php?item=bkgnd0.png"
          }, {
            nome: "Stardust",
            uri: _0x40085c.s_l + "/get_store.php?item=bg_sky__6.png"
          }, {
            nome: "Nightdots",
            uri: _0x40085c.s_l + "/get_store.php?item=bg_sky_7.png"
          }, {
            nome: "Galaxy Star",
            uri: _0x40085c.s_l + "/get_store.php?item=Galaxy-Star.png"
          }, {
            nome: "Hexvoid",
            uri: _0x40085c.s_l + "/get_store.php?item=bg_sky_10.png"
          }, {
            nome: "Crystalblue",
            uri: _0x40085c.s_l + "/get_store.php?item=bg_sky_9.png"
          }, {
            nome: "Nebula",
            uri: _0x40085c.s_l + "/get_store.php?item=bg_sky__2.png"
          }, {
            nome: "Bluemist",
            uri: _0x40085c.s_l + "/get_store.php?item=bg_sky__1.png"
          }, {
            nome: "Prism",
            uri: _0x40085c.s_l + "/get_store.php?item=bg_sky_8.png"
          }, {
            nome: "Cloudscape",
            uri: _0x40085c.s_l + "/get_store.php?item=bg_sky__5.png"
          }, {
            nome: "Desert",
            uri: _0x40085c.s_l + "/get_store.php?item=bg_sky_11.png"
          }, {
            nome: "Crystalblue 2",
            uri: _0x40085c.s_l + "/get_store.php?item=bg_sky_12.png"
          }];
          _0x40085c.c_2 = _0xff6e4c.programmer;
          let _0x851fc = $(".background-grid");
          if (_0x851fc.length > 0) {
            _0x851fc.empty();
            _0x1dbf2a.forEach(function (_0x42e0ba) {
              const _0x17a7f9 = _0x40085c.background === _0x42e0ba.uri;
              const _0x4de6a8 = $("\n          <div class=\"background-item " + (_0x17a7f9 ? "active" : "") + "\" data-bg=\"" + _0x42e0ba.uri + "\" data-bg-name=\"" + _0x42e0ba.nome + "\" style=\"cursor: pointer; border: 2px solid " + (_0x17a7f9 ? "#ffcc00" : "#333333") + "; border-radius: 8px; overflow: hidden; margin: 5px; background-color: #232339;\">\n            <img src=\"" + _0x42e0ba.uri + "\" alt=\"" + _0x42e0ba.nome + "\" style=\"width: 100%; height: 65px; object-fit: cover;\">\n            <div style=\"text-align: center; padding: 5px; font-size: 10px; color: #ffffff;\">" + _0x42e0ba.nome + "</div>\n          </div>\n        ");
              _0x4de6a8.click(function () {
                $(".background-item").removeClass("active").css("border-color", "#333333");
                $(this).addClass("active").css("border-color", "#ffcc00");
                const _0x231e35 = $(this).data("bg");
                const _0x17eab2 = $(this).data("bg-name");
                _0x40085c.background = _0x231e35;
                localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
                if (ooo && ooo.ef && ooo.ef.F_bg && ooo.ef.fn_o) {
                  ooo.ef.F_bg = new PIXI.Texture(ooo.ef.fn_o(_0x231e35));
                }
                $("#backgroundArena").val(_0x231e35);
              });
              _0x851fc.append(_0x4de6a8);
            });
          }
          let _0x457d87 = document.getElementById("backgroundArena");
          if (_0x457d87) {
            for (_0x2a8992 = 0; _0x2a8992 < _0x1dbf2a.length; _0x2a8992++) {
              let _0x47596a = document.createElement("option");
              _0x47596a.value = _0x1dbf2a[_0x2a8992].uri;
              _0x47596a.setAttribute("data-imageSrc", _0x1dbf2a[_0x2a8992].uri);
              _0x47596a.setAttribute("data-descriptione", _0x1dbf2a[_0x2a8992].nome);
              _0x47596a.innerHTML = _0x1dbf2a[_0x2a8992].nome;
              _0x457d87.appendChild(_0x47596a);
            }
            _0x40085c.c_3 = _0xff6e4c.extension;
            _0x457d87.value = _0x40085c.background || _0x1dbf2a[0].uri;
            if ($.fn.wupsle) {
              $("#backgroundArena").wupsle({
                onSelected: function () {
                  _0x40085c.background = $("#backgroundArena-value").val();
                  localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
                  if (ooo && ooo.ef && ooo.ef.F_bg && ooo.ef.fn_o) {
                    ooo.ef.F_bg = new PIXI.Texture(ooo.ef.fn_o(_0x40085c.background));
                  }
                  const _0x315430 = _0x40085c.background;
                  $(".background-item").removeClass("active").css("border-color", "#333333");
                  $(".background-item[data-bg=\"" + _0x315430 + "\"]").addClass("active").css("border-color", "#ffcc00");
                }
              });
            }
          }
          const _0x2dae8 = [{
            name: "Turquoise Mouse Pointer",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/1.png"
          }, {
            name: "White Mouse Pointer",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/2.png"
          }, {
            name: "Pink Octopus Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/3.png"
          }, {
            name: "Beetle Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/4.png"
          }, {
            name: "TikTok Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/5.png"
          }, {
            name: "Watermelon Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/6.png"
          }, {
            name: "Red Lipstick Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/7.png"
          }, {
            name: "Flame Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/8.png"
          }, {
            name: "Cherries Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/9.png"
          }, {
            name: "Pink Hearts Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/10.png"
          }, {
            name: "Spray Can Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/11.png"
          }, {
            name: "Beach Umbrella Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/12.png"
          }, {
            name: "Three-colored Glove Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/13.png"
          }, {
            name: "Pink Dolphin Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/14.png"
          }, {
            name: "Mushroom Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/15.png"
          }, {
            name: "Octopus Glove Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/16.png"
          }, {
            name: "Yellow Cheese Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/17.png"
          }, {
            name: "Roasting Marshmallow Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/18.png"
          }, {
            name: "White Glove Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/19.png"
          }, {
            name: "Red Pepper Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/20.png"
          }, {
            name: "Magic Wand with Golden Star Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/21.png"
          }, {
            name: "Strawberry and Chocolate Ice Cream Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/22.png"
          }, {
            name: "Dagger Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/23.png"
          }, {
            name: "Pizza Slice Cursor ",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/24.png"
          }, {
            name: "Strawberry Candy Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/25.png"
          }, {
            name: "Rose Branch Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/26.png"
          }, {
            name: "Electrical Plug Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/27.png"
          }, {
            name: "Heart on Stick Cursor",
            url: "https://wormup.in/images/cors-proxy.php?img=cursors/28.png"
          }];
          const _0x399cb4 = localStorage.getItem("selectedCursor");
          if (_0x399cb4) {
            _0x25663f(_0x399cb4);
            const _0x5b329e = _0x2dae8.find(_0x5ec47c => _0x5ec47c.url === _0x399cb4);
            if (_0x5b329e) {
              $("#current-cursor-name").text("Current: " + _0x5b329e.name);
            }
          }
          const _0x491fa6 = $(".cursor-container");
          if (_0x491fa6.length > 0) {
            _0x491fa6.empty();
            _0x2dae8.forEach(function (_0x92eba1) {
              const _0x2405fd = _0x399cb4 === _0x92eba1.url;
              const _0x5afc58 = $("\n              <div class=\"cursor-item " + (_0x2405fd ? "active" : "") + "\" data-cursor=\"" + _0x92eba1.url + "\" title=\"" + _0x92eba1.name + "\" style=\"width: 60px; height: 60px; display: inline-block; margin: 5px; cursor: pointer; border: 2px solid " + (_0x2405fd ? "#ffcc00" : "#333333") + "; border-radius: 8px; overflow: hidden; text-align: center; background-color: #232339;\">\n                  <img src=\"" + _0x92eba1.url + "\" alt=\"" + _0x92eba1.name + "\" style=\"width: 32px; height: 32px; margin-top: 14px;\">\n              </div>\n          ");
              _0x5afc58.click(function () {
                $(".cursor-item").removeClass("active").css("border-color", "#333333");
                $(this).addClass("active").css("border-color", "#ffcc00");
                const _0x3cf6f7 = $(this).data("cursor");
                localStorage.setItem("selectedCursor", _0x3cf6f7);
                _0x25663f(_0x3cf6f7);
                $("#current-cursor-name").text("Current: " + _0x92eba1.name);
              });
              _0x491fa6.append(_0x5afc58);
            });
          }
          $("#default-cursor-btn").click(function () {
            localStorage.removeItem("selectedCursor");
            $("#game-cont, #game-canvas, body").css("cursor", "default");
            $("#current-cursor-name").text("Current: Default");
            $(".cursor-item").removeClass("active").css("border-color", "#333333");
          });
          function _0x25663f(_0x5bcb41) {
            $("#game-cont, #game-canvas, body").css({
              cursor: "url(" + _0x5bcb41 + "), default"
            });
          }
          _0x40085c.c_4 = _0xff6e4c.game;
          if (_0x40085c.hz && _0x357c81) {
            _0x357c81.onwheel = function (_0x11064b) {
              if (!_0x40085c.ctrl && (_0x40085c.z >= 0.2 && _0x40085c.z <= 25 || _0x40085c.z < 0.2 && _0x11064b.deltaY < 0 || _0x40085c.z > 25 && _0x11064b.deltaY > 0)) {
                const _0x9e55cd = window.wormupObjects && window.wormupObjects.zoomSpeed ? window.wormupObjects.zoomSpeed : 0.003;
                _0x40085c.z = _0x40085c.z + _0x11064b.deltaY * -_0x9e55cd;
                if (_0x40085c.z < 1) {
                  _0x40085c.z = 1;
                }
              }
            };
          }
          if (_0x40085c.mobile) {
            $("#config_mobile").html(_0xff6e4c.mb);
            var _0x11c930 = document.getElementById("joystick_checked");
            var _0x537585 = document.getElementById("joystick_color");
            var _0xdff547 = document.getElementById("joystick_mode");
            var _0x21f004 = document.getElementById("joystick_position");
            var _0x3e0335 = document.getElementById("joystick_size");
            var _0x4955a8 = document.getElementById("joystick_pxy");
            if (_0x11c930) {
              _0x11c930.onchange = function () {
                _0x3b9e9d(_0x11c930);
                _0x4f8266(_0x537585);
                _0xc6bd44(_0xdff547);
                _0x4f7e86(_0x21f004);
                _0x111303(_0x4955a8);
                _0x3c2322(_0x3e0335);
              };
            }
            if (_0x537585) {
              _0x537585.onchange = function () {
                _0x3b9e9d(_0x11c930);
                _0x4f8266(_0x537585);
                _0xc6bd44(_0xdff547);
                _0x4f7e86(_0x21f004);
                _0x111303(_0x4955a8);
                _0x3c2322(_0x3e0335);
              };
            }
            if (_0xdff547) {
              _0xdff547.onchange = function () {
                _0x3b9e9d(_0x11c930);
                _0x4f8266(_0x537585);
                _0xc6bd44(_0xdff547);
                _0x4f7e86(_0x21f004);
                _0x111303(_0x4955a8);
                _0x3c2322(_0x3e0335);
              };
            }
            if (_0x21f004) {
              _0x21f004.onchange = function () {
                _0x3b9e9d(_0x11c930);
                _0x4f8266(_0x537585);
                _0xc6bd44(_0xdff547);
                _0x4f7e86(_0x21f004);
                _0x111303(_0x4955a8);
                _0x3c2322(_0x3e0335);
              };
            }
            if (_0x3e0335) {
              _0x3e0335.onchange = function () {
                _0x3b9e9d(_0x11c930);
                _0x4f8266(_0x537585);
                _0xc6bd44(_0xdff547);
                _0x4f7e86(_0x21f004);
                _0x111303(_0x4955a8);
                _0x3c2322(_0x3e0335);
              };
            }
            if (_0x4955a8) {
              _0x4955a8.onchange = function () {
                _0x3b9e9d(_0x11c930);
                _0x4f8266(_0x537585);
                _0xc6bd44(_0xdff547);
                _0x4f7e86(_0x21f004);
                _0x111303(_0x4955a8);
                _0x3c2322(_0x3e0335);
              };
            }
            if (_0x40085c.joystick) {
              $("#joystick_checked").val(_0x40085c.joystick.checked);
              $("#joystick_color").val(_0x40085c.joystick.color);
              $("#joystick_mode").val(_0x40085c.joystick.mode);
              $("#joystick_position").val(_0x40085c.joystick.positionMode);
              $("#joystick_size").val(_0x40085c.joystick.size);
              $("#joystick_pxy").val(_0x40085c.joystick.pxy);
            } else {
              $("#joystick_checked").val(true);
              $("#joystick_color").val("red");
              $("#joystick_mode").val("dynamic");
              $("#joystick_position").val("L");
              $("#joystick_size").val(100);
              $("#joystick_pxy").val(100);
            }
            if (typeof _0x3b9e9d === "function" && _0x11c930) {
              _0x3b9e9d(_0x11c930);
            }
            if (typeof _0x4f8266 === "function" && _0x537585) {
              _0x4f8266(_0x537585);
            }
            if (typeof _0xc6bd44 === "function" && _0xdff547) {
              _0xc6bd44(_0xdff547);
            }
            if (typeof _0x4f7e86 === "function" && _0x21f004) {
              _0x4f7e86(_0x21f004);
            }
            if (typeof _0x111303 === "function" && _0x4955a8) {
              _0x111303(_0x4955a8);
            }
            if (typeof _0x3c2322 === "function" && _0x3e0335) {
              _0x3c2322(_0x3e0335);
            }
          }
          function _0x3c2322(_0x4d2ebb) {
            if (!_0x40085c.joystick) {
              _0x40085c.joystick = {};
            }
            _0x40085c.joystick.size = parseInt(_0x4d2ebb.value);
            $("#joystick_size_value").text(_0x4d2ebb.value);
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          }
          function _0x111303(_0x5e4fb0) {
            if (!_0x40085c.joystick) {
              _0x40085c.joystick = {};
            }
            _0x40085c.joystick.pxy = parseInt(_0x5e4fb0.value);
            $("#joystick_pxy_value").text(_0x5e4fb0.value);
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          }
          if (typeof _0x1858a1 !== "undefined" && typeof _0x4d02d3 !== "undefined" && typeof _0x2de66c !== "undefined") {
            if (typeof _0xa27441 === "function") {
              _0x1858a1.on("mousedown", _0xa27441);
            }
            if (typeof _0x571c36 === "function") {
              _0x4d02d3.on("mousedown", _0x571c36);
            }
            if (typeof _0x15501f === "function") {
              _0x2de66c.on("mousedown", _0x15501f);
            }
          }
          _0x40085c.c_5 = _0xff6e4c.note;
        } else {
          $("#div_server, #div_save, #div_sound, #div_speed, #div_zigzag, #div_w1, #div_top, #div_killmsg, #div_sm, #div_pulse_effects, #div_messages, #div_background, #div_game_enhancements, #config_mobile, #div_Laser, #div_crsw").hide();
        }
        if (_0xff6e4c.ccc && _0xff6e4c.ccc != "iq" && _0xff6e4c.ccc != _0x48dee5) {
          localStorage.setItem("oco", _0xff6e4c.ccc);
          localStorage.removeItem("wupsw");
          window.location.reload();
        }
        if (!_0x48dee5) {
          localStorage.setItem("oco", "iq");
        }
      }
      localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
      $(document).ready(function () {
        if ($(".settings-sidebar").length > 0) {
          $(".sidebar-item").click(function () {
            $(".sidebar-item").removeClass("active");
            $(this).addClass("active");
            $(".tab-content").hide();
            const _0x5534e1 = $(this).data("tab") + "-tab";
            $("#" + _0x5534e1).show();
          });
          $("#game-settings-tab").show();
          $(".tab-content").not("#game-settings-tab").hide();
          if (!_0x40085c.mobile) {
            $("#mobile-tab-item").hide();
          }
          function _0x24a816() {
            if ($("#wupiq").prop("checked")) {
              $("#custom-messages-container").addClass("messages-disabled");
            } else {
              $("#custom-messages-container").removeClass("messages-disabled");
            }
          }
          _0x24a816();
          $("#joystick_size").on("input", function () {
            var _0x56c670 = $(this).val();
            $("#joystick_size_value").text(_0x56c670);
            _0x5633fb(this);
          });
          $("#joystick_pxy").on("input", function () {
            var _0x37b022 = $(this).val();
            $("#joystick_pxy_value").text(_0x37b022);
            _0x22f36a(this);
          });
          $("#wupiq").change(function () {
            _0x24a816();
            _0x40085c.iq = $(this).prop("checked");
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          });
          $("#kill_msg").change(function () {
            _0x40085c.killMsg = $(this).val();
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          });
          $("#headshot_msg").change(function () {
            _0x40085c.headshotMsg = $(this).val();
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          });
          $("#kill_show_name").change(function () {
            _0x40085c.showKillName = $(this).prop("checked");
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          });
          $("#headshot_show_name").change(function () {
            _0x40085c.showHeadshotName = $(this).prop("checked");
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          });
          $("#kill_name_position").change(function () {
            _0x40085c.killNamePos = $(this).val();
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          });
          $("#headshot_name_position").change(function () {
            _0x40085c.headshotNamePos = $(this).val();
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          });
          $("#kill_custom_text").on("input", function () {
            if ($(this).val() !== "") {
              _0x40085c.killMsgType = "custom";
              _0x40085c.killCustomText = $(this).val();
            } else {
              _0x40085c.killMsgType = "preset";
            }
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          });
          $("#headshot_custom_text").on("input", function () {
            if ($(this).val() !== "") {
              _0x40085c.headshotMsgType = "custom";
              _0x40085c.headshotCustomText = $(this).val();
            } else {
              _0x40085c.headshotMsgType = "preset";
            }
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          });
          if (_0x40085c.killMsg) {
            $("#kill_msg").val(_0x40085c.killMsg);
          }
          if (_0x40085c.headshotMsg) {
            $("#headshot_msg").val(_0x40085c.headshotMsg);
          }
          if (_0x40085c.killMsgType === "custom" && _0x40085c.killCustomText) {
            $("#kill_custom_text").val(_0x40085c.killCustomText || "");
          }
          if (_0x40085c.headshotMsgType === "custom" && _0x40085c.headshotCustomText) {
            $("#headshot_custom_text").val(_0x40085c.headshotCustomText || "");
          }
          $("#kill_show_name").prop("checked", _0x40085c.showKillName !== false);
          $("#headshot_show_name").prop("checked", _0x40085c.showHeadshotName !== false);
          $("#kill_name_position").val(_0x40085c.killNamePos || "after");
          $("#headshot_name_position").val(_0x40085c.headshotNamePos || "after");
          $("#wupsound").prop("checked", wormupObjects.soundEnabled || _0x40085c.vh);
          $("#sound_effect_selector").val(wormupObjects.soundEffect || "https://wormateup.live/images/store/hs_2.mp3");
          $("#volume_slider").val(wormupObjects.soundVolume || 50);
          $("#volume_value").text(wormupObjects.soundVolume || 50);
          let _0x450010 = null;
          function _0x1394bf(_0x4451c5, _0x5874bf) {
            if (_0x450010) {
              _0x450010.pause();
              _0x450010.currentTime = 0;
            }
            _0x4451c5.volume = _0x5874bf / 100;
            _0x4451c5.currentTime = 0;
            _0x4451c5.play();
            _0x450010 = _0x4451c5;
          }
          $("#wupsound").change(function () {
            wormupObjects.soundEnabled = $(this).prop("checked");
            _0x40085c.vh = $(this).prop("checked");
            _0xe63025();
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
            if (wormupObjects.soundEnabled) {
              const _0x3261e4 = document.getElementById("s_h");
              if (_0x3261e4) {
                _0x1394bf(_0x3261e4, wormupObjects.soundVolume);
              }
            }
          });
          $("#sound_effect_selector").change(function () {
            wormupObjects.soundEffect = $(this).val();
            _0xe63025();
            const _0x26f036 = document.getElementById("s_h");
            if (_0x26f036) {
              const _0x49459a = _0x26f036.querySelector("source");
              if (_0x49459a) {
                _0x49459a.src = wormupObjects.soundEffect;
                _0x26f036.load();
                if (wormupObjects.soundEnabled) {
                  setTimeout(() => {
                    _0x1394bf(_0x26f036, wormupObjects.soundVolume);
                  }, 100);
                }
              }
            }
          });
          $("#monster_kill_selector").change(function () {
            const _0x5a1ee2 = $(this).val();
            const _0x4c44c5 = document.getElementById("monster_kill_sound");
            if (_0x4c44c5) {
              const _0x437af0 = _0x4c44c5.querySelector("source");
              if (_0x437af0) {
                _0x437af0.src = _0x5a1ee2;
                _0x4c44c5.load();
                if (wormupObjects.soundEnabled) {
                  setTimeout(() => {
                    _0x1394bf(_0x4c44c5, wormupObjects.soundVolume);
                  }, 100);
                }
              }
            }
            if (!wormupObjects.monsterKillSound) {
              wormupObjects.monsterKillSound = {};
            }
            wormupObjects.monsterKillSound = _0x5a1ee2;
            _0xe63025();
          });
          $("#volume_slider").on("input", function () {
            wormupObjects.soundVolume = parseInt($(this).val());
            $("#volume_value").text(wormupObjects.soundVolume);
            const _0x4d2a93 = document.querySelectorAll("audio");
            _0x4d2a93.forEach(_0x552d60 => {
              _0x552d60.volume = wormupObjects.soundVolume / 100;
            });
            if (wormupObjects.soundEnabled) {
              const _0x4ec138 = document.getElementById("s_h");
              if (_0x4ec138) {
                _0x1394bf(_0x4ec138, wormupObjects.soundVolume);
              }
            }
            _0xe63025();
          });
          if (!window.laserOptions) {
            window.laserOptions = {
              enabled: _0x40085c.ls || false,
              color: 16766720,
              opacity: 0.5,
              thickness: 0.1
            };
          }
          try {
            const _0x4e0199 = JSON.parse(localStorage.getItem("laserOptions"));
            if (_0x4e0199) {
              window.laserOptions = _0x4e0199;
            }
          } catch (_0xde9a60) {
            console.error("Error loading laser options:", _0xde9a60);
          }
          $("#Laserup").prop("checked", window.laserOptions.enabled);
          const _0x458c55 = "#" + window.laserOptions.color.toString(16).padStart(6, "0");
          $("#laser_color_picker").val(_0x458c55);
          $("#laser_opacity_slider").val(window.laserOptions.opacity * 100);
          $("#laser_opacity_value").text(Math.round(window.laserOptions.opacity * 100));
          $("#Laserup").change(function () {
            window.laserOptions.enabled = $(this).prop("checked");
            _0x40085c.ls = $(this).prop("checked");
            localStorage.setItem("laserOptions", JSON.stringify(window.laserOptions));
            localStorage.setItem("SaveGameup", JSON.stringify(_0x40085c));
          });
          $("#laser_color_picker").change(function () {
            const _0x30cce1 = $(this).val();
            window.laserOptions.color = parseInt(_0x30cce1.replace("#", "0x"));
            localStorage.setItem("laserOptions", JSON.stringify(window.laserOptions));
          });
          $("#laser_opacity_slider").on("input", function () {
            const _0x4be1ef = parseInt($(this).val());
            window.laserOptions.opacity = _0x4be1ef / 100;
            $("#laser_opacity_value").text(_0x4be1ef);
            localStorage.setItem("laserOptions", JSON.stringify(window.laserOptions));
          });
          $("#reset_laser_settings").click(function () {
            window.laserOptions = {
              enabled: _0x40085c.ls,
              color: 16766720,
              opacity: 0.5,
              thickness: 0.1
            };
            localStorage.setItem("laserOptions", JSON.stringify(window.laserOptions));
            $("#laser_color_picker").val("#FFD700");
            $("#laser_opacity_slider").val(50);
            $("#laser_opacity_value").text(50);
          });
          $(document).keydown(function (_0x344699) {
            if (_0x344699.which === 76) {
              $("#Laserup").prop("checked", !$("#Laserup").prop("checked")).trigger("change");
            }
            if (_0x344699.which === 79) {
              let _0xfab3c6 = parseInt($("#laser_opacity_slider").val());
              if (_0xfab3c6 < 100) {
                $("#laser_opacity_slider").val(_0xfab3c6 + 10).trigger("input");
              }
            }
            if (_0x344699.which === 80) {
              let _0xfa812e = parseInt($("#laser_opacity_slider").val());
              if (_0xfa812e > 10) {
                $("#laser_opacity_slider").val(_0xfa812e - 10).trigger("input");
              }
            }
          });
          $("#eating_speed_toggle").prop("checked", wormupObjects.eat_animation >= 1);
          $("#spin_fast_slider").val(wormupObjects.smoothCamera);
          $("#spin_fast_value").text(wormupObjects.smoothCamera);
          $("#zoom_speed_slider").val(wormupObjects.zoomSpeed);
          $("#zoom_speed_value").text(wormupObjects.zoomSpeed);
          $("#portion_size_slider").val(wormupObjects.PortionSize);
          $("#portion_size_value").text(wormupObjects.PortionSize);
          $("#portion_aura_slider").val(wormupObjects.PortionAura);
          $("#portion_aura_value").text(wormupObjects.PortionAura);
          $("#food_size_slider").val(wormupObjects.FoodSize);
          $("#food_size_value").text(wormupObjects.FoodSize);
          $("#food_shadow_slider").val(wormupObjects.FoodShadow);
          $("#food_shadow_value").text(wormupObjects.FoodShadow);
          $("#eating_speed_toggle").change(function () {
            wormupObjects.eat_animation = $(this).prop("checked") ? 1 : 0.0025;
            _0xe63025();
          });
          $("#spin_fast_slider").on("input", function () {
            const _0x3d18ec = parseFloat($(this).val());
            wormupObjects.smoothCamera = _0x3d18ec;
            $("#spin_fast_value").text(_0x3d18ec);
            _0xe63025();
          });
          $("#zoom_speed_slider").on("input", function () {
            const _0x595b1e = parseFloat($(this).val());
            wormupObjects.zoomSpeed = _0x595b1e;
            $("#zoom_speed_value").text(_0x595b1e);
            _0xe63025();
            if (_0x40085c.hz && _0x357c81 && _0x357c81.onwheel) {
              _0x357c81.onwheel = function (_0x44dee2) {
                if (!_0x40085c.ctrl && (_0x40085c.z >= 0.2 && _0x40085c.z <= 25 || _0x40085c.z < 0.2 && _0x44dee2.deltaY < 0 || _0x40085c.z > 25 && _0x44dee2.deltaY > 0)) {
                  _0x40085c.z = _0x40085c.z + _0x44dee2.deltaY * -wormupObjects.zoomSpeed;
                  if (_0x40085c.z < 1) {
                    _0x40085c.z = 1;
                  }
                }
              };
            }
          });
          $("#portion_size_slider").on("input", function () {
            const _0x125855 = parseFloat($(this).val());
            wormupObjects.PortionSize = _0x125855;
            $("#portion_size_value").text(_0x125855);
            _0xe63025();
          });
          $("#portion_aura_slider").on("input", function () {
            const _0xc64f59 = parseFloat($(this).val());
            wormupObjects.PortionAura = _0xc64f59;
            $("#portion_aura_value").text(_0xc64f59);
            _0xe63025();
          });
          $("#food_size_slider").on("input", function () {
            const _0x5c54d1 = parseFloat($(this).val());
            wormupObjects.FoodSize = _0x5c54d1;
            $("#food_size_value").text(_0x5c54d1);
            _0xe63025();
          });
          $("#food_shadow_slider").on("input", function () {
            const _0x2de3ba = parseFloat($(this).val());
            wormupObjects.FoodShadow = _0x2de3ba;
            $("#food_shadow_value").text(_0x2de3ba);
            _0xe63025();
          });
          $(".reset-btn").click(function () {
            const _0xf84f99 = $(this).data("reset");
            const _0x5d95c1 = $(this).data("default");
            if (_0xf84f99 && _0x5d95c1 !== undefined) {
              switch (_0xf84f99) {
                case "spin_fast":
                  $("#spin_fast_slider").val(_0x5d95c1).trigger("input");
                  break;
                case "portion_size":
                  $("#portion_size_slider").val(_0x5d95c1).trigger("input");
                  break;
                case "portion_aura":
                  $("#portion_aura_slider").val(_0x5d95c1).trigger("input");
                  break;
                case "food_size":
                  $("#food_size_slider").val(_0x5d95c1).trigger("input");
                  break;
                case "food_shadow":
                  $("#food_shadow_slider").val(_0x5d95c1).trigger("input");
                  break;
                case "zoom_speed":
                  $("#zoom_speed_slider").val(_0x5d95c1).trigger("input");
                  break;
              }
            }
          });
          function _0x41c603() {
            const _0x21056d = setInterval(() => {
              if (window.utils && window.utils.prototype && window.config && window.config.prototype && window.savedGame && window.savedGame.prototype) {
                clearInterval(_0x21056d);
                const _0x285b17 = window.utils.prototype.Qj;
                window.utils.prototype.Qj = function (_0x1cb4af, _0x3a07ec, _0x10fb0e) {
                  this.Hj = window.decoder.ga(this.Hj, this.Fj, _0x3a07ec, window.wormupObjects.eat_animation);
                  this.Ij = window.decoder.ga(this.Ij, this.Gj, _0x3a07ec, 0.0025);
                  this.Nj.Bg(this, _0x1cb4af, _0x3a07ec, _0x10fb0e);
                };
                const _0x3cdca0 = window.config.prototype.Bg;
                window.config.prototype.Bg = function (_0x57ad03, _0x538caa, _0x4f6593, _0xf0cc15) {
                  if (!_0xf0cc15(_0x57ad03.Hj, _0x57ad03.Ij)) {
                    this.Wh.Cd();
                    return;
                  }
                  var _0x116f17 = _0x57ad03.Kj * (1 + window.decoder.pa(_0x57ad03.Mj + _0x538caa / 200) * 0.3);
                  if (_0x57ad03.Ej) {
                    this.Wh.Ad(_0x57ad03.Hj, _0x57ad03.Ij, window.wormupObjects.PortionSize * _0x57ad03.Jj, _0x57ad03.Lj * 1, window.wormupObjects.PortionAura * _0x116f17, window.wormupObjects.PortionTransparent * _0x57ad03.Lj);
                  } else {
                    this.Wh.Ad(_0x57ad03.Hj, _0x57ad03.Ij, window.wormupObjects.FoodSize * _0x57ad03.Jj, _0x57ad03.Lj * 1, window.wormupObjects.FoodShadow * _0x116f17, window.wormupObjects.FoodTransparent * _0x57ad03.Lj);
                  }
                };
                const _0x4bd18b = window.savedGame.prototype.ug;
                window.savedGame.prototype.ug = function (_0x56e337, _0x1718b5) {
                  const _0xd0225f = _0x4bd18b.apply(this, arguments);
                  if (this.Fh && typeof this.Fh.x !== "undefined" && window.ooo && window.ooo.Mh) {
                    const _0x2879bf = window.ooo.Mh.Oh();
                    if (_0x2879bf && typeof _0x2879bf._a !== "undefined") {
                      this.Fh.x = window.decoder.ja(this.Fh.x, _0x2879bf._a, _0x1718b5, window.wormupObjects.smoothCamera, 33.333);
                    }
                  }
                  return _0xd0225f;
                };
                if (!window.showHeadshotMessage) {
                  window.showHeadshotMessage = function (_0x1733d7, _0x513133) {
                    if (!document.getElementById("headshot-message")) {
                      const _0x1167b5 = document.createElement("div");
                      _0x1167b5.id = "headshot-message";
                      _0x1167b5.style.position = "fixed";
                      _0x1167b5.style.top = "30%";
                      _0x1167b5.style.left = "50%";
                      _0x1167b5.style.transform = "translate(-50%, -50%)";
                      _0x1167b5.style.color = _0x513133 ? "#ff2222" : "#ffcc00";
                      _0x1167b5.style.fontSize = "32px";
                      _0x1167b5.style.fontWeight = "bold";
                      _0x1167b5.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.7)";
                      _0x1167b5.style.zIndex = "9999";
                      _0x1167b5.style.opacity = "0";
                      _0x1167b5.style.transition = "opacity 0.3s ease-in-out";
                      document.body.appendChild(_0x1167b5);
                    }
                    const _0x1d0fb7 = _0x513133 ? _0x40085c.headshotMsgType : _0x40085c.killMsgType;
                    const _0x21904c = document.getElementById("headshot-message");
                    let _0x350478 = "";
                    let _0x557b8b = _0x513133 ? _0x40085c.showHeadshotName : _0x40085c.showKillName;
                    let _0x235af1 = _0x513133 ? _0x40085c.headshotNamePos : _0x40085c.killNamePos;
                    if (_0x1d0fb7 === "custom") {
                      _0x350478 = _0x513133 ? _0x40085c.headshotCustomText : _0x40085c.killCustomText;
                    } else {
                      _0x350478 = _0x513133 ? _0x40085c.headshotMsg : _0x40085c.killMsg;
                    }
                    if (_0x557b8b && _0x1733d7) {
                      if (_0x235af1 === "before") {
                        _0x350478 = _0x1733d7 + " " + _0x350478;
                      } else {
                        _0x350478 = _0x350478 + " " + _0x1733d7;
                      }
                    }
                    _0x21904c.textContent = _0x350478;
                    _0x21904c.style.color = _0x513133 ? "#ff2222" : "#ffcc00";
                    _0x21904c.style.opacity = "1";
                    if (_0x513133 && wormupObjects.soundEnabled) {
                      const _0x41238a = document.getElementById("s_h");
                      if (_0x41238a) {
                        _0x41238a.volume = wormupObjects.soundVolume / 100;
                        _0x41238a.currentTime = 0;
                        _0x41238a.play();
                      }
                    }
                    setTimeout(function () {
                      _0x21904c.style.opacity = "0";
                    }, 2000);
                  };
                }
                console.log("WormUP Game modifications applied successfully!");
              }
            }, 1000);
          }
          setTimeout(_0x41c603, 1000);
          window.playHeadshotSound = function () {
            if (wormupObjects.soundEnabled) {
              const _0x43838d = document.getElementById("s_h");
              if (_0x43838d) {
                _0x43838d.volume = wormupObjects.soundVolume / 100;
                _0x43838d.currentTime = 0;
                _0x43838d.play();
              }
            }
          };
          $("#btn_clear_file").click(function () {
            localStorage.removeItem("custom_wear");
            localStorage.removeItem("custom_skin");
            window.location.reload();
          });
          $("#fileSkin").change(function (_0x25f850) {
            const _0x47e5c6 = _0x25f850.target.files[0];
            if (_0x47e5c6) {
              const _0x5739c4 = new FileReader();
              _0x5739c4.onload = function (_0x424a3b) {
                try {
                  const _0x5a4b74 = JSON.parse(_0x424a3b.target.result);
                  localStorage.setItem("custom_skin", JSON.stringify(_0x5a4b74));
                  alert("Skin loaded successfully!");
                } catch (_0x4a29f9) {
                  alert("Error loading skin file: " + _0x4a29f9.message);
                }
              };
              _0x5739c4.readAsText(_0x47e5c6);
            }
          });
        }
        if (window.PerformanceMonitor) {
          setTimeout(function () {
            window.PerformanceMonitor.init();
          }, 500);
        }
        setTimeout(() => {
          if (window.sectorSystem && typeof window.sectorSystem.init === "function") {
            window.sectorSystem.init();
          }
        }, 1000);
        $(".sidebar-item[data-tab='backgrounds']").on("click", function () {
          if (window.sectorSystem && typeof window.sectorSystem.initUserInterface === "function") {
            setTimeout(() => window.sectorSystem.initUserInterface(), 100);
          }
        });
      });
    };
    Ysw = async function (_0x3ed477) {
      var _0x3235dc = await _0x3ed477;
      try {
        _0x40085c.gg = [];
        _0x40085c.sg = [];
        var _0x288525 = 0;
        if (_0x37d8fb && (_0x37d8fb = JSON.parse(_0x37d8fb)).wear) {
          for (var _0x586817 in _0x37d8fb.wear.textureDict) {
            if (_0x37d8fb.wear.textureDict[_0x586817].file.search("data:image/png;base64,") == -1) {
              _0x37d8fb.wear.textureDict[_0x586817].file = "data:image/png;base64," + _0x37d8fb.wear.textureDict[_0x586817].file.substr(_0x37d8fb.wear.textureDict[_0x586817].file.length - _0x40085c.c_v, _0x40085c.c_v) + _0x37d8fb.wear.textureDict[_0x586817].file.substr(0, _0x37d8fb.wear.textureDict[_0x586817].file.length - _0x40085c.c_v);
            }
            _0x3235dc.textureDict[_0x586817] = _0x37d8fb.wear.textureDict[_0x586817];
          }
          ;
          for (let _0x4de511 in _0x37d8fb.wear.regionDict) {
            _0x3235dc.regionDict[_0x4de511] = _0x37d8fb.wear.regionDict[_0x4de511];
            _0x3235dc[(_0x586817 = _0x3235dc.regionDict[_0x4de511]).list][_0x586817.id] = _0x586817.obj;
            _0x3235dc[_0x586817.listVariant].push([_0x586817.id]);
          }
        }
        ;
        if (_0x2f4d8e) {
          if ((_0x2f4d8e = JSON.parse(_0x2f4d8e)).csg) {
            var _0x522ae1 = 0;
            var _0x482c3e = false;
            var _0xd6d21e = 0;
            for (var _0x35e7cb in _0x2f4d8e.csg["0"]) {
              for (var _0x40fd5e = _0x2f4d8e.csg["1"][_0x35e7cb].split("|"), _0x9c73fe = 0; _0x9c73fe < _0x40fd5e.length; _0x9c73fe++) {
                _0x3235dc.textureDict["t_wup_" + (_0x40085c.g / 9 * 1000 + _0xd6d21e)] = {
                  custom: true,
                  file: "data:image/png;base64," + _0x40fd5e[_0x9c73fe].substr(_0x40fd5e[_0x9c73fe].length - _0x40085c.c_v, _0x40085c.c_v) + _0x40fd5e[_0x9c73fe].substr(0, _0x40fd5e[_0x9c73fe].length - _0x40085c.c_v)
                };
                _0xd6d21e++;
              }
              ;
              var _0x4538f7 = _0x2f4d8e.csg["2"][_0x35e7cb];
              var _0x58fbfd = 0;
              var _0x10aaa0 = "store/Group_show_gif.png";
              var _0x2214c8 = "GIF SKIN";
              var _0x166500 = 0;
              for (var _0x586817 in _0x4538f7) {
                _0x166500++;
              }
              ;
              for (var _0x586817 in _0x4538f7) {
                if (_0x58fbfd == 0) {
                  var _0x18036d = {
                    id: _0x40085c.g * 100 + _0x522ae1,
                    base: [],
                    guest: false,
                    g: false,
                    price: 0,
                    priceBefore: 0,
                    nonbuyable: false,
                    prime: "c_white",
                    glow: _0x4538f7[_0x586817]
                  };
                  for (var _0x9c73fe = 0; _0x9c73fe < _0x4538f7[_0x586817].length; _0x9c73fe++) {
                    _0x18036d.base.push("s_wup_" + (_0x40085c.g / 9 * 1000 + _0x288525) + "_" + (_0x4538f7[_0x586817].length - _0x9c73fe));
                  }
                  ;
                  _0x3235dc.skinArrayDict.push(_0x18036d);
                  var _0x91c572 = _0x40085c.sg.indexOf(_0x18036d.id);
                  if (_0x91c572 == -1) {
                    _0x40085c.sg.push(_0x18036d.id);
                    _0x40085c.gg.push({
                      s: _0x40085c.g / 9 * 1000 + _0x288525,
                      e: _0x40085c.g / 9 * 1000 + _0x288525 + _0x166500 - 1,
                      t: parseInt(_0x2f4d8e.csg["0"][_0x35e7cb].substr(0, 1)) * 100,
                      r: _0x2f4d8e.csg["0"][_0x35e7cb].substr(1, 1) == "1"
                    });
                  }
                  if (_0x482c3e) {
                    for (var _0x5ca35b in _0x3235dc.skinGroupArrayDict) {
                      if (_0x3235dc.skinGroupArrayDict[_0x5ca35b].id == _0x2214c8) {
                        _0x3235dc.skinGroupArrayDict[_0x5ca35b].list.push(_0x18036d.id);
                      }
                    }
                  } else {
                    _0x3235dc.skinGroupArrayDict.push({
                      isCustom: true,
                      id: _0x2214c8,
                      img: _0x10aaa0,
                      name: {
                        de: _0x2214c8,
                        en: _0x2214c8,
                        es: _0x2214c8,
                        fr: _0x2214c8,
                        uk: _0x2214c8
                      },
                      list: [_0x18036d.id]
                    });
                    _0x482c3e = true;
                  }
                  ;
                  _0x522ae1++;
                }
                ;
                var _0x18036d = {
                  id: _0x40085c.g / 9 * 1000 + _0x288525,
                  base: [],
                  guest: false,
                  g: true,
                  price: 0,
                  priceBefore: 0,
                  nonbuyable: false,
                  prime: "c_white",
                  glow: _0x4538f7[_0x586817]
                };
                for (var _0x9c73fe = 0; _0x9c73fe < _0x4538f7[_0x586817].length; _0x9c73fe++) {
                  _0x18036d.base.push("s_wup_" + _0x18036d.id + "_" + (_0x4538f7[_0x586817].length - _0x9c73fe));
                  _0x3235dc.regionDict["s_wup_" + _0x18036d.id + "_" + (_0x9c73fe + 1)] = {
                    texture: "t_wup_" + _0x18036d.id,
                    h: 96,
                    w: 96,
                    x: (_0x9c73fe || 0) * 99,
                    y: 0
                  };
                }
                ;
                _0x3235dc.skinArrayDict.push(_0x18036d);
                _0x58fbfd++;
                _0x288525++;
              }
            }
          } else {
            var _0x30a759 = [];
            var _0x10aaa0 = "store/Group_customer.png";
            for (let _0x274b1b in _0x2f4d8e) {
              if (_0x274b1b != "img") {
                if (_0x2f4d8e[_0x274b1b].textureDict[_0x274b1b].file.search("data:image/png;base64,") == -1) {
                  _0x2f4d8e[_0x274b1b].textureDict[_0x274b1b].file = "data:image/png;base64," + _0x2f4d8e[_0x274b1b].textureDict[_0x274b1b].file.substr(_0x2f4d8e[_0x274b1b].textureDict[_0x274b1b].file.length - _0x40085c.c_v, _0x40085c.c_v) + _0x2f4d8e[_0x274b1b].textureDict[_0x274b1b].file.substr(0, _0x2f4d8e[_0x274b1b].textureDict[_0x274b1b].file.length - _0x40085c.c_v);
                }
                _0x3235dc.textureDict[_0x274b1b] = _0x2f4d8e[_0x274b1b].textureDict[_0x274b1b];
                for (let _0x1e9057 in _0x2f4d8e[_0x274b1b].regionDict) {
                  _0x3235dc.regionDict[_0x1e9057] = _0x2f4d8e[_0x274b1b].regionDict[_0x1e9057];
                }
                ;
                _0x3235dc.skinArrayDict.push(_0x2f4d8e[_0x274b1b].skin);
                _0x30a759.push(_0x2f4d8e[_0x274b1b].skin.id);
              } else if (_0x2f4d8e[_0x274b1b] != "customer") {
                _0x10aaa0 = _0x2f4d8e[_0x274b1b];
              }
            }
            ;
            _0x3235dc.skinGroupArrayDict.push({
              isCustom: true,
              id: "customer",
              img: _0x10aaa0,
              name: {
                de: "Customer",
                en: "Customer",
                es: "Customer",
                fr: "Customer",
                uk: "Customer"
              },
              list: _0x30a759
            });
          }
        }
        ;
        if (Array.isArray(_0x40085c.dg) && _0x40085c.dg.length > 0) {
          for (var _0x586817 in _0x40085c.dg) {
            var _0x41a24d = _0x40085c.dg[_0x586817].split("|");
            var _0x58c8fe = {
              g: _0x41a24d["0"]
            };
            await fetch(_0x40085c.s_l + "/store/index.php", {
              headers: {
                "Content-Type": "application/json"
              },
              method: "POST",
              body: JSON.stringify(_0x58c8fe)
            }).then(async function (_0x3427fa) {
              _0x3427fa = await _0x3427fa.json();
              _0x3235dc.textureDict["t_wup_" + _0x41a24d["0"] + "_skin_g"] = {
                custom: true,
                relativePath: _0x3427fa.csg["1"]["0"]
              };
              var _0x358629 = _0x3427fa.csg["2"]["0"];
              var _0x50e06c = 0;
              for (var _0x33c9a1 in _0x358629) {
                _0x50e06c++;
              }
              ;
              _0x40085c.sg.push(parseInt(_0x41a24d["1"]));
              _0x40085c.gg.push({
                s: _0x40085c.g / 9 * 1000 + _0x288525,
                e: _0x40085c.g / 9 * 1000 + _0x288525 + _0x50e06c - 1,
                t: parseInt(_0x3427fa.csg["0"]["0"].substr(0, 1)) * 100,
                r: _0x3427fa.csg["0"]["0"].substr(1, 1) == "1"
              });
              var _0xf8b41a = 0;
              for (var _0x33c9a1 in _0x358629) {
                var _0x589e48 = {
                  id: _0x40085c.g / 9 * 1000 + _0x288525,
                  base: [],
                  guest: false,
                  g: true,
                  price: 0,
                  priceBefore: 0,
                  nonbuyable: false,
                  prime: "c_white",
                  glow: _0x358629[_0x33c9a1]
                };
                for (var _0x51b90c = 0; _0x51b90c < _0x358629[_0x33c9a1].length; _0x51b90c++) {
                  _0x589e48.base.push("s_wup_" + _0x589e48.id + "_" + (_0x358629[_0x33c9a1].length - _0x51b90c));
                  _0x3235dc.regionDict["s_wup_" + _0x589e48.id + "_" + (_0x51b90c + 1)] = {
                    texture: "t_wup_" + _0x41a24d["0"] + "_skin_g",
                    h: 96,
                    w: 96,
                    x: (_0x51b90c || 0) * 99,
                    y: (_0xf8b41a || 0) * 99
                  };
                }
                ;
                _0x3235dc.skinArrayDict.push(_0x589e48);
                _0x288525++;
                _0xf8b41a++;
              }
            }).catch(function (_0x17de29) {});
          }
        }
      } catch (_0x9a9d15) {
        localStorage.removeItem("custom_wear");
        localStorage.removeItem("custom_skin");
        window.location.reload();
      }
      ;
      return _0x3235dc;
    };
    var _0x361a73 = false;
    if (_0x361a73) {
      _0x361a73 = false;
      s_h.pause();
    }
    (function (_0x44fd84) {
      _0x44fd84.fn.wupsle = function (_0x35f657) {
        if (_0x490aeb[_0x35f657]) {
          return _0x490aeb[_0x35f657].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof _0x35f657 != "object" && _0x35f657) {
          _0x44fd84.error("Method " + _0x35f657 + " does not exists.");
          return;
        } else {
          return _0x490aeb.init.apply(this, arguments);
        }
      };
      var _0x490aeb = {};
      var _0x2e8513 = {
        data: [],
        keepJSONItemsOnTop: false,
        width: 100,
        height: null,
        background: "#eee",
        selectText: "",
        defaultSelectedIndex: null,
        truncateDescription: true,
        imagePosition: "left",
        showSelectedHTML: true,
        clickOffToClose: true,
        embedCSS: true,
        onSelected: function () {}
      };
      function _0x301bc2(_0x9ad142, _0x488e6e) {
        var _0x3d6a29;
        var _0x29c1d6;
        var _0x41d531;
        var _0x11da4a;
        var _0x2c2d7b = _0x9ad142.data("ddslick");
        var _0x29e148 = _0x9ad142.find(".dd-selected");
        var _0x53e6e6 = _0x29e148.siblings(".dd-selected-value");
        _0x9ad142.find(".dd-options");
        _0x29e148.siblings(".dd-pointer");
        var _0x106ae1 = _0x9ad142.find(".dd-option").eq(_0x488e6e);
        var _0x4e011a = _0x106ae1.closest("li");
        var _0x550cf6 = _0x2c2d7b.settings;
        var _0x18a02c = _0x2c2d7b.settings.data[_0x488e6e];
        _0x9ad142.find(".dd-option").removeClass("dd-option-selected");
        _0x106ae1.addClass("dd-option-selected");
        _0x2c2d7b.selectedIndex = _0x488e6e;
        _0x2c2d7b.selectedItem = _0x4e011a;
        _0x2c2d7b.selectedData = _0x18a02c;
        if (_0x550cf6.showSelectedHTML) {
          _0x29e148.html((_0x18a02c.imageSrc ? "<img class=\"dd-selected-image" + (_0x550cf6.imagePosition == "right" ? " dd-image-right" : "") + "\" src=\"" + _0x18a02c.imageSrc + "\" />" : "") + (_0x18a02c.description ? "<small class=\"dd-selected-description dd-desc" + (_0x550cf6.truncateDescription ? " dd-selected-description-truncated" : "") + "\" >" + _0x18a02c.description + "</small>" : ""));
        } else {
          _0x29e148.html(_0x18a02c.text);
        }
        _0x53e6e6.val(_0x18a02c.value);
        _0x2c2d7b.original.val(_0x18a02c.value);
        _0x9ad142.data("ddslick", _0x2c2d7b);
        _0x6cab56(_0x9ad142);
        _0x29c1d6 = (_0x3d6a29 = _0x9ad142).find(".dd-select").css("height");
        _0x41d531 = _0x3d6a29.find(".dd-selected-description");
        _0x11da4a = _0x3d6a29.find(".dd-selected-image");
        if (_0x41d531.length <= 0 && _0x11da4a.length > 0) {
          _0x3d6a29.find(".dd-selected-text").css("lineHeight", _0x29c1d6);
        }
        if (typeof _0x550cf6.onSelected == "function") {
          _0x550cf6.onSelected.call(this, _0x2c2d7b);
        }
      }
      function _0x356ce1(_0x3a4c52) {
        var _0x3544c1 = _0x3a4c52.find(".dd-select");
        var _0x4d473f = _0x3544c1.siblings(".dd-options");
        var _0xf589ff = _0x3544c1.find(".dd-pointer");
        var _0x4d10d0 = _0x4d473f.is(":visible");
        _0x44fd84(".dd-click-off-close").not(_0x4d473f).slideUp(50);
        _0x44fd84(".dd-pointer").removeClass("dd-pointer-up");
        if (_0x4d10d0) {
          _0x4d473f.slideUp("fast");
          _0xf589ff.removeClass("dd-pointer-up");
        } else {
          _0x4d473f.slideDown("fast");
          _0xf589ff.addClass("dd-pointer-up");
        }
        (function _0x494014(_0x27b13) {
          _0x27b13.find(".dd-option").each(function () {
            var _0x53b584 = _0x44fd84(this);
            var _0x37c56d = _0x53b584.css("height");
            var _0x458c73 = _0x53b584.find(".dd-option-description");
            var _0x55a1df = _0x27b13.find(".dd-option-image");
            if (_0x458c73.length <= 0 && _0x55a1df.length > 0) {
              _0x53b584.find(".dd-option-text").css("lineHeight", _0x37c56d);
            }
          });
        })(_0x3a4c52);
      }
      function _0x6cab56(_0x4c6c99) {
        _0x4c6c99.find(".dd-options").slideUp(50);
        _0x4c6c99.find(".dd-pointer").removeClass("dd-pointer-up").removeClass("dd-pointer-up");
      }
      _0x490aeb.init = function (_0x4b28cb) {
        var _0x4b28cb = _0x44fd84.extend({}, _0x2e8513, _0x4b28cb);
        if (_0x44fd84("#css-ddslick").length <= 0 && _0x4b28cb.embedCSS) {
          _0x44fd84("<style id=\"css-ddslick\" type=\"text/css\">.dd-select{ border-radius:2px; border:solid 1px #ccc; position:relative; cursor:pointer;}.dd-desc { color:#aaa; display:block; overflow: hidden; font-weight:normal; line-height: 1.4em; }.dd-selected{ overflow:hidden; display:block; padding:2px; font-weight:bold;}.dd-pointer{ width:0; height:0; position:absolute; right:10px; top:50%; margin-top:-3px;}.dd-pointer-down{ border:solid 5px transparent; border-top:solid 5px #000; }.dd-pointer-up{border:solid 5px transparent !important; border-bottom:solid 5px #000 !important; margin-top:-8px;}.dd-options{ border:solid 1px #ccc; border-top:none; list-style:none; box-shadow:0px 1px 5px #ddd; display:none; position:absolute; z-index:2000; margin:0; padding:0;background:#fff; overflow:auto;}.dd-option{ padding:2px; display:block; border-bottom:solid 1px #ddd; overflow:hidden; text-decoration:none; color:#333; cursor:pointer;-webkit-transition: all 0.25s ease-in-out; -moz-transition: all 0.25s ease-in-out;-o-transition: all 0.25s ease-in-out;-ms-transition: all 0.25s ease-in-out; } ul.dd-options {height: 130px;} .dd-options > li:last-child > .dd-option{ border-bottom:none;}.dd-option:hover{ background:#f3f3f3; color:#000;}.dd-selected-description-truncated { text-overflow: ellipsis; white-space:nowrap; }.dd-option-selected { background:#f6f6f6; }.dd-option-image, .dd-selected-image { vertical-align:middle; float:left; margin-right:5px; max-width:64px;}.dd-image-right { float:right; margin-right:15px; margin-left:5px;}.dd-container{display: inline-block; position:relative;}â€‹ .dd-selected-text { font-weight:bold}â€‹</style>").appendTo("head");
        }
        return this.each(function () {
          var _0x2d3887 = _0x44fd84(this);
          if (!_0x2d3887.data("ddslick")) {
            var _0x185968 = [];
            _0x4b28cb.data;
            _0x2d3887.find("option").each(function () {
              var _0xb63c7 = _0x44fd84(this);
              var _0x5eead2 = _0xb63c7.data();
              _0x185968.push({
                text: _0x44fd84.trim(_0xb63c7.text()),
                value: _0xb63c7.val(),
                selected: _0xb63c7.is(":selected"),
                description: _0x5eead2.description,
                imageSrc: _0x5eead2.imagesrc
              });
            });
            if (_0x4b28cb.keepJSONItemsOnTop) {
              _0x44fd84.merge(_0x4b28cb.data, _0x185968);
            } else {
              _0x4b28cb.data = _0x44fd84.merge(_0x185968, _0x4b28cb.data);
            }
            var _0x42d4c3 = _0x2d3887;
            var _0x29b177 = _0x44fd84("<div id=\"" + _0x2d3887.attr("id") + "\"></div>");
            _0x2d3887.replaceWith(_0x29b177);
            (_0x2d3887 = _0x29b177).addClass("dd-container").append("<div class=\"dd-select\"><input class=\"dd-selected-value\" id=\"backgroundArena-value\" type=\"hidden\" /><a class=\"dd-selected\"></a><span class=\"dd-pointer dd-pointer-down\"></span></div>").append("<ul class=\"dd-options\"></ul>");
            var _0x185968 = _0x2d3887.find(".dd-select");
            var _0x6586d = _0x2d3887.find(".dd-options");
            _0x6586d.css({
              width: _0x4b28cb.width
            });
            _0x185968.css({
              width: _0x4b28cb.width,
              background: _0x4b28cb.background
            });
            _0x2d3887.css({
              width: _0x4b28cb.width
            });
            if (_0x4b28cb.height != null) {
              _0x6586d.css({
                height: _0x4b28cb.height,
                overflow: "auto"
              });
            }
            _0x44fd84.each(_0x4b28cb.data, function (_0x411b9c, _0x31eb25) {
              if (_0x31eb25.selected) {
                _0x4b28cb.defaultSelectedIndex = _0x411b9c;
              }
              _0x6586d.append("<li><a class=\"dd-option\">" + (_0x31eb25.value ? " <input class=\"dd-option-value\" type=\"hidden\" value=\"" + _0x31eb25.value + "\" />" : "") + (_0x31eb25.imageSrc ? " <img class=\"dd-option-image" + (_0x4b28cb.imagePosition == "right" ? " dd-image-right" : "") + "\" src=\"" + _0x31eb25.imageSrc + "\" />" : "") + "</a></li>");
            });
            var _0x4723c2 = {
              settings: _0x4b28cb,
              original: _0x42d4c3,
              selectedIndex: -1,
              selectedItem: null,
              selectedData: null
            };
            _0x2d3887.data("ddslick", _0x4723c2);
            if (_0x4b28cb.selectText.length > 0 && _0x4b28cb.defaultSelectedIndex == null) {
              _0x2d3887.find(".dd-selected").html(_0x4b28cb.selectText);
            } else {
              _0x301bc2(_0x2d3887, _0x4b28cb.defaultSelectedIndex != null && _0x4b28cb.defaultSelectedIndex >= 0 && _0x4b28cb.defaultSelectedIndex < _0x4b28cb.data.length ? _0x4b28cb.defaultSelectedIndex : 0);
            }
            _0x2d3887.find(".dd-select").on("click.ddslick", function () {
              _0x356ce1(_0x2d3887);
            });
            _0x2d3887.find(".dd-option").on("click.ddslick", function () {
              _0x301bc2(_0x2d3887, _0x44fd84(this).closest("li").index());
            });
            if (_0x4b28cb.clickOffToClose) {
              _0x6586d.addClass("dd-click-off-close");
              _0x2d3887.on("click.ddslick", function (_0x2b613c) {
                _0x2b613c.stopPropagation();
              });
              _0x44fd84("body").on("click", function () {
                _0x44fd84(".dd-click-off-close").slideUp(50).siblings(".dd-select").find(".dd-pointer").removeClass("dd-pointer-up");
              });
            }
          }
        });
      };
      _0x490aeb.select = function (_0x311ef1) {
        return this.each(function () {
          if (_0x311ef1.index !== undefined) {
            _0x301bc2(_0x44fd84(this), _0x311ef1.index);
          }
        });
      };
      _0x490aeb.open = function () {
        return this.each(function () {
          var _0xb5a2c1 = _0x44fd84(this);
          if (_0xb5a2c1.data("ddslick")) {
            _0x356ce1(_0xb5a2c1);
          }
        });
      };
      _0x490aeb.close = function () {
        return this.each(function () {
          var _0x28ea6b = _0x44fd84(this);
          if (_0x28ea6b.data("ddslick")) {
            _0x6cab56(_0x28ea6b);
          }
        });
      };
      _0x490aeb.destroy = function () {
        return this.each(function () {
          var _0x1ca11f = _0x44fd84(this);
          var _0x5d9dad = _0x1ca11f.data("ddslick");
          if (_0x5d9dad) {
            var _0x3fda63 = _0x5d9dad.original;
            _0x1ca11f.removeData("ddslick").unbind(".ddslick").replaceWith(_0x3fda63);
          }
        });
      };
    })(jQuery);
    if (_0x65d30()) {
      _0x4a5ec2.ba(_0x40085c.s_l + "/js/nipplejs.min.js", "mobileconfig", function () {});
    }
    ooo.pCc = function () {
      var _0x40354c = {};
      var _0x25766f = {
        country: "iq"
      };
      if (_0x48dee5 && _0x48dee5 != "iq") {
        _0x25766f.country = _0x48dee5;
      }
      $.get(_0x40085c.s_l + "/dynamic/assets/registry.json", function (_0x31ec4d) {
        _0x40354c = _0x31ec4d;
        fetch(_0x40085c.s_l + "/store/index.php", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(_0x25766f)
        }).then(async function (_0x38ef67) {
          for (let _0xe70c59 in (_0x38ef67 = await _0x38ef67.json()).textureDict) {
            for (let _0x18d460 in _0x38ef67.textureDict[_0xe70c59]) {
              if (_0x18d460 === "file") {
                _0x38ef67.textureDict[_0xe70c59][_0x18d460] = "data:image/png;base64," + _0x38ef67.textureDict[_0xe70c59][_0x18d460].substr(_0x38ef67.textureDict[_0xe70c59][_0x18d460].length - _0x40085c.c_v, _0x40085c.c_v) + _0x38ef67.textureDict[_0xe70c59][_0x18d460].substr(0, _0x38ef67.textureDict[_0xe70c59][_0x18d460].length - _0x40085c.c_v);
              }
            }
          }
          ;
          for (let _0x4e525e in _0x38ef67) {
            if (_0x4e525e !== "propertyList") {
              if (Array.isArray(_0x38ef67[_0x4e525e])) {
                _0x31ec4d[_0x4e525e] = _0x31ec4d[_0x4e525e].concat(_0x38ef67[_0x4e525e]);
              } else {
                _0x31ec4d[_0x4e525e] = {
                  ..._0x31ec4d[_0x4e525e],
                  ..._0x38ef67[_0x4e525e]
                };
              }
            }
          }
        }).catch(function (_0x594b6d) {});
      });
    };
    ooo.pDc = function (_0x5ea784) {
      var _0x3b3bb2 = {};
      (function (_0x42e91c, _0x582114) {
        for (var _0xd5de7a in _0x42e91c) {
          if (_0x42e91c.hasOwnProperty(_0xd5de7a)) {
            _0x582114(_0xd5de7a, _0x42e91c[_0xd5de7a]);
          }
        }
      })(_0x5ea784.textureDict, function (_0x595973, _0x33abbc) {
        let _0x109cd8 = _0x40085c.s_l + _0x33abbc.relativePath;
        if (!_0x33abbc.custom) {
          _0x109cd8 = _0x40085c.s_l + _0x33abbc.relativePath;
        }
        try {
          _0x3b3bb2[_0x595973] = new PIXI.Texture(_0x109cd8);
        } catch (_0x153c85) {}
      });
    };
  });
})();
(function () {
  let _0x536b66 = false;
  let _0x12881d = false;
  let _0x133712 = 0;
  function _0x2e84b7() {
    if (window.ooo && window.ooo.Mh && typeof window.ooo.Mh.Dq === "function") {
      return true;
    }
    return false;
  }
  function _0x305925() {
    const _0x24723a = Date.now();
    if (_0x12881d || _0x24723a - _0x133712 < 1000) {
      return;
    }
    _0x12881d = true;
    _0x133712 = _0x24723a;
    try {
      if (typeof window.myGameSettings !== "undefined") {
        window.myGameSettings.unlimitedRespawn = true;
      }
      if (typeof window.ooo.Mh.gr === "function") {
        window.ooo.Mh.gr();
      }
      setTimeout(function () {
        try {
          const _0xf91df4 = document.getElementById("port_id_s") ? document.getElementById("port_id_s").value || "" : "";
          const _0x1be364 = document.getElementById("port_name_s") ? document.getElementById("port_name_s").value || "Player" : "Player";
          window.ooo.Mh.Dq(_0xf91df4, _0x1be364);
          setTimeout(function () {
            _0x12881d = false;
          }, 1000);
        } catch (_0x5c50d2) {
          _0x12881d = false;
        }
      }, 300);
    } catch (_0x1a1944) {
      _0x12881d = false;
    }
  }
  function _0x58b59c() {
    _0x536b66 = !_0x536b66;
    if (typeof window.myGameSettings !== "undefined") {
      window.myGameSettings.unlimitedRespawn = _0x536b66;
    }
  }
  document.addEventListener("keydown", function (_0x2eb5e0) {
    if (_0x2eb5e0.key === "F8" || _0x2eb5e0.keyCode === 119) {
      _0x58b59c();
    }
    if (_0x536b66 && (_0x2eb5e0.key.toLowerCase() === "r" || _0x2eb5e0.keyCode === 82)) {
      if (_0x2e84b7()) {
        _0x2eb5e0.preventDefault();
        _0x2eb5e0.stopPropagation();
        _0x305925();
      } else {}
    }
  }, true);
  if (!_0x2e84b7()) {
    const _0x2c6369 = setInterval(function () {
      if (_0x2e84b7()) {
        clearInterval(_0x2c6369);
      }
    }, 1000);
  } else {}
})();
