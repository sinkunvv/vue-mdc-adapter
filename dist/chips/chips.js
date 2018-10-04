/**
* @module vue-mdc-adapterchips 0.18.2
* @exports VueMDCChips
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCChips = factory());
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
     * Adapter for MDC Chip.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the Chip into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */
    var MDCChipAdapter = function () {
      function MDCChipAdapter() {
        classCallCheck(this, MDCChipAdapter);
      }

      createClass(MDCChipAdapter, [{
        key: "addClass",

        /**
         * Adds a class to the root element.
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
         * Returns true if the root element contains the given class.
         * @param {string} className
         * @return {boolean}
         */

      }, {
        key: "hasClass",
        value: function hasClass(className) {}

        /**
         * Adds a class to the leading icon element.
         * @param {string} className
         */

      }, {
        key: "addClassToLeadingIcon",
        value: function addClassToLeadingIcon(className) {}

        /**
         * Removes a class from the leading icon element.
         * @param {string} className
         */

      }, {
        key: "removeClassFromLeadingIcon",
        value: function removeClassFromLeadingIcon(className) {}

        /**
         * Returns true if target has className, false otherwise.
         * @param {!EventTarget} target
         * @param {string} className
         * @return {boolean}
         */

      }, {
        key: "eventTargetHasClass",
        value: function eventTargetHasClass(target, className) {}

        /**
         * Emits a custom "MDCChip:interaction" event denoting the chip has been
         * interacted with (typically on click or keydown).
         */

      }, {
        key: "notifyInteraction",
        value: function notifyInteraction() {}

        /**
         * Emits a custom "MDCChip:trailingIconInteraction" event denoting the trailing icon has been
         * interacted with (typically on click or keydown).
         */

      }, {
        key: "notifyTrailingIconInteraction",
        value: function notifyTrailingIconInteraction() {}

        /**
         * Emits a custom event "MDCChip:removal" denoting the chip will be removed.
         */

      }, {
        key: "notifyRemoval",
        value: function notifyRemoval() {}

        /**
         * Returns the computed property value of the given style property on the root element.
         * @param {string} propertyName
         * @return {string}
         */

      }, {
        key: "getComputedStyleValue",
        value: function getComputedStyleValue(propertyName) {}

        /**
         * Sets the property value of the given style property on the root element.
         * @param {string} propertyName
         * @param {string} value
         */

      }, {
        key: "setStyleProperty",
        value: function setStyleProperty(propertyName, value) {}
      }]);
      return MDCChipAdapter;
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
    var strings = {
      ENTRY_ANIMATION_NAME: 'mdc-chip-entry',
      INTERACTION_EVENT: 'MDCChip:interaction',
      TRAILING_ICON_INTERACTION_EVENT: 'MDCChip:trailingIconInteraction',
      REMOVAL_EVENT: 'MDCChip:removal',
      CHECKMARK_SELECTOR: '.mdc-chip__checkmark',
      LEADING_ICON_SELECTOR: '.mdc-chip__icon--leading',
      TRAILING_ICON_SELECTOR: '.mdc-chip__icon--trailing'
    };

    /** @enum {string} */
    var cssClasses = {
      CHECKMARK: 'mdc-chip__checkmark',
      CHIP_EXIT: 'mdc-chip--exit',
      HIDDEN_LEADING_ICON: 'mdc-chip__icon--leading-hidden',
      LEADING_ICON: 'mdc-chip__icon--leading',
      TRAILING_ICON: 'mdc-chip__icon--trailing',
      SELECTED: 'mdc-chip--selected'
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
     * @extends {MDCFoundation<!MDCChipAdapter>}
     * @final
     */

    var MDCChipFoundation = function (_MDCFoundation) {
      inherits(MDCChipFoundation, _MDCFoundation);
      createClass(MDCChipFoundation, null, [{
        key: 'strings',

        /** @return enum {string} */
        get: function get$$1() {
          return strings;
        }

        /** @return enum {string} */

      }, {
        key: 'cssClasses',
        get: function get$$1() {
          return cssClasses;
        }

        /**
         * {@see MDCChipAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCChipAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCChipAdapter} */{
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              hasClass: function hasClass() {},
              addClassToLeadingIcon: function addClassToLeadingIcon() {},
              removeClassFromLeadingIcon: function removeClassFromLeadingIcon() {},
              eventTargetHasClass: function eventTargetHasClass() {},
              notifyInteraction: function notifyInteraction() {},
              notifyTrailingIconInteraction: function notifyTrailingIconInteraction() {},
              notifyRemoval: function notifyRemoval() {},
              getComputedStyleValue: function getComputedStyleValue() {},
              setStyleProperty: function setStyleProperty() {}
            }
          );
        }

        /**
         * @param {!MDCChipAdapter} adapter
         */

      }]);

      function MDCChipFoundation(adapter) {
        classCallCheck(this, MDCChipFoundation);

        /**
         * Whether a trailing icon click should immediately trigger exit/removal of the chip.
         * @private {boolean}
         * */
        var _this = possibleConstructorReturn(this, (MDCChipFoundation.__proto__ || Object.getPrototypeOf(MDCChipFoundation)).call(this, _extends(MDCChipFoundation.defaultAdapter, adapter)));

        _this.shouldRemoveOnTrailingIconClick_ = true;
        return _this;
      }

      /**
       * @return {boolean}
       */


      createClass(MDCChipFoundation, [{
        key: 'isSelected',
        value: function isSelected() {
          return this.adapter_.hasClass(cssClasses.SELECTED);
        }

        /**
         * @param {boolean} selected
         */

      }, {
        key: 'setSelected',
        value: function setSelected(selected) {
          if (selected) {
            this.adapter_.addClass(cssClasses.SELECTED);
          } else {
            this.adapter_.removeClass(cssClasses.SELECTED);
          }
        }

        /**
         * @return {boolean}
         */

      }, {
        key: 'getShouldRemoveOnTrailingIconClick',
        value: function getShouldRemoveOnTrailingIconClick() {
          return this.shouldRemoveOnTrailingIconClick_;
        }

        /**
         * @param {boolean} shouldRemove
         */

      }, {
        key: 'setShouldRemoveOnTrailingIconClick',
        value: function setShouldRemoveOnTrailingIconClick(shouldRemove) {
          this.shouldRemoveOnTrailingIconClick_ = shouldRemove;
        }

        /**
         * Begins the exit animation which leads to removal of the chip.
         */

      }, {
        key: 'beginExit',
        value: function beginExit() {
          this.adapter_.addClass(cssClasses.CHIP_EXIT);
        }

        /**
         * Handles an interaction event on the root element.
         * @param {!Event} evt
         */

      }, {
        key: 'handleInteraction',
        value: function handleInteraction(evt) {
          if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
            this.adapter_.notifyInteraction();
          }
        }

        /**
         * Handles a transition end event on the root element.
         * @param {!Event} evt
         */

      }, {
        key: 'handleTransitionEnd',
        value: function handleTransitionEnd(evt) {
          var _this2 = this;

          // Handle transition end event on the chip when it is about to be removed.
          if (this.adapter_.eventTargetHasClass( /** @type {!EventTarget} */evt.target, cssClasses.CHIP_EXIT)) {
            if (evt.propertyName === 'width') {
              this.adapter_.notifyRemoval();
            } else if (evt.propertyName === 'opacity') {
              // See: https://css-tricks.com/using-css-transitions-auto-dimensions/#article-header-id-5
              var chipWidth = this.adapter_.getComputedStyleValue('width');

              // On the next frame (once we get the computed width), explicitly set the chip's width
              // to its current pixel width, so we aren't transitioning out of 'auto'.
              requestAnimationFrame(function () {
                _this2.adapter_.setStyleProperty('width', chipWidth);

                // To mitigate jitter, start transitioning padding and margin before width.
                _this2.adapter_.setStyleProperty('padding', '0');
                _this2.adapter_.setStyleProperty('margin', '0');

                // On the next frame (once width is explicitly set), transition width to 0.
                requestAnimationFrame(function () {
                  _this2.adapter_.setStyleProperty('width', '0');
                });
              });
            }
            return;
          }

          // Handle a transition end event on the leading icon or checkmark, since the transition end event bubbles.
          if (evt.propertyName !== 'opacity') {
            return;
          }
          if (this.adapter_.eventTargetHasClass( /** @type {!EventTarget} */evt.target, cssClasses.LEADING_ICON) && this.adapter_.hasClass(cssClasses.SELECTED)) {
            this.adapter_.addClassToLeadingIcon(cssClasses.HIDDEN_LEADING_ICON);
          } else if (this.adapter_.eventTargetHasClass( /** @type {!EventTarget} */evt.target, cssClasses.CHECKMARK) && !this.adapter_.hasClass(cssClasses.SELECTED)) {
            this.adapter_.removeClassFromLeadingIcon(cssClasses.HIDDEN_LEADING_ICON);
          }
        }

        /**
         * Handles an interaction event on the trailing icon element. This is used to
         * prevent the ripple from activating on interaction with the trailing icon.
         * @param {!Event} evt
         */

      }, {
        key: 'handleTrailingIconInteraction',
        value: function handleTrailingIconInteraction(evt) {
          evt.stopPropagation();
          if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
            this.adapter_.notifyTrailingIconInteraction();
            if (this.shouldRemoveOnTrailingIconClick_) {
              this.beginExit();
            }
          }
        }
      }]);
      return MDCChipFoundation;
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
      name: 'mdc-chip',
      mixins: [CustomLinkMixin],
      props: {
        leadingIcon: [String],
        trailingIcon: [String],
        leadingIconClasses: [Object],
        trailingIconClasses: [Object]
      },
      inject: ['mdcChipSet'],
      data: function data() {
        return {
          classes: {
            'mdc-chip': true
          },
          styles: {}
        };
      },

      computed: {
        isFilter: function isFilter() {
          return this.mdcChipSet && this.mdcChipSet.filter;
        },
        haveleadingIcon: function haveleadingIcon() {
          return !!this.leadingIcon || this.leadingIconClasses;
        },
        havetrailingIcon: function havetrailingIcon() {
          return !!this.trailingIcon || this.trailingIconClasses;
        },
        leadingClasses: function leadingClasses() {
          return _extends({}, {
            'material-icons': !!this.leadingIcon
          }, this.leadingIconClasses);
        },
        trailingClasses: function trailingClasses() {
          return _extends({}, {
            'material-icons': !!this.trailingIcon
          }, this.trailingIconClasses);
        }
      },
      mounted: function mounted() {
        var _this = this;

        this.foundation = new MDCChipFoundation({
          addClass: function addClass(className) {
            return _this.$set(_this.classes, className, true);
          },
          removeClass: function removeClass(className) {
            return _this.$delete(_this.classes, className);
          },
          hasClass: function hasClass(className) {
            return _this.$el.classList.contains(className);
          },
          addClassToLeadingIcon: function addClassToLeadingIcon(className) {
            if (_this.haveleadingIcon) {
              _this.$refs.leadingIcon.classList.add(className);
            }
          },
          removeClassFromLeadingIcon: function removeClassFromLeadingIcon(className) {
            if (_this.haveleadingIcon) {
              _this.$refs.leadingIcon.classList.remove(className);
            }
          },
          eventTargetHasClass: function eventTargetHasClass(target, className) {
            return target.classList.contains(className);
          },
          notifyInteraction: function notifyInteraction() {
            emitCustomEvent(_this.$el, MDCChipFoundation.strings.INTERACTION_EVENT, {
              chip: _this
            }, true);
            _this.mdcChipSet && _this.mdcChipSet.handleInteraction;
          },
          notifyTrailingIconInteraction: function notifyTrailingIconInteraction() {
            emitCustomEvent(_this.$el, MDCChipFoundation.strings.TRAILING_ICON_INTERACTION_EVENT, {
              chip: _this
            }, true);
          },
          notifyRemoval: function notifyRemoval() {
            emitCustomEvent(_this.$el, MDCChipFoundation.strings.REMOVAL_EVENT, { chip: _this }, true);
          },
          getComputedStyleValue: function getComputedStyleValue(propertyName) {
            return window.getComputedStyle(_this.$el).getPropertyValue(propertyName);
          },
          setStyleProperty: function setStyleProperty(property, value) {
            return _this.$set(_this.styles, property, value);
          }
        });

        this.foundation.init();

        this.ripple = new RippleBase(this);
        this.ripple.init();
      },
      beforeDestroy: function beforeDestroy() {
        this.ripple.destroy();
        this.foundation.destroy();
      },

      methods: {
        handleInteraction: function handleInteraction(evt) {
          this.foundation.handleInteraction(evt);
        },
        handleTransitionEnd: function handleTransitionEnd(evt) {
          this.foundation.handleTransitionEnd(evt);
        },
        handleTrailingIconInteraction: function handleTrailingIconInteraction(evt) {
          this.foundation.handleTrailingIconInteraction(evt);
        },
        toggleSelected: function toggleSelected() {
          this.foundation.toggleSelected();
        },
        isSelected: function isSelected() {
          return this.foundation.isSelected();
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
      return _c("div", {
        class: _vm.classes,
        style: _vm.styles,
        attrs: { tabindex: "0" },
        on: {
          click: _vm.handleInteraction,
          keydown: _vm.handleInteraction,
          transitionend: _vm.handleTransitionEnd
        }
      }, [_vm.haveleadingIcon ? _c("i", {
        ref: "leadingIcon",
        staticClass: "mdc-chip__icon mdc-chip__icon--leading",
        class: _vm.leadingClasses
      }, [_vm._v(_vm._s(_vm.leadingIcon))]) : _vm._e(), _vm._v(" "), _vm.isFilter ? _c("div", { staticClass: "mdc-chip__checkmark" }, [_c("svg", {
        staticClass: "mdc-chip__checkmark-svg",
        attrs: { viewBox: "-2 -3 30 30" }
      }, [_c("path", {
        staticClass: "mdc-chip__checkmark-path",
        attrs: {
          fill: "none",
          stroke: "black",
          d: "M1.73,12.91 8.1,19.28 22.79,4.59"
        }
      })])]) : _vm._e(), _vm._v(" "), _c("div", { staticClass: "mdc-chip__text" }, [_vm._t("default")], 2), _vm._v(" "), _vm.havetrailingIcon ? _c("i", {
        ref: "trailingIcon",
        staticClass: "mdc-chip__icon mdc-chip__icon--trailing",
        class: _vm.trailingClasses,
        attrs: { tabindex: "0", role: "button" },
        on: {
          click: _vm.handleTrailingIconInteraction,
          keydown: _vm.handleTrailingIconInteraction
        }
      }, [_vm._v(_vm._s(_vm.trailingIcon))]) : _vm._e()]);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\chips\\mdc-chip.vue";

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

    var mdcChip = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

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
     * Adapter for MDC Chip Set.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the Chip Set into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */

    var MDCChipSetAdapter = function () {
      function MDCChipSetAdapter() {
        classCallCheck(this, MDCChipSetAdapter);
      }

      createClass(MDCChipSetAdapter, [{
        key: 'hasClass',

        /**
         * Returns true if the root element contains the given class name.
         * @param {string} className
         * @return {boolean}
         */
        value: function hasClass(className) {}

        /**
         * Removes the chip object from the chip set.
         * @param {!Object} chip
         */

      }, {
        key: 'removeChip',
        value: function removeChip(chip) {}
      }]);
      return MDCChipSetAdapter;
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
    var strings$2 = {
      CHIP_SELECTOR: '.mdc-chip'
    };

    /** @enum {string} */
    var cssClasses$2 = {
      CHOICE: 'mdc-chip-set--choice',
      FILTER: 'mdc-chip-set--filter'
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
     * @extends {MDCFoundation<!MDCChipSetAdapter>}
     * @final
     */

    var MDCChipSetFoundation = function (_MDCFoundation) {
      inherits(MDCChipSetFoundation, _MDCFoundation);
      createClass(MDCChipSetFoundation, null, [{
        key: 'strings',

        /** @return enum {string} */
        get: function get$$1() {
          return strings$2;
        }

        /** @return enum {string} */

      }, {
        key: 'cssClasses',
        get: function get$$1() {
          return cssClasses$2;
        }

        /**
         * {@see MDCChipSetAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCChipSetAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCChipSetAdapter} */{
              hasClass: function hasClass() {},
              removeChip: function removeChip() {}
            }
          );
        }

        /**
         * @param {!MDCChipSetAdapter} adapter
         */

      }]);

      function MDCChipSetFoundation(adapter) {
        classCallCheck(this, MDCChipSetFoundation);

        /**
         * The selected chips in the set. Only used for choice chip set or filter chip set.
         * @private {!Array<!MDCChipFoundation>}
         */
        var _this = possibleConstructorReturn(this, (MDCChipSetFoundation.__proto__ || Object.getPrototypeOf(MDCChipSetFoundation)).call(this, _extends(MDCChipSetFoundation.defaultAdapter, adapter)));

        _this.selectedChips_ = [];
        return _this;
      }

      /**
       * Selects the given chip. Deselects all other chips if the chip set is of the choice variant.
       * @param {!MDCChipFoundation} chipFoundation
       */


      createClass(MDCChipSetFoundation, [{
        key: 'select',
        value: function select(chipFoundation) {
          if (this.adapter_.hasClass(cssClasses$2.CHOICE)) {
            this.deselectAll_();
          }
          chipFoundation.setSelected(true);
          this.selectedChips_.push(chipFoundation);
        }

        /**
         * Deselects the given chip.
         * @param {!MDCChipFoundation} chipFoundation
         */

      }, {
        key: 'deselect',
        value: function deselect(chipFoundation) {
          var index = this.selectedChips_.indexOf(chipFoundation);
          if (index >= 0) {
            this.selectedChips_.splice(index, 1);
          }
          chipFoundation.setSelected(false);
        }

        /** Deselects all selected chips. */

      }, {
        key: 'deselectAll_',
        value: function deselectAll_() {
          this.selectedChips_.forEach(function (chipFoundation) {
            chipFoundation.setSelected(false);
          });
          this.selectedChips_.length = 0;
        }

        /**
         * Handles a chip interaction event
         * @param {!MDCChipInteractionEventType} evt
         * @private
         */

      }, {
        key: 'handleChipInteraction',
        value: function handleChipInteraction(evt) {
          var chipFoundation = evt.detail.chip.foundation;
          if (this.adapter_.hasClass(cssClasses$2.CHOICE) || this.adapter_.hasClass(cssClasses$2.FILTER)) {
            if (chipFoundation.isSelected()) {
              this.deselect(chipFoundation);
            } else {
              this.select(chipFoundation);
            }
          }
        }

        /**
         * Handles the event when a chip is removed.
         * @param {!MDCChipInteractionEventType} evt
         * @private
         */

      }, {
        key: 'handleChipRemoval',
        value: function handleChipRemoval(evt) {
          var chip = evt.detail.chip;

          this.deselect(chip.foundation);
          this.adapter_.removeChip(chip);
        }
      }]);
      return MDCChipSetFoundation;
    }(MDCFoundation);

    //

    var script$2 = {
      name: 'mdc-chip-set',
      props: {
        choice: [Boolean],
        filter: [Boolean],
        input: [Boolean]
      },
      provide: function provide() {
        return { mdcChipSet: this };
      },
      data: function data() {
        return {
          classes: {
            'mdc-chip-set': true,
            'mdc-chip-set--choice': this.choice,
            'mdc-chip-set--filter': this.filter,
            'mdc-chip-set--input': this.input
          }
        };
      },
      mounted: function mounted() {
        var _this = this;

        this.foundation = new MDCChipSetFoundation({
          hasClass: function hasClass(className) {
            return _this.$el.classList.contains(className);
          },
          removeChip: function removeChip(chip) {
            // TODO: may need refactoring
            _this.$nextTick(function () {
              return chip.$destroy();
            });
          }
        });

        this.foundation.init();
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation.destroy();
      },

      methods: {
        handleChipInteraction: function handleChipInteraction(evt) {
          this.foundation.handleChipInteraction(evt);
        },
        handleChipRemoval: function handleChipRemoval(evt) {
          this.foundation.handleChipRemoval(evt);
        }
      },
      render: function render(h) {
        var _this2 = this,
            _on;

        return h('div', {
          class: this.classes,
          on: (_on = {}, defineProperty(_on, MDCChipFoundation.strings.INTERACTION_EVENT, function (evt) {
            return _this2.handleChipInteraction(evt);
          }), defineProperty(_on, MDCChipFoundation.strings.REMOVAL_EVENT, function (evt) {
            return _this2.handleChipRemoval(evt);
          }), _on)
        }, this.$slots.default);
      }
    };

    /* script */
    var __vue_script__$2 = script$2;

    /* template */

    /* style */
    var __vue_inject_styles__$2 = undefined;
    /* scoped */
    var __vue_scope_id__$2 = undefined;
    /* module identifier */
    var __vue_module_identifier__$2 = undefined;
    /* functional template */
    var __vue_is_functional_template__$2 = undefined;
    /* component normalizer */
    function __vue_normalize__$2(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\chips\\mdc-chip-set.vue";

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

    var mdcChipSet = __vue_normalize__$2({}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, __vue_create_injector__$2, undefined);

    var plugin = BasePlugin({
      mdcChip: mdcChip,
      mdcChipSet: mdcChipSet
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWVsZW1lbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWxpbmsuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2NoaXBzL2NoaXAvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvY2hpcHMvY2hpcC9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2NoaXBzL2NoaXAvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS91dGlsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvcmlwcGxlL21kYy1yaXBwbGUtYmFzZS5qcyIsIi4uLy4uL2NvbXBvbmVudHMvcmlwcGxlL21kYy1yaXBwbGUudnVlIiwiLi4vLi4vY29tcG9uZW50cy9jaGlwcy9tZGMtY2hpcC52dWUiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2NoaXBzL2NoaXAtc2V0L2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2NoaXBzL2NoaXAtc2V0L2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvY2hpcHMvY2hpcC1zZXQvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvY2hpcHMvbWRjLWNoaXAtc2V0LnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvY2hpcHMvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL2NoaXBzL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdChwbHVnaW4pIHtcclxuICAvLyBBdXRvLWluc3RhbGxcclxuICBsZXQgX1Z1ZSA9IG51bGxcclxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIF9WdWUgPSB3aW5kb3cuVnVlXHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cclxuICAgIF9WdWUgPSBnbG9iYWwuVnVlXHJcbiAgfVxyXG4gIGlmIChfVnVlKSB7XHJcbiAgICBfVnVlLnVzZShwbHVnaW4pXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luKGNvbXBvbmVudHMpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcclxuICAgIGluc3RhbGw6IHZtID0+IHtcclxuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXHJcbiAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRzXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBDdXN0b21FbGVtZW50ID0ge1xyXG4gIGZ1bmN0aW9uYWw6IHRydWUsXHJcbiAgcmVuZGVyKGNyZWF0ZUVsZW1lbnQsIGNvbnRleHQpIHtcclxuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFxyXG4gICAgICBjb250ZXh0LnByb3BzLmlzIHx8IGNvbnRleHQucHJvcHMudGFnIHx8ICdkaXYnLFxyXG4gICAgICBjb250ZXh0LmRhdGEsXHJcbiAgICAgIGNvbnRleHQuY2hpbGRyZW5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBDdXN0b21FbGVtZW50TWl4aW4gPSB7XHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgQ3VzdG9tRWxlbWVudFxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgQ3VzdG9tTGluayA9IHtcclxuICBuYW1lOiAnY3VzdG9tLWxpbmsnLFxyXG4gIGZ1bmN0aW9uYWw6IHRydWUsXHJcbiAgcHJvcHM6IHtcclxuICAgIHRhZzogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICdhJyB9LFxyXG4gICAgbGluazogT2JqZWN0XHJcbiAgfSxcclxuICByZW5kZXIoaCwgY29udGV4dCkge1xyXG4gICAgbGV0IGVsZW1lbnRcclxuICAgIGxldCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGV4dC5kYXRhKVxyXG5cclxuICAgIGlmIChjb250ZXh0LnByb3BzLmxpbmsgJiYgY29udGV4dC5wYXJlbnQuJHJvdXRlcikge1xyXG4gICAgICAvLyByb3V0ZXItbGluayBjYXNlXHJcbiAgICAgIGVsZW1lbnQgPSBjb250ZXh0LnBhcmVudC4kcm9vdC4kb3B0aW9ucy5jb21wb25lbnRzWydyb3V0ZXItbGluayddXHJcbiAgICAgIGRhdGEucHJvcHMgPSBPYmplY3QuYXNzaWduKHsgdGFnOiBjb250ZXh0LnByb3BzLnRhZyB9LCBjb250ZXh0LnByb3BzLmxpbmspXHJcbiAgICAgIGlmIChkYXRhLm9uLmNsaWNrKSB7XHJcbiAgICAgICAgZGF0YS5uYXRpdmVPbiA9IHsgY2xpY2s6IGRhdGEub24uY2xpY2sgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBlbGVtZW50IGZhbGxiYWNrXHJcbiAgICAgIGVsZW1lbnQgPSBjb250ZXh0LnByb3BzLnRhZ1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBoKGVsZW1lbnQsIGRhdGEsIGNvbnRleHQuY2hpbGRyZW4pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ3VzdG9tTGlua01peGluID0ge1xyXG4gIHByb3BzOiB7XHJcbiAgICB0bzogW1N0cmluZywgT2JqZWN0XSxcclxuICAgIGV4YWN0OiBCb29sZWFuLFxyXG4gICAgYXBwZW5kOiBCb29sZWFuLFxyXG4gICAgcmVwbGFjZTogQm9vbGVhbixcclxuICAgIGFjdGl2ZUNsYXNzOiBTdHJpbmcsXHJcbiAgICBleGFjdEFjdGl2ZUNsYXNzOiBTdHJpbmdcclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICBsaW5rKCkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIHRoaXMudG8gJiYge1xyXG4gICAgICAgICAgdG86IHRoaXMudG8sXHJcbiAgICAgICAgICBleGFjdDogdGhpcy5leGFjdCxcclxuICAgICAgICAgIGFwcGVuZDogdGhpcy5hcHBlbmQsXHJcbiAgICAgICAgICByZXBsYWNlOiB0aGlzLnJlcGxhY2UsXHJcbiAgICAgICAgICBhY3RpdmVDbGFzczogdGhpcy5hY3RpdmVDbGFzcyxcclxuICAgICAgICAgIGV4YWN0QWN0aXZlQ2xhc3M6IHRoaXMuZXhhY3RBY3RpdmVDbGFzc1xyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgQ3VzdG9tTGlua1xyXG4gIH1cclxufVxyXG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XHJcbiAgbGV0IGV2dFxyXG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XHJcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcclxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXHJcbiAgICB9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxyXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxyXG4gIH1cclxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcclxufVxyXG4iLCJjb25zdCBzY29wZSA9XHJcbiAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcigweDEwMDAwMDAwKSkudG9TdHJpbmcoKSArICctJ1xyXG5cclxuZXhwb3J0IGNvbnN0IFZNQVVuaXF1ZUlkTWl4aW4gPSB7XHJcbiAgYmVmb3JlQ3JlYXRlKCkge1xyXG4gICAgdGhpcy52bWFfdWlkXyA9IHNjb3BlICsgdGhpcy5fdWlkXHJcbiAgfVxyXG59XHJcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIENoaXAuXG4gKlxuICogRGVmaW5lcyB0aGUgc2hhcGUgb2YgdGhlIGFkYXB0ZXIgZXhwZWN0ZWQgYnkgdGhlIGZvdW5kYXRpb24uIEltcGxlbWVudCB0aGlzXG4gKiBhZGFwdGVyIHRvIGludGVncmF0ZSB0aGUgQ2hpcCBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDQ2hpcEFkYXB0ZXIge1xuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSByb290IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHJvb3QgZWxlbWVudCBjb250YWlucyB0aGUgZ2l2ZW4gY2xhc3MuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc0NsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSBsZWFkaW5nIGljb24gZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3NUb0xlYWRpbmdJY29uKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIGxlYWRpbmcgaWNvbiBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzc0Zyb21MZWFkaW5nSWNvbihjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0YXJnZXQgaGFzIGNsYXNzTmFtZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcGFyYW0geyFFdmVudFRhcmdldH0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGV2ZW50VGFyZ2V0SGFzQ2xhc3ModGFyZ2V0LCBjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGEgY3VzdG9tIFwiTURDQ2hpcDppbnRlcmFjdGlvblwiIGV2ZW50IGRlbm90aW5nIHRoZSBjaGlwIGhhcyBiZWVuXG4gICAqIGludGVyYWN0ZWQgd2l0aCAodHlwaWNhbGx5IG9uIGNsaWNrIG9yIGtleWRvd24pLlxuICAgKi9cbiAgbm90aWZ5SW50ZXJhY3Rpb24oKSB7fVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhIGN1c3RvbSBcIk1EQ0NoaXA6dHJhaWxpbmdJY29uSW50ZXJhY3Rpb25cIiBldmVudCBkZW5vdGluZyB0aGUgdHJhaWxpbmcgaWNvbiBoYXMgYmVlblxuICAgKiBpbnRlcmFjdGVkIHdpdGggKHR5cGljYWxseSBvbiBjbGljayBvciBrZXlkb3duKS5cbiAgICovXG4gIG5vdGlmeVRyYWlsaW5nSWNvbkludGVyYWN0aW9uKCkge31cblxuICAvKipcbiAgICogRW1pdHMgYSBjdXN0b20gZXZlbnQgXCJNRENDaGlwOnJlbW92YWxcIiBkZW5vdGluZyB0aGUgY2hpcCB3aWxsIGJlIHJlbW92ZWQuXG4gICAqL1xuICBub3RpZnlSZW1vdmFsKCkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29tcHV0ZWQgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIHN0eWxlIHByb3BlcnR5IG9uIHRoZSByb290IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlKHByb3BlcnR5TmFtZSkge31cblxuICAvKipcbiAgICogU2V0cyB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIHN0eWxlIHByb3BlcnR5IG9uIHRoZSByb290IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqL1xuICBzZXRTdHlsZVByb3BlcnR5KHByb3BlcnR5TmFtZSwgdmFsdWUpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0NoaXBBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3Qgc3RyaW5ncyA9IHtcbiAgRU5UUllfQU5JTUFUSU9OX05BTUU6ICdtZGMtY2hpcC1lbnRyeScsXG4gIElOVEVSQUNUSU9OX0VWRU5UOiAnTURDQ2hpcDppbnRlcmFjdGlvbicsXG4gIFRSQUlMSU5HX0lDT05fSU5URVJBQ1RJT05fRVZFTlQ6ICdNRENDaGlwOnRyYWlsaW5nSWNvbkludGVyYWN0aW9uJyxcbiAgUkVNT1ZBTF9FVkVOVDogJ01EQ0NoaXA6cmVtb3ZhbCcsXG4gIENIRUNLTUFSS19TRUxFQ1RPUjogJy5tZGMtY2hpcF9fY2hlY2ttYXJrJyxcbiAgTEVBRElOR19JQ09OX1NFTEVDVE9SOiAnLm1kYy1jaGlwX19pY29uLS1sZWFkaW5nJyxcbiAgVFJBSUxJTkdfSUNPTl9TRUxFQ1RPUjogJy5tZGMtY2hpcF9faWNvbi0tdHJhaWxpbmcnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBDSEVDS01BUks6ICdtZGMtY2hpcF9fY2hlY2ttYXJrJyxcbiAgQ0hJUF9FWElUOiAnbWRjLWNoaXAtLWV4aXQnLFxuICBISURERU5fTEVBRElOR19JQ09OOiAnbWRjLWNoaXBfX2ljb24tLWxlYWRpbmctaGlkZGVuJyxcbiAgTEVBRElOR19JQ09OOiAnbWRjLWNoaXBfX2ljb24tLWxlYWRpbmcnLFxuICBUUkFJTElOR19JQ09OOiAnbWRjLWNoaXBfX2ljb24tLXRyYWlsaW5nJyxcbiAgU0VMRUNURUQ6ICdtZGMtY2hpcC0tc2VsZWN0ZWQnLFxufTtcblxuZXhwb3J0IHtzdHJpbmdzLCBjc3NDbGFzc2VzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENDaGlwQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtzdHJpbmdzLCBjc3NDbGFzc2VzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDQ2hpcEFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ0NoaXBGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKipcbiAgICoge0BzZWUgTURDQ2hpcEFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDQ2hpcEFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENDaGlwQWRhcHRlcn0gKi8gKHtcbiAgICAgIGFkZENsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoKSA9PiB7fSxcbiAgICAgIGhhc0NsYXNzOiAoKSA9PiB7fSxcbiAgICAgIGFkZENsYXNzVG9MZWFkaW5nSWNvbjogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzc0Zyb21MZWFkaW5nSWNvbjogKCkgPT4ge30sXG4gICAgICBldmVudFRhcmdldEhhc0NsYXNzOiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeUludGVyYWN0aW9uOiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeVRyYWlsaW5nSWNvbkludGVyYWN0aW9uOiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeVJlbW92YWw6ICgpID0+IHt9LFxuICAgICAgZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlOiAoKSA9PiB7fSxcbiAgICAgIHNldFN0eWxlUHJvcGVydHk6ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ0NoaXBBZGFwdGVyfSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENDaGlwRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBhIHRyYWlsaW5nIGljb24gY2xpY2sgc2hvdWxkIGltbWVkaWF0ZWx5IHRyaWdnZXIgZXhpdC9yZW1vdmFsIG9mIHRoZSBjaGlwLlxuICAgICAqIEBwcml2YXRlIHtib29sZWFufVxuICAgICAqICovXG4gICAgdGhpcy5zaG91bGRSZW1vdmVPblRyYWlsaW5nSWNvbkNsaWNrXyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzU2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5TRUxFQ1RFRCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZFxuICAgKi9cbiAgc2V0U2VsZWN0ZWQoc2VsZWN0ZWQpIHtcbiAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5TRUxFQ1RFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5TRUxFQ1RFRCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBnZXRTaG91bGRSZW1vdmVPblRyYWlsaW5nSWNvbkNsaWNrKCkge1xuICAgIHJldHVybiB0aGlzLnNob3VsZFJlbW92ZU9uVHJhaWxpbmdJY29uQ2xpY2tfO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkUmVtb3ZlXG4gICAqL1xuICBzZXRTaG91bGRSZW1vdmVPblRyYWlsaW5nSWNvbkNsaWNrKHNob3VsZFJlbW92ZSkge1xuICAgIHRoaXMuc2hvdWxkUmVtb3ZlT25UcmFpbGluZ0ljb25DbGlja18gPSBzaG91bGRSZW1vdmU7XG4gIH1cblxuICAvKipcbiAgICogQmVnaW5zIHRoZSBleGl0IGFuaW1hdGlvbiB3aGljaCBsZWFkcyB0byByZW1vdmFsIG9mIHRoZSBjaGlwLlxuICAgKi9cbiAgYmVnaW5FeGl0KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5DSElQX0VYSVQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYW4gaW50ZXJhY3Rpb24gZXZlbnQgb24gdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKi9cbiAgaGFuZGxlSW50ZXJhY3Rpb24oZXZ0KSB7XG4gICAgaWYgKGV2dC50eXBlID09PSAnY2xpY2snIHx8IGV2dC5rZXkgPT09ICdFbnRlcicgfHwgZXZ0LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUludGVyYWN0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSB0cmFuc2l0aW9uIGVuZCBldmVudCBvbiB0aGUgcm9vdCBlbGVtZW50LlxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqL1xuICBoYW5kbGVUcmFuc2l0aW9uRW5kKGV2dCkge1xuICAgIC8vIEhhbmRsZSB0cmFuc2l0aW9uIGVuZCBldmVudCBvbiB0aGUgY2hpcCB3aGVuIGl0IGlzIGFib3V0IHRvIGJlIHJlbW92ZWQuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uZXZlbnRUYXJnZXRIYXNDbGFzcygvKiogQHR5cGUgeyFFdmVudFRhcmdldH0gKi8gKGV2dC50YXJnZXQpLCBjc3NDbGFzc2VzLkNISVBfRVhJVCkpIHtcbiAgICAgIGlmIChldnQucHJvcGVydHlOYW1lID09PSAnd2lkdGgnKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5UmVtb3ZhbCgpO1xuICAgICAgfSBlbHNlIGlmIChldnQucHJvcGVydHlOYW1lID09PSAnb3BhY2l0eScpIHtcbiAgICAgICAgLy8gU2VlOiBodHRwczovL2Nzcy10cmlja3MuY29tL3VzaW5nLWNzcy10cmFuc2l0aW9ucy1hdXRvLWRpbWVuc2lvbnMvI2FydGljbGUtaGVhZGVyLWlkLTVcbiAgICAgICAgY29uc3QgY2hpcFdpZHRoID0gdGhpcy5hZGFwdGVyXy5nZXRDb21wdXRlZFN0eWxlVmFsdWUoJ3dpZHRoJyk7XG5cbiAgICAgICAgLy8gT24gdGhlIG5leHQgZnJhbWUgKG9uY2Ugd2UgZ2V0IHRoZSBjb21wdXRlZCB3aWR0aCksIGV4cGxpY2l0bHkgc2V0IHRoZSBjaGlwJ3Mgd2lkdGhcbiAgICAgICAgLy8gdG8gaXRzIGN1cnJlbnQgcGl4ZWwgd2lkdGgsIHNvIHdlIGFyZW4ndCB0cmFuc2l0aW9uaW5nIG91dCBvZiAnYXV0bycuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hZGFwdGVyXy5zZXRTdHlsZVByb3BlcnR5KCd3aWR0aCcsIGNoaXBXaWR0aCk7XG5cbiAgICAgICAgICAvLyBUbyBtaXRpZ2F0ZSBqaXR0ZXIsIHN0YXJ0IHRyYW5zaXRpb25pbmcgcGFkZGluZyBhbmQgbWFyZ2luIGJlZm9yZSB3aWR0aC5cbiAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlUHJvcGVydHkoJ3BhZGRpbmcnLCAnMCcpO1xuICAgICAgICAgIHRoaXMuYWRhcHRlcl8uc2V0U3R5bGVQcm9wZXJ0eSgnbWFyZ2luJywgJzAnKTtcblxuICAgICAgICAgIC8vIE9uIHRoZSBuZXh0IGZyYW1lIChvbmNlIHdpZHRoIGlzIGV4cGxpY2l0bHkgc2V0KSwgdHJhbnNpdGlvbiB3aWR0aCB0byAwLlxuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlUHJvcGVydHkoJ3dpZHRoJywgJzAnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGEgdHJhbnNpdGlvbiBlbmQgZXZlbnQgb24gdGhlIGxlYWRpbmcgaWNvbiBvciBjaGVja21hcmssIHNpbmNlIHRoZSB0cmFuc2l0aW9uIGVuZCBldmVudCBidWJibGVzLlxuICAgIGlmIChldnQucHJvcGVydHlOYW1lICE9PSAnb3BhY2l0eScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uZXZlbnRUYXJnZXRIYXNDbGFzcygvKiogQHR5cGUgeyFFdmVudFRhcmdldH0gKi8gKGV2dC50YXJnZXQpLCBjc3NDbGFzc2VzLkxFQURJTkdfSUNPTikgJiZcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLlNFTEVDVEVEKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzc1RvTGVhZGluZ0ljb24oY3NzQ2xhc3Nlcy5ISURERU5fTEVBRElOR19JQ09OKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWRhcHRlcl8uZXZlbnRUYXJnZXRIYXNDbGFzcygvKiogQHR5cGUgeyFFdmVudFRhcmdldH0gKi8gKGV2dC50YXJnZXQpLCBjc3NDbGFzc2VzLkNIRUNLTUFSSykgJiZcbiAgICAgICAgICAgICAgICF0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuU0VMRUNURUQpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzRnJvbUxlYWRpbmdJY29uKGNzc0NsYXNzZXMuSElEREVOX0xFQURJTkdfSUNPTik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYW4gaW50ZXJhY3Rpb24gZXZlbnQgb24gdGhlIHRyYWlsaW5nIGljb24gZWxlbWVudC4gVGhpcyBpcyB1c2VkIHRvXG4gICAqIHByZXZlbnQgdGhlIHJpcHBsZSBmcm9tIGFjdGl2YXRpbmcgb24gaW50ZXJhY3Rpb24gd2l0aCB0aGUgdHJhaWxpbmcgaWNvbi5cbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKi9cbiAgaGFuZGxlVHJhaWxpbmdJY29uSW50ZXJhY3Rpb24oZXZ0KSB7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmIChldnQudHlwZSA9PT0gJ2NsaWNrJyB8fCBldnQua2V5ID09PSAnRW50ZXInIHx8IGV2dC5rZXlDb2RlID09PSAxMykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlUcmFpbGluZ0ljb25JbnRlcmFjdGlvbigpO1xuICAgICAgaWYgKHRoaXMuc2hvdWxkUmVtb3ZlT25UcmFpbGluZ0ljb25DbGlja18pIHtcbiAgICAgICAgdGhpcy5iZWdpbkV4aXQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBkZXRhaWw6IHtcbiAqICAgICBjaGlwOiB7Zm91bmRhdGlvbjogIU1EQ0NoaXBGb3VuZGF0aW9ufSxcbiAqICAgfSxcbiAqICAgYnViYmxlczogYm9vbGVhbixcbiAqIH19XG4gKi9cbmxldCBNRENDaGlwSW50ZXJhY3Rpb25FdmVudFR5cGU7XG5cbmV4cG9ydCB7TURDQ2hpcEZvdW5kYXRpb24sIE1EQ0NoaXBJbnRlcmFjdGlvbkV2ZW50VHlwZX07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFJpcHBsZS4gUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBtYW5hZ2luZ1xuICogLSBjbGFzc2VzXG4gKiAtIGRvbVxuICogLSBDU1MgdmFyaWFibGVzXG4gKiAtIHBvc2l0aW9uXG4gKiAtIGRpbWVuc2lvbnNcbiAqIC0gc2Nyb2xsIHBvc2l0aW9uXG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKiAtIHVuYm91bmRlZCwgYWN0aXZlIGFuZCBkaXNhYmxlZCBzdGF0ZXNcbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUFkYXB0ZXIge1xuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzVW5ib3VuZGVkKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlQWN0aXZlKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlRGlzYWJsZWQoKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUV2ZW50VGFyZ2V0fSB0YXJnZXQgKi9cbiAgY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YXJOYW1lXG4gICAqIEBwYXJhbSB7P251bWJlcnxzdHJpbmd9IHZhbHVlXG4gICAqL1xuICB1cGRhdGVDc3NWYXJpYWJsZSh2YXJOYW1lLCB2YWx1ZSkge31cblxuICAvKiogQHJldHVybiB7IUNsaWVudFJlY3R9ICovXG4gIGNvbXB1dGVCb3VuZGluZ1JlY3QoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSAqL1xuICBnZXRXaW5kb3dQYWdlT2Zmc2V0KCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICAvLyBSaXBwbGUgaXMgYSBzcGVjaWFsIGNhc2Ugd2hlcmUgdGhlIFwicm9vdFwiIGNvbXBvbmVudCBpcyByZWFsbHkgYSBcIm1peGluXCIgb2Ygc29ydHMsXG4gIC8vIGdpdmVuIHRoYXQgaXQncyBhbiAndXBncmFkZScgdG8gYW4gZXhpc3RpbmcgY29tcG9uZW50LiBUaGF0IGJlaW5nIHNhaWQgaXQgaXMgdGhlIHJvb3RcbiAgLy8gQ1NTIGNsYXNzIHRoYXQgYWxsIG90aGVyIENTUyBjbGFzc2VzIGRlcml2ZSBmcm9tLlxuICBST09UOiAnbWRjLXJpcHBsZS11cGdyYWRlZCcsXG4gIFVOQk9VTkRFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLXVuYm91bmRlZCcsXG4gIEJHX0ZPQ1VTRUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1iYWNrZ3JvdW5kLWZvY3VzZWQnLFxuICBGR19BQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1hY3RpdmF0aW9uJyxcbiAgRkdfREVBQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1kZWFjdGl2YXRpb24nLFxufTtcblxuY29uc3Qgc3RyaW5ncyA9IHtcbiAgVkFSX0xFRlQ6ICctLW1kYy1yaXBwbGUtbGVmdCcsXG4gIFZBUl9UT1A6ICctLW1kYy1yaXBwbGUtdG9wJyxcbiAgVkFSX0ZHX1NJWkU6ICctLW1kYy1yaXBwbGUtZmctc2l6ZScsXG4gIFZBUl9GR19TQ0FMRTogJy0tbWRjLXJpcHBsZS1mZy1zY2FsZScsXG4gIFZBUl9GR19UUkFOU0xBVEVfU1RBUlQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLXN0YXJ0JyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9FTkQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLWVuZCcsXG59O1xuXG5jb25zdCBudW1iZXJzID0ge1xuICBQQURESU5HOiAxMCxcbiAgSU5JVElBTF9PUklHSU5fU0NBTEU6IDAuNixcbiAgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVM6IDIyNSwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtdHJhbnNsYXRlLWR1cmF0aW9uIChpLmUuIGFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBGR19ERUFDVElWQVRJT05fTVM6IDE1MCwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtZmFkZS1vdXQtZHVyYXRpb24gKGkuZS4gZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgVEFQX0RFTEFZX01TOiAzMDAsIC8vIERlbGF5IGJldHdlZW4gdG91Y2ggYW5kIHNpbXVsYXRlZCBtb3VzZSBldmVudHMgb24gdG91Y2ggZGV2aWNlc1xufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgQ1NTIGN1c3RvbSB2YXJpYWJsZSBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBhcHBseVBhc3NpdmUgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzUGFzc2l2ZV87XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKSB7XG4gIC8vIERldGVjdCB2ZXJzaW9ucyBvZiBFZGdlIHdpdGggYnVnZ3kgdmFyKCkgc3VwcG9ydFxuICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzExNDk1NDQ4L1xuICBjb25zdCBkb2N1bWVudCA9IHdpbmRvd09iai5kb2N1bWVudDtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBub2RlLmNsYXNzTmFtZSA9ICdtZGMtcmlwcGxlLXN1cmZhY2UtLXRlc3QtZWRnZS12YXItYnVnJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcblxuICAvLyBUaGUgYnVnIGV4aXN0cyBpZiA6OmJlZm9yZSBzdHlsZSBlbmRzIHVwIHByb3BhZ2F0aW5nIHRvIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgLy8gQWRkaXRpb25hbGx5LCBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgbnVsbCBpbiBpZnJhbWVzIHdpdGggZGlzcGxheTogXCJub25lXCIgaW4gRmlyZWZveCxcbiAgLy8gYnV0IEZpcmVmb3ggaXMga25vd24gdG8gc3VwcG9ydCBDU1MgY3VzdG9tIHByb3BlcnRpZXMgY29ycmVjdGx5LlxuICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93T2JqLmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGNvbnN0IGhhc1BzZXVkb1ZhckJ1ZyA9IGNvbXB1dGVkU3R5bGUgIT09IG51bGwgJiYgY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BTdHlsZSA9PT0gJ3NvbGlkJztcbiAgbm9kZS5yZW1vdmUoKTtcbiAgcmV0dXJuIGhhc1BzZXVkb1ZhckJ1Zztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3dPYmosIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPT09ICdib29sZWFuJyAmJiAhZm9yY2VSZWZyZXNoKSB7XG4gICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG5cbiAgY29uc3Qgc3VwcG9ydHNGdW5jdGlvblByZXNlbnQgPSB3aW5kb3dPYmouQ1NTICYmIHR5cGVvZiB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIXN1cHBvcnRzRnVuY3Rpb25QcmVzZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyA9IHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJy0tY3NzLXZhcnMnLCAneWVzJyk7XG4gIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NDY2OVxuICAvLyBTZWU6IFJFQURNRSBzZWN0aW9uIG9uIFNhZmFyaVxuICBjb25zdCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMgPSAoXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnKC0tY3NzLXZhcnM6IHllcyknKSAmJlxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJ2NvbG9yJywgJyMwMDAwMDAwMCcpXG4gICk7XG5cbiAgaWYgKGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgfHwgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSAhZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopO1xuICB9IGVsc2Uge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gZmFsc2U7XG4gIH1cblxuICBpZiAoIWZvcmNlUmVmcmVzaCkge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG4gIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbn1cblxuLy9cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHtwYXNzaXZlOiBib29sZWFufX1cbiAqL1xuZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSBIVE1MRWxlbWVudFByb3RvdHlwZVxuICogQHJldHVybiB7IUFycmF5PHN0cmluZz59XG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudFByb3RvdHlwZSkge1xuICByZXR1cm4gW1xuICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLCAnbXNNYXRjaGVzU2VsZWN0b3InLCAnbWF0Y2hlcycsXG4gIF0uZmlsdGVyKChwKSA9PiBwIGluIEhUTUxFbGVtZW50UHJvdG90eXBlKS5wb3AoKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFFdmVudH0gZXZcbiAqIEBwYXJhbSB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gcGFnZU9mZnNldFxuICogQHBhcmFtIHshQ2xpZW50UmVjdH0gY2xpZW50UmVjdFxuICogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKGV2LCBwYWdlT2Zmc2V0LCBjbGllbnRSZWN0KSB7XG4gIGNvbnN0IHt4LCB5fSA9IHBhZ2VPZmZzZXQ7XG4gIGNvbnN0IGRvY3VtZW50WCA9IHggKyBjbGllbnRSZWN0LmxlZnQ7XG4gIGNvbnN0IGRvY3VtZW50WSA9IHkgKyBjbGllbnRSZWN0LnRvcDtcblxuICBsZXQgbm9ybWFsaXplZFg7XG4gIGxldCBub3JtYWxpemVkWTtcbiAgLy8gRGV0ZXJtaW5lIHRvdWNoIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByaXBwbGUgY29udGFpbmVyLlxuICBpZiAoZXYudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9IGVsc2Uge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfVxuXG4gIHJldHVybiB7eDogbm9ybWFsaXplZFgsIHk6IG5vcm1hbGl6ZWRZfTtcbn1cblxuZXhwb3J0IHtzdXBwb3J0c0Nzc1ZhcmlhYmxlcywgYXBwbHlQYXNzaXZlLCBnZXRNYXRjaGVzUHJvcGVydHksIGdldE5vcm1hbGl6ZWRFdmVudENvb3Jkc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge2dldE5vcm1hbGl6ZWRFdmVudENvb3Jkc30gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBpc0FjdGl2YXRlZDogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGFjdGl2YXRpb25FdmVudDogRXZlbnQsXG4gKiAgIGlzUHJvZ3JhbW1hdGljOiAoYm9vbGVhbnx1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgQWN0aXZhdGlvblN0YXRlVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBkZWFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGZvY3VzOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGJsdXI6IChzdHJpbmd8dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVySW5mb1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGZvY3VzOiBmdW5jdGlvbigpLFxuICogICBibHVyOiBmdW5jdGlvbigpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJzVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB4OiBudW1iZXIsXG4gKiAgIHk6IG51bWJlclxuICogfX1cbiAqL1xubGV0IFBvaW50VHlwZTtcblxuLy8gQWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiB0aGUgcm9vdCBlbGVtZW50IG9mIGVhY2ggaW5zdGFuY2UgZm9yIGFjdGl2YXRpb25cbmNvbnN0IEFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoc3RhcnQnLCAncG9pbnRlcmRvd24nLCAnbW91c2Vkb3duJywgJ2tleWRvd24nXTtcblxuLy8gRGVhY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIGRvY3VtZW50RWxlbWVudCB3aGVuIGEgcG9pbnRlci1yZWxhdGVkIGRvd24gZXZlbnQgb2NjdXJzXG5jb25zdCBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hlbmQnLCAncG9pbnRlcnVwJywgJ21vdXNldXAnXTtcblxuLy8gVHJhY2tzIGFjdGl2YXRpb25zIHRoYXQgaGF2ZSBvY2N1cnJlZCBvbiB0aGUgY3VycmVudCBmcmFtZSwgdG8gYXZvaWQgc2ltdWx0YW5lb3VzIG5lc3RlZCBhY3RpdmF0aW9uc1xuLyoqIEB0eXBlIHshQXJyYXk8IUV2ZW50VGFyZ2V0Pn0gKi9cbmxldCBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1JpcHBsZUFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IC8qIGJvb2xlYW4gLSBjYWNoZWQgKi8ge30sXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICgvKiB0YXJnZXQ6ICFFdmVudFRhcmdldCAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAoLyogdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IC8qIENsaWVudFJlY3QgKi8ge30sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAvKiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9ICovIHt9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENSaXBwbGVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUgeyFDbGllbnRSZWN0fSAqL1xuICAgIHRoaXMuZnJhbWVfID0gLyoqIEB0eXBlIHshQ2xpZW50UmVjdH0gKi8gKHt3aWR0aDogMCwgaGVpZ2h0OiAwfSk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubWF4UmFkaXVzXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuZGVhY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuZm9jdXNIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlRm9jdXMoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUJsdXIoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuXG4gICAgLyoqIEBwcml2YXRlIHt7bGVmdDogbnVtYmVyLCB0b3A6bnVtYmVyfX0gKi9cbiAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnU2NhbGVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IHRydWU7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUgez9FdmVudH0gKi9cbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogV2UgY29tcHV0ZSB0aGlzIHByb3BlcnR5IHNvIHRoYXQgd2UgYXJlIG5vdCBxdWVyeWluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY2xpZW50XG4gICAqIHVudGlsIHRoZSBwb2ludCBpbiB0aW1lIHdoZXJlIHRoZSBmb3VuZGF0aW9uIHJlcXVlc3RzIGl0LiBUaGlzIHByZXZlbnRzIHNjZW5hcmlvcyB3aGVyZVxuICAgKiBjbGllbnQtc2lkZSBmZWF0dXJlLWRldGVjdGlvbiBtYXkgaGFwcGVuIHRvbyBlYXJseSwgc3VjaCBhcyB3aGVuIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXJcbiAgICogYW5kIHRoZW4gaW5pdGlhbGl6ZWQgYXQgbW91bnQgdGltZSBvbiB0aGUgY2xpZW50LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNTdXBwb3J0ZWRfKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshQWN0aXZhdGlvblN0YXRlVHlwZX1cbiAgICovXG4gIGRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2YXRlZDogZmFsc2UsXG4gICAgICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogZmFsc2UsXG4gICAgICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IGZhbHNlLFxuICAgICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IGZhbHNlLFxuICAgICAgYWN0aXZhdGlvbkV2ZW50OiBudWxsLFxuICAgICAgaXNQcm9ncmFtbWF0aWM6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhST09UKTtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgICAvLyBVbmJvdW5kZWQgcmlwcGxlcyBuZWVkIGxheW91dCBsb2dpYyBhcHBsaWVkIGltbWVkaWF0ZWx5IHRvIHNldCBjb29yZGluYXRlcyBmb3IgYm90aCBzaGFkZSBhbmQgcmlwcGxlXG4gICAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWN0aXZhdGlvblRpbWVyXykge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuICAgICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG4gICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhST09UKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgIHRoaXMucmVtb3ZlQ3NzVmFyc18oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbW92ZUNzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtzdHJpbmdzfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4gICAgT2JqZWN0LmtleXMoc3RyaW5ncykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKGsuaW5kZXhPZignVkFSXycpID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoc3RyaW5nc1trXSwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjdGl2YXRlXyhlKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgcmVhY3RpbmcgdG8gZm9sbG93LW9uIGV2ZW50cyBmaXJlZCBieSB0b3VjaCBkZXZpY2UgYWZ0ZXIgYW4gYWxyZWFkeS1wcm9jZXNzZWQgdXNlciBpbnRlcmFjdGlvblxuICAgIGNvbnN0IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ID0gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XG4gICAgY29uc3QgaXNTYW1lSW50ZXJhY3Rpb24gPSBwcmV2aW91c0FjdGl2YXRpb25FdmVudCAmJiBlICYmIHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50LnR5cGUgIT09IGUudHlwZTtcbiAgICBpZiAoaXNTYW1lSW50ZXJhY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA9IGUgPT09IG51bGw7XG4gICAgYWN0aXZhdGlvblN0YXRlLmFjdGl2YXRpb25FdmVudCA9IGU7XG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0FjdGl2YXRlZEJ5UG9pbnRlciA9IGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA/IGZhbHNlIDogKFxuICAgICAgZS50eXBlID09PSAnbW91c2Vkb3duJyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICdwb2ludGVyZG93bidcbiAgICApO1xuXG4gICAgY29uc3QgaGFzQWN0aXZhdGVkQ2hpbGQgPVxuICAgICAgZSAmJiBhY3RpdmF0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgYWN0aXZhdGVkVGFyZ2V0cy5zb21lKCh0YXJnZXQpID0+IHRoaXMuYWRhcHRlcl8uY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpKTtcbiAgICBpZiAoaGFzQWN0aXZhdGVkQ2hpbGQpIHtcbiAgICAgIC8vIEltbWVkaWF0ZWx5IHJlc2V0IGFjdGl2YXRpb24gc3RhdGUsIHdoaWxlIHByZXNlcnZpbmcgbG9naWMgdGhhdCBwcmV2ZW50cyB0b3VjaCBmb2xsb3ctb24gZXZlbnRzXG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzLnB1c2goLyoqIEB0eXBlIHshRXZlbnRUYXJnZXR9ICovIChlLnRhcmdldCkpO1xuICAgICAgdGhpcy5yZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFJlc2V0IGFycmF5IG9uIG5leHQgZnJhbWUgYWZ0ZXIgdGhlIGN1cnJlbnQgZXZlbnQgaGFzIGhhZCBhIGNoYW5jZSB0byBidWJibGUgdG8gcHJldmVudCBhbmNlc3RvciByaXBwbGVzXG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlICYmIChlLmtleSA9PT0gJyAnIHx8IGUua2V5Q29kZSA9PT0gMzIpKSB7XG4gICAgICAgIC8vIElmIHNwYWNlIHdhcyBwcmVzc2VkLCB0cnkgYWdhaW4gd2l0aGluIGFuIHJBRiBjYWxsIHRvIGRldGVjdCA6YWN0aXZlLCBiZWNhdXNlIGRpZmZlcmVudCBVQXMgcmVwb3J0XG4gICAgICAgIC8vIGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW4gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MzU5NzFcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjkzNzQxXG4gICAgICAgIC8vIFdlIHRyeSBmaXJzdCBvdXRzaWRlIHJBRiB0byBzdXBwb3J0IEVkZ2UsIHdoaWNoIGRvZXMgbm90IGV4aGliaXQgdGhpcyBwcm9ibGVtLCBidXQgd2lsbCBjcmFzaCBpZiBhIENTU1xuICAgICAgICAvLyB2YXJpYWJsZSBpcyBzZXQgd2l0aGluIGEgckFGIGNhbGxiYWNrIGZvciBhIHN1Ym1pdCBidXR0b24gaW50ZXJhY3Rpb24gKCMyMjQxKS5cbiAgICAgICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSkge1xuICAgIHJldHVybiAoZSAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykgPyB0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZUFjdGl2ZSgpIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhcnQgPSAnJztcbiAgICBsZXQgdHJhbnNsYXRlRW5kID0gJyc7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgY29uc3Qge3N0YXJ0UG9pbnQsIGVuZFBvaW50fSA9IHRoaXMuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpO1xuICAgICAgdHJhbnNsYXRlU3RhcnQgPSBgJHtzdGFydFBvaW50Lnh9cHgsICR7c3RhcnRQb2ludC55fXB4YDtcbiAgICAgIHRyYW5zbGF0ZUVuZCA9IGAke2VuZFBvaW50Lnh9cHgsICR7ZW5kUG9pbnQueX1weGA7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCB0cmFuc2xhdGVTdGFydCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX0VORCwgdHJhbnNsYXRlRW5kKTtcbiAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gYW5pbWF0aW9uc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG5cbiAgICAvLyBGb3JjZSBsYXlvdXQgaW4gb3JkZXIgdG8gcmUtdHJpZ2dlciB0aGUgYW5pbWF0aW9uLlxuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpLCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7e3N0YXJ0UG9pbnQ6IFBvaW50VHlwZSwgZW5kUG9pbnQ6IFBvaW50VHlwZX19XG4gICAqL1xuICBnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCkge1xuICAgIGNvbnN0IHthY3RpdmF0aW9uRXZlbnQsIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcn0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG5cbiAgICBsZXQgc3RhcnRQb2ludDtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyKSB7XG4gICAgICBzdGFydFBvaW50ID0gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKFxuICAgICAgICAvKiogQHR5cGUgeyFFdmVudH0gKi8gKGFjdGl2YXRpb25FdmVudCksXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLmZyYW1lXy5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXG4gICAgc3RhcnRQb2ludCA9IHtcbiAgICAgIHg6IHN0YXJ0UG9pbnQueCAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogc3RhcnRQb2ludC55IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IGVuZFBvaW50ID0ge1xuICAgICAgeDogKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6ICh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXJ0UG9pbnQsIGVuZFBvaW50fTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJvdGggd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyByZWxlYXNlZCwgYW5kIHdoZW4gdGhlIGFjdGl2YXRpb24gYW5pbWF0aW9uIGVuZHMuXG4gICAgLy8gVGhlIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gc2hvdWxkIG9ubHkgcnVuIGFmdGVyIGJvdGggb2YgdGhvc2Ugb2NjdXIuXG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge2hhc0RlYWN0aXZhdGlvblVYUnVuLCBpc0FjdGl2YXRlZH0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgY29uc3QgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xuXG4gICAgaWYgKGFjdGl2YXRpb25IYXNFbmRlZCAmJiB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8pIHtcbiAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9LCBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpIHtcbiAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXG4gICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGwsIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWFjdGl2YXRlXyhlKSB7XG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBzY2VuYXJpb3Mgc3VjaCBhcyB3aGVuIHlvdSBoYXZlIGEga2V5dXAgZXZlbnQgdGhhdCBibHVycyB0aGUgZWxlbWVudC5cbiAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gLyoqIEB0eXBlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi8gKE9iamVjdC5hc3NpZ24oe30sIGFjdGl2YXRpb25TdGF0ZSkpO1xuXG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYykge1xuICAgICAgY29uc3QgZXZ0T2JqZWN0ID0gbnVsbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGV2dE9iamVjdCwgc3RhdGUpKTtcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmhhc0RlYWN0aXZhdGlvblVYUnVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhlLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZGVhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAqIEBwYXJhbSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9IG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHt3YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlfSkge1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgfHwgd2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGxheW91dEludGVybmFsXygpIHtcbiAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KHRoaXMuZnJhbWVfLmhlaWdodCwgdGhpcy5mcmFtZV8ud2lkdGgpO1xuXG4gICAgLy8gU3VyZmFjZSBkaWFtZXRlciBpcyB0cmVhdGVkIGRpZmZlcmVudGx5IGZvciB1bmJvdW5kZWQgdnMuIGJvdW5kZWQgcmlwcGxlcy5cbiAgICAvLyBVbmJvdW5kZWQgcmlwcGxlIGRpYW1ldGVyIGlzIGNhbGN1bGF0ZWQgc21hbGxlciBzaW5jZSB0aGUgc3VyZmFjZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIHBhZGRlZCBhcHByb3ByaWF0ZWx5XG4gICAgLy8gdG8gZXh0ZW5kIHRoZSBoaXRib3gsIGFuZCB0aGUgcmlwcGxlIGlzIGV4cGVjdGVkIHRvIG1lZXQgdGhlIGVkZ2VzIG9mIHRoZSBwYWRkZWQgaGl0Ym94ICh3aGljaCBpcyB0eXBpY2FsbHlcbiAgICAvLyBzcXVhcmUpLiBCb3VuZGVkIHJpcHBsZXMsIG9uIHRoZSBvdGhlciBoYW5kLCBhcmUgZnVsbHkgZXhwZWN0ZWQgdG8gZXhwYW5kIGJleW9uZCB0aGUgc3VyZmFjZSdzIGxvbmdlc3QgZGlhbWV0ZXJcbiAgICAvLyAoY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZGlhZ29uYWwgcGx1cyBhIGNvbnN0YW50IHBhZGRpbmcpLCBhbmQgYXJlIGNsaXBwZWQgYXQgdGhlIHN1cmZhY2UncyBib3JkZXIgdmlhXG4gICAgLy8gYG92ZXJmbG93OiBoaWRkZW5gLlxuICAgIGNvbnN0IGdldEJvdW5kZWRSYWRpdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuZnJhbWVfLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuZnJhbWVfLmhlaWdodCwgMikpO1xuICAgICAgcmV0dXJuIGh5cG90ZW51c2UgKyBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuUEFERElORztcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpID8gbWF4RGltIDogZ2V0Qm91bmRlZFJhZGl1cygpO1xuXG4gICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IG1heERpbSAqIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5JTklUSUFMX09SSUdJTl9TQ0FMRTtcbiAgICB0aGlzLmZnU2NhbGVfID0gdGhpcy5tYXhSYWRpdXNfIC8gdGhpcy5pbml0aWFsU2l6ZV87XG5cbiAgICB0aGlzLnVwZGF0ZUxheW91dENzc1ZhcnNfKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgdXBkYXRlTGF5b3V0Q3NzVmFyc18oKSB7XG4gICAgY29uc3Qge1xuICAgICAgVkFSX0ZHX1NJWkUsIFZBUl9MRUZULCBWQVJfVE9QLCBWQVJfRkdfU0NBTEUsXG4gICAgfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NJWkUsIGAke3RoaXMuaW5pdGlhbFNpemVffXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0NBTEUsIHRoaXMuZmdTY2FsZV8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfTEVGVCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLmxlZnR9cHhgKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcH1weGApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXRVbmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgY29uc3Qge1VOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHVuYm91bmRlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXMoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cblxuICBoYW5kbGVCbHVyKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4iLCJpbXBvcnQgTURDUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMnXHJcbmltcG9ydCB7XHJcbiAgc3VwcG9ydHNDc3NWYXJpYWJsZXMsXHJcbiAgZ2V0TWF0Y2hlc1Byb3BlcnR5LFxyXG4gIGFwcGx5UGFzc2l2ZVxyXG59IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvdXRpbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBSaXBwbGVCYXNlIGV4dGVuZHMgTURDUmlwcGxlRm91bmRhdGlvbiB7XHJcbiAgc3RhdGljIGdldCBNQVRDSEVTKCkge1xyXG4gICAgLyogZ2xvYmFsIEhUTUxFbGVtZW50ICovXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBSaXBwbGVCYXNlLl9tYXRjaGVzIHx8XHJcbiAgICAgIChSaXBwbGVCYXNlLl9tYXRjaGVzID0gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSkpXHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNTdXJmYWNlQWN0aXZlKHJlZikge1xyXG4gICAgcmV0dXJuIHJlZltSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHZtLCBvcHRpb25zKSB7XHJcbiAgICBzdXBlcihcclxuICAgICAgT2JqZWN0LmFzc2lnbihcclxuICAgICAgICB7XHJcbiAgICAgICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3cpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2bS4kZWxbUmlwcGxlQmFzZS5NQVRDSEVTXSgnOmFjdGl2ZScpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZtLmRpc2FibGVkXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIHZtLiRzZXQodm0uY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICB2bS4kZGVsZXRlKHZtLmNsYXNzZXMsIGNsYXNzTmFtZSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiB0YXJnZXQgPT4gdm0uJGVsLmNvbnRhaW5zKHRhcmdldCksXHJcbiAgICAgICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2bS4kZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICAgICAgdm0uJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcclxuICAgICAgICAgICAgICBoYW5kbGVyLFxyXG4gICAgICAgICAgICAgIGFwcGx5UGFzc2l2ZSgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgICBldnRUeXBlLFxyXG4gICAgICAgICAgICAgIGhhbmRsZXIsXHJcbiAgICAgICAgICAgICAgYXBwbHlQYXNzaXZlKClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogaGFuZGxlciA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogaGFuZGxlciA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKHZhck5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHZtLiRzZXQodm0uc3R5bGVzLCB2YXJOYW1lLCB2YWx1ZSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2bS4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHg6IHdpbmRvdy5wYWdlWE9mZnNldCwgeTogd2luZG93LnBhZ2VZT2Zmc2V0IH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9wdGlvbnNcclxuICAgICAgKVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJpcHBsZU1peGluID0ge1xyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiB7fSxcclxuICAgICAgc3R5bGVzOiB7fVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbW91bnRlZCgpIHtcclxuICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcylcclxuICAgIHRoaXMucmlwcGxlLmluaXQoKVxyXG4gIH0sXHJcbiAgYmVmb3JlRGVzdHJveSgpIHtcclxuICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKVxyXG4gIH1cclxufVxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGN1c3RvbS1lbGVtZW50IFxyXG4gICAgOnRhZz1cInRhZ1wiIFxyXG4gICAgOmNsYXNzZXM9XCJjbGFzc2VzXCJcclxuICAgIDpzdHlsZXM9XCJzdHlsZXNcIiBcclxuICAgIGNsYXNzPVwibWRjLXJpcHBsZVwiPlxyXG4gICAgPHNsb3QgLz5cclxuICA8L2N1c3RvbS1lbGVtZW50PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHsgQ3VzdG9tRWxlbWVudE1peGluIH0gZnJvbSAnLi4vYmFzZSdcclxuaW1wb3J0IHsgUmlwcGxlTWl4aW4gfSBmcm9tICcuL21kYy1yaXBwbGUtYmFzZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLXJpcHBsZScsXHJcbiAgbWl4aW5zOiBbQ3VzdG9tRWxlbWVudE1peGluLCBSaXBwbGVNaXhpbl0sXHJcbiAgcHJvcHM6IHtcclxuICAgIHRhZzogU3RyaW5nXHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdlxyXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiXHJcbiAgICA6c3R5bGU9XCJzdHlsZXNcIlxyXG4gICAgdGFiaW5kZXg9XCIwXCJcclxuICAgIEBjbGljaz1cImhhbmRsZUludGVyYWN0aW9uXCJcclxuICAgIEBrZXlkb3duPVwiaGFuZGxlSW50ZXJhY3Rpb25cIlxyXG4gICAgQHRyYW5zaXRpb25lbmQ9XCJoYW5kbGVUcmFuc2l0aW9uRW5kXCJcclxuICA+XHJcbiAgICA8aVxyXG4gICAgICB2LWlmPVwiaGF2ZWxlYWRpbmdJY29uXCJcclxuICAgICAgcmVmPVwibGVhZGluZ0ljb25cIlxyXG4gICAgICA6Y2xhc3M9XCJsZWFkaW5nQ2xhc3Nlc1wiXHJcbiAgICAgIGNsYXNzPVwibWRjLWNoaXBfX2ljb24gbWRjLWNoaXBfX2ljb24tLWxlYWRpbmdcIlxyXG4gICAgPnt7IGxlYWRpbmdJY29uIH19PC9pPlxyXG4gICAgPGRpdlxyXG4gICAgICB2LWlmPVwiaXNGaWx0ZXJcIlxyXG4gICAgICBjbGFzcz1cIm1kYy1jaGlwX19jaGVja21hcmtcIj5cclxuICAgICAgPHN2Z1xyXG4gICAgICAgIGNsYXNzPVwibWRjLWNoaXBfX2NoZWNrbWFyay1zdmdcIlxyXG4gICAgICAgIHZpZXdCb3g9XCItMiAtMyAzMCAzMFwiPlxyXG4gICAgICAgIDxwYXRoXHJcbiAgICAgICAgICBjbGFzcz1cIm1kYy1jaGlwX19jaGVja21hcmstcGF0aFwiXHJcbiAgICAgICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgICAgICBzdHJva2U9XCJibGFja1wiXHJcbiAgICAgICAgICBkPVwiTTEuNzMsMTIuOTEgOC4xLDE5LjI4IDIyLjc5LDQuNTlcIi8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibWRjLWNoaXBfX3RleHRcIj5cclxuICAgICAgPHNsb3QvPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8aVxyXG4gICAgICB2LWlmPVwiaGF2ZXRyYWlsaW5nSWNvblwiXHJcbiAgICAgIHJlZj1cInRyYWlsaW5nSWNvblwiXHJcbiAgICAgIDpjbGFzcz1cInRyYWlsaW5nQ2xhc3Nlc1wiXHJcbiAgICAgIGNsYXNzPVwibWRjLWNoaXBfX2ljb24gbWRjLWNoaXBfX2ljb24tLXRyYWlsaW5nXCJcclxuICAgICAgdGFiaW5kZXg9XCIwXCJcclxuICAgICAgcm9sZT1cImJ1dHRvblwiXHJcbiAgICAgIEBjbGljaz1cImhhbmRsZVRyYWlsaW5nSWNvbkludGVyYWN0aW9uXCJcclxuICAgICAgQGtleWRvd249XCJoYW5kbGVUcmFpbGluZ0ljb25JbnRlcmFjdGlvblwiXHJcbiAgICA+e3sgdHJhaWxpbmdJY29uIH19PC9pPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5hcHBseVBhc3NpdmVcclxuPHNjcmlwdD5cclxuaW1wb3J0IHsgTURDQ2hpcEZvdW5kYXRpb24gfSBmcm9tICdAbWF0ZXJpYWwvY2hpcHMvY2hpcC9mb3VuZGF0aW9uJ1xyXG5pbXBvcnQgeyBDdXN0b21MaW5rTWl4aW4sIGVtaXRDdXN0b21FdmVudCB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCB7IFJpcHBsZUJhc2UgfSBmcm9tICcuLi9yaXBwbGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1jaGlwJyxcclxuICBtaXhpbnM6IFtDdXN0b21MaW5rTWl4aW5dLFxyXG4gIHByb3BzOiB7XHJcbiAgICBsZWFkaW5nSWNvbjogW1N0cmluZ10sXHJcbiAgICB0cmFpbGluZ0ljb246IFtTdHJpbmddLFxyXG4gICAgbGVhZGluZ0ljb25DbGFzc2VzOiBbT2JqZWN0XSxcclxuICAgIHRyYWlsaW5nSWNvbkNsYXNzZXM6IFtPYmplY3RdXHJcbiAgfSxcclxuICBpbmplY3Q6IFsnbWRjQ2hpcFNldCddLFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiB7XHJcbiAgICAgICAgJ21kYy1jaGlwJzogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICBzdHlsZXM6IHt9XHJcbiAgICB9XHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgaXNGaWx0ZXIoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1kY0NoaXBTZXQgJiYgdGhpcy5tZGNDaGlwU2V0LmZpbHRlclxyXG4gICAgfSxcclxuICAgIGhhdmVsZWFkaW5nSWNvbigpIHtcclxuICAgICAgcmV0dXJuICEhdGhpcy5sZWFkaW5nSWNvbiB8fCB0aGlzLmxlYWRpbmdJY29uQ2xhc3Nlc1xyXG4gICAgfSxcclxuICAgIGhhdmV0cmFpbGluZ0ljb24oKSB7XHJcbiAgICAgIHJldHVybiAhIXRoaXMudHJhaWxpbmdJY29uIHx8IHRoaXMudHJhaWxpbmdJY29uQ2xhc3Nlc1xyXG4gICAgfSxcclxuICAgIGxlYWRpbmdDbGFzc2VzKCkge1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcclxuICAgICAgICB7fSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAnbWF0ZXJpYWwtaWNvbnMnOiAhIXRoaXMubGVhZGluZ0ljb25cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMubGVhZGluZ0ljb25DbGFzc2VzXHJcbiAgICAgIClcclxuICAgIH0sXHJcbiAgICB0cmFpbGluZ0NsYXNzZXMoKSB7XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgIHt9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICdtYXRlcmlhbC1pY29ucyc6ICEhdGhpcy50cmFpbGluZ0ljb25cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMudHJhaWxpbmdJY29uQ2xhc3Nlc1xyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfSxcclxuICBtb3VudGVkKCkge1xyXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ0NoaXBGb3VuZGF0aW9uKHtcclxuICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpLFxyXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSksXHJcbiAgICAgIGhhc0NsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSksXHJcbiAgICAgIGFkZENsYXNzVG9MZWFkaW5nSWNvbjogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICBpZiAodGhpcy5oYXZlbGVhZGluZ0ljb24pIHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMubGVhZGluZ0ljb24uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICByZW1vdmVDbGFzc0Zyb21MZWFkaW5nSWNvbjogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICBpZiAodGhpcy5oYXZlbGVhZGluZ0ljb24pIHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMubGVhZGluZ0ljb24uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBldmVudFRhcmdldEhhc0NsYXNzOiAodGFyZ2V0LCBjbGFzc05hbWUpID0+XHJcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxyXG4gICAgICBub3RpZnlJbnRlcmFjdGlvbjogKCkgPT4ge1xyXG4gICAgICAgIGVtaXRDdXN0b21FdmVudChcclxuICAgICAgICAgIHRoaXMuJGVsLFxyXG4gICAgICAgICAgTURDQ2hpcEZvdW5kYXRpb24uc3RyaW5ncy5JTlRFUkFDVElPTl9FVkVOVCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY2hpcDogdGhpc1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRydWVcclxuICAgICAgICApXHJcbiAgICAgICAgdGhpcy5tZGNDaGlwU2V0ICYmIHRoaXMubWRjQ2hpcFNldC5oYW5kbGVJbnRlcmFjdGlvblxyXG4gICAgICB9LFxyXG4gICAgICBub3RpZnlUcmFpbGluZ0ljb25JbnRlcmFjdGlvbjogKCkgPT4ge1xyXG4gICAgICAgIGVtaXRDdXN0b21FdmVudChcclxuICAgICAgICAgIHRoaXMuJGVsLFxyXG4gICAgICAgICAgTURDQ2hpcEZvdW5kYXRpb24uc3RyaW5ncy5UUkFJTElOR19JQ09OX0lOVEVSQUNUSU9OX0VWRU5ULFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBjaGlwOiB0aGlzXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdHJ1ZVxyXG4gICAgICAgIClcclxuICAgICAgfSxcclxuICAgICAgbm90aWZ5UmVtb3ZhbDogKCkgPT4ge1xyXG4gICAgICAgIGVtaXRDdXN0b21FdmVudChcclxuICAgICAgICAgIHRoaXMuJGVsLFxyXG4gICAgICAgICAgTURDQ2hpcEZvdW5kYXRpb24uc3RyaW5ncy5SRU1PVkFMX0VWRU5ULFxyXG4gICAgICAgICAgeyBjaGlwOiB0aGlzIH0sXHJcbiAgICAgICAgICB0cnVlXHJcbiAgICAgICAgKVxyXG4gICAgICB9LFxyXG4gICAgICBnZXRDb21wdXRlZFN0eWxlVmFsdWU6IHByb3BlcnR5TmFtZSA9PlxyXG4gICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuJGVsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5TmFtZSksXHJcbiAgICAgIHNldFN0eWxlUHJvcGVydHk6IChwcm9wZXJ0eSwgdmFsdWUpID0+XHJcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMuc3R5bGVzLCBwcm9wZXJ0eSwgdmFsdWUpXHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuZm91bmRhdGlvbi5pbml0KClcclxuXHJcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXHJcbiAgICB0aGlzLnJpcHBsZS5pbml0KClcclxuICB9LFxyXG4gIGJlZm9yZURlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KClcclxuICAgIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KClcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGhhbmRsZUludGVyYWN0aW9uKGV2dCkge1xyXG4gICAgICB0aGlzLmZvdW5kYXRpb24uaGFuZGxlSW50ZXJhY3Rpb24oZXZ0KVxyXG4gICAgfSxcclxuICAgIGhhbmRsZVRyYW5zaXRpb25FbmQoZXZ0KSB7XHJcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5oYW5kbGVUcmFuc2l0aW9uRW5kKGV2dClcclxuICAgIH0sXHJcbiAgICBoYW5kbGVUcmFpbGluZ0ljb25JbnRlcmFjdGlvbihldnQpIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uLmhhbmRsZVRyYWlsaW5nSWNvbkludGVyYWN0aW9uKGV2dClcclxuICAgIH0sXHJcbiAgICB0b2dnbGVTZWxlY3RlZCgpIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uLnRvZ2dsZVNlbGVjdGVkKClcclxuICAgIH0sXHJcbiAgICBpc1NlbGVjdGVkKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uLmlzU2VsZWN0ZWQoKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IHtNRENDaGlwSW50ZXJhY3Rpb25FdmVudFR5cGV9IGZyb20gJy4uL2NoaXAvZm91bmRhdGlvbic7XG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBDaGlwIFNldC5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBDaGlwIFNldCBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDQ2hpcFNldEFkYXB0ZXIge1xuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSByb290IGVsZW1lbnQgY29udGFpbnMgdGhlIGdpdmVuIGNsYXNzIG5hbWUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc0NsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgY2hpcCBvYmplY3QgZnJvbSB0aGUgY2hpcCBzZXQuXG4gICAqIEBwYXJhbSB7IU9iamVjdH0gY2hpcFxuICAgKi9cbiAgcmVtb3ZlQ2hpcChjaGlwKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENDaGlwU2V0QWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIENISVBfU0VMRUNUT1I6ICcubWRjLWNoaXAnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBDSE9JQ0U6ICdtZGMtY2hpcC1zZXQtLWNob2ljZScsXG4gIEZJTFRFUjogJ21kYy1jaGlwLXNldC0tZmlsdGVyJyxcbn07XG5cbmV4cG9ydCB7c3RyaW5ncywgY3NzQ2xhc3Nlc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDQ2hpcFNldEFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IHtNRENDaGlwRm91bmRhdGlvbiwgTURDQ2hpcEludGVyYWN0aW9uRXZlbnRUeXBlfSBmcm9tICcuLi9jaGlwL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHtzdHJpbmdzLCBjc3NDbGFzc2VzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ0NoaXBTZXRBZGFwdGVyPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENDaGlwU2V0Rm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ0NoaXBTZXRBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ0NoaXBTZXRBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDQ2hpcFNldEFkYXB0ZXJ9ICovICh7XG4gICAgICBoYXNDbGFzczogKCkgPT4ge30sXG4gICAgICByZW1vdmVDaGlwOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENDaGlwU2V0QWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDQ2hpcFNldEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzZWxlY3RlZCBjaGlwcyBpbiB0aGUgc2V0LiBPbmx5IHVzZWQgZm9yIGNob2ljZSBjaGlwIHNldCBvciBmaWx0ZXIgY2hpcCBzZXQuXG4gICAgICogQHByaXZhdGUgeyFBcnJheTwhTURDQ2hpcEZvdW5kYXRpb24+fVxuICAgICAqL1xuICAgIHRoaXMuc2VsZWN0ZWRDaGlwc18gPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIHRoZSBnaXZlbiBjaGlwLiBEZXNlbGVjdHMgYWxsIG90aGVyIGNoaXBzIGlmIHRoZSBjaGlwIHNldCBpcyBvZiB0aGUgY2hvaWNlIHZhcmlhbnQuXG4gICAqIEBwYXJhbSB7IU1EQ0NoaXBGb3VuZGF0aW9ufSBjaGlwRm91bmRhdGlvblxuICAgKi9cbiAgc2VsZWN0KGNoaXBGb3VuZGF0aW9uKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5DSE9JQ0UpKSB7XG4gICAgICB0aGlzLmRlc2VsZWN0QWxsXygpO1xuICAgIH1cbiAgICBjaGlwRm91bmRhdGlvbi5zZXRTZWxlY3RlZCh0cnVlKTtcbiAgICB0aGlzLnNlbGVjdGVkQ2hpcHNfLnB1c2goY2hpcEZvdW5kYXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0cyB0aGUgZ2l2ZW4gY2hpcC5cbiAgICogQHBhcmFtIHshTURDQ2hpcEZvdW5kYXRpb259IGNoaXBGb3VuZGF0aW9uXG4gICAqL1xuICBkZXNlbGVjdChjaGlwRm91bmRhdGlvbikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZWxlY3RlZENoaXBzXy5pbmRleE9mKGNoaXBGb3VuZGF0aW9uKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5zZWxlY3RlZENoaXBzXy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBjaGlwRm91bmRhdGlvbi5zZXRTZWxlY3RlZChmYWxzZSk7XG4gIH1cblxuICAvKiogRGVzZWxlY3RzIGFsbCBzZWxlY3RlZCBjaGlwcy4gKi9cbiAgZGVzZWxlY3RBbGxfKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRDaGlwc18uZm9yRWFjaCgoY2hpcEZvdW5kYXRpb24pID0+IHtcbiAgICAgIGNoaXBGb3VuZGF0aW9uLnNldFNlbGVjdGVkKGZhbHNlKTtcbiAgICB9KTtcbiAgICB0aGlzLnNlbGVjdGVkQ2hpcHNfLmxlbmd0aCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIGNoaXAgaW50ZXJhY3Rpb24gZXZlbnRcbiAgICogQHBhcmFtIHshTURDQ2hpcEludGVyYWN0aW9uRXZlbnRUeXBlfSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZUNoaXBJbnRlcmFjdGlvbihldnQpIHtcbiAgICBjb25zdCBjaGlwRm91bmRhdGlvbiA9IGV2dC5kZXRhaWwuY2hpcC5mb3VuZGF0aW9uO1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuQ0hPSUNFKSB8fCB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuRklMVEVSKSkge1xuICAgICAgaWYgKGNoaXBGb3VuZGF0aW9uLmlzU2VsZWN0ZWQoKSkge1xuICAgICAgICB0aGlzLmRlc2VsZWN0KGNoaXBGb3VuZGF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0KGNoaXBGb3VuZGF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgZXZlbnQgd2hlbiBhIGNoaXAgaXMgcmVtb3ZlZC5cbiAgICogQHBhcmFtIHshTURDQ2hpcEludGVyYWN0aW9uRXZlbnRUeXBlfSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZUNoaXBSZW1vdmFsKGV2dCkge1xuICAgIGNvbnN0IHtjaGlwfSA9IGV2dC5kZXRhaWw7XG4gICAgdGhpcy5kZXNlbGVjdChjaGlwLmZvdW5kYXRpb24pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2hpcChjaGlwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENDaGlwU2V0Rm91bmRhdGlvbjtcbiIsIlxyXG48c2NyaXB0PlxyXG5pbXBvcnQgTURDQ2hpcFNldEZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2NoaXBzL2NoaXAtc2V0L2ZvdW5kYXRpb24nXHJcbmltcG9ydCB7IE1EQ0NoaXBGb3VuZGF0aW9uIH0gZnJvbSAnQG1hdGVyaWFsL2NoaXBzL2NoaXAvZm91bmRhdGlvbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLWNoaXAtc2V0JyxcclxuICBwcm9wczoge1xyXG4gICAgY2hvaWNlOiBbQm9vbGVhbl0sXHJcbiAgICBmaWx0ZXI6IFtCb29sZWFuXSxcclxuICAgIGlucHV0OiBbQm9vbGVhbl1cclxuICB9LFxyXG4gIHByb3ZpZGUoKSB7XHJcbiAgICByZXR1cm4geyBtZGNDaGlwU2V0OiB0aGlzIH1cclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiB7XHJcbiAgICAgICAgJ21kYy1jaGlwLXNldCc6IHRydWUsXHJcbiAgICAgICAgJ21kYy1jaGlwLXNldC0tY2hvaWNlJzogdGhpcy5jaG9pY2UsXHJcbiAgICAgICAgJ21kYy1jaGlwLXNldC0tZmlsdGVyJzogdGhpcy5maWx0ZXIsXHJcbiAgICAgICAgJ21kYy1jaGlwLXNldC0taW5wdXQnOiB0aGlzLmlucHV0XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDQ2hpcFNldEZvdW5kYXRpb24oe1xyXG4gICAgICBoYXNDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxyXG4gICAgICByZW1vdmVDaGlwOiBjaGlwID0+IHtcclxuICAgICAgICAvLyBUT0RPOiBtYXkgbmVlZCByZWZhY3RvcmluZ1xyXG4gICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IGNoaXAuJGRlc3Ryb3koKSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXHJcbiAgfSxcclxuICBiZWZvcmVEZXN0cm95KCkge1xyXG4gICAgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgaGFuZGxlQ2hpcEludGVyYWN0aW9uKGV2dCkge1xyXG4gICAgICB0aGlzLmZvdW5kYXRpb24uaGFuZGxlQ2hpcEludGVyYWN0aW9uKGV2dClcclxuICAgIH0sXHJcbiAgICBoYW5kbGVDaGlwUmVtb3ZhbChldnQpIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uLmhhbmRsZUNoaXBSZW1vdmFsKGV2dClcclxuICAgIH1cclxuICB9LFxyXG4gIHJlbmRlcihoKSB7XHJcbiAgICByZXR1cm4gaChcclxuICAgICAgJ2RpdicsXHJcbiAgICAgIHtcclxuICAgICAgICBjbGFzczogdGhpcy5jbGFzc2VzLFxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICBbTURDQ2hpcEZvdW5kYXRpb24uc3RyaW5ncy5JTlRFUkFDVElPTl9FVkVOVF06IGV2dCA9PlxyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoaXBJbnRlcmFjdGlvbihldnQpLFxyXG4gICAgICAgICAgW01EQ0NoaXBGb3VuZGF0aW9uLnN0cmluZ3MuUkVNT1ZBTF9FVkVOVF06IGV2dCA9PlxyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoaXBSZW1vdmFsKGV2dClcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHRoaXMuJHNsb3RzLmRlZmF1bHRcclxuICAgIClcclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsImltcG9ydCB7IEJhc2VQbHVnaW4gfSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgbWRjQ2hpcCBmcm9tICcuL21kYy1jaGlwLnZ1ZSdcclxuaW1wb3J0IG1kY0NoaXBTZXQgZnJvbSAnLi9tZGMtY2hpcC1zZXQudnVlJ1xyXG5cclxuZXhwb3J0IHsgbWRjQ2hpcCwgbWRjQ2hpcFNldCB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcclxuICBtZGNDaGlwLFxyXG4gIG1kY0NoaXBTZXRcclxufSlcclxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xyXG5pbXBvcnQgeyBhdXRvSW5pdCB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcclxuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXHJcblxyXG5hdXRvSW5pdChwbHVnaW4pXHJcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwia2V5IiwiY29tcG9uZW50Iiwidm0iLCJuYW1lIiwiQ3VzdG9tRWxlbWVudCIsImZ1bmN0aW9uYWwiLCJyZW5kZXIiLCJjcmVhdGVFbGVtZW50IiwiY29udGV4dCIsInByb3BzIiwiaXMiLCJ0YWciLCJkYXRhIiwiY2hpbGRyZW4iLCJDdXN0b21FbGVtZW50TWl4aW4iLCJDdXN0b21MaW5rIiwidHlwZSIsIlN0cmluZyIsImRlZmF1bHQiLCJsaW5rIiwiT2JqZWN0IiwiaCIsImVsZW1lbnQiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsInBhcmVudCIsIiRyb3V0ZXIiLCIkcm9vdCIsIiRvcHRpb25zIiwib24iLCJjbGljayIsIm5hdGl2ZU9uIiwiQ3VzdG9tTGlua01peGluIiwidG8iLCJleGFjdCIsIkJvb2xlYW4iLCJhcHBlbmQiLCJyZXBsYWNlIiwiYWN0aXZlQ2xhc3MiLCJleGFjdEFjdGl2ZUNsYXNzIiwiY29tcHV0ZWQiLCJlbWl0Q3VzdG9tRXZlbnQiLCJlbCIsImV2dFR5cGUiLCJldnREYXRhIiwic2hvdWxkQnViYmxlIiwiZXZ0IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJidWJibGVzIiwiZG9jdW1lbnQiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJzY29wZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwiTURDRm91bmRhdGlvbiIsImFkYXB0ZXIiLCJhZGFwdGVyXyIsIk1EQ0NoaXBBZGFwdGVyIiwiY2xhc3NOYW1lIiwidGFyZ2V0IiwicHJvcGVydHlOYW1lIiwidmFsdWUiLCJzdHJpbmdzIiwiRU5UUllfQU5JTUFUSU9OX05BTUUiLCJJTlRFUkFDVElPTl9FVkVOVCIsIlRSQUlMSU5HX0lDT05fSU5URVJBQ1RJT05fRVZFTlQiLCJSRU1PVkFMX0VWRU5UIiwiQ0hFQ0tNQVJLX1NFTEVDVE9SIiwiTEVBRElOR19JQ09OX1NFTEVDVE9SIiwiVFJBSUxJTkdfSUNPTl9TRUxFQ1RPUiIsImNzc0NsYXNzZXMiLCJDSEVDS01BUksiLCJDSElQX0VYSVQiLCJISURERU5fTEVBRElOR19JQ09OIiwiTEVBRElOR19JQ09OIiwiVFJBSUxJTkdfSUNPTiIsIlNFTEVDVEVEIiwiTURDQ2hpcEZvdW5kYXRpb24iLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiaGFzQ2xhc3MiLCJhZGRDbGFzc1RvTGVhZGluZ0ljb24iLCJyZW1vdmVDbGFzc0Zyb21MZWFkaW5nSWNvbiIsImV2ZW50VGFyZ2V0SGFzQ2xhc3MiLCJub3RpZnlJbnRlcmFjdGlvbiIsIm5vdGlmeVRyYWlsaW5nSWNvbkludGVyYWN0aW9uIiwibm90aWZ5UmVtb3ZhbCIsImdldENvbXB1dGVkU3R5bGVWYWx1ZSIsInNldFN0eWxlUHJvcGVydHkiLCJkZWZhdWx0QWRhcHRlciIsInNob3VsZFJlbW92ZU9uVHJhaWxpbmdJY29uQ2xpY2tfIiwic2VsZWN0ZWQiLCJzaG91bGRSZW1vdmUiLCJrZXlDb2RlIiwiY2hpcFdpZHRoIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic3RvcFByb3BhZ2F0aW9uIiwiYmVnaW5FeGl0IiwiTURDUmlwcGxlQWRhcHRlciIsImhhbmRsZXIiLCJ2YXJOYW1lIiwiUk9PVCIsIlVOQk9VTkRFRCIsIkJHX0ZPQ1VTRUQiLCJGR19BQ1RJVkFUSU9OIiwiRkdfREVBQ1RJVkFUSU9OIiwiVkFSX0xFRlQiLCJWQVJfVE9QIiwiVkFSX0ZHX1NJWkUiLCJWQVJfRkdfU0NBTEUiLCJWQVJfRkdfVFJBTlNMQVRFX1NUQVJUIiwiVkFSX0ZHX1RSQU5TTEFURV9FTkQiLCJudW1iZXJzIiwiUEFERElORyIsIklOSVRJQUxfT1JJR0lOX1NDQUxFIiwiREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMiLCJGR19ERUFDVElWQVRJT05fTVMiLCJUQVBfREVMQVlfTVMiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlc18iLCJzdXBwb3J0c1Bhc3NpdmVfIiwiZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1ZyIsIndpbmRvd09iaiIsIm5vZGUiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImhhc1BzZXVkb1ZhckJ1ZyIsImJvcmRlclRvcFN0eWxlIiwicmVtb3ZlIiwic3VwcG9ydHNDc3NWYXJpYWJsZXMiLCJmb3JjZVJlZnJlc2giLCJzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCIsIkNTUyIsInN1cHBvcnRzIiwiZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyIsIndlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyIsImFwcGx5UGFzc2l2ZSIsImdsb2JhbE9iaiIsInVuZGVmaW5lZCIsImlzU3VwcG9ydGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJlIiwiZ2V0TWF0Y2hlc1Byb3BlcnR5IiwiSFRNTEVsZW1lbnRQcm90b3R5cGUiLCJmaWx0ZXIiLCJwIiwicG9wIiwiZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzIiwiZXYiLCJwYWdlT2Zmc2V0IiwiY2xpZW50UmVjdCIsIngiLCJ5IiwiZG9jdW1lbnRYIiwibGVmdCIsImRvY3VtZW50WSIsInRvcCIsIm5vcm1hbGl6ZWRYIiwibm9ybWFsaXplZFkiLCJjaGFuZ2VkVG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJhY3RpdmF0ZWRUYXJnZXRzIiwiTURDUmlwcGxlRm91bmRhdGlvbiIsImJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMiLCJpc1VuYm91bmRlZCIsImlzU3VyZmFjZUFjdGl2ZSIsImlzU3VyZmFjZURpc2FibGVkIiwiY29udGFpbnNFdmVudFRhcmdldCIsInJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJkZXJlZ2lzdGVyUmVzaXplSGFuZGxlciIsInVwZGF0ZUNzc1ZhcmlhYmxlIiwiY29tcHV0ZUJvdW5kaW5nUmVjdCIsImdldFdpbmRvd1BhZ2VPZmZzZXQiLCJsYXlvdXRGcmFtZV8iLCJmcmFtZV8iLCJ3aWR0aCIsImhlaWdodCIsImFjdGl2YXRpb25TdGF0ZV8iLCJkZWZhdWx0QWN0aXZhdGlvblN0YXRlXyIsImluaXRpYWxTaXplXyIsIm1heFJhZGl1c18iLCJhY3RpdmF0ZUhhbmRsZXJfIiwiYWN0aXZhdGVfIiwiZGVhY3RpdmF0ZUhhbmRsZXJfIiwiZGVhY3RpdmF0ZV8iLCJmb2N1c0hhbmRsZXJfIiwiaGFuZGxlRm9jdXMiLCJibHVySGFuZGxlcl8iLCJoYW5kbGVCbHVyIiwicmVzaXplSGFuZGxlcl8iLCJsYXlvdXQiLCJ1bmJvdW5kZWRDb29yZHNfIiwiZmdTY2FsZV8iLCJhY3RpdmF0aW9uVGltZXJfIiwiZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfIiwiYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyIsImFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyIsInJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XyIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyIsImlzQWN0aXZhdGVkIiwiaGFzRGVhY3RpdmF0aW9uVVhSdW4iLCJ3YXNBY3RpdmF0ZWRCeVBvaW50ZXIiLCJ3YXNFbGVtZW50TWFkZUFjdGl2ZSIsImFjdGl2YXRpb25FdmVudCIsImlzUHJvZ3JhbW1hdGljIiwiaXNTdXBwb3J0ZWRfIiwicmVnaXN0ZXJSb290SGFuZGxlcnNfIiwibGF5b3V0SW50ZXJuYWxfIiwiY2xlYXJUaW1lb3V0IiwiZGVyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwicmVtb3ZlQ3NzVmFyc18iLCJmb3JFYWNoIiwia2V5cyIsImsiLCJpbmRleE9mIiwiYWN0aXZhdGlvblN0YXRlIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnQiLCJpc1NhbWVJbnRlcmFjdGlvbiIsImhhc0FjdGl2YXRlZENoaWxkIiwibGVuZ3RoIiwic29tZSIsInJlc2V0QWN0aXZhdGlvblN0YXRlXyIsInB1c2giLCJyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsImNoZWNrRWxlbWVudE1hZGVBY3RpdmVfIiwiYW5pbWF0ZUFjdGl2YXRpb25fIiwiZXZlbnQiLCJ0cmFuc2xhdGVTdGFydCIsInRyYW5zbGF0ZUVuZCIsImdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18iLCJzdGFydFBvaW50IiwiZW5kUG9pbnQiLCJybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18iLCJzZXRUaW1lb3V0IiwiYWN0aXZhdGlvbkhhc0VuZGVkIiwic3RhdGUiLCJldnRPYmplY3QiLCJhbmltYXRlRGVhY3RpdmF0aW9uXyIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibWF4RGltIiwibWF4IiwiZ2V0Qm91bmRlZFJhZGl1cyIsImh5cG90ZW51c2UiLCJzcXJ0IiwicG93IiwidXBkYXRlTGF5b3V0Q3NzVmFyc18iLCJyb3VuZCIsInVuYm91bmRlZCIsIlJpcHBsZUJhc2UiLCJyZWYiLCJNQVRDSEVTIiwiX21hdGNoZXMiLCJIVE1MRWxlbWVudCIsInByb3RvdHlwZSIsIm9wdGlvbnMiLCIkZWwiLCJkaXNhYmxlZCIsIiRzZXQiLCJjbGFzc2VzIiwiJGRlbGV0ZSIsImNvbnRhaW5zIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhZ2VYT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJSaXBwbGVNaXhpbiIsIm1vdW50ZWQiLCJyaXBwbGUiLCJpbml0IiwiYmVmb3JlRGVzdHJveSIsImRlc3Ryb3kiLCJNRENDaGlwU2V0QWRhcHRlciIsImNoaXAiLCJDSElQX1NFTEVDVE9SIiwiQ0hPSUNFIiwiRklMVEVSIiwiTURDQ2hpcFNldEZvdW5kYXRpb24iLCJyZW1vdmVDaGlwIiwic2VsZWN0ZWRDaGlwc18iLCJjaGlwRm91bmRhdGlvbiIsImRlc2VsZWN0QWxsXyIsInNldFNlbGVjdGVkIiwiaW5kZXgiLCJzcGxpY2UiLCJmb3VuZGF0aW9uIiwiaXNTZWxlY3RlZCIsImRlc2VsZWN0Iiwic2VsZWN0IiwibWRjQ2hpcCIsIm1kY0NoaXBTZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBTyxTQUFT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
