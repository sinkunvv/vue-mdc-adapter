/**
* @module vue-mdc-adaptertoolbar 0.18.2
* @exports VueMDCToolbar
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCToolbar = factory());
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

    var toConsumableArray = function (arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

        return arr2;
      } else {
        return Array.from(arr);
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
      FIXED: 'mdc-toolbar--fixed',
      FIXED_LASTROW: 'mdc-toolbar--fixed-lastrow-only',
      FIXED_AT_LAST_ROW: 'mdc-toolbar--fixed-at-last-row',
      TOOLBAR_ROW_FLEXIBLE: 'mdc-toolbar--flexible',
      FLEXIBLE_DEFAULT_BEHAVIOR: 'mdc-toolbar--flexible-default-behavior',
      FLEXIBLE_MAX: 'mdc-toolbar--flexible-space-maximized',
      FLEXIBLE_MIN: 'mdc-toolbar--flexible-space-minimized'
    };

    var strings = {
      TITLE_SELECTOR: '.mdc-toolbar__title',
      ICON_SELECTOR: '.mdc-toolbar__icon',
      FIRST_ROW_SELECTOR: '.mdc-toolbar__row:first-child',
      CHANGE_EVENT: 'MDCToolbar:change'
    };

    var numbers = {
      MAX_TITLE_SIZE: 2.125,
      MIN_TITLE_SIZE: 1.25,
      TOOLBAR_ROW_HEIGHT: 64,
      TOOLBAR_ROW_MOBILE_HEIGHT: 56,
      TOOLBAR_MOBILE_BREAKPOINT: 600
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

    var MDCToolbarFoundation = function (_MDCFoundation) {
      inherits(MDCToolbarFoundation, _MDCFoundation);
      createClass(MDCToolbarFoundation, null, [{
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
            hasClass: function hasClass() {
              return (/* className: string */ /* boolean */false
              );
            },
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            registerScrollHandler: function registerScrollHandler() /* handler: EventListener */{},
            deregisterScrollHandler: function deregisterScrollHandler() /* handler: EventListener */{},
            registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
            deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
            getViewportWidth: function getViewportWidth() {
              return (/* number */0
              );
            },
            getViewportScrollY: function getViewportScrollY() {
              return (/* number */0
              );
            },
            getOffsetHeight: function getOffsetHeight() {
              return (/* number */0
              );
            },
            getFirstRowElementOffsetHeight: function getFirstRowElementOffsetHeight() {
              return (/* number */0
              );
            },
            notifyChange: function notifyChange() /* evtData: {flexibleExpansionRatio: number} */{},
            setStyle: function setStyle() /* property: string, value: string */{},
            setStyleForTitleElement: function setStyleForTitleElement() /* property: string, value: string */{},
            setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement() /* property: string, value: string */{},
            setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement() /* property: string, value: string */{}
          };
        }
      }]);

      function MDCToolbarFoundation(adapter) {
        classCallCheck(this, MDCToolbarFoundation);

        var _this = possibleConstructorReturn(this, (MDCToolbarFoundation.__proto__ || Object.getPrototypeOf(MDCToolbarFoundation)).call(this, _extends(MDCToolbarFoundation.defaultAdapter, adapter)));

        _this.resizeHandler_ = function () {
          return _this.checkRowHeight_();
        };
        _this.scrollHandler_ = function () {
          return _this.updateToolbarStyles_();
        };
        _this.checkRowHeightFrame_ = 0;
        _this.scrollFrame_ = 0;
        _this.executedLastChange_ = false;

        _this.calculations_ = {
          toolbarRowHeight: 0,
          // Calculated Height ratio. We use ratio to calculate corresponding heights in resize event.
          toolbarRatio: 0, // The ratio of toolbar height to row height
          flexibleExpansionRatio: 0, // The ratio of flexible space height to row height
          maxTranslateYRatio: 0, // The ratio of max toolbar move up distance to row height
          scrollThresholdRatio: 0, // The ratio of max scrollTop that we should listen to to row height
          // Derived Heights based on the above key ratios.
          toolbarHeight: 0,
          flexibleExpansionHeight: 0, // Flexible row minus toolbar height (derived)
          maxTranslateYDistance: 0, // When toolbar only fix last row (derived)
          scrollThreshold: 0
        };
        // Toolbar fixed behavior
        // If toolbar is fixed
        _this.fixed_ = false;
        // If fixed is targeted only at the last row
        _this.fixedLastrow_ = false;
        // Toolbar flexible behavior
        // If the first row is flexible
        _this.hasFlexibleRow_ = false;
        // If use the default behavior
        _this.useFlexDefaultBehavior_ = false;
        return _this;
      }

      createClass(MDCToolbarFoundation, [{
        key: 'init',
        value: function init() {
          this.fixed_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED);
          this.fixedLastrow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED_LASTROW) & this.fixed_;
          this.hasFlexibleRow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.TOOLBAR_ROW_FLEXIBLE);
          if (this.hasFlexibleRow_) {
            this.useFlexDefaultBehavior_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_DEFAULT_BEHAVIOR);
          }
          this.initKeyRatio_();
          this.setKeyHeights_();
          this.adapter_.registerResizeHandler(this.resizeHandler_);
          this.adapter_.registerScrollHandler(this.scrollHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.adapter_.deregisterResizeHandler(this.resizeHandler_);
          this.adapter_.deregisterScrollHandler(this.scrollHandler_);
        }
      }, {
        key: 'updateAdjustElementStyles',
        value: function updateAdjustElementStyles() {
          if (this.fixed_) {
            this.adapter_.setStyleForFixedAdjustElement('margin-top', this.calculations_.toolbarHeight + 'px');
          }
        }
      }, {
        key: 'getFlexibleExpansionRatio_',
        value: function getFlexibleExpansionRatio_(scrollTop) {
          // To prevent division by zero when there is no flexibleExpansionHeight
          var delta = 0.0001;
          return Math.max(0, 1 - scrollTop / (this.calculations_.flexibleExpansionHeight + delta));
        }
      }, {
        key: 'checkRowHeight_',
        value: function checkRowHeight_() {
          var _this2 = this;

          cancelAnimationFrame(this.checkRowHeightFrame_);
          this.checkRowHeightFrame_ = requestAnimationFrame(function () {
            return _this2.setKeyHeights_();
          });
        }
      }, {
        key: 'setKeyHeights_',
        value: function setKeyHeights_() {
          var newToolbarRowHeight = this.getRowHeight_();
          if (newToolbarRowHeight !== this.calculations_.toolbarRowHeight) {
            this.calculations_.toolbarRowHeight = newToolbarRowHeight;
            this.calculations_.toolbarHeight = this.calculations_.toolbarRatio * this.calculations_.toolbarRowHeight;
            this.calculations_.flexibleExpansionHeight = this.calculations_.flexibleExpansionRatio * this.calculations_.toolbarRowHeight;
            this.calculations_.maxTranslateYDistance = this.calculations_.maxTranslateYRatio * this.calculations_.toolbarRowHeight;
            this.calculations_.scrollThreshold = this.calculations_.scrollThresholdRatio * this.calculations_.toolbarRowHeight;
            this.updateAdjustElementStyles();
            this.updateToolbarStyles_();
          }
        }
      }, {
        key: 'updateToolbarStyles_',
        value: function updateToolbarStyles_() {
          var _this3 = this;

          cancelAnimationFrame(this.scrollFrame_);
          this.scrollFrame_ = requestAnimationFrame(function () {
            var scrollTop = _this3.adapter_.getViewportScrollY();
            var hasScrolledOutOfThreshold = _this3.scrolledOutOfThreshold_(scrollTop);

            if (hasScrolledOutOfThreshold && _this3.executedLastChange_) {
              return;
            }

            var flexibleExpansionRatio = _this3.getFlexibleExpansionRatio_(scrollTop);

            _this3.updateToolbarFlexibleState_(flexibleExpansionRatio);
            if (_this3.fixedLastrow_) {
              _this3.updateToolbarFixedState_(scrollTop);
            }
            if (_this3.hasFlexibleRow_) {
              _this3.updateFlexibleRowElementStyles_(flexibleExpansionRatio);
            }
            _this3.executedLastChange_ = hasScrolledOutOfThreshold;
            _this3.adapter_.notifyChange({ flexibleExpansionRatio: flexibleExpansionRatio });
          });
        }
      }, {
        key: 'scrolledOutOfThreshold_',
        value: function scrolledOutOfThreshold_(scrollTop) {
          return scrollTop > this.calculations_.scrollThreshold;
        }
      }, {
        key: 'initKeyRatio_',
        value: function initKeyRatio_() {
          var toolbarRowHeight = this.getRowHeight_();
          var firstRowMaxRatio = this.adapter_.getFirstRowElementOffsetHeight() / toolbarRowHeight;
          this.calculations_.toolbarRatio = this.adapter_.getOffsetHeight() / toolbarRowHeight;
          this.calculations_.flexibleExpansionRatio = firstRowMaxRatio - 1;
          this.calculations_.maxTranslateYRatio = this.fixedLastrow_ ? this.calculations_.toolbarRatio - firstRowMaxRatio : 0;
          this.calculations_.scrollThresholdRatio = (this.fixedLastrow_ ? this.calculations_.toolbarRatio : firstRowMaxRatio) - 1;
        }
      }, {
        key: 'getRowHeight_',
        value: function getRowHeight_() {
          var breakpoint = MDCToolbarFoundation.numbers.TOOLBAR_MOBILE_BREAKPOINT;
          return this.adapter_.getViewportWidth() < breakpoint ? MDCToolbarFoundation.numbers.TOOLBAR_ROW_MOBILE_HEIGHT : MDCToolbarFoundation.numbers.TOOLBAR_ROW_HEIGHT;
        }
      }, {
        key: 'updateToolbarFlexibleState_',
        value: function updateToolbarFlexibleState_(flexibleExpansionRatio) {
          this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
          this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
          if (flexibleExpansionRatio === 1) {
            this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
          } else if (flexibleExpansionRatio === 0) {
            this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
          }
        }
      }, {
        key: 'updateToolbarFixedState_',
        value: function updateToolbarFixedState_(scrollTop) {
          var translateDistance = Math.max(0, Math.min(scrollTop - this.calculations_.flexibleExpansionHeight, this.calculations_.maxTranslateYDistance));
          this.adapter_.setStyle('transform', 'translateY(' + -translateDistance + 'px)');

          if (translateDistance === this.calculations_.maxTranslateYDistance) {
            this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
          } else {
            this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
          }
        }
      }, {
        key: 'updateFlexibleRowElementStyles_',
        value: function updateFlexibleRowElementStyles_(flexibleExpansionRatio) {
          if (this.fixed_) {
            var height = this.calculations_.flexibleExpansionHeight * flexibleExpansionRatio;
            this.adapter_.setStyleForFlexibleRowElement('height', height + this.calculations_.toolbarRowHeight + 'px');
          }
          if (this.useFlexDefaultBehavior_) {
            this.updateElementStylesDefaultBehavior_(flexibleExpansionRatio);
          }
        }
      }, {
        key: 'updateElementStylesDefaultBehavior_',
        value: function updateElementStylesDefaultBehavior_(flexibleExpansionRatio) {
          var maxTitleSize = MDCToolbarFoundation.numbers.MAX_TITLE_SIZE;
          var minTitleSize = MDCToolbarFoundation.numbers.MIN_TITLE_SIZE;
          var currentTitleSize = (maxTitleSize - minTitleSize) * flexibleExpansionRatio + minTitleSize;

          this.adapter_.setStyleForTitleElement('font-size', currentTitleSize + 'rem');
        }
      }]);
      return MDCToolbarFoundation;
    }(MDCFoundation);

    //

    var script = {
      name: 'mdc-toolbar',
      props: {
        fixed: Boolean,
        waterfall: Boolean,
        'fixed-lastrow': Boolean,
        flexible: Boolean,
        'flexible-default': { type: Boolean, default: true }
      },
      data: function data() {
        return {
          rootClasses: {
            'mdc-toolbar': true,
            'mdc-toolbar--fixed': this.fixed || this.waterfall || this.fixedLastrow,
            'mdc-toolbar--waterfall': this.waterfall,
            'mdc-toolbar--fixed-lastrow-only': this.fixedLastrow,
            'mdc-toolbar--flexible': this.flexible,
            'mdc-toolbar--flexible-default-behavior': this.flexible && this.flexibleDefault
          },
          rootStyles: {},
          adjustStyles: {
            // to avoid top margin collapse with :after el
            // 0.1 px should be rounded to 0px
            // TODO: find a better trick
            // height: '0.1px'
          },
          foundation: null
        };
      },
      mounted: function mounted() {
        var _this = this;

        this.foundation = new MDCToolbarFoundation({
          addClass: function addClass(className) {
            _this.$set(_this.rootClasses, className, true);
          },
          removeClass: function removeClass(className) {
            _this.$delete(_this.rootClasses, className);
          },
          hasClass: function hasClass(className) {
            return _this.$refs.root.classList.contains(className);
          },
          registerScrollHandler: function registerScrollHandler(handler) {
            window.addEventListener('scroll', handler);
          },
          deregisterScrollHandler: function deregisterScrollHandler(handler) {
            window.removeEventListener('scroll', handler);
          },
          registerResizeHandler: function registerResizeHandler(handler) {
            window.addEventListener('resize', handler);
          },
          deregisterResizeHandler: function deregisterResizeHandler(handler) {
            window.removeEventListener('resize', handler);
          },
          getViewportWidth: function getViewportWidth() {
            return window.innerWidth;
          },
          getViewportScrollY: function getViewportScrollY() {
            return window.pageYOffset;
          },
          getOffsetHeight: function getOffsetHeight() {
            return _this.$refs.root.offsetHeight;
          },
          getFirstRowElementOffsetHeight: function getFirstRowElementOffsetHeight() {
            var el = _this.$refs.root.querySelector(MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR);
            return el ? el.offsetHeight : undefined;
          },
          notifyChange: function notifyChange(evtData) {
            _this.$emit('change', evtData);
          },
          setStyle: function setStyle(property, value) {
            _this.$set(_this.rootStyles, property, value);
          },
          setStyleForTitleElement: function setStyleForTitleElement(property, value) {
            var el = _this.$refs.root.querySelector(MDCToolbarFoundation.strings.TITLE_SELECTOR);
            if (el) el.style.setProperty(property, value);
          },
          setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement(property, value) {
            var el = _this.$refs.root.querySelector(MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR);
            if (el) el.style.setProperty(property, value);
          },
          setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement(property, value) {
            _this.$set(_this.adjustStyles, property, value);
          }
        });
        this.foundation.init();
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation.destroy();
      }
    };

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("header", { staticClass: "mdc-toolbar-wrapper" }, [_c("div", { ref: "root", class: _vm.rootClasses, style: _vm.rootStyles }, [_vm._t("default")], 2), _vm._v(" "), _vm.fixed || _vm.waterfall || _vm.fixedLastrow ? _c("div", {
        ref: "fixed-adjust",
        staticClass: "mdc-toolbar-fixed-adjust",
        style: _vm.adjustStyles
      }) : _vm._e()]);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\toolbar\\mdc-toolbar.vue";

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

    var mdcToolbar = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

    //
    //
    //
    //
    //
    //

    var script$1 = {
      name: 'mdc-toolbar-row'
    };

    /* script */
    var __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$1 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "mdc-toolbar-row mdc-toolbar__row" }, [_vm._t("default")], 2);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\toolbar\\mdc-toolbar-row.vue";

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

    var mdcToolbarRow = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

    //
    //
    //
    //
    //
    //
    //
    //

    var script$2 = {
      name: 'mdc-toolbar-section',
      props: {
        'align-start': Boolean,
        'align-end': Boolean,
        'shrink-to-fit': Boolean
      },
      data: function data() {
        return {
          classes: {
            'mdc-toolbar__section--align-start': this.alignStart,
            'mdc-toolbar__section--align-end': this.alignEnd,
            'mdc-toolbar__section--shrink-to-fit': this.shrinkToFit
          }
        };
      }
    };

    /* script */
    var __vue_script__$2 = script$2;

    /* template */
    var __vue_render__$2 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("section", {
        staticClass: "mdc-toolbar-section mdc-toolbar__section",
        class: _vm.classes
      }, [_vm._t("default")], 2);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\toolbar\\mdc-toolbar-section.vue";

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

    var mdcToolbarSection = __vue_normalize__$2({ render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, __vue_create_injector__$2, undefined);

    //

    var script$3 = {
      name: 'mdc-toolbar-menu-icon',
      mixins: [DispatchEventMixin],
      props: {
        icon: { type: String, default: 'menu' }
      }
    };

    /* script */
    var __vue_script__$3 = script$3;

    /* template */
    var __vue_render__$3 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("a", _vm._g({
        staticClass: "mdc-toolbar-menu-icon mdc-toolbar__menu-icon",
        class: { "material-icons": !!_vm.icon }
      }, _vm.listeners), [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\toolbar\\mdc-toolbar-menu-icon.vue";

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

    var mdcToolbarMenuIcon = __vue_normalize__$3({ render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, __vue_create_injector__$3, undefined);

    //

    var script$4 = {
      name: 'mdc-toolbar-title',
      mixins: [DispatchEventMixin]
    };

    /* script */
    var __vue_script__$4 = script$4;

    /* template */
    var __vue_render__$4 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("a", _vm._g({ staticClass: "mdc-toolbar-title mdc-toolbar__title" }, _vm.listeners), [_vm._t("default")], 2);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\toolbar\\mdc-toolbar-title.vue";

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

    var mdcToolbarTitle = __vue_normalize__$4({ render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, __vue_create_injector__$4, undefined);

    //

    var script$5 = {
      name: 'mdc-toolbar-icon',
      mixins: [DispatchEventMixin],
      props: {
        icon: String
      }
    };

    /* script */
    var __vue_script__$5 = script$5;

    /* template */
    var __vue_render__$5 = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("a", _vm._g({
        staticClass: "mdc-toolbar-icon mdc-toolbar__icon",
        class: { "material-icons": !!_vm.icon }
      }, _vm.listeners), [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\toolbar\\mdc-toolbar-icon.vue";

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

    var mdcToolbarIcon = __vue_normalize__$5({ render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 }, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, __vue_create_injector__$5, undefined);

    var plugin = BasePlugin({
      mdcToolbar: mdcToolbar,
      mdcToolbarRow: mdcToolbarRow,
      mdcToolbarSection: mdcToolbarSection,
      mdcToolbarMenuIcon: mdcToolbarMenuIcon,
      mdcToolbarTitle: mdcToolbarTitle,
      mdcToolbarIcon: mdcToolbarIcon
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvZGlzcGF0Y2gtZXZlbnQtbWl4aW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvdW5pcXVlaWQtbWl4aW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdG9vbGJhci9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3Rvb2xiYXIvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci9tZGMtdG9vbGJhci52dWUiLCIuLi8uLi9jb21wb25lbnRzL3Rvb2xiYXIvbWRjLXRvb2xiYXItcm93LnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci9tZGMtdG9vbGJhci1zZWN0aW9uLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci9tZGMtdG9vbGJhci1tZW51LWljb24udnVlIiwiLi4vLi4vY29tcG9uZW50cy90b29sYmFyL21kYy10b29sYmFyLXRpdGxlLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci9tZGMtdG9vbGJhci1pY29uLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQocGx1Z2luKSB7XHJcbiAgLy8gQXV0by1pbnN0YWxsXHJcbiAgbGV0IF9WdWUgPSBudWxsXHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIC8qZ2xvYmFsIGdsb2JhbCovXHJcbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxyXG4gIH1cclxuICBpZiAoX1Z1ZSkge1xyXG4gICAgX1Z1ZS51c2UocGx1Z2luKVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbihjb21wb25lbnRzKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXHJcbiAgICBpbnN0YWxsOiB2bSA9PiB7XHJcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxyXG4gICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSwgY29tcG9uZW50KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50c1xyXG4gIH1cclxufVxyXG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XHJcbiAgbGV0IGV2dFxyXG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XHJcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcclxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXHJcbiAgICB9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxyXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxyXG4gIH1cclxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcclxufVxyXG4iLCJleHBvcnQgY29uc3QgRGlzcGF0Y2hFdmVudE1peGluID0ge1xyXG4gIHByb3BzOiB7XHJcbiAgICBldmVudDogU3RyaW5nLFxyXG4gICAgJ2V2ZW50LXRhcmdldCc6IE9iamVjdCxcclxuICAgICdldmVudC1hcmdzJzogQXJyYXlcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGRpc3BhdGNoRXZlbnQoZXZ0KSB7XHJcbiAgICAgIGV2dCAmJiB0aGlzLiRlbWl0KGV2dC50eXBlLCBldnQpXHJcbiAgICAgIGlmICh0aGlzLmV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuZXZlbnRUYXJnZXQgfHwgdGhpcy4kcm9vdFxyXG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5ldmVudEFyZ3MgfHwgW11cclxuICAgICAgICB0YXJnZXQuJGVtaXQodGhpcy5ldmVudCwgLi4uYXJncylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIGxpc3RlbmVycygpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXHJcbiAgICAgICAgY2xpY2s6IGUgPT4gdGhpcy5kaXNwYXRjaEV2ZW50KGUpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiY29uc3Qgc2NvcGUgPVxyXG4gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoMHgxMDAwMDAwMCkpLnRvU3RyaW5nKCkgKyAnLSdcclxuXHJcbmV4cG9ydCBjb25zdCBWTUFVbmlxdWVJZE1peGluID0ge1xyXG4gIGJlZm9yZUNyZWF0ZSgpIHtcclxuICAgIHRoaXMudm1hX3VpZF8gPSBzY29wZSArIHRoaXMuX3VpZFxyXG4gIH1cclxufVxyXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuZXhwb3J0IGNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIEZJWEVEOiAnbWRjLXRvb2xiYXItLWZpeGVkJyxcbiAgRklYRURfTEFTVFJPVzogJ21kYy10b29sYmFyLS1maXhlZC1sYXN0cm93LW9ubHknLFxuICBGSVhFRF9BVF9MQVNUX1JPVzogJ21kYy10b29sYmFyLS1maXhlZC1hdC1sYXN0LXJvdycsXG4gIFRPT0xCQVJfUk9XX0ZMRVhJQkxFOiAnbWRjLXRvb2xiYXItLWZsZXhpYmxlJyxcbiAgRkxFWElCTEVfREVGQVVMVF9CRUhBVklPUjogJ21kYy10b29sYmFyLS1mbGV4aWJsZS1kZWZhdWx0LWJlaGF2aW9yJyxcbiAgRkxFWElCTEVfTUFYOiAnbWRjLXRvb2xiYXItLWZsZXhpYmxlLXNwYWNlLW1heGltaXplZCcsXG4gIEZMRVhJQkxFX01JTjogJ21kYy10b29sYmFyLS1mbGV4aWJsZS1zcGFjZS1taW5pbWl6ZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IHN0cmluZ3MgPSB7XG4gIFRJVExFX1NFTEVDVE9SOiAnLm1kYy10b29sYmFyX190aXRsZScsXG4gIElDT05fU0VMRUNUT1I6ICcubWRjLXRvb2xiYXJfX2ljb24nLFxuICBGSVJTVF9ST1dfU0VMRUNUT1I6ICcubWRjLXRvb2xiYXJfX3JvdzpmaXJzdC1jaGlsZCcsXG4gIENIQU5HRV9FVkVOVDogJ01EQ1Rvb2xiYXI6Y2hhbmdlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBudW1iZXJzID0ge1xuICBNQVhfVElUTEVfU0laRTogMi4xMjUsXG4gIE1JTl9USVRMRV9TSVpFOiAxLjI1LFxuICBUT09MQkFSX1JPV19IRUlHSFQ6IDY0LFxuICBUT09MQkFSX1JPV19NT0JJTEVfSEVJR0hUOiA1NixcbiAgVE9PTEJBUl9NT0JJTEVfQlJFQUtQT0lOVDogNjAwLFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNRENUb29sYmFyRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBoYXNDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiAvKiBib29sZWFuICovIGZhbHNlLFxuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyU2Nyb2xsSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclNjcm9sbEhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGdldFZpZXdwb3J0V2lkdGg6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgZ2V0Vmlld3BvcnRTY3JvbGxZOiAoKSA9PiAvKiBudW1iZXIgKi8gMCxcbiAgICAgIGdldE9mZnNldEhlaWdodDogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICBnZXRGaXJzdFJvd0VsZW1lbnRPZmZzZXRIZWlnaHQ6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgbm90aWZ5Q2hhbmdlOiAoLyogZXZ0RGF0YToge2ZsZXhpYmxlRXhwYW5zaW9uUmF0aW86IG51bWJlcn0gKi8pID0+IHt9LFxuICAgICAgc2V0U3R5bGU6ICgvKiBwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldFN0eWxlRm9yVGl0bGVFbGVtZW50OiAoLyogcHJvcGVydHk6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBzZXRTdHlsZUZvckZsZXhpYmxlUm93RWxlbWVudDogKC8qIHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgc2V0U3R5bGVGb3JGaXhlZEFkanVzdEVsZW1lbnQ6ICgvKiBwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDVG9vbGJhckZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcbiAgICB0aGlzLnJlc2l6ZUhhbmRsZXJfID0gKCkgPT4gdGhpcy5jaGVja1Jvd0hlaWdodF8oKTtcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXJfID0gKCkgPT4gdGhpcy51cGRhdGVUb29sYmFyU3R5bGVzXygpO1xuICAgIHRoaXMuY2hlY2tSb3dIZWlnaHRGcmFtZV8gPSAwO1xuICAgIHRoaXMuc2Nyb2xsRnJhbWVfID0gMDtcbiAgICB0aGlzLmV4ZWN1dGVkTGFzdENoYW5nZV8gPSBmYWxzZTtcblxuICAgIHRoaXMuY2FsY3VsYXRpb25zXyA9IHtcbiAgICAgIHRvb2xiYXJSb3dIZWlnaHQ6IDAsXG4gICAgICAvLyBDYWxjdWxhdGVkIEhlaWdodCByYXRpby4gV2UgdXNlIHJhdGlvIHRvIGNhbGN1bGF0ZSBjb3JyZXNwb25kaW5nIGhlaWdodHMgaW4gcmVzaXplIGV2ZW50LlxuICAgICAgdG9vbGJhclJhdGlvOiAwLCAvLyBUaGUgcmF0aW8gb2YgdG9vbGJhciBoZWlnaHQgdG8gcm93IGhlaWdodFxuICAgICAgZmxleGlibGVFeHBhbnNpb25SYXRpbzogMCwgLy8gVGhlIHJhdGlvIG9mIGZsZXhpYmxlIHNwYWNlIGhlaWdodCB0byByb3cgaGVpZ2h0XG4gICAgICBtYXhUcmFuc2xhdGVZUmF0aW86IDAsIC8vIFRoZSByYXRpbyBvZiBtYXggdG9vbGJhciBtb3ZlIHVwIGRpc3RhbmNlIHRvIHJvdyBoZWlnaHRcbiAgICAgIHNjcm9sbFRocmVzaG9sZFJhdGlvOiAwLCAvLyBUaGUgcmF0aW8gb2YgbWF4IHNjcm9sbFRvcCB0aGF0IHdlIHNob3VsZCBsaXN0ZW4gdG8gdG8gcm93IGhlaWdodFxuICAgICAgLy8gRGVyaXZlZCBIZWlnaHRzIGJhc2VkIG9uIHRoZSBhYm92ZSBrZXkgcmF0aW9zLlxuICAgICAgdG9vbGJhckhlaWdodDogMCxcbiAgICAgIGZsZXhpYmxlRXhwYW5zaW9uSGVpZ2h0OiAwLCAvLyBGbGV4aWJsZSByb3cgbWludXMgdG9vbGJhciBoZWlnaHQgKGRlcml2ZWQpXG4gICAgICBtYXhUcmFuc2xhdGVZRGlzdGFuY2U6IDAsIC8vIFdoZW4gdG9vbGJhciBvbmx5IGZpeCBsYXN0IHJvdyAoZGVyaXZlZClcbiAgICAgIHNjcm9sbFRocmVzaG9sZDogMCxcbiAgICB9O1xuICAgIC8vIFRvb2xiYXIgZml4ZWQgYmVoYXZpb3JcbiAgICAvLyBJZiB0b29sYmFyIGlzIGZpeGVkXG4gICAgdGhpcy5maXhlZF8gPSBmYWxzZTtcbiAgICAvLyBJZiBmaXhlZCBpcyB0YXJnZXRlZCBvbmx5IGF0IHRoZSBsYXN0IHJvd1xuICAgIHRoaXMuZml4ZWRMYXN0cm93XyA9IGZhbHNlO1xuICAgIC8vIFRvb2xiYXIgZmxleGlibGUgYmVoYXZpb3JcbiAgICAvLyBJZiB0aGUgZmlyc3Qgcm93IGlzIGZsZXhpYmxlXG4gICAgdGhpcy5oYXNGbGV4aWJsZVJvd18gPSBmYWxzZTtcbiAgICAvLyBJZiB1c2UgdGhlIGRlZmF1bHQgYmVoYXZpb3JcbiAgICB0aGlzLnVzZUZsZXhEZWZhdWx0QmVoYXZpb3JfID0gZmFsc2U7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuZml4ZWRfID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhNRENUb29sYmFyRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZJWEVEKTtcbiAgICB0aGlzLmZpeGVkTGFzdHJvd18gPSB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRklYRURfTEFTVFJPVykgJiB0aGlzLmZpeGVkXztcbiAgICB0aGlzLmhhc0ZsZXhpYmxlUm93XyA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoTURDVG9vbGJhckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5UT09MQkFSX1JPV19GTEVYSUJMRSk7XG4gICAgaWYgKHRoaXMuaGFzRmxleGlibGVSb3dfKSB7XG4gICAgICB0aGlzLnVzZUZsZXhEZWZhdWx0QmVoYXZpb3JfID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhNRENUb29sYmFyRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZMRVhJQkxFX0RFRkFVTFRfQkVIQVZJT1IpO1xuICAgIH1cbiAgICB0aGlzLmluaXRLZXlSYXRpb18oKTtcbiAgICB0aGlzLnNldEtleUhlaWdodHNfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclNjcm9sbEhhbmRsZXIodGhpcy5zY3JvbGxIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyU2Nyb2xsSGFuZGxlcih0aGlzLnNjcm9sbEhhbmRsZXJfKTtcbiAgfVxuXG4gIHVwZGF0ZUFkanVzdEVsZW1lbnRTdHlsZXMoKSB7XG4gICAgaWYgKHRoaXMuZml4ZWRfKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlRm9yRml4ZWRBZGp1c3RFbGVtZW50KCdtYXJnaW4tdG9wJywgYCR7dGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJIZWlnaHR9cHhgKTtcbiAgICB9XG4gIH1cblxuICBnZXRGbGV4aWJsZUV4cGFuc2lvblJhdGlvXyhzY3JvbGxUb3ApIHtcbiAgICAvLyBUbyBwcmV2ZW50IGRpdmlzaW9uIGJ5IHplcm8gd2hlbiB0aGVyZSBpcyBubyBmbGV4aWJsZUV4cGFuc2lvbkhlaWdodFxuICAgIGNvbnN0IGRlbHRhID0gMC4wMDAxO1xuICAgIHJldHVybiBNYXRoLm1heCgwLCAxIC0gc2Nyb2xsVG9wIC8gKHRoaXMuY2FsY3VsYXRpb25zXy5mbGV4aWJsZUV4cGFuc2lvbkhlaWdodCArIGRlbHRhKSk7XG4gIH1cblxuICBjaGVja1Jvd0hlaWdodF8oKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5jaGVja1Jvd0hlaWdodEZyYW1lXyk7XG4gICAgdGhpcy5jaGVja1Jvd0hlaWdodEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLnNldEtleUhlaWdodHNfKCkpO1xuICB9XG5cbiAgc2V0S2V5SGVpZ2h0c18oKSB7XG4gICAgY29uc3QgbmV3VG9vbGJhclJvd0hlaWdodCA9IHRoaXMuZ2V0Um93SGVpZ2h0XygpO1xuICAgIGlmIChuZXdUb29sYmFyUm93SGVpZ2h0ICE9PSB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhclJvd0hlaWdodCkge1xuICAgICAgdGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJSb3dIZWlnaHQgPSBuZXdUb29sYmFyUm93SGVpZ2h0O1xuICAgICAgdGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJIZWlnaHQgPSB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhclJhdGlvICogdGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJSb3dIZWlnaHQ7XG4gICAgICB0aGlzLmNhbGN1bGF0aW9uc18uZmxleGlibGVFeHBhbnNpb25IZWlnaHQgPVxuICAgICAgICB0aGlzLmNhbGN1bGF0aW9uc18uZmxleGlibGVFeHBhbnNpb25SYXRpbyAqIHRoaXMuY2FsY3VsYXRpb25zXy50b29sYmFyUm93SGVpZ2h0O1xuICAgICAgdGhpcy5jYWxjdWxhdGlvbnNfLm1heFRyYW5zbGF0ZVlEaXN0YW5jZSA9XG4gICAgICAgIHRoaXMuY2FsY3VsYXRpb25zXy5tYXhUcmFuc2xhdGVZUmF0aW8gKiB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhclJvd0hlaWdodDtcbiAgICAgIHRoaXMuY2FsY3VsYXRpb25zXy5zY3JvbGxUaHJlc2hvbGQgPVxuICAgICAgICB0aGlzLmNhbGN1bGF0aW9uc18uc2Nyb2xsVGhyZXNob2xkUmF0aW8gKiB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhclJvd0hlaWdodDtcbiAgICAgIHRoaXMudXBkYXRlQWRqdXN0RWxlbWVudFN0eWxlcygpO1xuICAgICAgdGhpcy51cGRhdGVUb29sYmFyU3R5bGVzXygpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVRvb2xiYXJTdHlsZXNfKCkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuc2Nyb2xsRnJhbWVfKTtcbiAgICB0aGlzLnNjcm9sbEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLmFkYXB0ZXJfLmdldFZpZXdwb3J0U2Nyb2xsWSgpO1xuICAgICAgY29uc3QgaGFzU2Nyb2xsZWRPdXRPZlRocmVzaG9sZCA9IHRoaXMuc2Nyb2xsZWRPdXRPZlRocmVzaG9sZF8oc2Nyb2xsVG9wKTtcblxuICAgICAgaWYgKGhhc1Njcm9sbGVkT3V0T2ZUaHJlc2hvbGQgJiYgdGhpcy5leGVjdXRlZExhc3RDaGFuZ2VfKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmxleGlibGVFeHBhbnNpb25SYXRpbyA9IHRoaXMuZ2V0RmxleGlibGVFeHBhbnNpb25SYXRpb18oc2Nyb2xsVG9wKTtcblxuICAgICAgdGhpcy51cGRhdGVUb29sYmFyRmxleGlibGVTdGF0ZV8oZmxleGlibGVFeHBhbnNpb25SYXRpbyk7XG4gICAgICBpZiAodGhpcy5maXhlZExhc3Ryb3dfKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckZpeGVkU3RhdGVfKHNjcm9sbFRvcCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5oYXNGbGV4aWJsZVJvd18pIHtcbiAgICAgICAgdGhpcy51cGRhdGVGbGV4aWJsZVJvd0VsZW1lbnRTdHlsZXNfKGZsZXhpYmxlRXhwYW5zaW9uUmF0aW8pO1xuICAgICAgfVxuICAgICAgdGhpcy5leGVjdXRlZExhc3RDaGFuZ2VfID0gaGFzU2Nyb2xsZWRPdXRPZlRocmVzaG9sZDtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5Q2hhbmdlKHtmbGV4aWJsZUV4cGFuc2lvblJhdGlvOiBmbGV4aWJsZUV4cGFuc2lvblJhdGlvfSk7XG4gICAgfSk7XG4gIH1cblxuICBzY3JvbGxlZE91dE9mVGhyZXNob2xkXyhzY3JvbGxUb3ApIHtcbiAgICByZXR1cm4gc2Nyb2xsVG9wID4gdGhpcy5jYWxjdWxhdGlvbnNfLnNjcm9sbFRocmVzaG9sZDtcbiAgfVxuXG4gIGluaXRLZXlSYXRpb18oKSB7XG4gICAgY29uc3QgdG9vbGJhclJvd0hlaWdodCA9IHRoaXMuZ2V0Um93SGVpZ2h0XygpO1xuICAgIGNvbnN0IGZpcnN0Um93TWF4UmF0aW8gPSB0aGlzLmFkYXB0ZXJfLmdldEZpcnN0Um93RWxlbWVudE9mZnNldEhlaWdodCgpIC8gdG9vbGJhclJvd0hlaWdodDtcbiAgICB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhclJhdGlvID0gdGhpcy5hZGFwdGVyXy5nZXRPZmZzZXRIZWlnaHQoKSAvIHRvb2xiYXJSb3dIZWlnaHQ7XG4gICAgdGhpcy5jYWxjdWxhdGlvbnNfLmZsZXhpYmxlRXhwYW5zaW9uUmF0aW8gPSBmaXJzdFJvd01heFJhdGlvIC0gMTtcbiAgICB0aGlzLmNhbGN1bGF0aW9uc18ubWF4VHJhbnNsYXRlWVJhdGlvID1cbiAgICAgIHRoaXMuZml4ZWRMYXN0cm93XyA/IHRoaXMuY2FsY3VsYXRpb25zXy50b29sYmFyUmF0aW8gLSBmaXJzdFJvd01heFJhdGlvIDogMDtcbiAgICB0aGlzLmNhbGN1bGF0aW9uc18uc2Nyb2xsVGhyZXNob2xkUmF0aW8gPVxuICAgICAgKHRoaXMuZml4ZWRMYXN0cm93XyA/IHRoaXMuY2FsY3VsYXRpb25zXy50b29sYmFyUmF0aW8gOiBmaXJzdFJvd01heFJhdGlvKSAtIDE7XG4gIH1cblxuICBnZXRSb3dIZWlnaHRfKCkge1xuICAgIGNvbnN0IGJyZWFrcG9pbnQgPSBNRENUb29sYmFyRm91bmRhdGlvbi5udW1iZXJzLlRPT0xCQVJfTU9CSUxFX0JSRUFLUE9JTlQ7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uZ2V0Vmlld3BvcnRXaWR0aCgpIDwgYnJlYWtwb2ludCA/XG4gICAgICBNRENUb29sYmFyRm91bmRhdGlvbi5udW1iZXJzLlRPT0xCQVJfUk9XX01PQklMRV9IRUlHSFQgOiBNRENUb29sYmFyRm91bmRhdGlvbi5udW1iZXJzLlRPT0xCQVJfUk9XX0hFSUdIVDtcbiAgfVxuXG4gIHVwZGF0ZVRvb2xiYXJGbGV4aWJsZVN0YXRlXyhmbGV4aWJsZUV4cGFuc2lvblJhdGlvKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENUb29sYmFyRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZMRVhJQkxFX01BWCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENUb29sYmFyRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZMRVhJQkxFX01JTik7XG4gICAgaWYgKGZsZXhpYmxlRXhwYW5zaW9uUmF0aW8gPT09IDEpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDVG9vbGJhckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GTEVYSUJMRV9NQVgpO1xuICAgIH0gZWxzZSBpZiAoZmxleGlibGVFeHBhbnNpb25SYXRpbyA9PT0gMCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENUb29sYmFyRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZMRVhJQkxFX01JTik7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVG9vbGJhckZpeGVkU3RhdGVfKHNjcm9sbFRvcCkge1xuICAgIGNvbnN0IHRyYW5zbGF0ZURpc3RhbmNlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oXG4gICAgICBzY3JvbGxUb3AgLSB0aGlzLmNhbGN1bGF0aW9uc18uZmxleGlibGVFeHBhbnNpb25IZWlnaHQsXG4gICAgICB0aGlzLmNhbGN1bGF0aW9uc18ubWF4VHJhbnNsYXRlWURpc3RhbmNlKSk7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRTdHlsZSgndHJhbnNmb3JtJywgYHRyYW5zbGF0ZVkoJHstdHJhbnNsYXRlRGlzdGFuY2V9cHgpYCk7XG5cbiAgICBpZiAodHJhbnNsYXRlRGlzdGFuY2UgPT09IHRoaXMuY2FsY3VsYXRpb25zXy5tYXhUcmFuc2xhdGVZRGlzdGFuY2UpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDVG9vbGJhckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GSVhFRF9BVF9MQVNUX1JPVyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDVG9vbGJhckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GSVhFRF9BVF9MQVNUX1JPVyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlRmxleGlibGVSb3dFbGVtZW50U3R5bGVzXyhmbGV4aWJsZUV4cGFuc2lvblJhdGlvKSB7XG4gICAgaWYgKHRoaXMuZml4ZWRfKSB7XG4gICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbGN1bGF0aW9uc18uZmxleGlibGVFeHBhbnNpb25IZWlnaHQgKiBmbGV4aWJsZUV4cGFuc2lvblJhdGlvO1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRTdHlsZUZvckZsZXhpYmxlUm93RWxlbWVudCgnaGVpZ2h0JyxcbiAgICAgICAgYCR7aGVpZ2h0ICsgdGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJSb3dIZWlnaHR9cHhgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudXNlRmxleERlZmF1bHRCZWhhdmlvcl8pIHtcbiAgICAgIHRoaXMudXBkYXRlRWxlbWVudFN0eWxlc0RlZmF1bHRCZWhhdmlvcl8oZmxleGlibGVFeHBhbnNpb25SYXRpbyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlRWxlbWVudFN0eWxlc0RlZmF1bHRCZWhhdmlvcl8oZmxleGlibGVFeHBhbnNpb25SYXRpbykge1xuICAgIGNvbnN0IG1heFRpdGxlU2l6ZSA9IE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLm51bWJlcnMuTUFYX1RJVExFX1NJWkU7XG4gICAgY29uc3QgbWluVGl0bGVTaXplID0gTURDVG9vbGJhckZvdW5kYXRpb24ubnVtYmVycy5NSU5fVElUTEVfU0laRTtcbiAgICBjb25zdCBjdXJyZW50VGl0bGVTaXplID0gKG1heFRpdGxlU2l6ZSAtIG1pblRpdGxlU2l6ZSkgKiBmbGV4aWJsZUV4cGFuc2lvblJhdGlvICsgbWluVGl0bGVTaXplO1xuXG4gICAgdGhpcy5hZGFwdGVyXy5zZXRTdHlsZUZvclRpdGxlRWxlbWVudCgnZm9udC1zaXplJywgYCR7Y3VycmVudFRpdGxlU2l6ZX1yZW1gKTtcbiAgfVxufVxuIiwiPHRlbXBsYXRlPlxyXG4gIDxoZWFkZXIgY2xhc3M9XCJtZGMtdG9vbGJhci13cmFwcGVyXCI+XHJcbiAgICA8IS0tVG9vbGJhci0tPlxyXG4gICAgPGRpdiBcclxuICAgICAgcmVmPVwicm9vdFwiIFxyXG4gICAgICA6Y2xhc3M9XCJyb290Q2xhc3Nlc1wiIFxyXG4gICAgICA6c3R5bGU9XCJyb290U3R5bGVzXCI+XHJcbiAgICAgIDxzbG90Lz5cclxuICAgIDwvZGl2PlxyXG4gICAgPCEtLSBGaXhlZCBBZGp1c3QgRWxlbWVudC0tPlxyXG4gICAgPGRpdiBcclxuICAgICAgdi1pZj1cImZpeGVkIHx8IHdhdGVyZmFsbCB8fCBmaXhlZExhc3Ryb3dcIiBcclxuICAgICAgcmVmPVwiZml4ZWQtYWRqdXN0XCIgXHJcbiAgICAgIDpzdHlsZT1cImFkanVzdFN0eWxlc1wiXHJcbiAgICAgIGNsYXNzPVwibWRjLXRvb2xiYXItZml4ZWQtYWRqdXN0XCIvPlxyXG4gIDwvaGVhZGVyPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IE1EQ1Rvb2xiYXJGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC90b29sYmFyL2ZvdW5kYXRpb24nXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy10b29sYmFyJyxcclxuICBwcm9wczoge1xyXG4gICAgZml4ZWQ6IEJvb2xlYW4sXHJcbiAgICB3YXRlcmZhbGw6IEJvb2xlYW4sXHJcbiAgICAnZml4ZWQtbGFzdHJvdyc6IEJvb2xlYW4sXHJcbiAgICBmbGV4aWJsZTogQm9vbGVhbixcclxuICAgICdmbGV4aWJsZS1kZWZhdWx0JzogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiB0cnVlIH1cclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByb290Q2xhc3Nlczoge1xyXG4gICAgICAgICdtZGMtdG9vbGJhcic6IHRydWUsXHJcbiAgICAgICAgJ21kYy10b29sYmFyLS1maXhlZCc6IHRoaXMuZml4ZWQgfHwgdGhpcy53YXRlcmZhbGwgfHwgdGhpcy5maXhlZExhc3Ryb3csXHJcbiAgICAgICAgJ21kYy10b29sYmFyLS13YXRlcmZhbGwnOiB0aGlzLndhdGVyZmFsbCxcclxuICAgICAgICAnbWRjLXRvb2xiYXItLWZpeGVkLWxhc3Ryb3ctb25seSc6IHRoaXMuZml4ZWRMYXN0cm93LFxyXG4gICAgICAgICdtZGMtdG9vbGJhci0tZmxleGlibGUnOiB0aGlzLmZsZXhpYmxlLFxyXG4gICAgICAgICdtZGMtdG9vbGJhci0tZmxleGlibGUtZGVmYXVsdC1iZWhhdmlvcic6XHJcbiAgICAgICAgICB0aGlzLmZsZXhpYmxlICYmIHRoaXMuZmxleGlibGVEZWZhdWx0XHJcbiAgICAgIH0sXHJcbiAgICAgIHJvb3RTdHlsZXM6IHt9LFxyXG4gICAgICBhZGp1c3RTdHlsZXM6IHtcclxuICAgICAgICAvLyB0byBhdm9pZCB0b3AgbWFyZ2luIGNvbGxhcHNlIHdpdGggOmFmdGVyIGVsXHJcbiAgICAgICAgLy8gMC4xIHB4IHNob3VsZCBiZSByb3VuZGVkIHRvIDBweFxyXG4gICAgICAgIC8vIFRPRE86IGZpbmQgYSBiZXR0ZXIgdHJpY2tcclxuICAgICAgICAvLyBoZWlnaHQ6ICcwLjFweCdcclxuICAgICAgfSxcclxuICAgICAgZm91bmRhdGlvbjogbnVsbFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbW91bnRlZCgpIHtcclxuICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENUb29sYmFyRm91bmRhdGlvbih7XHJcbiAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4ge1xyXG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnJvb3RDbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4ge1xyXG4gICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLnJvb3RDbGFzc2VzLCBjbGFzc05hbWUpXHJcbiAgICAgIH0sXHJcbiAgICAgIGhhc0NsYXNzOiBjbGFzc05hbWUgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRyZWZzLnJvb3QuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSlcclxuICAgICAgfSxcclxuICAgICAgcmVnaXN0ZXJTY3JvbGxIYW5kbGVyOiBoYW5kbGVyID0+IHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaGFuZGxlcilcclxuICAgICAgfSxcclxuICAgICAgZGVyZWdpc3RlclNjcm9sbEhhbmRsZXI6IGhhbmRsZXIgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBoYW5kbGVyKVxyXG4gICAgICB9LFxyXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxyXG4gICAgICB9LFxyXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogaGFuZGxlciA9PiB7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXHJcbiAgICAgIH0sXHJcbiAgICAgIGdldFZpZXdwb3J0V2lkdGg6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGhcclxuICAgICAgfSxcclxuICAgICAgZ2V0Vmlld3BvcnRTY3JvbGxZOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldFxyXG4gICAgICB9LFxyXG4gICAgICBnZXRPZmZzZXRIZWlnaHQ6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kcmVmcy5yb290Lm9mZnNldEhlaWdodFxyXG4gICAgICB9LFxyXG4gICAgICBnZXRGaXJzdFJvd0VsZW1lbnRPZmZzZXRIZWlnaHQ6ICgpID0+IHtcclxuICAgICAgICBsZXQgZWwgPSB0aGlzLiRyZWZzLnJvb3QucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgIE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLnN0cmluZ3MuRklSU1RfUk9XX1NFTEVDVE9SXHJcbiAgICAgICAgKVxyXG4gICAgICAgIHJldHVybiBlbCA/IGVsLm9mZnNldEhlaWdodCA6IHVuZGVmaW5lZFxyXG4gICAgICB9LFxyXG4gICAgICBub3RpZnlDaGFuZ2U6IGV2dERhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGV2dERhdGEpXHJcbiAgICAgIH0sXHJcbiAgICAgIHNldFN0eWxlOiAocHJvcGVydHksIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMucm9vdFN0eWxlcywgcHJvcGVydHksIHZhbHVlKVxyXG4gICAgICB9LFxyXG4gICAgICBzZXRTdHlsZUZvclRpdGxlRWxlbWVudDogKHByb3BlcnR5LCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGxldCBlbCA9IHRoaXMuJHJlZnMucm9vdC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgTURDVG9vbGJhckZvdW5kYXRpb24uc3RyaW5ncy5USVRMRV9TRUxFQ1RPUlxyXG4gICAgICAgIClcclxuICAgICAgICBpZiAoZWwpIGVsLnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSlcclxuICAgICAgfSxcclxuICAgICAgc2V0U3R5bGVGb3JGbGV4aWJsZVJvd0VsZW1lbnQ6IChwcm9wZXJ0eSwgdmFsdWUpID0+IHtcclxuICAgICAgICBsZXQgZWwgPSB0aGlzLiRyZWZzLnJvb3QucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgIE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLnN0cmluZ3MuRklSU1RfUk9XX1NFTEVDVE9SXHJcbiAgICAgICAgKVxyXG4gICAgICAgIGlmIChlbCkgZWwuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKVxyXG4gICAgICB9LFxyXG4gICAgICBzZXRTdHlsZUZvckZpeGVkQWRqdXN0RWxlbWVudDogKHByb3BlcnR5LCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuJHNldCh0aGlzLmFkanVzdFN0eWxlcywgcHJvcGVydHksIHZhbHVlKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxyXG4gIH0sXHJcbiAgYmVmb3JlRGVzdHJveSgpIHtcclxuICAgIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KClcclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwibWRjLXRvb2xiYXItcm93IG1kYy10b29sYmFyX19yb3dcIj5cclxuICAgIDxzbG90Lz5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLXRvb2xiYXItcm93J1xyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPHNlY3Rpb24gXHJcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCIgXHJcbiAgICBjbGFzcz1cIm1kYy10b29sYmFyLXNlY3Rpb24gbWRjLXRvb2xiYXJfX3NlY3Rpb25cIj5cclxuICAgIDxzbG90Lz5cclxuICA8L3NlY3Rpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy10b29sYmFyLXNlY3Rpb24nLFxyXG4gIHByb3BzOiB7XHJcbiAgICAnYWxpZ24tc3RhcnQnOiBCb29sZWFuLFxyXG4gICAgJ2FsaWduLWVuZCc6IEJvb2xlYW4sXHJcbiAgICAnc2hyaW5rLXRvLWZpdCc6IEJvb2xlYW5cclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiB7XHJcbiAgICAgICAgJ21kYy10b29sYmFyX19zZWN0aW9uLS1hbGlnbi1zdGFydCc6IHRoaXMuYWxpZ25TdGFydCxcclxuICAgICAgICAnbWRjLXRvb2xiYXJfX3NlY3Rpb24tLWFsaWduLWVuZCc6IHRoaXMuYWxpZ25FbmQsXHJcbiAgICAgICAgJ21kYy10b29sYmFyX19zZWN0aW9uLS1zaHJpbmstdG8tZml0JzogdGhpcy5zaHJpbmtUb0ZpdFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGEgXHJcbiAgICA6Y2xhc3M9XCJ7J21hdGVyaWFsLWljb25zJzohIWljb259XCJcclxuICAgIGNsYXNzPVwibWRjLXRvb2xiYXItbWVudS1pY29uIG1kYy10b29sYmFyX19tZW51LWljb25cIlxyXG4gICAgdi1vbj1cImxpc3RlbmVyc1wiPlxyXG4gICAgPHNsb3Q+e3sgaWNvbiB9fTwvc2xvdD5cclxuICA8L2E+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyBEaXNwYXRjaEV2ZW50TWl4aW4gfSBmcm9tICcuLi9iYXNlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtdG9vbGJhci1tZW51LWljb24nLFxyXG4gIG1peGluczogW0Rpc3BhdGNoRXZlbnRNaXhpbl0sXHJcbiAgcHJvcHM6IHtcclxuICAgIGljb246IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnbWVudScgfVxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxhIFxyXG4gICAgY2xhc3M9XCJtZGMtdG9vbGJhci10aXRsZSBtZGMtdG9vbGJhcl9fdGl0bGVcIiBcclxuICAgIHYtb249XCJsaXN0ZW5lcnNcIj5cclxuICAgIDxzbG90Lz5cclxuICA8L2E+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyBEaXNwYXRjaEV2ZW50TWl4aW4gfSBmcm9tICcuLi9iYXNlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtdG9vbGJhci10aXRsZScsXHJcbiAgbWl4aW5zOiBbRGlzcGF0Y2hFdmVudE1peGluXVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGEgXHJcbiAgICA6Y2xhc3M9XCJ7J21hdGVyaWFsLWljb25zJzohIWljb259XCIgXHJcbiAgICBjbGFzcz1cIm1kYy10b29sYmFyLWljb24gbWRjLXRvb2xiYXJfX2ljb25cIlxyXG4gICAgdi1vbj1cImxpc3RlbmVyc1wiPlxyXG4gICAgPHNsb3Q+e3sgaWNvbiB9fTwvc2xvdD5cclxuICA8L2E+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyBEaXNwYXRjaEV2ZW50TWl4aW4gfSBmcm9tICcuLi9iYXNlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtdG9vbGJhci1pY29uJyxcclxuICBtaXhpbnM6IFtEaXNwYXRjaEV2ZW50TWl4aW5dLFxyXG4gIHByb3BzOiB7XHJcbiAgICBpY29uOiBTdHJpbmdcclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsImltcG9ydCB7IEJhc2VQbHVnaW4gfSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgbWRjVG9vbGJhciBmcm9tICcuL21kYy10b29sYmFyLnZ1ZSdcclxuaW1wb3J0IG1kY1Rvb2xiYXJSb3cgZnJvbSAnLi9tZGMtdG9vbGJhci1yb3cudnVlJ1xyXG5pbXBvcnQgbWRjVG9vbGJhclNlY3Rpb24gZnJvbSAnLi9tZGMtdG9vbGJhci1zZWN0aW9uLnZ1ZSdcclxuaW1wb3J0IG1kY1Rvb2xiYXJNZW51SWNvbiBmcm9tICcuL21kYy10b29sYmFyLW1lbnUtaWNvbi52dWUnXHJcbmltcG9ydCBtZGNUb29sYmFyVGl0bGUgZnJvbSAnLi9tZGMtdG9vbGJhci10aXRsZS52dWUnXHJcbmltcG9ydCBtZGNUb29sYmFySWNvbiBmcm9tICcuL21kYy10b29sYmFyLWljb24udnVlJ1xyXG5cclxuZXhwb3J0IHtcclxuICBtZGNUb29sYmFyLFxyXG4gIG1kY1Rvb2xiYXJSb3csXHJcbiAgbWRjVG9vbGJhclNlY3Rpb24sXHJcbiAgbWRjVG9vbGJhck1lbnVJY29uLFxyXG4gIG1kY1Rvb2xiYXJUaXRsZSxcclxuICBtZGNUb29sYmFySWNvblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcclxuICBtZGNUb29sYmFyLFxyXG4gIG1kY1Rvb2xiYXJSb3csXHJcbiAgbWRjVG9vbGJhclNlY3Rpb24sXHJcbiAgbWRjVG9vbGJhck1lbnVJY29uLFxyXG4gIG1kY1Rvb2xiYXJUaXRsZSxcclxuICBtZGNUb29sYmFySWNvblxyXG59KVxyXG4iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXHJcbmltcG9ydCB7IGF1dG9Jbml0IH0gZnJvbSAnLi4vYmFzZSdcclxuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xyXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cclxuXHJcbmF1dG9Jbml0KHBsdWdpbilcclxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJrZXkiLCJjb21wb25lbnQiLCJ2bSIsIm5hbWUiLCJEaXNwYXRjaEV2ZW50TWl4aW4iLCJwcm9wcyIsImV2ZW50IiwiU3RyaW5nIiwiT2JqZWN0IiwiQXJyYXkiLCJtZXRob2RzIiwiZGlzcGF0Y2hFdmVudCIsImV2dCIsIiRlbWl0IiwidHlwZSIsInRhcmdldCIsImV2ZW50VGFyZ2V0IiwiJHJvb3QiLCJhcmdzIiwiZXZlbnRBcmdzIiwiY29tcHV0ZWQiLCJsaXN0ZW5lcnMiLCIkbGlzdGVuZXJzIiwiY2xpY2siLCJlIiwic2NvcGUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJjc3NDbGFzc2VzIiwiRklYRUQiLCJGSVhFRF9MQVNUUk9XIiwiRklYRURfQVRfTEFTVF9ST1ciLCJUT09MQkFSX1JPV19GTEVYSUJMRSIsIkZMRVhJQkxFX0RFRkFVTFRfQkVIQVZJT1IiLCJGTEVYSUJMRV9NQVgiLCJGTEVYSUJMRV9NSU4iLCJzdHJpbmdzIiwiVElUTEVfU0VMRUNUT1IiLCJJQ09OX1NFTEVDVE9SIiwiRklSU1RfUk9XX1NFTEVDVE9SIiwiQ0hBTkdFX0VWRU5UIiwibnVtYmVycyIsIk1BWF9USVRMRV9TSVpFIiwiTUlOX1RJVExFX1NJWkUiLCJUT09MQkFSX1JPV19IRUlHSFQiLCJUT09MQkFSX1JPV19NT0JJTEVfSEVJR0hUIiwiVE9PTEJBUl9NT0JJTEVfQlJFQUtQT0lOVCIsIk1EQ1Rvb2xiYXJGb3VuZGF0aW9uIiwiaGFzQ2xhc3MiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwicmVnaXN0ZXJTY3JvbGxIYW5kbGVyIiwiZGVyZWdpc3RlclNjcm9sbEhhbmRsZXIiLCJyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJkZXJlZ2lzdGVyUmVzaXplSGFuZGxlciIsImdldFZpZXdwb3J0V2lkdGgiLCJnZXRWaWV3cG9ydFNjcm9sbFkiLCJnZXRPZmZzZXRIZWlnaHQiLCJnZXRGaXJzdFJvd0VsZW1lbnRPZmZzZXRIZWlnaHQiLCJub3RpZnlDaGFuZ2UiLCJzZXRTdHlsZSIsInNldFN0eWxlRm9yVGl0bGVFbGVtZW50Iiwic2V0U3R5bGVGb3JGbGV4aWJsZVJvd0VsZW1lbnQiLCJzZXRTdHlsZUZvckZpeGVkQWRqdXN0RWxlbWVudCIsImJhYmVsSGVscGVycy5leHRlbmRzIiwiZGVmYXVsdEFkYXB0ZXIiLCJyZXNpemVIYW5kbGVyXyIsImNoZWNrUm93SGVpZ2h0XyIsInNjcm9sbEhhbmRsZXJfIiwidXBkYXRlVG9vbGJhclN0eWxlc18iLCJjaGVja1Jvd0hlaWdodEZyYW1lXyIsInNjcm9sbEZyYW1lXyIsImV4ZWN1dGVkTGFzdENoYW5nZV8iLCJjYWxjdWxhdGlvbnNfIiwidG9vbGJhclJvd0hlaWdodCIsInRvb2xiYXJSYXRpbyIsImZsZXhpYmxlRXhwYW5zaW9uUmF0aW8iLCJtYXhUcmFuc2xhdGVZUmF0aW8iLCJzY3JvbGxUaHJlc2hvbGRSYXRpbyIsInRvb2xiYXJIZWlnaHQiLCJmbGV4aWJsZUV4cGFuc2lvbkhlaWdodCIsIm1heFRyYW5zbGF0ZVlEaXN0YW5jZSIsInNjcm9sbFRocmVzaG9sZCIsImZpeGVkXyIsImZpeGVkTGFzdHJvd18iLCJoYXNGbGV4aWJsZVJvd18iLCJ1c2VGbGV4RGVmYXVsdEJlaGF2aW9yXyIsImluaXRLZXlSYXRpb18iLCJzZXRLZXlIZWlnaHRzXyIsInNjcm9sbFRvcCIsImRlbHRhIiwibWF4IiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJuZXdUb29sYmFyUm93SGVpZ2h0IiwiZ2V0Um93SGVpZ2h0XyIsInVwZGF0ZUFkanVzdEVsZW1lbnRTdHlsZXMiLCJoYXNTY3JvbGxlZE91dE9mVGhyZXNob2xkIiwic2Nyb2xsZWRPdXRPZlRocmVzaG9sZF8iLCJnZXRGbGV4aWJsZUV4cGFuc2lvblJhdGlvXyIsInVwZGF0ZVRvb2xiYXJGbGV4aWJsZVN0YXRlXyIsInVwZGF0ZVRvb2xiYXJGaXhlZFN0YXRlXyIsInVwZGF0ZUZsZXhpYmxlUm93RWxlbWVudFN0eWxlc18iLCJmaXJzdFJvd01heFJhdGlvIiwiYnJlYWtwb2ludCIsInRyYW5zbGF0ZURpc3RhbmNlIiwibWluIiwiaGVpZ2h0IiwidXBkYXRlRWxlbWVudFN0eWxlc0RlZmF1bHRCZWhhdmlvcl8iLCJtYXhUaXRsZVNpemUiLCJtaW5UaXRsZVNpemUiLCJjdXJyZW50VGl0bGVTaXplIiwibWRjVG9vbGJhciIsIm1kY1Rvb2xiYXJSb3ciLCJtZGNUb29sYmFyU2VjdGlvbiIsIm1kY1Rvb2xiYXJNZW51SWNvbiIsIm1kY1Rvb2xiYXJUaXRsZSIsIm1kY1Rvb2xiYXJJY29uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQU8sU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEI7SUFDL0I7SUFDQSxNQUFJQyxPQUFPLElBQVg7SUFDQSxNQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7SUFDakNELFdBQU9DLE9BQU9DLEdBQWQ7SUFDRCxHQUZELE1BRU8sSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0lBQ3hDO0lBQ0FILFdBQU9HLE9BQU9ELEdBQWQ7SUFDRDtJQUNELE1BQUlGLElBQUosRUFBVTtJQUNSQSxTQUFLSSxHQUFMLENBQVNMLE1BQVQ7SUFDRDtJQUNGOztJQ1pNLFNBQVNNLFVBQVQsQ0FBb0JDLFVBQXBCLEVBQWdDO0lBQ3JDLFNBQU87SUFDTEMsYUFBUyxRQURKO0lBRUxDLGFBQVMscUJBQU07SUFDYixXQUFLLElBQUlDLEdBQVQsSUFBZ0JILFVBQWhCLEVBQTRCO0lBQzFCLFlBQUlJLFlBQVlKLFdBQVdHLEdB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
