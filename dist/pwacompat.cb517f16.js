// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"pwacompat.js":[function(require,module,exports) {
var process = require("process");
/*
 * Copyright 2018 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  if (!('fetch' in window)) {
    return; // basic feature detection: from Mobile Safari 10.3+
  }

  var capableDisplayModes = ['standalone', 'fullscreen', 'minimal-ui'];
  var defaultSplashColor = '#f8f9fa';
  var defaultSplashTextSize = 24;
  var idealSplashIconSize = 128;
  var minimumSplashIconSize = 48;
  var splashIconPadding = 32;
  var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') !== -1;
  var isEdge = navigator.userAgent && navigator.userAgent.indexOf('Edge') !== -1;
  var isEdgePWA = typeof Windows !== 'undefined';

  function setup() {
    var manifestEl = document.head.querySelector('link[rel="pwa-setup"]');
    var manifestHref = manifestEl ? manifestEl.href : '';
    var hrefFactory = buildHrefFactory([manifestHref, window.location]);
    Promise.resolve().then(function () {
      if (!manifestHref) {
        throw "can't find <link rel=\"manifest\" href=\"..\" />'";
      }

      var opts =
      /** @type {!RequestInit} */
      {};

      if (manifestHref.crossOrigin === 'use-credentials') {
        opts.credentials = 'include';
      }

      return window.fetch(manifestHref, opts);
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      return process(data, hrefFactory);
    }).catch(function (err) {
      return console.warn('pwacompat.js error', err);
    });
  }
  /**
   * @param {!Array<string>} options
   * @return {function(string): string}
   */


  function buildHrefFactory(options) {
    var _loop = function _loop(i) {
      var opt = options[i];

      try {
        new URL('', opt);
        return {
          v: function v(part) {
            return new URL(part, opt).toString();
          }
        };
      } catch (e) {}
    };

    for (var i = 0; i < options.length; ++i) {
      var _ret = _loop(i);

      if (_typeof(_ret) === "object") return _ret.v;
    }

    return function (part) {
      return part;
    };
  }

  function push(localName, attr) {
    var node = document.createElement(localName);

    for (var k in attr) {
      node.setAttribute(k, attr[k]);
    }

    document.head.appendChild(node);
    return node;
  }

  function meta(name, content) {
    if (content) {
      if (content === true) {
        content = 'yes';
      }

      push('meta', {
        name: name,
        content: content
      });
    }
  }
  /**
   * @param {!Object<string, (string|*)>} manifest
   * @param {function(string): string} urlFactory
   */


  function process(manifest, urlFactory) {
    var icons = manifest['icons'] || [];
    icons.sort(function (a, b) {
      return parseInt(b.sizes, 10) - parseInt(a.sizes, 10);
    }); // largest first

    var appleTouchIcons = icons.map(function (icon) {
      // create icons as byproduct
      var attr = {
        'rel': 'icon',
        'href': urlFactory(icon['src']),
        'sizes': icon['sizes']
      };
      push('link', attr);

      if (isSafari) {
        attr['rel'] = 'apple-touch-icon';
        return push('link', attr);
      }
    });
    var display = manifest['display'];
    var isCapable = capableDisplayModes.indexOf(display) !== -1;
    meta('mobile-web-app-capable', isCapable);
    updateThemeColorRender(
    /** @type {string} */
    manifest['theme_color'] || 'black');

    if (isEdge) {
      meta('msapplication-starturl', manifest['start_url'] || '/');
      meta('msapplication-TileColor', manifest['theme_color']);
    } // nb: we check, but this won't override any _earlier_ (in DOM order) theme-color


    if (!document.head.querySelector('[name="theme-color"]')) {
      meta('theme-color', manifest['theme_color']);
    } // TODO(samthor): We don't detect QQ or UC, we just set the vars anyway.


    var orientation = simpleOrientationFor(manifest['orientation']);
    meta('x5-orientation', orientation); // QQ

    meta('screen-orientation', orientation); // UC

    if (display === 'fullscreen') {
      meta('x5-fullscreen', 'true'); // QQ

      meta('full-screen', 'yes'); // UC
    } else if (isCapable) {
      meta('x5-page-mode', 'app'); // QQ

      meta('browsermode', 'application'); // UC
    }

    if (!isSafari) {
      return; // the rest of this file is for Safari
    }

    var backgroundIsLight = shouldUseLightForeground(
    /** @type {string} */
    manifest['background_color'] || defaultSplashColor);
    var title = manifest['name'] || manifest['short_name'] || document.title; // Add related iTunes app from manifest.

    var itunes = findAppleId(manifest['related_applications']);
    itunes && meta('apple-itunes-app', "app-id=".concat(itunes)); // General iOS meta tags.

    meta('apple-mobile-web-app-capable', isCapable);
    meta('apple-mobile-web-app-title', title);

    function splashFor(_ref, orientation, icon) {
      var width = _ref.width,
          height = _ref.height;
      var ratio = window.devicePixelRatio;
      var ctx = contextForCanvas({
        width: width * ratio,
        height: height * ratio
      });
      ctx.scale(ratio, ratio);
      ctx.fillStyle = manifest['background_color'] || defaultSplashColor;
      ctx.fillRect(0, 0, width, height);
      ctx.translate(width / 2, (height - splashIconPadding) / 2);
      ctx.font = "".concat(defaultSplashTextSize, "px HelveticaNeue-CondensedBold");
      ctx.fillStyle = backgroundIsLight ? 'white' : 'black';
      var textWidth = ctx.measureText(title).width;

      if (icon) {
        // nb: on Chrome, we need the image >=48px, use the big layout >=80dp, ideal is >=128dp
        var iconWidth = icon.width / ratio;
        var iconHeight = icon.height / ratio;

        if (iconHeight > idealSplashIconSize) {
          // clamp to 128px height max
          iconWidth /= iconHeight / idealSplashIconSize;
          iconHeight = idealSplashIconSize;
        }

        if (iconWidth >= minimumSplashIconSize && iconHeight >= minimumSplashIconSize) {
          ctx.drawImage(icon, iconWidth / -2, iconHeight / -2, iconWidth, iconHeight);
          ctx.translate(0, iconHeight / 2 + splashIconPadding);
        }
      }

      ctx.fillText(title, textWidth / -2, 0);
      var generatedSplash = document.createElement('link');
      generatedSplash.setAttribute('rel', 'apple-touch-startup-image');
      generatedSplash.setAttribute('media', "(orientation: ".concat(orientation, ")"));
      generatedSplash.setAttribute('href', ctx.canvas.toDataURL());
      return generatedSplash;
    }

    var previous = new Set();

    function updateSplash(applicationIcon) {
      var portrait = splashFor(window.screen, 'portrait', applicationIcon);
      var landscape = splashFor({
        width: window.screen.height,
        height: window.screen.width
      }, 'landscape', applicationIcon);
      previous.forEach(function (prev) {
        return prev.remove();
      });
      document.head.appendChild(portrait);
      document.head.appendChild(landscape);
      previous.add(portrait);
      previous.add(landscape);
    }

    updateSplash(null); // fetch the largest icon to generate a splash screen

    if (!appleTouchIcons.length) {
      return;
    }

    var icon = appleTouchIcons[0];
    var img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = function () {
      updateSplash(img); // also check and redraw icon

      if (!manifest['background_color']) {
        return;
      }

      var redrawn = updateTransparent(img, manifest['background_color']);

      if (redrawn === null) {
        return; // the rest probably aren't interesting either
      }

      icon.href = redrawn; // fetch and fix all remaining icons

      appleTouchIcons.slice(1).forEach(function (icon) {
        var img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = function () {
          var redrawn = updateTransparent(img, manifest['background_color'], true);
          icon.href = redrawn;
        };

        img.src = icon.href;
      });
    };

    img.src = icon.href;
  }

  function findAppleId(related) {
    var itunes;
    (related || []).filter(function (app) {
      return app['platform'] === 'itunes';
    }).forEach(function (app) {
      if (app['id']) {
        itunes = app['id'];
      } else {
        var match = app['url'].match(/id(\d+)/);

        if (match) {
          itunes = match[1];
        }
      }
    });
    return itunes;
  }

  function simpleOrientationFor(v) {
    v = String(v || '');
    var prefix = v.substr(0, 3);

    if (prefix === 'por') {
      return 'portrait';
    } else if (prefix === 'lan') {
      return 'landscape';
    }

    return '';
  }
  /**
   * @param {string} color
   */


  function updateThemeColorRender(color) {
    if (!(isSafari || isEdgePWA)) {
      return;
    }

    var themeIsLight = shouldUseLightForeground(color);

    if (isSafari) {
      // nb. Safari 11.3+ gives a deprecation warning about this meta tag.
      // TODO(samthor): Potentially set black-translucent in 'fullscreen'.
      meta('apple-mobile-web-app-status-bar-style', themeIsLight ? 'black' : 'default');
    } else {
      // Edge PWA
      var t = getEdgeTitleBar();

      if (t === null) {
        console.debug('UWP no titleBar');
        return;
      }

      t.foregroundColor = colorToWindowsRGBA(themeIsLight ? 'black' : 'white');
      t.backgroundColor = colorToWindowsRGBA(color);
    }
  }
  /**
   * @return {?ApplicationViewTitleBar}
   */


  function getEdgeTitleBar() {
    try {
      return Windows.UI.ViewManagement.ApplicationView.getForCurrentView().titleBar;
    } catch (e) {
      return null;
    }
  }
  /**
   * The Windows titlebar APIs expect an object of {r, g, b, a}.
   *
   * @param {string} color
   * @return {WindowsColor}
   */


  function colorToWindowsRGBA(color) {
    var data = readColor(color);
    return (
      /** @type {WindowsColor} */
      {
        'r': data[0],
        'g': data[1],
        'b': data[2],
        'a': data[3]
      }
    );
  }
  /**
   * @param {string} color
   * @return {!Uint8ClampedArray}
   */


  function readColor(color) {
    var c = contextForCanvas();
    c.fillStyle = color;
    c.fillRect(0, 0, 1, 1);
    return c.getImageData(0, 0, 1, 1).data;
  }
  /**
   * @param {string} color
   * @return {boolean}
   */


  function shouldUseLightForeground(color) {
    var pixelData = readColor(color); // From https://cs.chromium.org/chromium/src/chrome/android/java/src/org/chromium/chrome/browser/util/ColorUtils.java

    var data = pixelData.map(function (v) {
      var f = v / 255;
      return f < 0.03928 ? f / 12.92 : Math.pow((f + 0.055) / 1.055, 2.4);
    });
    var lum = 0.2126 * data[0] + 0.7152 * data[1] + 0.0722 * data[2];
    var contrast = Math.abs(1.05 / (lum + 0.05));
    return contrast > 3;
  }

  function updateTransparent(image, background) {
    var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var context = contextForCanvas(image);
    context.drawImage(image, 0, 0); // look for transparent pixel in top-left
    // TODO: Chrome actually checks the four corners for some cases.

    if (!force) {
      var imageData = context.getImageData(0, 0, 1, 1);

      if (imageData.data[3] == 255) {
        return null;
      }
    }

    context.globalCompositeOperation = 'destination-over'; // only replace transparent areas

    context.fillStyle = background;
    context.fillRect(0, 0, image.width, image.height);
    return context.canvas.toDataURL();
  }

  function contextForCanvas() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      width: 1,
      height: 1
    },
        width = _ref2.width,
        height = _ref2.height;

    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext('2d');
  } // actually run PWACompat here


  if (document.readyState === 'complete') {
    setup();
  } else {
    window.addEventListener('load', setup);
  }
})();
},{"process":"../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/process/browser.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60796" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","pwacompat.js"], null)
//# sourceMappingURL=/pwacompat.cb517f16.js.map