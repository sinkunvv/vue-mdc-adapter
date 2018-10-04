/**
* @module vue-mdc-adapterdialog 0.18.2
* @exports VueMDCDialog
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCDialog = factory());
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
      ROOT: 'mdc-dialog',
      OPEN: 'mdc-dialog--open',
      ANIMATING: 'mdc-dialog--animating',
      BACKDROP: 'mdc-dialog__backdrop',
      SCROLL_LOCK: 'mdc-dialog-scroll-lock',
      ACCEPT_BTN: 'mdc-dialog__footer__button--accept',
      CANCEL_BTN: 'mdc-dialog__footer__button--cancel'
    };

    var strings = {
      OPEN_DIALOG_SELECTOR: '.mdc-dialog--open',
      DIALOG_SURFACE_SELECTOR: '.mdc-dialog__surface',
      ACCEPT_SELECTOR: '.mdc-dialog__footer__button--accept',
      ACCEPT_EVENT: 'MDCDialog:accept',
      CANCEL_EVENT: 'MDCDialog:cancel'
    };

    var numbers = {
      DIALOG_ANIMATION_TIME_MS: 120
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

    var MDCDialogFoundation = function (_MDCFoundation) {
      inherits(MDCDialogFoundation, _MDCFoundation);
      createClass(MDCDialogFoundation, null, [{
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
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            addBodyClass: function addBodyClass() /* className: string */{},
            removeBodyClass: function removeBodyClass() /* className: string */{},
            eventTargetHasClass: function eventTargetHasClass() {
              return (/* target: EventTarget, className: string */ /* boolean */false
              );
            },
            registerInteractionHandler: function registerInteractionHandler() /* evt: string, handler: EventListener */{},
            deregisterInteractionHandler: function deregisterInteractionHandler() /* evt: string, handler: EventListener */{},
            registerSurfaceInteractionHandler: function registerSurfaceInteractionHandler() /* evt: string, handler: EventListener */{},
            deregisterSurfaceInteractionHandler: function deregisterSurfaceInteractionHandler() /* evt: string, handler: EventListener */{},
            registerDocumentKeydownHandler: function registerDocumentKeydownHandler() /* handler: EventListener */{},
            deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler() /* handler: EventListener */{},
            notifyAccept: function notifyAccept() {},
            notifyCancel: function notifyCancel() {},
            trapFocusOnSurface: function trapFocusOnSurface() {},
            untrapFocusOnSurface: function untrapFocusOnSurface() {},
            isDialog: function isDialog() {
              return (/* el: Element */ /* boolean */false
              );
            }
          };
        }
      }]);

      function MDCDialogFoundation(adapter) {
        classCallCheck(this, MDCDialogFoundation);

        var _this = possibleConstructorReturn(this, (MDCDialogFoundation.__proto__ || Object.getPrototypeOf(MDCDialogFoundation)).call(this, _extends(MDCDialogFoundation.defaultAdapter, adapter)));

        _this.isOpen_ = false;
        _this.componentClickHandler_ = function (evt) {
          if (_this.adapter_.eventTargetHasClass(evt.target, cssClasses.BACKDROP)) {
            _this.cancel(true);
          }
        };
        _this.dialogClickHandler_ = function (evt) {
          return _this.handleDialogClick_(evt);
        };
        _this.documentKeydownHandler_ = function (evt) {
          if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
            _this.cancel(true);
          }
        };

        _this.timerId_ = 0;
        _this.animationTimerEnd_ = function (evt) {
          return _this.handleAnimationTimerEnd_(evt);
        };
        return _this;
      }

      createClass(MDCDialogFoundation, [{
        key: 'destroy',
        value: function destroy() {
          // Ensure that dialog is cleaned up when destroyed
          if (this.isOpen_) {
            this.close();
          }
          // Final cleanup of animating class in case the timer has not completed.
          this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
          clearTimeout(this.timerId_);
        }
      }, {
        key: 'open',
        value: function open() {
          this.isOpen_ = true;
          this.disableScroll_();
          this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
          this.adapter_.registerSurfaceInteractionHandler('click', this.dialogClickHandler_);
          this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
          clearTimeout(this.timerId_);
          this.timerId_ = setTimeout(this.animationTimerEnd_, MDCDialogFoundation.numbers.DIALOG_ANIMATION_TIME_MS);
          this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
          this.adapter_.addClass(MDCDialogFoundation.cssClasses.OPEN);
        }
      }, {
        key: 'close',
        value: function close() {
          this.isOpen_ = false;
          this.enableScroll_();
          this.adapter_.deregisterSurfaceInteractionHandler('click', this.dialogClickHandler_);
          this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
          this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
          this.adapter_.untrapFocusOnSurface();
          clearTimeout(this.timerId_);
          this.timerId_ = setTimeout(this.animationTimerEnd_, MDCDialogFoundation.numbers.DIALOG_ANIMATION_TIME_MS);
          this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
          this.adapter_.removeClass(MDCDialogFoundation.cssClasses.OPEN);
        }
      }, {
        key: 'isOpen',
        value: function isOpen() {
          return this.isOpen_;
        }
      }, {
        key: 'accept',
        value: function accept(shouldNotify) {
          if (shouldNotify) {
            this.adapter_.notifyAccept();
          }

          this.close();
        }
      }, {
        key: 'cancel',
        value: function cancel(shouldNotify) {
          if (shouldNotify) {
            this.adapter_.notifyCancel();
          }

          this.close();
        }
      }, {
        key: 'handleDialogClick_',
        value: function handleDialogClick_(evt) {
          var target = evt.target;

          if (this.adapter_.eventTargetHasClass(target, cssClasses.ACCEPT_BTN)) {
            this.accept(true);
          } else if (this.adapter_.eventTargetHasClass(target, cssClasses.CANCEL_BTN)) {
            this.cancel(true);
          }
        }
      }, {
        key: 'handleAnimationTimerEnd_',
        value: function handleAnimationTimerEnd_() {
          this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
          if (this.isOpen_) {
            this.adapter_.trapFocusOnSurface();
          }
        }
      }, {
        key: 'disableScroll_',
        value: function disableScroll_() {
          this.adapter_.addBodyClass(cssClasses.SCROLL_LOCK);
        }
      }, {
        key: 'enableScroll_',
        value: function enableScroll_() {
          this.adapter_.removeBodyClass(cssClasses.SCROLL_LOCK);
        }
      }]);
      return MDCDialogFoundation;
    }(MDCFoundation);

    var tabbable = function (el, options) {
      options = options || {};

      var elementDocument = el.ownerDocument || el;
      var basicTabbables = [];
      var orderedTabbables = [];

      // A node is "available" if
      // - it's computed style
      var isUnavailable = createIsUnavailable(elementDocument);

      var candidateSelectors = ['input', 'select', 'a[href]', 'textarea', 'button', '[tabindex]'];

      var candidates = el.querySelectorAll(candidateSelectors.join(','));

      if (options.includeContainer) {
        var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

        if (candidateSelectors.some(function (candidateSelector) {
          return matches.call(el, candidateSelector);
        })) {
          candidates = Array.prototype.slice.apply(candidates);
          candidates.unshift(el);
        }
      }

      var candidate, candidateIndexAttr, candidateIndex;
      for (var i = 0, l = candidates.length; i < l; i++) {
        candidate = candidates[i];
        candidateIndexAttr = parseInt(candidate.getAttribute('tabindex'), 10);
        candidateIndex = isNaN(candidateIndexAttr) ? candidate.tabIndex : candidateIndexAttr;

        if (candidateIndex < 0 || candidate.tagName === 'INPUT' && candidate.type === 'hidden' || candidate.disabled || isUnavailable(candidate, elementDocument)) {
          continue;
        }

        if (candidateIndex === 0) {
          basicTabbables.push(candidate);
        } else {
          orderedTabbables.push({
            index: i,
            tabIndex: candidateIndex,
            node: candidate
          });
        }
      }

      var tabbableNodes = orderedTabbables.sort(function (a, b) {
        return a.tabIndex === b.tabIndex ? a.index - b.index : a.tabIndex - b.tabIndex;
      }).map(function (a) {
        return a.node;
      });

      Array.prototype.push.apply(tabbableNodes, basicTabbables);

      return tabbableNodes;
    };

    function createIsUnavailable(elementDocument) {
      // Node cache must be refreshed on every check, in case
      // the content of the element has changed
      var isOffCache = [];

      // "off" means `display: none;`, as opposed to "hidden",
      // which means `visibility: hidden;`. getComputedStyle
      // accurately reflects visiblity in context but not
      // "off" state, so we need to recursively check parents.

      function isOff(node, nodeComputedStyle) {
        if (node === elementDocument.documentElement) return false;

        // Find the cached node (Array.prototype.find not available in IE9)
        for (var i = 0, length = isOffCache.length; i < length; i++) {
          if (isOffCache[i][0] === node) return isOffCache[i][1];
        }

        nodeComputedStyle = nodeComputedStyle || elementDocument.defaultView.getComputedStyle(node);

        var result = false;

        if (nodeComputedStyle.display === 'none') {
          result = true;
        } else if (node.parentNode) {
          result = isOff(node.parentNode);
        }

        isOffCache.push([node, result]);

        return result;
      }

      return function isUnavailable(node) {
        if (node === elementDocument.documentElement) return false;

        var computedStyle = elementDocument.defaultView.getComputedStyle(node);

        if (isOff(node, computedStyle)) return true;

        return computedStyle.visibility === 'hidden';
      };
    }

    var listeningFocusTrap = null;

    function focusTrap(element, userOptions) {
      var tabbableNodes = [];
      var firstTabbableNode = null;
      var lastTabbableNode = null;
      var nodeFocusedBeforeActivation = null;
      var active = false;
      var paused = false;
      var tabEvent = null;

      var container = typeof element === 'string' ? document.querySelector(element) : element;

      var config = userOptions || {};
      config.returnFocusOnDeactivate = userOptions && userOptions.returnFocusOnDeactivate !== undefined ? userOptions.returnFocusOnDeactivate : true;
      config.escapeDeactivates = userOptions && userOptions.escapeDeactivates !== undefined ? userOptions.escapeDeactivates : true;

      var trap = {
        activate: activate,
        deactivate: deactivate,
        pause: pause,
        unpause: unpause
      };

      return trap;

      function activate(activateOptions) {
        if (active) return;

        var defaultedActivateOptions = {
          onActivate: activateOptions && activateOptions.onActivate !== undefined ? activateOptions.onActivate : config.onActivate
        };

        active = true;
        paused = false;
        nodeFocusedBeforeActivation = document.activeElement;

        if (defaultedActivateOptions.onActivate) {
          defaultedActivateOptions.onActivate();
        }

        addListeners();
        return trap;
      }

      function deactivate(deactivateOptions) {
        if (!active) return;

        var defaultedDeactivateOptions = {
          returnFocus: deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate,
          onDeactivate: deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate
        };

        removeListeners();

        if (defaultedDeactivateOptions.onDeactivate) {
          defaultedDeactivateOptions.onDeactivate();
        }

        if (defaultedDeactivateOptions.returnFocus) {
          setTimeout(function () {
            tryFocus(nodeFocusedBeforeActivation);
          }, 0);
        }

        active = false;
        paused = false;
        return this;
      }

      function pause() {
        if (paused || !active) return;
        paused = true;
        removeListeners();
      }

      function unpause() {
        if (!paused || !active) return;
        paused = false;
        addListeners();
      }

      function addListeners() {
        if (!active) return;

        // There can be only one listening focus trap at a time
        if (listeningFocusTrap) {
          listeningFocusTrap.pause();
        }
        listeningFocusTrap = trap;

        updateTabbableNodes();
        // Ensure that the focused element doesn't capture the event that caused the focus trap activation
        setTimeout(function () {
          tryFocus(firstFocusNode());
        }, 0);
        document.addEventListener('focus', checkFocus, true);
        document.addEventListener('click', checkClick, true);
        document.addEventListener('mousedown', checkPointerDown, true);
        document.addEventListener('touchstart', checkPointerDown, true);
        document.addEventListener('keydown', checkKey, true);

        return trap;
      }

      function removeListeners() {
        if (!active || listeningFocusTrap !== trap) return;

        document.removeEventListener('focus', checkFocus, true);
        document.removeEventListener('click', checkClick, true);
        document.removeEventListener('mousedown', checkPointerDown, true);
        document.removeEventListener('touchstart', checkPointerDown, true);
        document.removeEventListener('keydown', checkKey, true);

        listeningFocusTrap = null;

        return trap;
      }

      function getNodeForOption(optionName) {
        var optionValue = config[optionName];
        var node = optionValue;
        if (!optionValue) {
          return null;
        }
        if (typeof optionValue === 'string') {
          node = document.querySelector(optionValue);
          if (!node) {
            throw new Error('`' + optionName + '` refers to no known node');
          }
        }
        if (typeof optionValue === 'function') {
          node = optionValue();
          if (!node) {
            throw new Error('`' + optionName + '` did not return a node');
          }
        }
        return node;
      }

      function firstFocusNode() {
        var node;
        if (getNodeForOption('initialFocus') !== null) {
          node = getNodeForOption('initialFocus');
        } else if (container.contains(document.activeElement)) {
          node = document.activeElement;
        } else {
          node = tabbableNodes[0] || getNodeForOption('fallbackFocus');
        }

        if (!node) {
          throw new Error('You can\'t have a focus-trap without at least one focusable element');
        }

        return node;
      }

      // This needs to be done on mousedown and touchstart instead of click
      // so that it precedes the focus event
      function checkPointerDown(e) {
        if (config.clickOutsideDeactivates && !container.contains(e.target)) {
          deactivate({ returnFocus: false });
        }
      }

      function checkClick(e) {
        if (config.clickOutsideDeactivates) return;
        if (container.contains(e.target)) return;
        e.preventDefault();
        e.stopImmediatePropagation();
      }

      function checkFocus(e) {
        if (container.contains(e.target)) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        // Checking for a blur method here resolves a Firefox issue (#15)
        if (typeof e.target.blur === 'function') e.target.blur();

        if (tabEvent) {
          readjustFocus(tabEvent);
        }
      }

      function checkKey(e) {
        if (e.key === 'Tab' || e.keyCode === 9) {
          handleTab(e);
        }

        if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
          deactivate();
        }
      }

      function handleTab(e) {
        updateTabbableNodes();

        if (e.target.hasAttribute('tabindex') && Number(e.target.getAttribute('tabindex')) < 0) {
          return tabEvent = e;
        }

        e.preventDefault();
        var currentFocusIndex = tabbableNodes.indexOf(e.target);

        if (e.shiftKey) {
          if (e.target === firstTabbableNode || tabbableNodes.indexOf(e.target) === -1) {
            return tryFocus(lastTabbableNode);
          }
          return tryFocus(tabbableNodes[currentFocusIndex - 1]);
        }

        if (e.target === lastTabbableNode) return tryFocus(firstTabbableNode);

        tryFocus(tabbableNodes[currentFocusIndex + 1]);
      }

      function updateTabbableNodes() {
        tabbableNodes = tabbable(container);
        firstTabbableNode = tabbableNodes[0];
        lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];
      }

      function readjustFocus(e) {
        if (e.shiftKey) return tryFocus(lastTabbableNode);

        tryFocus(firstTabbableNode);
      }
    }

    function isEscapeEvent(e) {
      return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
    }

    function tryFocus(node) {
      if (!node || !node.focus) return;
      if (node === document.activeElement) return;

      node.focus();
      if (node.tagName.toLowerCase() === 'input') {
        node.select();
      }
    }

    var focusTrap_1 = focusTrap;

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

    function createFocusTrapInstance(surfaceEl, acceptButtonEl) {
      var focusTrapFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : focusTrap_1;

      return focusTrapFactory(surfaceEl, {
        initialFocus: acceptButtonEl,
        clickOutsideDeactivates: true
      });
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

    //

    var script$1 = {
      name: 'mdc-button-base',
      mixins: [DispatchEventMixin, CustomButtonMixin, RippleMixin],
      data: function data() {
        return {
          classes: {},
          styles: {}
        };
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
        ref: "root",
        class: _vm.classes,
        style: _vm.styles,
        attrs: { href: _vm.href, link: _vm.link, disabled: _vm.disabled }
      }, _vm.listeners), [_vm._t("default")], 2);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\button\\mdc-button-base.vue";

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

    var mdcButtonBase = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

    var script$2 = {
      name: 'mdc-button',
      extends: mdcButtonBase,
      props: {
        raised: Boolean,
        unelevated: Boolean,
        outlined: Boolean,
        dense: Boolean
      },
      data: function data() {
        return {
          classes: {
            'mdc-button': true,
            'mdc-button--raised': this.raised,
            'mdc-button--unelevated': this.unelevated,
            'mdc-button--outlined': this.outlined,
            'mdc-button--dense': this.dense
          }
        };
      },

      watch: {
        raised: function raised() {
          this.$set(this.classes, 'mdc-button--raised', this.raised);
        },
        unelevated: function unelevated() {
          this.$set(this.classes, 'mdc-button--unelevated', this.unelevated);
        },
        outlined: function outlined() {
          this.$set(this.classes, 'mdc-button--outlined', this.outlined);
        },
        dense: function dense() {
          this.$set(this.classes, 'mdc-button--dense', this.dense);
        }
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\button\\mdc-button.vue";

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

    var mdcButton = __vue_normalize__$2({}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, __vue_create_injector__$2, undefined);

    //

    var script$3 = {
      name: 'mdc-dialog',
      components: {
        mdcButton: mdcButton
      },
      mixins: [VMAUniqueIdMixin],
      model: {
        prop: 'open',
        event: 'change'
      },
      props: {
        title: { type: String },
        accept: { type: String, default: 'Ok' },
        acceptDisabled: Boolean,
        acceptRaised: { type: Boolean, default: false },
        cancel: { type: String },
        cancelRaised: { type: Boolean, default: false },
        accent: Boolean,
        scrollable: Boolean,
        open: Boolean
      },
      data: function data() {
        return {
          classes: {
            'mdc-theme--dark': this.dark
          },
          styles: {},
          surfaceClasses: {},
          bodyClasses: {
            'mdc-dialog__body--scrollable': this.scrollable
          }
        };
      },

      watch: { open: 'onOpen_' },
      mounted: function mounted() {
        var _this = this;

        if (this.accept) {
          this.focusTrap = createFocusTrapInstance(this.$refs.surface, this.$refs.accept);
        }

        this.foundation = new MDCDialogFoundation({
          addClass: function addClass(className) {
            return _this.$set(_this.classes, className, true);
          },
          removeClass: function removeClass(className) {
            return _this.$delete(_this.classes, className);
          },
          addBodyClass: function addBodyClass(className) {
            return document.body.classList.add(className);
          },
          removeBodyClass: function removeBodyClass(className) {
            return document.body.classList.remove(className);
          },
          eventTargetHasClass: function eventTargetHasClass(target, className) {
            return target.classList.contains(className);
          },
          registerInteractionHandler: function registerInteractionHandler(evt, handler) {
            return _this.$refs.root.addEventListener(evt, handler);
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
            return _this.$refs.root.removeEventListener(evt, handler);
          },
          registerSurfaceInteractionHandler: function registerSurfaceInteractionHandler() /*evt, handler*/{
            // VMA_HACK: handle button clicks ourselves
            // this.$refs.surface.addEventListener(evt, handler)
          },
          deregisterSurfaceInteractionHandler: function deregisterSurfaceInteractionHandler() /*evt, handler*/{
            // VMA_HACK: handle button clicks ourselves
            // this.$refs.surface.removeEventListener(evt, handler)
          },
          registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
            return document.addEventListener('keydown', handler);
          },
          deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
            return document.removeEventListener('keydown', handler);
          },
          notifyAccept: function notifyAccept() {
            _this.$emit('change', false);
            _this.$emit('accept');
          },
          notifyCancel: function notifyCancel() {
            _this.$emit('change', false);
            _this.$emit('cancel');
          },
          trapFocusOnSurface: function trapFocusOnSurface() {
            return _this.focusTrap && _this.focusTrap.activate();
          },
          untrapFocusOnSurface: function untrapFocusOnSurface() {
            return _this.focusTrap && _this.focusTrap.deactivate();
          },
          isDialog: function isDialog(el) {
            return _this.$refs.surface === el;
          }
        });

        this.foundation.init();
        this.open && this.foundation.open();
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation.destroy();
      },

      methods: {
        onOpen_: function onOpen_(value) {
          if (value) {
            this.foundation.open();
          } else {
            this.foundation.close();
          }
        },
        onCancel: function onCancel() {
          var _this2 = this;

          if (this.$listeners['validateCancel']) {
            this.$emit('validateCancel', {
              cancel: function cancel() {
                var notify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                // if notify = false, the dialog will close
                // but the notifyAccept method will not be called
                // so we need to notify listeners the open state
                // is changing.
                if (!notify) {
                  _this2.$emit('change', false);
                }
                _this2.foundation.cancel(notify);
              }
            });
          } else {
            this.foundation.cancel(true);
          }
        },
        onAccept: function onAccept() {
          var _this3 = this;

          if (this.$listeners['validate']) {
            this.$emit('validate', {
              accept: function accept() {
                var notify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                // if notify = false, the dialog will close
                // but the notifyAccept method will not be called
                // so we need to notify listeners the open state
                // is changing.
                if (!notify) {
                  _this3.$emit('change', false);
                }
                _this3.foundation.accept(notify);
              }
            });
          } else {
            this.foundation.accept(true);
          }
        },
        show: function show() {
          this.foundation.open();
        },
        close: function close() {
          this.foundation.close();
        }
      }
    };

    /* script */
    var __vue_script__$3 = script$3;

    /* template */
    var __vue_render__$2 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("aside", {
        ref: "root",
        staticClass: "mdc-dialog",
        class: _vm.classes,
        style: _vm.styles,
        attrs: {
          "aria-labelledby": "label" + _vm.vma_uid_,
          "aria-describedby": "desc" + _vm.vma_uid_,
          role: "alertdialog"
        }
      }, [_c("div", {
        ref: "surface",
        staticClass: "mdc-dialog__surface",
        class: _vm.surfaceClasses
      }, [_vm.title ? _c("header", { staticClass: "mdc-dialog__header" }, [_c("h2", {
        staticClass: "mdc-dialog__header__title",
        attrs: { id: "label" + _vm.vma_uid_ }
      }, [_vm._v("\n        " + _vm._s(_vm.title) + "\n      ")])]) : _vm._e(), _vm._v(" "), _c("section", {
        staticClass: "mdc-dialog__body",
        class: _vm.bodyClasses,
        attrs: { id: "desc" + _vm.vma_uid_ }
      }, [_vm._t("default")], 2), _vm._v(" "), _vm.accept || _vm.cancel ? _c("footer", { staticClass: "mdc-dialog__footer" }, [_vm.cancel ? _c("mdcButton", {
        ref: "cancel",
        staticClass: "mdc-dialog__footer__button mdc-dialog__footer__button--cancel",
        class: { "mdc-dialog__action": _vm.accent },
        attrs: { raised: _vm.cancelRaised },
        on: { click: _vm.onCancel }
      }, [_vm._v(_vm._s(_vm.cancel))]) : _vm._e(), _vm._v(" "), _c("mdcButton", {
        ref: "accept",
        staticClass: "mdc-dialog__footer__button mdc-dialog__footer__button--accept",
        class: { "mdc-dialog__action": _vm.accent },
        attrs: {
          disabled: _vm.acceptDisabled,
          raised: _vm.acceptRaised
        },
        on: { click: _vm.onAccept }
      }, [_vm._v(_vm._s(_vm.accept))])], 1) : _vm._e()]), _vm._v(" "), _c("div", { staticClass: "mdc-dialog__backdrop" })]);
    };
    var __vue_staticRenderFns__$2 = [];
    __vue_render__$2._withStripped = true;

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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\dialog\\mdc-dialog.vue";

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

    var mdcDialog = __vue_normalize__$3({ render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, __vue_create_injector__$3, undefined);

    var plugin = BasePlugin({
      mdcDialog: mdcDialog
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1lbGVtZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tYnV0dG9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Rpc3BhdGNoLWV2ZW50LW1peGluLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kaWFsb2cvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kaWFsb2cvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy90YWJiYWJsZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9mb2N1cy10cmFwL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kaWFsb2cvdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS91dGlsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvcmlwcGxlL21kYy1yaXBwbGUtYmFzZS5qcyIsIi4uLy4uL2NvbXBvbmVudHMvcmlwcGxlL21kYy1yaXBwbGUudnVlIiwiLi4vLi4vY29tcG9uZW50cy9idXR0b24vbWRjLWJ1dHRvbi1iYXNlLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL21kYy1idXR0b24udnVlIiwiLi4vLi4vY29tcG9uZW50cy9kaWFsb2cvbWRjLWRpYWxvZy52dWUiLCIuLi8uLi9jb21wb25lbnRzL2RpYWxvZy9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvZGlhbG9nL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdChwbHVnaW4pIHtcclxuICAvLyBBdXRvLWluc3RhbGxcclxuICBsZXQgX1Z1ZSA9IG51bGxcclxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIF9WdWUgPSB3aW5kb3cuVnVlXHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cclxuICAgIF9WdWUgPSBnbG9iYWwuVnVlXHJcbiAgfVxyXG4gIGlmIChfVnVlKSB7XHJcbiAgICBfVnVlLnVzZShwbHVnaW4pXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luKGNvbXBvbmVudHMpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcclxuICAgIGluc3RhbGw6IHZtID0+IHtcclxuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXHJcbiAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRzXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBDdXN0b21FbGVtZW50ID0ge1xyXG4gIGZ1bmN0aW9uYWw6IHRydWUsXHJcbiAgcmVuZGVyKGNyZWF0ZUVsZW1lbnQsIGNvbnRleHQpIHtcclxuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFxyXG4gICAgICBjb250ZXh0LnByb3BzLmlzIHx8IGNvbnRleHQucHJvcHMudGFnIHx8ICdkaXYnLFxyXG4gICAgICBjb250ZXh0LmRhdGEsXHJcbiAgICAgIGNvbnRleHQuY2hpbGRyZW5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBDdXN0b21FbGVtZW50TWl4aW4gPSB7XHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgQ3VzdG9tRWxlbWVudFxyXG4gIH1cclxufVxyXG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XHJcbiAgbGV0IGV2dFxyXG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XHJcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcclxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXHJcbiAgICB9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxyXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxyXG4gIH1cclxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcclxufVxyXG4iLCJleHBvcnQgY29uc3QgQ3VzdG9tQnV0dG9uID0ge1xyXG4gIG5hbWU6ICdjdXN0b20tYnV0dG9uJyxcclxuICBmdW5jdGlvbmFsOiB0cnVlLFxyXG4gIHByb3BzOiB7XHJcbiAgICBsaW5rOiBPYmplY3RcclxuICB9LFxyXG4gIHJlbmRlcihoLCBjb250ZXh0KSB7XHJcbiAgICBsZXQgZWxlbWVudFxyXG4gICAgbGV0IGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBjb250ZXh0LmRhdGEpXHJcblxyXG4gICAgaWYgKGNvbnRleHQucHJvcHMubGluayAmJiBjb250ZXh0LnBhcmVudC4kcm91dGVyKSB7XHJcbiAgICAgIC8vIHJvdXRlci1saW5rIGNhc2VcclxuICAgICAgZWxlbWVudCA9IGNvbnRleHQucGFyZW50LiRyb290LiRvcHRpb25zLmNvbXBvbmVudHNbJ3JvdXRlci1saW5rJ11cclxuICAgICAgZGF0YS5wcm9wcyA9IE9iamVjdC5hc3NpZ24oeyB0YWc6IGNvbnRleHQucHJvcHMudGFnIH0sIGNvbnRleHQucHJvcHMubGluaylcclxuICAgICAgZGF0YS5hdHRycy5yb2xlID0gJ2J1dHRvbidcclxuICAgICAgaWYgKGRhdGEub24uY2xpY2spIHtcclxuICAgICAgICBkYXRhLm5hdGl2ZU9uID0geyBjbGljazogZGF0YS5vbi5jbGljayB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5hdHRycyAmJiBkYXRhLmF0dHJzLmhyZWYpIHtcclxuICAgICAgLy8gaHJlZiBjYXNlXHJcbiAgICAgIGVsZW1lbnQgPSAnYSdcclxuICAgICAgZGF0YS5hdHRycy5yb2xlID0gJ2J1dHRvbidcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGJ1dHRvbiBmYWxsYmFja1xyXG4gICAgICBlbGVtZW50ID0gJ2J1dHRvbidcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaChlbGVtZW50LCBkYXRhLCBjb250ZXh0LmNoaWxkcmVuKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEN1c3RvbUJ1dHRvbk1peGluID0ge1xyXG4gIHByb3BzOiB7XHJcbiAgICBocmVmOiBTdHJpbmcsXHJcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcclxuICAgIHRvOiBbU3RyaW5nLCBPYmplY3RdLFxyXG4gICAgZXhhY3Q6IEJvb2xlYW4sXHJcbiAgICBhcHBlbmQ6IEJvb2xlYW4sXHJcbiAgICByZXBsYWNlOiBCb29sZWFuLFxyXG4gICAgYWN0aXZlQ2xhc3M6IFN0cmluZyxcclxuICAgIGV4YWN0QWN0aXZlQ2xhc3M6IFN0cmluZ1xyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIGxpbmsoKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgdGhpcy50byAmJiB7XHJcbiAgICAgICAgICB0bzogdGhpcy50byxcclxuICAgICAgICAgIGV4YWN0OiB0aGlzLmV4YWN0LFxyXG4gICAgICAgICAgYXBwZW5kOiB0aGlzLmFwcGVuZCxcclxuICAgICAgICAgIHJlcGxhY2U6IHRoaXMucmVwbGFjZSxcclxuICAgICAgICAgIGFjdGl2ZUNsYXNzOiB0aGlzLmFjdGl2ZUNsYXNzLFxyXG4gICAgICAgICAgZXhhY3RBY3RpdmVDbGFzczogdGhpcy5leGFjdEFjdGl2ZUNsYXNzXHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfSxcclxuICBjb21wb25lbnRzOiB7XHJcbiAgICBDdXN0b21CdXR0b25cclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IERpc3BhdGNoRXZlbnRNaXhpbiA9IHtcclxuICBwcm9wczoge1xyXG4gICAgZXZlbnQ6IFN0cmluZyxcclxuICAgICdldmVudC10YXJnZXQnOiBPYmplY3QsXHJcbiAgICAnZXZlbnQtYXJncyc6IEFycmF5XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBkaXNwYXRjaEV2ZW50KGV2dCkge1xyXG4gICAgICBldnQgJiYgdGhpcy4kZW1pdChldnQudHlwZSwgZXZ0KVxyXG4gICAgICBpZiAodGhpcy5ldmVudCkge1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLmV2ZW50VGFyZ2V0IHx8IHRoaXMuJHJvb3RcclxuICAgICAgICBsZXQgYXJncyA9IHRoaXMuZXZlbnRBcmdzIHx8IFtdXHJcbiAgICAgICAgdGFyZ2V0LiRlbWl0KHRoaXMuZXZlbnQsIC4uLmFyZ3MpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICBsaXN0ZW5lcnMoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxyXG4gICAgICAgIGNsaWNrOiBlID0+IHRoaXMuZGlzcGF0Y2hFdmVudChlKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IHNjb3BlID1cclxuICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDB4MTAwMDAwMDApKS50b1N0cmluZygpICsgJy0nXHJcblxyXG5leHBvcnQgY29uc3QgVk1BVW5pcXVlSWRNaXhpbiA9IHtcclxuICBiZWZvcmVDcmVhdGUoKSB7XHJcbiAgICB0aGlzLnZtYV91aWRfID0gc2NvcGUgKyB0aGlzLl91aWRcclxuICB9XHJcbn1cclxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIEFcbiAqL1xuY2xhc3MgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgZXZlcnlcbiAgICAvLyBDU1MgY2xhc3MgdGhlIGZvdW5kYXRpb24gY2xhc3MgbmVlZHMgYXMgYSBwcm9wZXJ0eS4gZS5nLiB7QUNUSVZFOiAnbWRjLWNvbXBvbmVudC0tYWN0aXZlJ31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIHNlbWFudGljIHN0cmluZ3MgYXMgY29uc3RhbnRzLiBlLmcuIHtBUklBX1JPTEU6ICd0YWJsaXN0J31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIG9mIGl0cyBzZW1hbnRpYyBudW1iZXJzIGFzIGNvbnN0YW50cy4gZS5nLiB7QU5JTUFUSU9OX0RFTEFZX01TOiAzNTB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFPYmplY3R9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBtYXkgY2hvb3NlIHRvIGltcGxlbWVudCB0aGlzIGdldHRlciBpbiBvcmRlciB0byBwcm92aWRlIGEgY29udmVuaWVudFxuICAgIC8vIHdheSBvZiB2aWV3aW5nIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBvZiBhbiBhZGFwdGVyLiBJbiB0aGUgZnV0dXJlLCB0aGlzIGNvdWxkIGFsc28gYmUgdXNlZCBmb3IgYWRhcHRlclxuICAgIC8vIHZhbGlkYXRpb24uXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QT19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshQX0gKi9cbiAgICB0aGlzLmFkYXB0ZXJfID0gYWRhcHRlcjtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBpbml0aWFsaXphdGlvbiByb3V0aW5lcyAocmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGRlLWluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChkZS1yZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBGXG4gKi9cbmNsYXNzIE1EQ0NvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEByZXR1cm4geyFNRENDb21wb25lbnR9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIC8vIFN1YmNsYXNzZXMgd2hpY2ggZXh0ZW5kIE1EQ0Jhc2Ugc2hvdWxkIHByb3ZpZGUgYW4gYXR0YWNoVG8oKSBtZXRob2QgdGhhdCB0YWtlcyBhIHJvb3QgZWxlbWVudCBhbmRcbiAgICAvLyByZXR1cm5zIGFuIGluc3RhbnRpYXRlZCBjb21wb25lbnQgd2l0aCBpdHMgcm9vdCBzZXQgdG8gdGhhdCBlbGVtZW50LiBBbHNvIG5vdGUgdGhhdCBpbiB0aGUgY2FzZXMgb2ZcbiAgICAvLyBzdWJjbGFzc2VzLCBhbiBleHBsaWNpdCBmb3VuZGF0aW9uIGNsYXNzIHdpbGwgbm90IGhhdmUgdG8gYmUgcGFzc2VkIGluOyBpdCB3aWxsIHNpbXBseSBiZSBpbml0aWFsaXplZFxuICAgIC8vIGZyb20gZ2V0RGVmYXVsdEZvdW5kYXRpb24oKS5cbiAgICByZXR1cm4gbmV3IE1EQ0NvbXBvbmVudChyb290LCBuZXcgTURDRm91bmRhdGlvbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEBwYXJhbSB7Rj19IGZvdW5kYXRpb25cbiAgICogQHBhcmFtIHsuLi4/fSBhcmdzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihyb290LCBmb3VuZGF0aW9uID0gdW5kZWZpbmVkLCAuLi5hcmdzKSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFFbGVtZW50fSAqL1xuICAgIHRoaXMucm9vdF8gPSByb290O1xuICAgIHRoaXMuaW5pdGlhbGl6ZSguLi5hcmdzKTtcbiAgICAvLyBOb3RlIHRoYXQgd2UgaW5pdGlhbGl6ZSBmb3VuZGF0aW9uIGhlcmUgYW5kIG5vdCB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yJ3MgZGVmYXVsdCBwYXJhbSBzbyB0aGF0XG4gICAgLy8gdGhpcy5yb290XyBpcyBkZWZpbmVkIGFuZCBjYW4gYmUgdXNlZCB3aXRoaW4gdGhlIGZvdW5kYXRpb24gY2xhc3MuXG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFGfSAqL1xuICAgIHRoaXMuZm91bmRhdGlvbl8gPSBmb3VuZGF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLmdldERlZmF1bHRGb3VuZGF0aW9uKCkgOiBmb3VuZGF0aW9uO1xuICAgIHRoaXMuZm91bmRhdGlvbl8uaW5pdCgpO1xuICAgIHRoaXMuaW5pdGlhbFN5bmNXaXRoRE9NKCk7XG4gIH1cblxuICBpbml0aWFsaXplKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICAvLyBTdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIHRvIGRvIGFueSBhZGRpdGlvbmFsIHNldHVwIHdvcmsgdGhhdCB3b3VsZCBiZSBjb25zaWRlcmVkIHBhcnQgb2YgYVxuICAgIC8vIFwiY29uc3RydWN0b3JcIi4gRXNzZW50aWFsbHksIGl0IGlzIGEgaG9vayBpbnRvIHRoZSBwYXJlbnQgY29uc3RydWN0b3IgYmVmb3JlIHRoZSBmb3VuZGF0aW9uIGlzXG4gICAgLy8gaW5pdGlhbGl6ZWQuIEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBiZXNpZGVzIHJvb3QgYW5kIGZvdW5kYXRpb24gd2lsbCBiZSBwYXNzZWQgaW4gaGVyZS5cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshRn0gZm91bmRhdGlvblxuICAgKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgZm91bmRhdGlvbiBjbGFzcyBmb3IgdGhlXG4gICAgLy8gY29tcG9uZW50LlxuICAgIHRocm93IG5ldyBFcnJvcignU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIGdldERlZmF1bHRGb3VuZGF0aW9uIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgJyArXG4gICAgICAnZm91bmRhdGlvbiBjbGFzcycpO1xuICB9XG5cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIGlmIHRoZXkgbmVlZCB0byBwZXJmb3JtIHdvcmsgdG8gc3luY2hyb25pemUgd2l0aCBhIGhvc3QgRE9NXG4gICAgLy8gb2JqZWN0LiBBbiBleGFtcGxlIG9mIHRoaXMgd291bGQgYmUgYSBmb3JtIGNvbnRyb2wgd3JhcHBlciB0aGF0IG5lZWRzIHRvIHN5bmNocm9uaXplIGl0cyBpbnRlcm5hbCBzdGF0ZVxuICAgIC8vIHRvIHNvbWUgcHJvcGVydHkgb3IgYXR0cmlidXRlIG9mIHRoZSBob3N0IERPTS4gUGxlYXNlIG5vdGU6IHRoaXMgaXMgKm5vdCogdGhlIHBsYWNlIHRvIHBlcmZvcm0gRE9NXG4gICAgLy8gcmVhZHMvd3JpdGVzIHRoYXQgd291bGQgY2F1c2UgbGF5b3V0IC8gcGFpbnQsIGFzIHRoaXMgaXMgY2FsbGVkIHN5bmNocm9ub3VzbHkgZnJvbSB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yLlxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG1heSBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmVsZWFzZSBhbnkgcmVzb3VyY2VzIC8gZGVyZWdpc3RlciBhbnkgbGlzdGVuZXJzIHRoZXkgaGF2ZVxuICAgIC8vIGF0dGFjaGVkLiBBbiBleGFtcGxlIG9mIHRoaXMgbWlnaHQgYmUgZGVyZWdpc3RlcmluZyBhIHJlc2l6ZSBldmVudCBmcm9tIHRoZSB3aW5kb3cgb2JqZWN0LlxuICAgIHRoaXMuZm91bmRhdGlvbl8uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIGFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogbGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgbGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiB1bmxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHVubGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgYSBjcm9zcy1icm93c2VyLWNvbXBhdGlibGUgY3VzdG9tIGV2ZW50IGZyb20gdGhlIGNvbXBvbmVudCByb290IG9mIHRoZSBnaXZlbiB0eXBlLFxuICAgKiB3aXRoIHRoZSBnaXZlbiBkYXRhLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFPYmplY3R9IGV2dERhdGFcbiAgICogQHBhcmFtIHtib29sZWFuPX0gc2hvdWxkQnViYmxlXG4gICAqL1xuICBlbWl0KGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gICAgbGV0IGV2dDtcbiAgICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5yb290Xy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDQ29tcG9uZW50O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJy4vY29tcG9uZW50JztcblxuZXhwb3J0IHtNRENGb3VuZGF0aW9uLCBNRENDb21wb25lbnR9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgUk9PVDogJ21kYy1kaWFsb2cnLFxuICBPUEVOOiAnbWRjLWRpYWxvZy0tb3BlbicsXG4gIEFOSU1BVElORzogJ21kYy1kaWFsb2ctLWFuaW1hdGluZycsXG4gIEJBQ0tEUk9QOiAnbWRjLWRpYWxvZ19fYmFja2Ryb3AnLFxuICBTQ1JPTExfTE9DSzogJ21kYy1kaWFsb2ctc2Nyb2xsLWxvY2snLFxuICBBQ0NFUFRfQlROOiAnbWRjLWRpYWxvZ19fZm9vdGVyX19idXR0b24tLWFjY2VwdCcsXG4gIENBTkNFTF9CVE46ICdtZGMtZGlhbG9nX19mb290ZXJfX2J1dHRvbi0tY2FuY2VsJyxcbn07XG5cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIE9QRU5fRElBTE9HX1NFTEVDVE9SOiAnLm1kYy1kaWFsb2ctLW9wZW4nLFxuICBESUFMT0dfU1VSRkFDRV9TRUxFQ1RPUjogJy5tZGMtZGlhbG9nX19zdXJmYWNlJyxcbiAgQUNDRVBUX1NFTEVDVE9SOiAnLm1kYy1kaWFsb2dfX2Zvb3Rlcl9fYnV0dG9uLS1hY2NlcHQnLFxuICBBQ0NFUFRfRVZFTlQ6ICdNRENEaWFsb2c6YWNjZXB0JyxcbiAgQ0FOQ0VMX0VWRU5UOiAnTURDRGlhbG9nOmNhbmNlbCcsXG59O1xuXG5jb25zdCBudW1iZXJzID0ge1xuICBESUFMT0dfQU5JTUFUSU9OX1RJTUVfTVM6IDEyMCxcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge01EQ0ZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2luZGV4JztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNRENEaWFsb2dGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuICh7XG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgYWRkQm9keUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQm9keUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgZXZlbnRUYXJnZXRIYXNDbGFzczogKC8qIHRhcmdldDogRXZlbnRUYXJnZXQsIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiAvKiBib29sZWFuICovIGZhbHNlLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnQ6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJTdXJmYWNlSW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclN1cmZhY2VJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnQ6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBub3RpZnlBY2NlcHQ6ICgpID0+IHt9LFxuICAgICAgbm90aWZ5Q2FuY2VsOiAoKSA9PiB7fSxcbiAgICAgIHRyYXBGb2N1c09uU3VyZmFjZTogKCkgPT4ge30sXG4gICAgICB1bnRyYXBGb2N1c09uU3VyZmFjZTogKCkgPT4ge30sXG4gICAgICBpc0RpYWxvZzogKC8qIGVsOiBFbGVtZW50ICovKSA9PiAvKiBib29sZWFuICovIGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDRGlhbG9nRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuICAgIHRoaXMuaXNPcGVuXyA9IGZhbHNlO1xuICAgIHRoaXMuY29tcG9uZW50Q2xpY2tIYW5kbGVyXyA9IChldnQpID0+IHtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmV2ZW50VGFyZ2V0SGFzQ2xhc3MoZXZ0LnRhcmdldCwgY3NzQ2xhc3Nlcy5CQUNLRFJPUCkpIHtcbiAgICAgICAgdGhpcy5jYW5jZWwodHJ1ZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLmRpYWxvZ0NsaWNrSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZURpYWxvZ0NsaWNrXyhldnQpO1xuICAgIHRoaXMuZG9jdW1lbnRLZXlkb3duSGFuZGxlcl8gPSAoZXZ0KSA9PiB7XG4gICAgICBpZiAoZXZ0LmtleSAmJiBldnQua2V5ID09PSAnRXNjYXBlJyB8fCBldnQua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgdGhpcy5jYW5jZWwodHJ1ZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMudGltZXJJZF8gPSAwO1xuICAgIHRoaXMuYW5pbWF0aW9uVGltZXJFbmRfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVBbmltYXRpb25UaW1lckVuZF8oZXZ0KTtcbiAgfTtcblxuICBkZXN0cm95KCkge1xuICAgIC8vIEVuc3VyZSB0aGF0IGRpYWxvZyBpcyBjbGVhbmVkIHVwIHdoZW4gZGVzdHJveWVkXG4gICAgaWYgKHRoaXMuaXNPcGVuXykge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgICAvLyBGaW5hbCBjbGVhbnVwIG9mIGFuaW1hdGluZyBjbGFzcyBpbiBjYXNlIHRoZSB0aW1lciBoYXMgbm90IGNvbXBsZXRlZC5cbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ0RpYWxvZ0ZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkcpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVySWRfKTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5pc09wZW5fID0gdHJ1ZTtcbiAgICB0aGlzLmRpc2FibGVTY3JvbGxfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXIodGhpcy5kb2N1bWVudEtleWRvd25IYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclN1cmZhY2VJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5kaWFsb2dDbGlja0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY29tcG9uZW50Q2xpY2tIYW5kbGVyXyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXJJZF8pO1xuICAgIHRoaXMudGltZXJJZF8gPSBzZXRUaW1lb3V0KHRoaXMuYW5pbWF0aW9uVGltZXJFbmRfLCBNRENEaWFsb2dGb3VuZGF0aW9uLm51bWJlcnMuRElBTE9HX0FOSU1BVElPTl9USU1FX01TKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ0RpYWxvZ0ZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkcpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDRGlhbG9nRm91bmRhdGlvbi5jc3NDbGFzc2VzLk9QRU4pO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5pc09wZW5fID0gZmFsc2U7XG4gICAgdGhpcy5lbmFibGVTY3JvbGxfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyU3VyZmFjZUludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmRpYWxvZ0NsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXIodGhpcy5kb2N1bWVudEtleWRvd25IYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY29tcG9uZW50Q2xpY2tIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy51bnRyYXBGb2N1c09uU3VyZmFjZSgpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVySWRfKTtcbiAgICB0aGlzLnRpbWVySWRfID0gc2V0VGltZW91dCh0aGlzLmFuaW1hdGlvblRpbWVyRW5kXywgTURDRGlhbG9nRm91bmRhdGlvbi5udW1iZXJzLkRJQUxPR19BTklNQVRJT05fVElNRV9NUyk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENEaWFsb2dGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQU5JTUFUSU5HKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ0RpYWxvZ0ZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5PUEVOKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5pc09wZW5fO1xuICB9XG5cbiAgYWNjZXB0KHNob3VsZE5vdGlmeSkge1xuICAgIGlmIChzaG91bGROb3RpZnkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5QWNjZXB0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgY2FuY2VsKHNob3VsZE5vdGlmeSkge1xuICAgIGlmIChzaG91bGROb3RpZnkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5Q2FuY2VsKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgaGFuZGxlRGlhbG9nQ2xpY2tfKGV2dCkge1xuICAgIGNvbnN0IHt0YXJnZXR9ID0gZXZ0O1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmV2ZW50VGFyZ2V0SGFzQ2xhc3ModGFyZ2V0LCBjc3NDbGFzc2VzLkFDQ0VQVF9CVE4pKSB7XG4gICAgICB0aGlzLmFjY2VwdCh0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWRhcHRlcl8uZXZlbnRUYXJnZXRIYXNDbGFzcyh0YXJnZXQsIGNzc0NsYXNzZXMuQ0FOQ0VMX0JUTikpIHtcbiAgICAgIHRoaXMuY2FuY2VsKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUFuaW1hdGlvblRpbWVyRW5kXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ0RpYWxvZ0ZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkcpO1xuICAgIGlmICh0aGlzLmlzT3Blbl8pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8udHJhcEZvY3VzT25TdXJmYWNlKCk7XG4gICAgfVxuICB9O1xuXG4gIGRpc2FibGVTY3JvbGxfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQm9keUNsYXNzKGNzc0NsYXNzZXMuU0NST0xMX0xPQ0spO1xuICB9XG5cbiAgZW5hYmxlU2Nyb2xsXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUJvZHlDbGFzcyhjc3NDbGFzc2VzLlNDUk9MTF9MT0NLKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgZWxlbWVudERvY3VtZW50ID0gZWwub3duZXJEb2N1bWVudCB8fCBlbDtcbiAgdmFyIGJhc2ljVGFiYmFibGVzID0gW107XG4gIHZhciBvcmRlcmVkVGFiYmFibGVzID0gW107XG5cbiAgLy8gQSBub2RlIGlzIFwiYXZhaWxhYmxlXCIgaWZcbiAgLy8gLSBpdCdzIGNvbXB1dGVkIHN0eWxlXG4gIHZhciBpc1VuYXZhaWxhYmxlID0gY3JlYXRlSXNVbmF2YWlsYWJsZShlbGVtZW50RG9jdW1lbnQpO1xuXG4gIHZhciBjYW5kaWRhdGVTZWxlY3RvcnMgPSBbXG4gICAgJ2lucHV0JyxcbiAgICAnc2VsZWN0JyxcbiAgICAnYVtocmVmXScsXG4gICAgJ3RleHRhcmVhJyxcbiAgICAnYnV0dG9uJyxcbiAgICAnW3RhYmluZGV4XScsXG4gIF07XG5cbiAgdmFyIGNhbmRpZGF0ZXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKGNhbmRpZGF0ZVNlbGVjdG9ycy5qb2luKCcsJykpO1xuXG4gIGlmIChvcHRpb25zLmluY2x1ZGVDb250YWluZXIpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgfHwgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xuXG4gICAgaWYgKFxuICAgICAgY2FuZGlkYXRlU2VsZWN0b3JzLnNvbWUoZnVuY3Rpb24oY2FuZGlkYXRlU2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoZXMuY2FsbChlbCwgY2FuZGlkYXRlU2VsZWN0b3IpO1xuICAgICAgfSlcbiAgICApIHtcbiAgICAgIGNhbmRpZGF0ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoY2FuZGlkYXRlcyk7XG4gICAgICBjYW5kaWRhdGVzLnVuc2hpZnQoZWwpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjYW5kaWRhdGUsIGNhbmRpZGF0ZUluZGV4QXR0ciwgY2FuZGlkYXRlSW5kZXg7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gY2FuZGlkYXRlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjYW5kaWRhdGUgPSBjYW5kaWRhdGVzW2ldO1xuICAgIGNhbmRpZGF0ZUluZGV4QXR0ciA9IHBhcnNlSW50KGNhbmRpZGF0ZS5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JyksIDEwKVxuICAgIGNhbmRpZGF0ZUluZGV4ID0gaXNOYU4oY2FuZGlkYXRlSW5kZXhBdHRyKSA/IGNhbmRpZGF0ZS50YWJJbmRleCA6IGNhbmRpZGF0ZUluZGV4QXR0cjtcblxuICAgIGlmIChcbiAgICAgIGNhbmRpZGF0ZUluZGV4IDwgMFxuICAgICAgfHwgKGNhbmRpZGF0ZS50YWdOYW1lID09PSAnSU5QVVQnICYmIGNhbmRpZGF0ZS50eXBlID09PSAnaGlkZGVuJylcbiAgICAgIHx8IGNhbmRpZGF0ZS5kaXNhYmxlZFxuICAgICAgfHwgaXNVbmF2YWlsYWJsZShjYW5kaWRhdGUsIGVsZW1lbnREb2N1bWVudClcbiAgICApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjYW5kaWRhdGVJbmRleCA9PT0gMCkge1xuICAgICAgYmFzaWNUYWJiYWJsZXMucHVzaChjYW5kaWRhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcmRlcmVkVGFiYmFibGVzLnB1c2goe1xuICAgICAgICBpbmRleDogaSxcbiAgICAgICAgdGFiSW5kZXg6IGNhbmRpZGF0ZUluZGV4LFxuICAgICAgICBub2RlOiBjYW5kaWRhdGUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB2YXIgdGFiYmFibGVOb2RlcyA9IG9yZGVyZWRUYWJiYWJsZXNcbiAgICAuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gYS50YWJJbmRleCA9PT0gYi50YWJJbmRleCA/IGEuaW5kZXggLSBiLmluZGV4IDogYS50YWJJbmRleCAtIGIudGFiSW5kZXg7XG4gICAgfSlcbiAgICAubWFwKGZ1bmN0aW9uKGEpIHtcbiAgICAgIHJldHVybiBhLm5vZGVcbiAgICB9KTtcblxuICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseSh0YWJiYWJsZU5vZGVzLCBiYXNpY1RhYmJhYmxlcyk7XG5cbiAgcmV0dXJuIHRhYmJhYmxlTm9kZXM7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUlzVW5hdmFpbGFibGUoZWxlbWVudERvY3VtZW50KSB7XG4gIC8vIE5vZGUgY2FjaGUgbXVzdCBiZSByZWZyZXNoZWQgb24gZXZlcnkgY2hlY2ssIGluIGNhc2VcbiAgLy8gdGhlIGNvbnRlbnQgb2YgdGhlIGVsZW1lbnQgaGFzIGNoYW5nZWRcbiAgdmFyIGlzT2ZmQ2FjaGUgPSBbXTtcblxuICAvLyBcIm9mZlwiIG1lYW5zIGBkaXNwbGF5OiBub25lO2AsIGFzIG9wcG9zZWQgdG8gXCJoaWRkZW5cIixcbiAgLy8gd2hpY2ggbWVhbnMgYHZpc2liaWxpdHk6IGhpZGRlbjtgLiBnZXRDb21wdXRlZFN0eWxlXG4gIC8vIGFjY3VyYXRlbHkgcmVmbGVjdHMgdmlzaWJsaXR5IGluIGNvbnRleHQgYnV0IG5vdFxuICAvLyBcIm9mZlwiIHN0YXRlLCBzbyB3ZSBuZWVkIHRvIHJlY3Vyc2l2ZWx5IGNoZWNrIHBhcmVudHMuXG5cbiAgZnVuY3Rpb24gaXNPZmYobm9kZSwgbm9kZUNvbXB1dGVkU3R5bGUpIHtcbiAgICBpZiAobm9kZSA9PT0gZWxlbWVudERvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gRmluZCB0aGUgY2FjaGVkIG5vZGUgKEFycmF5LnByb3RvdHlwZS5maW5kIG5vdCBhdmFpbGFibGUgaW4gSUU5KVxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBpc09mZkNhY2hlLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXNPZmZDYWNoZVtpXVswXSA9PT0gbm9kZSkgcmV0dXJuIGlzT2ZmQ2FjaGVbaV1bMV07XG4gICAgfVxuXG4gICAgbm9kZUNvbXB1dGVkU3R5bGUgPSBub2RlQ29tcHV0ZWRTdHlsZSB8fCBlbGVtZW50RG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcblxuICAgIHZhciByZXN1bHQgPSBmYWxzZTtcblxuICAgIGlmIChub2RlQ29tcHV0ZWRTdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpIHtcbiAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgIHJlc3VsdCA9IGlzT2ZmKG5vZGUucGFyZW50Tm9kZSk7XG4gICAgfVxuXG4gICAgaXNPZmZDYWNoZS5wdXNoKFtub2RlLCByZXN1bHRdKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gaXNVbmF2YWlsYWJsZShub2RlKSB7XG4gICAgaWYgKG5vZGUgPT09IGVsZW1lbnREb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBjb21wdXRlZFN0eWxlID0gZWxlbWVudERvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG5cbiAgICBpZiAoaXNPZmYobm9kZSwgY29tcHV0ZWRTdHlsZSkpIHJldHVybiB0cnVlO1xuXG4gICAgcmV0dXJuIGNvbXB1dGVkU3R5bGUudmlzaWJpbGl0eSA9PT0gJ2hpZGRlbic7XG4gIH1cbn1cbiIsInZhciB0YWJiYWJsZSA9IHJlcXVpcmUoJ3RhYmJhYmxlJyk7XG5cbnZhciBsaXN0ZW5pbmdGb2N1c1RyYXAgPSBudWxsO1xuXG5mdW5jdGlvbiBmb2N1c1RyYXAoZWxlbWVudCwgdXNlck9wdGlvbnMpIHtcbiAgdmFyIHRhYmJhYmxlTm9kZXMgPSBbXTtcbiAgdmFyIGZpcnN0VGFiYmFibGVOb2RlID0gbnVsbDtcbiAgdmFyIGxhc3RUYWJiYWJsZU5vZGUgPSBudWxsO1xuICB2YXIgbm9kZUZvY3VzZWRCZWZvcmVBY3RpdmF0aW9uID0gbnVsbDtcbiAgdmFyIGFjdGl2ZSA9IGZhbHNlO1xuICB2YXIgcGF1c2VkID0gZmFsc2U7XG4gIHZhciB0YWJFdmVudCA9IG51bGw7XG5cbiAgdmFyIGNvbnRhaW5lciA9ICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpXG4gICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpXG4gICAgOiBlbGVtZW50O1xuXG4gIHZhciBjb25maWcgPSB1c2VyT3B0aW9ucyB8fCB7fTtcbiAgY29uZmlnLnJldHVybkZvY3VzT25EZWFjdGl2YXRlID0gKHVzZXJPcHRpb25zICYmIHVzZXJPcHRpb25zLnJldHVybkZvY3VzT25EZWFjdGl2YXRlICE9PSB1bmRlZmluZWQpXG4gICAgPyB1c2VyT3B0aW9ucy5yZXR1cm5Gb2N1c09uRGVhY3RpdmF0ZVxuICAgIDogdHJ1ZTtcbiAgY29uZmlnLmVzY2FwZURlYWN0aXZhdGVzID0gKHVzZXJPcHRpb25zICYmIHVzZXJPcHRpb25zLmVzY2FwZURlYWN0aXZhdGVzICE9PSB1bmRlZmluZWQpXG4gICAgPyB1c2VyT3B0aW9ucy5lc2NhcGVEZWFjdGl2YXRlc1xuICAgIDogdHJ1ZTtcblxuICB2YXIgdHJhcCA9IHtcbiAgICBhY3RpdmF0ZTogYWN0aXZhdGUsXG4gICAgZGVhY3RpdmF0ZTogZGVhY3RpdmF0ZSxcbiAgICBwYXVzZTogcGF1c2UsXG4gICAgdW5wYXVzZTogdW5wYXVzZSxcbiAgfTtcblxuICByZXR1cm4gdHJhcDtcblxuICBmdW5jdGlvbiBhY3RpdmF0ZShhY3RpdmF0ZU9wdGlvbnMpIHtcbiAgICBpZiAoYWN0aXZlKSByZXR1cm47XG5cbiAgICB2YXIgZGVmYXVsdGVkQWN0aXZhdGVPcHRpb25zID0ge1xuICAgICAgb25BY3RpdmF0ZTogKGFjdGl2YXRlT3B0aW9ucyAmJiBhY3RpdmF0ZU9wdGlvbnMub25BY3RpdmF0ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICA/IGFjdGl2YXRlT3B0aW9ucy5vbkFjdGl2YXRlXG4gICAgICAgIDogY29uZmlnLm9uQWN0aXZhdGUsXG4gICAgfTtcblxuICAgIGFjdGl2ZSA9IHRydWU7XG4gICAgcGF1c2VkID0gZmFsc2U7XG4gICAgbm9kZUZvY3VzZWRCZWZvcmVBY3RpdmF0aW9uID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblxuICAgIGlmIChkZWZhdWx0ZWRBY3RpdmF0ZU9wdGlvbnMub25BY3RpdmF0ZSkge1xuICAgICAgZGVmYXVsdGVkQWN0aXZhdGVPcHRpb25zLm9uQWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICBhZGRMaXN0ZW5lcnMoKTtcbiAgICByZXR1cm4gdHJhcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYWN0aXZhdGUoZGVhY3RpdmF0ZU9wdGlvbnMpIHtcbiAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuO1xuXG4gICAgdmFyIGRlZmF1bHRlZERlYWN0aXZhdGVPcHRpb25zID0ge1xuICAgICAgcmV0dXJuRm9jdXM6IChkZWFjdGl2YXRlT3B0aW9ucyAmJiBkZWFjdGl2YXRlT3B0aW9ucy5yZXR1cm5Gb2N1cyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICA/IGRlYWN0aXZhdGVPcHRpb25zLnJldHVybkZvY3VzXG4gICAgICAgIDogY29uZmlnLnJldHVybkZvY3VzT25EZWFjdGl2YXRlLFxuICAgICAgb25EZWFjdGl2YXRlOiAoZGVhY3RpdmF0ZU9wdGlvbnMgJiYgZGVhY3RpdmF0ZU9wdGlvbnMub25EZWFjdGl2YXRlICE9PSB1bmRlZmluZWQpXG4gICAgICAgID8gZGVhY3RpdmF0ZU9wdGlvbnMub25EZWFjdGl2YXRlXG4gICAgICAgIDogY29uZmlnLm9uRGVhY3RpdmF0ZSxcbiAgICB9O1xuXG4gICAgcmVtb3ZlTGlzdGVuZXJzKCk7XG5cbiAgICBpZiAoZGVmYXVsdGVkRGVhY3RpdmF0ZU9wdGlvbnMub25EZWFjdGl2YXRlKSB7XG4gICAgICBkZWZhdWx0ZWREZWFjdGl2YXRlT3B0aW9ucy5vbkRlYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAoZGVmYXVsdGVkRGVhY3RpdmF0ZU9wdGlvbnMucmV0dXJuRm9jdXMpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnlGb2N1cyhub2RlRm9jdXNlZEJlZm9yZUFjdGl2YXRpb24pO1xuICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgYWN0aXZlID0gZmFsc2U7XG4gICAgcGF1c2VkID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICBpZiAocGF1c2VkIHx8ICFhY3RpdmUpIHJldHVybjtcbiAgICBwYXVzZWQgPSB0cnVlO1xuICAgIHJlbW92ZUxpc3RlbmVycygpO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5wYXVzZSgpIHtcbiAgICBpZiAoIXBhdXNlZCB8fCAhYWN0aXZlKSByZXR1cm47XG4gICAgcGF1c2VkID0gZmFsc2U7XG4gICAgYWRkTGlzdGVuZXJzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKCFhY3RpdmUpIHJldHVybjtcblxuICAgIC8vIFRoZXJlIGNhbiBiZSBvbmx5IG9uZSBsaXN0ZW5pbmcgZm9jdXMgdHJhcCBhdCBhIHRpbWVcbiAgICBpZiAobGlzdGVuaW5nRm9jdXNUcmFwKSB7XG4gICAgICBsaXN0ZW5pbmdGb2N1c1RyYXAucGF1c2UoKTtcbiAgICB9XG4gICAgbGlzdGVuaW5nRm9jdXNUcmFwID0gdHJhcDtcblxuICAgIHVwZGF0ZVRhYmJhYmxlTm9kZXMoKTtcbiAgICAvLyBFbnN1cmUgdGhhdCB0aGUgZm9jdXNlZCBlbGVtZW50IGRvZXNuJ3QgY2FwdHVyZSB0aGUgZXZlbnQgdGhhdCBjYXVzZWQgdGhlIGZvY3VzIHRyYXAgYWN0aXZhdGlvblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgdHJ5Rm9jdXMoZmlyc3RGb2N1c05vZGUoKSk7XG4gICAgfSwgMCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBjaGVja0ZvY3VzLCB0cnVlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQ2xpY2ssIHRydWUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGNoZWNrUG9pbnRlckRvd24sIHRydWUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBjaGVja1BvaW50ZXJEb3duLCB0cnVlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgY2hlY2tLZXksIHRydWUpO1xuXG4gICAgcmV0dXJuIHRyYXA7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKCFhY3RpdmUgfHwgbGlzdGVuaW5nRm9jdXNUcmFwICE9PSB0cmFwKSByZXR1cm47XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIGNoZWNrRm9jdXMsIHRydWUpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDbGljaywgdHJ1ZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgY2hlY2tQb2ludGVyRG93biwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGNoZWNrUG9pbnRlckRvd24sIHRydWUpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjaGVja0tleSwgdHJ1ZSk7XG5cbiAgICBsaXN0ZW5pbmdGb2N1c1RyYXAgPSBudWxsO1xuXG4gICAgcmV0dXJuIHRyYXA7XG4gIH1cblxuICBmdW5jdGlvbiBnZXROb2RlRm9yT3B0aW9uKG9wdGlvbk5hbWUpIHtcbiAgICB2YXIgb3B0aW9uVmFsdWUgPSBjb25maWdbb3B0aW9uTmFtZV07XG4gICAgdmFyIG5vZGUgPSBvcHRpb25WYWx1ZTtcbiAgICBpZiAoIW9wdGlvblZhbHVlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRpb25WYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvblZhbHVlKTtcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2AnICsgb3B0aW9uTmFtZSArICdgIHJlZmVycyB0byBubyBrbm93biBub2RlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0aW9uVmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG5vZGUgPSBvcHRpb25WYWx1ZSgpO1xuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYCcgKyBvcHRpb25OYW1lICsgJ2AgZGlkIG5vdCByZXR1cm4gYSBub2RlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlyc3RGb2N1c05vZGUoKSB7XG4gICAgdmFyIG5vZGU7XG4gICAgaWYgKGdldE5vZGVGb3JPcHRpb24oJ2luaXRpYWxGb2N1cycpICE9PSBudWxsKSB7XG4gICAgICBub2RlID0gZ2V0Tm9kZUZvck9wdGlvbignaW5pdGlhbEZvY3VzJyk7XG4gICAgfSBlbHNlIGlmIChjb250YWluZXIuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgIG5vZGUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gdGFiYmFibGVOb2Rlc1swXSB8fCBnZXROb2RlRm9yT3B0aW9uKCdmYWxsYmFja0ZvY3VzJyk7XG4gICAgfVxuXG4gICAgaWYgKCFub2RlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW5cXCd0IGhhdmUgYSBmb2N1cy10cmFwIHdpdGhvdXQgYXQgbGVhc3Qgb25lIGZvY3VzYWJsZSBlbGVtZW50Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICAvLyBUaGlzIG5lZWRzIHRvIGJlIGRvbmUgb24gbW91c2Vkb3duIGFuZCB0b3VjaHN0YXJ0IGluc3RlYWQgb2YgY2xpY2tcbiAgLy8gc28gdGhhdCBpdCBwcmVjZWRlcyB0aGUgZm9jdXMgZXZlbnRcbiAgZnVuY3Rpb24gY2hlY2tQb2ludGVyRG93bihlKSB7XG4gICAgaWYgKGNvbmZpZy5jbGlja091dHNpZGVEZWFjdGl2YXRlcyAmJiAhY29udGFpbmVyLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgZGVhY3RpdmF0ZSh7IHJldHVybkZvY3VzOiBmYWxzZSB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0NsaWNrKGUpIHtcbiAgICBpZiAoY29uZmlnLmNsaWNrT3V0c2lkZURlYWN0aXZhdGVzKSByZXR1cm47XG4gICAgaWYgKGNvbnRhaW5lci5jb250YWlucyhlLnRhcmdldCkpIHJldHVybjtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrRm9jdXMoZSkge1xuICAgIGlmIChjb250YWluZXIuY29udGFpbnMoZS50YXJnZXQpKSByZXR1cm47XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgLy8gQ2hlY2tpbmcgZm9yIGEgYmx1ciBtZXRob2QgaGVyZSByZXNvbHZlcyBhIEZpcmVmb3ggaXNzdWUgKCMxNSlcbiAgICBpZiAodHlwZW9mIGUudGFyZ2V0LmJsdXIgPT09ICdmdW5jdGlvbicpIGUudGFyZ2V0LmJsdXIoKTtcblxuICAgIGlmICh0YWJFdmVudCkge1xuICAgICAgcmVhZGp1c3RGb2N1cyh0YWJFdmVudCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tLZXkoZSkge1xuICAgIGlmIChlLmtleSA9PT0gJ1RhYicgfHwgZS5rZXlDb2RlID09PSA5KSB7XG4gICAgICBoYW5kbGVUYWIoZSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5lc2NhcGVEZWFjdGl2YXRlcyAhPT0gZmFsc2UgJiYgaXNFc2NhcGVFdmVudChlKSkge1xuICAgICAgZGVhY3RpdmF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVRhYihlKSB7XG4gICAgdXBkYXRlVGFiYmFibGVOb2RlcygpO1xuXG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgndGFiaW5kZXgnKSAmJiBOdW1iZXIoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpKSA8IDApIHtcbiAgICAgIHJldHVybiB0YWJFdmVudCA9IGU7XG4gICAgfVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBjdXJyZW50Rm9jdXNJbmRleCA9IHRhYmJhYmxlTm9kZXMuaW5kZXhPZihlLnRhcmdldCk7XG5cbiAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgaWYgKGUudGFyZ2V0ID09PSBmaXJzdFRhYmJhYmxlTm9kZSB8fCB0YWJiYWJsZU5vZGVzLmluZGV4T2YoZS50YXJnZXQpID09PSAtMSkge1xuICAgICAgICByZXR1cm4gdHJ5Rm9jdXMobGFzdFRhYmJhYmxlTm9kZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ5Rm9jdXModGFiYmFibGVOb2Rlc1tjdXJyZW50Rm9jdXNJbmRleCAtIDFdKTtcbiAgICB9XG5cbiAgICBpZiAoZS50YXJnZXQgPT09IGxhc3RUYWJiYWJsZU5vZGUpIHJldHVybiB0cnlGb2N1cyhmaXJzdFRhYmJhYmxlTm9kZSk7XG5cbiAgICB0cnlGb2N1cyh0YWJiYWJsZU5vZGVzW2N1cnJlbnRGb2N1c0luZGV4ICsgMV0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlVGFiYmFibGVOb2RlcygpIHtcbiAgICB0YWJiYWJsZU5vZGVzID0gdGFiYmFibGUoY29udGFpbmVyKTtcbiAgICBmaXJzdFRhYmJhYmxlTm9kZSA9IHRhYmJhYmxlTm9kZXNbMF07XG4gICAgbGFzdFRhYmJhYmxlTm9kZSA9IHRhYmJhYmxlTm9kZXNbdGFiYmFibGVOb2Rlcy5sZW5ndGggLSAxXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRqdXN0Rm9jdXMoZSkge1xuICAgIGlmIChlLnNoaWZ0S2V5KSByZXR1cm4gdHJ5Rm9jdXMobGFzdFRhYmJhYmxlTm9kZSk7XG5cbiAgICB0cnlGb2N1cyhmaXJzdFRhYmJhYmxlTm9kZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNFc2NhcGVFdmVudChlKSB7XG4gIHJldHVybiBlLmtleSA9PT0gJ0VzY2FwZScgfHwgZS5rZXkgPT09ICdFc2MnIHx8IGUua2V5Q29kZSA9PT0gMjc7XG59XG5cbmZ1bmN0aW9uIHRyeUZvY3VzKG5vZGUpIHtcbiAgaWYgKCFub2RlIHx8ICFub2RlLmZvY3VzKSByZXR1cm47XG4gIGlmIChub2RlID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAgcmV0dXJuO1xuXG4gIG5vZGUuZm9jdXMoKTtcbiAgaWYgKG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgbm9kZS5zZWxlY3QoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvY3VzVHJhcDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBjcmVhdGVGb2N1c1RyYXAgZnJvbSAnZm9jdXMtdHJhcCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGb2N1c1RyYXBJbnN0YW5jZShzdXJmYWNlRWwsIGFjY2VwdEJ1dHRvbkVsLCBmb2N1c1RyYXBGYWN0b3J5ID0gY3JlYXRlRm9jdXNUcmFwKSB7XG4gIHJldHVybiBmb2N1c1RyYXBGYWN0b3J5KHN1cmZhY2VFbCwge1xuICAgIGluaXRpYWxGb2N1czogYWNjZXB0QnV0dG9uRWwsXG4gICAgY2xpY2tPdXRzaWRlRGVhY3RpdmF0ZXM6IHRydWUsXG4gIH0pO1xufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBSaXBwbGUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gQ1NTIHZhcmlhYmxlc1xuICogLSBwb3NpdGlvblxuICogLSBkaW1lbnNpb25zXG4gKiAtIHNjcm9sbCBwb3NpdGlvblxuICogLSBldmVudCBoYW5kbGVyc1xuICogLSB1bmJvdW5kZWQsIGFjdGl2ZSBhbmQgZGlzYWJsZWQgc3RhdGVzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENSaXBwbGVBZGFwdGVyIHtcbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1VuYm91bmRlZCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZUFjdGl2ZSgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZURpc2FibGVkKCkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudFRhcmdldH0gdGFyZ2V0ICovXG4gIGNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFyTmFtZVxuICAgKiBAcGFyYW0gez9udW1iZXJ8c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgdXBkYXRlQ3NzVmFyaWFibGUodmFyTmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqIEByZXR1cm4geyFDbGllbnRSZWN0fSAqL1xuICBjb21wdXRlQm91bmRpbmdSZWN0KCkge31cblxuICAvKiogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gKi9cbiAgZ2V0V2luZG93UGFnZU9mZnNldCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgLy8gUmlwcGxlIGlzIGEgc3BlY2lhbCBjYXNlIHdoZXJlIHRoZSBcInJvb3RcIiBjb21wb25lbnQgaXMgcmVhbGx5IGEgXCJtaXhpblwiIG9mIHNvcnRzLFxuICAvLyBnaXZlbiB0aGF0IGl0J3MgYW4gJ3VwZ3JhZGUnIHRvIGFuIGV4aXN0aW5nIGNvbXBvbmVudC4gVGhhdCBiZWluZyBzYWlkIGl0IGlzIHRoZSByb290XG4gIC8vIENTUyBjbGFzcyB0aGF0IGFsbCBvdGhlciBDU1MgY2xhc3NlcyBkZXJpdmUgZnJvbS5cbiAgUk9PVDogJ21kYy1yaXBwbGUtdXBncmFkZWQnLFxuICBVTkJPVU5ERUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS11bmJvdW5kZWQnLFxuICBCR19GT0NVU0VEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tYmFja2dyb3VuZC1mb2N1c2VkJyxcbiAgRkdfQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtYWN0aXZhdGlvbicsXG4gIEZHX0RFQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtZGVhY3RpdmF0aW9uJyxcbn07XG5cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFZBUl9MRUZUOiAnLS1tZGMtcmlwcGxlLWxlZnQnLFxuICBWQVJfVE9QOiAnLS1tZGMtcmlwcGxlLXRvcCcsXG4gIFZBUl9GR19TSVpFOiAnLS1tZGMtcmlwcGxlLWZnLXNpemUnLFxuICBWQVJfRkdfU0NBTEU6ICctLW1kYy1yaXBwbGUtZmctc2NhbGUnLFxuICBWQVJfRkdfVFJBTlNMQVRFX1NUQVJUOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydCcsXG4gIFZBUl9GR19UUkFOU0xBVEVfRU5EOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQnLFxufTtcblxuY29uc3QgbnVtYmVycyA9IHtcbiAgUEFERElORzogMTAsXG4gIElOSVRJQUxfT1JJR0lOX1NDQUxFOiAwLjYsXG4gIERFQUNUSVZBVElPTl9USU1FT1VUX01TOiAyMjUsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLXRyYW5zbGF0ZS1kdXJhdGlvbiAoaS5lLiBhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgRkdfREVBQ1RJVkFUSU9OX01TOiAxNTAsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLWZhZGUtb3V0LWR1cmF0aW9uIChpLmUuIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIFRBUF9ERUxBWV9NUzogMzAwLCAvLyBEZWxheSBiZXR3ZWVuIHRvdWNoIGFuZCBzaW11bGF0ZWQgbW91c2UgZXZlbnRzIG9uIHRvdWNoIGRldmljZXNcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gc3VwcG9ydHNDc3NWYXJpYWJsZXMgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IENTUyBjdXN0b20gdmFyaWFibGUgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gYXBwbHlQYXNzaXZlIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c1Bhc3NpdmVfO1xuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaikge1xuICAvLyBEZXRlY3QgdmVyc2lvbnMgb2YgRWRnZSB3aXRoIGJ1Z2d5IHZhcigpIHN1cHBvcnRcbiAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8xMTQ5NTQ0OC9cbiAgY29uc3QgZG9jdW1lbnQgPSB3aW5kb3dPYmouZG9jdW1lbnQ7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbm9kZS5jbGFzc05hbWUgPSAnbWRjLXJpcHBsZS1zdXJmYWNlLS10ZXN0LWVkZ2UtdmFyLWJ1Zyc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgLy8gVGhlIGJ1ZyBleGlzdHMgaWYgOjpiZWZvcmUgc3R5bGUgZW5kcyB1cCBwcm9wYWdhdGluZyB0byB0aGUgcGFyZW50IGVsZW1lbnQuXG4gIC8vIEFkZGl0aW9uYWxseSwgZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIG51bGwgaW4gaWZyYW1lcyB3aXRoIGRpc3BsYXk6IFwibm9uZVwiIGluIEZpcmVmb3gsXG4gIC8vIGJ1dCBGaXJlZm94IGlzIGtub3duIHRvIHN1cHBvcnQgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzIGNvcnJlY3RseS5cbiAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvd09iai5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBjb25zdCBoYXNQc2V1ZG9WYXJCdWcgPSBjb21wdXRlZFN0eWxlICE9PSBudWxsICYmIGNvbXB1dGVkU3R5bGUuYm9yZGVyVG9wU3R5bGUgPT09ICdzb2xpZCc7XG4gIG5vZGUucmVtb3ZlKCk7XG4gIHJldHVybiBoYXNQc2V1ZG9WYXJCdWc7XG59XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93T2JqLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBsZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNDc3NWYXJpYWJsZXNfID09PSAnYm9vbGVhbicgJiYgIWZvcmNlUmVmcmVzaCkge1xuICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuXG4gIGNvbnN0IHN1cHBvcnRzRnVuY3Rpb25QcmVzZW50ID0gd2luZG93T2JqLkNTUyAmJiB0eXBlb2Ygd2luZG93T2JqLkNTUy5zdXBwb3J0cyA9PT0gJ2Z1bmN0aW9uJztcbiAgaWYgKCFzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgPSB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCctLWNzcy12YXJzJywgJ3llcycpO1xuICAvLyBTZWU6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTQ2NjlcbiAgLy8gU2VlOiBSRUFETUUgc2VjdGlvbiBvbiBTYWZhcmlcbiAgY29uc3Qgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzID0gKFxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJygtLWNzcy12YXJzOiB5ZXMpJykgJiZcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCdjb2xvcicsICcjMDAwMDAwMDAnKVxuICApO1xuXG4gIGlmIChleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIHx8IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cykge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gIWRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKTtcbiAgfSBlbHNlIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKCFmb3JjZVJlZnJlc2gpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG59XG5cbi8vXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXG4gKiBAcGFyYW0geyFXaW5kb3c9fSBnbG9iYWxPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx7cGFzc2l2ZTogYm9vbGVhbn19XG4gKi9cbmZ1bmN0aW9uIGFwcGx5UGFzc2l2ZShnbG9iYWxPYmogPSB3aW5kb3csIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdXBwb3J0c1Bhc3NpdmVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGdsb2JhbE9iai5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge2dldCBwYXNzaXZlKCkge1xuICAgICAgICBpc1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICB9fSk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgICBzdXBwb3J0c1Bhc3NpdmVfID0gaXNTdXBwb3J0ZWQ7XG4gIH1cblxuICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlXyA/IHtwYXNzaXZlOiB0cnVlfSA6IGZhbHNlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gSFRNTEVsZW1lbnRQcm90b3R5cGVcbiAqIEByZXR1cm4geyFBcnJheTxzdHJpbmc+fVxuICovXG5mdW5jdGlvbiBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnRQcm90b3R5cGUpIHtcbiAgcmV0dXJuIFtcbiAgICAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJywgJ21zTWF0Y2hlc1NlbGVjdG9yJywgJ21hdGNoZXMnLFxuICBdLmZpbHRlcigocCkgPT4gcCBpbiBIVE1MRWxlbWVudFByb3RvdHlwZSkucG9wKCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshRXZlbnR9IGV2XG4gKiBAcGFyYW0ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19IHBhZ2VPZmZzZXRcbiAqIEBwYXJhbSB7IUNsaWVudFJlY3R9IGNsaWVudFJlY3RcbiAqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhldiwgcGFnZU9mZnNldCwgY2xpZW50UmVjdCkge1xuICBjb25zdCB7eCwgeX0gPSBwYWdlT2Zmc2V0O1xuICBjb25zdCBkb2N1bWVudFggPSB4ICsgY2xpZW50UmVjdC5sZWZ0O1xuICBjb25zdCBkb2N1bWVudFkgPSB5ICsgY2xpZW50UmVjdC50b3A7XG5cbiAgbGV0IG5vcm1hbGl6ZWRYO1xuICBsZXQgbm9ybWFsaXplZFk7XG4gIC8vIERldGVybWluZSB0b3VjaCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmlwcGxlIGNvbnRhaW5lci5cbiAgaWYgKGV2LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfSBlbHNlIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYucGFnZVkgLSBkb2N1bWVudFk7XG4gIH1cblxuICByZXR1cm4ge3g6IG5vcm1hbGl6ZWRYLCB5OiBub3JtYWxpemVkWX07XG59XG5cbmV4cG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGFwcGx5UGFzc2l2ZSwgZ2V0TWF0Y2hlc1Byb3BlcnR5LCBnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgaXNBY3RpdmF0ZWQ6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBhY3RpdmF0aW9uRXZlbnQ6IEV2ZW50LFxuICogICBpc1Byb2dyYW1tYXRpYzogKGJvb2xlYW58dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IEFjdGl2YXRpb25TdGF0ZVR5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZGVhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBmb2N1czogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBibHVyOiAoc3RyaW5nfHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lckluZm9UeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBkZWFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBmb2N1czogZnVuY3Rpb24oKSxcbiAqICAgYmx1cjogZnVuY3Rpb24oKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVyc1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgeDogbnVtYmVyLFxuICogICB5OiBudW1iZXJcbiAqIH19XG4gKi9cbmxldCBQb2ludFR5cGU7XG5cbi8vIEFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gdGhlIHJvb3QgZWxlbWVudCBvZiBlYWNoIGluc3RhbmNlIGZvciBhY3RpdmF0aW9uXG5jb25zdCBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaHN0YXJ0JywgJ3BvaW50ZXJkb3duJywgJ21vdXNlZG93bicsICdrZXlkb3duJ107XG5cbi8vIERlYWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiBkb2N1bWVudEVsZW1lbnQgd2hlbiBhIHBvaW50ZXItcmVsYXRlZCBkb3duIGV2ZW50IG9jY3Vyc1xuY29uc3QgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoZW5kJywgJ3BvaW50ZXJ1cCcsICdtb3VzZXVwJ107XG5cbi8vIFRyYWNrcyBhY3RpdmF0aW9ucyB0aGF0IGhhdmUgb2NjdXJyZWQgb24gdGhlIGN1cnJlbnQgZnJhbWUsIHRvIGF2b2lkIHNpbXVsdGFuZW91cyBuZXN0ZWQgYWN0aXZhdGlvbnNcbi8qKiBAdHlwZSB7IUFycmF5PCFFdmVudFRhcmdldD59ICovXG5sZXQgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENSaXBwbGVBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDUmlwcGxlRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiAvKiBib29sZWFuIC0gY2FjaGVkICovIHt9LFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAoLyogdGFyZ2V0OiAhRXZlbnRUYXJnZXQgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKC8qIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiAvKiBDbGllbnRSZWN0ICovIHt9LFxuICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4gLyoge3g6IG51bWJlciwgeTogbnVtYmVyfSAqLyB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDUmlwcGxlRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQ2xpZW50UmVjdH0gKi9cbiAgICB0aGlzLmZyYW1lXyA9IC8qKiBAdHlwZSB7IUNsaWVudFJlY3R9ICovICh7d2lkdGg6IDAsIGhlaWdodDogMH0pO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLm1heFJhZGl1c18gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmRlYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmZvY3VzSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUZvY3VzKCk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuYmx1ckhhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVCbHVyKCk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLnJlc2l6ZUhhbmRsZXJfID0gKCkgPT4gdGhpcy5sYXlvdXQoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7e2xlZnQ6IG51bWJlciwgdG9wOm51bWJlcn19ICovXG4gICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ1NjYWxlXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18gPSAoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSB0cnVlO1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHs/RXZlbnR9ICovXG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIGNvbXB1dGUgdGhpcyBwcm9wZXJ0eSBzbyB0aGF0IHdlIGFyZSBub3QgcXVlcnlpbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNsaWVudFxuICAgKiB1bnRpbCB0aGUgcG9pbnQgaW4gdGltZSB3aGVyZSB0aGUgZm91bmRhdGlvbiByZXF1ZXN0cyBpdC4gVGhpcyBwcmV2ZW50cyBzY2VuYXJpb3Mgd2hlcmVcbiAgICogY2xpZW50LXNpZGUgZmVhdHVyZS1kZXRlY3Rpb24gbWF5IGhhcHBlbiB0b28gZWFybHksIHN1Y2ggYXMgd2hlbiBjb21wb25lbnRzIGFyZSByZW5kZXJlZCBvbiB0aGUgc2VydmVyXG4gICAqIGFuZCB0aGVuIGluaXRpYWxpemVkIGF0IG1vdW50IHRpbWUgb24gdGhlIGNsaWVudC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzU3VwcG9ydGVkXygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5icm93c2VyU3VwcG9ydHNDc3NWYXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9XG4gICAqL1xuICBkZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBY3RpdmF0ZWQ6IGZhbHNlLFxuICAgICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IGZhbHNlLFxuICAgICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiBmYWxzZSxcbiAgICAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiBmYWxzZSxcbiAgICAgIGFjdGl2YXRpb25FdmVudDogbnVsbCxcbiAgICAgIGlzUHJvZ3JhbW1hdGljOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqL1xuICBpbml0KCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZF8oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoUk9PVCk7XG4gICAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgICAgLy8gVW5ib3VuZGVkIHJpcHBsZXMgbmVlZCBsYXlvdXQgbG9naWMgYXBwbGllZCBpbW1lZGlhdGVseSB0byBzZXQgY29vcmRpbmF0ZXMgZm9yIGJvdGggc2hhZGUgYW5kIHJpcHBsZVxuICAgICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZF8oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2YXRpb25UaW1lcl8pIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gMDtcbiAgICAgIGNvbnN0IHtGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgfVxuXG4gICAgdGhpcy5kZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoUk9PVCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgICB0aGlzLnJlbW92ZUNzc1ZhcnNfKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW1vdmVDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7c3RyaW5nc30gPSBNRENSaXBwbGVGb3VuZGF0aW9uO1xuICAgIE9iamVjdC5rZXlzKHN0cmluZ3MpLmZvckVhY2goKGspID0+IHtcbiAgICAgIGlmIChrLmluZGV4T2YoJ1ZBUl8nKSA9PT0gMCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKHN0cmluZ3Nba10sIG51bGwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhY3RpdmF0ZV8oZSkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZURpc2FibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEF2b2lkIHJlYWN0aW5nIHRvIGZvbGxvdy1vbiBldmVudHMgZmlyZWQgYnkgdG91Y2ggZGV2aWNlIGFmdGVyIGFuIGFscmVhZHktcHJvY2Vzc2VkIHVzZXIgaW50ZXJhY3Rpb25cbiAgICBjb25zdCBwcmV2aW91c0FjdGl2YXRpb25FdmVudCA9IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfO1xuICAgIGNvbnN0IGlzU2FtZUludGVyYWN0aW9uID0gcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgJiYgZSAmJiBwcmV2aW91c0FjdGl2YXRpb25FdmVudC50eXBlICE9PSBlLnR5cGU7XG4gICAgaWYgKGlzU2FtZUludGVyYWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkID0gdHJ1ZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPSBlID09PSBudWxsO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5hY3RpdmF0aW9uRXZlbnQgPSBlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNBY3RpdmF0ZWRCeVBvaW50ZXIgPSBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPyBmYWxzZSA6IChcbiAgICAgIGUudHlwZSA9PT0gJ21vdXNlZG93bicgfHwgZS50eXBlID09PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAncG9pbnRlcmRvd24nXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc0FjdGl2YXRlZENoaWxkID1cbiAgICAgIGUgJiYgYWN0aXZhdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIGFjdGl2YXRlZFRhcmdldHMuc29tZSgodGFyZ2V0KSA9PiB0aGlzLmFkYXB0ZXJfLmNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSk7XG4gICAgaWYgKGhhc0FjdGl2YXRlZENoaWxkKSB7XG4gICAgICAvLyBJbW1lZGlhdGVseSByZXNldCBhY3RpdmF0aW9uIHN0YXRlLCB3aGlsZSBwcmVzZXJ2aW5nIGxvZ2ljIHRoYXQgcHJldmVudHMgdG91Y2ggZm9sbG93LW9uIGV2ZW50c1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZSkge1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cy5wdXNoKC8qKiBAdHlwZSB7IUV2ZW50VGFyZ2V0fSAqLyAoZS50YXJnZXQpKTtcbiAgICAgIHRoaXMucmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSk7XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBSZXNldCBhcnJheSBvbiBuZXh0IGZyYW1lIGFmdGVyIHRoZSBjdXJyZW50IGV2ZW50IGhhcyBoYWQgYSBjaGFuY2UgdG8gYnViYmxlIHRvIHByZXZlbnQgYW5jZXN0b3IgcmlwcGxlc1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4gICAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSAmJiAoZS5rZXkgPT09ICcgJyB8fCBlLmtleUNvZGUgPT09IDMyKSkge1xuICAgICAgICAvLyBJZiBzcGFjZSB3YXMgcHJlc3NlZCwgdHJ5IGFnYWluIHdpdGhpbiBhbiByQUYgY2FsbCB0byBkZXRlY3QgOmFjdGl2ZSwgYmVjYXVzZSBkaWZmZXJlbnQgVUFzIHJlcG9ydFxuICAgICAgICAvLyBhY3RpdmUgc3RhdGVzIGluY29uc2lzdGVudGx5IHdoZW4gdGhleSdyZSBjYWxsZWQgd2l0aGluIGV2ZW50IGhhbmRsaW5nIGNvZGU6XG4gICAgICAgIC8vIC0gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NjM1OTcxXG4gICAgICAgIC8vIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTI5Mzc0MVxuICAgICAgICAvLyBXZSB0cnkgZmlyc3Qgb3V0c2lkZSByQUYgdG8gc3VwcG9ydCBFZGdlLCB3aGljaCBkb2VzIG5vdCBleGhpYml0IHRoaXMgcHJvYmxlbSwgYnV0IHdpbGwgY3Jhc2ggaWYgYSBDU1NcbiAgICAgICAgLy8gdmFyaWFibGUgaXMgc2V0IHdpdGhpbiBhIHJBRiBjYWxsYmFjayBmb3IgYSBzdWJtaXQgYnV0dG9uIGludGVyYWN0aW9uICgjMjI0MSkuXG4gICAgICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IHRoaXMuY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSk7XG4gICAgICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICAgIC8vIFJlc2V0IGFjdGl2YXRpb24gc3RhdGUgaW1tZWRpYXRlbHkgaWYgZWxlbWVudCB3YXMgbm90IG1hZGUgYWN0aXZlLlxuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpIHtcbiAgICByZXR1cm4gKGUgJiYgZS50eXBlID09PSAna2V5ZG93bicpID8gdGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VBY3RpdmUoKSA6IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5hY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGFuaW1hdGVBY3RpdmF0aW9uXygpIHtcbiAgICBjb25zdCB7VkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgVkFSX0ZHX1RSQU5TTEFURV9FTkR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT04sIEZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtERUFDVElWQVRJT05fVElNRU9VVF9NU30gPSBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnM7XG5cbiAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuXG4gICAgbGV0IHRyYW5zbGF0ZVN0YXJ0ID0gJyc7XG4gICAgbGV0IHRyYW5zbGF0ZUVuZCA9ICcnO1xuXG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIGNvbnN0IHtzdGFydFBvaW50LCBlbmRQb2ludH0gPSB0aGlzLmdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKTtcbiAgICAgIHRyYW5zbGF0ZVN0YXJ0ID0gYCR7c3RhcnRQb2ludC54fXB4LCAke3N0YXJ0UG9pbnQueX1weGA7XG4gICAgICB0cmFuc2xhdGVFbmQgPSBgJHtlbmRQb2ludC54fXB4LCAke2VuZFBvaW50Lnl9cHhgO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgdHJhbnNsYXRlU3RhcnQpO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9FTkQsIHRyYW5zbGF0ZUVuZCk7XG4gICAgLy8gQ2FuY2VsIGFueSBvbmdvaW5nIGFjdGl2YXRpb24vZGVhY3RpdmF0aW9uIGFuaW1hdGlvbnNcbiAgICBjbGVhclRpbWVvdXQodGhpcy5hY3RpdmF0aW9uVGltZXJfKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8pO1xuICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuXG4gICAgLy8gRm9yY2UgbGF5b3V0IGluIG9yZGVyIHRvIHJlLXRyaWdnZXIgdGhlIGFuaW1hdGlvbi5cbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18oKSwgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4ge3tzdGFydFBvaW50OiBQb2ludFR5cGUsIGVuZFBvaW50OiBQb2ludFR5cGV9fVxuICAgKi9cbiAgZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpIHtcbiAgICBjb25zdCB7YWN0aXZhdGlvbkV2ZW50LCB3YXNBY3RpdmF0ZWRCeVBvaW50ZXJ9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuXG4gICAgbGV0IHN0YXJ0UG9pbnQ7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlcikge1xuICAgICAgc3RhcnRQb2ludCA9IGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhcbiAgICAgICAgLyoqIEB0eXBlIHshRXZlbnR9ICovIChhY3RpdmF0aW9uRXZlbnQpLFxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmdldFdpbmRvd1BhZ2VPZmZzZXQoKSwgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICAgIHg6IHRoaXMuZnJhbWVfLndpZHRoIC8gMixcbiAgICAgICAgeTogdGhpcy5mcmFtZV8uaGVpZ2h0IC8gMixcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIENlbnRlciB0aGUgZWxlbWVudCBhcm91bmQgdGhlIHN0YXJ0IHBvaW50LlxuICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICB4OiBzdGFydFBvaW50LnggLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6IHN0YXJ0UG9pbnQueSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICBjb25zdCBlbmRQb2ludCA9IHtcbiAgICAgIHg6ICh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiAodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtzdGFydFBvaW50LCBlbmRQb2ludH07XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCkge1xuICAgIC8vIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBib3RoIHdoZW4gYSBwb2ludGluZyBkZXZpY2UgaXMgcmVsZWFzZWQsIGFuZCB3aGVuIHRoZSBhY3RpdmF0aW9uIGFuaW1hdGlvbiBlbmRzLlxuICAgIC8vIFRoZSBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIHNob3VsZCBvbmx5IHJ1biBhZnRlciBib3RoIG9mIHRob3NlIG9jY3VyLlxuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtoYXNEZWFjdGl2YXRpb25VWFJ1biwgaXNBY3RpdmF0ZWR9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGNvbnN0IGFjdGl2YXRpb25IYXNFbmRlZCA9IGhhc0RlYWN0aXZhdGlvblVYUnVuIHx8ICFpc0FjdGl2YXRlZDtcblxuICAgIGlmIChhY3RpdmF0aW9uSGFzRW5kZWQgJiYgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfKSB7XG4gICAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgfSwgbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKSB7XG4gICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gIH1cblxuICByZXNldEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uYWN0aXZhdGlvbkV2ZW50O1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAvLyBUb3VjaCBkZXZpY2VzIG1heSBmaXJlIGFkZGl0aW9uYWwgZXZlbnRzIGZvciB0aGUgc2FtZSBpbnRlcmFjdGlvbiB3aXRoaW4gYSBzaG9ydCB0aW1lLlxuICAgIC8vIFN0b3JlIHRoZSBwcmV2aW91cyBldmVudCB1bnRpbCBpdCdzIHNhZmUgdG8gYXNzdW1lIHRoYXQgc3Vic2VxdWVudCBldmVudHMgYXJlIGZvciBuZXcgaW50ZXJhY3Rpb25zLlxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsLCBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuVEFQX0RFTEFZX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZGVhY3RpdmF0ZV8oZSkge1xuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaW4gc2NlbmFyaW9zIHN1Y2ggYXMgd2hlbiB5b3UgaGF2ZSBhIGtleXVwIGV2ZW50IHRoYXQgYmx1cnMgdGhlIGVsZW1lbnQuXG4gICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZSA9IC8qKiBAdHlwZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovIChPYmplY3QuYXNzaWduKHt9LCBhY3RpdmF0aW9uU3RhdGUpKTtcblxuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMpIHtcbiAgICAgIGNvbnN0IGV2dE9iamVjdCA9IG51bGw7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhldnRPYmplY3QsIHN0YXRlKSk7XG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXy5oYXNEZWFjdGl2YXRpb25VWFJ1biA9IHRydWU7XG4gICAgICAgIHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwgc3RhdGUpO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50PX0gZXZlbnQgT3B0aW9uYWwgZXZlbnQgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGRlYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5kZWFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgKiBAcGFyYW0geyFBY3RpdmF0aW9uU3RhdGVUeXBlfSBvcHRpb25zXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhbmltYXRlRGVhY3RpdmF0aW9uXyhlLCB7d2FzQWN0aXZhdGVkQnlQb2ludGVyLCB3YXNFbGVtZW50TWFkZUFjdGl2ZX0pIHtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyIHx8IHdhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH1cbiAgfVxuXG4gIGxheW91dCgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXRGcmFtZV8pIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMubGF5b3V0RnJhbWVfKTtcbiAgICB9XG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBsYXlvdXRJbnRlcm5hbF8oKSB7XG4gICAgdGhpcy5mcmFtZV8gPSB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICBjb25zdCBtYXhEaW0gPSBNYXRoLm1heCh0aGlzLmZyYW1lXy5oZWlnaHQsIHRoaXMuZnJhbWVfLndpZHRoKTtcblxuICAgIC8vIFN1cmZhY2UgZGlhbWV0ZXIgaXMgdHJlYXRlZCBkaWZmZXJlbnRseSBmb3IgdW5ib3VuZGVkIHZzLiBib3VuZGVkIHJpcHBsZXMuXG4gICAgLy8gVW5ib3VuZGVkIHJpcHBsZSBkaWFtZXRlciBpcyBjYWxjdWxhdGVkIHNtYWxsZXIgc2luY2UgdGhlIHN1cmZhY2UgaXMgZXhwZWN0ZWQgdG8gYWxyZWFkeSBiZSBwYWRkZWQgYXBwcm9wcmlhdGVseVxuICAgIC8vIHRvIGV4dGVuZCB0aGUgaGl0Ym94LCBhbmQgdGhlIHJpcHBsZSBpcyBleHBlY3RlZCB0byBtZWV0IHRoZSBlZGdlcyBvZiB0aGUgcGFkZGVkIGhpdGJveCAod2hpY2ggaXMgdHlwaWNhbGx5XG4gICAgLy8gc3F1YXJlKS4gQm91bmRlZCByaXBwbGVzLCBvbiB0aGUgb3RoZXIgaGFuZCwgYXJlIGZ1bGx5IGV4cGVjdGVkIHRvIGV4cGFuZCBiZXlvbmQgdGhlIHN1cmZhY2UncyBsb25nZXN0IGRpYW1ldGVyXG4gICAgLy8gKGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGRpYWdvbmFsIHBsdXMgYSBjb25zdGFudCBwYWRkaW5nKSwgYW5kIGFyZSBjbGlwcGVkIGF0IHRoZSBzdXJmYWNlJ3MgYm9yZGVyIHZpYVxuICAgIC8vIGBvdmVyZmxvdzogaGlkZGVuYC5cbiAgICBjb25zdCBnZXRCb3VuZGVkUmFkaXVzID0gKCkgPT4ge1xuICAgICAgY29uc3QgaHlwb3RlbnVzZSA9IE1hdGguc3FydChNYXRoLnBvdyh0aGlzLmZyYW1lXy53aWR0aCwgMikgKyBNYXRoLnBvdyh0aGlzLmZyYW1lXy5oZWlnaHQsIDIpKTtcbiAgICAgIHJldHVybiBoeXBvdGVudXNlICsgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlBBRERJTkc7XG4gICAgfTtcblxuICAgIHRoaXMubWF4UmFkaXVzXyA9IHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSA/IG1heERpbSA6IGdldEJvdW5kZWRSYWRpdXMoKTtcblxuICAgIC8vIFJpcHBsZSBpcyBzaXplZCBhcyBhIGZyYWN0aW9uIG9mIHRoZSBsYXJnZXN0IGRpbWVuc2lvbiBvZiB0aGUgc3VyZmFjZSwgdGhlbiBzY2FsZXMgdXAgdXNpbmcgYSBDU1Mgc2NhbGUgdHJhbnNmb3JtXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSBtYXhEaW0gKiBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuSU5JVElBTF9PUklHSU5fU0NBTEU7XG4gICAgdGhpcy5mZ1NjYWxlXyA9IHRoaXMubWF4UmFkaXVzXyAvIHRoaXMuaW5pdGlhbFNpemVfO1xuXG4gICAgdGhpcy51cGRhdGVMYXlvdXRDc3NWYXJzXygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHVwZGF0ZUxheW91dENzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIFZBUl9GR19TSVpFLCBWQVJfTEVGVCwgVkFSX1RPUCwgVkFSX0ZHX1NDQUxFLFxuICAgIH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TSVpFLCBgJHt0aGlzLmluaXRpYWxTaXplX31weGApO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NDQUxFLCB0aGlzLmZnU2NhbGVfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgICAgbGVmdDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgICAgdG9wOiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0xFRlQsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy5sZWZ0fXB4YCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9UT1AsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy50b3B9cHhgKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB1bmJvdW5kZWQgKi9cbiAgc2V0VW5ib3VuZGVkKHVuYm91bmRlZCkge1xuICAgIGNvbnN0IHtVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmICh1bmJvdW5kZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZvY3VzKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG5cbiAgaGFuZGxlQmx1cigpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT5cbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVGb3VuZGF0aW9uO1xuIiwiaW1wb3J0IE1EQ1JpcHBsZUZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzJ1xyXG5pbXBvcnQge1xyXG4gIHN1cHBvcnRzQ3NzVmFyaWFibGVzLFxyXG4gIGdldE1hdGNoZXNQcm9wZXJ0eSxcclxuICBhcHBseVBhc3NpdmVcclxufSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL3V0aWwnXHJcblxyXG5leHBvcnQgY2xhc3MgUmlwcGxlQmFzZSBleHRlbmRzIE1EQ1JpcHBsZUZvdW5kYXRpb24ge1xyXG4gIHN0YXRpYyBnZXQgTUFUQ0hFUygpIHtcclxuICAgIC8qIGdsb2JhbCBIVE1MRWxlbWVudCAqL1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgUmlwcGxlQmFzZS5fbWF0Y2hlcyB8fFxyXG4gICAgICAoUmlwcGxlQmFzZS5fbWF0Y2hlcyA9IGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudC5wcm90b3R5cGUpKVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzU3VyZmFjZUFjdGl2ZShyZWYpIHtcclxuICAgIHJldHVybiByZWZbUmlwcGxlQmFzZS5NQVRDSEVTXSgnOmFjdGl2ZScpXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcih2bSwgb3B0aW9ucykge1xyXG4gICAgc3VwZXIoXHJcbiAgICAgIE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdm0uJGVsW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2bS5kaXNhYmxlZFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGFkZENsYXNzKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICB2bS4kc2V0KHZtLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgdm0uJGRlbGV0ZSh2bS5jbGFzc2VzLCBjbGFzc05hbWUpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY29udGFpbnNFdmVudFRhcmdldDogdGFyZ2V0ID0+IHZtLiRlbC5jb250YWlucyh0YXJnZXQpLFxyXG4gICAgICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICAgICAgdm0uJGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHZtLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAgIGV2dFR5cGUsXHJcbiAgICAgICAgICAgICAgaGFuZGxlcixcclxuICAgICAgICAgICAgICBhcHBseVBhc3NpdmUoKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcclxuICAgICAgICAgICAgICBoYW5kbGVyLFxyXG4gICAgICAgICAgICAgIGFwcGx5UGFzc2l2ZSgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB2bS4kc2V0KHZtLnN0eWxlcywgdmFyTmFtZSwgdmFsdWUpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdm0uJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4geyB4OiB3aW5kb3cucGFnZVhPZmZzZXQsIHk6IHdpbmRvdy5wYWdlWU9mZnNldCB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcHRpb25zXHJcbiAgICAgIClcclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSaXBwbGVNaXhpbiA9IHtcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2xhc3Nlczoge30sXHJcbiAgICAgIHN0eWxlczoge31cclxuICAgIH1cclxuICB9LFxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXHJcbiAgICB0aGlzLnJpcHBsZS5pbml0KClcclxuICB9LFxyXG4gIGJlZm9yZURlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KClcclxuICB9XHJcbn1cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxjdXN0b20tZWxlbWVudCBcclxuICAgIDp0YWc9XCJ0YWdcIiBcclxuICAgIDpjbGFzc2VzPVwiY2xhc3Nlc1wiXHJcbiAgICA6c3R5bGVzPVwic3R5bGVzXCIgXHJcbiAgICBjbGFzcz1cIm1kYy1yaXBwbGVcIj5cclxuICAgIDxzbG90IC8+XHJcbiAgPC9jdXN0b20tZWxlbWVudD5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IEN1c3RvbUVsZW1lbnRNaXhpbiB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCB7IFJpcHBsZU1peGluIH0gZnJvbSAnLi9tZGMtcmlwcGxlLWJhc2UnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1yaXBwbGUnLFxyXG4gIG1peGluczogW0N1c3RvbUVsZW1lbnRNaXhpbiwgUmlwcGxlTWl4aW5dLFxyXG4gIHByb3BzOiB7XHJcbiAgICB0YWc6IFN0cmluZ1xyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxjdXN0b20tYnV0dG9uIFxyXG4gICAgcmVmPVwicm9vdFwiXHJcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCIgXHJcbiAgICA6c3R5bGU9XCJzdHlsZXNcIlxyXG4gICAgOmhyZWY9XCJocmVmXCIgXHJcbiAgICA6bGluaz1cImxpbmtcIiBcclxuICAgIDpkaXNhYmxlZD1cImRpc2FibGVkXCJcclxuICAgIHYtb249XCJsaXN0ZW5lcnNcIj5cclxuICAgIDxzbG90IC8+XHJcbiAgPC9jdXN0b20tYnV0dG9uPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHsgRGlzcGF0Y2hFdmVudE1peGluLCBDdXN0b21CdXR0b25NaXhpbiB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCB7IFJpcHBsZU1peGluIH0gZnJvbSAnLi4vcmlwcGxlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtYnV0dG9uLWJhc2UnLFxyXG4gIG1peGluczogW0Rpc3BhdGNoRXZlbnRNaXhpbiwgQ3VzdG9tQnV0dG9uTWl4aW4sIFJpcHBsZU1peGluXSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2xhc3Nlczoge30sXHJcbiAgICAgIHN0eWxlczoge31cclxuICAgIH1cclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsIjxzY3JpcHQ+XHJcbmltcG9ydCBtZGNCdXR0b25CYXNlIGZyb20gJy4vbWRjLWJ1dHRvbi1iYXNlLnZ1ZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLWJ1dHRvbicsXHJcbiAgZXh0ZW5kczogbWRjQnV0dG9uQmFzZSxcclxuICBwcm9wczoge1xyXG4gICAgcmFpc2VkOiBCb29sZWFuLFxyXG4gICAgdW5lbGV2YXRlZDogQm9vbGVhbixcclxuICAgIG91dGxpbmVkOiBCb29sZWFuLFxyXG4gICAgZGVuc2U6IEJvb2xlYW5cclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiB7XHJcbiAgICAgICAgJ21kYy1idXR0b24nOiB0cnVlLFxyXG4gICAgICAgICdtZGMtYnV0dG9uLS1yYWlzZWQnOiB0aGlzLnJhaXNlZCxcclxuICAgICAgICAnbWRjLWJ1dHRvbi0tdW5lbGV2YXRlZCc6IHRoaXMudW5lbGV2YXRlZCxcclxuICAgICAgICAnbWRjLWJ1dHRvbi0tb3V0bGluZWQnOiB0aGlzLm91dGxpbmVkLFxyXG4gICAgICAgICdtZGMtYnV0dG9uLS1kZW5zZSc6IHRoaXMuZGVuc2VcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgd2F0Y2g6IHtcclxuICAgIHJhaXNlZCgpIHtcclxuICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgJ21kYy1idXR0b24tLXJhaXNlZCcsIHRoaXMucmFpc2VkKVxyXG4gICAgfSxcclxuICAgIHVuZWxldmF0ZWQoKSB7XHJcbiAgICAgIHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsICdtZGMtYnV0dG9uLS11bmVsZXZhdGVkJywgdGhpcy51bmVsZXZhdGVkKVxyXG4gICAgfSxcclxuICAgIG91dGxpbmVkKCkge1xyXG4gICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCAnbWRjLWJ1dHRvbi0tb3V0bGluZWQnLCB0aGlzLm91dGxpbmVkKVxyXG4gICAgfSxcclxuICAgIGRlbnNlKCkge1xyXG4gICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCAnbWRjLWJ1dHRvbi0tZGVuc2UnLCB0aGlzLmRlbnNlKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxhc2lkZVxyXG4gICAgcmVmPVwicm9vdFwiXHJcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCJcclxuICAgIDpzdHlsZT1cInN0eWxlc1wiXHJcbiAgICA6YXJpYS1sYWJlbGxlZGJ5PVwiJ2xhYmVsJyArIHZtYV91aWRfXCJcclxuICAgIDphcmlhLWRlc2NyaWJlZGJ5PVwiJ2Rlc2MnICsgdm1hX3VpZF9cIlxyXG4gICAgY2xhc3M9XCJtZGMtZGlhbG9nXCJcclxuICAgIHJvbGU9XCJhbGVydGRpYWxvZ1wiXHJcbiAgPlxyXG4gICAgPGRpdlxyXG4gICAgICByZWY9XCJzdXJmYWNlXCJcclxuICAgICAgOmNsYXNzPVwic3VyZmFjZUNsYXNzZXNcIlxyXG4gICAgICBjbGFzcz1cIm1kYy1kaWFsb2dfX3N1cmZhY2VcIj5cclxuICAgICAgPGhlYWRlclxyXG4gICAgICAgIHYtaWY9XCJ0aXRsZVwiXHJcbiAgICAgICAgY2xhc3M9XCJtZGMtZGlhbG9nX19oZWFkZXJcIj5cclxuICAgICAgICA8aDJcclxuICAgICAgICAgIDppZD1cIidsYWJlbCcgKyB2bWFfdWlkX1wiXHJcbiAgICAgICAgICBjbGFzcz1cIm1kYy1kaWFsb2dfX2hlYWRlcl9fdGl0bGVcIj5cclxuICAgICAgICAgIHt7IHRpdGxlIH19XHJcbiAgICAgICAgPC9oMj5cclxuICAgICAgPC9oZWFkZXI+XHJcbiAgICAgIDxzZWN0aW9uXHJcbiAgICAgICAgOmlkPVwiJ2Rlc2MnICsgdm1hX3VpZF9cIlxyXG4gICAgICAgIDpjbGFzcz1cImJvZHlDbGFzc2VzXCJcclxuICAgICAgICBjbGFzcz1cIm1kYy1kaWFsb2dfX2JvZHlcIj5cclxuICAgICAgICA8c2xvdCAvPlxyXG4gICAgICA8L3NlY3Rpb24+XHJcbiAgICAgIDxmb290ZXJcclxuICAgICAgICB2LWlmPVwiYWNjZXB0fHxjYW5jZWxcIlxyXG4gICAgICAgIGNsYXNzPVwibWRjLWRpYWxvZ19fZm9vdGVyXCI+XHJcbiAgICAgICAgPG1kY0J1dHRvblxyXG4gICAgICAgICAgdi1pZj1cImNhbmNlbFwiXHJcbiAgICAgICAgICByZWY9XCJjYW5jZWxcIlxyXG4gICAgICAgICAgOmNsYXNzPVwieydtZGMtZGlhbG9nX19hY3Rpb24nOmFjY2VudH1cIlxyXG4gICAgICAgICAgOnJhaXNlZD1cImNhbmNlbFJhaXNlZFwiXHJcbiAgICAgICAgICBjbGFzcz1cIm1kYy1kaWFsb2dfX2Zvb3Rlcl9fYnV0dG9uIG1kYy1kaWFsb2dfX2Zvb3Rlcl9fYnV0dG9uLS1jYW5jZWxcIlxyXG4gICAgICAgICAgQGNsaWNrPVwib25DYW5jZWxcIlxyXG4gICAgICAgID57eyBjYW5jZWwgfX08L21kY0J1dHRvbj5cclxuICAgICAgICA8bWRjQnV0dG9uXHJcbiAgICAgICAgICByZWY9XCJhY2NlcHRcIlxyXG4gICAgICAgICAgOmNsYXNzPVwieydtZGMtZGlhbG9nX19hY3Rpb24nOmFjY2VudH1cIlxyXG4gICAgICAgICAgOmRpc2FibGVkPVwiYWNjZXB0RGlzYWJsZWRcIlxyXG4gICAgICAgICAgOnJhaXNlZD1cImFjY2VwdFJhaXNlZFwiXHJcbiAgICAgICAgICBjbGFzcz1cIm1kYy1kaWFsb2dfX2Zvb3Rlcl9fYnV0dG9uIG1kYy1kaWFsb2dfX2Zvb3Rlcl9fYnV0dG9uLS1hY2NlcHRcIlxyXG4gICAgICAgICAgQGNsaWNrPVwib25BY2NlcHRcIlxyXG4gICAgICAgID57eyBhY2NlcHQgfX08L21kY0J1dHRvbj5cclxuICAgICAgPC9mb290ZXI+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJtZGMtZGlhbG9nX19iYWNrZHJvcFwiLz5cclxuICA8L2FzaWRlPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IE1EQ0RpYWxvZ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2RpYWxvZy9mb3VuZGF0aW9uJ1xyXG5pbXBvcnQgeyBjcmVhdGVGb2N1c1RyYXBJbnN0YW5jZSB9IGZyb20gJ0BtYXRlcmlhbC9kaWFsb2cvdXRpbCdcclxuaW1wb3J0IHsgbWRjQnV0dG9uIH0gZnJvbSAnLi4vYnV0dG9uJ1xyXG5pbXBvcnQgeyBWTUFVbmlxdWVJZE1peGluIH0gZnJvbSAnLi4vYmFzZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLWRpYWxvZycsXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgbWRjQnV0dG9uOiBtZGNCdXR0b25cclxuICB9LFxyXG4gIG1peGluczogW1ZNQVVuaXF1ZUlkTWl4aW5dLFxyXG4gIG1vZGVsOiB7XHJcbiAgICBwcm9wOiAnb3BlbicsXHJcbiAgICBldmVudDogJ2NoYW5nZSdcclxuICB9LFxyXG4gIHByb3BzOiB7XHJcbiAgICB0aXRsZTogeyB0eXBlOiBTdHJpbmcgfSxcclxuICAgIGFjY2VwdDogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICdPaycgfSxcclxuICAgIGFjY2VwdERpc2FibGVkOiBCb29sZWFuLFxyXG4gICAgYWNjZXB0UmFpc2VkOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlIH0sXHJcbiAgICBjYW5jZWw6IHsgdHlwZTogU3RyaW5nIH0sXHJcbiAgICBjYW5jZWxSYWlzZWQ6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfSxcclxuICAgIGFjY2VudDogQm9vbGVhbixcclxuICAgIHNjcm9sbGFibGU6IEJvb2xlYW4sXHJcbiAgICBvcGVuOiBCb29sZWFuXHJcbiAgfSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2xhc3Nlczoge1xyXG4gICAgICAgICdtZGMtdGhlbWUtLWRhcmsnOiB0aGlzLmRhcmtcclxuICAgICAgfSxcclxuICAgICAgc3R5bGVzOiB7fSxcclxuICAgICAgc3VyZmFjZUNsYXNzZXM6IHt9LFxyXG4gICAgICBib2R5Q2xhc3Nlczoge1xyXG4gICAgICAgICdtZGMtZGlhbG9nX19ib2R5LS1zY3JvbGxhYmxlJzogdGhpcy5zY3JvbGxhYmxlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHdhdGNoOiB7IG9wZW46ICdvbk9wZW5fJyB9LFxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICBpZiAodGhpcy5hY2NlcHQpIHtcclxuICAgICAgdGhpcy5mb2N1c1RyYXAgPSBjcmVhdGVGb2N1c1RyYXBJbnN0YW5jZShcclxuICAgICAgICB0aGlzLiRyZWZzLnN1cmZhY2UsXHJcbiAgICAgICAgdGhpcy4kcmVmcy5hY2NlcHRcclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENEaWFsb2dGb3VuZGF0aW9uKHtcclxuICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpLFxyXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSksXHJcbiAgICAgIGFkZEJvZHlDbGFzczogY2xhc3NOYW1lID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxyXG4gICAgICByZW1vdmVCb2R5Q2xhc3M6IGNsYXNzTmFtZSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcclxuICAgICAgZXZlbnRUYXJnZXRIYXNDbGFzczogKHRhcmdldCwgY2xhc3NOYW1lKSA9PlxyXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcclxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+XHJcbiAgICAgICAgdGhpcy4kcmVmcy5yb290LmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyKSxcclxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT5cclxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIpLFxyXG4gICAgICByZWdpc3RlclN1cmZhY2VJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKmV2dCwgaGFuZGxlciovKSA9PiB7XHJcbiAgICAgICAgLy8gVk1BX0hBQ0s6IGhhbmRsZSBidXR0b24gY2xpY2tzIG91cnNlbHZlc1xyXG4gICAgICAgIC8vIHRoaXMuJHJlZnMuc3VyZmFjZS5hZGRFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlcilcclxuICAgICAgfSxcclxuICAgICAgZGVyZWdpc3RlclN1cmZhY2VJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKmV2dCwgaGFuZGxlciovKSA9PiB7XHJcbiAgICAgICAgLy8gVk1BX0hBQ0s6IGhhbmRsZSBidXR0b24gY2xpY2tzIG91cnNlbHZlc1xyXG4gICAgICAgIC8vIHRoaXMuJHJlZnMuc3VyZmFjZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlcilcclxuICAgICAgfSxcclxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyOiBoYW5kbGVyID0+XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpLFxyXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlcjogaGFuZGxlciA9PlxyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyKSxcclxuICAgICAgbm90aWZ5QWNjZXB0OiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgZmFsc2UpXHJcbiAgICAgICAgdGhpcy4kZW1pdCgnYWNjZXB0JylcclxuICAgICAgfSxcclxuICAgICAgbm90aWZ5Q2FuY2VsOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgZmFsc2UpXHJcbiAgICAgICAgdGhpcy4kZW1pdCgnY2FuY2VsJylcclxuICAgICAgfSxcclxuICAgICAgdHJhcEZvY3VzT25TdXJmYWNlOiAoKSA9PiB0aGlzLmZvY3VzVHJhcCAmJiB0aGlzLmZvY3VzVHJhcC5hY3RpdmF0ZSgpLFxyXG4gICAgICB1bnRyYXBGb2N1c09uU3VyZmFjZTogKCkgPT4gdGhpcy5mb2N1c1RyYXAgJiYgdGhpcy5mb2N1c1RyYXAuZGVhY3RpdmF0ZSgpLFxyXG4gICAgICBpc0RpYWxvZzogZWwgPT4gdGhpcy4kcmVmcy5zdXJmYWNlID09PSBlbFxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXHJcbiAgICB0aGlzLm9wZW4gJiYgdGhpcy5mb3VuZGF0aW9uLm9wZW4oKVxyXG4gIH0sXHJcbiAgYmVmb3JlRGVzdHJveSgpIHtcclxuICAgIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KClcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIG9uT3Blbl8odmFsdWUpIHtcclxuICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uLm9wZW4oKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm91bmRhdGlvbi5jbG9zZSgpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkNhbmNlbCgpIHtcclxuICAgICAgaWYgKHRoaXMuJGxpc3RlbmVyc1sndmFsaWRhdGVDYW5jZWwnXSkge1xyXG4gICAgICAgIHRoaXMuJGVtaXQoJ3ZhbGlkYXRlQ2FuY2VsJywge1xyXG4gICAgICAgICAgY2FuY2VsOiAobm90aWZ5ID0gdHJ1ZSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBpZiBub3RpZnkgPSBmYWxzZSwgdGhlIGRpYWxvZyB3aWxsIGNsb3NlXHJcbiAgICAgICAgICAgIC8vIGJ1dCB0aGUgbm90aWZ5QWNjZXB0IG1ldGhvZCB3aWxsIG5vdCBiZSBjYWxsZWRcclxuICAgICAgICAgICAgLy8gc28gd2UgbmVlZCB0byBub3RpZnkgbGlzdGVuZXJzIHRoZSBvcGVuIHN0YXRlXHJcbiAgICAgICAgICAgIC8vIGlzIGNoYW5naW5nLlxyXG4gICAgICAgICAgICBpZiAoIW5vdGlmeSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZm91bmRhdGlvbi5jYW5jZWwobm90aWZ5KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uLmNhbmNlbCh0cnVlKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25BY2NlcHQoKSB7XHJcbiAgICAgIGlmICh0aGlzLiRsaXN0ZW5lcnNbJ3ZhbGlkYXRlJ10pIHtcclxuICAgICAgICB0aGlzLiRlbWl0KCd2YWxpZGF0ZScsIHtcclxuICAgICAgICAgIGFjY2VwdDogKG5vdGlmeSA9IHRydWUpID0+IHtcclxuICAgICAgICAgICAgLy8gaWYgbm90aWZ5ID0gZmFsc2UsIHRoZSBkaWFsb2cgd2lsbCBjbG9zZVxyXG4gICAgICAgICAgICAvLyBidXQgdGhlIG5vdGlmeUFjY2VwdCBtZXRob2Qgd2lsbCBub3QgYmUgY2FsbGVkXHJcbiAgICAgICAgICAgIC8vIHNvIHdlIG5lZWQgdG8gbm90aWZ5IGxpc3RlbmVycyB0aGUgb3BlbiBzdGF0ZVxyXG4gICAgICAgICAgICAvLyBpcyBjaGFuZ2luZy5cclxuICAgICAgICAgICAgaWYgKCFub3RpZnkpIHtcclxuICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBmYWxzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZvdW5kYXRpb24uYWNjZXB0KG5vdGlmeSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm91bmRhdGlvbi5hY2NlcHQodHJ1ZSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNob3coKSB7XHJcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5vcGVuKClcclxuICAgIH0sXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uLmNsb3NlKClcclxuICAgIH1cclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsImltcG9ydCB7IEJhc2VQbHVnaW4gfSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgbWRjRGlhbG9nIGZyb20gJy4vbWRjLWRpYWxvZy52dWUnXHJcblxyXG5leHBvcnQgeyBtZGNEaWFsb2cgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XHJcbiAgbWRjRGlhbG9nXHJcbn0pXHJcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcclxuaW1wb3J0IHsgYXV0b0luaXQgfSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXHJcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxyXG5cclxuYXV0b0luaXQocGx1Z2luKVxyXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2ZXJzaW9uIiwiaW5zdGFsbCIsImtleSIsImNvbXBvbmVudCIsInZtIiwibmFtZSIsIkN1c3RvbUVsZW1lbnQiLCJmdW5jdGlvbmFsIiwicmVuZGVyIiwiY3JlYXRlRWxlbWVudCIsImNvbnRleHQiLCJwcm9wcyIsImlzIiwidGFnIiwiZGF0YSIsImNoaWxkcmVuIiwiQ3VzdG9tRWxlbWVudE1peGluIiwiQ3VzdG9tQnV0dG9uIiwibGluayIsIk9iamVjdCIsImgiLCJlbGVtZW50IiwiYmFiZWxIZWxwZXJzLmV4dGVuZHMiLCJwYXJlbnQiLCIkcm91dGVyIiwiJHJvb3QiLCIkb3B0aW9ucyIsImF0dHJzIiwicm9sZSIsIm9uIiwiY2xpY2siLCJuYXRpdmVPbiIsImhyZWYiLCJDdXN0b21CdXR0b25NaXhpbiIsIlN0cmluZyIsImRpc2FibGVkIiwiQm9vbGVhbiIsInRvIiwiZXhhY3QiLCJhcHBlbmQiLCJyZXBsYWNlIiwiYWN0aXZlQ2xhc3MiLCJleGFjdEFjdGl2ZUNsYXNzIiwiY29tcHV0ZWQiLCJEaXNwYXRjaEV2ZW50TWl4aW4iLCJldmVudCIsIkFycmF5IiwibWV0aG9kcyIsImRpc3BhdGNoRXZlbnQiLCJldnQiLCIkZW1pdCIsInR5cGUiLCJ0YXJnZXQiLCJldmVudFRhcmdldCIsImFyZ3MiLCJldmVudEFyZ3MiLCJsaXN0ZW5lcnMiLCIkbGlzdGVuZXJzIiwiZSIsInNjb3BlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJWTUFVbmlxdWVJZE1peGluIiwiYmVmb3JlQ3JlYXRlIiwidm1hX3VpZF8iLCJfdWlkIiwiTURDRm91bmRhdGlvbiIsImFkYXB0ZXIiLCJhZGFwdGVyXyIsIk1EQ0NvbXBvbmVudCIsInJvb3QiLCJmb3VuZGF0aW9uIiwidW5kZWZpbmVkIiwicm9vdF8iLCJpbml0aWFsaXplIiwiZm91bmRhdGlvbl8iLCJnZXREZWZhdWx0Rm91bmRhdGlvbiIsImluaXQiLCJpbml0aWFsU3luY1dpdGhET00iLCJFcnJvciIsImRlc3Ryb3kiLCJldnRUeXBlIiwiaGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZ0RGF0YSIsInNob3VsZEJ1YmJsZSIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiYnViYmxlcyIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJjc3NDbGFzc2VzIiwiUk9PVCIsIk9QRU4iLCJBTklNQVRJTkciLCJCQUNLRFJPUCIsIlNDUk9MTF9MT0NLIiwiQUNDRVBUX0JUTiIsIkNBTkNFTF9CVE4iLCJzdHJpbmdzIiwiT1BFTl9ESUFMT0dfU0VMRUNUT1IiLCJESUFMT0dfU1VSRkFDRV9TRUxFQ1RPUiIsIkFDQ0VQVF9TRUxFQ1RPUiIsIkFDQ0VQVF9FVkVOVCIsIkNBTkNFTF9FVkVOVCIsIm51bWJlcnMiLCJESUFMT0dfQU5JTUFUSU9OX1RJTUVfTVMiLCJNRENEaWFsb2dGb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZEJvZHlDbGFzcyIsInJlbW92ZUJvZHlDbGFzcyIsImV2ZW50VGFyZ2V0SGFzQ2xhc3MiLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclN1cmZhY2VJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyU3VyZmFjZUludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlciIsImRlcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyIiwibm90aWZ5QWNjZXB0Iiwibm90aWZ5Q2FuY2VsIiwidHJhcEZvY3VzT25TdXJmYWNlIiwidW50cmFwRm9jdXNPblN1cmZhY2UiLCJpc0RpYWxvZyIsImRlZmF1bHRBZGFwdGVyIiwiaXNPcGVuXyIsImNvbXBvbmVudENsaWNrSGFuZGxlcl8iLCJjYW5jZWwiLCJkaWFsb2dDbGlja0hhbmRsZXJfIiwiaGFuZGxlRGlhbG9nQ2xpY2tfIiwiZG9jdW1lbnRLZXlkb3duSGFuZGxlcl8iLCJrZXlDb2RlIiwidGltZXJJZF8iLCJhbmltYXRpb25UaW1lckVuZF8iLCJoYW5kbGVBbmltYXRpb25UaW1lckVuZF8iLCJjbG9zZSIsImNsZWFyVGltZW91dCIsImRpc2FibGVTY3JvbGxfIiwic2V0VGltZW91dCIsImVuYWJsZVNjcm9sbF8iLCJzaG91bGROb3RpZnkiLCJhY2NlcHQiLCJtb2R1bGUiLCJlbCIsIm9wdGlvbnMiLCJlbGVtZW50RG9jdW1lbnQiLCJvd25lckRvY3VtZW50IiwiYmFzaWNUYWJiYWJsZXMiLCJvcmRlcmVkVGFiYmFibGVzIiwiaXNVbmF2YWlsYWJsZSIsImNyZWF0ZUlzVW5hdmFpbGFibGUiLCJjYW5kaWRhdGVTZWxlY3RvcnMiLCJjYW5kaWRhdGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImpvaW4iLCJpbmNsdWRlQ29udGFpbmVyIiwibWF0Y2hlcyIsIkVsZW1lbnQiLCJwcm90b3R5cGUiLCJtc01hdGNoZXNTZWxlY3RvciIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsInNvbWUiLCJjYW5kaWRhdGVTZWxlY3RvciIsImNhbGwiLCJzbGljZSIsImFwcGx5IiwidW5zaGlmdCIsImNhbmRpZGF0ZSIsImNhbmRpZGF0ZUluZGV4QXR0ciIsImNhbmRpZGF0ZUluZGV4IiwiaSIsImwiLCJsZW5ndGgiLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsImlzTmFOIiwidGFiSW5kZXgiLCJ0YWdOYW1lIiwicHVzaCIsInRhYmJhYmxlTm9kZXMiLCJzb3J0IiwiYSIsImIiLCJpbmRleCIsIm1hcCIsIm5vZGUiLCJpc09mZkNhY2hlIiwiaXNPZmYiLCJub2RlQ29tcHV0ZWRTdHlsZSIsImRvY3VtZW50RWxlbWVudCIsImRlZmF1bHRWaWV3IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInJlc3VsdCIsImRpc3BsYXkiLCJwYXJlbnROb2RlIiwiY29tcHV0ZWRTdHlsZSIsInZpc2liaWxpdHkiLCJsaXN0ZW5pbmdGb2N1c1RyYXAiLCJmb2N1c1RyYXAiLCJ1c2VyT3B0aW9ucyIsImZpcnN0VGFiYmFibGVOb2RlIiwibGFzdFRhYmJhYmxlTm9kZSIsIm5vZGVGb2N1c2VkQmVmb3JlQWN0aXZhdGlvbiIsImFjdGl2ZSIsInBhdXNlZCIsInRhYkV2ZW50IiwiY29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsImNvbmZpZyIsInJldHVybkZvY3VzT25EZWFjdGl2YXRlIiwiZXNjYXBlRGVhY3RpdmF0ZXMiLCJ0cmFwIiwiYWN0aXZhdGUiLCJkZWFjdGl2YXRlIiwicGF1c2UiLCJ1bnBhdXNlIiwiYWN0aXZhdGVPcHRpb25zIiwiZGVmYXVsdGVkQWN0aXZhdGVPcHRpb25zIiwib25BY3RpdmF0ZSIsImFjdGl2ZUVsZW1lbnQiLCJkZWFjdGl2YXRlT3B0aW9ucyIsImRlZmF1bHRlZERlYWN0aXZhdGVPcHRpb25zIiwicmV0dXJuRm9jdXMiLCJvbkRlYWN0aXZhdGUiLCJhZGRMaXN0ZW5lcnMiLCJmaXJzdEZvY3VzTm9kZSIsImNoZWNrRm9jdXMiLCJjaGVja0NsaWNrIiwiY2hlY2tQb2ludGVyRG93biIsImNoZWNrS2V5IiwicmVtb3ZlTGlzdGVuZXJzIiwiZ2V0Tm9kZUZvck9wdGlvbiIsIm9wdGlvbk5hbWUiLCJvcHRpb25WYWx1ZSIsImNvbnRhaW5zIiwiY2xpY2tPdXRzaWRlRGVhY3RpdmF0ZXMiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsImJsdXIiLCJpc0VzY2FwZUV2ZW50IiwiaGFuZGxlVGFiIiwiaGFzQXR0cmlidXRlIiwiTnVtYmVyIiwiY3VycmVudEZvY3VzSW5kZXgiLCJpbmRleE9mIiwic2hpZnRLZXkiLCJ0cnlGb2N1cyIsInVwZGF0ZVRhYmJhYmxlTm9kZXMiLCJ0YWJiYWJsZSIsInJlYWRqdXN0Rm9jdXMiLCJmb2N1cyIsInRvTG93ZXJDYXNlIiwic2VsZWN0IiwiY3JlYXRlRm9jdXNUcmFwSW5zdGFuY2UiLCJzdXJmYWNlRWwiLCJhY2NlcHRCdXR0b25FbCIsImZvY3VzVHJhcEZhY3RvcnkiLCJjcmVhdGVGb2N1c1RyYXAiLCJpbml0aWFsRm9jdXMiLCJNRENSaXBwbGVBZGFwdGVyIiwiY2xhc3NOYW1lIiwidmFyTmFtZSIsInZhbHVlIiwiVU5CT1VOREVEIiwiQkdfRk9DVVNFRCIsIkZHX0FDVElWQVRJT04iLCJGR19ERUFDVElWQVRJT04iLCJWQVJfTEVGVCIsIlZBUl9UT1AiLCJWQVJfRkdfU0laRSIsIlZBUl9GR19TQ0FMRSIsIlZBUl9GR19UUkFOU0xBVEVfU1RBUlQiLCJWQVJfRkdfVFJBTlNMQVRFX0VORCIsIlBBRERJTkciLCJJTklUSUFMX09SSUdJTl9TQ0FMRSIsIkRFQUNUSVZBVElPTl9USU1FT1VUX01TIiwiRkdfREVBQ1RJVkFUSU9OX01TIiwiVEFQX0RFTEFZX01TIiwic3VwcG9ydHNDc3NWYXJpYWJsZXNfIiwic3VwcG9ydHNQYXNzaXZlXyIsImRldGVjdEVkZ2VQc2V1ZG9WYXJCdWciLCJ3aW5kb3dPYmoiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJoYXNQc2V1ZG9WYXJCdWciLCJib3JkZXJUb3BTdHlsZSIsInJlbW92ZSIsInN1cHBvcnRzQ3NzVmFyaWFibGVzIiwiZm9yY2VSZWZyZXNoIiwic3VwcG9ydHNGdW5jdGlvblByZXNlbnQiLCJDU1MiLCJzdXBwb3J0cyIsImV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMiLCJ3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMiLCJhcHBseVBhc3NpdmUiLCJnbG9iYWxPYmoiLCJpc1N1cHBvcnRlZCIsInBhc3NpdmUiLCJnZXRNYXRjaGVzUHJvcGVydHkiLCJIVE1MRWxlbWVudFByb3RvdHlwZSIsImZpbHRlciIsInAiLCJwb3AiLCJnZXROb3JtYWxpemVkRXZlbnRDb29yZHMiLCJldiIsInBhZ2VPZmZzZXQiLCJjbGllbnRSZWN0IiwieCIsInkiLCJkb2N1bWVudFgiLCJsZWZ0IiwiZG9jdW1lbnRZIiwidG9wIiwibm9ybWFsaXplZFgiLCJub3JtYWxpemVkWSIsImNoYW5nZWRUb3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsIkFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsImFjdGl2YXRlZFRhcmdldHMiLCJNRENSaXBwbGVGb3VuZGF0aW9uIiwiYnJvd3NlclN1cHBvcnRzQ3NzVmFycyIsImlzVW5ib3VuZGVkIiwiaXNTdXJmYWNlQWN0aXZlIiwiaXNTdXJmYWNlRGlzYWJsZWQiLCJjb250YWluc0V2ZW50VGFyZ2V0IiwicmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyUmVzaXplSGFuZGxlciIsImRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwidXBkYXRlQ3NzVmFyaWFibGUiLCJjb21wdXRlQm91bmRpbmdSZWN0IiwiZ2V0V2luZG93UGFnZU9mZnNldCIsImxheW91dEZyYW1lXyIsImZyYW1lXyIsIndpZHRoIiwiaGVpZ2h0IiwiYWN0aXZhdGlvblN0YXRlXyIsImRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfIiwiaW5pdGlhbFNpemVfIiwibWF4UmFkaXVzXyIsImFjdGl2YXRlSGFuZGxlcl8iLCJhY3RpdmF0ZV8iLCJkZWFjdGl2YXRlSGFuZGxlcl8iLCJkZWFjdGl2YXRlXyIsImZvY3VzSGFuZGxlcl8iLCJoYW5kbGVGb2N1cyIsImJsdXJIYW5kbGVyXyIsImhhbmRsZUJsdXIiLCJyZXNpemVIYW5kbGVyXyIsImxheW91dCIsInVuYm91bmRlZENvb3Jkc18iLCJmZ1NjYWxlXyIsImFjdGl2YXRpb25UaW1lcl8iLCJmZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8iLCJhY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfIiwiYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfIiwicnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfIiwiaXNBY3RpdmF0ZWQiLCJoYXNEZWFjdGl2YXRpb25VWFJ1biIsIndhc0FjdGl2YXRlZEJ5UG9pbnRlciIsIndhc0VsZW1lbnRNYWRlQWN0aXZlIiwiYWN0aXZhdGlvbkV2ZW50IiwiaXNQcm9ncmFtbWF0aWMiLCJpc1N1cHBvcnRlZF8iLCJyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJsYXlvdXRJbnRlcm5hbF8iLCJkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsImRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJyZW1vdmVDc3NWYXJzXyIsImZvckVhY2giLCJrZXlzIiwiayIsImFjdGl2YXRpb25TdGF0ZSIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50IiwiaXNTYW1lSW50ZXJhY3Rpb24iLCJoYXNBY3RpdmF0ZWRDaGlsZCIsInJlc2V0QWN0aXZhdGlvblN0YXRlXyIsInJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwiY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8iLCJhbmltYXRlQWN0aXZhdGlvbl8iLCJ0cmFuc2xhdGVTdGFydCIsInRyYW5zbGF0ZUVuZCIsImdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18iLCJzdGFydFBvaW50IiwiZW5kUG9pbnQiLCJybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18iLCJhY3RpdmF0aW9uSGFzRW5kZWQiLCJzdGF0ZSIsImV2dE9iamVjdCIsImFuaW1hdGVEZWFjdGl2YXRpb25fIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJtYXhEaW0iLCJtYXgiLCJnZXRCb3VuZGVkUmFkaXVzIiwiaHlwb3RlbnVzZSIsInNxcnQiLCJwb3ciLCJ1cGRhdGVMYXlvdXRDc3NWYXJzXyIsInJvdW5kIiwidW5ib3VuZGVkIiwiUmlwcGxlQmFzZSIsInJlZiIsIk1BVENIRVMiLCJfbWF0Y2hlcyIsIkhUTUxFbGVtZW50IiwiJGVsIiwiJHNldCIsImNsYXNzZXMiLCIkZGVsZXRlIiwic3R5bGVzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGFnZVhPZmZzZXQiLCJwYWdlWU9mZnNldCIsIlJpcHBsZU1peGluIiwibW91bnRlZCIsInJpcHBsZSIsImJlZm9yZURlc3Ryb3kiLCJtZGNEaWFsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBTyxTQUFTQSxRQUFULENBQWtCQyxNQUFsQixFQUEwQjtJQUMvQjtJQUNBLE1BQUlDLE9BQU8sSUFBWDtJQUNBLE1BQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztJQUNqQ0QsV0FBT0MsT0FBT0MsR0FBZDtJQUNELEdBRkQsTUFFTyxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7SUFDeEM7SUFDQUgsV0FBT0csT0FBT0QsR0FBZDtJQUNEO0lBQ0QsTUFBSUYsSUFBSixFQUFVO0lBQ1JBLFNBQUtJLEdBQUwsQ0FBU0wsTUFBVDtJQUNEO0lBQ0Y7O0lDWk0sU0FBU00sVUFBVCxDQUFvQkMsVUFBcEIsRUFBZ0M7SUFDckMsU0FBTztJQUNMQyxhQUFTLFFBREo7SUFFTEMsYUFBUyxxQkFBTTtJQUNiLFdBQUssSUFBSUMsR0FBVCxJQUFnQkgsVUFBaEIsRUFBNEI7SUFDMUIsWUFBSUksWUFBWUosV0FBV0csR0FBWCxDQUFoQjtJQUNBRSxXQUFHRCxTQUFILENBQWFBLFVBQVVFLElBQXZCLEVBQTZCRixTQUE3QjtJQUNEO0lBQ0YsS0FQSTtJQVFMSjtJQVJLLEdBQVA7SUFVRDs7SUNYTSxJQUFNTyxnQkFBZ0I7SUFDM0JDLGNBQVksSUFEZTtJQUUzQkMsUUFGMkIsa0JBRXBCQyxhQUZvQixFQUVMQyxPQUZLLEVBRUk7SUFDN0IsV0FBT0QsY0FDTEMsUUFBUUMsS0FBUixDQUFjQyxFQUFkLElBQW9CRixRQUFRQyxLQUFSLENBQWNFLEdBQWxDLElBQXlDLEtBRHBDLEVBRUxILFFBQVFJLElBRkgsRUFHTEosUUFBUUssUUFISCxDQUFQO0lBS0Q7SUFSMEIsQ0FBdEI7O0FBV1AsSUFBTyxJQUFNQyxxQkFBcUI7SUFDaENqQixjQUFZO0lBQ1ZPO0lBRFU7SUFEb0IsQ0FBM0I7Ozs7Ozs7Ozs7Ozs7Ozs7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
