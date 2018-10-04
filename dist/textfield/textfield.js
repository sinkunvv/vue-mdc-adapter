/**
* @module vue-mdc-adaptertextfield 0.18.2
* @exports VueMDCTextfield
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCTextfield = factory());
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

    /* global CustomEvent */

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

    var VMAUniqueIdMixin = {
      beforeCreate: function beforeCreate() {
        this.vma_uid_ = scope + this._uid;
      }
    };

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
     * Adapter for MDC Text Field Helper Text.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the TextField helper text into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */
    var MDCTextFieldHelperTextAdapter = function () {
      function MDCTextFieldHelperTextAdapter() {
        classCallCheck(this, MDCTextFieldHelperTextAdapter);
      }

      createClass(MDCTextFieldHelperTextAdapter, [{
        key: "addClass",

        /**
         * Adds a class to the helper text element.
         * @param {string} className
         */
        value: function addClass(className) {}

        /**
         * Removes a class from the helper text element.
         * @param {string} className
         */

      }, {
        key: "removeClass",
        value: function removeClass(className) {}

        /**
         * Returns whether or not the helper text element contains the given class.
         * @param {string} className
         * @return {boolean}
         */

      }, {
        key: "hasClass",
        value: function hasClass(className) {}

        /**
         * Sets an attribute with a given value on the helper text element.
         * @param {string} attr
         * @param {string} value
         */

      }, {
        key: "setAttr",
        value: function setAttr(attr, value) {}

        /**
         * Removes an attribute from the helper text element.
         * @param {string} attr
         */

      }, {
        key: "removeAttr",
        value: function removeAttr(attr) {}

        /**
         * Sets the text content for the helper text element.
         * @param {string} content
         */

      }, {
        key: "setContent",
        value: function setContent(content) {}
      }]);
      return MDCTextFieldHelperTextAdapter;
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
      ARIA_HIDDEN: 'aria-hidden',
      ROLE: 'role'
    };

    /** @enum {string} */
    var cssClasses = {
      HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
      HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg'
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
     * @extends {MDCFoundation<!MDCTextFieldHelperTextAdapter>}
     * @final
     */

    var MDCTextFieldHelperTextFoundation = function (_MDCFoundation) {
      inherits(MDCTextFieldHelperTextFoundation, _MDCFoundation);
      createClass(MDCTextFieldHelperTextFoundation, null, [{
        key: 'cssClasses',

        /** @return enum {string} */
        get: function get$$1() {
          return cssClasses;
        }

        /** @return enum {string} */

      }, {
        key: 'strings',
        get: function get$$1() {
          return strings;
        }

        /**
         * {@see MDCTextFieldHelperTextAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCTextFieldHelperTextAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCTextFieldHelperTextAdapter} */{
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              hasClass: function hasClass() {},
              setAttr: function setAttr() {},
              removeAttr: function removeAttr() {},
              setContent: function setContent() {}
            }
          );
        }

        /**
         * @param {!MDCTextFieldHelperTextAdapter} adapter
         */

      }]);

      function MDCTextFieldHelperTextFoundation(adapter) {
        classCallCheck(this, MDCTextFieldHelperTextFoundation);
        return possibleConstructorReturn(this, (MDCTextFieldHelperTextFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldHelperTextFoundation)).call(this, _extends(MDCTextFieldHelperTextFoundation.defaultAdapter, adapter)));
      }

      /**
       * Sets the content of the helper text field.
       * @param {string} content
       */


      createClass(MDCTextFieldHelperTextFoundation, [{
        key: 'setContent',
        value: function setContent(content) {
          this.adapter_.setContent(content);
        }

        /** @param {boolean} isPersistent Sets the persistency of the helper text. */

      }, {
        key: 'setPersistent',
        value: function setPersistent(isPersistent) {
          if (isPersistent) {
            this.adapter_.addClass(cssClasses.HELPER_TEXT_PERSISTENT);
          } else {
            this.adapter_.removeClass(cssClasses.HELPER_TEXT_PERSISTENT);
          }
        }

        /**
         * @param {boolean} isValidation True to make the helper text act as an
         *   error validation message.
         */

      }, {
        key: 'setValidation',
        value: function setValidation(isValidation) {
          if (isValidation) {
            this.adapter_.addClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
          } else {
            this.adapter_.removeClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
          }
        }

        /** Makes the helper text visible to the screen reader. */

      }, {
        key: 'showToScreenReader',
        value: function showToScreenReader() {
          this.adapter_.removeAttr(strings.ARIA_HIDDEN);
        }

        /**
         * Sets the validity of the helper text based on the input validity.
         * @param {boolean} inputIsValid
         */

      }, {
        key: 'setValidity',
        value: function setValidity(inputIsValid) {
          var helperTextIsPersistent = this.adapter_.hasClass(cssClasses.HELPER_TEXT_PERSISTENT);
          var helperTextIsValidationMsg = this.adapter_.hasClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
          var validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;

          if (validationMsgNeedsDisplay) {
            this.adapter_.setAttr(strings.ROLE, 'alert');
          } else {
            this.adapter_.removeAttr(strings.ROLE);
          }

          if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
            this.hide_();
          }
        }

        /**
         * Hides the help text from screen readers.
         * @private
         */

      }, {
        key: 'hide_',
        value: function hide_() {
          this.adapter_.setAttr(strings.ARIA_HIDDEN, 'true');
        }
      }]);
      return MDCTextFieldHelperTextFoundation;
    }(MDCFoundation);

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
     * Adapter for MDC Text Field Icon.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the text field icon into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */
    var MDCTextFieldIconAdapter = function () {
      function MDCTextFieldIconAdapter() {
        classCallCheck(this, MDCTextFieldIconAdapter);
      }

      createClass(MDCTextFieldIconAdapter, [{
        key: "getAttr",

        /**
         * Gets the value of an attribute on the icon element.
         * @param {string} attr
         * @return {string}
         */
        value: function getAttr(attr) {}

        /**
         * Sets an attribute on the icon element.
         * @param {string} attr
         * @param {string} value
         */

      }, {
        key: "setAttr",
        value: function setAttr(attr, value) {}

        /**
         * Removes an attribute from the icon element.
         * @param {string} attr
         */

      }, {
        key: "removeAttr",
        value: function removeAttr(attr) {}

        /**
         * Sets the text content of the icon element.
         * @param {string} content
         */

      }, {
        key: "setContent",
        value: function setContent(content) {}

        /**
         * Registers an event listener on the icon element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "registerInteractionHandler",
        value: function registerInteractionHandler(evtType, handler) {}

        /**
         * Deregisters an event listener on the icon element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "deregisterInteractionHandler",
        value: function deregisterInteractionHandler(evtType, handler) {}

        /**
         * Emits a custom event "MDCTextField:icon" denoting a user has clicked the icon.
         */

      }, {
        key: "notifyIconAction",
        value: function notifyIconAction() {}
      }]);
      return MDCTextFieldIconAdapter;
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
    var strings$1 = {
      ICON_EVENT: 'MDCTextField:icon',
      ICON_ROLE: 'button'
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
     * @extends {MDCFoundation<!MDCTextFieldIconAdapter>}
     * @final
     */

    var MDCTextFieldIconFoundation = function (_MDCFoundation) {
      inherits(MDCTextFieldIconFoundation, _MDCFoundation);
      createClass(MDCTextFieldIconFoundation, null, [{
        key: 'strings',

        /** @return enum {string} */
        get: function get$$1() {
          return strings$1;
        }

        /**
         * {@see MDCTextFieldIconAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCTextFieldIconAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCTextFieldIconAdapter} */{
              getAttr: function getAttr() {},
              setAttr: function setAttr() {},
              removeAttr: function removeAttr() {},
              setContent: function setContent() {},
              registerInteractionHandler: function registerInteractionHandler() {},
              deregisterInteractionHandler: function deregisterInteractionHandler() {},
              notifyIconAction: function notifyIconAction() {}
            }
          );
        }

        /**
         * @param {!MDCTextFieldIconAdapter} adapter
         */

      }]);

      function MDCTextFieldIconFoundation(adapter) {
        classCallCheck(this, MDCTextFieldIconFoundation);

        /** @private {string?} */
        var _this = possibleConstructorReturn(this, (MDCTextFieldIconFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldIconFoundation)).call(this, _extends(MDCTextFieldIconFoundation.defaultAdapter, adapter)));

        _this.savedTabIndex_ = null;

        /** @private {function(!Event): undefined} */
        _this.interactionHandler_ = function (evt) {
          return _this.handleInteraction(evt);
        };
        return _this;
      }

      createClass(MDCTextFieldIconFoundation, [{
        key: 'init',
        value: function init() {
          var _this2 = this;

          this.savedTabIndex_ = this.adapter_.getAttr('tabindex');

          ['click', 'keydown'].forEach(function (evtType) {
            _this2.adapter_.registerInteractionHandler(evtType, _this2.interactionHandler_);
          });
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          var _this3 = this;

          ['click', 'keydown'].forEach(function (evtType) {
            _this3.adapter_.deregisterInteractionHandler(evtType, _this3.interactionHandler_);
          });
        }

        /** @param {boolean} disabled */

      }, {
        key: 'setDisabled',
        value: function setDisabled(disabled) {
          if (!this.savedTabIndex_) {
            return;
          }

          if (disabled) {
            this.adapter_.setAttr('tabindex', '-1');
            this.adapter_.removeAttr('role');
          } else {
            this.adapter_.setAttr('tabindex', this.savedTabIndex_);
            this.adapter_.setAttr('role', strings$1.ICON_ROLE);
          }
        }

        /** @param {string} label */

      }, {
        key: 'setAriaLabel',
        value: function setAriaLabel(label) {
          this.adapter_.setAttr('aria-label', label);
        }

        /** @param {string} content */

      }, {
        key: 'setContent',
        value: function setContent(content) {
          this.adapter_.setContent(content);
        }

        /**
         * Handles an interaction event
         * @param {!Event} evt
         */

      }, {
        key: 'handleInteraction',
        value: function handleInteraction(evt) {
          if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
            this.adapter_.notifyIconAction();
          }
        }
      }]);
      return MDCTextFieldIconFoundation;
    }(MDCFoundation);

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
     * Adapter for MDC Text Field.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the Text Field into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */

    var MDCTextFieldAdapter = function () {
      function MDCTextFieldAdapter() {
        classCallCheck(this, MDCTextFieldAdapter);
      }

      createClass(MDCTextFieldAdapter, [{
        key: 'addClass',

        /**
         * Adds a class to the root Element.
         * @param {string} className
         */
        value: function addClass(className) {}

        /**
         * Removes a class from the root Element.
         * @param {string} className
         */

      }, {
        key: 'removeClass',
        value: function removeClass(className) {}

        /**
         * Returns true if the root element contains the given class name.
         * @param {string} className
         * @return {boolean}
         */

      }, {
        key: 'hasClass',
        value: function hasClass(className) {}

        /**
         * Registers an event handler on the root element for a given event.
         * @param {string} type
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: 'registerTextFieldInteractionHandler',
        value: function registerTextFieldInteractionHandler(type, handler) {}

        /**
         * Deregisters an event handler on the root element for a given event.
         * @param {string} type
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: 'deregisterTextFieldInteractionHandler',
        value: function deregisterTextFieldInteractionHandler(type, handler) {}

        /**
         * Registers an event listener on the native input element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: 'registerInputInteractionHandler',
        value: function registerInputInteractionHandler(evtType, handler) {}

        /**
         * Deregisters an event listener on the native input element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: 'deregisterInputInteractionHandler',
        value: function deregisterInputInteractionHandler(evtType, handler) {}

        /**
         * Registers a validation attribute change listener on the input element.
         * Handler accepts list of attribute names.
         * @param {function(!Array<string>): undefined} handler
         * @return {!MutationObserver}
         */

      }, {
        key: 'registerValidationAttributeChangeHandler',
        value: function registerValidationAttributeChangeHandler(handler) {}

        /**
         * Disconnects a validation attribute observer on the input element.
         * @param {!MutationObserver} observer
         */

      }, {
        key: 'deregisterValidationAttributeChangeHandler',
        value: function deregisterValidationAttributeChangeHandler(observer) {}

        /**
         * Returns an object representing the native text input element, with a
         * similar API shape. The object returned should include the value, disabled
         * and badInput properties, as well as the checkValidity() function. We never
         * alter the value within our code, however we do update the disabled
         * property, so if you choose to duck-type the return value for this method
         * in your implementation it's important to keep this in mind. Also note that
         * this method can return null, which the foundation will handle gracefully.
         * @return {?Element|?NativeInputType}
         */

      }, {
        key: 'getNativeInput',
        value: function getNativeInput() {}

        /**
         * Returns true if the textfield is focused.
         * We achieve this via `document.activeElement === this.root_`.
         * @return {boolean}
         */

      }, {
        key: 'isFocused',
        value: function isFocused() {}

        /**
         * Returns true if the direction of the root element is set to RTL.
         * @return {boolean}
         */

      }, {
        key: 'isRtl',
        value: function isRtl() {}

        /**
         * Activates the line ripple.
         */

      }, {
        key: 'activateLineRipple',
        value: function activateLineRipple() {}

        /**
         * Deactivates the line ripple.
         */

      }, {
        key: 'deactivateLineRipple',
        value: function deactivateLineRipple() {}

        /**
         * Sets the transform origin of the line ripple.
         * @param {number} normalizedX
         */

      }, {
        key: 'setLineRippleTransformOrigin',
        value: function setLineRippleTransformOrigin(normalizedX) {}

        /**
         * Only implement if label exists.
         * Shakes label if shouldShake is true.
         * @param {boolean} shouldShake
         */

      }, {
        key: 'shakeLabel',
        value: function shakeLabel(shouldShake) {}

        /**
         * Only implement if label exists.
         * Floats the label above the input element if shouldFloat is true.
         * @param {boolean} shouldFloat
         */

      }, {
        key: 'floatLabel',
        value: function floatLabel(shouldFloat) {}

        /**
         * Returns true if label element exists, false if it doesn't.
         * @return {boolean}
         */

      }, {
        key: 'hasLabel',
        value: function hasLabel() {}

        /**
         * Only implement if label exists.
         * Returns width of label in pixels.
         * @return {number}
         */

      }, {
        key: 'getLabelWidth',
        value: function getLabelWidth() {}

        /**
         * Returns true if outline element exists, false if it doesn't.
         * @return {boolean}
         */

      }, {
        key: 'hasOutline',
        value: function hasOutline() {}

        /**
         * Only implement if outline element exists.
         * Updates SVG Path and outline element based on the
         * label element width and RTL context.
         * @param {number} labelWidth
         * @param {boolean=} isRtl
         */

      }, {
        key: 'notchOutline',
        value: function notchOutline(labelWidth, isRtl) {}

        /**
         * Only implement if outline element exists.
         * Closes notch in outline element.
         */

      }, {
        key: 'closeOutline',
        value: function closeOutline() {}
      }]);
      return MDCTextFieldAdapter;
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
      ARIA_CONTROLS: 'aria-controls',
      INPUT_SELECTOR: '.mdc-text-field__input',
      LABEL_SELECTOR: '.mdc-floating-label',
      ICON_SELECTOR: '.mdc-text-field__icon',
      OUTLINE_SELECTOR: '.mdc-notched-outline',
      LINE_RIPPLE_SELECTOR: '.mdc-line-ripple'
    };

    /** @enum {string} */
    var cssClasses$1 = {
      ROOT: 'mdc-text-field',
      UPGRADED: 'mdc-text-field--upgraded',
      DISABLED: 'mdc-text-field--disabled',
      DENSE: 'mdc-text-field--dense',
      FOCUSED: 'mdc-text-field--focused',
      INVALID: 'mdc-text-field--invalid',
      BOX: 'mdc-text-field--box',
      OUTLINED: 'mdc-text-field--outlined'
    };

    /** @enum {number} */
    var numbers = {
      LABEL_SCALE: 0.75,
      DENSE_LABEL_SCALE: 0.923
    };

    // whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
    // under section: `Validation-related attributes`
    var VALIDATION_ATTR_WHITELIST = ['pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength'];

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
     * @extends {MDCFoundation<!MDCTextFieldAdapter>}
     * @final
     */

    var MDCTextFieldFoundation = function (_MDCFoundation) {
      inherits(MDCTextFieldFoundation, _MDCFoundation);
      createClass(MDCTextFieldFoundation, [{
        key: 'shouldShake',


        /** @return {boolean} */
        get: function get$$1() {
          return !this.isValid() && !this.isFocused_;
        }

        /** @return {boolean} */

      }, {
        key: 'shouldFloat',
        get: function get$$1() {
          return this.isFocused_ || !!this.getValue() || this.isBadInput_();
        }

        /**
         * {@see MDCTextFieldAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCTextFieldAdapter}
         */

      }], [{
        key: 'cssClasses',

        /** @return enum {string} */
        get: function get$$1() {
          return cssClasses$1;
        }

        /** @return enum {string} */

      }, {
        key: 'strings',
        get: function get$$1() {
          return strings$2;
        }

        /** @return enum {string} */

      }, {
        key: 'numbers',
        get: function get$$1() {
          return numbers;
        }
      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCTextFieldAdapter} */{
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              hasClass: function hasClass() {},
              registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler() {},
              deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler() {},
              registerInputInteractionHandler: function registerInputInteractionHandler() {},
              deregisterInputInteractionHandler: function deregisterInputInteractionHandler() {},
              registerValidationAttributeChangeHandler: function registerValidationAttributeChangeHandler() {},
              deregisterValidationAttributeChangeHandler: function deregisterValidationAttributeChangeHandler() {},
              getNativeInput: function getNativeInput() {},
              isFocused: function isFocused() {},
              isRtl: function isRtl() {},
              activateLineRipple: function activateLineRipple() {},
              deactivateLineRipple: function deactivateLineRipple() {},
              setLineRippleTransformOrigin: function setLineRippleTransformOrigin() {},
              shakeLabel: function shakeLabel() {},
              floatLabel: function floatLabel() {},
              hasLabel: function hasLabel() {},
              getLabelWidth: function getLabelWidth() {},
              hasOutline: function hasOutline() {},
              notchOutline: function notchOutline() {},
              closeOutline: function closeOutline() {}
            }
          );
        }

        /**
         * @param {!MDCTextFieldAdapter} adapter
         * @param {!FoundationMapType=} foundationMap Map from subcomponent names to their subfoundations.
         */

      }]);

      function MDCTextFieldFoundation(adapter) {
        var foundationMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /** @type {!FoundationMapType} */{};
        classCallCheck(this, MDCTextFieldFoundation);

        /** @type {!MDCTextFieldHelperTextFoundation|undefined} */
        var _this = possibleConstructorReturn(this, (MDCTextFieldFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldFoundation)).call(this, _extends(MDCTextFieldFoundation.defaultAdapter, adapter)));

        _this.helperText_ = foundationMap.helperText;
        /** @type {!MDCTextFieldIconFoundation|undefined} */
        _this.icon_ = foundationMap.icon;

        /** @private {boolean} */
        _this.isFocused_ = false;
        /** @private {boolean} */
        _this.receivedUserInput_ = false;
        /** @private {boolean} */
        _this.useCustomValidityChecking_ = false;
        /** @private {boolean} */
        _this.isValid_ = true;
        /** @private {function(): undefined} */
        _this.inputFocusHandler_ = function () {
          return _this.activateFocus();
        };
        /** @private {function(): undefined} */
        _this.inputBlurHandler_ = function () {
          return _this.deactivateFocus();
        };
        /** @private {function(): undefined} */
        _this.inputInputHandler_ = function () {
          return _this.autoCompleteFocus();
        };
        /** @private {function(!Event): undefined} */
        _this.setPointerXOffset_ = function (evt) {
          return _this.setTransformOrigin(evt);
        };
        /** @private {function(!Event): undefined} */
        _this.textFieldInteractionHandler_ = function () {
          return _this.handleTextFieldInteraction();
        };
        /** @private {function(!Array): undefined} */
        _this.validationAttributeChangeHandler_ = function (attributesList) {
          return _this.handleValidationAttributeChange(attributesList);
        };

        /** @private {!MutationObserver} */
        _this.validationObserver_;
        return _this;
      }

      createClass(MDCTextFieldFoundation, [{
        key: 'init',
        value: function init() {
          var _this2 = this;

          this.adapter_.addClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
          // Ensure label does not collide with any pre-filled value.
          if (this.adapter_.hasLabel() && (this.getValue() || this.isBadInput_())) {
            this.adapter_.floatLabel(this.shouldFloat);
            this.notchOutline(this.shouldFloat);
          }

          if (this.adapter_.isFocused()) {
            this.inputFocusHandler_();
          }

          this.adapter_.registerInputInteractionHandler('focus', this.inputFocusHandler_);
          this.adapter_.registerInputInteractionHandler('blur', this.inputBlurHandler_);
          this.adapter_.registerInputInteractionHandler('input', this.inputInputHandler_);
          ['mousedown', 'touchstart'].forEach(function (evtType) {
            _this2.adapter_.registerInputInteractionHandler(evtType, _this2.setPointerXOffset_);
          });
          ['click', 'keydown'].forEach(function (evtType) {
            _this2.adapter_.registerTextFieldInteractionHandler(evtType, _this2.textFieldInteractionHandler_);
          });
          this.validationObserver_ = this.adapter_.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          var _this3 = this;

          this.adapter_.removeClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
          this.adapter_.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
          this.adapter_.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
          this.adapter_.deregisterInputInteractionHandler('input', this.inputInputHandler_);
          ['mousedown', 'touchstart'].forEach(function (evtType) {
            _this3.adapter_.deregisterInputInteractionHandler(evtType, _this3.setPointerXOffset_);
          });
          ['click', 'keydown'].forEach(function (evtType) {
            _this3.adapter_.deregisterTextFieldInteractionHandler(evtType, _this3.textFieldInteractionHandler_);
          });
          this.adapter_.deregisterValidationAttributeChangeHandler(this.validationObserver_);
        }

        /**
         * Handles user interactions with the Text Field.
         */

      }, {
        key: 'handleTextFieldInteraction',
        value: function handleTextFieldInteraction() {
          if (this.adapter_.getNativeInput().disabled) {
            return;
          }
          this.receivedUserInput_ = true;
        }

        /**
         * Handles validation attribute changes
         * @param {!Array<string>} attributesList
         */

      }, {
        key: 'handleValidationAttributeChange',
        value: function handleValidationAttributeChange(attributesList) {
          var _this4 = this;

          attributesList.some(function (attributeName) {
            if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
              _this4.styleValidity_(true);
              return true;
            }
          });
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
            var isDense = this.adapter_.hasClass(cssClasses$1.DENSE);
            var labelScale = isDense ? numbers.DENSE_LABEL_SCALE : numbers.LABEL_SCALE;
            var labelWidth = this.adapter_.getLabelWidth() * labelScale;
            var isRtl = this.adapter_.isRtl();
            this.adapter_.notchOutline(labelWidth, isRtl);
          } else {
            this.adapter_.closeOutline();
          }
        }

        /**
         * Activates the text field focus state.
         */

      }, {
        key: 'activateFocus',
        value: function activateFocus() {
          this.isFocused_ = true;
          this.styleFocused_(this.isFocused_);
          this.adapter_.activateLineRipple();
          this.notchOutline(this.shouldFloat);
          if (this.adapter_.hasLabel()) {
            this.adapter_.shakeLabel(this.shouldShake);
            this.adapter_.floatLabel(this.shouldFloat);
          }
          if (this.helperText_) {
            this.helperText_.showToScreenReader();
          }
        }

        /**
         * Sets the line ripple's transform origin, so that the line ripple activate
         * animation will animate out from the user's click location.
         * @param {!Event} evt
         */

      }, {
        key: 'setTransformOrigin',
        value: function setTransformOrigin(evt) {
          var targetClientRect = evt.target.getBoundingClientRect();
          var evtCoords = { x: evt.clientX, y: evt.clientY };
          var normalizedX = evtCoords.x - targetClientRect.left;
          this.adapter_.setLineRippleTransformOrigin(normalizedX);
        }

        /**
         * Activates the Text Field's focus state in cases when the input value
         * changes without user input (e.g. programatically).
         */

      }, {
        key: 'autoCompleteFocus',
        value: function autoCompleteFocus() {
          if (!this.receivedUserInput_) {
            this.activateFocus();
          }
        }

        /**
         * Deactivates the Text Field's focus state.
         */

      }, {
        key: 'deactivateFocus',
        value: function deactivateFocus() {
          this.isFocused_ = false;
          this.adapter_.deactivateLineRipple();
          var input = this.getNativeInput_();
          var shouldRemoveLabelFloat = !input.value && !this.isBadInput_();
          var isValid = this.isValid();
          this.styleValidity_(isValid);
          this.styleFocused_(this.isFocused_);
          if (this.adapter_.hasLabel()) {
            this.adapter_.shakeLabel(this.shouldShake);
            this.adapter_.floatLabel(this.shouldFloat);
            this.notchOutline(this.shouldFloat);
          }
          if (shouldRemoveLabelFloat) {
            this.receivedUserInput_ = false;
          }
        }

        /**
         * @return {string} The value of the input Element.
         */

      }, {
        key: 'getValue',
        value: function getValue() {
          return this.getNativeInput_().value;
        }

        /**
         * @param {string} value The value to set on the input Element.
         */

      }, {
        key: 'setValue',
        value: function setValue(value) {
          this.getNativeInput_().value = value;
          var isValid = this.isValid();
          this.styleValidity_(isValid);
          if (this.adapter_.hasLabel()) {
            this.adapter_.shakeLabel(this.shouldShake);
            this.adapter_.floatLabel(this.shouldFloat);
            this.notchOutline(this.shouldFloat);
          }
        }

        /**
         * @return {boolean} If a custom validity is set, returns that value.
         *     Otherwise, returns the result of native validity checks.
         */

      }, {
        key: 'isValid',
        value: function isValid() {
          return this.useCustomValidityChecking_ ? this.isValid_ : this.isNativeInputValid_();
        }

        /**
         * @param {boolean} isValid Sets the validity state of the Text Field.
         */

      }, {
        key: 'setValid',
        value: function setValid(isValid) {
          this.useCustomValidityChecking_ = true;
          this.isValid_ = isValid;
          // Retrieve from the getter to ensure correct logic is applied.
          isValid = this.isValid();
          this.styleValidity_(isValid);
          if (this.adapter_.hasLabel()) {
            this.adapter_.shakeLabel(this.shouldShake);
          }
        }

        /**
         * @return {boolean} True if the Text Field is disabled.
         */

      }, {
        key: 'isDisabled',
        value: function isDisabled() {
          return this.getNativeInput_().disabled;
        }

        /**
         * @param {boolean} disabled Sets the text-field disabled or enabled.
         */

      }, {
        key: 'setDisabled',
        value: function setDisabled(disabled) {
          this.getNativeInput_().disabled = disabled;
          this.styleDisabled_(disabled);
        }

        /**
         * @param {string} content Sets the content of the helper text.
         */

      }, {
        key: 'setHelperTextContent',
        value: function setHelperTextContent(content) {
          if (this.helperText_) {
            this.helperText_.setContent(content);
          }
        }

        /**
         * Sets the aria label of the icon.
         * @param {string} label
         */

      }, {
        key: 'setIconAriaLabel',
        value: function setIconAriaLabel(label) {
          if (this.icon_) {
            this.icon_.setAriaLabel(label);
          }
        }

        /**
         * Sets the text content of the icon.
         * @param {string} content
         */

      }, {
        key: 'setIconContent',
        value: function setIconContent(content) {
          if (this.icon_) {
            this.icon_.setContent(content);
          }
        }

        /**
         * @return {boolean} True if the Text Field input fails in converting the
         *     user-supplied value.
         * @private
         */

      }, {
        key: 'isBadInput_',
        value: function isBadInput_() {
          return this.getNativeInput_().validity.badInput;
        }

        /**
         * @return {boolean} The result of native validity checking
         *     (ValidityState.valid).
         */

      }, {
        key: 'isNativeInputValid_',
        value: function isNativeInputValid_() {
          return this.getNativeInput_().validity.valid;
        }

        /**
         * Styles the component based on the validity state.
         * @param {boolean} isValid
         * @private
         */

      }, {
        key: 'styleValidity_',
        value: function styleValidity_(isValid) {
          var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;

          if (isValid) {
            this.adapter_.removeClass(INVALID);
          } else {
            this.adapter_.addClass(INVALID);
          }
          if (this.helperText_) {
            this.helperText_.setValidity(isValid);
          }
        }

        /**
         * Styles the component based on the focused state.
         * @param {boolean} isFocused
         * @private
         */

      }, {
        key: 'styleFocused_',
        value: function styleFocused_(isFocused) {
          var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;

          if (isFocused) {
            this.adapter_.addClass(FOCUSED);
          } else {
            this.adapter_.removeClass(FOCUSED);
          }
        }

        /**
         * Styles the component based on the disabled state.
         * @param {boolean} isDisabled
         * @private
         */

      }, {
        key: 'styleDisabled_',
        value: function styleDisabled_(isDisabled) {
          var _MDCTextFieldFoundati = MDCTextFieldFoundation.cssClasses,
              DISABLED = _MDCTextFieldFoundati.DISABLED,
              INVALID = _MDCTextFieldFoundati.INVALID;

          if (isDisabled) {
            this.adapter_.addClass(DISABLED);
            this.adapter_.removeClass(INVALID);
          } else {
            this.adapter_.removeClass(DISABLED);
          }
          if (this.icon_) {
            this.icon_.setDisabled(isDisabled);
          }
        }

        /**
         * @return {!Element|!NativeInputType} The native text input from the
         * host environment, or a dummy if none exists.
         * @private
         */

      }, {
        key: 'getNativeInput_',
        value: function getNativeInput_() {
          return this.adapter_.getNativeInput() ||
          /** @type {!NativeInputType} */{
            value: '',
            disabled: false,
            validity: {
              badInput: false,
              valid: true
            }
          };
        }
      }]);
      return MDCTextFieldFoundation;
    }(MDCFoundation);

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
    var cssClasses$2 = {
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
          return cssClasses$2;
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
          this.adapter_.removeClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);
          this.adapter_.addClass(cssClasses$2.LINE_RIPPLE_ACTIVE);
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
          this.adapter_.addClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);
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
          var isDeactivating = this.adapter_.hasClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);

          if (evt.propertyName === 'opacity') {
            if (isDeactivating) {
              this.adapter_.removeClass(cssClasses$2.LINE_RIPPLE_ACTIVE);
              this.adapter_.removeClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);
            }
          }
        }
      }]);
      return MDCLineRippleFoundation;
    }(MDCFoundation);

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
    var cssClasses$3 = {
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
          return cssClasses$3;
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
    var strings$3 = {
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
          return strings$3;
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

    var cssClasses$5 = {
      // Ripple is a special case where the "root" component is really a "mixin" of sorts,
      // given that it's an 'upgrade' to an existing component. That being said it is the root
      // CSS class that all other CSS classes derive from.
      ROOT: 'mdc-ripple-upgraded',
      UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
      BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
      FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
      FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
    };

    var strings$4 = {
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
          return cssClasses$5;
        }
      }, {
        key: 'strings',
        get: function get$$1() {
          return strings$4;
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

    //

    var script$1 = {
      name: 'mdc-textfield',
      mixins: [CustomElementMixin, DispatchFocusMixin, VMAUniqueIdMixin],
      inheritAttrs: false,
      model: {
        prop: 'value',
        event: 'model'
      },
      props: {
        value: String,
        type: {
          type: String,
          default: 'text',
          validator: function validator(value) {
            return ['text', 'email', 'search', 'password', 'tel', 'url', 'number', 'date'].indexOf(value) !== -1;
          }
        },
        dense: Boolean,
        label: String,
        helptext: String,
        helptextPersistent: Boolean,
        helptextValidation: Boolean,
        box: Boolean,
        outline: Boolean,
        disabled: Boolean,
        required: Boolean,
        valid: { type: Boolean, default: undefined },
        fullwidth: Boolean,
        multiline: Boolean,
        leadingIcon: [String, Array, Object],
        trailingIcon: [String, Array, Object],
        size: { type: [Number, String], default: 20 },
        minlength: { type: [Number, String], default: undefined },
        maxlength: { type: [Number, String], default: undefined },
        rows: { type: [Number, String], default: 8 },
        cols: { type: [Number, String], default: 40 },
        id: { type: String }
      },
      data: function data() {
        return {
          text: this.value,
          rootClasses: {
            'mdc-textfield': true,
            'mdc-text-field': true,
            'mdc-text-field--upgraded': true,
            'mdc-text-field--disabled': this.disabled,
            'mdc-text-field--dense': this.dense,
            'mdc-text-field--fullwidth': this.fullwidth,
            'mdc-text-field--textarea': this.multiline,
            'mdc-text-field--box': !this.fullwidth && this.box,
            'mdc-text-field--outlined': !this.fullwidth && this.outline
          },
          inputClasses: {
            'mdc-text-field__input': true
          },
          labelClasses: {
            'mdc-floating-label': true
          },
          lineRippleClasses: {
            'mdc-line-ripple': true
          },
          lineRippleStyles: {},
          helpClasses: {
            'mdc-text-field-helper-text': true,
            'mdc-text-field-helper-text--persistent': this.helptextPersistent,
            'mdc-text-field-helper-text--validation-msg': this.helptextValidation
          },
          outlineClasses: {},
          outlinePathAttr: undefined
        };
      },
      computed: {
        inputPlaceHolder: function inputPlaceHolder() {
          return this.fullwidth ? this.label : undefined;
        },
        inputAriaControls: function inputAriaControls() {
          return this.help ? 'help-' + this.vma_uid_ : undefined;
        },
        hasLabel: function hasLabel() {
          return !this.fullwidth && this.label;
        },
        hasOutline: function hasOutline() {
          return !this.fullwidth && this.outline;
        },
        hasLineRipple: function hasLineRipple() {
          return !this.hasOutline && !this.multiline;
        },
        hasLeadingIcon: function hasLeadingIcon() {
          if ((this.leadingIcon || this.$slots['leading-icon']) && !(this.trailingIcon || this.$slots['trailing-icon'])) {
            return this.leadingIcon ? extractIconProp(this.leadingIcon) : {};
          }
          return false;
        },
        hasTrailingIcon: function hasTrailingIcon() {
          if (this.trailingIcon || this.$slots['trailing-icon']) {
            return this.trailingIcon ? extractIconProp(this.trailingIcon) : {};
          }
          return false;
        },
        labelClassesUpgraded: function labelClassesUpgraded() {
          return _extends(this.labelClasses, {
            'mdc-floating-label--float-above': this.value
          });
        }
      },
      watch: {
        disabled: function disabled() {
          this.foundation && this.foundation.setDisabled(this.disabled);
        },
        required: function required() {
          this.$refs.input && (this.$refs.input.required = this.required);
        },
        valid: function valid() {
          if (typeof this.valid !== 'undefined') {
            this.foundation && this.foundation.setValid(this.valid);
          }
        },
        dense: function dense() {
          this.$set(this.rootClasses, 'mdc-text-field--dense', this.dense);
        },
        helptextPersistent: function helptextPersistent() {
          this.helperTextFoundation && this.helperTextFoundation.setPersistent(this.helptextPersistent);
        },
        helptextValidation: function helptextValidation() {
          this.helperTextFoundation && this.helperTextFoundation.setValidation(this.helptextValidation);
        },
        value: function value(_value) {
          if (this.foundation) {
            if (_value !== this.foundation.getValue()) {
              this.foundation.setValue(_value);
            }
          }
        }
      },
      mounted: function mounted() {
        var _this = this;

        if (this.$refs.lineRipple) {
          this.lineRippleFoundation = new MDCLineRippleFoundation({
            addClass: function addClass(className) {
              _this.$set(_this.lineRippleClasses, className, true);
            },
            removeClass: function removeClass(className) {
              _this.$delete(_this.lineRippleClasses, className);
            },
            hasClass: function hasClass(className) {
              _this.$refs.lineRipple.classList.contains(className);
            },
            setStyle: function setStyle(name, value) {
              _this.$set(_this.lineRippleStyles, name, value);
            },
            registerEventHandler: function registerEventHandler(evtType, handler) {
              _this.$refs.lineRipple.addEventListener(evtType, handler);
            },
            deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
              _this.$refs.lineRipple.removeEventListener(evtType, handler);
            }
          });
          this.lineRippleFoundation.init();
        }

        if (this.$refs.help) {
          this.helperTextFoundation = new MDCTextFieldHelperTextFoundation({
            addClass: function addClass(className) {
              _this.$set(_this.helpClasses, className, true);
            },
            removeClass: function removeClass(className) {
              _this.$delete(_this.helpClasses, className);
            },
            hasClass: function hasClass(className) {
              return _this.$refs.help.classList.contains(className);
            },
            setAttr: function setAttr(name, value) {
              _this.$refs.help.setAttribute(name, value);
            },
            removeAttr: function removeAttr(name) {
              _this.$refs.help.removeAttribute(name);
            },
            setContent: function setContent() /*content*/{
              // help text get's updated from {{helptext}}
              // this.$refs.help.textContent = content;
            }
          });
          this.helperTextFoundation.init();
        }

        if (this.$refs.icon) {
          if (this.hasLeadingIcon) {
            this.$set(this.rootClasses, 'mdc-text-field--with-leading-icon', true);
          } else if (this.hasTrailingIcon) {
            this.$set(this.rootClasses, 'mdc-text-field--with-trailing-icon', true);
          }

          this.iconFoundation = new MDCTextFieldIconFoundation({
            setAttr: function setAttr(attr, value) {
              return _this.$refs.icon.setAttribute(attr, value);
            },
            getAttr: function getAttr(attr) {
              return _this.$refs.icon.getAttribute(attr);
            },
            removeAttr: function removeAttr(attr) {
              return _this.$refs.icon.removeAttribute(attr);
            },
            setContent: function setContent() /*content*/{
              // icon text get's updated from {{{{ hasTrailingIcon.content }}}}
              // this.$refs.icon.textContent = content;
            },
            registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
              _this.$refs.icon.addEventListener(evtType, handler);
            },
            deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
              _this.$refs.icon.removeEventListener(evtType, handler);
            },
            notifyIconAction: function notifyIconAction() {
              return _this.$emit('icon-action');
            }
          });
          this.iconFoundation.init();
        }

        if (this.$refs.label) {
          this.labelFoundation = new MDCFloatingLabelFoundation({
            addClass: function addClass(className) {
              _this.$set(_this.labelClasses, className, true);
            },
            removeClass: function removeClass(className) {
              _this.$delete(_this.labelClasses, className);
            },
            getWidth: function getWidth() {
              return _this.$refs.label.offsetWidth;
            },
            registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
              _this.$refs.label.addEventListener(evtType, handler);
            },
            deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
              _this.$refs.label.removeEventListener(evtType, handler);
            }
          });
          this.labelFoundation.init();
        }

        if (this.$refs.outline) {
          this.outlineFoundation = new MDCNotchedOutlineFoundation({
            getWidth: function getWidth() {
              return _this.$refs.outline.offsetWidth;
            },
            getHeight: function getHeight() {
              return _this.$refs.outline.offsetHeight;
            },
            addClass: function addClass(className) {
              _this.$set(_this.outlineClasses, className, true);
            },
            removeClass: function removeClass(className) {
              _this.$delete(_this.outlineClasses, className);
            },
            setOutlinePathAttr: function setOutlinePathAttr(value) {
              _this.outlinePathAttr = value;
            },
            getIdleOutlineStyleValue: function getIdleOutlineStyleValue(propertyName) {
              var idleOutlineElement = _this.$refs.outlineIdle;
              if (idleOutlineElement) {
                return window.getComputedStyle(idleOutlineElement).getPropertyValue(propertyName);
              }
            }
          });
          this.outlineFoundation.init();
        }

        this.foundation = new MDCTextFieldFoundation({
          addClass: function addClass(className) {
            _this.$set(_this.rootClasses, className, true);
          },
          removeClass: function removeClass(className) {
            _this.$delete(_this.rootClasses, className);
          },
          hasClass: function hasClass(className) {
            _this.$refs.root.classList.contains(className);
          },
          registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler(evtType, handler) {
            _this.$refs.root.addEventListener(evtType, handler);
          },
          deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler(evtType, handler) {
            _this.$refs.root.removeEventListener(evtType, handler);
          },
          isFocused: function isFocused() {
            return document.activeElement === _this.$refs.input;
          },
          isRtl: function isRtl() {
            return window.getComputedStyle(_this.$refs.root).getPropertyValue('direction') === 'rtl';
          },
          deactivateLineRipple: function deactivateLineRipple() {
            if (_this.lineRippleFoundation) {
              _this.lineRippleFoundation.deactivate();
            }
          },
          activateLineRipple: function activateLineRipple() {
            if (_this.lineRippleFoundation) {
              _this.lineRippleFoundation.activate();
            }
          },
          setLineRippleTransformOrigin: function setLineRippleTransformOrigin(normalizedX) {
            if (_this.lineRippleFoundation) {
              _this.lineRippleFoundation.setRippleCenter(normalizedX);
            }
          },
          registerInputInteractionHandler: function registerInputInteractionHandler(evtType, handler) {
            _this.$refs.input.addEventListener(evtType, handler, applyPassive());
          },
          deregisterInputInteractionHandler: function deregisterInputInteractionHandler(evtType, handler) {
            _this.$refs.input.removeEventListener(evtType, handler, applyPassive());
          },
          registerValidationAttributeChangeHandler: function registerValidationAttributeChangeHandler(handler) {
            var getAttributesList = function getAttributesList(mutationsList) {
              return mutationsList.map(function (mutation) {
                return mutation.attributeName;
              });
            };
            var observer = new MutationObserver(function (mutationsList) {
              return handler(getAttributesList(mutationsList));
            });
            var targetNode = _this.$refs.input;
            var config = { attributes: true };
            observer.observe(targetNode, config);
            return observer;
          },
          deregisterValidationAttributeChangeHandler: function deregisterValidationAttributeChangeHandler(observer) {
            observer.disconnect();
          },
          shakeLabel: function shakeLabel(shouldShake) {
            _this.labelFoundation.shake(shouldShake);
          },
          floatLabel: function floatLabel(shouldFloat) {
            _this.labelFoundation.float(shouldFloat);
          },
          hasLabel: function hasLabel() {
            return !!_this.$refs.label;
          },
          getLabelWidth: function getLabelWidth() {
            return _this.labelFoundation.getWidth();
          },
          getNativeInput: function getNativeInput() {
            return _this.$refs.input;
          },
          hasOutline: function hasOutline() {
            return !!_this.hasOutline;
          },
          notchOutline: function notchOutline(notchWidth, isRtl) {
            return _this.outlineFoundation.notch(notchWidth, isRtl);
          },
          closeOutline: function closeOutline() {
            return _this.outlineFoundation.closeNotch();
          }
        }, {
          helperText: this.helperTextFoundation,
          icon: this.iconFoundation
        });

        this.foundation.init();
        this.foundation.setValue(this.value);
        this.foundation.setDisabled(this.disabled);
        this.$refs.input && (this.$refs.input.required = this.required);
        if (typeof this.valid !== 'undefined') {
          this.foundation.setValid(this.valid);
        }

        if (this.textbox) {
          this.ripple = new RippleBase(this);
          this.ripple.init();
        }
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation && this.foundation.destroy();
        this.lineRippleFoundation && this.lineRippleFoundation.destroy();
        this.helperTextFoundation && this.helperTextFoundation.destroy();
        this.iconFoundation && this.iconFoundation.destroy();
        this.labelFoundation && this.labelFoundation.destroy();
        this.outlineFoundation && this.outlineFoundation.destroy();
        this.ripple && this.ripple.destroy();
      },

      methods: {
        updateValue: function updateValue(value) {
          this.$emit('model', value);
        },
        focus: function focus() {
          this.$refs.input && this.$refs.input.focus();
        },
        blur: function blur() {
          this.$refs.input && this.$refs.input.blur();
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
        staticClass: "mdc-textfield-wrapper",
        style: { width: _vm.fullwidth ? "100%" : undefined },
        attrs: { id: _vm.id }
      }, [_c("div", { ref: "root", class: _vm.rootClasses }, [!!_vm.hasLeadingIcon ? _c("i", {
        ref: "icon",
        staticClass: "mdc-text-field__icon",
        class: _vm.hasLeadingIcon.classes,
        attrs: { tabindex: "0" }
      }, [_vm._t("leading-icon", [_vm._v(_vm._s(_vm.hasLeadingIcon.content))])], 2) : _vm._e(), _vm._v(" "), _vm.multiline ? _c("textarea", _vm._g(_vm._b({
        ref: "input",
        class: _vm.inputClasses,
        attrs: {
          id: _vm.vma_uid_,
          minlength: _vm.minlength,
          maxlength: _vm.maxlength,
          placeholder: _vm.inputPlaceHolder,
          "aria-label": _vm.inputPlaceHolder,
          "aria-controls": _vm.inputAriaControls,
          rows: _vm.rows,
          cols: _vm.cols
        },
        on: {
          input: function input($event) {
            _vm.updateValue($event.target.value);
          }
        }
      }, "textarea", _vm.$attrs, false), _vm.$listeners)) : _c("input", _vm._g(_vm._b({
        ref: "input",
        class: _vm.inputClasses,
        attrs: {
          id: _vm.vma_uid_,
          type: _vm.type,
          minlength: _vm.minlength,
          maxlength: _vm.maxlength,
          placeholder: _vm.inputPlaceHolder,
          "aria-label": _vm.inputPlaceHolder,
          "aria-controls": _vm.inputAriaControls
        },
        on: {
          input: function input($event) {
            _vm.updateValue($event.target.value);
          }
        }
      }, "input", _vm.$attrs, false), _vm.$listeners)), _vm._v(" "), _vm.hasLabel ? _c("label", {
        ref: "label",
        class: _vm.labelClassesUpgraded,
        attrs: { for: _vm.vma_uid_ }
      }, [_vm._v("\n      " + _vm._s(_vm.label) + "\n    ")]) : _vm._e(), _vm._v(" "), !!_vm.hasTrailingIcon ? _c("i", {
        ref: "icon",
        staticClass: "mdc-text-field__icon",
        class: _vm.hasTrailingIcon.classes,
        attrs: { tabindex: "0" }
      }, [_vm._t("trailing-icon", [_vm._v(_vm._s(_vm.hasTrailingIcon.content))])], 2) : _vm._e(), _vm._v(" "), _vm.hasOutline ? _c("div", {
        ref: "outline",
        staticClass: "mdc-notched-outline",
        class: _vm.outlineClasses
      }, [_c("svg", [_c("path", {
        staticClass: "mdc-notched-outline__path",
        attrs: { d: _vm.outlinePathAttr }
      })])]) : _vm._e(), _vm._v(" "), _vm.hasOutline ? _c("div", {
        ref: "outlineIdle",
        staticClass: "mdc-notched-outline__idle"
      }) : _vm._e(), _vm._v(" "), _vm.hasLineRipple ? _c("div", {
        ref: "lineRipple",
        class: _vm.lineRippleClasses,
        style: _vm.lineRippleStyles
      }) : _vm._e()]), _vm._v(" "), _vm.helptext ? _c("p", {
        ref: "help",
        class: _vm.helpClasses,
        attrs: { id: "help-" + _vm.vma_uid_, "aria-hidden": "true" }
      }, [_vm._v("\n    " + _vm._s(_vm.helptext) + "\n  ")]) : _vm._e()]);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\textfield\\mdc-textfield.vue";

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

    var mdcTextField = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

    var plugin = BasePlugin({
      mdcTextField: mdcTextField
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpZWxkLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXBwbHktcGFzc2l2ZS5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWVsZW1lbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1pY29uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Rpc3BhdGNoLWZvY3VzLW1peGluLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RleHRmaWVsZC9oZWxwZXItdGV4dC9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvaGVscGVyLXRleHQvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvaGVscGVyLXRleHQvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2ljb24vYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2ljb24vY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvaWNvbi9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2xpbmUtcmlwcGxlL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2xpbmUtcmlwcGxlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbGluZS1yaXBwbGUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZmxvYXRpbmctbGFiZWwvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZmxvYXRpbmctbGFiZWwvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9mbG9hdGluZy1sYWJlbC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9ub3RjaGVkLW91dGxpbmUvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9jb21wb25lbnRzL3JpcHBsZS9tZGMtcmlwcGxlLWJhc2UuanMiLCIuLi8uLi9jb21wb25lbnRzL3JpcHBsZS9tZGMtcmlwcGxlLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvdGV4dGZpZWxkL21kYy10ZXh0ZmllbGQudnVlIiwiLi4vLi4vY29tcG9uZW50cy90ZXh0ZmllbGQvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL3RleHRmaWVsZC9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgc3VwcG9ydHNQYXNzaXZlX1xyXG5cclxuLyoqXHJcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXHJcbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcclxuICogQHJldHVybiB7Ym9vbGVhbnx7cGFzc2l2ZTogYm9vbGVhbn19XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcclxuICBpZiAoc3VwcG9ydHNQYXNzaXZlXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xyXG4gICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2VcclxuICAgIHRyeSB7XHJcbiAgICAgIGdsb2JhbE9iai5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge1xyXG4gICAgICAgIGdldCBwYXNzaXZlKCkge1xyXG4gICAgICAgICAgaXNTdXBwb3J0ZWQgPSB7IHBhc3NpdmU6IHRydWUgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgLy9lbXB0eVxyXG4gICAgfVxyXG5cclxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZV9cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQocGx1Z2luKSB7XHJcbiAgLy8gQXV0by1pbnN0YWxsXHJcbiAgbGV0IF9WdWUgPSBudWxsXHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIC8qZ2xvYmFsIGdsb2JhbCovXHJcbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxyXG4gIH1cclxuICBpZiAoX1Z1ZSkge1xyXG4gICAgX1Z1ZS51c2UocGx1Z2luKVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbihjb21wb25lbnRzKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXHJcbiAgICBpbnN0YWxsOiB2bSA9PiB7XHJcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxyXG4gICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSwgY29tcG9uZW50KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50c1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgQ3VzdG9tRWxlbWVudCA9IHtcclxuICBmdW5jdGlvbmFsOiB0cnVlLFxyXG4gIHJlbmRlcihjcmVhdGVFbGVtZW50LCBjb250ZXh0KSB7XHJcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudChcclxuICAgICAgY29udGV4dC5wcm9wcy5pcyB8fCBjb250ZXh0LnByb3BzLnRhZyB8fCAnZGl2JyxcclxuICAgICAgY29udGV4dC5kYXRhLFxyXG4gICAgICBjb250ZXh0LmNoaWxkcmVuXHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ3VzdG9tRWxlbWVudE1peGluID0ge1xyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIEN1c3RvbUVsZW1lbnRcclxuICB9XHJcbn1cclxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50KGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xyXG4gIGxldCBldnRcclxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xyXG4gICAgICBkZXRhaWw6IGV2dERhdGEsXHJcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxyXG4gICAgfSlcclxuICB9IGVsc2Uge1xyXG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcclxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcclxuICB9XHJcbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RJY29uUHJvcChpY29uUHJvcCkge1xyXG4gIGlmICh0eXBlb2YgaWNvblByb3AgPT09ICdzdHJpbmcnKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiB7ICdtYXRlcmlhbC1pY29ucyc6IHRydWUgfSxcclxuICAgICAgY29udGVudDogaWNvblByb3BcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGljb25Qcm9wIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNsYXNzZXM6IGljb25Qcm9wLnJlZHVjZShcclxuICAgICAgICAocmVzdWx0LCB2YWx1ZSkgPT4gT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgW3ZhbHVlXTogdHJ1ZSB9KSxcclxuICAgICAgICB7fVxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgaWNvblByb3AgPT09ICdvYmplY3QnKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiBpY29uUHJvcC5jbGFzc05hbWVcclxuICAgICAgICAuc3BsaXQoJyAnKVxyXG4gICAgICAgIC5yZWR1Y2UoXHJcbiAgICAgICAgICAocmVzdWx0LCB2YWx1ZSkgPT4gT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgW3ZhbHVlXTogdHJ1ZSB9KSxcclxuICAgICAgICAgIHt9XHJcbiAgICAgICAgKSxcclxuICAgICAgY29udGVudDogaWNvblByb3AudGV4dENvbnRlbnRcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IERpc3BhdGNoRm9jdXNNaXhpbiA9IHtcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHsgaGFzRm9jdXM6IGZhbHNlIH1cclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIG9uTW91c2VEb3duKCkge1xyXG4gICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlXHJcbiAgICB9LFxyXG4gICAgb25Nb3VzZVVwKCkge1xyXG4gICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZVxyXG4gICAgfSxcclxuICAgIG9uRm9jdXNFdmVudCgpIHtcclxuICAgICAgLy8gZGlzcGF0Y2ggYXN5bmMgdG8gbGV0IHRpbWUgdG8gb3RoZXIgZm9jdXMgZXZlbnQgdG8gcHJvcGFnYXRlXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNwYXRjaEZvY3VzRXZlbnQoKSwgMClcclxuICAgIH0sXHJcbiAgICBvbkJsdXJFdmVudCgpIHtcclxuICAgICAgLy8gZGlzcGF0Y2ggYXN5bmMgdG8gbGV0IHRpbWUgdG8gb3RoZXIgZm9jdXMgZXZlbnQgdG8gcHJvcGFnYXRlXHJcbiAgICAgIC8vIGFsc28gZmlsdHVyIGJsdXIgaWYgbW91c2Vkb3duXHJcbiAgICAgIHRoaXMuX2FjdGl2ZSB8fCBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzcGF0Y2hGb2N1c0V2ZW50KCksIDApXHJcbiAgICB9LFxyXG4gICAgZGlzcGF0Y2hGb2N1c0V2ZW50KCkge1xyXG4gICAgICBsZXQgaGFzRm9jdXMgPVxyXG4gICAgICAgIHRoaXMuJGVsID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8XHJcbiAgICAgICAgdGhpcy4kZWwuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudClcclxuICAgICAgaWYgKGhhc0ZvY3VzICE9IHRoaXMuaGFzRm9jdXMpIHtcclxuICAgICAgICB0aGlzLiRlbWl0KGhhc0ZvY3VzID8gJ2ZvY3VzJyA6ICdibHVyJylcclxuICAgICAgICB0aGlzLmhhc0ZvY3VzID0gaGFzRm9jdXNcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbW91bnRlZCgpIHtcclxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLm9uRm9jdXNFdmVudClcclxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkJsdXJFdmVudClcclxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pXHJcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXApXHJcbiAgfSxcclxuICBiZWZvcmVEZXN0cm95KCkge1xyXG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMub25Gb2N1c0V2ZW50KVxyXG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uQmx1ckV2ZW50KVxyXG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bilcclxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcClcclxuICB9XHJcbn1cclxuIiwiY29uc3Qgc2NvcGUgPVxyXG4gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoMHgxMDAwMDAwMCkpLnRvU3RyaW5nKCkgKyAnLSdcclxuXHJcbmV4cG9ydCBjb25zdCBWTUFVbmlxdWVJZE1peGluID0ge1xyXG4gIGJlZm9yZUNyZWF0ZSgpIHtcclxuICAgIHRoaXMudm1hX3VpZF8gPSBzY29wZSArIHRoaXMuX3VpZFxyXG4gIH1cclxufVxyXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBUZXh0IEZpZWxkIEhlbHBlciBUZXh0LlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIFRleHRGaWVsZCBoZWxwZXIgdGV4dCBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDVGV4dEZpZWxkSGVscGVyVGV4dEFkYXB0ZXIge1xuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSBoZWxwZXIgdGV4dCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSBoZWxwZXIgdGV4dCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGhlbHBlciB0ZXh0IGVsZW1lbnQgY29udGFpbnMgdGhlIGdpdmVuIGNsYXNzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgYW4gYXR0cmlidXRlIHdpdGggYSBnaXZlbiB2YWx1ZSBvbiB0aGUgaGVscGVyIHRleHQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqL1xuICBzZXRBdHRyKGF0dHIsIHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIGF0dHJpYnV0ZSBmcm9tIHRoZSBoZWxwZXIgdGV4dCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0clxuICAgKi9cbiAgcmVtb3ZlQXR0cihhdHRyKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0ZXh0IGNvbnRlbnQgZm9yIHRoZSBoZWxwZXIgdGV4dCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxuICAgKi9cbiAgc2V0Q29udGVudChjb250ZW50KSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENUZXh0RmllbGRIZWxwZXJUZXh0QWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIEFSSUFfSElEREVOOiAnYXJpYS1oaWRkZW4nLFxuICBST0xFOiAncm9sZScsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIEhFTFBFUl9URVhUX1BFUlNJU1RFTlQ6ICdtZGMtdGV4dC1maWVsZC1oZWxwZXItdGV4dC0tcGVyc2lzdGVudCcsXG4gIEhFTFBFUl9URVhUX1ZBTElEQVRJT05fTVNHOiAnbWRjLXRleHQtZmllbGQtaGVscGVyLXRleHQtLXZhbGlkYXRpb24tbXNnJyxcbn07XG5cbmV4cG9ydCB7c3RyaW5ncywgY3NzQ2xhc3Nlc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDVGV4dEZpZWxkSGVscGVyVGV4dEFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1RleHRGaWVsZEhlbHBlclRleHRBZGFwdGVyPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ1RleHRGaWVsZEhlbHBlclRleHRBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ1RleHRGaWVsZEhlbHBlclRleHRBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDVGV4dEZpZWxkSGVscGVyVGV4dEFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKCkgPT4ge30sXG4gICAgICBoYXNDbGFzczogKCkgPT4ge30sXG4gICAgICBzZXRBdHRyOiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUF0dHI6ICgpID0+IHt9LFxuICAgICAgc2V0Q29udGVudDogKCkgPT4ge30sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTURDVGV4dEZpZWxkSGVscGVyVGV4dEFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgY29udGVudCBvZiB0aGUgaGVscGVyIHRleHQgZmllbGQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG4gICAqL1xuICBzZXRDb250ZW50KGNvbnRlbnQpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldENvbnRlbnQoY29udGVudCk7XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSBpc1BlcnNpc3RlbnQgU2V0cyB0aGUgcGVyc2lzdGVuY3kgb2YgdGhlIGhlbHBlciB0ZXh0LiAqL1xuICBzZXRQZXJzaXN0ZW50KGlzUGVyc2lzdGVudCkge1xuICAgIGlmIChpc1BlcnNpc3RlbnQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5IRUxQRVJfVEVYVF9QRVJTSVNURU5UKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkhFTFBFUl9URVhUX1BFUlNJU1RFTlQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzVmFsaWRhdGlvbiBUcnVlIHRvIG1ha2UgdGhlIGhlbHBlciB0ZXh0IGFjdCBhcyBhblxuICAgKiAgIGVycm9yIHZhbGlkYXRpb24gbWVzc2FnZS5cbiAgICovXG4gIHNldFZhbGlkYXRpb24oaXNWYWxpZGF0aW9uKSB7XG4gICAgaWYgKGlzVmFsaWRhdGlvbikge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLkhFTFBFUl9URVhUX1ZBTElEQVRJT05fTVNHKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkhFTFBFUl9URVhUX1ZBTElEQVRJT05fTVNHKTtcbiAgICB9XG4gIH1cblxuICAvKiogTWFrZXMgdGhlIGhlbHBlciB0ZXh0IHZpc2libGUgdG8gdGhlIHNjcmVlbiByZWFkZXIuICovXG4gIHNob3dUb1NjcmVlblJlYWRlcigpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUF0dHIoc3RyaW5ncy5BUklBX0hJRERFTik7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsaWRpdHkgb2YgdGhlIGhlbHBlciB0ZXh0IGJhc2VkIG9uIHRoZSBpbnB1dCB2YWxpZGl0eS5cbiAgICogQHBhcmFtIHtib29sZWFufSBpbnB1dElzVmFsaWRcbiAgICovXG4gIHNldFZhbGlkaXR5KGlucHV0SXNWYWxpZCkge1xuICAgIGNvbnN0IGhlbHBlclRleHRJc1BlcnNpc3RlbnQgPSB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuSEVMUEVSX1RFWFRfUEVSU0lTVEVOVCk7XG4gICAgY29uc3QgaGVscGVyVGV4dElzVmFsaWRhdGlvbk1zZyA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5IRUxQRVJfVEVYVF9WQUxJREFUSU9OX01TRyk7XG4gICAgY29uc3QgdmFsaWRhdGlvbk1zZ05lZWRzRGlzcGxheSA9IGhlbHBlclRleHRJc1ZhbGlkYXRpb25Nc2cgJiYgIWlucHV0SXNWYWxpZDtcblxuICAgIGlmICh2YWxpZGF0aW9uTXNnTmVlZHNEaXNwbGF5KSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHIoc3RyaW5ncy5ST0xFLCAnYWxlcnQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVBdHRyKHN0cmluZ3MuUk9MRSk7XG4gICAgfVxuXG4gICAgaWYgKCFoZWxwZXJUZXh0SXNQZXJzaXN0ZW50ICYmICF2YWxpZGF0aW9uTXNnTmVlZHNEaXNwbGF5KSB7XG4gICAgICB0aGlzLmhpZGVfKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSBoZWxwIHRleHQgZnJvbSBzY3JlZW4gcmVhZGVycy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhpZGVfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cihzdHJpbmdzLkFSSUFfSElEREVOLCAndHJ1ZScpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBUZXh0IEZpZWxkIEljb24uXG4gKlxuICogRGVmaW5lcyB0aGUgc2hhcGUgb2YgdGhlIGFkYXB0ZXIgZXhwZWN0ZWQgYnkgdGhlIGZvdW5kYXRpb24uIEltcGxlbWVudCB0aGlzXG4gKiBhZGFwdGVyIHRvIGludGVncmF0ZSB0aGUgdGV4dCBmaWVsZCBpY29uIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENUZXh0RmllbGRJY29uQWRhcHRlciB7XG4gIC8qKlxuICAgKiBHZXRzIHRoZSB2YWx1ZSBvZiBhbiBhdHRyaWJ1dGUgb24gdGhlIGljb24gZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0QXR0cihhdHRyKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIGFuIGF0dHJpYnV0ZSBvbiB0aGUgaWNvbiBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0clxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldEF0dHIoYXR0ciwgdmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gYXR0cmlidXRlIGZyb20gdGhlIGljb24gZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJcbiAgICovXG4gIHJlbW92ZUF0dHIoYXR0cikge31cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGV4dCBjb250ZW50IG9mIHRoZSBpY29uIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG4gICAqL1xuICBzZXRDb250ZW50KGNvbnRlbnQpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgaWNvbiBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIGljb24gZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRW1pdHMgYSBjdXN0b20gZXZlbnQgXCJNRENUZXh0RmllbGQ6aWNvblwiIGRlbm90aW5nIGEgdXNlciBoYXMgY2xpY2tlZCB0aGUgaWNvbi5cbiAgICovXG4gIG5vdGlmeUljb25BY3Rpb24oKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENUZXh0RmllbGRJY29uQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIElDT05fRVZFTlQ6ICdNRENUZXh0RmllbGQ6aWNvbicsXG4gIElDT05fUk9MRTogJ2J1dHRvbicsXG59O1xuXG5leHBvcnQge3N0cmluZ3N9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1RleHRGaWVsZEljb25BZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge3N0cmluZ3N9IGZyb20gJy4vY29uc3RhbnRzJztcblxuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENUZXh0RmllbGRJY29uQWRhcHRlcj59XG4gKiBAZmluYWxcbiAqL1xuY2xhc3MgTURDVGV4dEZpZWxkSWNvbkZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKipcbiAgICoge0BzZWUgTURDVGV4dEZpZWxkSWNvbkFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDVGV4dEZpZWxkSWNvbkFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENUZXh0RmllbGRJY29uQWRhcHRlcn0gKi8gKHtcbiAgICAgIGdldEF0dHI6ICgpID0+IHt9LFxuICAgICAgc2V0QXR0cjogKCkgPT4ge30sXG4gICAgICByZW1vdmVBdHRyOiAoKSA9PiB7fSxcbiAgICAgIHNldENvbnRlbnQ6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBub3RpZnlJY29uQWN0aW9uOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENUZXh0RmllbGRJY29uQWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDVGV4dEZpZWxkSWNvbkZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7c3RyaW5nP30gKi9cbiAgICB0aGlzLnNhdmVkVGFiSW5kZXhfID0gbnVsbDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMuaW50ZXJhY3Rpb25IYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlSW50ZXJhY3Rpb24oZXZ0KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zYXZlZFRhYkluZGV4XyA9IHRoaXMuYWRhcHRlcl8uZ2V0QXR0cigndGFiaW5kZXgnKTtcblxuICAgIFsnY2xpY2snLCAna2V5ZG93biddLmZvckVhY2goKGV2dFR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgdGhpcy5pbnRlcmFjdGlvbkhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgWydjbGljaycsICdrZXlkb3duJ10uZm9yRWFjaCgoZXZ0VHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIHRoaXMuaW50ZXJhY3Rpb25IYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlZCAqL1xuICBzZXREaXNhYmxlZChkaXNhYmxlZCkge1xuICAgIGlmICghdGhpcy5zYXZlZFRhYkluZGV4Xykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVBdHRyKCdyb2xlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cigndGFiaW5kZXgnLCB0aGlzLnNhdmVkVGFiSW5kZXhfKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cigncm9sZScsIHN0cmluZ3MuSUNPTl9ST0xFKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGxhYmVsICovXG4gIHNldEFyaWFMYWJlbChsYWJlbCkge1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cignYXJpYS1sYWJlbCcsIGxhYmVsKTtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCAqL1xuICBzZXRDb250ZW50KGNvbnRlbnQpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldENvbnRlbnQoY29udGVudCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbiBpbnRlcmFjdGlvbiBldmVudFxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqL1xuICBoYW5kbGVJbnRlcmFjdGlvbihldnQpIHtcbiAgICBpZiAoZXZ0LnR5cGUgPT09ICdjbGljaycgfHwgZXZ0LmtleSA9PT0gJ0VudGVyJyB8fCBldnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5SWNvbkFjdGlvbigpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uIGZyb20gJy4vaGVscGVyLXRleHQvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDVGV4dEZpZWxkSWNvbkZvdW5kYXRpb24gZnJvbSAnLi9pY29uL2ZvdW5kYXRpb24nO1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB2YWx1ZTogc3RyaW5nLFxuICogICBkaXNhYmxlZDogYm9vbGVhbixcbiAqICAgYmFkSW5wdXQ6IGJvb2xlYW4sXG4gKiAgIHZhbGlkaXR5OiB7XG4gKiAgICAgYmFkSW5wdXQ6IGJvb2xlYW4sXG4gKiAgICAgdmFsaWQ6IGJvb2xlYW4sXG4gKiAgIH0sXG4gKiB9fVxuICovXG5sZXQgTmF0aXZlSW5wdXRUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGhlbHBlclRleHQ6ICghTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb258dW5kZWZpbmVkKSxcbiAqICAgaWNvbjogKCFNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbnx1bmRlZmluZWQpLFxuICogfX1cbiAqL1xubGV0IEZvdW5kYXRpb25NYXBUeXBlO1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBUZXh0IEZpZWxkLlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIFRleHQgRmllbGQgaW50byB5b3VyIGZyYW1ld29yay4gU2VlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2F1dGhvcmluZy1jb21wb25lbnRzLm1kXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1RleHRGaWVsZEFkYXB0ZXIge1xuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSByb290IEVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIHJvb3QgRWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHJvb3QgZWxlbWVudCBjb250YWlucyB0aGUgZ2l2ZW4gY2xhc3MgbmFtZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgbmF0aXZlIGlucHV0IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgdmFsaWRhdGlvbiBhdHRyaWJ1dGUgY2hhbmdlIGxpc3RlbmVyIG9uIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgKiBIYW5kbGVyIGFjY2VwdHMgbGlzdCBvZiBhdHRyaWJ1dGUgbmFtZXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUFycmF5PHN0cmluZz4pOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICogQHJldHVybiB7IU11dGF0aW9uT2JzZXJ2ZXJ9XG4gICAqL1xuICByZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIGEgdmFsaWRhdGlvbiBhdHRyaWJ1dGUgb2JzZXJ2ZXIgb24gdGhlIGlucHV0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7IU11dGF0aW9uT2JzZXJ2ZXJ9IG9ic2VydmVyXG4gICAqL1xuICBkZXJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXIob2JzZXJ2ZXIpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbmF0aXZlIHRleHQgaW5wdXQgZWxlbWVudCwgd2l0aCBhXG4gICAqIHNpbWlsYXIgQVBJIHNoYXBlLiBUaGUgb2JqZWN0IHJldHVybmVkIHNob3VsZCBpbmNsdWRlIHRoZSB2YWx1ZSwgZGlzYWJsZWRcbiAgICogYW5kIGJhZElucHV0IHByb3BlcnRpZXMsIGFzIHdlbGwgYXMgdGhlIGNoZWNrVmFsaWRpdHkoKSBmdW5jdGlvbi4gV2UgbmV2ZXJcbiAgICogYWx0ZXIgdGhlIHZhbHVlIHdpdGhpbiBvdXIgY29kZSwgaG93ZXZlciB3ZSBkbyB1cGRhdGUgdGhlIGRpc2FibGVkXG4gICAqIHByb3BlcnR5LCBzbyBpZiB5b3UgY2hvb3NlIHRvIGR1Y2stdHlwZSB0aGUgcmV0dXJuIHZhbHVlIGZvciB0aGlzIG1ldGhvZFxuICAgKiBpbiB5b3VyIGltcGxlbWVudGF0aW9uIGl0J3MgaW1wb3J0YW50IHRvIGtlZXAgdGhpcyBpbiBtaW5kLiBBbHNvIG5vdGUgdGhhdFxuICAgKiB0aGlzIG1ldGhvZCBjYW4gcmV0dXJuIG51bGwsIHdoaWNoIHRoZSBmb3VuZGF0aW9uIHdpbGwgaGFuZGxlIGdyYWNlZnVsbHkuXG4gICAqIEByZXR1cm4gez9FbGVtZW50fD9OYXRpdmVJbnB1dFR5cGV9XG4gICAqL1xuICBnZXROYXRpdmVJbnB1dCgpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGV4dGZpZWxkIGlzIGZvY3VzZWQuXG4gICAqIFdlIGFjaGlldmUgdGhpcyB2aWEgYGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMucm9vdF9gLlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNGb2N1c2VkKCkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBkaXJlY3Rpb24gb2YgdGhlIHJvb3QgZWxlbWVudCBpcyBzZXQgdG8gUlRMLlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNSdGwoKSB7fVxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZXMgdGhlIGxpbmUgcmlwcGxlLlxuICAgKi9cbiAgYWN0aXZhdGVMaW5lUmlwcGxlKCkge31cblxuICAvKipcbiAgICogRGVhY3RpdmF0ZXMgdGhlIGxpbmUgcmlwcGxlLlxuICAgKi9cbiAgZGVhY3RpdmF0ZUxpbmVSaXBwbGUoKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0cmFuc2Zvcm0gb3JpZ2luIG9mIHRoZSBsaW5lIHJpcHBsZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vcm1hbGl6ZWRYXG4gICAqL1xuICBzZXRMaW5lUmlwcGxlVHJhbnNmb3JtT3JpZ2luKG5vcm1hbGl6ZWRYKSB7fVxuXG4gIC8qKlxuICAgKiBPbmx5IGltcGxlbWVudCBpZiBsYWJlbCBleGlzdHMuXG4gICAqIFNoYWtlcyBsYWJlbCBpZiBzaG91bGRTaGFrZSBpcyB0cnVlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNob3VsZFNoYWtlXG4gICAqL1xuICBzaGFrZUxhYmVsKHNob3VsZFNoYWtlKSB7fVxuXG4gIC8qKlxuICAgKiBPbmx5IGltcGxlbWVudCBpZiBsYWJlbCBleGlzdHMuXG4gICAqIEZsb2F0cyB0aGUgbGFiZWwgYWJvdmUgdGhlIGlucHV0IGVsZW1lbnQgaWYgc2hvdWxkRmxvYXQgaXMgdHJ1ZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBzaG91bGRGbG9hdFxuICAgKi9cbiAgZmxvYXRMYWJlbChzaG91bGRGbG9hdCkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGxhYmVsIGVsZW1lbnQgZXhpc3RzLCBmYWxzZSBpZiBpdCBkb2Vzbid0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzTGFiZWwoKSB7fVxuXG4gIC8qKlxuICAgKiBPbmx5IGltcGxlbWVudCBpZiBsYWJlbCBleGlzdHMuXG4gICAqIFJldHVybnMgd2lkdGggb2YgbGFiZWwgaW4gcGl4ZWxzLlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXRMYWJlbFdpZHRoKCkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIG91dGxpbmUgZWxlbWVudCBleGlzdHMsIGZhbHNlIGlmIGl0IGRvZXNuJ3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNPdXRsaW5lKCkge31cblxuICAvKipcbiAgICogT25seSBpbXBsZW1lbnQgaWYgb3V0bGluZSBlbGVtZW50IGV4aXN0cy5cbiAgICogVXBkYXRlcyBTVkcgUGF0aCBhbmQgb3V0bGluZSBlbGVtZW50IGJhc2VkIG9uIHRoZVxuICAgKiBsYWJlbCBlbGVtZW50IHdpZHRoIGFuZCBSVEwgY29udGV4dC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGxhYmVsV2lkdGhcbiAgICogQHBhcmFtIHtib29sZWFuPX0gaXNSdGxcbiAgICovXG4gIG5vdGNoT3V0bGluZShsYWJlbFdpZHRoLCBpc1J0bCkge31cblxuICAvKipcbiAgICogT25seSBpbXBsZW1lbnQgaWYgb3V0bGluZSBlbGVtZW50IGV4aXN0cy5cbiAgICogQ2xvc2VzIG5vdGNoIGluIG91dGxpbmUgZWxlbWVudC5cbiAgICovXG4gIGNsb3NlT3V0bGluZSgpIHt9XG59XG5cbmV4cG9ydCB7TURDVGV4dEZpZWxkQWRhcHRlciwgTmF0aXZlSW5wdXRUeXBlLCBGb3VuZGF0aW9uTWFwVHlwZX07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBBUklBX0NPTlRST0xTOiAnYXJpYS1jb250cm9scycsXG4gIElOUFVUX1NFTEVDVE9SOiAnLm1kYy10ZXh0LWZpZWxkX19pbnB1dCcsXG4gIExBQkVMX1NFTEVDVE9SOiAnLm1kYy1mbG9hdGluZy1sYWJlbCcsXG4gIElDT05fU0VMRUNUT1I6ICcubWRjLXRleHQtZmllbGRfX2ljb24nLFxuICBPVVRMSU5FX1NFTEVDVE9SOiAnLm1kYy1ub3RjaGVkLW91dGxpbmUnLFxuICBMSU5FX1JJUFBMRV9TRUxFQ1RPUjogJy5tZGMtbGluZS1yaXBwbGUnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBST09UOiAnbWRjLXRleHQtZmllbGQnLFxuICBVUEdSQURFRDogJ21kYy10ZXh0LWZpZWxkLS11cGdyYWRlZCcsXG4gIERJU0FCTEVEOiAnbWRjLXRleHQtZmllbGQtLWRpc2FibGVkJyxcbiAgREVOU0U6ICdtZGMtdGV4dC1maWVsZC0tZGVuc2UnLFxuICBGT0NVU0VEOiAnbWRjLXRleHQtZmllbGQtLWZvY3VzZWQnLFxuICBJTlZBTElEOiAnbWRjLXRleHQtZmllbGQtLWludmFsaWQnLFxuICBCT1g6ICdtZGMtdGV4dC1maWVsZC0tYm94JyxcbiAgT1VUTElORUQ6ICdtZGMtdGV4dC1maWVsZC0tb3V0bGluZWQnLFxufTtcblxuLyoqIEBlbnVtIHtudW1iZXJ9ICovXG5jb25zdCBudW1iZXJzID0ge1xuICBMQUJFTF9TQ0FMRTogMC43NSxcbiAgREVOU0VfTEFCRUxfU0NBTEU6IDAuOTIzLFxufTtcblxuLy8gd2hpdGVsaXN0IGJhc2VkIG9mZiBvZiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9HdWlkZS9IVE1ML0hUTUw1L0NvbnN0cmFpbnRfdmFsaWRhdGlvblxuLy8gdW5kZXIgc2VjdGlvbjogYFZhbGlkYXRpb24tcmVsYXRlZCBhdHRyaWJ1dGVzYFxuY29uc3QgVkFMSURBVElPTl9BVFRSX1dISVRFTElTVCA9IFtcbiAgJ3BhdHRlcm4nLCAnbWluJywgJ21heCcsICdyZXF1aXJlZCcsICdzdGVwJywgJ21pbmxlbmd0aCcsICdtYXhsZW5ndGgnLFxuXTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzLCBWQUxJREFUSU9OX0FUVFJfV0hJVEVMSVNUfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24gZnJvbSAnLi9oZWxwZXItdGV4dC9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbiBmcm9tICcuL2ljb24vZm91bmRhdGlvbic7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQge01EQ1RleHRGaWVsZEFkYXB0ZXIsIE5hdGl2ZUlucHV0VHlwZSwgRm91bmRhdGlvbk1hcFR5cGV9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnMsIFZBTElEQVRJT05fQVRUUl9XSElURUxJU1R9IGZyb20gJy4vY29uc3RhbnRzJztcblxuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENUZXh0RmllbGRBZGFwdGVyPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENUZXh0RmllbGRGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBnZXQgc2hvdWxkU2hha2UoKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzVmFsaWQoKSAmJiAhdGhpcy5pc0ZvY3VzZWRfO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGdldCBzaG91bGRGbG9hdCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0ZvY3VzZWRfIHx8ICEhdGhpcy5nZXRWYWx1ZSgpIHx8IHRoaXMuaXNCYWRJbnB1dF8oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QHNlZSBNRENUZXh0RmllbGRBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ1RleHRGaWVsZEFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENUZXh0RmllbGRBZGFwdGVyfSAqLyAoe1xuICAgICAgYWRkQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgaGFzQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICByZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICByZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBnZXROYXRpdmVJbnB1dDogKCkgPT4ge30sXG4gICAgICBpc0ZvY3VzZWQ6ICgpID0+IHt9LFxuICAgICAgaXNSdGw6ICgpID0+IHt9LFxuICAgICAgYWN0aXZhdGVMaW5lUmlwcGxlOiAoKSA9PiB7fSxcbiAgICAgIGRlYWN0aXZhdGVMaW5lUmlwcGxlOiAoKSA9PiB7fSxcbiAgICAgIHNldExpbmVSaXBwbGVUcmFuc2Zvcm1PcmlnaW46ICgpID0+IHt9LFxuICAgICAgc2hha2VMYWJlbDogKCkgPT4ge30sXG4gICAgICBmbG9hdExhYmVsOiAoKSA9PiB7fSxcbiAgICAgIGhhc0xhYmVsOiAoKSA9PiB7fSxcbiAgICAgIGdldExhYmVsV2lkdGg6ICgpID0+IHt9LFxuICAgICAgaGFzT3V0bGluZTogKCkgPT4ge30sXG4gICAgICBub3RjaE91dGxpbmU6ICgpID0+IHt9LFxuICAgICAgY2xvc2VPdXRsaW5lOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENUZXh0RmllbGRBZGFwdGVyfSBhZGFwdGVyXG4gICAqIEBwYXJhbSB7IUZvdW5kYXRpb25NYXBUeXBlPX0gZm91bmRhdGlvbk1hcCBNYXAgZnJvbSBzdWJjb21wb25lbnQgbmFtZXMgdG8gdGhlaXIgc3ViZm91bmRhdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyLCBmb3VuZGF0aW9uTWFwID0gLyoqIEB0eXBlIHshRm91bmRhdGlvbk1hcFR5cGV9ICovICh7fSkpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAdHlwZSB7IU1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9ufHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLmhlbHBlclRleHRfID0gZm91bmRhdGlvbk1hcC5oZWxwZXJUZXh0O1xuICAgIC8qKiBAdHlwZSB7IU1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9ufHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLmljb25fID0gZm91bmRhdGlvbk1hcC5pY29uO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuaXNGb2N1c2VkXyA9IGZhbHNlO1xuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLnJlY2VpdmVkVXNlcklucHV0XyA9IGZhbHNlO1xuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLnVzZUN1c3RvbVZhbGlkaXR5Q2hlY2tpbmdfID0gZmFsc2U7XG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuaXNWYWxpZF8gPSB0cnVlO1xuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oKTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMuaW5wdXRGb2N1c0hhbmRsZXJfID0gKCkgPT4gdGhpcy5hY3RpdmF0ZUZvY3VzKCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbigpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy5pbnB1dEJsdXJIYW5kbGVyXyA9ICgpID0+IHRoaXMuZGVhY3RpdmF0ZUZvY3VzKCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbigpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy5pbnB1dElucHV0SGFuZGxlcl8gPSAoKSA9PiB0aGlzLmF1dG9Db21wbGV0ZUZvY3VzKCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy5zZXRQb2ludGVyWE9mZnNldF8gPSAoZXZ0KSA9PiB0aGlzLnNldFRyYW5zZm9ybU9yaWdpbihldnQpO1xuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMudGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlVGV4dEZpZWxkSW50ZXJhY3Rpb24oKTtcbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFBcnJheSk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLnZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyXyA9IChhdHRyaWJ1dGVzTGlzdCkgPT4gdGhpcy5oYW5kbGVWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlKGF0dHJpYnV0ZXNMaXN0KTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IU11dGF0aW9uT2JzZXJ2ZXJ9ICovXG4gICAgdGhpcy52YWxpZGF0aW9uT2JzZXJ2ZXJfO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5VUEdSQURFRCk7XG4gICAgLy8gRW5zdXJlIGxhYmVsIGRvZXMgbm90IGNvbGxpZGUgd2l0aCBhbnkgcHJlLWZpbGxlZCB2YWx1ZS5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5oYXNMYWJlbCgpICYmICh0aGlzLmdldFZhbHVlKCkgfHwgdGhpcy5pc0JhZElucHV0XygpKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5mbG9hdExhYmVsKHRoaXMuc2hvdWxkRmxvYXQpO1xuICAgICAgdGhpcy5ub3RjaE91dGxpbmUodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNGb2N1c2VkKCkpIHtcbiAgICAgIHRoaXMuaW5wdXRGb2N1c0hhbmRsZXJfKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuaW5wdXRGb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmlucHV0Qmx1ckhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2lucHV0JywgdGhpcy5pbnB1dElucHV0SGFuZGxlcl8pO1xuICAgIFsnbW91c2Vkb3duJywgJ3RvdWNoc3RhcnQnXS5mb3JFYWNoKChldnRUeXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgdGhpcy5zZXRQb2ludGVyWE9mZnNldF8pO1xuICAgIH0pO1xuICAgIFsnY2xpY2snLCAna2V5ZG93biddLmZvckVhY2goKGV2dFR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgdGhpcy50ZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLnZhbGlkYXRpb25PYnNlcnZlcl8gPVxuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXIodGhpcy52YWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5VUEdSQURFRCk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5pbnB1dEZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5pbnB1dEJsdXJIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2lucHV0JywgdGhpcy5pbnB1dElucHV0SGFuZGxlcl8pO1xuICAgIFsnbW91c2Vkb3duJywgJ3RvdWNoc3RhcnQnXS5mb3JFYWNoKChldnRUeXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCB0aGlzLnNldFBvaW50ZXJYT2Zmc2V0Xyk7XG4gICAgfSk7XG4gICAgWydjbGljaycsICdrZXlkb3duJ10uZm9yRWFjaCgoZXZ0VHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIHRoaXMudGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXIodGhpcy52YWxpZGF0aW9uT2JzZXJ2ZXJfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHVzZXIgaW50ZXJhY3Rpb25zIHdpdGggdGhlIFRleHQgRmllbGQuXG4gICAqL1xuICBoYW5kbGVUZXh0RmllbGRJbnRlcmFjdGlvbigpIHtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5nZXROYXRpdmVJbnB1dCgpLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVjZWl2ZWRVc2VySW5wdXRfID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHZhbGlkYXRpb24gYXR0cmlidXRlIGNoYW5nZXNcbiAgICogQHBhcmFtIHshQXJyYXk8c3RyaW5nPn0gYXR0cmlidXRlc0xpc3RcbiAgICovXG4gIGhhbmRsZVZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2UoYXR0cmlidXRlc0xpc3QpIHtcbiAgICBhdHRyaWJ1dGVzTGlzdC5zb21lKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICBpZiAoVkFMSURBVElPTl9BVFRSX1dISVRFTElTVC5pbmRleE9mKGF0dHJpYnV0ZU5hbWUpID4gLTEpIHtcbiAgICAgICAgdGhpcy5zdHlsZVZhbGlkaXR5Xyh0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMvY2xvc2VzIHRoZSBub3RjaGVkIG91dGxpbmUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3Blbk5vdGNoXG4gICAqL1xuICBub3RjaE91dGxpbmUob3Blbk5vdGNoKSB7XG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmhhc091dGxpbmUoKSB8fCAhdGhpcy5hZGFwdGVyXy5oYXNMYWJlbCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG9wZW5Ob3RjaCkge1xuICAgICAgY29uc3QgaXNEZW5zZSA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5ERU5TRSk7XG4gICAgICBjb25zdCBsYWJlbFNjYWxlID0gaXNEZW5zZSA/IG51bWJlcnMuREVOU0VfTEFCRUxfU0NBTEUgOiBudW1iZXJzLkxBQkVMX1NDQUxFO1xuICAgICAgY29uc3QgbGFiZWxXaWR0aCA9IHRoaXMuYWRhcHRlcl8uZ2V0TGFiZWxXaWR0aCgpICogbGFiZWxTY2FsZTtcbiAgICAgIGNvbnN0IGlzUnRsID0gdGhpcy5hZGFwdGVyXy5pc1J0bCgpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5ub3RjaE91dGxpbmUobGFiZWxXaWR0aCwgaXNSdGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmNsb3NlT3V0bGluZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZXMgdGhlIHRleHQgZmllbGQgZm9jdXMgc3RhdGUuXG4gICAqL1xuICBhY3RpdmF0ZUZvY3VzKCkge1xuICAgIHRoaXMuaXNGb2N1c2VkXyA9IHRydWU7XG4gICAgdGhpcy5zdHlsZUZvY3VzZWRfKHRoaXMuaXNGb2N1c2VkXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5hY3RpdmF0ZUxpbmVSaXBwbGUoKTtcbiAgICB0aGlzLm5vdGNoT3V0bGluZSh0aGlzLnNob3VsZEZsb2F0KTtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5oYXNMYWJlbCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNoYWtlTGFiZWwodGhpcy5zaG91bGRTaGFrZSk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmZsb2F0TGFiZWwodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmhlbHBlclRleHRfKSB7XG4gICAgICB0aGlzLmhlbHBlclRleHRfLnNob3dUb1NjcmVlblJlYWRlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsaW5lIHJpcHBsZSdzIHRyYW5zZm9ybSBvcmlnaW4sIHNvIHRoYXQgdGhlIGxpbmUgcmlwcGxlIGFjdGl2YXRlXG4gICAqIGFuaW1hdGlvbiB3aWxsIGFuaW1hdGUgb3V0IGZyb20gdGhlIHVzZXIncyBjbGljayBsb2NhdGlvbi5cbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKi9cbiAgc2V0VHJhbnNmb3JtT3JpZ2luKGV2dCkge1xuICAgIGNvbnN0IHRhcmdldENsaWVudFJlY3QgPSBldnQudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGV2dENvb3JkcyA9IHt4OiBldnQuY2xpZW50WCwgeTogZXZ0LmNsaWVudFl9O1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRYID0gZXZ0Q29vcmRzLnggLSB0YXJnZXRDbGllbnRSZWN0LmxlZnQ7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRMaW5lUmlwcGxlVHJhbnNmb3JtT3JpZ2luKG5vcm1hbGl6ZWRYKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZXMgdGhlIFRleHQgRmllbGQncyBmb2N1cyBzdGF0ZSBpbiBjYXNlcyB3aGVuIHRoZSBpbnB1dCB2YWx1ZVxuICAgKiBjaGFuZ2VzIHdpdGhvdXQgdXNlciBpbnB1dCAoZS5nLiBwcm9ncmFtYXRpY2FsbHkpLlxuICAgKi9cbiAgYXV0b0NvbXBsZXRlRm9jdXMoKSB7XG4gICAgaWYgKCF0aGlzLnJlY2VpdmVkVXNlcklucHV0Xykge1xuICAgICAgdGhpcy5hY3RpdmF0ZUZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlYWN0aXZhdGVzIHRoZSBUZXh0IEZpZWxkJ3MgZm9jdXMgc3RhdGUuXG4gICAqL1xuICBkZWFjdGl2YXRlRm9jdXMoKSB7XG4gICAgdGhpcy5pc0ZvY3VzZWRfID0gZmFsc2U7XG4gICAgdGhpcy5hZGFwdGVyXy5kZWFjdGl2YXRlTGluZVJpcHBsZSgpO1xuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXROYXRpdmVJbnB1dF8oKTtcbiAgICBjb25zdCBzaG91bGRSZW1vdmVMYWJlbEZsb2F0ID0gIWlucHV0LnZhbHVlICYmICF0aGlzLmlzQmFkSW5wdXRfKCk7XG4gICAgY29uc3QgaXNWYWxpZCA9IHRoaXMuaXNWYWxpZCgpO1xuICAgIHRoaXMuc3R5bGVWYWxpZGl0eV8oaXNWYWxpZCk7XG4gICAgdGhpcy5zdHlsZUZvY3VzZWRfKHRoaXMuaXNGb2N1c2VkXyk7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaGFzTGFiZWwoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5zaGFrZUxhYmVsKHRoaXMuc2hvdWxkU2hha2UpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5mbG9hdExhYmVsKHRoaXMuc2hvdWxkRmxvYXQpO1xuICAgICAgdGhpcy5ub3RjaE91dGxpbmUodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgfVxuICAgIGlmIChzaG91bGRSZW1vdmVMYWJlbEZsb2F0KSB7XG4gICAgICB0aGlzLnJlY2VpdmVkVXNlcklucHV0XyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgRWxlbWVudC5cbiAgICovXG4gIGdldFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0IG9uIHRoZSBpbnB1dCBFbGVtZW50LlxuICAgKi9cbiAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnZhbHVlID0gdmFsdWU7XG4gICAgY29uc3QgaXNWYWxpZCA9IHRoaXMuaXNWYWxpZCgpO1xuICAgIHRoaXMuc3R5bGVWYWxpZGl0eV8oaXNWYWxpZCk7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaGFzTGFiZWwoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5zaGFrZUxhYmVsKHRoaXMuc2hvdWxkU2hha2UpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5mbG9hdExhYmVsKHRoaXMuc2hvdWxkRmxvYXQpO1xuICAgICAgdGhpcy5ub3RjaE91dGxpbmUodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IElmIGEgY3VzdG9tIHZhbGlkaXR5IGlzIHNldCwgcmV0dXJucyB0aGF0IHZhbHVlLlxuICAgKiAgICAgT3RoZXJ3aXNlLCByZXR1cm5zIHRoZSByZXN1bHQgb2YgbmF0aXZlIHZhbGlkaXR5IGNoZWNrcy5cbiAgICovXG4gIGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlQ3VzdG9tVmFsaWRpdHlDaGVja2luZ19cbiAgICAgID8gdGhpcy5pc1ZhbGlkXyA6IHRoaXMuaXNOYXRpdmVJbnB1dFZhbGlkXygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNWYWxpZCBTZXRzIHRoZSB2YWxpZGl0eSBzdGF0ZSBvZiB0aGUgVGV4dCBGaWVsZC5cbiAgICovXG4gIHNldFZhbGlkKGlzVmFsaWQpIHtcbiAgICB0aGlzLnVzZUN1c3RvbVZhbGlkaXR5Q2hlY2tpbmdfID0gdHJ1ZTtcbiAgICB0aGlzLmlzVmFsaWRfID0gaXNWYWxpZDtcbiAgICAvLyBSZXRyaWV2ZSBmcm9tIHRoZSBnZXR0ZXIgdG8gZW5zdXJlIGNvcnJlY3QgbG9naWMgaXMgYXBwbGllZC5cbiAgICBpc1ZhbGlkID0gdGhpcy5pc1ZhbGlkKCk7XG4gICAgdGhpcy5zdHlsZVZhbGlkaXR5Xyhpc1ZhbGlkKTtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5oYXNMYWJlbCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNoYWtlTGFiZWwodGhpcy5zaG91bGRTaGFrZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIFRleHQgRmllbGQgaXMgZGlzYWJsZWQuXG4gICAqL1xuICBpc0Rpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUlucHV0XygpLmRpc2FibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZWQgU2V0cyB0aGUgdGV4dC1maWVsZCBkaXNhYmxlZCBvciBlbmFibGVkLlxuICAgKi9cbiAgc2V0RGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLmdldE5hdGl2ZUlucHV0XygpLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgdGhpcy5zdHlsZURpc2FibGVkXyhkaXNhYmxlZCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgU2V0cyB0aGUgY29udGVudCBvZiB0aGUgaGVscGVyIHRleHQuXG4gICAqL1xuICBzZXRIZWxwZXJUZXh0Q29udGVudChjb250ZW50KSB7XG4gICAgaWYgKHRoaXMuaGVscGVyVGV4dF8pIHtcbiAgICAgIHRoaXMuaGVscGVyVGV4dF8uc2V0Q29udGVudChjb250ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgYXJpYSBsYWJlbCBvZiB0aGUgaWNvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsXG4gICAqL1xuICBzZXRJY29uQXJpYUxhYmVsKGxhYmVsKSB7XG4gICAgaWYgKHRoaXMuaWNvbl8pIHtcbiAgICAgIHRoaXMuaWNvbl8uc2V0QXJpYUxhYmVsKGxhYmVsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGV4dCBjb250ZW50IG9mIHRoZSBpY29uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxuICAgKi9cbiAgc2V0SWNvbkNvbnRlbnQoY29udGVudCkge1xuICAgIGlmICh0aGlzLmljb25fKSB7XG4gICAgICB0aGlzLmljb25fLnNldENvbnRlbnQoY29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIFRleHQgRmllbGQgaW5wdXQgZmFpbHMgaW4gY29udmVydGluZyB0aGVcbiAgICogICAgIHVzZXItc3VwcGxpZWQgdmFsdWUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0JhZElucHV0XygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVJbnB1dF8oKS52YWxpZGl0eS5iYWRJbnB1dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUaGUgcmVzdWx0IG9mIG5hdGl2ZSB2YWxpZGl0eSBjaGVja2luZ1xuICAgKiAgICAgKFZhbGlkaXR5U3RhdGUudmFsaWQpLlxuICAgKi9cbiAgaXNOYXRpdmVJbnB1dFZhbGlkXygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVJbnB1dF8oKS52YWxpZGl0eS52YWxpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdHlsZXMgdGhlIGNvbXBvbmVudCBiYXNlZCBvbiB0aGUgdmFsaWRpdHkgc3RhdGUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNWYWxpZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3R5bGVWYWxpZGl0eV8oaXNWYWxpZCkge1xuICAgIGNvbnN0IHtJTlZBTElEfSA9IE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhJTlZBTElEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhJTlZBTElEKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaGVscGVyVGV4dF8pIHtcbiAgICAgIHRoaXMuaGVscGVyVGV4dF8uc2V0VmFsaWRpdHkoaXNWYWxpZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0eWxlcyB0aGUgY29tcG9uZW50IGJhc2VkIG9uIHRoZSBmb2N1c2VkIHN0YXRlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzRm9jdXNlZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3R5bGVGb2N1c2VkXyhpc0ZvY3VzZWQpIHtcbiAgICBjb25zdCB7Rk9DVVNFRH0gPSBNRENUZXh0RmllbGRGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKGlzRm9jdXNlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGT0NVU0VEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGT0NVU0VEKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3R5bGVzIHRoZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIGRpc2FibGVkIHN0YXRlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzRGlzYWJsZWRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN0eWxlRGlzYWJsZWRfKGlzRGlzYWJsZWQpIHtcbiAgICBjb25zdCB7RElTQUJMRUQsIElOVkFMSUR9ID0gTURDVGV4dEZpZWxkRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmIChpc0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKERJU0FCTEVEKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoSU5WQUxJRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRElTQUJMRUQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pY29uXykge1xuICAgICAgdGhpcy5pY29uXy5zZXREaXNhYmxlZChpc0Rpc2FibGVkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUVsZW1lbnR8IU5hdGl2ZUlucHV0VHlwZX0gVGhlIG5hdGl2ZSB0ZXh0IGlucHV0IGZyb20gdGhlXG4gICAqIGhvc3QgZW52aXJvbm1lbnQsIG9yIGEgZHVtbXkgaWYgbm9uZSBleGlzdHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXROYXRpdmVJbnB1dF8oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uZ2V0TmF0aXZlSW5wdXQoKSB8fFxuICAgIC8qKiBAdHlwZSB7IU5hdGl2ZUlucHV0VHlwZX0gKi8gKHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIHZhbGlkaXR5OiB7XG4gICAgICAgIGJhZElucHV0OiBmYWxzZSxcbiAgICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RleHRGaWVsZEZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFRleHRGaWVsZCBMaW5lIFJpcHBsZS5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBsaW5lIHJpcHBsZSBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDTGluZVJpcHBsZUFkYXB0ZXIge1xuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSBsaW5lIHJpcHBsZSBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSBsaW5lIHJpcHBsZSBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc0NsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogU2V0cyB0aGUgc3R5bGUgcHJvcGVydHkgd2l0aCBwcm9wZXJ0eU5hbWUgdG8gdmFsdWUgb24gdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldFN0eWxlKHByb3BlcnR5TmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgbGluZSByaXBwbGUgZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRXZlbnRIYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBsaW5lIHJpcHBsZSBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckV2ZW50SGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENMaW5lUmlwcGxlQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIExJTkVfUklQUExFX0FDVElWRTogJ21kYy1saW5lLXJpcHBsZS0tYWN0aXZlJyxcbiAgTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HOiAnbWRjLWxpbmUtcmlwcGxlLS1kZWFjdGl2YXRpbmcnLFxufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENMaW5lUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDTGluZVJpcHBsZUFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ0xpbmVSaXBwbGVBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ0xpbmVSaXBwbGVBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDTGluZVJpcHBsZUFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKCkgPT4ge30sXG4gICAgICBoYXNDbGFzczogKCkgPT4ge30sXG4gICAgICBzZXRTdHlsZTogKCkgPT4ge30sXG4gICAgICByZWdpc3RlckV2ZW50SGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENMaW5lUmlwcGxlQWRhcHRlcj19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSAvKiogQHR5cGUgeyFNRENMaW5lUmlwcGxlQWRhcHRlcn0gKi8gKHt9KSkge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDTGluZVJpcHBsZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVUcmFuc2l0aW9uRW5kKGV2dCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJFdmVudEhhbmRsZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLnRyYW5zaXRpb25FbmRIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckV2ZW50SGFuZGxlcigndHJhbnNpdGlvbmVuZCcsIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZXMgdGhlIGxpbmUgcmlwcGxlXG4gICAqL1xuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfQUNUSVZFKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjZW50ZXIgb2YgdGhlIHJpcHBsZSBhbmltYXRpb24gdG8gdGhlIGdpdmVuIFggY29vcmRpbmF0ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHhDb29yZGluYXRlXG4gICAqL1xuICBzZXRSaXBwbGVDZW50ZXIoeENvb3JkaW5hdGUpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlKCd0cmFuc2Zvcm0tb3JpZ2luJywgYCR7eENvb3JkaW5hdGV9cHggY2VudGVyYCk7XG4gIH1cblxuICAvKipcbiAgICogRGVhY3RpdmF0ZXMgdGhlIGxpbmUgcmlwcGxlXG4gICAqL1xuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9ERUFDVElWQVRJTkcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSB0cmFuc2l0aW9uIGVuZCBldmVudFxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqL1xuICBoYW5kbGVUcmFuc2l0aW9uRW5kKGV2dCkge1xuICAgIC8vIFdhaXQgZm9yIHRoZSBsaW5lIHJpcHBsZSB0byBiZSBlaXRoZXIgdHJhbnNwYXJlbnQgb3Igb3BhcXVlXG4gICAgLy8gYmVmb3JlIGVtaXR0aW5nIHRoZSBhbmltYXRpb24gZW5kIGV2ZW50XG4gICAgY29uc3QgaXNEZWFjdGl2YXRpbmcgPSB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HKTtcblxuICAgIGlmIChldnQucHJvcGVydHlOYW1lID09PSAnb3BhY2l0eScpIHtcbiAgICAgIGlmIChpc0RlYWN0aXZhdGluZykge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfQUNUSVZFKTtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkxJTkVfUklQUExFX0RFQUNUSVZBVElORyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBGbG9hdGluZyBMYWJlbC5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBmbG9hdGluZyBsYWJlbCBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXIge1xuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSBsYWJlbCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSBsYWJlbCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdpZHRoIG9mIHRoZSBsYWJlbCBlbGVtZW50LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXRXaWR0aCgpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIHJvb3QgZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBMQUJFTF9GTE9BVF9BQk9WRTogJ21kYy1mbG9hdGluZy1sYWJlbC0tZmxvYXQtYWJvdmUnLFxuICBMQUJFTF9TSEFLRTogJ21kYy1mbG9hdGluZy1sYWJlbC0tc2hha2UnLFxufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENGbG9hdGluZ0xhYmVsQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QHNlZSBNRENGbG9hdGluZ0xhYmVsQWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZCByZXR1cm5cbiAgICogdHlwZXMuXG4gICAqIEByZXR1cm4geyFNRENGbG9hdGluZ0xhYmVsQWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IU1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyfSAqLyAoe1xuICAgICAgYWRkQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgZ2V0V2lkdGg6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLnNoYWtlQW5pbWF0aW9uRW5kSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZVNoYWtlQW5pbWF0aW9uRW5kXygpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdhbmltYXRpb25lbmQnLCB0aGlzLnNoYWtlQW5pbWF0aW9uRW5kSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2FuaW1hdGlvbmVuZCcsIHRoaXMuc2hha2VBbmltYXRpb25FbmRIYW5kbGVyXyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIGxhYmVsIGVsZW1lbnQuXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldFdpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmdldFdpZHRoKCk7XG4gIH1cblxuICAvKipcbiAgICogU3R5bGVzIHRoZSBsYWJlbCB0byBwcm9kdWNlIHRoZSBsYWJlbCBzaGFrZSBmb3IgZXJyb3JzLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNob3VsZFNoYWtlIGFkZHMgc2hha2UgY2xhc3MgaWYgdHJ1ZSxcbiAgICogb3RoZXJ3aXNlIHJlbW92ZXMgc2hha2UgY2xhc3MuXG4gICAqL1xuICBzaGFrZShzaG91bGRTaGFrZSkge1xuICAgIGNvbnN0IHtMQUJFTF9TSEFLRX0gPSBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmIChzaG91bGRTaGFrZSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhMQUJFTF9TSEFLRSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTEFCRUxfU0hBS0UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdHlsZXMgdGhlIGxhYmVsIHRvIGZsb2F0IG9yIGRvY2suXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkRmxvYXQgYWRkcyBmbG9hdCBjbGFzcyBpZiB0cnVlLCBvdGhlcndpc2UgcmVtb3ZlXG4gICAqIGZsb2F0IGFuZCBzaGFrZSBjbGFzcyB0byBkb2NrIGxhYmVsLlxuICAgKi9cbiAgZmxvYXQoc2hvdWxkRmxvYXQpIHtcbiAgICBjb25zdCB7TEFCRUxfRkxPQVRfQUJPVkUsIExBQkVMX1NIQUtFfSA9IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHNob3VsZEZsb2F0KSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKExBQkVMX0ZMT0FUX0FCT1ZFKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhMQUJFTF9GTE9BVF9BQk9WRSk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKExBQkVMX1NIQUtFKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbiBpbnRlcmFjdGlvbiBldmVudCBvbiB0aGUgcm9vdCBlbGVtZW50LlxuICAgKi9cbiAgaGFuZGxlU2hha2VBbmltYXRpb25FbmRfKCkge1xuICAgIGNvbnN0IHtMQUJFTF9TSEFLRX0gPSBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTEFCRUxfU0hBS0UpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBOb3RjaGVkIE91dGxpbmUuXG4gKlxuICogRGVmaW5lcyB0aGUgc2hhcGUgb2YgdGhlIGFkYXB0ZXIgZXhwZWN0ZWQgYnkgdGhlIGZvdW5kYXRpb24uIEltcGxlbWVudCB0aGlzXG4gKiBhZGFwdGVyIHRvIGludGVncmF0ZSB0aGUgTm90Y2hlZCBPdXRsaW5lIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXIge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0V2lkdGgoKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBoZWlnaHQgb2YgdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0SGVpZ2h0KCkge31cblxuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSByb290IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBcImRcIiBhdHRyaWJ1dGUgb2YgdGhlIG91dGxpbmUgZWxlbWVudCdzIFNWRyBwYXRoLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldE91dGxpbmVQYXRoQXR0cih2YWx1ZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaWRsZSBvdXRsaW5lIGVsZW1lbnQncyBjb21wdXRlZCBzdHlsZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gY3NzIHByb3BlcnR5IGBwcm9wZXJ0eU5hbWVgLlxuICAgKiBXZSBhY2hpZXZlIHRoaXMgdmlhIGBnZXRDb21wdXRlZFN0eWxlKC4uLikuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eU5hbWUpYC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBnZXRJZGxlT3V0bGluZVN0eWxlVmFsdWUocHJvcGVydHlOYW1lKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBQQVRIX1NFTEVDVE9SOiAnLm1kYy1ub3RjaGVkLW91dGxpbmVfX3BhdGgnLFxuICBJRExFX09VVExJTkVfU0VMRUNUT1I6ICcubWRjLW5vdGNoZWQtb3V0bGluZV9faWRsZScsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIE9VVExJTkVfTk9UQ0hFRDogJ21kYy1ub3RjaGVkLW91dGxpbmUtLW5vdGNoZWQnLFxufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZCByZXR1cm5cbiAgICogdHlwZXMuXG4gICAqIEByZXR1cm4geyFNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXJ9ICovICh7XG4gICAgICBnZXRXaWR0aDogKCkgPT4ge30sXG4gICAgICBnZXRIZWlnaHQ6ICgpID0+IHt9LFxuICAgICAgYWRkQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgc2V0T3V0bGluZVBhdGhBdHRyOiAoKSA9PiB7fSxcbiAgICAgIGdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZTogKCkgPT4ge30sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTURDTm90Y2hlZE91dGxpbmVBZGFwdGVyfSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBvdXRsaW5lIG5vdGNoZWQgc2VsZWN0b3IgYW5kIHVwZGF0ZXMgdGhlIG5vdGNoIHdpZHRoXG4gICAqIGNhbGN1bGF0ZWQgYmFzZWQgb2ZmIG9mIG5vdGNoV2lkdGggYW5kIGlzUnRsLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90Y2hXaWR0aFxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBpc1J0bFxuICAgKi9cbiAgbm90Y2gobm90Y2hXaWR0aCwgaXNSdGwgPSBmYWxzZSkge1xuICAgIGNvbnN0IHtPVVRMSU5FX05PVENIRUR9ID0gTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhPVVRMSU5FX05PVENIRUQpO1xuICAgIHRoaXMudXBkYXRlU3ZnUGF0aF8obm90Y2hXaWR0aCwgaXNSdGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgbm90Y2hlZCBvdXRsaW5lIHNlbGVjdG9yIHRvIGNsb3NlIHRoZSBub3RjaCBpbiB0aGUgb3V0bGluZS5cbiAgICovXG4gIGNsb3NlTm90Y2goKSB7XG4gICAgY29uc3Qge09VVExJTkVfTk9UQ0hFRH0gPSBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE9VVExJTkVfTk9UQ0hFRCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgU1ZHIHBhdGggb2YgdGhlIGZvY3VzIG91dGxpbmUgZWxlbWVudCBiYXNlZCBvbiB0aGUgbm90Y2hXaWR0aFxuICAgKiBhbmQgdGhlIFJUTCBjb250ZXh0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90Y2hXaWR0aFxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBpc1J0bFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdXBkYXRlU3ZnUGF0aF8obm90Y2hXaWR0aCwgaXNSdGwpIHtcbiAgICAvLyBGYWxsIGJhY2sgdG8gcmVhZGluZyBhIHNwZWNpZmljIGNvcm5lcidzIHN0eWxlIGJlY2F1c2UgRmlyZWZveCBkb2Vzbid0IHJlcG9ydCB0aGUgc3R5bGUgb24gYm9yZGVyLXJhZGl1cy5cbiAgICBjb25zdCByYWRpdXNTdHlsZVZhbHVlID0gdGhpcy5hZGFwdGVyXy5nZXRJZGxlT3V0bGluZVN0eWxlVmFsdWUoJ2JvcmRlci1yYWRpdXMnKSB8fFxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZSgnYm9yZGVyLXRvcC1sZWZ0LXJhZGl1cycpO1xuICAgIGNvbnN0IHJhZGl1cyA9IHBhcnNlRmxvYXQocmFkaXVzU3R5bGVWYWx1ZSk7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmFkYXB0ZXJfLmdldFdpZHRoKCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5hZGFwdGVyXy5nZXRIZWlnaHQoKTtcbiAgICBjb25zdCBjb3JuZXJXaWR0aCA9IHJhZGl1cyArIDEuMjtcbiAgICBjb25zdCBsZWFkaW5nU3Ryb2tlTGVuZ3RoID0gTWF0aC5hYnMoMTEgLSBjb3JuZXJXaWR0aCk7XG4gICAgY29uc3QgcGFkZGVkTm90Y2hXaWR0aCA9IG5vdGNoV2lkdGggKyA4O1xuXG4gICAgLy8gVGhlIHJpZ2h0LCBib3R0b20sIGFuZCBsZWZ0IHNpZGVzIG9mIHRoZSBvdXRsaW5lIGZvbGxvdyB0aGUgc2FtZSBTVkcgcGF0aC5cbiAgICBjb25zdCBwYXRoTWlkZGxlID0gJ2EnICsgcmFkaXVzICsgJywnICsgcmFkaXVzICsgJyAwIDAgMSAnICsgcmFkaXVzICsgJywnICsgcmFkaXVzXG4gICAgICArICd2JyArIChoZWlnaHQgLSAoMiAqIGNvcm5lcldpZHRoKSlcbiAgICAgICsgJ2EnICsgcmFkaXVzICsgJywnICsgcmFkaXVzICsgJyAwIDAgMSAnICsgLXJhZGl1cyArICcsJyArIHJhZGl1c1xuICAgICAgKyAnaCcgKyAoLXdpZHRoICsgKDIgKiBjb3JuZXJXaWR0aCkpXG4gICAgICArICdhJyArIHJhZGl1cyArICcsJyArIHJhZGl1cyArICcgMCAwIDEgJyArIC1yYWRpdXMgKyAnLCcgKyAtcmFkaXVzXG4gICAgICArICd2JyArICgtaGVpZ2h0ICsgKDIgKiBjb3JuZXJXaWR0aCkpXG4gICAgICArICdhJyArIHJhZGl1cyArICcsJyArIHJhZGl1cyArICcgMCAwIDEgJyArIHJhZGl1cyArICcsJyArIC1yYWRpdXM7XG5cbiAgICBsZXQgcGF0aDtcbiAgICBpZiAoIWlzUnRsKSB7XG4gICAgICBwYXRoID0gJ00nICsgKGNvcm5lcldpZHRoICsgbGVhZGluZ1N0cm9rZUxlbmd0aCArIHBhZGRlZE5vdGNoV2lkdGgpICsgJywnICsgMVxuICAgICAgICArICdoJyArICh3aWR0aCAtICgyICogY29ybmVyV2lkdGgpIC0gcGFkZGVkTm90Y2hXaWR0aCAtIGxlYWRpbmdTdHJva2VMZW5ndGgpXG4gICAgICAgICsgcGF0aE1pZGRsZVxuICAgICAgICArICdoJyArIGxlYWRpbmdTdHJva2VMZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhdGggPSAnTScgKyAod2lkdGggLSBjb3JuZXJXaWR0aCAtIGxlYWRpbmdTdHJva2VMZW5ndGgpICsgJywnICsgMVxuICAgICAgICArICdoJyArIGxlYWRpbmdTdHJva2VMZW5ndGhcbiAgICAgICAgKyBwYXRoTWlkZGxlXG4gICAgICAgICsgJ2gnICsgKHdpZHRoIC0gKDIgKiBjb3JuZXJXaWR0aCkgLSBwYWRkZWROb3RjaFdpZHRoIC0gbGVhZGluZ1N0cm9rZUxlbmd0aCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5zZXRPdXRsaW5lUGF0aEF0dHIocGF0aCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBSaXBwbGUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gQ1NTIHZhcmlhYmxlc1xuICogLSBwb3NpdGlvblxuICogLSBkaW1lbnNpb25zXG4gKiAtIHNjcm9sbCBwb3NpdGlvblxuICogLSBldmVudCBoYW5kbGVyc1xuICogLSB1bmJvdW5kZWQsIGFjdGl2ZSBhbmQgZGlzYWJsZWQgc3RhdGVzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENSaXBwbGVBZGFwdGVyIHtcbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1VuYm91bmRlZCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZUFjdGl2ZSgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZURpc2FibGVkKCkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudFRhcmdldH0gdGFyZ2V0ICovXG4gIGNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFyTmFtZVxuICAgKiBAcGFyYW0gez9udW1iZXJ8c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgdXBkYXRlQ3NzVmFyaWFibGUodmFyTmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqIEByZXR1cm4geyFDbGllbnRSZWN0fSAqL1xuICBjb21wdXRlQm91bmRpbmdSZWN0KCkge31cblxuICAvKiogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gKi9cbiAgZ2V0V2luZG93UGFnZU9mZnNldCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgLy8gUmlwcGxlIGlzIGEgc3BlY2lhbCBjYXNlIHdoZXJlIHRoZSBcInJvb3RcIiBjb21wb25lbnQgaXMgcmVhbGx5IGEgXCJtaXhpblwiIG9mIHNvcnRzLFxuICAvLyBnaXZlbiB0aGF0IGl0J3MgYW4gJ3VwZ3JhZGUnIHRvIGFuIGV4aXN0aW5nIGNvbXBvbmVudC4gVGhhdCBiZWluZyBzYWlkIGl0IGlzIHRoZSByb290XG4gIC8vIENTUyBjbGFzcyB0aGF0IGFsbCBvdGhlciBDU1MgY2xhc3NlcyBkZXJpdmUgZnJvbS5cbiAgUk9PVDogJ21kYy1yaXBwbGUtdXBncmFkZWQnLFxuICBVTkJPVU5ERUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS11bmJvdW5kZWQnLFxuICBCR19GT0NVU0VEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tYmFja2dyb3VuZC1mb2N1c2VkJyxcbiAgRkdfQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtYWN0aXZhdGlvbicsXG4gIEZHX0RFQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtZGVhY3RpdmF0aW9uJyxcbn07XG5cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFZBUl9MRUZUOiAnLS1tZGMtcmlwcGxlLWxlZnQnLFxuICBWQVJfVE9QOiAnLS1tZGMtcmlwcGxlLXRvcCcsXG4gIFZBUl9GR19TSVpFOiAnLS1tZGMtcmlwcGxlLWZnLXNpemUnLFxuICBWQVJfRkdfU0NBTEU6ICctLW1kYy1yaXBwbGUtZmctc2NhbGUnLFxuICBWQVJfRkdfVFJBTlNMQVRFX1NUQVJUOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydCcsXG4gIFZBUl9GR19UUkFOU0xBVEVfRU5EOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQnLFxufTtcblxuY29uc3QgbnVtYmVycyA9IHtcbiAgUEFERElORzogMTAsXG4gIElOSVRJQUxfT1JJR0lOX1NDQUxFOiAwLjYsXG4gIERFQUNUSVZBVElPTl9USU1FT1VUX01TOiAyMjUsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLXRyYW5zbGF0ZS1kdXJhdGlvbiAoaS5lLiBhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgRkdfREVBQ1RJVkFUSU9OX01TOiAxNTAsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLWZhZGUtb3V0LWR1cmF0aW9uIChpLmUuIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIFRBUF9ERUxBWV9NUzogMzAwLCAvLyBEZWxheSBiZXR3ZWVuIHRvdWNoIGFuZCBzaW11bGF0ZWQgbW91c2UgZXZlbnRzIG9uIHRvdWNoIGRldmljZXNcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gc3VwcG9ydHNDc3NWYXJpYWJsZXMgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IENTUyBjdXN0b20gdmFyaWFibGUgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gYXBwbHlQYXNzaXZlIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c1Bhc3NpdmVfO1xuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaikge1xuICAvLyBEZXRlY3QgdmVyc2lvbnMgb2YgRWRnZSB3aXRoIGJ1Z2d5IHZhcigpIHN1cHBvcnRcbiAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8xMTQ5NTQ0OC9cbiAgY29uc3QgZG9jdW1lbnQgPSB3aW5kb3dPYmouZG9jdW1lbnQ7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbm9kZS5jbGFzc05hbWUgPSAnbWRjLXJpcHBsZS1zdXJmYWNlLS10ZXN0LWVkZ2UtdmFyLWJ1Zyc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgLy8gVGhlIGJ1ZyBleGlzdHMgaWYgOjpiZWZvcmUgc3R5bGUgZW5kcyB1cCBwcm9wYWdhdGluZyB0byB0aGUgcGFyZW50IGVsZW1lbnQuXG4gIC8vIEFkZGl0aW9uYWxseSwgZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIG51bGwgaW4gaWZyYW1lcyB3aXRoIGRpc3BsYXk6IFwibm9uZVwiIGluIEZpcmVmb3gsXG4gIC8vIGJ1dCBGaXJlZm94IGlzIGtub3duIHRvIHN1cHBvcnQgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzIGNvcnJlY3RseS5cbiAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvd09iai5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBjb25zdCBoYXNQc2V1ZG9WYXJCdWcgPSBjb21wdXRlZFN0eWxlICE9PSBudWxsICYmIGNvbXB1dGVkU3R5bGUuYm9yZGVyVG9wU3R5bGUgPT09ICdzb2xpZCc7XG4gIG5vZGUucmVtb3ZlKCk7XG4gIHJldHVybiBoYXNQc2V1ZG9WYXJCdWc7XG59XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93T2JqLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBsZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNDc3NWYXJpYWJsZXNfID09PSAnYm9vbGVhbicgJiYgIWZvcmNlUmVmcmVzaCkge1xuICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuXG4gIGNvbnN0IHN1cHBvcnRzRnVuY3Rpb25QcmVzZW50ID0gd2luZG93T2JqLkNTUyAmJiB0eXBlb2Ygd2luZG93T2JqLkNTUy5zdXBwb3J0cyA9PT0gJ2Z1bmN0aW9uJztcbiAgaWYgKCFzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgPSB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCctLWNzcy12YXJzJywgJ3llcycpO1xuICAvLyBTZWU6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTQ2NjlcbiAgLy8gU2VlOiBSRUFETUUgc2VjdGlvbiBvbiBTYWZhcmlcbiAgY29uc3Qgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzID0gKFxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJygtLWNzcy12YXJzOiB5ZXMpJykgJiZcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCdjb2xvcicsICcjMDAwMDAwMDAnKVxuICApO1xuXG4gIGlmIChleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIHx8IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cykge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gIWRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKTtcbiAgfSBlbHNlIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKCFmb3JjZVJlZnJlc2gpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG59XG5cbi8vXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXG4gKiBAcGFyYW0geyFXaW5kb3c9fSBnbG9iYWxPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx7cGFzc2l2ZTogYm9vbGVhbn19XG4gKi9cbmZ1bmN0aW9uIGFwcGx5UGFzc2l2ZShnbG9iYWxPYmogPSB3aW5kb3csIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdXBwb3J0c1Bhc3NpdmVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGdsb2JhbE9iai5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge2dldCBwYXNzaXZlKCkge1xuICAgICAgICBpc1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICB9fSk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgICBzdXBwb3J0c1Bhc3NpdmVfID0gaXNTdXBwb3J0ZWQ7XG4gIH1cblxuICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlXyA/IHtwYXNzaXZlOiB0cnVlfSA6IGZhbHNlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gSFRNTEVsZW1lbnRQcm90b3R5cGVcbiAqIEByZXR1cm4geyFBcnJheTxzdHJpbmc+fVxuICovXG5mdW5jdGlvbiBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnRQcm90b3R5cGUpIHtcbiAgcmV0dXJuIFtcbiAgICAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJywgJ21zTWF0Y2hlc1NlbGVjdG9yJywgJ21hdGNoZXMnLFxuICBdLmZpbHRlcigocCkgPT4gcCBpbiBIVE1MRWxlbWVudFByb3RvdHlwZSkucG9wKCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshRXZlbnR9IGV2XG4gKiBAcGFyYW0ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19IHBhZ2VPZmZzZXRcbiAqIEBwYXJhbSB7IUNsaWVudFJlY3R9IGNsaWVudFJlY3RcbiAqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhldiwgcGFnZU9mZnNldCwgY2xpZW50UmVjdCkge1xuICBjb25zdCB7eCwgeX0gPSBwYWdlT2Zmc2V0O1xuICBjb25zdCBkb2N1bWVudFggPSB4ICsgY2xpZW50UmVjdC5sZWZ0O1xuICBjb25zdCBkb2N1bWVudFkgPSB5ICsgY2xpZW50UmVjdC50b3A7XG5cbiAgbGV0IG5vcm1hbGl6ZWRYO1xuICBsZXQgbm9ybWFsaXplZFk7XG4gIC8vIERldGVybWluZSB0b3VjaCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmlwcGxlIGNvbnRhaW5lci5cbiAgaWYgKGV2LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfSBlbHNlIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYucGFnZVkgLSBkb2N1bWVudFk7XG4gIH1cblxuICByZXR1cm4ge3g6IG5vcm1hbGl6ZWRYLCB5OiBub3JtYWxpemVkWX07XG59XG5cbmV4cG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGFwcGx5UGFzc2l2ZSwgZ2V0TWF0Y2hlc1Byb3BlcnR5LCBnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgaXNBY3RpdmF0ZWQ6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBhY3RpdmF0aW9uRXZlbnQ6IEV2ZW50LFxuICogICBpc1Byb2dyYW1tYXRpYzogKGJvb2xlYW58dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IEFjdGl2YXRpb25TdGF0ZVR5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZGVhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBmb2N1czogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBibHVyOiAoc3RyaW5nfHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lckluZm9UeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBkZWFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBmb2N1czogZnVuY3Rpb24oKSxcbiAqICAgYmx1cjogZnVuY3Rpb24oKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVyc1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgeDogbnVtYmVyLFxuICogICB5OiBudW1iZXJcbiAqIH19XG4gKi9cbmxldCBQb2ludFR5cGU7XG5cbi8vIEFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gdGhlIHJvb3QgZWxlbWVudCBvZiBlYWNoIGluc3RhbmNlIGZvciBhY3RpdmF0aW9uXG5jb25zdCBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaHN0YXJ0JywgJ3BvaW50ZXJkb3duJywgJ21vdXNlZG93bicsICdrZXlkb3duJ107XG5cbi8vIERlYWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiBkb2N1bWVudEVsZW1lbnQgd2hlbiBhIHBvaW50ZXItcmVsYXRlZCBkb3duIGV2ZW50IG9jY3Vyc1xuY29uc3QgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoZW5kJywgJ3BvaW50ZXJ1cCcsICdtb3VzZXVwJ107XG5cbi8vIFRyYWNrcyBhY3RpdmF0aW9ucyB0aGF0IGhhdmUgb2NjdXJyZWQgb24gdGhlIGN1cnJlbnQgZnJhbWUsIHRvIGF2b2lkIHNpbXVsdGFuZW91cyBuZXN0ZWQgYWN0aXZhdGlvbnNcbi8qKiBAdHlwZSB7IUFycmF5PCFFdmVudFRhcmdldD59ICovXG5sZXQgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENSaXBwbGVBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDUmlwcGxlRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiAvKiBib29sZWFuIC0gY2FjaGVkICovIHt9LFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAoLyogdGFyZ2V0OiAhRXZlbnRUYXJnZXQgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKC8qIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiAvKiBDbGllbnRSZWN0ICovIHt9LFxuICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4gLyoge3g6IG51bWJlciwgeTogbnVtYmVyfSAqLyB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDUmlwcGxlRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQ2xpZW50UmVjdH0gKi9cbiAgICB0aGlzLmZyYW1lXyA9IC8qKiBAdHlwZSB7IUNsaWVudFJlY3R9ICovICh7d2lkdGg6IDAsIGhlaWdodDogMH0pO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLm1heFJhZGl1c18gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmRlYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmZvY3VzSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUZvY3VzKCk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuYmx1ckhhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVCbHVyKCk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLnJlc2l6ZUhhbmRsZXJfID0gKCkgPT4gdGhpcy5sYXlvdXQoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7e2xlZnQ6IG51bWJlciwgdG9wOm51bWJlcn19ICovXG4gICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ1NjYWxlXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18gPSAoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSB0cnVlO1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHs/RXZlbnR9ICovXG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIGNvbXB1dGUgdGhpcyBwcm9wZXJ0eSBzbyB0aGF0IHdlIGFyZSBub3QgcXVlcnlpbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNsaWVudFxuICAgKiB1bnRpbCB0aGUgcG9pbnQgaW4gdGltZSB3aGVyZSB0aGUgZm91bmRhdGlvbiByZXF1ZXN0cyBpdC4gVGhpcyBwcmV2ZW50cyBzY2VuYXJpb3Mgd2hlcmVcbiAgICogY2xpZW50LXNpZGUgZmVhdHVyZS1kZXRlY3Rpb24gbWF5IGhhcHBlbiB0b28gZWFybHksIHN1Y2ggYXMgd2hlbiBjb21wb25lbnRzIGFyZSByZW5kZXJlZCBvbiB0aGUgc2VydmVyXG4gICAqIGFuZCB0aGVuIGluaXRpYWxpemVkIGF0IG1vdW50IHRpbWUgb24gdGhlIGNsaWVudC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzU3VwcG9ydGVkXygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5icm93c2VyU3VwcG9ydHNDc3NWYXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9XG4gICAqL1xuICBkZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBY3RpdmF0ZWQ6IGZhbHNlLFxuICAgICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IGZhbHNlLFxuICAgICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiBmYWxzZSxcbiAgICAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiBmYWxzZSxcbiAgICAgIGFjdGl2YXRpb25FdmVudDogbnVsbCxcbiAgICAgIGlzUHJvZ3JhbW1hdGljOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqL1xuICBpbml0KCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZF8oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoUk9PVCk7XG4gICAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgICAgLy8gVW5ib3VuZGVkIHJpcHBsZXMgbmVlZCBsYXlvdXQgbG9naWMgYXBwbGllZCBpbW1lZGlhdGVseSB0byBzZXQgY29vcmRpbmF0ZXMgZm9yIGJvdGggc2hhZGUgYW5kIHJpcHBsZVxuICAgICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZF8oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2YXRpb25UaW1lcl8pIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gMDtcbiAgICAgIGNvbnN0IHtGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgfVxuXG4gICAgdGhpcy5kZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoUk9PVCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgICB0aGlzLnJlbW92ZUNzc1ZhcnNfKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW1vdmVDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7c3RyaW5nc30gPSBNRENSaXBwbGVGb3VuZGF0aW9uO1xuICAgIE9iamVjdC5rZXlzKHN0cmluZ3MpLmZvckVhY2goKGspID0+IHtcbiAgICAgIGlmIChrLmluZGV4T2YoJ1ZBUl8nKSA9PT0gMCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKHN0cmluZ3Nba10sIG51bGwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhY3RpdmF0ZV8oZSkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZURpc2FibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEF2b2lkIHJlYWN0aW5nIHRvIGZvbGxvdy1vbiBldmVudHMgZmlyZWQgYnkgdG91Y2ggZGV2aWNlIGFmdGVyIGFuIGFscmVhZHktcHJvY2Vzc2VkIHVzZXIgaW50ZXJhY3Rpb25cbiAgICBjb25zdCBwcmV2aW91c0FjdGl2YXRpb25FdmVudCA9IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfO1xuICAgIGNvbnN0IGlzU2FtZUludGVyYWN0aW9uID0gcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgJiYgZSAmJiBwcmV2aW91c0FjdGl2YXRpb25FdmVudC50eXBlICE9PSBlLnR5cGU7XG4gICAgaWYgKGlzU2FtZUludGVyYWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkID0gdHJ1ZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPSBlID09PSBudWxsO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5hY3RpdmF0aW9uRXZlbnQgPSBlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNBY3RpdmF0ZWRCeVBvaW50ZXIgPSBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPyBmYWxzZSA6IChcbiAgICAgIGUudHlwZSA9PT0gJ21vdXNlZG93bicgfHwgZS50eXBlID09PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAncG9pbnRlcmRvd24nXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc0FjdGl2YXRlZENoaWxkID1cbiAgICAgIGUgJiYgYWN0aXZhdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIGFjdGl2YXRlZFRhcmdldHMuc29tZSgodGFyZ2V0KSA9PiB0aGlzLmFkYXB0ZXJfLmNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSk7XG4gICAgaWYgKGhhc0FjdGl2YXRlZENoaWxkKSB7XG4gICAgICAvLyBJbW1lZGlhdGVseSByZXNldCBhY3RpdmF0aW9uIHN0YXRlLCB3aGlsZSBwcmVzZXJ2aW5nIGxvZ2ljIHRoYXQgcHJldmVudHMgdG91Y2ggZm9sbG93LW9uIGV2ZW50c1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZSkge1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cy5wdXNoKC8qKiBAdHlwZSB7IUV2ZW50VGFyZ2V0fSAqLyAoZS50YXJnZXQpKTtcbiAgICAgIHRoaXMucmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSk7XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBSZXNldCBhcnJheSBvbiBuZXh0IGZyYW1lIGFmdGVyIHRoZSBjdXJyZW50IGV2ZW50IGhhcyBoYWQgYSBjaGFuY2UgdG8gYnViYmxlIHRvIHByZXZlbnQgYW5jZXN0b3IgcmlwcGxlc1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4gICAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSAmJiAoZS5rZXkgPT09ICcgJyB8fCBlLmtleUNvZGUgPT09IDMyKSkge1xuICAgICAgICAvLyBJZiBzcGFjZSB3YXMgcHJlc3NlZCwgdHJ5IGFnYWluIHdpdGhpbiBhbiByQUYgY2FsbCB0byBkZXRlY3QgOmFjdGl2ZSwgYmVjYXVzZSBkaWZmZXJlbnQgVUFzIHJlcG9ydFxuICAgICAgICAvLyBhY3RpdmUgc3RhdGVzIGluY29uc2lzdGVudGx5IHdoZW4gdGhleSdyZSBjYWxsZWQgd2l0aGluIGV2ZW50IGhhbmRsaW5nIGNvZGU6XG4gICAgICAgIC8vIC0gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NjM1OTcxXG4gICAgICAgIC8vIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTI5Mzc0MVxuICAgICAgICAvLyBXZSB0cnkgZmlyc3Qgb3V0c2lkZSByQUYgdG8gc3VwcG9ydCBFZGdlLCB3aGljaCBkb2VzIG5vdCBleGhpYml0IHRoaXMgcHJvYmxlbSwgYnV0IHdpbGwgY3Jhc2ggaWYgYSBDU1NcbiAgICAgICAgLy8gdmFyaWFibGUgaXMgc2V0IHdpdGhpbiBhIHJBRiBjYWxsYmFjayBmb3IgYSBzdWJtaXQgYnV0dG9uIGludGVyYWN0aW9uICgjMjI0MSkuXG4gICAgICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IHRoaXMuY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSk7XG4gICAgICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICAgIC8vIFJlc2V0IGFjdGl2YXRpb24gc3RhdGUgaW1tZWRpYXRlbHkgaWYgZWxlbWVudCB3YXMgbm90IG1hZGUgYWN0aXZlLlxuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpIHtcbiAgICByZXR1cm4gKGUgJiYgZS50eXBlID09PSAna2V5ZG93bicpID8gdGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VBY3RpdmUoKSA6IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5hY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGFuaW1hdGVBY3RpdmF0aW9uXygpIHtcbiAgICBjb25zdCB7VkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgVkFSX0ZHX1RSQU5TTEFURV9FTkR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT04sIEZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtERUFDVElWQVRJT05fVElNRU9VVF9NU30gPSBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnM7XG5cbiAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuXG4gICAgbGV0IHRyYW5zbGF0ZVN0YXJ0ID0gJyc7XG4gICAgbGV0IHRyYW5zbGF0ZUVuZCA9ICcnO1xuXG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIGNvbnN0IHtzdGFydFBvaW50LCBlbmRQb2ludH0gPSB0aGlzLmdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKTtcbiAgICAgIHRyYW5zbGF0ZVN0YXJ0ID0gYCR7c3RhcnRQb2ludC54fXB4LCAke3N0YXJ0UG9pbnQueX1weGA7XG4gICAgICB0cmFuc2xhdGVFbmQgPSBgJHtlbmRQb2ludC54fXB4LCAke2VuZFBvaW50Lnl9cHhgO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgdHJhbnNsYXRlU3RhcnQpO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9FTkQsIHRyYW5zbGF0ZUVuZCk7XG4gICAgLy8gQ2FuY2VsIGFueSBvbmdvaW5nIGFjdGl2YXRpb24vZGVhY3RpdmF0aW9uIGFuaW1hdGlvbnNcbiAgICBjbGVhclRpbWVvdXQodGhpcy5hY3RpdmF0aW9uVGltZXJfKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8pO1xuICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuXG4gICAgLy8gRm9yY2UgbGF5b3V0IGluIG9yZGVyIHRvIHJlLXRyaWdnZXIgdGhlIGFuaW1hdGlvbi5cbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18oKSwgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4ge3tzdGFydFBvaW50OiBQb2ludFR5cGUsIGVuZFBvaW50OiBQb2ludFR5cGV9fVxuICAgKi9cbiAgZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpIHtcbiAgICBjb25zdCB7YWN0aXZhdGlvbkV2ZW50LCB3YXNBY3RpdmF0ZWRCeVBvaW50ZXJ9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuXG4gICAgbGV0IHN0YXJ0UG9pbnQ7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlcikge1xuICAgICAgc3RhcnRQb2ludCA9IGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhcbiAgICAgICAgLyoqIEB0eXBlIHshRXZlbnR9ICovIChhY3RpdmF0aW9uRXZlbnQpLFxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmdldFdpbmRvd1BhZ2VPZmZzZXQoKSwgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICAgIHg6IHRoaXMuZnJhbWVfLndpZHRoIC8gMixcbiAgICAgICAgeTogdGhpcy5mcmFtZV8uaGVpZ2h0IC8gMixcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIENlbnRlciB0aGUgZWxlbWVudCBhcm91bmQgdGhlIHN0YXJ0IHBvaW50LlxuICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICB4OiBzdGFydFBvaW50LnggLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6IHN0YXJ0UG9pbnQueSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICBjb25zdCBlbmRQb2ludCA9IHtcbiAgICAgIHg6ICh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiAodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtzdGFydFBvaW50LCBlbmRQb2ludH07XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCkge1xuICAgIC8vIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBib3RoIHdoZW4gYSBwb2ludGluZyBkZXZpY2UgaXMgcmVsZWFzZWQsIGFuZCB3aGVuIHRoZSBhY3RpdmF0aW9uIGFuaW1hdGlvbiBlbmRzLlxuICAgIC8vIFRoZSBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIHNob3VsZCBvbmx5IHJ1biBhZnRlciBib3RoIG9mIHRob3NlIG9jY3VyLlxuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtoYXNEZWFjdGl2YXRpb25VWFJ1biwgaXNBY3RpdmF0ZWR9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGNvbnN0IGFjdGl2YXRpb25IYXNFbmRlZCA9IGhhc0RlYWN0aXZhdGlvblVYUnVuIHx8ICFpc0FjdGl2YXRlZDtcblxuICAgIGlmIChhY3RpdmF0aW9uSGFzRW5kZWQgJiYgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfKSB7XG4gICAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgfSwgbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKSB7XG4gICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gIH1cblxuICByZXNldEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uYWN0aXZhdGlvbkV2ZW50O1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAvLyBUb3VjaCBkZXZpY2VzIG1heSBmaXJlIGFkZGl0aW9uYWwgZXZlbnRzIGZvciB0aGUgc2FtZSBpbnRlcmFjdGlvbiB3aXRoaW4gYSBzaG9ydCB0aW1lLlxuICAgIC8vIFN0b3JlIHRoZSBwcmV2aW91cyBldmVudCB1bnRpbCBpdCdzIHNhZmUgdG8gYXNzdW1lIHRoYXQgc3Vic2VxdWVudCBldmVudHMgYXJlIGZvciBuZXcgaW50ZXJhY3Rpb25zLlxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsLCBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuVEFQX0RFTEFZX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZGVhY3RpdmF0ZV8oZSkge1xuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaW4gc2NlbmFyaW9zIHN1Y2ggYXMgd2hlbiB5b3UgaGF2ZSBhIGtleXVwIGV2ZW50IHRoYXQgYmx1cnMgdGhlIGVsZW1lbnQuXG4gICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZSA9IC8qKiBAdHlwZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovIChPYmplY3QuYXNzaWduKHt9LCBhY3RpdmF0aW9uU3RhdGUpKTtcblxuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMpIHtcbiAgICAgIGNvbnN0IGV2dE9iamVjdCA9IG51bGw7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhldnRPYmplY3QsIHN0YXRlKSk7XG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXy5oYXNEZWFjdGl2YXRpb25VWFJ1biA9IHRydWU7XG4gICAgICAgIHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwgc3RhdGUpO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50PX0gZXZlbnQgT3B0aW9uYWwgZXZlbnQgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGRlYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5kZWFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgKiBAcGFyYW0geyFBY3RpdmF0aW9uU3RhdGVUeXBlfSBvcHRpb25zXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhbmltYXRlRGVhY3RpdmF0aW9uXyhlLCB7d2FzQWN0aXZhdGVkQnlQb2ludGVyLCB3YXNFbGVtZW50TWFkZUFjdGl2ZX0pIHtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyIHx8IHdhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH1cbiAgfVxuXG4gIGxheW91dCgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXRGcmFtZV8pIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMubGF5b3V0RnJhbWVfKTtcbiAgICB9XG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBsYXlvdXRJbnRlcm5hbF8oKSB7XG4gICAgdGhpcy5mcmFtZV8gPSB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICBjb25zdCBtYXhEaW0gPSBNYXRoLm1heCh0aGlzLmZyYW1lXy5oZWlnaHQsIHRoaXMuZnJhbWVfLndpZHRoKTtcblxuICAgIC8vIFN1cmZhY2UgZGlhbWV0ZXIgaXMgdHJlYXRlZCBkaWZmZXJlbnRseSBmb3IgdW5ib3VuZGVkIHZzLiBib3VuZGVkIHJpcHBsZXMuXG4gICAgLy8gVW5ib3VuZGVkIHJpcHBsZSBkaWFtZXRlciBpcyBjYWxjdWxhdGVkIHNtYWxsZXIgc2luY2UgdGhlIHN1cmZhY2UgaXMgZXhwZWN0ZWQgdG8gYWxyZWFkeSBiZSBwYWRkZWQgYXBwcm9wcmlhdGVseVxuICAgIC8vIHRvIGV4dGVuZCB0aGUgaGl0Ym94LCBhbmQgdGhlIHJpcHBsZSBpcyBleHBlY3RlZCB0byBtZWV0IHRoZSBlZGdlcyBvZiB0aGUgcGFkZGVkIGhpdGJveCAod2hpY2ggaXMgdHlwaWNhbGx5XG4gICAgLy8gc3F1YXJlKS4gQm91bmRlZCByaXBwbGVzLCBvbiB0aGUgb3RoZXIgaGFuZCwgYXJlIGZ1bGx5IGV4cGVjdGVkIHRvIGV4cGFuZCBiZXlvbmQgdGhlIHN1cmZhY2UncyBsb25nZXN0IGRpYW1ldGVyXG4gICAgLy8gKGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGRpYWdvbmFsIHBsdXMgYSBjb25zdGFudCBwYWRkaW5nKSwgYW5kIGFyZSBjbGlwcGVkIGF0IHRoZSBzdXJmYWNlJ3MgYm9yZGVyIHZpYVxuICAgIC8vIGBvdmVyZmxvdzogaGlkZGVuYC5cbiAgICBjb25zdCBnZXRCb3VuZGVkUmFkaXVzID0gKCkgPT4ge1xuICAgICAgY29uc3QgaHlwb3RlbnVzZSA9IE1hdGguc3FydChNYXRoLnBvdyh0aGlzLmZyYW1lXy53aWR0aCwgMikgKyBNYXRoLnBvdyh0aGlzLmZyYW1lXy5oZWlnaHQsIDIpKTtcbiAgICAgIHJldHVybiBoeXBvdGVudXNlICsgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlBBRERJTkc7XG4gICAgfTtcblxuICAgIHRoaXMubWF4UmFkaXVzXyA9IHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSA/IG1heERpbSA6IGdldEJvdW5kZWRSYWRpdXMoKTtcblxuICAgIC8vIFJpcHBsZSBpcyBzaXplZCBhcyBhIGZyYWN0aW9uIG9mIHRoZSBsYXJnZXN0IGRpbWVuc2lvbiBvZiB0aGUgc3VyZmFjZSwgdGhlbiBzY2FsZXMgdXAgdXNpbmcgYSBDU1Mgc2NhbGUgdHJhbnNmb3JtXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSBtYXhEaW0gKiBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuSU5JVElBTF9PUklHSU5fU0NBTEU7XG4gICAgdGhpcy5mZ1NjYWxlXyA9IHRoaXMubWF4UmFkaXVzXyAvIHRoaXMuaW5pdGlhbFNpemVfO1xuXG4gICAgdGhpcy51cGRhdGVMYXlvdXRDc3NWYXJzXygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHVwZGF0ZUxheW91dENzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIFZBUl9GR19TSVpFLCBWQVJfTEVGVCwgVkFSX1RPUCwgVkFSX0ZHX1NDQUxFLFxuICAgIH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TSVpFLCBgJHt0aGlzLmluaXRpYWxTaXplX31weGApO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NDQUxFLCB0aGlzLmZnU2NhbGVfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgICAgbGVmdDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgICAgdG9wOiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0xFRlQsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy5sZWZ0fXB4YCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9UT1AsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy50b3B9cHhgKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB1bmJvdW5kZWQgKi9cbiAgc2V0VW5ib3VuZGVkKHVuYm91bmRlZCkge1xuICAgIGNvbnN0IHtVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmICh1bmJvdW5kZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZvY3VzKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG5cbiAgaGFuZGxlQmx1cigpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT5cbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVGb3VuZGF0aW9uO1xuIiwiaW1wb3J0IE1EQ1JpcHBsZUZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzJ1xyXG5pbXBvcnQge1xyXG4gIHN1cHBvcnRzQ3NzVmFyaWFibGVzLFxyXG4gIGdldE1hdGNoZXNQcm9wZXJ0eSxcclxuICBhcHBseVBhc3NpdmVcclxufSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL3V0aWwnXHJcblxyXG5leHBvcnQgY2xhc3MgUmlwcGxlQmFzZSBleHRlbmRzIE1EQ1JpcHBsZUZvdW5kYXRpb24ge1xyXG4gIHN0YXRpYyBnZXQgTUFUQ0hFUygpIHtcclxuICAgIC8qIGdsb2JhbCBIVE1MRWxlbWVudCAqL1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgUmlwcGxlQmFzZS5fbWF0Y2hlcyB8fFxyXG4gICAgICAoUmlwcGxlQmFzZS5fbWF0Y2hlcyA9IGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudC5wcm90b3R5cGUpKVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzU3VyZmFjZUFjdGl2ZShyZWYpIHtcclxuICAgIHJldHVybiByZWZbUmlwcGxlQmFzZS5NQVRDSEVTXSgnOmFjdGl2ZScpXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcih2bSwgb3B0aW9ucykge1xyXG4gICAgc3VwZXIoXHJcbiAgICAgIE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdm0uJGVsW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2bS5kaXNhYmxlZFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGFkZENsYXNzKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICB2bS4kc2V0KHZtLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgdm0uJGRlbGV0ZSh2bS5jbGFzc2VzLCBjbGFzc05hbWUpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY29udGFpbnNFdmVudFRhcmdldDogdGFyZ2V0ID0+IHZtLiRlbC5jb250YWlucyh0YXJnZXQpLFxyXG4gICAgICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICAgICAgdm0uJGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHZtLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAgIGV2dFR5cGUsXHJcbiAgICAgICAgICAgICAgaGFuZGxlcixcclxuICAgICAgICAgICAgICBhcHBseVBhc3NpdmUoKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcclxuICAgICAgICAgICAgICBoYW5kbGVyLFxyXG4gICAgICAgICAgICAgIGFwcGx5UGFzc2l2ZSgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB2bS4kc2V0KHZtLnN0eWxlcywgdmFyTmFtZSwgdmFsdWUpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdm0uJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4geyB4OiB3aW5kb3cucGFnZVhPZmZzZXQsIHk6IHdpbmRvdy5wYWdlWU9mZnNldCB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcHRpb25zXHJcbiAgICAgIClcclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSaXBwbGVNaXhpbiA9IHtcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2xhc3Nlczoge30sXHJcbiAgICAgIHN0eWxlczoge31cclxuICAgIH1cclxuICB9LFxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXHJcbiAgICB0aGlzLnJpcHBsZS5pbml0KClcclxuICB9LFxyXG4gIGJlZm9yZURlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KClcclxuICB9XHJcbn1cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxjdXN0b20tZWxlbWVudCBcclxuICAgIDp0YWc9XCJ0YWdcIiBcclxuICAgIDpjbGFzc2VzPVwiY2xhc3Nlc1wiXHJcbiAgICA6c3R5bGVzPVwic3R5bGVzXCIgXHJcbiAgICBjbGFzcz1cIm1kYy1yaXBwbGVcIj5cclxuICAgIDxzbG90IC8+XHJcbiAgPC9jdXN0b20tZWxlbWVudD5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IEN1c3RvbUVsZW1lbnRNaXhpbiB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCB7IFJpcHBsZU1peGluIH0gZnJvbSAnLi9tZGMtcmlwcGxlLWJhc2UnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1yaXBwbGUnLFxyXG4gIG1peGluczogW0N1c3RvbUVsZW1lbnRNaXhpbiwgUmlwcGxlTWl4aW5dLFxyXG4gIHByb3BzOiB7XHJcbiAgICB0YWc6IFN0cmluZ1xyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXZcclxuICAgIDpzdHlsZT1cInt3aWR0aDpmdWxsd2lkdGg/JzEwMCUnOnVuZGVmaW5lZH1cIlxyXG4gICAgOmlkPVwiaWRcIlxyXG4gICAgY2xhc3M9XCJtZGMtdGV4dGZpZWxkLXdyYXBwZXJcIj5cclxuXHJcbiAgICA8ZGl2XHJcbiAgICAgIHJlZj1cInJvb3RcIlxyXG4gICAgICA6Y2xhc3M9XCJyb290Q2xhc3Nlc1wiPlxyXG5cclxuICAgICAgPGlcclxuICAgICAgICB2LWlmPVwiISFoYXNMZWFkaW5nSWNvblwiXHJcbiAgICAgICAgcmVmPVwiaWNvblwiXHJcbiAgICAgICAgOmNsYXNzPVwiaGFzTGVhZGluZ0ljb24uY2xhc3Nlc1wiXHJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCJcclxuICAgICAgICBjbGFzcz1cIm1kYy10ZXh0LWZpZWxkX19pY29uXCI+XHJcbiAgICAgICAgPHNsb3QgbmFtZT1cImxlYWRpbmctaWNvblwiPnt7IGhhc0xlYWRpbmdJY29uLmNvbnRlbnQgfX08L3Nsb3Q+XHJcbiAgICAgIDwvaT5cclxuXHJcbiAgICAgIDwhLS0gd29ya2Fycm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy9yb2xsdXAtcGx1Z2luLXZ1ZS9pc3N1ZXMvMTc0IC0tPlxyXG4gICAgICA8IS0tIGVzbGludC1kaXNhYmxlIHZ1ZS9odG1sLXNlbGYtY2xvc2luZyAtLT5cclxuICAgICAgPHRleHRhcmVhXHJcbiAgICAgICAgdi1pZj1cIm11bHRpbGluZVwiXHJcbiAgICAgICAgcmVmPVwiaW5wdXRcIlxyXG4gICAgICAgIHYtYmluZD1cIiRhdHRyc1wiXHJcbiAgICAgICAgOmlkPVwidm1hX3VpZF9cIlxyXG4gICAgICAgIDpjbGFzcz1cImlucHV0Q2xhc3Nlc1wiXHJcbiAgICAgICAgOm1pbmxlbmd0aD1cIm1pbmxlbmd0aFwiXHJcbiAgICAgICAgOm1heGxlbmd0aD1cIm1heGxlbmd0aFwiXHJcbiAgICAgICAgOnBsYWNlaG9sZGVyPVwiaW5wdXRQbGFjZUhvbGRlclwiXHJcbiAgICAgICAgOmFyaWEtbGFiZWw9XCJpbnB1dFBsYWNlSG9sZGVyXCJcclxuICAgICAgICA6YXJpYS1jb250cm9scz1cImlucHV0QXJpYUNvbnRyb2xzXCJcclxuICAgICAgICA6cm93cz1cInJvd3NcIlxyXG4gICAgICAgIDpjb2xzPVwiY29sc1wiXHJcbiAgICAgICAgdi1vbj1cIiRsaXN0ZW5lcnNcIlxyXG4gICAgICAgIEBpbnB1dD1cInVwZGF0ZVZhbHVlKCRldmVudC50YXJnZXQudmFsdWUpXCJcclxuICAgICAgPjwvdGV4dGFyZWE+XHJcblxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICB2LWVsc2VcclxuICAgICAgICByZWY9XCJpbnB1dFwiXHJcbiAgICAgICAgdi1iaW5kPVwiJGF0dHJzXCJcclxuICAgICAgICA6aWQ9XCJ2bWFfdWlkX1wiXHJcbiAgICAgICAgOmNsYXNzPVwiaW5wdXRDbGFzc2VzXCJcclxuICAgICAgICA6dHlwZT1cInR5cGVcIlxyXG4gICAgICAgIDptaW5sZW5ndGg9XCJtaW5sZW5ndGhcIlxyXG4gICAgICAgIDptYXhsZW5ndGg9XCJtYXhsZW5ndGhcIlxyXG4gICAgICAgIDpwbGFjZWhvbGRlcj1cImlucHV0UGxhY2VIb2xkZXJcIlxyXG4gICAgICAgIDphcmlhLWxhYmVsPVwiaW5wdXRQbGFjZUhvbGRlclwiXHJcbiAgICAgICAgOmFyaWEtY29udHJvbHM9XCJpbnB1dEFyaWFDb250cm9sc1wiXHJcbiAgICAgICAgdi1vbj1cIiRsaXN0ZW5lcnNcIlxyXG4gICAgICAgIEBpbnB1dD1cInVwZGF0ZVZhbHVlKCRldmVudC50YXJnZXQudmFsdWUpXCJcclxuICAgICAgPlxyXG5cclxuICAgICAgPGxhYmVsXHJcbiAgICAgICAgdi1pZj1cImhhc0xhYmVsXCJcclxuICAgICAgICByZWY9XCJsYWJlbFwiXHJcbiAgICAgICAgOmNsYXNzPVwibGFiZWxDbGFzc2VzVXBncmFkZWRcIlxyXG4gICAgICAgIDpmb3I9XCJ2bWFfdWlkX1wiPlxyXG4gICAgICAgIHt7IGxhYmVsIH19XHJcbiAgICAgIDwvbGFiZWw+XHJcblxyXG4gICAgICA8aVxyXG4gICAgICAgIHYtaWY9XCIhIWhhc1RyYWlsaW5nSWNvblwiXHJcbiAgICAgICAgcmVmPVwiaWNvblwiXHJcbiAgICAgICAgOmNsYXNzPVwiaGFzVHJhaWxpbmdJY29uLmNsYXNzZXNcIlxyXG4gICAgICAgIHRhYmluZGV4PVwiMFwiXHJcbiAgICAgICAgY2xhc3M9XCJtZGMtdGV4dC1maWVsZF9faWNvblwiPlxyXG4gICAgICAgIDxzbG90IG5hbWU9XCJ0cmFpbGluZy1pY29uXCI+e3sgaGFzVHJhaWxpbmdJY29uLmNvbnRlbnQgfX08L3Nsb3Q+XHJcbiAgICAgIDwvaT5cclxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICB2LWlmPVwiaGFzT3V0bGluZVwiXHJcbiAgICAgICAgcmVmPVwib3V0bGluZVwiXHJcbiAgICAgICAgOmNsYXNzPVwib3V0bGluZUNsYXNzZXNcIlxyXG4gICAgICAgIGNsYXNzPVwibWRjLW5vdGNoZWQtb3V0bGluZVwiPlxyXG4gICAgICAgIDxzdmc+XHJcbiAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICA6ZD1cIm91dGxpbmVQYXRoQXR0clwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwibWRjLW5vdGNoZWQtb3V0bGluZV9fcGF0aFwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgdi1pZj1cImhhc091dGxpbmVcIlxyXG4gICAgICAgIHJlZj1cIm91dGxpbmVJZGxlXCJcclxuICAgICAgICBjbGFzcz1cIm1kYy1ub3RjaGVkLW91dGxpbmVfX2lkbGVcIi8+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICB2LWlmPVwiaGFzTGluZVJpcHBsZVwiXHJcbiAgICAgICAgcmVmPVwibGluZVJpcHBsZVwiXHJcbiAgICAgICAgOmNsYXNzPVwibGluZVJpcHBsZUNsYXNzZXNcIlxyXG4gICAgICAgIDpzdHlsZT1cImxpbmVSaXBwbGVTdHlsZXNcIi8+XHJcblxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPHBcclxuICAgICAgdi1pZj1cImhlbHB0ZXh0XCJcclxuICAgICAgcmVmPVwiaGVscFwiXHJcbiAgICAgIDppZD1cIidoZWxwLScrdm1hX3VpZF9cIlxyXG4gICAgICA6Y2xhc3M9XCJoZWxwQ2xhc3Nlc1wiXHJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICB7eyBoZWxwdGV4dCB9fVxyXG4gICAgPC9wPlxyXG5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBNRENUZXh0ZmllbGRGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC90ZXh0ZmllbGQvZm91bmRhdGlvbidcclxuaW1wb3J0IE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9saW5lLXJpcHBsZS9mb3VuZGF0aW9uJ1xyXG5pbXBvcnQgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3RleHRmaWVsZC9oZWxwZXItdGV4dC9mb3VuZGF0aW9uJ1xyXG5pbXBvcnQgTURDVGV4dEZpZWxkSWNvbkZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3RleHRmaWVsZC9pY29uL2ZvdW5kYXRpb24nXHJcbmltcG9ydCBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvZmxvYXRpbmctbGFiZWwvZm91bmRhdGlvbidcclxuaW1wb3J0IE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lL2ZvdW5kYXRpb24nXHJcblxyXG5pbXBvcnQge1xyXG4gIGV4dHJhY3RJY29uUHJvcCxcclxuICBEaXNwYXRjaEZvY3VzTWl4aW4sXHJcbiAgQ3VzdG9tRWxlbWVudE1peGluLFxyXG4gIFZNQVVuaXF1ZUlkTWl4aW4sXHJcbiAgYXBwbHlQYXNzaXZlXHJcbn0gZnJvbSAnLi4vYmFzZSdcclxuaW1wb3J0IHsgUmlwcGxlQmFzZSB9IGZyb20gJy4uL3JpcHBsZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLXRleHRmaWVsZCcsXHJcbiAgbWl4aW5zOiBbQ3VzdG9tRWxlbWVudE1peGluLCBEaXNwYXRjaEZvY3VzTWl4aW4sIFZNQVVuaXF1ZUlkTWl4aW5dLFxyXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXHJcbiAgbW9kZWw6IHtcclxuICAgIHByb3A6ICd2YWx1ZScsXHJcbiAgICBldmVudDogJ21vZGVsJ1xyXG4gIH0sXHJcbiAgcHJvcHM6IHtcclxuICAgIHZhbHVlOiBTdHJpbmcsXHJcbiAgICB0eXBlOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZGVmYXVsdDogJ3RleHQnLFxyXG4gICAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgJ3RleHQnLFxyXG4gICAgICAgICAgICAnZW1haWwnLFxyXG4gICAgICAgICAgICAnc2VhcmNoJyxcclxuICAgICAgICAgICAgJ3Bhc3N3b3JkJyxcclxuICAgICAgICAgICAgJ3RlbCcsXHJcbiAgICAgICAgICAgICd1cmwnLFxyXG4gICAgICAgICAgICAnbnVtYmVyJyxcclxuICAgICAgICAgICAgJ2RhdGUnXHJcbiAgICAgICAgICBdLmluZGV4T2YodmFsdWUpICE9PSAtMVxyXG4gICAgICAgIClcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlbnNlOiBCb29sZWFuLFxyXG4gICAgbGFiZWw6IFN0cmluZyxcclxuICAgIGhlbHB0ZXh0OiBTdHJpbmcsXHJcbiAgICBoZWxwdGV4dFBlcnNpc3RlbnQ6IEJvb2xlYW4sXHJcbiAgICBoZWxwdGV4dFZhbGlkYXRpb246IEJvb2xlYW4sXHJcbiAgICBib3g6IEJvb2xlYW4sXHJcbiAgICBvdXRsaW5lOiBCb29sZWFuLFxyXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXHJcbiAgICByZXF1aXJlZDogQm9vbGVhbixcclxuICAgIHZhbGlkOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IHVuZGVmaW5lZCB9LFxyXG4gICAgZnVsbHdpZHRoOiBCb29sZWFuLFxyXG4gICAgbXVsdGlsaW5lOiBCb29sZWFuLFxyXG4gICAgbGVhZGluZ0ljb246IFtTdHJpbmcsIEFycmF5LCBPYmplY3RdLFxyXG4gICAgdHJhaWxpbmdJY29uOiBbU3RyaW5nLCBBcnJheSwgT2JqZWN0XSxcclxuICAgIHNpemU6IHsgdHlwZTogW051bWJlciwgU3RyaW5nXSwgZGVmYXVsdDogMjAgfSxcclxuICAgIG1pbmxlbmd0aDogeyB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLCBkZWZhdWx0OiB1bmRlZmluZWQgfSxcclxuICAgIG1heGxlbmd0aDogeyB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLCBkZWZhdWx0OiB1bmRlZmluZWQgfSxcclxuICAgIHJvd3M6IHsgdHlwZTogW051bWJlciwgU3RyaW5nXSwgZGVmYXVsdDogOCB9LFxyXG4gICAgY29sczogeyB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLCBkZWZhdWx0OiA0MCB9LFxyXG4gICAgaWQ6IHsgdHlwZTogU3RyaW5nIH1cclxuICB9LFxyXG4gIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGV4dDogdGhpcy52YWx1ZSxcclxuICAgICAgcm9vdENsYXNzZXM6IHtcclxuICAgICAgICAnbWRjLXRleHRmaWVsZCc6IHRydWUsXHJcbiAgICAgICAgJ21kYy10ZXh0LWZpZWxkJzogdHJ1ZSxcclxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLXVwZ3JhZGVkJzogdHJ1ZSxcclxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLWRpc2FibGVkJzogdGhpcy5kaXNhYmxlZCxcclxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLWRlbnNlJzogdGhpcy5kZW5zZSxcclxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLWZ1bGx3aWR0aCc6IHRoaXMuZnVsbHdpZHRoLFxyXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC0tdGV4dGFyZWEnOiB0aGlzLm11bHRpbGluZSxcclxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLWJveCc6ICF0aGlzLmZ1bGx3aWR0aCAmJiB0aGlzLmJveCxcclxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLW91dGxpbmVkJzogIXRoaXMuZnVsbHdpZHRoICYmIHRoaXMub3V0bGluZVxyXG4gICAgICB9LFxyXG4gICAgICBpbnB1dENsYXNzZXM6IHtcclxuICAgICAgICAnbWRjLXRleHQtZmllbGRfX2lucHV0JzogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICBsYWJlbENsYXNzZXM6IHtcclxuICAgICAgICAnbWRjLWZsb2F0aW5nLWxhYmVsJzogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICBsaW5lUmlwcGxlQ2xhc3Nlczoge1xyXG4gICAgICAgICdtZGMtbGluZS1yaXBwbGUnOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIGxpbmVSaXBwbGVTdHlsZXM6IHt9LFxyXG4gICAgICBoZWxwQ2xhc3Nlczoge1xyXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC1oZWxwZXItdGV4dCc6IHRydWUsXHJcbiAgICAgICAgJ21kYy10ZXh0LWZpZWxkLWhlbHBlci10ZXh0LS1wZXJzaXN0ZW50JzogdGhpcy5oZWxwdGV4dFBlcnNpc3RlbnQsXHJcbiAgICAgICAgJ21kYy10ZXh0LWZpZWxkLWhlbHBlci10ZXh0LS12YWxpZGF0aW9uLW1zZyc6IHRoaXMuaGVscHRleHRWYWxpZGF0aW9uXHJcbiAgICAgIH0sXHJcbiAgICAgIG91dGxpbmVDbGFzc2VzOiB7fSxcclxuICAgICAgb3V0bGluZVBhdGhBdHRyOiB1bmRlZmluZWRcclxuICAgIH1cclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICBpbnB1dFBsYWNlSG9sZGVyKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5mdWxsd2lkdGggPyB0aGlzLmxhYmVsIDogdW5kZWZpbmVkXHJcbiAgICB9LFxyXG4gICAgaW5wdXRBcmlhQ29udHJvbHMoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmhlbHAgPyAnaGVscC0nICsgdGhpcy52bWFfdWlkXyA6IHVuZGVmaW5lZFxyXG4gICAgfSxcclxuICAgIGhhc0xhYmVsKCkge1xyXG4gICAgICByZXR1cm4gIXRoaXMuZnVsbHdpZHRoICYmIHRoaXMubGFiZWxcclxuICAgIH0sXHJcbiAgICBoYXNPdXRsaW5lKCkge1xyXG4gICAgICByZXR1cm4gIXRoaXMuZnVsbHdpZHRoICYmIHRoaXMub3V0bGluZVxyXG4gICAgfSxcclxuICAgIGhhc0xpbmVSaXBwbGUoKSB7XHJcbiAgICAgIHJldHVybiAhdGhpcy5oYXNPdXRsaW5lICYmICF0aGlzLm11bHRpbGluZVxyXG4gICAgfSxcclxuICAgIGhhc0xlYWRpbmdJY29uKCkge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgKHRoaXMubGVhZGluZ0ljb24gfHwgdGhpcy4kc2xvdHNbJ2xlYWRpbmctaWNvbiddKSAmJlxyXG4gICAgICAgICEodGhpcy50cmFpbGluZ0ljb24gfHwgdGhpcy4kc2xvdHNbJ3RyYWlsaW5nLWljb24nXSlcclxuICAgICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGVhZGluZ0ljb24gPyBleHRyYWN0SWNvblByb3AodGhpcy5sZWFkaW5nSWNvbikgOiB7fVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfSxcclxuICAgIGhhc1RyYWlsaW5nSWNvbigpIHtcclxuICAgICAgaWYgKHRoaXMudHJhaWxpbmdJY29uIHx8IHRoaXMuJHNsb3RzWyd0cmFpbGluZy1pY29uJ10pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFpbGluZ0ljb24gPyBleHRyYWN0SWNvblByb3AodGhpcy50cmFpbGluZ0ljb24pIDoge31cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH0sXHJcbiAgICBsYWJlbENsYXNzZXNVcGdyYWRlZCgpIHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24odGhpcy5sYWJlbENsYXNzZXMsIHtcclxuICAgICAgICAnbWRjLWZsb2F0aW5nLWxhYmVsLS1mbG9hdC1hYm92ZSc6IHRoaXMudmFsdWVcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG4gIHdhdGNoOiB7XHJcbiAgICBkaXNhYmxlZCgpIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5zZXREaXNhYmxlZCh0aGlzLmRpc2FibGVkKVxyXG4gICAgfSxcclxuICAgIHJlcXVpcmVkKCkge1xyXG4gICAgICB0aGlzLiRyZWZzLmlucHV0ICYmICh0aGlzLiRyZWZzLmlucHV0LnJlcXVpcmVkID0gdGhpcy5yZXF1aXJlZClcclxuICAgIH0sXHJcbiAgICB2YWxpZCgpIHtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnZhbGlkICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24uc2V0VmFsaWQodGhpcy52YWxpZClcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlbnNlKCkge1xyXG4gICAgICB0aGlzLiRzZXQodGhpcy5yb290Q2xhc3NlcywgJ21kYy10ZXh0LWZpZWxkLS1kZW5zZScsIHRoaXMuZGVuc2UpXHJcbiAgICB9LFxyXG4gICAgaGVscHRleHRQZXJzaXN0ZW50KCkge1xyXG4gICAgICB0aGlzLmhlbHBlclRleHRGb3VuZGF0aW9uICYmXHJcbiAgICAgICAgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbi5zZXRQZXJzaXN0ZW50KHRoaXMuaGVscHRleHRQZXJzaXN0ZW50KVxyXG4gICAgfSxcclxuICAgIGhlbHB0ZXh0VmFsaWRhdGlvbigpIHtcclxuICAgICAgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbiAmJlxyXG4gICAgICAgIHRoaXMuaGVscGVyVGV4dEZvdW5kYXRpb24uc2V0VmFsaWRhdGlvbih0aGlzLmhlbHB0ZXh0VmFsaWRhdGlvbilcclxuICAgIH0sXHJcbiAgICB2YWx1ZSh2YWx1ZSkge1xyXG4gICAgICBpZiAodGhpcy5mb3VuZGF0aW9uKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmZvdW5kYXRpb24uZ2V0VmFsdWUoKSkge1xyXG4gICAgICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldFZhbHVlKHZhbHVlKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbW91bnRlZCgpIHtcclxuICAgIGlmICh0aGlzLiRyZWZzLmxpbmVSaXBwbGUpIHtcclxuICAgICAgdGhpcy5saW5lUmlwcGxlRm91bmRhdGlvbiA9IG5ldyBNRENMaW5lUmlwcGxlRm91bmRhdGlvbih7XHJcbiAgICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRzZXQodGhpcy5saW5lUmlwcGxlQ2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRkZWxldGUodGhpcy5saW5lUmlwcGxlQ2xhc3NlcywgY2xhc3NOYW1lKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFzQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLmxpbmVSaXBwbGUuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldFN0eWxlOiAobmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHNldCh0aGlzLmxpbmVSaXBwbGVTdHlsZXMsIG5hbWUsIHZhbHVlKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVnaXN0ZXJFdmVudEhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLmxpbmVSaXBwbGUuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVyZWdpc3RlckV2ZW50SGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMubGluZVJpcHBsZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmxpbmVSaXBwbGVGb3VuZGF0aW9uLmluaXQoKVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLiRyZWZzLmhlbHApIHtcclxuICAgICAgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbiA9IG5ldyBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbih7XHJcbiAgICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRzZXQodGhpcy5oZWxwQ2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRkZWxldGUodGhpcy5oZWxwQ2xhc3NlcywgY2xhc3NOYW1lKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFzQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy4kcmVmcy5oZWxwLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRBdHRyOiAobmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMuaGVscC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmVBdHRyOiBuYW1lID0+IHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMuaGVscC5yZW1vdmVBdHRyaWJ1dGUobmFtZSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldENvbnRlbnQ6ICgvKmNvbnRlbnQqLykgPT4ge1xyXG4gICAgICAgICAgLy8gaGVscCB0ZXh0IGdldCdzIHVwZGF0ZWQgZnJvbSB7e2hlbHB0ZXh0fX1cclxuICAgICAgICAgIC8vIHRoaXMuJHJlZnMuaGVscC50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmhlbHBlclRleHRGb3VuZGF0aW9uLmluaXQoKVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLiRyZWZzLmljb24pIHtcclxuICAgICAgaWYgKHRoaXMuaGFzTGVhZGluZ0ljb24pIHtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5yb290Q2xhc3NlcywgJ21kYy10ZXh0LWZpZWxkLS13aXRoLWxlYWRpbmctaWNvbicsIHRydWUpXHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNUcmFpbGluZ0ljb24pIHtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5yb290Q2xhc3NlcywgJ21kYy10ZXh0LWZpZWxkLS13aXRoLXRyYWlsaW5nLWljb24nLCB0cnVlKVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmljb25Gb3VuZGF0aW9uID0gbmV3IE1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9uKHtcclxuICAgICAgICBzZXRBdHRyOiAoYXR0ciwgdmFsdWUpID0+IHRoaXMuJHJlZnMuaWNvbi5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpLFxyXG4gICAgICAgIGdldEF0dHI6IGF0dHIgPT4gdGhpcy4kcmVmcy5pY29uLmdldEF0dHJpYnV0ZShhdHRyKSxcclxuICAgICAgICByZW1vdmVBdHRyOiBhdHRyID0+IHRoaXMuJHJlZnMuaWNvbi5yZW1vdmVBdHRyaWJ1dGUoYXR0ciksXHJcbiAgICAgICAgc2V0Q29udGVudDogKC8qY29udGVudCovKSA9PiB7XHJcbiAgICAgICAgICAvLyBpY29uIHRleHQgZ2V0J3MgdXBkYXRlZCBmcm9tIHt7e3sgaGFzVHJhaWxpbmdJY29uLmNvbnRlbnQgfX19fVxyXG4gICAgICAgICAgLy8gdGhpcy4kcmVmcy5pY29uLnRleHRDb250ZW50ID0gY29udGVudDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kcmVmcy5pY29uLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcilcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLmljb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm90aWZ5SWNvbkFjdGlvbjogKCkgPT4gdGhpcy4kZW1pdCgnaWNvbi1hY3Rpb24nKVxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmljb25Gb3VuZGF0aW9uLmluaXQoKVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLiRyZWZzLmxhYmVsKSB7XHJcbiAgICAgIHRoaXMubGFiZWxGb3VuZGF0aW9uID0gbmV3IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uKHtcclxuICAgICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICAgIHRoaXMuJHNldCh0aGlzLmxhYmVsQ2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRkZWxldGUodGhpcy5sYWJlbENsYXNzZXMsIGNsYXNzTmFtZSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldFdpZHRoOiAoKSA9PiB0aGlzLiRyZWZzLmxhYmVsLm9mZnNldFdpZHRoLFxyXG4gICAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kcmVmcy5sYWJlbC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kcmVmcy5sYWJlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmxhYmVsRm91bmRhdGlvbi5pbml0KClcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy4kcmVmcy5vdXRsaW5lKSB7XHJcbiAgICAgIHRoaXMub3V0bGluZUZvdW5kYXRpb24gPSBuZXcgTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uKHtcclxuICAgICAgICBnZXRXaWR0aDogKCkgPT4gdGhpcy4kcmVmcy5vdXRsaW5lLm9mZnNldFdpZHRoLFxyXG4gICAgICAgIGdldEhlaWdodDogKCkgPT4gdGhpcy4kcmVmcy5vdXRsaW5lLm9mZnNldEhlaWdodCxcclxuICAgICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICAgIHRoaXMuJHNldCh0aGlzLm91dGxpbmVDbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLm91dGxpbmVDbGFzc2VzLCBjbGFzc05hbWUpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRPdXRsaW5lUGF0aEF0dHI6IHZhbHVlID0+IHtcclxuICAgICAgICAgIHRoaXMub3V0bGluZVBhdGhBdHRyID0gdmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZTogcHJvcGVydHlOYW1lID0+IHtcclxuICAgICAgICAgIGNvbnN0IGlkbGVPdXRsaW5lRWxlbWVudCA9IHRoaXMuJHJlZnMub3V0bGluZUlkbGVcclxuICAgICAgICAgIGlmIChpZGxlT3V0bGluZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvd1xyXG4gICAgICAgICAgICAgIC5nZXRDb21wdXRlZFN0eWxlKGlkbGVPdXRsaW5lRWxlbWVudClcclxuICAgICAgICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eU5hbWUpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLm91dGxpbmVGb3VuZGF0aW9uLmluaXQoKVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENUZXh0ZmllbGRGb3VuZGF0aW9uKFxyXG4gICAgICB7XHJcbiAgICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRzZXQodGhpcy5yb290Q2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRkZWxldGUodGhpcy5yb290Q2xhc3NlcywgY2xhc3NOYW1lKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFzQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLnJvb3QuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kcmVmcy5yb290LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcilcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLnJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNGb2N1c2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy4kcmVmcy5pbnB1dFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNSdGw6ICgpID0+XHJcbiAgICAgICAgICB3aW5kb3dcclxuICAgICAgICAgICAgLmdldENvbXB1dGVkU3R5bGUodGhpcy4kcmVmcy5yb290KVxyXG4gICAgICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgnZGlyZWN0aW9uJykgPT09ICdydGwnLFxyXG4gICAgICAgIGRlYWN0aXZhdGVMaW5lUmlwcGxlOiAoKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5saW5lUmlwcGxlRm91bmRhdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVSaXBwbGVGb3VuZGF0aW9uLmRlYWN0aXZhdGUoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWN0aXZhdGVMaW5lUmlwcGxlOiAoKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5saW5lUmlwcGxlRm91bmRhdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVSaXBwbGVGb3VuZGF0aW9uLmFjdGl2YXRlKClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldExpbmVSaXBwbGVUcmFuc2Zvcm1PcmlnaW46IG5vcm1hbGl6ZWRYID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLmxpbmVSaXBwbGVGb3VuZGF0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGluZVJpcHBsZUZvdW5kYXRpb24uc2V0UmlwcGxlQ2VudGVyKG5vcm1hbGl6ZWRYKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZ2V0QXR0cmlidXRlc0xpc3QgPSBtdXRhdGlvbnNMaXN0ID0+XHJcbiAgICAgICAgICAgIG11dGF0aW9uc0xpc3QubWFwKG11dGF0aW9uID0+IG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUpXHJcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uc0xpc3QgPT5cclxuICAgICAgICAgICAgaGFuZGxlcihnZXRBdHRyaWJ1dGVzTGlzdChtdXRhdGlvbnNMaXN0KSlcclxuICAgICAgICAgIClcclxuICAgICAgICAgIGNvbnN0IHRhcmdldE5vZGUgPSB0aGlzLiRyZWZzLmlucHV0XHJcbiAgICAgICAgICBjb25zdCBjb25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUgfVxyXG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXROb2RlLCBjb25maWcpXHJcbiAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcjogb2JzZXJ2ZXIgPT4ge1xyXG4gICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaGFrZUxhYmVsOiBzaG91bGRTaGFrZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxhYmVsRm91bmRhdGlvbi5zaGFrZShzaG91bGRTaGFrZSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZsb2F0TGFiZWw6IHNob3VsZEZsb2F0ID0+IHtcclxuICAgICAgICAgIHRoaXMubGFiZWxGb3VuZGF0aW9uLmZsb2F0KHNob3VsZEZsb2F0KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFzTGFiZWw6ICgpID0+IHtcclxuICAgICAgICAgIHJldHVybiAhIXRoaXMuJHJlZnMubGFiZWxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldExhYmVsV2lkdGg6ICgpID0+IHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmxhYmVsRm91bmRhdGlvbi5nZXRXaWR0aCgpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXROYXRpdmVJbnB1dDogKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuJHJlZnMuaW5wdXRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhhc091dGxpbmU6ICgpID0+ICEhdGhpcy5oYXNPdXRsaW5lLFxyXG4gICAgICAgIG5vdGNoT3V0bGluZTogKG5vdGNoV2lkdGgsIGlzUnRsKSA9PlxyXG4gICAgICAgICAgdGhpcy5vdXRsaW5lRm91bmRhdGlvbi5ub3RjaChub3RjaFdpZHRoLCBpc1J0bCksXHJcbiAgICAgICAgY2xvc2VPdXRsaW5lOiAoKSA9PiB0aGlzLm91dGxpbmVGb3VuZGF0aW9uLmNsb3NlTm90Y2goKVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaGVscGVyVGV4dDogdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbixcclxuICAgICAgICBpY29uOiB0aGlzLmljb25Gb3VuZGF0aW9uXHJcbiAgICAgIH1cclxuICAgIClcclxuXHJcbiAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXHJcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0VmFsdWUodGhpcy52YWx1ZSlcclxuICAgIHRoaXMuZm91bmRhdGlvbi5zZXREaXNhYmxlZCh0aGlzLmRpc2FibGVkKVxyXG4gICAgdGhpcy4kcmVmcy5pbnB1dCAmJiAodGhpcy4kcmVmcy5pbnB1dC5yZXF1aXJlZCA9IHRoaXMucmVxdWlyZWQpXHJcbiAgICBpZiAodHlwZW9mIHRoaXMudmFsaWQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRWYWxpZCh0aGlzLnZhbGlkKVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRleHRib3gpIHtcclxuICAgICAgdGhpcy5yaXBwbGUgPSBuZXcgUmlwcGxlQmFzZSh0aGlzKVxyXG4gICAgICB0aGlzLnJpcHBsZS5pbml0KClcclxuICAgIH1cclxuICB9LFxyXG4gIGJlZm9yZURlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gICAgdGhpcy5saW5lUmlwcGxlRm91bmRhdGlvbiAmJiB0aGlzLmxpbmVSaXBwbGVGb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gICAgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbiAmJiB0aGlzLmhlbHBlclRleHRGb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gICAgdGhpcy5pY29uRm91bmRhdGlvbiAmJiB0aGlzLmljb25Gb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gICAgdGhpcy5sYWJlbEZvdW5kYXRpb24gJiYgdGhpcy5sYWJlbEZvdW5kYXRpb24uZGVzdHJveSgpXHJcbiAgICB0aGlzLm91dGxpbmVGb3VuZGF0aW9uICYmIHRoaXMub3V0bGluZUZvdW5kYXRpb24uZGVzdHJveSgpXHJcbiAgICB0aGlzLnJpcHBsZSAmJiB0aGlzLnJpcHBsZS5kZXN0cm95KClcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIHVwZGF0ZVZhbHVlKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuJGVtaXQoJ21vZGVsJywgdmFsdWUpXHJcbiAgICB9LFxyXG4gICAgZm9jdXMoKSB7XHJcbiAgICAgIHRoaXMuJHJlZnMuaW5wdXQgJiYgdGhpcy4kcmVmcy5pbnB1dC5mb2N1cygpXHJcbiAgICB9LFxyXG4gICAgYmx1cigpIHtcclxuICAgICAgdGhpcy4kcmVmcy5pbnB1dCAmJiB0aGlzLiRyZWZzLmlucHV0LmJsdXIoKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiaW1wb3J0IHsgQmFzZVBsdWdpbiB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCBtZGNUZXh0RmllbGQgZnJvbSAnLi9tZGMtdGV4dGZpZWxkLnZ1ZSdcclxuXHJcbmV4cG9ydCB7IG1kY1RleHRGaWVsZCB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcclxuICBtZGNUZXh0RmllbGRcclxufSlcclxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xyXG5pbXBvcnQgeyBhdXRvSW5pdCB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcclxuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXHJcblxyXG5hdXRvSW5pdChwbHVnaW4pXHJcbiJdLCJuYW1lcyI6WyJzdXBwb3J0c1Bhc3NpdmVfIiwiYXBwbHlQYXNzaXZlIiwiZ2xvYmFsT2JqIiwid2luZG93IiwiZm9yY2VSZWZyZXNoIiwidW5kZWZpbmVkIiwiaXNTdXBwb3J0ZWQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwiZSIsImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJrZXkiLCJjb21wb25lbnQiLCJ2bSIsIm5hbWUiLCJDdXN0b21FbGVtZW50IiwiZnVuY3Rpb25hbCIsInJlbmRlciIsImNyZWF0ZUVsZW1lbnQiLCJjb250ZXh0IiwicHJvcHMiLCJpcyIsInRhZyIsImRhdGEiLCJjaGlsZHJlbiIsIkN1c3RvbUVsZW1lbnRNaXhpbiIsImV4dHJhY3RJY29uUHJvcCIsImljb25Qcm9wIiwiY2xhc3NlcyIsImNvbnRlbnQiLCJBcnJheSIsInJlZHVjZSIsInJlc3VsdCIsInZhbHVlIiwiYmFiZWxIZWxwZXJzLmV4dGVuZHMiLCJjbGFzc05hbWUiLCJzcGxpdCIsInRleHRDb250ZW50IiwiRGlzcGF0Y2hGb2N1c01peGluIiwiaGFzRm9jdXMiLCJtZXRob2RzIiwib25Nb3VzZURvd24iLCJfYWN0aXZlIiwib25Nb3VzZVVwIiwib25Gb2N1c0V2ZW50Iiwic2V0VGltZW91dCIsImRpc3BhdGNoRm9jdXNFdmVudCIsIm9uQmx1ckV2ZW50IiwiJGVsIiwiYWN0aXZlRWxlbWVudCIsImNvbnRhaW5zIiwiJGVtaXQiLCJtb3VudGVkIiwiYmVmb3JlRGVzdHJveSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzY29wZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwiVk1BVW5pcXVlSWRNaXhpbiIsImJlZm9yZUNyZWF0ZSIsInZtYV91aWRfIiwiX3VpZCIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJNRENUZXh0RmllbGRIZWxwZXJUZXh0QWRhcHRlciIsImF0dHIiLCJzdHJpbmdzIiwiQVJJQV9ISURERU4iLCJST0xFIiwiY3NzQ2xhc3NlcyIsIkhFTFBFUl9URVhUX1BFUlNJU1RFTlQiLCJIRUxQRVJfVEVYVF9WQUxJREFUSU9OX01TRyIsIk1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwic2V0QXR0ciIsInJlbW92ZUF0dHIiLCJzZXRDb250ZW50IiwiZGVmYXVsdEFkYXB0ZXIiLCJpc1BlcnNpc3RlbnQiLCJpc1ZhbGlkYXRpb24iLCJpbnB1dElzVmFsaWQiLCJoZWxwZXJUZXh0SXNQZXJzaXN0ZW50IiwiaGVscGVyVGV4dElzVmFsaWRhdGlvbk1zZyIsInZhbGlkYXRpb25Nc2dOZWVkc0Rpc3BsYXkiLCJoaWRlXyIsIk1EQ1RleHRGaWVsZEljb25BZGFwdGVyIiwiZXZ0VHlwZSIsImhhbmRsZXIiLCJJQ09OX0VWRU5UIiwiSUNPTl9ST0xFIiwiTURDVGV4dEZpZWxkSWNvbkZvdW5kYXRpb24iLCJnZXRBdHRyIiwicmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwibm90aWZ5SWNvbkFjdGlvbiIsInNhdmVkVGFiSW5kZXhfIiwiaW50ZXJhY3Rpb25IYW5kbGVyXyIsImV2dCIsImhhbmRsZUludGVyYWN0aW9uIiwiZm9yRWFjaCIsImRpc2FibGVkIiwibGFiZWwiLCJ0eXBlIiwia2V5Q29kZSIsIk1EQ1RleHRGaWVsZEFkYXB0ZXIiLCJvYnNlcnZlciIsIm5vcm1hbGl6ZWRYIiwic2hvdWxkU2hha2UiLCJzaG91bGRGbG9hdCIsImxhYmVsV2lkdGgiLCJpc1J0bCIsIkFSSUFfQ09OVFJPTFMiLCJJTlBVVF9TRUxFQ1RPUiIsIkxBQkVMX1NFTEVDVE9SIiwiSUNPTl9TRUxFQ1RPUiIsIk9VVExJTkVfU0VMRUNUT1IiLCJMSU5FX1JJUFBMRV9TRUxFQ1RPUiIsIlJPT1QiLCJVUEdSQURFRCIsIkRJU0FCTEVEIiwiREVOU0UiLCJGT0NVU0VEIiwiSU5WQUxJRCIsIkJPWCIsIk9VVExJTkVEIiwibnVtYmVycyIsIkxBQkVMX1NDQUxFIiwiREVOU0VfTEFCRUxfU0NBTEUiLCJWQUxJREFUSU9OX0FUVFJfV0hJVEVMSVNUIiwiTURDVGV4dEZpZWxkRm91bmRhdGlvbiIsImlzVmFsaWQiLCJpc0ZvY3VzZWRfIiwiZ2V0VmFsdWUiLCJpc0JhZElucHV0XyIsInJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyIiwiZGVyZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyIiwiZ2V0TmF0aXZlSW5wdXQiLCJpc0ZvY3VzZWQiLCJhY3RpdmF0ZUxpbmVSaXBwbGUiLCJkZWFjdGl2YXRlTGluZVJpcHBsZSIsInNldExpbmVSaXBwbGVUcmFuc2Zvcm1PcmlnaW4iLCJzaGFrZUxhYmVsIiwiZmxvYXRMYWJlbCIsImhhc0xhYmVsIiwiZ2V0TGFiZWxXaWR0aCIsImhhc091dGxpbmUiLCJub3RjaE91dGxpbmUiLCJjbG9zZU91dGxpbmUiLCJmb3VuZGF0aW9uTWFwIiwiaGVscGVyVGV4dF8iLCJoZWxwZXJUZXh0IiwiaWNvbl8iLCJpY29uIiwicmVjZWl2ZWRVc2VySW5wdXRfIiwidXNlQ3VzdG9tVmFsaWRpdHlDaGVja2luZ18iLCJpc1ZhbGlkXyIsImlucHV0Rm9jdXNIYW5kbGVyXyIsImFjdGl2YXRlRm9jdXMiLCJpbnB1dEJsdXJIYW5kbGVyXyIsImRlYWN0aXZhdGVGb2N1cyIsImlucHV0SW5wdXRIYW5kbGVyXyIsImF1dG9Db21wbGV0ZUZvY3VzIiwic2V0UG9pbnRlclhPZmZzZXRfIiwic2V0VHJhbnNmb3JtT3JpZ2luIiwidGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyXyIsImhhbmRsZVRleHRGaWVsZEludGVyYWN0aW9uIiwidmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXJfIiwiYXR0cmlidXRlc0xpc3QiLCJoYW5kbGVWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlIiwidmFsaWRhdGlvbk9ic2VydmVyXyIsInNvbWUiLCJhdHRyaWJ1dGVOYW1lIiwiaW5kZXhPZiIsInN0eWxlVmFsaWRpdHlfIiwib3Blbk5vdGNoIiwiaXNEZW5zZSIsImxhYmVsU2NhbGUiLCJzdHlsZUZvY3VzZWRfIiwic2hvd1RvU2NyZWVuUmVhZGVyIiwidGFyZ2V0Q2xpZW50UmVjdCIsInRhcmdldCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImV2dENvb3JkcyIsIngiLCJjbGllbnRYIiwieSIsImNsaWVudFkiLCJsZWZ0IiwiaW5wdXQiLCJnZXROYXRpdmVJbnB1dF8iLCJzaG91bGRSZW1vdmVMYWJlbEZsb2F0IiwiaXNOYXRpdmVJbnB1dFZhbGlkXyIsInN0eWxlRGlzYWJsZWRfIiwic2V0QXJpYUxhYmVsIiwidmFsaWRpdHkiLCJiYWRJbnB1dCIsInZhbGlkIiwic2V0VmFsaWRpdHkiLCJpc0Rpc2FibGVkIiwic2V0RGlzYWJsZWQiLCJNRENMaW5lUmlwcGxlQWRhcHRlciIsInByb3BlcnR5TmFtZSIsIkxJTkVfUklQUExFX0FDVElWRSIsIkxJTkVfUklQUExFX0RFQUNUSVZBVElORyIsIk1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uIiwic2V0U3R5bGUiLCJyZWdpc3RlckV2ZW50SGFuZGxlciIsImRlcmVnaXN0ZXJFdmVudEhhbmRsZXIiLCJ0cmFuc2l0aW9uRW5kSGFuZGxlcl8iLCJoYW5kbGVUcmFuc2l0aW9uRW5kIiwieENvb3JkaW5hdGUiLCJpc0RlYWN0aXZhdGluZyIsIk1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyIiwiTEFCRUxfRkxPQVRfQUJPVkUiLCJMQUJFTF9TSEFLRSIsIk1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uIiwiZ2V0V2lkdGgiLCJzaGFrZUFuaW1hdGlvbkVuZEhhbmRsZXJfIiwiaGFuZGxlU2hha2VBbmltYXRpb25FbmRfIiwiTURDTm90Y2hlZE91dGxpbmVBZGFwdGVyIiwiUEFUSF9TRUxFQ1RPUiIsIklETEVfT1VUTElORV9TRUxFQ1RPUiIsIk9VVExJTkVfTk9UQ0hFRCIsIk1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiIsImdldEhlaWdodCIsInNldE91dGxpbmVQYXRoQXR0ciIsImdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZSIsIm5vdGNoV2lkdGgiLCJ1cGRhdGVTdmdQYXRoXyIsInJhZGl1c1N0eWxlVmFsdWUiLCJyYWRpdXMiLCJwYXJzZUZsb2F0Iiwid2lkdGgiLCJoZWlnaHQiLCJjb3JuZXJXaWR0aCIsImxlYWRpbmdTdHJva2VMZW5ndGgiLCJhYnMiLCJwYWRkZWROb3RjaFdpZHRoIiwicGF0aE1pZGRsZSIsInBhdGgiLCJNRENSaXBwbGVBZGFwdGVyIiwidmFyTmFtZSIsIlVOQk9VTkRFRCIsIkJHX0ZPQ1VTRUQiLCJGR19BQ1RJVkFUSU9OIiwiRkdfREVBQ1RJVkFUSU9OIiwiVkFSX0xFRlQiLCJWQVJfVE9QIiwiVkFSX0ZHX1NJWkUiLCJWQVJfRkdfU0NBTEUiLCJWQVJfRkdfVFJBTlNMQVRFX1NUQVJUIiwiVkFSX0ZHX1RSQU5TTEFURV9FTkQiLCJQQURESU5HIiwiSU5JVElBTF9PUklHSU5fU0NBTEUiLCJERUFDVElWQVRJT05fVElNRU9VVF9NUyIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsImRldGVjdEVkZ2VQc2V1ZG9WYXJCdWciLCJ3aW5kb3dPYmoiLCJub2RlIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY29tcHV0ZWRTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJoYXNQc2V1ZG9WYXJCdWciLCJib3JkZXJUb3BTdHlsZSIsInJlbW92ZSIsInN1cHBvcnRzQ3NzVmFyaWFibGVzIiwic3VwcG9ydHNGdW5jdGlvblByZXNlbnQiLCJDU1MiLCJzdXBwb3J0cyIsImV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMiLCJ3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMiLCJnZXRNYXRjaGVzUHJvcGVydHkiLCJIVE1MRWxlbWVudFByb3RvdHlwZSIsImZpbHRlciIsInAiLCJwb3AiLCJnZXROb3JtYWxpemVkRXZlbnRDb29yZHMiLCJldiIsInBhZ2VPZmZzZXQiLCJjbGllbnRSZWN0IiwiZG9jdW1lbnRYIiwiZG9jdW1lbnRZIiwidG9wIiwibm9ybWFsaXplZFkiLCJjaGFuZ2VkVG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJhY3RpdmF0ZWRUYXJnZXRzIiwiTURDUmlwcGxlRm91bmRhdGlvbiIsImJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMiLCJpc1VuYm91bmRlZCIsImlzU3VyZmFjZUFjdGl2ZSIsImlzU3VyZmFjZURpc2FibGVkIiwiY29udGFpbnNFdmVudFRhcmdldCIsInJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJkZXJlZ2lzdGVyUmVzaXplSGFuZGxlciIsInVwZGF0ZUNzc1ZhcmlhYmxlIiwiY29tcHV0ZUJvdW5kaW5nUmVjdCIsImdldFdpbmRvd1BhZ2VPZmZzZXQiLCJsYXlvdXRGcmFtZV8iLCJmcmFtZV8iLCJhY3RpdmF0aW9uU3RhdGVfIiwiZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8iLCJpbml0aWFsU2l6ZV8iLCJtYXhSYWRpdXNfIiwiYWN0aXZhdGVIYW5kbGVyXyIsImFjdGl2YXRlXyIsImRlYWN0aXZhdGVIYW5kbGVyXyIsImRlYWN0aXZhdGVfIiwiZm9jdXNIYW5kbGVyXyIsImhhbmRsZUZvY3VzIiwiYmx1ckhhbmRsZXJfIiwiaGFuZGxlQmx1ciIsInJlc2l6ZUhhbmRsZXJfIiwibGF5b3V0IiwidW5ib3VuZGVkQ29vcmRzXyIsImZnU2NhbGVfIiwiYWN0aXZhdGlvblRpbWVyXyIsImZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyIsImFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8iLCJhY3RpdmF0aW9uVGltZXJDYWxsYmFja18iLCJydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8iLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudF8iLCJpc0FjdGl2YXRlZCIsImhhc0RlYWN0aXZhdGlvblVYUnVuIiwid2FzQWN0aXZhdGVkQnlQb2ludGVyIiwid2FzRWxlbWVudE1hZGVBY3RpdmUiLCJhY3RpdmF0aW9uRXZlbnQiLCJpc1Byb2dyYW1tYXRpYyIsImlzU3VwcG9ydGVkXyIsInJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImxheW91dEludGVybmFsXyIsImNsZWFyVGltZW91dCIsImRlcmVnaXN0ZXJSb290SGFuZGxlcnNfIiwiZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsInJlbW92ZUNzc1ZhcnNfIiwiT2JqZWN0Iiwia2V5cyIsImsiLCJhY3RpdmF0aW9uU3RhdGUiLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudCIsImlzU2FtZUludGVyYWN0aW9uIiwiaGFzQWN0aXZhdGVkQ2hpbGQiLCJsZW5ndGgiLCJyZXNldEFjdGl2YXRpb25TdGF0ZV8iLCJwdXNoIiwicmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJjaGVja0VsZW1lbnRNYWRlQWN0aXZlXyIsImFuaW1hdGVBY3RpdmF0aW9uXyIsImV2ZW50IiwidHJhbnNsYXRlU3RhcnQiLCJ0cmFuc2xhdGVFbmQiLCJnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfIiwic3RhcnRQb2ludCIsImVuZFBvaW50Iiwicm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfIiwiYWN0aXZhdGlvbkhhc0VuZGVkIiwic3RhdGUiLCJldnRPYmplY3QiLCJhbmltYXRlRGVhY3RpdmF0aW9uXyIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibWF4RGltIiwibWF4IiwiZ2V0Qm91bmRlZFJhZGl1cyIsImh5cG90ZW51c2UiLCJzcXJ0IiwicG93IiwidXBkYXRlTGF5b3V0Q3NzVmFyc18iLCJyb3VuZCIsInVuYm91bmRlZCIsIlJpcHBsZUJhc2UiLCJyZWYiLCJNQVRDSEVTIiwiX21hdGNoZXMiLCJIVE1MRWxlbWVudCIsInByb3RvdHlwZSIsIm9wdGlvbnMiLCIkc2V0IiwiJGRlbGV0ZSIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlcyIsInBhZ2VYT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJSaXBwbGVNaXhpbiIsInJpcHBsZSIsImluaXQiLCJkZXN0cm95IiwibWRjVGV4dEZpZWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsSUFBSUEseUJBQUo7O0lBRUE7Ozs7OztBQU1BLElBQU8sU0FBU0MsWUFBVCxHQUFnRTtJQUFBLE1BQTFDQyxTQUEwQyx1RUFBOUJDLE1BQThCO0lBQUEsTUFBdEJDLFlBQXNCLHVFQUFQLEtBQU87O0lBQ3JFLE1BQUlKLHFCQUFxQkssU0FBckIsSUFBa0NELFlBQXRDLEVBQW9EO0lBQ2xELFFBQUlFLGNBQWMsS0FBbEI7SUFDQSxRQUFJO0lBQ0ZKLGdCQUFVSyxRQUFWLENBQW1CQyxnQkFBbkIsQ0FBb0MsTUFBcEMsRUFBNEMsSUFBNUMsRUFBa0Q7SUFDaEQsWUFBSUMsT0FBSixHQUFjO0lBQ1pILHdCQUFjLEVBQUVHLFNBQVMsSUFBWCxFQUFkO0lBQ0Q7SUFIK0MsT0FBbEQ7SUFLRCxLQU5ELENBTUUsT0FBT0MsQ0FBUCxFQUFVO0lBQ1Y7SUFDRDs7SUFFRFYsdUJBQW1CTSxXQUFuQjtJQUNEOztJQUVELFNBQU9OLGdCQUFQO0lBQ0Q7O0lDekJNLFNBQVNXLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCO0lBQy9CO0lBQ0EsTUFBSUMsT0FBTyxJQUFYO0lBQ0EsTUFBSSxPQUFPVixNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0lBQ2pDVSxXQUFPVixPQUFPVyxHQUFkO0lBQ0QsR0FGRCxNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztJQUN4QztJQUNBRixXQUFPRSxPQUFPRCxHQUFkO0lBQ0Q7SUFDRCxNQUFJRCxJQUFKLEVBQVU7SUFDUkEsU0FBS0csR0FBTCxDQUFTSixNQUFUO0lBQ0Q7SUFDRjs7SUNaTSxTQUFTSyxVQUFULENBQW9CQyxVQUFwQixFQUFnQztJQUNyQyxTQUFPO0lBQ0xDLGFBQVMsUUFE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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN3SFo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FBQTs7O0lBeEhZLCtCQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRVosaUJBQWU1WSxXQUFXO0lBQ3hCNlk7SUFEd0IsQ0FBWCxDQUFmOztJQ0FBblosU0FBU0MsTUFBVDs7Ozs7Ozs7In0=
