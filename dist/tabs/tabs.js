/**
* @module vue-mdc-adaptertabs 0.18.2
* @exports VueMDCTabs
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCTabs = factory());
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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

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

  var CustomLink = {
    name: 'custom-link',
    functional: true,
    props: {
      tag: { type: String, default: 'a' },
      link: Object
    },
    render: function render(h, context) {
      var element = void 0;
      var data = _extends({}, context.data);

      if (context.props.link && context.parent.$router) {
        // router-link case
        element = context.parent.$root.$options.components['router-link'];
        data.props = _extends({ tag: context.props.tag }, context.props.link);
        if (data.on.click) {
          data.nativeOn = { click: data.on.click };
        }
      } else {
        // element fallback
        element = context.props.tag;
      }

      return h(element, data, context.children);
    }
  };

  var CustomLinkMixin = {
    props: {
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
      CustomLink: CustomLink
    }
  };

  /* global CustomEvent */

  function emitCustomEvent(el, evtType, evtData) {
    var shouldBubble = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var evt = void 0;
    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }
    el.dispatchEvent(evt);
  }

  function extractIconProp(iconProp) {
    if (typeof iconProp === 'string') {
      return {
        classes: { 'material-icons': true },
        content: iconProp
      };
    } else if (iconProp instanceof Array) {
      return {
        classes: iconProp.reduce(function (result, value) {
          return _extends(result, defineProperty({}, value, true));
        }, {})
      };
    } else if ((typeof iconProp === 'undefined' ? 'undefined' : _typeof(iconProp)) === 'object') {
      return {
        classes: iconProp.className.split(' ').reduce(function (result, value) {
          return _extends(result, defineProperty({}, value, true));
        }, {}),
        content: iconProp.textContent
      };
    }
  }

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
   * Copyright 2017 Google Inc. All Rights Reserved.
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
    ACTIVE: 'mdc-tab--active'
  };

  var strings = {
    SELECTED_EVENT: 'MDCTab:selected'
  };

  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
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

  var MDCTabFoundation = function (_MDCFoundation) {
    inherits(MDCTabFoundation, _MDCFoundation);
    createClass(MDCTabFoundation, null, [{
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
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
          getOffsetWidth: function getOffsetWidth() {
            return (/* number */0
            );
          },
          getOffsetLeft: function getOffsetLeft() {
            return (/* number */0
            );
          },
          notifySelected: function notifySelected() {}
        };
      }
    }]);

    function MDCTabFoundation() {
      var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, MDCTabFoundation);

      var _this = possibleConstructorReturn(this, (MDCTabFoundation.__proto__ || Object.getPrototypeOf(MDCTabFoundation)).call(this, _extends(MDCTabFoundation.defaultAdapter, adapter)));

      _this.computedWidth_ = 0;
      _this.computedLeft_ = 0;
      _this.isActive_ = false;
      _this.preventDefaultOnClick_ = false;

      _this.clickHandler_ = function (evt) {
        if (_this.preventDefaultOnClick_) {
          evt.preventDefault();
        }
        _this.adapter_.notifySelected();
      };

      _this.keydownHandler_ = function (evt) {
        if (evt.key && evt.key === 'Enter' || evt.keyCode === 13) {
          _this.adapter_.notifySelected();
        }
      };
      return _this;
    }

    createClass(MDCTabFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerInteractionHandler('click', this.clickHandler_);
        this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
        this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
      }
    }, {
      key: 'getComputedWidth',
      value: function getComputedWidth() {
        return this.computedWidth_;
      }
    }, {
      key: 'getComputedLeft',
      value: function getComputedLeft() {
        return this.computedLeft_;
      }
    }, {
      key: 'isActive',
      value: function isActive() {
        return this.isActive_;
      }
    }, {
      key: 'setActive',
      value: function setActive(isActive) {
        this.isActive_ = isActive;
        if (this.isActive_) {
          this.adapter_.addClass(cssClasses.ACTIVE);
        } else {
          this.adapter_.removeClass(cssClasses.ACTIVE);
        }
      }
    }, {
      key: 'preventsDefaultOnClick',
      value: function preventsDefaultOnClick() {
        return this.preventDefaultOnClick_;
      }
    }, {
      key: 'setPreventDefaultOnClick',
      value: function setPreventDefaultOnClick(preventDefaultOnClick) {
        this.preventDefaultOnClick_ = preventDefaultOnClick;
      }
    }, {
      key: 'measureSelf',
      value: function measureSelf() {
        this.computedWidth_ = this.adapter_.getOffsetWidth();
        this.computedLeft_ = this.adapter_.getOffsetLeft();
      }
    }]);
    return MDCTabFoundation;
  }(MDCFoundation);

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

  var cssClasses$1 = {
    // Ripple is a special case where the "root" component is really a "mixin" of sorts,
    // given that it's an 'upgrade' to an existing component. That being said it is the root
    // CSS class that all other CSS classes derive from.
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
  };

  var strings$1 = {
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
        return cssClasses$1;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$1;
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

        var strings = MDCRippleFoundation.strings;

        Object.keys(strings).forEach(function (k) {
          if (k.indexOf('VAR_') === 0) {
            _this8.adapter_.updateCssVariable(strings[k], null);
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
    name: 'mdc-tab',
    mixins: [CustomLinkMixin, DispatchEventMixin],
    props: {
      active: Boolean,
      icon: [String, Array, Object]
    },
    data: function data() {
      return {
        classes: {},
        styles: {}
      };
    },

    computed: {
      hasIcon: function hasIcon() {
        if (this.icon || this.$slots.icon) {
          return this.icon ? extractIconProp(this.icon) : {};
        }
        return false;
      },
      hasText: function hasText() {
        return !!this.$slots.default;
      }
    },
    watch: {
      active: function active(value) {
        if (value) {
          this.foundation.adapter_.notifySelected();
        }
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCTabFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this.$el.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this.$el.removeEventListener(type, handler);
        },
        getOffsetWidth: function getOffsetWidth() {
          return _this.$el.offsetWidth;
        },
        getOffsetLeft: function getOffsetLeft() {
          return _this.$el.offsetLeft;
        },
        notifySelected: function notifySelected() {
          emitCustomEvent(_this.$el, MDCTabFoundation.strings.SELECTED_EVENT, { tab: _this }, true);
        }
      });
      this.foundation.init();
      this.setActive(this.active);
      this.ripple = new RippleBase(this);
      this.ripple.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation.destroy();
      this.ripple.destroy();
    },

    methods: {
      getComputedWidth: function getComputedWidth() {
        return this.foundation.getComputedWidth();
      },
      getComputedLeft: function getComputedLeft() {
        return this.foundation.getComputedLeft();
      },
      isActive: function isActive() {
        return this.foundation.isActive();
      },
      setActive: function setActive(isActive) {
        this.foundation.setActive(isActive);
      },
      isDefaultPreventedOnClick: function isDefaultPreventedOnClick() {
        return this.foundation.preventsDefaultOnClick();
      },
      setPreventDefaultOnClick: function setPreventDefaultOnClick(preventDefaultOnClick) {
        this.foundation.setPreventDefaultOnClick(preventDefaultOnClick);
      },
      measureSelf: function measureSelf() {
        this.foundation.measureSelf();
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
    return _c("custom-link", _vm._g({
      staticClass: "mdc-tab",
      class: _vm.classes,
      style: _vm.styles,
      attrs: { link: _vm.link }
    }, _vm.listeners), [!!_vm.hasIcon ? _c("i", {
      ref: "icon",
      staticClass: "mdc-tab__icon",
      class: _vm.hasIcon.classes,
      attrs: { tabindex: "0" }
    }, [_vm._t("icon", [_vm._v(_vm._s(_vm.hasIcon.content))])], 2) : _vm._e(), _vm._v(" "), _vm.hasText ? _c("span", { class: { "mdc-tab__icon-text": !!_vm.hasIcon } }, [_vm._t("default")], 2) : _vm._e()]);
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
    component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\tabs\\mdc-tab.vue";

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

  var mdcTab = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

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

  /** @const {Object<string, !VendorPropertyMapType>} */
  var eventTypeMap = {
    'animationstart': {
      noPrefix: 'animationstart',
      webkitPrefix: 'webkitAnimationStart',
      styleProperty: 'animation'
    },
    'animationend': {
      noPrefix: 'animationend',
      webkitPrefix: 'webkitAnimationEnd',
      styleProperty: 'animation'
    },
    'animationiteration': {
      noPrefix: 'animationiteration',
      webkitPrefix: 'webkitAnimationIteration',
      styleProperty: 'animation'
    },
    'transitionend': {
      noPrefix: 'transitionend',
      webkitPrefix: 'webkitTransitionEnd',
      styleProperty: 'transition'
    }
  };

  /** @const {Object<string, !VendorPropertyMapType>} */
  var cssPropertyMap = {
    'animation': {
      noPrefix: 'animation',
      webkitPrefix: '-webkit-animation'
    },
    'transform': {
      noPrefix: 'transform',
      webkitPrefix: '-webkit-transform'
    },
    'transition': {
      noPrefix: 'transition',
      webkitPrefix: '-webkit-transition'
    }
  };

  /**
   * @param {!Object} windowObj
   * @return {boolean}
   */
  function hasProperShape(windowObj) {
    return windowObj['document'] !== undefined && typeof windowObj['document']['createElement'] === 'function';
  }

  /**
   * @param {string} eventType
   * @return {boolean}
   */
  function eventFoundInMaps(eventType) {
    return eventType in eventTypeMap || eventType in cssPropertyMap;
  }

  /**
   * @param {string} eventType
   * @param {!Object<string, !VendorPropertyMapType>} map
   * @param {!Element} el
   * @return {string}
   */
  function getJavaScriptEventName(eventType, map, el) {
    return map[eventType].styleProperty in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
  }

  /**
   * Helper function to determine browser prefix for CSS3 animation events
   * and property names.
   * @param {!Object} windowObj
   * @param {string} eventType
   * @return {string}
   */
  function getAnimationName(windowObj, eventType) {
    if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
      return eventType;
    }

    var map = /** @type {!Object<string, !VendorPropertyMapType>} */eventType in eventTypeMap ? eventTypeMap : cssPropertyMap;
    var el = windowObj['document']['createElement']('div');
    var eventName = '';

    if (map === eventTypeMap) {
      eventName = getJavaScriptEventName(eventType, map, el);
    } else {
      eventName = map[eventType].noPrefix in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
    }

    return eventName;
  }

  /**
   * @param {!Object} windowObj
   * @param {string} eventType
   * @return {string}
   */
  function getCorrectPropertyName(windowObj, eventType) {
    return getAnimationName(windowObj, eventType);
  }

  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
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

  var cssClasses$2 = {
    UPGRADED: 'mdc-tab-bar-upgraded'
  };

  var strings$2 = {
    TAB_SELECTOR: '.mdc-tab',
    INDICATOR_SELECTOR: '.mdc-tab-bar__indicator',
    CHANGE_EVENT: 'MDCTabBar:change'
  };

  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
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

  var MDCTabBarFoundation = function (_MDCFoundation) {
    inherits(MDCTabBarFoundation, _MDCFoundation);
    createClass(MDCTabBarFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$2;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$2;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          bindOnMDCTabSelectedEvent: function bindOnMDCTabSelectedEvent() {},
          unbindOnMDCTabSelectedEvent: function unbindOnMDCTabSelectedEvent() {},
          registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
          deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
          getOffsetWidth: function getOffsetWidth() {
            return (/* number */0
            );
          },
          setStyleForIndicator: function setStyleForIndicator() /* propertyName: string, value: string */{},
          getOffsetWidthForIndicator: function getOffsetWidthForIndicator() {
            return (/* number */0
            );
          },
          notifyChange: function notifyChange() /* evtData: {activeTabIndex: number} */{},
          getNumberOfTabs: function getNumberOfTabs() {
            return (/* number */0
            );
          },
          isTabActiveAtIndex: function isTabActiveAtIndex() {
            return (/* index: number */ /* boolean */false
            );
          },
          setTabActiveAtIndex: function setTabActiveAtIndex() /* index: number, isActive: true */{},
          isDefaultPreventedOnClickForTabAtIndex: function isDefaultPreventedOnClickForTabAtIndex() {
            return (/* index: number */ /* boolean */false
            );
          },
          setPreventDefaultOnClickForTabAtIndex: function setPreventDefaultOnClickForTabAtIndex() /* index: number, preventDefaultOnClick: boolean */{},
          measureTabAtIndex: function measureTabAtIndex() /* index: number */{},
          getComputedWidthForTabAtIndex: function getComputedWidthForTabAtIndex() {
            return (/* index: number */ /* number */0
            );
          },
          getComputedLeftForTabAtIndex: function getComputedLeftForTabAtIndex() {
            return (/* index: number */ /* number */0
            );
          }
        };
      }
    }]);

    function MDCTabBarFoundation(adapter) {
      classCallCheck(this, MDCTabBarFoundation);

      var _this = possibleConstructorReturn(this, (MDCTabBarFoundation.__proto__ || Object.getPrototypeOf(MDCTabBarFoundation)).call(this, _extends(MDCTabBarFoundation.defaultAdapter, adapter)));

      _this.isIndicatorShown_ = false;
      _this.computedWidth_ = 0;
      _this.computedLeft_ = 0;
      _this.activeTabIndex_ = 0;
      _this.layoutFrame_ = 0;
      _this.resizeHandler_ = function () {
        return _this.layout();
      };
      return _this;
    }

    createClass(MDCTabBarFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.addClass(cssClasses$2.UPGRADED);
        this.adapter_.bindOnMDCTabSelectedEvent();
        this.adapter_.registerResizeHandler(this.resizeHandler_);
        var activeTabIndex = this.findActiveTabIndex_();
        if (activeTabIndex >= 0) {
          this.activeTabIndex_ = activeTabIndex;
        }
        this.layout();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.removeClass(cssClasses$2.UPGRADED);
        this.adapter_.unbindOnMDCTabSelectedEvent();
        this.adapter_.deregisterResizeHandler(this.resizeHandler_);
      }
    }, {
      key: 'layoutInternal_',
      value: function layoutInternal_() {
        var _this2 = this;

        this.forEachTabIndex_(function (index) {
          return _this2.adapter_.measureTabAtIndex(index);
        });
        this.computedWidth_ = this.adapter_.getOffsetWidth();
        this.layoutIndicator_();
      }
    }, {
      key: 'layoutIndicator_',
      value: function layoutIndicator_() {
        var isIndicatorFirstRender = !this.isIndicatorShown_;

        // Ensure that indicator appears in the right position immediately for correct first render.
        if (isIndicatorFirstRender) {
          this.adapter_.setStyleForIndicator('transition', 'none');
        }

        var translateAmtForActiveTabLeft = this.adapter_.getComputedLeftForTabAtIndex(this.activeTabIndex_);
        var scaleAmtForActiveTabWidth = this.adapter_.getComputedWidthForTabAtIndex(this.activeTabIndex_) / this.adapter_.getOffsetWidth();

        var transformValue = 'translateX(' + translateAmtForActiveTabLeft + 'px) scale(' + scaleAmtForActiveTabWidth + ', 1)';
        this.adapter_.setStyleForIndicator(getCorrectPropertyName(window, 'transform'), transformValue);

        if (isIndicatorFirstRender) {
          // Force layout so that transform styles to take effect.
          this.adapter_.getOffsetWidthForIndicator();
          this.adapter_.setStyleForIndicator('transition', '');
          this.adapter_.setStyleForIndicator('visibility', 'visible');
          this.isIndicatorShown_ = true;
        }
      }
    }, {
      key: 'findActiveTabIndex_',
      value: function findActiveTabIndex_() {
        var _this3 = this;

        var activeTabIndex = -1;
        this.forEachTabIndex_(function (index) {
          if (_this3.adapter_.isTabActiveAtIndex(index)) {
            activeTabIndex = index;
            return true;
          }
        });
        return activeTabIndex;
      }
    }, {
      key: 'forEachTabIndex_',
      value: function forEachTabIndex_(iterator) {
        var numTabs = this.adapter_.getNumberOfTabs();
        for (var index = 0; index < numTabs; index++) {
          var shouldBreak = iterator(index);
          if (shouldBreak) {
            break;
          }
        }
      }
    }, {
      key: 'layout',
      value: function layout() {
        var _this4 = this;

        if (this.layoutFrame_) {
          cancelAnimationFrame(this.layoutFrame_);
        }

        this.layoutFrame_ = requestAnimationFrame(function () {
          _this4.layoutInternal_();
          _this4.layoutFrame_ = 0;
        });
      }
    }, {
      key: 'switchToTabAtIndex',
      value: function switchToTabAtIndex(index, shouldNotify) {
        var _this5 = this;

        if (index === this.activeTabIndex_) {
          return;
        }

        if (index < 0 || index >= this.adapter_.getNumberOfTabs()) {
          throw new Error('Out of bounds index specified for tab: ' + index);
        }

        var prevActiveTabIndex = this.activeTabIndex_;
        this.activeTabIndex_ = index;
        requestAnimationFrame(function () {
          if (prevActiveTabIndex >= 0) {
            _this5.adapter_.setTabActiveAtIndex(prevActiveTabIndex, false);
          }
          _this5.adapter_.setTabActiveAtIndex(_this5.activeTabIndex_, true);
          _this5.layoutIndicator_();
          if (shouldNotify) {
            _this5.adapter_.notifyChange({ activeTabIndex: _this5.activeTabIndex_ });
          }
        });
      }
    }, {
      key: 'getActiveTabIndex',
      value: function getActiveTabIndex() {
        return this.findActiveTabIndex_();
      }
    }]);
    return MDCTabBarFoundation;
  }(MDCFoundation);

  //

  var script$2 = {
    name: 'mdc-tab-bar',
    data: function data() {
      return {
        classes: {},
        indicatorStyles: {},
        tabs: []
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCTabBarFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        bindOnMDCTabSelectedEvent: function bindOnMDCTabSelectedEvent() {
          _this.$el.addEventListener(MDCTabFoundation.strings.SELECTED_EVENT, _this.onSelect);
        },
        unbindOnMDCTabSelectedEvent: function unbindOnMDCTabSelectedEvent() {
          return _this.$el.removeEventListener(MDCTabFoundation.strings.SELECTED_EVENT, _this.onSelect);
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          return window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          return window.removeEventListener('resize', handler);
        },
        getOffsetWidth: function getOffsetWidth() {
          return _this.$el.offsetWidth;
        },
        setStyleForIndicator: function setStyleForIndicator(propertyName, value) {
          return _this.$set(_this.indicatorStyles, propertyName, value);
        },
        getOffsetWidthForIndicator: function getOffsetWidthForIndicator() {
          return _this.$refs.indicator.offsetWidth;
        },
        notifyChange: function notifyChange(evtData) {
          _this.$emit('change', evtData.activeTabIndex);
        },
        getNumberOfTabs: function getNumberOfTabs() {
          return _this.tabs.length;
        },
        isTabActiveAtIndex: function isTabActiveAtIndex(index) {
          return _this.tabs[index].isActive();
        },
        setTabActiveAtIndex: function setTabActiveAtIndex(index, isActive) {
          // pgbr: 2018-04-07
          // since it is possible to change the number of tabs programatically
          // we need to detect the foundation deactivating a tab
          // that no longer exists but was previously active.
          if (!isActive && index >= _this.tabs.length) {
            return;
          }
          _this.tabs[index].setActive(isActive);
        },
        isDefaultPreventedOnClickForTabAtIndex: function isDefaultPreventedOnClickForTabAtIndex(index) {
          return _this.tabs[index].isDefaultPreventedOnClick();
        },
        setPreventDefaultOnClickForTabAtIndex: function setPreventDefaultOnClickForTabAtIndex(index, preventDefaultOnClick) {
          _this.tabs[index].setPreventDefaultOnClick(preventDefaultOnClick);
        },
        measureTabAtIndex: function measureTabAtIndex(index) {
          return _this.tabs[index].measureSelf();
        },
        getComputedWidthForTabAtIndex: function getComputedWidthForTabAtIndex(index) {
          return _this.tabs[index].getComputedWidth();
        },
        getComputedLeftForTabAtIndex: function getComputedLeftForTabAtIndex(index) {
          return _this.tabs[index].getComputedLeft();
        }
      });

      var resetTabs = function resetTabs() {
        var tabElements = [].slice.call(_this.$el.querySelectorAll(MDCTabBarFoundation.strings.TAB_SELECTOR));
        _this.tabs = tabElements.map(function (el) {
          return el.__vue__;
        });

        var hasText = void 0,
            hasIcon = void 0;
        var tabs = _this.tabs;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = tabs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var tab = _step.value;

            if (tab.hasText) {
              hasText = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = tabs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _tab = _step2.value;

            if (_tab.hasIcon) {
              hasIcon = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        if (hasText && hasIcon) {
          _this.$set(_this.classes, 'mdc-tab-bar--icons-with-text', true);
        } else if (hasIcon) {
          _this.$set(_this.classes, 'mdc-tab-bar--icon-tab-bar', true);
        }

        if (_this.foundation) {
          var activeTabIndex = _this.foundation.getActiveTabIndex();
          if (activeTabIndex >= 0) {
            _this.foundation.switchToTabAtIndex(activeTabIndex, true);
          } else {
            _this.foundation.switchToTabAtIndex(0, true);
          }
          _this.foundation.layout();
        }
      };

      resetTabs();

      this.slotObserver = new MutationObserver(function () {
        return resetTabs();
      });
      this.slotObserver.observe(this.$el, { childList: true, subtree: true });

      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.slotObserver.disconnect();
      this.foundation.destroy();
    },

    methods: {
      onSelect: function onSelect(_ref) {
        var detail = _ref.detail;
        var tab = detail.tab;

        var index = this.tabs.indexOf(tab);
        if (index < 0) {
          throw new Error('mdc-tab-bar internal error: index not found');
        }
        this.foundation.switchToTabAtIndex(index, true);
      }
    }
  };

  /* script */
  var __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function __vue_render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("nav", _vm._g({ staticClass: "mdc-tab-bar", class: _vm.classes }, _vm.$listeners), [_vm._t("default"), _vm._v(" "), _c("span", {
      ref: "indicator",
      staticClass: "mdc-tab-bar__indicator",
      style: _vm.indicatorStyles
    })], 2);
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* component normalizer */
  function __vue_normalize__$2(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\tabs\\mdc-tab-bar.vue";

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
  function __vue_create_injector__$2() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
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

  var mdcTabBar = __vue_normalize__$2({ render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, __vue_create_injector__$2, undefined);

  var plugin = BasePlugin({
    mdcTab: mdcTab,
    mdcTabBar: mdcTabBar
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZWxlbWVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tbGluay5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWljb24uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvZGlzcGF0Y2gtZXZlbnQtbWl4aW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvdW5pcXVlaWQtbWl4aW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGFicy90YWIvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90YWJzL3RhYi9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL3V0aWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9yaXBwbGUvbWRjLXJpcHBsZS1iYXNlLmpzIiwiLi4vLi4vY29tcG9uZW50cy9yaXBwbGUvbWRjLXJpcHBsZS52dWUiLCIuLi8uLi9jb21wb25lbnRzL3RhYnMvbWRjLXRhYi52dWUiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2FuaW1hdGlvbi9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGFicy90YWItYmFyL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGFicy90YWItYmFyL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9jb21wb25lbnRzL3RhYnMvbWRjLXRhYi1iYXIudnVlIiwiLi4vLi4vY29tcG9uZW50cy90YWJzL2luZGV4LmpzIiwiLi4vLi4vY29tcG9uZW50cy90YWJzL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdChwbHVnaW4pIHtcclxuICAvLyBBdXRvLWluc3RhbGxcclxuICBsZXQgX1Z1ZSA9IG51bGxcclxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIF9WdWUgPSB3aW5kb3cuVnVlXHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cclxuICAgIF9WdWUgPSBnbG9iYWwuVnVlXHJcbiAgfVxyXG4gIGlmIChfVnVlKSB7XHJcbiAgICBfVnVlLnVzZShwbHVnaW4pXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luKGNvbXBvbmVudHMpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcclxuICAgIGluc3RhbGw6IHZtID0+IHtcclxuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXHJcbiAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRzXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBDdXN0b21FbGVtZW50ID0ge1xyXG4gIGZ1bmN0aW9uYWw6IHRydWUsXHJcbiAgcmVuZGVyKGNyZWF0ZUVsZW1lbnQsIGNvbnRleHQpIHtcclxuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFxyXG4gICAgICBjb250ZXh0LnByb3BzLmlzIHx8IGNvbnRleHQucHJvcHMudGFnIHx8ICdkaXYnLFxyXG4gICAgICBjb250ZXh0LmRhdGEsXHJcbiAgICAgIGNvbnRleHQuY2hpbGRyZW5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBDdXN0b21FbGVtZW50TWl4aW4gPSB7XHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgQ3VzdG9tRWxlbWVudFxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgQ3VzdG9tTGluayA9IHtcclxuICBuYW1lOiAnY3VzdG9tLWxpbmsnLFxyXG4gIGZ1bmN0aW9uYWw6IHRydWUsXHJcbiAgcHJvcHM6IHtcclxuICAgIHRhZzogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICdhJyB9LFxyXG4gICAgbGluazogT2JqZWN0XHJcbiAgfSxcclxuICByZW5kZXIoaCwgY29udGV4dCkge1xyXG4gICAgbGV0IGVsZW1lbnRcclxuICAgIGxldCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGV4dC5kYXRhKVxyXG5cclxuICAgIGlmIChjb250ZXh0LnByb3BzLmxpbmsgJiYgY29udGV4dC5wYXJlbnQuJHJvdXRlcikge1xyXG4gICAgICAvLyByb3V0ZXItbGluayBjYXNlXHJcbiAgICAgIGVsZW1lbnQgPSBjb250ZXh0LnBhcmVudC4kcm9vdC4kb3B0aW9ucy5jb21wb25lbnRzWydyb3V0ZXItbGluayddXHJcbiAgICAgIGRhdGEucHJvcHMgPSBPYmplY3QuYXNzaWduKHsgdGFnOiBjb250ZXh0LnByb3BzLnRhZyB9LCBjb250ZXh0LnByb3BzLmxpbmspXHJcbiAgICAgIGlmIChkYXRhLm9uLmNsaWNrKSB7XHJcbiAgICAgICAgZGF0YS5uYXRpdmVPbiA9IHsgY2xpY2s6IGRhdGEub24uY2xpY2sgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBlbGVtZW50IGZhbGxiYWNrXHJcbiAgICAgIGVsZW1lbnQgPSBjb250ZXh0LnByb3BzLnRhZ1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBoKGVsZW1lbnQsIGRhdGEsIGNvbnRleHQuY2hpbGRyZW4pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ3VzdG9tTGlua01peGluID0ge1xyXG4gIHByb3BzOiB7XHJcbiAgICB0bzogW1N0cmluZywgT2JqZWN0XSxcclxuICAgIGV4YWN0OiBCb29sZWFuLFxyXG4gICAgYXBwZW5kOiBCb29sZWFuLFxyXG4gICAgcmVwbGFjZTogQm9vbGVhbixcclxuICAgIGFjdGl2ZUNsYXNzOiBTdHJpbmcsXHJcbiAgICBleGFjdEFjdGl2ZUNsYXNzOiBTdHJpbmdcclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICBsaW5rKCkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIHRoaXMudG8gJiYge1xyXG4gICAgICAgICAgdG86IHRoaXMudG8sXHJcbiAgICAgICAgICBleGFjdDogdGhpcy5leGFjdCxcclxuICAgICAgICAgIGFwcGVuZDogdGhpcy5hcHBlbmQsXHJcbiAgICAgICAgICByZXBsYWNlOiB0aGlzLnJlcGxhY2UsXHJcbiAgICAgICAgICBhY3RpdmVDbGFzczogdGhpcy5hY3RpdmVDbGFzcyxcclxuICAgICAgICAgIGV4YWN0QWN0aXZlQ2xhc3M6IHRoaXMuZXhhY3RBY3RpdmVDbGFzc1xyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgQ3VzdG9tTGlua1xyXG4gIH1cclxufVxyXG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XHJcbiAgbGV0IGV2dFxyXG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XHJcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcclxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXHJcbiAgICB9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxyXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxyXG4gIH1cclxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gZXh0cmFjdEljb25Qcm9wKGljb25Qcm9wKSB7XHJcbiAgaWYgKHR5cGVvZiBpY29uUHJvcCA9PT0gJ3N0cmluZycpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNsYXNzZXM6IHsgJ21hdGVyaWFsLWljb25zJzogdHJ1ZSB9LFxyXG4gICAgICBjb250ZW50OiBpY29uUHJvcFxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoaWNvblByb3AgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2xhc3NlczogaWNvblByb3AucmVkdWNlKFxyXG4gICAgICAgIChyZXN1bHQsIHZhbHVlKSA9PiBPYmplY3QuYXNzaWduKHJlc3VsdCwgeyBbdmFsdWVdOiB0cnVlIH0pLFxyXG4gICAgICAgIHt9XHJcbiAgICAgIClcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGVvZiBpY29uUHJvcCA9PT0gJ29iamVjdCcpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNsYXNzZXM6IGljb25Qcm9wLmNsYXNzTmFtZVxyXG4gICAgICAgIC5zcGxpdCgnICcpXHJcbiAgICAgICAgLnJlZHVjZShcclxuICAgICAgICAgIChyZXN1bHQsIHZhbHVlKSA9PiBPYmplY3QuYXNzaWduKHJlc3VsdCwgeyBbdmFsdWVdOiB0cnVlIH0pLFxyXG4gICAgICAgICAge31cclxuICAgICAgICApLFxyXG4gICAgICBjb250ZW50OiBpY29uUHJvcC50ZXh0Q29udGVudFxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgRGlzcGF0Y2hFdmVudE1peGluID0ge1xyXG4gIHByb3BzOiB7XHJcbiAgICBldmVudDogU3RyaW5nLFxyXG4gICAgJ2V2ZW50LXRhcmdldCc6IE9iamVjdCxcclxuICAgICdldmVudC1hcmdzJzogQXJyYXlcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGRpc3BhdGNoRXZlbnQoZXZ0KSB7XHJcbiAgICAgIGV2dCAmJiB0aGlzLiRlbWl0KGV2dC50eXBlLCBldnQpXHJcbiAgICAgIGlmICh0aGlzLmV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuZXZlbnRUYXJnZXQgfHwgdGhpcy4kcm9vdFxyXG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5ldmVudEFyZ3MgfHwgW11cclxuICAgICAgICB0YXJnZXQuJGVtaXQodGhpcy5ldmVudCwgLi4uYXJncylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIGxpc3RlbmVycygpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXHJcbiAgICAgICAgY2xpY2s6IGUgPT4gdGhpcy5kaXNwYXRjaEV2ZW50KGUpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiY29uc3Qgc2NvcGUgPVxyXG4gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoMHgxMDAwMDAwMCkpLnRvU3RyaW5nKCkgKyAnLSdcclxuXHJcbmV4cG9ydCBjb25zdCBWTUFVbmlxdWVJZE1peGluID0ge1xyXG4gIGJlZm9yZUNyZWF0ZSgpIHtcclxuICAgIHRoaXMudm1hX3VpZF8gPSBzY29wZSArIHRoaXMuX3VpZFxyXG4gIH1cclxufVxyXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuZXhwb3J0IGNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIEFDVElWRTogJ21kYy10YWItLWFjdGl2ZScsXG59O1xuXG5leHBvcnQgY29uc3Qgc3RyaW5ncyA9IHtcbiAgU0VMRUNURURfRVZFTlQ6ICdNRENUYWI6c2VsZWN0ZWQnLFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1EQ1RhYkZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogdHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZ2V0T2Zmc2V0V2lkdGg6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgZ2V0T2Zmc2V0TGVmdDogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICBub3RpZnlTZWxlY3RlZDogKCkgPT4ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDVGFiRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgdGhpcy5jb21wdXRlZFdpZHRoXyA9IDA7XG4gICAgdGhpcy5jb21wdXRlZExlZnRfID0gMDtcbiAgICB0aGlzLmlzQWN0aXZlXyA9IGZhbHNlO1xuICAgIHRoaXMucHJldmVudERlZmF1bHRPbkNsaWNrXyA9IGZhbHNlO1xuXG4gICAgdGhpcy5jbGlja0hhbmRsZXJfID0gKGV2dCkgPT4ge1xuICAgICAgaWYgKHRoaXMucHJldmVudERlZmF1bHRPbkNsaWNrXykge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5U2VsZWN0ZWQoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5rZXlkb3duSGFuZGxlcl8gPSAoZXZ0KSA9PiB7XG4gICAgICBpZiAoZXZ0LmtleSAmJiBldnQua2V5ID09PSAnRW50ZXInIHx8IGV2dC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeVNlbGVjdGVkKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleWRvd24nLCB0aGlzLmtleWRvd25IYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkhhbmRsZXJfKTtcbiAgfVxuXG4gIGdldENvbXB1dGVkV2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29tcHV0ZWRXaWR0aF87XG4gIH1cblxuICBnZXRDb21wdXRlZExlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29tcHV0ZWRMZWZ0XztcbiAgfVxuXG4gIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmlzQWN0aXZlXztcbiAgfVxuXG4gIHNldEFjdGl2ZShpc0FjdGl2ZSkge1xuICAgIHRoaXMuaXNBY3RpdmVfID0gaXNBY3RpdmU7XG4gICAgaWYgKHRoaXMuaXNBY3RpdmVfKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuQUNUSVZFKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkFDVElWRSk7XG4gICAgfVxuICB9XG5cbiAgcHJldmVudHNEZWZhdWx0T25DbGljaygpIHtcbiAgICByZXR1cm4gdGhpcy5wcmV2ZW50RGVmYXVsdE9uQ2xpY2tfO1xuICB9XG5cbiAgc2V0UHJldmVudERlZmF1bHRPbkNsaWNrKHByZXZlbnREZWZhdWx0T25DbGljaykge1xuICAgIHRoaXMucHJldmVudERlZmF1bHRPbkNsaWNrXyA9IHByZXZlbnREZWZhdWx0T25DbGljaztcbiAgfVxuXG4gIG1lYXN1cmVTZWxmKCkge1xuICAgIHRoaXMuY29tcHV0ZWRXaWR0aF8gPSB0aGlzLmFkYXB0ZXJfLmdldE9mZnNldFdpZHRoKCk7XG4gICAgdGhpcy5jb21wdXRlZExlZnRfID0gdGhpcy5hZGFwdGVyXy5nZXRPZmZzZXRMZWZ0KCk7XG4gIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgUmlwcGxlLiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGNsYXNzZXNcbiAqIC0gZG9tXG4gKiAtIENTUyB2YXJpYWJsZXNcbiAqIC0gcG9zaXRpb25cbiAqIC0gZGltZW5zaW9uc1xuICogLSBzY3JvbGwgcG9zaXRpb25cbiAqIC0gZXZlbnQgaGFuZGxlcnNcbiAqIC0gdW5ib3VuZGVkLCBhY3RpdmUgYW5kIGRpc2FibGVkIHN0YXRlc1xuICpcbiAqIEFkZGl0aW9uYWxseSwgcHJvdmlkZXMgdHlwZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGFkYXB0ZXIgdG8gdGhlIENsb3N1cmVcbiAqIGNvbXBpbGVyLlxuICpcbiAqIEltcGxlbWVudCB0aGlzIGFkYXB0ZXIgZm9yIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZSB0byBkZWxlZ2F0ZSB1cGRhdGVzIHRvXG4gKiB0aGUgY29tcG9uZW50IGluIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZS4gU2VlIGFyY2hpdGVjdHVyZSBkb2N1bWVudGF0aW9uXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9jb2RlL2FyY2hpdGVjdHVyZS5tZFxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDUmlwcGxlQWRhcHRlciB7XG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBicm93c2VyU3VwcG9ydHNDc3NWYXJzKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNVbmJvdW5kZWQoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VBY3RpdmUoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VEaXNhYmxlZCgpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHshRXZlbnRUYXJnZXR9IHRhcmdldCAqL1xuICBjb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhck5hbWVcbiAgICogQHBhcmFtIHs/bnVtYmVyfHN0cmluZ30gdmFsdWVcbiAgICovXG4gIHVwZGF0ZUNzc1ZhcmlhYmxlKHZhck5hbWUsIHZhbHVlKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHshQ2xpZW50UmVjdH0gKi9cbiAgY29tcHV0ZUJvdW5kaW5nUmVjdCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19ICovXG4gIGdldFdpbmRvd1BhZ2VPZmZzZXQoKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIC8vIFJpcHBsZSBpcyBhIHNwZWNpYWwgY2FzZSB3aGVyZSB0aGUgXCJyb290XCIgY29tcG9uZW50IGlzIHJlYWxseSBhIFwibWl4aW5cIiBvZiBzb3J0cyxcbiAgLy8gZ2l2ZW4gdGhhdCBpdCdzIGFuICd1cGdyYWRlJyB0byBhbiBleGlzdGluZyBjb21wb25lbnQuIFRoYXQgYmVpbmcgc2FpZCBpdCBpcyB0aGUgcm9vdFxuICAvLyBDU1MgY2xhc3MgdGhhdCBhbGwgb3RoZXIgQ1NTIGNsYXNzZXMgZGVyaXZlIGZyb20uXG4gIFJPT1Q6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkJyxcbiAgVU5CT1VOREVEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tdW5ib3VuZGVkJyxcbiAgQkdfRk9DVVNFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWJhY2tncm91bmQtZm9jdXNlZCcsXG4gIEZHX0FDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWFjdGl2YXRpb24nLFxuICBGR19ERUFDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWRlYWN0aXZhdGlvbicsXG59O1xuXG5jb25zdCBzdHJpbmdzID0ge1xuICBWQVJfTEVGVDogJy0tbWRjLXJpcHBsZS1sZWZ0JyxcbiAgVkFSX1RPUDogJy0tbWRjLXJpcHBsZS10b3AnLFxuICBWQVJfRkdfU0laRTogJy0tbWRjLXJpcHBsZS1mZy1zaXplJyxcbiAgVkFSX0ZHX1NDQUxFOiAnLS1tZGMtcmlwcGxlLWZnLXNjYWxlJyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9TVEFSVDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtc3RhcnQnLFxuICBWQVJfRkdfVFJBTlNMQVRFX0VORDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtZW5kJyxcbn07XG5cbmNvbnN0IG51bWJlcnMgPSB7XG4gIFBBRERJTkc6IDEwLFxuICBJTklUSUFMX09SSUdJTl9TQ0FMRTogMC42LFxuICBERUFDVElWQVRJT05fVElNRU9VVF9NUzogMjI1LCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS10cmFuc2xhdGUtZHVyYXRpb24gKGkuZS4gYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIEZHX0RFQUNUSVZBVElPTl9NUzogMTUwLCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS1mYWRlLW91dC1kdXJhdGlvbiAoaS5lLiBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBUQVBfREVMQVlfTVM6IDMwMCwgLy8gRGVsYXkgYmV0d2VlbiB0b3VjaCBhbmQgc2ltdWxhdGVkIG1vdXNlIGV2ZW50cyBvbiB0b3VjaCBkZXZpY2VzXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIHN1cHBvcnRzQ3NzVmFyaWFibGVzIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBDU1MgY3VzdG9tIHZhcmlhYmxlIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIGFwcGx5UGFzc2l2ZSB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgcGFzc2l2ZSBldmVudCBsaXN0ZW5lciBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNQYXNzaXZlXztcblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopIHtcbiAgLy8gRGV0ZWN0IHZlcnNpb25zIG9mIEVkZ2Ugd2l0aCBidWdneSB2YXIoKSBzdXBwb3J0XG4gIC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMTE0OTU0NDgvXG4gIGNvbnN0IGRvY3VtZW50ID0gd2luZG93T2JqLmRvY3VtZW50O1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG5vZGUuY2xhc3NOYW1lID0gJ21kYy1yaXBwbGUtc3VyZmFjZS0tdGVzdC1lZGdlLXZhci1idWcnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGUpO1xuXG4gIC8vIFRoZSBidWcgZXhpc3RzIGlmIDo6YmVmb3JlIHN0eWxlIGVuZHMgdXAgcHJvcGFnYXRpbmcgdG8gdGhlIHBhcmVudCBlbGVtZW50LlxuICAvLyBBZGRpdGlvbmFsbHksIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBudWxsIGluIGlmcmFtZXMgd2l0aCBkaXNwbGF5OiBcIm5vbmVcIiBpbiBGaXJlZm94LFxuICAvLyBidXQgRmlyZWZveCBpcyBrbm93biB0byBzdXBwb3J0IENTUyBjdXN0b20gcHJvcGVydGllcyBjb3JyZWN0bHkuXG4gIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTQ4Mzk3XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3dPYmouZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgY29uc3QgaGFzUHNldWRvVmFyQnVnID0gY29tcHV0ZWRTdHlsZSAhPT0gbnVsbCAmJiBjb21wdXRlZFN0eWxlLmJvcmRlclRvcFN0eWxlID09PSAnc29saWQnO1xuICBub2RlLnJlbW92ZSgpO1xuICByZXR1cm4gaGFzUHNldWRvVmFyQnVnO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvd09iaiwgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgbGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuICBpZiAodHlwZW9mIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9PT0gJ2Jvb2xlYW4nICYmICFmb3JjZVJlZnJlc2gpIHtcbiAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG4gIH1cblxuICBjb25zdCBzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCA9IHdpbmRvd09iai5DU1MgJiYgdHlwZW9mIHdpbmRvd09iai5DU1Muc3VwcG9ydHMgPT09ICdmdW5jdGlvbic7XG4gIGlmICghc3VwcG9ydHNGdW5jdGlvblByZXNlbnQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzID0gd2luZG93T2JqLkNTUy5zdXBwb3J0cygnLS1jc3MtdmFycycsICd5ZXMnKTtcbiAgLy8gU2VlOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU0NjY5XG4gIC8vIFNlZTogUkVBRE1FIHNlY3Rpb24gb24gU2FmYXJpXG4gIGNvbnN0IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyA9IChcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCcoLS1jc3MtdmFyczogeWVzKScpICYmXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnY29sb3InLCAnIzAwMDAwMDAwJylcbiAgKTtcblxuICBpZiAoZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyB8fCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9ICFkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaik7XG4gIH0gZWxzZSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICghZm9yY2VSZWZyZXNoKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXNfID0gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG4gIH1cbiAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xufVxuXG4vL1xuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzLCBhbmQgaWYgc28sIHVzZSB0aGVtLlxuICogQHBhcmFtIHshV2luZG93PX0gZ2xvYmFsT2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58e3Bhc3NpdmU6IGJvb2xlYW59fVxuICovXG5mdW5jdGlvbiBhcHBseVBhc3NpdmUoZ2xvYmFsT2JqID0gd2luZG93LCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAoc3VwcG9ydHNQYXNzaXZlXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgIGxldCBpc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBnbG9iYWxPYmouZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIHtnZXQgcGFzc2l2ZSgpIHtcbiAgICAgICAgaXNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgfX0pO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgc3VwcG9ydHNQYXNzaXZlXyA9IGlzU3VwcG9ydGVkO1xuICB9XG5cbiAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZV8gPyB7cGFzc2l2ZTogdHJ1ZX0gOiBmYWxzZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IEhUTUxFbGVtZW50UHJvdG90eXBlXG4gKiBAcmV0dXJuIHshQXJyYXk8c3RyaW5nPn1cbiAqL1xuZnVuY3Rpb24gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50UHJvdG90eXBlKSB7XG4gIHJldHVybiBbXG4gICAgJ3dlYmtpdE1hdGNoZXNTZWxlY3RvcicsICdtc01hdGNoZXNTZWxlY3RvcicsICdtYXRjaGVzJyxcbiAgXS5maWx0ZXIoKHApID0+IHAgaW4gSFRNTEVsZW1lbnRQcm90b3R5cGUpLnBvcCgpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IUV2ZW50fSBldlxuICogQHBhcmFtIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSBwYWdlT2Zmc2V0XG4gKiBAcGFyYW0geyFDbGllbnRSZWN0fSBjbGllbnRSZWN0XG4gKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoZXYsIHBhZ2VPZmZzZXQsIGNsaWVudFJlY3QpIHtcbiAgY29uc3Qge3gsIHl9ID0gcGFnZU9mZnNldDtcbiAgY29uc3QgZG9jdW1lbnRYID0geCArIGNsaWVudFJlY3QubGVmdDtcbiAgY29uc3QgZG9jdW1lbnRZID0geSArIGNsaWVudFJlY3QudG9wO1xuXG4gIGxldCBub3JtYWxpemVkWDtcbiAgbGV0IG5vcm1hbGl6ZWRZO1xuICAvLyBEZXRlcm1pbmUgdG91Y2ggcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJpcHBsZSBjb250YWluZXIuXG4gIGlmIChldi50eXBlID09PSAndG91Y2hzdGFydCcpIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgLSBkb2N1bWVudFk7XG4gIH0gZWxzZSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9XG5cbiAgcmV0dXJuIHt4OiBub3JtYWxpemVkWCwgeTogbm9ybWFsaXplZFl9O1xufVxuXG5leHBvcnQge3N1cHBvcnRzQ3NzVmFyaWFibGVzLCBhcHBseVBhc3NpdmUsIGdldE1hdGNoZXNQcm9wZXJ0eSwgZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENSaXBwbGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7Z2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfSBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGlzQWN0aXZhdGVkOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgYWN0aXZhdGlvbkV2ZW50OiBFdmVudCxcbiAqICAgaXNQcm9ncmFtbWF0aWM6IChib29sZWFufHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBBY3RpdmF0aW9uU3RhdGVUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGRlYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZm9jdXM6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgYmx1cjogKHN0cmluZ3x1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJJbmZvVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZm9jdXM6IGZ1bmN0aW9uKCksXG4gKiAgIGJsdXI6IGZ1bmN0aW9uKClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lcnNUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIHg6IG51bWJlcixcbiAqICAgeTogbnVtYmVyXG4gKiB9fVxuICovXG5sZXQgUG9pbnRUeXBlO1xuXG4vLyBBY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIHRoZSByb290IGVsZW1lbnQgb2YgZWFjaCBpbnN0YW5jZSBmb3IgYWN0aXZhdGlvblxuY29uc3QgQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hzdGFydCcsICdwb2ludGVyZG93bicsICdtb3VzZWRvd24nLCAna2V5ZG93biddO1xuXG4vLyBEZWFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gZG9jdW1lbnRFbGVtZW50IHdoZW4gYSBwb2ludGVyLXJlbGF0ZWQgZG93biBldmVudCBvY2N1cnNcbmNvbnN0IFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaGVuZCcsICdwb2ludGVydXAnLCAnbW91c2V1cCddO1xuXG4vLyBUcmFja3MgYWN0aXZhdGlvbnMgdGhhdCBoYXZlIG9jY3VycmVkIG9uIHRoZSBjdXJyZW50IGZyYW1lLCB0byBhdm9pZCBzaW11bHRhbmVvdXMgbmVzdGVkIGFjdGl2YXRpb25zXG4vKiogQHR5cGUgeyFBcnJheTwhRXZlbnRUYXJnZXQ+fSAqL1xubGV0IGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDUmlwcGxlQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4gLyogYm9vbGVhbiAtIGNhY2hlZCAqLyB7fSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29udGFpbnNFdmVudFRhcmdldDogKC8qIHRhcmdldDogIUV2ZW50VGFyZ2V0ICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICgvKiB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gLyogQ2xpZW50UmVjdCAqLyB7fSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IC8qIHt4OiBudW1iZXIsIHk6IG51bWJlcn0gKi8ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1JpcHBsZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUNsaWVudFJlY3R9ICovXG4gICAgdGhpcy5mcmFtZV8gPSAvKiogQHR5cGUgeyFDbGllbnRSZWN0fSAqLyAoe3dpZHRoOiAwLCBoZWlnaHQ6IDB9KTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5hY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5kZWFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5mb2N1c0hhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVGb2N1cygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmJsdXJIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlQmx1cigpO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5yZXNpemVIYW5kbGVyXyA9ICgpID0+IHRoaXMubGF5b3V0KCk7XG5cbiAgICAvKiogQHByaXZhdGUge3tsZWZ0OiBudW1iZXIsIHRvcDpudW1iZXJ9fSAqL1xuICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB0b3A6IDAsXG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdTY2FsZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfID0gKCkgPT4ge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gdHJ1ZTtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7P0V2ZW50fSAqL1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBjb21wdXRlIHRoaXMgcHJvcGVydHkgc28gdGhhdCB3ZSBhcmUgbm90IHF1ZXJ5aW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZSBjbGllbnRcbiAgICogdW50aWwgdGhlIHBvaW50IGluIHRpbWUgd2hlcmUgdGhlIGZvdW5kYXRpb24gcmVxdWVzdHMgaXQuIFRoaXMgcHJldmVudHMgc2NlbmFyaW9zIHdoZXJlXG4gICAqIGNsaWVudC1zaWRlIGZlYXR1cmUtZGV0ZWN0aW9uIG1heSBoYXBwZW4gdG9vIGVhcmx5LCBzdWNoIGFzIHdoZW4gY29tcG9uZW50cyBhcmUgcmVuZGVyZWQgb24gdGhlIHNlcnZlclxuICAgKiBhbmQgdGhlbiBpbml0aWFsaXplZCBhdCBtb3VudCB0aW1lIG9uIHRoZSBjbGllbnQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc1N1cHBvcnRlZF8oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFBY3RpdmF0aW9uU3RhdGVUeXBlfVxuICAgKi9cbiAgZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQWN0aXZhdGVkOiBmYWxzZSxcbiAgICAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiBmYWxzZSxcbiAgICAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogZmFsc2UsXG4gICAgICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogZmFsc2UsXG4gICAgICBhY3RpdmF0aW9uRXZlbnQ6IG51bGwsXG4gICAgICBpc1Byb2dyYW1tYXRpYzogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKi9cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcblxuICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFJPT1QpO1xuICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgICAgIC8vIFVuYm91bmRlZCByaXBwbGVzIG5lZWQgbGF5b3V0IGxvZ2ljIGFwcGxpZWQgaW1tZWRpYXRlbHkgdG8gc2V0IGNvb3JkaW5hdGVzIGZvciBib3RoIHNoYWRlIGFuZCByaXBwbGVcbiAgICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hY3RpdmF0aW9uVGltZXJfKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5hY3RpdmF0aW9uVGltZXJfKTtcbiAgICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG4gICAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIH1cblxuICAgIHRoaXMuZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcbiAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcblxuICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFJPT1QpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgdGhpcy5yZW1vdmVDc3NWYXJzXygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpIHtcbiAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSkge1xuICAgIGlmIChlLnR5cGUgPT09ICdrZXlkb3duJykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpIHtcbiAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVtb3ZlQ3NzVmFyc18oKSB7XG4gICAgY29uc3Qge3N0cmluZ3N9ID0gTURDUmlwcGxlRm91bmRhdGlvbjtcbiAgICBPYmplY3Qua2V5cyhzdHJpbmdzKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBpZiAoay5pbmRleE9mKCdWQVJfJykgPT09IDApIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShzdHJpbmdzW2tdLCBudWxsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYWN0aXZhdGVfKGUpIHtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VEaXNhYmxlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBBdm9pZCByZWFjdGluZyB0byBmb2xsb3ctb24gZXZlbnRzIGZpcmVkIGJ5IHRvdWNoIGRldmljZSBhZnRlciBhbiBhbHJlYWR5LXByb2Nlc3NlZCB1c2VyIGludGVyYWN0aW9uXG4gICAgY29uc3QgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgPSB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XztcbiAgICBjb25zdCBpc1NhbWVJbnRlcmFjdGlvbiA9IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ICYmIGUgJiYgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQudHlwZSAhPT0gZS50eXBlO1xuICAgIGlmIChpc1NhbWVJbnRlcmFjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCA9IHRydWU7XG4gICAgYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID0gZSA9PT0gbnVsbDtcbiAgICBhY3RpdmF0aW9uU3RhdGUuYWN0aXZhdGlvbkV2ZW50ID0gZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzQWN0aXZhdGVkQnlQb2ludGVyID0gYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID8gZmFsc2UgOiAoXG4gICAgICBlLnR5cGUgPT09ICdtb3VzZWRvd24nIHx8IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnIHx8IGUudHlwZSA9PT0gJ3BvaW50ZXJkb3duJ1xuICAgICk7XG5cbiAgICBjb25zdCBoYXNBY3RpdmF0ZWRDaGlsZCA9XG4gICAgICBlICYmIGFjdGl2YXRlZFRhcmdldHMubGVuZ3RoID4gMCAmJiBhY3RpdmF0ZWRUYXJnZXRzLnNvbWUoKHRhcmdldCkgPT4gdGhpcy5hZGFwdGVyXy5jb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkpO1xuICAgIGlmIChoYXNBY3RpdmF0ZWRDaGlsZCkge1xuICAgICAgLy8gSW1tZWRpYXRlbHkgcmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSwgd2hpbGUgcHJlc2VydmluZyBsb2dpYyB0aGF0IHByZXZlbnRzIHRvdWNoIGZvbGxvdy1vbiBldmVudHNcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGUpIHtcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMucHVzaCgvKiogQHR5cGUgeyFFdmVudFRhcmdldH0gKi8gKGUudGFyZ2V0KSk7XG4gICAgICB0aGlzLnJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpO1xuICAgIH1cblxuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IHRoaXMuY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSk7XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgdGhpcy5hbmltYXRlQWN0aXZhdGlvbl8oKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgLy8gUmVzZXQgYXJyYXkgb24gbmV4dCBmcmFtZSBhZnRlciB0aGUgY3VycmVudCBldmVudCBoYXMgaGFkIGEgY2hhbmNlIHRvIGJ1YmJsZSB0byBwcmV2ZW50IGFuY2VzdG9yIHJpcHBsZXNcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgJiYgKGUua2V5ID09PSAnICcgfHwgZS5rZXlDb2RlID09PSAzMikpIHtcbiAgICAgICAgLy8gSWYgc3BhY2Ugd2FzIHByZXNzZWQsIHRyeSBhZ2FpbiB3aXRoaW4gYW4gckFGIGNhbGwgdG8gZGV0ZWN0IDphY3RpdmUsIGJlY2F1c2UgZGlmZmVyZW50IFVBcyByZXBvcnRcbiAgICAgICAgLy8gYWN0aXZlIHN0YXRlcyBpbmNvbnNpc3RlbnRseSB3aGVuIHRoZXkncmUgY2FsbGVkIHdpdGhpbiBldmVudCBoYW5kbGluZyBjb2RlOlxuICAgICAgICAvLyAtIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTYzNTk3MVxuICAgICAgICAvLyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEyOTM3NDFcbiAgICAgICAgLy8gV2UgdHJ5IGZpcnN0IG91dHNpZGUgckFGIHRvIHN1cHBvcnQgRWRnZSwgd2hpY2ggZG9lcyBub3QgZXhoaWJpdCB0aGlzIHByb2JsZW0sIGJ1dCB3aWxsIGNyYXNoIGlmIGEgQ1NTXG4gICAgICAgIC8vIHZhcmlhYmxlIGlzIHNldCB3aXRoaW4gYSByQUYgY2FsbGJhY2sgZm9yIGEgc3VibWl0IGJ1dHRvbiBpbnRlcmFjdGlvbiAoIzIyNDEpLlxuICAgICAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgICAgICBpZiAoYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICAgICAgdGhpcy5hbmltYXRlQWN0aXZhdGlvbl8oKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAvLyBSZXNldCBhY3RpdmF0aW9uIHN0YXRlIGltbWVkaWF0ZWx5IGlmIGVsZW1lbnQgd2FzIG5vdCBtYWRlIGFjdGl2ZS5cbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKSB7XG4gICAgcmV0dXJuIChlICYmIGUudHlwZSA9PT0gJ2tleWRvd24nKSA/IHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlQWN0aXZlKCkgOiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50PX0gZXZlbnQgT3B0aW9uYWwgZXZlbnQgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGFjdGl2YXRlKGV2ZW50ID0gbnVsbCkge1xuICAgIHRoaXMuYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBhbmltYXRlQWN0aXZhdGlvbl8oKSB7XG4gICAgY29uc3Qge1ZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIFZBUl9GR19UUkFOU0xBVEVfRU5EfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OLCBGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7REVBQ1RJVkFUSU9OX1RJTUVPVVRfTVN9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzO1xuXG4gICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcblxuICAgIGxldCB0cmFuc2xhdGVTdGFydCA9ICcnO1xuICAgIGxldCB0cmFuc2xhdGVFbmQgPSAnJztcblxuICAgIGlmICghdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICBjb25zdCB7c3RhcnRQb2ludCwgZW5kUG9pbnR9ID0gdGhpcy5nZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCk7XG4gICAgICB0cmFuc2xhdGVTdGFydCA9IGAke3N0YXJ0UG9pbnQueH1weCwgJHtzdGFydFBvaW50Lnl9cHhgO1xuICAgICAgdHJhbnNsYXRlRW5kID0gYCR7ZW5kUG9pbnQueH1weCwgJHtlbmRQb2ludC55fXB4YDtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIHRyYW5zbGF0ZVN0YXJ0KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfRU5ELCB0cmFuc2xhdGVFbmQpO1xuICAgIC8vIENhbmNlbCBhbnkgb25nb2luZyBhY3RpdmF0aW9uL2RlYWN0aXZhdGlvbiBhbmltYXRpb25zXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfKTtcbiAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcblxuICAgIC8vIEZvcmNlIGxheW91dCBpbiBvcmRlciB0byByZS10cmlnZ2VyIHRoZSBhbmltYXRpb24uXG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfKCksIERFQUNUSVZBVElPTl9USU1FT1VUX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuIHt7c3RhcnRQb2ludDogUG9pbnRUeXBlLCBlbmRQb2ludDogUG9pbnRUeXBlfX1cbiAgICovXG4gIGdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKSB7XG4gICAgY29uc3Qge2FjdGl2YXRpb25FdmVudCwgd2FzQWN0aXZhdGVkQnlQb2ludGVyfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcblxuICAgIGxldCBzdGFydFBvaW50O1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIpIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoXG4gICAgICAgIC8qKiBAdHlwZSB7IUV2ZW50fSAqLyAoYWN0aXZhdGlvbkV2ZW50KSxcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5nZXRXaW5kb3dQYWdlT2Zmc2V0KCksIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydFBvaW50ID0ge1xuICAgICAgICB4OiB0aGlzLmZyYW1lXy53aWR0aCAvIDIsXG4gICAgICAgIHk6IHRoaXMuZnJhbWVfLmhlaWdodCAvIDIsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBDZW50ZXIgdGhlIGVsZW1lbnQgYXJvdW5kIHRoZSBzdGFydCBwb2ludC5cbiAgICBzdGFydFBvaW50ID0ge1xuICAgICAgeDogc3RhcnRQb2ludC54IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiBzdGFydFBvaW50LnkgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgY29uc3QgZW5kUG9pbnQgPSB7XG4gICAgICB4OiAodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIHJldHVybiB7c3RhcnRQb2ludCwgZW5kUG9pbnR9O1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpIHtcbiAgICAvLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYm90aCB3aGVuIGEgcG9pbnRpbmcgZGV2aWNlIGlzIHJlbGVhc2VkLCBhbmQgd2hlbiB0aGUgYWN0aXZhdGlvbiBhbmltYXRpb24gZW5kcy5cbiAgICAvLyBUaGUgZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBzaG91bGQgb25seSBydW4gYWZ0ZXIgYm90aCBvZiB0aG9zZSBvY2N1ci5cbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7aGFzRGVhY3RpdmF0aW9uVVhSdW4sIGlzQWN0aXZhdGVkfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBjb25zdCBhY3RpdmF0aW9uSGFzRW5kZWQgPSBoYXNEZWFjdGl2YXRpb25VWFJ1biB8fCAhaXNBY3RpdmF0ZWQ7XG5cbiAgICBpZiAoYWN0aXZhdGlvbkhhc0VuZGVkICYmIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXykge1xuICAgICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIH0sIG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCkge1xuICAgIGNvbnN0IHtGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICB9XG5cbiAgcmVzZXRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmFjdGl2YXRpb25FdmVudDtcbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgLy8gVG91Y2ggZGV2aWNlcyBtYXkgZmlyZSBhZGRpdGlvbmFsIGV2ZW50cyBmb3IgdGhlIHNhbWUgaW50ZXJhY3Rpb24gd2l0aGluIGEgc2hvcnQgdGltZS5cbiAgICAvLyBTdG9yZSB0aGUgcHJldmlvdXMgZXZlbnQgdW50aWwgaXQncyBzYWZlIHRvIGFzc3VtZSB0aGF0IHN1YnNlcXVlbnQgZXZlbnRzIGFyZSBmb3IgbmV3IGludGVyYWN0aW9ucy5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbCwgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlRBUF9ERUxBWV9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRlYWN0aXZhdGVfKGUpIHtcbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIGluIHNjZW5hcmlvcyBzdWNoIGFzIHdoZW4geW91IGhhdmUgYSBrZXl1cCBldmVudCB0aGF0IGJsdXJzIHRoZSBlbGVtZW50LlxuICAgIGlmICghYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGUgPSAvKiogQHR5cGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqLyAoT2JqZWN0LmFzc2lnbih7fSwgYWN0aXZhdGlvblN0YXRlKSk7XG5cbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljKSB7XG4gICAgICBjb25zdCBldnRPYmplY3QgPSBudWxsO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZXZ0T2JqZWN0LCBzdGF0ZSkpO1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uaGFzRGVhY3RpdmF0aW9uVVhSdW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHN0YXRlKTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBkZWFjdGl2YXRlKGV2ZW50ID0gbnVsbCkge1xuICAgIHRoaXMuZGVhY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICogQHBhcmFtIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gb3B0aW9uc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwge3dhc0FjdGl2YXRlZEJ5UG9pbnRlciwgd2FzRWxlbWVudE1hZGVBY3RpdmV9KSB7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlciB8fCB3YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0RnJhbWVfKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmxheW91dEZyYW1lXyk7XG4gICAgfVxuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgbGF5b3V0SW50ZXJuYWxfKCkge1xuICAgIHRoaXMuZnJhbWVfID0gdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgY29uc3QgbWF4RGltID0gTWF0aC5tYXgodGhpcy5mcmFtZV8uaGVpZ2h0LCB0aGlzLmZyYW1lXy53aWR0aCk7XG5cbiAgICAvLyBTdXJmYWNlIGRpYW1ldGVyIGlzIHRyZWF0ZWQgZGlmZmVyZW50bHkgZm9yIHVuYm91bmRlZCB2cy4gYm91bmRlZCByaXBwbGVzLlxuICAgIC8vIFVuYm91bmRlZCByaXBwbGUgZGlhbWV0ZXIgaXMgY2FsY3VsYXRlZCBzbWFsbGVyIHNpbmNlIHRoZSBzdXJmYWNlIGlzIGV4cGVjdGVkIHRvIGFscmVhZHkgYmUgcGFkZGVkIGFwcHJvcHJpYXRlbHlcbiAgICAvLyB0byBleHRlbmQgdGhlIGhpdGJveCwgYW5kIHRoZSByaXBwbGUgaXMgZXhwZWN0ZWQgdG8gbWVldCB0aGUgZWRnZXMgb2YgdGhlIHBhZGRlZCBoaXRib3ggKHdoaWNoIGlzIHR5cGljYWxseVxuICAgIC8vIHNxdWFyZSkuIEJvdW5kZWQgcmlwcGxlcywgb24gdGhlIG90aGVyIGhhbmQsIGFyZSBmdWxseSBleHBlY3RlZCB0byBleHBhbmQgYmV5b25kIHRoZSBzdXJmYWNlJ3MgbG9uZ2VzdCBkaWFtZXRlclxuICAgIC8vIChjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBkaWFnb25hbCBwbHVzIGEgY29uc3RhbnQgcGFkZGluZyksIGFuZCBhcmUgY2xpcHBlZCBhdCB0aGUgc3VyZmFjZSdzIGJvcmRlciB2aWFcbiAgICAvLyBgb3ZlcmZsb3c6IGhpZGRlbmAuXG4gICAgY29uc3QgZ2V0Qm91bmRlZFJhZGl1cyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGh5cG90ZW51c2UgPSBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5mcmFtZV8ud2lkdGgsIDIpICsgTWF0aC5wb3codGhpcy5mcmFtZV8uaGVpZ2h0LCAyKSk7XG4gICAgICByZXR1cm4gaHlwb3RlbnVzZSArIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5QQURESU5HO1xuICAgIH07XG5cbiAgICB0aGlzLm1heFJhZGl1c18gPSB0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkgPyBtYXhEaW0gOiBnZXRCb3VuZGVkUmFkaXVzKCk7XG5cbiAgICAvLyBSaXBwbGUgaXMgc2l6ZWQgYXMgYSBmcmFjdGlvbiBvZiB0aGUgbGFyZ2VzdCBkaW1lbnNpb24gb2YgdGhlIHN1cmZhY2UsIHRoZW4gc2NhbGVzIHVwIHVzaW5nIGEgQ1NTIHNjYWxlIHRyYW5zZm9ybVxuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gbWF4RGltICogTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLklOSVRJQUxfT1JJR0lOX1NDQUxFO1xuICAgIHRoaXMuZmdTY2FsZV8gPSB0aGlzLm1heFJhZGl1c18gLyB0aGlzLmluaXRpYWxTaXplXztcblxuICAgIHRoaXMudXBkYXRlTGF5b3V0Q3NzVmFyc18oKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICB1cGRhdGVMYXlvdXRDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7XG4gICAgICBWQVJfRkdfU0laRSwgVkFSX0xFRlQsIFZBUl9UT1AsIFZBUl9GR19TQ0FMRSxcbiAgICB9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0laRSwgYCR7dGhpcy5pbml0aWFsU2l6ZV99cHhgKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TQ0FMRSwgdGhpcy5mZ1NjYWxlXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICAgIGxlZnQ6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICAgIHRvcDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9MRUZULCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18ubGVmdH1weGApO1xuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfVE9QLCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18udG9wfXB4YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gdW5ib3VuZGVkICovXG4gIHNldFVuYm91bmRlZCh1bmJvdW5kZWQpIHtcbiAgICBjb25zdCB7VU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAodW5ib3VuZGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVGb2N1cygpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT5cbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpKTtcbiAgfVxuXG4gIGhhbmRsZUJsdXIoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlRm91bmRhdGlvbjtcbiIsImltcG9ydCBNRENSaXBwbGVGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcydcclxuaW1wb3J0IHtcclxuICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyxcclxuICBnZXRNYXRjaGVzUHJvcGVydHksXHJcbiAgYXBwbHlQYXNzaXZlXHJcbn0gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS91dGlsJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFJpcHBsZUJhc2UgZXh0ZW5kcyBNRENSaXBwbGVGb3VuZGF0aW9uIHtcclxuICBzdGF0aWMgZ2V0IE1BVENIRVMoKSB7XHJcbiAgICAvKiBnbG9iYWwgSFRNTEVsZW1lbnQgKi9cclxuICAgIHJldHVybiAoXHJcbiAgICAgIFJpcHBsZUJhc2UuX21hdGNoZXMgfHxcclxuICAgICAgKFJpcHBsZUJhc2UuX21hdGNoZXMgPSBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnQucHJvdG90eXBlKSlcclxuICAgIClcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc1N1cmZhY2VBY3RpdmUocmVmKSB7XHJcbiAgICByZXR1cm4gcmVmW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3Iodm0sIG9wdGlvbnMpIHtcclxuICAgIHN1cGVyKFxyXG4gICAgICBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvdylcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBpc1VuYm91bmRlZDogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZtLiRlbFtSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdm0uZGlzYWJsZWRcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBhZGRDbGFzcyhjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgdm0uJHNldCh2bS5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIHZtLiRkZWxldGUodm0uY2xhc3NlcywgY2xhc3NOYW1lKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6IHRhcmdldCA9PiB2bS4kZWwuY29udGFpbnModGFyZ2V0KSxcclxuICAgICAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHZtLiRlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2bS4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgICBldnRUeXBlLFxyXG4gICAgICAgICAgICAgIGhhbmRsZXIsXHJcbiAgICAgICAgICAgICAgYXBwbHlQYXNzaXZlKClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAgIGV2dFR5cGUsXHJcbiAgICAgICAgICAgICAgaGFuZGxlcixcclxuICAgICAgICAgICAgICBhcHBseVBhc3NpdmUoKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiBoYW5kbGVyID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiBoYW5kbGVyID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAodmFyTmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdm0uJHNldCh2bS5zdHlsZXMsIHZhck5hbWUsIHZhbHVlKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZtLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgeDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXQgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3B0aW9uc1xyXG4gICAgICApXHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUmlwcGxlTWl4aW4gPSB7XHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNsYXNzZXM6IHt9LFxyXG4gICAgICBzdHlsZXM6IHt9XHJcbiAgICB9XHJcbiAgfSxcclxuICBtb3VudGVkKCkge1xyXG4gICAgdGhpcy5yaXBwbGUgPSBuZXcgUmlwcGxlQmFzZSh0aGlzKVxyXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXHJcbiAgfSxcclxuICBiZWZvcmVEZXN0cm95KCkge1xyXG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXHJcbiAgfVxyXG59XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8Y3VzdG9tLWVsZW1lbnQgXHJcbiAgICA6dGFnPVwidGFnXCIgXHJcbiAgICA6Y2xhc3Nlcz1cImNsYXNzZXNcIlxyXG4gICAgOnN0eWxlcz1cInN0eWxlc1wiIFxyXG4gICAgY2xhc3M9XCJtZGMtcmlwcGxlXCI+XHJcbiAgICA8c2xvdCAvPlxyXG4gIDwvY3VzdG9tLWVsZW1lbnQ+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyBDdXN0b21FbGVtZW50TWl4aW4gfSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgeyBSaXBwbGVNaXhpbiB9IGZyb20gJy4vbWRjLXJpcHBsZS1iYXNlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtcmlwcGxlJyxcclxuICBtaXhpbnM6IFtDdXN0b21FbGVtZW50TWl4aW4sIFJpcHBsZU1peGluXSxcclxuICBwcm9wczoge1xyXG4gICAgdGFnOiBTdHJpbmdcclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8Y3VzdG9tLWxpbmsgXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiXHJcbiAgICA6c3R5bGU9XCJzdHlsZXNcIiBcbiAgICA6bGluaz1cImxpbmtcIlxyXG4gICAgY2xhc3M9XCJtZGMtdGFiXCJcclxuICAgIHYtb249XCJsaXN0ZW5lcnNcIj5cclxuXHJcbiAgICA8aSBcbiAgICAgIHYtaWY9XCIhIWhhc0ljb25cIiBcbiAgICAgIHJlZj1cImljb25cIlxyXG4gICAgICA6Y2xhc3M9XCJoYXNJY29uLmNsYXNzZXNcIlxyXG4gICAgICB0YWJpbmRleD1cIjBcIlxyXG4gICAgICBjbGFzcz1cIm1kYy10YWJfX2ljb25cIj5cclxuICAgICAgPHNsb3QgbmFtZT1cImljb25cIj57eyBoYXNJY29uLmNvbnRlbnQgfX08L3Nsb3Q+XHJcbiAgICA8L2k+XHJcblxyXG4gICAgPHNwYW4gXG4gICAgICB2LWlmPVwiaGFzVGV4dFwiIFxuICAgICAgOmNsYXNzPVwieydtZGMtdGFiX19pY29uLXRleHQnOiAhIWhhc0ljb259XCI+XHJcbiAgICAgIDxzbG90Lz5cclxuICAgIDwvc3Bhbj5cclxuXHJcbiAgPC9jdXN0b20tbGluaz5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBNRENUYWJGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC90YWJzL3RhYi9mb3VuZGF0aW9uJ1xyXG5pbXBvcnQge1xyXG4gIEN1c3RvbUxpbmtNaXhpbixcclxuICBEaXNwYXRjaEV2ZW50TWl4aW4sXHJcbiAgZW1pdEN1c3RvbUV2ZW50LFxyXG4gIGV4dHJhY3RJY29uUHJvcFxyXG59IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCB7IFJpcHBsZUJhc2UgfSBmcm9tICcuLi9yaXBwbGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy10YWInLFxyXG4gIG1peGluczogW0N1c3RvbUxpbmtNaXhpbiwgRGlzcGF0Y2hFdmVudE1peGluXSxcclxuICBwcm9wczoge1xyXG4gICAgYWN0aXZlOiBCb29sZWFuLFxyXG4gICAgaWNvbjogW1N0cmluZywgQXJyYXksIE9iamVjdF1cclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiB7fSxcclxuICAgICAgc3R5bGVzOiB7fVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIGhhc0ljb24oKSB7XHJcbiAgICAgIGlmICh0aGlzLmljb24gfHwgdGhpcy4kc2xvdHMuaWNvbikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmljb24gPyBleHRyYWN0SWNvblByb3AodGhpcy5pY29uKSA6IHt9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9LFxyXG4gICAgaGFzVGV4dCgpIHtcclxuICAgICAgcmV0dXJuICEhdGhpcy4kc2xvdHMuZGVmYXVsdFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgd2F0Y2g6IHtcclxuICAgIGFjdGl2ZSh2YWx1ZSkge1xyXG4gICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLmZvdW5kYXRpb24uYWRhcHRlcl8ubm90aWZ5U2VsZWN0ZWQoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBtb3VudGVkKCkge1xyXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ1RhYkZvdW5kYXRpb24oe1xyXG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSksXHJcbiAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kZGVsZXRlKHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lKSxcclxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PlxyXG4gICAgICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXHJcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PlxyXG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXHJcbiAgICAgIGdldE9mZnNldFdpZHRoOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsLm9mZnNldFdpZHRoXHJcbiAgICAgIH0sXHJcbiAgICAgIGdldE9mZnNldExlZnQ6ICgpID0+IHRoaXMuJGVsLm9mZnNldExlZnQsXHJcbiAgICAgIG5vdGlmeVNlbGVjdGVkOiAoKSA9PiB7XHJcbiAgICAgICAgZW1pdEN1c3RvbUV2ZW50KFxyXG4gICAgICAgICAgdGhpcy4kZWwsXHJcbiAgICAgICAgICBNRENUYWJGb3VuZGF0aW9uLnN0cmluZ3MuU0VMRUNURURfRVZFTlQsXHJcbiAgICAgICAgICB7IHRhYjogdGhpcyB9LFxyXG4gICAgICAgICAgdHJ1ZVxyXG4gICAgICAgIClcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIHRoaXMuZm91bmRhdGlvbi5pbml0KClcclxuICAgIHRoaXMuc2V0QWN0aXZlKHRoaXMuYWN0aXZlKVxyXG4gICAgdGhpcy5yaXBwbGUgPSBuZXcgUmlwcGxlQmFzZSh0aGlzKVxyXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXHJcbiAgfSxcclxuICBiZWZvcmVEZXN0cm95KCkge1xyXG4gICAgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBnZXRDb21wdXRlZFdpZHRoKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uLmdldENvbXB1dGVkV2lkdGgoKVxyXG4gICAgfSxcclxuICAgIGdldENvbXB1dGVkTGVmdCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZm91bmRhdGlvbi5nZXRDb21wdXRlZExlZnQoKVxyXG4gICAgfSxcclxuICAgIGlzQWN0aXZlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uLmlzQWN0aXZlKClcclxuICAgIH0sXHJcbiAgICBzZXRBY3RpdmUoaXNBY3RpdmUpIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldEFjdGl2ZShpc0FjdGl2ZSlcclxuICAgIH0sXHJcbiAgICBpc0RlZmF1bHRQcmV2ZW50ZWRPbkNsaWNrKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uLnByZXZlbnRzRGVmYXVsdE9uQ2xpY2soKVxyXG4gICAgfSxcclxuICAgIHNldFByZXZlbnREZWZhdWx0T25DbGljayhwcmV2ZW50RGVmYXVsdE9uQ2xpY2spIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldFByZXZlbnREZWZhdWx0T25DbGljayhwcmV2ZW50RGVmYXVsdE9uQ2xpY2spXHJcbiAgICB9LFxyXG4gICAgbWVhc3VyZVNlbGYoKSB7XHJcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5tZWFzdXJlU2VsZigpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBub1ByZWZpeDogc3RyaW5nLFxuICogICB3ZWJraXRQcmVmaXg6IHN0cmluZyxcbiAqICAgc3R5bGVQcm9wZXJ0eTogc3RyaW5nXG4gKiB9fVxuICovXG5sZXQgVmVuZG9yUHJvcGVydHlNYXBUeXBlO1xuXG4vKiogQGNvbnN0IHtPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi9cbmNvbnN0IGV2ZW50VHlwZU1hcCA9IHtcbiAgJ2FuaW1hdGlvbnN0YXJ0Jzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uc3RhcnQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdEFuaW1hdGlvblN0YXJ0JyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ2FuaW1hdGlvbmVuZCc6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbmVuZCcsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uRW5kJyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ2FuaW1hdGlvbml0ZXJhdGlvbic6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbml0ZXJhdGlvbicsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uSXRlcmF0aW9uJyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ3RyYW5zaXRpb25lbmQnOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICBzdHlsZVByb3BlcnR5OiAndHJhbnNpdGlvbicsXG4gIH0sXG59O1xuXG4vKiogQGNvbnN0IHtPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi9cbmNvbnN0IGNzc1Byb3BlcnR5TWFwID0ge1xuICAnYW5pbWF0aW9uJzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LWFuaW1hdGlvbicsXG4gIH0sXG4gICd0cmFuc2Zvcm0nOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2Zvcm0nLFxuICAgIHdlYmtpdFByZWZpeDogJy13ZWJraXQtdHJhbnNmb3JtJyxcbiAgfSxcbiAgJ3RyYW5zaXRpb24nOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2l0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LXRyYW5zaXRpb24nLFxuICB9LFxufTtcblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaGFzUHJvcGVyU2hhcGUod2luZG93T2JqKSB7XG4gIHJldHVybiAod2luZG93T2JqWydkb2N1bWVudCddICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHdpbmRvd09ialsnZG9jdW1lbnQnXVsnY3JlYXRlRWxlbWVudCddID09PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBldmVudEZvdW5kSW5NYXBzKGV2ZW50VHlwZSkge1xuICByZXR1cm4gKGV2ZW50VHlwZSBpbiBldmVudFR5cGVNYXAgfHwgZXZlbnRUeXBlIGluIGNzc1Byb3BlcnR5TWFwKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcGFyYW0geyFPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gbWFwXG4gKiBAcGFyYW0geyFFbGVtZW50fSBlbFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRKYXZhU2NyaXB0RXZlbnROYW1lKGV2ZW50VHlwZSwgbWFwLCBlbCkge1xuICByZXR1cm4gbWFwW2V2ZW50VHlwZV0uc3R5bGVQcm9wZXJ0eSBpbiBlbC5zdHlsZSA/IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IDogbWFwW2V2ZW50VHlwZV0ud2Via2l0UHJlZml4O1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBkZXRlcm1pbmUgYnJvd3NlciBwcmVmaXggZm9yIENTUzMgYW5pbWF0aW9uIGV2ZW50c1xuICogYW5kIHByb3BlcnR5IG5hbWVzLlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0QW5pbWF0aW9uTmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSkge1xuICBpZiAoIWhhc1Byb3BlclNoYXBlKHdpbmRvd09iaikgfHwgIWV2ZW50Rm91bmRJbk1hcHMoZXZlbnRUeXBlKSkge1xuICAgIHJldHVybiBldmVudFR5cGU7XG4gIH1cblxuICBjb25zdCBtYXAgPSAvKiogQHR5cGUgeyFPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi8gKFxuICAgIGV2ZW50VHlwZSBpbiBldmVudFR5cGVNYXAgPyBldmVudFR5cGVNYXAgOiBjc3NQcm9wZXJ0eU1hcFxuICApO1xuICBjb25zdCBlbCA9IHdpbmRvd09ialsnZG9jdW1lbnQnXVsnY3JlYXRlRWxlbWVudCddKCdkaXYnKTtcbiAgbGV0IGV2ZW50TmFtZSA9ICcnO1xuXG4gIGlmIChtYXAgPT09IGV2ZW50VHlwZU1hcCkge1xuICAgIGV2ZW50TmFtZSA9IGdldEphdmFTY3JpcHRFdmVudE5hbWUoZXZlbnRUeXBlLCBtYXAsIGVsKTtcbiAgfSBlbHNlIHtcbiAgICBldmVudE5hbWUgPSBtYXBbZXZlbnRUeXBlXS5ub1ByZWZpeCBpbiBlbC5zdHlsZSA/IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IDogbWFwW2V2ZW50VHlwZV0ud2Via2l0UHJlZml4O1xuICB9XG5cbiAgcmV0dXJuIGV2ZW50TmFtZTtcbn1cblxuLy8gUHVibGljIGZ1bmN0aW9ucyB0byBhY2Nlc3MgZ2V0QW5pbWF0aW9uTmFtZSgpIGZvciBKYXZhU2NyaXB0IGV2ZW50cyBvciBDU1Ncbi8vIHByb3BlcnR5IG5hbWVzLlxuXG5jb25zdCB0cmFuc2Zvcm1TdHlsZVByb3BlcnRpZXMgPSBbJ3RyYW5zZm9ybScsICdXZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnTVNUcmFuc2Zvcm0nXTtcblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDb3JyZWN0RXZlbnROYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIHJldHVybiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDb3JyZWN0UHJvcGVydHlOYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIHJldHVybiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKTtcbn1cblxuZXhwb3J0IHt0cmFuc2Zvcm1TdHlsZVByb3BlcnRpZXMsIGdldENvcnJlY3RFdmVudE5hbWUsIGdldENvcnJlY3RQcm9wZXJ0eU5hbWV9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuZXhwb3J0IGNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFVQR1JBREVEOiAnbWRjLXRhYi1iYXItdXBncmFkZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IHN0cmluZ3MgPSB7XG4gIFRBQl9TRUxFQ1RPUjogJy5tZGMtdGFiJyxcbiAgSU5ESUNBVE9SX1NFTEVDVE9SOiAnLm1kYy10YWItYmFyX19pbmRpY2F0b3InLFxuICBDSEFOR0VfRVZFTlQ6ICdNRENUYWJCYXI6Y2hhbmdlJyxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCB7Z2V0Q29ycmVjdFByb3BlcnR5TmFtZX0gZnJvbSAnQG1hdGVyaWFsL2FuaW1hdGlvbi9pbmRleCc7XG5cbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNRENUYWJCYXJGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBiaW5kT25NRENUYWJTZWxlY3RlZEV2ZW50OiAoKSA9PiB7fSxcbiAgICAgIHVuYmluZE9uTURDVGFiU2VsZWN0ZWRFdmVudDogKCkgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBnZXRPZmZzZXRXaWR0aDogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICBzZXRTdHlsZUZvckluZGljYXRvcjogKC8qIHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGdldE9mZnNldFdpZHRoRm9ySW5kaWNhdG9yOiAoKSA9PiAvKiBudW1iZXIgKi8gMCxcbiAgICAgIG5vdGlmeUNoYW5nZTogKC8qIGV2dERhdGE6IHthY3RpdmVUYWJJbmRleDogbnVtYmVyfSAqLykgPT4ge30sXG4gICAgICBnZXROdW1iZXJPZlRhYnM6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgaXNUYWJBY3RpdmVBdEluZGV4OiAoLyogaW5kZXg6IG51bWJlciAqLykgPT4gLyogYm9vbGVhbiAqLyBmYWxzZSxcbiAgICAgIHNldFRhYkFjdGl2ZUF0SW5kZXg6ICgvKiBpbmRleDogbnVtYmVyLCBpc0FjdGl2ZTogdHJ1ZSAqLykgPT4ge30sXG4gICAgICBpc0RlZmF1bHRQcmV2ZW50ZWRPbkNsaWNrRm9yVGFiQXRJbmRleDogKC8qIGluZGV4OiBudW1iZXIgKi8pID0+IC8qIGJvb2xlYW4gKi8gZmFsc2UsXG4gICAgICBzZXRQcmV2ZW50RGVmYXVsdE9uQ2xpY2tGb3JUYWJBdEluZGV4OiAoLyogaW5kZXg6IG51bWJlciwgcHJldmVudERlZmF1bHRPbkNsaWNrOiBib29sZWFuICovKSA9PiB7fSxcbiAgICAgIG1lYXN1cmVUYWJBdEluZGV4OiAoLyogaW5kZXg6IG51bWJlciAqLykgPT4ge30sXG4gICAgICBnZXRDb21wdXRlZFdpZHRoRm9yVGFiQXRJbmRleDogKC8qIGluZGV4OiBudW1iZXIgKi8pID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgZ2V0Q29tcHV0ZWRMZWZ0Rm9yVGFiQXRJbmRleDogKC8qIGluZGV4OiBudW1iZXIgKi8pID0+IC8qIG51bWJlciAqLyAwLFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENUYWJCYXJGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICB0aGlzLmlzSW5kaWNhdG9yU2hvd25fID0gZmFsc2U7XG4gICAgdGhpcy5jb21wdXRlZFdpZHRoXyA9IDA7XG4gICAgdGhpcy5jb21wdXRlZExlZnRfID0gMDtcbiAgICB0aGlzLmFjdGl2ZVRhYkluZGV4XyA9IDA7XG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuVVBHUkFERUQpO1xuICAgIHRoaXMuYWRhcHRlcl8uYmluZE9uTURDVGFiU2VsZWN0ZWRFdmVudCgpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIGNvbnN0IGFjdGl2ZVRhYkluZGV4ID0gdGhpcy5maW5kQWN0aXZlVGFiSW5kZXhfKCk7XG4gICAgaWYgKGFjdGl2ZVRhYkluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFiSW5kZXhfID0gYWN0aXZlVGFiSW5kZXg7XG4gICAgfVxuICAgIHRoaXMubGF5b3V0KCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5VUEdSQURFRCk7XG4gICAgdGhpcy5hZGFwdGVyXy51bmJpbmRPbk1EQ1RhYlNlbGVjdGVkRXZlbnQoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICB9XG5cbiAgbGF5b3V0SW50ZXJuYWxfKCkge1xuICAgIHRoaXMuZm9yRWFjaFRhYkluZGV4XygoaW5kZXgpID0+IHRoaXMuYWRhcHRlcl8ubWVhc3VyZVRhYkF0SW5kZXgoaW5kZXgpKTtcbiAgICB0aGlzLmNvbXB1dGVkV2lkdGhfID0gdGhpcy5hZGFwdGVyXy5nZXRPZmZzZXRXaWR0aCgpO1xuICAgIHRoaXMubGF5b3V0SW5kaWNhdG9yXygpO1xuICB9XG5cbiAgbGF5b3V0SW5kaWNhdG9yXygpIHtcbiAgICBjb25zdCBpc0luZGljYXRvckZpcnN0UmVuZGVyID0gIXRoaXMuaXNJbmRpY2F0b3JTaG93bl87XG5cbiAgICAvLyBFbnN1cmUgdGhhdCBpbmRpY2F0b3IgYXBwZWFycyBpbiB0aGUgcmlnaHQgcG9zaXRpb24gaW1tZWRpYXRlbHkgZm9yIGNvcnJlY3QgZmlyc3QgcmVuZGVyLlxuICAgIGlmIChpc0luZGljYXRvckZpcnN0UmVuZGVyKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlRm9ySW5kaWNhdG9yKCd0cmFuc2l0aW9uJywgJ25vbmUnKTtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2xhdGVBbXRGb3JBY3RpdmVUYWJMZWZ0ID0gdGhpcy5hZGFwdGVyXy5nZXRDb21wdXRlZExlZnRGb3JUYWJBdEluZGV4KHRoaXMuYWN0aXZlVGFiSW5kZXhfKTtcbiAgICBjb25zdCBzY2FsZUFtdEZvckFjdGl2ZVRhYldpZHRoID1cbiAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0Q29tcHV0ZWRXaWR0aEZvclRhYkF0SW5kZXgodGhpcy5hY3RpdmVUYWJJbmRleF8pIC8gdGhpcy5hZGFwdGVyXy5nZXRPZmZzZXRXaWR0aCgpO1xuXG4gICAgY29uc3QgdHJhbnNmb3JtVmFsdWUgPSBgdHJhbnNsYXRlWCgke3RyYW5zbGF0ZUFtdEZvckFjdGl2ZVRhYkxlZnR9cHgpIHNjYWxlKCR7c2NhbGVBbXRGb3JBY3RpdmVUYWJXaWR0aH0sIDEpYDtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlRm9ySW5kaWNhdG9yKGdldENvcnJlY3RQcm9wZXJ0eU5hbWUod2luZG93LCAndHJhbnNmb3JtJyksIHRyYW5zZm9ybVZhbHVlKTtcblxuICAgIGlmIChpc0luZGljYXRvckZpcnN0UmVuZGVyKSB7XG4gICAgICAvLyBGb3JjZSBsYXlvdXQgc28gdGhhdCB0cmFuc2Zvcm0gc3R5bGVzIHRvIHRha2UgZWZmZWN0LlxuICAgICAgdGhpcy5hZGFwdGVyXy5nZXRPZmZzZXRXaWR0aEZvckluZGljYXRvcigpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRTdHlsZUZvckluZGljYXRvcigndHJhbnNpdGlvbicsICcnKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0U3R5bGVGb3JJbmRpY2F0b3IoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICAgdGhpcy5pc0luZGljYXRvclNob3duXyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZmluZEFjdGl2ZVRhYkluZGV4XygpIHtcbiAgICBsZXQgYWN0aXZlVGFiSW5kZXggPSAtMTtcbiAgICB0aGlzLmZvckVhY2hUYWJJbmRleF8oKGluZGV4KSA9PiB7XG4gICAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1RhYkFjdGl2ZUF0SW5kZXgoaW5kZXgpKSB7XG4gICAgICAgIGFjdGl2ZVRhYkluZGV4ID0gaW5kZXg7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBhY3RpdmVUYWJJbmRleDtcbiAgfVxuXG4gIGZvckVhY2hUYWJJbmRleF8oaXRlcmF0b3IpIHtcbiAgICBjb25zdCBudW1UYWJzID0gdGhpcy5hZGFwdGVyXy5nZXROdW1iZXJPZlRhYnMoKTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbnVtVGFiczsgaW5kZXgrKykge1xuICAgICAgY29uc3Qgc2hvdWxkQnJlYWsgPSBpdGVyYXRvcihpbmRleCk7XG4gICAgICBpZiAoc2hvdWxkQnJlYWspIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cblxuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG4gICAgfSk7XG4gIH1cblxuICBzd2l0Y2hUb1RhYkF0SW5kZXgoaW5kZXgsIHNob3VsZE5vdGlmeSkge1xuICAgIGlmIChpbmRleCA9PT0gdGhpcy5hY3RpdmVUYWJJbmRleF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuYWRhcHRlcl8uZ2V0TnVtYmVyT2ZUYWJzKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgT3V0IG9mIGJvdW5kcyBpbmRleCBzcGVjaWZpZWQgZm9yIHRhYjogJHtpbmRleH1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2QWN0aXZlVGFiSW5kZXggPSB0aGlzLmFjdGl2ZVRhYkluZGV4XztcbiAgICB0aGlzLmFjdGl2ZVRhYkluZGV4XyA9IGluZGV4O1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAocHJldkFjdGl2ZVRhYkluZGV4ID49IDApIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUYWJBY3RpdmVBdEluZGV4KHByZXZBY3RpdmVUYWJJbmRleCwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUYWJBY3RpdmVBdEluZGV4KHRoaXMuYWN0aXZlVGFiSW5kZXhfLCB0cnVlKTtcbiAgICAgIHRoaXMubGF5b3V0SW5kaWNhdG9yXygpO1xuICAgICAgaWYgKHNob3VsZE5vdGlmeSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNoYW5nZSh7YWN0aXZlVGFiSW5kZXg6IHRoaXMuYWN0aXZlVGFiSW5kZXhffSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRBY3RpdmVUYWJJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kQWN0aXZlVGFiSW5kZXhfKCk7XG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cclxuICA8bmF2IFxyXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiIFxyXG4gICAgY2xhc3M9XCJtZGMtdGFiLWJhclwiIFxyXG4gICAgdi1vbj1cIiRsaXN0ZW5lcnNcIj5cclxuICAgIDxzbG90Lz5cclxuICAgIDxzcGFuIFxyXG4gICAgICByZWY9XCJpbmRpY2F0b3JcIiBcclxuICAgICAgOnN0eWxlPVwiaW5kaWNhdG9yU3R5bGVzXCJcclxuICAgICAgY2xhc3M9XCJtZGMtdGFiLWJhcl9faW5kaWNhdG9yXCIvPlxyXG4gIDwvbmF2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IE1EQ1RhYkJhckZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3RhYnMvdGFiLWJhci9mb3VuZGF0aW9uJ1xyXG5pbXBvcnQgTURDVGFiRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvdGFicy90YWIvZm91bmRhdGlvbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLXRhYi1iYXInLFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiB7fSxcclxuICAgICAgaW5kaWNhdG9yU3R5bGVzOiB7fSxcclxuICAgICAgdGFiczogW11cclxuICAgIH1cclxuICB9LFxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDVGFiQmFyRm91bmRhdGlvbih7XHJcbiAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKSxcclxuICAgICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLiRkZWxldGUodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUpLFxyXG4gICAgICBiaW5kT25NRENUYWJTZWxlY3RlZEV2ZW50OiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgIE1EQ1RhYkZvdW5kYXRpb24uc3RyaW5ncy5TRUxFQ1RFRF9FVkVOVCxcclxuICAgICAgICAgIHRoaXMub25TZWxlY3RcclxuICAgICAgICApXHJcbiAgICAgIH0sXHJcbiAgICAgIHVuYmluZE9uTURDVGFiU2VsZWN0ZWRFdmVudDogKCkgPT5cclxuICAgICAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgTURDVGFiRm91bmRhdGlvbi5zdHJpbmdzLlNFTEVDVEVEX0VWRU5ULFxyXG4gICAgICAgICAgdGhpcy5vblNlbGVjdFxyXG4gICAgICAgICksXHJcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogaGFuZGxlciA9PlxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKSxcclxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT5cclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlciksXHJcbiAgICAgIGdldE9mZnNldFdpZHRoOiAoKSA9PiB0aGlzLiRlbC5vZmZzZXRXaWR0aCxcclxuICAgICAgc2V0U3R5bGVGb3JJbmRpY2F0b3I6IChwcm9wZXJ0eU5hbWUsIHZhbHVlKSA9PlxyXG4gICAgICAgIHRoaXMuJHNldCh0aGlzLmluZGljYXRvclN0eWxlcywgcHJvcGVydHlOYW1lLCB2YWx1ZSksXHJcbiAgICAgIGdldE9mZnNldFdpZHRoRm9ySW5kaWNhdG9yOiAoKSA9PiB0aGlzLiRyZWZzLmluZGljYXRvci5vZmZzZXRXaWR0aCxcclxuICAgICAgbm90aWZ5Q2hhbmdlOiBldnREYXRhID0+IHtcclxuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBldnREYXRhLmFjdGl2ZVRhYkluZGV4KVxyXG4gICAgICB9LFxyXG4gICAgICBnZXROdW1iZXJPZlRhYnM6ICgpID0+IHRoaXMudGFicy5sZW5ndGgsXHJcbiAgICAgIGlzVGFiQWN0aXZlQXRJbmRleDogaW5kZXggPT4gdGhpcy50YWJzW2luZGV4XS5pc0FjdGl2ZSgpLFxyXG4gICAgICBzZXRUYWJBY3RpdmVBdEluZGV4OiAoaW5kZXgsIGlzQWN0aXZlKSA9PiB7XHJcbiAgICAgICAgLy8gcGdicjogMjAxOC0wNC0wN1xyXG4gICAgICAgIC8vIHNpbmNlIGl0IGlzIHBvc3NpYmxlIHRvIGNoYW5nZSB0aGUgbnVtYmVyIG9mIHRhYnMgcHJvZ3JhbWF0aWNhbGx5XHJcbiAgICAgICAgLy8gd2UgbmVlZCB0byBkZXRlY3QgdGhlIGZvdW5kYXRpb24gZGVhY3RpdmF0aW5nIGEgdGFiXHJcbiAgICAgICAgLy8gdGhhdCBubyBsb25nZXIgZXhpc3RzIGJ1dCB3YXMgcHJldmlvdXNseSBhY3RpdmUuXHJcbiAgICAgICAgaWYgKCFpc0FjdGl2ZSAmJiBpbmRleCA+PSB0aGlzLnRhYnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YWJzW2luZGV4XS5zZXRBY3RpdmUoaXNBY3RpdmUpXHJcbiAgICAgIH0sXHJcbiAgICAgIGlzRGVmYXVsdFByZXZlbnRlZE9uQ2xpY2tGb3JUYWJBdEluZGV4OiBpbmRleCA9PlxyXG4gICAgICAgIHRoaXMudGFic1tpbmRleF0uaXNEZWZhdWx0UHJldmVudGVkT25DbGljaygpLFxyXG4gICAgICBzZXRQcmV2ZW50RGVmYXVsdE9uQ2xpY2tGb3JUYWJBdEluZGV4OiAoaW5kZXgsIHByZXZlbnREZWZhdWx0T25DbGljaykgPT4ge1xyXG4gICAgICAgIHRoaXMudGFic1tpbmRleF0uc2V0UHJldmVudERlZmF1bHRPbkNsaWNrKHByZXZlbnREZWZhdWx0T25DbGljaylcclxuICAgICAgfSxcclxuICAgICAgbWVhc3VyZVRhYkF0SW5kZXg6IGluZGV4ID0+IHRoaXMudGFic1tpbmRleF0ubWVhc3VyZVNlbGYoKSxcclxuICAgICAgZ2V0Q29tcHV0ZWRXaWR0aEZvclRhYkF0SW5kZXg6IGluZGV4ID0+XHJcbiAgICAgICAgdGhpcy50YWJzW2luZGV4XS5nZXRDb21wdXRlZFdpZHRoKCksXHJcbiAgICAgIGdldENvbXB1dGVkTGVmdEZvclRhYkF0SW5kZXg6IGluZGV4ID0+IHRoaXMudGFic1tpbmRleF0uZ2V0Q29tcHV0ZWRMZWZ0KClcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgcmVzZXRUYWJzID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB0YWJFbGVtZW50cyA9IFtdLnNsaWNlLmNhbGwoXHJcbiAgICAgICAgdGhpcy4kZWwucXVlcnlTZWxlY3RvckFsbChNRENUYWJCYXJGb3VuZGF0aW9uLnN0cmluZ3MuVEFCX1NFTEVDVE9SKVxyXG4gICAgICApXHJcbiAgICAgIHRoaXMudGFicyA9IHRhYkVsZW1lbnRzLm1hcChlbCA9PiBlbC5fX3Z1ZV9fKVxyXG5cclxuICAgICAgbGV0IGhhc1RleHQsIGhhc0ljb25cclxuICAgICAgY29uc3QgdGFicyA9IHRoaXMudGFic1xyXG4gICAgICBmb3IgKGxldCB0YWIgb2YgdGFicykge1xyXG4gICAgICAgIGlmICh0YWIuaGFzVGV4dCkge1xyXG4gICAgICAgICAgaGFzVGV4dCA9IHRydWVcclxuICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IHRhYiBvZiB0YWJzKSB7XHJcbiAgICAgICAgaWYgKHRhYi5oYXNJY29uKSB7XHJcbiAgICAgICAgICBoYXNJY29uID0gdHJ1ZVxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChoYXNUZXh0ICYmIGhhc0ljb24pIHtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCAnbWRjLXRhYi1iYXItLWljb25zLXdpdGgtdGV4dCcsIHRydWUpXHJcbiAgICAgIH0gZWxzZSBpZiAoaGFzSWNvbikge1xyXG4gICAgICAgIHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsICdtZGMtdGFiLWJhci0taWNvbi10YWItYmFyJywgdHJ1ZSlcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuZm91bmRhdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVRhYkluZGV4ID0gdGhpcy5mb3VuZGF0aW9uLmdldEFjdGl2ZVRhYkluZGV4KClcclxuICAgICAgICBpZiAoYWN0aXZlVGFiSW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgdGhpcy5mb3VuZGF0aW9uLnN3aXRjaFRvVGFiQXRJbmRleChhY3RpdmVUYWJJbmRleCwgdHJ1ZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5mb3VuZGF0aW9uLnN3aXRjaFRvVGFiQXRJbmRleCgwLCB0cnVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvdW5kYXRpb24ubGF5b3V0KClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0VGFicygpXHJcblxyXG4gICAgdGhpcy5zbG90T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiByZXNldFRhYnMoKSlcclxuICAgIHRoaXMuc2xvdE9ic2VydmVyLm9ic2VydmUodGhpcy4kZWwsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pXHJcblxyXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxyXG4gIH0sXHJcbiAgYmVmb3JlRGVzdHJveSgpIHtcclxuICAgIHRoaXMuc2xvdE9ic2VydmVyLmRpc2Nvbm5lY3QoKVxyXG4gICAgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgb25TZWxlY3QoeyBkZXRhaWwgfSkge1xyXG4gICAgICBjb25zdCB7IHRhYiB9ID0gZGV0YWlsXHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy50YWJzLmluZGV4T2YodGFiKVxyXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtZGMtdGFiLWJhciBpbnRlcm5hbCBlcnJvcjogaW5kZXggbm90IGZvdW5kJylcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZvdW5kYXRpb24uc3dpdGNoVG9UYWJBdEluZGV4KGluZGV4LCB0cnVlKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiaW1wb3J0IHsgQmFzZVBsdWdpbiB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCBtZGNUYWIgZnJvbSAnLi9tZGMtdGFiLnZ1ZSdcclxuaW1wb3J0IG1kY1RhYkJhciBmcm9tICcuL21kYy10YWItYmFyLnZ1ZSdcclxuXHJcbmV4cG9ydCB7IG1kY1RhYiwgbWRjVGFiQmFyIH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xyXG4gIG1kY1RhYixcclxuICBtZGNUYWJCYXJcclxufSlcclxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xyXG5pbXBvcnQgeyBhdXRvSW5pdCB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcclxuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXHJcblxyXG5hdXRvSW5pdChwbHVnaW4pXHJcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwia2V5IiwiY29tcG9uZW50Iiwidm0iLCJuYW1lIiwiQ3VzdG9tRWxlbWVudCIsImZ1bmN0aW9uYWwiLCJyZW5kZXIiLCJjcmVhdGVFbGVtZW50IiwiY29udGV4dCIsInByb3BzIiwiaXMiLCJ0YWciLCJkYXRhIiwiY2hpbGRyZW4iLCJDdXN0b21FbGVtZW50TWl4aW4iLCJDdXN0b21MaW5rIiwidHlwZSIsIlN0cmluZyIsImRlZmF1bHQiLCJsaW5rIiwiT2JqZWN0IiwiaCIsImVsZW1lbnQiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsInBhcmVudCIsIiRyb3V0ZXIiLCIkcm9vdCIsIiRvcHRpb25zIiwib24iLCJjbGljayIsIm5hdGl2ZU9uIiwiQ3VzdG9tTGlua01peGluIiwidG8iLCJleGFjdCIsIkJvb2xlYW4iLCJhcHBlbmQiLCJyZXBsYWNlIiwiYWN0aXZlQ2xhc3MiLCJleGFjdEFjdGl2ZUNsYXNzIiwiY29tcHV0ZWQiLCJlbWl0Q3VzdG9tRXZlbnQiLCJlbCIsImV2dFR5cGUiLCJldnREYXRhIiwic2hvdWxkQnViYmxlIiwiZXZ0IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJidWJibGVzIiwiZG9jdW1lbnQiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJleHRyYWN0SWNvblByb3AiLCJpY29uUHJvcCIsImNsYXNzZXMiLCJjb250ZW50IiwiQXJyYXkiLCJyZWR1Y2UiLCJyZXN1bHQiLCJ2YWx1ZSIsImNsYXNzTmFtZSIsInNwbGl0IiwidGV4dENvbnRlbnQiLCJEaXNwYXRjaEV2ZW50TWl4aW4iLCJldmVudCIsIm1ldGhvZHMiLCIkZW1pdCIsInRhcmdldCIsImV2ZW50VGFyZ2V0IiwiYXJncyIsImV2ZW50QXJncyIsImxpc3RlbmVycyIsIiRsaXN0ZW5lcnMiLCJlIiwic2NvcGUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJjc3NDbGFzc2VzIiwiQUNUSVZFIiwic3RyaW5ncyIsIlNFTEVDVEVEX0VWRU5UIiwiTURDVGFiRm91bmRhdGlvbiIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJnZXRPZmZzZXRXaWR0aCIsImdldE9mZnNldExlZnQiLCJub3RpZnlTZWxlY3RlZCIsImRlZmF1bHRBZGFwdGVyIiwiY29tcHV0ZWRXaWR0aF8iLCJjb21wdXRlZExlZnRfIiwiaXNBY3RpdmVfIiwicHJldmVudERlZmF1bHRPbkNsaWNrXyIsImNsaWNrSGFuZGxlcl8iLCJwcmV2ZW50RGVmYXVsdCIsImtleWRvd25IYW5kbGVyXyIsImtleUNvZGUiLCJpc0FjdGl2ZSIsInByZXZlbnREZWZhdWx0T25DbGljayIsIk1EQ1JpcHBsZUFkYXB0ZXIiLCJoYW5kbGVyIiwidmFyTmFtZSIsIlJPT1QiLCJVTkJPVU5ERUQiLCJCR19GT0NVU0VEIiwiRkdfQUNUSVZBVElPTiIsIkZHX0RFQUNUSVZBVElPTiIsIlZBUl9MRUZUIiwiVkFSX1RPUCIsIlZBUl9GR19TSVpFIiwiVkFSX0ZHX1NDQUxFIiwiVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCIsIlZBUl9GR19UUkFOU0xBVEVfRU5EIiwibnVtYmVycyIsIlBBRERJTkciLCJJTklUSUFMX09SSUdJTl9TQ0FMRSIsIkRFQUNUSVZBVElPTl9USU1FT1VUX01TIiwiRkdfREVBQ1RJVkFUSU9OX01TIiwiVEFQX0RFTEFZX01TIiwic3VwcG9ydHNDc3NWYXJpYWJsZXNfIiwic3VwcG9ydHNQYXNzaXZlXyIsImRldGVjdEVkZ2VQc2V1ZG9WYXJCdWciLCJ3aW5kb3dPYmoiLCJub2RlIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY29tcHV0ZWRTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJoYXNQc2V1ZG9WYXJCdWciLCJib3JkZXJUb3BTdHlsZSIsInJlbW92ZSIsInN1cHBvcnRzQ3NzVmFyaWFibGVzIiwiZm9yY2VSZWZyZXNoIiwic3VwcG9ydHNGdW5jdGlvblByZXNlbnQiLCJDU1MiLCJzdXBwb3J0cyIsImV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMiLCJ3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMiLCJhcHBseVBhc3NpdmUiLCJnbG9iYWxPYmoiLCJ1bmRlZmluZWQiLCJpc1N1cHBvcnRlZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwiZ2V0TWF0Y2hlc1Byb3BlcnR5IiwiSFRNTEVsZW1lbnRQcm90b3R5cGUiLCJmaWx0ZXIiLCJwIiwicG9wIiwiZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzIiwiZXYiLCJwYWdlT2Zmc2V0IiwiY2xpZW50UmVjdCIsIngiLCJ5IiwiZG9jdW1lbnRYIiwibGVmdCIsImRvY3VtZW50WSIsInRvcCIsIm5vcm1hbGl6ZWRYIiwibm9ybWFsaXplZFkiLCJjaGFuZ2VkVG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJhY3RpdmF0ZWRUYXJnZXRzIiwiTURDUmlwcGxlRm91bmRhdGlvbiIsImJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMiLCJpc1VuYm91bmRlZCIsImlzU3VyZmFjZUFjdGl2ZSIsImlzU3VyZmFjZURpc2FibGVkIiwiY29udGFpbnNFdmVudFRhcmdldCIsInJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJkZXJlZ2lzdGVyUmVzaXplSGFuZGxlciIsInVwZGF0ZUNzc1ZhcmlhYmxlIiwiY29tcHV0ZUJvdW5kaW5nUmVjdCIsImdldFdpbmRvd1BhZ2VPZmZzZXQiLCJsYXlvdXRGcmFtZV8iLCJmcmFtZV8iLCJ3aWR0aCIsImhlaWdodCIsImFjdGl2YXRpb25TdGF0ZV8iLCJkZWZhdWx0QWN0aXZhdGlvblN0YXRlXyIsImluaXRpYWxTaXplXyIsIm1heFJhZGl1c18iLCJhY3RpdmF0ZUhhbmRsZXJfIiwiYWN0aXZhdGVfIiwiZGVhY3RpdmF0ZUhhbmRsZXJfIiwiZGVhY3RpdmF0ZV8iLCJmb2N1c0hhbmRsZXJfIiwiaGFuZGxlRm9jdXMiLCJibHVySGFuZGxlcl8iLCJoYW5kbGVCbHVyIiwicmVzaXplSGFuZGxlcl8iLCJsYXlvdXQiLCJ1bmJvdW5kZWRDb29yZHNfIiwiZmdTY2FsZV8iLCJhY3RpdmF0aW9uVGltZXJfIiwiZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfIiwiYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyIsImFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyIsInJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XyIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyIsImlzQWN0aXZhdGVkIiwiaGFzRGVhY3RpdmF0aW9uVVhSdW4iLCJ3YXNBY3RpdmF0ZWRCeVBvaW50ZXIiLCJ3YXNFbGVtZW50TWFkZUFjdGl2ZSIsImFjdGl2YXRpb25FdmVudCIsImlzUHJvZ3JhbW1hdGljIiwiaXNTdXBwb3J0ZWRfIiwicmVnaXN0ZXJSb290SGFuZGxlcnNfIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibGF5b3V0SW50ZXJuYWxfIiwiY2xlYXJUaW1lb3V0IiwiZGVyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwicmVtb3ZlQ3NzVmFyc18iLCJmb3JFYWNoIiwia2V5cyIsImsiLCJpbmRleE9mIiwiYWN0aXZhdGlvblN0YXRlIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnQiLCJpc1NhbWVJbnRlcmFjdGlvbiIsImhhc0FjdGl2YXRlZENoaWxkIiwibGVuZ3RoIiwic29tZSIsInJlc2V0QWN0aXZhdGlvblN0YXRlXyIsInB1c2giLCJyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsImNoZWNrRWxlbWVudE1hZGVBY3RpdmVfIiwiYW5pbWF0ZUFjdGl2YXRpb25fIiwidHJhbnNsYXRlU3RhcnQiLCJ0cmFuc2xhdGVFbmQiLCJnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfIiwic3RhcnRQb2ludCIsImVuZFBvaW50Iiwicm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfIiwic2V0VGltZW91dCIsImFjdGl2YXRpb25IYXNFbmRlZCIsInN0YXRlIiwiZXZ0T2JqZWN0IiwiYW5pbWF0ZURlYWN0aXZhdGlvbl8iLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIm1heERpbSIsIm1heCIsImdldEJvdW5kZWRSYWRpdXMiLCJoeXBvdGVudXNlIiwic3FydCIsInBvdyIsInVwZGF0ZUxheW91dENzc1ZhcnNfIiwicm91bmQiLCJ1bmJvdW5kZWQiLCJSaXBwbGVCYXNlIiwicmVmIiwiTUFUQ0hFUyIsIl9tYXRjaGVzIiwiSFRNTEVsZW1lbnQiLCJwcm90b3R5cGUiLCJvcHRpb25zIiwiJGVsIiwiZGlzYWJsZWQiLCIkc2V0IiwiJGRlbGV0ZSIsImNvbnRhaW5zIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhZ2VYT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJSaXBwbGVNaXhpbiIsIm1vdW50ZWQiLCJyaXBwbGUiLCJpbml0IiwiYmVmb3JlRGVzdHJveSIsImRlc3Ryb3kiLCJldmVudFR5cGVNYXAiLCJub1ByZWZpeCIsIndlYmtpdFByZWZpeCIsInN0eWxlUHJvcGVydHkiLCJjc3NQcm9wZXJ0eU1hcCIsImhhc1Byb3BlclNoYXBlIiwiZXZlbnRGb3VuZEluTWFwcyIsImV2ZW50VHlwZSIsImdldEphdmFTY3JpcHRFdmVudE5hbWUiLCJtYXAiLCJzdHlsZSIsImdldEFuaW1hdGlvbk5hbWUiLCJldmVudE5hbWUiLCJnZXRDb3JyZWN0UHJvcGVydHlOYW1lIiwiVVBHUkFERUQiLCJUQUJfU0VMRUNUT1IiLCJJTkRJQ0FUT1JfU0VMRUNUT1IiLCJDSEFOR0VfRVZFTlQiLCJNRENUYWJCYXJGb3VuZGF0aW9uIiwiYmluZE9uTURDVGFiU2VsZWN0ZWRFdmVudCIsInVuYmluZE9uTURDVGFiU2VsZWN0ZWRFdmVudCIsInNldFN0eWxlRm9ySW5kaWNhdG9yIiwiZ2V0T2Zmc2V0V2lkdGhGb3JJbmRpY2F0b3IiLCJub3RpZnlDaGFuZ2UiLCJnZXROdW1iZXJPZlRhYnMiLCJpc1RhYkFjdGl2ZUF0SW5kZXgiLCJzZXRUYWJBY3RpdmVBdEluZGV4IiwiaXNEZWZhdWx0UHJldmVudGVkT25DbGlja0ZvclRhYkF0SW5kZXgiLCJzZXRQcmV2ZW50RGVmYXVsdE9uQ2xpY2tGb3JUYWJBdEluZGV4IiwibWVhc3VyZVRhYkF0SW5kZXgiLCJnZXRDb21wdXRlZFdpZHRoRm9yVGFiQXRJbmRleCIsImdldENvbXB1dGVkTGVmdEZvclRhYkF0SW5kZXgiLCJpc0luZGljYXRvclNob3duXyIsImFjdGl2ZVRhYkluZGV4XyIsImFjdGl2ZVRhYkluZGV4IiwiZmluZEFjdGl2ZVRhYkluZGV4XyIsImZvckVhY2hUYWJJbmRleF8iLCJpbmRleCIsImxheW91dEluZGljYXRvcl8iLCJpc0luZGljYXRvckZpcnN0UmVuZGVyIiwidHJhbnNsYXRlQW10Rm9yQWN0aXZlVGFiTGVmdCIsInNjYWxlQW10Rm9yQWN0aXZlVGFiV2lkdGgiLCJ0cmFuc2Zvcm1WYWx1ZSIsIml0ZXJhdG9yIiwibnVtVGFicyIsInNob3VsZEJyZWFrIiwic2hvdWxkTm90aWZ5IiwiRXJyb3IiLCJwcmV2QWN0aXZlVGFiSW5kZXgiLCJtZGNUYWIiLCJtZGNUYWJCYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBTyxTQUFTQSxRQUFULENBQWtCQyxNQUFsQixFQUEwQjtFQUMvQjtFQUNBLE1BQUlDLE9BQU8sSUFBWDtFQUNBLE1BQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztFQUNqQ0QsV0FBT0MsT0FBT0MsR0FBZDtFQUNELEdBRkQsTUFFTyxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7RUFDeEM7RUFDQUgsV0FBT0csT0FBT0QsR0FBZDtFQUNEO0VBQ0QsTUFBSUYsSUFBSixFQUFVO0VBQ1JBLFNBQUtJLEdBQUwsQ0FBU0wsTUFBVDtFQUNEO0VBQ0Y7O0VDWk0sU0FBU00sVUFBVCxDQUFvQkMsVUFBcEIsRUFBZ0M7RUFDckMsU0FBTztFQUNMQyxhQUFTLFFBREo7RUFFTEMsYUFBUyxx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
