/**
* @module vue-mdc-adapterswitch 0.18.2
* @exports default
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

import { RippleBase } from '../ripple';

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
 * Adapter for MDC Switch. Provides an interface for managing
 * - classes
 * - dom
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
var MDCSwitchAdapter = function () {
  function MDCSwitchAdapter() {
    classCallCheck(this, MDCSwitchAdapter);
  }

  createClass(MDCSwitchAdapter, [{
    key: "addClass",

    /** @param {string} className */
    value: function addClass(className) {}

    /** @param {string} className */

  }, {
    key: "removeClass",
    value: function removeClass(className) {}

    /** @param {boolean} checked */

  }, {
    key: "setNativeControlChecked",
    value: function setNativeControlChecked(checked) {}

    /** @return {boolean} checked */

  }, {
    key: "isNativeControlChecked",
    value: function isNativeControlChecked() {}

    /** @param {boolean} disabled */

  }, {
    key: "setNativeControlDisabled",
    value: function setNativeControlDisabled(disabled) {}

    /** @return {boolean} disabled */

  }, {
    key: "isNativeControlDisabled",
    value: function isNativeControlDisabled() {}
  }]);
  return MDCSwitchAdapter;
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
var cssClasses = {
  CHECKED: 'mdc-switch--checked',
  DISABLED: 'mdc-switch--disabled'
};

/** @enum {string} */
var strings = {
  NATIVE_CONTROL_SELECTOR: '.mdc-switch__native-control',
  RIPPLE_SURFACE_SELECTOR: '.mdc-switch__thumb-underlay'
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
 * @extends {MDCFoundation<!MDCSwitchAdapter>}
 */

var MDCSwitchFoundation = function (_MDCFoundation) {
  inherits(MDCSwitchFoundation, _MDCFoundation);
  createClass(MDCSwitchFoundation, null, [{
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

    /** @return {!MDCSwitchAdapter} */

  }, {
    key: 'defaultAdapter',
    get: function get$$1() {
      return (/** @type {!MDCSwitchAdapter} */{
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          setNativeControlChecked: function setNativeControlChecked() /* checked: boolean */{},
          isNativeControlChecked: function isNativeControlChecked() /* boolean */{},
          setNativeControlDisabled: function setNativeControlDisabled() /* disabled: boolean */{},
          isNativeControlDisabled: function isNativeControlDisabled() /* boolean */{}
        }
      );
    }
  }]);

  function MDCSwitchFoundation(adapter) {
    classCallCheck(this, MDCSwitchFoundation);
    return possibleConstructorReturn(this, (MDCSwitchFoundation.__proto__ || Object.getPrototypeOf(MDCSwitchFoundation)).call(this, _extends(MDCSwitchFoundation.defaultAdapter, adapter)));
  }

  /** @override */


  createClass(MDCSwitchFoundation, [{
    key: 'init',
    value: function init() {
      // Do an initial state update based on the state of the native control.
      this.handleChange();
    }

    /** @return {boolean} */

  }, {
    key: 'isChecked',
    value: function isChecked() {
      return this.adapter_.isNativeControlChecked();
    }

    /** @param {boolean} checked */

  }, {
    key: 'setChecked',
    value: function setChecked(checked) {
      this.adapter_.setNativeControlChecked(checked);
      this.updateCheckedStyling_(checked);
    }

    /** @return {boolean} */

  }, {
    key: 'isDisabled',
    value: function isDisabled() {
      return this.adapter_.isNativeControlDisabled();
    }

    /** @param {boolean} disabled */

  }, {
    key: 'setDisabled',
    value: function setDisabled(disabled) {
      this.adapter_.setNativeControlDisabled(disabled);
      if (disabled) {
        this.adapter_.addClass(cssClasses.DISABLED);
      } else {
        this.adapter_.removeClass(cssClasses.DISABLED);
      }
    }

    /**
     * Handles the change event for the switch native control.
     */

  }, {
    key: 'handleChange',
    value: function handleChange() {
      this.updateCheckedStyling_(this.isChecked());
    }

    /**
     * Updates the styling of the switch based on its checked state.
     * @param {boolean} checked
     * @private
     */

  }, {
    key: 'updateCheckedStyling_',
    value: function updateCheckedStyling_(checked) {
      if (checked) {
        this.adapter_.addClass(cssClasses.CHECKED);
      } else {
        this.adapter_.removeClass(cssClasses.CHECKED);
      }
    }
  }]);
  return MDCSwitchFoundation;
}(MDCFoundation);

//

var script = {
  name: 'mdc-switch',
  mixins: [DispatchFocusMixin, VMAUniqueIdMixin],
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean,
    disabled: Boolean,
    value: String,
    label: String,
    alignEnd: Boolean,
    name: String
  },
  data: function data() {
    return {
      classes: {},
      styles: {}
    };
  },

  computed: {
    hasLabel: function hasLabel() {
      return this.label || this.$slots.default;
    }
  },
  watch: {
    checked: function checked(value) {
      this.foundation && this.foundation.setChecked(value);
    },
    disabled: function disabled(value) {
      this.foundation && this.foundation.setDisabled(value);
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.foundation = new MDCSwitchFoundation({
      addClass: function addClass(className) {
        return _this.$set(_this.classes, className, true);
      },
      removeClass: function removeClass(className) {
        return _this.$delete(_this.classes, className);
      },
      setNativeControlChecked: function setNativeControlChecked(checked) {
        return _this.$refs.control.checked = checked;
      },
      isNativeControlChecked: function isNativeControlChecked() {
        return _this.$refs.control.checked;
      },
      setNativeControlDisabled: function setNativeControlDisabled(disabled) {
        return _this.$refs.control.disabled = disabled;
      },
      isNativeControlDisabled: function isNativeControlDisabled() {
        return _this.nativeControl_.disabled;
      }
    });
    this.foundation.init();
    this.foundation.setChecked(this.checked);
    this.foundation.setDisabled(this.disabled);

    this.ripple = new RippleBase(this);
    this.ripple.init();
  },
  beforeDestroy: function beforeDestroy() {
    this.foundation && this.foundation.destroy();
    this.ripple && this.ripple.destroy();
  },

  methods: {
    onChanged: function onChanged(event) {
      this.foundation && this.foundation.handleChange();
      this.$emit('change', event.target.checked);
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
    staticClass: "mdc-switch-wrapper",
    class: {
      "mdc-form-field": _vm.hasLabel,
      "mdc-form-field--align-end": _vm.hasLabel && _vm.alignEnd
    }
  }, [_c("div", {
    staticClass: "mdc-switch",
    class: _vm.classes,
    attrs: { styles: _vm.styles }
  }, [_c("div", { staticClass: "mdc-switch__track" }), _vm._v(" "), _c("div", { staticClass: "mdc-switch__thumb-underlay" }, [_c("div", { staticClass: "mdc-switch__thumb" }, [_c("input", {
    ref: "control",
    staticClass: "mdc-switch__native-control",
    attrs: {
      name: _vm.name,
      id: _vm.vma_uid_,
      type: "checkbox",
      role: "switch"
    },
    domProps: { value: _vm.value },
    on: { change: _vm.onChanged }
  })])])]), _vm._v(" "), _vm.hasLabel ? _c("label", { staticClass: "mdc-switch-label", attrs: { for: _vm.vma_uid_ } }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2) : _vm._e()]);
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
  component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\switch\\mdc-switch.vue";

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

var mdcSwitch = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

var index = BasePlugin({
  mdcSwitch: mdcSwitch
});

export default index;
export { mdcSwitch };
//# sourceMappingURL=index.js.map
