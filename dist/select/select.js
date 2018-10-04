/**
* @module vue-mdc-adapterselect 0.18.2
* @exports VueMDCSelect
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCSelect = factory());
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
   * @template F
   */

  var MDCComponent = function () {
    createClass(MDCComponent, null, [{
      key: 'attachTo',

      /**
       * @param {!Element} root
       * @return {!MDCComponent}
       */
      value: function attachTo(root) {
        // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
        // returns an instantiated component with its root set to that element. Also note that in the cases of
        // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
        // from getDefaultFoundation().
        return new MDCComponent(root, new MDCFoundation());
      }

      /**
       * @param {!Element} root
       * @param {F=} foundation
       * @param {...?} args
       */

    }]);

    function MDCComponent(root) {
      var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      classCallCheck(this, MDCComponent);

      /** @protected {!Element} */
      this.root_ = root;

      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      this.initialize.apply(this, args);
      // Note that we initialize foundation here and not within the constructor's default param so that
      // this.root_ is defined and can be used within the foundation class.
      /** @protected {!F} */
      this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
      this.foundation_.init();
      this.initialSyncWithDOM();
    }

    createClass(MDCComponent, [{
      key: 'initialize',
      value: function initialize() /* ...args */{}
      // Subclasses can override this to do any additional setup work that would be considered part of a
      // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
      // initialized. Any additional arguments besides root and foundation will be passed in here.


      /**
       * @return {!F} foundation
       */

    }, {
      key: 'getDefaultFoundation',
      value: function getDefaultFoundation() {
        // Subclasses must override this method to return a properly configured foundation class for the
        // component.
        throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
      }
    }, {
      key: 'initialSyncWithDOM',
      value: function initialSyncWithDOM() {
        // Subclasses should override this method if they need to perform work to synchronize with a host DOM
        // object. An example of this would be a form control wrapper that needs to synchronize its internal state
        // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
        // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        // Subclasses may implement this method to release any resources / deregister any listeners they have
        // attached. An example of this might be deregistering a resize event from the window object.
        this.foundation_.destroy();
      }

      /**
       * Wrapper method to add an event listener to the component's root element. This is most useful when
       * listening for custom events.
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: 'listen',
      value: function listen(evtType, handler) {
        this.root_.addEventListener(evtType, handler);
      }

      /**
       * Wrapper method to remove an event listener to the component's root element. This is most useful when
       * unlistening for custom events.
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: 'unlisten',
      value: function unlisten(evtType, handler) {
        this.root_.removeEventListener(evtType, handler);
      }

      /**
       * Fires a cross-browser-compatible custom event from the component root of the given type,
       * with the given data.
       * @param {string} evtType
       * @param {!Object} evtData
       * @param {boolean=} shouldBubble
       */

    }, {
      key: 'emit',
      value: function emit(evtType, evtData) {
        var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

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

        this.root_.dispatchEvent(evt);
      }
    }]);
    return MDCComponent;
  }();

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
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
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
   * Adapter for MDC Select. Provides an interface for managing
   * - classes
   * - dom
   * - event handlers
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

  var MDCSelectAdapter = function () {
    function MDCSelectAdapter() {
      classCallCheck(this, MDCSelectAdapter);
    }

    createClass(MDCSelectAdapter, [{
      key: "addClass",

      /**
       * Adds class to root element.
       * @param {string} className
       */
      value: function addClass(className) {}

      /**
       * Removes a class from the root element.
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * Returns true if the root element contains the given class name.
       * @param {string} className
       * @return {boolean}
       */

    }, {
      key: "hasClass",
      value: function hasClass(className) {}

      /**
       * Activates the bottom line, showing a focused state.
       */

    }, {
      key: "activateBottomLine",
      value: function activateBottomLine() {}

      /**
       * Deactivates the bottom line.
       */

    }, {
      key: "deactivateBottomLine",
      value: function deactivateBottomLine() {}

      /**
       * Returns the selected value of the select element.
       * @return {string}
       */

    }, {
      key: "getValue",
      value: function getValue() {}

      /**
       * Returns true if the direction of the root element is set to RTL.
       * @return {boolean}
       */

    }, {
      key: "isRtl",
      value: function isRtl() {}

      /**
       * Returns true if label element exists, false if it doesn't.
       * @return {boolean}
       */

    }, {
      key: "hasLabel",
      value: function hasLabel() {}

      /**
       * Floats label determined based off of the shouldFloat argument.
       * @param {boolean} shouldFloat
       */

    }, {
      key: "floatLabel",
      value: function floatLabel(shouldFloat) {}

      /**
       * Returns width of label in pixels, if the label exists.
       * @return {number}
       */

    }, {
      key: "getLabelWidth",
      value: function getLabelWidth() {}

      /**
       * Returns true if outline element exists, false if it doesn't.
       * @return {boolean}
       */

    }, {
      key: "hasOutline",
      value: function hasOutline() {}

      /**
       * Updates SVG Path and outline element based on the
       * label element width and RTL context, if the outline exists.
       * @param {number} labelWidth
       * @param {boolean=} isRtl
       */

    }, {
      key: "notchOutline",
      value: function notchOutline(labelWidth, isRtl) {}

      /**
       * Closes notch in outline element, if the outline exists.
       */

    }, {
      key: "closeOutline",
      value: function closeOutline() {}
    }]);
    return MDCSelectAdapter;
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

  /** @enum {string} */
  var cssClasses = {
    BOX: 'mdc-select--box',
    DISABLED: 'mdc-select--disabled',
    ROOT: 'mdc-select',
    OUTLINED: 'mdc-select--outlined'
  };

  /** @enum {string} */
  var strings = {
    CHANGE_EVENT: 'MDCSelect:change',
    LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
    LABEL_SELECTOR: '.mdc-floating-label',
    NATIVE_CONTROL_SELECTOR: '.mdc-select__native-control',
    OUTLINE_SELECTOR: '.mdc-notched-outline'
  };

  /** @enum {number} */
  var numbers = {
    LABEL_SCALE: 0.75
  };

  /**
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
   * @extends {MDCFoundation<!MDCSelectAdapter>}
   * @final
   */

  var MDCSelectFoundation = function (_MDCFoundation) {
    inherits(MDCSelectFoundation, _MDCFoundation);
    createClass(MDCSelectFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {string} */
      get: function get$$1() {
        return cssClasses;
      }

      /** @return enum {number} */

    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers;
      }

      /** @return enum {string} */

    }, {
      key: 'strings',
      get: function get$$1() {
        return strings;
      }

      /**
       * {@see MDCSelectAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCSelectAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCSelectAdapter} */{
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            hasClass: function hasClass() {
              return (/* className: string */false
              );
            },
            activateBottomLine: function activateBottomLine() {},
            deactivateBottomLine: function deactivateBottomLine() {},
            getValue: function getValue() {},
            isRtl: function isRtl() {
              return false;
            },
            hasLabel: function hasLabel() {
              return false;
            },
            floatLabel: function floatLabel() /* value: boolean */{},
            getLabelWidth: function getLabelWidth() {},
            hasOutline: function hasOutline() {
              return false;
            },
            notchOutline: function notchOutline() /* labelWidth: number, isRtl: boolean */{},
            closeOutline: function closeOutline() {}
          }
        );
      }

      /**
       * @param {!MDCSelectAdapter} adapter
       */

    }]);

    function MDCSelectFoundation(adapter) {
      classCallCheck(this, MDCSelectFoundation);
      return possibleConstructorReturn(this, (MDCSelectFoundation.__proto__ || Object.getPrototypeOf(MDCSelectFoundation)).call(this, _extends(MDCSelectFoundation.defaultAdapter, adapter)));
    }

    /**
     * Updates the styles of the select to show the disasbled state.
     * @param {boolean} disabled
     */


    createClass(MDCSelectFoundation, [{
      key: 'updateDisabledStyle',
      value: function updateDisabledStyle(disabled) {
        var DISABLED = MDCSelectFoundation.cssClasses.DISABLED;

        if (disabled) {
          this.adapter_.addClass(DISABLED);
        } else {
          this.adapter_.removeClass(DISABLED);
        }
      }

      /**
       * Handles value changes, via change event or programmatic updates.
       */

    }, {
      key: 'handleChange',
      value: function handleChange() {
        var optionHasValue = this.adapter_.getValue().length > 0;
        this.adapter_.floatLabel(optionHasValue);
        this.notchOutline(optionHasValue);
      }

      /**
       * Handles focus events from root element.
       */

    }, {
      key: 'handleFocus',
      value: function handleFocus() {
        this.adapter_.floatLabel(true);
        this.notchOutline(true);
        this.adapter_.activateBottomLine();
      }

      /**
       * Handles blur events from root element.
       */

    }, {
      key: 'handleBlur',
      value: function handleBlur() {
        this.handleChange();
        this.adapter_.deactivateBottomLine();
      }

      /**
       * Opens/closes the notched outline.
       * @param {boolean} openNotch
       */

    }, {
      key: 'notchOutline',
      value: function notchOutline(openNotch) {
        if (!this.adapter_.hasOutline() || !this.adapter_.hasLabel()) {
          return;
        }

        if (openNotch) {
          var labelScale = numbers.LABEL_SCALE;
          var labelWidth = this.adapter_.getLabelWidth() * labelScale;
          var isRtl = this.adapter_.isRtl();
          this.adapter_.notchOutline(labelWidth, isRtl);
        } else {
          this.adapter_.closeOutline();
        }
      }
    }]);
    return MDCSelectFoundation;
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

  var numbers$1 = {
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
        return numbers$1;
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
          }, numbers$1.FG_DEACTIVATION_MS);
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

  /**
   * @license
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

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Floating Label.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the floating label into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCFloatingLabelAdapter = function () {
    function MDCFloatingLabelAdapter() {
      classCallCheck(this, MDCFloatingLabelAdapter);
    }

    createClass(MDCFloatingLabelAdapter, [{
      key: "addClass",

      /**
       * Adds a class to the label element.
       * @param {string} className
       */
      value: function addClass(className) {}

      /**
       * Removes a class from the label element.
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * Returns the width of the label element.
       * @return {number}
       */

    }, {
      key: "getWidth",
      value: function getWidth() {}

      /**
       * Registers an event listener on the root element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(evtType, handler) {}

      /**
       * Deregisters an event listener on the root element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(evtType, handler) {}
    }]);
    return MDCFloatingLabelAdapter;
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

  /** @enum {string} */
  var cssClasses$2 = {
    LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
    LABEL_SHAKE: 'mdc-floating-label--shake'
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
   * @extends {MDCFoundation<!MDCFloatingLabelAdapter>}
   * @final
   */

  var MDCFloatingLabelFoundation = function (_MDCFoundation) {
    inherits(MDCFloatingLabelFoundation, _MDCFoundation);
    createClass(MDCFloatingLabelFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {string} */
      get: function get$$1() {
        return cssClasses$2;
      }

      /**
       * {@see MDCFloatingLabelAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCFloatingLabelAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCFloatingLabelAdapter} */{
            addClass: function addClass() {},
            removeClass: function removeClass() {},
            getWidth: function getWidth() {},
            registerInteractionHandler: function registerInteractionHandler() {},
            deregisterInteractionHandler: function deregisterInteractionHandler() {}
          }
        );
      }

      /**
       * @param {!MDCFloatingLabelAdapter} adapter
       */

    }]);

    function MDCFloatingLabelFoundation(adapter) {
      classCallCheck(this, MDCFloatingLabelFoundation);

      /** @private {function(!Event): undefined} */
      var _this = possibleConstructorReturn(this, (MDCFloatingLabelFoundation.__proto__ || Object.getPrototypeOf(MDCFloatingLabelFoundation)).call(this, _extends(MDCFloatingLabelFoundation.defaultAdapter, adapter)));

      _this.shakeAnimationEndHandler_ = function () {
        return _this.handleShakeAnimationEnd_();
      };
      return _this;
    }

    createClass(MDCFloatingLabelFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
      }

      /**
       * Returns the width of the label element.
       * @return {number}
       */

    }, {
      key: 'getWidth',
      value: function getWidth() {
        return this.adapter_.getWidth();
      }

      /**
       * Styles the label to produce the label shake for errors.
       * @param {boolean} shouldShake adds shake class if true,
       * otherwise removes shake class.
       */

    }, {
      key: 'shake',
      value: function shake(shouldShake) {
        var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

        if (shouldShake) {
          this.adapter_.addClass(LABEL_SHAKE);
        } else {
          this.adapter_.removeClass(LABEL_SHAKE);
        }
      }

      /**
       * Styles the label to float or dock.
       * @param {boolean} shouldFloat adds float class if true, otherwise remove
       * float and shake class to dock label.
       */

    }, {
      key: 'float',
      value: function float(shouldFloat) {
        var _MDCFloatingLabelFoun = MDCFloatingLabelFoundation.cssClasses,
            LABEL_FLOAT_ABOVE = _MDCFloatingLabelFoun.LABEL_FLOAT_ABOVE,
            LABEL_SHAKE = _MDCFloatingLabelFoun.LABEL_SHAKE;

        if (shouldFloat) {
          this.adapter_.addClass(LABEL_FLOAT_ABOVE);
        } else {
          this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
          this.adapter_.removeClass(LABEL_SHAKE);
        }
      }

      /**
       * Handles an interaction event on the root element.
       */

    }, {
      key: 'handleShakeAnimationEnd_',
      value: function handleShakeAnimationEnd_() {
        var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

        this.adapter_.removeClass(LABEL_SHAKE);
      }
    }]);
    return MDCFloatingLabelFoundation;
  }(MDCFoundation);

  //

  var script$1 = {
    name: 'mdc-select-label',
    data: function data() {
      return {
        labelClasses: {}
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCFloatingLabelFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.labelClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.labelClasses, className);
        },
        getWidth: function getWidth() {
          return _this.$el.offsetWidth;
        },
        registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
          _this.$el.addEventListener(evtType, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
          _this.$el.removeEventListener(evtType, handler);
        }
      });
      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      var foundation = this.foundation;
      this.foundation = null;
      foundation.destroy();
    }
  };

  /* script */
  var __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function __vue_render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("label", { staticClass: "mdc-floating-label", class: _vm.labelClasses }, [_vm._t("default")], 2);
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
    component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\select\\mdc-select-label.vue";

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

  var SelectLabel = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

  /**
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
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
   * Adapter for MDC TextField Line Ripple.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the line ripple into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCLineRippleAdapter = function () {
    function MDCLineRippleAdapter() {
      classCallCheck(this, MDCLineRippleAdapter);
    }

    createClass(MDCLineRippleAdapter, [{
      key: "addClass",

      /**
       * Adds a class to the line ripple element.
       * @param {string} className
       */
      value: function addClass(className) {}

      /**
       * Removes a class from the line ripple element.
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * @param {string} className
       * @return {boolean}
       */

    }, {
      key: "hasClass",
      value: function hasClass(className) {}

      /**
       * Sets the style property with propertyName to value on the root element.
       * @param {string} propertyName
       * @param {string} value
       */

    }, {
      key: "setStyle",
      value: function setStyle(propertyName, value) {}

      /**
       * Registers an event listener on the line ripple element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerEventHandler",
      value: function registerEventHandler(evtType, handler) {}

      /**
       * Deregisters an event listener on the line ripple element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterEventHandler",
      value: function deregisterEventHandler(evtType, handler) {}
    }]);
    return MDCLineRippleAdapter;
  }();

  /**
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
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

  /** @enum {string} */
  var cssClasses$3 = {
    LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
    LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating'
  };

  /**
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
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
   * @extends {MDCFoundation<!MDCLineRippleAdapter>}
   * @final
   */

  var MDCLineRippleFoundation = function (_MDCFoundation) {
    inherits(MDCLineRippleFoundation, _MDCFoundation);
    createClass(MDCLineRippleFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {string} */
      get: function get$$1() {
        return cssClasses$3;
      }

      /**
       * {@see MDCLineRippleAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCLineRippleAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCLineRippleAdapter} */{
            addClass: function addClass() {},
            removeClass: function removeClass() {},
            hasClass: function hasClass() {},
            setStyle: function setStyle() {},
            registerEventHandler: function registerEventHandler() {},
            deregisterEventHandler: function deregisterEventHandler() {}
          }
        );
      }

      /**
       * @param {!MDCLineRippleAdapter=} adapter
       */

    }]);

    function MDCLineRippleFoundation() {
      var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /** @type {!MDCLineRippleAdapter} */{};
      classCallCheck(this, MDCLineRippleFoundation);

      /** @private {function(!Event): undefined} */
      var _this = possibleConstructorReturn(this, (MDCLineRippleFoundation.__proto__ || Object.getPrototypeOf(MDCLineRippleFoundation)).call(this, _extends(MDCLineRippleFoundation.defaultAdapter, adapter)));

      _this.transitionEndHandler_ = function (evt) {
        return _this.handleTransitionEnd(evt);
      };
      return _this;
    }

    createClass(MDCLineRippleFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
      }

      /**
       * Activates the line ripple
       */

    }, {
      key: 'activate',
      value: function activate() {
        this.adapter_.removeClass(cssClasses$3.LINE_RIPPLE_DEACTIVATING);
        this.adapter_.addClass(cssClasses$3.LINE_RIPPLE_ACTIVE);
      }

      /**
       * Sets the center of the ripple animation to the given X coordinate.
       * @param {number} xCoordinate
       */

    }, {
      key: 'setRippleCenter',
      value: function setRippleCenter(xCoordinate) {
        this.adapter_.setStyle('transform-origin', xCoordinate + 'px center');
      }

      /**
       * Deactivates the line ripple
       */

    }, {
      key: 'deactivate',
      value: function deactivate() {
        this.adapter_.addClass(cssClasses$3.LINE_RIPPLE_DEACTIVATING);
      }

      /**
       * Handles a transition end event
       * @param {!Event} evt
       */

    }, {
      key: 'handleTransitionEnd',
      value: function handleTransitionEnd(evt) {
        // Wait for the line ripple to be either transparent or opaque
        // before emitting the animation end event
        var isDeactivating = this.adapter_.hasClass(cssClasses$3.LINE_RIPPLE_DEACTIVATING);

        if (evt.propertyName === 'opacity') {
          if (isDeactivating) {
            this.adapter_.removeClass(cssClasses$3.LINE_RIPPLE_ACTIVE);
            this.adapter_.removeClass(cssClasses$3.LINE_RIPPLE_DEACTIVATING);
          }
        }
      }
    }]);
    return MDCLineRippleFoundation;
  }(MDCFoundation);

  //

  var script$2 = {
    name: 'mdc-select-line-ripple',
    data: function data() {
      return {
        lineClasses: {},
        lineStyles: {}
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCLineRippleFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.lineClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.lineClasses, className);
        },
        hasClass: function hasClass(className) {
          _this.$el.classList.contains(className);
        },
        setStyle: function setStyle(name, value) {
          _this.$set(_this.lineStyles, name, value);
        },
        registerEventHandler: function registerEventHandler(evtType, handler) {
          _this.$el.addEventListener(evtType, handler);
        },
        deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
          _this.$el.removeEventListener(evtType, handler);
        }
      });
      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      var foundation = this.foundation;
      this.foundation = null;
      foundation.destroy();
    }
  };

  /* script */
  var __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function __vue_render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", {
      staticClass: "mdc-line-ripple",
      class: _vm.lineClasses,
      style: _vm.lineStyles
    });
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
    component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\select\\mdc-select-line-ripple.vue";

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

  var SelectLineRiple = __vue_normalize__$2({ render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, __vue_create_injector__$2, undefined);

  /**
   * @license
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

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Notched Outline.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the Notched Outline into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCNotchedOutlineAdapter = function () {
    function MDCNotchedOutlineAdapter() {
      classCallCheck(this, MDCNotchedOutlineAdapter);
    }

    createClass(MDCNotchedOutlineAdapter, [{
      key: "getWidth",

      /**
       * Returns the width of the root element.
       * @return {number}
       */
      value: function getWidth() {}

      /**
       * Returns the height of the root element.
       * @return {number}
       */

    }, {
      key: "getHeight",
      value: function getHeight() {}

      /**
       * Adds a class to the root element.
       * @param {string} className
       */

    }, {
      key: "addClass",
      value: function addClass(className) {}

      /**
       * Removes a class from the root element.
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * Sets the "d" attribute of the outline element's SVG path.
       * @param {string} value
       */

    }, {
      key: "setOutlinePathAttr",
      value: function setOutlinePathAttr(value) {}

      /**
       * Returns the idle outline element's computed style value of the given css property `propertyName`.
       * We achieve this via `getComputedStyle(...).getPropertyValue(propertyName)`.
       * @param {string} propertyName
       * @return {string}
       */

    }, {
      key: "getIdleOutlineStyleValue",
      value: function getIdleOutlineStyleValue(propertyName) {}
    }]);
    return MDCNotchedOutlineAdapter;
  }();

  /**
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
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

  /** @enum {string} */
  var strings$2 = {
    PATH_SELECTOR: '.mdc-notched-outline__path',
    IDLE_OUTLINE_SELECTOR: '.mdc-notched-outline__idle'
  };

  /** @enum {string} */
  var cssClasses$4 = {
    OUTLINE_NOTCHED: 'mdc-notched-outline--notched'
  };

  /**
   * @license
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

  /**
   * @extends {MDCFoundation<!MDCNotchedOutlineAdapter>}
   * @final
   */

  var MDCNotchedOutlineFoundation = function (_MDCFoundation) {
    inherits(MDCNotchedOutlineFoundation, _MDCFoundation);
    createClass(MDCNotchedOutlineFoundation, null, [{
      key: 'strings',

      /** @return enum {string} */
      get: function get$$1() {
        return strings$2;
      }

      /** @return enum {string} */

    }, {
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$4;
      }

      /**
       * {@see MDCNotchedOutlineAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCNotchedOutlineAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCNotchedOutlineAdapter} */{
            getWidth: function getWidth() {},
            getHeight: function getHeight() {},
            addClass: function addClass() {},
            removeClass: function removeClass() {},
            setOutlinePathAttr: function setOutlinePathAttr() {},
            getIdleOutlineStyleValue: function getIdleOutlineStyleValue() {}
          }
        );
      }

      /**
       * @param {!MDCNotchedOutlineAdapter} adapter
       */

    }]);

    function MDCNotchedOutlineFoundation(adapter) {
      classCallCheck(this, MDCNotchedOutlineFoundation);
      return possibleConstructorReturn(this, (MDCNotchedOutlineFoundation.__proto__ || Object.getPrototypeOf(MDCNotchedOutlineFoundation)).call(this, _extends(MDCNotchedOutlineFoundation.defaultAdapter, adapter)));
    }

    /**
     * Adds the outline notched selector and updates the notch width
     * calculated based off of notchWidth and isRtl.
     * @param {number} notchWidth
     * @param {boolean=} isRtl
     */


    createClass(MDCNotchedOutlineFoundation, [{
      key: 'notch',
      value: function notch(notchWidth) {
        var isRtl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

        this.adapter_.addClass(OUTLINE_NOTCHED);
        this.updateSvgPath_(notchWidth, isRtl);
      }

      /**
       * Removes notched outline selector to close the notch in the outline.
       */

    }, {
      key: 'closeNotch',
      value: function closeNotch() {
        var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

        this.adapter_.removeClass(OUTLINE_NOTCHED);
      }

      /**
       * Updates the SVG path of the focus outline element based on the notchWidth
       * and the RTL context.
       * @param {number} notchWidth
       * @param {boolean=} isRtl
       * @private
       */

    }, {
      key: 'updateSvgPath_',
      value: function updateSvgPath_(notchWidth, isRtl) {
        // Fall back to reading a specific corner's style because Firefox doesn't report the style on border-radius.
        var radiusStyleValue = this.adapter_.getIdleOutlineStyleValue('border-radius') || this.adapter_.getIdleOutlineStyleValue('border-top-left-radius');
        var radius = parseFloat(radiusStyleValue);
        var width = this.adapter_.getWidth();
        var height = this.adapter_.getHeight();
        var cornerWidth = radius + 1.2;
        var leadingStrokeLength = Math.abs(11 - cornerWidth);
        var paddedNotchWidth = notchWidth + 8;

        // The right, bottom, and left sides of the outline follow the same SVG path.
        var pathMiddle = 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius + 'v' + (height - 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius + 'h' + (-width + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius + 'v' + (-height + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius;

        var path = void 0;
        if (!isRtl) {
          path = 'M' + (cornerWidth + leadingStrokeLength + paddedNotchWidth) + ',' + 1 + 'h' + (width - 2 * cornerWidth - paddedNotchWidth - leadingStrokeLength) + pathMiddle + 'h' + leadingStrokeLength;
        } else {
          path = 'M' + (width - cornerWidth - leadingStrokeLength) + ',' + 1 + 'h' + leadingStrokeLength + pathMiddle + 'h' + (width - 2 * cornerWidth - paddedNotchWidth - leadingStrokeLength);
        }

        this.adapter_.setOutlinePathAttr(path);
      }
    }]);
    return MDCNotchedOutlineFoundation;
  }(MDCFoundation);

  //

  var script$3 = {
    name: 'mdc-select-notched-outline',
    data: function data() {
      return {
        outlinedClasses: {}
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCNotchedOutlineFoundation({
        getWidth: function getWidth() {
          return _this.$refs.outlined.offsetWidth;
        },
        getHeight: function getHeight() {
          return _this.$refs.outlined.offsetHeight;
        },
        addClass: function addClass(className) {
          _this.$set(_this.outlinedClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.outlinedClasses, className);
        },
        setOutlinePathAttr: function setOutlinePathAttr(value) {
          var path = _this.$refs.outlinedPath;
          path.setAttribute('d', value);
        },
        getIdleOutlineStyleValue: function getIdleOutlineStyleValue(propertyName) {
          return window.getComputedStyle(_this.$refs.outlinedIdle).getPropertyValue(propertyName);
        }
      });
      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      var foundation = this.foundation;
      this.foundation = null;
      foundation.destroy();
    }
  };

  /* script */
  var __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$3 = function __vue_render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [_c("div", {
      ref: "outlined",
      staticClass: "mdc-notched-outline",
      class: _vm.outlinedClasses
    }, [_c("svg", [_c("path", {
      ref: "outlinedPath",
      staticClass: "mdc-notched-outline__path"
    })])]), _vm._v(" "), _c("div", { ref: "outlinedIdle", staticClass: "mdc-notched-outline__idle" })]);
  };
  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* component normalizer */
  function __vue_normalize__$3(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\select\\mdc-select-notched-outline.vue";

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
  function __vue_create_injector__$3() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$3.styles || (__vue_create_injector__$3.styles = {});
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

  var SelectNotchedOutline = __vue_normalize__$3({ render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, __vue_create_injector__$3, undefined);

  //

  var script$4 = {
    name: 'mdc-select',
    components: {
      SelectLabel: SelectLabel,
      SelectLineRiple: SelectLineRiple,
      SelectNotchedOutline: SelectNotchedOutline
    },
    inheritAttrs: false,
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: String,
      disabled: Boolean,
      label: String,
      outlined: Boolean,
      id: { type: String }
    },
    data: function data() {
      return {
        styles: {},
        classes: {}
      };
    },

    computed: {
      rootClasses: function rootClasses() {
        return _extends({
          'mdc-select--box': !this.outlined,
          'mdc-select--outlined': this.outlined
        }, this.classes);
      },
      listeners: function listeners() {
        var _this = this;

        return _extends({}, this.$listeners, {
          change: function change(event) {
            return _this.onChange(event);
          }
        });
      }
    },
    watch: {
      disabled: function disabled(value) {
        this.foundation && this.foundation.updateDisabledStyle(value);
      },

      value: 'refreshIndex'
    },
    mounted: function mounted() {
      var _this2 = this;

      this.foundation = new MDCSelectFoundation({
        addClass: function addClass(className) {
          return _this2.$set(_this2.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this2.$delete(_this2.classes, className);
        },
        hasClass: function hasClass(className) {
          return _this2.$el.classList.contains(className);
        },
        activateBottomLine: function activateBottomLine() {
          if (_this2.$refs.line) {
            _this2.$refs.line.foundation.activate();
          }
        },
        deactivateBottomLine: function deactivateBottomLine() {
          if (_this2.$refs.line) {
            _this2.$refs.line.foundation.deactivate();
          }
        },
        getValue: function getValue() {
          return _this2.$refs.native_control.value;
        },
        isRtl: function isRtl() {
          return window.getComputedStyle(_this2.$el).getPropertyValue('direction') === 'rtl';
        },
        notchOutline: function notchOutline(labelWidth, isRtl) {
          if (_this2.$refs.outline) {
            _this2.$refs.outline.foundation.notch(labelWidth, isRtl);
          }
        },
        closeOutline: function closeOutline() {
          if (_this2.$refs.outline) {
            _this2.$refs.outline.foundation.closeNotch();
          }
        },
        hasOutline: function hasOutline() {
          return !!_this2.$refs.outline;
        },
        floatLabel: function floatLabel(value) {
          if (_this2.$refs.label) {
            _this2.$refs.label.foundation.float(value);
          }
        },
        hasLabel: function hasLabel() {
          return !!_this2.$refs.label;
        },
        getLabelWidth: function getLabelWidth() {
          if (_this2.$refs.label) {
            return _this2.$refs.label.foundation.getWidth();
          }
        }
      });

      this.foundation.init();
      this.foundation.handleChange();

      // initial sync with DOM
      this.refreshIndex();
      this.slotObserver = new MutationObserver(function () {
        return _this2.refreshIndex();
      });
      this.slotObserver.observe(this.$refs.native_control, {
        childList: true,
        subtree: true
      });

      this.ripple = new RippleBase(this);
      this.ripple.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.slotObserver.disconnect();

      var foundation = this.foundation;
      this.foundation = null;
      foundation.destroy();

      this.ripple && this.ripple.destroy();
    },

    methods: {
      refreshIndex: function refreshIndex() {
        var _this3 = this;

        var options = [].concat(toConsumableArray(this.$refs.native_control.querySelectorAll('option')));

        var idx = options.findIndex(function (_ref) {
          var value = _ref.value;

          return _this3.value === value;
        });

        if (this.$refs.native_control.selectedIndex !== idx) {
          this.$refs.native_control.selectedIndex = idx;
          this.foundation.handleChange();
        }
      },
      onChange: function onChange(event) {
        this.foundation.handleChange();
        this.$emit('change', event.target.value);
      }
    }
  };

  /* script */
  var __vue_script__$4 = script$4;

  /* template */
  var __vue_render__$4 = function __vue_render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", {
      staticClass: "mdc-select",
      class: _vm.rootClasses,
      style: _vm.styles,
      attrs: { id: _vm.id }
    }, [_c("select", _vm._g(_vm._b({
      ref: "native_control",
      staticClass: "mdc-select__native-control",
      attrs: { disabled: _vm.disabled }
    }, "select", _vm.$attrs, false), _vm.listeners), [!!_vm.label ? _c("option", {
      staticClass: "mdc-option",
      attrs: { value: "", disabled: "", selected: "" }
    }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2), _vm._v(" "), _vm.label ? _c("select-label", { ref: "label" }, [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), !_vm.outlined ? _c("select-line-riple", { ref: "line" }) : _vm._e(), _vm._v(" "), _vm.outlined ? _c("select-notched-outline", { ref: "outline" }) : _vm._e()], 1);
  };
  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$4 = undefined;
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* component normalizer */
  function __vue_normalize__$4(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\select\\mdc-select.vue";

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
  function __vue_create_injector__$4() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$4.styles || (__vue_create_injector__$4.styles = {});
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

  var mdcSelect = __vue_normalize__$4({ render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, __vue_create_injector__$4, undefined);

  var plugin = BasePlugin({
    mdcSelect: mdcSelect
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1lbGVtZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS91bmlxdWVpZC1taXhpbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvc2VsZWN0L2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3NlbGVjdC9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3NlbGVjdC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL3V0aWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9yaXBwbGUvbWRjLXJpcHBsZS1iYXNlLmpzIiwiLi4vLi4vY29tcG9uZW50cy9yaXBwbGUvbWRjLXJpcHBsZS52dWUiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Zsb2F0aW5nLWxhYmVsL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Zsb2F0aW5nLWxhYmVsL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZmxvYXRpbmctbGFiZWwvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L21kYy1zZWxlY3QtbGFiZWwudnVlIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saW5lLXJpcHBsZS9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saW5lLXJpcHBsZS9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2xpbmUtcmlwcGxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9tZGMtc2VsZWN0LWxpbmUtcmlwcGxlLnZ1ZSIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL25vdGNoZWQtb3V0bGluZS9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL25vdGNoZWQtb3V0bGluZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9zZWxlY3QvbWRjLXNlbGVjdC1ub3RjaGVkLW91dGxpbmUudnVlIiwiLi4vLi4vY29tcG9uZW50cy9zZWxlY3QvbWRjLXNlbGVjdC52dWUiLCIuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdChwbHVnaW4pIHtcclxuICAvLyBBdXRvLWluc3RhbGxcclxuICBsZXQgX1Z1ZSA9IG51bGxcclxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIF9WdWUgPSB3aW5kb3cuVnVlXHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cclxuICAgIF9WdWUgPSBnbG9iYWwuVnVlXHJcbiAgfVxyXG4gIGlmIChfVnVlKSB7XHJcbiAgICBfVnVlLnVzZShwbHVnaW4pXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luKGNvbXBvbmVudHMpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcclxuICAgIGluc3RhbGw6IHZtID0+IHtcclxuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXHJcbiAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRzXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBDdXN0b21FbGVtZW50ID0ge1xyXG4gIGZ1bmN0aW9uYWw6IHRydWUsXHJcbiAgcmVuZGVyKGNyZWF0ZUVsZW1lbnQsIGNvbnRleHQpIHtcclxuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFxyXG4gICAgICBjb250ZXh0LnByb3BzLmlzIHx8IGNvbnRleHQucHJvcHMudGFnIHx8ICdkaXYnLFxyXG4gICAgICBjb250ZXh0LmRhdGEsXHJcbiAgICAgIGNvbnRleHQuY2hpbGRyZW5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBDdXN0b21FbGVtZW50TWl4aW4gPSB7XHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgQ3VzdG9tRWxlbWVudFxyXG4gIH1cclxufVxyXG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XHJcbiAgbGV0IGV2dFxyXG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XHJcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcclxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXHJcbiAgICB9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxyXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxyXG4gIH1cclxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcclxufVxyXG4iLCJjb25zdCBzY29wZSA9XHJcbiAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcigweDEwMDAwMDAwKSkudG9TdHJpbmcoKSArICctJ1xyXG5cclxuZXhwb3J0IGNvbnN0IFZNQVVuaXF1ZUlkTWl4aW4gPSB7XHJcbiAgYmVmb3JlQ3JlYXRlKCkge1xyXG4gICAgdGhpcy52bWFfdWlkXyA9IHNjb3BlICsgdGhpcy5fdWlkXHJcbiAgfVxyXG59XHJcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcblxuLyoqXG4gKiBAdGVtcGxhdGUgRlxuICovXG5jbGFzcyBNRENDb21wb25lbnQge1xuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcmV0dXJuIHshTURDQ29tcG9uZW50fVxuICAgKi9cbiAgc3RhdGljIGF0dGFjaFRvKHJvb3QpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHdoaWNoIGV4dGVuZCBNRENCYXNlIHNob3VsZCBwcm92aWRlIGFuIGF0dGFjaFRvKCkgbWV0aG9kIHRoYXQgdGFrZXMgYSByb290IGVsZW1lbnQgYW5kXG4gICAgLy8gcmV0dXJucyBhbiBpbnN0YW50aWF0ZWQgY29tcG9uZW50IHdpdGggaXRzIHJvb3Qgc2V0IHRvIHRoYXQgZWxlbWVudC4gQWxzbyBub3RlIHRoYXQgaW4gdGhlIGNhc2VzIG9mXG4gICAgLy8gc3ViY2xhc3NlcywgYW4gZXhwbGljaXQgZm91bmRhdGlvbiBjbGFzcyB3aWxsIG5vdCBoYXZlIHRvIGJlIHBhc3NlZCBpbjsgaXQgd2lsbCBzaW1wbHkgYmUgaW5pdGlhbGl6ZWRcbiAgICAvLyBmcm9tIGdldERlZmF1bHRGb3VuZGF0aW9uKCkuXG4gICAgcmV0dXJuIG5ldyBNRENDb21wb25lbnQocm9vdCwgbmV3IE1EQ0ZvdW5kYXRpb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcGFyYW0ge0Y9fSBmb3VuZGF0aW9uXG4gICAqIEBwYXJhbSB7Li4uP30gYXJnc1xuICAgKi9cbiAgY29uc3RydWN0b3Iocm9vdCwgZm91bmRhdGlvbiA9IHVuZGVmaW5lZCwgLi4uYXJncykge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshRWxlbWVudH0gKi9cbiAgICB0aGlzLnJvb3RfID0gcm9vdDtcbiAgICB0aGlzLmluaXRpYWxpemUoLi4uYXJncyk7XG4gICAgLy8gTm90ZSB0aGF0IHdlIGluaXRpYWxpemUgZm91bmRhdGlvbiBoZXJlIGFuZCBub3Qgd2l0aGluIHRoZSBjb25zdHJ1Y3RvcidzIGRlZmF1bHQgcGFyYW0gc28gdGhhdFxuICAgIC8vIHRoaXMucm9vdF8gaXMgZGVmaW5lZCBhbmQgY2FuIGJlIHVzZWQgd2l0aGluIHRoZSBmb3VuZGF0aW9uIGNsYXNzLlxuICAgIC8qKiBAcHJvdGVjdGVkIHshRn0gKi9cbiAgICB0aGlzLmZvdW5kYXRpb25fID0gZm91bmRhdGlvbiA9PT0gdW5kZWZpbmVkID8gdGhpcy5nZXREZWZhdWx0Rm91bmRhdGlvbigpIDogZm91bmRhdGlvbjtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmluaXQoKTtcbiAgICB0aGlzLmluaXRpYWxTeW5jV2l0aERPTSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgvKiAuLi5hcmdzICovKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBjYW4gb3ZlcnJpZGUgdGhpcyB0byBkbyBhbnkgYWRkaXRpb25hbCBzZXR1cCB3b3JrIHRoYXQgd291bGQgYmUgY29uc2lkZXJlZCBwYXJ0IG9mIGFcbiAgICAvLyBcImNvbnN0cnVjdG9yXCIuIEVzc2VudGlhbGx5LCBpdCBpcyBhIGhvb2sgaW50byB0aGUgcGFyZW50IGNvbnN0cnVjdG9yIGJlZm9yZSB0aGUgZm91bmRhdGlvbiBpc1xuICAgIC8vIGluaXRpYWxpemVkLiBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgYmVzaWRlcyByb290IGFuZCBmb3VuZGF0aW9uIHdpbGwgYmUgcGFzc2VkIGluIGhlcmUuXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUZ9IGZvdW5kYXRpb25cbiAgICovXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkIGZvdW5kYXRpb24gY2xhc3MgZm9yIHRoZVxuICAgIC8vIGNvbXBvbmVudC5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1N1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSBnZXREZWZhdWx0Rm91bmRhdGlvbiB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkICcgK1xuICAgICAgJ2ZvdW5kYXRpb24gY2xhc3MnKTtcbiAgfVxuXG4gIGluaXRpYWxTeW5jV2l0aERPTSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCBpZiB0aGV5IG5lZWQgdG8gcGVyZm9ybSB3b3JrIHRvIHN5bmNocm9uaXplIHdpdGggYSBob3N0IERPTVxuICAgIC8vIG9iamVjdC4gQW4gZXhhbXBsZSBvZiB0aGlzIHdvdWxkIGJlIGEgZm9ybSBjb250cm9sIHdyYXBwZXIgdGhhdCBuZWVkcyB0byBzeW5jaHJvbml6ZSBpdHMgaW50ZXJuYWwgc3RhdGVcbiAgICAvLyB0byBzb21lIHByb3BlcnR5IG9yIGF0dHJpYnV0ZSBvZiB0aGUgaG9zdCBET00uIFBsZWFzZSBub3RlOiB0aGlzIGlzICpub3QqIHRoZSBwbGFjZSB0byBwZXJmb3JtIERPTVxuICAgIC8vIHJlYWRzL3dyaXRlcyB0aGF0IHdvdWxkIGNhdXNlIGxheW91dCAvIHBhaW50LCBhcyB0aGlzIGlzIGNhbGxlZCBzeW5jaHJvbm91c2x5IGZyb20gd2l0aGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtYXkgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJlbGVhc2UgYW55IHJlc291cmNlcyAvIGRlcmVnaXN0ZXIgYW55IGxpc3RlbmVycyB0aGV5IGhhdmVcbiAgICAvLyBhdHRhY2hlZC4gQW4gZXhhbXBsZSBvZiB0aGlzIG1pZ2h0IGJlIGRlcmVnaXN0ZXJpbmcgYSByZXNpemUgZXZlbnQgZnJvbSB0aGUgd2luZG93IG9iamVjdC5cbiAgICB0aGlzLmZvdW5kYXRpb25fLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byBhZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIGxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIHJlbW92ZSBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogdW5saXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICB1bmxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIGEgY3Jvc3MtYnJvd3Nlci1jb21wYXRpYmxlIGN1c3RvbSBldmVudCBmcm9tIHRoZSBjb21wb25lbnQgcm9vdCBvZiB0aGUgZ2l2ZW4gdHlwZSxcbiAgICogd2l0aCB0aGUgZ2l2ZW4gZGF0YS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshT2JqZWN0fSBldnREYXRhXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IHNob3VsZEJ1YmJsZVxuICAgKi9cbiAgZW1pdChldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICAgIGxldCBldnQ7XG4gICAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgICBidWJibGVzOiBzaG91bGRCdWJibGUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpO1xuICAgIH1cblxuICAgIHRoaXMucm9vdF8uZGlzcGF0Y2hFdmVudChldnQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0NvbXBvbmVudDtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0NvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudCc7XG5cbmV4cG9ydCB7TURDRm91bmRhdGlvbiwgTURDQ29tcG9uZW50fTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgU2VsZWN0LiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGNsYXNzZXNcbiAqIC0gZG9tXG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5cbmNsYXNzIE1EQ1NlbGVjdEFkYXB0ZXIge1xuICAvKipcbiAgICogQWRkcyBjbGFzcyB0byByb290IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHJvb3QgZWxlbWVudCBjb250YWlucyB0aGUgZ2l2ZW4gY2xhc3MgbmFtZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZXMgdGhlIGJvdHRvbSBsaW5lLCBzaG93aW5nIGEgZm9jdXNlZCBzdGF0ZS5cbiAgICovXG4gIGFjdGl2YXRlQm90dG9tTGluZSgpIHt9XG5cbiAgLyoqXG4gICAqIERlYWN0aXZhdGVzIHRoZSBib3R0b20gbGluZS5cbiAgICovXG4gIGRlYWN0aXZhdGVCb3R0b21MaW5lKCkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc2VsZWN0ZWQgdmFsdWUgb2YgdGhlIHNlbGVjdCBlbGVtZW50LlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBnZXRWYWx1ZSgpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZGlyZWN0aW9uIG9mIHRoZSByb290IGVsZW1lbnQgaXMgc2V0IHRvIFJUTC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzUnRsKCkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGxhYmVsIGVsZW1lbnQgZXhpc3RzLCBmYWxzZSBpZiBpdCBkb2Vzbid0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzTGFiZWwoKSB7fVxuXG4gIC8qKlxuICAgKiBGbG9hdHMgbGFiZWwgZGV0ZXJtaW5lZCBiYXNlZCBvZmYgb2YgdGhlIHNob3VsZEZsb2F0IGFyZ3VtZW50LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNob3VsZEZsb2F0XG4gICAqL1xuICBmbG9hdExhYmVsKHNob3VsZEZsb2F0KSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdpZHRoIG9mIGxhYmVsIGluIHBpeGVscywgaWYgdGhlIGxhYmVsIGV4aXN0cy5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0TGFiZWxXaWR0aCgpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBvdXRsaW5lIGVsZW1lbnQgZXhpc3RzLCBmYWxzZSBpZiBpdCBkb2Vzbid0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzT3V0bGluZSgpIHt9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgU1ZHIFBhdGggYW5kIG91dGxpbmUgZWxlbWVudCBiYXNlZCBvbiB0aGVcbiAgICogbGFiZWwgZWxlbWVudCB3aWR0aCBhbmQgUlRMIGNvbnRleHQsIGlmIHRoZSBvdXRsaW5lIGV4aXN0cy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGxhYmVsV2lkdGhcbiAgICogQHBhcmFtIHtib29sZWFuPX0gaXNSdGxcbiAgICovXG4gIG5vdGNoT3V0bGluZShsYWJlbFdpZHRoLCBpc1J0bCkge31cblxuICAvKipcbiAgICogQ2xvc2VzIG5vdGNoIGluIG91dGxpbmUgZWxlbWVudCwgaWYgdGhlIG91dGxpbmUgZXhpc3RzLlxuICAgKi9cbiAgY2xvc2VPdXRsaW5lKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDU2VsZWN0QWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIEJPWDogJ21kYy1zZWxlY3QtLWJveCcsXG4gIERJU0FCTEVEOiAnbWRjLXNlbGVjdC0tZGlzYWJsZWQnLFxuICBST09UOiAnbWRjLXNlbGVjdCcsXG4gIE9VVExJTkVEOiAnbWRjLXNlbGVjdC0tb3V0bGluZWQnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBDSEFOR0VfRVZFTlQ6ICdNRENTZWxlY3Q6Y2hhbmdlJyxcbiAgTElORV9SSVBQTEVfU0VMRUNUT1I6ICcubWRjLWxpbmUtcmlwcGxlJyxcbiAgTEFCRUxfU0VMRUNUT1I6ICcubWRjLWZsb2F0aW5nLWxhYmVsJyxcbiAgTkFUSVZFX0NPTlRST0xfU0VMRUNUT1I6ICcubWRjLXNlbGVjdF9fbmF0aXZlLWNvbnRyb2wnLFxuICBPVVRMSU5FX1NFTEVDVE9SOiAnLm1kYy1ub3RjaGVkLW91dGxpbmUnLFxufTtcblxuLyoqIEBlbnVtIHtudW1iZXJ9ICovXG5jb25zdCBudW1iZXJzID0ge1xuICBMQUJFTF9TQ0FMRTogMC43NSxcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge01EQ0ZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2luZGV4Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQgTURDU2VsZWN0QWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1NlbGVjdEFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ1NlbGVjdEZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVtIHtudW1iZXJ9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ1NlbGVjdEFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDU2VsZWN0QWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IU1EQ1NlbGVjdEFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgaGFzQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4gZmFsc2UsXG4gICAgICBhY3RpdmF0ZUJvdHRvbUxpbmU6ICgpID0+IHt9LFxuICAgICAgZGVhY3RpdmF0ZUJvdHRvbUxpbmU6ICgpID0+IHt9LFxuICAgICAgZ2V0VmFsdWU6ICgpID0+IHt9LFxuICAgICAgaXNSdGw6ICgpID0+IGZhbHNlLFxuICAgICAgaGFzTGFiZWw6ICgpID0+IGZhbHNlLFxuICAgICAgZmxvYXRMYWJlbDogKC8qIHZhbHVlOiBib29sZWFuICovKSA9PiB7fSxcbiAgICAgIGdldExhYmVsV2lkdGg6ICgpID0+IHt9LFxuICAgICAgaGFzT3V0bGluZTogKCkgPT4gZmFsc2UsXG4gICAgICBub3RjaE91dGxpbmU6ICgvKiBsYWJlbFdpZHRoOiBudW1iZXIsIGlzUnRsOiBib29sZWFuICovKSA9PiB7fSxcbiAgICAgIGNsb3NlT3V0bGluZTogKCkgPT4ge30sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTURDU2VsZWN0QWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDU2VsZWN0Rm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHN0eWxlcyBvZiB0aGUgc2VsZWN0IHRvIHNob3cgdGhlIGRpc2FzYmxlZCBzdGF0ZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlZFxuICAgKi9cbiAgdXBkYXRlRGlzYWJsZWRTdHlsZShkaXNhYmxlZCkge1xuICAgIGNvbnN0IHtESVNBQkxFRH0gPSBNRENTZWxlY3RGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKERJU0FCTEVEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhESVNBQkxFRCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdmFsdWUgY2hhbmdlcywgdmlhIGNoYW5nZSBldmVudCBvciBwcm9ncmFtbWF0aWMgdXBkYXRlcy5cbiAgICovXG4gIGhhbmRsZUNoYW5nZSgpIHtcbiAgICBjb25zdCBvcHRpb25IYXNWYWx1ZSA9IHRoaXMuYWRhcHRlcl8uZ2V0VmFsdWUoKS5sZW5ndGggPiAwO1xuICAgIHRoaXMuYWRhcHRlcl8uZmxvYXRMYWJlbChvcHRpb25IYXNWYWx1ZSk7XG4gICAgdGhpcy5ub3RjaE91dGxpbmUob3B0aW9uSGFzVmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgZm9jdXMgZXZlbnRzIGZyb20gcm9vdCBlbGVtZW50LlxuICAgKi9cbiAgaGFuZGxlRm9jdXMoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5mbG9hdExhYmVsKHRydWUpO1xuICAgIHRoaXMubm90Y2hPdXRsaW5lKHRydWUpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWN0aXZhdGVCb3R0b21MaW5lKCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBibHVyIGV2ZW50cyBmcm9tIHJvb3QgZWxlbWVudC5cbiAgICovXG4gIGhhbmRsZUJsdXIoKSB7XG4gICAgdGhpcy5oYW5kbGVDaGFuZ2UoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlYWN0aXZhdGVCb3R0b21MaW5lKCk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMvY2xvc2VzIHRoZSBub3RjaGVkIG91dGxpbmUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3Blbk5vdGNoXG4gICAqL1xuICBub3RjaE91dGxpbmUob3Blbk5vdGNoKSB7XG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmhhc091dGxpbmUoKSB8fCAhdGhpcy5hZGFwdGVyXy5oYXNMYWJlbCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG9wZW5Ob3RjaCkge1xuICAgICAgY29uc3QgbGFiZWxTY2FsZSA9IG51bWJlcnMuTEFCRUxfU0NBTEU7XG4gICAgICBjb25zdCBsYWJlbFdpZHRoID0gdGhpcy5hZGFwdGVyXy5nZXRMYWJlbFdpZHRoKCkgKiBsYWJlbFNjYWxlO1xuICAgICAgY29uc3QgaXNSdGwgPSB0aGlzLmFkYXB0ZXJfLmlzUnRsKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLm5vdGNoT3V0bGluZShsYWJlbFdpZHRoLCBpc1J0bCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uY2xvc2VPdXRsaW5lKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1NlbGVjdEZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFJpcHBsZS4gUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBtYW5hZ2luZ1xuICogLSBjbGFzc2VzXG4gKiAtIGRvbVxuICogLSBDU1MgdmFyaWFibGVzXG4gKiAtIHBvc2l0aW9uXG4gKiAtIGRpbWVuc2lvbnNcbiAqIC0gc2Nyb2xsIHBvc2l0aW9uXG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKiAtIHVuYm91bmRlZCwgYWN0aXZlIGFuZCBkaXNhYmxlZCBzdGF0ZXNcbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUFkYXB0ZXIge1xuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzVW5ib3VuZGVkKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlQWN0aXZlKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlRGlzYWJsZWQoKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUV2ZW50VGFyZ2V0fSB0YXJnZXQgKi9cbiAgY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YXJOYW1lXG4gICAqIEBwYXJhbSB7P251bWJlcnxzdHJpbmd9IHZhbHVlXG4gICAqL1xuICB1cGRhdGVDc3NWYXJpYWJsZSh2YXJOYW1lLCB2YWx1ZSkge31cblxuICAvKiogQHJldHVybiB7IUNsaWVudFJlY3R9ICovXG4gIGNvbXB1dGVCb3VuZGluZ1JlY3QoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSAqL1xuICBnZXRXaW5kb3dQYWdlT2Zmc2V0KCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICAvLyBSaXBwbGUgaXMgYSBzcGVjaWFsIGNhc2Ugd2hlcmUgdGhlIFwicm9vdFwiIGNvbXBvbmVudCBpcyByZWFsbHkgYSBcIm1peGluXCIgb2Ygc29ydHMsXG4gIC8vIGdpdmVuIHRoYXQgaXQncyBhbiAndXBncmFkZScgdG8gYW4gZXhpc3RpbmcgY29tcG9uZW50LiBUaGF0IGJlaW5nIHNhaWQgaXQgaXMgdGhlIHJvb3RcbiAgLy8gQ1NTIGNsYXNzIHRoYXQgYWxsIG90aGVyIENTUyBjbGFzc2VzIGRlcml2ZSBmcm9tLlxuICBST09UOiAnbWRjLXJpcHBsZS11cGdyYWRlZCcsXG4gIFVOQk9VTkRFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLXVuYm91bmRlZCcsXG4gIEJHX0ZPQ1VTRUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1iYWNrZ3JvdW5kLWZvY3VzZWQnLFxuICBGR19BQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1hY3RpdmF0aW9uJyxcbiAgRkdfREVBQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1kZWFjdGl2YXRpb24nLFxufTtcblxuY29uc3Qgc3RyaW5ncyA9IHtcbiAgVkFSX0xFRlQ6ICctLW1kYy1yaXBwbGUtbGVmdCcsXG4gIFZBUl9UT1A6ICctLW1kYy1yaXBwbGUtdG9wJyxcbiAgVkFSX0ZHX1NJWkU6ICctLW1kYy1yaXBwbGUtZmctc2l6ZScsXG4gIFZBUl9GR19TQ0FMRTogJy0tbWRjLXJpcHBsZS1mZy1zY2FsZScsXG4gIFZBUl9GR19UUkFOU0xBVEVfU1RBUlQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLXN0YXJ0JyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9FTkQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLWVuZCcsXG59O1xuXG5jb25zdCBudW1iZXJzID0ge1xuICBQQURESU5HOiAxMCxcbiAgSU5JVElBTF9PUklHSU5fU0NBTEU6IDAuNixcbiAgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVM6IDIyNSwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtdHJhbnNsYXRlLWR1cmF0aW9uIChpLmUuIGFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBGR19ERUFDVElWQVRJT05fTVM6IDE1MCwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtZmFkZS1vdXQtZHVyYXRpb24gKGkuZS4gZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgVEFQX0RFTEFZX01TOiAzMDAsIC8vIERlbGF5IGJldHdlZW4gdG91Y2ggYW5kIHNpbXVsYXRlZCBtb3VzZSBldmVudHMgb24gdG91Y2ggZGV2aWNlc1xufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgQ1NTIGN1c3RvbSB2YXJpYWJsZSBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBhcHBseVBhc3NpdmUgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzUGFzc2l2ZV87XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKSB7XG4gIC8vIERldGVjdCB2ZXJzaW9ucyBvZiBFZGdlIHdpdGggYnVnZ3kgdmFyKCkgc3VwcG9ydFxuICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzExNDk1NDQ4L1xuICBjb25zdCBkb2N1bWVudCA9IHdpbmRvd09iai5kb2N1bWVudDtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBub2RlLmNsYXNzTmFtZSA9ICdtZGMtcmlwcGxlLXN1cmZhY2UtLXRlc3QtZWRnZS12YXItYnVnJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcblxuICAvLyBUaGUgYnVnIGV4aXN0cyBpZiA6OmJlZm9yZSBzdHlsZSBlbmRzIHVwIHByb3BhZ2F0aW5nIHRvIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgLy8gQWRkaXRpb25hbGx5LCBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgbnVsbCBpbiBpZnJhbWVzIHdpdGggZGlzcGxheTogXCJub25lXCIgaW4gRmlyZWZveCxcbiAgLy8gYnV0IEZpcmVmb3ggaXMga25vd24gdG8gc3VwcG9ydCBDU1MgY3VzdG9tIHByb3BlcnRpZXMgY29ycmVjdGx5LlxuICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93T2JqLmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGNvbnN0IGhhc1BzZXVkb1ZhckJ1ZyA9IGNvbXB1dGVkU3R5bGUgIT09IG51bGwgJiYgY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BTdHlsZSA9PT0gJ3NvbGlkJztcbiAgbm9kZS5yZW1vdmUoKTtcbiAgcmV0dXJuIGhhc1BzZXVkb1ZhckJ1Zztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3dPYmosIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPT09ICdib29sZWFuJyAmJiAhZm9yY2VSZWZyZXNoKSB7XG4gICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG5cbiAgY29uc3Qgc3VwcG9ydHNGdW5jdGlvblByZXNlbnQgPSB3aW5kb3dPYmouQ1NTICYmIHR5cGVvZiB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIXN1cHBvcnRzRnVuY3Rpb25QcmVzZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyA9IHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJy0tY3NzLXZhcnMnLCAneWVzJyk7XG4gIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NDY2OVxuICAvLyBTZWU6IFJFQURNRSBzZWN0aW9uIG9uIFNhZmFyaVxuICBjb25zdCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMgPSAoXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnKC0tY3NzLXZhcnM6IHllcyknKSAmJlxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJ2NvbG9yJywgJyMwMDAwMDAwMCcpXG4gICk7XG5cbiAgaWYgKGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgfHwgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSAhZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopO1xuICB9IGVsc2Uge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gZmFsc2U7XG4gIH1cblxuICBpZiAoIWZvcmNlUmVmcmVzaCkge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG4gIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbn1cblxuLy9cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHtwYXNzaXZlOiBib29sZWFufX1cbiAqL1xuZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSBIVE1MRWxlbWVudFByb3RvdHlwZVxuICogQHJldHVybiB7IUFycmF5PHN0cmluZz59XG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudFByb3RvdHlwZSkge1xuICByZXR1cm4gW1xuICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLCAnbXNNYXRjaGVzU2VsZWN0b3InLCAnbWF0Y2hlcycsXG4gIF0uZmlsdGVyKChwKSA9PiBwIGluIEhUTUxFbGVtZW50UHJvdG90eXBlKS5wb3AoKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFFdmVudH0gZXZcbiAqIEBwYXJhbSB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gcGFnZU9mZnNldFxuICogQHBhcmFtIHshQ2xpZW50UmVjdH0gY2xpZW50UmVjdFxuICogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKGV2LCBwYWdlT2Zmc2V0LCBjbGllbnRSZWN0KSB7XG4gIGNvbnN0IHt4LCB5fSA9IHBhZ2VPZmZzZXQ7XG4gIGNvbnN0IGRvY3VtZW50WCA9IHggKyBjbGllbnRSZWN0LmxlZnQ7XG4gIGNvbnN0IGRvY3VtZW50WSA9IHkgKyBjbGllbnRSZWN0LnRvcDtcblxuICBsZXQgbm9ybWFsaXplZFg7XG4gIGxldCBub3JtYWxpemVkWTtcbiAgLy8gRGV0ZXJtaW5lIHRvdWNoIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByaXBwbGUgY29udGFpbmVyLlxuICBpZiAoZXYudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9IGVsc2Uge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfVxuXG4gIHJldHVybiB7eDogbm9ybWFsaXplZFgsIHk6IG5vcm1hbGl6ZWRZfTtcbn1cblxuZXhwb3J0IHtzdXBwb3J0c0Nzc1ZhcmlhYmxlcywgYXBwbHlQYXNzaXZlLCBnZXRNYXRjaGVzUHJvcGVydHksIGdldE5vcm1hbGl6ZWRFdmVudENvb3Jkc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge2dldE5vcm1hbGl6ZWRFdmVudENvb3Jkc30gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBpc0FjdGl2YXRlZDogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGFjdGl2YXRpb25FdmVudDogRXZlbnQsXG4gKiAgIGlzUHJvZ3JhbW1hdGljOiAoYm9vbGVhbnx1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgQWN0aXZhdGlvblN0YXRlVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBkZWFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGZvY3VzOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGJsdXI6IChzdHJpbmd8dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVySW5mb1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGZvY3VzOiBmdW5jdGlvbigpLFxuICogICBibHVyOiBmdW5jdGlvbigpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJzVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB4OiBudW1iZXIsXG4gKiAgIHk6IG51bWJlclxuICogfX1cbiAqL1xubGV0IFBvaW50VHlwZTtcblxuLy8gQWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiB0aGUgcm9vdCBlbGVtZW50IG9mIGVhY2ggaW5zdGFuY2UgZm9yIGFjdGl2YXRpb25cbmNvbnN0IEFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoc3RhcnQnLCAncG9pbnRlcmRvd24nLCAnbW91c2Vkb3duJywgJ2tleWRvd24nXTtcblxuLy8gRGVhY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIGRvY3VtZW50RWxlbWVudCB3aGVuIGEgcG9pbnRlci1yZWxhdGVkIGRvd24gZXZlbnQgb2NjdXJzXG5jb25zdCBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hlbmQnLCAncG9pbnRlcnVwJywgJ21vdXNldXAnXTtcblxuLy8gVHJhY2tzIGFjdGl2YXRpb25zIHRoYXQgaGF2ZSBvY2N1cnJlZCBvbiB0aGUgY3VycmVudCBmcmFtZSwgdG8gYXZvaWQgc2ltdWx0YW5lb3VzIG5lc3RlZCBhY3RpdmF0aW9uc1xuLyoqIEB0eXBlIHshQXJyYXk8IUV2ZW50VGFyZ2V0Pn0gKi9cbmxldCBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1JpcHBsZUFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IC8qIGJvb2xlYW4gLSBjYWNoZWQgKi8ge30sXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICgvKiB0YXJnZXQ6ICFFdmVudFRhcmdldCAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAoLyogdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IC8qIENsaWVudFJlY3QgKi8ge30sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAvKiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9ICovIHt9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENSaXBwbGVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUgeyFDbGllbnRSZWN0fSAqL1xuICAgIHRoaXMuZnJhbWVfID0gLyoqIEB0eXBlIHshQ2xpZW50UmVjdH0gKi8gKHt3aWR0aDogMCwgaGVpZ2h0OiAwfSk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubWF4UmFkaXVzXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuZGVhY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuZm9jdXNIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlRm9jdXMoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUJsdXIoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuXG4gICAgLyoqIEBwcml2YXRlIHt7bGVmdDogbnVtYmVyLCB0b3A6bnVtYmVyfX0gKi9cbiAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnU2NhbGVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IHRydWU7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUgez9FdmVudH0gKi9cbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogV2UgY29tcHV0ZSB0aGlzIHByb3BlcnR5IHNvIHRoYXQgd2UgYXJlIG5vdCBxdWVyeWluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY2xpZW50XG4gICAqIHVudGlsIHRoZSBwb2ludCBpbiB0aW1lIHdoZXJlIHRoZSBmb3VuZGF0aW9uIHJlcXVlc3RzIGl0LiBUaGlzIHByZXZlbnRzIHNjZW5hcmlvcyB3aGVyZVxuICAgKiBjbGllbnQtc2lkZSBmZWF0dXJlLWRldGVjdGlvbiBtYXkgaGFwcGVuIHRvbyBlYXJseSwgc3VjaCBhcyB3aGVuIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXJcbiAgICogYW5kIHRoZW4gaW5pdGlhbGl6ZWQgYXQgbW91bnQgdGltZSBvbiB0aGUgY2xpZW50LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNTdXBwb3J0ZWRfKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshQWN0aXZhdGlvblN0YXRlVHlwZX1cbiAgICovXG4gIGRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2YXRlZDogZmFsc2UsXG4gICAgICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogZmFsc2UsXG4gICAgICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IGZhbHNlLFxuICAgICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IGZhbHNlLFxuICAgICAgYWN0aXZhdGlvbkV2ZW50OiBudWxsLFxuICAgICAgaXNQcm9ncmFtbWF0aWM6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhST09UKTtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgICAvLyBVbmJvdW5kZWQgcmlwcGxlcyBuZWVkIGxheW91dCBsb2dpYyBhcHBsaWVkIGltbWVkaWF0ZWx5IHRvIHNldCBjb29yZGluYXRlcyBmb3IgYm90aCBzaGFkZSBhbmQgcmlwcGxlXG4gICAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWN0aXZhdGlvblRpbWVyXykge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuICAgICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG4gICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhST09UKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgIHRoaXMucmVtb3ZlQ3NzVmFyc18oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbW92ZUNzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtzdHJpbmdzfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4gICAgT2JqZWN0LmtleXMoc3RyaW5ncykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKGsuaW5kZXhPZignVkFSXycpID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoc3RyaW5nc1trXSwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjdGl2YXRlXyhlKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgcmVhY3RpbmcgdG8gZm9sbG93LW9uIGV2ZW50cyBmaXJlZCBieSB0b3VjaCBkZXZpY2UgYWZ0ZXIgYW4gYWxyZWFkeS1wcm9jZXNzZWQgdXNlciBpbnRlcmFjdGlvblxuICAgIGNvbnN0IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ID0gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XG4gICAgY29uc3QgaXNTYW1lSW50ZXJhY3Rpb24gPSBwcmV2aW91c0FjdGl2YXRpb25FdmVudCAmJiBlICYmIHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50LnR5cGUgIT09IGUudHlwZTtcbiAgICBpZiAoaXNTYW1lSW50ZXJhY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA9IGUgPT09IG51bGw7XG4gICAgYWN0aXZhdGlvblN0YXRlLmFjdGl2YXRpb25FdmVudCA9IGU7XG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0FjdGl2YXRlZEJ5UG9pbnRlciA9IGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA/IGZhbHNlIDogKFxuICAgICAgZS50eXBlID09PSAnbW91c2Vkb3duJyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICdwb2ludGVyZG93bidcbiAgICApO1xuXG4gICAgY29uc3QgaGFzQWN0aXZhdGVkQ2hpbGQgPVxuICAgICAgZSAmJiBhY3RpdmF0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgYWN0aXZhdGVkVGFyZ2V0cy5zb21lKCh0YXJnZXQpID0+IHRoaXMuYWRhcHRlcl8uY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpKTtcbiAgICBpZiAoaGFzQWN0aXZhdGVkQ2hpbGQpIHtcbiAgICAgIC8vIEltbWVkaWF0ZWx5IHJlc2V0IGFjdGl2YXRpb24gc3RhdGUsIHdoaWxlIHByZXNlcnZpbmcgbG9naWMgdGhhdCBwcmV2ZW50cyB0b3VjaCBmb2xsb3ctb24gZXZlbnRzXG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzLnB1c2goLyoqIEB0eXBlIHshRXZlbnRUYXJnZXR9ICovIChlLnRhcmdldCkpO1xuICAgICAgdGhpcy5yZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFJlc2V0IGFycmF5IG9uIG5leHQgZnJhbWUgYWZ0ZXIgdGhlIGN1cnJlbnQgZXZlbnQgaGFzIGhhZCBhIGNoYW5jZSB0byBidWJibGUgdG8gcHJldmVudCBhbmNlc3RvciByaXBwbGVzXG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlICYmIChlLmtleSA9PT0gJyAnIHx8IGUua2V5Q29kZSA9PT0gMzIpKSB7XG4gICAgICAgIC8vIElmIHNwYWNlIHdhcyBwcmVzc2VkLCB0cnkgYWdhaW4gd2l0aGluIGFuIHJBRiBjYWxsIHRvIGRldGVjdCA6YWN0aXZlLCBiZWNhdXNlIGRpZmZlcmVudCBVQXMgcmVwb3J0XG4gICAgICAgIC8vIGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW4gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MzU5NzFcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjkzNzQxXG4gICAgICAgIC8vIFdlIHRyeSBmaXJzdCBvdXRzaWRlIHJBRiB0byBzdXBwb3J0IEVkZ2UsIHdoaWNoIGRvZXMgbm90IGV4aGliaXQgdGhpcyBwcm9ibGVtLCBidXQgd2lsbCBjcmFzaCBpZiBhIENTU1xuICAgICAgICAvLyB2YXJpYWJsZSBpcyBzZXQgd2l0aGluIGEgckFGIGNhbGxiYWNrIGZvciBhIHN1Ym1pdCBidXR0b24gaW50ZXJhY3Rpb24gKCMyMjQxKS5cbiAgICAgICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSkge1xuICAgIHJldHVybiAoZSAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykgPyB0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZUFjdGl2ZSgpIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhcnQgPSAnJztcbiAgICBsZXQgdHJhbnNsYXRlRW5kID0gJyc7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgY29uc3Qge3N0YXJ0UG9pbnQsIGVuZFBvaW50fSA9IHRoaXMuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpO1xuICAgICAgdHJhbnNsYXRlU3RhcnQgPSBgJHtzdGFydFBvaW50Lnh9cHgsICR7c3RhcnRQb2ludC55fXB4YDtcbiAgICAgIHRyYW5zbGF0ZUVuZCA9IGAke2VuZFBvaW50Lnh9cHgsICR7ZW5kUG9pbnQueX1weGA7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCB0cmFuc2xhdGVTdGFydCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX0VORCwgdHJhbnNsYXRlRW5kKTtcbiAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gYW5pbWF0aW9uc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG5cbiAgICAvLyBGb3JjZSBsYXlvdXQgaW4gb3JkZXIgdG8gcmUtdHJpZ2dlciB0aGUgYW5pbWF0aW9uLlxuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpLCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7e3N0YXJ0UG9pbnQ6IFBvaW50VHlwZSwgZW5kUG9pbnQ6IFBvaW50VHlwZX19XG4gICAqL1xuICBnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCkge1xuICAgIGNvbnN0IHthY3RpdmF0aW9uRXZlbnQsIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcn0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG5cbiAgICBsZXQgc3RhcnRQb2ludDtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyKSB7XG4gICAgICBzdGFydFBvaW50ID0gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKFxuICAgICAgICAvKiogQHR5cGUgeyFFdmVudH0gKi8gKGFjdGl2YXRpb25FdmVudCksXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLmZyYW1lXy5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXG4gICAgc3RhcnRQb2ludCA9IHtcbiAgICAgIHg6IHN0YXJ0UG9pbnQueCAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogc3RhcnRQb2ludC55IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IGVuZFBvaW50ID0ge1xuICAgICAgeDogKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6ICh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXJ0UG9pbnQsIGVuZFBvaW50fTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJvdGggd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyByZWxlYXNlZCwgYW5kIHdoZW4gdGhlIGFjdGl2YXRpb24gYW5pbWF0aW9uIGVuZHMuXG4gICAgLy8gVGhlIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gc2hvdWxkIG9ubHkgcnVuIGFmdGVyIGJvdGggb2YgdGhvc2Ugb2NjdXIuXG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge2hhc0RlYWN0aXZhdGlvblVYUnVuLCBpc0FjdGl2YXRlZH0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgY29uc3QgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xuXG4gICAgaWYgKGFjdGl2YXRpb25IYXNFbmRlZCAmJiB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8pIHtcbiAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9LCBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpIHtcbiAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXG4gICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGwsIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWFjdGl2YXRlXyhlKSB7XG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBzY2VuYXJpb3Mgc3VjaCBhcyB3aGVuIHlvdSBoYXZlIGEga2V5dXAgZXZlbnQgdGhhdCBibHVycyB0aGUgZWxlbWVudC5cbiAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gLyoqIEB0eXBlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi8gKE9iamVjdC5hc3NpZ24oe30sIGFjdGl2YXRpb25TdGF0ZSkpO1xuXG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYykge1xuICAgICAgY29uc3QgZXZ0T2JqZWN0ID0gbnVsbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGV2dE9iamVjdCwgc3RhdGUpKTtcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmhhc0RlYWN0aXZhdGlvblVYUnVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhlLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZGVhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAqIEBwYXJhbSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9IG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHt3YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlfSkge1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgfHwgd2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGxheW91dEludGVybmFsXygpIHtcbiAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KHRoaXMuZnJhbWVfLmhlaWdodCwgdGhpcy5mcmFtZV8ud2lkdGgpO1xuXG4gICAgLy8gU3VyZmFjZSBkaWFtZXRlciBpcyB0cmVhdGVkIGRpZmZlcmVudGx5IGZvciB1bmJvdW5kZWQgdnMuIGJvdW5kZWQgcmlwcGxlcy5cbiAgICAvLyBVbmJvdW5kZWQgcmlwcGxlIGRpYW1ldGVyIGlzIGNhbGN1bGF0ZWQgc21hbGxlciBzaW5jZSB0aGUgc3VyZmFjZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIHBhZGRlZCBhcHByb3ByaWF0ZWx5XG4gICAgLy8gdG8gZXh0ZW5kIHRoZSBoaXRib3gsIGFuZCB0aGUgcmlwcGxlIGlzIGV4cGVjdGVkIHRvIG1lZXQgdGhlIGVkZ2VzIG9mIHRoZSBwYWRkZWQgaGl0Ym94ICh3aGljaCBpcyB0eXBpY2FsbHlcbiAgICAvLyBzcXVhcmUpLiBCb3VuZGVkIHJpcHBsZXMsIG9uIHRoZSBvdGhlciBoYW5kLCBhcmUgZnVsbHkgZXhwZWN0ZWQgdG8gZXhwYW5kIGJleW9uZCB0aGUgc3VyZmFjZSdzIGxvbmdlc3QgZGlhbWV0ZXJcbiAgICAvLyAoY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZGlhZ29uYWwgcGx1cyBhIGNvbnN0YW50IHBhZGRpbmcpLCBhbmQgYXJlIGNsaXBwZWQgYXQgdGhlIHN1cmZhY2UncyBib3JkZXIgdmlhXG4gICAgLy8gYG92ZXJmbG93OiBoaWRkZW5gLlxuICAgIGNvbnN0IGdldEJvdW5kZWRSYWRpdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuZnJhbWVfLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuZnJhbWVfLmhlaWdodCwgMikpO1xuICAgICAgcmV0dXJuIGh5cG90ZW51c2UgKyBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuUEFERElORztcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpID8gbWF4RGltIDogZ2V0Qm91bmRlZFJhZGl1cygpO1xuXG4gICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IG1heERpbSAqIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5JTklUSUFMX09SSUdJTl9TQ0FMRTtcbiAgICB0aGlzLmZnU2NhbGVfID0gdGhpcy5tYXhSYWRpdXNfIC8gdGhpcy5pbml0aWFsU2l6ZV87XG5cbiAgICB0aGlzLnVwZGF0ZUxheW91dENzc1ZhcnNfKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgdXBkYXRlTGF5b3V0Q3NzVmFyc18oKSB7XG4gICAgY29uc3Qge1xuICAgICAgVkFSX0ZHX1NJWkUsIFZBUl9MRUZULCBWQVJfVE9QLCBWQVJfRkdfU0NBTEUsXG4gICAgfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NJWkUsIGAke3RoaXMuaW5pdGlhbFNpemVffXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0NBTEUsIHRoaXMuZmdTY2FsZV8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfTEVGVCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLmxlZnR9cHhgKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcH1weGApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXRVbmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgY29uc3Qge1VOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHVuYm91bmRlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXMoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cblxuICBoYW5kbGVCbHVyKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4iLCJpbXBvcnQgTURDUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMnXHJcbmltcG9ydCB7XHJcbiAgc3VwcG9ydHNDc3NWYXJpYWJsZXMsXHJcbiAgZ2V0TWF0Y2hlc1Byb3BlcnR5LFxyXG4gIGFwcGx5UGFzc2l2ZVxyXG59IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvdXRpbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBSaXBwbGVCYXNlIGV4dGVuZHMgTURDUmlwcGxlRm91bmRhdGlvbiB7XHJcbiAgc3RhdGljIGdldCBNQVRDSEVTKCkge1xyXG4gICAgLyogZ2xvYmFsIEhUTUxFbGVtZW50ICovXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBSaXBwbGVCYXNlLl9tYXRjaGVzIHx8XHJcbiAgICAgIChSaXBwbGVCYXNlLl9tYXRjaGVzID0gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSkpXHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNTdXJmYWNlQWN0aXZlKHJlZikge1xyXG4gICAgcmV0dXJuIHJlZltSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHZtLCBvcHRpb25zKSB7XHJcbiAgICBzdXBlcihcclxuICAgICAgT2JqZWN0LmFzc2lnbihcclxuICAgICAgICB7XHJcbiAgICAgICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3cpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2bS4kZWxbUmlwcGxlQmFzZS5NQVRDSEVTXSgnOmFjdGl2ZScpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZtLmRpc2FibGVkXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIHZtLiRzZXQodm0uY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICB2bS4kZGVsZXRlKHZtLmNsYXNzZXMsIGNsYXNzTmFtZSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiB0YXJnZXQgPT4gdm0uJGVsLmNvbnRhaW5zKHRhcmdldCksXHJcbiAgICAgICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2bS4kZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICAgICAgdm0uJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcclxuICAgICAgICAgICAgICBoYW5kbGVyLFxyXG4gICAgICAgICAgICAgIGFwcGx5UGFzc2l2ZSgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgICBldnRUeXBlLFxyXG4gICAgICAgICAgICAgIGhhbmRsZXIsXHJcbiAgICAgICAgICAgICAgYXBwbHlQYXNzaXZlKClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogaGFuZGxlciA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogaGFuZGxlciA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKHZhck5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHZtLiRzZXQodm0uc3R5bGVzLCB2YXJOYW1lLCB2YWx1ZSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2bS4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHg6IHdpbmRvdy5wYWdlWE9mZnNldCwgeTogd2luZG93LnBhZ2VZT2Zmc2V0IH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9wdGlvbnNcclxuICAgICAgKVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJpcHBsZU1peGluID0ge1xyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiB7fSxcclxuICAgICAgc3R5bGVzOiB7fVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbW91bnRlZCgpIHtcclxuICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcylcclxuICAgIHRoaXMucmlwcGxlLmluaXQoKVxyXG4gIH0sXHJcbiAgYmVmb3JlRGVzdHJveSgpIHtcclxuICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKVxyXG4gIH1cclxufVxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGN1c3RvbS1lbGVtZW50IFxyXG4gICAgOnRhZz1cInRhZ1wiIFxyXG4gICAgOmNsYXNzZXM9XCJjbGFzc2VzXCJcclxuICAgIDpzdHlsZXM9XCJzdHlsZXNcIiBcclxuICAgIGNsYXNzPVwibWRjLXJpcHBsZVwiPlxyXG4gICAgPHNsb3QgLz5cclxuICA8L2N1c3RvbS1lbGVtZW50PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHsgQ3VzdG9tRWxlbWVudE1peGluIH0gZnJvbSAnLi4vYmFzZSdcclxuaW1wb3J0IHsgUmlwcGxlTWl4aW4gfSBmcm9tICcuL21kYy1yaXBwbGUtYmFzZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLXJpcHBsZScsXHJcbiAgbWl4aW5zOiBbQ3VzdG9tRWxlbWVudE1peGluLCBSaXBwbGVNaXhpbl0sXHJcbiAgcHJvcHM6IHtcclxuICAgIHRhZzogU3RyaW5nXHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIEZsb2F0aW5nIExhYmVsLlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIGZsb2F0aW5nIGxhYmVsIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENGbG9hdGluZ0xhYmVsQWRhcHRlciB7XG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3MgdG8gdGhlIGxhYmVsIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIGxhYmVsIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIGxhYmVsIGVsZW1lbnQuXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldFdpZHRoKCkge31cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSByb290IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGbG9hdGluZ0xhYmVsQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIExBQkVMX0ZMT0FUX0FCT1ZFOiAnbWRjLWZsb2F0aW5nLWxhYmVsLS1mbG9hdC1hYm92ZScsXG4gIExBQkVMX1NIQUtFOiAnbWRjLWZsb2F0aW5nLWxhYmVsLS1zaGFrZScsXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXN9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKCkgPT4ge30sXG4gICAgICBnZXRXaWR0aDogKCkgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENGbG9hdGluZ0xhYmVsQWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMuc2hha2VBbmltYXRpb25FbmRIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlU2hha2VBbmltYXRpb25FbmRfKCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2FuaW1hdGlvbmVuZCcsIHRoaXMuc2hha2VBbmltYXRpb25FbmRIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYW5pbWF0aW9uZW5kJywgdGhpcy5zaGFrZUFuaW1hdGlvbkVuZEhhbmRsZXJfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3aWR0aCBvZiB0aGUgbGFiZWwgZWxlbWVudC5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0V2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uZ2V0V2lkdGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdHlsZXMgdGhlIGxhYmVsIHRvIHByb2R1Y2UgdGhlIGxhYmVsIHNoYWtlIGZvciBlcnJvcnMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkU2hha2UgYWRkcyBzaGFrZSBjbGFzcyBpZiB0cnVlLFxuICAgKiBvdGhlcndpc2UgcmVtb3ZlcyBzaGFrZSBjbGFzcy5cbiAgICovXG4gIHNoYWtlKHNob3VsZFNoYWtlKSB7XG4gICAgY29uc3Qge0xBQkVMX1NIQUtFfSA9IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHNob3VsZFNoYWtlKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKExBQkVMX1NIQUtFKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhMQUJFTF9TSEFLRSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0eWxlcyB0aGUgbGFiZWwgdG8gZmxvYXQgb3IgZG9jay5cbiAgICogQHBhcmFtIHtib29sZWFufSBzaG91bGRGbG9hdCBhZGRzIGZsb2F0IGNsYXNzIGlmIHRydWUsIG90aGVyd2lzZSByZW1vdmVcbiAgICogZmxvYXQgYW5kIHNoYWtlIGNsYXNzIHRvIGRvY2sgbGFiZWwuXG4gICAqL1xuICBmbG9hdChzaG91bGRGbG9hdCkge1xuICAgIGNvbnN0IHtMQUJFTF9GTE9BVF9BQk9WRSwgTEFCRUxfU0hBS0V9ID0gTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAoc2hvdWxkRmxvYXQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTEFCRUxfRkxPQVRfQUJPVkUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKExBQkVMX0ZMT0FUX0FCT1ZFKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTEFCRUxfU0hBS0UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFuIGludGVyYWN0aW9uIGV2ZW50IG9uIHRoZSByb290IGVsZW1lbnQuXG4gICAqL1xuICBoYW5kbGVTaGFrZUFuaW1hdGlvbkVuZF8oKSB7XG4gICAgY29uc3Qge0xBQkVMX1NIQUtFfSA9IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhMQUJFTF9TSEFLRSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb247XG4iLCI8dGVtcGxhdGU+XHJcbiAgPGxhYmVsXHJcbiAgICA6Y2xhc3M9XCJsYWJlbENsYXNzZXNcIlxyXG4gICAgY2xhc3M9XCJtZGMtZmxvYXRpbmctbGFiZWxcIj5cclxuICAgIDxzbG90IC8+XHJcbiAgPC9sYWJlbD5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvZmxvYXRpbmctbGFiZWwvZm91bmRhdGlvbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLXNlbGVjdC1sYWJlbCcsXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxhYmVsQ2xhc3Nlczoge31cclxuICAgIH1cclxuICB9LFxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24oe1xyXG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5sYWJlbENsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcclxuICAgICAgfSxcclxuICAgICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMubGFiZWxDbGFzc2VzLCBjbGFzc05hbWUpXHJcbiAgICAgIH0sXHJcbiAgICAgIGdldFdpZHRoOiAoKSA9PiB0aGlzLiRlbC5vZmZzZXRXaWR0aCxcclxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKVxyXG4gICAgICB9LFxyXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcilcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIHRoaXMuZm91bmRhdGlvbi5pbml0KClcclxuICB9LFxyXG4gIGJlZm9yZURlc3Ryb3koKSB7XHJcbiAgICBsZXQgZm91bmRhdGlvbiA9IHRoaXMuZm91bmRhdGlvblxyXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbnVsbFxyXG4gICAgZm91bmRhdGlvbi5kZXN0cm95KClcclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgVGV4dEZpZWxkIExpbmUgUmlwcGxlLlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIGxpbmUgcmlwcGxlIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENMaW5lUmlwcGxlQWRhcHRlciB7XG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3MgdG8gdGhlIGxpbmUgcmlwcGxlIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIGxpbmUgcmlwcGxlIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzdHlsZSBwcm9wZXJ0eSB3aXRoIHByb3BlcnR5TmFtZSB0byB2YWx1ZSBvbiB0aGUgcm9vdCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0U3R5bGUocHJvcGVydHlOYW1lLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBsaW5lIHJpcHBsZSBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJFdmVudEhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIGxpbmUgcmlwcGxlIGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyRXZlbnRIYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0xpbmVSaXBwbGVBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgTElORV9SSVBQTEVfQUNUSVZFOiAnbWRjLWxpbmUtcmlwcGxlLS1hY3RpdmUnLFxuICBMSU5FX1JJUFBMRV9ERUFDVElWQVRJTkc6ICdtZGMtbGluZS1yaXBwbGUtLWRlYWN0aXZhdGluZycsXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0xpbmVSaXBwbGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXN9IGZyb20gJy4vY29uc3RhbnRzJztcblxuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENMaW5lUmlwcGxlQWRhcHRlcj59XG4gKiBAZmluYWxcbiAqL1xuY2xhc3MgTURDTGluZVJpcHBsZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKipcbiAgICoge0BzZWUgTURDTGluZVJpcHBsZUFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDTGluZVJpcHBsZUFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENMaW5lUmlwcGxlQWRhcHRlcn0gKi8gKHtcbiAgICAgIGFkZENsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoKSA9PiB7fSxcbiAgICAgIGhhc0NsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHNldFN0eWxlOiAoKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJFdmVudEhhbmRsZXI6ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ0xpbmVSaXBwbGVBZGFwdGVyPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IC8qKiBAdHlwZSB7IU1EQ0xpbmVSaXBwbGVBZGFwdGVyfSAqLyAoe30pKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENMaW5lUmlwcGxlRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZVRyYW5zaXRpb25FbmQoZXZ0KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckV2ZW50SGFuZGxlcigndHJhbnNpdGlvbmVuZCcsIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRXZlbnRIYW5kbGVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlcyB0aGUgbGluZSByaXBwbGVcbiAgICovXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9ERUFDVElWQVRJTkcpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9BQ1RJVkUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGNlbnRlciBvZiB0aGUgcmlwcGxlIGFuaW1hdGlvbiB0byB0aGUgZ2l2ZW4gWCBjb29yZGluYXRlLlxuICAgKiBAcGFyYW0ge251bWJlcn0geENvb3JkaW5hdGVcbiAgICovXG4gIHNldFJpcHBsZUNlbnRlcih4Q29vcmRpbmF0ZSkge1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0U3R5bGUoJ3RyYW5zZm9ybS1vcmlnaW4nLCBgJHt4Q29vcmRpbmF0ZX1weCBjZW50ZXJgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWFjdGl2YXRlcyB0aGUgbGluZSByaXBwbGVcbiAgICovXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLkxJTkVfUklQUExFX0RFQUNUSVZBVElORyk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIHRyYW5zaXRpb24gZW5kIGV2ZW50XG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICovXG4gIGhhbmRsZVRyYW5zaXRpb25FbmQoZXZ0KSB7XG4gICAgLy8gV2FpdCBmb3IgdGhlIGxpbmUgcmlwcGxlIHRvIGJlIGVpdGhlciB0cmFuc3BhcmVudCBvciBvcGFxdWVcbiAgICAvLyBiZWZvcmUgZW1pdHRpbmcgdGhlIGFuaW1hdGlvbiBlbmQgZXZlbnRcbiAgICBjb25zdCBpc0RlYWN0aXZhdGluZyA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9ERUFDVElWQVRJTkcpO1xuXG4gICAgaWYgKGV2dC5wcm9wZXJ0eU5hbWUgPT09ICdvcGFjaXR5Jykge1xuICAgICAgaWYgKGlzRGVhY3RpdmF0aW5nKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9BQ1RJVkUpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDTGluZVJpcHBsZUZvdW5kYXRpb247XG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdlxyXG4gICAgOmNsYXNzPVwibGluZUNsYXNzZXNcIlxyXG4gICAgOnN0eWxlPVwibGluZVN0eWxlc1wiXHJcbiAgICBjbGFzcz1cIm1kYy1saW5lLXJpcHBsZVwiLz5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBNRENMaW5lUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvbGluZS1yaXBwbGUvZm91bmRhdGlvbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLXNlbGVjdC1saW5lLXJpcHBsZScsXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxpbmVDbGFzc2VzOiB7fSxcclxuICAgICAgbGluZVN0eWxlczoge31cclxuICAgIH1cclxuICB9LFxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDTGluZVJpcHBsZUZvdW5kYXRpb24oe1xyXG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5saW5lQ2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxyXG4gICAgICB9LFxyXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICB0aGlzLiRkZWxldGUodGhpcy5saW5lQ2xhc3NlcywgY2xhc3NOYW1lKVxyXG4gICAgICB9LFxyXG4gICAgICBoYXNDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICB0aGlzLiRlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKVxyXG4gICAgICB9LFxyXG4gICAgICBzZXRTdHlsZTogKG5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMubGluZVN0eWxlcywgbmFtZSwgdmFsdWUpXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcilcclxuICAgICAgfSxcclxuICAgICAgZGVyZWdpc3RlckV2ZW50SGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXHJcbiAgfSxcclxuICBiZWZvcmVEZXN0cm95KCkge1xyXG4gICAgbGV0IGZvdW5kYXRpb24gPSB0aGlzLmZvdW5kYXRpb25cclxuICAgIHRoaXMuZm91bmRhdGlvbiA9IG51bGxcclxuICAgIGZvdW5kYXRpb24uZGVzdHJveSgpXHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIE5vdGNoZWQgT3V0bGluZS5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBOb3RjaGVkIE91dGxpbmUgaW50byB5b3VyIGZyYW1ld29yay4gU2VlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2F1dGhvcmluZy1jb21wb25lbnRzLm1kXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlciB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3aWR0aCBvZiB0aGUgcm9vdCBlbGVtZW50LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXRXaWR0aCgpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGhlaWdodCBvZiB0aGUgcm9vdCBlbGVtZW50LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXRIZWlnaHQoKSB7fVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3MgdG8gdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2xhc3MgZnJvbSB0aGUgcm9vdCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIFwiZFwiIGF0dHJpYnV0ZSBvZiB0aGUgb3V0bGluZSBlbGVtZW50J3MgU1ZHIHBhdGguXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0T3V0bGluZVBhdGhBdHRyKHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpZGxlIG91dGxpbmUgZWxlbWVudCdzIGNvbXB1dGVkIHN0eWxlIHZhbHVlIG9mIHRoZSBnaXZlbiBjc3MgcHJvcGVydHkgYHByb3BlcnR5TmFtZWAuXG4gICAqIFdlIGFjaGlldmUgdGhpcyB2aWEgYGdldENvbXB1dGVkU3R5bGUoLi4uKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5TmFtZSlgLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZShwcm9wZXJ0eU5hbWUpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFBBVEhfU0VMRUNUT1I6ICcubWRjLW5vdGNoZWQtb3V0bGluZV9fcGF0aCcsXG4gIElETEVfT1VUTElORV9TRUxFQ1RPUjogJy5tZGMtbm90Y2hlZC1vdXRsaW5lX19pZGxlJyxcbn07XG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgT1VUTElORV9OT1RDSEVEOiAnbWRjLW5vdGNoZWQtb3V0bGluZS0tbm90Y2hlZCcsXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3N9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlcj59XG4gKiBAZmluYWxcbiAqL1xuY2xhc3MgTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKipcbiAgICoge0BzZWUgTURDTm90Y2hlZE91dGxpbmVBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IU1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlcn0gKi8gKHtcbiAgICAgIGdldFdpZHRoOiAoKSA9PiB7fSxcbiAgICAgIGdldEhlaWdodDogKCkgPT4ge30sXG4gICAgICBhZGRDbGFzczogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKCkgPT4ge30sXG4gICAgICBzZXRPdXRsaW5lUGF0aEF0dHI6ICgpID0+IHt9LFxuICAgICAgZ2V0SWRsZU91dGxpbmVTdHlsZVZhbHVlOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIG91dGxpbmUgbm90Y2hlZCBzZWxlY3RvciBhbmQgdXBkYXRlcyB0aGUgbm90Y2ggd2lkdGhcbiAgICogY2FsY3VsYXRlZCBiYXNlZCBvZmYgb2Ygbm90Y2hXaWR0aCBhbmQgaXNSdGwuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RjaFdpZHRoXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IGlzUnRsXG4gICAqL1xuICBub3RjaChub3RjaFdpZHRoLCBpc1J0bCA9IGZhbHNlKSB7XG4gICAgY29uc3Qge09VVExJTkVfTk9UQ0hFRH0gPSBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE9VVExJTkVfTk9UQ0hFRCk7XG4gICAgdGhpcy51cGRhdGVTdmdQYXRoXyhub3RjaFdpZHRoLCBpc1J0bCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBub3RjaGVkIG91dGxpbmUgc2VsZWN0b3IgdG8gY2xvc2UgdGhlIG5vdGNoIGluIHRoZSBvdXRsaW5lLlxuICAgKi9cbiAgY2xvc2VOb3RjaCgpIHtcbiAgICBjb25zdCB7T1VUTElORV9OT1RDSEVEfSA9IE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoT1VUTElORV9OT1RDSEVEKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBTVkcgcGF0aCBvZiB0aGUgZm9jdXMgb3V0bGluZSBlbGVtZW50IGJhc2VkIG9uIHRoZSBub3RjaFdpZHRoXG4gICAqIGFuZCB0aGUgUlRMIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RjaFdpZHRoXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IGlzUnRsXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB1cGRhdGVTdmdQYXRoXyhub3RjaFdpZHRoLCBpc1J0bCkge1xuICAgIC8vIEZhbGwgYmFjayB0byByZWFkaW5nIGEgc3BlY2lmaWMgY29ybmVyJ3Mgc3R5bGUgYmVjYXVzZSBGaXJlZm94IGRvZXNuJ3QgcmVwb3J0IHRoZSBzdHlsZSBvbiBib3JkZXItcmFkaXVzLlxuICAgIGNvbnN0IHJhZGl1c1N0eWxlVmFsdWUgPSB0aGlzLmFkYXB0ZXJfLmdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZSgnYm9yZGVyLXJhZGl1cycpIHx8XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0SWRsZU91dGxpbmVTdHlsZVZhbHVlKCdib3JkZXItdG9wLWxlZnQtcmFkaXVzJyk7XG4gICAgY29uc3QgcmFkaXVzID0gcGFyc2VGbG9hdChyYWRpdXNTdHlsZVZhbHVlKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuYWRhcHRlcl8uZ2V0V2lkdGgoKTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmFkYXB0ZXJfLmdldEhlaWdodCgpO1xuICAgIGNvbnN0IGNvcm5lcldpZHRoID0gcmFkaXVzICsgMS4yO1xuICAgIGNvbnN0IGxlYWRpbmdTdHJva2VMZW5ndGggPSBNYXRoLmFicygxMSAtIGNvcm5lcldpZHRoKTtcbiAgICBjb25zdCBwYWRkZWROb3RjaFdpZHRoID0gbm90Y2hXaWR0aCArIDg7XG5cbiAgICAvLyBUaGUgcmlnaHQsIGJvdHRvbSwgYW5kIGxlZnQgc2lkZXMgb2YgdGhlIG91dGxpbmUgZm9sbG93IHRoZSBzYW1lIFNWRyBwYXRoLlxuICAgIGNvbnN0IHBhdGhNaWRkbGUgPSAnYScgKyByYWRpdXMgKyAnLCcgKyByYWRpdXMgKyAnIDAgMCAxICcgKyByYWRpdXMgKyAnLCcgKyByYWRpdXNcbiAgICAgICsgJ3YnICsgKGhlaWdodCAtICgyICogY29ybmVyV2lkdGgpKVxuICAgICAgKyAnYScgKyByYWRpdXMgKyAnLCcgKyByYWRpdXMgKyAnIDAgMCAxICcgKyAtcmFkaXVzICsgJywnICsgcmFkaXVzXG4gICAgICArICdoJyArICgtd2lkdGggKyAoMiAqIGNvcm5lcldpZHRoKSlcbiAgICAgICsgJ2EnICsgcmFkaXVzICsgJywnICsgcmFkaXVzICsgJyAwIDAgMSAnICsgLXJhZGl1cyArICcsJyArIC1yYWRpdXNcbiAgICAgICsgJ3YnICsgKC1oZWlnaHQgKyAoMiAqIGNvcm5lcldpZHRoKSlcbiAgICAgICsgJ2EnICsgcmFkaXVzICsgJywnICsgcmFkaXVzICsgJyAwIDAgMSAnICsgcmFkaXVzICsgJywnICsgLXJhZGl1cztcblxuICAgIGxldCBwYXRoO1xuICAgIGlmICghaXNSdGwpIHtcbiAgICAgIHBhdGggPSAnTScgKyAoY29ybmVyV2lkdGggKyBsZWFkaW5nU3Ryb2tlTGVuZ3RoICsgcGFkZGVkTm90Y2hXaWR0aCkgKyAnLCcgKyAxXG4gICAgICAgICsgJ2gnICsgKHdpZHRoIC0gKDIgKiBjb3JuZXJXaWR0aCkgLSBwYWRkZWROb3RjaFdpZHRoIC0gbGVhZGluZ1N0cm9rZUxlbmd0aClcbiAgICAgICAgKyBwYXRoTWlkZGxlXG4gICAgICAgICsgJ2gnICsgbGVhZGluZ1N0cm9rZUxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGF0aCA9ICdNJyArICh3aWR0aCAtIGNvcm5lcldpZHRoIC0gbGVhZGluZ1N0cm9rZUxlbmd0aCkgKyAnLCcgKyAxXG4gICAgICAgICsgJ2gnICsgbGVhZGluZ1N0cm9rZUxlbmd0aFxuICAgICAgICArIHBhdGhNaWRkbGVcbiAgICAgICAgKyAnaCcgKyAod2lkdGggLSAoMiAqIGNvcm5lcldpZHRoKSAtIHBhZGRlZE5vdGNoV2lkdGggLSBsZWFkaW5nU3Ryb2tlTGVuZ3RoKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnNldE91dGxpbmVQYXRoQXR0cihwYXRoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb247XG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxkaXZcclxuICAgICAgcmVmPVwib3V0bGluZWRcIlxyXG4gICAgICA6Y2xhc3M9XCJvdXRsaW5lZENsYXNzZXNcIlxyXG4gICAgICBjbGFzcz1cIm1kYy1ub3RjaGVkLW91dGxpbmVcIj5cclxuICAgICAgPHN2Zz5cclxuICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgcmVmPVwib3V0bGluZWRQYXRoXCJcclxuICAgICAgICAgIGNsYXNzPVwibWRjLW5vdGNoZWQtb3V0bGluZV9fcGF0aFwiLz5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXZcclxuICAgICAgcmVmPVwib3V0bGluZWRJZGxlXCJcclxuICAgICAgY2xhc3M9XCJtZGMtbm90Y2hlZC1vdXRsaW5lX19pZGxlXCIvPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IE1EQ25vdGNoZWRPdXRsaW5lRm91bmRhdGlvbkZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL25vdGNoZWQtb3V0bGluZS9mb3VuZGF0aW9uJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtc2VsZWN0LW5vdGNoZWQtb3V0bGluZScsXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG91dGxpbmVkQ2xhc3Nlczoge31cclxuICAgIH1cclxuICB9LFxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDbm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uRm91bmRhdGlvbih7XHJcbiAgICAgIGdldFdpZHRoOiAoKSA9PiB0aGlzLiRyZWZzLm91dGxpbmVkLm9mZnNldFdpZHRoLFxyXG4gICAgICBnZXRIZWlnaHQ6ICgpID0+IHRoaXMuJHJlZnMub3V0bGluZWQub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5vdXRsaW5lZENsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcclxuICAgICAgfSxcclxuICAgICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMub3V0bGluZWRDbGFzc2VzLCBjbGFzc05hbWUpXHJcbiAgICAgIH0sXHJcbiAgICAgIHNldE91dGxpbmVQYXRoQXR0cjogdmFsdWUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLiRyZWZzLm91dGxpbmVkUGF0aFxyXG4gICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgdmFsdWUpXHJcbiAgICAgIH0sXHJcbiAgICAgIGdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZTogcHJvcGVydHlOYW1lID0+IHtcclxuICAgICAgICByZXR1cm4gd2luZG93XHJcbiAgICAgICAgICAuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLiRyZWZzLm91dGxpbmVkSWRsZSlcclxuICAgICAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5TmFtZSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIHRoaXMuZm91bmRhdGlvbi5pbml0KClcclxuICB9LFxyXG4gIGJlZm9yZURlc3Ryb3koKSB7XHJcbiAgICBsZXQgZm91bmRhdGlvbiA9IHRoaXMuZm91bmRhdGlvblxyXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbnVsbFxyXG4gICAgZm91bmRhdGlvbi5kZXN0cm95KClcclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2XHJcbiAgICA6aWQ9XCJpZFwiXHJcbiAgICA6Y2xhc3M9XCJyb290Q2xhc3Nlc1wiXHJcbiAgICA6c3R5bGU9XCJzdHlsZXNcIlxyXG4gICAgY2xhc3M9XCJtZGMtc2VsZWN0XCI+XHJcbiAgICA8c2VsZWN0XHJcbiAgICAgIHJlZj1cIm5hdGl2ZV9jb250cm9sXCJcclxuICAgICAgOmRpc2FibGVkPVwiZGlzYWJsZWRcIlxyXG4gICAgICB2LWJpbmQ9XCIkYXR0cnNcIlxyXG4gICAgICBjbGFzcz1cIm1kYy1zZWxlY3RfX25hdGl2ZS1jb250cm9sXCJcclxuICAgICAgdi1vbj1cImxpc3RlbmVyc1wiPlxyXG4gICAgICA8b3B0aW9uXHJcbiAgICAgICAgdi1pZj1cIiEhbGFiZWxcIlxyXG4gICAgICAgIGNsYXNzPVwibWRjLW9wdGlvblwiXHJcbiAgICAgICAgdmFsdWU9XCJcIlxyXG4gICAgICAgIGRpc2FibGVkXHJcbiAgICAgICAgc2VsZWN0ZWQvPlxyXG4gICAgICA8c2xvdC8+XHJcbiAgICA8L3NlbGVjdD5cclxuICAgIDwhLS0gbGFiZWwgLS0+XHJcbiAgICA8c2VsZWN0LWxhYmVsXHJcbiAgICAgIHYtaWY9XCJsYWJlbFwiXHJcbiAgICAgIHJlZj1cImxhYmVsXCI+e3sgbGFiZWwgfX08L3NlbGVjdC1sYWJlbD5cclxuICAgIDwhLS0gbGluZSByaXBwbGUgLS0+XHJcbiAgICA8c2VsZWN0LWxpbmUtcmlwbGVcclxuICAgICAgdi1pZj1cIiFvdXRsaW5lZFwiXHJcbiAgICAgIHJlZj1cImxpbmVcIi8+XHJcbiAgICA8IS0tIG91dGxpbmUgLS0+XHJcbiAgICA8c2VsZWN0LW5vdGNoZWQtb3V0bGluZVxyXG4gICAgICB2LWlmPVwib3V0bGluZWRcIlxyXG4gICAgICByZWY9XCJvdXRsaW5lXCJcclxuICAgIC8+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgTURDU2VsZWN0Rm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvc2VsZWN0L2ZvdW5kYXRpb24nXHJcbmltcG9ydCB7IFJpcHBsZUJhc2UgfSBmcm9tICcuLi9yaXBwbGUnXHJcblxyXG5pbXBvcnQgU2VsZWN0TGFiZWwgZnJvbSAnLi9tZGMtc2VsZWN0LWxhYmVsLnZ1ZSdcclxuaW1wb3J0IFNlbGVjdExpbmVSaXBsZSBmcm9tICcuL21kYy1zZWxlY3QtbGluZS1yaXBwbGUudnVlJ1xyXG5pbXBvcnQgU2VsZWN0Tm90Y2hlZE91dGxpbmUgZnJvbSAnLi9tZGMtc2VsZWN0LW5vdGNoZWQtb3V0bGluZS52dWUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1zZWxlY3QnLFxyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIFNlbGVjdExhYmVsLFxyXG4gICAgU2VsZWN0TGluZVJpcGxlLFxyXG4gICAgU2VsZWN0Tm90Y2hlZE91dGxpbmVcclxuICB9LFxyXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXHJcbiAgbW9kZWw6IHtcclxuICAgIHByb3A6ICd2YWx1ZScsXHJcbiAgICBldmVudDogJ2NoYW5nZSdcclxuICB9LFxyXG4gIHByb3BzOiB7XHJcbiAgICB2YWx1ZTogU3RyaW5nLFxyXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXHJcbiAgICBsYWJlbDogU3RyaW5nLFxyXG4gICAgb3V0bGluZWQ6IEJvb2xlYW4sXHJcbiAgICBpZDogeyB0eXBlOiBTdHJpbmcgfVxyXG4gIH0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0eWxlczoge30sXHJcbiAgICAgIGNsYXNzZXM6IHt9XHJcbiAgICB9XHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgcm9vdENsYXNzZXMoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgJ21kYy1zZWxlY3QtLWJveCc6ICF0aGlzLm91dGxpbmVkLFxyXG4gICAgICAgICdtZGMtc2VsZWN0LS1vdXRsaW5lZCc6IHRoaXMub3V0bGluZWQsXHJcbiAgICAgICAgLi4udGhpcy5jbGFzc2VzXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsaXN0ZW5lcnMoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxyXG4gICAgICAgIGNoYW5nZTogZXZlbnQgPT4gdGhpcy5vbkNoYW5nZShldmVudClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgd2F0Y2g6IHtcclxuICAgIGRpc2FibGVkKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24udXBkYXRlRGlzYWJsZWRTdHlsZSh2YWx1ZSlcclxuICAgIH0sXHJcbiAgICB2YWx1ZTogJ3JlZnJlc2hJbmRleCdcclxuICB9LFxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDU2VsZWN0Rm91bmRhdGlvbih7XHJcbiAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKSxcclxuICAgICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLiRkZWxldGUodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUpLFxyXG4gICAgICBoYXNDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxyXG4gICAgICBhY3RpdmF0ZUJvdHRvbUxpbmU6ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy4kcmVmcy5saW5lKSB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLmxpbmUuZm91bmRhdGlvbi5hY3RpdmF0ZSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBkZWFjdGl2YXRlQm90dG9tTGluZTogKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLiRyZWZzLmxpbmUpIHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMubGluZS5mb3VuZGF0aW9uLmRlYWN0aXZhdGUoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZ2V0VmFsdWU6ICgpID0+IHRoaXMuJHJlZnMubmF0aXZlX2NvbnRyb2wudmFsdWUsXHJcbiAgICAgIGlzUnRsOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuJGVsKS5nZXRQcm9wZXJ0eVZhbHVlKCdkaXJlY3Rpb24nKSA9PT1cclxuICAgICAgICAgICdydGwnXHJcbiAgICAgICAgKVxyXG4gICAgICB9LFxyXG4gICAgICBub3RjaE91dGxpbmU6IChsYWJlbFdpZHRoLCBpc1J0bCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLiRyZWZzLm91dGxpbmUpIHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMub3V0bGluZS5mb3VuZGF0aW9uLm5vdGNoKGxhYmVsV2lkdGgsIGlzUnRsKVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgY2xvc2VPdXRsaW5lOiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuJHJlZnMub3V0bGluZSkge1xyXG4gICAgICAgICAgdGhpcy4kcmVmcy5vdXRsaW5lLmZvdW5kYXRpb24uY2xvc2VOb3RjaCgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBoYXNPdXRsaW5lOiAoKSA9PiAhIXRoaXMuJHJlZnMub3V0bGluZSxcclxuICAgICAgZmxvYXRMYWJlbDogdmFsdWUgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLiRyZWZzLmxhYmVsKSB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLmxhYmVsLmZvdW5kYXRpb24uZmxvYXQodmFsdWUpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBoYXNMYWJlbDogKCkgPT4gISF0aGlzLiRyZWZzLmxhYmVsLFxyXG4gICAgICBnZXRMYWJlbFdpZHRoOiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuJHJlZnMubGFiZWwpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLiRyZWZzLmxhYmVsLmZvdW5kYXRpb24uZ2V0V2lkdGgoKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXHJcbiAgICB0aGlzLmZvdW5kYXRpb24uaGFuZGxlQ2hhbmdlKClcclxuXHJcbiAgICAvLyBpbml0aWFsIHN5bmMgd2l0aCBET01cclxuICAgIHRoaXMucmVmcmVzaEluZGV4KClcclxuICAgIHRoaXMuc2xvdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdGhpcy5yZWZyZXNoSW5kZXgoKSlcclxuICAgIHRoaXMuc2xvdE9ic2VydmVyLm9ic2VydmUodGhpcy4kcmVmcy5uYXRpdmVfY29udHJvbCwge1xyXG4gICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgIHN1YnRyZWU6IHRydWVcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5yaXBwbGUgPSBuZXcgUmlwcGxlQmFzZSh0aGlzKVxyXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXHJcbiAgfSxcclxuICBiZWZvcmVEZXN0cm95KCkge1xyXG4gICAgdGhpcy5zbG90T2JzZXJ2ZXIuZGlzY29ubmVjdCgpXHJcblxyXG4gICAgbGV0IGZvdW5kYXRpb24gPSB0aGlzLmZvdW5kYXRpb25cclxuICAgIHRoaXMuZm91bmRhdGlvbiA9IG51bGxcclxuICAgIGZvdW5kYXRpb24uZGVzdHJveSgpXHJcblxyXG4gICAgdGhpcy5yaXBwbGUgJiYgdGhpcy5yaXBwbGUuZGVzdHJveSgpXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICByZWZyZXNoSW5kZXgoKSB7XHJcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBbLi4udGhpcy4kcmVmcy5uYXRpdmVfY29udHJvbC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKV1cclxuXHJcbiAgICAgIGNvbnN0IGlkeCA9IG9wdGlvbnMuZmluZEluZGV4KCh7IHZhbHVlIH0pID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gdmFsdWVcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGlmICh0aGlzLiRyZWZzLm5hdGl2ZV9jb250cm9sLnNlbGVjdGVkSW5kZXggIT09IGlkeCkge1xyXG4gICAgICAgIHRoaXMuJHJlZnMubmF0aXZlX2NvbnRyb2wuc2VsZWN0ZWRJbmRleCA9IGlkeFxyXG4gICAgICAgIHRoaXMuZm91bmRhdGlvbi5oYW5kbGVDaGFuZ2UoKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25DaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uLmhhbmRsZUNoYW5nZSgpXHJcbiAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGV2ZW50LnRhcmdldC52YWx1ZSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsImltcG9ydCB7IEJhc2VQbHVnaW4gfSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgbWRjU2VsZWN0IGZyb20gJy4vbWRjLXNlbGVjdC52dWUnXHJcblxyXG5leHBvcnQgeyBtZGNTZWxlY3QgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XHJcbiAgbWRjU2VsZWN0XHJcbn0pXHJcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcclxuaW1wb3J0IHsgYXV0b0luaXQgfSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXHJcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxyXG5cclxuYXV0b0luaXQocGx1Z2luKVxyXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2ZXJzaW9uIiwiaW5zdGFsbCIsImtleSIsImNvbXBvbmVudCIsInZtIiwibmFtZSIsIkN1c3RvbUVsZW1lbnQiLCJmdW5jdGlvbmFsIiwicmVuZGVyIiwiY3JlYXRlRWxlbWVudCIsImNvbnRleHQiLCJwcm9wcyIsImlzIiwidGFnIiwiZGF0YSIsImNoaWxkcmVuIiwiQ3VzdG9tRWxlbWVudE1peGluIiwic2NvcGUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJNRENDb21wb25lbnQiLCJyb290IiwiZm91bmRhdGlvbiIsInVuZGVmaW5lZCIsInJvb3RfIiwiYXJncyIsImluaXRpYWxpemUiLCJmb3VuZGF0aW9uXyIsImdldERlZmF1bHRGb3VuZGF0aW9uIiwiaW5pdCIsImluaXRpYWxTeW5jV2l0aERPTSIsIkVycm9yIiwiZGVzdHJveSIsImV2dFR5cGUiLCJoYW5kbGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldnREYXRhIiwic2hvdWxkQnViYmxlIiwiZXZ0IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJidWJibGVzIiwiZG9jdW1lbnQiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJNRENTZWxlY3RBZGFwdGVyIiwiY2xhc3NOYW1lIiwic2hvdWxkRmxvYXQiLCJsYWJlbFdpZHRoIiwiaXNSdGwiLCJjc3NDbGFzc2VzIiwiQk9YIiwiRElTQUJMRUQiLCJST09UIiwiT1VUTElORUQiLCJzdHJpbmdzIiwiQ0hBTkdFX0VWRU5UIiwiTElORV9SSVBQTEVfU0VMRUNUT1IiLCJMQUJFTF9TRUxFQ1RPUiIsIk5BVElWRV9DT05UUk9MX1NFTEVDVE9SIiwiT1VUTElORV9TRUxFQ1RPUiIsIm51bWJlcnMiLCJMQUJFTF9TQ0FMRSIsIk1EQ1NlbGVjdEZvdW5kYXRpb24iLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiaGFzQ2xhc3MiLCJhY3RpdmF0ZUJvdHRvbUxpbmUiLCJkZWFjdGl2YXRlQm90dG9tTGluZSIsImdldFZhbHVlIiwiaGFzTGFiZWwiLCJmbG9hdExhYmVsIiwiZ2V0TGFiZWxXaWR0aCIsImhhc091dGxpbmUiLCJub3RjaE91dGxpbmUiLCJjbG9zZU91dGxpbmUiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsImRlZmF1bHRBZGFwdGVyIiwiZGlzYWJsZWQiLCJvcHRpb25IYXNWYWx1ZSIsImxlbmd0aCIsImhhbmRsZUNoYW5nZSIsIm9wZW5Ob3RjaCIsImxhYmVsU2NhbGUiLCJNRENSaXBwbGVBZGFwdGVyIiwidGFyZ2V0IiwidmFyTmFtZSIsInZhbHVlIiwiVU5CT1VOREVEIiwiQkdfRk9DVVNFRCIsIkZHX0FDVElWQVRJT04iLCJGR19ERUFDVElWQVRJT04iLCJWQVJfTEVGVCIsIlZBUl9UT1AiLCJWQVJfRkdfU0laRSIsIlZBUl9GR19TQ0FMRSIsIlZBUl9GR19UUkFOU0xBVEVfU1RBUlQiLCJWQVJfRkdfVFJBTlNMQVRFX0VORCIsIlBBRERJTkciLCJJTklUSUFMX09SSUdJTl9TQ0FMRSIsIkRFQUNUSVZBVElPTl9USU1FT1VUX01TIiwiRkdfREVBQ1RJVkFUSU9OX01TIiwiVEFQX0RFTEFZX01TIiwic3VwcG9ydHNDc3NWYXJpYWJsZXNfIiwic3VwcG9ydHNQYXNzaXZlXyIsImRldGVjdEVkZ2VQc2V1ZG9WYXJCdWciLCJ3aW5kb3dPYmoiLCJub2RlIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY29tcHV0ZWRTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJoYXNQc2V1ZG9WYXJCdWciLCJib3JkZXJUb3BTdHlsZSIsInJlbW92ZSIsInN1cHBvcnRzQ3NzVmFyaWFibGVzIiwiZm9yY2VSZWZyZXNoIiwic3VwcG9ydHNGdW5jdGlvblByZXNlbnQiLCJDU1MiLCJzdXBwb3J0cyIsImV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMiLCJ3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMiLCJhcHBseVBhc3NpdmUiLCJnbG9iYWxPYmoiLCJpc1N1cHBvcnRlZCIsInBhc3NpdmUiLCJlIiwiZ2V0TWF0Y2hlc1Byb3BlcnR5IiwiSFRNTEVsZW1lbnRQcm90b3R5cGUiLCJmaWx0ZXIiLCJwIiwicG9wIiwiZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzIiwiZXYiLCJwYWdlT2Zmc2V0IiwiY2xpZW50UmVjdCIsIngiLCJ5IiwiZG9jdW1lbnRYIiwibGVmdCIsImRvY3VtZW50WSIsInRvcCIsIm5vcm1hbGl6ZWRYIiwibm9ybWFsaXplZFkiLCJ0eXBlIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsIlBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiYWN0aXZhdGVkVGFyZ2V0cyIsIk1EQ1JpcHBsZUZvdW5kYXRpb24iLCJicm93c2VyU3VwcG9ydHNDc3NWYXJzIiwiaXNVbmJvdW5kZWQiLCJpc1N1cmZhY2VBY3RpdmUiLCJpc1N1cmZhY2VEaXNhYmxlZCIsImNvbnRhaW5zRXZlbnRUYXJnZXQiLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJ1cGRhdGVDc3NWYXJpYWJsZSIsImNvbXB1dGVCb3VuZGluZ1JlY3QiLCJnZXRXaW5kb3dQYWdlT2Zmc2V0IiwibGF5b3V0RnJhbWVfIiwiZnJhbWVfIiwid2lkdGgiLCJoZWlnaHQiLCJhY3RpdmF0aW9uU3RhdGVfIiwiZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8iLCJpbml0aWFsU2l6ZV8iLCJtYXhSYWRpdXNfIiwiYWN0aXZhdGVIYW5kbGVyXyIsImFjdGl2YXRlXyIsImRlYWN0aXZhdGVIYW5kbGVyXyIsImRlYWN0aXZhdGVfIiwiZm9jdXNIYW5kbGVyXyIsImhhbmRsZUZvY3VzIiwiYmx1ckhhbmRsZXJfIiwiaGFuZGxlQmx1ciIsInJlc2l6ZUhhbmRsZXJfIiwibGF5b3V0IiwidW5ib3VuZGVkQ29vcmRzXyIsImZnU2NhbGVfIiwiYWN0aXZhdGlvblRpbWVyXyIsImZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyIsImFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8iLCJhY3RpdmF0aW9uVGltZXJDYWxsYmFja18iLCJydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8iLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudF8iLCJpc0FjdGl2YXRlZCIsImhhc0RlYWN0aXZhdGlvblVYUnVuIiwid2FzQWN0aXZhdGVkQnlQb2ludGVyIiwid2FzRWxlbWVudE1hZGVBY3RpdmUiLCJhY3RpdmF0aW9uRXZlbnQiLCJpc1Byb2dyYW1tYXRpYyIsImlzU3VwcG9ydGVkXyIsInJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImxheW91dEludGVybmFsXyIsImNsZWFyVGltZW91dCIsImRlcmVnaXN0ZXJSb290SGFuZGxlcnNfIiwiZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsInJlbW92ZUNzc1ZhcnNfIiwiZm9yRWFjaCIsIk9iamVjdCIsImtleXMiLCJrIiwiaW5kZXhPZiIsImFjdGl2YXRpb25TdGF0ZSIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50IiwiaXNTYW1lSW50ZXJhY3Rpb24iLCJoYXNBY3RpdmF0ZWRDaGlsZCIsInNvbWUiLCJyZXNldEFjdGl2YXRpb25TdGF0ZV8iLCJwdXNoIiwicmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJjaGVja0VsZW1lbnRNYWRlQWN0aXZlXyIsImFuaW1hdGVBY3RpdmF0aW9uXyIsImtleUNvZGUiLCJldmVudCIsInRyYW5zbGF0ZVN0YXJ0IiwidHJhbnNsYXRlRW5kIiwiZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXyIsInN0YXJ0UG9pbnQiLCJlbmRQb2ludCIsInJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXyIsInNldFRpbWVvdXQiLCJhY3RpdmF0aW9uSGFzRW5kZWQiLCJzdGF0ZSIsImV2dE9iamVjdCIsImFuaW1hdGVEZWFjdGl2YXRpb25fIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJtYXhEaW0iLCJtYXgiLCJnZXRCb3VuZGVkUmFkaXVzIiwiaHlwb3RlbnVzZSIsInNxcnQiLCJwb3ciLCJ1cGRhdGVMYXlvdXRDc3NWYXJzXyIsInJvdW5kIiwidW5ib3VuZGVkIiwiUmlwcGxlQmFzZSIsInJlZiIsIk1BVENIRVMiLCJfbWF0Y2hlcyIsIkhUTUxFbGVtZW50IiwicHJvdG90eXBlIiwib3B0aW9ucyIsIiRlbCIsIiRzZXQiLCJjbGFzc2VzIiwiJGRlbGV0ZSIsImNvbnRhaW5zIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGVzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGFnZVhPZmZzZXQiLCJwYWdlWU9mZnNldCIsIlJpcHBsZU1peGluIiwibW91bnRlZCIsInJpcHBsZSIsImJlZm9yZURlc3Ryb3kiLCJNRENGbG9hdGluZ0xhYmVsQWRhcHRlciIsIkxBQkVMX0ZMT0FUX0FCT1ZFIiwiTEFCRUxfU0hBS0UiLCJNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbiIsImdldFdpZHRoIiwic2hha2VBbmltYXRpb25FbmRIYW5kbGVyXyIsImhhbmRsZVNoYWtlQW5pbWF0aW9uRW5kXyIsInNob3VsZFNoYWtlIiwiTURDTGluZVJpcHBsZUFkYXB0ZXIiLCJwcm9wZXJ0eU5hbWUiLCJMSU5FX1JJUFBMRV9BQ1RJVkUiLCJMSU5FX1JJUFBMRV9ERUFDVElWQVRJTkciLCJNRENMaW5lUmlwcGxlRm91bmRhdGlvbiIsInNldFN0eWxlIiwicmVnaXN0ZXJFdmVudEhhbmRsZXIiLCJkZXJlZ2lzdGVyRXZlbnRIYW5kbGVyIiwidHJhbnNpdGlvbkVuZEhhbmRsZXJfIiwiaGFuZGxlVHJhbnNpdGlvbkVuZCIsInhDb29yZGluYXRlIiwiaXNEZWFjdGl2YXRpbmciLCJNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXIiLCJQQVRIX1NFTEVDVE9SIiwiSURMRV9PVVRMSU5FX1NFTEVDVE9SIiwiT1VUTElORV9OT1RDSEVEIiwiTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uIiwiZ2V0SGVpZ2h0Iiwic2V0T3V0bGluZVBhdGhBdHRyIiwiZ2V0SWRsZU91dGxpbmVTdHlsZVZhbHVlIiwibm90Y2hXaWR0aCIsInVwZGF0ZVN2Z1BhdGhfIiwicmFkaXVzU3R5bGVWYWx1ZSIsInJhZGl1cyIsInBhcnNlRmxvYXQiLCJjb3JuZXJXaWR0aCIsImxlYWRpbmdTdHJva2VMZW5ndGgiLCJhYnMiLCJwYWRkZWROb3RjaFdpZHRoIiwicGF0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
