/**
* @module vue-mdc-adaptertoolbar 0.18.2
* @exports default
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

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

var index = BasePlugin({
  mdcToolbar: mdcToolbar,
  mdcToolbarRow: mdcToolbarRow,
  mdcToolbarSection: mdcToolbarSection,
  mdcToolbarMenuIcon: mdcToolbarMenuIcon,
  mdcToolbarTitle: mdcToolbarTitle,
  mdcToolbarIcon: mdcToolbarIcon
});

export default index;
export { mdcToolbar, mdcToolbarRow, mdcToolbarSection, mdcToolbarMenuIcon, mdcToolbarTitle, mdcToolbarIcon };
//# sourceMappingURL=index.js.map
