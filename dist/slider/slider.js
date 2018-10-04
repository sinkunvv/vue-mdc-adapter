/**
* @module vue-mdc-adapterslider 0.18.2
* @exports VueMDCSlider
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCSlider = factory());
}(this, (function () { 'use strict';

  var supportsPassive_ = void 0;

  /**
   * Determine whether the current browser supports passive event listeners, and if so, use them.
   * @param {!Window=} globalObj
   * @param {boolean=} forceRefresh
   * @return {boolean|{passive: boolean}}
   */
  function applyPassive() {
    var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (supportsPassive_ === undefined || forceRefresh) {
      var isSupported = false;
      try {
        globalObj.document.addEventListener('test', null, {
          get passive() {
            isSupported = { passive: true };
          }
        });
      } catch (e) {
        //empty
      }

      supportsPassive_ = isSupported;
    }

    return supportsPassive_;
  }

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

  var DispatchFocusMixin = {
    data: function data() {
      return { hasFocus: false };
    },

    methods: {
      onMouseDown: function onMouseDown() {
        this._active = true;
      },
      onMouseUp: function onMouseUp() {
        this._active = false;
      },
      onFocusEvent: function onFocusEvent() {
        var _this = this;

        // dispatch async to let time to other focus event to propagate
        setTimeout(function () {
          return _this.dispatchFocusEvent();
        }, 0);
      },
      onBlurEvent: function onBlurEvent() {
        var _this2 = this;

        // dispatch async to let time to other focus event to propagate
        // also filtur blur if mousedown
        this._active || setTimeout(function () {
          return _this2.dispatchFocusEvent();
        }, 0);
      },
      dispatchFocusEvent: function dispatchFocusEvent() {
        var hasFocus = this.$el === document.activeElement || this.$el.contains(document.activeElement);
        if (hasFocus != this.hasFocus) {
          this.$emit(hasFocus ? 'focus' : 'blur');
          this.hasFocus = hasFocus;
        }
      }
    },
    mounted: function mounted() {
      this.$el.addEventListener('focusin', this.onFocusEvent);
      this.$el.addEventListener('focusout', this.onBlurEvent);
      this.$el.addEventListener('mousedown', this.onMouseDown);
      this.$el.addEventListener('mouseup', this.onMouseUp);
    },
    beforeDestroy: function beforeDestroy() {
      this.$el.removeEventListener('focusin', this.onFocusEvent);
      this.$el.removeEventListener('focusout', this.onBlurEvent);
      this.$el.removeEventListener('mousedown', this.onMouseDown);
      this.$el.removeEventListener('mouseup', this.onMouseUp);
    }
  };

  var scope = Math.floor(Math.random() * Math.floor(0x10000000)).toString() + '-';

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var cssClasses = {
    ACTIVE: 'mdc-slider--active',
    DISABLED: 'mdc-slider--disabled',
    DISCRETE: 'mdc-slider--discrete',
    FOCUS: 'mdc-slider--focus',
    IN_TRANSIT: 'mdc-slider--in-transit',
    IS_DISCRETE: 'mdc-slider--discrete',
    HAS_TRACK_MARKER: 'mdc-slider--display-markers'
  };

  /** @enum {string} */
  var strings = {
    TRACK_SELECTOR: '.mdc-slider__track',
    TRACK_MARKER_CONTAINER_SELECTOR: '.mdc-slider__track-marker-container',
    LAST_TRACK_MARKER_SELECTOR: '.mdc-slider__track-marker:last-child',
    THUMB_CONTAINER_SELECTOR: '.mdc-slider__thumb-container',
    PIN_VALUE_MARKER_SELECTOR: '.mdc-slider__pin-value-marker',
    ARIA_VALUEMIN: 'aria-valuemin',
    ARIA_VALUEMAX: 'aria-valuemax',
    ARIA_VALUENOW: 'aria-valuenow',
    ARIA_DISABLED: 'aria-disabled',
    STEP_DATA_ATTR: 'data-step',
    CHANGE_EVENT: 'MDCSlider:change',
    INPUT_EVENT: 'MDCSlider:input'
  };

  /** @enum {number} */
  var numbers = {
    PAGE_FACTOR: 4
  };

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint-disable no-unused-vars */

  /**
   * Adapter for MDC Slider.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the Slider into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCSliderAdapter = function () {
    function MDCSliderAdapter() {
      classCallCheck(this, MDCSliderAdapter);
    }

    createClass(MDCSliderAdapter, [{
      key: "hasClass",

      /**
       * Returns true if className exists for the slider Element
       * @param {string} className
       * @return {boolean}
       */
      value: function hasClass(className) {}

      /**
       * Adds a class to the slider Element
       * @param {string} className
       */

    }, {
      key: "addClass",
      value: function addClass(className) {}

      /**
       * Removes a class from the slider Element
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * Returns a string if attribute name exists on the slider Element,
       * otherwise returns null
       * @param {string} name
       * @return {?string}
       */

    }, {
      key: "getAttribute",
      value: function getAttribute(name) {}

      /**
       * Sets attribute name on slider Element to value
       * @param {string} name
       * @param {string} value
       */

    }, {
      key: "setAttribute",
      value: function setAttribute(name, value) {}

      /**
       * Removes attribute name from slider Element
       * @param {string} name
       */

    }, {
      key: "removeAttribute",
      value: function removeAttribute(name) {}

      /**
       * Returns the bounding client rect for the slider Element
       * @return {?ClientRect}
       */

    }, {
      key: "computeBoundingRect",
      value: function computeBoundingRect() {}

      /**
       * Returns the tab index of the slider Element
       * @return {number}
       */

    }, {
      key: "getTabIndex",
      value: function getTabIndex() {}

      /**
       * Registers an event handler on the root element for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(type, handler) {}

      /**
       * Deregisters an event handler on the root element for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(type, handler) {}

      /**
       * Registers an event handler on the thumb container element for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerThumbContainerInteractionHandler",
      value: function registerThumbContainerInteractionHandler(type, handler) {}

      /**
       * Deregisters an event handler on the thumb container element for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterThumbContainerInteractionHandler",
      value: function deregisterThumbContainerInteractionHandler(type, handler) {}

      /**
       * Registers an event handler on the body for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerBodyInteractionHandler",
      value: function registerBodyInteractionHandler(type, handler) {}

      /**
       * Deregisters an event handler on the body for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterBodyInteractionHandler",
      value: function deregisterBodyInteractionHandler(type, handler) {}

      /**
       * Registers an event handler for the window resize event
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerResizeHandler",
      value: function registerResizeHandler(handler) {}

      /**
       * Deregisters an event handler for the window resize event
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterResizeHandler",
      value: function deregisterResizeHandler(handler) {}

      /**
       * Emits a custom event MDCSlider:input from the root
       */

    }, {
      key: "notifyInput",
      value: function notifyInput() {}

      /**
       * Emits a custom event MDCSlider:change from the root
       */

    }, {
      key: "notifyChange",
      value: function notifyChange() {}

      /**
       * Sets a style property of the thumb container element to the passed value
       * @param {string} propertyName
       * @param {string} value
       */

    }, {
      key: "setThumbContainerStyleProperty",
      value: function setThumbContainerStyleProperty(propertyName, value) {}

      /**
       * Sets a style property of the track element to the passed value
       * @param {string} propertyName
       * @param {string} value
       */

    }, {
      key: "setTrackStyleProperty",
      value: function setTrackStyleProperty(propertyName, value) {}

      /**
       * Sets the inner text of the pin marker to the passed value
       * @param {number} value
       */

    }, {
      key: "setMarkerValue",
      value: function setMarkerValue(value) {}

      /**
       * Appends the passed number of track markers to the track mark container element
       * @param {number} numMarkers
       */

    }, {
      key: "appendTrackMarkers",
      value: function appendTrackMarkers(numMarkers) {}

      /**
       * Removes all track markers fromt he track mark container element
       */

    }, {
      key: "removeTrackMarkers",
      value: function removeTrackMarkers() {}

      /**
       * Sets a style property of the last track marker to the passed value
       * @param {string} propertyName
       * @param {string} value
       */

    }, {
      key: "setLastTrackMarkersStyleProperty",
      value: function setLastTrackMarkersStyleProperty(propertyName, value) {}

      /**
       * Returns true if the root element is RTL, otherwise false
       * @return {boolean}
       */

    }, {
      key: "isRTL",
      value: function isRTL() {}
    }]);
    return MDCSliderAdapter;
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

  /**
   * @param {!Object} windowObj
   * @param {string} eventType
   * @return {string}
   */
  function getCorrectPropertyName(windowObj, eventType) {
    return getAnimationName(windowObj, eventType);
  }

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
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   *you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var KEY_IDS = {
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    HOME: 'Home',
    END: 'End',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown'
  };

  /** @enum {string} */
  var MOVE_EVENT_MAP = {
    'mousedown': 'mousemove',
    'touchstart': 'touchmove',
    'pointerdown': 'pointermove'
  };

  var DOWN_EVENTS = ['mousedown', 'pointerdown', 'touchstart'];
  var UP_EVENTS = ['mouseup', 'pointerup', 'touchend'];

  /**
   * @extends {MDCFoundation<!MDCSliderAdapter>}
   */

  var MDCSliderFoundation = function (_MDCFoundation) {
    inherits(MDCSliderFoundation, _MDCFoundation);
    createClass(MDCSliderFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {cssClasses} */
      get: function get$$1() {
        return cssClasses;
      }

      /** @return enum {strings} */

    }, {
      key: 'strings',
      get: function get$$1() {
        return strings;
      }

      /** @return enum {numbers} */

    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers;
      }

      /** @return {!MDCSliderAdapter} */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCSliderAdapter} */{
            hasClass: function hasClass() {
              return (/* className: string */ /* boolean */false
              );
            },
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            getAttribute: function getAttribute() {
              return (/* name: string */ /* string|null */null
              );
            },
            setAttribute: function setAttribute() /* name: string, value: string */{},
            removeAttribute: function removeAttribute() /* name: string */{},
            computeBoundingRect: function computeBoundingRect() {
              return (/* ClientRect */{
                  top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0
                }
              );
            },
            getTabIndex: function getTabIndex() {
              return (/* number */0
              );
            },
            registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
            deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
            registerThumbContainerInteractionHandler: function registerThumbContainerInteractionHandler() /* type: string, handler: EventListener */{},
            deregisterThumbContainerInteractionHandler: function deregisterThumbContainerInteractionHandler() /* type: string, handler: EventListener */{},
            registerBodyInteractionHandler: function registerBodyInteractionHandler() /* type: string, handler: EventListener */{},
            deregisterBodyInteractionHandler: function deregisterBodyInteractionHandler() /* type: string, handler: EventListener */{},
            registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
            deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
            notifyInput: function notifyInput() {},
            notifyChange: function notifyChange() {},
            setThumbContainerStyleProperty: function setThumbContainerStyleProperty() /* propertyName: string, value: string */{},
            setTrackStyleProperty: function setTrackStyleProperty() /* propertyName: string, value: string */{},
            setMarkerValue: function setMarkerValue() /* value: number */{},
            appendTrackMarkers: function appendTrackMarkers() /* numMarkers: number */{},
            removeTrackMarkers: function removeTrackMarkers() {},
            setLastTrackMarkersStyleProperty: function setLastTrackMarkersStyleProperty() /* propertyName: string, value: string */{},
            isRTL: function isRTL() {
              return (/* boolean */false
              );
            }
          }
        );
      }

      /**
       * Creates a new instance of MDCSliderFoundation
       * @param {?MDCSliderAdapter} adapter
       */

    }]);

    function MDCSliderFoundation(adapter) {
      classCallCheck(this, MDCSliderFoundation);

      /** @private {?ClientRect} */
      var _this = possibleConstructorReturn(this, (MDCSliderFoundation.__proto__ || Object.getPrototypeOf(MDCSliderFoundation)).call(this, _extends(MDCSliderFoundation.defaultAdapter, adapter)));

      _this.rect_ = null;
      // We set this to NaN since we want it to be a number, but we can't use '0' or '-1'
      // because those could be valid tabindices set by the client code.
      _this.savedTabIndex_ = NaN;
      _this.active_ = false;
      _this.inTransit_ = false;
      _this.isDiscrete_ = false;
      _this.hasTrackMarker_ = false;
      _this.handlingThumbTargetEvt_ = false;
      _this.min_ = 0;
      _this.max_ = 100;
      _this.step_ = 0;
      _this.value_ = 0;
      _this.disabled_ = false;
      _this.preventFocusState_ = false;
      _this.updateUIFrame_ = 0;
      _this.thumbContainerPointerHandler_ = function () {
        _this.handlingThumbTargetEvt_ = true;
      };
      _this.interactionStartHandler_ = function (evt) {
        return _this.handleDown_(evt);
      };
      _this.keydownHandler_ = function (evt) {
        return _this.handleKeydown_(evt);
      };
      _this.focusHandler_ = function () {
        return _this.handleFocus_();
      };
      _this.blurHandler_ = function () {
        return _this.handleBlur_();
      };
      _this.resizeHandler_ = function () {
        return _this.layout();
      };
      return _this;
    }

    createClass(MDCSliderFoundation, [{
      key: 'init',
      value: function init() {
        var _this2 = this;

        this.isDiscrete_ = this.adapter_.hasClass(cssClasses.IS_DISCRETE);
        this.hasTrackMarker_ = this.adapter_.hasClass(cssClasses.HAS_TRACK_MARKER);
        DOWN_EVENTS.forEach(function (evtName) {
          return _this2.adapter_.registerInteractionHandler(evtName, _this2.interactionStartHandler_);
        });
        this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
        this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
        this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
        DOWN_EVENTS.forEach(function (evtName) {
          _this2.adapter_.registerThumbContainerInteractionHandler(evtName, _this2.thumbContainerPointerHandler_);
        });
        this.adapter_.registerResizeHandler(this.resizeHandler_);
        this.layout();
        // At last step, provide a reasonable default value to discrete slider
        if (this.isDiscrete_ && this.getStep() == 0) {
          this.step_ = 1;
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this3 = this;

        DOWN_EVENTS.forEach(function (evtName) {
          _this3.adapter_.deregisterInteractionHandler(evtName, _this3.interactionStartHandler_);
        });
        this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
        this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
        this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
        DOWN_EVENTS.forEach(function (evtName) {
          _this3.adapter_.deregisterThumbContainerInteractionHandler(evtName, _this3.thumbContainerPointerHandler_);
        });
        this.adapter_.deregisterResizeHandler(this.resizeHandler_);
      }
    }, {
      key: 'setupTrackMarker',
      value: function setupTrackMarker() {
        if (this.isDiscrete_ && this.hasTrackMarker_ && this.getStep() != 0) {
          var min = this.getMin();
          var max = this.getMax();
          var step = this.getStep();
          var numMarkers = (max - min) / step;

          // In case distance between max & min is indivisible to step,
          // we place the secondary to last marker proportionally at where thumb
          // could reach and place the last marker at max value
          var indivisible = Math.ceil(numMarkers) !== numMarkers;
          if (indivisible) {
            numMarkers = Math.ceil(numMarkers);
          }

          this.adapter_.removeTrackMarkers();
          this.adapter_.appendTrackMarkers(numMarkers);

          if (indivisible) {
            var lastStepRatio = (max - numMarkers * step) / step + 1;
            var flex = getCorrectPropertyName(window, 'flex');
            this.adapter_.setLastTrackMarkersStyleProperty(flex, String(lastStepRatio));
          }
        }
      }
    }, {
      key: 'layout',
      value: function layout() {
        this.rect_ = this.adapter_.computeBoundingRect();
        this.updateUIForCurrentValue_();
      }

      /** @return {number} */

    }, {
      key: 'getValue',
      value: function getValue() {
        return this.value_;
      }

      /** @param {number} value */

    }, {
      key: 'setValue',
      value: function setValue(value) {
        this.setValue_(value, false);
      }

      /** @return {number} */

    }, {
      key: 'getMax',
      value: function getMax() {
        return this.max_;
      }

      /** @param {number} max */

    }, {
      key: 'setMax',
      value: function setMax(max) {
        if (max < this.min_) {
          throw new Error('Cannot set max to be less than the slider\'s minimum value');
        }
        this.max_ = max;
        this.setValue_(this.value_, false, true);
        this.adapter_.setAttribute(strings.ARIA_VALUEMAX, String(this.max_));
        this.setupTrackMarker();
      }

      /** @return {number} */

    }, {
      key: 'getMin',
      value: function getMin() {
        return this.min_;
      }

      /** @param {number} min */

    }, {
      key: 'setMin',
      value: function setMin(min) {
        if (min > this.max_) {
          throw new Error('Cannot set min to be greater than the slider\'s maximum value');
        }
        this.min_ = min;
        this.setValue_(this.value_, false, true);
        this.adapter_.setAttribute(strings.ARIA_VALUEMIN, String(this.min_));
        this.setupTrackMarker();
      }

      /** @return {number} */

    }, {
      key: 'getStep',
      value: function getStep() {
        return this.step_;
      }

      /** @param {number} step */

    }, {
      key: 'setStep',
      value: function setStep(step) {
        if (step < 0) {
          throw new Error('Step cannot be set to a negative number');
        }
        if (this.isDiscrete_ && (typeof step !== 'number' || step < 1)) {
          step = 1;
        }
        this.step_ = step;
        this.setValue_(this.value_, false, true);
        this.setupTrackMarker();
      }

      /** @return {boolean} */

    }, {
      key: 'isDisabled',
      value: function isDisabled() {
        return this.disabled_;
      }

      /** @param {boolean} disabled */

    }, {
      key: 'setDisabled',
      value: function setDisabled(disabled) {
        this.disabled_ = disabled;
        this.toggleClass_(cssClasses.DISABLED, this.disabled_);
        if (this.disabled_) {
          this.savedTabIndex_ = this.adapter_.getTabIndex();
          this.adapter_.setAttribute(strings.ARIA_DISABLED, 'true');
          this.adapter_.removeAttribute('tabindex');
        } else {
          this.adapter_.removeAttribute(strings.ARIA_DISABLED);
          if (!isNaN(this.savedTabIndex_)) {
            this.adapter_.setAttribute('tabindex', String(this.savedTabIndex_));
          }
        }
      }

      /**
       * Called when the user starts interacting with the slider
       * @param {!Event} evt
       * @private
       */

    }, {
      key: 'handleDown_',
      value: function handleDown_(evt) {
        var _this4 = this;

        if (this.disabled_) {
          return;
        }

        this.preventFocusState_ = true;
        this.setInTransit_(!this.handlingThumbTargetEvt_);
        this.handlingThumbTargetEvt_ = false;
        this.setActive_(true);

        var moveHandler = function moveHandler(evt) {
          _this4.handleMove_(evt);
        };

        // Note: upHandler is [de]registered on ALL potential pointer-related release event types, since some browsers
        // do not always fire these consistently in pairs.
        // (See https://github.com/material-components/material-components-web/issues/1192)
        var upHandler = function upHandler() {
          _this4.handleUp_();
          _this4.adapter_.deregisterBodyInteractionHandler(MOVE_EVENT_MAP[evt.type], moveHandler);
          UP_EVENTS.forEach(function (evtName) {
            return _this4.adapter_.deregisterBodyInteractionHandler(evtName, upHandler);
          });
        };

        this.adapter_.registerBodyInteractionHandler(MOVE_EVENT_MAP[evt.type], moveHandler);
        UP_EVENTS.forEach(function (evtName) {
          return _this4.adapter_.registerBodyInteractionHandler(evtName, upHandler);
        });
        this.setValueFromEvt_(evt);
      }

      /**
       * Called when the user moves the slider
       * @param {!Event} evt
       * @private
       */

    }, {
      key: 'handleMove_',
      value: function handleMove_(evt) {
        evt.preventDefault();
        this.setValueFromEvt_(evt);
      }

      /**
       * Called when the user's interaction with the slider ends
       * @private
       */

    }, {
      key: 'handleUp_',
      value: function handleUp_() {
        this.setActive_(false);
        this.adapter_.notifyChange();
      }

      /**
       * Returns the pageX of the event
       * @param {!Event} evt
       * @return {number}
       * @private
       */

    }, {
      key: 'getPageX_',
      value: function getPageX_(evt) {
        if (evt.targetTouches && evt.targetTouches.length > 0) {
          return evt.targetTouches[0].pageX;
        }
        return evt.pageX;
      }

      /**
       * Sets the slider value from an event
       * @param {!Event} evt
       * @private
       */

    }, {
      key: 'setValueFromEvt_',
      value: function setValueFromEvt_(evt) {
        var pageX = this.getPageX_(evt);
        var value = this.computeValueFromPageX_(pageX);
        this.setValue_(value, true);
      }

      /**
       * Computes the new value from the pageX position
       * @param {number} pageX
       * @return {number}
       */

    }, {
      key: 'computeValueFromPageX_',
      value: function computeValueFromPageX_(pageX) {
        var max = this.max_,
            min = this.min_;

        var xPos = pageX - this.rect_.left;
        var pctComplete = xPos / this.rect_.width;
        if (this.adapter_.isRTL()) {
          pctComplete = 1 - pctComplete;
        }
        // Fit the percentage complete between the range [min,max]
        // by remapping from [0, 1] to [min, min+(max-min)].
        return min + pctComplete * (max - min);
      }

      /**
       * Handles keydown events
       * @param {!Event} evt
       */

    }, {
      key: 'handleKeydown_',
      value: function handleKeydown_(evt) {
        var keyId = this.getKeyId_(evt);
        var value = this.getValueForKeyId_(keyId);
        if (isNaN(value)) {
          return;
        }

        // Prevent page from scrolling due to key presses that would normally scroll the page
        evt.preventDefault();
        this.adapter_.addClass(cssClasses.FOCUS);
        this.setValue_(value, true);
        this.adapter_.notifyChange();
      }

      /**
       * Returns the computed name of the event
       * @param {!Event} kbdEvt
       * @return {string}
       */

    }, {
      key: 'getKeyId_',
      value: function getKeyId_(kbdEvt) {
        if (kbdEvt.key === KEY_IDS.ARROW_LEFT || kbdEvt.keyCode === 37) {
          return KEY_IDS.ARROW_LEFT;
        }
        if (kbdEvt.key === KEY_IDS.ARROW_RIGHT || kbdEvt.keyCode === 39) {
          return KEY_IDS.ARROW_RIGHT;
        }
        if (kbdEvt.key === KEY_IDS.ARROW_UP || kbdEvt.keyCode === 38) {
          return KEY_IDS.ARROW_UP;
        }
        if (kbdEvt.key === KEY_IDS.ARROW_DOWN || kbdEvt.keyCode === 40) {
          return KEY_IDS.ARROW_DOWN;
        }
        if (kbdEvt.key === KEY_IDS.HOME || kbdEvt.keyCode === 36) {
          return KEY_IDS.HOME;
        }
        if (kbdEvt.key === KEY_IDS.END || kbdEvt.keyCode === 35) {
          return KEY_IDS.END;
        }
        if (kbdEvt.key === KEY_IDS.PAGE_UP || kbdEvt.keyCode === 33) {
          return KEY_IDS.PAGE_UP;
        }
        if (kbdEvt.key === KEY_IDS.PAGE_DOWN || kbdEvt.keyCode === 34) {
          return KEY_IDS.PAGE_DOWN;
        }

        return '';
      }

      /**
       * Computes the value given a keyboard key ID
       * @param {string} keyId
       * @return {number}
       */

    }, {
      key: 'getValueForKeyId_',
      value: function getValueForKeyId_(keyId) {
        var max = this.max_,
            min = this.min_,
            step = this.step_;

        var delta = step || (max - min) / 100;
        var valueNeedsToBeFlipped = this.adapter_.isRTL() && (keyId === KEY_IDS.ARROW_LEFT || keyId === KEY_IDS.ARROW_RIGHT);
        if (valueNeedsToBeFlipped) {
          delta = -delta;
        }

        switch (keyId) {
          case KEY_IDS.ARROW_LEFT:
          case KEY_IDS.ARROW_DOWN:
            return this.value_ - delta;
          case KEY_IDS.ARROW_RIGHT:
          case KEY_IDS.ARROW_UP:
            return this.value_ + delta;
          case KEY_IDS.HOME:
            return this.min_;
          case KEY_IDS.END:
            return this.max_;
          case KEY_IDS.PAGE_UP:
            return this.value_ + delta * numbers.PAGE_FACTOR;
          case KEY_IDS.PAGE_DOWN:
            return this.value_ - delta * numbers.PAGE_FACTOR;
          default:
            return NaN;
        }
      }
    }, {
      key: 'handleFocus_',
      value: function handleFocus_() {
        if (this.preventFocusState_) {
          return;
        }
        this.adapter_.addClass(cssClasses.FOCUS);
      }
    }, {
      key: 'handleBlur_',
      value: function handleBlur_() {
        this.preventFocusState_ = false;
        this.adapter_.removeClass(cssClasses.FOCUS);
      }

      /**
       * Sets the value of the slider
       * @param {number} value
       * @param {boolean} shouldFireInput
       * @param {boolean=} force
       */

    }, {
      key: 'setValue_',
      value: function setValue_(value, shouldFireInput) {
        var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (value === this.value_ && !force) {
          return;
        }

        var min = this.min_,
            max = this.max_;

        var valueSetToBoundary = value === min || value === max;
        if (this.step_ && !valueSetToBoundary) {
          value = this.quantize_(value);
        }
        if (value < min) {
          value = min;
        } else if (value > max) {
          value = max;
        }
        this.value_ = value;
        this.adapter_.setAttribute(strings.ARIA_VALUENOW, String(this.value_));
        this.updateUIForCurrentValue_();

        if (shouldFireInput) {
          this.adapter_.notifyInput();
          if (this.isDiscrete_) {
            this.adapter_.setMarkerValue(value);
          }
        }
      }

      /**
       * Calculates the quantized value
       * @param {number} value
       * @return {number}
       */

    }, {
      key: 'quantize_',
      value: function quantize_(value) {
        var numSteps = Math.round(value / this.step_);
        var quantizedVal = numSteps * this.step_;
        return quantizedVal;
      }
    }, {
      key: 'updateUIForCurrentValue_',
      value: function updateUIForCurrentValue_() {
        var _this5 = this;

        var max = this.max_,
            min = this.min_,
            value = this.value_;

        var pctComplete = (value - min) / (max - min);
        var translatePx = pctComplete * this.rect_.width;
        if (this.adapter_.isRTL()) {
          translatePx = this.rect_.width - translatePx;
        }

        var transformProp = getCorrectPropertyName(window, 'transform');
        var transitionendEvtName = getCorrectEventName(window, 'transitionend');

        if (this.inTransit_) {
          var onTransitionEnd = function onTransitionEnd() {
            _this5.setInTransit_(false);
            _this5.adapter_.deregisterThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd);
          };
          this.adapter_.registerThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd);
        }

        this.updateUIFrame_ = requestAnimationFrame(function () {
          // NOTE(traviskaufman): It would be nice to use calc() here,
          // but IE cannot handle calcs in transforms correctly.
          // See: https://goo.gl/NC2itk
          // Also note that the -50% offset is used to center the slider thumb.
          _this5.adapter_.setThumbContainerStyleProperty(transformProp, 'translateX(' + translatePx + 'px) translateX(-50%)');
          _this5.adapter_.setTrackStyleProperty(transformProp, 'scaleX(' + pctComplete + ')');
        });
      }

      /**
       * Toggles the active state of the slider
       * @param {boolean} active
       */

    }, {
      key: 'setActive_',
      value: function setActive_(active) {
        this.active_ = active;
        this.toggleClass_(cssClasses.ACTIVE, this.active_);
      }

      /**
       * Toggles the inTransit state of the slider
       * @param {boolean} inTransit
       */

    }, {
      key: 'setInTransit_',
      value: function setInTransit_(inTransit) {
        this.inTransit_ = inTransit;
        this.toggleClass_(cssClasses.IN_TRANSIT, this.inTransit_);
      }

      /**
       * Conditionally adds or removes a class based on shouldBePresent
       * @param {string} className
       * @param {boolean} shouldBePresent
       */

    }, {
      key: 'toggleClass_',
      value: function toggleClass_(className, shouldBePresent) {
        if (shouldBePresent) {
          this.adapter_.addClass(className);
        } else {
          this.adapter_.removeClass(className);
        }
      }
    }]);
    return MDCSliderFoundation;
  }(MDCFoundation);

  //

  var script = {
    name: 'mdc-slider',
    mixins: [DispatchFocusMixin],
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: [Number, String],
      min: { type: [Number, String], default: 0 },
      max: { type: [Number, String], default: 100 },
      step: { type: [Number, String], default: 0 },
      displayMarkers: Boolean,
      disabled: Boolean,
      layoutOn: String,
      layoutOnSource: { type: Object, required: false }
    },
    data: function data() {
      return {
        classes: {
          'mdc-slider--discrete': !!this.step,
          'mdc-slider--display-markers': this.displayMarkers
        },
        trackStyles: {},
        lastTrackMarkersStyles: {},
        thumbStyles: {},
        markerValue: '',
        numMarkers: 0
      };
    },

    computed: {
      isDiscrete: function isDiscrete() {
        return !!this.step;
      },
      hasMarkers: function hasMarkers() {
        return !!this.step && this.displayMarkers && this.numMarkers;
      }
    },
    watch: {
      value: function value() {
        if (this.foundation.getValue() !== Number(this.value)) {
          this.foundation.setValue(this.value);
        }
      },
      min: function min() {
        this.foundation.setMin(Number(this.min));
      },
      max: function max() {
        this.foundation.setMax(Number(this.max));
      },
      step: function step() {
        this.foundation.setStep(Number(this.step));
      },
      disabled: function disabled() {
        this.foundation.setDisabled(this.disabled);
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCSliderFoundation({
        hasClass: function hasClass(className) {
          return _this.$el.classList.contains(className);
        },
        addClass: function addClass(className) {
          _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.classes, className, true);
        },
        getAttribute: function getAttribute(name) {
          return _this.$el.getAttribute(name);
        },
        setAttribute: function setAttribute(name, value) {
          return _this.$el.setAttribute(name, value);
        },
        removeAttribute: function removeAttribute(name) {
          return _this.$el.removeAttribute(name);
        },
        computeBoundingRect: function computeBoundingRect() {
          return _this.$el.getBoundingClientRect();
        },
        getTabIndex: function getTabIndex() {
          return _this.$el.tabIndex;
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          _this.$el.addEventListener(type, handler, applyPassive());
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          _this.$el.removeEventListener(type, handler, applyPassive());
        },
        registerThumbContainerInteractionHandler: function registerThumbContainerInteractionHandler(type, handler) {
          _this.$refs.thumbContainer.addEventListener(type, handler, applyPassive());
        },
        deregisterThumbContainerInteractionHandler: function deregisterThumbContainerInteractionHandler(type, handler) {
          _this.$refs.thumbContainer.removeEventListener(type, handler, applyPassive());
        },
        registerBodyInteractionHandler: function registerBodyInteractionHandler(type, handler) {
          document.body.addEventListener(type, handler);
        },
        deregisterBodyInteractionHandler: function deregisterBodyInteractionHandler(type, handler) {
          document.body.removeEventListener(type, handler);
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          window.removeEventListener('resize', handler);
        },
        notifyInput: function notifyInput() {
          _this.$emit('input', _this.foundation.getValue());
        },
        notifyChange: function notifyChange() {
          _this.$emit('change', _this.foundation.getValue());
        },
        setThumbContainerStyleProperty: function setThumbContainerStyleProperty(propertyName, value) {
          _this.$set(_this.thumbStyles, propertyName, value);
        },
        setTrackStyleProperty: function setTrackStyleProperty(propertyName, value) {
          _this.$set(_this.trackStyles, propertyName, value);
        },
        setMarkerValue: function setMarkerValue(value) {
          _this.markerValue = value;
        },
        appendTrackMarkers: function appendTrackMarkers(numMarkers) {
          _this.numMarkers = numMarkers;
        },
        removeTrackMarkers: function removeTrackMarkers() {
          _this.numMarkers = 0;
        },
        setLastTrackMarkersStyleProperty: function setLastTrackMarkersStyleProperty(propertyName, value) {
          _this.$set(_this.lastTrackMarkersStyles, propertyName, value);
        },
        isRTL: function isRTL() {
          return false;
        }
      });

      this.foundation.init();
      this.foundation.setDisabled(this.disabled);
      if (Number(this.min) <= this.foundation.getMax()) {
        this.foundation.setMin(Number(this.min));
        this.foundation.setMax(Number(this.max));
      } else {
        this.foundation.setMax(Number(this.max));
        this.foundation.setMin(Number(this.min));
      }
      this.foundation.setStep(Number(this.step));
      this.foundation.setValue(Number(this.value));
      if (this.hasMarkers) {
        this.foundation.setupTrackMarker();
      }

      this.$root.$on('vma:layout', this.layout);

      if (this.layoutOn) {
        this.layoutOnEventSource = this.layoutOnSource || this.$root;
        this.layoutOnEventSource.$on(this.layoutOn, this.layout);
      }
    },
    beforeDestroy: function beforeDestroy() {
      this.$root.$off('vma:layout', this.layout);
      if (this.layoutOnEventSource) {
        this.layoutOnEventSource.$off(this.layoutOn, this.layout);
      }
      this.foundation.destroy();
    },

    methods: {
      layout: function layout() {
        var _this2 = this;

        this.$nextTick(function () {
          _this2.foundation && _this2.foundation.layout();
        });
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
      staticClass: "mdc-slider",
      class: _vm.classes,
      attrs: { tabindex: "0", role: "slider" }
    }, [_c("div", { staticClass: "mdc-slider__track-container" }, [_c("div", { staticClass: "mdc-slider__track", style: _vm.trackStyles }), _vm._v(" "), _vm.hasMarkers ? _c("div", { staticClass: "mdc-slider__track-marker-container" }, _vm._l(_vm.numMarkers, function (markerNum) {
      return _c("div", {
        key: markerNum,
        staticClass: "mdc-slider__track-marker",
        style: markerNum == _vm.numMarkers ? _vm.lastTrackMarkersStyles : {}
      });
    })) : _vm._e()]), _vm._v(" "), _c("div", {
      ref: "thumbContainer",
      staticClass: "mdc-slider__thumb-container",
      style: _vm.thumbStyles
    }, [_vm.isDiscrete ? _c("div", { staticClass: "mdc-slider__pin" }, [_c("span", { staticClass: "mdc-slider__pin-value-marker" }, [_vm._v(_vm._s(_vm.markerValue))])]) : _vm._e(), _vm._v(" "), _c("svg", {
      staticClass: "mdc-slider__thumb",
      attrs: { width: "21", height: "21" }
    }, [_c("circle", { attrs: { cx: "10.5", cy: "10.5", r: "7.875" } })]), _vm._v(" "), _c("div", { staticClass: "mdc-slider__focus-ring" })])]);
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
    component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\slider\\mdc-slider.vue";

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

  var mdcSlider = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

  var plugin = BasePlugin({
    mdcSlider: mdcSlider
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXBwbHktcGFzc2l2ZS5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Rpc3BhdGNoLWZvY3VzLW1peGluLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9zbGlkZXIvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9zbGlkZXIvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYW5pbWF0aW9uL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3NsaWRlci9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9zbGlkZXIvbWRjLXNsaWRlci52dWUiLCIuLi8uLi9jb21wb25lbnRzL3NsaWRlci9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvc2xpZGVyL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBzdXBwb3J0c1Bhc3NpdmVfXHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cclxuICogQHBhcmFtIHshV2luZG93PX0gZ2xvYmFsT2JqXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxyXG4gKiBAcmV0dXJuIHtib29sZWFufHtwYXNzaXZlOiBib29sZWFufX1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBseVBhc3NpdmUoZ2xvYmFsT2JqID0gd2luZG93LCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xyXG4gIGlmIChzdXBwb3J0c1Bhc3NpdmVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XHJcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZVxyXG4gICAgdHJ5IHtcclxuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7XHJcbiAgICAgICAgZ2V0IHBhc3NpdmUoKSB7XHJcbiAgICAgICAgICBpc1N1cHBvcnRlZCA9IHsgcGFzc2l2ZTogdHJ1ZSB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAvL2VtcHR5XHJcbiAgICB9XHJcblxyXG4gICAgc3VwcG9ydHNQYXNzaXZlXyA9IGlzU3VwcG9ydGVkXHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlX1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdChwbHVnaW4pIHtcclxuICAvLyBBdXRvLWluc3RhbGxcclxuICBsZXQgX1Z1ZSA9IG51bGxcclxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIF9WdWUgPSB3aW5kb3cuVnVlXHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cclxuICAgIF9WdWUgPSBnbG9iYWwuVnVlXHJcbiAgfVxyXG4gIGlmIChfVnVlKSB7XHJcbiAgICBfVnVlLnVzZShwbHVnaW4pXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luKGNvbXBvbmVudHMpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcclxuICAgIGluc3RhbGw6IHZtID0+IHtcclxuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXHJcbiAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRzXHJcbiAgfVxyXG59XHJcbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcclxuICBsZXQgZXZ0XHJcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcclxuICAgICAgZGV0YWlsOiBldnREYXRhLFxyXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcclxuICAgIH0pXHJcbiAgfSBlbHNlIHtcclxuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXHJcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXHJcbiAgfVxyXG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBEaXNwYXRjaEZvY3VzTWl4aW4gPSB7XHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7IGhhc0ZvY3VzOiBmYWxzZSB9XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBvbk1vdXNlRG93bigpIHtcclxuICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZVxyXG4gICAgfSxcclxuICAgIG9uTW91c2VVcCgpIHtcclxuICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2VcclxuICAgIH0sXHJcbiAgICBvbkZvY3VzRXZlbnQoKSB7XHJcbiAgICAgIC8vIGRpc3BhdGNoIGFzeW5jIHRvIGxldCB0aW1lIHRvIG90aGVyIGZvY3VzIGV2ZW50IHRvIHByb3BhZ2F0ZVxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzcGF0Y2hGb2N1c0V2ZW50KCksIDApXHJcbiAgICB9LFxyXG4gICAgb25CbHVyRXZlbnQoKSB7XHJcbiAgICAgIC8vIGRpc3BhdGNoIGFzeW5jIHRvIGxldCB0aW1lIHRvIG90aGVyIGZvY3VzIGV2ZW50IHRvIHByb3BhZ2F0ZVxyXG4gICAgICAvLyBhbHNvIGZpbHR1ciBibHVyIGlmIG1vdXNlZG93blxyXG4gICAgICB0aGlzLl9hY3RpdmUgfHwgc2V0VGltZW91dCgoKSA9PiB0aGlzLmRpc3BhdGNoRm9jdXNFdmVudCgpLCAwKVxyXG4gICAgfSxcclxuICAgIGRpc3BhdGNoRm9jdXNFdmVudCgpIHtcclxuICAgICAgbGV0IGhhc0ZvY3VzID1cclxuICAgICAgICB0aGlzLiRlbCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB8fFxyXG4gICAgICAgIHRoaXMuJGVsLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpXHJcbiAgICAgIGlmIChoYXNGb2N1cyAhPSB0aGlzLmhhc0ZvY3VzKSB7XHJcbiAgICAgICAgdGhpcy4kZW1pdChoYXNGb2N1cyA/ICdmb2N1cycgOiAnYmx1cicpXHJcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGhhc0ZvY3VzXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5vbkZvY3VzRXZlbnQpXHJcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMub25CbHVyRXZlbnQpXHJcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKVxyXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKVxyXG4gIH0sXHJcbiAgYmVmb3JlRGVzdHJveSgpIHtcclxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLm9uRm9jdXNFdmVudClcclxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkJsdXJFdmVudClcclxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pXHJcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXApXHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IHNjb3BlID1cclxuICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDB4MTAwMDAwMDApKS50b1N0cmluZygpICsgJy0nXHJcblxyXG5leHBvcnQgY29uc3QgVk1BVW5pcXVlSWRNaXhpbiA9IHtcclxuICBiZWZvcmVDcmVhdGUoKSB7XHJcbiAgICB0aGlzLnZtYV91aWRfID0gc2NvcGUgKyB0aGlzLl91aWRcclxuICB9XHJcbn1cclxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIEFDVElWRTogJ21kYy1zbGlkZXItLWFjdGl2ZScsXG4gIERJU0FCTEVEOiAnbWRjLXNsaWRlci0tZGlzYWJsZWQnLFxuICBESVNDUkVURTogJ21kYy1zbGlkZXItLWRpc2NyZXRlJyxcbiAgRk9DVVM6ICdtZGMtc2xpZGVyLS1mb2N1cycsXG4gIElOX1RSQU5TSVQ6ICdtZGMtc2xpZGVyLS1pbi10cmFuc2l0JyxcbiAgSVNfRElTQ1JFVEU6ICdtZGMtc2xpZGVyLS1kaXNjcmV0ZScsXG4gIEhBU19UUkFDS19NQVJLRVI6ICdtZGMtc2xpZGVyLS1kaXNwbGF5LW1hcmtlcnMnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBUUkFDS19TRUxFQ1RPUjogJy5tZGMtc2xpZGVyX190cmFjaycsXG4gIFRSQUNLX01BUktFUl9DT05UQUlORVJfU0VMRUNUT1I6ICcubWRjLXNsaWRlcl9fdHJhY2stbWFya2VyLWNvbnRhaW5lcicsXG4gIExBU1RfVFJBQ0tfTUFSS0VSX1NFTEVDVE9SOiAnLm1kYy1zbGlkZXJfX3RyYWNrLW1hcmtlcjpsYXN0LWNoaWxkJyxcbiAgVEhVTUJfQ09OVEFJTkVSX1NFTEVDVE9SOiAnLm1kYy1zbGlkZXJfX3RodW1iLWNvbnRhaW5lcicsXG4gIFBJTl9WQUxVRV9NQVJLRVJfU0VMRUNUT1I6ICcubWRjLXNsaWRlcl9fcGluLXZhbHVlLW1hcmtlcicsXG4gIEFSSUFfVkFMVUVNSU46ICdhcmlhLXZhbHVlbWluJyxcbiAgQVJJQV9WQUxVRU1BWDogJ2FyaWEtdmFsdWVtYXgnLFxuICBBUklBX1ZBTFVFTk9XOiAnYXJpYS12YWx1ZW5vdycsXG4gIEFSSUFfRElTQUJMRUQ6ICdhcmlhLWRpc2FibGVkJyxcbiAgU1RFUF9EQVRBX0FUVFI6ICdkYXRhLXN0ZXAnLFxuICBDSEFOR0VfRVZFTlQ6ICdNRENTbGlkZXI6Y2hhbmdlJyxcbiAgSU5QVVRfRVZFTlQ6ICdNRENTbGlkZXI6aW5wdXQnLFxufTtcblxuLyoqIEBlbnVtIHtudW1iZXJ9ICovXG5jb25zdCBudW1iZXJzID0ge1xuICBQQUdFX0ZBQ1RPUjogNCxcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFNsaWRlci5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBTbGlkZXIgaW50byB5b3VyIGZyYW1ld29yay4gU2VlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2F1dGhvcmluZy1jb21wb25lbnRzLm1kXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1NsaWRlckFkYXB0ZXIge1xuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGNsYXNzTmFtZSBleGlzdHMgZm9yIHRoZSBzbGlkZXIgRWxlbWVudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyB0byB0aGUgc2xpZGVyIEVsZW1lbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2xhc3MgZnJvbSB0aGUgc2xpZGVyIEVsZW1lbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIGlmIGF0dHJpYnV0ZSBuYW1lIGV4aXN0cyBvbiB0aGUgc2xpZGVyIEVsZW1lbnQsXG4gICAqIG90aGVyd2lzZSByZXR1cm5zIG51bGxcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHJldHVybiB7P3N0cmluZ31cbiAgICovXG4gIGdldEF0dHJpYnV0ZShuYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIGF0dHJpYnV0ZSBuYW1lIG9uIHNsaWRlciBFbGVtZW50IHRvIHZhbHVlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGF0dHJpYnV0ZSBuYW1lIGZyb20gc2xpZGVyIEVsZW1lbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICovXG4gIHJlbW92ZUF0dHJpYnV0ZShuYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBib3VuZGluZyBjbGllbnQgcmVjdCBmb3IgdGhlIHNsaWRlciBFbGVtZW50XG4gICAqIEByZXR1cm4gez9DbGllbnRSZWN0fVxuICAgKi9cbiAgY29tcHV0ZUJvdW5kaW5nUmVjdCgpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHRhYiBpbmRleCBvZiB0aGUgc2xpZGVyIEVsZW1lbnRcbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0VGFiSW5kZXgoKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgdGh1bWIgY29udGFpbmVyIGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXJzIGFuIGV2ZW50IGhhbmRsZXIgb24gdGhlIHRodW1iIGNvbnRhaW5lciBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSBib2R5IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXJzIGFuIGV2ZW50IGhhbmRsZXIgb24gdGhlIGJvZHkgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBmb3IgdGhlIHdpbmRvdyByZXNpemUgZXZlbnRcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIGZvciB0aGUgd2luZG93IHJlc2l6ZSBldmVudFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogRW1pdHMgYSBjdXN0b20gZXZlbnQgTURDU2xpZGVyOmlucHV0IGZyb20gdGhlIHJvb3RcbiAgICovXG4gIG5vdGlmeUlucHV0KCkge31cblxuICAvKipcbiAgICogRW1pdHMgYSBjdXN0b20gZXZlbnQgTURDU2xpZGVyOmNoYW5nZSBmcm9tIHRoZSByb290XG4gICAqL1xuICBub3RpZnlDaGFuZ2UoKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc3R5bGUgcHJvcGVydHkgb2YgdGhlIHRodW1iIGNvbnRhaW5lciBlbGVtZW50IHRvIHRoZSBwYXNzZWQgdmFsdWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldFRodW1iQ29udGFpbmVyU3R5bGVQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc3R5bGUgcHJvcGVydHkgb2YgdGhlIHRyYWNrIGVsZW1lbnQgdG8gdGhlIHBhc3NlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0VHJhY2tTdHlsZVByb3BlcnR5KHByb3BlcnR5TmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGlubmVyIHRleHQgb2YgdGhlIHBpbiBtYXJrZXIgdG8gdGhlIHBhc3NlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgICovXG4gIHNldE1hcmtlclZhbHVlKHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHRoZSBwYXNzZWQgbnVtYmVyIG9mIHRyYWNrIG1hcmtlcnMgdG8gdGhlIHRyYWNrIG1hcmsgY29udGFpbmVyIGVsZW1lbnRcbiAgICogQHBhcmFtIHtudW1iZXJ9IG51bU1hcmtlcnNcbiAgICovXG4gIGFwcGVuZFRyYWNrTWFya2VycyhudW1NYXJrZXJzKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0cmFjayBtYXJrZXJzIGZyb210IGhlIHRyYWNrIG1hcmsgY29udGFpbmVyIGVsZW1lbnRcbiAgICovXG4gIHJlbW92ZVRyYWNrTWFya2VycygpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgYSBzdHlsZSBwcm9wZXJ0eSBvZiB0aGUgbGFzdCB0cmFjayBtYXJrZXIgdG8gdGhlIHBhc3NlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0TGFzdFRyYWNrTWFya2Vyc1N0eWxlUHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSByb290IGVsZW1lbnQgaXMgUlRMLCBvdGhlcndpc2UgZmFsc2VcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzUlRMKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDU2xpZGVyQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIG5vUHJlZml4OiBzdHJpbmcsXG4gKiAgIHdlYmtpdFByZWZpeDogc3RyaW5nLFxuICogICBzdHlsZVByb3BlcnR5OiBzdHJpbmdcbiAqIH19XG4gKi9cbmxldCBWZW5kb3JQcm9wZXJ0eU1hcFR5cGU7XG5cbi8qKiBAY29uc3Qge09iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSAqL1xuY29uc3QgZXZlbnRUeXBlTWFwID0ge1xuICAnYW5pbWF0aW9uc3RhcnQnOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb25zdGFydCcsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uU3RhcnQnLFxuICAgIHN0eWxlUHJvcGVydHk6ICdhbmltYXRpb24nLFxuICB9LFxuICAnYW5pbWF0aW9uZW5kJzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uZW5kJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRBbmltYXRpb25FbmQnLFxuICAgIHN0eWxlUHJvcGVydHk6ICdhbmltYXRpb24nLFxuICB9LFxuICAnYW5pbWF0aW9uaXRlcmF0aW9uJzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uaXRlcmF0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRBbmltYXRpb25JdGVyYXRpb24nLFxuICAgIHN0eWxlUHJvcGVydHk6ICdhbmltYXRpb24nLFxuICB9LFxuICAndHJhbnNpdGlvbmVuZCc6IHtcbiAgICBub1ByZWZpeDogJ3RyYW5zaXRpb25lbmQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgIHN0eWxlUHJvcGVydHk6ICd0cmFuc2l0aW9uJyxcbiAgfSxcbn07XG5cbi8qKiBAY29uc3Qge09iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSAqL1xuY29uc3QgY3NzUHJvcGVydHlNYXAgPSB7XG4gICdhbmltYXRpb24nOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb24nLFxuICAgIHdlYmtpdFByZWZpeDogJy13ZWJraXQtYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ3RyYW5zZm9ybSc6IHtcbiAgICBub1ByZWZpeDogJ3RyYW5zZm9ybScsXG4gICAgd2Via2l0UHJlZml4OiAnLXdlYmtpdC10cmFuc2Zvcm0nLFxuICB9LFxuICAndHJhbnNpdGlvbic6IHtcbiAgICBub1ByZWZpeDogJ3RyYW5zaXRpb24nLFxuICAgIHdlYmtpdFByZWZpeDogJy13ZWJraXQtdHJhbnNpdGlvbicsXG4gIH0sXG59O1xuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBoYXNQcm9wZXJTaGFwZSh3aW5kb3dPYmopIHtcbiAgcmV0dXJuICh3aW5kb3dPYmpbJ2RvY3VtZW50J10gIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygd2luZG93T2JqWydkb2N1bWVudCddWydjcmVhdGVFbGVtZW50J10gPT09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGV2ZW50Rm91bmRJbk1hcHMoZXZlbnRUeXBlKSB7XG4gIHJldHVybiAoZXZlbnRUeXBlIGluIGV2ZW50VHlwZU1hcCB8fCBldmVudFR5cGUgaW4gY3NzUHJvcGVydHlNYXApO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEBwYXJhbSB7IU9iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSBtYXBcbiAqIEBwYXJhbSB7IUVsZW1lbnR9IGVsXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEphdmFTY3JpcHRFdmVudE5hbWUoZXZlbnRUeXBlLCBtYXAsIGVsKSB7XG4gIHJldHVybiBtYXBbZXZlbnRUeXBlXS5zdHlsZVByb3BlcnR5IGluIGVsLnN0eWxlID8gbWFwW2V2ZW50VHlwZV0ubm9QcmVmaXggOiBtYXBbZXZlbnRUeXBlXS53ZWJraXRQcmVmaXg7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGRldGVybWluZSBicm93c2VyIHByZWZpeCBmb3IgQ1NTMyBhbmltYXRpb24gZXZlbnRzXG4gKiBhbmQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIGlmICghaGFzUHJvcGVyU2hhcGUod2luZG93T2JqKSB8fCAhZXZlbnRGb3VuZEluTWFwcyhldmVudFR5cGUpKSB7XG4gICAgcmV0dXJuIGV2ZW50VHlwZTtcbiAgfVxuXG4gIGNvbnN0IG1hcCA9IC8qKiBAdHlwZSB7IU9iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSAqLyAoXG4gICAgZXZlbnRUeXBlIGluIGV2ZW50VHlwZU1hcCA/IGV2ZW50VHlwZU1hcCA6IGNzc1Byb3BlcnR5TWFwXG4gICk7XG4gIGNvbnN0IGVsID0gd2luZG93T2JqWydkb2N1bWVudCddWydjcmVhdGVFbGVtZW50J10oJ2RpdicpO1xuICBsZXQgZXZlbnROYW1lID0gJyc7XG5cbiAgaWYgKG1hcCA9PT0gZXZlbnRUeXBlTWFwKSB7XG4gICAgZXZlbnROYW1lID0gZ2V0SmF2YVNjcmlwdEV2ZW50TmFtZShldmVudFR5cGUsIG1hcCwgZWwpO1xuICB9IGVsc2Uge1xuICAgIGV2ZW50TmFtZSA9IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IGluIGVsLnN0eWxlID8gbWFwW2V2ZW50VHlwZV0ubm9QcmVmaXggOiBtYXBbZXZlbnRUeXBlXS53ZWJraXRQcmVmaXg7XG4gIH1cblxuICByZXR1cm4gZXZlbnROYW1lO1xufVxuXG4vLyBQdWJsaWMgZnVuY3Rpb25zIHRvIGFjY2VzcyBnZXRBbmltYXRpb25OYW1lKCkgZm9yIEphdmFTY3JpcHQgZXZlbnRzIG9yIENTU1xuLy8gcHJvcGVydHkgbmFtZXMuXG5cbmNvbnN0IHRyYW5zZm9ybVN0eWxlUHJvcGVydGllcyA9IFsndHJhbnNmb3JtJywgJ1dlYmtpdFRyYW5zZm9ybScsICdNb3pUcmFuc2Zvcm0nLCAnT1RyYW5zZm9ybScsICdNU1RyYW5zZm9ybSddO1xuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvcnJlY3RFdmVudE5hbWUod2luZG93T2JqLCBldmVudFR5cGUpIHtcbiAgcmV0dXJuIGdldEFuaW1hdGlvbk5hbWUod2luZG93T2JqLCBldmVudFR5cGUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvcnJlY3RQcm9wZXJ0eU5hbWUod2luZG93T2JqLCBldmVudFR5cGUpIHtcbiAgcmV0dXJuIGdldEFuaW1hdGlvbk5hbWUod2luZG93T2JqLCBldmVudFR5cGUpO1xufVxuXG5leHBvcnQge3RyYW5zZm9ybVN0eWxlUHJvcGVydGllcywgZ2V0Q29ycmVjdEV2ZW50TmFtZSwgZ2V0Q29ycmVjdFByb3BlcnR5TmFtZX07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICp5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IE1EQ1NsaWRlckFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcblxuaW1wb3J0IHtnZXRDb3JyZWN0RXZlbnROYW1lLCBnZXRDb3JyZWN0UHJvcGVydHlOYW1lfSBmcm9tICdAbWF0ZXJpYWwvYW5pbWF0aW9uL2luZGV4JztcbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IEtFWV9JRFMgPSB7XG4gIEFSUk9XX0xFRlQ6ICdBcnJvd0xlZnQnLFxuICBBUlJPV19SSUdIVDogJ0Fycm93UmlnaHQnLFxuICBBUlJPV19VUDogJ0Fycm93VXAnLFxuICBBUlJPV19ET1dOOiAnQXJyb3dEb3duJyxcbiAgSE9NRTogJ0hvbWUnLFxuICBFTkQ6ICdFbmQnLFxuICBQQUdFX1VQOiAnUGFnZVVwJyxcbiAgUEFHRV9ET1dOOiAnUGFnZURvd24nLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBNT1ZFX0VWRU5UX01BUCA9IHtcbiAgJ21vdXNlZG93bic6ICdtb3VzZW1vdmUnLFxuICAndG91Y2hzdGFydCc6ICd0b3VjaG1vdmUnLFxuICAncG9pbnRlcmRvd24nOiAncG9pbnRlcm1vdmUnLFxufTtcblxuY29uc3QgRE9XTl9FVkVOVFMgPSBbJ21vdXNlZG93bicsICdwb2ludGVyZG93bicsICd0b3VjaHN0YXJ0J107XG5jb25zdCBVUF9FVkVOVFMgPSBbJ21vdXNldXAnLCAncG9pbnRlcnVwJywgJ3RvdWNoZW5kJ107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1NsaWRlckFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENTbGlkZXJGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshTURDU2xpZGVyQWRhcHRlcn0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDU2xpZGVyQWRhcHRlcn0gKi8gKHtcbiAgICAgIGhhc0NsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IC8qIGJvb2xlYW4gKi8gZmFsc2UsXG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgZ2V0QXR0cmlidXRlOiAoLyogbmFtZTogc3RyaW5nICovKSA9PiAvKiBzdHJpbmd8bnVsbCAqLyBudWxsLFxuICAgICAgc2V0QXR0cmlidXRlOiAoLyogbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUF0dHJpYnV0ZTogKC8qIG5hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiAvKiBDbGllbnRSZWN0ICovICh7XG4gICAgICAgIHRvcDogMCwgcmlnaHQ6IDAsIGJvdHRvbTogMCwgbGVmdDogMCwgd2lkdGg6IDAsIGhlaWdodDogMCxcbiAgICAgIH0pLFxuICAgICAgZ2V0VGFiSW5kZXg6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogdHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlcjogKC8qIHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgbm90aWZ5SW5wdXQ6ICgpID0+IHt9LFxuICAgICAgbm90aWZ5Q2hhbmdlOiAoKSA9PiB7fSxcbiAgICAgIHNldFRodW1iQ29udGFpbmVyU3R5bGVQcm9wZXJ0eTogKC8qIHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldFRyYWNrU3R5bGVQcm9wZXJ0eTogKC8qIHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldE1hcmtlclZhbHVlOiAoLyogdmFsdWU6IG51bWJlciAqLykgPT4ge30sXG4gICAgICBhcHBlbmRUcmFja01hcmtlcnM6ICgvKiBudW1NYXJrZXJzOiBudW1iZXIgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlVHJhY2tNYXJrZXJzOiAoKSA9PiB7fSxcbiAgICAgIHNldExhc3RUcmFja01hcmtlcnNTdHlsZVByb3BlcnR5OiAoLyogcHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgaXNSVEw6ICgpID0+IC8qIGJvb2xlYW4gKi8gZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBNRENTbGlkZXJGb3VuZGF0aW9uXG4gICAqIEBwYXJhbSB7P01EQ1NsaWRlckFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1NsaWRlckZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcbiAgICAvKiogQHByaXZhdGUgez9DbGllbnRSZWN0fSAqL1xuICAgIHRoaXMucmVjdF8gPSBudWxsO1xuICAgIC8vIFdlIHNldCB0aGlzIHRvIE5hTiBzaW5jZSB3ZSB3YW50IGl0IHRvIGJlIGEgbnVtYmVyLCBidXQgd2UgY2FuJ3QgdXNlICcwJyBvciAnLTEnXG4gICAgLy8gYmVjYXVzZSB0aG9zZSBjb3VsZCBiZSB2YWxpZCB0YWJpbmRpY2VzIHNldCBieSB0aGUgY2xpZW50IGNvZGUuXG4gICAgdGhpcy5zYXZlZFRhYkluZGV4XyA9IE5hTjtcbiAgICB0aGlzLmFjdGl2ZV8gPSBmYWxzZTtcbiAgICB0aGlzLmluVHJhbnNpdF8gPSBmYWxzZTtcbiAgICB0aGlzLmlzRGlzY3JldGVfID0gZmFsc2U7XG4gICAgdGhpcy5oYXNUcmFja01hcmtlcl8gPSBmYWxzZTtcbiAgICB0aGlzLmhhbmRsaW5nVGh1bWJUYXJnZXRFdnRfID0gZmFsc2U7XG4gICAgdGhpcy5taW5fID0gMDtcbiAgICB0aGlzLm1heF8gPSAxMDA7XG4gICAgdGhpcy5zdGVwXyA9IDA7XG4gICAgdGhpcy52YWx1ZV8gPSAwO1xuICAgIHRoaXMuZGlzYWJsZWRfID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2ZW50Rm9jdXNTdGF0ZV8gPSBmYWxzZTtcbiAgICB0aGlzLnVwZGF0ZVVJRnJhbWVfID0gMDtcbiAgICB0aGlzLnRodW1iQ29udGFpbmVyUG9pbnRlckhhbmRsZXJfID0gKCkgPT4ge1xuICAgICAgdGhpcy5oYW5kbGluZ1RodW1iVGFyZ2V0RXZ0XyA9IHRydWU7XG4gICAgfTtcbiAgICB0aGlzLmludGVyYWN0aW9uU3RhcnRIYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlRG93bl8oZXZ0KTtcbiAgICB0aGlzLmtleWRvd25IYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlS2V5ZG93bl8oZXZ0KTtcbiAgICB0aGlzLmZvY3VzSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUZvY3VzXygpO1xuICAgIHRoaXMuYmx1ckhhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVCbHVyXygpO1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmlzRGlzY3JldGVfID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLklTX0RJU0NSRVRFKTtcbiAgICB0aGlzLmhhc1RyYWNrTWFya2VyXyA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5IQVNfVFJBQ0tfTUFSS0VSKTtcbiAgICBET1dOX0VWRU5UUy5mb3JFYWNoKChldnROYW1lKSA9PiB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dE5hbWUsIHRoaXMuaW50ZXJhY3Rpb25TdGFydEhhbmRsZXJfKSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcbiAgICBET1dOX0VWRU5UUy5mb3JFYWNoKChldnROYW1lKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0TmFtZSwgdGhpcy50aHVtYkNvbnRhaW5lclBvaW50ZXJIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgdGhpcy5sYXlvdXQoKTtcbiAgICAvLyBBdCBsYXN0IHN0ZXAsIHByb3ZpZGUgYSByZWFzb25hYmxlIGRlZmF1bHQgdmFsdWUgdG8gZGlzY3JldGUgc2xpZGVyXG4gICAgaWYgKHRoaXMuaXNEaXNjcmV0ZV8gJiYgdGhpcy5nZXRTdGVwKCkgPT0gMCkge1xuICAgICAgdGhpcy5zdGVwXyA9IDE7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBET1dOX0VWRU5UUy5mb3JFYWNoKChldnROYW1lKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0TmFtZSwgdGhpcy5pbnRlcmFjdGlvblN0YXJ0SGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG4gICAgRE9XTl9FVkVOVFMuZm9yRWFjaCgoZXZ0TmFtZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0TmFtZSwgdGhpcy50aHVtYkNvbnRhaW5lclBvaW50ZXJIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgfVxuXG4gIHNldHVwVHJhY2tNYXJrZXIoKSB7XG4gICAgaWYgKHRoaXMuaXNEaXNjcmV0ZV8gJiYgdGhpcy5oYXNUcmFja01hcmtlcl8mJiB0aGlzLmdldFN0ZXAoKSAhPSAwKSB7XG4gICAgICBjb25zdCBtaW4gPSB0aGlzLmdldE1pbigpO1xuICAgICAgY29uc3QgbWF4ID0gdGhpcy5nZXRNYXgoKTtcbiAgICAgIGNvbnN0IHN0ZXAgPSB0aGlzLmdldFN0ZXAoKTtcbiAgICAgIGxldCBudW1NYXJrZXJzID0gKG1heCAtIG1pbikgLyBzdGVwO1xuXG4gICAgICAvLyBJbiBjYXNlIGRpc3RhbmNlIGJldHdlZW4gbWF4ICYgbWluIGlzIGluZGl2aXNpYmxlIHRvIHN0ZXAsXG4gICAgICAvLyB3ZSBwbGFjZSB0aGUgc2Vjb25kYXJ5IHRvIGxhc3QgbWFya2VyIHByb3BvcnRpb25hbGx5IGF0IHdoZXJlIHRodW1iXG4gICAgICAvLyBjb3VsZCByZWFjaCBhbmQgcGxhY2UgdGhlIGxhc3QgbWFya2VyIGF0IG1heCB2YWx1ZVxuICAgICAgY29uc3QgaW5kaXZpc2libGUgPSBNYXRoLmNlaWwobnVtTWFya2VycykgIT09IG51bU1hcmtlcnM7XG4gICAgICBpZiAoaW5kaXZpc2libGUpIHtcbiAgICAgICAgbnVtTWFya2VycyA9IE1hdGguY2VpbChudW1NYXJrZXJzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVUcmFja01hcmtlcnMoKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYXBwZW5kVHJhY2tNYXJrZXJzKG51bU1hcmtlcnMpO1xuXG4gICAgICBpZiAoaW5kaXZpc2libGUpIHtcbiAgICAgICAgY29uc3QgbGFzdFN0ZXBSYXRpbyA9IChtYXggLSBudW1NYXJrZXJzICogc3RlcCkgLyBzdGVwICsgMTtcbiAgICAgICAgY29uc3QgZmxleCA9IGdldENvcnJlY3RQcm9wZXJ0eU5hbWUod2luZG93LCAnZmxleCcpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldExhc3RUcmFja01hcmtlcnNTdHlsZVByb3BlcnR5KGZsZXgsIFN0cmluZyhsYXN0U3RlcFJhdGlvKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIHRoaXMucmVjdF8gPSB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICB0aGlzLnVwZGF0ZVVJRm9yQ3VycmVudFZhbHVlXygpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge251bWJlcn0gKi9cbiAgZ2V0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVfO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAqL1xuICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuc2V0VmFsdWVfKHZhbHVlLCBmYWxzZSk7XG4gIH1cblxuICAvKiogQHJldHVybiB7bnVtYmVyfSAqL1xuICBnZXRNYXgoKSB7XG4gICAgcmV0dXJuIHRoaXMubWF4XztcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge251bWJlcn0gbWF4ICovXG4gIHNldE1heChtYXgpIHtcbiAgICBpZiAobWF4IDwgdGhpcy5taW5fKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzZXQgbWF4IHRvIGJlIGxlc3MgdGhhbiB0aGUgc2xpZGVyXFwncyBtaW5pbXVtIHZhbHVlJyk7XG4gICAgfVxuICAgIHRoaXMubWF4XyA9IG1heDtcbiAgICB0aGlzLnNldFZhbHVlXyh0aGlzLnZhbHVlXywgZmFsc2UsIHRydWUpO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cmlidXRlKHN0cmluZ3MuQVJJQV9WQUxVRU1BWCwgU3RyaW5nKHRoaXMubWF4XykpO1xuICAgIHRoaXMuc2V0dXBUcmFja01hcmtlcigpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge251bWJlcn0gKi9cbiAgZ2V0TWluKCkge1xuICAgIHJldHVybiB0aGlzLm1pbl87XG4gIH1cblxuICAvKiogQHBhcmFtIHtudW1iZXJ9IG1pbiAqL1xuICBzZXRNaW4obWluKSB7XG4gICAgaWYgKG1pbiA+IHRoaXMubWF4Xykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc2V0IG1pbiB0byBiZSBncmVhdGVyIHRoYW4gdGhlIHNsaWRlclxcJ3MgbWF4aW11bSB2YWx1ZScpO1xuICAgIH1cbiAgICB0aGlzLm1pbl8gPSBtaW47XG4gICAgdGhpcy5zZXRWYWx1ZV8odGhpcy52YWx1ZV8sIGZhbHNlLCB0cnVlKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZShzdHJpbmdzLkFSSUFfVkFMVUVNSU4sIFN0cmluZyh0aGlzLm1pbl8pKTtcbiAgICB0aGlzLnNldHVwVHJhY2tNYXJrZXIoKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldFN0ZXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RlcF87XG4gIH1cblxuICAvKiogQHBhcmFtIHtudW1iZXJ9IHN0ZXAgKi9cbiAgc2V0U3RlcChzdGVwKSB7XG4gICAgaWYgKHN0ZXAgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0ZXAgY2Fubm90IGJlIHNldCB0byBhIG5lZ2F0aXZlIG51bWJlcicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0Rpc2NyZXRlXyAmJiAodHlwZW9mKHN0ZXApICE9PSAnbnVtYmVyJyB8fCBzdGVwIDwgMSkpIHtcbiAgICAgIHN0ZXAgPSAxO1xuICAgIH1cbiAgICB0aGlzLnN0ZXBfID0gc3RlcDtcbiAgICB0aGlzLnNldFZhbHVlXyh0aGlzLnZhbHVlXywgZmFsc2UsIHRydWUpO1xuICAgIHRoaXMuc2V0dXBUcmFja01hcmtlcigpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWRfO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZWQgKi9cbiAgc2V0RGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLmRpc2FibGVkXyA9IGRpc2FibGVkO1xuICAgIHRoaXMudG9nZ2xlQ2xhc3NfKGNzc0NsYXNzZXMuRElTQUJMRUQsIHRoaXMuZGlzYWJsZWRfKTtcbiAgICBpZiAodGhpcy5kaXNhYmxlZF8pIHtcbiAgICAgIHRoaXMuc2F2ZWRUYWJJbmRleF8gPSB0aGlzLmFkYXB0ZXJfLmdldFRhYkluZGV4KCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZShzdHJpbmdzLkFSSUFfRElTQUJMRUQsICd0cnVlJyk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVBdHRyaWJ1dGUoc3RyaW5ncy5BUklBX0RJU0FCTEVEKTtcbiAgICAgIGlmICghaXNOYU4odGhpcy5zYXZlZFRhYkluZGV4XykpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgU3RyaW5nKHRoaXMuc2F2ZWRUYWJJbmRleF8pKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGludGVyYWN0aW5nIHdpdGggdGhlIHNsaWRlclxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVEb3duXyhldnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnByZXZlbnRGb2N1c1N0YXRlXyA9IHRydWU7XG4gICAgdGhpcy5zZXRJblRyYW5zaXRfKCF0aGlzLmhhbmRsaW5nVGh1bWJUYXJnZXRFdnRfKTtcbiAgICB0aGlzLmhhbmRsaW5nVGh1bWJUYXJnZXRFdnRfID0gZmFsc2U7XG4gICAgdGhpcy5zZXRBY3RpdmVfKHRydWUpO1xuXG4gICAgY29uc3QgbW92ZUhhbmRsZXIgPSAoZXZ0KSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZU1vdmVfKGV2dCk7XG4gICAgfTtcblxuICAgIC8vIE5vdGU6IHVwSGFuZGxlciBpcyBbZGVdcmVnaXN0ZXJlZCBvbiBBTEwgcG90ZW50aWFsIHBvaW50ZXItcmVsYXRlZCByZWxlYXNlIGV2ZW50IHR5cGVzLCBzaW5jZSBzb21lIGJyb3dzZXJzXG4gICAgLy8gZG8gbm90IGFsd2F5cyBmaXJlIHRoZXNlIGNvbnNpc3RlbnRseSBpbiBwYWlycy5cbiAgICAvLyAoU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2lzc3Vlcy8xMTkyKVxuICAgIGNvbnN0IHVwSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHRoaXMuaGFuZGxlVXBfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyKE1PVkVfRVZFTlRfTUFQW2V2dC50eXBlXSwgbW92ZUhhbmRsZXIpO1xuICAgICAgVVBfRVZFTlRTLmZvckVhY2goKGV2dE5hbWUpID0+IHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0TmFtZSwgdXBIYW5kbGVyKSk7XG4gICAgfTtcblxuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyKE1PVkVfRVZFTlRfTUFQW2V2dC50eXBlXSwgbW92ZUhhbmRsZXIpO1xuICAgIFVQX0VWRU5UUy5mb3JFYWNoKChldnROYW1lKSA9PiB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlcihldnROYW1lLCB1cEhhbmRsZXIpKTtcbiAgICB0aGlzLnNldFZhbHVlRnJvbUV2dF8oZXZ0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdXNlciBtb3ZlcyB0aGUgc2xpZGVyXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZU1vdmVfKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc2V0VmFsdWVGcm9tRXZ0XyhldnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSB1c2VyJ3MgaW50ZXJhY3Rpb24gd2l0aCB0aGUgc2xpZGVyIGVuZHNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZVVwXygpIHtcbiAgICB0aGlzLnNldEFjdGl2ZV8oZmFsc2UpO1xuICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5Q2hhbmdlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcGFnZVggb2YgdGhlIGV2ZW50XG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0UGFnZVhfKGV2dCkge1xuICAgIGlmIChldnQudGFyZ2V0VG91Y2hlcyAmJiBldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XG4gICAgfVxuICAgIHJldHVybiBldnQucGFnZVg7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2xpZGVyIHZhbHVlIGZyb20gYW4gZXZlbnRcbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2V0VmFsdWVGcm9tRXZ0XyhldnQpIHtcbiAgICBjb25zdCBwYWdlWCA9IHRoaXMuZ2V0UGFnZVhfKGV2dCk7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmNvbXB1dGVWYWx1ZUZyb21QYWdlWF8ocGFnZVgpO1xuICAgIHRoaXMuc2V0VmFsdWVfKHZhbHVlLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyB0aGUgbmV3IHZhbHVlIGZyb20gdGhlIHBhZ2VYIHBvc2l0aW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlWFxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBjb21wdXRlVmFsdWVGcm9tUGFnZVhfKHBhZ2VYKSB7XG4gICAgY29uc3Qge21heF86IG1heCwgbWluXzogbWlufSA9IHRoaXM7XG4gICAgY29uc3QgeFBvcyA9IHBhZ2VYIC0gdGhpcy5yZWN0Xy5sZWZ0O1xuICAgIGxldCBwY3RDb21wbGV0ZSA9IHhQb3MgLyB0aGlzLnJlY3RfLndpZHRoO1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzUlRMKCkpIHtcbiAgICAgIHBjdENvbXBsZXRlID0gMSAtIHBjdENvbXBsZXRlO1xuICAgIH1cbiAgICAvLyBGaXQgdGhlIHBlcmNlbnRhZ2UgY29tcGxldGUgYmV0d2VlbiB0aGUgcmFuZ2UgW21pbixtYXhdXG4gICAgLy8gYnkgcmVtYXBwaW5nIGZyb20gWzAsIDFdIHRvIFttaW4sIG1pbisobWF4LW1pbildLlxuICAgIHJldHVybiBtaW4gKyBwY3RDb21wbGV0ZSAqIChtYXggLSBtaW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMga2V5ZG93biBldmVudHNcbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKi9cbiAgaGFuZGxlS2V5ZG93bl8oZXZ0KSB7XG4gICAgY29uc3Qga2V5SWQgPSB0aGlzLmdldEtleUlkXyhldnQpO1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZUZvcktleUlkXyhrZXlJZCk7XG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFByZXZlbnQgcGFnZSBmcm9tIHNjcm9sbGluZyBkdWUgdG8ga2V5IHByZXNzZXMgdGhhdCB3b3VsZCBub3JtYWxseSBzY3JvbGwgdGhlIHBhZ2VcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuRk9DVVMpO1xuICAgIHRoaXMuc2V0VmFsdWVfKHZhbHVlLCB0cnVlKTtcbiAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNoYW5nZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbXB1dGVkIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAqIEBwYXJhbSB7IUV2ZW50fSBrYmRFdnRcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0S2V5SWRfKGtiZEV2dCkge1xuICAgIGlmIChrYmRFdnQua2V5ID09PSBLRVlfSURTLkFSUk9XX0xFRlQgfHwga2JkRXZ0LmtleUNvZGUgPT09IDM3KSB7XG4gICAgICByZXR1cm4gS0VZX0lEUy5BUlJPV19MRUZUO1xuICAgIH1cbiAgICBpZiAoa2JkRXZ0LmtleSA9PT0gS0VZX0lEUy5BUlJPV19SSUdIVCB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLkFSUk9XX1JJR0hUO1xuICAgIH1cbiAgICBpZiAoa2JkRXZ0LmtleSA9PT0gS0VZX0lEUy5BUlJPV19VUCB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzgpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLkFSUk9XX1VQO1xuICAgIH1cbiAgICBpZiAoa2JkRXZ0LmtleSA9PT0gS0VZX0lEUy5BUlJPV19ET1dOIHx8IGtiZEV2dC5rZXlDb2RlID09PSA0MCkge1xuICAgICAgcmV0dXJuIEtFWV9JRFMuQVJST1dfRE9XTjtcbiAgICB9XG4gICAgaWYgKGtiZEV2dC5rZXkgPT09IEtFWV9JRFMuSE9NRSB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzYpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLkhPTUU7XG4gICAgfVxuICAgIGlmIChrYmRFdnQua2V5ID09PSBLRVlfSURTLkVORCB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzUpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLkVORDtcbiAgICB9XG4gICAgaWYgKGtiZEV2dC5rZXkgPT09IEtFWV9JRFMuUEFHRV9VUCB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzMpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLlBBR0VfVVA7XG4gICAgfVxuICAgIGlmIChrYmRFdnQua2V5ID09PSBLRVlfSURTLlBBR0VfRE9XTiB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzQpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLlBBR0VfRE9XTjtcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIHZhbHVlIGdpdmVuIGEga2V5Ym9hcmQga2V5IElEXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlJZFxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXRWYWx1ZUZvcktleUlkXyhrZXlJZCkge1xuICAgIGNvbnN0IHttYXhfOiBtYXgsIG1pbl86IG1pbiwgc3RlcF86IHN0ZXB9ID0gdGhpcztcbiAgICBsZXQgZGVsdGEgPSBzdGVwIHx8IChtYXggLSBtaW4pIC8gMTAwO1xuICAgIGNvbnN0IHZhbHVlTmVlZHNUb0JlRmxpcHBlZCA9IHRoaXMuYWRhcHRlcl8uaXNSVEwoKSAmJiAoXG4gICAgICBrZXlJZCA9PT0gS0VZX0lEUy5BUlJPV19MRUZUIHx8IGtleUlkID09PSBLRVlfSURTLkFSUk9XX1JJR0hUXG4gICAgKTtcbiAgICBpZiAodmFsdWVOZWVkc1RvQmVGbGlwcGVkKSB7XG4gICAgICBkZWx0YSA9IC1kZWx0YTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGtleUlkKSB7XG4gICAgY2FzZSBLRVlfSURTLkFSUk9XX0xFRlQ6XG4gICAgY2FzZSBLRVlfSURTLkFSUk9XX0RPV046XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV8gLSBkZWx0YTtcbiAgICBjYXNlIEtFWV9JRFMuQVJST1dfUklHSFQ6XG4gICAgY2FzZSBLRVlfSURTLkFSUk9XX1VQOlxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVfICsgZGVsdGE7XG4gICAgY2FzZSBLRVlfSURTLkhPTUU6XG4gICAgICByZXR1cm4gdGhpcy5taW5fO1xuICAgIGNhc2UgS0VZX0lEUy5FTkQ6XG4gICAgICByZXR1cm4gdGhpcy5tYXhfO1xuICAgIGNhc2UgS0VZX0lEUy5QQUdFX1VQOlxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVfICsgZGVsdGEgKiBudW1iZXJzLlBBR0VfRkFDVE9SO1xuICAgIGNhc2UgS0VZX0lEUy5QQUdFX0RPV046XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV8gLSBkZWx0YSAqIG51bWJlcnMuUEFHRV9GQUNUT1I7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBOYU47XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXNfKCkge1xuICAgIGlmICh0aGlzLnByZXZlbnRGb2N1c1N0YXRlXykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuRk9DVVMpO1xuICB9XG5cbiAgaGFuZGxlQmx1cl8oKSB7XG4gICAgdGhpcy5wcmV2ZW50Rm9jdXNTdGF0ZV8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuRk9DVVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBzbGlkZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkRmlyZUlucHV0XG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlXG4gICAqL1xuICBzZXRWYWx1ZV8odmFsdWUsIHNob3VsZEZpcmVJbnB1dCwgZm9yY2UgPSBmYWxzZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy52YWx1ZV8gJiYgIWZvcmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qge21pbl86IG1pbiwgbWF4XzogbWF4fSA9IHRoaXM7XG4gICAgY29uc3QgdmFsdWVTZXRUb0JvdW5kYXJ5ID0gdmFsdWUgPT09IG1pbiB8fCB2YWx1ZSA9PT0gbWF4O1xuICAgIGlmICh0aGlzLnN0ZXBfICYmICF2YWx1ZVNldFRvQm91bmRhcnkpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5xdWFudGl6ZV8odmFsdWUpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgPCBtaW4pIHtcbiAgICAgIHZhbHVlID0gbWluO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPiBtYXgpIHtcbiAgICAgIHZhbHVlID0gbWF4O1xuICAgIH1cbiAgICB0aGlzLnZhbHVlXyA9IHZhbHVlO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cmlidXRlKHN0cmluZ3MuQVJJQV9WQUxVRU5PVywgU3RyaW5nKHRoaXMudmFsdWVfKSk7XG4gICAgdGhpcy51cGRhdGVVSUZvckN1cnJlbnRWYWx1ZV8oKTtcblxuICAgIGlmIChzaG91bGRGaXJlSW5wdXQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5SW5wdXQoKTtcbiAgICAgIGlmICh0aGlzLmlzRGlzY3JldGVfKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uc2V0TWFya2VyVmFsdWUodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBxdWFudGl6ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIHF1YW50aXplXyh2YWx1ZSkge1xuICAgIGNvbnN0IG51bVN0ZXBzID0gTWF0aC5yb3VuZCh2YWx1ZSAvIHRoaXMuc3RlcF8pO1xuICAgIGNvbnN0IHF1YW50aXplZFZhbCA9IG51bVN0ZXBzICogdGhpcy5zdGVwXztcbiAgICByZXR1cm4gcXVhbnRpemVkVmFsO1xuICB9XG5cbiAgdXBkYXRlVUlGb3JDdXJyZW50VmFsdWVfKCkge1xuICAgIGNvbnN0IHttYXhfOiBtYXgsIG1pbl86IG1pbiwgdmFsdWVfOiB2YWx1ZX0gPSB0aGlzO1xuICAgIGNvbnN0IHBjdENvbXBsZXRlID0gKHZhbHVlIC0gbWluKSAvIChtYXggLSBtaW4pO1xuICAgIGxldCB0cmFuc2xhdGVQeCA9IHBjdENvbXBsZXRlICogdGhpcy5yZWN0Xy53aWR0aDtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1JUTCgpKSB7XG4gICAgICB0cmFuc2xhdGVQeCA9IHRoaXMucmVjdF8ud2lkdGggLSB0cmFuc2xhdGVQeDtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2Zvcm1Qcm9wID0gZ2V0Q29ycmVjdFByb3BlcnR5TmFtZSh3aW5kb3csICd0cmFuc2Zvcm0nKTtcbiAgICBjb25zdCB0cmFuc2l0aW9uZW5kRXZ0TmFtZSA9IGdldENvcnJlY3RFdmVudE5hbWUod2luZG93LCAndHJhbnNpdGlvbmVuZCcpO1xuXG4gICAgaWYgKHRoaXMuaW5UcmFuc2l0Xykge1xuICAgICAgY29uc3Qgb25UcmFuc2l0aW9uRW5kID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldEluVHJhbnNpdF8oZmFsc2UpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlcih0cmFuc2l0aW9uZW5kRXZ0TmFtZSwgb25UcmFuc2l0aW9uRW5kKTtcbiAgICAgIH07XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXIodHJhbnNpdGlvbmVuZEV2dE5hbWUsIG9uVHJhbnNpdGlvbkVuZCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVVSUZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBOT1RFKHRyYXZpc2thdWZtYW4pOiBJdCB3b3VsZCBiZSBuaWNlIHRvIHVzZSBjYWxjKCkgaGVyZSxcbiAgICAgIC8vIGJ1dCBJRSBjYW5ub3QgaGFuZGxlIGNhbGNzIGluIHRyYW5zZm9ybXMgY29ycmVjdGx5LlxuICAgICAgLy8gU2VlOiBodHRwczovL2dvby5nbC9OQzJpdGtcbiAgICAgIC8vIEFsc28gbm90ZSB0aGF0IHRoZSAtNTAlIG9mZnNldCBpcyB1c2VkIHRvIGNlbnRlciB0aGUgc2xpZGVyIHRodW1iLlxuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUaHVtYkNvbnRhaW5lclN0eWxlUHJvcGVydHkodHJhbnNmb3JtUHJvcCwgYHRyYW5zbGF0ZVgoJHt0cmFuc2xhdGVQeH1weCkgdHJhbnNsYXRlWCgtNTAlKWApO1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUcmFja1N0eWxlUHJvcGVydHkodHJhbnNmb3JtUHJvcCwgYHNjYWxlWCgke3BjdENvbXBsZXRlfSlgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBhY3RpdmUgc3RhdGUgb2YgdGhlIHNsaWRlclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGFjdGl2ZVxuICAgKi9cbiAgc2V0QWN0aXZlXyhhY3RpdmUpIHtcbiAgICB0aGlzLmFjdGl2ZV8gPSBhY3RpdmU7XG4gICAgdGhpcy50b2dnbGVDbGFzc18oY3NzQ2xhc3Nlcy5BQ1RJVkUsIHRoaXMuYWN0aXZlXyk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgaW5UcmFuc2l0IHN0YXRlIG9mIHRoZSBzbGlkZXJcbiAgICogQHBhcmFtIHtib29sZWFufSBpblRyYW5zaXRcbiAgICovXG4gIHNldEluVHJhbnNpdF8oaW5UcmFuc2l0KSB7XG4gICAgdGhpcy5pblRyYW5zaXRfID0gaW5UcmFuc2l0O1xuICAgIHRoaXMudG9nZ2xlQ2xhc3NfKGNzc0NsYXNzZXMuSU5fVFJBTlNJVCwgdGhpcy5pblRyYW5zaXRfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25kaXRpb25hbGx5IGFkZHMgb3IgcmVtb3ZlcyBhIGNsYXNzIGJhc2VkIG9uIHNob3VsZEJlUHJlc2VudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkQmVQcmVzZW50XG4gICAqL1xuICB0b2dnbGVDbGFzc18oY2xhc3NOYW1lLCBzaG91bGRCZVByZXNlbnQpIHtcbiAgICBpZiAoc2hvdWxkQmVQcmVzZW50KSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDU2xpZGVyRm91bmRhdGlvbjtcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2XHJcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCJcclxuICAgIGNsYXNzPVwibWRjLXNsaWRlclwiXHJcbiAgICB0YWJpbmRleD1cIjBcIlxyXG4gICAgcm9sZT1cInNsaWRlclwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1kYy1zbGlkZXJfX3RyYWNrLWNvbnRhaW5lclwiPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgOnN0eWxlPVwidHJhY2tTdHlsZXNcIlxyXG4gICAgICAgIGNsYXNzPVwibWRjLXNsaWRlcl9fdHJhY2tcIi8+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICB2LWlmPVwiaGFzTWFya2Vyc1wiXHJcbiAgICAgICAgY2xhc3M9XCJtZGMtc2xpZGVyX190cmFjay1tYXJrZXItY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgdi1mb3I9XCJtYXJrZXJOdW0gaW4gbnVtTWFya2Vyc1wiXHJcbiAgICAgICAgICA6a2V5PVwibWFya2VyTnVtXCJcclxuICAgICAgICAgIDpzdHlsZT1cIihtYXJrZXJOdW0gPT0gbnVtTWFya2VycykgPyBsYXN0VHJhY2tNYXJrZXJzU3R5bGVzIDoge31cIlxyXG4gICAgICAgICAgY2xhc3M9XCJtZGMtc2xpZGVyX190cmFjay1tYXJrZXJcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2XHJcbiAgICAgIHJlZj1cInRodW1iQ29udGFpbmVyXCJcclxuICAgICAgOnN0eWxlPVwidGh1bWJTdHlsZXNcIlxyXG4gICAgICBjbGFzcz1cIm1kYy1zbGlkZXJfX3RodW1iLWNvbnRhaW5lclwiPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgdi1pZj1cImlzRGlzY3JldGVcIlxyXG4gICAgICAgIGNsYXNzPVwibWRjLXNsaWRlcl9fcGluXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJtZGMtc2xpZGVyX19waW4tdmFsdWUtbWFya2VyXCI+e3sgbWFya2VyVmFsdWUgfX08L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8c3ZnXHJcbiAgICAgICAgY2xhc3M9XCJtZGMtc2xpZGVyX190aHVtYlwiXHJcbiAgICAgICAgd2lkdGg9XCIyMVwiXHJcbiAgICAgICAgaGVpZ2h0PVwiMjFcIj5cclxuICAgICAgICA8Y2lyY2xlXHJcbiAgICAgICAgICBjeD1cIjEwLjVcIlxyXG4gICAgICAgICAgY3k9XCIxMC41XCJcclxuICAgICAgICAgIHI9XCI3Ljg3NVwiLz5cclxuICAgICAgPC9zdmc+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJtZGMtc2xpZGVyX19mb2N1cy1yaW5nXCIvPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgTURDU2xpZGVyRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvc2xpZGVyL2ZvdW5kYXRpb24nXHJcbmltcG9ydCB7IERpc3BhdGNoRm9jdXNNaXhpbiwgYXBwbHlQYXNzaXZlIH0gZnJvbSAnLi4vYmFzZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLXNsaWRlcicsXHJcbiAgbWl4aW5zOiBbRGlzcGF0Y2hGb2N1c01peGluXSxcclxuICBtb2RlbDoge1xyXG4gICAgcHJvcDogJ3ZhbHVlJyxcclxuICAgIGV2ZW50OiAnY2hhbmdlJ1xyXG4gIH0sXHJcbiAgcHJvcHM6IHtcclxuICAgIHZhbHVlOiBbTnVtYmVyLCBTdHJpbmddLFxyXG4gICAgbWluOiB7IHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sIGRlZmF1bHQ6IDAgfSxcclxuICAgIG1heDogeyB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLCBkZWZhdWx0OiAxMDAgfSxcclxuICAgIHN0ZXA6IHsgdHlwZTogW051bWJlciwgU3RyaW5nXSwgZGVmYXVsdDogMCB9LFxyXG4gICAgZGlzcGxheU1hcmtlcnM6IEJvb2xlYW4sXHJcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcclxuICAgIGxheW91dE9uOiBTdHJpbmcsXHJcbiAgICBsYXlvdXRPblNvdXJjZTogeyB0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiBmYWxzZSB9XHJcbiAgfSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2xhc3Nlczoge1xyXG4gICAgICAgICdtZGMtc2xpZGVyLS1kaXNjcmV0ZSc6ICEhdGhpcy5zdGVwLFxyXG4gICAgICAgICdtZGMtc2xpZGVyLS1kaXNwbGF5LW1hcmtlcnMnOiB0aGlzLmRpc3BsYXlNYXJrZXJzXHJcbiAgICAgIH0sXHJcbiAgICAgIHRyYWNrU3R5bGVzOiB7fSxcclxuICAgICAgbGFzdFRyYWNrTWFya2Vyc1N0eWxlczoge30sXHJcbiAgICAgIHRodW1iU3R5bGVzOiB7fSxcclxuICAgICAgbWFya2VyVmFsdWU6ICcnLFxyXG4gICAgICBudW1NYXJrZXJzOiAwXHJcbiAgICB9XHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgaXNEaXNjcmV0ZSgpIHtcclxuICAgICAgcmV0dXJuICEhdGhpcy5zdGVwXHJcbiAgICB9LFxyXG4gICAgaGFzTWFya2VycygpIHtcclxuICAgICAgcmV0dXJuICEhdGhpcy5zdGVwICYmIHRoaXMuZGlzcGxheU1hcmtlcnMgJiYgdGhpcy5udW1NYXJrZXJzXHJcbiAgICB9XHJcbiAgfSxcclxuICB3YXRjaDoge1xyXG4gICAgdmFsdWUoKSB7XHJcbiAgICAgIGlmICh0aGlzLmZvdW5kYXRpb24uZ2V0VmFsdWUoKSAhPT0gTnVtYmVyKHRoaXMudmFsdWUpKSB7XHJcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldFZhbHVlKHRoaXMudmFsdWUpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtaW4oKSB7XHJcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRNaW4oTnVtYmVyKHRoaXMubWluKSlcclxuICAgIH0sXHJcbiAgICBtYXgoKSB7XHJcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRNYXgoTnVtYmVyKHRoaXMubWF4KSlcclxuICAgIH0sXHJcbiAgICBzdGVwKCkge1xyXG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0U3RlcChOdW1iZXIodGhpcy5zdGVwKSlcclxuICAgIH0sXHJcbiAgICBkaXNhYmxlZCgpIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuZGlzYWJsZWQpXHJcbiAgICB9XHJcbiAgfSxcclxuICBtb3VudGVkKCkge1xyXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ1NsaWRlckZvdW5kYXRpb24oe1xyXG4gICAgICBoYXNDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxyXG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4ge1xyXG4gICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcclxuICAgICAgfSxcclxuICAgICAgZ2V0QXR0cmlidXRlOiBuYW1lID0+IHRoaXMuJGVsLmdldEF0dHJpYnV0ZShuYW1lKSxcclxuICAgICAgc2V0QXR0cmlidXRlOiAobmFtZSwgdmFsdWUpID0+IHRoaXMuJGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSksXHJcbiAgICAgIHJlbW92ZUF0dHJpYnV0ZTogbmFtZSA9PiB0aGlzLiRlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSksXHJcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IHRoaXMuJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICBnZXRUYWJJbmRleDogKCkgPT4gdGhpcy4kZWwudGFiSW5kZXgsXHJcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpXHJcbiAgICAgIH0sXHJcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcclxuICAgICAgfSxcclxuICAgICAgcmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICB0aGlzLiRyZWZzLnRodW1iQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgaGFuZGxlcixcclxuICAgICAgICAgIGFwcGx5UGFzc2l2ZSgpXHJcbiAgICAgICAgKVxyXG4gICAgICB9LFxyXG4gICAgICBkZXJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kcmVmcy50aHVtYkNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgdHlwZSxcclxuICAgICAgICAgIGhhbmRsZXIsXHJcbiAgICAgICAgICBhcHBseVBhc3NpdmUoKVxyXG4gICAgICAgIClcclxuICAgICAgfSxcclxuICAgICAgcmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKVxyXG4gICAgICB9LFxyXG4gICAgICBkZXJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlcilcclxuICAgICAgfSxcclxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiBoYW5kbGVyID0+IHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcclxuICAgICAgfSxcclxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxyXG4gICAgICB9LFxyXG4gICAgICBub3RpZnlJbnB1dDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgdGhpcy5mb3VuZGF0aW9uLmdldFZhbHVlKCkpXHJcbiAgICAgIH0sXHJcbiAgICAgIG5vdGlmeUNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIHRoaXMuZm91bmRhdGlvbi5nZXRWYWx1ZSgpKVxyXG4gICAgICB9LFxyXG4gICAgICBzZXRUaHVtYkNvbnRhaW5lclN0eWxlUHJvcGVydHk6IChwcm9wZXJ0eU5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMudGh1bWJTdHlsZXMsIHByb3BlcnR5TmFtZSwgdmFsdWUpXHJcbiAgICAgIH0sXHJcbiAgICAgIHNldFRyYWNrU3R5bGVQcm9wZXJ0eTogKHByb3BlcnR5TmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy50cmFja1N0eWxlcywgcHJvcGVydHlOYW1lLCB2YWx1ZSlcclxuICAgICAgfSxcclxuICAgICAgc2V0TWFya2VyVmFsdWU6IHZhbHVlID0+IHtcclxuICAgICAgICB0aGlzLm1hcmtlclZhbHVlID0gdmFsdWVcclxuICAgICAgfSxcclxuICAgICAgYXBwZW5kVHJhY2tNYXJrZXJzOiBudW1NYXJrZXJzID0+IHtcclxuICAgICAgICB0aGlzLm51bU1hcmtlcnMgPSBudW1NYXJrZXJzXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbW92ZVRyYWNrTWFya2VyczogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubnVtTWFya2VycyA9IDBcclxuICAgICAgfSxcclxuICAgICAgc2V0TGFzdFRyYWNrTWFya2Vyc1N0eWxlUHJvcGVydHk6IChwcm9wZXJ0eU5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMubGFzdFRyYWNrTWFya2Vyc1N0eWxlcywgcHJvcGVydHlOYW1lLCB2YWx1ZSlcclxuICAgICAgfSxcclxuICAgICAgaXNSVEw6ICgpID0+IGZhbHNlXHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuZm91bmRhdGlvbi5pbml0KClcclxuICAgIHRoaXMuZm91bmRhdGlvbi5zZXREaXNhYmxlZCh0aGlzLmRpc2FibGVkKVxyXG4gICAgaWYgKE51bWJlcih0aGlzLm1pbikgPD0gdGhpcy5mb3VuZGF0aW9uLmdldE1heCgpKSB7XHJcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRNaW4oTnVtYmVyKHRoaXMubWluKSlcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldE1heChOdW1iZXIodGhpcy5tYXgpKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldE1heChOdW1iZXIodGhpcy5tYXgpKVxyXG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0TWluKE51bWJlcih0aGlzLm1pbikpXHJcbiAgICB9XHJcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0U3RlcChOdW1iZXIodGhpcy5zdGVwKSlcclxuICAgIHRoaXMuZm91bmRhdGlvbi5zZXRWYWx1ZShOdW1iZXIodGhpcy52YWx1ZSkpXHJcbiAgICBpZiAodGhpcy5oYXNNYXJrZXJzKSB7XHJcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXR1cFRyYWNrTWFya2VyKClcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLiRyb290LiRvbigndm1hOmxheW91dCcsIHRoaXMubGF5b3V0KVxyXG5cclxuICAgIGlmICh0aGlzLmxheW91dE9uKSB7XHJcbiAgICAgIHRoaXMubGF5b3V0T25FdmVudFNvdXJjZSA9IHRoaXMubGF5b3V0T25Tb3VyY2UgfHwgdGhpcy4kcm9vdFxyXG4gICAgICB0aGlzLmxheW91dE9uRXZlbnRTb3VyY2UuJG9uKHRoaXMubGF5b3V0T24sIHRoaXMubGF5b3V0KVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYmVmb3JlRGVzdHJveSgpIHtcclxuICAgIHRoaXMuJHJvb3QuJG9mZigndm1hOmxheW91dCcsIHRoaXMubGF5b3V0KVxyXG4gICAgaWYgKHRoaXMubGF5b3V0T25FdmVudFNvdXJjZSkge1xyXG4gICAgICB0aGlzLmxheW91dE9uRXZlbnRTb3VyY2UuJG9mZih0aGlzLmxheW91dE9uLCB0aGlzLmxheW91dClcclxuICAgIH1cclxuICAgIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KClcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGxheW91dCgpIHtcclxuICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24ubGF5b3V0KClcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsImltcG9ydCB7IEJhc2VQbHVnaW4gfSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgbWRjU2xpZGVyIGZyb20gJy4vbWRjLXNsaWRlci52dWUnXHJcblxyXG5leHBvcnQgeyBtZGNTbGlkZXIgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XHJcbiAgbWRjU2xpZGVyXHJcbn0pXHJcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcclxuaW1wb3J0IHsgYXV0b0luaXQgfSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXHJcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxyXG5cclxuYXV0b0luaXQocGx1Z2luKVxyXG4iXSwibmFtZXMiOlsic3VwcG9ydHNQYXNzaXZlXyIsImFwcGx5UGFzc2l2ZSIsImdsb2JhbE9iaiIsIndpbmRvdyIsImZvcmNlUmVmcmVzaCIsInVuZGVmaW5lZCIsImlzU3VwcG9ydGVkIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsImUiLCJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwia2V5IiwiY29tcG9uZW50Iiwidm0iLCJuYW1lIiwiRGlzcGF0Y2hGb2N1c01peGluIiwiZGF0YSIsImhhc0ZvY3VzIiwibWV0aG9kcyIsIm9uTW91c2VEb3duIiwiX2FjdGl2ZSIsIm9uTW91c2VVcCIsIm9uRm9jdXNFdmVudCIsInNldFRpbWVvdXQiLCJkaXNwYXRjaEZvY3VzRXZlbnQiLCJvbkJsdXJFdmVudCIsIiRlbCIsImFjdGl2ZUVsZW1lbnQiLCJjb250YWlucyIsIiRlbWl0IiwibW91bnRlZCIsImJlZm9yZURlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2NvcGUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsImNzc0NsYXNzZXMiLCJBQ1RJVkUiLCJESVNBQkxFRCIsIkRJU0NSRVRFIiwiRk9DVVMiLCJJTl9UUkFOU0lUIiwiSVNfRElTQ1JFVEUiLCJIQVNfVFJBQ0tfTUFSS0VSIiwic3RyaW5ncyIsIlRSQUNLX1NFTEVDVE9SIiwiVFJBQ0tfTUFSS0VSX0NPTlRBSU5FUl9TRUxFQ1RPUiIsIkxBU1RfVFJBQ0tfTUFSS0VSX1NFTEVDVE9SIiwiVEhVTUJfQ09OVEFJTkVSX1NFTEVDVE9SIiwiUElOX1ZBTFVFX01BUktFUl9TRUxFQ1RPUiIsIkFSSUFfVkFMVUVNSU4iLCJBUklBX1ZBTFVFTUFYIiwiQVJJQV9WQUxVRU5PVyIsIkFSSUFfRElTQUJMRUQiLCJTVEVQX0RBVEFfQVRUUiIsIkNIQU5HRV9FVkVOVCIsIklOUFVUX0VWRU5UIiwibnVtYmVycyIsIlBBR0VfRkFDVE9SIiwiTURDU2xpZGVyQWRhcHRlciIsImNsYXNzTmFtZSIsInZhbHVlIiwidHlwZSIsImhhbmRsZXIiLCJwcm9wZXJ0eU5hbWUiLCJudW1NYXJrZXJzIiwiZXZlbnRUeXBlTWFwIiwibm9QcmVmaXgiLCJ3ZWJraXRQcmVmaXgiLCJzdHlsZVByb3BlcnR5IiwiY3NzUHJvcGVydHlNYXAiLCJoYXNQcm9wZXJTaGFwZSIsIndpbmRvd09iaiIsImV2ZW50Rm91bmRJbk1hcHMiLCJldmVudFR5cGUiLCJnZXRKYXZhU2NyaXB0RXZlbnROYW1lIiwibWFwIiwiZWwiLCJzdHlsZSIsImdldEFuaW1hdGlvbk5hbWUiLCJldmVudE5hbWUiLCJnZXRDb3JyZWN0RXZlbnROYW1lIiwiZ2V0Q29ycmVjdFByb3BlcnR5TmFtZSIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJLRVlfSURTIiwiQVJST1dfTEVGVCIsIkFSUk9XX1JJR0hUIiwiQVJST1dfVVAiLCJBUlJPV19ET1dOIiwiSE9NRSIsIkVORCIsIlBBR0VfVVAiLCJQQUdFX0RPV04iLCJNT1ZFX0VWRU5UX01BUCIsIkRPV05fRVZFTlRTIiwiVVBfRVZFTlRTIiwiTURDU2xpZGVyRm91bmRhdGlvbiIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImNvbXB1dGVCb3VuZGluZ1JlY3QiLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJ3aWR0aCIsImhlaWdodCIsImdldFRhYkluZGV4IiwicmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJub3RpZnlJbnB1dCIsIm5vdGlmeUNoYW5nZSIsInNldFRodW1iQ29udGFpbmVyU3R5bGVQcm9wZXJ0eSIsInNldFRyYWNrU3R5bGVQcm9wZXJ0eSIsInNldE1hcmtlclZhbHVlIiwiYXBwZW5kVHJhY2tNYXJrZXJzIiwicmVtb3ZlVHJhY2tNYXJrZXJzIiwic2V0TGFzdFRyYWNrTWFya2Vyc1N0eWxlUHJvcGVydHkiLCJpc1JUTCIsImJhYmVsSGVscGVycy5leHRlbmRzIiwiZGVmYXVsdEFkYXB0ZXIiLCJyZWN0XyIsInNhdmVkVGFiSW5kZXhfIiwiTmFOIiwiYWN0aXZlXyIsImluVHJhbnNpdF8iLCJpc0Rpc2NyZXRlXyIsImhhc1RyYWNrTWFya2VyXyIsImhhbmRsaW5nVGh1bWJUYXJnZXRFdnRfIiwibWluXyIsIm1heF8iLCJzdGVwXyIsInZhbHVlXyIsImRpc2FibGVkXyIsInByZXZlbnRGb2N1c1N0YXRlXyIsInVwZGF0ZVVJRnJhbWVfIiwidGh1bWJDb250YWluZXJQb2ludGVySGFuZGxlcl8iLCJpbnRlcmFjdGlvblN0YXJ0SGFuZGxlcl8iLCJldnQiLCJoYW5kbGVEb3duXyIsImtleWRvd25IYW5kbGVyXyIsImhhbmRsZUtleWRvd25fIiwiZm9jdXNIYW5kbGVyXyIsImhhbmRsZUZvY3VzXyIsImJsdXJIYW5kbGVyXyIsImhhbmRsZUJsdXJfIiwicmVzaXplSGFuZGxlcl8iLCJsYXlvdXQiLCJmb3JFYWNoIiwiZXZ0TmFtZSIsImdldFN0ZXAiLCJtaW4iLCJnZXRNaW4iLCJtYXgiLCJnZXRNYXgiLCJzdGVwIiwiaW5kaXZpc2libGUiLCJjZWlsIiwibGFzdFN0ZXBSYXRpbyIsImZsZXgiLCJTdHJpbmciLCJ1cGRhdGVVSUZvckN1cnJlbnRWYWx1ZV8iLCJzZXRWYWx1ZV8iLCJFcnJvciIsInNldHVwVHJhY2tNYXJrZXIiLCJkaXNhYmxlZCIsInRvZ2dsZUNsYXNzXyIsImlzTmFOIiwic2V0SW5UcmFuc2l0XyIsInNldEFjdGl2ZV8iLCJtb3ZlSGFuZGxlciIsImhhbmRsZU1vdmVfIiwidXBIYW5kbGVyIiwiaGFuZGxlVXBfIiwic2V0VmFsdWVGcm9tRXZ0XyIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0VG91Y2hlcyIsImxlbmd0aCIsInBhZ2VYIiwiZ2V0UGFnZVhfIiwiY29tcHV0ZVZhbHVlRnJvbVBhZ2VYXyIsInhQb3MiLCJwY3RDb21wbGV0ZSIsImtleUlkIiwiZ2V0S2V5SWRfIiwiZ2V0VmFsdWVGb3JLZXlJZF8iLCJrYmRFdnQiLCJrZXlDb2RlIiwiZGVsdGEiLCJ2YWx1ZU5lZWRzVG9CZUZsaXBwZWQiLCJzaG91bGRGaXJlSW5wdXQiLCJmb3JjZSIsInZhbHVlU2V0VG9Cb3VuZGFyeSIsInF1YW50aXplXyIsIm51bVN0ZXBzIiwicm91bmQiLCJxdWFudGl6ZWRWYWwiLCJ0cmFuc2xhdGVQeCIsInRyYW5zZm9ybVByb3AiLCJ0cmFuc2l0aW9uZW5kRXZ0TmFtZSIsIm9uVHJhbnNpdGlvbkVuZCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImFjdGl2ZSIsImluVHJhbnNpdCIsInNob3VsZEJlUHJlc2VudCIsIm1kY1NsaWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztFQUFBLElBQUlBLHlCQUFKOztFQUVBOzs7Ozs7QUFNQSxFQUFPLFNBQVNDLFlBQVQsR0FBZ0U7RUFBQSxNQUExQ0MsU0FBMEMsdUVBQTlCQyxNQUE4QjtFQUFBLE1BQXRCQyxZQUFzQix1RUFBUCxLQUFPOztFQUNyRSxNQUFJSixxQkFBcUJLLFNBQXJCLElBQWtDRCxZQUF0QyxFQUFvRDtFQUNsRCxRQUFJRSxjQUFjLEtBQWxCO0VBQ0EsUUFBSTtFQUNGSixnQkFBVUssUUFBVixDQUFtQkMsZ0JBQW5CLENBQW9DLE1BQXBDLEVBQTRDLElBQTVDLEVBQWtEO0VBQ2hELFlBQUlDLE9BQUosR0FBYztFQUNaSCx3QkFBYyxFQUFFRyxTQUFTLElBQVgsRUFBZDtFQUNEO0VBSCtDLE9BQWxEO0VBS0QsS0FORCxDQU1FLE9BQU9DLENBQVAsRUFBVTtFQUNWO0VBQ0Q7O0VBRURWLHVCQUFtQk0sV0FBbkI7RUFDRDs7RUFFRCxTQUFPTixnQkFBUDtFQUNEOztFQ3pCTSxTQUFTVyxRQUFULENBQWtCQyxNQUFsQixFQUEwQjtFQUMvQjtFQUNBLE1BQUlDLE9BQU8sSUFBWDtFQUNBLE1BQUksT0FBT1YsTUFBUCxLQUFrQixXQUF0QixFQUFtQztFQUNqQ1UsV0FBT1YsT0FBT1csR0FBZDtFQUNELEdBRkQsTUFFTyxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7RUFDeEM7RUFDQUYsV0FBT0UsT0FBT0QsR0FBZDtFQUNEO0VBQ0QsTUFBSUQsSUFBSixFQUFVO0VBQ1JBLFNBQUtHLEdBQUwsQ0FBU0osTUFBVDtFQUNEO0VBQ0Y7O0VDWk0sU0FBU0ssVUFBVCxDQUFvQkMsVUFBcEIsRUFBZ0M7RUFDckMsU0FBTztFQUNMQyxhQUFT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
