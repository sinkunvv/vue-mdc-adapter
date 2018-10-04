/**
* @module vue-mdc-adapterdrawer 0.18.2
* @exports VueMDCDrawer
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCDrawer = factory());
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

    var get = function get(object, property, receiver) {
      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);

      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);

        if (parent === null) {
          return undefined;
        } else {
          return get(parent, property, receiver);
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;

        if (getter === undefined) {
          return undefined;
        }

        return getter.call(receiver);
      }
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

    var script = {
      name: 'mdc-permanent-drawer',
      props: {
        'toolbar-spacer': Boolean
      }
    };

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("nav", {
        staticClass: "mdc-permanent-drawer mdc-drawer--permanent mdc-typography"
      }, [_c("nav", { staticClass: "mdc-drawer__content" }, [_vm.toolbarSpacer ? _c("div", { staticClass: "mdc-drawer__toolbar-spacer" }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\drawer\\mdc-permanent-drawer.vue";

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

    var mdcPermanentDrawer = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

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

    var FOCUSABLE_ELEMENTS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' + 'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';

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

    var MDCSlidableDrawerFoundation = function (_MDCFoundation) {
      inherits(MDCSlidableDrawerFoundation, _MDCFoundation);
      createClass(MDCSlidableDrawerFoundation, null, [{
        key: 'defaultAdapter',
        get: function get$$1() {
          return {
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            hasClass: function hasClass() /* className: string */{},
            hasNecessaryDom: function hasNecessaryDom() {
              return (/* boolean */false
              );
            },
            registerInteractionHandler: function registerInteractionHandler() /* evt: string, handler: EventListener */{},
            deregisterInteractionHandler: function deregisterInteractionHandler() /* evt: string, handler: EventListener */{},
            registerDrawerInteractionHandler: function registerDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
            deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
            registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
            deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{},
            registerDocumentKeydownHandler: function registerDocumentKeydownHandler() /* handler: EventListener */{},
            deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler() /* handler: EventListener */{},
            setTranslateX: function setTranslateX() /* value: number | null */{},
            getFocusableElements: function getFocusableElements() /* NodeList */{},
            saveElementTabState: function saveElementTabState() /* el: Element */{},
            restoreElementTabState: function restoreElementTabState() /* el: Element */{},
            makeElementUntabbable: function makeElementUntabbable() /* el: Element */{},
            notifyOpen: function notifyOpen() {},
            notifyClose: function notifyClose() {},
            isRtl: function isRtl() {
              return (/* boolean */false
              );
            },
            getDrawerWidth: function getDrawerWidth() {
              return (/* number */0
              );
            }
          };
        }
      }]);

      function MDCSlidableDrawerFoundation(adapter, rootCssClass, animatingCssClass, openCssClass) {
        classCallCheck(this, MDCSlidableDrawerFoundation);

        var _this = possibleConstructorReturn(this, (MDCSlidableDrawerFoundation.__proto__ || Object.getPrototypeOf(MDCSlidableDrawerFoundation)).call(this, _extends(MDCSlidableDrawerFoundation.defaultAdapter, adapter)));

        _this.rootCssClass_ = rootCssClass;
        _this.animatingCssClass_ = animatingCssClass;
        _this.openCssClass_ = openCssClass;

        _this.transitionEndHandler_ = function (evt) {
          return _this.handleTransitionEnd_(evt);
        };

        _this.inert_ = false;

        _this.componentTouchStartHandler_ = function (evt) {
          return _this.handleTouchStart_(evt);
        };
        _this.componentTouchMoveHandler_ = function (evt) {
          return _this.handleTouchMove_(evt);
        };
        _this.componentTouchEndHandler_ = function (evt) {
          return _this.handleTouchEnd_(evt);
        };
        _this.documentKeydownHandler_ = function (evt) {
          if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
            _this.close();
          }
        };
        return _this;
      }

      createClass(MDCSlidableDrawerFoundation, [{
        key: 'init',
        value: function init() {
          var ROOT = this.rootCssClass_;
          var OPEN = this.openCssClass_;

          if (!this.adapter_.hasClass(ROOT)) {
            throw new Error(ROOT + ' class required in root element.');
          }

          if (!this.adapter_.hasNecessaryDom()) {
            throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
          }

          if (this.adapter_.hasClass(OPEN)) {
            this.isOpen_ = true;
          } else {
            this.detabinate_();
            this.isOpen_ = false;
          }

          this.adapter_.registerDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
          this.adapter_.registerInteractionHandler('touchmove', this.componentTouchMoveHandler_);
          this.adapter_.registerInteractionHandler('touchend', this.componentTouchEndHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.adapter_.deregisterDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
          this.adapter_.deregisterInteractionHandler('touchmove', this.componentTouchMoveHandler_);
          this.adapter_.deregisterInteractionHandler('touchend', this.componentTouchEndHandler_);
          // Deregister the document keydown handler just in case the component is destroyed while the menu is open.
          this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
        }
      }, {
        key: 'open',
        value: function open() {
          this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
          this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
          this.adapter_.addClass(this.animatingCssClass_);
          this.adapter_.addClass(this.openCssClass_);
          this.retabinate_();
          // Debounce multiple calls
          if (!this.isOpen_) {
            this.adapter_.notifyOpen();
          }
          this.isOpen_ = true;
        }
      }, {
        key: 'close',
        value: function close() {
          this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
          this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
          this.adapter_.addClass(this.animatingCssClass_);
          this.adapter_.removeClass(this.openCssClass_);
          this.detabinate_();
          // Debounce multiple calls
          if (this.isOpen_) {
            this.adapter_.notifyClose();
          }
          this.isOpen_ = false;
        }
      }, {
        key: 'isOpen',
        value: function isOpen() {
          return this.isOpen_;
        }

        /**
         *  Render all children of the drawer inert when it's closed.
         */

      }, {
        key: 'detabinate_',
        value: function detabinate_() {
          if (this.inert_) {
            return;
          }

          var elements = this.adapter_.getFocusableElements();
          if (elements) {
            for (var i = 0; i < elements.length; i++) {
              this.adapter_.saveElementTabState(elements[i]);
              this.adapter_.makeElementUntabbable(elements[i]);
            }
          }

          this.inert_ = true;
        }

        /**
         *  Make all children of the drawer tabbable again when it's open.
         */

      }, {
        key: 'retabinate_',
        value: function retabinate_() {
          if (!this.inert_) {
            return;
          }

          var elements = this.adapter_.getFocusableElements();
          if (elements) {
            for (var i = 0; i < elements.length; i++) {
              this.adapter_.restoreElementTabState(elements[i]);
            }
          }

          this.inert_ = false;
        }
      }, {
        key: 'handleTouchStart_',
        value: function handleTouchStart_(evt) {
          if (!this.adapter_.hasClass(this.openCssClass_)) {
            return;
          }
          if (evt.pointerType && evt.pointerType !== 'touch') {
            return;
          }

          this.direction_ = this.adapter_.isRtl() ? -1 : 1;
          this.drawerWidth_ = this.adapter_.getDrawerWidth();
          this.startX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
          this.currentX_ = this.startX_;

          this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
        }
      }, {
        key: 'handleTouchMove_',
        value: function handleTouchMove_(evt) {
          if (evt.pointerType && evt.pointerType !== 'touch') {
            return;
          }

          this.currentX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
        }
      }, {
        key: 'handleTouchEnd_',
        value: function handleTouchEnd_(evt) {
          if (evt.pointerType && evt.pointerType !== 'touch') {
            return;
          }

          this.prepareForTouchEnd_();

          // Did the user close the drawer by more than 50%?
          if (Math.abs(this.newPosition_ / this.drawerWidth_) >= 0.5) {
            this.close();
          } else {
            // Triggering an open here means we'll get a nice animation back to the fully open state.
            this.open();
          }
        }
      }, {
        key: 'prepareForTouchEnd_',
        value: function prepareForTouchEnd_() {
          cancelAnimationFrame(this.updateRaf_);
          this.adapter_.setTranslateX(null);
        }
      }, {
        key: 'updateDrawer_',
        value: function updateDrawer_() {
          this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
          this.adapter_.setTranslateX(this.newPosition_);
        }
      }, {
        key: 'isRootTransitioningEventTarget_',
        value: function isRootTransitioningEventTarget_() {
          // Classes extending MDCSlidableDrawerFoundation should implement this method to return true or false
          // if the event target is the root event target currently transitioning.
          return false;
        }
      }, {
        key: 'handleTransitionEnd_',
        value: function handleTransitionEnd_(evt) {
          if (this.isRootTransitioningEventTarget_(evt.target)) {
            this.adapter_.removeClass(this.animatingCssClass_);
            this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
          }
        }
      }, {
        key: 'newPosition_',
        get: function get$$1() {
          var newPos = null;

          if (this.direction_ === 1) {
            newPos = Math.min(0, this.currentX_ - this.startX_);
          } else {
            newPos = Math.max(0, this.currentX_ - this.startX_);
          }

          return newPos;
        }
      }]);
      return MDCSlidableDrawerFoundation;
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
      ROOT: 'mdc-drawer--persistent',
      OPEN: 'mdc-drawer--open',
      ANIMATING: 'mdc-drawer--animating'
    };

    var strings = {
      DRAWER_SELECTOR: '.mdc-drawer--persistent .mdc-drawer__drawer',
      FOCUSABLE_ELEMENTS: FOCUSABLE_ELEMENTS,
      OPEN_EVENT: 'MDCPersistentDrawer:open',
      CLOSE_EVENT: 'MDCPersistentDrawer:close'
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

    var MDCPersistentDrawerFoundation = function (_MDCSlidableDrawerFou) {
      inherits(MDCPersistentDrawerFoundation, _MDCSlidableDrawerFou);
      createClass(MDCPersistentDrawerFoundation, null, [{
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
          return _extends(MDCSlidableDrawerFoundation.defaultAdapter, {
            isDrawer: function isDrawer() {
              return false;
            }
          });
        }
      }]);

      function MDCPersistentDrawerFoundation(adapter) {
        classCallCheck(this, MDCPersistentDrawerFoundation);
        return possibleConstructorReturn(this, (MDCPersistentDrawerFoundation.__proto__ || Object.getPrototypeOf(MDCPersistentDrawerFoundation)).call(this, _extends(MDCPersistentDrawerFoundation.defaultAdapter, adapter), MDCPersistentDrawerFoundation.cssClasses.ROOT, MDCPersistentDrawerFoundation.cssClasses.ANIMATING, MDCPersistentDrawerFoundation.cssClasses.OPEN));
      }

      createClass(MDCPersistentDrawerFoundation, [{
        key: 'isRootTransitioningEventTarget_',
        value: function isRootTransitioningEventTarget_(el) {
          return this.adapter_.isDrawer(el);
        }
      }]);
      return MDCPersistentDrawerFoundation;
    }(MDCSlidableDrawerFoundation);

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

    var TAB_DATA = 'data-mdc-tabindex';
    var TAB_DATA_HANDLED = 'data-mdc-tabindex-handled';

    var storedTransformPropertyName_ = void 0;
    var supportsPassive_$1 = void 0;

    // Remap touch events to pointer events, if the browser doesn't support touch events.
    function remapEvent(eventName) {
      var globalObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

      if (!('ontouchstart' in globalObj.document)) {
        switch (eventName) {
          case 'touchstart':
            return 'pointerdown';
          case 'touchmove':
            return 'pointermove';
          case 'touchend':
            return 'pointerup';
          default:
            return eventName;
        }
      }

      return eventName;
    }

    // Choose the correct transform property to use on the current browser.
    function getTransformPropertyName() {
      var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
      var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (storedTransformPropertyName_ === undefined || forceRefresh) {
        var el = globalObj.document.createElement('div');
        var transformPropertyName = 'transform' in el.style ? 'transform' : '-webkit-transform';
        storedTransformPropertyName_ = transformPropertyName;
      }

      return storedTransformPropertyName_;
    }

    // Determine whether the current browser supports CSS properties.
    function supportsCssCustomProperties() {
      var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

      if ('CSS' in globalObj) {
        return globalObj.CSS.supports('(--color: red)');
      }
      return false;
    }

    // Determine whether the current browser supports passive event listeners, and if so, use them.
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

    // Save the tab state for an element.
    function saveElementTabState(el) {
      if (el.hasAttribute('tabindex')) {
        el.setAttribute(TAB_DATA, el.getAttribute('tabindex'));
      }
      el.setAttribute(TAB_DATA_HANDLED, true);
    }

    // Restore the tab state for an element, if it was saved.
    function restoreElementTabState(el) {
      // Only modify elements we've already handled, in case anything was dynamically added since we saved state.
      if (el.hasAttribute(TAB_DATA_HANDLED)) {
        if (el.hasAttribute(TAB_DATA)) {
          el.setAttribute('tabindex', el.getAttribute(TAB_DATA));
          el.removeAttribute(TAB_DATA);
        } else {
          el.removeAttribute('tabindex');
        }
        el.removeAttribute(TAB_DATA_HANDLED);
      }
    }

    //

    var script$1 = {
      name: 'mdc-persistent-drawer',
      model: {
        prop: 'open',
        event: 'change'
      },
      props: {
        'toolbar-spacer': Boolean,
        open: Boolean
      },
      data: function data() {
        return {
          classes: {}
        };
      },

      watch: {
        open: '_refresh'
      },
      mounted: function mounted() {
        var _this = this;

        var FOCUSABLE_ELEMENTS = MDCPersistentDrawerFoundation.strings.FOCUSABLE_ELEMENTS;


        this.foundation = new MDCPersistentDrawerFoundation({
          addClass: function addClass(className) {
            _this.$set(_this.classes, className, true);
          },
          removeClass: function removeClass(className) {
            _this.$delete(_this.classes, className);
          },
          hasClass: function hasClass(className) {
            return _this.$el.classList.contains(className);
          },
          hasNecessaryDom: function hasNecessaryDom() {
            return !!_this.$refs.drawer;
          },
          registerInteractionHandler: function registerInteractionHandler(evt, handler) {
            _this.$el.addEventListener(remapEvent(evt), handler, applyPassive$1());
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
            _this.$el.removeEventListener(remapEvent(evt), handler, applyPassive$1());
          },
          registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
            _this.$refs.drawer.addEventListener(remapEvent(evt), handler, applyPassive$1());
          },
          deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
            _this.$refs.drawer.removeEventListener(remapEvent(evt), handler, applyPassive$1());
          },
          registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
            _this.$refs.drawer.addEventListener('transitionend', handler);
          },
          deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
            _this.$refs.drawer.removeEventListener('transitionend', handler);
          },
          registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
            document.addEventListener('keydown', handler);
          },
          deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
            document.removeEventListener('keydown', handler);
          },
          getDrawerWidth: function getDrawerWidth() {
            return _this.$refs.drawer.offsetWidth;
          },
          setTranslateX: function setTranslateX(value) {
            _this.$refs.drawer.style.setProperty(getTransformPropertyName(), value === null ? null : 'translateX(' + value + 'px)');
          },
          getFocusableElements: function getFocusableElements() {
            return _this.$refs.drawer.querySelectorAll(FOCUSABLE_ELEMENTS);
          },
          saveElementTabState: function saveElementTabState$$1(el) {
            saveElementTabState(el);
          },
          restoreElementTabState: function restoreElementTabState$$1(el) {
            restoreElementTabState(el);
          },
          makeElementUntabbable: function makeElementUntabbable(el) {
            el.setAttribute('tabindex', -1);
          },
          notifyOpen: function notifyOpen() {
            _this.$emit('change', true);
            _this.$emit('open');
          },
          notifyClose: function notifyClose() {
            _this.$emit('change', false);
            _this.$emit('close');
          },
          isRtl: function isRtl() {
            /* global getComputedStyle */
            return getComputedStyle(_this.$el).getPropertyValue('direction') === 'rtl';
          },
          isDrawer: function isDrawer(el) {
            return el === _this.$refs.drawer;
          }
        });
        this.foundation && this.foundation.init();
        this._refresh();
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation && this.foundation.destroy();
        this.foundation = null;
      },

      methods: {
        _refresh: function _refresh() {
          if (this.open) {
            this.foundation && this.foundation.open();
          } else {
            this.foundation && this.foundation.close();
          }
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
      return _c("aside", {
        staticClass: "mdc-persistent-drawer mdc-drawer--persistent mdc-typography",
        class: _vm.classes
      }, [_c("nav", { ref: "drawer", staticClass: "mdc-drawer__drawer" }, [_vm.toolbarSpacer ? _c("div", { staticClass: "mdc-drawer__toolbar-spacer" }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\drawer\\mdc-persistent-drawer.vue";

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

    var mdcPersistentDrawer = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

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

    var cssClasses$1 = {
      ROOT: 'mdc-drawer--temporary',
      OPEN: 'mdc-drawer--open',
      ANIMATING: 'mdc-drawer--animating',
      SCROLL_LOCK: 'mdc-drawer-scroll-lock'
    };

    var strings$1 = {
      DRAWER_SELECTOR: '.mdc-drawer--temporary .mdc-drawer__drawer',
      OPACITY_VAR_NAME: '--mdc-temporary-drawer-opacity',
      FOCUSABLE_ELEMENTS: FOCUSABLE_ELEMENTS,
      OPEN_EVENT: 'MDCTemporaryDrawer:open',
      CLOSE_EVENT: 'MDCTemporaryDrawer:close'
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

    var MDCTemporaryDrawerFoundation = function (_MDCSlidableDrawerFou) {
      inherits(MDCTemporaryDrawerFoundation, _MDCSlidableDrawerFou);
      createClass(MDCTemporaryDrawerFoundation, null, [{
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
        key: 'defaultAdapter',
        get: function get$$1() {
          return _extends(MDCSlidableDrawerFoundation.defaultAdapter, {
            addBodyClass: function addBodyClass() /* className: string */{},
            removeBodyClass: function removeBodyClass() /* className: string */{},
            isDrawer: function isDrawer() {
              return false;
            },
            updateCssVariable: function updateCssVariable() /* value: string */{},
            eventTargetHasClass: function eventTargetHasClass() {
              return (/* target: EventTarget, className: string */ /* boolean */false
              );
            }
          });
        }
      }]);

      function MDCTemporaryDrawerFoundation(adapter) {
        classCallCheck(this, MDCTemporaryDrawerFoundation);

        var _this = possibleConstructorReturn(this, (MDCTemporaryDrawerFoundation.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation)).call(this, _extends(MDCTemporaryDrawerFoundation.defaultAdapter, adapter), MDCTemporaryDrawerFoundation.cssClasses.ROOT, MDCTemporaryDrawerFoundation.cssClasses.ANIMATING, MDCTemporaryDrawerFoundation.cssClasses.OPEN));

        _this.componentClickHandler_ = function (evt) {
          if (_this.adapter_.eventTargetHasClass(evt.target, cssClasses$1.ROOT)) {
            _this.close(true);
          }
        };
        return _this;
      }

      createClass(MDCTemporaryDrawerFoundation, [{
        key: 'init',
        value: function init() {
          get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'init', this).call(this);

          // Make browser aware of custom property being used in this element.
          // Workaround for certain types of hard-to-reproduce heisenbugs.
          this.adapter_.updateCssVariable(0);
          this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'destroy', this).call(this);

          this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
          this.enableScroll_();
        }
      }, {
        key: 'open',
        value: function open() {
          this.disableScroll_();
          // Make sure custom property values are cleared before starting.
          this.adapter_.updateCssVariable('');

          get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'open', this).call(this);
        }
      }, {
        key: 'close',
        value: function close() {
          // Make sure custom property values are cleared before making any changes.
          this.adapter_.updateCssVariable('');

          get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'close', this).call(this);
        }
      }, {
        key: 'prepareForTouchEnd_',
        value: function prepareForTouchEnd_() {
          get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'prepareForTouchEnd_', this).call(this);

          this.adapter_.updateCssVariable('');
        }
      }, {
        key: 'updateDrawer_',
        value: function updateDrawer_() {
          get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'updateDrawer_', this).call(this);

          var newOpacity = Math.max(0, 1 + this.direction_ * (this.newPosition_ / this.drawerWidth_));
          this.adapter_.updateCssVariable(newOpacity);
        }
      }, {
        key: 'isRootTransitioningEventTarget_',
        value: function isRootTransitioningEventTarget_(el) {
          return this.adapter_.isDrawer(el);
        }
      }, {
        key: 'handleTransitionEnd_',
        value: function handleTransitionEnd_(evt) {
          get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'handleTransitionEnd_', this).call(this, evt);
          if (!this.isOpen_) {
            this.enableScroll_();
          }
        }
      }, {
        key: 'disableScroll_',
        value: function disableScroll_() {
          this.adapter_.addBodyClass(cssClasses$1.SCROLL_LOCK);
        }
      }, {
        key: 'enableScroll_',
        value: function enableScroll_() {
          this.adapter_.removeBodyClass(cssClasses$1.SCROLL_LOCK);
        }
      }]);
      return MDCTemporaryDrawerFoundation;
    }(MDCSlidableDrawerFoundation);

    //

    var script$2 = {
      name: 'mdc-temporary-drawer',
      model: {
        prop: 'open',
        event: 'change'
      },
      props: {
        open: Boolean,
        'toolbar-spacer': Boolean
      },
      data: function data() {
        return {
          classes: {}
        };
      },

      watch: {
        open: '_refresh'
      },
      mounted: function mounted() {
        var _this = this;

        var _MDCTemporaryDrawerFo = MDCTemporaryDrawerFoundation.strings,
            FOCUSABLE_ELEMENTS = _MDCTemporaryDrawerFo.FOCUSABLE_ELEMENTS,
            OPACITY_VAR_NAME = _MDCTemporaryDrawerFo.OPACITY_VAR_NAME;


        this.foundation = new MDCTemporaryDrawerFoundation({
          addClass: function addClass(className) {
            _this.$set(_this.classes, className, true);
          },
          removeClass: function removeClass(className) {
            _this.$delete(_this.classes, className);
          },
          hasClass: function hasClass(className) {
            return _this.$el.classList.contains(className);
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
          hasNecessaryDom: function hasNecessaryDom() {
            return !!_this.$refs.drawer;
          },
          registerInteractionHandler: function registerInteractionHandler(evt, handler) {
            _this.$el.addEventListener(remapEvent(evt), handler, applyPassive$1());
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
            _this.$el.removeEventListener(remapEvent(evt), handler, applyPassive$1());
          },
          registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
            _this.$refs.drawer.addEventListener(remapEvent(evt), handler, applyPassive$1());
          },
          deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
            _this.$refs.drawer.removeEventListener(remapEvent(evt), handler, applyPassive$1());
          },
          registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
            _this.$refs.drawer.addEventListener('transitionend', handler);
          },
          deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
            _this.$refs.drawer.removeEventListener('transitionend', handler);
          },
          registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
            document.addEventListener('keydown', handler);
          },
          deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
            document.removeEventListener('keydown', handler);
          },
          getDrawerWidth: function getDrawerWidth() {
            return _this.$refs.drawer.offsetWidth;
          },
          setTranslateX: function setTranslateX(value) {
            _this.$refs.drawer.style.setProperty(getTransformPropertyName(), value === null ? null : 'translateX(' + value + 'px)');
          },
          updateCssVariable: function updateCssVariable(value) {
            if (supportsCssCustomProperties()) {
              _this.$el.style.setProperty(OPACITY_VAR_NAME, value);
            }
          },
          getFocusableElements: function getFocusableElements() {
            return _this.$refs.drawer.querySelectorAll(FOCUSABLE_ELEMENTS);
          },
          saveElementTabState: function saveElementTabState$$1(el) {
            saveElementTabState(el);
          },
          restoreElementTabState: function restoreElementTabState$$1(el) {
            restoreElementTabState(el);
          },
          makeElementUntabbable: function makeElementUntabbable(el) {
            el.setAttribute('tabindex', -1);
          },
          notifyOpen: function notifyOpen() {
            _this.$emit('change', true);
            _this.$emit('open');
          },
          notifyClose: function notifyClose() {
            _this.$emit('change', false);
            _this.$emit('close');
          },
          isRtl: function isRtl() {
            /* global getComputedStyle */
            return getComputedStyle(_this.$el).getPropertyValue('direction') === 'rtl';
          },
          isDrawer: function isDrawer(el) {
            return el === _this.$refs.drawer;
          }
        });
        this.foundation && this.foundation.init();
        this._refresh();
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation && this.foundation.destroy();
        this.foundation = null;
      },

      methods: {
        _refresh: function _refresh() {
          if (this.open) {
            this.foundation && this.foundation.open();
          } else {
            this.foundation && this.foundation.close();
          }
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
      return _c("aside", {
        staticClass: "mdc-temporary-drawer mdc-drawer--temporary mdc-typography",
        class: _vm.classes
      }, [_c("nav", { ref: "drawer", staticClass: "mdc-drawer__drawer" }, [_vm.toolbarSpacer ? _c("div", { staticClass: "mdc-drawer__toolbar-spacer" }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\drawer\\mdc-temporary-drawer.vue";

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

    var mdcTemporaryDrawer = __vue_normalize__$2({ render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, __vue_create_injector__$2, undefined);

    //

    var media = new (function () {
      function _class() {
        classCallCheck(this, _class);
      }

      createClass(_class, [{
        key: 'small',
        get: function get$$1() {
          return this._small || (this._small = window.matchMedia('(max-width: 839px)'));
        }
      }, {
        key: 'large',
        get: function get$$1() {
          return this._large || (this._large = window.matchMedia('(min-width: 1200px)'));
        }
      }]);
      return _class;
    }())();

    var script$3 = {
      name: 'mdc-drawer',
      components: {
        'mdc-permanent-drawer': mdcPermanentDrawer,
        'mdc-persistent-drawer': mdcPersistentDrawer,
        'mdc-temporary-drawer': mdcTemporaryDrawer
      },
      model: {
        prop: 'open',
        event: 'change'
      },
      props: {
        open: Boolean,
        permanent: Boolean,
        persistent: Boolean,
        temporary: Boolean,
        drawerType: {
          type: String,
          validator: function validator(val) {
            return val in ['temporary', 'persistent', 'permanent'];
          }
        },
        toolbarSpacer: Boolean,
        toggleOn: String,
        toggleOnSource: { type: Object, required: false },
        openOn: String,
        openOnSource: { type: Object, required: false },
        closeOn: String,
        closeOnSource: { type: Object, required: false }
      },
      provide: function provide() {
        return { mdcDrawer: this };
      },
      data: function data() {
        return {
          small: false,
          large: false,
          open_: false
        };
      },

      computed: {
        type: function type() {
          if (this.permanent) {
            return 'mdc-permanent-drawer';
          } else if (this.persistent) {
            return 'mdc-persistent-drawer';
          } else if (this.temporary) {
            return 'mdc-temporary-drawer';
          } else {
            switch (this.drawerType) {
              case 'permanent':
                return 'mdc-permanent-drawer';
              case 'persistent':
                return 'mdc-persistent-drawer';
              case 'temporary':
                return 'mdc-temporary-drawer';
              default:
                return this.small ? 'mdc-temporary-drawer' : 'mdc-persistent-drawer';
            }
          }
        },
        isPermanent: function isPermanent() {
          return this.permanent || this.type === 'mdc-permanent-drawer';
        },
        isPersistent: function isPersistent() {
          return this.persistent || this.type === 'mdc-persistent-drawer';
        },
        isTemporary: function isTemporary() {
          return this.temporary || this.type === 'mdc-temporary-drawer';
        },
        isResponsive: function isResponsive() {
          return !(this.permanent || this.persistent || this.temporary || this.drawerType);
        }
      },
      watch: {
        open: 'onOpen_'
      },
      created: function created() {
        if (typeof window !== 'undefined' && window.matchMedia) {
          this.small = media.small.matches;
          this.large = media.large.matches;
        }
      },
      mounted: function mounted() {
        var _this = this;

        if (this.toggleOn) {
          this.toggleOnEventSource = this.toggleOnSource || this.$root;
          this.toggleOnEventSource.$on(this.toggleOn, this.toggle);
        }
        if (this.openOn) {
          this.openOnEventSource = this.openOnSource || this.$root;
          this.openOnEventSource.$on(this.openOn, this.show);
        }
        if (this.closeOn) {
          this.closeOnEventSource = this.closeOnSource || this.$root;
          this.closeOnEventSource.$on(this.closeOn, this.close);
        }
        media.small.addListener(this.refreshMedia);
        media.large.addListener(this.refreshMedia);
        this.$nextTick(function () {
          return _this.refreshMedia();
        });
      },
      beforeDestroy: function beforeDestroy() {
        media.small.removeListener(this.refreshMedia);
        media.large.removeListener(this.refreshMedia);

        if (this.toggleOnEventSource) {
          this.toggleOnEventSource.$off(this.toggleOn, this.toggle);
        }
        if (this.openOnEventSource) {
          this.openOnEventSource.$off(this.openOn, this.show);
        }
        if (this.closeOnEventSource) {
          this.closeOnEventSource.$off(this.closeOn, this.close);
        }
      },

      methods: {
        onOpen_: function onOpen_(value) {
          this.isPermanent || (this.open_ = value);
        },
        onChange: function onChange(event) {
          this.$emit('change', event);
          this.$root.$emit('vma:layout');
        },
        show: function show() {
          this.open_ = true;
        },
        close: function close() {
          this.isPermanent || (this.open_ = false);
        },
        toggle: function toggle() {
          this.isPermanent || (this.isOpen() ? this.close() : this.show());
        },
        isOpen: function isOpen() {
          return this.isPermanent || this.open_;
        },
        refreshMedia: function refreshMedia() {
          this.small = media.small.matches;
          this.large = media.large.matches;
          if (this.isResponsive) {
            if (this.large) {
              this.show();
            } else {
              this.close();
            }
          }
        }
      }
    };

    /* script */
    var __vue_script__$3 = script$3;

    /* template */
    var __vue_render__$3 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(_vm.type, {
        ref: "drawer",
        tag: "component",
        staticClass: "mdc-drawer",
        attrs: { "toolbar-spacer": _vm.toolbarSpacer },
        on: {
          change: _vm.onChange,
          open: function open($event) {
            _vm.$emit("open");
          },
          close: function close($event) {
            _vm.$emit("close");
          }
        },
        model: {
          value: _vm.open_,
          callback: function callback($$v) {
            _vm.open_ = $$v;
          },
          expression: "open_"
        }
      }, [_vm._t("default")], 2);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\drawer\\mdc-drawer.vue";

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

    var mdcDrawer = __vue_normalize__$3({ render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, __vue_create_injector__$3, undefined);

    //
    //
    //
    //
    //
    //

    var script$4 = {
      name: 'mdc-drawer-layout'
    };

    /* script */
    var __vue_script__$4 = script$4;

    /* template */
    var __vue_render__$4 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "mdc-drawer-layout" }, [_vm._t("default")], 2);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\drawer\\mdc-drawer-layout.vue";

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

    var mdcDrawerLayout = __vue_normalize__$4({ render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, __vue_create_injector__$4, undefined);

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

    var script$5 = {
      name: 'mdc-drawer-header',
      props: {
        permanent: Boolean,
        persistent: Boolean,
        temporary: Boolean
      },
      inject: ['mdcDrawer'],
      computed: {
        show: function show() {
          if (this.temporary || this.persistent || this.permanent) {
            return this.temporary && this.mdcDrawer.isTemporary || this.persistent && this.mdcDrawer.isPersistent || this.permanent && this.mdcDrawer.isPermanent;
          } else {
            return true;
          }
        }
      }
    };

    /* script */
    var __vue_script__$5 = script$5;

    /* template */
    var __vue_render__$5 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _vm.show ? _c("header", { staticClass: "mdc-drawer-header mdc-drawer__header" }, [_c("div", { staticClass: "mdc-drawer__header-content" }, [_vm._t("default")], 2)]) : _vm._e();
    };
    var __vue_staticRenderFns__$5 = [];
    __vue_render__$5._withStripped = true;

    /* style */
    var __vue_inject_styles__$5 = undefined;
    /* scoped */
    var __vue_scope_id__$5 = undefined;
    /* module identifier */
    var __vue_module_identifier__$5 = undefined;
    /* functional template */
    var __vue_is_functional_template__$5 = false;
    /* component normalizer */
    function __vue_normalize__$5(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\drawer\\mdc-drawer-header.vue";

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
    function __vue_create_injector__$5() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$5.styles || (__vue_create_injector__$5.styles = {});
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

    var mdcDrawerHeader = __vue_normalize__$5({ render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 }, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, __vue_create_injector__$5, undefined);

    //
    //
    //
    //
    //
    //
    //
    //

    var script$6 = {
      name: 'mdc-drawer-list',
      props: {
        dense: Boolean
      },
      data: function data() {
        return {
          classes: {
            'mdc-list--dense': this.dense
          }
        };
      }
    };

    /* script */
    var __vue_script__$6 = script$6;

    /* template */
    var __vue_render__$6 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("nav", { staticClass: "mdc-drawer-list mdc-list", class: _vm.classes }, [_vm._t("default")], 2);
    };
    var __vue_staticRenderFns__$6 = [];
    __vue_render__$6._withStripped = true;

    /* style */
    var __vue_inject_styles__$6 = undefined;
    /* scoped */
    var __vue_scope_id__$6 = undefined;
    /* module identifier */
    var __vue_module_identifier__$6 = undefined;
    /* functional template */
    var __vue_is_functional_template__$6 = false;
    /* component normalizer */
    function __vue_normalize__$6(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\drawer\\mdc-drawer-list.vue";

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
    function __vue_create_injector__$6() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$6.styles || (__vue_create_injector__$6.styles = {});
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

    var mdcDrawerList = __vue_normalize__$6({ render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 }, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, __vue_create_injector__$6, undefined);

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

    var cssClasses$2 = {
      // Ripple is a special case where the "root" component is really a "mixin" of sorts,
      // given that it's an 'upgrade' to an existing component. That being said it is the root
      // CSS class that all other CSS classes derive from.
      ROOT: 'mdc-ripple-upgraded',
      UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
      BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
      FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
      FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
    };

    var strings$2 = {
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
    var supportsPassive_$2 = void 0;

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
    function applyPassive$2() {
      var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
      var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (supportsPassive_$2 === undefined || forceRefresh) {
        var isSupported = false;
        try {
          globalObj.document.addEventListener('test', null, { get passive() {
              isSupported = true;
            } });
        } catch (e) {}

        supportsPassive_$2 = isSupported;
      }

      return supportsPassive_$2 ? { passive: true } : false;
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
          return cssClasses$2;
        }
      }, {
        key: 'strings',
        get: function get$$1() {
          return strings$2;
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
            vm.$el.addEventListener(evt, handler, applyPassive$2());
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
            vm.$el.removeEventListener(evt, handler, applyPassive$2());
          },
          registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
            return document.documentElement.addEventListener(evtType, handler, applyPassive$2());
          },
          deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
            return document.documentElement.removeEventListener(evtType, handler, applyPassive$2());
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

    var script$7 = {
      name: 'mdc-ripple',
      mixins: [CustomElementMixin, RippleMixin],
      props: {
        tag: String
      }
    };

    /* script */
    var __vue_script__$7 = script$7;

    /* template */
    var __vue_render__$7 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("custom-element", {
        staticClass: "mdc-ripple",
        attrs: { tag: _vm.tag, classes: _vm.classes, styles: _vm.styles }
      }, [_vm._t("default")], 2);
    };
    var __vue_staticRenderFns__$7 = [];
    __vue_render__$7._withStripped = true;

    /* style */
    var __vue_inject_styles__$7 = undefined;
    /* scoped */
    var __vue_scope_id__$7 = undefined;
    /* module identifier */
    var __vue_module_identifier__$7 = undefined;
    /* functional template */
    var __vue_is_functional_template__$7 = false;
    /* component normalizer */
    function __vue_normalize__$7(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

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
    function __vue_create_injector__$7() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$7.styles || (__vue_create_injector__$7.styles = {});
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

    __vue_normalize__$7({ render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 }, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, __vue_create_injector__$7, undefined);

    //

    var script$8 = {
      name: 'mdc-drawer-item',
      inject: ['mdcDrawer'],
      mixins: [DispatchEventMixin, CustomLinkMixin],
      props: {
        startIcon: String,
        temporaryClose: {
          type: Boolean,
          default: true
        },
        activated: Boolean,
        exactActiveClass: {
          type: String,
          default: 'mdc-list-item--activated'
        }
      },
      data: function data() {
        return {
          classes: {},
          styles: {}
        };
      },

      computed: {
        mylisteners: function mylisteners() {
          var _this = this;

          return _extends({}, this.$listeners, {
            click: function click(e) {
              _this.mdcDrawer.isTemporary && _this.temporaryClose && _this.mdcDrawer.close();
              _this.dispatchEvent(e);
            }
          });
        },
        itemClasses: function itemClasses() {
          return {
            'mdc-list-item--activated': this.activated
          };
        },
        hasStartDetail: function hasStartDetail() {
          return this.startIcon || this.$slots['start-detail'];
        }
      },
      mounted: function mounted() {
        this.ripple = new RippleBase(this);
        this.ripple.init();
      },
      beforeDestroy: function beforeDestroy() {
        this.ripple && this.ripple.destroy();
        this.ripple = null;
      }
    };

    /* script */
    var __vue_script__$8 = script$8;

    /* template */
    var __vue_render__$8 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("custom-link", _vm._g({
        staticClass: "mdc-drawer-item mdc-list-item",
        class: [_vm.classes, _vm.itemClasses],
        style: _vm.styles,
        attrs: { link: _vm.link }
      }, _vm.mylisteners), [_vm.hasStartDetail ? _c("span", { staticClass: "mdc-list-item__graphic" }, [_vm._t("start-detail", [_c("i", {
        staticClass: "material-icons",
        attrs: { "aria-hidden": "true" }
      }, [_vm._v(_vm._s(_vm.startIcon))])])], 2) : _vm._e(), _vm._v(" "), _vm._t("default")], 2);
    };
    var __vue_staticRenderFns__$8 = [];
    __vue_render__$8._withStripped = true;

    /* style */
    var __vue_inject_styles__$8 = undefined;
    /* scoped */
    var __vue_scope_id__$8 = undefined;
    /* module identifier */
    var __vue_module_identifier__$8 = undefined;
    /* functional template */
    var __vue_is_functional_template__$8 = false;
    /* component normalizer */
    function __vue_normalize__$8(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\drawer\\mdc-drawer-item.vue";

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
    function __vue_create_injector__$8() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$8.styles || (__vue_create_injector__$8.styles = {});
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

    var mdcDrawerItem = __vue_normalize__$8({ render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 }, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, __vue_create_injector__$8, undefined);

    //
    //
    //
    //

    var script$9 = {
      name: 'mdc-drawer-divider'
    };

    /* script */
    var __vue_script__$9 = script$9;

    /* template */
    var __vue_render__$9 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("hr", { staticClass: "mdc-list-divider" });
    };
    var __vue_staticRenderFns__$9 = [];
    __vue_render__$9._withStripped = true;

    /* style */
    var __vue_inject_styles__$9 = undefined;
    /* scoped */
    var __vue_scope_id__$9 = undefined;
    /* module identifier */
    var __vue_module_identifier__$9 = undefined;
    /* functional template */
    var __vue_is_functional_template__$9 = false;
    /* component normalizer */
    function __vue_normalize__$9(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\drawer\\mdc-drawer-divider.vue";

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
    function __vue_create_injector__$9() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$9.styles || (__vue_create_injector__$9.styles = {});
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

    var mdcDrawerDivider = __vue_normalize__$9({ render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 }, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, __vue_create_injector__$9, undefined);

    var plugin = BasePlugin({
      mdcDrawer: mdcDrawer,
      mdcDrawerLayout: mdcDrawerLayout,
      mdcDrawerHeader: mdcDrawerHeader,
      mdcDrawerList: mdcDrawerList,
      mdcDrawerItem: mdcDrawerItem,
      mdcDrawerDivider: mdcDrawerDivider
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1lbGVtZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1saW5rLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9kaXNwYXRjaC1ldmVudC1taXhpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS91bmlxdWVpZC1taXhpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL21kYy1wZXJtYW5lbnQtZHJhd2VyLnZ1ZSIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL3NsaWRhYmxlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL3NsaWRhYmxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2RyYXdlci9zbGlkYWJsZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL3BlcnNpc3RlbnQvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvcGVyc2lzdGVudC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvdXRpbC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL21kYy1wZXJzaXN0ZW50LWRyYXdlci52dWUiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2RyYXdlci90ZW1wb3JhcnkvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvdGVtcG9yYXJ5L2ZvdW5kYXRpb24uanMiLCIuLi8uLi9jb21wb25lbnRzL2RyYXdlci9tZGMtdGVtcG9yYXJ5LWRyYXdlci52dWUiLCIuLi8uLi9jb21wb25lbnRzL2RyYXdlci9tZGMtZHJhd2VyLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL21kYy1kcmF3ZXItbGF5b3V0LnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL21kYy1kcmF3ZXItaGVhZGVyLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL21kYy1kcmF3ZXItbGlzdC52dWUiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9jb21wb25lbnRzL3JpcHBsZS9tZGMtcmlwcGxlLWJhc2UuanMiLCIuLi8uLi9jb21wb25lbnRzL3JpcHBsZS9tZGMtcmlwcGxlLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL21kYy1kcmF3ZXItaXRlbS52dWUiLCIuLi8uLi9jb21wb25lbnRzL2RyYXdlci9tZGMtZHJhd2VyLWRpdmlkZXIudnVlIiwiLi4vLi4vY29tcG9uZW50cy9kcmF3ZXIvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL2RyYXdlci9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQocGx1Z2luKSB7XHJcbiAgLy8gQXV0by1pbnN0YWxsXHJcbiAgbGV0IF9WdWUgPSBudWxsXHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIC8qZ2xvYmFsIGdsb2JhbCovXHJcbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxyXG4gIH1cclxuICBpZiAoX1Z1ZSkge1xyXG4gICAgX1Z1ZS51c2UocGx1Z2luKVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbihjb21wb25lbnRzKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXHJcbiAgICBpbnN0YWxsOiB2bSA9PiB7XHJcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxyXG4gICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSwgY29tcG9uZW50KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50c1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgQ3VzdG9tRWxlbWVudCA9IHtcclxuICBmdW5jdGlvbmFsOiB0cnVlLFxyXG4gIHJlbmRlcihjcmVhdGVFbGVtZW50LCBjb250ZXh0KSB7XHJcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudChcclxuICAgICAgY29udGV4dC5wcm9wcy5pcyB8fCBjb250ZXh0LnByb3BzLnRhZyB8fCAnZGl2JyxcclxuICAgICAgY29udGV4dC5kYXRhLFxyXG4gICAgICBjb250ZXh0LmNoaWxkcmVuXHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ3VzdG9tRWxlbWVudE1peGluID0ge1xyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIEN1c3RvbUVsZW1lbnRcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IEN1c3RvbUxpbmsgPSB7XHJcbiAgbmFtZTogJ2N1c3RvbS1saW5rJyxcclxuICBmdW5jdGlvbmFsOiB0cnVlLFxyXG4gIHByb3BzOiB7XHJcbiAgICB0YWc6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnYScgfSxcclxuICAgIGxpbms6IE9iamVjdFxyXG4gIH0sXHJcbiAgcmVuZGVyKGgsIGNvbnRleHQpIHtcclxuICAgIGxldCBlbGVtZW50XHJcbiAgICBsZXQgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGNvbnRleHQuZGF0YSlcclxuXHJcbiAgICBpZiAoY29udGV4dC5wcm9wcy5saW5rICYmIGNvbnRleHQucGFyZW50LiRyb3V0ZXIpIHtcclxuICAgICAgLy8gcm91dGVyLWxpbmsgY2FzZVxyXG4gICAgICBlbGVtZW50ID0gY29udGV4dC5wYXJlbnQuJHJvb3QuJG9wdGlvbnMuY29tcG9uZW50c1sncm91dGVyLWxpbmsnXVxyXG4gICAgICBkYXRhLnByb3BzID0gT2JqZWN0LmFzc2lnbih7IHRhZzogY29udGV4dC5wcm9wcy50YWcgfSwgY29udGV4dC5wcm9wcy5saW5rKVxyXG4gICAgICBpZiAoZGF0YS5vbi5jbGljaykge1xyXG4gICAgICAgIGRhdGEubmF0aXZlT24gPSB7IGNsaWNrOiBkYXRhLm9uLmNsaWNrIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gZWxlbWVudCBmYWxsYmFja1xyXG4gICAgICBlbGVtZW50ID0gY29udGV4dC5wcm9wcy50YWdcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaChlbGVtZW50LCBkYXRhLCBjb250ZXh0LmNoaWxkcmVuKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEN1c3RvbUxpbmtNaXhpbiA9IHtcclxuICBwcm9wczoge1xyXG4gICAgdG86IFtTdHJpbmcsIE9iamVjdF0sXHJcbiAgICBleGFjdDogQm9vbGVhbixcclxuICAgIGFwcGVuZDogQm9vbGVhbixcclxuICAgIHJlcGxhY2U6IEJvb2xlYW4sXHJcbiAgICBhY3RpdmVDbGFzczogU3RyaW5nLFxyXG4gICAgZXhhY3RBY3RpdmVDbGFzczogU3RyaW5nXHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgbGluaygpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICB0aGlzLnRvICYmIHtcclxuICAgICAgICAgIHRvOiB0aGlzLnRvLFxyXG4gICAgICAgICAgZXhhY3Q6IHRoaXMuZXhhY3QsXHJcbiAgICAgICAgICBhcHBlbmQ6IHRoaXMuYXBwZW5kLFxyXG4gICAgICAgICAgcmVwbGFjZTogdGhpcy5yZXBsYWNlLFxyXG4gICAgICAgICAgYWN0aXZlQ2xhc3M6IHRoaXMuYWN0aXZlQ2xhc3MsXHJcbiAgICAgICAgICBleGFjdEFjdGl2ZUNsYXNzOiB0aGlzLmV4YWN0QWN0aXZlQ2xhc3NcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICAgIH1cclxuICB9LFxyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIEN1c3RvbUxpbmtcclxuICB9XHJcbn1cclxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50KGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xyXG4gIGxldCBldnRcclxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xyXG4gICAgICBkZXRhaWw6IGV2dERhdGEsXHJcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxyXG4gICAgfSlcclxuICB9IGVsc2Uge1xyXG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcclxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcclxuICB9XHJcbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IERpc3BhdGNoRXZlbnRNaXhpbiA9IHtcclxuICBwcm9wczoge1xyXG4gICAgZXZlbnQ6IFN0cmluZyxcclxuICAgICdldmVudC10YXJnZXQnOiBPYmplY3QsXHJcbiAgICAnZXZlbnQtYXJncyc6IEFycmF5XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBkaXNwYXRjaEV2ZW50KGV2dCkge1xyXG4gICAgICBldnQgJiYgdGhpcy4kZW1pdChldnQudHlwZSwgZXZ0KVxyXG4gICAgICBpZiAodGhpcy5ldmVudCkge1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLmV2ZW50VGFyZ2V0IHx8IHRoaXMuJHJvb3RcclxuICAgICAgICBsZXQgYXJncyA9IHRoaXMuZXZlbnRBcmdzIHx8IFtdXHJcbiAgICAgICAgdGFyZ2V0LiRlbWl0KHRoaXMuZXZlbnQsIC4uLmFyZ3MpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICBsaXN0ZW5lcnMoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxyXG4gICAgICAgIGNsaWNrOiBlID0+IHRoaXMuZGlzcGF0Y2hFdmVudChlKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IHNjb3BlID1cclxuICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDB4MTAwMDAwMDApKS50b1N0cmluZygpICsgJy0nXHJcblxyXG5leHBvcnQgY29uc3QgVk1BVW5pcXVlSWRNaXhpbiA9IHtcclxuICBiZWZvcmVDcmVhdGUoKSB7XHJcbiAgICB0aGlzLnZtYV91aWRfID0gc2NvcGUgKyB0aGlzLl91aWRcclxuICB9XHJcbn1cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxuYXYgY2xhc3M9XCJtZGMtcGVybWFuZW50LWRyYXdlciBtZGMtZHJhd2VyLS1wZXJtYW5lbnQgbWRjLXR5cG9ncmFwaHlcIj5cclxuICAgIDxuYXYgY2xhc3M9XCJtZGMtZHJhd2VyX19jb250ZW50XCI+XHJcbiAgICAgIDxkaXYgXHJcbiAgICAgICAgdi1pZj1cInRvb2xiYXJTcGFjZXJcIiBcclxuICAgICAgICBjbGFzcz1cIm1kYy1kcmF3ZXJfX3Rvb2xiYXItc3BhY2VyXCIvPlxyXG4gICAgICA8c2xvdCAvPlxyXG4gICAgPC9uYXY+XHJcbiAgPC9uYXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1wZXJtYW5lbnQtZHJhd2VyJyxcclxuICBwcm9wczoge1xyXG4gICAgJ3Rvb2xiYXItc3BhY2VyJzogQm9vbGVhblxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuZXhwb3J0IGNvbnN0IEZPQ1VTQUJMRV9FTEVNRU5UUyA9XG4gICdhW2hyZWZdLCBhcmVhW2hyZWZdLCBpbnB1dDpub3QoW2Rpc2FibGVkXSksIHNlbGVjdDpub3QoW2Rpc2FibGVkXSksIHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSwgJyArXG4gICdidXR0b246bm90KFtkaXNhYmxlZF0pLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsIFt0YWJpbmRleF0sIFtjb250ZW50ZWRpdGFibGVdJztcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcblxuLyoqXG4gKiBAdGVtcGxhdGUgRlxuICovXG5jbGFzcyBNRENDb21wb25lbnQge1xuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcmV0dXJuIHshTURDQ29tcG9uZW50fVxuICAgKi9cbiAgc3RhdGljIGF0dGFjaFRvKHJvb3QpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHdoaWNoIGV4dGVuZCBNRENCYXNlIHNob3VsZCBwcm92aWRlIGFuIGF0dGFjaFRvKCkgbWV0aG9kIHRoYXQgdGFrZXMgYSByb290IGVsZW1lbnQgYW5kXG4gICAgLy8gcmV0dXJucyBhbiBpbnN0YW50aWF0ZWQgY29tcG9uZW50IHdpdGggaXRzIHJvb3Qgc2V0IHRvIHRoYXQgZWxlbWVudC4gQWxzbyBub3RlIHRoYXQgaW4gdGhlIGNhc2VzIG9mXG4gICAgLy8gc3ViY2xhc3NlcywgYW4gZXhwbGljaXQgZm91bmRhdGlvbiBjbGFzcyB3aWxsIG5vdCBoYXZlIHRvIGJlIHBhc3NlZCBpbjsgaXQgd2lsbCBzaW1wbHkgYmUgaW5pdGlhbGl6ZWRcbiAgICAvLyBmcm9tIGdldERlZmF1bHRGb3VuZGF0aW9uKCkuXG4gICAgcmV0dXJuIG5ldyBNRENDb21wb25lbnQocm9vdCwgbmV3IE1EQ0ZvdW5kYXRpb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcGFyYW0ge0Y9fSBmb3VuZGF0aW9uXG4gICAqIEBwYXJhbSB7Li4uP30gYXJnc1xuICAgKi9cbiAgY29uc3RydWN0b3Iocm9vdCwgZm91bmRhdGlvbiA9IHVuZGVmaW5lZCwgLi4uYXJncykge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshRWxlbWVudH0gKi9cbiAgICB0aGlzLnJvb3RfID0gcm9vdDtcbiAgICB0aGlzLmluaXRpYWxpemUoLi4uYXJncyk7XG4gICAgLy8gTm90ZSB0aGF0IHdlIGluaXRpYWxpemUgZm91bmRhdGlvbiBoZXJlIGFuZCBub3Qgd2l0aGluIHRoZSBjb25zdHJ1Y3RvcidzIGRlZmF1bHQgcGFyYW0gc28gdGhhdFxuICAgIC8vIHRoaXMucm9vdF8gaXMgZGVmaW5lZCBhbmQgY2FuIGJlIHVzZWQgd2l0aGluIHRoZSBmb3VuZGF0aW9uIGNsYXNzLlxuICAgIC8qKiBAcHJvdGVjdGVkIHshRn0gKi9cbiAgICB0aGlzLmZvdW5kYXRpb25fID0gZm91bmRhdGlvbiA9PT0gdW5kZWZpbmVkID8gdGhpcy5nZXREZWZhdWx0Rm91bmRhdGlvbigpIDogZm91bmRhdGlvbjtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmluaXQoKTtcbiAgICB0aGlzLmluaXRpYWxTeW5jV2l0aERPTSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgvKiAuLi5hcmdzICovKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBjYW4gb3ZlcnJpZGUgdGhpcyB0byBkbyBhbnkgYWRkaXRpb25hbCBzZXR1cCB3b3JrIHRoYXQgd291bGQgYmUgY29uc2lkZXJlZCBwYXJ0IG9mIGFcbiAgICAvLyBcImNvbnN0cnVjdG9yXCIuIEVzc2VudGlhbGx5LCBpdCBpcyBhIGhvb2sgaW50byB0aGUgcGFyZW50IGNvbnN0cnVjdG9yIGJlZm9yZSB0aGUgZm91bmRhdGlvbiBpc1xuICAgIC8vIGluaXRpYWxpemVkLiBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgYmVzaWRlcyByb290IGFuZCBmb3VuZGF0aW9uIHdpbGwgYmUgcGFzc2VkIGluIGhlcmUuXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUZ9IGZvdW5kYXRpb25cbiAgICovXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkIGZvdW5kYXRpb24gY2xhc3MgZm9yIHRoZVxuICAgIC8vIGNvbXBvbmVudC5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1N1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSBnZXREZWZhdWx0Rm91bmRhdGlvbiB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkICcgK1xuICAgICAgJ2ZvdW5kYXRpb24gY2xhc3MnKTtcbiAgfVxuXG4gIGluaXRpYWxTeW5jV2l0aERPTSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCBpZiB0aGV5IG5lZWQgdG8gcGVyZm9ybSB3b3JrIHRvIHN5bmNocm9uaXplIHdpdGggYSBob3N0IERPTVxuICAgIC8vIG9iamVjdC4gQW4gZXhhbXBsZSBvZiB0aGlzIHdvdWxkIGJlIGEgZm9ybSBjb250cm9sIHdyYXBwZXIgdGhhdCBuZWVkcyB0byBzeW5jaHJvbml6ZSBpdHMgaW50ZXJuYWwgc3RhdGVcbiAgICAvLyB0byBzb21lIHByb3BlcnR5IG9yIGF0dHJpYnV0ZSBvZiB0aGUgaG9zdCBET00uIFBsZWFzZSBub3RlOiB0aGlzIGlzICpub3QqIHRoZSBwbGFjZSB0byBwZXJmb3JtIERPTVxuICAgIC8vIHJlYWRzL3dyaXRlcyB0aGF0IHdvdWxkIGNhdXNlIGxheW91dCAvIHBhaW50LCBhcyB0aGlzIGlzIGNhbGxlZCBzeW5jaHJvbm91c2x5IGZyb20gd2l0aGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtYXkgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJlbGVhc2UgYW55IHJlc291cmNlcyAvIGRlcmVnaXN0ZXIgYW55IGxpc3RlbmVycyB0aGV5IGhhdmVcbiAgICAvLyBhdHRhY2hlZC4gQW4gZXhhbXBsZSBvZiB0aGlzIG1pZ2h0IGJlIGRlcmVnaXN0ZXJpbmcgYSByZXNpemUgZXZlbnQgZnJvbSB0aGUgd2luZG93IG9iamVjdC5cbiAgICB0aGlzLmZvdW5kYXRpb25fLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byBhZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIGxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIHJlbW92ZSBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogdW5saXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICB1bmxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIGEgY3Jvc3MtYnJvd3Nlci1jb21wYXRpYmxlIGN1c3RvbSBldmVudCBmcm9tIHRoZSBjb21wb25lbnQgcm9vdCBvZiB0aGUgZ2l2ZW4gdHlwZSxcbiAgICogd2l0aCB0aGUgZ2l2ZW4gZGF0YS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshT2JqZWN0fSBldnREYXRhXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IHNob3VsZEJ1YmJsZVxuICAgKi9cbiAgZW1pdChldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICAgIGxldCBldnQ7XG4gICAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgICBidWJibGVzOiBzaG91bGRCdWJibGUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpO1xuICAgIH1cblxuICAgIHRoaXMucm9vdF8uZGlzcGF0Y2hFdmVudChldnQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0NvbXBvbmVudDtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0NvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudCc7XG5cbmV4cG9ydCB7TURDRm91bmRhdGlvbiwgTURDQ29tcG9uZW50fTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7TURDRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvaW5kZXgnO1xuXG5leHBvcnQgY2xhc3MgTURDU2xpZGFibGVEcmF3ZXJGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBoYXNDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGhhc05lY2Vzc2FyeURvbTogKCkgPT4gLyogYm9vbGVhbiAqLyBmYWxzZSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dDogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRHJhd2VySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckRyYXdlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dDogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgc2V0VHJhbnNsYXRlWDogKC8qIHZhbHVlOiBudW1iZXIgfCBudWxsICovKSA9PiB7fSxcbiAgICAgIGdldEZvY3VzYWJsZUVsZW1lbnRzOiAoKSA9PiAvKiBOb2RlTGlzdCAqLyB7fSxcbiAgICAgIHNhdmVFbGVtZW50VGFiU3RhdGU6ICgvKiBlbDogRWxlbWVudCAqLykgPT4ge30sXG4gICAgICByZXN0b3JlRWxlbWVudFRhYlN0YXRlOiAoLyogZWw6IEVsZW1lbnQgKi8pID0+IHt9LFxuICAgICAgbWFrZUVsZW1lbnRVbnRhYmJhYmxlOiAoLyogZWw6IEVsZW1lbnQgKi8pID0+IHt9LFxuICAgICAgbm90aWZ5T3BlbjogKCkgPT4ge30sXG4gICAgICBub3RpZnlDbG9zZTogKCkgPT4ge30sXG4gICAgICBpc1J0bDogKCkgPT4gLyogYm9vbGVhbiAqLyBmYWxzZSxcbiAgICAgIGdldERyYXdlcldpZHRoOiAoKSA9PiAvKiBudW1iZXIgKi8gMCxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlciwgcm9vdENzc0NsYXNzLCBhbmltYXRpbmdDc3NDbGFzcywgb3BlbkNzc0NsYXNzKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENTbGlkYWJsZURyYXdlckZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIHRoaXMucm9vdENzc0NsYXNzXyA9IHJvb3RDc3NDbGFzcztcbiAgICB0aGlzLmFuaW1hdGluZ0Nzc0NsYXNzXyA9IGFuaW1hdGluZ0Nzc0NsYXNzO1xuICAgIHRoaXMub3BlbkNzc0NsYXNzXyA9IG9wZW5Dc3NDbGFzcztcblxuICAgIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVUcmFuc2l0aW9uRW5kXyhldnQpO1xuXG4gICAgdGhpcy5pbmVydF8gPSBmYWxzZTtcblxuICAgIHRoaXMuY29tcG9uZW50VG91Y2hTdGFydEhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVUb3VjaFN0YXJ0XyhldnQpO1xuICAgIHRoaXMuY29tcG9uZW50VG91Y2hNb3ZlSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZVRvdWNoTW92ZV8oZXZ0KTtcbiAgICB0aGlzLmNvbXBvbmVudFRvdWNoRW5kSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZVRvdWNoRW5kXyhldnQpO1xuICAgIHRoaXMuZG9jdW1lbnRLZXlkb3duSGFuZGxlcl8gPSAoZXZ0KSA9PiB7XG4gICAgICBpZiAoZXZ0LmtleSAmJiBldnQua2V5ID09PSAnRXNjYXBlJyB8fCBldnQua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnN0IFJPT1QgPSB0aGlzLnJvb3RDc3NDbGFzc187XG4gICAgY29uc3QgT1BFTiA9IHRoaXMub3BlbkNzc0NsYXNzXztcblxuICAgIGlmICghdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhST09UKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke1JPT1R9IGNsYXNzIHJlcXVpcmVkIGluIHJvb3QgZWxlbWVudC5gKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaGFzTmVjZXNzYXJ5RG9tKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUmVxdWlyZWQgRE9NIG5vZGVzIG1pc3NpbmcgaW4gJHtST09UfSBjb21wb25lbnQuYCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoT1BFTikpIHtcbiAgICAgIHRoaXMuaXNPcGVuXyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGV0YWJpbmF0ZV8oKTtcbiAgICAgIHRoaXMuaXNPcGVuXyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmNvbXBvbmVudFRvdWNoU3RhcnRIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigndG91Y2htb3ZlJywgdGhpcy5jb21wb25lbnRUb3VjaE1vdmVIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigndG91Y2hlbmQnLCB0aGlzLmNvbXBvbmVudFRvdWNoRW5kSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmNvbXBvbmVudFRvdWNoU3RhcnRIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCd0b3VjaG1vdmUnLCB0aGlzLmNvbXBvbmVudFRvdWNoTW92ZUhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ3RvdWNoZW5kJywgdGhpcy5jb21wb25lbnRUb3VjaEVuZEhhbmRsZXJfKTtcbiAgICAvLyBEZXJlZ2lzdGVyIHRoZSBkb2N1bWVudCBrZXlkb3duIGhhbmRsZXIganVzdCBpbiBjYXNlIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkIHdoaWxlIHRoZSBtZW51IGlzIG9wZW4uXG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlcih0aGlzLmRvY3VtZW50S2V5ZG93bkhhbmRsZXJfKTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyKHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlcih0aGlzLmRvY3VtZW50S2V5ZG93bkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKHRoaXMuYW5pbWF0aW5nQ3NzQ2xhc3NfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKHRoaXMub3BlbkNzc0NsYXNzXyk7XG4gICAgdGhpcy5yZXRhYmluYXRlXygpO1xuICAgIC8vIERlYm91bmNlIG11bHRpcGxlIGNhbGxzXG4gICAgaWYgKCF0aGlzLmlzT3Blbl8pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5T3BlbigpO1xuICAgIH1cbiAgICB0aGlzLmlzT3Blbl8gPSB0cnVlO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlcih0aGlzLmRvY3VtZW50S2V5ZG93bkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXIodGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3ModGhpcy5hbmltYXRpbmdDc3NDbGFzc18pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3ModGhpcy5vcGVuQ3NzQ2xhc3NfKTtcbiAgICB0aGlzLmRldGFiaW5hdGVfKCk7XG4gICAgLy8gRGVib3VuY2UgbXVsdGlwbGUgY2FsbHNcbiAgICBpZiAodGhpcy5pc09wZW5fKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNsb3NlKCk7XG4gICAgfVxuICAgIHRoaXMuaXNPcGVuXyA9IGZhbHNlO1xuICB9XG5cbiAgaXNPcGVuKCkge1xuICAgIHJldHVybiB0aGlzLmlzT3Blbl87XG4gIH1cblxuICAvKipcbiAgICogIFJlbmRlciBhbGwgY2hpbGRyZW4gb2YgdGhlIGRyYXdlciBpbmVydCB3aGVuIGl0J3MgY2xvc2VkLlxuICAgKi9cbiAgZGV0YWJpbmF0ZV8oKSB7XG4gICAgaWYgKHRoaXMuaW5lcnRfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZWxlbWVudHMgPSB0aGlzLmFkYXB0ZXJfLmdldEZvY3VzYWJsZUVsZW1lbnRzKCk7XG4gICAgaWYgKGVsZW1lbnRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uc2F2ZUVsZW1lbnRUYWJTdGF0ZShlbGVtZW50c1tpXSk7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ubWFrZUVsZW1lbnRVbnRhYmJhYmxlKGVsZW1lbnRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmluZXJ0XyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogIE1ha2UgYWxsIGNoaWxkcmVuIG9mIHRoZSBkcmF3ZXIgdGFiYmFibGUgYWdhaW4gd2hlbiBpdCdzIG9wZW4uXG4gICAqL1xuICByZXRhYmluYXRlXygpIHtcbiAgICBpZiAoIXRoaXMuaW5lcnRfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZWxlbWVudHMgPSB0aGlzLmFkYXB0ZXJfLmdldEZvY3VzYWJsZUVsZW1lbnRzKCk7XG4gICAgaWYgKGVsZW1lbnRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVzdG9yZUVsZW1lbnRUYWJTdGF0ZShlbGVtZW50c1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pbmVydF8gPSBmYWxzZTtcbiAgfVxuXG4gIGhhbmRsZVRvdWNoU3RhcnRfKGV2dCkge1xuICAgIGlmICghdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyh0aGlzLm9wZW5Dc3NDbGFzc18pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldnQucG9pbnRlclR5cGUgJiYgZXZ0LnBvaW50ZXJUeXBlICE9PSAndG91Y2gnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5kaXJlY3Rpb25fID0gdGhpcy5hZGFwdGVyXy5pc1J0bCgpID8gLTEgOiAxO1xuICAgIHRoaXMuZHJhd2VyV2lkdGhfID0gdGhpcy5hZGFwdGVyXy5nZXREcmF3ZXJXaWR0aCgpO1xuICAgIHRoaXMuc3RhcnRYXyA9IGV2dC50b3VjaGVzID8gZXZ0LnRvdWNoZXNbMF0ucGFnZVggOiBldnQucGFnZVg7XG4gICAgdGhpcy5jdXJyZW50WF8gPSB0aGlzLnN0YXJ0WF87XG5cbiAgICB0aGlzLnVwZGF0ZVJhZl8gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVEcmF3ZXJfLmJpbmQodGhpcykpO1xuICB9XG5cbiAgaGFuZGxlVG91Y2hNb3ZlXyhldnQpIHtcbiAgICBpZiAoZXZ0LnBvaW50ZXJUeXBlICYmIGV2dC5wb2ludGVyVHlwZSAhPT0gJ3RvdWNoJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudFhfID0gZXZ0LnRvdWNoZXMgPyBldnQudG91Y2hlc1swXS5wYWdlWCA6IGV2dC5wYWdlWDtcbiAgfVxuXG4gIGhhbmRsZVRvdWNoRW5kXyhldnQpIHtcbiAgICBpZiAoZXZ0LnBvaW50ZXJUeXBlICYmIGV2dC5wb2ludGVyVHlwZSAhPT0gJ3RvdWNoJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucHJlcGFyZUZvclRvdWNoRW5kXygpO1xuXG4gICAgLy8gRGlkIHRoZSB1c2VyIGNsb3NlIHRoZSBkcmF3ZXIgYnkgbW9yZSB0aGFuIDUwJT9cbiAgICBpZiAoTWF0aC5hYnModGhpcy5uZXdQb3NpdGlvbl8gLyB0aGlzLmRyYXdlcldpZHRoXykgPj0gMC41KSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRyaWdnZXJpbmcgYW4gb3BlbiBoZXJlIG1lYW5zIHdlJ2xsIGdldCBhIG5pY2UgYW5pbWF0aW9uIGJhY2sgdG8gdGhlIGZ1bGx5IG9wZW4gc3RhdGUuXG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICBwcmVwYXJlRm9yVG91Y2hFbmRfKCkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlUmFmXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRUcmFuc2xhdGVYKG51bGwpO1xuICB9XG5cbiAgdXBkYXRlRHJhd2VyXygpIHtcbiAgICB0aGlzLnVwZGF0ZVJhZl8gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVEcmF3ZXJfLmJpbmQodGhpcykpO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0VHJhbnNsYXRlWCh0aGlzLm5ld1Bvc2l0aW9uXyk7XG4gIH1cblxuICBnZXQgbmV3UG9zaXRpb25fKCkge1xuICAgIGxldCBuZXdQb3MgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMuZGlyZWN0aW9uXyA9PT0gMSkge1xuICAgICAgbmV3UG9zID0gTWF0aC5taW4oMCwgdGhpcy5jdXJyZW50WF8gLSB0aGlzLnN0YXJ0WF8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdQb3MgPSBNYXRoLm1heCgwLCB0aGlzLmN1cnJlbnRYXyAtIHRoaXMuc3RhcnRYXyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1BvcztcbiAgfVxuXG4gIGlzUm9vdFRyYW5zaXRpb25pbmdFdmVudFRhcmdldF8oKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDU2xpZGFibGVEcmF3ZXJGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIHRydWUgb3IgZmFsc2VcbiAgICAvLyBpZiB0aGUgZXZlbnQgdGFyZ2V0IGlzIHRoZSByb290IGV2ZW50IHRhcmdldCBjdXJyZW50bHkgdHJhbnNpdGlvbmluZy5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBoYW5kbGVUcmFuc2l0aW9uRW5kXyhldnQpIHtcbiAgICBpZiAodGhpcy5pc1Jvb3RUcmFuc2l0aW9uaW5nRXZlbnRUYXJnZXRfKGV2dC50YXJnZXQpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKHRoaXMuYW5pbWF0aW5nQ3NzQ2xhc3NfKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyKHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfKTtcbiAgICB9XG4gIH07XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5leHBvcnQge0ZPQ1VTQUJMRV9FTEVNRU5UU30gZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0IHtNRENTbGlkYWJsZURyYXdlckZvdW5kYXRpb259IGZyb20gJy4vZm91bmRhdGlvbic7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0ZPQ1VTQUJMRV9FTEVNRU5UU30gZnJvbSAnLi4vc2xpZGFibGUvaW5kZXgnO1xuXG5leHBvcnQgY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgUk9PVDogJ21kYy1kcmF3ZXItLXBlcnNpc3RlbnQnLFxuICBPUEVOOiAnbWRjLWRyYXdlci0tb3BlbicsXG4gIEFOSU1BVElORzogJ21kYy1kcmF3ZXItLWFuaW1hdGluZycsXG59O1xuXG5leHBvcnQgY29uc3Qgc3RyaW5ncyA9IHtcbiAgRFJBV0VSX1NFTEVDVE9SOiAnLm1kYy1kcmF3ZXItLXBlcnNpc3RlbnQgLm1kYy1kcmF3ZXJfX2RyYXdlcicsXG4gIEZPQ1VTQUJMRV9FTEVNRU5UUyxcbiAgT1BFTl9FVkVOVDogJ01EQ1BlcnNpc3RlbnREcmF3ZXI6b3BlbicsXG4gIENMT1NFX0VWRU5UOiAnTURDUGVyc2lzdGVudERyYXdlcjpjbG9zZScsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtNRENTbGlkYWJsZURyYXdlckZvdW5kYXRpb259IGZyb20gJy4uL3NsaWRhYmxlL2luZGV4JztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNRENQZXJzaXN0ZW50RHJhd2VyRm91bmRhdGlvbiBleHRlbmRzIE1EQ1NsaWRhYmxlRHJhd2VyRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oTURDU2xpZGFibGVEcmF3ZXJGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCB7XG4gICAgICBpc0RyYXdlcjogKCkgPT4gZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoXG4gICAgICBPYmplY3QuYXNzaWduKE1EQ1BlcnNpc3RlbnREcmF3ZXJGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSxcbiAgICAgIE1EQ1BlcnNpc3RlbnREcmF3ZXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuUk9PVCxcbiAgICAgIE1EQ1BlcnNpc3RlbnREcmF3ZXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQU5JTUFUSU5HLFxuICAgICAgTURDUGVyc2lzdGVudERyYXdlckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5PUEVOKTtcbiAgfVxuXG4gIGlzUm9vdFRyYW5zaXRpb25pbmdFdmVudFRhcmdldF8oZWwpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5pc0RyYXdlcihlbCk7XG4gIH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmNvbnN0IFRBQl9EQVRBID0gJ2RhdGEtbWRjLXRhYmluZGV4JztcbmNvbnN0IFRBQl9EQVRBX0hBTkRMRUQgPSAnZGF0YS1tZGMtdGFiaW5kZXgtaGFuZGxlZCc7XG5cbmxldCBzdG9yZWRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWVfO1xubGV0IHN1cHBvcnRzUGFzc2l2ZV87XG5cbi8vIFJlbWFwIHRvdWNoIGV2ZW50cyB0byBwb2ludGVyIGV2ZW50cywgaWYgdGhlIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IHRvdWNoIGV2ZW50cy5cbmV4cG9ydCBmdW5jdGlvbiByZW1hcEV2ZW50KGV2ZW50TmFtZSwgZ2xvYmFsT2JqID0gd2luZG93KSB7XG4gIGlmICghKCdvbnRvdWNoc3RhcnQnIGluIGdsb2JhbE9iai5kb2N1bWVudCkpIHtcbiAgICBzd2l0Y2ggKGV2ZW50TmFtZSkge1xuICAgIGNhc2UgJ3RvdWNoc3RhcnQnOlxuICAgICAgcmV0dXJuICdwb2ludGVyZG93bic7XG4gICAgY2FzZSAndG91Y2htb3ZlJzpcbiAgICAgIHJldHVybiAncG9pbnRlcm1vdmUnO1xuICAgIGNhc2UgJ3RvdWNoZW5kJzpcbiAgICAgIHJldHVybiAncG9pbnRlcnVwJztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGV2ZW50TmFtZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZXZlbnROYW1lO1xufVxuXG4vLyBDaG9vc2UgdGhlIGNvcnJlY3QgdHJhbnNmb3JtIHByb3BlcnR5IHRvIHVzZSBvbiB0aGUgY3VycmVudCBicm93c2VyLlxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zZm9ybVByb3BlcnR5TmFtZShnbG9iYWxPYmogPSB3aW5kb3csIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdG9yZWRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgY29uc3QgZWwgPSBnbG9iYWxPYmouZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdHJhbnNmb3JtUHJvcGVydHlOYW1lID0gKCd0cmFuc2Zvcm0nIGluIGVsLnN0eWxlID8gJ3RyYW5zZm9ybScgOiAnLXdlYmtpdC10cmFuc2Zvcm0nKTtcbiAgICBzdG9yZWRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWVfID0gdHJhbnNmb3JtUHJvcGVydHlOYW1lO1xuICB9XG5cbiAgcmV0dXJuIHN0b3JlZFRyYW5zZm9ybVByb3BlcnR5TmFtZV87XG59XG5cbi8vIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgQ1NTIHByb3BlcnRpZXMuXG5leHBvcnQgZnVuY3Rpb24gc3VwcG9ydHNDc3NDdXN0b21Qcm9wZXJ0aWVzKGdsb2JhbE9iaiA9IHdpbmRvdykge1xuICBpZiAoJ0NTUycgaW4gZ2xvYmFsT2JqKSB7XG4gICAgcmV0dXJuIGdsb2JhbE9iai5DU1Muc3VwcG9ydHMoJygtLWNvbG9yOiByZWQpJyk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzLCBhbmQgaWYgc28sIHVzZSB0aGVtLlxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5UGFzc2l2ZShnbG9iYWxPYmogPSB3aW5kb3csIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdXBwb3J0c1Bhc3NpdmVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGdsb2JhbE9iai5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge2dldCBwYXNzaXZlKCkge1xuICAgICAgICBpc1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICB9fSk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgICBzdXBwb3J0c1Bhc3NpdmVfID0gaXNTdXBwb3J0ZWQ7XG4gIH1cblxuICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlXyA/IHtwYXNzaXZlOiB0cnVlfSA6IGZhbHNlO1xufVxuXG4vLyBTYXZlIHRoZSB0YWIgc3RhdGUgZm9yIGFuIGVsZW1lbnQuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZUVsZW1lbnRUYWJTdGF0ZShlbCkge1xuICBpZiAoZWwuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpKSB7XG4gICAgZWwuc2V0QXR0cmlidXRlKFRBQl9EQVRBLCBlbC5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JykpO1xuICB9XG4gIGVsLnNldEF0dHJpYnV0ZShUQUJfREFUQV9IQU5ETEVELCB0cnVlKTtcbn1cblxuLy8gUmVzdG9yZSB0aGUgdGFiIHN0YXRlIGZvciBhbiBlbGVtZW50LCBpZiBpdCB3YXMgc2F2ZWQuXG5leHBvcnQgZnVuY3Rpb24gcmVzdG9yZUVsZW1lbnRUYWJTdGF0ZShlbCkge1xuICAvLyBPbmx5IG1vZGlmeSBlbGVtZW50cyB3ZSd2ZSBhbHJlYWR5IGhhbmRsZWQsIGluIGNhc2UgYW55dGhpbmcgd2FzIGR5bmFtaWNhbGx5IGFkZGVkIHNpbmNlIHdlIHNhdmVkIHN0YXRlLlxuICBpZiAoZWwuaGFzQXR0cmlidXRlKFRBQl9EQVRBX0hBTkRMRUQpKSB7XG4gICAgaWYgKGVsLmhhc0F0dHJpYnV0ZShUQUJfREFUQSkpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCBlbC5nZXRBdHRyaWJ1dGUoVEFCX0RBVEEpKTtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShUQUJfREFUQSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICB9XG4gICAgZWwucmVtb3ZlQXR0cmlidXRlKFRBQl9EQVRBX0hBTkRMRUQpO1xuICB9XG59XG4iLCI8dGVtcGxhdGU+XHJcbiAgPGFzaWRlXHJcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCJcclxuICAgIGNsYXNzPVwibWRjLXBlcnNpc3RlbnQtZHJhd2VyIG1kYy1kcmF3ZXItLXBlcnNpc3RlbnQgbWRjLXR5cG9ncmFwaHlcIj5cclxuICAgIDxuYXZcclxuICAgICAgcmVmPVwiZHJhd2VyXCJcclxuICAgICAgY2xhc3M9XCJtZGMtZHJhd2VyX19kcmF3ZXJcIj5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIHYtaWY9XCJ0b29sYmFyU3BhY2VyXCJcclxuICAgICAgICBjbGFzcz1cIm1kYy1kcmF3ZXJfX3Rvb2xiYXItc3BhY2VyXCIvPlxyXG4gICAgICA8c2xvdCAvPlxyXG4gICAgPC9uYXY+XHJcbiAgPC9hc2lkZT5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBNRENQZXJzaXN0ZW50RHJhd2VyRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvZHJhd2VyL3BlcnNpc3RlbnQvZm91bmRhdGlvbidcclxuaW1wb3J0ICogYXMgdXRpbCBmcm9tICdAbWF0ZXJpYWwvZHJhd2VyL3V0aWwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1wZXJzaXN0ZW50LWRyYXdlcicsXHJcbiAgbW9kZWw6IHtcclxuICAgIHByb3A6ICdvcGVuJyxcclxuICAgIGV2ZW50OiAnY2hhbmdlJ1xyXG4gIH0sXHJcbiAgcHJvcHM6IHtcclxuICAgICd0b29sYmFyLXNwYWNlcic6IEJvb2xlYW4sXHJcbiAgICBvcGVuOiBCb29sZWFuXHJcbiAgfSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2xhc3Nlczoge31cclxuICAgIH1cclxuICB9LFxyXG4gIHdhdGNoOiB7XHJcbiAgICBvcGVuOiAnX3JlZnJlc2gnXHJcbiAgfSxcclxuICBtb3VudGVkKCkge1xyXG4gICAgY29uc3QgeyBGT0NVU0FCTEVfRUxFTUVOVFMgfSA9IE1EQ1BlcnNpc3RlbnREcmF3ZXJGb3VuZGF0aW9uLnN0cmluZ3NcclxuXHJcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDUGVyc2lzdGVudERyYXdlckZvdW5kYXRpb24oe1xyXG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4ge1xyXG4gICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSlcclxuICAgICAgfSxcclxuICAgICAgaGFzQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpXHJcbiAgICAgIH0sXHJcbiAgICAgIGhhc05lY2Vzc2FyeURvbTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuJHJlZnMuZHJhd2VyXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgIHV0aWwucmVtYXBFdmVudChldnQpLFxyXG4gICAgICAgICAgaGFuZGxlcixcclxuICAgICAgICAgIHV0aWwuYXBwbHlQYXNzaXZlKClcclxuICAgICAgICApXHJcbiAgICAgIH0sXHJcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgdXRpbC5yZW1hcEV2ZW50KGV2dCksXHJcbiAgICAgICAgICBoYW5kbGVyLFxyXG4gICAgICAgICAgdXRpbC5hcHBseVBhc3NpdmUoKVxyXG4gICAgICAgIClcclxuICAgICAgfSxcclxuICAgICAgcmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICB0aGlzLiRyZWZzLmRyYXdlci5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgdXRpbC5yZW1hcEV2ZW50KGV2dCksXHJcbiAgICAgICAgICBoYW5kbGVyLFxyXG4gICAgICAgICAgdXRpbC5hcHBseVBhc3NpdmUoKVxyXG4gICAgICAgIClcclxuICAgICAgfSxcclxuICAgICAgZGVyZWdpc3RlckRyYXdlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuJHJlZnMuZHJhd2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICB1dGlsLnJlbWFwRXZlbnQoZXZ0KSxcclxuICAgICAgICAgIGhhbmRsZXIsXHJcbiAgICAgICAgICB1dGlsLmFwcGx5UGFzc2l2ZSgpXHJcbiAgICAgICAgKVxyXG4gICAgICB9LFxyXG4gICAgICByZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyOiBoYW5kbGVyID0+IHtcclxuICAgICAgICB0aGlzLiRyZWZzLmRyYXdlci5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgaGFuZGxlcilcclxuICAgICAgfSxcclxuICAgICAgZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyOiBoYW5kbGVyID0+IHtcclxuICAgICAgICB0aGlzLiRyZWZzLmRyYXdlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgaGFuZGxlcilcclxuICAgICAgfSxcclxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyOiBoYW5kbGVyID0+IHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlcilcclxuICAgICAgfSxcclxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXI6IGhhbmRsZXIgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyKVxyXG4gICAgICB9LFxyXG4gICAgICBnZXREcmF3ZXJXaWR0aDogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRyZWZzLmRyYXdlci5vZmZzZXRXaWR0aFxyXG4gICAgICB9LFxyXG4gICAgICBzZXRUcmFuc2xhdGVYOiB2YWx1ZSA9PiB7XHJcbiAgICAgICAgdGhpcy4kcmVmcy5kcmF3ZXIuc3R5bGUuc2V0UHJvcGVydHkoXHJcbiAgICAgICAgICB1dGlsLmdldFRyYW5zZm9ybVByb3BlcnR5TmFtZSgpLFxyXG4gICAgICAgICAgdmFsdWUgPT09IG51bGwgPyBudWxsIDogYHRyYW5zbGF0ZVgoJHt2YWx1ZX1weClgXHJcbiAgICAgICAgKVxyXG4gICAgICB9LFxyXG4gICAgICBnZXRGb2N1c2FibGVFbGVtZW50czogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRyZWZzLmRyYXdlci5xdWVyeVNlbGVjdG9yQWxsKEZPQ1VTQUJMRV9FTEVNRU5UUylcclxuICAgICAgfSxcclxuICAgICAgc2F2ZUVsZW1lbnRUYWJTdGF0ZTogZWwgPT4ge1xyXG4gICAgICAgIHV0aWwuc2F2ZUVsZW1lbnRUYWJTdGF0ZShlbClcclxuICAgICAgfSxcclxuICAgICAgcmVzdG9yZUVsZW1lbnRUYWJTdGF0ZTogZWwgPT4ge1xyXG4gICAgICAgIHV0aWwucmVzdG9yZUVsZW1lbnRUYWJTdGF0ZShlbClcclxuICAgICAgfSxcclxuICAgICAgbWFrZUVsZW1lbnRVbnRhYmJhYmxlOiBlbCA9PiB7XHJcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKVxyXG4gICAgICB9LFxyXG4gICAgICBub3RpZnlPcGVuOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdHJ1ZSlcclxuICAgICAgICB0aGlzLiRlbWl0KCdvcGVuJylcclxuICAgICAgfSxcclxuICAgICAgbm90aWZ5Q2xvc2U6ICgpID0+IHtcclxuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBmYWxzZSlcclxuICAgICAgICB0aGlzLiRlbWl0KCdjbG9zZScpXHJcbiAgICAgIH0sXHJcbiAgICAgIGlzUnRsOiAoKSA9PiB7XHJcbiAgICAgICAgLyogZ2xvYmFsIGdldENvbXB1dGVkU3R5bGUgKi9cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLiRlbCkuZ2V0UHJvcGVydHlWYWx1ZSgnZGlyZWN0aW9uJykgPT09ICdydGwnXHJcbiAgICAgICAgKVxyXG4gICAgICB9LFxyXG4gICAgICBpc0RyYXdlcjogZWwgPT4ge1xyXG4gICAgICAgIHJldHVybiBlbCA9PT0gdGhpcy4kcmVmcy5kcmF3ZXJcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXHJcbiAgICB0aGlzLl9yZWZyZXNoKClcclxuICB9LFxyXG4gIGJlZm9yZURlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbnVsbFxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgX3JlZnJlc2goKSB7XHJcbiAgICAgIGlmICh0aGlzLm9wZW4pIHtcclxuICAgICAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLm9wZW4oKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24uY2xvc2UoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0ZPQ1VTQUJMRV9FTEVNRU5UU30gZnJvbSAnLi4vc2xpZGFibGUvaW5kZXgnO1xuXG5leHBvcnQgY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgUk9PVDogJ21kYy1kcmF3ZXItLXRlbXBvcmFyeScsXG4gIE9QRU46ICdtZGMtZHJhd2VyLS1vcGVuJyxcbiAgQU5JTUFUSU5HOiAnbWRjLWRyYXdlci0tYW5pbWF0aW5nJyxcbiAgU0NST0xMX0xPQ0s6ICdtZGMtZHJhd2VyLXNjcm9sbC1sb2NrJyxcbn07XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdzID0ge1xuICBEUkFXRVJfU0VMRUNUT1I6ICcubWRjLWRyYXdlci0tdGVtcG9yYXJ5IC5tZGMtZHJhd2VyX19kcmF3ZXInLFxuICBPUEFDSVRZX1ZBUl9OQU1FOiAnLS1tZGMtdGVtcG9yYXJ5LWRyYXdlci1vcGFjaXR5JyxcbiAgRk9DVVNBQkxFX0VMRU1FTlRTLFxuICBPUEVOX0VWRU5UOiAnTURDVGVtcG9yYXJ5RHJhd2VyOm9wZW4nLFxuICBDTE9TRV9FVkVOVDogJ01EQ1RlbXBvcmFyeURyYXdlcjpjbG9zZScsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtNRENTbGlkYWJsZURyYXdlckZvdW5kYXRpb259IGZyb20gJy4uL3NsaWRhYmxlL2luZGV4JztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNRENUZW1wb3JhcnlEcmF3ZXJGb3VuZGF0aW9uIGV4dGVuZHMgTURDU2xpZGFibGVEcmF3ZXJGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihNRENTbGlkYWJsZURyYXdlckZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIHtcbiAgICAgIGFkZEJvZHlDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUJvZHlDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGlzRHJhd2VyOiAoKSA9PiBmYWxzZSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAoLyogdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBldmVudFRhcmdldEhhc0NsYXNzOiAoLyogdGFyZ2V0OiBFdmVudFRhcmdldCwgY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IC8qIGJvb2xlYW4gKi8gZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoXG4gICAgICBPYmplY3QuYXNzaWduKE1EQ1RlbXBvcmFyeURyYXdlckZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpLFxuICAgICAgTURDVGVtcG9yYXJ5RHJhd2VyRm91bmRhdGlvbi5jc3NDbGFzc2VzLlJPT1QsXG4gICAgICBNRENUZW1wb3JhcnlEcmF3ZXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQU5JTUFUSU5HLFxuICAgICAgTURDVGVtcG9yYXJ5RHJhd2VyRm91bmRhdGlvbi5jc3NDbGFzc2VzLk9QRU4pO1xuXG4gICAgdGhpcy5jb21wb25lbnRDbGlja0hhbmRsZXJfID0gKGV2dCkgPT4ge1xuICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uZXZlbnRUYXJnZXRIYXNDbGFzcyhldnQudGFyZ2V0LCBjc3NDbGFzc2VzLlJPT1QpKSB7XG4gICAgICAgIHRoaXMuY2xvc2UodHJ1ZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgc3VwZXIuaW5pdCgpO1xuXG4gICAgLy8gTWFrZSBicm93c2VyIGF3YXJlIG9mIGN1c3RvbSBwcm9wZXJ0eSBiZWluZyB1c2VkIGluIHRoaXMgZWxlbWVudC5cbiAgICAvLyBXb3JrYXJvdW5kIGZvciBjZXJ0YWluIHR5cGVzIG9mIGhhcmQtdG8tcmVwcm9kdWNlIGhlaXNlbmJ1Z3MuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZSgwKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY29tcG9uZW50Q2xpY2tIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcblxuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmNvbXBvbmVudENsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuZW5hYmxlU2Nyb2xsXygpO1xuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLmRpc2FibGVTY3JvbGxfKCk7XG4gICAgLy8gTWFrZSBzdXJlIGN1c3RvbSBwcm9wZXJ0eSB2YWx1ZXMgYXJlIGNsZWFyZWQgYmVmb3JlIHN0YXJ0aW5nLlxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoJycpO1xuXG4gICAgc3VwZXIub3BlbigpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgLy8gTWFrZSBzdXJlIGN1c3RvbSBwcm9wZXJ0eSB2YWx1ZXMgYXJlIGNsZWFyZWQgYmVmb3JlIG1ha2luZyBhbnkgY2hhbmdlcy5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKCcnKTtcblxuICAgIHN1cGVyLmNsb3NlKCk7XG4gIH1cblxuICBwcmVwYXJlRm9yVG91Y2hFbmRfKCkge1xuICAgIHN1cGVyLnByZXBhcmVGb3JUb3VjaEVuZF8oKTtcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoJycpO1xuICB9XG5cbiAgdXBkYXRlRHJhd2VyXygpIHtcbiAgICBzdXBlci51cGRhdGVEcmF3ZXJfKCk7XG5cbiAgICBjb25zdCBuZXdPcGFjaXR5ID0gTWF0aC5tYXgoMCwgMSArIHRoaXMuZGlyZWN0aW9uXyAqICh0aGlzLm5ld1Bvc2l0aW9uXyAvIHRoaXMuZHJhd2VyV2lkdGhfKSk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShuZXdPcGFjaXR5KTtcbiAgfVxuXG4gIGlzUm9vdFRyYW5zaXRpb25pbmdFdmVudFRhcmdldF8oZWwpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5pc0RyYXdlcihlbCk7XG4gIH1cblxuICBoYW5kbGVUcmFuc2l0aW9uRW5kXyhldnQpIHtcbiAgICBzdXBlci5oYW5kbGVUcmFuc2l0aW9uRW5kXyhldnQpO1xuICAgIGlmICghdGhpcy5pc09wZW5fKSB7XG4gICAgICB0aGlzLmVuYWJsZVNjcm9sbF8oKTtcbiAgICB9XG4gIH07XG5cbiAgZGlzYWJsZVNjcm9sbF8oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRCb2R5Q2xhc3MoY3NzQ2xhc3Nlcy5TQ1JPTExfTE9DSyk7XG4gIH1cblxuICBlbmFibGVTY3JvbGxfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQm9keUNsYXNzKGNzc0NsYXNzZXMuU0NST0xMX0xPQ0spO1xuICB9XG59XG4iLCI8dGVtcGxhdGU+XHJcbiAgPGFzaWRlXHJcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCJcclxuICAgIGNsYXNzPVwibWRjLXRlbXBvcmFyeS1kcmF3ZXIgbWRjLWRyYXdlci0tdGVtcG9yYXJ5IG1kYy10eXBvZ3JhcGh5XCI+XHJcbiAgICA8bmF2XHJcbiAgICAgIHJlZj1cImRyYXdlclwiXHJcbiAgICAgIGNsYXNzPVwibWRjLWRyYXdlcl9fZHJhd2VyXCI+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICB2LWlmPVwidG9vbGJhclNwYWNlclwiXHJcbiAgICAgICAgY2xhc3M9XCJtZGMtZHJhd2VyX190b29sYmFyLXNwYWNlclwiLz5cclxuICAgICAgPHNsb3QgLz5cclxuICAgIDwvbmF2PlxyXG4gIDwvYXNpZGU+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgTURDVGVtcG9yYXJ5RHJhd2VyRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvZHJhd2VyL3RlbXBvcmFyeS9mb3VuZGF0aW9uJ1xyXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJ0BtYXRlcmlhbC9kcmF3ZXIvdXRpbCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLXRlbXBvcmFyeS1kcmF3ZXInLFxyXG4gIG1vZGVsOiB7XHJcbiAgICBwcm9wOiAnb3BlbicsXHJcbiAgICBldmVudDogJ2NoYW5nZSdcclxuICB9LFxyXG4gIHByb3BzOiB7XHJcbiAgICBvcGVuOiBCb29sZWFuLFxyXG4gICAgJ3Rvb2xiYXItc3BhY2VyJzogQm9vbGVhblxyXG4gIH0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNsYXNzZXM6IHt9XHJcbiAgICB9XHJcbiAgfSxcclxuICB3YXRjaDoge1xyXG4gICAgb3BlbjogJ19yZWZyZXNoJ1xyXG4gIH0sXHJcbiAgbW91bnRlZCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgRk9DVVNBQkxFX0VMRU1FTlRTLFxyXG4gICAgICBPUEFDSVRZX1ZBUl9OQU1FXHJcbiAgICB9ID0gTURDVGVtcG9yYXJ5RHJhd2VyRm91bmRhdGlvbi5zdHJpbmdzXHJcblxyXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ1RlbXBvcmFyeURyYXdlckZvdW5kYXRpb24oe1xyXG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4ge1xyXG4gICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSlcclxuICAgICAgfSxcclxuICAgICAgaGFzQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpXHJcbiAgICAgIH0sXHJcbiAgICAgIGFkZEJvZHlDbGFzczogY2xhc3NOYW1lID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxyXG4gICAgICByZW1vdmVCb2R5Q2xhc3M6IGNsYXNzTmFtZSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcclxuICAgICAgZXZlbnRUYXJnZXRIYXNDbGFzczogKHRhcmdldCwgY2xhc3NOYW1lKSA9PlxyXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcclxuICAgICAgaGFzTmVjZXNzYXJ5RG9tOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy4kcmVmcy5kcmF3ZXJcclxuICAgICAgfSxcclxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgdXRpbC5yZW1hcEV2ZW50KGV2dCksXHJcbiAgICAgICAgICBoYW5kbGVyLFxyXG4gICAgICAgICAgdXRpbC5hcHBseVBhc3NpdmUoKVxyXG4gICAgICAgIClcclxuICAgICAgfSxcclxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICB1dGlsLnJlbWFwRXZlbnQoZXZ0KSxcclxuICAgICAgICAgIGhhbmRsZXIsXHJcbiAgICAgICAgICB1dGlsLmFwcGx5UGFzc2l2ZSgpXHJcbiAgICAgICAgKVxyXG4gICAgICB9LFxyXG4gICAgICByZWdpc3RlckRyYXdlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuJHJlZnMuZHJhd2VyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICB1dGlsLnJlbWFwRXZlbnQoZXZ0KSxcclxuICAgICAgICAgIGhhbmRsZXIsXHJcbiAgICAgICAgICB1dGlsLmFwcGx5UGFzc2l2ZSgpXHJcbiAgICAgICAgKVxyXG4gICAgICB9LFxyXG4gICAgICBkZXJlZ2lzdGVyRHJhd2VySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kcmVmcy5kcmF3ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgIHV0aWwucmVtYXBFdmVudChldnQpLFxyXG4gICAgICAgICAgaGFuZGxlcixcclxuICAgICAgICAgIHV0aWwuYXBwbHlQYXNzaXZlKClcclxuICAgICAgICApXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXI6IGhhbmRsZXIgPT4ge1xyXG4gICAgICAgIHRoaXMuJHJlZnMuZHJhd2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBoYW5kbGVyKVxyXG4gICAgICB9LFxyXG4gICAgICBkZXJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXI6IGhhbmRsZXIgPT4ge1xyXG4gICAgICAgIHRoaXMuJHJlZnMuZHJhd2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBoYW5kbGVyKVxyXG4gICAgICB9LFxyXG4gICAgICByZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXI6IGhhbmRsZXIgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyKVxyXG4gICAgICB9LFxyXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlcjogaGFuZGxlciA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpXHJcbiAgICAgIH0sXHJcbiAgICAgIGdldERyYXdlcldpZHRoOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJlZnMuZHJhd2VyLm9mZnNldFdpZHRoXHJcbiAgICAgIH0sXHJcbiAgICAgIHNldFRyYW5zbGF0ZVg6IHZhbHVlID0+IHtcclxuICAgICAgICB0aGlzLiRyZWZzLmRyYXdlci5zdHlsZS5zZXRQcm9wZXJ0eShcclxuICAgICAgICAgIHV0aWwuZ2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lKCksXHJcbiAgICAgICAgICB2YWx1ZSA9PT0gbnVsbCA/IG51bGwgOiBgdHJhbnNsYXRlWCgke3ZhbHVlfXB4KWBcclxuICAgICAgICApXHJcbiAgICAgIH0sXHJcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiB2YWx1ZSA9PiB7XHJcbiAgICAgICAgaWYgKHV0aWwuc3VwcG9ydHNDc3NDdXN0b21Qcm9wZXJ0aWVzKCkpIHtcclxuICAgICAgICAgIHRoaXMuJGVsLnN0eWxlLnNldFByb3BlcnR5KE9QQUNJVFlfVkFSX05BTUUsIHZhbHVlKVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZ2V0Rm9jdXNhYmxlRWxlbWVudHM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kcmVmcy5kcmF3ZXIucXVlcnlTZWxlY3RvckFsbChGT0NVU0FCTEVfRUxFTUVOVFMpXHJcbiAgICAgIH0sXHJcbiAgICAgIHNhdmVFbGVtZW50VGFiU3RhdGU6IGVsID0+IHtcclxuICAgICAgICB1dGlsLnNhdmVFbGVtZW50VGFiU3RhdGUoZWwpXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlc3RvcmVFbGVtZW50VGFiU3RhdGU6IGVsID0+IHtcclxuICAgICAgICB1dGlsLnJlc3RvcmVFbGVtZW50VGFiU3RhdGUoZWwpXHJcbiAgICAgIH0sXHJcbiAgICAgIG1ha2VFbGVtZW50VW50YWJiYWJsZTogZWwgPT4ge1xyXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSlcclxuICAgICAgfSxcclxuICAgICAgbm90aWZ5T3BlbjogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIHRydWUpXHJcbiAgICAgICAgdGhpcy4kZW1pdCgnb3BlbicpXHJcbiAgICAgIH0sXHJcbiAgICAgIG5vdGlmeUNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgZmFsc2UpXHJcbiAgICAgICAgdGhpcy4kZW1pdCgnY2xvc2UnKVxyXG4gICAgICB9LFxyXG4gICAgICBpc1J0bDogKCkgPT4ge1xyXG4gICAgICAgIC8qIGdsb2JhbCBnZXRDb21wdXRlZFN0eWxlICovXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIGdldENvbXB1dGVkU3R5bGUodGhpcy4kZWwpLmdldFByb3BlcnR5VmFsdWUoJ2RpcmVjdGlvbicpID09PSAncnRsJ1xyXG4gICAgICAgIClcclxuICAgICAgfSxcclxuICAgICAgaXNEcmF3ZXI6IGVsID0+IGVsID09PSB0aGlzLiRyZWZzLmRyYXdlclxyXG4gICAgfSlcclxuICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXHJcbiAgICB0aGlzLl9yZWZyZXNoKClcclxuICB9LFxyXG4gIGJlZm9yZURlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbnVsbFxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgX3JlZnJlc2goKSB7XHJcbiAgICAgIGlmICh0aGlzLm9wZW4pIHtcclxuICAgICAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLm9wZW4oKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24uY2xvc2UoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGNvbXBvbmVudFxyXG4gICAgcmVmPVwiZHJhd2VyXCJcclxuICAgIDppcz1cInR5cGVcIlxyXG4gICAgdi1tb2RlbD1cIm9wZW5fXCJcclxuICAgIDp0b29sYmFyLXNwYWNlcj1cInRvb2xiYXJTcGFjZXJcIlxyXG4gICAgY2xhc3M9XCJtZGMtZHJhd2VyXCJcclxuICAgIEBjaGFuZ2U9XCJvbkNoYW5nZVwiXHJcbiAgICBAb3Blbj1cIiRlbWl0KCdvcGVuJylcIlxyXG4gICAgQGNsb3NlPVwiJGVtaXQoJ2Nsb3NlJylcIiA+XHJcbiAgICA8c2xvdCAvPlxyXG4gIDwvY29tcG9uZW50PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IG1kY1Blcm1hbmVudERyYXdlciBmcm9tICcuL21kYy1wZXJtYW5lbnQtZHJhd2VyLnZ1ZSdcclxuaW1wb3J0IG1kY1BlcnNpc3RlbnREcmF3ZXIgZnJvbSAnLi9tZGMtcGVyc2lzdGVudC1kcmF3ZXIudnVlJ1xyXG5pbXBvcnQgbWRjVGVtcG9yYXJ5RHJhd2VyIGZyb20gJy4vbWRjLXRlbXBvcmFyeS1kcmF3ZXIudnVlJ1xyXG5cclxuY29uc3QgbWVkaWEgPSBuZXcgY2xhc3Mge1xyXG4gIGdldCBzbWFsbCgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMuX3NtYWxsIHx8ICh0aGlzLl9zbWFsbCA9IHdpbmRvdy5tYXRjaE1lZGlhKCcobWF4LXdpZHRoOiA4MzlweCknKSlcclxuICAgIClcclxuICB9XHJcblxyXG4gIGdldCBsYXJnZSgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMuX2xhcmdlIHx8ICh0aGlzLl9sYXJnZSA9IHdpbmRvdy5tYXRjaE1lZGlhKCcobWluLXdpZHRoOiAxMjAwcHgpJykpXHJcbiAgICApXHJcbiAgfVxyXG59KClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLWRyYXdlcicsXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgJ21kYy1wZXJtYW5lbnQtZHJhd2VyJzogbWRjUGVybWFuZW50RHJhd2VyLFxyXG4gICAgJ21kYy1wZXJzaXN0ZW50LWRyYXdlcic6IG1kY1BlcnNpc3RlbnREcmF3ZXIsXHJcbiAgICAnbWRjLXRlbXBvcmFyeS1kcmF3ZXInOiBtZGNUZW1wb3JhcnlEcmF3ZXJcclxuICB9LFxyXG4gIG1vZGVsOiB7XHJcbiAgICBwcm9wOiAnb3BlbicsXHJcbiAgICBldmVudDogJ2NoYW5nZSdcclxuICB9LFxyXG4gIHByb3BzOiB7XHJcbiAgICBvcGVuOiBCb29sZWFuLFxyXG4gICAgcGVybWFuZW50OiBCb29sZWFuLFxyXG4gICAgcGVyc2lzdGVudDogQm9vbGVhbixcclxuICAgIHRlbXBvcmFyeTogQm9vbGVhbixcclxuICAgIGRyYXdlclR5cGU6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHZhbCBpbiBbJ3RlbXBvcmFyeScsICdwZXJzaXN0ZW50JywgJ3Blcm1hbmVudCddXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0b29sYmFyU3BhY2VyOiBCb29sZWFuLFxyXG4gICAgdG9nZ2xlT246IFN0cmluZyxcclxuICAgIHRvZ2dsZU9uU291cmNlOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IGZhbHNlIH0sXHJcbiAgICBvcGVuT246IFN0cmluZyxcclxuICAgIG9wZW5PblNvdXJjZTogeyB0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiBmYWxzZSB9LFxyXG4gICAgY2xvc2VPbjogU3RyaW5nLFxyXG4gICAgY2xvc2VPblNvdXJjZTogeyB0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiBmYWxzZSB9XHJcbiAgfSxcclxuICBwcm92aWRlKCkge1xyXG4gICAgcmV0dXJuIHsgbWRjRHJhd2VyOiB0aGlzIH1cclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzbWFsbDogZmFsc2UsXHJcbiAgICAgIGxhcmdlOiBmYWxzZSxcclxuICAgICAgb3Blbl86IGZhbHNlXHJcbiAgICB9XHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgdHlwZSgpIHtcclxuICAgICAgaWYgKHRoaXMucGVybWFuZW50KSB7XHJcbiAgICAgICAgcmV0dXJuICdtZGMtcGVybWFuZW50LWRyYXdlcidcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnBlcnNpc3RlbnQpIHtcclxuICAgICAgICByZXR1cm4gJ21kYy1wZXJzaXN0ZW50LWRyYXdlcidcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnRlbXBvcmFyeSkge1xyXG4gICAgICAgIHJldHVybiAnbWRjLXRlbXBvcmFyeS1kcmF3ZXInXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmRyYXdlclR5cGUpIHtcclxuICAgICAgICAgIGNhc2UgJ3Blcm1hbmVudCc6XHJcbiAgICAgICAgICAgIHJldHVybiAnbWRjLXBlcm1hbmVudC1kcmF3ZXInXHJcbiAgICAgICAgICBjYXNlICdwZXJzaXN0ZW50JzpcclxuICAgICAgICAgICAgcmV0dXJuICdtZGMtcGVyc2lzdGVudC1kcmF3ZXInXHJcbiAgICAgICAgICBjYXNlICd0ZW1wb3JhcnknOlxyXG4gICAgICAgICAgICByZXR1cm4gJ21kYy10ZW1wb3JhcnktZHJhd2VyJ1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc21hbGwgPyAnbWRjLXRlbXBvcmFyeS1kcmF3ZXInIDogJ21kYy1wZXJzaXN0ZW50LWRyYXdlcidcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpc1Blcm1hbmVudCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucGVybWFuZW50IHx8IHRoaXMudHlwZSA9PT0gJ21kYy1wZXJtYW5lbnQtZHJhd2VyJ1xyXG4gICAgfSxcclxuICAgIGlzUGVyc2lzdGVudCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucGVyc2lzdGVudCB8fCB0aGlzLnR5cGUgPT09ICdtZGMtcGVyc2lzdGVudC1kcmF3ZXInXHJcbiAgICB9LFxyXG4gICAgaXNUZW1wb3JhcnkoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRlbXBvcmFyeSB8fCB0aGlzLnR5cGUgPT09ICdtZGMtdGVtcG9yYXJ5LWRyYXdlcidcclxuICAgIH0sXHJcbiAgICBpc1Jlc3BvbnNpdmUoKSB7XHJcbiAgICAgIHJldHVybiAhKFxyXG4gICAgICAgIHRoaXMucGVybWFuZW50IHx8XHJcbiAgICAgICAgdGhpcy5wZXJzaXN0ZW50IHx8XHJcbiAgICAgICAgdGhpcy50ZW1wb3JhcnkgfHxcclxuICAgICAgICB0aGlzLmRyYXdlclR5cGVcclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgd2F0Y2g6IHtcclxuICAgIG9wZW46ICdvbk9wZW5fJ1xyXG4gIH0sXHJcbiAgY3JlYXRlZCgpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubWF0Y2hNZWRpYSkge1xyXG4gICAgICB0aGlzLnNtYWxsID0gbWVkaWEuc21hbGwubWF0Y2hlc1xyXG4gICAgICB0aGlzLmxhcmdlID0gbWVkaWEubGFyZ2UubWF0Y2hlc1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgbW91bnRlZCgpIHtcclxuICAgIGlmICh0aGlzLnRvZ2dsZU9uKSB7XHJcbiAgICAgIHRoaXMudG9nZ2xlT25FdmVudFNvdXJjZSA9IHRoaXMudG9nZ2xlT25Tb3VyY2UgfHwgdGhpcy4kcm9vdFxyXG4gICAgICB0aGlzLnRvZ2dsZU9uRXZlbnRTb3VyY2UuJG9uKHRoaXMudG9nZ2xlT24sIHRoaXMudG9nZ2xlKVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub3Blbk9uKSB7XHJcbiAgICAgIHRoaXMub3Blbk9uRXZlbnRTb3VyY2UgPSB0aGlzLm9wZW5PblNvdXJjZSB8fCB0aGlzLiRyb290XHJcbiAgICAgIHRoaXMub3Blbk9uRXZlbnRTb3VyY2UuJG9uKHRoaXMub3Blbk9uLCB0aGlzLnNob3cpXHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jbG9zZU9uKSB7XHJcbiAgICAgIHRoaXMuY2xvc2VPbkV2ZW50U291cmNlID0gdGhpcy5jbG9zZU9uU291cmNlIHx8IHRoaXMuJHJvb3RcclxuICAgICAgdGhpcy5jbG9zZU9uRXZlbnRTb3VyY2UuJG9uKHRoaXMuY2xvc2VPbiwgdGhpcy5jbG9zZSlcclxuICAgIH1cclxuICAgIG1lZGlhLnNtYWxsLmFkZExpc3RlbmVyKHRoaXMucmVmcmVzaE1lZGlhKVxyXG4gICAgbWVkaWEubGFyZ2UuYWRkTGlzdGVuZXIodGhpcy5yZWZyZXNoTWVkaWEpXHJcbiAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB0aGlzLnJlZnJlc2hNZWRpYSgpKVxyXG4gIH0sXHJcbiAgYmVmb3JlRGVzdHJveSgpIHtcclxuICAgIG1lZGlhLnNtYWxsLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVmcmVzaE1lZGlhKVxyXG4gICAgbWVkaWEubGFyZ2UucmVtb3ZlTGlzdGVuZXIodGhpcy5yZWZyZXNoTWVkaWEpXHJcblxyXG4gICAgaWYgKHRoaXMudG9nZ2xlT25FdmVudFNvdXJjZSkge1xyXG4gICAgICB0aGlzLnRvZ2dsZU9uRXZlbnRTb3VyY2UuJG9mZih0aGlzLnRvZ2dsZU9uLCB0aGlzLnRvZ2dsZSlcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9wZW5PbkV2ZW50U291cmNlKSB7XHJcbiAgICAgIHRoaXMub3Blbk9uRXZlbnRTb3VyY2UuJG9mZih0aGlzLm9wZW5PbiwgdGhpcy5zaG93KVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY2xvc2VPbkV2ZW50U291cmNlKSB7XHJcbiAgICAgIHRoaXMuY2xvc2VPbkV2ZW50U291cmNlLiRvZmYodGhpcy5jbG9zZU9uLCB0aGlzLmNsb3NlKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgb25PcGVuXyh2YWx1ZSkge1xyXG4gICAgICB0aGlzLmlzUGVybWFuZW50IHx8ICh0aGlzLm9wZW5fID0gdmFsdWUpXHJcbiAgICB9LFxyXG4gICAgb25DaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgZXZlbnQpXHJcbiAgICAgIHRoaXMuJHJvb3QuJGVtaXQoJ3ZtYTpsYXlvdXQnKVxyXG4gICAgfSxcclxuICAgIHNob3coKSB7XHJcbiAgICAgIHRoaXMub3Blbl8gPSB0cnVlXHJcbiAgICB9LFxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgIHRoaXMuaXNQZXJtYW5lbnQgfHwgKHRoaXMub3Blbl8gPSBmYWxzZSlcclxuICAgIH0sXHJcbiAgICB0b2dnbGUoKSB7XHJcbiAgICAgIHRoaXMuaXNQZXJtYW5lbnQgfHwgKHRoaXMuaXNPcGVuKCkgPyB0aGlzLmNsb3NlKCkgOiB0aGlzLnNob3coKSlcclxuICAgIH0sXHJcbiAgICBpc09wZW4oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmlzUGVybWFuZW50IHx8IHRoaXMub3Blbl9cclxuICAgIH0sXHJcbiAgICByZWZyZXNoTWVkaWEoKSB7XHJcbiAgICAgIHRoaXMuc21hbGwgPSBtZWRpYS5zbWFsbC5tYXRjaGVzXHJcbiAgICAgIHRoaXMubGFyZ2UgPSBtZWRpYS5sYXJnZS5tYXRjaGVzXHJcbiAgICAgIGlmICh0aGlzLmlzUmVzcG9uc2l2ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmxhcmdlKSB7XHJcbiAgICAgICAgICB0aGlzLnNob3coKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNsb3NlKClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwibWRjLWRyYXdlci1sYXlvdXRcIj5cclxuICAgIDxzbG90IC8+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1kcmF3ZXItbGF5b3V0J1xyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGhlYWRlciBcclxuICAgIHYtaWY9XCJzaG93XCIgXHJcbiAgICBjbGFzcz1cIm1kYy1kcmF3ZXItaGVhZGVyIG1kYy1kcmF3ZXJfX2hlYWRlclwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1kYy1kcmF3ZXJfX2hlYWRlci1jb250ZW50XCI+XHJcbiAgICAgIDxzbG90IC8+XHJcbiAgICA8L2Rpdj5cclxuICA8L2hlYWRlcj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLWRyYXdlci1oZWFkZXInLFxyXG4gIHByb3BzOiB7XHJcbiAgICBwZXJtYW5lbnQ6IEJvb2xlYW4sXHJcbiAgICBwZXJzaXN0ZW50OiBCb29sZWFuLFxyXG4gICAgdGVtcG9yYXJ5OiBCb29sZWFuXHJcbiAgfSxcclxuICBpbmplY3Q6IFsnbWRjRHJhd2VyJ10sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIHNob3coKSB7XHJcbiAgICAgIGlmICh0aGlzLnRlbXBvcmFyeSB8fCB0aGlzLnBlcnNpc3RlbnQgfHwgdGhpcy5wZXJtYW5lbnQpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgKHRoaXMudGVtcG9yYXJ5ICYmIHRoaXMubWRjRHJhd2VyLmlzVGVtcG9yYXJ5KSB8fFxyXG4gICAgICAgICAgKHRoaXMucGVyc2lzdGVudCAmJiB0aGlzLm1kY0RyYXdlci5pc1BlcnNpc3RlbnQpIHx8XHJcbiAgICAgICAgICAodGhpcy5wZXJtYW5lbnQgJiYgdGhpcy5tZGNEcmF3ZXIuaXNQZXJtYW5lbnQpXHJcbiAgICAgICAgKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8bmF2IFxyXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiIFxyXG4gICAgY2xhc3M9XCJtZGMtZHJhd2VyLWxpc3QgbWRjLWxpc3RcIj5cclxuICAgIDxzbG90Lz5cclxuICA8L25hdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLWRyYXdlci1saXN0JyxcclxuICBwcm9wczoge1xyXG4gICAgZGVuc2U6IEJvb2xlYW5cclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiB7XHJcbiAgICAgICAgJ21kYy1saXN0LS1kZW5zZSc6IHRoaXMuZGVuc2VcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBSaXBwbGUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gQ1NTIHZhcmlhYmxlc1xuICogLSBwb3NpdGlvblxuICogLSBkaW1lbnNpb25zXG4gKiAtIHNjcm9sbCBwb3NpdGlvblxuICogLSBldmVudCBoYW5kbGVyc1xuICogLSB1bmJvdW5kZWQsIGFjdGl2ZSBhbmQgZGlzYWJsZWQgc3RhdGVzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENSaXBwbGVBZGFwdGVyIHtcbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1VuYm91bmRlZCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZUFjdGl2ZSgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZURpc2FibGVkKCkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudFRhcmdldH0gdGFyZ2V0ICovXG4gIGNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFyTmFtZVxuICAgKiBAcGFyYW0gez9udW1iZXJ8c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgdXBkYXRlQ3NzVmFyaWFibGUodmFyTmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqIEByZXR1cm4geyFDbGllbnRSZWN0fSAqL1xuICBjb21wdXRlQm91bmRpbmdSZWN0KCkge31cblxuICAvKiogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gKi9cbiAgZ2V0V2luZG93UGFnZU9mZnNldCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgLy8gUmlwcGxlIGlzIGEgc3BlY2lhbCBjYXNlIHdoZXJlIHRoZSBcInJvb3RcIiBjb21wb25lbnQgaXMgcmVhbGx5IGEgXCJtaXhpblwiIG9mIHNvcnRzLFxuICAvLyBnaXZlbiB0aGF0IGl0J3MgYW4gJ3VwZ3JhZGUnIHRvIGFuIGV4aXN0aW5nIGNvbXBvbmVudC4gVGhhdCBiZWluZyBzYWlkIGl0IGlzIHRoZSByb290XG4gIC8vIENTUyBjbGFzcyB0aGF0IGFsbCBvdGhlciBDU1MgY2xhc3NlcyBkZXJpdmUgZnJvbS5cbiAgUk9PVDogJ21kYy1yaXBwbGUtdXBncmFkZWQnLFxuICBVTkJPVU5ERUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS11bmJvdW5kZWQnLFxuICBCR19GT0NVU0VEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tYmFja2dyb3VuZC1mb2N1c2VkJyxcbiAgRkdfQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtYWN0aXZhdGlvbicsXG4gIEZHX0RFQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtZGVhY3RpdmF0aW9uJyxcbn07XG5cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFZBUl9MRUZUOiAnLS1tZGMtcmlwcGxlLWxlZnQnLFxuICBWQVJfVE9QOiAnLS1tZGMtcmlwcGxlLXRvcCcsXG4gIFZBUl9GR19TSVpFOiAnLS1tZGMtcmlwcGxlLWZnLXNpemUnLFxuICBWQVJfRkdfU0NBTEU6ICctLW1kYy1yaXBwbGUtZmctc2NhbGUnLFxuICBWQVJfRkdfVFJBTlNMQVRFX1NUQVJUOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydCcsXG4gIFZBUl9GR19UUkFOU0xBVEVfRU5EOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQnLFxufTtcblxuY29uc3QgbnVtYmVycyA9IHtcbiAgUEFERElORzogMTAsXG4gIElOSVRJQUxfT1JJR0lOX1NDQUxFOiAwLjYsXG4gIERFQUNUSVZBVElPTl9USU1FT1VUX01TOiAyMjUsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLXRyYW5zbGF0ZS1kdXJhdGlvbiAoaS5lLiBhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgRkdfREVBQ1RJVkFUSU9OX01TOiAxNTAsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLWZhZGUtb3V0LWR1cmF0aW9uIChpLmUuIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIFRBUF9ERUxBWV9NUzogMzAwLCAvLyBEZWxheSBiZXR3ZWVuIHRvdWNoIGFuZCBzaW11bGF0ZWQgbW91c2UgZXZlbnRzIG9uIHRvdWNoIGRldmljZXNcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gc3VwcG9ydHNDc3NWYXJpYWJsZXMgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IENTUyBjdXN0b20gdmFyaWFibGUgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gYXBwbHlQYXNzaXZlIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c1Bhc3NpdmVfO1xuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaikge1xuICAvLyBEZXRlY3QgdmVyc2lvbnMgb2YgRWRnZSB3aXRoIGJ1Z2d5IHZhcigpIHN1cHBvcnRcbiAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8xMTQ5NTQ0OC9cbiAgY29uc3QgZG9jdW1lbnQgPSB3aW5kb3dPYmouZG9jdW1lbnQ7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbm9kZS5jbGFzc05hbWUgPSAnbWRjLXJpcHBsZS1zdXJmYWNlLS10ZXN0LWVkZ2UtdmFyLWJ1Zyc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgLy8gVGhlIGJ1ZyBleGlzdHMgaWYgOjpiZWZvcmUgc3R5bGUgZW5kcyB1cCBwcm9wYWdhdGluZyB0byB0aGUgcGFyZW50IGVsZW1lbnQuXG4gIC8vIEFkZGl0aW9uYWxseSwgZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIG51bGwgaW4gaWZyYW1lcyB3aXRoIGRpc3BsYXk6IFwibm9uZVwiIGluIEZpcmVmb3gsXG4gIC8vIGJ1dCBGaXJlZm94IGlzIGtub3duIHRvIHN1cHBvcnQgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzIGNvcnJlY3RseS5cbiAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvd09iai5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBjb25zdCBoYXNQc2V1ZG9WYXJCdWcgPSBjb21wdXRlZFN0eWxlICE9PSBudWxsICYmIGNvbXB1dGVkU3R5bGUuYm9yZGVyVG9wU3R5bGUgPT09ICdzb2xpZCc7XG4gIG5vZGUucmVtb3ZlKCk7XG4gIHJldHVybiBoYXNQc2V1ZG9WYXJCdWc7XG59XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93T2JqLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBsZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNDc3NWYXJpYWJsZXNfID09PSAnYm9vbGVhbicgJiYgIWZvcmNlUmVmcmVzaCkge1xuICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuXG4gIGNvbnN0IHN1cHBvcnRzRnVuY3Rpb25QcmVzZW50ID0gd2luZG93T2JqLkNTUyAmJiB0eXBlb2Ygd2luZG93T2JqLkNTUy5zdXBwb3J0cyA9PT0gJ2Z1bmN0aW9uJztcbiAgaWYgKCFzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgPSB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCctLWNzcy12YXJzJywgJ3llcycpO1xuICAvLyBTZWU6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTQ2NjlcbiAgLy8gU2VlOiBSRUFETUUgc2VjdGlvbiBvbiBTYWZhcmlcbiAgY29uc3Qgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzID0gKFxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJygtLWNzcy12YXJzOiB5ZXMpJykgJiZcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCdjb2xvcicsICcjMDAwMDAwMDAnKVxuICApO1xuXG4gIGlmIChleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIHx8IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cykge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gIWRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKTtcbiAgfSBlbHNlIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKCFmb3JjZVJlZnJlc2gpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG59XG5cbi8vXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXG4gKiBAcGFyYW0geyFXaW5kb3c9fSBnbG9iYWxPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx7cGFzc2l2ZTogYm9vbGVhbn19XG4gKi9cbmZ1bmN0aW9uIGFwcGx5UGFzc2l2ZShnbG9iYWxPYmogPSB3aW5kb3csIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdXBwb3J0c1Bhc3NpdmVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGdsb2JhbE9iai5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge2dldCBwYXNzaXZlKCkge1xuICAgICAgICBpc1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICB9fSk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgICBzdXBwb3J0c1Bhc3NpdmVfID0gaXNTdXBwb3J0ZWQ7XG4gIH1cblxuICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlXyA/IHtwYXNzaXZlOiB0cnVlfSA6IGZhbHNlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gSFRNTEVsZW1lbnRQcm90b3R5cGVcbiAqIEByZXR1cm4geyFBcnJheTxzdHJpbmc+fVxuICovXG5mdW5jdGlvbiBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnRQcm90b3R5cGUpIHtcbiAgcmV0dXJuIFtcbiAgICAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJywgJ21zTWF0Y2hlc1NlbGVjdG9yJywgJ21hdGNoZXMnLFxuICBdLmZpbHRlcigocCkgPT4gcCBpbiBIVE1MRWxlbWVudFByb3RvdHlwZSkucG9wKCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshRXZlbnR9IGV2XG4gKiBAcGFyYW0ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19IHBhZ2VPZmZzZXRcbiAqIEBwYXJhbSB7IUNsaWVudFJlY3R9IGNsaWVudFJlY3RcbiAqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhldiwgcGFnZU9mZnNldCwgY2xpZW50UmVjdCkge1xuICBjb25zdCB7eCwgeX0gPSBwYWdlT2Zmc2V0O1xuICBjb25zdCBkb2N1bWVudFggPSB4ICsgY2xpZW50UmVjdC5sZWZ0O1xuICBjb25zdCBkb2N1bWVudFkgPSB5ICsgY2xpZW50UmVjdC50b3A7XG5cbiAgbGV0IG5vcm1hbGl6ZWRYO1xuICBsZXQgbm9ybWFsaXplZFk7XG4gIC8vIERldGVybWluZSB0b3VjaCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmlwcGxlIGNvbnRhaW5lci5cbiAgaWYgKGV2LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfSBlbHNlIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYucGFnZVkgLSBkb2N1bWVudFk7XG4gIH1cblxuICByZXR1cm4ge3g6IG5vcm1hbGl6ZWRYLCB5OiBub3JtYWxpemVkWX07XG59XG5cbmV4cG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGFwcGx5UGFzc2l2ZSwgZ2V0TWF0Y2hlc1Byb3BlcnR5LCBnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgaXNBY3RpdmF0ZWQ6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBhY3RpdmF0aW9uRXZlbnQ6IEV2ZW50LFxuICogICBpc1Byb2dyYW1tYXRpYzogKGJvb2xlYW58dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IEFjdGl2YXRpb25TdGF0ZVR5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZGVhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBmb2N1czogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBibHVyOiAoc3RyaW5nfHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lckluZm9UeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBkZWFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBmb2N1czogZnVuY3Rpb24oKSxcbiAqICAgYmx1cjogZnVuY3Rpb24oKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVyc1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgeDogbnVtYmVyLFxuICogICB5OiBudW1iZXJcbiAqIH19XG4gKi9cbmxldCBQb2ludFR5cGU7XG5cbi8vIEFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gdGhlIHJvb3QgZWxlbWVudCBvZiBlYWNoIGluc3RhbmNlIGZvciBhY3RpdmF0aW9uXG5jb25zdCBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaHN0YXJ0JywgJ3BvaW50ZXJkb3duJywgJ21vdXNlZG93bicsICdrZXlkb3duJ107XG5cbi8vIERlYWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiBkb2N1bWVudEVsZW1lbnQgd2hlbiBhIHBvaW50ZXItcmVsYXRlZCBkb3duIGV2ZW50IG9jY3Vyc1xuY29uc3QgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoZW5kJywgJ3BvaW50ZXJ1cCcsICdtb3VzZXVwJ107XG5cbi8vIFRyYWNrcyBhY3RpdmF0aW9ucyB0aGF0IGhhdmUgb2NjdXJyZWQgb24gdGhlIGN1cnJlbnQgZnJhbWUsIHRvIGF2b2lkIHNpbXVsdGFuZW91cyBuZXN0ZWQgYWN0aXZhdGlvbnNcbi8qKiBAdHlwZSB7IUFycmF5PCFFdmVudFRhcmdldD59ICovXG5sZXQgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENSaXBwbGVBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDUmlwcGxlRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiAvKiBib29sZWFuIC0gY2FjaGVkICovIHt9LFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAoLyogdGFyZ2V0OiAhRXZlbnRUYXJnZXQgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKC8qIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiAvKiBDbGllbnRSZWN0ICovIHt9LFxuICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4gLyoge3g6IG51bWJlciwgeTogbnVtYmVyfSAqLyB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDUmlwcGxlRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQ2xpZW50UmVjdH0gKi9cbiAgICB0aGlzLmZyYW1lXyA9IC8qKiBAdHlwZSB7IUNsaWVudFJlY3R9ICovICh7d2lkdGg6IDAsIGhlaWdodDogMH0pO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLm1heFJhZGl1c18gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmRlYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmZvY3VzSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUZvY3VzKCk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuYmx1ckhhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVCbHVyKCk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLnJlc2l6ZUhhbmRsZXJfID0gKCkgPT4gdGhpcy5sYXlvdXQoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7e2xlZnQ6IG51bWJlciwgdG9wOm51bWJlcn19ICovXG4gICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ1NjYWxlXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18gPSAoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSB0cnVlO1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHs/RXZlbnR9ICovXG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIGNvbXB1dGUgdGhpcyBwcm9wZXJ0eSBzbyB0aGF0IHdlIGFyZSBub3QgcXVlcnlpbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNsaWVudFxuICAgKiB1bnRpbCB0aGUgcG9pbnQgaW4gdGltZSB3aGVyZSB0aGUgZm91bmRhdGlvbiByZXF1ZXN0cyBpdC4gVGhpcyBwcmV2ZW50cyBzY2VuYXJpb3Mgd2hlcmVcbiAgICogY2xpZW50LXNpZGUgZmVhdHVyZS1kZXRlY3Rpb24gbWF5IGhhcHBlbiB0b28gZWFybHksIHN1Y2ggYXMgd2hlbiBjb21wb25lbnRzIGFyZSByZW5kZXJlZCBvbiB0aGUgc2VydmVyXG4gICAqIGFuZCB0aGVuIGluaXRpYWxpemVkIGF0IG1vdW50IHRpbWUgb24gdGhlIGNsaWVudC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzU3VwcG9ydGVkXygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5icm93c2VyU3VwcG9ydHNDc3NWYXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9XG4gICAqL1xuICBkZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBY3RpdmF0ZWQ6IGZhbHNlLFxuICAgICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IGZhbHNlLFxuICAgICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiBmYWxzZSxcbiAgICAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiBmYWxzZSxcbiAgICAgIGFjdGl2YXRpb25FdmVudDogbnVsbCxcbiAgICAgIGlzUHJvZ3JhbW1hdGljOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqL1xuICBpbml0KCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZF8oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoUk9PVCk7XG4gICAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgICAgLy8gVW5ib3VuZGVkIHJpcHBsZXMgbmVlZCBsYXlvdXQgbG9naWMgYXBwbGllZCBpbW1lZGlhdGVseSB0byBzZXQgY29vcmRpbmF0ZXMgZm9yIGJvdGggc2hhZGUgYW5kIHJpcHBsZVxuICAgICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZF8oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2YXRpb25UaW1lcl8pIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gMDtcbiAgICAgIGNvbnN0IHtGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgfVxuXG4gICAgdGhpcy5kZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoUk9PVCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgICB0aGlzLnJlbW92ZUNzc1ZhcnNfKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW1vdmVDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7c3RyaW5nc30gPSBNRENSaXBwbGVGb3VuZGF0aW9uO1xuICAgIE9iamVjdC5rZXlzKHN0cmluZ3MpLmZvckVhY2goKGspID0+IHtcbiAgICAgIGlmIChrLmluZGV4T2YoJ1ZBUl8nKSA9PT0gMCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKHN0cmluZ3Nba10sIG51bGwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhY3RpdmF0ZV8oZSkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZURpc2FibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEF2b2lkIHJlYWN0aW5nIHRvIGZvbGxvdy1vbiBldmVudHMgZmlyZWQgYnkgdG91Y2ggZGV2aWNlIGFmdGVyIGFuIGFscmVhZHktcHJvY2Vzc2VkIHVzZXIgaW50ZXJhY3Rpb25cbiAgICBjb25zdCBwcmV2aW91c0FjdGl2YXRpb25FdmVudCA9IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfO1xuICAgIGNvbnN0IGlzU2FtZUludGVyYWN0aW9uID0gcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgJiYgZSAmJiBwcmV2aW91c0FjdGl2YXRpb25FdmVudC50eXBlICE9PSBlLnR5cGU7XG4gICAgaWYgKGlzU2FtZUludGVyYWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkID0gdHJ1ZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPSBlID09PSBudWxsO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5hY3RpdmF0aW9uRXZlbnQgPSBlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNBY3RpdmF0ZWRCeVBvaW50ZXIgPSBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPyBmYWxzZSA6IChcbiAgICAgIGUudHlwZSA9PT0gJ21vdXNlZG93bicgfHwgZS50eXBlID09PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAncG9pbnRlcmRvd24nXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc0FjdGl2YXRlZENoaWxkID1cbiAgICAgIGUgJiYgYWN0aXZhdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIGFjdGl2YXRlZFRhcmdldHMuc29tZSgodGFyZ2V0KSA9PiB0aGlzLmFkYXB0ZXJfLmNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSk7XG4gICAgaWYgKGhhc0FjdGl2YXRlZENoaWxkKSB7XG4gICAgICAvLyBJbW1lZGlhdGVseSByZXNldCBhY3RpdmF0aW9uIHN0YXRlLCB3aGlsZSBwcmVzZXJ2aW5nIGxvZ2ljIHRoYXQgcHJldmVudHMgdG91Y2ggZm9sbG93LW9uIGV2ZW50c1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZSkge1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cy5wdXNoKC8qKiBAdHlwZSB7IUV2ZW50VGFyZ2V0fSAqLyAoZS50YXJnZXQpKTtcbiAgICAgIHRoaXMucmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSk7XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBSZXNldCBhcnJheSBvbiBuZXh0IGZyYW1lIGFmdGVyIHRoZSBjdXJyZW50IGV2ZW50IGhhcyBoYWQgYSBjaGFuY2UgdG8gYnViYmxlIHRvIHByZXZlbnQgYW5jZXN0b3IgcmlwcGxlc1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4gICAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSAmJiAoZS5rZXkgPT09ICcgJyB8fCBlLmtleUNvZGUgPT09IDMyKSkge1xuICAgICAgICAvLyBJZiBzcGFjZSB3YXMgcHJlc3NlZCwgdHJ5IGFnYWluIHdpdGhpbiBhbiByQUYgY2FsbCB0byBkZXRlY3QgOmFjdGl2ZSwgYmVjYXVzZSBkaWZmZXJlbnQgVUFzIHJlcG9ydFxuICAgICAgICAvLyBhY3RpdmUgc3RhdGVzIGluY29uc2lzdGVudGx5IHdoZW4gdGhleSdyZSBjYWxsZWQgd2l0aGluIGV2ZW50IGhhbmRsaW5nIGNvZGU6XG4gICAgICAgIC8vIC0gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NjM1OTcxXG4gICAgICAgIC8vIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTI5Mzc0MVxuICAgICAgICAvLyBXZSB0cnkgZmlyc3Qgb3V0c2lkZSByQUYgdG8gc3VwcG9ydCBFZGdlLCB3aGljaCBkb2VzIG5vdCBleGhpYml0IHRoaXMgcHJvYmxlbSwgYnV0IHdpbGwgY3Jhc2ggaWYgYSBDU1NcbiAgICAgICAgLy8gdmFyaWFibGUgaXMgc2V0IHdpdGhpbiBhIHJBRiBjYWxsYmFjayBmb3IgYSBzdWJtaXQgYnV0dG9uIGludGVyYWN0aW9uICgjMjI0MSkuXG4gICAgICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IHRoaXMuY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSk7XG4gICAgICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICAgIC8vIFJlc2V0IGFjdGl2YXRpb24gc3RhdGUgaW1tZWRpYXRlbHkgaWYgZWxlbWVudCB3YXMgbm90IG1hZGUgYWN0aXZlLlxuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpIHtcbiAgICByZXR1cm4gKGUgJiYgZS50eXBlID09PSAna2V5ZG93bicpID8gdGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VBY3RpdmUoKSA6IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5hY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGFuaW1hdGVBY3RpdmF0aW9uXygpIHtcbiAgICBjb25zdCB7VkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgVkFSX0ZHX1RSQU5TTEFURV9FTkR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT04sIEZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtERUFDVElWQVRJT05fVElNRU9VVF9NU30gPSBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnM7XG5cbiAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuXG4gICAgbGV0IHRyYW5zbGF0ZVN0YXJ0ID0gJyc7XG4gICAgbGV0IHRyYW5zbGF0ZUVuZCA9ICcnO1xuXG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIGNvbnN0IHtzdGFydFBvaW50LCBlbmRQb2ludH0gPSB0aGlzLmdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKTtcbiAgICAgIHRyYW5zbGF0ZVN0YXJ0ID0gYCR7c3RhcnRQb2ludC54fXB4LCAke3N0YXJ0UG9pbnQueX1weGA7XG4gICAgICB0cmFuc2xhdGVFbmQgPSBgJHtlbmRQb2ludC54fXB4LCAke2VuZFBvaW50Lnl9cHhgO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgdHJhbnNsYXRlU3RhcnQpO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9FTkQsIHRyYW5zbGF0ZUVuZCk7XG4gICAgLy8gQ2FuY2VsIGFueSBvbmdvaW5nIGFjdGl2YXRpb24vZGVhY3RpdmF0aW9uIGFuaW1hdGlvbnNcbiAgICBjbGVhclRpbWVvdXQodGhpcy5hY3RpdmF0aW9uVGltZXJfKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8pO1xuICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuXG4gICAgLy8gRm9yY2UgbGF5b3V0IGluIG9yZGVyIHRvIHJlLXRyaWdnZXIgdGhlIGFuaW1hdGlvbi5cbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18oKSwgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4ge3tzdGFydFBvaW50OiBQb2ludFR5cGUsIGVuZFBvaW50OiBQb2ludFR5cGV9fVxuICAgKi9cbiAgZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpIHtcbiAgICBjb25zdCB7YWN0aXZhdGlvbkV2ZW50LCB3YXNBY3RpdmF0ZWRCeVBvaW50ZXJ9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuXG4gICAgbGV0IHN0YXJ0UG9pbnQ7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlcikge1xuICAgICAgc3RhcnRQb2ludCA9IGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhcbiAgICAgICAgLyoqIEB0eXBlIHshRXZlbnR9ICovIChhY3RpdmF0aW9uRXZlbnQpLFxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmdldFdpbmRvd1BhZ2VPZmZzZXQoKSwgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICAgIHg6IHRoaXMuZnJhbWVfLndpZHRoIC8gMixcbiAgICAgICAgeTogdGhpcy5mcmFtZV8uaGVpZ2h0IC8gMixcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIENlbnRlciB0aGUgZWxlbWVudCBhcm91bmQgdGhlIHN0YXJ0IHBvaW50LlxuICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICB4OiBzdGFydFBvaW50LnggLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6IHN0YXJ0UG9pbnQueSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICBjb25zdCBlbmRQb2ludCA9IHtcbiAgICAgIHg6ICh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiAodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtzdGFydFBvaW50LCBlbmRQb2ludH07XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCkge1xuICAgIC8vIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBib3RoIHdoZW4gYSBwb2ludGluZyBkZXZpY2UgaXMgcmVsZWFzZWQsIGFuZCB3aGVuIHRoZSBhY3RpdmF0aW9uIGFuaW1hdGlvbiBlbmRzLlxuICAgIC8vIFRoZSBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIHNob3VsZCBvbmx5IHJ1biBhZnRlciBib3RoIG9mIHRob3NlIG9jY3VyLlxuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtoYXNEZWFjdGl2YXRpb25VWFJ1biwgaXNBY3RpdmF0ZWR9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGNvbnN0IGFjdGl2YXRpb25IYXNFbmRlZCA9IGhhc0RlYWN0aXZhdGlvblVYUnVuIHx8ICFpc0FjdGl2YXRlZDtcblxuICAgIGlmIChhY3RpdmF0aW9uSGFzRW5kZWQgJiYgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfKSB7XG4gICAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgfSwgbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKSB7XG4gICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gIH1cblxuICByZXNldEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uYWN0aXZhdGlvbkV2ZW50O1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAvLyBUb3VjaCBkZXZpY2VzIG1heSBmaXJlIGFkZGl0aW9uYWwgZXZlbnRzIGZvciB0aGUgc2FtZSBpbnRlcmFjdGlvbiB3aXRoaW4gYSBzaG9ydCB0aW1lLlxuICAgIC8vIFN0b3JlIHRoZSBwcmV2aW91cyBldmVudCB1bnRpbCBpdCdzIHNhZmUgdG8gYXNzdW1lIHRoYXQgc3Vic2VxdWVudCBldmVudHMgYXJlIGZvciBuZXcgaW50ZXJhY3Rpb25zLlxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsLCBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuVEFQX0RFTEFZX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZGVhY3RpdmF0ZV8oZSkge1xuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaW4gc2NlbmFyaW9zIHN1Y2ggYXMgd2hlbiB5b3UgaGF2ZSBhIGtleXVwIGV2ZW50IHRoYXQgYmx1cnMgdGhlIGVsZW1lbnQuXG4gICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZSA9IC8qKiBAdHlwZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovIChPYmplY3QuYXNzaWduKHt9LCBhY3RpdmF0aW9uU3RhdGUpKTtcblxuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMpIHtcbiAgICAgIGNvbnN0IGV2dE9iamVjdCA9IG51bGw7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhldnRPYmplY3QsIHN0YXRlKSk7XG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXy5oYXNEZWFjdGl2YXRpb25VWFJ1biA9IHRydWU7XG4gICAgICAgIHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwgc3RhdGUpO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50PX0gZXZlbnQgT3B0aW9uYWwgZXZlbnQgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGRlYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5kZWFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgKiBAcGFyYW0geyFBY3RpdmF0aW9uU3RhdGVUeXBlfSBvcHRpb25zXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhbmltYXRlRGVhY3RpdmF0aW9uXyhlLCB7d2FzQWN0aXZhdGVkQnlQb2ludGVyLCB3YXNFbGVtZW50TWFkZUFjdGl2ZX0pIHtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyIHx8IHdhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH1cbiAgfVxuXG4gIGxheW91dCgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXRGcmFtZV8pIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMubGF5b3V0RnJhbWVfKTtcbiAgICB9XG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBsYXlvdXRJbnRlcm5hbF8oKSB7XG4gICAgdGhpcy5mcmFtZV8gPSB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICBjb25zdCBtYXhEaW0gPSBNYXRoLm1heCh0aGlzLmZyYW1lXy5oZWlnaHQsIHRoaXMuZnJhbWVfLndpZHRoKTtcblxuICAgIC8vIFN1cmZhY2UgZGlhbWV0ZXIgaXMgdHJlYXRlZCBkaWZmZXJlbnRseSBmb3IgdW5ib3VuZGVkIHZzLiBib3VuZGVkIHJpcHBsZXMuXG4gICAgLy8gVW5ib3VuZGVkIHJpcHBsZSBkaWFtZXRlciBpcyBjYWxjdWxhdGVkIHNtYWxsZXIgc2luY2UgdGhlIHN1cmZhY2UgaXMgZXhwZWN0ZWQgdG8gYWxyZWFkeSBiZSBwYWRkZWQgYXBwcm9wcmlhdGVseVxuICAgIC8vIHRvIGV4dGVuZCB0aGUgaGl0Ym94LCBhbmQgdGhlIHJpcHBsZSBpcyBleHBlY3RlZCB0byBtZWV0IHRoZSBlZGdlcyBvZiB0aGUgcGFkZGVkIGhpdGJveCAod2hpY2ggaXMgdHlwaWNhbGx5XG4gICAgLy8gc3F1YXJlKS4gQm91bmRlZCByaXBwbGVzLCBvbiB0aGUgb3RoZXIgaGFuZCwgYXJlIGZ1bGx5IGV4cGVjdGVkIHRvIGV4cGFuZCBiZXlvbmQgdGhlIHN1cmZhY2UncyBsb25nZXN0IGRpYW1ldGVyXG4gICAgLy8gKGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGRpYWdvbmFsIHBsdXMgYSBjb25zdGFudCBwYWRkaW5nKSwgYW5kIGFyZSBjbGlwcGVkIGF0IHRoZSBzdXJmYWNlJ3MgYm9yZGVyIHZpYVxuICAgIC8vIGBvdmVyZmxvdzogaGlkZGVuYC5cbiAgICBjb25zdCBnZXRCb3VuZGVkUmFkaXVzID0gKCkgPT4ge1xuICAgICAgY29uc3QgaHlwb3RlbnVzZSA9IE1hdGguc3FydChNYXRoLnBvdyh0aGlzLmZyYW1lXy53aWR0aCwgMikgKyBNYXRoLnBvdyh0aGlzLmZyYW1lXy5oZWlnaHQsIDIpKTtcbiAgICAgIHJldHVybiBoeXBvdGVudXNlICsgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlBBRERJTkc7XG4gICAgfTtcblxuICAgIHRoaXMubWF4UmFkaXVzXyA9IHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSA/IG1heERpbSA6IGdldEJvdW5kZWRSYWRpdXMoKTtcblxuICAgIC8vIFJpcHBsZSBpcyBzaXplZCBhcyBhIGZyYWN0aW9uIG9mIHRoZSBsYXJnZXN0IGRpbWVuc2lvbiBvZiB0aGUgc3VyZmFjZSwgdGhlbiBzY2FsZXMgdXAgdXNpbmcgYSBDU1Mgc2NhbGUgdHJhbnNmb3JtXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSBtYXhEaW0gKiBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuSU5JVElBTF9PUklHSU5fU0NBTEU7XG4gICAgdGhpcy5mZ1NjYWxlXyA9IHRoaXMubWF4UmFkaXVzXyAvIHRoaXMuaW5pdGlhbFNpemVfO1xuXG4gICAgdGhpcy51cGRhdGVMYXlvdXRDc3NWYXJzXygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHVwZGF0ZUxheW91dENzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIFZBUl9GR19TSVpFLCBWQVJfTEVGVCwgVkFSX1RPUCwgVkFSX0ZHX1NDQUxFLFxuICAgIH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TSVpFLCBgJHt0aGlzLmluaXRpYWxTaXplX31weGApO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NDQUxFLCB0aGlzLmZnU2NhbGVfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgICAgbGVmdDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgICAgdG9wOiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0xFRlQsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy5sZWZ0fXB4YCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9UT1AsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy50b3B9cHhgKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB1bmJvdW5kZWQgKi9cbiAgc2V0VW5ib3VuZGVkKHVuYm91bmRlZCkge1xuICAgIGNvbnN0IHtVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmICh1bmJvdW5kZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZvY3VzKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG5cbiAgaGFuZGxlQmx1cigpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT5cbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVGb3VuZGF0aW9uO1xuIiwiaW1wb3J0IE1EQ1JpcHBsZUZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzJ1xyXG5pbXBvcnQge1xyXG4gIHN1cHBvcnRzQ3NzVmFyaWFibGVzLFxyXG4gIGdldE1hdGNoZXNQcm9wZXJ0eSxcclxuICBhcHBseVBhc3NpdmVcclxufSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL3V0aWwnXHJcblxyXG5leHBvcnQgY2xhc3MgUmlwcGxlQmFzZSBleHRlbmRzIE1EQ1JpcHBsZUZvdW5kYXRpb24ge1xyXG4gIHN0YXRpYyBnZXQgTUFUQ0hFUygpIHtcclxuICAgIC8qIGdsb2JhbCBIVE1MRWxlbWVudCAqL1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgUmlwcGxlQmFzZS5fbWF0Y2hlcyB8fFxyXG4gICAgICAoUmlwcGxlQmFzZS5fbWF0Y2hlcyA9IGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudC5wcm90b3R5cGUpKVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzU3VyZmFjZUFjdGl2ZShyZWYpIHtcclxuICAgIHJldHVybiByZWZbUmlwcGxlQmFzZS5NQVRDSEVTXSgnOmFjdGl2ZScpXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcih2bSwgb3B0aW9ucykge1xyXG4gICAgc3VwZXIoXHJcbiAgICAgIE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdm0uJGVsW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2bS5kaXNhYmxlZFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGFkZENsYXNzKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICB2bS4kc2V0KHZtLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgdm0uJGRlbGV0ZSh2bS5jbGFzc2VzLCBjbGFzc05hbWUpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY29udGFpbnNFdmVudFRhcmdldDogdGFyZ2V0ID0+IHZtLiRlbC5jb250YWlucyh0YXJnZXQpLFxyXG4gICAgICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICAgICAgdm0uJGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHZtLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAgIGV2dFR5cGUsXHJcbiAgICAgICAgICAgICAgaGFuZGxlcixcclxuICAgICAgICAgICAgICBhcHBseVBhc3NpdmUoKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICAgZXZ0VHlwZSxcclxuICAgICAgICAgICAgICBoYW5kbGVyLFxyXG4gICAgICAgICAgICAgIGFwcGx5UGFzc2l2ZSgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB2bS4kc2V0KHZtLnN0eWxlcywgdmFyTmFtZSwgdmFsdWUpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdm0uJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4geyB4OiB3aW5kb3cucGFnZVhPZmZzZXQsIHk6IHdpbmRvdy5wYWdlWU9mZnNldCB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcHRpb25zXHJcbiAgICAgIClcclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSaXBwbGVNaXhpbiA9IHtcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2xhc3Nlczoge30sXHJcbiAgICAgIHN0eWxlczoge31cclxuICAgIH1cclxuICB9LFxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXHJcbiAgICB0aGlzLnJpcHBsZS5pbml0KClcclxuICB9LFxyXG4gIGJlZm9yZURlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KClcclxuICB9XHJcbn1cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxjdXN0b20tZWxlbWVudCBcclxuICAgIDp0YWc9XCJ0YWdcIiBcclxuICAgIDpjbGFzc2VzPVwiY2xhc3Nlc1wiXHJcbiAgICA6c3R5bGVzPVwic3R5bGVzXCIgXHJcbiAgICBjbGFzcz1cIm1kYy1yaXBwbGVcIj5cclxuICAgIDxzbG90IC8+XHJcbiAgPC9jdXN0b20tZWxlbWVudD5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IEN1c3RvbUVsZW1lbnRNaXhpbiB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCB7IFJpcHBsZU1peGluIH0gZnJvbSAnLi9tZGMtcmlwcGxlLWJhc2UnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1yaXBwbGUnLFxyXG4gIG1peGluczogW0N1c3RvbUVsZW1lbnRNaXhpbiwgUmlwcGxlTWl4aW5dLFxyXG4gIHByb3BzOiB7XHJcbiAgICB0YWc6IFN0cmluZ1xyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxjdXN0b20tbGlua1xyXG4gICAgOmxpbms9XCJsaW5rXCJcclxuICAgIDpjbGFzcz1cIltjbGFzc2VzLCBpdGVtQ2xhc3Nlc11cIlxyXG4gICAgOnN0eWxlPVwic3R5bGVzXCJcclxuICAgIGNsYXNzPVwibWRjLWRyYXdlci1pdGVtIG1kYy1saXN0LWl0ZW1cIlxyXG4gICAgdi1vbj1cIm15bGlzdGVuZXJzXCI+XHJcbiAgICA8c3BhblxyXG4gICAgICB2LWlmPVwiaGFzU3RhcnREZXRhaWxcIlxyXG4gICAgICBjbGFzcz1cIm1kYy1saXN0LWl0ZW1fX2dyYXBoaWNcIj5cclxuICAgICAgPHNsb3QgbmFtZT1cInN0YXJ0LWRldGFpbFwiPlxyXG4gICAgICAgIDxpXHJcbiAgICAgICAgICBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCJcclxuICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPnt7IHN0YXJ0SWNvbiB9fTwvaT5cclxuICAgICAgPC9zbG90PlxyXG4gICAgPC9zcGFuPlxyXG4gICAgPHNsb3QvPlxyXG4gIDwvY3VzdG9tLWxpbms+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyBEaXNwYXRjaEV2ZW50TWl4aW4sIEN1c3RvbUxpbmtNaXhpbiB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCB7IFJpcHBsZUJhc2UgfSBmcm9tICcuLi9yaXBwbGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1kcmF3ZXItaXRlbScsXHJcbiAgaW5qZWN0OiBbJ21kY0RyYXdlciddLFxyXG4gIG1peGluczogW0Rpc3BhdGNoRXZlbnRNaXhpbiwgQ3VzdG9tTGlua01peGluXSxcclxuICBwcm9wczoge1xyXG4gICAgc3RhcnRJY29uOiBTdHJpbmcsXHJcbiAgICB0ZW1wb3JhcnlDbG9zZToge1xyXG4gICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiB0cnVlXHJcbiAgICB9LFxyXG4gICAgYWN0aXZhdGVkOiBCb29sZWFuLFxyXG4gICAgZXhhY3RBY3RpdmVDbGFzczoge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGRlZmF1bHQ6ICdtZGMtbGlzdC1pdGVtLS1hY3RpdmF0ZWQnXHJcbiAgICB9XHJcbiAgfSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2xhc3Nlczoge30sXHJcbiAgICAgIHN0eWxlczoge31cclxuICAgIH1cclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICBteWxpc3RlbmVycygpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXHJcbiAgICAgICAgY2xpY2s6IGUgPT4ge1xyXG4gICAgICAgICAgdGhpcy5tZGNEcmF3ZXIuaXNUZW1wb3JhcnkgJiZcclxuICAgICAgICAgICAgdGhpcy50ZW1wb3JhcnlDbG9zZSAmJlxyXG4gICAgICAgICAgICB0aGlzLm1kY0RyYXdlci5jbG9zZSgpXHJcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpdGVtQ2xhc3NlcygpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAnbWRjLWxpc3QtaXRlbS0tYWN0aXZhdGVkJzogdGhpcy5hY3RpdmF0ZWRcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGhhc1N0YXJ0RGV0YWlsKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zdGFydEljb24gfHwgdGhpcy4kc2xvdHNbJ3N0YXJ0LWRldGFpbCddXHJcbiAgICB9XHJcbiAgfSxcclxuICBtb3VudGVkKCkge1xyXG4gICAgdGhpcy5yaXBwbGUgPSBuZXcgUmlwcGxlQmFzZSh0aGlzKVxyXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXHJcbiAgfSxcclxuICBiZWZvcmVEZXN0cm95KCkge1xyXG4gICAgdGhpcy5yaXBwbGUgJiYgdGhpcy5yaXBwbGUuZGVzdHJveSgpXHJcbiAgICB0aGlzLnJpcHBsZSA9IG51bGxcclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8aHIgY2xhc3M9XCJtZGMtbGlzdC1kaXZpZGVyXCI+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1kcmF3ZXItZGl2aWRlcidcclxufVxyXG48L3NjcmlwdD5cclxuIiwiaW1wb3J0IHsgQmFzZVBsdWdpbiB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCBtZGNEcmF3ZXIgZnJvbSAnLi9tZGMtZHJhd2VyLnZ1ZSdcclxuaW1wb3J0IG1kY0RyYXdlckxheW91dCBmcm9tICcuL21kYy1kcmF3ZXItbGF5b3V0LnZ1ZSdcclxuaW1wb3J0IG1kY0RyYXdlckhlYWRlciBmcm9tICcuL21kYy1kcmF3ZXItaGVhZGVyLnZ1ZSdcclxuaW1wb3J0IG1kY0RyYXdlckxpc3QgZnJvbSAnLi9tZGMtZHJhd2VyLWxpc3QudnVlJ1xyXG5pbXBvcnQgbWRjRHJhd2VySXRlbSBmcm9tICcuL21kYy1kcmF3ZXItaXRlbS52dWUnXHJcbmltcG9ydCBtZGNEcmF3ZXJEaXZpZGVyIGZyb20gJy4vbWRjLWRyYXdlci1kaXZpZGVyLnZ1ZSdcclxuXHJcbmV4cG9ydCB7XHJcbiAgbWRjRHJhd2VyLFxyXG4gIG1kY0RyYXdlckxheW91dCxcclxuICBtZGNEcmF3ZXJIZWFkZXIsXHJcbiAgbWRjRHJhd2VyTGlzdCxcclxuICBtZGNEcmF3ZXJJdGVtLFxyXG4gIG1kY0RyYXdlckRpdmlkZXJcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XHJcbiAgbWRjRHJhd2VyLFxyXG4gIG1kY0RyYXdlckxheW91dCxcclxuICBtZGNEcmF3ZXJIZWFkZXIsXHJcbiAgbWRjRHJhd2VyTGlzdCxcclxuICBtZGNEcmF3ZXJJdGVtLFxyXG4gIG1kY0RyYXdlckRpdmlkZXJcclxufSlcclxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xyXG5pbXBvcnQgeyBhdXRvSW5pdCB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcclxuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXHJcblxyXG5hdXRvSW5pdChwbHVnaW4pXHJcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwia2V5IiwiY29tcG9uZW50Iiwidm0iLCJuYW1lIiwiQ3VzdG9tRWxlbWVudCIsImZ1bmN0aW9uYWwiLCJyZW5kZXIiLCJjcmVhdGVFbGVtZW50IiwiY29udGV4dCIsInByb3BzIiwiaXMiLCJ0YWciLCJkYXRhIiwiY2hpbGRyZW4iLCJDdXN0b21FbGVtZW50TWl4aW4iLCJDdXN0b21MaW5rIiwidHlwZSIsIlN0cmluZyIsImRlZmF1bHQiLCJsaW5rIiwiT2JqZWN0IiwiaCIsImVsZW1lbnQiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsInBhcmVudCIsIiRyb3V0ZXIiLCIkcm9vdCIsIiRvcHRpb25zIiwib24iLCJjbGljayIsIm5hdGl2ZU9uIiwiQ3VzdG9tTGlua01peGluIiwidG8iLCJleGFjdCIsIkJvb2xlYW4iLCJhcHBlbmQiLCJyZXBsYWNlIiwiYWN0aXZlQ2xhc3MiLCJleGFjdEFjdGl2ZUNsYXNzIiwiY29tcHV0ZWQiLCJEaXNwYXRjaEV2ZW50TWl4aW4iLCJldmVudCIsIkFycmF5IiwibWV0aG9kcyIsImRpc3BhdGNoRXZlbnQiLCJldnQiLCIkZW1pdCIsInRhcmdldCIsImV2ZW50VGFyZ2V0IiwiYXJncyIsImV2ZW50QXJncyIsImxpc3RlbmVycyIsIiRsaXN0ZW5lcnMiLCJlIiwic2NvcGUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsIkZPQ1VTQUJMRV9FTEVNRU5UUyIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJNRENDb21wb25lbnQiLCJyb290IiwiZm91bmRhdGlvbiIsInVuZGVmaW5lZCIsInJvb3RfIiwiaW5pdGlhbGl6ZSIsImZvdW5kYXRpb25fIiwiZ2V0RGVmYXVsdEZvdW5kYXRpb24iLCJpbml0IiwiaW5pdGlhbFN5bmNXaXRoRE9NIiwiRXJyb3IiLCJkZXN0cm95IiwiZXZ0VHlwZSIsImhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dERhdGEiLCJzaG91bGRCdWJibGUiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImJ1YmJsZXMiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiTURDU2xpZGFibGVEcmF3ZXJGb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwiaGFzTmVjZXNzYXJ5RG9tIiwicmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyRHJhd2VySW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlciIsImRlcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlciIsInJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlciIsImRlcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyIiwic2V0VHJhbnNsYXRlWCIsImdldEZvY3VzYWJsZUVsZW1lbnRzIiwic2F2ZUVsZW1lbnRUYWJTdGF0ZSIsInJlc3RvcmVFbGVtZW50VGFiU3RhdGUiLCJtYWtlRWxlbWVudFVudGFiYmFibGUiLCJub3RpZnlPcGVuIiwibm90aWZ5Q2xvc2UiLCJpc1J0bCIsImdldERyYXdlcldpZHRoIiwicm9vdENzc0NsYXNzIiwiYW5pbWF0aW5nQ3NzQ2xhc3MiLCJvcGVuQ3NzQ2xhc3MiLCJkZWZhdWx0QWRhcHRlciIsInJvb3RDc3NDbGFzc18iLCJhbmltYXRpbmdDc3NDbGFzc18iLCJvcGVuQ3NzQ2xhc3NfIiwidHJhbnNpdGlvbkVuZEhhbmRsZXJfIiwiaGFuZGxlVHJhbnNpdGlvbkVuZF8iLCJpbmVydF8iLCJjb21wb25lbnRUb3VjaFN0YXJ0SGFuZGxlcl8iLCJoYW5kbGVUb3VjaFN0YXJ0XyIsImNvbXBvbmVudFRvdWNoTW92ZUhhbmRsZXJfIiwiaGFuZGxlVG91Y2hNb3ZlXyIsImNvbXBvbmVudFRvdWNoRW5kSGFuZGxlcl8iLCJoYW5kbGVUb3VjaEVuZF8iLCJkb2N1bWVudEtleWRvd25IYW5kbGVyXyIsImtleUNvZGUiLCJjbG9zZSIsIlJPT1QiLCJPUEVOIiwiaXNPcGVuXyIsImRldGFiaW5hdGVfIiwicmV0YWJpbmF0ZV8iLCJlbGVtZW50cyIsImkiLCJsZW5ndGgiLCJwb2ludGVyVHlwZSIsImRpcmVjdGlvbl8iLCJkcmF3ZXJXaWR0aF8iLCJzdGFydFhfIiwidG91Y2hlcyIsInBhZ2VYIiwiY3VycmVudFhfIiwidXBkYXRlUmFmXyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInVwZGF0ZURyYXdlcl8iLCJiaW5kIiwicHJlcGFyZUZvclRvdWNoRW5kXyIsImFicyIsIm5ld1Bvc2l0aW9uXyIsIm9wZW4iLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImlzUm9vdFRyYW5zaXRpb25pbmdFdmVudFRhcmdldF8iLCJuZXdQb3MiLCJtaW4iLCJtYXgiLCJjc3NDbGFzc2VzIiwiQU5JTUFUSU5HIiwic3RyaW5ncyIsIkRSQVdFUl9TRUxFQ1RPUiIsIk9QRU5fRVZFTlQiLCJDTE9TRV9FVkVOVCIsIk1EQ1BlcnNpc3RlbnREcmF3ZXJGb3VuZGF0aW9uIiwiaXNEcmF3ZXIiLCJlbCIsIlRBQl9EQVRBIiwiVEFCX0RBVEFfSEFORExFRCIsInN0b3JlZFRyYW5zZm9ybVByb3BlcnR5TmFtZV8iLCJzdXBwb3J0c1Bhc3NpdmVfIiwicmVtYXBFdmVudCIsImV2ZW50TmFtZSIsImdsb2JhbE9iaiIsImdldFRyYW5zZm9ybVByb3BlcnR5TmFtZSIsImZvcmNlUmVmcmVzaCIsInRyYW5zZm9ybVByb3BlcnR5TmFtZSIsInN0eWxlIiwic3VwcG9ydHNDc3NDdXN0b21Qcm9wZXJ0aWVzIiwiQ1NTIiwic3VwcG9ydHMiLCJhcHBseVBhc3NpdmUiLCJpc1N1cHBvcnRlZCIsInBhc3NpdmUiLCJoYXNBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJTQ1JPTExfTE9DSyIsIk9QQUNJVFlfVkFSX05BTUUiLCJNRENUZW1wb3JhcnlEcmF3ZXJGb3VuZGF0aW9uIiwiYWRkQm9keUNsYXNzIiwicmVtb3ZlQm9keUNsYXNzIiwidXBkYXRlQ3NzVmFyaWFibGUiLCJldmVudFRhcmdldEhhc0NsYXNzIiwiY29tcG9uZW50Q2xpY2tIYW5kbGVyXyIsImVuYWJsZVNjcm9sbF8iLCJkaXNhYmxlU2Nyb2xsXyIsIm5ld09wYWNpdHkiLCJNRENSaXBwbGVBZGFwdGVyIiwiY2xhc3NOYW1lIiwidmFyTmFtZSIsInZhbHVlIiwiVU5CT1VOREVEIiwiQkdfRk9DVVNFRCIsIkZHX0FDVElWQVRJT04iLCJGR19ERUFDVElWQVRJT04iLCJWQVJfTEVGVCIsIlZBUl9UT1AiLCJWQVJfRkdfU0laRSIsIlZBUl9GR19TQ0FMRSIsIlZBUl9GR19UUkFOU0xBVEVfU1RBUlQiLCJWQVJfRkdfVFJBTlNMQVRFX0VORCIsIm51bWJlcnMiLCJQQURESU5HIiwiSU5JVElBTF9PUklHSU5fU0NBTEUiLCJERUFDVElWQVRJT05fVElNRU9VVF9NUyIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsImRldGVjdEVkZ2VQc2V1ZG9WYXJCdWciLCJ3aW5kb3dPYmoiLCJub2RlIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY29tcHV0ZWRTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJoYXNQc2V1ZG9WYXJCdWciLCJib3JkZXJUb3BTdHlsZSIsInJlbW92ZSIsInN1cHBvcnRzQ3NzVmFyaWFibGVzIiwic3VwcG9ydHNGdW5jdGlvblByZXNlbnQiLCJleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIiwid2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzIiwiZ2V0TWF0Y2hlc1Byb3BlcnR5IiwiSFRNTEVsZW1lbnRQcm90b3R5cGUiLCJmaWx0ZXIiLCJwIiwicG9wIiwiZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzIiwiZXYiLCJwYWdlT2Zmc2V0IiwiY2xpZW50UmVjdCIsIngiLCJ5IiwiZG9jdW1lbnRYIiwibGVmdCIsImRvY3VtZW50WSIsInRvcCIsIm5vcm1hbGl6ZWRYIiwibm9ybWFsaXplZFkiLCJjaGFuZ2VkVG91Y2hlcyIsInBhZ2VZIiwiQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsIlBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiYWN0aXZhdGVkVGFyZ2V0cyIsIk1EQ1JpcHBsZUZvdW5kYXRpb24iLCJicm93c2VyU3VwcG9ydHNDc3NWYXJzIiwiaXNVbmJvdW5kZWQiLCJpc1N1cmZhY2VBY3RpdmUiLCJpc1N1cmZhY2VEaXNhYmxlZCIsImNvbnRhaW5zRXZlbnRUYXJnZXQiLCJyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJjb21wdXRlQm91bmRpbmdSZWN0IiwiZ2V0V2luZG93UGFnZU9mZnNldCIsImxheW91dEZyYW1lXyIsImZyYW1lXyIsIndpZHRoIiwiaGVpZ2h0IiwiYWN0aXZhdGlvblN0YXRlXyIsImRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfIiwiaW5pdGlhbFNpemVfIiwibWF4UmFkaXVzXyIsImFjdGl2YXRlSGFuZGxlcl8iLCJhY3RpdmF0ZV8iLCJkZWFjdGl2YXRlSGFuZGxlcl8iLCJkZWFjdGl2YXRlXyIsImZvY3VzSGFuZGxlcl8iLCJoYW5kbGVGb2N1cyIsImJsdXJIYW5kbGVyXyIsImhhbmRsZUJsdXIiLCJyZXNpemVIYW5kbGVyXyIsImxheW91dCIsInVuYm91bmRlZENvb3Jkc18iLCJmZ1NjYWxlXyIsImFjdGl2YXRpb25UaW1lcl8iLCJmZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8iLCJhY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfIiwiYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfIiwicnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfIiwiaXNBY3RpdmF0ZWQiLCJoYXNEZWFjdGl2YXRpb25VWFJ1biIsIndhc0FjdGl2YXRlZEJ5UG9pbnRlciIsIndhc0VsZW1lbnRNYWRlQWN0aXZlIiwiYWN0aXZhdGlvbkV2ZW50IiwiaXNQcm9ncmFtbWF0aWMiLCJpc1N1cHBvcnRlZF8iLCJyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJsYXlvdXRJbnRlcm5hbF8iLCJjbGVhclRpbWVvdXQiLCJkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsImRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJyZW1vdmVDc3NWYXJzXyIsImZvckVhY2giLCJrZXlzIiwiayIsImluZGV4T2YiLCJhY3RpdmF0aW9uU3RhdGUiLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudCIsImlzU2FtZUludGVyYWN0aW9uIiwiaGFzQWN0aXZhdGVkQ2hpbGQiLCJzb21lIiwicmVzZXRBY3RpdmF0aW9uU3RhdGVfIiwicHVzaCIsInJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwiY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8iLCJhbmltYXRlQWN0aXZhdGlvbl8iLCJ0cmFuc2xhdGVTdGFydCIsInRyYW5zbGF0ZUVuZCIsImdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18iLCJzdGFydFBvaW50IiwiZW5kUG9pbnQiLCJybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18iLCJzZXRUaW1lb3V0IiwiYWN0aXZhdGlvbkhhc0VuZGVkIiwic3RhdGUiLCJldnRPYmplY3QiLCJhbmltYXRlRGVhY3RpdmF0aW9uXyIsIm1heERpbSIsImdldEJvdW5kZWRSYWRpdXMiLCJoeXBvdGVudXNlIiwic3FydCIsInBvdyIsInVwZGF0ZUxheW91dENzc1ZhcnNfIiwicm91bmQiLCJ1bmJvdW5kZWQiLCJSaXBwbGVCYXNlIiwicmVmIiwiTUFUQ0hFUyIsIl9tYXRjaGVzIiwiSFRNTEVsZW1lbnQiLCJwcm90b3R5cGUiLCJvcHRpb25zIiwiJGVsIiwiZGlzYWJsZWQiLCIkc2V0IiwiY2xhc3NlcyIsIiRkZWxldGUiLCJjb250YWlucyIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhZ2VYT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJSaXBwbGVNaXhpbiIsIm1vdW50ZWQiLCJyaXBwbGUiLCJiZWZvcmVEZXN0cm95IiwibWRjRHJhd2VyIiwibWRjRHJhd2VyTGF5b3V0IiwibWRjRHJhd2VySGVhZGVyIiwibWRjRHJhd2VyTGlzdCIsIm1kY0RyYXdlckl0ZW0iLCJtZGNEcmF3ZXJEaXZpZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQU8sU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEI7SUFDL0I7SUFDQSxNQUFJQyxPQUFPLElBQVg7SUFDQSxNQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7SUFDakNELFdBQU9DLE9BQU9DLEdBQWQ7SUFDRCxHQUZELE1BRU8sSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0lBQ3hDO0lBQ0FILFdBQU9HLE9BQU9ELEdBQWQ7SUFDRDtJQUNELE1BQUlGLElBQUosRUFBVTtJQUNSQSxTQUFLSSxHQUFMLENBQVNMLE1BQVQ7SUFDRDtJQUNGOztJQ1pNLFNBQVNNLFVBQVQsQ0FBb0JDLFVBQXBCLEVBQWdDO0lBQ3JDLFNBQU87SUFDTEMsYUFBUyxRQURKO0lBRUxDLGFBQVMscUJBQU07SUFDYixXQUFLLElBQUlDLEdBQVQsSUFBZ0JILFVBQWhCLEVBQTRCO0lBQzFCLFlBQUlJLFlBQVlKLFdBQVdHLEdBQVgsQ0FBaEI7SUFDQUUsV0FBR0QsU0FBSCxDQUFhQSxVQUFVRSxJQUF2QixFQUE2QkYsU0FBN0I7SUFDRDtJQUNGLEtBUEk7SUFRTEo7SUFSSyxHQUFQO0lBVUQ7O0lDWE0sSUFBTU8sZ0JBQWdCO0lBQzNCQyxjQUFZLElBRGU7SUFFM0JDLFFBRjJCLGtCQUVwQkMsYUFGb0IsRUFFTEMsT0FGSyxFQUVJO0lBQzdCLFdBQU9ELGNBQ0xDLFFBQVFDLEtBQVIsQ0FBY0MsRUFBZCxJQUFvQkYsUUFBUUMsS0FBUixDQUFjRSxHQUFsQyxJQUF5QyxLQURwQyxFQUVMSCxRQUFRSSxJQUZILEVBR0xKLFFBQVFLLFFBSEgsQ0FBUDtJQUtEO0lBUjBCLENBQXRCOztBQVdQLElBQU8sSUFBTUMscUJBQXFCO0lBQ2hDakIsY0FBWTtJQUNWTztJQURVO0lB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
