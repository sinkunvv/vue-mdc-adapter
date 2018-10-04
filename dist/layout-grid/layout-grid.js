/**
* @module vue-mdc-adapterlayout-grid 0.18.2
* @exports VueMDCLayoutGrid
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCLayoutGrid = factory());
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

  /* global CustomEvent */

  var scope = Math.floor(Math.random() * Math.floor(0x10000000)).toString() + '-';

  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    name: 'mdc-layout-grid',
    props: {
      'fixed-column-width': Boolean,
      'align-left': Boolean,
      'align-right': Boolean
    },
    computed: {
      classes: function classes() {
        return {
          'mdc-layout-grid': true,
          'mdc-layout-grid--fixed-column-width': this.fixedColumnWidth,
          'mdc-layout-grid--align-left': this.alignLeft,
          'mdc-layout-grid--align-right': this.alignRight
        };
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
    return _c("div", { class: _vm.classes }, [_c("div", { staticClass: "mdc-layout-grid__inner" }, [_vm._t("default")], 2)]);
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
    component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\layout-grid\\mdc-layout-grid.vue";

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

  var mdcLayoutGrid = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

  //
  //
  //
  //
  //
  //
  //
  //

  var spanOptions = {
    type: [String, Number],
    default: null,
    validator: function validator(value) {
      var num = Number(value);
      return isFinite(num) && num <= 12 && num > 0;
    }
  };

  var script$1 = {
    name: 'mdc-layout-cell',
    props: {
      span: spanOptions,
      order: spanOptions,
      phone: spanOptions,
      tablet: spanOptions,
      desktop: spanOptions,
      align: {
        type: String,
        validator: function validator(value) {
          return ['top', 'bottom', 'middle'].indexOf(value) !== -1;
        }
      }
    },
    computed: {
      classes: function classes() {
        var classes = [];

        if (this.span) {
          classes.push('mdc-layout-grid__cell--span-' + this.span);
        }

        if (this.order) {
          classes.push('mdc-layout-grid__cell--order-' + this.order);
        }

        if (this.phone) {
          classes.push('mdc-layout-grid__cell--span-' + this.phone + '-phone');
        }

        if (this.tablet) {
          classes.push('mdc-layout-grid__cell--span-' + this.tablet + '-tablet');
        }

        if (this.desktop) {
          classes.push('mdc-layout-grid__cell--span-' + this.desktop + '-desktop');
        }

        if (this.align) {
          classes.push('mdc-layout-grid__cell--align-' + this.align);
        }

        return classes;
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
      staticClass: "mdc-layout-cell mdc-layout-grid__cell",
      class: _vm.classes
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
    component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\layout-grid\\mdc-layout-cell.vue";

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

  var mdcLayoutCell = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

  //
  //
  //
  //
  //
  //

  var script$2 = {
    name: 'mdc-layout-inner-grid'
  };

  /* script */
  var __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function __vue_render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "mdc-layout-inner-grid mdc-layout-grid__inner" }, [_vm._t("default")], 2);
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
    component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\layout-grid\\mdc-layout-inner-grid.vue";

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

  var mdcLayoutInnerGrid = __vue_normalize__$2({ render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, __vue_create_injector__$2, undefined);

  var plugin = BasePlugin({
    mdcLayoutGrid: mdcLayoutGrid,
    mdcLayoutCell: mdcLayoutCell,
    mdcLayoutInnerGrid: mdcLayoutInnerGrid
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWdyaWQuanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vY29tcG9uZW50cy9sYXlvdXQtZ3JpZC9tZGMtbGF5b3V0LWdyaWQudnVlIiwiLi4vLi4vY29tcG9uZW50cy9sYXlvdXQtZ3JpZC9tZGMtbGF5b3V0LWNlbGwudnVlIiwiLi4vLi4vY29tcG9uZW50cy9sYXlvdXQtZ3JpZC9tZGMtbGF5b3V0LWlubmVyLWdyaWQudnVlIiwiLi4vLi4vY29tcG9uZW50cy9sYXlvdXQtZ3JpZC9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvbGF5b3V0LWdyaWQvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0KHBsdWdpbikge1xyXG4gIC8vIEF1dG8taW5zdGFsbFxyXG4gIGxldCBfVnVlID0gbnVsbFxyXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xyXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcclxuICB9XHJcbiAgaWYgKF9WdWUpIHtcclxuICAgIF9WdWUudXNlKHBsdWdpbilcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4oY29tcG9uZW50cykge1xyXG4gIHJldHVybiB7XHJcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxyXG4gICAgaW5zdGFsbDogdm0gPT4ge1xyXG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xyXG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cclxuICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudClcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudHNcclxuICB9XHJcbn1cclxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50KGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xyXG4gIGxldCBldnRcclxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xyXG4gICAgICBkZXRhaWw6IGV2dERhdGEsXHJcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxyXG4gICAgfSlcclxuICB9IGVsc2Uge1xyXG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcclxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcclxuICB9XHJcbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXHJcbn1cclxuIiwiY29uc3Qgc2NvcGUgPVxyXG4gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoMHgxMDAwMDAwMCkpLnRvU3RyaW5nKCkgKyAnLSdcclxuXHJcbmV4cG9ydCBjb25zdCBWTUFVbmlxdWVJZE1peGluID0ge1xyXG4gIGJlZm9yZUNyZWF0ZSgpIHtcclxuICAgIHRoaXMudm1hX3VpZF8gPSBzY29wZSArIHRoaXMuX3VpZFxyXG4gIH1cclxufVxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiA6Y2xhc3M9XCJjbGFzc2VzXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibWRjLWxheW91dC1ncmlkX19pbm5lclwiPlxyXG4gICAgICA8c2xvdC8+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLWxheW91dC1ncmlkJyxcclxuICBwcm9wczoge1xyXG4gICAgJ2ZpeGVkLWNvbHVtbi13aWR0aCc6IEJvb2xlYW4sXHJcbiAgICAnYWxpZ24tbGVmdCc6IEJvb2xlYW4sXHJcbiAgICAnYWxpZ24tcmlnaHQnOiBCb29sZWFuXHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgY2xhc3NlcygpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAnbWRjLWxheW91dC1ncmlkJzogdHJ1ZSxcclxuICAgICAgICAnbWRjLWxheW91dC1ncmlkLS1maXhlZC1jb2x1bW4td2lkdGgnOiB0aGlzLmZpeGVkQ29sdW1uV2lkdGgsXHJcbiAgICAgICAgJ21kYy1sYXlvdXQtZ3JpZC0tYWxpZ24tbGVmdCc6IHRoaXMuYWxpZ25MZWZ0LFxyXG4gICAgICAgICdtZGMtbGF5b3V0LWdyaWQtLWFsaWduLXJpZ2h0JzogdGhpcy5hbGlnblJpZ2h0XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IFxyXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiIFxyXG4gICAgY2xhc3M9XCJtZGMtbGF5b3V0LWNlbGwgbWRjLWxheW91dC1ncmlkX19jZWxsXCI+XHJcbiAgICA8c2xvdC8+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5jb25zdCBzcGFuT3B0aW9ucyA9IHtcclxuICB0eXBlOiBbU3RyaW5nLCBOdW1iZXJdLFxyXG4gIGRlZmF1bHQ6IG51bGwsXHJcbiAgdmFsaWRhdG9yOiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgdmFyIG51bSA9IE51bWJlcih2YWx1ZSlcclxuICAgIHJldHVybiBpc0Zpbml0ZShudW0pICYmIG51bSA8PSAxMiAmJiBudW0gPiAwXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1sYXlvdXQtY2VsbCcsXHJcbiAgcHJvcHM6IHtcclxuICAgIHNwYW46IHNwYW5PcHRpb25zLFxyXG4gICAgb3JkZXI6IHNwYW5PcHRpb25zLFxyXG4gICAgcGhvbmU6IHNwYW5PcHRpb25zLFxyXG4gICAgdGFibGV0OiBzcGFuT3B0aW9ucyxcclxuICAgIGRlc2t0b3A6IHNwYW5PcHRpb25zLFxyXG4gICAgYWxpZ246IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIFsndG9wJywgJ2JvdHRvbScsICdtaWRkbGUnXS5pbmRleE9mKHZhbHVlKSAhPT0gLTFcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIGNsYXNzZXMoKSB7XHJcbiAgICAgIGxldCBjbGFzc2VzID0gW11cclxuXHJcbiAgICAgIGlmICh0aGlzLnNwYW4pIHtcclxuICAgICAgICBjbGFzc2VzLnB1c2goYG1kYy1sYXlvdXQtZ3JpZF9fY2VsbC0tc3Bhbi0ke3RoaXMuc3Bhbn1gKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5vcmRlcikge1xyXG4gICAgICAgIGNsYXNzZXMucHVzaChgbWRjLWxheW91dC1ncmlkX19jZWxsLS1vcmRlci0ke3RoaXMub3JkZXJ9YClcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMucGhvbmUpIHtcclxuICAgICAgICBjbGFzc2VzLnB1c2goYG1kYy1sYXlvdXQtZ3JpZF9fY2VsbC0tc3Bhbi0ke3RoaXMucGhvbmV9LXBob25lYClcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMudGFibGV0KSB7XHJcbiAgICAgICAgY2xhc3Nlcy5wdXNoKGBtZGMtbGF5b3V0LWdyaWRfX2NlbGwtLXNwYW4tJHt0aGlzLnRhYmxldH0tdGFibGV0YClcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuZGVza3RvcCkge1xyXG4gICAgICAgIGNsYXNzZXMucHVzaChgbWRjLWxheW91dC1ncmlkX19jZWxsLS1zcGFuLSR7dGhpcy5kZXNrdG9wfS1kZXNrdG9wYClcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuYWxpZ24pIHtcclxuICAgICAgICBjbGFzc2VzLnB1c2goYG1kYy1sYXlvdXQtZ3JpZF9fY2VsbC0tYWxpZ24tJHt0aGlzLmFsaWdufWApXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBjbGFzc2VzXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cIm1kYy1sYXlvdXQtaW5uZXItZ3JpZCBtZGMtbGF5b3V0LWdyaWRfX2lubmVyXCI+XHJcbiAgICA8c2xvdC8+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1sYXlvdXQtaW5uZXItZ3JpZCdcclxufVxyXG48L3NjcmlwdD5cclxuIiwiaW1wb3J0IHsgQmFzZVBsdWdpbiB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCBtZGNMYXlvdXRHcmlkIGZyb20gJy4vbWRjLWxheW91dC1ncmlkLnZ1ZSdcclxuaW1wb3J0IG1kY0xheW91dENlbGwgZnJvbSAnLi9tZGMtbGF5b3V0LWNlbGwudnVlJ1xyXG5pbXBvcnQgbWRjTGF5b3V0SW5uZXJHcmlkIGZyb20gJy4vbWRjLWxheW91dC1pbm5lci1ncmlkLnZ1ZSdcclxuXHJcbmV4cG9ydCB7IG1kY0xheW91dEdyaWQsIG1kY0xheW91dENlbGwsIG1kY0xheW91dElubmVyR3JpZCB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcclxuICBtZGNMYXlvdXRHcmlkLFxyXG4gIG1kY0xheW91dENlbGwsXHJcbiAgbWRjTGF5b3V0SW5uZXJHcmlkXHJcbn0pXHJcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcclxuaW1wb3J0IHsgYXV0b0luaXQgfSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXHJcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxyXG5cclxuYXV0b0luaXQocGx1Z2luKVxyXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2ZXJzaW9uIiwiaW5zdGFsbCIsImtleSIsImNvbXBvbmVudCIsInZtIiwibmFtZSIsInNjb3BlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJtZGNMYXlvdXRHcmlkIiwibWRjTGF5b3V0Q2VsbCIsIm1kY0xheW91dElubmVyR3JpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztFQUFPLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCO0VBQy9CO0VBQ0EsTUFBSUMsT0FBTyxJQUFYO0VBQ0EsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0VBQ2pDRCxXQUFPQyxPQUFPQyxHQUFkO0VBQ0QsR0FGRCxNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztFQUN4QztFQUNBSCxXQUFPRyxPQUFPRCxHQUFkO0VBQ0Q7RUFDRCxNQUFJRixJQUFKLEVBQVU7RUFDUkEsU0FBS0ksR0FBTCxDQUFTTCxNQUFUO0VBQ0Q7RUFDRjs7RUNaTSxTQUFTTSxVQUFULENBQW9CQyxVQUFwQixFQUFnQztFQUNyQyxTQUFPO0VBQ0xDLGFBQVMsUUFESjtFQUVMQyxhQUFTLHFCQUFNO0VBQ2IsV0FBSyxJQUFJQyxHQUFULElBQWdCSCxVQUFoQixFQUE0QjtFQUMxQixZQUFJSSxZQUFZSixXQUFXRyxHQUFYLENBQWhCO0VBQ0FFLFdBQUdELFNBQUgsQ0FBYUEsVUFBVUUsSUFBdkIsRUFBNkJGLFNBQTdCO0VBQ0Q7RUFDRixLQVBJO0VBUUxKO0VBUkssR0FBUDtFQVVEOztFQ1hEOztFQ0FBLElBQU1PLFFBQ0pDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQkYsS0FBS0MsS0FBTCxDQUFXLFVBQVgsQ0FBM0IsRUFBbURFLFFBQW5ELEtBQWdFLEdBRGxFOzs7Ozs7Ozs7OztBQ1NBOzs7Ozs7Ozs7Ozs7Ozs7OztHQUFBOzs7RUFOWSwyQkFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUNNWjs7Ozs7OztHQUFBOztBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBQUE7OztFQWZZLCtCQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNJWjs7R0FBQTs7O0VBSlksK0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSVosZUFBZVosV0FBVztFQUN4QmEsOEJBRHdCO0VBRXhCQyw4QkFGd0I7RUFHeEJDO0VBSHdCLENBQVgsQ0FBZjs7RUNGQXRCLFNBQVNDLE1BQVQ7Ozs7Ozs7OyJ9
