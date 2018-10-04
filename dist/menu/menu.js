/**
* @module vue-mdc-adaptermenu 0.18.2
* @exports VueMDCMenu
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCMenu = factory());
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
     * Adapter for MDC Menu. Provides an interface for managing
     * - classes
     * - dom
     * - focus
     * - position
     * - dimensions
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
    var MDCMenuAdapter = function () {
      function MDCMenuAdapter() {
        classCallCheck(this, MDCMenuAdapter);
      }

      createClass(MDCMenuAdapter, [{
        key: "addClass",

        /** @param {string} className */
        value: function addClass(className) {}

        /** @param {string} className */

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

        /** @return {boolean} */

      }, {
        key: "hasNecessaryDom",
        value: function hasNecessaryDom() {}

        /**
         * @param {EventTarget} target
         * @param {string} attributeName
         * @return {string}
         */

      }, {
        key: "getAttributeForEventTarget",
        value: function getAttributeForEventTarget(target, attributeName) {}

        /** @return {{ width: number, height: number }} */

      }, {
        key: "getInnerDimensions",
        value: function getInnerDimensions() {}

        /** @return {boolean} */

      }, {
        key: "hasAnchor",
        value: function hasAnchor() {}

        /** @return {{width: number, height: number, top: number, right: number, bottom: number, left: number}} */

      }, {
        key: "getAnchorDimensions",
        value: function getAnchorDimensions() {}

        /** @return {{ width: number, height: number }} */

      }, {
        key: "getWindowDimensions",
        value: function getWindowDimensions() {}

        /** @return {number} */

      }, {
        key: "getNumberOfItems",
        value: function getNumberOfItems() {}

        /**
         * @param {string} type
         * @param {function(!Event)} handler
         */

      }, {
        key: "registerInteractionHandler",
        value: function registerInteractionHandler(type, handler) {}

        /**
         * @param {string} type
         * @param {function(!Event)} handler
         */

      }, {
        key: "deregisterInteractionHandler",
        value: function deregisterInteractionHandler(type, handler) {}

        /** @param {function(!Event)} handler */

      }, {
        key: "registerBodyClickHandler",
        value: function registerBodyClickHandler(handler) {}

        /** @param {function(!Event)} handler */

      }, {
        key: "deregisterBodyClickHandler",
        value: function deregisterBodyClickHandler(handler) {}

        /**
         * @param {EventTarget} target
         * @return {number}
         */

      }, {
        key: "getIndexForEventTarget",
        value: function getIndexForEventTarget(target) {}

        /** @param {{index: number}} evtData */

      }, {
        key: "notifySelected",
        value: function notifySelected(evtData) {}
      }, {
        key: "notifyCancel",
        value: function notifyCancel() {}
      }, {
        key: "saveFocus",
        value: function saveFocus() {}
      }, {
        key: "restoreFocus",
        value: function restoreFocus() {}

        /** @return {boolean} */

      }, {
        key: "isFocused",
        value: function isFocused() {}
      }, {
        key: "focus",
        value: function focus() {}

        /** @return {number} */

      }, {
        key: "getFocusedItemIndex",
        value: function getFocusedItemIndex() /* number */{}

        /** @param {number} index */

      }, {
        key: "focusItemAtIndex",
        value: function focusItemAtIndex(index) {}

        /** @return {boolean} */

      }, {
        key: "isRtl",
        value: function isRtl() {}

        /** @param {string} origin */

      }, {
        key: "setTransformOrigin",
        value: function setTransformOrigin(origin) {}

        /** @param {{
        *   top: (string|undefined),
        *   right: (string|undefined),
        *   bottom: (string|undefined),
        *   left: (string|undefined)
        * }} position */

      }, {
        key: "setPosition",
        value: function setPosition(position) {}

        /** @param {string} height */

      }, {
        key: "setMaxHeight",
        value: function setMaxHeight(height) {}

        /**
         * @param {number} index
         * @param {string} attr
         * @param {string} value
         */

      }, {
        key: "setAttrForOptionAtIndex",
        value: function setAttrForOptionAtIndex(index, attr, value) {}

        /**
         * @param {number} index
         * @param {string} attr
         */

      }, {
        key: "rmAttrForOptionAtIndex",
        value: function rmAttrForOptionAtIndex(index, attr) {}

        /**
         * @param {number} index
         * @param {string} className
         */

      }, {
        key: "addClassForOptionAtIndex",
        value: function addClassForOptionAtIndex(index, className) {}

        /**
         * @param {number} index
         * @param {string} className
         */

      }, {
        key: "rmClassForOptionAtIndex",
        value: function rmClassForOptionAtIndex(index, className) {}
      }]);
      return MDCMenuAdapter;
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
      ROOT: 'mdc-menu',
      OPEN: 'mdc-menu--open',
      ANIMATING_OPEN: 'mdc-menu--animating-open',
      ANIMATING_CLOSED: 'mdc-menu--animating-closed',
      SELECTED_LIST_ITEM: 'mdc-list-item--selected'
    };

    /** @enum {string} */
    var strings = {
      ITEMS_SELECTOR: '.mdc-menu__items',
      SELECTED_EVENT: 'MDCMenu:selected',
      CANCEL_EVENT: 'MDCMenu:cancel',
      ARIA_DISABLED_ATTR: 'aria-disabled'
    };

    /** @enum {number} */
    var numbers = {
      // Amount of time to wait before triggering a selected event on the menu. Note that this time
      // will most likely be bumped up once interactive lists are supported to allow for the ripple to
      // animate before closing the menu
      SELECTED_TRIGGER_DELAY: 50,
      // Total duration of menu open animation.
      TRANSITION_OPEN_DURATION: 120,
      // Total duration of menu close animation.
      TRANSITION_CLOSE_DURATION: 75,
      // Margin left to the edge of the viewport when menu is at maximum possible height.
      MARGIN_TO_EDGE: 32,
      // Ratio of anchor width to menu width for switching from corner positioning to center positioning.
      ANCHOR_TO_MENU_WIDTH_RATIO: 0.67,
      // Ratio of vertical offset to menu height for switching from corner to mid-way origin positioning.
      OFFSET_TO_MENU_HEIGHT_RATIO: 0.1
    };

    /**
     * Enum for bits in the {@see Corner) bitmap.
     * @enum {number}
     */
    var CornerBit = {
      BOTTOM: 1,
      CENTER: 2,
      RIGHT: 4,
      FLIP_RTL: 8
    };

    /**
     * Enum for representing an element corner for positioning the menu.
     *
     * The START constants map to LEFT if element directionality is left
     * to right and RIGHT if the directionality is right to left.
     * Likewise END maps to RIGHT or LEFT depending on the directionality.
     *
     * @enum {number}
     */
    var Corner = {
      TOP_LEFT: 0,
      TOP_RIGHT: CornerBit.RIGHT,
      BOTTOM_LEFT: CornerBit.BOTTOM,
      BOTTOM_RIGHT: CornerBit.BOTTOM | CornerBit.RIGHT,
      TOP_START: CornerBit.FLIP_RTL,
      TOP_END: CornerBit.FLIP_RTL | CornerBit.RIGHT,
      BOTTOM_START: CornerBit.BOTTOM | CornerBit.FLIP_RTL,
      BOTTOM_END: CornerBit.BOTTOM | CornerBit.RIGHT | CornerBit.FLIP_RTL
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
     * @extends {MDCFoundation<!MDCMenuAdapter>}
     */

    var MDCMenuFoundation = function (_MDCFoundation) {
      inherits(MDCMenuFoundation, _MDCFoundation);
      createClass(MDCMenuFoundation, null, [{
        key: 'cssClasses',

        /** @return enum{cssClasses} */
        get: function get$$1() {
          return cssClasses;
        }

        /** @return enum{strings} */

      }, {
        key: 'strings',
        get: function get$$1() {
          return strings;
        }

        /** @return enum{numbers} */

      }, {
        key: 'numbers',
        get: function get$$1() {
          return numbers;
        }

        /** @return enum{number} */

      }, {
        key: 'Corner',
        get: function get$$1() {
          return Corner;
        }

        /**
         * {@see MDCMenuAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCMenuAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCMenuAdapter} */{
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              hasClass: function hasClass() {
                return false;
              },
              hasNecessaryDom: function hasNecessaryDom() {
                return false;
              },
              getAttributeForEventTarget: function getAttributeForEventTarget() {},
              getInnerDimensions: function getInnerDimensions() {
                return {};
              },
              hasAnchor: function hasAnchor() {
                return false;
              },
              getAnchorDimensions: function getAnchorDimensions() {
                return {};
              },
              getWindowDimensions: function getWindowDimensions() {
                return {};
              },
              getNumberOfItems: function getNumberOfItems() {
                return 0;
              },
              registerInteractionHandler: function registerInteractionHandler() {},
              deregisterInteractionHandler: function deregisterInteractionHandler() {},
              registerBodyClickHandler: function registerBodyClickHandler() {},
              deregisterBodyClickHandler: function deregisterBodyClickHandler() {},
              getIndexForEventTarget: function getIndexForEventTarget() {
                return 0;
              },
              notifySelected: function notifySelected() {},
              notifyCancel: function notifyCancel() {},
              saveFocus: function saveFocus() {},
              restoreFocus: function restoreFocus() {},
              isFocused: function isFocused() {
                return false;
              },
              focus: function focus() {},
              getFocusedItemIndex: function getFocusedItemIndex() {
                return -1;
              },
              focusItemAtIndex: function focusItemAtIndex() {},
              isRtl: function isRtl() {
                return false;
              },
              setTransformOrigin: function setTransformOrigin() {},
              setPosition: function setPosition() {},
              setMaxHeight: function setMaxHeight() {},
              setAttrForOptionAtIndex: function setAttrForOptionAtIndex() {},
              rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex() {},
              addClassForOptionAtIndex: function addClassForOptionAtIndex() {},
              rmClassForOptionAtIndex: function rmClassForOptionAtIndex() {}
            }
          );
        }

        /** @param {!MDCMenuAdapter} adapter */

      }]);

      function MDCMenuFoundation(adapter) {
        classCallCheck(this, MDCMenuFoundation);

        /** @private {function(!Event)} */
        var _this = possibleConstructorReturn(this, (MDCMenuFoundation.__proto__ || Object.getPrototypeOf(MDCMenuFoundation)).call(this, _extends(MDCMenuFoundation.defaultAdapter, adapter)));

        _this.clickHandler_ = function (evt) {
          return _this.handlePossibleSelected_(evt);
        };
        /** @private {function(!Event)} */
        _this.keydownHandler_ = function (evt) {
          return _this.handleKeyboardDown_(evt);
        };
        /** @private {function(!Event)} */
        _this.keyupHandler_ = function (evt) {
          return _this.handleKeyboardUp_(evt);
        };
        /** @private {function(!Event)} */
        _this.documentClickHandler_ = function (evt) {
          return _this.handleDocumentClick_(evt);
        };
        /** @private {boolean} */
        _this.isOpen_ = false;
        /** @private {number} */
        _this.openAnimationEndTimerId_ = 0;
        /** @private {number} */
        _this.closeAnimationEndTimerId_ = 0;
        /** @private {number} */
        _this.selectedTriggerTimerId_ = 0;
        /** @private {number} */
        _this.animationRequestId_ = 0;
        /** @private {!{ width: number, height: number }} */
        _this.dimensions_;
        /** @private {number} */
        _this.itemHeight_;
        /** @private {Corner} */
        _this.anchorCorner_ = Corner.TOP_START;
        /** @private {AnchorMargin} */
        _this.anchorMargin_ = { top: 0, right: 0, bottom: 0, left: 0 };
        /** @private {?AutoLayoutMeasurements} */
        _this.measures_ = null;
        /** @private {number} */
        _this.selectedIndex_ = -1;
        /** @private {boolean} */
        _this.rememberSelection_ = false;
        /** @private {boolean} */
        _this.quickOpen_ = false;

        // A keyup event on the menu needs to have a corresponding keydown
        // event on the menu. If the user opens the menu with a keydown event on a
        // button, the menu will only get the key up event causing buggy behavior with selected elements.
        /** @private {boolean} */
        _this.keyDownWithinMenu_ = false;
        return _this;
      }

      createClass(MDCMenuFoundation, [{
        key: 'init',
        value: function init() {
          var _MDCMenuFoundation$cs = MDCMenuFoundation.cssClasses,
              ROOT = _MDCMenuFoundation$cs.ROOT,
              OPEN = _MDCMenuFoundation$cs.OPEN;


          if (!this.adapter_.hasClass(ROOT)) {
            throw new Error(ROOT + ' class required in root element.');
          }

          if (!this.adapter_.hasNecessaryDom()) {
            throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
          }

          if (this.adapter_.hasClass(OPEN)) {
            this.isOpen_ = true;
          }

          this.adapter_.registerInteractionHandler('click', this.clickHandler_);
          this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
          this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          clearTimeout(this.selectedTriggerTimerId_);
          clearTimeout(this.openAnimationEndTimerId_);
          clearTimeout(this.closeAnimationEndTimerId_);
          // Cancel any currently running animations.
          cancelAnimationFrame(this.animationRequestId_);
          this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
          this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
          this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
          this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);
        }

        /**
         * @param {!Corner} corner Default anchor corner alignment of top-left menu corner.
         */

      }, {
        key: 'setAnchorCorner',
        value: function setAnchorCorner(corner) {
          this.anchorCorner_ = corner;
        }

        /**
         * @param {!AnchorMargin} margin 4-plet of margins from anchor.
         */

      }, {
        key: 'setAnchorMargin',
        value: function setAnchorMargin(margin) {
          this.anchorMargin_.top = typeof margin.top === 'number' ? margin.top : 0;
          this.anchorMargin_.right = typeof margin.right === 'number' ? margin.right : 0;
          this.anchorMargin_.bottom = typeof margin.bottom === 'number' ? margin.bottom : 0;
          this.anchorMargin_.left = typeof margin.left === 'number' ? margin.left : 0;
        }

        /** @param {boolean} rememberSelection */

      }, {
        key: 'setRememberSelection',
        value: function setRememberSelection(rememberSelection) {
          this.rememberSelection_ = rememberSelection;
          this.setSelectedIndex(-1);
        }

        /** @param {boolean} quickOpen */

      }, {
        key: 'setQuickOpen',
        value: function setQuickOpen(quickOpen) {
          this.quickOpen_ = quickOpen;
        }

        /**
         * @param {?number} focusIndex
         * @private
         */

      }, {
        key: 'focusOnOpen_',
        value: function focusOnOpen_(focusIndex) {
          if (focusIndex === null) {
            // If this instance of MDCMenu remembers selections, and the user has
            // made a selection, then focus the last selected item
            if (this.rememberSelection_ && this.selectedIndex_ >= 0) {
              this.adapter_.focusItemAtIndex(this.selectedIndex_);
              return;
            }

            this.adapter_.focus();
            // If that doesn't work, focus first item instead.
            if (!this.adapter_.isFocused()) {
              this.adapter_.focusItemAtIndex(0);
            }
          } else {
            this.adapter_.focusItemAtIndex(focusIndex);
          }
        }

        /**
         * Handle clicks and cancel the menu if not a child list-item
         * @param {!Event} evt
         * @private
         */

      }, {
        key: 'handleDocumentClick_',
        value: function handleDocumentClick_(evt) {
          var el = evt.target;

          while (el && el !== document.documentElement) {
            if (this.adapter_.getIndexForEventTarget(el) !== -1) {
              return;
            }
            el = el.parentNode;
          }

          this.adapter_.notifyCancel();
          this.close(evt);
        }
      }, {
        key: 'handleKeyboardDown_',


        /**
         * Handle keys that we want to repeat on hold (tab and arrows).
         * @param {!Event} evt
         * @return {boolean}
         * @private
         */
        value: function handleKeyboardDown_(evt) {
          // Do nothing if Alt, Ctrl or Meta are pressed.
          if (evt.altKey || evt.ctrlKey || evt.metaKey) {
            return true;
          }

          var keyCode = evt.keyCode,
              key = evt.key,
              shiftKey = evt.shiftKey;

          var isTab = key === 'Tab' || keyCode === 9;
          var isArrowUp = key === 'ArrowUp' || keyCode === 38;
          var isArrowDown = key === 'ArrowDown' || keyCode === 40;
          var isSpace = key === 'Space' || keyCode === 32;
          var isEnter = key === 'Enter' || keyCode === 13;
          // The menu needs to know if the keydown event was triggered on the menu
          this.keyDownWithinMenu_ = isEnter || isSpace;

          var focusedItemIndex = this.adapter_.getFocusedItemIndex();
          var lastItemIndex = this.adapter_.getNumberOfItems() - 1;

          if (shiftKey && isTab && focusedItemIndex === 0) {
            this.adapter_.focusItemAtIndex(lastItemIndex);
            evt.preventDefault();
            return false;
          }

          if (!shiftKey && isTab && focusedItemIndex === lastItemIndex) {
            this.adapter_.focusItemAtIndex(0);
            evt.preventDefault();
            return false;
          }

          // Ensure Arrow{Up,Down} and space do not cause inadvertent scrolling
          if (isArrowUp || isArrowDown || isSpace) {
            evt.preventDefault();
          }

          if (isArrowUp) {
            if (focusedItemIndex === 0 || this.adapter_.isFocused()) {
              this.adapter_.focusItemAtIndex(lastItemIndex);
            } else {
              this.adapter_.focusItemAtIndex(focusedItemIndex - 1);
            }
          } else if (isArrowDown) {
            if (focusedItemIndex === lastItemIndex || this.adapter_.isFocused()) {
              this.adapter_.focusItemAtIndex(0);
            } else {
              this.adapter_.focusItemAtIndex(focusedItemIndex + 1);
            }
          }

          return true;
        }

        /**
         * Handle keys that we don't want to repeat on hold (Enter, Space, Escape).
         * @param {!Event} evt
         * @return {boolean}
         * @private
         */

      }, {
        key: 'handleKeyboardUp_',
        value: function handleKeyboardUp_(evt) {
          // Do nothing if Alt, Ctrl or Meta are pressed.
          if (evt.altKey || evt.ctrlKey || evt.metaKey) {
            return true;
          }

          var keyCode = evt.keyCode,
              key = evt.key;

          var isEnter = key === 'Enter' || keyCode === 13;
          var isSpace = key === 'Space' || keyCode === 32;
          var isEscape = key === 'Escape' || keyCode === 27;

          if (isEnter || isSpace) {
            // If the keydown event didn't occur on the menu, then it should
            // disregard the possible selected event.
            if (this.keyDownWithinMenu_) {
              this.handlePossibleSelected_(evt);
            }
            this.keyDownWithinMenu_ = false;
          }

          if (isEscape) {
            this.adapter_.notifyCancel();
            this.close();
          }

          return true;
        }

        /**
         * @param {!Event} evt
         * @private
         */

      }, {
        key: 'handlePossibleSelected_',
        value: function handlePossibleSelected_(evt) {
          var _this2 = this;

          if (this.adapter_.getAttributeForEventTarget(evt.target, strings.ARIA_DISABLED_ATTR) === 'true') {
            return;
          }
          var targetIndex = this.adapter_.getIndexForEventTarget(evt.target);
          if (targetIndex < 0) {
            return;
          }
          // Debounce multiple selections
          if (this.selectedTriggerTimerId_) {
            return;
          }
          this.selectedTriggerTimerId_ = setTimeout(function () {
            _this2.selectedTriggerTimerId_ = 0;
            _this2.close();
            if (_this2.rememberSelection_) {
              _this2.setSelectedIndex(targetIndex);
            }
            _this2.adapter_.notifySelected({ index: targetIndex });
          }, numbers.SELECTED_TRIGGER_DELAY);
        }

        /**
         * @return {AutoLayoutMeasurements} Measurements used to position menu popup.
         */

      }, {
        key: 'getAutoLayoutMeasurements_',
        value: function getAutoLayoutMeasurements_() {
          var anchorRect = this.adapter_.getAnchorDimensions();
          var viewport = this.adapter_.getWindowDimensions();

          return {
            viewport: viewport,
            viewportDistance: {
              top: anchorRect.top,
              right: viewport.width - anchorRect.right,
              left: anchorRect.left,
              bottom: viewport.height - anchorRect.bottom
            },
            anchorHeight: anchorRect.height,
            anchorWidth: anchorRect.width,
            menuHeight: this.dimensions_.height,
            menuWidth: this.dimensions_.width
          };
        }

        /**
         * Computes the corner of the anchor from which to animate and position the menu.
         * @return {Corner}
         * @private
         */

      }, {
        key: 'getOriginCorner_',
        value: function getOriginCorner_() {
          // Defaults: open from the top left.
          var corner = Corner.TOP_LEFT;

          var _measures_ = this.measures_,
              viewportDistance = _measures_.viewportDistance,
              anchorHeight = _measures_.anchorHeight,
              anchorWidth = _measures_.anchorWidth,
              menuHeight = _measures_.menuHeight,
              menuWidth = _measures_.menuWidth;

          var isBottomAligned = Boolean(this.anchorCorner_ & CornerBit.BOTTOM);
          var availableTop = isBottomAligned ? viewportDistance.top + anchorHeight + this.anchorMargin_.bottom : viewportDistance.top + this.anchorMargin_.top;
          var availableBottom = isBottomAligned ? viewportDistance.bottom - this.anchorMargin_.bottom : viewportDistance.bottom + anchorHeight - this.anchorMargin_.top;

          var topOverflow = menuHeight - availableTop;
          var bottomOverflow = menuHeight - availableBottom;
          if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
            corner |= CornerBit.BOTTOM;
          }

          var isRtl = this.adapter_.isRtl();
          var isFlipRtl = Boolean(this.anchorCorner_ & CornerBit.FLIP_RTL);
          var avoidHorizontalOverlap = Boolean(this.anchorCorner_ & CornerBit.RIGHT);
          var isAlignedRight = avoidHorizontalOverlap && !isRtl || !avoidHorizontalOverlap && isFlipRtl && isRtl;
          var availableLeft = isAlignedRight ? viewportDistance.left + anchorWidth + this.anchorMargin_.right : viewportDistance.left + this.anchorMargin_.left;
          var availableRight = isAlignedRight ? viewportDistance.right - this.anchorMargin_.right : viewportDistance.right + anchorWidth - this.anchorMargin_.left;

          var leftOverflow = menuWidth - availableLeft;
          var rightOverflow = menuWidth - availableRight;

          if (leftOverflow < 0 && isAlignedRight && isRtl || avoidHorizontalOverlap && !isAlignedRight && leftOverflow < 0 || rightOverflow > 0 && leftOverflow < rightOverflow) {
            corner |= CornerBit.RIGHT;
          }

          return corner;
        }

        /**
         * @param {Corner} corner Origin corner of the menu.
         * @return {number} Horizontal offset of menu origin corner from corresponding anchor corner.
         * @private
         */

      }, {
        key: 'getHorizontalOriginOffset_',
        value: function getHorizontalOriginOffset_(corner) {
          var anchorWidth = this.measures_.anchorWidth;

          var isRightAligned = Boolean(corner & CornerBit.RIGHT);
          var avoidHorizontalOverlap = Boolean(this.anchorCorner_ & CornerBit.RIGHT);
          var x = 0;
          if (isRightAligned) {
            var rightOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.left : this.anchorMargin_.right;
            x = rightOffset;
          } else {
            var leftOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.right : this.anchorMargin_.left;
            x = leftOffset;
          }
          return x;
        }

        /**
         * @param {Corner} corner Origin corner of the menu.
         * @return {number} Vertical offset of menu origin corner from corresponding anchor corner.
         * @private
         */

      }, {
        key: 'getVerticalOriginOffset_',
        value: function getVerticalOriginOffset_(corner) {
          var _measures_2 = this.measures_,
              viewport = _measures_2.viewport,
              viewportDistance = _measures_2.viewportDistance,
              anchorHeight = _measures_2.anchorHeight,
              menuHeight = _measures_2.menuHeight;

          var isBottomAligned = Boolean(corner & CornerBit.BOTTOM);
          var MARGIN_TO_EDGE = MDCMenuFoundation.numbers.MARGIN_TO_EDGE;

          var avoidVerticalOverlap = Boolean(this.anchorCorner_ & CornerBit.BOTTOM);
          var canOverlapVertically = !avoidVerticalOverlap;
          var y = 0;

          if (isBottomAligned) {
            y = avoidVerticalOverlap ? anchorHeight - this.anchorMargin_.top : -this.anchorMargin_.bottom;
            // adjust for when menu can overlap anchor, but too tall to be aligned to bottom
            // anchor corner. Bottom margin is ignored in such cases.
            if (canOverlapVertically && menuHeight > viewportDistance.top + anchorHeight) {
              y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.top + anchorHeight));
            }
          } else {
            y = avoidVerticalOverlap ? anchorHeight + this.anchorMargin_.bottom : this.anchorMargin_.top;
            // adjust for when menu can overlap anchor, but too tall to be aligned to top
            // anchor corners. Top margin is ignored in that case.
            if (canOverlapVertically && menuHeight > viewportDistance.bottom + anchorHeight) {
              y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.bottom + anchorHeight));
            }
          }
          return y;
        }

        /**
         * @param {Corner} corner Origin corner of the menu.
         * @return {number} Maximum height of the menu, based on available space. 0 indicates should not be set.
         * @private
         */

      }, {
        key: 'getMenuMaxHeight_',
        value: function getMenuMaxHeight_(corner) {
          var maxHeight = 0;
          var viewportDistance = this.measures_.viewportDistance;

          var isBottomAligned = Boolean(corner & CornerBit.BOTTOM);

          // When maximum height is not specified, it is handled from css.
          if (this.anchorCorner_ & CornerBit.BOTTOM) {
            if (isBottomAligned) {
              maxHeight = viewportDistance.top + this.anchorMargin_.top;
            } else {
              maxHeight = viewportDistance.bottom - this.anchorMargin_.bottom;
            }
          }

          return maxHeight;
        }

        /** @private */

      }, {
        key: 'autoPosition_',
        value: function autoPosition_() {
          var _position;

          if (!this.adapter_.hasAnchor()) {
            return;
          }

          // Compute measurements for autoposition methods reuse.
          this.measures_ = this.getAutoLayoutMeasurements_();

          var corner = this.getOriginCorner_();
          var maxMenuHeight = this.getMenuMaxHeight_(corner);
          var verticalAlignment = corner & CornerBit.BOTTOM ? 'bottom' : 'top';
          var horizontalAlignment = corner & CornerBit.RIGHT ? 'right' : 'left';
          var horizontalOffset = this.getHorizontalOriginOffset_(corner);
          var verticalOffset = this.getVerticalOriginOffset_(corner);
          var position = (_position = {}, defineProperty(_position, horizontalAlignment, horizontalOffset ? horizontalOffset + 'px' : '0'), defineProperty(_position, verticalAlignment, verticalOffset ? verticalOffset + 'px' : '0'), _position);
          var _measures_3 = this.measures_,
              anchorWidth = _measures_3.anchorWidth,
              menuHeight = _measures_3.menuHeight,
              menuWidth = _measures_3.menuWidth;
          // Center align when anchor width is comparable or greater than menu, otherwise keep corner.

          if (anchorWidth / menuWidth > numbers.ANCHOR_TO_MENU_WIDTH_RATIO) {
            horizontalAlignment = 'center';
          }

          // Adjust vertical origin when menu is positioned with significant offset from anchor. This is done so that
          // scale animation is "anchored" on the anchor.
          if (!(this.anchorCorner_ & CornerBit.BOTTOM) && Math.abs(verticalOffset / menuHeight) > numbers.OFFSET_TO_MENU_HEIGHT_RATIO) {
            var verticalOffsetPercent = Math.abs(verticalOffset / menuHeight) * 100;
            var originPercent = corner & CornerBit.BOTTOM ? 100 - verticalOffsetPercent : verticalOffsetPercent;
            verticalAlignment = Math.round(originPercent * 100) / 100 + '%';
          }

          this.adapter_.setTransformOrigin(horizontalAlignment + ' ' + verticalAlignment);
          this.adapter_.setPosition(position);
          this.adapter_.setMaxHeight(maxMenuHeight ? maxMenuHeight + 'px' : '');

          // Clear measures after positioning is complete.
          this.measures_ = null;
        }

        /**
         * Open the menu.
         * @param {{focusIndex: ?number}=} options
         */

      }, {
        key: 'open',
        value: function open() {
          var _this3 = this;

          var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              _ref$focusIndex = _ref.focusIndex,
              focusIndex = _ref$focusIndex === undefined ? null : _ref$focusIndex;

          this.adapter_.saveFocus();

          if (!this.quickOpen_) {
            this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
          }

          this.animationRequestId_ = requestAnimationFrame(function () {
            _this3.dimensions_ = _this3.adapter_.getInnerDimensions();
            _this3.autoPosition_();
            _this3.adapter_.addClass(MDCMenuFoundation.cssClasses.OPEN);
            _this3.focusOnOpen_(focusIndex);
            _this3.adapter_.registerBodyClickHandler(_this3.documentClickHandler_);
            if (!_this3.quickOpen_) {
              _this3.openAnimationEndTimerId_ = setTimeout(function () {
                _this3.openAnimationEndTimerId_ = 0;
                _this3.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
              }, numbers.TRANSITION_OPEN_DURATION);
            }
          });
          this.isOpen_ = true;
        }

        /**
         * Closes the menu.
         * @param {Event=} evt
         */

      }, {
        key: 'close',
        value: function close() {
          var _this4 = this;

          var evt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var targetIsDisabled = evt ? this.adapter_.getAttributeForEventTarget(evt.target, strings.ARIA_DISABLED_ATTR) === 'true' : false;

          if (targetIsDisabled) {
            return;
          }

          this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);

          if (!this.quickOpen_) {
            this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
          }

          requestAnimationFrame(function () {
            _this4.adapter_.removeClass(MDCMenuFoundation.cssClasses.OPEN);
            if (!_this4.quickOpen_) {
              _this4.closeAnimationEndTimerId_ = setTimeout(function () {
                _this4.closeAnimationEndTimerId_ = 0;
                _this4.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
              }, numbers.TRANSITION_CLOSE_DURATION);
            }
          });
          this.isOpen_ = false;
          this.adapter_.restoreFocus();
        }

        /** @return {boolean} */

      }, {
        key: 'isOpen',
        value: function isOpen() {
          return this.isOpen_;
        }

        /** @return {number} */

      }, {
        key: 'getSelectedIndex',
        value: function getSelectedIndex() {
          return this.selectedIndex_;
        }

        /**
         * @param {number} index Index of the item to set as selected.
         */

      }, {
        key: 'setSelectedIndex',
        value: function setSelectedIndex(index) {
          if (index === this.selectedIndex_) {
            return;
          }

          var prevSelectedIndex = this.selectedIndex_;
          if (prevSelectedIndex >= 0) {
            this.adapter_.rmAttrForOptionAtIndex(prevSelectedIndex, 'aria-selected');
            this.adapter_.rmClassForOptionAtIndex(prevSelectedIndex, cssClasses.SELECTED_LIST_ITEM);
          }

          this.selectedIndex_ = index >= 0 && index < this.adapter_.getNumberOfItems() ? index : -1;
          if (this.selectedIndex_ >= 0) {
            this.adapter_.setAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected', 'true');
            this.adapter_.addClassForOptionAtIndex(this.selectedIndex_, cssClasses.SELECTED_LIST_ITEM);
          }
        }
      }]);
      return MDCMenuFoundation;
    }(MDCFoundation);

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

    /** @type {string|undefined} */
    var storedTransformPropertyName_ = void 0;

    /**
     * Returns the name of the correct transform property to use on the current browser.
     * @param {!Window} globalObj
     * @param {boolean=} forceRefresh
     * @return {string}
     */
    function getTransformPropertyName(globalObj) {
      var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (storedTransformPropertyName_ === undefined || forceRefresh) {
        var el = globalObj.document.createElement('div');
        var transformPropertyName = 'transform' in el.style ? 'transform' : 'webkitTransform';
        storedTransformPropertyName_ = transformPropertyName;
      }

      return storedTransformPropertyName_;
    }

    //

    var script = {
      name: 'mdc-menu',
      model: {
        prop: 'open',
        event: 'change'
      },
      props: {
        open: [Boolean, Object],
        'quick-open': Boolean,
        'anchor-corner': [String, Number],
        'anchor-margin': Object
      },
      data: function data() {
        return {
          classes: {},
          styles: {},
          items: []
        };
      },

      watch: {
        open: 'onOpen_',
        quickOpen: function quickOpen(nv) {
          this.foundation.setQuickOpen(nv);
        },
        anchorCorner: function anchorCorner(nv) {
          this.foundation.setAnchorCorner(Number(nv));
        },
        anchorMargin: function anchorMargin(nv) {
          this.foundation.setAnchorMargin(nv);
        }
      },
      mounted: function mounted() {
        var _this = this;

        var refreshItems = function refreshItems() {
          _this.items = [].slice.call(_this.$refs.items.querySelectorAll('.mdc-list-item[role]'));
          _this.$emit('update');
        };
        this.slotObserver = new MutationObserver(function () {
          return refreshItems();
        });
        this.slotObserver.observe(this.$el, {
          childList: true,
          subtree: true
        });

        this._previousFocus = undefined;

        this.foundation = new MDCMenuFoundation({
          addClass: function addClass(className) {
            return _this.$set(_this.classes, className, true);
          },
          removeClass: function removeClass(className) {
            return _this.$delete(_this.classes, className);
          },
          hasClass: function hasClass(className) {
            return _this.$refs.root.classList.contains(className);
          },
          hasNecessaryDom: function hasNecessaryDom() {
            return Boolean(_this.$refs.items);
          },
          getAttributeForEventTarget: function getAttributeForEventTarget(target, attributeName) {
            return target.getAttribute(attributeName);
          },
          getInnerDimensions: function getInnerDimensions() {
            return {
              width: _this.$refs.items.offsetWidth,
              height: _this.$refs.items.offsetHeight
            };
          },
          hasAnchor: function hasAnchor() {
            return _this.$refs.root.parentElement && _this.$refs.root.parentElement.classList.contains('mdc-menu-anchor');
          },
          getAnchorDimensions: function getAnchorDimensions() {
            return _this.$refs.root.parentElement.getBoundingClientRect();
          },
          getWindowDimensions: function getWindowDimensions() {
            return {
              width: window.innerWidth,
              height: window.innerHeight
            };
          },
          getNumberOfItems: function getNumberOfItems() {
            return _this.items.length;
          },
          registerInteractionHandler: function registerInteractionHandler(type, handler) {
            return _this.$refs.root.addEventListener(type, handler);
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
            return _this.$refs.root.removeEventListener(type, handler);
          },
          registerBodyClickHandler: function registerBodyClickHandler(handler) {
            return document.body.addEventListener('click', handler);
          },
          deregisterBodyClickHandler: function deregisterBodyClickHandler(handler) {
            return document.body.removeEventListener('click', handler);
          },
          getIndexForEventTarget: function getIndexForEventTarget(target) {
            return _this.items.indexOf(target);
          },
          notifySelected: function notifySelected(evtData) {
            var evt = {
              index: evtData.index,
              item: _this.items[evtData.index]
            };
            _this.$emit('change', false);
            _this.$emit('select', evt);
            emitCustomEvent(_this.$el, MDCMenuFoundation.strings.SELECTED_EVENT, evt);
          },
          notifyCancel: function notifyCancel() {
            _this.$emit('change', false);
            _this.$emit('cancel');
            emitCustomEvent(_this.$el, MDCMenuFoundation.strings.CANCEL_EVENT, {});
          },
          saveFocus: function saveFocus() {
            _this._previousFocus = document.activeElement;
          },
          restoreFocus: function restoreFocus() {
            if (_this._previousFocus) {
              _this._previousFocus.focus();
            }
          },
          isFocused: function isFocused() {
            return document.activeElement === _this.$refs.root;
          },
          focus: function focus() {
            return _this.$refs.root.focus();
          },
          getFocusedItemIndex: function getFocusedItemIndex() {
            return _this.items.indexOf(document.activeElement);
          },
          focusItemAtIndex: function focusItemAtIndex(index) {
            return _this.items[index].focus();
          },
          isRtl: function isRtl() {
            return getComputedStyle(_this.$refs.root).getPropertyValue('direction') === 'rtl';
          },
          setTransformOrigin: function setTransformOrigin(origin) {
            _this.$set(_this.styles, getTransformPropertyName(window) + '-origin', origin);
          },
          setPosition: function setPosition(position) {
            _this.$set(_this.styles, 'left', position.left);
            _this.$set(_this.styles, 'right', position.right);
            _this.$set(_this.styles, 'top', position.top);
            _this.$set(_this.styles, 'bottom', position.bottom);
          },
          setMaxHeight: function setMaxHeight(height) {
            _this.$set(_this.styles, 'max-height', height);
          },
          setAttrForOptionAtIndex: function setAttrForOptionAtIndex(index, attr, value) {
            _this.items[index].setAttribute(attr, value);
          },
          rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex(index, attr) {
            _this.items[index].removeAttribute(attr);
          },
          addClassForOptionAtIndex: function addClassForOptionAtIndex(index, className) {
            _this.items[index].classList.add(className);
          },
          rmClassForOptionAtIndex: function rmClassForOptionAtIndex(index, className) {
            _this.items[index].classList.remove(className);
          }
        });

        refreshItems();
        this.foundation.init();
        if (this.anchorCorner !== void 0) {
          this.foundation.setAnchorCorner(Number(this.anchorCorner));
        }
        if (this.anchorMargin !== void 0) {
          this.foundation.setAnchorMargin(this.anchorMargin);
        }
      },
      beforeDestroy: function beforeDestroy() {
        this._previousFocus = null;
        this.slotObserver.disconnect();
        this.foundation.destroy();
      },


      methods: {
        onOpen_: function onOpen_(value) {
          if (value) {
            this.foundation.open((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value : void 0);
          } else {
            this.foundation.close();
          }
        },
        show: function show(options) {
          this.foundation.open(options);
        },
        hide: function hide() {
          this.foundation.close();
        },
        isOpen: function isOpen() {
          return this.foundation ? this.foundation.isOpen() : false;
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
        staticClass: "mdc-menu mdc-simple-menu",
        class: _vm.classes,
        style: _vm.styles,
        attrs: { tabindex: "-1" }
      }, [_c("ul", {
        ref: "items",
        staticClass: "mdc-simple-menu__items mdc-list",
        attrs: { role: "menu", "aria-hidden": "true" }
      }, [_vm._t("default")], 2)]);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\menu\\mdc-menu.vue";

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

    var mdcMenu = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script$1 = {
      name: 'mdc-menu-item',
      props: {
        disabled: Boolean
      }
    };

    /* script */
    var __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$1 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("li", {
        staticClass: "mdc-menu-item mdc-list-item",
        attrs: {
          tabindex: _vm.disabled ? "-1" : "0",
          "aria-disabled": _vm.disabled,
          role: "menuitem"
        }
      }, [_vm._t("default")], 2);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\menu\\mdc-menu-item.vue";

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

    var mdcMenuItem = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

    //
    //
    //
    //
    //
    //

    var script$2 = {
      name: 'mdc-menu-divider'
    };

    /* script */
    var __vue_script__$2 = script$2;

    /* template */
    var __vue_render__$2 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("li", {
        staticClass: "mdc-menu-divider mdc-list-divider",
        attrs: { role: "separator" }
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\menu\\mdc-menu-divider.vue";

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

    var mdcMenuDivider = __vue_normalize__$2({ render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, __vue_create_injector__$2, undefined);

    //
    //
    //
    //
    //
    //

    var script$3 = {
      name: 'mdc-menu-anchor'
    };

    /* script */
    var __vue_script__$3 = script$3;

    /* template */
    var __vue_render__$3 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "mdc-menu-anchor" }, [_vm._t("default")], 2);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\menu\\mdc-menu-anchor.vue";

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

    var mdcMenuAnchor = __vue_normalize__$3({ render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, __vue_create_injector__$3, undefined);

    var plugin = BasePlugin({
      mdcMenu: mdcMenu,
      mdcMenuItem: mdcMenuItem,
      mdcMenuDivider: mdcMenuDivider,
      mdcMenuAnchor: mdcMenuAnchor
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvdW5pcXVlaWQtbWl4aW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbWVudS9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9tZW51L2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbWVudS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9tZW51L3V0aWwuanMiLCIuLi8uLi9jb21wb25lbnRzL21lbnUvbWRjLW1lbnUudnVlIiwiLi4vLi4vY29tcG9uZW50cy9tZW51L21kYy1tZW51LWl0ZW0udnVlIiwiLi4vLi4vY29tcG9uZW50cy9tZW51L21kYy1tZW51LWRpdmlkZXIudnVlIiwiLi4vLi4vY29tcG9uZW50cy9tZW51L21kYy1tZW51LWFuY2hvci52dWUiLCIuLi8uLi9jb21wb25lbnRzL21lbnUvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL21lbnUvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0KHBsdWdpbikge1xyXG4gIC8vIEF1dG8taW5zdGFsbFxyXG4gIGxldCBfVnVlID0gbnVsbFxyXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xyXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcclxuICB9XHJcbiAgaWYgKF9WdWUpIHtcclxuICAgIF9WdWUudXNlKHBsdWdpbilcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4oY29tcG9uZW50cykge1xyXG4gIHJldHVybiB7XHJcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxyXG4gICAgaW5zdGFsbDogdm0gPT4ge1xyXG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xyXG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cclxuICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudClcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudHNcclxuICB9XHJcbn1cclxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50KGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xyXG4gIGxldCBldnRcclxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xyXG4gICAgICBkZXRhaWw6IGV2dERhdGEsXHJcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxyXG4gICAgfSlcclxuICB9IGVsc2Uge1xyXG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcclxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcclxuICB9XHJcbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXHJcbn1cclxuIiwiY29uc3Qgc2NvcGUgPVxyXG4gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoMHgxMDAwMDAwMCkpLnRvU3RyaW5nKCkgKyAnLSdcclxuXHJcbmV4cG9ydCBjb25zdCBWTUFVbmlxdWVJZE1peGluID0ge1xyXG4gIGJlZm9yZUNyZWF0ZSgpIHtcclxuICAgIHRoaXMudm1hX3VpZF8gPSBzY29wZSArIHRoaXMuX3VpZFxyXG4gIH1cclxufVxyXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBNZW51LiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGNsYXNzZXNcbiAqIC0gZG9tXG4gKiAtIGZvY3VzXG4gKiAtIHBvc2l0aW9uXG4gKiAtIGRpbWVuc2lvbnNcbiAqIC0gZXZlbnQgaGFuZGxlcnNcbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ01lbnVBZGFwdGVyIHtcbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBoYXNOZWNlc3NhcnlEb20oKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZU5hbWVcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0QXR0cmlidXRlRm9yRXZlbnRUYXJnZXQodGFyZ2V0LCBhdHRyaWJ1dGVOYW1lKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7IHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyIH19ICovXG4gIGdldElubmVyRGltZW5zaW9ucygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGhhc0FuY2hvcigpIHt9XG5cbiAgLyoqIEByZXR1cm4ge3t3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9fSAqL1xuICBnZXRBbmNob3JEaW1lbnNpb25zKCkge31cblxuICAvKiogQHJldHVybiB7eyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9fSAqL1xuICBnZXRXaW5kb3dEaW1lbnNpb25zKCkge31cblxuICAvKiogQHJldHVybiB7bnVtYmVyfSAqL1xuICBnZXROdW1iZXJPZkl0ZW1zKCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCl9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKiogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpfSBoYW5kbGVyICovXG4gIHJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCl9IGhhbmRsZXIgKi9cbiAgZGVyZWdpc3RlckJvZHlDbGlja0hhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0XG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldEluZGV4Rm9yRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKiBAcGFyYW0ge3tpbmRleDogbnVtYmVyfX0gZXZ0RGF0YSAqL1xuICBub3RpZnlTZWxlY3RlZChldnREYXRhKSB7fVxuXG4gIG5vdGlmeUNhbmNlbCgpIHt9XG5cbiAgc2F2ZUZvY3VzKCkge31cblxuICByZXN0b3JlRm9jdXMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc0ZvY3VzZWQoKSB7fVxuXG4gIGZvY3VzKCkge31cblxuICAvKiogQHJldHVybiB7bnVtYmVyfSAqL1xuICBnZXRGb2N1c2VkSXRlbUluZGV4KCkgLyogbnVtYmVyICovIHt9XG5cbiAgLyoqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAqL1xuICBmb2N1c0l0ZW1BdEluZGV4KGluZGV4KSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1J0bCgpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBvcmlnaW4gKi9cbiAgc2V0VHJhbnNmb3JtT3JpZ2luKG9yaWdpbikge31cblxuICAvKiogQHBhcmFtIHt7XG4gICogICB0b3A6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAgKiAgIHJpZ2h0OiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gICogICBib3R0b206IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAgKiAgIGxlZnQ6IChzdHJpbmd8dW5kZWZpbmVkKVxuICAqIH19IHBvc2l0aW9uICovXG4gIHNldFBvc2l0aW9uKHBvc2l0aW9uKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gaGVpZ2h0ICovXG4gIHNldE1heEhlaWdodChoZWlnaHQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0clxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldEF0dHJGb3JPcHRpb25BdEluZGV4KGluZGV4LCBhdHRyLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyXG4gICAqL1xuICBybUF0dHJGb3JPcHRpb25BdEluZGV4KGluZGV4LCBhdHRyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3NGb3JPcHRpb25BdEluZGV4KGluZGV4LCBjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBybUNsYXNzRm9yT3B0aW9uQXRJbmRleChpbmRleCwgY2xhc3NOYW1lKSB7fVxufVxuXG5leHBvcnQge01EQ01lbnVBZGFwdGVyfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFJPT1Q6ICdtZGMtbWVudScsXG4gIE9QRU46ICdtZGMtbWVudS0tb3BlbicsXG4gIEFOSU1BVElOR19PUEVOOiAnbWRjLW1lbnUtLWFuaW1hdGluZy1vcGVuJyxcbiAgQU5JTUFUSU5HX0NMT1NFRDogJ21kYy1tZW51LS1hbmltYXRpbmctY2xvc2VkJyxcbiAgU0VMRUNURURfTElTVF9JVEVNOiAnbWRjLWxpc3QtaXRlbS0tc2VsZWN0ZWQnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBJVEVNU19TRUxFQ1RPUjogJy5tZGMtbWVudV9faXRlbXMnLFxuICBTRUxFQ1RFRF9FVkVOVDogJ01EQ01lbnU6c2VsZWN0ZWQnLFxuICBDQU5DRUxfRVZFTlQ6ICdNRENNZW51OmNhbmNlbCcsXG4gIEFSSUFfRElTQUJMRURfQVRUUjogJ2FyaWEtZGlzYWJsZWQnLFxufTtcblxuLyoqIEBlbnVtIHtudW1iZXJ9ICovXG5jb25zdCBudW1iZXJzID0ge1xuICAvLyBBbW91bnQgb2YgdGltZSB0byB3YWl0IGJlZm9yZSB0cmlnZ2VyaW5nIGEgc2VsZWN0ZWQgZXZlbnQgb24gdGhlIG1lbnUuIE5vdGUgdGhhdCB0aGlzIHRpbWVcbiAgLy8gd2lsbCBtb3N0IGxpa2VseSBiZSBidW1wZWQgdXAgb25jZSBpbnRlcmFjdGl2ZSBsaXN0cyBhcmUgc3VwcG9ydGVkIHRvIGFsbG93IGZvciB0aGUgcmlwcGxlIHRvXG4gIC8vIGFuaW1hdGUgYmVmb3JlIGNsb3NpbmcgdGhlIG1lbnVcbiAgU0VMRUNURURfVFJJR0dFUl9ERUxBWTogNTAsXG4gIC8vIFRvdGFsIGR1cmF0aW9uIG9mIG1lbnUgb3BlbiBhbmltYXRpb24uXG4gIFRSQU5TSVRJT05fT1BFTl9EVVJBVElPTjogMTIwLFxuICAvLyBUb3RhbCBkdXJhdGlvbiBvZiBtZW51IGNsb3NlIGFuaW1hdGlvbi5cbiAgVFJBTlNJVElPTl9DTE9TRV9EVVJBVElPTjogNzUsXG4gIC8vIE1hcmdpbiBsZWZ0IHRvIHRoZSBlZGdlIG9mIHRoZSB2aWV3cG9ydCB3aGVuIG1lbnUgaXMgYXQgbWF4aW11bSBwb3NzaWJsZSBoZWlnaHQuXG4gIE1BUkdJTl9UT19FREdFOiAzMixcbiAgLy8gUmF0aW8gb2YgYW5jaG9yIHdpZHRoIHRvIG1lbnUgd2lkdGggZm9yIHN3aXRjaGluZyBmcm9tIGNvcm5lciBwb3NpdGlvbmluZyB0byBjZW50ZXIgcG9zaXRpb25pbmcuXG4gIEFOQ0hPUl9UT19NRU5VX1dJRFRIX1JBVElPOiAwLjY3LFxuICAvLyBSYXRpbyBvZiB2ZXJ0aWNhbCBvZmZzZXQgdG8gbWVudSBoZWlnaHQgZm9yIHN3aXRjaGluZyBmcm9tIGNvcm5lciB0byBtaWQtd2F5IG9yaWdpbiBwb3NpdGlvbmluZy5cbiAgT0ZGU0VUX1RPX01FTlVfSEVJR0hUX1JBVElPOiAwLjEsXG59O1xuXG4vKipcbiAqIEVudW0gZm9yIGJpdHMgaW4gdGhlIHtAc2VlIENvcm5lcikgYml0bWFwLlxuICogQGVudW0ge251bWJlcn1cbiAqL1xuY29uc3QgQ29ybmVyQml0ID0ge1xuICBCT1RUT006IDEsXG4gIENFTlRFUjogMixcbiAgUklHSFQ6IDQsXG4gIEZMSVBfUlRMOiA4LFxufTtcblxuLyoqXG4gKiBFbnVtIGZvciByZXByZXNlbnRpbmcgYW4gZWxlbWVudCBjb3JuZXIgZm9yIHBvc2l0aW9uaW5nIHRoZSBtZW51LlxuICpcbiAqIFRoZSBTVEFSVCBjb25zdGFudHMgbWFwIHRvIExFRlQgaWYgZWxlbWVudCBkaXJlY3Rpb25hbGl0eSBpcyBsZWZ0XG4gKiB0byByaWdodCBhbmQgUklHSFQgaWYgdGhlIGRpcmVjdGlvbmFsaXR5IGlzIHJpZ2h0IHRvIGxlZnQuXG4gKiBMaWtld2lzZSBFTkQgbWFwcyB0byBSSUdIVCBvciBMRUZUIGRlcGVuZGluZyBvbiB0aGUgZGlyZWN0aW9uYWxpdHkuXG4gKlxuICogQGVudW0ge251bWJlcn1cbiAqL1xuY29uc3QgQ29ybmVyID0ge1xuICBUT1BfTEVGVDogMCxcbiAgVE9QX1JJR0hUOiBDb3JuZXJCaXQuUklHSFQsXG4gIEJPVFRPTV9MRUZUOiBDb3JuZXJCaXQuQk9UVE9NLFxuICBCT1RUT01fUklHSFQ6IENvcm5lckJpdC5CT1RUT00gfCBDb3JuZXJCaXQuUklHSFQsXG4gIFRPUF9TVEFSVDogQ29ybmVyQml0LkZMSVBfUlRMLFxuICBUT1BfRU5EOiBDb3JuZXJCaXQuRkxJUF9SVEwgfCBDb3JuZXJCaXQuUklHSFQsXG4gIEJPVFRPTV9TVEFSVDogQ29ybmVyQml0LkJPVFRPTSB8IENvcm5lckJpdC5GTElQX1JUTCxcbiAgQk9UVE9NX0VORDogQ29ybmVyQml0LkJPVFRPTSB8IENvcm5lckJpdC5SSUdIVCB8IENvcm5lckJpdC5GTElQX1JUTCxcbn07XG5cblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzLCBDb3JuZXJCaXQsIENvcm5lcn07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB0b3A6IG51bWJlcixcbiAqICAgcmlnaHQ6IG51bWJlcixcbiAqICAgYm90dG9tOiBudW1iZXIsXG4gKiAgIGxlZnQ6IG51bWJlclxuICogfX1cbiAqL1xubGV0IEFuY2hvck1hcmdpbjtcblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgdmlld3BvcnQ6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfSxcbiAqICAgdmlld3BvcnREaXN0YW5jZToge3RvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlciwgbGVmdDogbnVtYmVyfSxcbiAqICAgYW5jaG9ySGVpZ2h0OiBudW1iZXIsXG4gKiAgIGFuY2hvcldpZHRoOiBudW1iZXIsXG4gKiAgIG1lbnVIZWlnaHQ6IG51bWJlcixcbiAqICAgbWVudVdpZHRoOiBudW1iZXIsXG4gKiB9fVxuICovXG5sZXQgQXV0b0xheW91dE1lYXN1cmVtZW50cztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQge01EQ01lbnVBZGFwdGVyfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzLCBDb3JuZXIsIENvcm5lckJpdH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENNZW51QWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ01lbnVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyfSAqL1xuICBzdGF0aWMgZ2V0IENvcm5lcigpIHtcbiAgICByZXR1cm4gQ29ybmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ01lbnVBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ01lbnVBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDTWVudUFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKCkgPT4ge30sXG4gICAgICBoYXNDbGFzczogKCkgPT4gZmFsc2UsXG4gICAgICBoYXNOZWNlc3NhcnlEb206ICgpID0+IGZhbHNlLFxuICAgICAgZ2V0QXR0cmlidXRlRm9yRXZlbnRUYXJnZXQ6ICgpID0+IHt9LFxuICAgICAgZ2V0SW5uZXJEaW1lbnNpb25zOiAoKSA9PiAoe30pLFxuICAgICAgaGFzQW5jaG9yOiAoKSA9PiBmYWxzZSxcbiAgICAgIGdldEFuY2hvckRpbWVuc2lvbnM6ICgpID0+ICh7fSksXG4gICAgICBnZXRXaW5kb3dEaW1lbnNpb25zOiAoKSA9PiAoe30pLFxuICAgICAgZ2V0TnVtYmVyT2ZJdGVtczogKCkgPT4gMCxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJCb2R5Q2xpY2tIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJCb2R5Q2xpY2tIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGdldEluZGV4Rm9yRXZlbnRUYXJnZXQ6ICgpID0+IDAsXG4gICAgICBub3RpZnlTZWxlY3RlZDogKCkgPT4ge30sXG4gICAgICBub3RpZnlDYW5jZWw6ICgpID0+IHt9LFxuICAgICAgc2F2ZUZvY3VzOiAoKSA9PiB7fSxcbiAgICAgIHJlc3RvcmVGb2N1czogKCkgPT4ge30sXG4gICAgICBpc0ZvY3VzZWQ6ICgpID0+IGZhbHNlLFxuICAgICAgZm9jdXM6ICgpID0+IHt9LFxuICAgICAgZ2V0Rm9jdXNlZEl0ZW1JbmRleDogKCkgPT4gLTEsXG4gICAgICBmb2N1c0l0ZW1BdEluZGV4OiAoKSA9PiB7fSxcbiAgICAgIGlzUnRsOiAoKSA9PiBmYWxzZSxcbiAgICAgIHNldFRyYW5zZm9ybU9yaWdpbjogKCkgPT4ge30sXG4gICAgICBzZXRQb3NpdGlvbjogKCkgPT4ge30sXG4gICAgICBzZXRNYXhIZWlnaHQ6ICgpID0+IHt9LFxuICAgICAgc2V0QXR0ckZvck9wdGlvbkF0SW5kZXg6ICgpID0+IHt9LFxuICAgICAgcm1BdHRyRm9yT3B0aW9uQXRJbmRleDogKCkgPT4ge30sXG4gICAgICBhZGRDbGFzc0Zvck9wdGlvbkF0SW5kZXg6ICgpID0+IHt9LFxuICAgICAgcm1DbGFzc0Zvck9wdGlvbkF0SW5kZXg6ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7IU1EQ01lbnVBZGFwdGVyfSBhZGFwdGVyICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ01lbnVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5jbGlja0hhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVQb3NzaWJsZVNlbGVjdGVkXyhldnQpO1xuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmtleWRvd25IYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlS2V5Ym9hcmREb3duXyhldnQpO1xuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmtleXVwSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZUtleWJvYXJkVXBfKGV2dCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuZG9jdW1lbnRDbGlja0hhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVEb2N1bWVudENsaWNrXyhldnQpO1xuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmlzT3Blbl8gPSBmYWxzZTtcbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLm9wZW5BbmltYXRpb25FbmRUaW1lcklkXyA9IDA7XG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5jbG9zZUFuaW1hdGlvbkVuZFRpbWVySWRfID0gMDtcbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLnNlbGVjdGVkVHJpZ2dlclRpbWVySWRfID0gMDtcbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFuaW1hdGlvblJlcXVlc3RJZF8gPSAwO1xuICAgIC8qKiBAcHJpdmF0ZSB7IXsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfX0gKi9cbiAgICB0aGlzLmRpbWVuc2lvbnNfO1xuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaXRlbUhlaWdodF87XG4gICAgLyoqIEBwcml2YXRlIHtDb3JuZXJ9ICovXG4gICAgdGhpcy5hbmNob3JDb3JuZXJfID0gQ29ybmVyLlRPUF9TVEFSVDtcbiAgICAvKiogQHByaXZhdGUge0FuY2hvck1hcmdpbn0gKi9cbiAgICB0aGlzLmFuY2hvck1hcmdpbl8gPSB7dG9wOiAwLCByaWdodDogMCwgYm90dG9tOiAwLCBsZWZ0OiAwfTtcbiAgICAvKiogQHByaXZhdGUgez9BdXRvTGF5b3V0TWVhc3VyZW1lbnRzfSAqL1xuICAgIHRoaXMubWVhc3VyZXNfID0gbnVsbDtcbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLnNlbGVjdGVkSW5kZXhfID0gLTE7XG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMucmVtZW1iZXJTZWxlY3Rpb25fID0gZmFsc2U7XG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMucXVpY2tPcGVuXyA9IGZhbHNlO1xuXG4gICAgLy8gQSBrZXl1cCBldmVudCBvbiB0aGUgbWVudSBuZWVkcyB0byBoYXZlIGEgY29ycmVzcG9uZGluZyBrZXlkb3duXG4gICAgLy8gZXZlbnQgb24gdGhlIG1lbnUuIElmIHRoZSB1c2VyIG9wZW5zIHRoZSBtZW51IHdpdGggYSBrZXlkb3duIGV2ZW50IG9uIGFcbiAgICAvLyBidXR0b24sIHRoZSBtZW51IHdpbGwgb25seSBnZXQgdGhlIGtleSB1cCBldmVudCBjYXVzaW5nIGJ1Z2d5IGJlaGF2aW9yIHdpdGggc2VsZWN0ZWQgZWxlbWVudHMuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMua2V5RG93bldpdGhpbk1lbnVfID0gZmFsc2U7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnN0IHtST09ULCBPUEVOfSA9IE1EQ01lbnVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoUk9PVCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtST09UfSBjbGFzcyByZXF1aXJlZCBpbiByb290IGVsZW1lbnQuYCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmhhc05lY2Vzc2FyeURvbSgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlcXVpcmVkIERPTSBub2RlcyBtaXNzaW5nIGluICR7Uk9PVH0gY29tcG9uZW50LmApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKE9QRU4pKSB7XG4gICAgICB0aGlzLmlzT3Blbl8gPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMua2V5dXBIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkhhbmRsZXJfKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuc2VsZWN0ZWRUcmlnZ2VyVGltZXJJZF8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLm9wZW5BbmltYXRpb25FbmRUaW1lcklkXyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuY2xvc2VBbmltYXRpb25FbmRUaW1lcklkXyk7XG4gICAgLy8gQ2FuY2VsIGFueSBjdXJyZW50bHkgcnVubmluZyBhbmltYXRpb25zLlxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uUmVxdWVzdElkXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMua2V5dXBIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXlkb3duJywgdGhpcy5rZXlkb3duSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckJvZHlDbGlja0hhbmRsZXIodGhpcy5kb2N1bWVudENsaWNrSGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUNvcm5lcn0gY29ybmVyIERlZmF1bHQgYW5jaG9yIGNvcm5lciBhbGlnbm1lbnQgb2YgdG9wLWxlZnQgbWVudSBjb3JuZXIuXG4gICAqL1xuICBzZXRBbmNob3JDb3JuZXIoY29ybmVyKSB7XG4gICAgdGhpcy5hbmNob3JDb3JuZXJfID0gY29ybmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUFuY2hvck1hcmdpbn0gbWFyZ2luIDQtcGxldCBvZiBtYXJnaW5zIGZyb20gYW5jaG9yLlxuICAgKi9cbiAgc2V0QW5jaG9yTWFyZ2luKG1hcmdpbikge1xuICAgIHRoaXMuYW5jaG9yTWFyZ2luXy50b3AgPSB0eXBlb2YgbWFyZ2luLnRvcCA9PT0gJ251bWJlcicgPyBtYXJnaW4udG9wIDogMDtcbiAgICB0aGlzLmFuY2hvck1hcmdpbl8ucmlnaHQgPSB0eXBlb2YgbWFyZ2luLnJpZ2h0ID09PSAnbnVtYmVyJyA/IG1hcmdpbi5yaWdodCA6IDA7XG4gICAgdGhpcy5hbmNob3JNYXJnaW5fLmJvdHRvbSA9IHR5cGVvZiBtYXJnaW4uYm90dG9tID09PSAnbnVtYmVyJyA/IG1hcmdpbi5ib3R0b20gOiAwO1xuICAgIHRoaXMuYW5jaG9yTWFyZ2luXy5sZWZ0ID0gdHlwZW9mIG1hcmdpbi5sZWZ0ID09PSAnbnVtYmVyJyA/IG1hcmdpbi5sZWZ0IDogMDtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHJlbWVtYmVyU2VsZWN0aW9uICovXG4gIHNldFJlbWVtYmVyU2VsZWN0aW9uKHJlbWVtYmVyU2VsZWN0aW9uKSB7XG4gICAgdGhpcy5yZW1lbWJlclNlbGVjdGlvbl8gPSByZW1lbWJlclNlbGVjdGlvbjtcbiAgICB0aGlzLnNldFNlbGVjdGVkSW5kZXgoLTEpO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gcXVpY2tPcGVuICovXG4gIHNldFF1aWNrT3BlbihxdWlja09wZW4pIHtcbiAgICB0aGlzLnF1aWNrT3Blbl8gPSBxdWlja09wZW47XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/bnVtYmVyfSBmb2N1c0luZGV4XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmb2N1c09uT3Blbl8oZm9jdXNJbmRleCkge1xuICAgIGlmIChmb2N1c0luZGV4ID09PSBudWxsKSB7XG4gICAgICAvLyBJZiB0aGlzIGluc3RhbmNlIG9mIE1EQ01lbnUgcmVtZW1iZXJzIHNlbGVjdGlvbnMsIGFuZCB0aGUgdXNlciBoYXNcbiAgICAgIC8vIG1hZGUgYSBzZWxlY3Rpb24sIHRoZW4gZm9jdXMgdGhlIGxhc3Qgc2VsZWN0ZWQgaXRlbVxuICAgICAgaWYgKHRoaXMucmVtZW1iZXJTZWxlY3Rpb25fICYmIHRoaXMuc2VsZWN0ZWRJbmRleF8gPj0gMCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4Xyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1cygpO1xuICAgICAgLy8gSWYgdGhhdCBkb2Vzbid0IHdvcmssIGZvY3VzIGZpcnN0IGl0ZW0gaW5zdGVhZC5cbiAgICAgIGlmICghdGhpcy5hZGFwdGVyXy5pc0ZvY3VzZWQoKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgoMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleChmb2N1c0luZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGNsaWNrcyBhbmQgY2FuY2VsIHRoZSBtZW51IGlmIG5vdCBhIGNoaWxkIGxpc3QtaXRlbVxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVEb2N1bWVudENsaWNrXyhldnQpIHtcbiAgICBsZXQgZWwgPSBldnQudGFyZ2V0O1xuXG4gICAgd2hpbGUgKGVsICYmIGVsICE9PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmdldEluZGV4Rm9yRXZlbnRUYXJnZXQoZWwpICE9PSAtMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlDYW5jZWwoKTtcbiAgICB0aGlzLmNsb3NlKGV2dCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBrZXlzIHRoYXQgd2Ugd2FudCB0byByZXBlYXQgb24gaG9sZCAodGFiIGFuZCBhcnJvd3MpLlxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVLZXlib2FyZERvd25fKGV2dCkge1xuICAgIC8vIERvIG5vdGhpbmcgaWYgQWx0LCBDdHJsIG9yIE1ldGEgYXJlIHByZXNzZWQuXG4gICAgaWYgKGV2dC5hbHRLZXkgfHwgZXZ0LmN0cmxLZXkgfHwgZXZ0Lm1ldGFLZXkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHtrZXlDb2RlLCBrZXksIHNoaWZ0S2V5fSA9IGV2dDtcbiAgICBjb25zdCBpc1RhYiA9IGtleSA9PT0gJ1RhYicgfHwga2V5Q29kZSA9PT0gOTtcbiAgICBjb25zdCBpc0Fycm93VXAgPSBrZXkgPT09ICdBcnJvd1VwJyB8fCBrZXlDb2RlID09PSAzODtcbiAgICBjb25zdCBpc0Fycm93RG93biA9IGtleSA9PT0gJ0Fycm93RG93bicgfHwga2V5Q29kZSA9PT0gNDA7XG4gICAgY29uc3QgaXNTcGFjZSA9IGtleSA9PT0gJ1NwYWNlJyB8fCBrZXlDb2RlID09PSAzMjtcbiAgICBjb25zdCBpc0VudGVyID0ga2V5ID09PSAnRW50ZXInIHx8IGtleUNvZGUgPT09IDEzO1xuICAgIC8vIFRoZSBtZW51IG5lZWRzIHRvIGtub3cgaWYgdGhlIGtleWRvd24gZXZlbnQgd2FzIHRyaWdnZXJlZCBvbiB0aGUgbWVudVxuICAgIHRoaXMua2V5RG93bldpdGhpbk1lbnVfID0gaXNFbnRlciB8fCBpc1NwYWNlO1xuXG4gICAgY29uc3QgZm9jdXNlZEl0ZW1JbmRleCA9IHRoaXMuYWRhcHRlcl8uZ2V0Rm9jdXNlZEl0ZW1JbmRleCgpO1xuICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggPSB0aGlzLmFkYXB0ZXJfLmdldE51bWJlck9mSXRlbXMoKSAtIDE7XG5cbiAgICBpZiAoc2hpZnRLZXkgJiYgaXNUYWIgJiYgZm9jdXNlZEl0ZW1JbmRleCA9PT0gMCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KGxhc3RJdGVtSW5kZXgpO1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFzaGlmdEtleSAmJiBpc1RhYiAmJiBmb2N1c2VkSXRlbUluZGV4ID09PSBsYXN0SXRlbUluZGV4KSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgoMCk7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgQXJyb3d7VXAsRG93bn0gYW5kIHNwYWNlIGRvIG5vdCBjYXVzZSBpbmFkdmVydGVudCBzY3JvbGxpbmdcbiAgICBpZiAoaXNBcnJvd1VwIHx8IGlzQXJyb3dEb3duIHx8IGlzU3BhY2UpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGlmIChpc0Fycm93VXApIHtcbiAgICAgIGlmIChmb2N1c2VkSXRlbUluZGV4ID09PSAwIHx8IHRoaXMuYWRhcHRlcl8uaXNGb2N1c2VkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KGxhc3RJdGVtSW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KGZvY3VzZWRJdGVtSW5kZXggLSAxKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzQXJyb3dEb3duKSB7XG4gICAgICBpZiAoZm9jdXNlZEl0ZW1JbmRleCA9PT0gbGFzdEl0ZW1JbmRleCB8fCB0aGlzLmFkYXB0ZXJfLmlzRm9jdXNlZCgpKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleCgwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleChmb2N1c2VkSXRlbUluZGV4ICsgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGtleXMgdGhhdCB3ZSBkb24ndCB3YW50IHRvIHJlcGVhdCBvbiBob2xkIChFbnRlciwgU3BhY2UsIEVzY2FwZSkuXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZUtleWJvYXJkVXBfKGV2dCkge1xuICAgIC8vIERvIG5vdGhpbmcgaWYgQWx0LCBDdHJsIG9yIE1ldGEgYXJlIHByZXNzZWQuXG4gICAgaWYgKGV2dC5hbHRLZXkgfHwgZXZ0LmN0cmxLZXkgfHwgZXZ0Lm1ldGFLZXkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHtrZXlDb2RlLCBrZXl9ID0gZXZ0O1xuICAgIGNvbnN0IGlzRW50ZXIgPSBrZXkgPT09ICdFbnRlcicgfHwga2V5Q29kZSA9PT0gMTM7XG4gICAgY29uc3QgaXNTcGFjZSA9IGtleSA9PT0gJ1NwYWNlJyB8fCBrZXlDb2RlID09PSAzMjtcbiAgICBjb25zdCBpc0VzY2FwZSA9IGtleSA9PT0gJ0VzY2FwZScgfHwga2V5Q29kZSA9PT0gMjc7XG5cbiAgICBpZiAoaXNFbnRlciB8fCBpc1NwYWNlKSB7XG4gICAgICAvLyBJZiB0aGUga2V5ZG93biBldmVudCBkaWRuJ3Qgb2NjdXIgb24gdGhlIG1lbnUsIHRoZW4gaXQgc2hvdWxkXG4gICAgICAvLyBkaXNyZWdhcmQgdGhlIHBvc3NpYmxlIHNlbGVjdGVkIGV2ZW50LlxuICAgICAgaWYgKHRoaXMua2V5RG93bldpdGhpbk1lbnVfKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUG9zc2libGVTZWxlY3RlZF8oZXZ0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMua2V5RG93bldpdGhpbk1lbnVfID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlzRXNjYXBlKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNhbmNlbCgpO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZVBvc3NpYmxlU2VsZWN0ZWRfKGV2dCkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmdldEF0dHJpYnV0ZUZvckV2ZW50VGFyZ2V0KGV2dC50YXJnZXQsIHN0cmluZ3MuQVJJQV9ESVNBQkxFRF9BVFRSKSA9PT0gJ3RydWUnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRhcmdldEluZGV4ID0gdGhpcy5hZGFwdGVyXy5nZXRJbmRleEZvckV2ZW50VGFyZ2V0KGV2dC50YXJnZXQpO1xuICAgIGlmICh0YXJnZXRJbmRleCA8IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRGVib3VuY2UgbXVsdGlwbGUgc2VsZWN0aW9uc1xuICAgIGlmICh0aGlzLnNlbGVjdGVkVHJpZ2dlclRpbWVySWRfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRUcmlnZ2VyVGltZXJJZF8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRUcmlnZ2VyVGltZXJJZF8gPSAwO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgaWYgKHRoaXMucmVtZW1iZXJTZWxlY3Rpb25fKSB7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRJbmRleCh0YXJnZXRJbmRleCk7XG4gICAgICB9XG4gICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeVNlbGVjdGVkKHtpbmRleDogdGFyZ2V0SW5kZXh9KTtcbiAgICB9LCBudW1iZXJzLlNFTEVDVEVEX1RSSUdHRVJfREVMQVkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge0F1dG9MYXlvdXRNZWFzdXJlbWVudHN9IE1lYXN1cmVtZW50cyB1c2VkIHRvIHBvc2l0aW9uIG1lbnUgcG9wdXAuXG4gICAqL1xuICBnZXRBdXRvTGF5b3V0TWVhc3VyZW1lbnRzXygpIHtcbiAgICBjb25zdCBhbmNob3JSZWN0ID0gdGhpcy5hZGFwdGVyXy5nZXRBbmNob3JEaW1lbnNpb25zKCk7XG4gICAgY29uc3Qgdmlld3BvcnQgPSB0aGlzLmFkYXB0ZXJfLmdldFdpbmRvd0RpbWVuc2lvbnMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICB2aWV3cG9ydDogdmlld3BvcnQsXG4gICAgICB2aWV3cG9ydERpc3RhbmNlOiB7XG4gICAgICAgIHRvcDogYW5jaG9yUmVjdC50b3AsXG4gICAgICAgIHJpZ2h0OiB2aWV3cG9ydC53aWR0aCAtIGFuY2hvclJlY3QucmlnaHQsXG4gICAgICAgIGxlZnQ6IGFuY2hvclJlY3QubGVmdCxcbiAgICAgICAgYm90dG9tOiB2aWV3cG9ydC5oZWlnaHQgLSBhbmNob3JSZWN0LmJvdHRvbSxcbiAgICAgIH0sXG4gICAgICBhbmNob3JIZWlnaHQ6IGFuY2hvclJlY3QuaGVpZ2h0LFxuICAgICAgYW5jaG9yV2lkdGg6IGFuY2hvclJlY3Qud2lkdGgsXG4gICAgICBtZW51SGVpZ2h0OiB0aGlzLmRpbWVuc2lvbnNfLmhlaWdodCxcbiAgICAgIG1lbnVXaWR0aDogdGhpcy5kaW1lbnNpb25zXy53aWR0aCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGVzIHRoZSBjb3JuZXIgb2YgdGhlIGFuY2hvciBmcm9tIHdoaWNoIHRvIGFuaW1hdGUgYW5kIHBvc2l0aW9uIHRoZSBtZW51LlxuICAgKiBAcmV0dXJuIHtDb3JuZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRPcmlnaW5Db3JuZXJfKCkge1xuICAgIC8vIERlZmF1bHRzOiBvcGVuIGZyb20gdGhlIHRvcCBsZWZ0LlxuICAgIGxldCBjb3JuZXIgPSBDb3JuZXIuVE9QX0xFRlQ7XG5cbiAgICBjb25zdCB7dmlld3BvcnREaXN0YW5jZSwgYW5jaG9ySGVpZ2h0LCBhbmNob3JXaWR0aCwgbWVudUhlaWdodCwgbWVudVdpZHRofSA9IHRoaXMubWVhc3VyZXNfO1xuICAgIGNvbnN0IGlzQm90dG9tQWxpZ25lZCA9IEJvb2xlYW4odGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LkJPVFRPTSk7XG4gICAgY29uc3QgYXZhaWxhYmxlVG9wID0gaXNCb3R0b21BbGlnbmVkID8gdmlld3BvcnREaXN0YW5jZS50b3AgKyBhbmNob3JIZWlnaHQgKyB0aGlzLmFuY2hvck1hcmdpbl8uYm90dG9tXG4gICAgICA6IHZpZXdwb3J0RGlzdGFuY2UudG9wICsgdGhpcy5hbmNob3JNYXJnaW5fLnRvcDtcbiAgICBjb25zdCBhdmFpbGFibGVCb3R0b20gPSBpc0JvdHRvbUFsaWduZWQgPyB2aWV3cG9ydERpc3RhbmNlLmJvdHRvbSAtIHRoaXMuYW5jaG9yTWFyZ2luXy5ib3R0b21cbiAgICAgIDogdmlld3BvcnREaXN0YW5jZS5ib3R0b20gKyBhbmNob3JIZWlnaHQgLSB0aGlzLmFuY2hvck1hcmdpbl8udG9wO1xuXG4gICAgY29uc3QgdG9wT3ZlcmZsb3cgPSBtZW51SGVpZ2h0IC0gYXZhaWxhYmxlVG9wO1xuICAgIGNvbnN0IGJvdHRvbU92ZXJmbG93ID0gbWVudUhlaWdodCAtIGF2YWlsYWJsZUJvdHRvbTtcbiAgICBpZiAoYm90dG9tT3ZlcmZsb3cgPiAwICYmIHRvcE92ZXJmbG93IDwgYm90dG9tT3ZlcmZsb3cpIHtcbiAgICAgIGNvcm5lciB8PSBDb3JuZXJCaXQuQk9UVE9NO1xuICAgIH1cblxuICAgIGNvbnN0IGlzUnRsID0gdGhpcy5hZGFwdGVyXy5pc1J0bCgpO1xuICAgIGNvbnN0IGlzRmxpcFJ0bCA9IEJvb2xlYW4odGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LkZMSVBfUlRMKTtcbiAgICBjb25zdCBhdm9pZEhvcml6b250YWxPdmVybGFwID0gQm9vbGVhbih0aGlzLmFuY2hvckNvcm5lcl8gJiBDb3JuZXJCaXQuUklHSFQpO1xuICAgIGNvbnN0IGlzQWxpZ25lZFJpZ2h0ID0gKGF2b2lkSG9yaXpvbnRhbE92ZXJsYXAgJiYgIWlzUnRsKSB8fFxuICAgICAgKCFhdm9pZEhvcml6b250YWxPdmVybGFwICYmIGlzRmxpcFJ0bCAmJiBpc1J0bCk7XG4gICAgY29uc3QgYXZhaWxhYmxlTGVmdCA9IGlzQWxpZ25lZFJpZ2h0ID8gdmlld3BvcnREaXN0YW5jZS5sZWZ0ICsgYW5jaG9yV2lkdGggKyB0aGlzLmFuY2hvck1hcmdpbl8ucmlnaHQgOlxuICAgICAgdmlld3BvcnREaXN0YW5jZS5sZWZ0ICsgdGhpcy5hbmNob3JNYXJnaW5fLmxlZnQ7XG4gICAgY29uc3QgYXZhaWxhYmxlUmlnaHQgPSBpc0FsaWduZWRSaWdodCA/IHZpZXdwb3J0RGlzdGFuY2UucmlnaHQgLSB0aGlzLmFuY2hvck1hcmdpbl8ucmlnaHQgOlxuICAgICAgdmlld3BvcnREaXN0YW5jZS5yaWdodCArIGFuY2hvcldpZHRoIC0gdGhpcy5hbmNob3JNYXJnaW5fLmxlZnQ7XG5cbiAgICBjb25zdCBsZWZ0T3ZlcmZsb3cgPSBtZW51V2lkdGggLSBhdmFpbGFibGVMZWZ0O1xuICAgIGNvbnN0IHJpZ2h0T3ZlcmZsb3cgPSBtZW51V2lkdGggLSBhdmFpbGFibGVSaWdodDtcblxuICAgIGlmICgobGVmdE92ZXJmbG93IDwgMCAmJiBpc0FsaWduZWRSaWdodCAmJiBpc1J0bCkgfHxcbiAgICAgICAgKGF2b2lkSG9yaXpvbnRhbE92ZXJsYXAgJiYgIWlzQWxpZ25lZFJpZ2h0ICYmIGxlZnRPdmVyZmxvdyA8IDApIHx8XG4gICAgICAgIChyaWdodE92ZXJmbG93ID4gMCAmJiBsZWZ0T3ZlcmZsb3cgPCByaWdodE92ZXJmbG93KSkge1xuICAgICAgY29ybmVyIHw9IENvcm5lckJpdC5SSUdIVDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29ybmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29ybmVyfSBjb3JuZXIgT3JpZ2luIGNvcm5lciBvZiB0aGUgbWVudS5cbiAgICogQHJldHVybiB7bnVtYmVyfSBIb3Jpem9udGFsIG9mZnNldCBvZiBtZW51IG9yaWdpbiBjb3JuZXIgZnJvbSBjb3JyZXNwb25kaW5nIGFuY2hvciBjb3JuZXIuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRIb3Jpem9udGFsT3JpZ2luT2Zmc2V0Xyhjb3JuZXIpIHtcbiAgICBjb25zdCB7YW5jaG9yV2lkdGh9ID0gdGhpcy5tZWFzdXJlc187XG4gICAgY29uc3QgaXNSaWdodEFsaWduZWQgPSBCb29sZWFuKGNvcm5lciAmIENvcm5lckJpdC5SSUdIVCk7XG4gICAgY29uc3QgYXZvaWRIb3Jpem9udGFsT3ZlcmxhcCA9IEJvb2xlYW4odGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LlJJR0hUKTtcbiAgICBsZXQgeCA9IDA7XG4gICAgaWYgKGlzUmlnaHRBbGlnbmVkKSB7XG4gICAgICBjb25zdCByaWdodE9mZnNldCA9IGF2b2lkSG9yaXpvbnRhbE92ZXJsYXAgPyBhbmNob3JXaWR0aCAtIHRoaXMuYW5jaG9yTWFyZ2luXy5sZWZ0IDogdGhpcy5hbmNob3JNYXJnaW5fLnJpZ2h0O1xuICAgICAgeCA9IHJpZ2h0T2Zmc2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsZWZ0T2Zmc2V0ID0gYXZvaWRIb3Jpem9udGFsT3ZlcmxhcCA/IGFuY2hvcldpZHRoIC0gdGhpcy5hbmNob3JNYXJnaW5fLnJpZ2h0IDogdGhpcy5hbmNob3JNYXJnaW5fLmxlZnQ7XG4gICAgICB4ID0gbGVmdE9mZnNldDtcbiAgICB9XG4gICAgcmV0dXJuIHg7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb3JuZXJ9IGNvcm5lciBPcmlnaW4gY29ybmVyIG9mIHRoZSBtZW51LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFZlcnRpY2FsIG9mZnNldCBvZiBtZW51IG9yaWdpbiBjb3JuZXIgZnJvbSBjb3JyZXNwb25kaW5nIGFuY2hvciBjb3JuZXIuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRWZXJ0aWNhbE9yaWdpbk9mZnNldF8oY29ybmVyKSB7XG4gICAgY29uc3Qge3ZpZXdwb3J0LCB2aWV3cG9ydERpc3RhbmNlLCBhbmNob3JIZWlnaHQsIG1lbnVIZWlnaHR9ID0gdGhpcy5tZWFzdXJlc187XG4gICAgY29uc3QgaXNCb3R0b21BbGlnbmVkID0gQm9vbGVhbihjb3JuZXIgJiBDb3JuZXJCaXQuQk9UVE9NKTtcbiAgICBjb25zdCB7TUFSR0lOX1RPX0VER0V9ID0gTURDTWVudUZvdW5kYXRpb24ubnVtYmVycztcbiAgICBjb25zdCBhdm9pZFZlcnRpY2FsT3ZlcmxhcCA9IEJvb2xlYW4odGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LkJPVFRPTSk7XG4gICAgY29uc3QgY2FuT3ZlcmxhcFZlcnRpY2FsbHkgPSAhYXZvaWRWZXJ0aWNhbE92ZXJsYXA7XG4gICAgbGV0IHkgPSAwO1xuXG4gICAgaWYgKGlzQm90dG9tQWxpZ25lZCkge1xuICAgICAgeSA9IGF2b2lkVmVydGljYWxPdmVybGFwID8gYW5jaG9ySGVpZ2h0IC0gdGhpcy5hbmNob3JNYXJnaW5fLnRvcCA6IC10aGlzLmFuY2hvck1hcmdpbl8uYm90dG9tO1xuICAgICAgLy8gYWRqdXN0IGZvciB3aGVuIG1lbnUgY2FuIG92ZXJsYXAgYW5jaG9yLCBidXQgdG9vIHRhbGwgdG8gYmUgYWxpZ25lZCB0byBib3R0b21cbiAgICAgIC8vIGFuY2hvciBjb3JuZXIuIEJvdHRvbSBtYXJnaW4gaXMgaWdub3JlZCBpbiBzdWNoIGNhc2VzLlxuICAgICAgaWYgKGNhbk92ZXJsYXBWZXJ0aWNhbGx5ICYmIG1lbnVIZWlnaHQgPiB2aWV3cG9ydERpc3RhbmNlLnRvcCArIGFuY2hvckhlaWdodCkge1xuICAgICAgICB5ID0gLShNYXRoLm1pbihtZW51SGVpZ2h0LCB2aWV3cG9ydC5oZWlnaHQgLSBNQVJHSU5fVE9fRURHRSkgLSAodmlld3BvcnREaXN0YW5jZS50b3AgKyBhbmNob3JIZWlnaHQpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgeSA9IGF2b2lkVmVydGljYWxPdmVybGFwID8gKGFuY2hvckhlaWdodCArIHRoaXMuYW5jaG9yTWFyZ2luXy5ib3R0b20pIDogdGhpcy5hbmNob3JNYXJnaW5fLnRvcDtcbiAgICAgIC8vIGFkanVzdCBmb3Igd2hlbiBtZW51IGNhbiBvdmVybGFwIGFuY2hvciwgYnV0IHRvbyB0YWxsIHRvIGJlIGFsaWduZWQgdG8gdG9wXG4gICAgICAvLyBhbmNob3IgY29ybmVycy4gVG9wIG1hcmdpbiBpcyBpZ25vcmVkIGluIHRoYXQgY2FzZS5cbiAgICAgIGlmIChjYW5PdmVybGFwVmVydGljYWxseSAmJiBtZW51SGVpZ2h0ID4gdmlld3BvcnREaXN0YW5jZS5ib3R0b20gKyBhbmNob3JIZWlnaHQpIHtcbiAgICAgICAgeSA9IC0oTWF0aC5taW4obWVudUhlaWdodCwgdmlld3BvcnQuaGVpZ2h0IC0gTUFSR0lOX1RPX0VER0UpIC0gKHZpZXdwb3J0RGlzdGFuY2UuYm90dG9tICsgYW5jaG9ySGVpZ2h0KSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB5O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29ybmVyfSBjb3JuZXIgT3JpZ2luIGNvcm5lciBvZiB0aGUgbWVudS5cbiAgICogQHJldHVybiB7bnVtYmVyfSBNYXhpbXVtIGhlaWdodCBvZiB0aGUgbWVudSwgYmFzZWQgb24gYXZhaWxhYmxlIHNwYWNlLiAwIGluZGljYXRlcyBzaG91bGQgbm90IGJlIHNldC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldE1lbnVNYXhIZWlnaHRfKGNvcm5lcikge1xuICAgIGxldCBtYXhIZWlnaHQgPSAwO1xuICAgIGNvbnN0IHt2aWV3cG9ydERpc3RhbmNlfSA9IHRoaXMubWVhc3VyZXNfO1xuICAgIGNvbnN0IGlzQm90dG9tQWxpZ25lZCA9IEJvb2xlYW4oY29ybmVyICYgQ29ybmVyQml0LkJPVFRPTSk7XG5cbiAgICAvLyBXaGVuIG1heGltdW0gaGVpZ2h0IGlzIG5vdCBzcGVjaWZpZWQsIGl0IGlzIGhhbmRsZWQgZnJvbSBjc3MuXG4gICAgaWYgKHRoaXMuYW5jaG9yQ29ybmVyXyAmIENvcm5lckJpdC5CT1RUT00pIHtcbiAgICAgIGlmIChpc0JvdHRvbUFsaWduZWQpIHtcbiAgICAgICAgbWF4SGVpZ2h0ID0gdmlld3BvcnREaXN0YW5jZS50b3AgKyB0aGlzLmFuY2hvck1hcmdpbl8udG9wO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWF4SGVpZ2h0ID0gdmlld3BvcnREaXN0YW5jZS5ib3R0b20gLSB0aGlzLmFuY2hvck1hcmdpbl8uYm90dG9tO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXhIZWlnaHQ7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYXV0b1Bvc2l0aW9uXygpIHtcbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaGFzQW5jaG9yKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDb21wdXRlIG1lYXN1cmVtZW50cyBmb3IgYXV0b3Bvc2l0aW9uIG1ldGhvZHMgcmV1c2UuXG4gICAgdGhpcy5tZWFzdXJlc18gPSB0aGlzLmdldEF1dG9MYXlvdXRNZWFzdXJlbWVudHNfKCk7XG5cbiAgICBjb25zdCBjb3JuZXIgPSB0aGlzLmdldE9yaWdpbkNvcm5lcl8oKTtcbiAgICBjb25zdCBtYXhNZW51SGVpZ2h0ID0gdGhpcy5nZXRNZW51TWF4SGVpZ2h0Xyhjb3JuZXIpO1xuICAgIGxldCB2ZXJ0aWNhbEFsaWdubWVudCA9IChjb3JuZXIgJiBDb3JuZXJCaXQuQk9UVE9NKSA/ICdib3R0b20nIDogJ3RvcCc7XG4gICAgbGV0IGhvcml6b250YWxBbGlnbm1lbnQgPSAoY29ybmVyICYgQ29ybmVyQml0LlJJR0hUKSA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgY29uc3QgaG9yaXpvbnRhbE9mZnNldCA9IHRoaXMuZ2V0SG9yaXpvbnRhbE9yaWdpbk9mZnNldF8oY29ybmVyKTtcbiAgICBjb25zdCB2ZXJ0aWNhbE9mZnNldCA9IHRoaXMuZ2V0VmVydGljYWxPcmlnaW5PZmZzZXRfKGNvcm5lcik7XG4gICAgY29uc3QgcG9zaXRpb24gPSB7XG4gICAgICBbaG9yaXpvbnRhbEFsaWdubWVudF06IGhvcml6b250YWxPZmZzZXQgPyBob3Jpem9udGFsT2Zmc2V0ICsgJ3B4JyA6ICcwJyxcbiAgICAgIFt2ZXJ0aWNhbEFsaWdubWVudF06IHZlcnRpY2FsT2Zmc2V0ID8gdmVydGljYWxPZmZzZXQgKyAncHgnIDogJzAnLFxuICAgIH07XG4gICAgY29uc3Qge2FuY2hvcldpZHRoLCBtZW51SGVpZ2h0LCBtZW51V2lkdGh9ID0gdGhpcy5tZWFzdXJlc187XG4gICAgLy8gQ2VudGVyIGFsaWduIHdoZW4gYW5jaG9yIHdpZHRoIGlzIGNvbXBhcmFibGUgb3IgZ3JlYXRlciB0aGFuIG1lbnUsIG90aGVyd2lzZSBrZWVwIGNvcm5lci5cbiAgICBpZiAoYW5jaG9yV2lkdGggLyBtZW51V2lkdGggPiBudW1iZXJzLkFOQ0hPUl9UT19NRU5VX1dJRFRIX1JBVElPKSB7XG4gICAgICBob3Jpem9udGFsQWxpZ25tZW50ID0gJ2NlbnRlcic7XG4gICAgfVxuXG4gICAgLy8gQWRqdXN0IHZlcnRpY2FsIG9yaWdpbiB3aGVuIG1lbnUgaXMgcG9zaXRpb25lZCB3aXRoIHNpZ25pZmljYW50IG9mZnNldCBmcm9tIGFuY2hvci4gVGhpcyBpcyBkb25lIHNvIHRoYXRcbiAgICAvLyBzY2FsZSBhbmltYXRpb24gaXMgXCJhbmNob3JlZFwiIG9uIHRoZSBhbmNob3IuXG4gICAgaWYgKCEodGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LkJPVFRPTSkgJiZcbiAgICAgICAgTWF0aC5hYnModmVydGljYWxPZmZzZXQgLyBtZW51SGVpZ2h0KSA+IG51bWJlcnMuT0ZGU0VUX1RPX01FTlVfSEVJR0hUX1JBVElPKSB7XG4gICAgICBjb25zdCB2ZXJ0aWNhbE9mZnNldFBlcmNlbnQgPSBNYXRoLmFicyh2ZXJ0aWNhbE9mZnNldCAvIG1lbnVIZWlnaHQpICogMTAwO1xuICAgICAgY29uc3Qgb3JpZ2luUGVyY2VudCA9IChjb3JuZXIgJiBDb3JuZXJCaXQuQk9UVE9NKSA/IDEwMCAtIHZlcnRpY2FsT2Zmc2V0UGVyY2VudCA6IHZlcnRpY2FsT2Zmc2V0UGVyY2VudDtcbiAgICAgIHZlcnRpY2FsQWxpZ25tZW50ID0gTWF0aC5yb3VuZChvcmlnaW5QZXJjZW50ICogMTAwKSAvIDEwMCArICclJztcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnNldFRyYW5zZm9ybU9yaWdpbihgJHtob3Jpem9udGFsQWxpZ25tZW50fSAke3ZlcnRpY2FsQWxpZ25tZW50fWApO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0UG9zaXRpb24ocG9zaXRpb24pO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0TWF4SGVpZ2h0KG1heE1lbnVIZWlnaHQgPyBtYXhNZW51SGVpZ2h0ICsgJ3B4JyA6ICcnKTtcblxuICAgIC8vIENsZWFyIG1lYXN1cmVzIGFmdGVyIHBvc2l0aW9uaW5nIGlzIGNvbXBsZXRlLlxuICAgIHRoaXMubWVhc3VyZXNfID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuIHRoZSBtZW51LlxuICAgKiBAcGFyYW0ge3tmb2N1c0luZGV4OiA/bnVtYmVyfT19IG9wdGlvbnNcbiAgICovXG4gIG9wZW4oe2ZvY3VzSW5kZXggPSBudWxsfSA9IHt9KSB7XG4gICAgdGhpcy5hZGFwdGVyXy5zYXZlRm9jdXMoKTtcblxuICAgIGlmICghdGhpcy5xdWlja09wZW5fKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ01lbnVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQU5JTUFUSU5HX09QRU4pO1xuICAgIH1cblxuICAgIHRoaXMuYW5pbWF0aW9uUmVxdWVzdElkXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmRpbWVuc2lvbnNfID0gdGhpcy5hZGFwdGVyXy5nZXRJbm5lckRpbWVuc2lvbnMoKTtcbiAgICAgIHRoaXMuYXV0b1Bvc2l0aW9uXygpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENNZW51Rm91bmRhdGlvbi5jc3NDbGFzc2VzLk9QRU4pO1xuICAgICAgdGhpcy5mb2N1c09uT3Blbl8oZm9jdXNJbmRleCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcih0aGlzLmRvY3VtZW50Q2xpY2tIYW5kbGVyXyk7XG4gICAgICBpZiAoIXRoaXMucXVpY2tPcGVuXykge1xuICAgICAgICB0aGlzLm9wZW5BbmltYXRpb25FbmRUaW1lcklkXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMub3BlbkFuaW1hdGlvbkVuZFRpbWVySWRfID0gMDtcbiAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ01lbnVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQU5JTUFUSU5HX09QRU4pO1xuICAgICAgICB9LCBudW1iZXJzLlRSQU5TSVRJT05fT1BFTl9EVVJBVElPTik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pc09wZW5fID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIG1lbnUuXG4gICAqIEBwYXJhbSB7RXZlbnQ9fSBldnRcbiAgICovXG4gIGNsb3NlKGV2dCA9IG51bGwpIHtcbiAgICBjb25zdCB0YXJnZXRJc0Rpc2FibGVkID0gZXZ0ID9cbiAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0QXR0cmlidXRlRm9yRXZlbnRUYXJnZXQoZXZ0LnRhcmdldCwgc3RyaW5ncy5BUklBX0RJU0FCTEVEX0FUVFIpID09PSAndHJ1ZScgOlxuICAgICAgZmFsc2U7XG5cbiAgICBpZiAodGFyZ2V0SXNEaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckJvZHlDbGlja0hhbmRsZXIodGhpcy5kb2N1bWVudENsaWNrSGFuZGxlcl8pO1xuXG4gICAgaWYgKCF0aGlzLnF1aWNrT3Blbl8pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDTWVudUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkdfQ0xPU0VEKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENNZW51Rm91bmRhdGlvbi5jc3NDbGFzc2VzLk9QRU4pO1xuICAgICAgaWYgKCF0aGlzLnF1aWNrT3Blbl8pIHtcbiAgICAgICAgdGhpcy5jbG9zZUFuaW1hdGlvbkVuZFRpbWVySWRfID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jbG9zZUFuaW1hdGlvbkVuZFRpbWVySWRfID0gMDtcbiAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ01lbnVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQU5JTUFUSU5HX0NMT1NFRCk7XG4gICAgICAgIH0sIG51bWJlcnMuVFJBTlNJVElPTl9DTE9TRV9EVVJBVElPTik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pc09wZW5fID0gZmFsc2U7XG4gICAgdGhpcy5hZGFwdGVyXy5yZXN0b3JlRm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc09wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuXztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldFNlbGVjdGVkSW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJbmRleF87XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IEluZGV4IG9mIHRoZSBpdGVtIHRvIHNldCBhcyBzZWxlY3RlZC5cbiAgICovXG4gIHNldFNlbGVjdGVkSW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPT09IHRoaXMuc2VsZWN0ZWRJbmRleF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2U2VsZWN0ZWRJbmRleCA9IHRoaXMuc2VsZWN0ZWRJbmRleF87XG4gICAgaWYgKHByZXZTZWxlY3RlZEluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucm1BdHRyRm9yT3B0aW9uQXRJbmRleChwcmV2U2VsZWN0ZWRJbmRleCwgJ2FyaWEtc2VsZWN0ZWQnKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucm1DbGFzc0Zvck9wdGlvbkF0SW5kZXgocHJldlNlbGVjdGVkSW5kZXgsIGNzc0NsYXNzZXMuU0VMRUNURURfTElTVF9JVEVNKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkSW5kZXhfID0gaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMuYWRhcHRlcl8uZ2V0TnVtYmVyT2ZJdGVtcygpID8gaW5kZXggOiAtMTtcbiAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4XyA+PSAwKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJGb3JPcHRpb25BdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8sICdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3NGb3JPcHRpb25BdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8sIGNzc0NsYXNzZXMuU0VMRUNURURfTElTVF9JVEVNKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHtNRENNZW51Rm91bmRhdGlvbiwgQW5jaG9yTWFyZ2lufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAdHlwZSB7c3RyaW5nfHVuZGVmaW5lZH0gKi9cbmxldCBzdG9yZWRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWVfO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGNvcnJlY3QgdHJhbnNmb3JtIHByb3BlcnR5IHRvIHVzZSBvbiB0aGUgY3VycmVudCBicm93c2VyLlxuICogQHBhcmFtIHshV2luZG93fSBnbG9iYWxPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWUoZ2xvYmFsT2JqLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAoc3RvcmVkVHJhbnNmb3JtUHJvcGVydHlOYW1lXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgIGNvbnN0IGVsID0gZ2xvYmFsT2JqLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHRyYW5zZm9ybVByb3BlcnR5TmFtZSA9ICgndHJhbnNmb3JtJyBpbiBlbC5zdHlsZSA/ICd0cmFuc2Zvcm0nIDogJ3dlYmtpdFRyYW5zZm9ybScpO1xuICAgIHN0b3JlZFRyYW5zZm9ybVByb3BlcnR5TmFtZV8gPSB0cmFuc2Zvcm1Qcm9wZXJ0eU5hbWU7XG4gIH1cblxuICByZXR1cm4gc3RvcmVkVHJhbnNmb3JtUHJvcGVydHlOYW1lXztcbn1cblxuLyoqXG4gKiBDbGFtcHMgYSB2YWx1ZSBiZXR3ZWVuIHRoZSBtaW5pbXVtIGFuZCB0aGUgbWF4aW11bSwgcmV0dXJuaW5nIHRoZSBjbGFtcGVkIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gbWluXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4XG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGNsYW1wKHZhbHVlLCBtaW4gPSAwLCBtYXggPSAxKSB7XG4gIHJldHVybiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KG1pbiwgdmFsdWUpKTtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGVhc2luZyB2YWx1ZSB0byBhcHBseSBhdCB0aW1lIHQsIGZvciBhIGdpdmVuIGN1YmljIGJlemllciBjdXJ2ZS5cbiAqIENvbnRyb2wgcG9pbnRzIFAwIGFuZCBQMyBhcmUgYXNzdW1lZCB0byBiZSAoMCwwKSBhbmQgKDEsMSksIHJlc3BlY3RpdmVseS5cbiAqIFBhcmFtZXRlcnMgYXJlIGFzIGZvbGxvd3M6XG4gKiAtIHRpbWU6IFRoZSBjdXJyZW50IHRpbWUgaW4gdGhlIGFuaW1hdGlvbiwgc2NhbGVkIGJldHdlZW4gMCBhbmQgMS5cbiAqIC0geDE6IFRoZSB4IHZhbHVlIG9mIGNvbnRyb2wgcG9pbnQgUDEuXG4gKiAtIHkxOiBUaGUgeSB2YWx1ZSBvZiBjb250cm9sIHBvaW50IFAxLlxuICogLSB4MjogVGhlIHggdmFsdWUgb2YgY29udHJvbCBwb2ludCBQMi5cbiAqIC0geTI6IFRoZSB5IHZhbHVlIG9mIGNvbnRyb2wgcG9pbnQgUDIuXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZVxuICogQHBhcmFtIHtudW1iZXJ9IHgxXG4gKiBAcGFyYW0ge251bWJlcn0geTFcbiAqIEBwYXJhbSB7bnVtYmVyfSB4MlxuICogQHBhcmFtIHtudW1iZXJ9IHkyXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGJlemllclByb2dyZXNzKHRpbWUsIHgxLCB5MSwgeDIsIHkyKSB7XG4gIHJldHVybiBnZXRCZXppZXJDb29yZGluYXRlXyhzb2x2ZVBvc2l0aW9uRnJvbVhWYWx1ZV8odGltZSwgeDEsIHgyKSwgeTEsIHkyKTtcbn1cblxuLyoqXG4gKiBDb21wdXRlIGEgc2luZ2xlIGNvb3JkaW5hdGUgYXQgYSBwb3NpdGlvbiBwb2ludCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBjMSBhbmQgYzIgYXJlIHRoZSBtYXRjaGluZyBjb29yZGluYXRlIG9uIGNvbnRyb2wgcG9pbnRzIFAxIGFuZCBQMiwgcmVzcGVjdGl2ZWx5LlxuICogQ29udHJvbCBwb2ludHMgUDAgYW5kIFAzIGFyZSBhc3N1bWVkIHRvIGJlICgwLDApIGFuZCAoMSwxKSwgcmVzcGVjdGl2ZWx5LlxuICogQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1saWJyYXJ5L2Jsb2IvbWFzdGVyL2Nsb3N1cmUvZ29vZy9tYXRoL2Jlemllci5qcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0XG4gKiBAcGFyYW0ge251bWJlcn0gYzFcbiAqIEBwYXJhbSB7bnVtYmVyfSBjMlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXRCZXppZXJDb29yZGluYXRlXyh0LCBjMSwgYzIpIHtcbiAgLy8gU3BlY2lhbCBjYXNlIHN0YXJ0IGFuZCBlbmQuXG4gIGlmICh0ID09PSAwIHx8IHQgPT09IDEpIHtcbiAgICByZXR1cm4gdDtcbiAgfVxuXG4gIC8vIFN0ZXAgb25lIC0gZnJvbSA0IHBvaW50cyB0byAzXG4gIGxldCBpYzAgPSB0ICogYzE7XG4gIGxldCBpYzEgPSBjMSArIHQgKiAoYzIgLSBjMSk7XG4gIGNvbnN0IGljMiA9IGMyICsgdCAqICgxIC0gYzIpO1xuXG4gIC8vIFN0ZXAgdHdvIC0gZnJvbSAzIHBvaW50cyB0byAyXG4gIGljMCArPSB0ICogKGljMSAtIGljMCk7XG4gIGljMSArPSB0ICogKGljMiAtIGljMSk7XG5cbiAgLy8gRmluYWwgc3RlcCAtIGxhc3QgcG9pbnRcbiAgcmV0dXJuIGljMCArIHQgKiAoaWMxIC0gaWMwKTtcbn1cblxuLyoqXG4gKiBQcm9qZWN0IGEgcG9pbnQgb250byB0aGUgQmV6aWVyIGN1cnZlLCBmcm9tIGEgZ2l2ZW4gWC4gQ2FsY3VsYXRlcyB0aGUgcG9zaXRpb24gdCBhbG9uZyB0aGUgY3VydmUuXG4gKiBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS9jbG9zdXJlLWxpYnJhcnkvYmxvYi9tYXN0ZXIvY2xvc3VyZS9nb29nL21hdGgvYmV6aWVyLmpzLlxuICogQHBhcmFtIHtudW1iZXJ9IHhWYWxcbiAqIEBwYXJhbSB7bnVtYmVyfSB4MVxuICogQHBhcmFtIHtudW1iZXJ9IHgyXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIHNvbHZlUG9zaXRpb25Gcm9tWFZhbHVlXyh4VmFsLCB4MSwgeDIpIHtcbiAgY29uc3QgRVBTSUxPTiA9IDFlLTY7XG4gIGNvbnN0IE1BWF9JVEVSQVRJT05TID0gODtcblxuICBpZiAoeFZhbCA8PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH0gZWxzZSBpZiAoeFZhbCA+PSAxKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICAvLyBJbml0aWFsIGVzdGltYXRlIG9mIHQgdXNpbmcgbGluZWFyIGludGVycG9sYXRpb24uXG4gIGxldCB0ID0geFZhbDtcblxuICAvLyBUcnkgZ3JhZGllbnQgZGVzY2VudCB0byBzb2x2ZSBmb3IgdC4gSWYgaXQgd29ya3MsIGl0IGlzIHZlcnkgZmFzdC5cbiAgbGV0IHRNaW4gPSAwO1xuICBsZXQgdE1heCA9IDE7XG4gIGxldCB2YWx1ZSA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgTUFYX0lURVJBVElPTlM7IGkrKykge1xuICAgIHZhbHVlID0gZ2V0QmV6aWVyQ29vcmRpbmF0ZV8odCwgeDEsIHgyKTtcbiAgICBjb25zdCBkZXJpdmF0aXZlID0gKGdldEJlemllckNvb3JkaW5hdGVfKHQgKyBFUFNJTE9OLCB4MSwgeDIpIC0gdmFsdWUpIC8gRVBTSUxPTjtcbiAgICBpZiAoTWF0aC5hYnModmFsdWUgLSB4VmFsKSA8IEVQU0lMT04pIHtcbiAgICAgIHJldHVybiB0O1xuICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoZGVyaXZhdGl2ZSkgPCBFUFNJTE9OKSB7XG4gICAgICBicmVhaztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZhbHVlIDwgeFZhbCkge1xuICAgICAgICB0TWluID0gdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRNYXggPSB0O1xuICAgICAgfVxuICAgICAgdCAtPSAodmFsdWUgLSB4VmFsKSAvIGRlcml2YXRpdmU7XG4gICAgfVxuICB9XG5cbiAgLy8gSWYgdGhlIGdyYWRpZW50IGRlc2NlbnQgZ290IHN0dWNrIGluIGEgbG9jYWwgbWluaW11bSwgZS5nLiBiZWNhdXNlXG4gIC8vIHRoZSBkZXJpdmF0aXZlIHdhcyBjbG9zZSB0byAwLCB1c2UgYSBEaWNob3RvbXkgcmVmaW5lbWVudCBpbnN0ZWFkLlxuICAvLyBXZSBsaW1pdCB0aGUgbnVtYmVyIG9mIGludGVyYXRpb25zIHRvIDguXG4gIGZvciAobGV0IGkgPSAwOyBNYXRoLmFicyh2YWx1ZSAtIHhWYWwpID4gRVBTSUxPTiAmJiBpIDwgTUFYX0lURVJBVElPTlM7IGkrKykge1xuICAgIGlmICh2YWx1ZSA8IHhWYWwpIHtcbiAgICAgIHRNaW4gPSB0O1xuICAgICAgdCA9ICh0ICsgdE1heCkgLyAyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0TWF4ID0gdDtcbiAgICAgIHQgPSAodCArIHRNaW4pIC8gMjtcbiAgICB9XG4gICAgdmFsdWUgPSBnZXRCZXppZXJDb29yZGluYXRlXyh0LCB4MSwgeDIpO1xuICB9XG4gIHJldHVybiB0O1xufVxuXG5leHBvcnQge2dldFRyYW5zZm9ybVByb3BlcnR5TmFtZSwgY2xhbXAsIGJlemllclByb2dyZXNzfTtcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IFxyXG4gICAgcmVmPVwicm9vdFwiIFxyXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiIFxyXG4gICAgOnN0eWxlPVwic3R5bGVzXCIgXHJcbiAgICBjbGFzcz1cIm1kYy1tZW51IG1kYy1zaW1wbGUtbWVudVwiIFxyXG4gICAgdGFiaW5kZXg9XCItMVwiPlxyXG4gICAgPHVsIFxyXG4gICAgICByZWY9XCJpdGVtc1wiIFxyXG4gICAgICBjbGFzcz1cIm1kYy1zaW1wbGUtbWVudV9faXRlbXMgbWRjLWxpc3RcIiBcclxuICAgICAgcm9sZT1cIm1lbnVcIiBcclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgIDxzbG90Lz5cclxuICAgIDwvdWw+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyBNRENNZW51Rm91bmRhdGlvbiB9IGZyb20gJ0BtYXRlcmlhbC9tZW51L2ZvdW5kYXRpb24nXHJcbmltcG9ydCB7IGdldFRyYW5zZm9ybVByb3BlcnR5TmFtZSB9IGZyb20gJ0BtYXRlcmlhbC9tZW51L3V0aWwnXHJcbmltcG9ydCB7IGVtaXRDdXN0b21FdmVudCB9IGZyb20gJy4uL2Jhc2UnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1tZW51JyxcclxuICBtb2RlbDoge1xyXG4gICAgcHJvcDogJ29wZW4nLFxyXG4gICAgZXZlbnQ6ICdjaGFuZ2UnXHJcbiAgfSxcclxuICBwcm9wczoge1xyXG4gICAgb3BlbjogW0Jvb2xlYW4sIE9iamVjdF0sXHJcbiAgICAncXVpY2stb3Blbic6IEJvb2xlYW4sXHJcbiAgICAnYW5jaG9yLWNvcm5lcic6IFtTdHJpbmcsIE51bWJlcl0sXHJcbiAgICAnYW5jaG9yLW1hcmdpbic6IE9iamVjdFxyXG4gIH0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNsYXNzZXM6IHt9LFxyXG4gICAgICBzdHlsZXM6IHt9LFxyXG4gICAgICBpdGVtczogW11cclxuICAgIH1cclxuICB9LFxyXG4gIHdhdGNoOiB7XHJcbiAgICBvcGVuOiAnb25PcGVuXycsXHJcbiAgICBxdWlja09wZW4obnYpIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldFF1aWNrT3BlbihudilcclxuICAgIH0sXHJcbiAgICBhbmNob3JDb3JuZXIobnYpIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldEFuY2hvckNvcm5lcihOdW1iZXIobnYpKVxyXG4gICAgfSxcclxuICAgIGFuY2hvck1hcmdpbihudikge1xyXG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0QW5jaG9yTWFyZ2luKG52KVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbW91bnRlZCgpIHtcclxuICAgIGNvbnN0IHJlZnJlc2hJdGVtcyA9ICgpID0+IHtcclxuICAgICAgdGhpcy5pdGVtcyA9IFtdLnNsaWNlLmNhbGwoXHJcbiAgICAgICAgdGhpcy4kcmVmcy5pdGVtcy5xdWVyeVNlbGVjdG9yQWxsKCcubWRjLWxpc3QtaXRlbVtyb2xlXScpXHJcbiAgICAgIClcclxuICAgICAgdGhpcy4kZW1pdCgndXBkYXRlJylcclxuICAgIH1cclxuICAgIHRoaXMuc2xvdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gcmVmcmVzaEl0ZW1zKCkpXHJcbiAgICB0aGlzLnNsb3RPYnNlcnZlci5vYnNlcnZlKHRoaXMuJGVsLCB7XHJcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgc3VidHJlZTogdHJ1ZVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLl9wcmV2aW91c0ZvY3VzID0gdW5kZWZpbmVkXHJcblxyXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ01lbnVGb3VuZGF0aW9uKHtcclxuICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpLFxyXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSksXHJcbiAgICAgIGhhc0NsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kcmVmcy5yb290LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxyXG4gICAgICBoYXNOZWNlc3NhcnlEb206ICgpID0+IEJvb2xlYW4odGhpcy4kcmVmcy5pdGVtcyksXHJcbiAgICAgIGdldEF0dHJpYnV0ZUZvckV2ZW50VGFyZ2V0OiAodGFyZ2V0LCBhdHRyaWJ1dGVOYW1lKSA9PlxyXG4gICAgICAgIHRhcmdldC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSksXHJcbiAgICAgIGdldElubmVyRGltZW5zaW9uczogKCkgPT4gKHtcclxuICAgICAgICB3aWR0aDogdGhpcy4kcmVmcy5pdGVtcy5vZmZzZXRXaWR0aCxcclxuICAgICAgICBoZWlnaHQ6IHRoaXMuJHJlZnMuaXRlbXMub2Zmc2V0SGVpZ2h0XHJcbiAgICAgIH0pLFxyXG4gICAgICBoYXNBbmNob3I6ICgpID0+XHJcbiAgICAgICAgdGhpcy4kcmVmcy5yb290LnBhcmVudEVsZW1lbnQgJiZcclxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ21kYy1tZW51LWFuY2hvcicpLFxyXG4gICAgICBnZXRBbmNob3JEaW1lbnNpb25zOiAoKSA9PlxyXG4gICAgICAgIHRoaXMuJHJlZnMucm9vdC5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICBnZXRXaW5kb3dEaW1lbnNpb25zOiAoKSA9PiAoe1xyXG4gICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcclxuICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodFxyXG4gICAgICB9KSxcclxuICAgICAgZ2V0TnVtYmVyT2ZJdGVtczogKCkgPT4gdGhpcy5pdGVtcy5sZW5ndGgsXHJcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT5cclxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSxcclxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+XHJcbiAgICAgICAgdGhpcy4kcmVmcy5yb290LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXHJcbiAgICAgIHJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcjogaGFuZGxlciA9PlxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyKSxcclxuICAgICAgZGVyZWdpc3RlckJvZHlDbGlja0hhbmRsZXI6IGhhbmRsZXIgPT5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlciksXHJcbiAgICAgIGdldEluZGV4Rm9yRXZlbnRUYXJnZXQ6IHRhcmdldCA9PiB0aGlzLml0ZW1zLmluZGV4T2YodGFyZ2V0KSxcclxuICAgICAgbm90aWZ5U2VsZWN0ZWQ6IGV2dERhdGEgPT4ge1xyXG4gICAgICAgIGNvbnN0IGV2dCA9IHtcclxuICAgICAgICAgIGluZGV4OiBldnREYXRhLmluZGV4LFxyXG4gICAgICAgICAgaXRlbTogdGhpcy5pdGVtc1tldnREYXRhLmluZGV4XVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBmYWxzZSlcclxuICAgICAgICB0aGlzLiRlbWl0KCdzZWxlY3QnLCBldnQpXHJcbiAgICAgICAgZW1pdEN1c3RvbUV2ZW50KHRoaXMuJGVsLCBNRENNZW51Rm91bmRhdGlvbi5zdHJpbmdzLlNFTEVDVEVEX0VWRU5ULCBldnQpXHJcbiAgICAgIH0sXHJcbiAgICAgIG5vdGlmeUNhbmNlbDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGZhbHNlKVxyXG4gICAgICAgIHRoaXMuJGVtaXQoJ2NhbmNlbCcpXHJcbiAgICAgICAgZW1pdEN1c3RvbUV2ZW50KHRoaXMuJGVsLCBNRENNZW51Rm91bmRhdGlvbi5zdHJpbmdzLkNBTkNFTF9FVkVOVCwge30pXHJcbiAgICAgIH0sXHJcbiAgICAgIHNhdmVGb2N1czogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3ByZXZpb3VzRm9jdXMgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XHJcbiAgICAgIH0sXHJcbiAgICAgIHJlc3RvcmVGb2N1czogKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9wcmV2aW91c0ZvY3VzKSB7XHJcbiAgICAgICAgICB0aGlzLl9wcmV2aW91c0ZvY3VzLmZvY3VzKClcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGlzRm9jdXNlZDogKCkgPT4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy4kcmVmcy5yb290LFxyXG4gICAgICBmb2N1czogKCkgPT4gdGhpcy4kcmVmcy5yb290LmZvY3VzKCksXHJcbiAgICAgIGdldEZvY3VzZWRJdGVtSW5kZXg6ICgpID0+IHRoaXMuaXRlbXMuaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KSxcclxuICAgICAgZm9jdXNJdGVtQXRJbmRleDogaW5kZXggPT4gdGhpcy5pdGVtc1tpbmRleF0uZm9jdXMoKSxcclxuICAgICAgaXNSdGw6ICgpID0+XHJcbiAgICAgICAgZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLiRyZWZzLnJvb3QpLmdldFByb3BlcnR5VmFsdWUoJ2RpcmVjdGlvbicpID09PVxyXG4gICAgICAgICdydGwnLFxyXG4gICAgICBzZXRUcmFuc2Zvcm1PcmlnaW46IG9yaWdpbiA9PiB7XHJcbiAgICAgICAgdGhpcy4kc2V0KFxyXG4gICAgICAgICAgdGhpcy5zdHlsZXMsXHJcbiAgICAgICAgICBgJHtnZXRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWUod2luZG93KX0tb3JpZ2luYCxcclxuICAgICAgICAgIG9yaWdpblxyXG4gICAgICAgIClcclxuICAgICAgfSxcclxuICAgICAgc2V0UG9zaXRpb246IHBvc2l0aW9uID0+IHtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5zdHlsZXMsICdsZWZ0JywgcG9zaXRpb24ubGVmdClcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5zdHlsZXMsICdyaWdodCcsIHBvc2l0aW9uLnJpZ2h0KVxyXG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnN0eWxlcywgJ3RvcCcsIHBvc2l0aW9uLnRvcClcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5zdHlsZXMsICdib3R0b20nLCBwb3NpdGlvbi5ib3R0b20pXHJcbiAgICAgIH0sXHJcbiAgICAgIHNldE1heEhlaWdodDogaGVpZ2h0ID0+IHtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5zdHlsZXMsICdtYXgtaGVpZ2h0JywgaGVpZ2h0KVxyXG4gICAgICB9LFxyXG4gICAgICBzZXRBdHRyRm9yT3B0aW9uQXRJbmRleDogKGluZGV4LCBhdHRyLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSlcclxuICAgICAgfSxcclxuICAgICAgcm1BdHRyRm9yT3B0aW9uQXRJbmRleDogKGluZGV4LCBhdHRyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0ucmVtb3ZlQXR0cmlidXRlKGF0dHIpXHJcbiAgICAgIH0sXHJcbiAgICAgIGFkZENsYXNzRm9yT3B0aW9uQXRJbmRleDogKGluZGV4LCBjbGFzc05hbWUpID0+IHtcclxuICAgICAgICB0aGlzLml0ZW1zW2luZGV4XS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSlcclxuICAgICAgfSxcclxuICAgICAgcm1DbGFzc0Zvck9wdGlvbkF0SW5kZXg6IChpbmRleCwgY2xhc3NOYW1lKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgcmVmcmVzaEl0ZW1zKClcclxuICAgIHRoaXMuZm91bmRhdGlvbi5pbml0KClcclxuICAgIGlmICh0aGlzLmFuY2hvckNvcm5lciAhPT0gdm9pZCAwKSB7XHJcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRBbmNob3JDb3JuZXIoTnVtYmVyKHRoaXMuYW5jaG9yQ29ybmVyKSlcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmFuY2hvck1hcmdpbiAhPT0gdm9pZCAwKSB7XHJcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRBbmNob3JNYXJnaW4odGhpcy5hbmNob3JNYXJnaW4pXHJcbiAgICB9XHJcbiAgfSxcclxuICBiZWZvcmVEZXN0cm95KCkge1xyXG4gICAgdGhpcy5fcHJldmlvdXNGb2N1cyA9IG51bGxcclxuICAgIHRoaXMuc2xvdE9ic2VydmVyLmRpc2Nvbm5lY3QoKVxyXG4gICAgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gIH0sXHJcblxyXG4gIG1ldGhvZHM6IHtcclxuICAgIG9uT3Blbl8odmFsdWUpIHtcclxuICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uLm9wZW4odHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyA/IHZhbHVlIDogdm9pZCAwKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm91bmRhdGlvbi5jbG9zZSgpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzaG93KG9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uLm9wZW4ob3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICB0aGlzLmZvdW5kYXRpb24uY2xvc2UoKVxyXG4gICAgfSxcclxuICAgIGlzT3BlbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZm91bmRhdGlvbiA/IHRoaXMuZm91bmRhdGlvbi5pc09wZW4oKSA6IGZhbHNlXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGxpIFxyXG4gICAgOnRhYmluZGV4PVwiZGlzYWJsZWQ/Jy0xJzonMCdcIiBcclxuICAgIDphcmlhLWRpc2FibGVkPVwiZGlzYWJsZWRcIiBcclxuICAgIGNsYXNzPVwibWRjLW1lbnUtaXRlbSBtZGMtbGlzdC1pdGVtXCJcclxuICAgIHJvbGU9XCJtZW51aXRlbVwiXHJcbiAgPlxyXG4gICAgPHNsb3QvPlxyXG4gIDwvbGk+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1tZW51LWl0ZW0nLFxyXG4gIHByb3BzOiB7XHJcbiAgICBkaXNhYmxlZDogQm9vbGVhblxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxsaSBcclxuICAgIHJvbGU9XCJzZXBhcmF0b3JcIiBcclxuICAgIGNsYXNzPVwibWRjLW1lbnUtZGl2aWRlciBtZGMtbGlzdC1kaXZpZGVyXCIvPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtbWVudS1kaXZpZGVyJ1xyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cIm1kYy1tZW51LWFuY2hvclwiPlxyXG4gICAgPHNsb3QvPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtbWVudS1hbmNob3InXHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsImltcG9ydCB7IEJhc2VQbHVnaW4gfSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgbWRjTWVudSBmcm9tICcuL21kYy1tZW51LnZ1ZSdcclxuaW1wb3J0IG1kY01lbnVJdGVtIGZyb20gJy4vbWRjLW1lbnUtaXRlbS52dWUnXHJcbmltcG9ydCBtZGNNZW51RGl2aWRlciBmcm9tICcuL21kYy1tZW51LWRpdmlkZXIudnVlJ1xyXG5pbXBvcnQgbWRjTWVudUFuY2hvciBmcm9tICcuL21kYy1tZW51LWFuY2hvci52dWUnXHJcblxyXG5leHBvcnQgeyBtZGNNZW51LCBtZGNNZW51SXRlbSwgbWRjTWVudURpdmlkZXIsIG1kY01lbnVBbmNob3IgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XHJcbiAgbWRjTWVudSxcclxuICBtZGNNZW51SXRlbSxcclxuICBtZGNNZW51RGl2aWRlcixcclxuICBtZGNNZW51QW5jaG9yXHJcbn0pXHJcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcclxuaW1wb3J0IHsgYXV0b0luaXQgfSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXHJcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxyXG5cclxuYXV0b0luaXQocGx1Z2luKVxyXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2ZXJzaW9uIiwiaW5zdGFsbCIsImtleSIsImNvbXBvbmVudCIsInZtIiwibmFtZSIsImVtaXRDdXN0b21FdmVudCIsImVsIiwiZXZ0VHlwZSIsImV2dERhdGEiLCJzaG91bGRCdWJibGUiLCJldnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImJ1YmJsZXMiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInNjb3BlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJNRENGb3VuZGF0aW9uIiwiYWRhcHRlciIsImFkYXB0ZXJfIiwiTURDTWVudUFkYXB0ZXIiLCJjbGFzc05hbWUiLCJ0YXJnZXQiLCJhdHRyaWJ1dGVOYW1lIiwidHlwZSIsImhhbmRsZXIiLCJpbmRleCIsIm9yaWdpbiIsInBvc2l0aW9uIiwiaGVpZ2h0IiwiYXR0ciIsInZhbHVlIiwiY3NzQ2xhc3NlcyIsIlJPT1QiLCJPUEVOIiwiQU5JTUFUSU5HX09QRU4iLCJBTklNQVRJTkdfQ0xPU0VEIiwiU0VMRUNURURfTElTVF9JVEVNIiwic3RyaW5ncyIsIklURU1TX1NFTEVDVE9SIiwiU0VMRUNURURfRVZFTlQiLCJDQU5DRUxfRVZFTlQiLCJBUklBX0RJU0FCTEVEX0FUVFIiLCJudW1iZXJzIiwiU0VMRUNURURfVFJJR0dFUl9ERUxBWSIsIlRSQU5TSVRJT05fT1BFTl9EVVJBVElPTiIsIlRSQU5TSVRJT05fQ0xPU0VfRFVSQVRJT04iLCJNQVJHSU5fVE9fRURHRSIsIkFOQ0hPUl9UT19NRU5VX1dJRFRIX1JBVElPIiwiT0ZGU0VUX1RPX01FTlVfSEVJR0hUX1JBVElPIiwiQ29ybmVyQml0IiwiQk9UVE9NIiwiQ0VOVEVSIiwiUklHSFQiLCJGTElQX1JUTCIsIkNvcm5lciIsIlRPUF9MRUZUIiwiVE9QX1JJR0hUIiwiQk9UVE9NX0xFRlQiLCJCT1RUT01fUklHSFQiLCJUT1BfU1RBUlQiLCJUT1BfRU5EIiwiQk9UVE9NX1NUQVJUIiwiQk9UVE9NX0VORCIsIk1EQ01lbnVGb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwiaGFzTmVjZXNzYXJ5RG9tIiwiZ2V0QXR0cmlidXRlRm9yRXZlbnRUYXJnZXQiLCJnZXRJbm5lckRpbWVuc2lvbnMiLCJoYXNBbmNob3IiLCJnZXRBbmNob3JEaW1lbnNpb25zIiwiZ2V0V2luZG93RGltZW5zaW9ucyIsImdldE51bWJlck9mSXRlbXMiLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlckJvZHlDbGlja0hhbmRsZXIiLCJkZXJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlciIsImdldEluZGV4Rm9yRXZlbnRUYXJnZXQiLCJub3RpZnlTZWxlY3RlZCIsIm5vdGlmeUNhbmNlbCIsInNhdmVGb2N1cyIsInJlc3RvcmVGb2N1cyIsImlzRm9jdXNlZCIsImZvY3VzIiwiZ2V0Rm9jdXNlZEl0ZW1JbmRleCIsImZvY3VzSXRlbUF0SW5kZXgiLCJpc1J0bCIsInNldFRyYW5zZm9ybU9yaWdpbiIsInNldFBvc2l0aW9uIiwic2V0TWF4SGVpZ2h0Iiwic2V0QXR0ckZvck9wdGlvbkF0SW5kZXgiLCJybUF0dHJGb3JPcHRpb25BdEluZGV4IiwiYWRkQ2xhc3NGb3JPcHRpb25BdEluZGV4Iiwicm1DbGFzc0Zvck9wdGlvbkF0SW5kZXgiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsImRlZmF1bHRBZGFwdGVyIiwiY2xpY2tIYW5kbGVyXyIsImhhbmRsZVBvc3NpYmxlU2VsZWN0ZWRfIiwia2V5ZG93bkhhbmRsZXJfIiwiaGFuZGxlS2V5Ym9hcmREb3duXyIsImtleXVwSGFuZGxlcl8iLCJoYW5kbGVLZXlib2FyZFVwXyIsImRvY3VtZW50Q2xpY2tIYW5kbGVyXyIsImhhbmRsZURvY3VtZW50Q2xpY2tfIiwiaXNPcGVuXyIsIm9wZW5BbmltYXRpb25FbmRUaW1lcklkXyIsImNsb3NlQW5pbWF0aW9uRW5kVGltZXJJZF8iLCJzZWxlY3RlZFRyaWdnZXJUaW1lcklkXyIsImFuaW1hdGlvblJlcXVlc3RJZF8iLCJkaW1lbnNpb25zXyIsIml0ZW1IZWlnaHRfIiwiYW5jaG9yQ29ybmVyXyIsImFuY2hvck1hcmdpbl8iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJtZWFzdXJlc18iLCJzZWxlY3RlZEluZGV4XyIsInJlbWVtYmVyU2VsZWN0aW9uXyIsInF1aWNrT3Blbl8iLCJrZXlEb3duV2l0aGluTWVudV8iLCJFcnJvciIsImNsZWFyVGltZW91dCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiY29ybmVyIiwibWFyZ2luIiwicmVtZW1iZXJTZWxlY3Rpb24iLCJzZXRTZWxlY3RlZEluZGV4IiwicXVpY2tPcGVuIiwiZm9jdXNJbmRleCIsImRvY3VtZW50RWxlbWVudCIsInBhcmVudE5vZGUiLCJjbG9zZSIsImFsdEtleSIsImN0cmxLZXkiLCJtZXRhS2V5Iiwia2V5Q29kZSIsInNoaWZ0S2V5IiwiaXNUYWIiLCJpc0Fycm93VXAiLCJpc0Fycm93RG93biIsImlzU3BhY2UiLCJpc0VudGVyIiwiZm9jdXNlZEl0ZW1JbmRleCIsImxhc3RJdGVtSW5kZXgiLCJwcmV2ZW50RGVmYXVsdCIsImlzRXNjYXBlIiwidGFyZ2V0SW5kZXgiLCJzZXRUaW1lb3V0IiwiYW5jaG9yUmVjdCIsInZpZXdwb3J0Iiwidmlld3BvcnREaXN0YW5jZSIsIndpZHRoIiwiYW5jaG9ySGVpZ2h0IiwiYW5jaG9yV2lkdGgiLCJtZW51SGVpZ2h0IiwibWVudVdpZHRoIiwiaXNCb3R0b21BbGlnbmVkIiwiQm9vbGVhbiIsImF2YWlsYWJsZVRvcCIsImF2YWlsYWJsZUJvdHRvbSIsInRvcE92ZXJmbG93IiwiYm90dG9tT3ZlcmZsb3ciLCJpc0ZsaXBSdGwiLCJhdm9pZEhvcml6b250YWxPdmVybGFwIiwiaXNBbGlnbmVkUmlnaHQiLCJhdmFpbGFibGVMZWZ0IiwiYXZhaWxhYmxlUmlnaHQiLCJsZWZ0T3ZlcmZsb3ciLCJyaWdodE92ZXJmbG93IiwiaXNSaWdodEFsaWduZWQiLCJ4IiwicmlnaHRPZmZzZXQiLCJsZWZ0T2Zmc2V0IiwiYXZvaWRWZXJ0aWNhbE92ZXJsYXAiLCJjYW5PdmVybGFwVmVydGljYWxseSIsInkiLCJtaW4iLCJtYXhIZWlnaHQiLCJnZXRBdXRvTGF5b3V0TWVhc3VyZW1lbnRzXyIsImdldE9yaWdpbkNvcm5lcl8iLCJtYXhNZW51SGVpZ2h0IiwiZ2V0TWVudU1heEhlaWdodF8iLCJ2ZXJ0aWNhbEFsaWdubWVudCIsImhvcml6b250YWxBbGlnbm1lbnQiLCJob3Jpem9udGFsT2Zmc2V0IiwiZ2V0SG9yaXpvbnRhbE9yaWdpbk9mZnNldF8iLCJ2ZXJ0aWNhbE9mZnNldCIsImdldFZlcnRpY2FsT3JpZ2luT2Zmc2V0XyIsImFicyIsInZlcnRpY2FsT2Zmc2V0UGVyY2VudCIsIm9yaWdpblBlcmNlbnQiLCJyb3VuZCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImF1dG9Qb3NpdGlvbl8iLCJmb2N1c09uT3Blbl8iLCJ0YXJnZXRJc0Rpc2FibGVkIiwicHJldlNlbGVjdGVkSW5kZXgiLCJzdG9yZWRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWVfIiwiZ2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lIiwiZ2xvYmFsT2JqIiwiZm9yY2VSZWZyZXNoIiwidW5kZWZpbmVkIiwiY3JlYXRlRWxlbWVudCIsInRyYW5zZm9ybVByb3BlcnR5TmFtZSIsInN0eWxlIiwibWRjTWVudSIsIm1kY01lbnVJdGVtIiwibWRjTWVudURpdmlkZXIiLCJtZGNNZW51QW5jaG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQU8sU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEI7SUFDL0I7SUFDQSxNQUFJQyxPQUFPLElBQVg7SUFDQSxNQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7SUFDakNELFdB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
