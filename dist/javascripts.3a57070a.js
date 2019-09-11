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
})({"assest/javascripts/index.js":[function(require,module,exports) {
var homeHeader = document.querySelector('.header.home');
var feedHeader1 = document.querySelector('.header.feed1');
var feedHeader2 = document.querySelector('.header.feed2');
var feedHeader3 = document.querySelector('.header.feed3');
var activityHeader = document.querySelector('.header.activity');
var photoHeader = document.querySelector('.header.photo');
var mainPage = document.querySelector('.page-container.main-page');
var feedPage1 = document.querySelector('.page-container.feed-page1');
var feedPage2 = document.querySelector('.page-container.feed-page2');
var feedPage3 = document.querySelector('.page-container.feed-page3');
var activityPage = document.querySelector('.page-container.activity-page');
var photoPage = document.querySelector('.page-container.photo-page');
var mainImage1 = document.querySelector('.main-image1');
var mainImage2 = document.querySelector('.main-image2');
var mainImage3 = document.querySelector('.main-image3');
var imageSliderNav = document.querySelector('.image-slider-nav');
var storeInfo = document.querySelector('.store-info');
var contentUserName = document.querySelector('.store-info__content__name');
var contentName = document.querySelector('.store-info__content__name2');
var date = document.querySelector('.date-text .date');
var contentText = document.querySelector('.content-text');
var likeText = document.querySelector('.like-text');
var feed3Textarea = feedPage3.querySelector('.form-wrapper textarea');
var contentImage = document.querySelector('.store-info img');
var contentImageShare = document.querySelector('.store-info img.share');
var footer = document.querySelector('.footer');
var progress = document.querySelector('.progress');
var writeFeed = document.querySelector('.write-feed');
var writeFeedText = document.querySelector('.write-feed__text');

window.home = function () {
  location.reload();
};

window.brand = function () {
  //change main image
  if (mainPage.classList.contains('hide')) {
    return false;
  }

  mainImage1.classList.add('hide');
  mainImage2.classList.remove('hide');
  imageSliderNav.classList.remove('hide');
  contentName.textContent = '伊勢丹新宿店';
  date.textContent = ' 2019.9.4wed-17tue';
  likeText.textContent = 'いいね！285件';
  contentText.innerHTML = "YOAK Pop-Up<br>on Men's Building <a class=\"\" href=\"/explore/tags/b1f_mensshoes/\">#B1F_MensShoes</a><br>\u30FB<br><a class=\"\" href=\"/explore/tags/yoak/\">#yoak</a><br>\u30FB<br>www.imn.jp";
  footer.querySelector('.active').classList.remove('active');
  footer.querySelector('.person').classList.add('active');
  document.body.scrollTop = 0;
};

window.writeFeed = function () {
  console.log(feedPage1);
  homeHeader.classList.add('hide');
  feedHeader1.classList.remove('hide');
  mainPage.classList.add('hide');
  feedPage1.classList.remove('hide');
  footer.querySelector('.active').classList.remove('active');
  document.body.scrollTop = 0;
};

window.moveFeed2 = function () {
  feedPage1.classList.add('hide');
  feedPage2.classList.remove('hide');
  feedHeader1.classList.add('hide');
  feedHeader2.classList.remove('hide');
};

window.moveFeed3 = function () {
  feedPage2.classList.add('hide');
  feedPage3.classList.remove('hide');
  feedHeader2.classList.add('hide');
  feedHeader3.classList.remove('hide');
};

window.animationKey = false;

window.keyboardAnimation = function () {
  event.preventDefault();

  if (animationKey) {
    return false;
  }

  animationKey = true;
  var text = '伊勢丹メンズ館でオーダーしたシャツが最高過ぎ！迷っていたシャツも買っちゃおうかな〜 #isetanmens #カスタムオーダーシャツ';
  feed3Textarea.value = '';

  for (var i = 0, len = text.length; i < len; i++) {
    delayAnimation(text, i);
  }

  function delayAnimation(text, index) {
    setTimeout(function () {
      feed3Textarea.value = feed3Textarea.value + text[index];

      if (text.length - 1 == index) {
        animationKey = false;
      }
    }, 100 * index);
  }
};

window.share = function () {
  feedPage3.classList.add('hide');
  mainPage.classList.remove('hide');
  feedHeader3.classList.add('hide');
  homeHeader.classList.remove('hide');
  contentName.classList.add('hide');
  contentImage.classList.add('hide');
  contentImageShare.classList.remove('hide');
  contentUserName.textContent = "user name";
  footer.querySelector('.home').classList.add('active');
  storeInfo.classList.add('loading');
  mainImage3.classList.add('loading');
  mainImage1.classList.add('hide');
  mainImage2.classList.add('hide');
  mainImage3.classList.remove('hide');
  writeFeed.classList.remove('hide');
  setTimeout(function () {
    date.textContent = ' 2019.9.24';
    likeText.textContent = 'いいね！0件';
    storeInfo.classList.remove('loading');
    mainImage3.classList.remove('loading');
    progress.classList.add('hide');
    writeFeedText.textContent = "完了";
  }, 5000);
};

window.showTooltip = function () {
  if (event.target.classList.contains('like')) {
    event.target.querySelector('.tooltip').classList.toggle('hide');
  } else {
    activity();
  }
};

window.activity = function () {
  homeHeader.classList.add('hide');
  activityHeader.classList.remove('hide');
  mainPage.classList.add('hide');
  activityPage.classList.remove('hide');
  document.querySelector('.tooltip').classList.add('hide');
};

window.photo = function () {
  activityHeader.classList.add('hide');
  activityPage.classList.add('hide');
  photoHeader.classList.remove('hide');
  photoPage.classList.remove('hide');
};
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62386" + '/');

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
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assest/javascripts/index.js"], null)
//# sourceMappingURL=/javascripts.3a57070a.js.map