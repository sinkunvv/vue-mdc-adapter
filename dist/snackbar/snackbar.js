/**
* @module vue-mdc-adaptersnackbar 0.18.2
* @exports VueMDCSnackbar
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCSnackbar = factory());
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
      ROOT: 'mdc-snackbar',
      TEXT: 'mdc-snackbar__text',
      ACTION_WRAPPER: 'mdc-snackbar__action-wrapper',
      ACTION_BUTTON: 'mdc-snackbar__action-button',
      ACTIVE: 'mdc-snackbar--active',
      MULTILINE: 'mdc-snackbar--multiline',
      ACTION_ON_BOTTOM: 'mdc-snackbar--action-on-bottom'
    };

    var strings = {
      TEXT_SELECTOR: '.mdc-snackbar__text',
      ACTION_WRAPPER_SELECTOR: '.mdc-snackbar__action-wrapper',
      ACTION_BUTTON_SELECTOR: '.mdc-snackbar__action-button',
      SHOW_EVENT: 'MDCSnackbar:show',
      HIDE_EVENT: 'MDCSnackbar:hide'
    };

    var numbers = {
      MESSAGE_TIMEOUT: 2750
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

    var MDCSnackbarFoundation = function (_MDCFoundation) {
      inherits(MDCSnackbarFoundation, _MDCFoundation);
      createClass(MDCSnackbarFoundation, [{
        key: 'active',
        get: function get$$1() {
          return this.active_;
        }
      }], [{
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
            setAriaHidden: function setAriaHidden() {},
            unsetAriaHidden: function unsetAriaHidden() {},
            setActionAriaHidden: function setActionAriaHidden() {},
            unsetActionAriaHidden: function unsetActionAriaHidden() {},
            setActionText: function setActionText() /* actionText: string */{},
            setMessageText: function setMessageText() /* message: string */{},
            setFocus: function setFocus() {},
            visibilityIsHidden: function visibilityIsHidden() {
              return (/* boolean */false
              );
            },
            registerCapturedBlurHandler: function registerCapturedBlurHandler() /* handler: EventListener */{},
            deregisterCapturedBlurHandler: function deregisterCapturedBlurHandler() /* handler: EventListener */{},
            registerVisibilityChangeHandler: function registerVisibilityChangeHandler() /* handler: EventListener */{},
            deregisterVisibilityChangeHandler: function deregisterVisibilityChangeHandler() /* handler: EventListener */{},
            registerCapturedInteractionHandler: function registerCapturedInteractionHandler() /* evtType: string, handler: EventListener */{},
            deregisterCapturedInteractionHandler: function deregisterCapturedInteractionHandler() /* evtType: string, handler: EventListener */{},
            registerActionClickHandler: function registerActionClickHandler() /* handler: EventListener */{},
            deregisterActionClickHandler: function deregisterActionClickHandler() /* handler: EventListener */{},
            registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
            deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{},
            notifyShow: function notifyShow() {},
            notifyHide: function notifyHide() {}
          };
        }
      }]);

      function MDCSnackbarFoundation(adapter) {
        classCallCheck(this, MDCSnackbarFoundation);

        var _this = possibleConstructorReturn(this, (MDCSnackbarFoundation.__proto__ || Object.getPrototypeOf(MDCSnackbarFoundation)).call(this, _extends(MDCSnackbarFoundation.defaultAdapter, adapter)));

        _this.active_ = false;
        _this.actionWasClicked_ = false;
        _this.dismissOnAction_ = true;
        _this.firstFocus_ = true;
        _this.pointerDownRecognized_ = false;
        _this.snackbarHasFocus_ = false;
        _this.snackbarData_ = null;
        _this.queue_ = [];
        _this.actionClickHandler_ = function () {
          _this.actionWasClicked_ = true;
          _this.invokeAction_();
        };
        _this.visibilitychangeHandler_ = function () {
          clearTimeout(_this.timeoutId_);
          _this.snackbarHasFocus_ = true;

          if (!_this.adapter_.visibilityIsHidden()) {
            setTimeout(_this.cleanup_.bind(_this), _this.snackbarData_.timeout || numbers.MESSAGE_TIMEOUT);
          }
        };
        _this.interactionHandler_ = function (evt) {
          if (evt.type == 'touchstart' || evt.type == 'mousedown') {
            _this.pointerDownRecognized_ = true;
          }
          _this.handlePossibleTabKeyboardFocus_(evt);

          if (evt.type == 'focus') {
            _this.pointerDownRecognized_ = false;
          }
        };
        _this.blurHandler_ = function () {
          clearTimeout(_this.timeoutId_);
          _this.snackbarHasFocus_ = false;
          _this.timeoutId_ = setTimeout(_this.cleanup_.bind(_this), _this.snackbarData_.timeout || numbers.MESSAGE_TIMEOUT);
        };
        return _this;
      }

      createClass(MDCSnackbarFoundation, [{
        key: 'init',
        value: function init() {
          this.adapter_.registerActionClickHandler(this.actionClickHandler_);
          this.adapter_.setAriaHidden();
          this.adapter_.setActionAriaHidden();
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          var _this2 = this;

          this.adapter_.deregisterActionClickHandler(this.actionClickHandler_);
          this.adapter_.deregisterCapturedBlurHandler(this.blurHandler_);
          this.adapter_.deregisterVisibilityChangeHandler(this.visibilitychangeHandler_);
          ['touchstart', 'mousedown', 'focus'].forEach(function (evtType) {
            _this2.adapter_.deregisterCapturedInteractionHandler(evtType, _this2.interactionHandler_);
          });
        }
      }, {
        key: 'dismissesOnAction',
        value: function dismissesOnAction() {
          return this.dismissOnAction_;
        }
      }, {
        key: 'setDismissOnAction',
        value: function setDismissOnAction(dismissOnAction) {
          this.dismissOnAction_ = !!dismissOnAction;
        }
      }, {
        key: 'show',
        value: function show(data) {
          var _this3 = this;

          if (!data) {
            throw new Error('Please provide a data object with at least a message to display.');
          }
          if (!data.message) {
            throw new Error('Please provide a message to be displayed.');
          }
          if (data.actionHandler && !data.actionText) {
            throw new Error('Please provide action text with the handler.');
          }
          if (this.active) {
            this.queue_.push(data);
            return;
          }
          clearTimeout(this.timeoutId_);
          this.snackbarData_ = data;
          this.firstFocus_ = true;
          this.adapter_.registerVisibilityChangeHandler(this.visibilitychangeHandler_);
          this.adapter_.registerCapturedBlurHandler(this.blurHandler_);
          ['touchstart', 'mousedown', 'focus'].forEach(function (evtType) {
            _this3.adapter_.registerCapturedInteractionHandler(evtType, _this3.interactionHandler_);
          });

          var ACTIVE = cssClasses.ACTIVE,
              MULTILINE = cssClasses.MULTILINE,
              ACTION_ON_BOTTOM = cssClasses.ACTION_ON_BOTTOM;


          this.adapter_.setMessageText(this.snackbarData_.message);

          if (this.snackbarData_.multiline) {
            this.adapter_.addClass(MULTILINE);
            if (this.snackbarData_.actionOnBottom) {
              this.adapter_.addClass(ACTION_ON_BOTTOM);
            }
          }

          if (this.snackbarData_.actionHandler) {
            this.adapter_.setActionText(this.snackbarData_.actionText);
            this.actionHandler_ = this.snackbarData_.actionHandler;
            this.setActionHidden_(false);
          } else {
            this.setActionHidden_(true);
            this.actionHandler_ = null;
            this.adapter_.setActionText(null);
          }

          this.active_ = true;
          this.adapter_.addClass(ACTIVE);
          this.adapter_.unsetAriaHidden();
          this.adapter_.notifyShow();

          this.timeoutId_ = setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers.MESSAGE_TIMEOUT);
        }
      }, {
        key: 'handlePossibleTabKeyboardFocus_',
        value: function handlePossibleTabKeyboardFocus_() {
          var hijackFocus = this.firstFocus_ && !this.pointerDownRecognized_;

          if (hijackFocus) {
            this.setFocusOnAction_();
          }

          this.firstFocus_ = false;
        }
      }, {
        key: 'setFocusOnAction_',
        value: function setFocusOnAction_() {
          this.adapter_.setFocus();
          this.snackbarHasFocus_ = true;
          this.firstFocus_ = false;
        }
      }, {
        key: 'invokeAction_',
        value: function invokeAction_() {
          try {
            if (!this.actionHandler_) {
              return;
            }

            this.actionHandler_();
          } finally {
            if (this.dismissOnAction_) {
              this.cleanup_();
            }
          }
        }
      }, {
        key: 'cleanup_',
        value: function cleanup_() {
          var _this4 = this;

          var allowDismissal = !this.snackbarHasFocus_ || this.actionWasClicked_;

          if (allowDismissal) {
            var ACTIVE = cssClasses.ACTIVE,
                MULTILINE = cssClasses.MULTILINE,
                ACTION_ON_BOTTOM = cssClasses.ACTION_ON_BOTTOM;


            this.adapter_.removeClass(ACTIVE);

            var handler = function handler() {
              clearTimeout(_this4.timeoutId_);
              _this4.adapter_.deregisterTransitionEndHandler(handler);
              _this4.adapter_.removeClass(MULTILINE);
              _this4.adapter_.removeClass(ACTION_ON_BOTTOM);
              _this4.setActionHidden_(true);
              _this4.adapter_.setAriaHidden();
              _this4.active_ = false;
              _this4.snackbarHasFocus_ = false;
              _this4.adapter_.notifyHide();
              _this4.showNext_();
            };

            this.adapter_.registerTransitionEndHandler(handler);
          }
        }
      }, {
        key: 'showNext_',
        value: function showNext_() {
          if (!this.queue_.length) {
            return;
          }
          this.show(this.queue_.shift());
        }
      }, {
        key: 'setActionHidden_',
        value: function setActionHidden_(isHidden) {
          if (isHidden) {
            this.adapter_.setActionAriaHidden();
          } else {
            this.adapter_.unsetActionAriaHidden();
          }
        }
      }]);
      return MDCSnackbarFoundation;
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
    function getCorrectEventName(windowObj, eventType) {
      return getAnimationName(windowObj, eventType);
    }

    //

    var script = {
      name: 'mdc-snackbar',
      model: {
        prop: 'snack',
        event: 'queued'
      },
      props: {
        'align-start': Boolean,
        snack: Object,
        event: String,
        'event-source': {
          type: Object,
          required: false,
          default: function _default() {
            return this.$root;
          }
        },
        'dismisses-on-action': {
          type: Boolean,
          default: true
        }
      },
      data: function data() {
        return {
          classes: {
            'mdc-snackbar--align-start': this.alignStart
          },
          message: '',
          actionText: '',
          hidden: false,
          actionHidden: false
        };
      },

      watch: {
        snack: 'onSnack'
      },
      mounted: function mounted() {
        var _this = this;

        this.foundation = new MDCSnackbarFoundation({
          addClass: function addClass(className) {
            return _this.$set(_this.classes, className, true);
          },
          removeClass: function removeClass(className) {
            return _this.$delete(_this.classes, className);
          },
          setAriaHidden: function setAriaHidden() {
            return _this.hidden = true;
          },
          unsetAriaHidden: function unsetAriaHidden() {
            return _this.hidden = false;
          },
          setActionAriaHidden: function setActionAriaHidden() {
            return _this.actionHidden = true;
          },
          unsetActionAriaHidden: function unsetActionAriaHidden() {
            return _this.actionHidden = false;
          },
          setActionText: function setActionText(text) {
            _this.actionText = text;
          },
          setMessageText: function setMessageText(text) {
            _this.message = text;
          },
          setFocus: function setFocus() {
            return _this.$refs.button.focus();
          },
          visibilityIsHidden: function visibilityIsHidden() {
            return document.hidden;
          },
          registerCapturedBlurHandler: function registerCapturedBlurHandler(handler) {
            return _this.$refs.button.addEventListener('blur', handler, true);
          },
          deregisterCapturedBlurHandler: function deregisterCapturedBlurHandler(handler) {
            return _this.$refs.button.removeEventListener('blur', handler, true);
          },
          registerVisibilityChangeHandler: function registerVisibilityChangeHandler(handler) {
            return document.addEventListener('visibilitychange', handler);
          },
          deregisterVisibilityChangeHandler: function deregisterVisibilityChangeHandler(handler) {
            return document.removeEventListener('visibilitychange', handler);
          },
          registerCapturedInteractionHandler: function registerCapturedInteractionHandler(evt, handler) {
            return document.body.addEventListener(evt, handler, true);
          },
          deregisterCapturedInteractionHandler: function deregisterCapturedInteractionHandler(evt, handler) {
            return document.body.removeEventListener(evt, handler, true);
          },
          registerActionClickHandler: function registerActionClickHandler(handler) {
            return _this.$refs.button.addEventListener('click', handler);
          },
          deregisterActionClickHandler: function deregisterActionClickHandler(handler) {
            return _this.$refs.button.removeEventListener('click', handler);
          },
          registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
            var root = _this.$refs.root;
            root && root.addEventListener(getCorrectEventName(window, 'transitionend'), handler);
          },
          deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
            var root = _this.$refs.root;
            root && root.removeEventListener(getCorrectEventName(window, 'transitionend'), handler);
          },
          notifyShow: function notifyShow() {
            return _this.$emit('show');
          },
          notifyHide: function notifyHide() {
            return _this.$emit('hide');
          }
        });
        this.foundation.init();

        // if event specified use it, else if no snack prop then use default.
        this.eventName = this.event || (this.snack === void 0 ? 'show-snackbar' : null);
        if (this.eventName) {
          this.eventSource.$on(this.eventName, this.show);
        }
        this.foundation.setDismissOnAction(this.dismissesOnAction);
      },
      beforeDestroy: function beforeDestroy() {
        if (this.eventSource) {
          this.eventSource.$off(this.eventName, this.show);
        }
        this.foundation.destroy();
      },

      methods: {
        onSnack: function onSnack(snack) {
          if (snack && snack.message) {
            this.foundation.show(snack);
            this.$emit('queued', snack);
          }
        },
        show: function show(data) {
          this.foundation.show(data);
        }
      }
    };

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", {
        ref: "root",
        staticClass: "mdc-snackbar",
        class: _vm.classes,
        attrs: {
          "aria-hidden": _vm.hidden,
          "aria-live": "assertive",
          "aria-atomic": "true"
        }
      }, [_c("div", { staticClass: "mdc-snackbar__text" }, [_vm._v(_vm._s(_vm.message))]), _vm._v(" "), _c("div", { staticClass: "mdc-snackbar__action-wrapper" }, [_c("button", {
        ref: "button",
        staticClass: "mdc-snackbar__action-button",
        attrs: { "aria-hidden": _vm.actionHidden, type: "button" }
      }, [_vm._v(_vm._s(_vm.actionText))])])]);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\snackbar\\mdc-snackbar.vue";

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

    var mdcSnackbar = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

    var plugin = BasePlugin({
      mdcSnackbar: mdcSnackbar
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2tiYXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9zbmFja2Jhci9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3NuYWNrYmFyL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2FuaW1hdGlvbi9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvc25hY2tiYXIvbWRjLXNuYWNrYmFyLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvc25hY2tiYXIvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL3NuYWNrYmFyL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdChwbHVnaW4pIHtcclxuICAvLyBBdXRvLWluc3RhbGxcclxuICBsZXQgX1Z1ZSA9IG51bGxcclxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIF9WdWUgPSB3aW5kb3cuVnVlXHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cclxuICAgIF9WdWUgPSBnbG9iYWwuVnVlXHJcbiAgfVxyXG4gIGlmIChfVnVlKSB7XHJcbiAgICBfVnVlLnVzZShwbHVnaW4pXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luKGNvbXBvbmVudHMpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcclxuICAgIGluc3RhbGw6IHZtID0+IHtcclxuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXHJcbiAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRzXHJcbiAgfVxyXG59XHJcbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcclxuICBsZXQgZXZ0XHJcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcclxuICAgICAgZGV0YWlsOiBldnREYXRhLFxyXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcclxuICAgIH0pXHJcbiAgfSBlbHNlIHtcclxuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXHJcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXHJcbiAgfVxyXG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxyXG59XHJcbiIsImNvbnN0IHNjb3BlID1cclxuICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDB4MTAwMDAwMDApKS50b1N0cmluZygpICsgJy0nXHJcblxyXG5leHBvcnQgY29uc3QgVk1BVW5pcXVlSWRNaXhpbiA9IHtcclxuICBiZWZvcmVDcmVhdGUoKSB7XHJcbiAgICB0aGlzLnZtYV91aWRfID0gc2NvcGUgKyB0aGlzLl91aWRcclxuICB9XHJcbn1cclxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIEFcbiAqL1xuY2xhc3MgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgZXZlcnlcbiAgICAvLyBDU1MgY2xhc3MgdGhlIGZvdW5kYXRpb24gY2xhc3MgbmVlZHMgYXMgYSBwcm9wZXJ0eS4gZS5nLiB7QUNUSVZFOiAnbWRjLWNvbXBvbmVudC0tYWN0aXZlJ31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIHNlbWFudGljIHN0cmluZ3MgYXMgY29uc3RhbnRzLiBlLmcuIHtBUklBX1JPTEU6ICd0YWJsaXN0J31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIG9mIGl0cyBzZW1hbnRpYyBudW1iZXJzIGFzIGNvbnN0YW50cy4gZS5nLiB7QU5JTUFUSU9OX0RFTEFZX01TOiAzNTB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFPYmplY3R9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBtYXkgY2hvb3NlIHRvIGltcGxlbWVudCB0aGlzIGdldHRlciBpbiBvcmRlciB0byBwcm92aWRlIGEgY29udmVuaWVudFxuICAgIC8vIHdheSBvZiB2aWV3aW5nIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBvZiBhbiBhZGFwdGVyLiBJbiB0aGUgZnV0dXJlLCB0aGlzIGNvdWxkIGFsc28gYmUgdXNlZCBmb3IgYWRhcHRlclxuICAgIC8vIHZhbGlkYXRpb24uXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QT19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshQX0gKi9cbiAgICB0aGlzLmFkYXB0ZXJfID0gYWRhcHRlcjtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBpbml0aWFsaXphdGlvbiByb3V0aW5lcyAocmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGRlLWluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChkZS1yZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBGXG4gKi9cbmNsYXNzIE1EQ0NvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEByZXR1cm4geyFNRENDb21wb25lbnR9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIC8vIFN1YmNsYXNzZXMgd2hpY2ggZXh0ZW5kIE1EQ0Jhc2Ugc2hvdWxkIHByb3ZpZGUgYW4gYXR0YWNoVG8oKSBtZXRob2QgdGhhdCB0YWtlcyBhIHJvb3QgZWxlbWVudCBhbmRcbiAgICAvLyByZXR1cm5zIGFuIGluc3RhbnRpYXRlZCBjb21wb25lbnQgd2l0aCBpdHMgcm9vdCBzZXQgdG8gdGhhdCBlbGVtZW50LiBBbHNvIG5vdGUgdGhhdCBpbiB0aGUgY2FzZXMgb2ZcbiAgICAvLyBzdWJjbGFzc2VzLCBhbiBleHBsaWNpdCBmb3VuZGF0aW9uIGNsYXNzIHdpbGwgbm90IGhhdmUgdG8gYmUgcGFzc2VkIGluOyBpdCB3aWxsIHNpbXBseSBiZSBpbml0aWFsaXplZFxuICAgIC8vIGZyb20gZ2V0RGVmYXVsdEZvdW5kYXRpb24oKS5cbiAgICByZXR1cm4gbmV3IE1EQ0NvbXBvbmVudChyb290LCBuZXcgTURDRm91bmRhdGlvbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEBwYXJhbSB7Rj19IGZvdW5kYXRpb25cbiAgICogQHBhcmFtIHsuLi4/fSBhcmdzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihyb290LCBmb3VuZGF0aW9uID0gdW5kZWZpbmVkLCAuLi5hcmdzKSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFFbGVtZW50fSAqL1xuICAgIHRoaXMucm9vdF8gPSByb290O1xuICAgIHRoaXMuaW5pdGlhbGl6ZSguLi5hcmdzKTtcbiAgICAvLyBOb3RlIHRoYXQgd2UgaW5pdGlhbGl6ZSBmb3VuZGF0aW9uIGhlcmUgYW5kIG5vdCB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yJ3MgZGVmYXVsdCBwYXJhbSBzbyB0aGF0XG4gICAgLy8gdGhpcy5yb290XyBpcyBkZWZpbmVkIGFuZCBjYW4gYmUgdXNlZCB3aXRoaW4gdGhlIGZvdW5kYXRpb24gY2xhc3MuXG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFGfSAqL1xuICAgIHRoaXMuZm91bmRhdGlvbl8gPSBmb3VuZGF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLmdldERlZmF1bHRGb3VuZGF0aW9uKCkgOiBmb3VuZGF0aW9uO1xuICAgIHRoaXMuZm91bmRhdGlvbl8uaW5pdCgpO1xuICAgIHRoaXMuaW5pdGlhbFN5bmNXaXRoRE9NKCk7XG4gIH1cblxuICBpbml0aWFsaXplKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICAvLyBTdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIHRvIGRvIGFueSBhZGRpdGlvbmFsIHNldHVwIHdvcmsgdGhhdCB3b3VsZCBiZSBjb25zaWRlcmVkIHBhcnQgb2YgYVxuICAgIC8vIFwiY29uc3RydWN0b3JcIi4gRXNzZW50aWFsbHksIGl0IGlzIGEgaG9vayBpbnRvIHRoZSBwYXJlbnQgY29uc3RydWN0b3IgYmVmb3JlIHRoZSBmb3VuZGF0aW9uIGlzXG4gICAgLy8gaW5pdGlhbGl6ZWQuIEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBiZXNpZGVzIHJvb3QgYW5kIGZvdW5kYXRpb24gd2lsbCBiZSBwYXNzZWQgaW4gaGVyZS5cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshRn0gZm91bmRhdGlvblxuICAgKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgZm91bmRhdGlvbiBjbGFzcyBmb3IgdGhlXG4gICAgLy8gY29tcG9uZW50LlxuICAgIHRocm93IG5ldyBFcnJvcignU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIGdldERlZmF1bHRGb3VuZGF0aW9uIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgJyArXG4gICAgICAnZm91bmRhdGlvbiBjbGFzcycpO1xuICB9XG5cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIGlmIHRoZXkgbmVlZCB0byBwZXJmb3JtIHdvcmsgdG8gc3luY2hyb25pemUgd2l0aCBhIGhvc3QgRE9NXG4gICAgLy8gb2JqZWN0LiBBbiBleGFtcGxlIG9mIHRoaXMgd291bGQgYmUgYSBmb3JtIGNvbnRyb2wgd3JhcHBlciB0aGF0IG5lZWRzIHRvIHN5bmNocm9uaXplIGl0cyBpbnRlcm5hbCBzdGF0ZVxuICAgIC8vIHRvIHNvbWUgcHJvcGVydHkgb3IgYXR0cmlidXRlIG9mIHRoZSBob3N0IERPTS4gUGxlYXNlIG5vdGU6IHRoaXMgaXMgKm5vdCogdGhlIHBsYWNlIHRvIHBlcmZvcm0gRE9NXG4gICAgLy8gcmVhZHMvd3JpdGVzIHRoYXQgd291bGQgY2F1c2UgbGF5b3V0IC8gcGFpbnQsIGFzIHRoaXMgaXMgY2FsbGVkIHN5bmNocm9ub3VzbHkgZnJvbSB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yLlxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG1heSBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmVsZWFzZSBhbnkgcmVzb3VyY2VzIC8gZGVyZWdpc3RlciBhbnkgbGlzdGVuZXJzIHRoZXkgaGF2ZVxuICAgIC8vIGF0dGFjaGVkLiBBbiBleGFtcGxlIG9mIHRoaXMgbWlnaHQgYmUgZGVyZWdpc3RlcmluZyBhIHJlc2l6ZSBldmVudCBmcm9tIHRoZSB3aW5kb3cgb2JqZWN0LlxuICAgIHRoaXMuZm91bmRhdGlvbl8uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIGFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogbGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgbGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiB1bmxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHVubGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgYSBjcm9zcy1icm93c2VyLWNvbXBhdGlibGUgY3VzdG9tIGV2ZW50IGZyb20gdGhlIGNvbXBvbmVudCByb290IG9mIHRoZSBnaXZlbiB0eXBlLFxuICAgKiB3aXRoIHRoZSBnaXZlbiBkYXRhLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFPYmplY3R9IGV2dERhdGFcbiAgICogQHBhcmFtIHtib29sZWFuPX0gc2hvdWxkQnViYmxlXG4gICAqL1xuICBlbWl0KGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gICAgbGV0IGV2dDtcbiAgICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5yb290Xy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDQ29tcG9uZW50O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJy4vY29tcG9uZW50JztcblxuZXhwb3J0IHtNRENGb3VuZGF0aW9uLCBNRENDb21wb25lbnR9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmV4cG9ydCBjb25zdCBjc3NDbGFzc2VzID0ge1xuICBST09UOiAnbWRjLXNuYWNrYmFyJyxcbiAgVEVYVDogJ21kYy1zbmFja2Jhcl9fdGV4dCcsXG4gIEFDVElPTl9XUkFQUEVSOiAnbWRjLXNuYWNrYmFyX19hY3Rpb24td3JhcHBlcicsXG4gIEFDVElPTl9CVVRUT046ICdtZGMtc25hY2tiYXJfX2FjdGlvbi1idXR0b24nLFxuICBBQ1RJVkU6ICdtZGMtc25hY2tiYXItLWFjdGl2ZScsXG4gIE1VTFRJTElORTogJ21kYy1zbmFja2Jhci0tbXVsdGlsaW5lJyxcbiAgQUNUSU9OX09OX0JPVFRPTTogJ21kYy1zbmFja2Jhci0tYWN0aW9uLW9uLWJvdHRvbScsXG59O1xuXG5leHBvcnQgY29uc3Qgc3RyaW5ncyA9IHtcbiAgVEVYVF9TRUxFQ1RPUjogJy5tZGMtc25hY2tiYXJfX3RleHQnLFxuICBBQ1RJT05fV1JBUFBFUl9TRUxFQ1RPUjogJy5tZGMtc25hY2tiYXJfX2FjdGlvbi13cmFwcGVyJyxcbiAgQUNUSU9OX0JVVFRPTl9TRUxFQ1RPUjogJy5tZGMtc25hY2tiYXJfX2FjdGlvbi1idXR0b24nLFxuICBTSE9XX0VWRU5UOiAnTURDU25hY2tiYXI6c2hvdycsXG4gIEhJREVfRVZFTlQ6ICdNRENTbmFja2JhcjpoaWRlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBudW1iZXJzID0ge1xuICBNRVNTQUdFX1RJTUVPVVQ6IDI3NTAsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtNRENGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvYmFzZS9pbmRleCc7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTURDU25hY2tiYXJGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBzZXRBcmlhSGlkZGVuOiAoKSA9PiB7fSxcbiAgICAgIHVuc2V0QXJpYUhpZGRlbjogKCkgPT4ge30sXG4gICAgICBzZXRBY3Rpb25BcmlhSGlkZGVuOiAoKSA9PiB7fSxcbiAgICAgIHVuc2V0QWN0aW9uQXJpYUhpZGRlbjogKCkgPT4ge30sXG4gICAgICBzZXRBY3Rpb25UZXh0OiAoLyogYWN0aW9uVGV4dDogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldE1lc3NhZ2VUZXh0OiAoLyogbWVzc2FnZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldEZvY3VzOiAoKSA9PiB7fSxcbiAgICAgIHZpc2liaWxpdHlJc0hpZGRlbjogKCkgPT4gLyogYm9vbGVhbiAqLyBmYWxzZSxcbiAgICAgIHJlZ2lzdGVyQ2FwdHVyZWRCbHVySGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckNhcHR1cmVkQmx1ckhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyVmlzaWJpbGl0eUNoYW5nZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJWaXNpYmlsaXR5Q2hhbmdlSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJDYXB0dXJlZEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyQ2FwdHVyZWRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJBY3Rpb25DbGlja0hhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJBY3Rpb25DbGlja0hhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgbm90aWZ5U2hvdzogKCkgPT4ge30sXG4gICAgICBub3RpZnlIaWRlOiAoKSA9PiB7fSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVfO1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDU25hY2tiYXJGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICB0aGlzLmFjdGl2ZV8gPSBmYWxzZTtcbiAgICB0aGlzLmFjdGlvbldhc0NsaWNrZWRfID0gZmFsc2U7XG4gICAgdGhpcy5kaXNtaXNzT25BY3Rpb25fID0gdHJ1ZTtcbiAgICB0aGlzLmZpcnN0Rm9jdXNfID0gdHJ1ZTtcbiAgICB0aGlzLnBvaW50ZXJEb3duUmVjb2duaXplZF8gPSBmYWxzZTtcbiAgICB0aGlzLnNuYWNrYmFySGFzRm9jdXNfID0gZmFsc2U7XG4gICAgdGhpcy5zbmFja2JhckRhdGFfID0gbnVsbDtcbiAgICB0aGlzLnF1ZXVlXyA9IFtdO1xuICAgIHRoaXMuYWN0aW9uQ2xpY2tIYW5kbGVyXyA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aW9uV2FzQ2xpY2tlZF8gPSB0cnVlO1xuICAgICAgdGhpcy5pbnZva2VBY3Rpb25fKCk7XG4gICAgfTtcbiAgICB0aGlzLnZpc2liaWxpdHljaGFuZ2VIYW5kbGVyXyA9ICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRJZF8pO1xuICAgICAgdGhpcy5zbmFja2Jhckhhc0ZvY3VzXyA9IHRydWU7XG5cbiAgICAgIGlmICghdGhpcy5hZGFwdGVyXy52aXNpYmlsaXR5SXNIaWRkZW4oKSkge1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMuY2xlYW51cF8uYmluZCh0aGlzKSwgdGhpcy5zbmFja2JhckRhdGFfLnRpbWVvdXQgfHwgbnVtYmVycy5NRVNTQUdFX1RJTUVPVVQpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5pbnRlcmFjdGlvbkhhbmRsZXJfID0gKGV2dCkgPT4ge1xuICAgICAgaWYgKGV2dC50eXBlID09ICd0b3VjaHN0YXJ0JyB8fCBldnQudHlwZSA9PSAnbW91c2Vkb3duJykge1xuICAgICAgICB0aGlzLnBvaW50ZXJEb3duUmVjb2duaXplZF8gPSB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5oYW5kbGVQb3NzaWJsZVRhYktleWJvYXJkRm9jdXNfKGV2dCk7XG5cbiAgICAgIGlmIChldnQudHlwZSA9PSAnZm9jdXMnKSB7XG4gICAgICAgIHRoaXMucG9pbnRlckRvd25SZWNvZ25pemVkXyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0SWRfKTtcbiAgICAgIHRoaXMuc25hY2tiYXJIYXNGb2N1c18gPSBmYWxzZTtcbiAgICAgIHRoaXMudGltZW91dElkXyA9IHNldFRpbWVvdXQodGhpcy5jbGVhbnVwXy5iaW5kKHRoaXMpLCB0aGlzLnNuYWNrYmFyRGF0YV8udGltZW91dCB8fCBudW1iZXJzLk1FU1NBR0VfVElNRU9VVCk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckFjdGlvbkNsaWNrSGFuZGxlcih0aGlzLmFjdGlvbkNsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0QXJpYUhpZGRlbigpO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0QWN0aW9uQXJpYUhpZGRlbigpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJBY3Rpb25DbGlja0hhbmRsZXIodGhpcy5hY3Rpb25DbGlja0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJDYXB0dXJlZEJsdXJIYW5kbGVyKHRoaXMuYmx1ckhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJWaXNpYmlsaXR5Q2hhbmdlSGFuZGxlcih0aGlzLnZpc2liaWxpdHljaGFuZ2VIYW5kbGVyXyk7XG4gICAgWyd0b3VjaHN0YXJ0JywgJ21vdXNlZG93bicsICdmb2N1cyddLmZvckVhY2goKGV2dFR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckNhcHR1cmVkSW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIHRoaXMuaW50ZXJhY3Rpb25IYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICBkaXNtaXNzZXNPbkFjdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kaXNtaXNzT25BY3Rpb25fO1xuICB9XG5cbiAgc2V0RGlzbWlzc09uQWN0aW9uKGRpc21pc3NPbkFjdGlvbikge1xuICAgIHRoaXMuZGlzbWlzc09uQWN0aW9uXyA9ICEhZGlzbWlzc09uQWN0aW9uO1xuICB9XG5cbiAgc2hvdyhkYXRhKSB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdQbGVhc2UgcHJvdmlkZSBhIGRhdGEgb2JqZWN0IHdpdGggYXQgbGVhc3QgYSBtZXNzYWdlIHRvIGRpc3BsYXkuJyk7XG4gICAgfVxuICAgIGlmICghZGF0YS5tZXNzYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGEgbWVzc2FnZSB0byBiZSBkaXNwbGF5ZWQuJyk7XG4gICAgfVxuICAgIGlmIChkYXRhLmFjdGlvbkhhbmRsZXIgJiYgIWRhdGEuYWN0aW9uVGV4dCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBhY3Rpb24gdGV4dCB3aXRoIHRoZSBoYW5kbGVyLicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHRoaXMucXVldWVfLnB1c2goZGF0YSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRJZF8pO1xuICAgIHRoaXMuc25hY2tiYXJEYXRhXyA9IGRhdGE7XG4gICAgdGhpcy5maXJzdEZvY3VzXyA9IHRydWU7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclZpc2liaWxpdHlDaGFuZ2VIYW5kbGVyKHRoaXMudmlzaWJpbGl0eWNoYW5nZUhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyQ2FwdHVyZWRCbHVySGFuZGxlcih0aGlzLmJsdXJIYW5kbGVyXyk7XG4gICAgWyd0b3VjaHN0YXJ0JywgJ21vdXNlZG93bicsICdmb2N1cyddLmZvckVhY2goKGV2dFR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJDYXB0dXJlZEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCB0aGlzLmludGVyYWN0aW9uSGFuZGxlcl8pO1xuICAgIH0pO1xuXG4gICAgY29uc3Qge0FDVElWRSwgTVVMVElMSU5FLCBBQ1RJT05fT05fQk9UVE9NfSA9IGNzc0NsYXNzZXM7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnNldE1lc3NhZ2VUZXh0KHRoaXMuc25hY2tiYXJEYXRhXy5tZXNzYWdlKTtcblxuICAgIGlmICh0aGlzLnNuYWNrYmFyRGF0YV8ubXVsdGlsaW5lKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1VTFRJTElORSk7XG4gICAgICBpZiAodGhpcy5zbmFja2JhckRhdGFfLmFjdGlvbk9uQm90dG9tKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoQUNUSU9OX09OX0JPVFRPTSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc25hY2tiYXJEYXRhXy5hY3Rpb25IYW5kbGVyKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEFjdGlvblRleHQodGhpcy5zbmFja2JhckRhdGFfLmFjdGlvblRleHQpO1xuICAgICAgdGhpcy5hY3Rpb25IYW5kbGVyXyA9IHRoaXMuc25hY2tiYXJEYXRhXy5hY3Rpb25IYW5kbGVyO1xuICAgICAgdGhpcy5zZXRBY3Rpb25IaWRkZW5fKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRBY3Rpb25IaWRkZW5fKHRydWUpO1xuICAgICAgdGhpcy5hY3Rpb25IYW5kbGVyXyA9IG51bGw7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEFjdGlvblRleHQobnVsbCk7XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVfID0gdHJ1ZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEFDVElWRSk7XG4gICAgdGhpcy5hZGFwdGVyXy51bnNldEFyaWFIaWRkZW4oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeVNob3coKTtcblxuICAgIHRoaXMudGltZW91dElkXyA9IHNldFRpbWVvdXQodGhpcy5jbGVhbnVwXy5iaW5kKHRoaXMpLCB0aGlzLnNuYWNrYmFyRGF0YV8udGltZW91dCB8fCBudW1iZXJzLk1FU1NBR0VfVElNRU9VVCk7XG4gIH1cblxuICBoYW5kbGVQb3NzaWJsZVRhYktleWJvYXJkRm9jdXNfKCkge1xuICAgIGNvbnN0IGhpamFja0ZvY3VzID1cbiAgICAgIHRoaXMuZmlyc3RGb2N1c18gJiYgIXRoaXMucG9pbnRlckRvd25SZWNvZ25pemVkXztcblxuICAgIGlmIChoaWphY2tGb2N1cykge1xuICAgICAgdGhpcy5zZXRGb2N1c09uQWN0aW9uXygpO1xuICAgIH1cblxuICAgIHRoaXMuZmlyc3RGb2N1c18gPSBmYWxzZTtcbiAgfVxuXG4gIHNldEZvY3VzT25BY3Rpb25fKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0Rm9jdXMoKTtcbiAgICB0aGlzLnNuYWNrYmFySGFzRm9jdXNfID0gdHJ1ZTtcbiAgICB0aGlzLmZpcnN0Rm9jdXNfID0gZmFsc2U7XG4gIH1cblxuICBpbnZva2VBY3Rpb25fKCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXRoaXMuYWN0aW9uSGFuZGxlcl8pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFjdGlvbkhhbmRsZXJfKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmICh0aGlzLmRpc21pc3NPbkFjdGlvbl8pIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwXygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNsZWFudXBfKCkge1xuICAgIGNvbnN0IGFsbG93RGlzbWlzc2FsID0gIXRoaXMuc25hY2tiYXJIYXNGb2N1c18gfHwgdGhpcy5hY3Rpb25XYXNDbGlja2VkXztcblxuICAgIGlmIChhbGxvd0Rpc21pc3NhbCkge1xuICAgICAgY29uc3Qge0FDVElWRSwgTVVMVElMSU5FLCBBQ1RJT05fT05fQk9UVE9NfSA9IGNzc0NsYXNzZXM7XG5cbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoQUNUSVZFKTtcblxuICAgICAgY29uc3QgaGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElkXyk7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyKGhhbmRsZXIpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1VTFRJTElORSk7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoQUNUSU9OX09OX0JPVFRPTSk7XG4gICAgICAgIHRoaXMuc2V0QWN0aW9uSGlkZGVuXyh0cnVlKTtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5zZXRBcmlhSGlkZGVuKCk7XG4gICAgICAgIHRoaXMuYWN0aXZlXyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNuYWNrYmFySGFzRm9jdXNfID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5SGlkZSgpO1xuICAgICAgICB0aGlzLnNob3dOZXh0XygpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyKGhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIHNob3dOZXh0XygpIHtcbiAgICBpZiAoIXRoaXMucXVldWVfLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNob3codGhpcy5xdWV1ZV8uc2hpZnQoKSk7XG4gIH1cblxuICBzZXRBY3Rpb25IaWRkZW5fKGlzSGlkZGVuKSB7XG4gICAgaWYgKGlzSGlkZGVuKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEFjdGlvbkFyaWFIaWRkZW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy51bnNldEFjdGlvbkFyaWFIaWRkZW4oKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIG5vUHJlZml4OiBzdHJpbmcsXG4gKiAgIHdlYmtpdFByZWZpeDogc3RyaW5nLFxuICogICBzdHlsZVByb3BlcnR5OiBzdHJpbmdcbiAqIH19XG4gKi9cbmxldCBWZW5kb3JQcm9wZXJ0eU1hcFR5cGU7XG5cbi8qKiBAY29uc3Qge09iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSAqL1xuY29uc3QgZXZlbnRUeXBlTWFwID0ge1xuICAnYW5pbWF0aW9uc3RhcnQnOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb25zdGFydCcsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uU3RhcnQnLFxuICAgIHN0eWxlUHJvcGVydHk6ICdhbmltYXRpb24nLFxuICB9LFxuICAnYW5pbWF0aW9uZW5kJzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uZW5kJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRBbmltYXRpb25FbmQnLFxuICAgIHN0eWxlUHJvcGVydHk6ICdhbmltYXRpb24nLFxuICB9LFxuICAnYW5pbWF0aW9uaXRlcmF0aW9uJzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uaXRlcmF0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRBbmltYXRpb25JdGVyYXRpb24nLFxuICAgIHN0eWxlUHJvcGVydHk6ICdhbmltYXRpb24nLFxuICB9LFxuICAndHJhbnNpdGlvbmVuZCc6IHtcbiAgICBub1ByZWZpeDogJ3RyYW5zaXRpb25lbmQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgIHN0eWxlUHJvcGVydHk6ICd0cmFuc2l0aW9uJyxcbiAgfSxcbn07XG5cbi8qKiBAY29uc3Qge09iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSAqL1xuY29uc3QgY3NzUHJvcGVydHlNYXAgPSB7XG4gICdhbmltYXRpb24nOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb24nLFxuICAgIHdlYmtpdFByZWZpeDogJy13ZWJraXQtYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ3RyYW5zZm9ybSc6IHtcbiAgICBub1ByZWZpeDogJ3RyYW5zZm9ybScsXG4gICAgd2Via2l0UHJlZml4OiAnLXdlYmtpdC10cmFuc2Zvcm0nLFxuICB9LFxuICAndHJhbnNpdGlvbic6IHtcbiAgICBub1ByZWZpeDogJ3RyYW5zaXRpb24nLFxuICAgIHdlYmtpdFByZWZpeDogJy13ZWJraXQtdHJhbnNpdGlvbicsXG4gIH0sXG59O1xuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBoYXNQcm9wZXJTaGFwZSh3aW5kb3dPYmopIHtcbiAgcmV0dXJuICh3aW5kb3dPYmpbJ2RvY3VtZW50J10gIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygd2luZG93T2JqWydkb2N1bWVudCddWydjcmVhdGVFbGVtZW50J10gPT09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGV2ZW50Rm91bmRJbk1hcHMoZXZlbnRUeXBlKSB7XG4gIHJldHVybiAoZXZlbnRUeXBlIGluIGV2ZW50VHlwZU1hcCB8fCBldmVudFR5cGUgaW4gY3NzUHJvcGVydHlNYXApO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEBwYXJhbSB7IU9iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSBtYXBcbiAqIEBwYXJhbSB7IUVsZW1lbnR9IGVsXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEphdmFTY3JpcHRFdmVudE5hbWUoZXZlbnRUeXBlLCBtYXAsIGVsKSB7XG4gIHJldHVybiBtYXBbZXZlbnRUeXBlXS5zdHlsZVByb3BlcnR5IGluIGVsLnN0eWxlID8gbWFwW2V2ZW50VHlwZV0ubm9QcmVmaXggOiBtYXBbZXZlbnRUeXBlXS53ZWJraXRQcmVmaXg7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGRldGVybWluZSBicm93c2VyIHByZWZpeCBmb3IgQ1NTMyBhbmltYXRpb24gZXZlbnRzXG4gKiBhbmQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIGlmICghaGFzUHJvcGVyU2hhcGUod2luZG93T2JqKSB8fCAhZXZlbnRGb3VuZEluTWFwcyhldmVudFR5cGUpKSB7XG4gICAgcmV0dXJuIGV2ZW50VHlwZTtcbiAgfVxuXG4gIGNvbnN0IG1hcCA9IC8qKiBAdHlwZSB7IU9iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSAqLyAoXG4gICAgZXZlbnRUeXBlIGluIGV2ZW50VHlwZU1hcCA/IGV2ZW50VHlwZU1hcCA6IGNzc1Byb3BlcnR5TWFwXG4gICk7XG4gIGNvbnN0IGVsID0gd2luZG93T2JqWydkb2N1bWVudCddWydjcmVhdGVFbGVtZW50J10oJ2RpdicpO1xuICBsZXQgZXZlbnROYW1lID0gJyc7XG5cbiAgaWYgKG1hcCA9PT0gZXZlbnRUeXBlTWFwKSB7XG4gICAgZXZlbnROYW1lID0gZ2V0SmF2YVNjcmlwdEV2ZW50TmFtZShldmVudFR5cGUsIG1hcCwgZWwpO1xuICB9IGVsc2Uge1xuICAgIGV2ZW50TmFtZSA9IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IGluIGVsLnN0eWxlID8gbWFwW2V2ZW50VHlwZV0ubm9QcmVmaXggOiBtYXBbZXZlbnRUeXBlXS53ZWJraXRQcmVmaXg7XG4gIH1cblxuICByZXR1cm4gZXZlbnROYW1lO1xufVxuXG4vLyBQdWJsaWMgZnVuY3Rpb25zIHRvIGFjY2VzcyBnZXRBbmltYXRpb25OYW1lKCkgZm9yIEphdmFTY3JpcHQgZXZlbnRzIG9yIENTU1xuLy8gcHJvcGVydHkgbmFtZXMuXG5cbmNvbnN0IHRyYW5zZm9ybVN0eWxlUHJvcGVydGllcyA9IFsndHJhbnNmb3JtJywgJ1dlYmtpdFRyYW5zZm9ybScsICdNb3pUcmFuc2Zvcm0nLCAnT1RyYW5zZm9ybScsICdNU1RyYW5zZm9ybSddO1xuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvcnJlY3RFdmVudE5hbWUod2luZG93T2JqLCBldmVudFR5cGUpIHtcbiAgcmV0dXJuIGdldEFuaW1hdGlvbk5hbWUod2luZG93T2JqLCBldmVudFR5cGUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvcnJlY3RQcm9wZXJ0eU5hbWUod2luZG93T2JqLCBldmVudFR5cGUpIHtcbiAgcmV0dXJuIGdldEFuaW1hdGlvbk5hbWUod2luZG93T2JqLCBldmVudFR5cGUpO1xufVxuXG5leHBvcnQge3RyYW5zZm9ybVN0eWxlUHJvcGVydGllcywgZ2V0Q29ycmVjdEV2ZW50TmFtZSwgZ2V0Q29ycmVjdFByb3BlcnR5TmFtZX07XG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBcclxuICAgIHJlZj1cInJvb3RcIiBcclxuICAgIDpjbGFzcz1cImNsYXNzZXNcIiBcclxuICAgIDphcmlhLWhpZGRlbj1cImhpZGRlblwiIFxyXG4gICAgY2xhc3M9XCJtZGMtc25hY2tiYXJcIiBcclxuICAgIGFyaWEtbGl2ZT1cImFzc2VydGl2ZVwiIFxyXG4gICAgYXJpYS1hdG9taWM9XCJ0cnVlXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibWRjLXNuYWNrYmFyX190ZXh0XCI+e3sgbWVzc2FnZSB9fTwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm1kYy1zbmFja2Jhcl9fYWN0aW9uLXdyYXBwZXJcIj5cclxuICAgICAgPGJ1dHRvbiBcclxuICAgICAgICByZWY9XCJidXR0b25cIiBcclxuICAgICAgICA6YXJpYS1oaWRkZW49XCJhY3Rpb25IaWRkZW5cIiBcclxuICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXHJcbiAgICAgICAgY2xhc3M9XCJtZGMtc25hY2tiYXJfX2FjdGlvbi1idXR0b25cIj57eyBhY3Rpb25UZXh0IH19PC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBNRENTbmFja2JhckZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3NuYWNrYmFyL2ZvdW5kYXRpb24nXHJcbmltcG9ydCB7IGdldENvcnJlY3RFdmVudE5hbWUgfSBmcm9tICdAbWF0ZXJpYWwvYW5pbWF0aW9uJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtc25hY2tiYXInLFxyXG4gIG1vZGVsOiB7XHJcbiAgICBwcm9wOiAnc25hY2snLFxyXG4gICAgZXZlbnQ6ICdxdWV1ZWQnXHJcbiAgfSxcclxuICBwcm9wczoge1xyXG4gICAgJ2FsaWduLXN0YXJ0JzogQm9vbGVhbixcclxuICAgIHNuYWNrOiBPYmplY3QsXHJcbiAgICBldmVudDogU3RyaW5nLFxyXG4gICAgJ2V2ZW50LXNvdXJjZSc6IHtcclxuICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJvb3RcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgICdkaXNtaXNzZXMtb24tYWN0aW9uJzoge1xyXG4gICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2xhc3Nlczoge1xyXG4gICAgICAgICdtZGMtc25hY2tiYXItLWFsaWduLXN0YXJ0JzogdGhpcy5hbGlnblN0YXJ0XHJcbiAgICAgIH0sXHJcbiAgICAgIG1lc3NhZ2U6ICcnLFxyXG4gICAgICBhY3Rpb25UZXh0OiAnJyxcclxuICAgICAgaGlkZGVuOiBmYWxzZSxcclxuICAgICAgYWN0aW9uSGlkZGVuOiBmYWxzZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgd2F0Y2g6IHtcclxuICAgIHNuYWNrOiAnb25TbmFjaydcclxuICB9LFxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDU25hY2tiYXJGb3VuZGF0aW9uKHtcclxuICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpLFxyXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSksXHJcbiAgICAgIHNldEFyaWFIaWRkZW46ICgpID0+ICh0aGlzLmhpZGRlbiA9IHRydWUpLFxyXG4gICAgICB1bnNldEFyaWFIaWRkZW46ICgpID0+ICh0aGlzLmhpZGRlbiA9IGZhbHNlKSxcclxuICAgICAgc2V0QWN0aW9uQXJpYUhpZGRlbjogKCkgPT4gKHRoaXMuYWN0aW9uSGlkZGVuID0gdHJ1ZSksXHJcbiAgICAgIHVuc2V0QWN0aW9uQXJpYUhpZGRlbjogKCkgPT4gKHRoaXMuYWN0aW9uSGlkZGVuID0gZmFsc2UpLFxyXG4gICAgICBzZXRBY3Rpb25UZXh0OiB0ZXh0ID0+IHtcclxuICAgICAgICB0aGlzLmFjdGlvblRleHQgPSB0ZXh0XHJcbiAgICAgIH0sXHJcbiAgICAgIHNldE1lc3NhZ2VUZXh0OiB0ZXh0ID0+IHtcclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSB0ZXh0XHJcbiAgICAgIH0sXHJcbiAgICAgIHNldEZvY3VzOiAoKSA9PiB0aGlzLiRyZWZzLmJ1dHRvbi5mb2N1cygpLFxyXG4gICAgICB2aXNpYmlsaXR5SXNIaWRkZW46ICgpID0+IGRvY3VtZW50LmhpZGRlbixcclxuICAgICAgcmVnaXN0ZXJDYXB0dXJlZEJsdXJIYW5kbGVyOiBoYW5kbGVyID0+XHJcbiAgICAgICAgdGhpcy4kcmVmcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGhhbmRsZXIsIHRydWUpLFxyXG4gICAgICBkZXJlZ2lzdGVyQ2FwdHVyZWRCbHVySGFuZGxlcjogaGFuZGxlciA9PlxyXG4gICAgICAgIHRoaXMuJHJlZnMuYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCBoYW5kbGVyLCB0cnVlKSxcclxuICAgICAgcmVnaXN0ZXJWaXNpYmlsaXR5Q2hhbmdlSGFuZGxlcjogaGFuZGxlciA9PlxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCBoYW5kbGVyKSxcclxuICAgICAgZGVyZWdpc3RlclZpc2liaWxpdHlDaGFuZ2VIYW5kbGVyOiBoYW5kbGVyID0+XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIGhhbmRsZXIpLFxyXG4gICAgICByZWdpc3RlckNhcHR1cmVkSW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PlxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIHRydWUpLFxyXG4gICAgICBkZXJlZ2lzdGVyQ2FwdHVyZWRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciwgdHJ1ZSksXHJcbiAgICAgIHJlZ2lzdGVyQWN0aW9uQ2xpY2tIYW5kbGVyOiBoYW5kbGVyID0+XHJcbiAgICAgICAgdGhpcy4kcmVmcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyKSxcclxuICAgICAgZGVyZWdpc3RlckFjdGlvbkNsaWNrSGFuZGxlcjogaGFuZGxlciA9PlxyXG4gICAgICAgIHRoaXMuJHJlZnMuYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlciksXHJcbiAgICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXI6IGhhbmRsZXIgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJvb3QgPSB0aGlzLiRyZWZzLnJvb3RcclxuICAgICAgICByb290ICYmXHJcbiAgICAgICAgICByb290LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgIGdldENvcnJlY3RFdmVudE5hbWUod2luZG93LCAndHJhbnNpdGlvbmVuZCcpLFxyXG4gICAgICAgICAgICBoYW5kbGVyXHJcbiAgICAgICAgICApXHJcbiAgICAgIH0sXHJcbiAgICAgIGRlcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcjogaGFuZGxlciA9PiB7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IHRoaXMuJHJlZnMucm9vdFxyXG4gICAgICAgIHJvb3QgJiZcclxuICAgICAgICAgIHJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgZ2V0Q29ycmVjdEV2ZW50TmFtZSh3aW5kb3csICd0cmFuc2l0aW9uZW5kJyksXHJcbiAgICAgICAgICAgIGhhbmRsZXJcclxuICAgICAgICAgIClcclxuICAgICAgfSxcclxuICAgICAgbm90aWZ5U2hvdzogKCkgPT4gdGhpcy4kZW1pdCgnc2hvdycpLFxyXG4gICAgICBub3RpZnlIaWRlOiAoKSA9PiB0aGlzLiRlbWl0KCdoaWRlJylcclxuICAgIH0pXHJcbiAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXHJcblxyXG4gICAgLy8gaWYgZXZlbnQgc3BlY2lmaWVkIHVzZSBpdCwgZWxzZSBpZiBubyBzbmFjayBwcm9wIHRoZW4gdXNlIGRlZmF1bHQuXHJcbiAgICB0aGlzLmV2ZW50TmFtZSA9XHJcbiAgICAgIHRoaXMuZXZlbnQgfHwgKHRoaXMuc25hY2sgPT09IHZvaWQgMCA/ICdzaG93LXNuYWNrYmFyJyA6IG51bGwpXHJcbiAgICBpZiAodGhpcy5ldmVudE5hbWUpIHtcclxuICAgICAgdGhpcy5ldmVudFNvdXJjZS4kb24odGhpcy5ldmVudE5hbWUsIHRoaXMuc2hvdylcclxuICAgIH1cclxuICAgIHRoaXMuZm91bmRhdGlvbi5zZXREaXNtaXNzT25BY3Rpb24odGhpcy5kaXNtaXNzZXNPbkFjdGlvbilcclxuICB9LFxyXG4gIGJlZm9yZURlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5ldmVudFNvdXJjZSkge1xyXG4gICAgICB0aGlzLmV2ZW50U291cmNlLiRvZmYodGhpcy5ldmVudE5hbWUsIHRoaXMuc2hvdylcclxuICAgIH1cclxuICAgIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KClcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIG9uU25hY2soc25hY2spIHtcclxuICAgICAgaWYgKHNuYWNrICYmIHNuYWNrLm1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLmZvdW5kYXRpb24uc2hvdyhzbmFjaylcclxuICAgICAgICB0aGlzLiRlbWl0KCdxdWV1ZWQnLCBzbmFjaylcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNob3coZGF0YSkge1xyXG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2hvdyhkYXRhKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiaW1wb3J0IHsgQmFzZVBsdWdpbiB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCBtZGNTbmFja2JhciBmcm9tICcuL21kYy1zbmFja2Jhci52dWUnXHJcblxyXG5leHBvcnQgeyBtZGNTbmFja2JhciB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcclxuICBtZGNTbmFja2JhclxyXG59KVxyXG4iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXHJcbmltcG9ydCB7IGF1dG9Jbml0IH0gZnJvbSAnLi4vYmFzZSdcclxuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xyXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cclxuXHJcbmF1dG9Jbml0KHBsdWdpbilcclxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJrZXkiLCJjb21wb25lbnQiLCJ2bSIsIm5hbWUiLCJzY29wZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwiTURDRm91bmRhdGlvbiIsImFkYXB0ZXIiLCJhZGFwdGVyXyIsIk1EQ0NvbXBvbmVudCIsInJvb3QiLCJmb3VuZGF0aW9uIiwidW5kZWZpbmVkIiwicm9vdF8iLCJhcmdzIiwiaW5pdGlhbGl6ZSIsImZvdW5kYXRpb25fIiwiZ2V0RGVmYXVsdEZvdW5kYXRpb24iLCJpbml0IiwiaW5pdGlhbFN5bmNXaXRoRE9NIiwiRXJyb3IiLCJkZXN0cm95IiwiZXZ0VHlwZSIsImhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dERhdGEiLCJzaG91bGRCdWJibGUiLCJldnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImJ1YmJsZXMiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImNzc0NsYXNzZXMiLCJST09UIiwiVEVYVCIsIkFDVElPTl9XUkFQUEVSIiwiQUNUSU9OX0JVVFRPTiIsIkFDVElWRSIsIk1VTFRJTElORSIsIkFDVElPTl9PTl9CT1RUT00iLCJzdHJpbmdzIiwiVEVYVF9TRUxFQ1RPUiIsIkFDVElPTl9XUkFQUEVSX1NFTEVDVE9SIiwiQUNUSU9OX0JVVFRPTl9TRUxFQ1RPUiIsIlNIT1dfRVZFTlQiLCJISURFX0VWRU5UIiwibnVtYmVycyIsIk1FU1NBR0VfVElNRU9VVCIsIk1EQ1NuYWNrYmFyRm91bmRhdGlvbiIsImFjdGl2ZV8iLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwic2V0QXJpYUhpZGRlbiIsInVuc2V0QXJpYUhpZGRlbiIsInNldEFjdGlvbkFyaWFIaWRkZW4iLCJ1bnNldEFjdGlvbkFyaWFIaWRkZW4iLCJzZXRBY3Rpb25UZXh0Iiwic2V0TWVzc2FnZVRleHQiLCJzZXRGb2N1cyIsInZpc2liaWxpdHlJc0hpZGRlbiIsInJlZ2lzdGVyQ2FwdHVyZWRCbHVySGFuZGxlciIsImRlcmVnaXN0ZXJDYXB0dXJlZEJsdXJIYW5kbGVyIiwicmVnaXN0ZXJWaXNpYmlsaXR5Q2hhbmdlSGFuZGxlciIsImRlcmVnaXN0ZXJWaXNpYmlsaXR5Q2hhbmdlSGFuZGxlciIsInJlZ2lzdGVyQ2FwdHVyZWRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyQ2FwdHVyZWRJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlckFjdGlvbkNsaWNrSGFuZGxlciIsImRlcmVnaXN0ZXJBY3Rpb25DbGlja0hhbmRsZXIiLCJyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyIiwiZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyIiwibm90aWZ5U2hvdyIsIm5vdGlmeUhpZGUiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsImRlZmF1bHRBZGFwdGVyIiwiYWN0aW9uV2FzQ2xpY2tlZF8iLCJkaXNtaXNzT25BY3Rpb25fIiwiZmlyc3RGb2N1c18iLCJwb2ludGVyRG93blJlY29nbml6ZWRfIiwic25hY2tiYXJIYXNGb2N1c18iLCJzbmFja2JhckRhdGFfIiwicXVldWVfIiwiYWN0aW9uQ2xpY2tIYW5kbGVyXyIsImludm9rZUFjdGlvbl8iLCJ2aXNpYmlsaXR5Y2hhbmdlSGFuZGxlcl8iLCJjbGVhclRpbWVvdXQiLCJ0aW1lb3V0SWRfIiwic2V0VGltZW91dCIsImNsZWFudXBfIiwiYmluZCIsInRpbWVvdXQiLCJpbnRlcmFjdGlvbkhhbmRsZXJfIiwidHlwZSIsImhhbmRsZVBvc3NpYmxlVGFiS2V5Ym9hcmRGb2N1c18iLCJibHVySGFuZGxlcl8iLCJmb3JFYWNoIiwiZGlzbWlzc09uQWN0aW9uIiwiZGF0YSIsIm1lc3NhZ2UiLCJhY3Rpb25IYW5kbGVyIiwiYWN0aW9uVGV4dCIsImFjdGl2ZSIsInB1c2giLCJtdWx0aWxpbmUiLCJhY3Rpb25PbkJvdHRvbSIsImFjdGlvbkhhbmRsZXJfIiwic2V0QWN0aW9uSGlkZGVuXyIsImhpamFja0ZvY3VzIiwic2V0Rm9jdXNPbkFjdGlvbl8iLCJhbGxvd0Rpc21pc3NhbCIsInNob3dOZXh0XyIsImxlbmd0aCIsInNob3ciLCJzaGlmdCIsImlzSGlkZGVuIiwiZXZlbnRUeXBlTWFwIiwibm9QcmVmaXgiLCJ3ZWJraXRQcmVmaXgiLCJzdHlsZVByb3BlcnR5IiwiY3NzUHJvcGVydHlNYXAiLCJoYXNQcm9wZXJTaGFwZSIsIndpbmRvd09iaiIsImV2ZW50Rm91bmRJbk1hcHMiLCJldmVudFR5cGUiLCJnZXRKYXZhU2NyaXB0RXZlbnROYW1lIiwibWFwIiwiZWwiLCJzdHlsZSIsImdldEFuaW1hdGlvbk5hbWUiLCJldmVudE5hbWUiLCJnZXRDb3JyZWN0RXZlbnROYW1lIiwibWRjU25hY2tiYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBTyxTQUFTQSxRQUFULENBQWtCQyxNQUFsQixFQUEwQjtJQUMvQjtJQUNBLE1BQUlDLE9BQU8sSUFBWDtJQUNBLE1BQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztJQUNqQ0QsV0FBT0MsT0FBT0MsR0FBZDtJQUNELEdBRkQsTUFFTyxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7SUFDeEM7SUFDQUgsV0FBT0csT0FBT0QsR0FBZDtJQUNEO0lBQ0QsTUFBSUYsSUFBSixFQUFVO0lBQ1JBLFNBQUtJLEdBQUwsQ0FBU0wsTUFBVDtJQUNEO0lBQ0Y7O0lDWk0sU0FBU00sVUFBVCxDQUFvQkMsVUFBcEIsRUFBZ0M7SUFDckMsU0FBTztJQUNMQyxhQUFTLFFBREo7SUFFTEMsYUFBUyxxQkFBTTtJQUNiLFdBQUssSUFBSUMsR0FBVCxJQUFnQkgsVUFBaEIsRUFBNEI7SUFDMUIsWUFBSUksWUFBWUosV0FBV0csR0FBWCxDQUFoQjtJQUNBRSxXQUFHRCxTQUFILENBQWFBLFVBQVVFLElBQXZCLEVBQTZCRixTQUE3QjtJQUNEO0lBQ0YsS0FQSTtJQVFMSjtJQVJLLEdBQVA7SUFVRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ1hEOztJQ0FBLElBQU1PLFFBQ0pDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQkYsS0FBS0MsS0FBTCxDQUFXLFVBQVgsQ0FBM0IsRUFBbURFLFFBQW5ELEtBQWdFLEdBRGxFOztJQ0FBOzs7Ozs7Ozs7Ozs7Ozs7OztJQWlCQTs7O1FBR01DOzs7O0lBQ0o7K0JBQ3dCO0lBQ3RCO0lBQ0E7SUFDQSxhQUFPLEVBQVA7SUFDRDs7SUFFRDs7OzsrQkFDcUI7SUFDbkI7SUFDQTtJQUNBLGFBQU8s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
