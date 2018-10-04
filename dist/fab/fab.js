/**
* @module vue-mdc-adapterfab 0.18.2
* @exports VueMDCFab
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCFab = factory());
}(this, (function () { 'use strict';

  function autoInit(plugin) {
    // Auto-install
    var _Vue = null;
    if (typeof window !== 'undefined') {
      _Vue = window.Vue;
    } else if (typeof global !== 'undefined') {
      /*global global*/
      _Vue = global.Vue;
    }
    if (_Vue) {
      _Vue.use(plugin);
    }
  }

  function BasePlugin(components) {
    return {
      version: '0.18.2',
      install: function install(vm) {
        for (var key in components) {
          var component = components[key];
          vm.component(component.name, component);
        }
      },
      components: components
    };
  }

  var CustomElement = {
    functional: true,
    render: function render(createElement, context) {
      return createElement(context.props.is || context.props.tag || 'div', context.data, context.children);
    }
  };

  var CustomElementMixin = {
    components: {
      CustomElement: CustomElement
    }
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  /* global CustomEvent */

  var CustomButton = {
    name: 'custom-button',
    functional: true,
    props: {
      link: Object
    },
    render: function render(h, context) {
      var element = void 0;
      var data = _extends({}, context.data);

      if (context.props.link && context.parent.$router) {
        // router-link case
        element = context.parent.$root.$options.components['router-link'];
        data.props = _extends({ tag: context.props.tag }, context.props.link);
        data.attrs.role = 'button';
        if (data.on.click) {
          data.nativeOn = { click: data.on.click };
        }
      } else if (data.attrs && data.attrs.href) {
        // href case
        element = 'a';
        data.attrs.role = 'button';
      } else {
        // button fallback
        element = 'button';
      }

      return h(element, data, context.children);
    }
  };

  var CustomButtonMixin = {
    props: {
      href: String,
      disabled: Boolean,
      to: [String, Object],
      exact: Boolean,
      append: Boolean,
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String
    },
    computed: {
      link: function link() {
        return this.to && {
          to: this.to,
          exact: this.exact,
          append: this.append,
          replace: this.replace,
          activeClass: this.activeClass,
          exactActiveClass: this.exactActiveClass
        };
      }
    },
    components: {
      CustomButton: CustomButton
    }
  };

  var DispatchEventMixin = {
    props: {
      event: String,
      'event-target': Object,
      'event-args': Array
    },
    methods: {
      dispatchEvent: function dispatchEvent(evt) {
        evt && this.$emit(evt.type, evt);
        if (this.event) {
          var target = this.eventTarget || this.$root;
          var args = this.eventArgs || [];
          target.$emit.apply(target, [this.event].concat(toConsumableArray(args)));
        }
      }
    },
    computed: {
      listeners: function listeners() {
        var _this = this;

        return _extends({}, this.$listeners, {
          click: function click(e) {
            return _this.dispatchEvent(e);
          }
        });
      }
    }
  };

  var scope = Math.floor(Math.random() * Math.floor(0x10000000)).toString() + '-';

  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @template A
   */
  var MDCFoundation = function () {
    createClass(MDCFoundation, null, [{
      key: "cssClasses",

      /** @return enum{cssClasses} */
      get: function get$$1() {
        // Classes extending MDCFoundation should implement this method to return an object which exports every
        // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
        return {};
      }

      /** @return enum{strings} */

    }, {
      key: "strings",
      get: function get$$1() {
        // Classes extending MDCFoundation should implement this method to return an object which exports all
        // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
        return {};
      }

      /** @return enum{numbers} */

    }, {
      key: "numbers",
      get: function get$$1() {
        // Classes extending MDCFoundation should implement this method to return an object which exports all
        // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
        return {};
      }

      /** @return {!Object} */

    }, {
      key: "defaultAdapter",
      get: function get$$1() {
        // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
        // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
        // validation.
        return {};
      }

      /**
       * @param {A=} adapter
       */

    }]);

    function MDCFoundation() {
      var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, MDCFoundation);

      /** @protected {!A} */
      this.adapter_ = adapter;
    }

    createClass(MDCFoundation, [{
      key: "init",
      value: function init() {
        // Subclasses should override this method to perform initialization routines (registering events, etc.)
      }
    }, {
      key: "destroy",
      value: function destroy() {
        // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
      }
    }]);
    return MDCFoundation;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Ripple. Provides an interface for managing
   * - classes
   * - dom
   * - CSS variables
   * - position
   * - dimensions
   * - scroll position
   * - event handlers
   * - unbounded, active and disabled states
   *
   * Additionally, provides type information for the adapter to the Closure
   * compiler.
   *
   * Implement this adapter for your framework of choice to delegate updates to
   * the component in your framework of choice. See architecture documentation
   * for more details.
   * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
   *
   * @record
   */
  var MDCRippleAdapter = function () {
    function MDCRippleAdapter() {
      classCallCheck(this, MDCRippleAdapter);
    }

    createClass(MDCRippleAdapter, [{
      key: "browserSupportsCssVars",

      /** @return {boolean} */
      value: function browserSupportsCssVars() {}

      /** @return {boolean} */

    }, {
      key: "isUnbounded",
      value: function isUnbounded() {}

      /** @return {boolean} */

    }, {
      key: "isSurfaceActive",
      value: function isSurfaceActive() {}

      /** @return {boolean} */

    }, {
      key: "isSurfaceDisabled",
      value: function isSurfaceDisabled() {}

      /** @param {string} className */

    }, {
      key: "addClass",
      value: function addClass(className) {}

      /** @param {string} className */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /** @param {!EventTarget} target */

    }, {
      key: "containsEventTarget",
      value: function containsEventTarget(target) {}

      /**
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(evtType, handler) {}

      /**
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(evtType, handler) {}

      /**
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: "registerDocumentInteractionHandler",
      value: function registerDocumentInteractionHandler(evtType, handler) {}

      /**
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: "deregisterDocumentInteractionHandler",
      value: function deregisterDocumentInteractionHandler(evtType, handler) {}

      /**
       * @param {!Function} handler
       */

    }, {
      key: "registerResizeHandler",
      value: function registerResizeHandler(handler) {}

      /**
       * @param {!Function} handler
       */

    }, {
      key: "deregisterResizeHandler",
      value: function deregisterResizeHandler(handler) {}

      /**
       * @param {string} varName
       * @param {?number|string} value
       */

    }, {
      key: "updateCssVariable",
      value: function updateCssVariable(varName, value) {}

      /** @return {!ClientRect} */

    }, {
      key: "computeBoundingRect",
      value: function computeBoundingRect() {}

      /** @return {{x: number, y: number}} */

    }, {
      key: "getWindowPageOffset",
      value: function getWindowPageOffset() {}
    }]);
    return MDCRippleAdapter;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var cssClasses = {
    // Ripple is a special case where the "root" component is really a "mixin" of sorts,
    // given that it's an 'upgrade' to an existing component. That being said it is the root
    // CSS class that all other CSS classes derive from.
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
  };

  var strings = {
    VAR_LEFT: '--mdc-ripple-left',
    VAR_TOP: '--mdc-ripple-top',
    VAR_FG_SIZE: '--mdc-ripple-fg-size',
    VAR_FG_SCALE: '--mdc-ripple-fg-scale',
    VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
    VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
  };

  var numbers = {
    PADDING: 10,
    INITIAL_ORIGIN_SCALE: 0.6,
    DEACTIVATION_TIMEOUT_MS: 225, // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
    FG_DEACTIVATION_MS: 150, // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
    TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices
  };

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
   * @private {boolean|undefined}
   */
  var supportsCssVariables_ = void 0;

  /**
   * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
   * @private {boolean|undefined}
   */
  var supportsPassive_$1 = void 0;

  /**
   * @param {!Window} windowObj
   * @return {boolean}
   */
  function detectEdgePseudoVarBug(windowObj) {
    // Detect versions of Edge with buggy var() support
    // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
    var document = windowObj.document;
    var node = document.createElement('div');
    node.className = 'mdc-ripple-surface--test-edge-var-bug';
    document.body.appendChild(node);

    // The bug exists if ::before style ends up propagating to the parent element.
    // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
    // but Firefox is known to support CSS custom properties correctly.
    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    var computedStyle = windowObj.getComputedStyle(node);
    var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
    node.remove();
    return hasPseudoVarBug;
  }

  /**
   * @param {!Window} windowObj
   * @param {boolean=} forceRefresh
   * @return {boolean|undefined}
   */

  function supportsCssVariables(windowObj) {
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var supportsCssVariables = supportsCssVariables_;
    if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
      return supportsCssVariables;
    }

    var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
    if (!supportsFunctionPresent) {
      return;
    }

    var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
    // See: https://bugs.webkit.org/show_bug.cgi?id=154669
    // See: README section on Safari
    var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

    if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
      supportsCssVariables = !detectEdgePseudoVarBug(windowObj);
    } else {
      supportsCssVariables = false;
    }

    if (!forceRefresh) {
      supportsCssVariables_ = supportsCssVariables;
    }
    return supportsCssVariables;
  }

  //
  /**
   * Determine whether the current browser supports passive event listeners, and if so, use them.
   * @param {!Window=} globalObj
   * @param {boolean=} forceRefresh
   * @return {boolean|{passive: boolean}}
   */
  function applyPassive$1() {
    var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (supportsPassive_$1 === undefined || forceRefresh) {
      var isSupported = false;
      try {
        globalObj.document.addEventListener('test', null, { get passive() {
            isSupported = true;
          } });
      } catch (e) {}

      supportsPassive_$1 = isSupported;
    }

    return supportsPassive_$1 ? { passive: true } : false;
  }

  /**
   * @param {!Object} HTMLElementPrototype
   * @return {!Array<string>}
   */
  function getMatchesProperty(HTMLElementPrototype) {
    return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(function (p) {
      return p in HTMLElementPrototype;
    }).pop();
  }

  /**
   * @param {!Event} ev
   * @param {{x: number, y: number}} pageOffset
   * @param {!ClientRect} clientRect
   * @return {{x: number, y: number}}
   */
  function getNormalizedEventCoords(ev, pageOffset, clientRect) {
    var x = pageOffset.x,
        y = pageOffset.y;

    var documentX = x + clientRect.left;
    var documentY = y + clientRect.top;

    var normalizedX = void 0;
    var normalizedY = void 0;
    // Determine touch point relative to the ripple container.
    if (ev.type === 'touchstart') {
      normalizedX = ev.changedTouches[0].pageX - documentX;
      normalizedY = ev.changedTouches[0].pageY - documentY;
    } else {
      normalizedX = ev.pageX - documentX;
      normalizedY = ev.pageY - documentY;
    }

    return { x: normalizedX, y: normalizedY };
  }

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  // Activation events registered on the root element of each instance for activation
  var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown'];

  // Deactivation events registered on documentElement when a pointer-related down event occurs
  var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup'];

  // Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations
  /** @type {!Array<!EventTarget>} */
  var activatedTargets = [];

  /**
   * @extends {MDCFoundation<!MDCRippleAdapter>}
   */

  var MDCRippleFoundation = function (_MDCFoundation) {
    inherits(MDCRippleFoundation, _MDCFoundation);
    createClass(MDCRippleFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings;
      }
    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          browserSupportsCssVars: function browserSupportsCssVars() /* boolean - cached */{},
          isUnbounded: function isUnbounded() /* boolean */{},
          isSurfaceActive: function isSurfaceActive() /* boolean */{},
          isSurfaceDisabled: function isSurfaceDisabled() /* boolean */{},
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          containsEventTarget: function containsEventTarget() /* target: !EventTarget */{},
          registerInteractionHandler: function registerInteractionHandler() /* evtType: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* evtType: string, handler: EventListener */{},
          registerDocumentInteractionHandler: function registerDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
          deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
          registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
          deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
          updateCssVariable: function updateCssVariable() /* varName: string, value: string */{},
          computeBoundingRect: function computeBoundingRect() /* ClientRect */{},
          getWindowPageOffset: function getWindowPageOffset() /* {x: number, y: number} */{}
        };
      }
    }]);

    function MDCRippleFoundation(adapter) {
      classCallCheck(this, MDCRippleFoundation);

      /** @private {number} */
      var _this = possibleConstructorReturn(this, (MDCRippleFoundation.__proto__ || Object.getPrototypeOf(MDCRippleFoundation)).call(this, _extends(MDCRippleFoundation.defaultAdapter, adapter)));

      _this.layoutFrame_ = 0;

      /** @private {!ClientRect} */
      _this.frame_ = /** @type {!ClientRect} */{ width: 0, height: 0 };

      /** @private {!ActivationStateType} */
      _this.activationState_ = _this.defaultActivationState_();

      /** @private {number} */
      _this.initialSize_ = 0;

      /** @private {number} */
      _this.maxRadius_ = 0;

      /** @private {function(!Event)} */
      _this.activateHandler_ = function (e) {
        return _this.activate_(e);
      };

      /** @private {function(!Event)} */
      _this.deactivateHandler_ = function (e) {
        return _this.deactivate_(e);
      };

      /** @private {function(?Event=)} */
      _this.focusHandler_ = function () {
        return _this.handleFocus();
      };

      /** @private {function(?Event=)} */
      _this.blurHandler_ = function () {
        return _this.handleBlur();
      };

      /** @private {!Function} */
      _this.resizeHandler_ = function () {
        return _this.layout();
      };

      /** @private {{left: number, top:number}} */
      _this.unboundedCoords_ = {
        left: 0,
        top: 0
      };

      /** @private {number} */
      _this.fgScale_ = 0;

      /** @private {number} */
      _this.activationTimer_ = 0;

      /** @private {number} */
      _this.fgDeactivationRemovalTimer_ = 0;

      /** @private {boolean} */
      _this.activationAnimationHasEnded_ = false;

      /** @private {!Function} */
      _this.activationTimerCallback_ = function () {
        _this.activationAnimationHasEnded_ = true;
        _this.runDeactivationUXLogicIfReady_();
      };

      /** @private {?Event} */
      _this.previousActivationEvent_ = null;
      return _this;
    }

    /**
     * We compute this property so that we are not querying information about the client
     * until the point in time where the foundation requests it. This prevents scenarios where
     * client-side feature-detection may happen too early, such as when components are rendered on the server
     * and then initialized at mount time on the client.
     * @return {boolean}
     * @private
     */


    createClass(MDCRippleFoundation, [{
      key: 'isSupported_',
      value: function isSupported_() {
        return this.adapter_.browserSupportsCssVars();
      }

      /**
       * @return {!ActivationStateType}
       */

    }, {
      key: 'defaultActivationState_',
      value: function defaultActivationState_() {
        return {
          isActivated: false,
          hasDeactivationUXRun: false,
          wasActivatedByPointer: false,
          wasElementMadeActive: false,
          activationEvent: null,
          isProgrammatic: false
        };
      }

      /** @override */

    }, {
      key: 'init',
      value: function init() {
        var _this2 = this;

        if (!this.isSupported_()) {
          return;
        }
        this.registerRootHandlers_();

        var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
            ROOT = _MDCRippleFoundation$.ROOT,
            UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;

        requestAnimationFrame(function () {
          _this2.adapter_.addClass(ROOT);
          if (_this2.adapter_.isUnbounded()) {
            _this2.adapter_.addClass(UNBOUNDED);
            // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
            _this2.layoutInternal_();
          }
        });
      }

      /** @override */

    }, {
      key: 'destroy',
      value: function destroy() {
        var _this3 = this;

        if (!this.isSupported_()) {
          return;
        }

        if (this.activationTimer_) {
          clearTimeout(this.activationTimer_);
          this.activationTimer_ = 0;
          var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

          this.adapter_.removeClass(FG_ACTIVATION);
        }

        this.deregisterRootHandlers_();
        this.deregisterDeactivationHandlers_();

        var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
            ROOT = _MDCRippleFoundation$2.ROOT,
            UNBOUNDED = _MDCRippleFoundation$2.UNBOUNDED;

        requestAnimationFrame(function () {
          _this3.adapter_.removeClass(ROOT);
          _this3.adapter_.removeClass(UNBOUNDED);
          _this3.removeCssVars_();
        });
      }

      /** @private */

    }, {
      key: 'registerRootHandlers_',
      value: function registerRootHandlers_() {
        var _this4 = this;

        ACTIVATION_EVENT_TYPES.forEach(function (type) {
          _this4.adapter_.registerInteractionHandler(type, _this4.activateHandler_);
        });
        this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
        this.adapter_.registerInteractionHandler('blur', this.blurHandler_);

        if (this.adapter_.isUnbounded()) {
          this.adapter_.registerResizeHandler(this.resizeHandler_);
        }
      }

      /**
       * @param {!Event} e
       * @private
       */

    }, {
      key: 'registerDeactivationHandlers_',
      value: function registerDeactivationHandlers_(e) {
        var _this5 = this;

        if (e.type === 'keydown') {
          this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
        } else {
          POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
            _this5.adapter_.registerDocumentInteractionHandler(type, _this5.deactivateHandler_);
          });
        }
      }

      /** @private */

    }, {
      key: 'deregisterRootHandlers_',
      value: function deregisterRootHandlers_() {
        var _this6 = this;

        ACTIVATION_EVENT_TYPES.forEach(function (type) {
          _this6.adapter_.deregisterInteractionHandler(type, _this6.activateHandler_);
        });
        this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
        this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

        if (this.adapter_.isUnbounded()) {
          this.adapter_.deregisterResizeHandler(this.resizeHandler_);
        }
      }

      /** @private */

    }, {
      key: 'deregisterDeactivationHandlers_',
      value: function deregisterDeactivationHandlers_() {
        var _this7 = this;

        this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
        POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
          _this7.adapter_.deregisterDocumentInteractionHandler(type, _this7.deactivateHandler_);
        });
      }

      /** @private */

    }, {
      key: 'removeCssVars_',
      value: function removeCssVars_() {
        var _this8 = this;

        var strings$$1 = MDCRippleFoundation.strings;

        Object.keys(strings$$1).forEach(function (k) {
          if (k.indexOf('VAR_') === 0) {
            _this8.adapter_.updateCssVariable(strings$$1[k], null);
          }
        });
      }

      /**
       * @param {?Event} e
       * @private
       */

    }, {
      key: 'activate_',
      value: function activate_(e) {
        var _this9 = this;

        if (this.adapter_.isSurfaceDisabled()) {
          return;
        }

        var activationState = this.activationState_;
        if (activationState.isActivated) {
          return;
        }

        // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
        var previousActivationEvent = this.previousActivationEvent_;
        var isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;
        if (isSameInteraction) {
          return;
        }

        activationState.isActivated = true;
        activationState.isProgrammatic = e === null;
        activationState.activationEvent = e;
        activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';

        var hasActivatedChild = e && activatedTargets.length > 0 && activatedTargets.some(function (target) {
          return _this9.adapter_.containsEventTarget(target);
        });
        if (hasActivatedChild) {
          // Immediately reset activation state, while preserving logic that prevents touch follow-on events
          this.resetActivationState_();
          return;
        }

        if (e) {
          activatedTargets.push( /** @type {!EventTarget} */e.target);
          this.registerDeactivationHandlers_(e);
        }

        activationState.wasElementMadeActive = this.checkElementMadeActive_(e);
        if (activationState.wasElementMadeActive) {
          this.animateActivation_();
        }

        requestAnimationFrame(function () {
          // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
          activatedTargets = [];

          if (!activationState.wasElementMadeActive && (e.key === ' ' || e.keyCode === 32)) {
            // If space was pressed, try again within an rAF call to detect :active, because different UAs report
            // active states inconsistently when they're called within event handling code:
            // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
            // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
            // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
            // variable is set within a rAF callback for a submit button interaction (#2241).
            activationState.wasElementMadeActive = _this9.checkElementMadeActive_(e);
            if (activationState.wasElementMadeActive) {
              _this9.animateActivation_();
            }
          }

          if (!activationState.wasElementMadeActive) {
            // Reset activation state immediately if element was not made active.
            _this9.activationState_ = _this9.defaultActivationState_();
          }
        });
      }

      /**
       * @param {?Event} e
       * @private
       */

    }, {
      key: 'checkElementMadeActive_',
      value: function checkElementMadeActive_(e) {
        return e && e.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
      }

      /**
       * @param {?Event=} event Optional event containing position information.
       */

    }, {
      key: 'activate',
      value: function activate() {
        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        this.activate_(event);
      }

      /** @private */

    }, {
      key: 'animateActivation_',
      value: function animateActivation_() {
        var _this10 = this;

        var _MDCRippleFoundation$3 = MDCRippleFoundation.strings,
            VAR_FG_TRANSLATE_START = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_START,
            VAR_FG_TRANSLATE_END = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_END;
        var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
            FG_DEACTIVATION = _MDCRippleFoundation$4.FG_DEACTIVATION,
            FG_ACTIVATION = _MDCRippleFoundation$4.FG_ACTIVATION;
        var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;


        this.layoutInternal_();

        var translateStart = '';
        var translateEnd = '';

        if (!this.adapter_.isUnbounded()) {
          var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
              startPoint = _getFgTranslationCoor.startPoint,
              endPoint = _getFgTranslationCoor.endPoint;

          translateStart = startPoint.x + 'px, ' + startPoint.y + 'px';
          translateEnd = endPoint.x + 'px, ' + endPoint.y + 'px';
        }

        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
        // Cancel any ongoing activation/deactivation animations
        clearTimeout(this.activationTimer_);
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.rmBoundedActivationClasses_();
        this.adapter_.removeClass(FG_DEACTIVATION);

        // Force layout in order to re-trigger the animation.
        this.adapter_.computeBoundingRect();
        this.adapter_.addClass(FG_ACTIVATION);
        this.activationTimer_ = setTimeout(function () {
          return _this10.activationTimerCallback_();
        }, DEACTIVATION_TIMEOUT_MS);
      }

      /**
       * @private
       * @return {{startPoint: PointType, endPoint: PointType}}
       */

    }, {
      key: 'getFgTranslationCoordinates_',
      value: function getFgTranslationCoordinates_() {
        var _activationState_ = this.activationState_,
            activationEvent = _activationState_.activationEvent,
            wasActivatedByPointer = _activationState_.wasActivatedByPointer;


        var startPoint = void 0;
        if (wasActivatedByPointer) {
          startPoint = getNormalizedEventCoords(
          /** @type {!Event} */activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
        } else {
          startPoint = {
            x: this.frame_.width / 2,
            y: this.frame_.height / 2
          };
        }
        // Center the element around the start point.
        startPoint = {
          x: startPoint.x - this.initialSize_ / 2,
          y: startPoint.y - this.initialSize_ / 2
        };

        var endPoint = {
          x: this.frame_.width / 2 - this.initialSize_ / 2,
          y: this.frame_.height / 2 - this.initialSize_ / 2
        };

        return { startPoint: startPoint, endPoint: endPoint };
      }

      /** @private */

    }, {
      key: 'runDeactivationUXLogicIfReady_',
      value: function runDeactivationUXLogicIfReady_() {
        var _this11 = this;

        // This method is called both when a pointing device is released, and when the activation animation ends.
        // The deactivation animation should only run after both of those occur.
        var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
        var _activationState_2 = this.activationState_,
            hasDeactivationUXRun = _activationState_2.hasDeactivationUXRun,
            isActivated = _activationState_2.isActivated;

        var activationHasEnded = hasDeactivationUXRun || !isActivated;

        if (activationHasEnded && this.activationAnimationHasEnded_) {
          this.rmBoundedActivationClasses_();
          this.adapter_.addClass(FG_DEACTIVATION);
          this.fgDeactivationRemovalTimer_ = setTimeout(function () {
            _this11.adapter_.removeClass(FG_DEACTIVATION);
          }, numbers.FG_DEACTIVATION_MS);
        }
      }

      /** @private */

    }, {
      key: 'rmBoundedActivationClasses_',
      value: function rmBoundedActivationClasses_() {
        var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

        this.adapter_.removeClass(FG_ACTIVATION);
        this.activationAnimationHasEnded_ = false;
        this.adapter_.computeBoundingRect();
      }
    }, {
      key: 'resetActivationState_',
      value: function resetActivationState_() {
        var _this12 = this;

        this.previousActivationEvent_ = this.activationState_.activationEvent;
        this.activationState_ = this.defaultActivationState_();
        // Touch devices may fire additional events for the same interaction within a short time.
        // Store the previous event until it's safe to assume that subsequent events are for new interactions.
        setTimeout(function () {
          return _this12.previousActivationEvent_ = null;
        }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
      }

      /**
       * @param {?Event} e
       * @private
       */

    }, {
      key: 'deactivate_',
      value: function deactivate_(e) {
        var _this13 = this;

        var activationState = this.activationState_;
        // This can happen in scenarios such as when you have a keyup event that blurs the element.
        if (!activationState.isActivated) {
          return;
        }

        var state = /** @type {!ActivationStateType} */_extends({}, activationState);

        if (activationState.isProgrammatic) {
          var evtObject = null;
          requestAnimationFrame(function () {
            return _this13.animateDeactivation_(evtObject, state);
          });
          this.resetActivationState_();
        } else {
          this.deregisterDeactivationHandlers_();
          requestAnimationFrame(function () {
            _this13.activationState_.hasDeactivationUXRun = true;
            _this13.animateDeactivation_(e, state);
            _this13.resetActivationState_();
          });
        }
      }

      /**
       * @param {?Event=} event Optional event containing position information.
       */

    }, {
      key: 'deactivate',
      value: function deactivate() {
        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        this.deactivate_(event);
      }

      /**
       * @param {Event} e
       * @param {!ActivationStateType} options
       * @private
       */

    }, {
      key: 'animateDeactivation_',
      value: function animateDeactivation_(e, _ref) {
        var wasActivatedByPointer = _ref.wasActivatedByPointer,
            wasElementMadeActive = _ref.wasElementMadeActive;

        if (wasActivatedByPointer || wasElementMadeActive) {
          this.runDeactivationUXLogicIfReady_();
        }
      }
    }, {
      key: 'layout',
      value: function layout() {
        var _this14 = this;

        if (this.layoutFrame_) {
          cancelAnimationFrame(this.layoutFrame_);
        }
        this.layoutFrame_ = requestAnimationFrame(function () {
          _this14.layoutInternal_();
          _this14.layoutFrame_ = 0;
        });
      }

      /** @private */

    }, {
      key: 'layoutInternal_',
      value: function layoutInternal_() {
        var _this15 = this;

        this.frame_ = this.adapter_.computeBoundingRect();
        var maxDim = Math.max(this.frame_.height, this.frame_.width);

        // Surface diameter is treated differently for unbounded vs. bounded ripples.
        // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
        // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
        // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
        // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
        // `overflow: hidden`.
        var getBoundedRadius = function getBoundedRadius() {
          var hypotenuse = Math.sqrt(Math.pow(_this15.frame_.width, 2) + Math.pow(_this15.frame_.height, 2));
          return hypotenuse + MDCRippleFoundation.numbers.PADDING;
        };

        this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();

        // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
        this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;
        this.fgScale_ = this.maxRadius_ / this.initialSize_;

        this.updateLayoutCssVars_();
      }

      /** @private */

    }, {
      key: 'updateLayoutCssVars_',
      value: function updateLayoutCssVars_() {
        var _MDCRippleFoundation$5 = MDCRippleFoundation.strings,
            VAR_FG_SIZE = _MDCRippleFoundation$5.VAR_FG_SIZE,
            VAR_LEFT = _MDCRippleFoundation$5.VAR_LEFT,
            VAR_TOP = _MDCRippleFoundation$5.VAR_TOP,
            VAR_FG_SCALE = _MDCRippleFoundation$5.VAR_FG_SCALE;


        this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + 'px');
        this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

        if (this.adapter_.isUnbounded()) {
          this.unboundedCoords_ = {
            left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
            top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
          };

          this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + 'px');
          this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + 'px');
        }
      }

      /** @param {boolean} unbounded */

    }, {
      key: 'setUnbounded',
      value: function setUnbounded(unbounded) {
        var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

        if (unbounded) {
          this.adapter_.addClass(UNBOUNDED);
        } else {
          this.adapter_.removeClass(UNBOUNDED);
        }
      }
    }, {
      key: 'handleFocus',
      value: function handleFocus() {
        var _this16 = this;

        requestAnimationFrame(function () {
          return _this16.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
      }
    }, {
      key: 'handleBlur',
      value: function handleBlur() {
        var _this17 = this;

        requestAnimationFrame(function () {
          return _this17.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
      }
    }]);
    return MDCRippleFoundation;
  }(MDCFoundation);

  var RippleBase = function (_MDCRippleFoundation) {
    inherits(RippleBase, _MDCRippleFoundation);
    createClass(RippleBase, null, [{
      key: 'isSurfaceActive',
      value: function isSurfaceActive(ref) {
        return ref[RippleBase.MATCHES](':active');
      }
    }, {
      key: 'MATCHES',
      get: function get$$1() {
        /* global HTMLElement */
        return RippleBase._matches || (RippleBase._matches = getMatchesProperty(HTMLElement.prototype));
      }
    }]);

    function RippleBase(vm, options) {
      classCallCheck(this, RippleBase);
      return possibleConstructorReturn(this, (RippleBase.__proto__ || Object.getPrototypeOf(RippleBase)).call(this, _extends({
        browserSupportsCssVars: function browserSupportsCssVars() {
          return supportsCssVariables(window);
        },
        isUnbounded: function isUnbounded() {
          return false;
        },
        isSurfaceActive: function isSurfaceActive() {
          return vm.$el[RippleBase.MATCHES](':active');
        },
        isSurfaceDisabled: function isSurfaceDisabled() {
          return vm.disabled;
        },
        addClass: function addClass(className) {
          vm.$set(vm.classes, className, true);
        },
        removeClass: function removeClass(className) {
          vm.$delete(vm.classes, className);
        },

        containsEventTarget: function containsEventTarget(target) {
          return vm.$el.contains(target);
        },
        registerInteractionHandler: function registerInteractionHandler(evt, handler) {
          vm.$el.addEventListener(evt, handler, applyPassive$1());
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
          vm.$el.removeEventListener(evt, handler, applyPassive$1());
        },
        registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
          return document.documentElement.addEventListener(evtType, handler, applyPassive$1());
        },
        deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
          return document.documentElement.removeEventListener(evtType, handler, applyPassive$1());
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          return window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          return window.removeEventListener('resize', handler);
        },
        updateCssVariable: function updateCssVariable(varName, value) {
          vm.$set(vm.styles, varName, value);
        },
        computeBoundingRect: function computeBoundingRect() {
          return vm.$el.getBoundingClientRect();
        },
        getWindowPageOffset: function getWindowPageOffset() {
          return { x: window.pageXOffset, y: window.pageYOffset };
        }
      }, options)));
    }

    return RippleBase;
  }(MDCRippleFoundation);

  var RippleMixin = {
    data: function data() {
      return {
        classes: {},
        styles: {}
      };
    },
    mounted: function mounted() {
      this.ripple = new RippleBase(this);
      this.ripple.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.ripple.destroy();
    }
  };

  //

  var script = {
    name: 'mdc-ripple',
    mixins: [CustomElementMixin, RippleMixin],
    props: {
      tag: String
    }
  };

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function __vue_render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("custom-element", {
      staticClass: "mdc-ripple",
      attrs: { tag: _vm.tag, classes: _vm.classes, styles: _vm.styles }
    }, [_vm._t("default")], 2);
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\ripple\\mdc-ripple.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */
  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
        }
      }
    };
  }
  /* style inject SSR */

  __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

  //

  var script$1 = {
    name: 'mdc-fab',
    mixins: [DispatchEventMixin, CustomButtonMixin, RippleMixin],
    props: {
      icon: String,
      mini: Boolean,
      absolute: Boolean,
      fixed: Boolean
    },
    data: function data() {
      return {
        classes: {
          'material-icons': this.icon,
          'mdc-fab--mini': this.mini,
          'mdc-fab--absolute': this.absolute,
          'mdc-fab--fixed': this.fixed
        },
        styles: {}
      };
    },

    watch: {
      icon: function icon() {
        this.$set(this.classes, 'material-icons', this.icon);
      },
      mini: function mini() {
        this.$set(this.classes, 'mdc-fab--mini', this.mini);
      }
    }
  };

  /* script */
  var __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function __vue_render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("custom-button", _vm._g({
      staticClass: "mdc-fab",
      class: _vm.classes,
      style: _vm.styles,
      attrs: { href: _vm.href, link: _vm.link }
    }, _vm.listeners), [_c("span", { staticClass: "mdc-fab__icon" }, [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2)]);
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\fab\\mdc-fab.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */
  function __vue_create_injector__$1() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
        }
      }
    };
  }
  /* style inject SSR */

  var mdcFAB = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

  var plugin = BasePlugin({
    mdcFAB: mdcFAB
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFiLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1lbGVtZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tYnV0dG9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Rpc3BhdGNoLWV2ZW50LW1peGluLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9jb21wb25lbnRzL3JpcHBsZS9tZGMtcmlwcGxlLWJhc2UuanMiLCIuLi8uLi9jb21wb25lbnRzL3JpcHBsZS9tZGMtcmlwcGxlLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvZmFiL21kYy1mYWIudnVlIiwiLi4vLi4vY29tcG9uZW50cy9mYWIvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL2ZhYi9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQocGx1Z2luKSB7XHJcbiAgLy8gQXV0by1pbnN0YWxsXHJcbiAgbGV0IF9WdWUgPSBudWxsXHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIC8qZ2xvYmFsIGdsb2JhbCovXHJcbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxyXG4gIH1cclxuICBpZiAoX1Z1ZSkge1xyXG4gICAgX1Z1ZS51c2UocGx1Z2luKVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbihjb21wb25lbnRzKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXHJcbiAgICBpbnN0YWxsOiB2bSA9PiB7XHJcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxyXG4gICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSwgY29tcG9uZW50KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50c1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgQ3VzdG9tRWxlbWVudCA9IHtcclxuICBmdW5jdGlvbmFsOiB0cnVlLFxyXG4gIHJlbmRlcihjcmVhdGVFbGVtZW50LCBjb250ZXh0KSB7XHJcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudChcclxuICAgICAgY29udGV4dC5wcm9wcy5pcyB8fCBjb250ZXh0LnByb3BzLnRhZyB8fCAnZGl2JyxcclxuICAgICAgY29udGV4dC5kYXRhLFxyXG4gICAgICBjb250ZXh0LmNoaWxkcmVuXHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ3VzdG9tRWxlbWVudE1peGluID0ge1xyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIEN1c3RvbUVsZW1lbnRcclxuICB9XHJcbn1cclxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50KGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xyXG4gIGxldCBldnRcclxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xyXG4gICAgICBkZXRhaWw6IGV2dERhdGEsXHJcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxyXG4gICAgfSlcclxuICB9IGVsc2Uge1xyXG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcclxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcclxuICB9XHJcbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IEN1c3RvbUJ1dHRvbiA9IHtcclxuICBuYW1lOiAnY3VzdG9tLWJ1dHRvbicsXHJcbiAgZnVuY3Rpb25hbDogdHJ1ZSxcclxuICBwcm9wczoge1xyXG4gICAgbGluazogT2JqZWN0XHJcbiAgfSxcclxuICByZW5kZXIoaCwgY29udGV4dCkge1xyXG4gICAgbGV0IGVsZW1lbnRcclxuICAgIGxldCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGV4dC5kYXRhKVxyXG5cclxuICAgIGlmIChjb250ZXh0LnByb3BzLmxpbmsgJiYgY29udGV4dC5wYXJlbnQuJHJvdXRlcikge1xyXG4gICAgICAvLyByb3V0ZXItbGluayBjYXNlXHJcbiAgICAgIGVsZW1lbnQgPSBjb250ZXh0LnBhcmVudC4kcm9vdC4kb3B0aW9ucy5jb21wb25lbnRzWydyb3V0ZXItbGluayddXHJcbiAgICAgIGRhdGEucHJvcHMgPSBPYmplY3QuYXNzaWduKHsgdGFnOiBjb250ZXh0LnByb3BzLnRhZyB9LCBjb250ZXh0LnByb3BzLmxpbmspXHJcbiAgICAgIGRhdGEuYXR0cnMucm9sZSA9ICdidXR0b24nXHJcbiAgICAgIGlmIChkYXRhLm9uLmNsaWNrKSB7XHJcbiAgICAgICAgZGF0YS5uYXRpdmVPbiA9IHsgY2xpY2s6IGRhdGEub24uY2xpY2sgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuYXR0cnMgJiYgZGF0YS5hdHRycy5ocmVmKSB7XHJcbiAgICAgIC8vIGhyZWYgY2FzZVxyXG4gICAgICBlbGVtZW50ID0gJ2EnXHJcbiAgICAgIGRhdGEuYXR0cnMucm9sZSA9ICdidXR0b24nXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBidXR0b24gZmFsbGJhY2tcclxuICAgICAgZWxlbWVudCA9ICdidXR0b24nXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGgoZWxlbWVudCwgZGF0YSwgY29udGV4dC5jaGlsZHJlbilcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBDdXN0b21CdXR0b25NaXhpbiA9IHtcclxuICBwcm9wczoge1xyXG4gICAgaHJlZjogU3RyaW5nLFxyXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXHJcbiAgICB0bzogW1N0cmluZywgT2JqZWN0XSxcclxuICAgIGV4YWN0OiBCb29sZWFuLFxyXG4gICAgYXBwZW5kOiBCb29sZWFuLFxyXG4gICAgcmVwbGFjZTogQm9vbGVhbixcclxuICAgIGFjdGl2ZUNsYXNzOiBTdHJpbmcsXHJcbiAgICBleGFjdEFjdGl2ZUNsYXNzOiBTdHJpbmdcclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICBsaW5rKCkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIHRoaXMudG8gJiYge1xyXG4gICAgICAgICAgdG86IHRoaXMudG8sXHJcbiAgICAgICAgICBleGFjdDogdGhpcy5leGFjdCxcclxuICAgICAgICAgIGFwcGVuZDogdGhpcy5hcHBlbmQsXHJcbiAgICAgICAgICByZXBsYWNlOiB0aGlzLnJlcGxhY2UsXHJcbiAgICAgICAgICBhY3RpdmVDbGFzczogdGhpcy5hY3RpdmVDbGFzcyxcclxuICAgICAgICAgIGV4YWN0QWN0aXZlQ2xhc3M6IHRoaXMuZXhhY3RBY3RpdmVDbGFzc1xyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgQ3VzdG9tQnV0dG9uXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBEaXNwYXRjaEV2ZW50TWl4aW4gPSB7XHJcbiAgcHJvcHM6IHtcclxuICAgIGV2ZW50OiBTdHJpbmcsXHJcbiAgICAnZXZlbnQtdGFyZ2V0JzogT2JqZWN0LFxyXG4gICAgJ2V2ZW50LWFyZ3MnOiBBcnJheVxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgZGlzcGF0Y2hFdmVudChldnQpIHtcclxuICAgICAgZXZ0ICYmIHRoaXMuJGVtaXQoZXZ0LnR5cGUsIGV2dClcclxuICAgICAgaWYgKHRoaXMuZXZlbnQpIHtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5ldmVudFRhcmdldCB8fCB0aGlzLiRyb290XHJcbiAgICAgICAgbGV0IGFyZ3MgPSB0aGlzLmV2ZW50QXJncyB8fCBbXVxyXG4gICAgICAgIHRhcmdldC4kZW1pdCh0aGlzLmV2ZW50LCAuLi5hcmdzKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgbGlzdGVuZXJzKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnRoaXMuJGxpc3RlbmVycyxcclxuICAgICAgICBjbGljazogZSA9PiB0aGlzLmRpc3BhdGNoRXZlbnQoZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJjb25zdCBzY29wZSA9XHJcbiAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcigweDEwMDAwMDAwKSkudG9TdHJpbmcoKSArICctJ1xyXG5cclxuZXhwb3J0IGNvbnN0IFZNQVVuaXF1ZUlkTWl4aW4gPSB7XHJcbiAgYmVmb3JlQ3JlYXRlKCkge1xyXG4gICAgdGhpcy52bWFfdWlkXyA9IHNjb3BlICsgdGhpcy5fdWlkXHJcbiAgfVxyXG59XHJcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFJpcHBsZS4gUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBtYW5hZ2luZ1xuICogLSBjbGFzc2VzXG4gKiAtIGRvbVxuICogLSBDU1MgdmFyaWFibGVzXG4gKiAtIHBvc2l0aW9uXG4gKiAtIGRpbWVuc2lvbnNcbiAqIC0gc2Nyb2xsIHBvc2l0aW9uXG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKiAtIHVuYm91bmRlZCwgYWN0aXZlIGFuZCBkaXNhYmxlZCBzdGF0ZXNcbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUFkYXB0ZXIge1xuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzVW5ib3VuZGVkKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlQWN0aXZlKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlRGlzYWJsZWQoKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUV2ZW50VGFyZ2V0fSB0YXJnZXQgKi9cbiAgY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YXJOYW1lXG4gICAqIEBwYXJhbSB7P251bWJlcnxzdHJpbmd9IHZhbHVlXG4gICAqL1xuICB1cGRhdGVDc3NWYXJpYWJsZSh2YXJOYW1lLCB2YWx1ZSkge31cblxuICAvKiogQHJldHVybiB7IUNsaWVudFJlY3R9ICovXG4gIGNvbXB1dGVCb3VuZGluZ1JlY3QoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSAqL1xuICBnZXRXaW5kb3dQYWdlT2Zmc2V0KCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICAvLyBSaXBwbGUgaXMgYSBzcGVjaWFsIGNhc2Ugd2hlcmUgdGhlIFwicm9vdFwiIGNvbXBvbmVudCBpcyByZWFsbHkgYSBcIm1peGluXCIgb2Ygc29ydHMsXG4gIC8vIGdpdmVuIHRoYXQgaXQncyBhbiAndXBncmFkZScgdG8gYW4gZXhpc3RpbmcgY29tcG9uZW50LiBUaGF0IGJlaW5nIHNhaWQgaXQgaXMgdGhlIHJvb3RcbiAgLy8gQ1NTIGNsYXNzIHRoYXQgYWxsIG90aGVyIENTUyBjbGFzc2VzIGRlcml2ZSBmcm9tLlxuICBST09UOiAnbWRjLXJpcHBsZS11cGdyYWRlZCcsXG4gIFVOQk9VTkRFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLXVuYm91bmRlZCcsXG4gIEJHX0ZPQ1VTRUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1iYWNrZ3JvdW5kLWZvY3VzZWQnLFxuICBGR19BQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1hY3RpdmF0aW9uJyxcbiAgRkdfREVBQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1kZWFjdGl2YXRpb24nLFxufTtcblxuY29uc3Qgc3RyaW5ncyA9IHtcbiAgVkFSX0xFRlQ6ICctLW1kYy1yaXBwbGUtbGVmdCcsXG4gIFZBUl9UT1A6ICctLW1kYy1yaXBwbGUtdG9wJyxcbiAgVkFSX0ZHX1NJWkU6ICctLW1kYy1yaXBwbGUtZmctc2l6ZScsXG4gIFZBUl9GR19TQ0FMRTogJy0tbWRjLXJpcHBsZS1mZy1zY2FsZScsXG4gIFZBUl9GR19UUkFOU0xBVEVfU1RBUlQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLXN0YXJ0JyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9FTkQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLWVuZCcsXG59O1xuXG5jb25zdCBudW1iZXJzID0ge1xuICBQQURESU5HOiAxMCxcbiAgSU5JVElBTF9PUklHSU5fU0NBTEU6IDAuNixcbiAgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVM6IDIyNSwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtdHJhbnNsYXRlLWR1cmF0aW9uIChpLmUuIGFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBGR19ERUFDVElWQVRJT05fTVM6IDE1MCwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtZmFkZS1vdXQtZHVyYXRpb24gKGkuZS4gZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgVEFQX0RFTEFZX01TOiAzMDAsIC8vIERlbGF5IGJldHdlZW4gdG91Y2ggYW5kIHNpbXVsYXRlZCBtb3VzZSBldmVudHMgb24gdG91Y2ggZGV2aWNlc1xufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgQ1NTIGN1c3RvbSB2YXJpYWJsZSBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBhcHBseVBhc3NpdmUgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzUGFzc2l2ZV87XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKSB7XG4gIC8vIERldGVjdCB2ZXJzaW9ucyBvZiBFZGdlIHdpdGggYnVnZ3kgdmFyKCkgc3VwcG9ydFxuICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzExNDk1NDQ4L1xuICBjb25zdCBkb2N1bWVudCA9IHdpbmRvd09iai5kb2N1bWVudDtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBub2RlLmNsYXNzTmFtZSA9ICdtZGMtcmlwcGxlLXN1cmZhY2UtLXRlc3QtZWRnZS12YXItYnVnJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcblxuICAvLyBUaGUgYnVnIGV4aXN0cyBpZiA6OmJlZm9yZSBzdHlsZSBlbmRzIHVwIHByb3BhZ2F0aW5nIHRvIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgLy8gQWRkaXRpb25hbGx5LCBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgbnVsbCBpbiBpZnJhbWVzIHdpdGggZGlzcGxheTogXCJub25lXCIgaW4gRmlyZWZveCxcbiAgLy8gYnV0IEZpcmVmb3ggaXMga25vd24gdG8gc3VwcG9ydCBDU1MgY3VzdG9tIHByb3BlcnRpZXMgY29ycmVjdGx5LlxuICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93T2JqLmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGNvbnN0IGhhc1BzZXVkb1ZhckJ1ZyA9IGNvbXB1dGVkU3R5bGUgIT09IG51bGwgJiYgY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BTdHlsZSA9PT0gJ3NvbGlkJztcbiAgbm9kZS5yZW1vdmUoKTtcbiAgcmV0dXJuIGhhc1BzZXVkb1ZhckJ1Zztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3dPYmosIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPT09ICdib29sZWFuJyAmJiAhZm9yY2VSZWZyZXNoKSB7XG4gICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG5cbiAgY29uc3Qgc3VwcG9ydHNGdW5jdGlvblByZXNlbnQgPSB3aW5kb3dPYmouQ1NTICYmIHR5cGVvZiB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIXN1cHBvcnRzRnVuY3Rpb25QcmVzZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyA9IHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJy0tY3NzLXZhcnMnLCAneWVzJyk7XG4gIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NDY2OVxuICAvLyBTZWU6IFJFQURNRSBzZWN0aW9uIG9uIFNhZmFyaVxuICBjb25zdCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMgPSAoXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnKC0tY3NzLXZhcnM6IHllcyknKSAmJlxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJ2NvbG9yJywgJyMwMDAwMDAwMCcpXG4gICk7XG5cbiAgaWYgKGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgfHwgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSAhZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopO1xuICB9IGVsc2Uge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gZmFsc2U7XG4gIH1cblxuICBpZiAoIWZvcmNlUmVmcmVzaCkge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG4gIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbn1cblxuLy9cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHtwYXNzaXZlOiBib29sZWFufX1cbiAqL1xuZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSBIVE1MRWxlbWVudFByb3RvdHlwZVxuICogQHJldHVybiB7IUFycmF5PHN0cmluZz59XG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudFByb3RvdHlwZSkge1xuICByZXR1cm4gW1xuICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLCAnbXNNYXRjaGVzU2VsZWN0b3InLCAnbWF0Y2hlcycsXG4gIF0uZmlsdGVyKChwKSA9PiBwIGluIEhUTUxFbGVtZW50UHJvdG90eXBlKS5wb3AoKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFFdmVudH0gZXZcbiAqIEBwYXJhbSB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gcGFnZU9mZnNldFxuICogQHBhcmFtIHshQ2xpZW50UmVjdH0gY2xpZW50UmVjdFxuICogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKGV2LCBwYWdlT2Zmc2V0LCBjbGllbnRSZWN0KSB7XG4gIGNvbnN0IHt4LCB5fSA9IHBhZ2VPZmZzZXQ7XG4gIGNvbnN0IGRvY3VtZW50WCA9IHggKyBjbGllbnRSZWN0LmxlZnQ7XG4gIGNvbnN0IGRvY3VtZW50WSA9IHkgKyBjbGllbnRSZWN0LnRvcDtcblxuICBsZXQgbm9ybWFsaXplZFg7XG4gIGxldCBub3JtYWxpemVkWTtcbiAgLy8gRGV0ZXJtaW5lIHRvdWNoIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByaXBwbGUgY29udGFpbmVyLlxuICBpZiAoZXYudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9IGVsc2Uge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfVxuXG4gIHJldHVybiB7eDogbm9ybWFsaXplZFgsIHk6IG5vcm1hbGl6ZWRZfTtcbn1cblxuZXhwb3J0IHtzdXBwb3J0c0Nzc1ZhcmlhYmxlcywgYXBwbHlQYXNzaXZlLCBnZXRNYXRjaGVzUHJvcGVydHksIGdldE5vcm1hbGl6ZWRFdmVudENvb3Jkc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge2dldE5vcm1hbGl6ZWRFdmVudENvb3Jkc30gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBpc0FjdGl2YXRlZDogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGFjdGl2YXRpb25FdmVudDogRXZlbnQsXG4gKiAgIGlzUHJvZ3JhbW1hdGljOiAoYm9vbGVhbnx1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgQWN0aXZhdGlvblN0YXRlVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBkZWFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGZvY3VzOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGJsdXI6IChzdHJpbmd8dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVySW5mb1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGZvY3VzOiBmdW5jdGlvbigpLFxuICogICBibHVyOiBmdW5jdGlvbigpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJzVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB4OiBudW1iZXIsXG4gKiAgIHk6IG51bWJlclxuICogfX1cbiAqL1xubGV0IFBvaW50VHlwZTtcblxuLy8gQWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiB0aGUgcm9vdCBlbGVtZW50IG9mIGVhY2ggaW5zdGFuY2UgZm9yIGFjdGl2YXRpb25cbmNvbnN0IEFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoc3RhcnQnLCAncG9pbnRlcmRvd24nLCAnbW91c2Vkb3duJywgJ2tleWRvd24nXTtcblxuLy8gRGVhY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIGRvY3VtZW50RWxlbWVudCB3aGVuIGEgcG9pbnRlci1yZWxhdGVkIGRvd24gZXZlbnQgb2NjdXJzXG5jb25zdCBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hlbmQnLCAncG9pbnRlcnVwJywgJ21vdXNldXAnXTtcblxuLy8gVHJhY2tzIGFjdGl2YXRpb25zIHRoYXQgaGF2ZSBvY2N1cnJlZCBvbiB0aGUgY3VycmVudCBmcmFtZSwgdG8gYXZvaWQgc2ltdWx0YW5lb3VzIG5lc3RlZCBhY3RpdmF0aW9uc1xuLyoqIEB0eXBlIHshQXJyYXk8IUV2ZW50VGFyZ2V0Pn0gKi9cbmxldCBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1JpcHBsZUFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IC8qIGJvb2xlYW4gLSBjYWNoZWQgKi8ge30sXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICgvKiB0YXJnZXQ6ICFFdmVudFRhcmdldCAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAoLyogdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IC8qIENsaWVudFJlY3QgKi8ge30sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAvKiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9ICovIHt9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENSaXBwbGVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUgeyFDbGllbnRSZWN0fSAqL1xuICAgIHRoaXMuZnJhbWVfID0gLyoqIEB0eXBlIHshQ2xpZW50UmVjdH0gKi8gKHt3aWR0aDogMCwgaGVpZ2h0OiAwfSk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubWF4UmFkaXVzXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuZGVhY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuZm9jdXNIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlRm9jdXMoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUJsdXIoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuXG4gICAgLyoqIEBwcml2YXRlIHt7bGVmdDogbnVtYmVyLCB0b3A6bnVtYmVyfX0gKi9cbiAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnU2NhbGVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IHRydWU7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUgez9FdmVudH0gKi9cbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogV2UgY29tcHV0ZSB0aGlzIHByb3BlcnR5IHNvIHRoYXQgd2UgYXJlIG5vdCBxdWVyeWluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY2xpZW50XG4gICAqIHVudGlsIHRoZSBwb2ludCBpbiB0aW1lIHdoZXJlIHRoZSBmb3VuZGF0aW9uIHJlcXVlc3RzIGl0LiBUaGlzIHByZXZlbnRzIHNjZW5hcmlvcyB3aGVyZVxuICAgKiBjbGllbnQtc2lkZSBmZWF0dXJlLWRldGVjdGlvbiBtYXkgaGFwcGVuIHRvbyBlYXJseSwgc3VjaCBhcyB3aGVuIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXJcbiAgICogYW5kIHRoZW4gaW5pdGlhbGl6ZWQgYXQgbW91bnQgdGltZSBvbiB0aGUgY2xpZW50LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNTdXBwb3J0ZWRfKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshQWN0aXZhdGlvblN0YXRlVHlwZX1cbiAgICovXG4gIGRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2YXRlZDogZmFsc2UsXG4gICAgICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogZmFsc2UsXG4gICAgICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IGZhbHNlLFxuICAgICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IGZhbHNlLFxuICAgICAgYWN0aXZhdGlvbkV2ZW50OiBudWxsLFxuICAgICAgaXNQcm9ncmFtbWF0aWM6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhST09UKTtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgICAvLyBVbmJvdW5kZWQgcmlwcGxlcyBuZWVkIGxheW91dCBsb2dpYyBhcHBsaWVkIGltbWVkaWF0ZWx5IHRvIHNldCBjb29yZGluYXRlcyBmb3IgYm90aCBzaGFkZSBhbmQgcmlwcGxlXG4gICAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWN0aXZhdGlvblRpbWVyXykge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuICAgICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG4gICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhST09UKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgIHRoaXMucmVtb3ZlQ3NzVmFyc18oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbW92ZUNzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtzdHJpbmdzfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4gICAgT2JqZWN0LmtleXMoc3RyaW5ncykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKGsuaW5kZXhPZignVkFSXycpID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoc3RyaW5nc1trXSwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjdGl2YXRlXyhlKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgcmVhY3RpbmcgdG8gZm9sbG93LW9uIGV2ZW50cyBmaXJlZCBieSB0b3VjaCBkZXZpY2UgYWZ0ZXIgYW4gYWxyZWFkeS1wcm9jZXNzZWQgdXNlciBpbnRlcmFjdGlvblxuICAgIGNvbnN0IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ID0gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XG4gICAgY29uc3QgaXNTYW1lSW50ZXJhY3Rpb24gPSBwcmV2aW91c0FjdGl2YXRpb25FdmVudCAmJiBlICYmIHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50LnR5cGUgIT09IGUudHlwZTtcbiAgICBpZiAoaXNTYW1lSW50ZXJhY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA9IGUgPT09IG51bGw7XG4gICAgYWN0aXZhdGlvblN0YXRlLmFjdGl2YXRpb25FdmVudCA9IGU7XG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0FjdGl2YXRlZEJ5UG9pbnRlciA9IGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA/IGZhbHNlIDogKFxuICAgICAgZS50eXBlID09PSAnbW91c2Vkb3duJyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICdwb2ludGVyZG93bidcbiAgICApO1xuXG4gICAgY29uc3QgaGFzQWN0aXZhdGVkQ2hpbGQgPVxuICAgICAgZSAmJiBhY3RpdmF0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgYWN0aXZhdGVkVGFyZ2V0cy5zb21lKCh0YXJnZXQpID0+IHRoaXMuYWRhcHRlcl8uY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpKTtcbiAgICBpZiAoaGFzQWN0aXZhdGVkQ2hpbGQpIHtcbiAgICAgIC8vIEltbWVkaWF0ZWx5IHJlc2V0IGFjdGl2YXRpb24gc3RhdGUsIHdoaWxlIHByZXNlcnZpbmcgbG9naWMgdGhhdCBwcmV2ZW50cyB0b3VjaCBmb2xsb3ctb24gZXZlbnRzXG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzLnB1c2goLyoqIEB0eXBlIHshRXZlbnRUYXJnZXR9ICovIChlLnRhcmdldCkpO1xuICAgICAgdGhpcy5yZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFJlc2V0IGFycmF5IG9uIG5leHQgZnJhbWUgYWZ0ZXIgdGhlIGN1cnJlbnQgZXZlbnQgaGFzIGhhZCBhIGNoYW5jZSB0byBidWJibGUgdG8gcHJldmVudCBhbmNlc3RvciByaXBwbGVzXG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlICYmIChlLmtleSA9PT0gJyAnIHx8IGUua2V5Q29kZSA9PT0gMzIpKSB7XG4gICAgICAgIC8vIElmIHNwYWNlIHdhcyBwcmVzc2VkLCB0cnkgYWdhaW4gd2l0aGluIGFuIHJBRiBjYWxsIHRvIGRldGVjdCA6YWN0aXZlLCBiZWNhdXNlIGRpZmZlcmVudCBVQXMgcmVwb3J0XG4gICAgICAgIC8vIGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW4gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MzU5NzFcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjkzNzQxXG4gICAgICAgIC8vIFdlIHRyeSBmaXJzdCBvdXRzaWRlIHJBRiB0byBzdXBwb3J0IEVkZ2UsIHdoaWNoIGRvZXMgbm90IGV4aGliaXQgdGhpcyBwcm9ibGVtLCBidXQgd2lsbCBjcmFzaCBpZiBhIENTU1xuICAgICAgICAvLyB2YXJpYWJsZSBpcyBzZXQgd2l0aGluIGEgckFGIGNhbGxiYWNrIGZvciBhIHN1Ym1pdCBidXR0b24gaW50ZXJhY3Rpb24gKCMyMjQxKS5cbiAgICAgICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSkge1xuICAgIHJldHVybiAoZSAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykgPyB0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZUFjdGl2ZSgpIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhcnQgPSAnJztcbiAgICBsZXQgdHJhbnNsYXRlRW5kID0gJyc7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgY29uc3Qge3N0YXJ0UG9pbnQsIGVuZFBvaW50fSA9IHRoaXMuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpO1xuICAgICAgdHJhbnNsYXRlU3RhcnQgPSBgJHtzdGFydFBvaW50Lnh9cHgsICR7c3RhcnRQb2ludC55fXB4YDtcbiAgICAgIHRyYW5zbGF0ZUVuZCA9IGAke2VuZFBvaW50Lnh9cHgsICR7ZW5kUG9pbnQueX1weGA7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCB0cmFuc2xhdGVTdGFydCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX0VORCwgdHJhbnNsYXRlRW5kKTtcbiAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gYW5pbWF0aW9uc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG5cbiAgICAvLyBGb3JjZSBsYXlvdXQgaW4gb3JkZXIgdG8gcmUtdHJpZ2dlciB0aGUgYW5pbWF0aW9uLlxuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpLCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7e3N0YXJ0UG9pbnQ6IFBvaW50VHlwZSwgZW5kUG9pbnQ6IFBvaW50VHlwZX19XG4gICAqL1xuICBnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCkge1xuICAgIGNvbnN0IHthY3RpdmF0aW9uRXZlbnQsIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcn0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG5cbiAgICBsZXQgc3RhcnRQb2ludDtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyKSB7XG4gICAgICBzdGFydFBvaW50ID0gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKFxuICAgICAgICAvKiogQHR5cGUgeyFFdmVudH0gKi8gKGFjdGl2YXRpb25FdmVudCksXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLmZyYW1lXy5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXG4gICAgc3RhcnRQb2ludCA9IHtcbiAgICAgIHg6IHN0YXJ0UG9pbnQueCAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogc3RhcnRQb2ludC55IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IGVuZFBvaW50ID0ge1xuICAgICAgeDogKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6ICh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXJ0UG9pbnQsIGVuZFBvaW50fTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJvdGggd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyByZWxlYXNlZCwgYW5kIHdoZW4gdGhlIGFjdGl2YXRpb24gYW5pbWF0aW9uIGVuZHMuXG4gICAgLy8gVGhlIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gc2hvdWxkIG9ubHkgcnVuIGFmdGVyIGJvdGggb2YgdGhvc2Ugb2NjdXIuXG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge2hhc0RlYWN0aXZhdGlvblVYUnVuLCBpc0FjdGl2YXRlZH0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgY29uc3QgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xuXG4gICAgaWYgKGFjdGl2YXRpb25IYXNFbmRlZCAmJiB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8pIHtcbiAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9LCBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpIHtcbiAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXG4gICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGwsIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWFjdGl2YXRlXyhlKSB7XG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBzY2VuYXJpb3Mgc3VjaCBhcyB3aGVuIHlvdSBoYXZlIGEga2V5dXAgZXZlbnQgdGhhdCBibHVycyB0aGUgZWxlbWVudC5cbiAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gLyoqIEB0eXBlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi8gKE9iamVjdC5hc3NpZ24oe30sIGFjdGl2YXRpb25TdGF0ZSkpO1xuXG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYykge1xuICAgICAgY29uc3QgZXZ0T2JqZWN0ID0gbnVsbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGV2dE9iamVjdCwgc3RhdGUpKTtcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmhhc0RlYWN0aXZhdGlvblVYUnVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhlLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZGVhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAqIEBwYXJhbSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9IG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHt3YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlfSkge1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgfHwgd2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGxheW91dEludGVybmFsXygpIHtcbiAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KHRoaXMuZnJhbWVfLmhlaWdodCwgdGhpcy5mcmFtZV8ud2lkdGgpO1xuXG4gICAgLy8gU3VyZmFjZSBkaWFtZXRlciBpcyB0cmVhdGVkIGRpZmZlcmVudGx5IGZvciB1bmJvdW5kZWQgdnMuIGJvdW5kZWQgcmlwcGxlcy5cbiAgICAvLyBVbmJvdW5kZWQgcmlwcGxlIGRpYW1ldGVyIGlzIGNhbGN1bGF0ZWQgc21hbGxlciBzaW5jZSB0aGUgc3VyZmFjZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIHBhZGRlZCBhcHByb3ByaWF0ZWx5XG4gICAgLy8gdG8gZXh0ZW5kIHRoZSBoaXRib3gsIGFuZCB0aGUgcmlwcGxlIGlzIGV4cGVjdGVkIHRvIG1lZXQgdGhlIGVkZ2VzIG9mIHRoZSBwYWRkZWQgaGl0Ym94ICh3aGljaCBpcyB0eXBpY2FsbHlcbiAgICAvLyBzcXVhcmUpLiBCb3VuZGVkIHJpcHBsZXMsIG9uIHRoZSBvdGhlciBoYW5kLCBhcmUgZnVsbHkgZXhwZWN0ZWQgdG8gZXhwYW5kIGJleW9uZCB0aGUgc3VyZmFjZSdzIGxvbmdlc3QgZGlhbWV0ZXJcbiAgICAvLyAoY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZGlhZ29uYWwgcGx1cyBhIGNvbnN0YW50IHBhZGRpbmcpLCBhbmQgYXJlIGNsaXBwZWQgYXQgdGhlIHN1cmZhY2UncyBib3JkZXIgdmlhXG4gICAgLy8gYG92ZXJmbG93OiBoaWRkZW5gLlxuICAgIGNvbnN0IGdldEJvdW5kZWRSYWRpdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuZnJhbWVfLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuZnJhbWVfLmhlaWdodCwgMikpO1xuICAgICAgcmV0dXJuIGh5cG90ZW51c2UgKyBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuUEFERElORztcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpID8gbWF4RGltIDogZ2V0Qm91bmRlZFJhZGl1cygpO1xuXG4gICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IG1heERpbSAqIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5JTklUSUFMX09SSUdJTl9TQ0FMRTtcbiAgICB0aGlzLmZnU2NhbGVfID0gdGhpcy5tYXhSYWRpdXNfIC8gdGhpcy5pbml0aWFsU2l6ZV87XG5cbiAgICB0aGlzLnVwZGF0ZUxheW91dENzc1ZhcnNfKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgdXBkYXRlTGF5b3V0Q3NzVmFyc18oKSB7XG4gICAgY29uc3Qge1xuICAgICAgVkFSX0ZHX1NJWkUsIFZBUl9MRUZULCBWQVJfVE9QLCBWQVJfRkdfU0NBTEUsXG4gICAgfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NJWkUsIGAke3RoaXMuaW5pdGlhbFNpemVffXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0NBTEUsIHRoaXMuZmdTY2FsZV8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfTEVGVCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLmxlZnR9cHhgKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcH1weGApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXRVbmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgY29uc3Qge1VOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHVuYm91bmRlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXMoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cblxuICBoYW5kbGVCbHVyKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4iLCJpbXBvcnQgTURDUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMnXHJcbmltcG9ydCB7XHJcbiAgc3VwcG9ydHNDc3NWYXJpYWJsZXMsXHJcbiAgZ2V0TWF0Y2hlc1Byb3BlcnR5LFxyXG4gIGFwcGx5UGFzc2l2ZVxyXG59IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvdXRpbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBSaXBwbGVCYXNlIGV4dGVuZHMgTURDUmlwcGxlRm91bmRhdGlvbiB7XHJcbiAgc3RhdGljIGdldCBNQVRDSEVTKCkge1xyXG4gICAgLyogZ2xvYmFsIEhUTUxFbGVtZW50ICovXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBSaXBwbGVCYXNlLl9tYXRjaGVzIHx8XHJcbiAgICAgIChSaXBwbGVCYXNlLl9tYXRjaGVzID0gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSkpXHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNTdXJmYWNlQWN0aXZlKHJlZikge1xyXG4gICAgcmV0dXJuIHJlZltSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHZtLCBvcHRpb25zKSB7XHJcbiAgICBzdXBlcihcclxuICAgICAgT2JqZWN0LmFzc2lnbihcclxuICAgICAgICB7XHJcbiAgICAgICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3cpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2bS4kZWxbUmlwcGxlQmFzZS5NQVRDSEVTXSgnOmFjdGl2ZScpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZtLmRpc2FibGVkXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIHZtLiRzZXQodm0uY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICB2bS4kZGVsZXRlKHZtLmNsYXNzZXMsIGNsYXNzTmFtZSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiB0YXJnZXQgPT4gdm0uJGVsLmNvbnRhaW5zKHRhcmdldCksXHJcbiAgICAgICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2bS4kZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICAgICAgdm0uJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcclxuICAgICAgICAgICAgICBoYW5kbGVyLFxyXG4gICAgICAgICAgICAgIGFwcGx5UGFzc2l2ZSgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgICBldnRUeXBlLFxyXG4gICAgICAgICAgICAgIGhhbmRsZXIsXHJcbiAgICAgICAgICAgICAgYXBwbHlQYXNzaXZlKClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogaGFuZGxlciA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogaGFuZGxlciA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKHZhck5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHZtLiRzZXQodm0uc3R5bGVzLCB2YXJOYW1lLCB2YWx1ZSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2bS4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHg6IHdpbmRvdy5wYWdlWE9mZnNldCwgeTogd2luZG93LnBhZ2VZT2Zmc2V0IH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9wdGlvbnNcclxuICAgICAgKVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJpcHBsZU1peGluID0ge1xyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiB7fSxcclxuICAgICAgc3R5bGVzOiB7fVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbW91bnRlZCgpIHtcclxuICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcylcclxuICAgIHRoaXMucmlwcGxlLmluaXQoKVxyXG4gIH0sXHJcbiAgYmVmb3JlRGVzdHJveSgpIHtcclxuICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKVxyXG4gIH1cclxufVxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGN1c3RvbS1lbGVtZW50IFxyXG4gICAgOnRhZz1cInRhZ1wiIFxyXG4gICAgOmNsYXNzZXM9XCJjbGFzc2VzXCJcclxuICAgIDpzdHlsZXM9XCJzdHlsZXNcIiBcclxuICAgIGNsYXNzPVwibWRjLXJpcHBsZVwiPlxyXG4gICAgPHNsb3QgLz5cclxuICA8L2N1c3RvbS1lbGVtZW50PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHsgQ3VzdG9tRWxlbWVudE1peGluIH0gZnJvbSAnLi4vYmFzZSdcclxuaW1wb3J0IHsgUmlwcGxlTWl4aW4gfSBmcm9tICcuL21kYy1yaXBwbGUtYmFzZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLXJpcHBsZScsXHJcbiAgbWl4aW5zOiBbQ3VzdG9tRWxlbWVudE1peGluLCBSaXBwbGVNaXhpbl0sXHJcbiAgcHJvcHM6IHtcclxuICAgIHRhZzogU3RyaW5nXHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGN1c3RvbS1idXR0b24gXHJcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCIgXHJcbiAgICA6c3R5bGU9XCJzdHlsZXNcIiBcclxuICAgIDpocmVmPVwiaHJlZlwiXHJcbiAgICA6bGluaz1cImxpbmtcIiBcclxuICAgIGNsYXNzPVwibWRjLWZhYlwiIFxyXG4gICAgdi1vbj1cImxpc3RlbmVyc1wiID5cclxuICAgIDxzcGFuIGNsYXNzPVwibWRjLWZhYl9faWNvblwiPlxyXG4gICAgICA8c2xvdD57eyBpY29uIH19PC9zbG90PlxyXG4gICAgPC9zcGFuPlxyXG4gIDwvY3VzdG9tLWJ1dHRvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IERpc3BhdGNoRXZlbnRNaXhpbiwgQ3VzdG9tQnV0dG9uTWl4aW4gfSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgeyBSaXBwbGVNaXhpbiB9IGZyb20gJy4uL3JpcHBsZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLWZhYicsXHJcbiAgbWl4aW5zOiBbRGlzcGF0Y2hFdmVudE1peGluLCBDdXN0b21CdXR0b25NaXhpbiwgUmlwcGxlTWl4aW5dLFxyXG4gIHByb3BzOiB7XHJcbiAgICBpY29uOiBTdHJpbmcsXHJcbiAgICBtaW5pOiBCb29sZWFuLFxyXG4gICAgYWJzb2x1dGU6IEJvb2xlYW4sXHJcbiAgICBmaXhlZDogQm9vbGVhblxyXG4gIH0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNsYXNzZXM6IHtcclxuICAgICAgICAnbWF0ZXJpYWwtaWNvbnMnOiB0aGlzLmljb24sXHJcbiAgICAgICAgJ21kYy1mYWItLW1pbmknOiB0aGlzLm1pbmksXHJcbiAgICAgICAgJ21kYy1mYWItLWFic29sdXRlJzogdGhpcy5hYnNvbHV0ZSxcclxuICAgICAgICAnbWRjLWZhYi0tZml4ZWQnOiB0aGlzLmZpeGVkXHJcbiAgICAgIH0sXHJcbiAgICAgIHN0eWxlczoge31cclxuICAgIH1cclxuICB9LFxyXG4gIHdhdGNoOiB7XHJcbiAgICBpY29uKCkge1xyXG4gICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCAnbWF0ZXJpYWwtaWNvbnMnLCB0aGlzLmljb24pXHJcbiAgICB9LFxyXG4gICAgbWluaSgpIHtcclxuICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgJ21kYy1mYWItLW1pbmknLCB0aGlzLm1pbmkpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCJpbXBvcnQgeyBCYXNlUGx1Z2luIH0gZnJvbSAnLi4vYmFzZSdcclxuaW1wb3J0IG1kY0ZBQiBmcm9tICcuL21kYy1mYWIudnVlJ1xyXG5cclxuZXhwb3J0IHsgbWRjRkFCIH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xyXG4gIG1kY0ZBQlxyXG59KVxyXG4iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXHJcbmltcG9ydCB7IGF1dG9Jbml0IH0gZnJvbSAnLi4vYmFzZSdcclxuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xyXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cclxuXHJcbmF1dG9Jbml0KHBsdWdpbilcclxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJrZXkiLCJjb21wb25lbnQiLCJ2bSIsIm5hbWUiLCJDdXN0b21FbGVtZW50IiwiZnVuY3Rpb25hbCIsInJlbmRlciIsImNyZWF0ZUVsZW1lbnQiLCJjb250ZXh0IiwicHJvcHMiLCJpcyIsInRhZyIsImRhdGEiLCJjaGlsZHJlbiIsIkN1c3RvbUVsZW1lbnRNaXhpbiIsIkN1c3RvbUJ1dHRvbiIsImxpbmsiLCJPYmplY3QiLCJoIiwiZWxlbWVudCIsImJhYmVsSGVscGVycy5leHRlbmRzIiwicGFyZW50IiwiJHJvdXRlciIsIiRyb290IiwiJG9wdGlvbnMiLCJhdHRycyIsInJvbGUiLCJvbiIsImNsaWNrIiwibmF0aXZlT24iLCJocmVmIiwiQ3VzdG9tQnV0dG9uTWl4aW4iLCJTdHJpbmciLCJkaXNhYmxlZCIsIkJvb2xlYW4iLCJ0byIsImV4YWN0IiwiYXBwZW5kIiwicmVwbGFjZSIsImFjdGl2ZUNsYXNzIiwiZXhhY3RBY3RpdmVDbGFzcyIsImNvbXB1dGVkIiwiRGlzcGF0Y2hFdmVudE1peGluIiwiZXZlbnQiLCJBcnJheSIsIm1ldGhvZHMiLCJkaXNwYXRjaEV2ZW50IiwiZXZ0IiwiJGVtaXQiLCJ0eXBlIiwidGFyZ2V0IiwiZXZlbnRUYXJnZXQiLCJhcmdzIiwiZXZlbnRBcmdzIiwibGlzdGVuZXJzIiwiJGxpc3RlbmVycyIsImUiLCJzY29wZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwiTURDRm91bmRhdGlvbiIsImFkYXB0ZXIiLCJhZGFwdGVyXyIsIk1EQ1JpcHBsZUFkYXB0ZXIiLCJjbGFzc05hbWUiLCJldnRUeXBlIiwiaGFuZGxlciIsInZhck5hbWUiLCJ2YWx1ZSIsImNzc0NsYXNzZXMiLCJST09UIiwiVU5CT1VOREVEIiwiQkdfRk9DVVNFRCIsIkZHX0FDVElWQVRJT04iLCJGR19ERUFDVElWQVRJT04iLCJzdHJpbmdzIiwiVkFSX0xFRlQiLCJWQVJfVE9QIiwiVkFSX0ZHX1NJWkUiLCJWQVJfRkdfU0NBTEUiLCJWQVJfRkdfVFJBTlNMQVRFX1NUQVJUIiwiVkFSX0ZHX1RSQU5TTEFURV9FTkQiLCJudW1iZXJzIiwiUEFERElORyIsIklOSVRJQUxfT1JJR0lOX1NDQUxFIiwiREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMiLCJGR19ERUFDVElWQVRJT05fTVMiLCJUQVBfREVMQVlfTVMiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlc18iLCJzdXBwb3J0c1Bhc3NpdmVfIiwiZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1ZyIsIndpbmRvd09iaiIsImRvY3VtZW50Iiwibm9kZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNvbXB1dGVkU3R5bGUiLCJnZXRDb21wdXRlZFN0eWxlIiwiaGFzUHNldWRvVmFyQnVnIiwiYm9yZGVyVG9wU3R5bGUiLCJyZW1vdmUiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlcyIsImZvcmNlUmVmcmVzaCIsInN1cHBvcnRzRnVuY3Rpb25QcmVzZW50IiwiQ1NTIiwic3VwcG9ydHMiLCJleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIiwid2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzIiwiYXBwbHlQYXNzaXZlIiwiZ2xvYmFsT2JqIiwidW5kZWZpbmVkIiwiaXNTdXBwb3J0ZWQiLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsImdldE1hdGNoZXNQcm9wZXJ0eSIsIkhUTUxFbGVtZW50UHJvdG90eXBlIiwiZmlsdGVyIiwicCIsInBvcCIsImdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyIsImV2IiwicGFnZU9mZnNldCIsImNsaWVudFJlY3QiLCJ4IiwieSIsImRvY3VtZW50WCIsImxlZnQiLCJkb2N1bWVudFkiLCJ0b3AiLCJub3JtYWxpemVkWCIsIm5vcm1hbGl6ZWRZIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsIlBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiYWN0aXZhdGVkVGFyZ2V0cyIsIk1EQ1JpcHBsZUZvdW5kYXRpb24iLCJicm93c2VyU3VwcG9ydHNDc3NWYXJzIiwiaXNVbmJvdW5kZWQiLCJpc1N1cmZhY2VBY3RpdmUiLCJpc1N1cmZhY2VEaXNhYmxlZCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjb250YWluc0V2ZW50VGFyZ2V0IiwicmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyUmVzaXplSGFuZGxlciIsImRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwidXBkYXRlQ3NzVmFyaWFibGUiLCJjb21wdXRlQm91bmRpbmdSZWN0IiwiZ2V0V2luZG93UGFnZU9mZnNldCIsImRlZmF1bHRBZGFwdGVyIiwibGF5b3V0RnJhbWVfIiwiZnJhbWVfIiwid2lkdGgiLCJoZWlnaHQiLCJhY3RpdmF0aW9uU3RhdGVfIiwiZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8iLCJpbml0aWFsU2l6ZV8iLCJtYXhSYWRpdXNfIiwiYWN0aXZhdGVIYW5kbGVyXyIsImFjdGl2YXRlXyIsImRlYWN0aXZhdGVIYW5kbGVyXyIsImRlYWN0aXZhdGVfIiwiZm9jdXNIYW5kbGVyXyIsImhhbmRsZUZvY3VzIiwiYmx1ckhhbmRsZXJfIiwiaGFuZGxlQmx1ciIsInJlc2l6ZUhhbmRsZXJfIiwibGF5b3V0IiwidW5ib3VuZGVkQ29vcmRzXyIsImZnU2NhbGVfIiwiYWN0aXZhdGlvblRpbWVyXyIsImZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyIsImFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8iLCJhY3RpdmF0aW9uVGltZXJDYWxsYmFja18iLCJydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8iLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudF8iLCJpc0FjdGl2YXRlZCIsImhhc0RlYWN0aXZhdGlvblVYUnVuIiwid2FzQWN0aXZhdGVkQnlQb2ludGVyIiwid2FzRWxlbWVudE1hZGVBY3RpdmUiLCJhY3RpdmF0aW9uRXZlbnQiLCJpc1Byb2dyYW1tYXRpYyIsImlzU3VwcG9ydGVkXyIsInJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImxheW91dEludGVybmFsXyIsImNsZWFyVGltZW91dCIsImRlcmVnaXN0ZXJSb290SGFuZGxlcnNfIiwiZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsInJlbW92ZUNzc1ZhcnNfIiwiZm9yRWFjaCIsImtleXMiLCJrIiwiaW5kZXhPZiIsImFjdGl2YXRpb25TdGF0ZSIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50IiwiaXNTYW1lSW50ZXJhY3Rpb24iLCJoYXNBY3RpdmF0ZWRDaGlsZCIsImxlbmd0aCIsInNvbWUiLCJyZXNldEFjdGl2YXRpb25TdGF0ZV8iLCJwdXNoIiwicmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJjaGVja0VsZW1lbnRNYWRlQWN0aXZlXyIsImFuaW1hdGVBY3RpdmF0aW9uXyIsImtleUNvZGUiLCJ0cmFuc2xhdGVTdGFydCIsInRyYW5zbGF0ZUVuZCIsImdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18iLCJzdGFydFBvaW50IiwiZW5kUG9pbnQiLCJybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18iLCJzZXRUaW1lb3V0IiwiYWN0aXZhdGlvbkhhc0VuZGVkIiwic3RhdGUiLCJldnRPYmplY3QiLCJhbmltYXRlRGVhY3RpdmF0aW9uXyIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibWF4RGltIiwibWF4IiwiZ2V0Qm91bmRlZFJhZGl1cyIsImh5cG90ZW51c2UiLCJzcXJ0IiwicG93IiwidXBkYXRlTGF5b3V0Q3NzVmFyc18iLCJyb3VuZCIsInVuYm91bmRlZCIsIlJpcHBsZUJhc2UiLCJyZWYiLCJNQVRDSEVTIiwiX21hdGNoZXMiLCJIVE1MRWxlbWVudCIsInByb3RvdHlwZSIsIm9wdGlvbnMiLCIkZWwiLCIkc2V0IiwiY2xhc3NlcyIsIiRkZWxldGUiLCJjb250YWlucyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZXMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJwYWdlWE9mZnNldCIsInBhZ2VZT2Zmc2V0IiwiUmlwcGxlTWl4aW4iLCJtb3VudGVkIiwicmlwcGxlIiwiaW5pdCIsImJlZm9yZURlc3Ryb3kiLCJkZXN0cm95IiwibWRjRkFCIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0VBQU8sU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEI7RUFDL0I7RUFDQSxNQUFJQyxPQUFPLElBQVg7RUFDQSxNQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7RUFDakNELFdBQU9DLE9BQU9DLEdBQWQ7RUFDRCxHQUZELE1BRU8sSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0VBQ3hDO0VBQ0FILFdBQU9HLE9BQU9ELEdBQWQ7RUFDRDtFQUNELE1BQUlGLElBQUosRUFBVTtFQUNSQSxTQUFLSSxHQUFMLENBQVNMLE1BQVQ7RUFDRDtFQUNGOztFQ1pNLFNBQVNNLFVBQVQsQ0FBb0JDLFVBQXBCLEVBQWdDO0VBQ3JDLFNBQU87RUFDTEMsYUFBUyxRQURKO0VBRUxDLGFBQVMscUJBQU07RUFDYixXQUFLLElBQUlDLEdBQVQsSUFBZ0JILFVBQWhCLEVBQTRCO0VBQzFCLFlBQUlJLFlBQVlKLFdBQVdHLEdBQVgsQ0FBaEI7RUFDQUUsV0FBR0QsU0FBSCxDQUFhQSxVQUFVRSxJQUF2QixFQUE2QkYsU0FBN0I7RUFDRDtFQUNGLEtBUEk7RUFRTEo7RUFSSyxHQUFQO0VBVUQ7O0VDWE0sSUFBTU8sZ0JBQWdCO0VBQzNCQyxjQUFZLElBRGU7RUFFM0JDLFFBRjJCLGtCQUVwQkMsYUFGb0IsRUFFTEMsT0FGSyxFQUVJO0VBQzdCLFdBQU9ELGNBQ0xDLFFB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
