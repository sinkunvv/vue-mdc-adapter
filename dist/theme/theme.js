/**
* @module vue-mdc-adaptertheme 0.18.2
* @exports VueMDCTheme
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCTheme = factory());
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

  /* global CustomEvent */

  var scope = Math.floor(Math.random() * Math.floor(0x10000000)).toString() + '-';

  //

  var THEME_COLORS = ['primary', 'secondary', 'background', 'primary-light', 'secondary-light', 'secondary-dark', 'primary-dark'];

  var THEME_STYLES = ['text-primary', 'text-secondary', 'text-hint', 'text-icon', 'text-disabled'];

  var script = {
    name: 'mdc-theme',
    components: {
      CustomElement: CustomElement
    },
    props: {
      tag: { type: String, default: 'div' },
      color: String,
      background: String
    },
    computed: {
      classes: function classes() {
        var classes = {};

        if (this.color && THEME_COLORS.indexOf(this.color) !== -1) {
          classes['mdc-theme--' + this.color] = true;
        }

        if (this.background && THEME_COLORS.indexOf(this.background) !== -1) {
          classes['mdc-theme--' + this.background + '-bg'] = true;

          if (this.color && THEME_STYLES.indexOf(this.color) !== -1) {
            classes['mdc-theme--' + this.color + '-on-' + this.background] = true;
          }
        }
        return classes;
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
    return _c("custom-element", { staticClass: "mdc-theme", class: _vm.classes, attrs: { tag: _vm.tag } }, [_vm._t("default")], 2);
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
    component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\theme\\mdc-theme.vue";

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

  var mdcTheme = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

  var plugin = BasePlugin({
    mdcTheme: mdcTheme
  });

  // import './styles.scss'

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWVsZW1lbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vY29tcG9uZW50cy90aGVtZS9tZGMtdGhlbWUudnVlIiwiLi4vLi4vY29tcG9uZW50cy90aGVtZS9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvdGhlbWUvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0KHBsdWdpbikge1xyXG4gIC8vIEF1dG8taW5zdGFsbFxyXG4gIGxldCBfVnVlID0gbnVsbFxyXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xyXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcclxuICB9XHJcbiAgaWYgKF9WdWUpIHtcclxuICAgIF9WdWUudXNlKHBsdWdpbilcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4oY29tcG9uZW50cykge1xyXG4gIHJldHVybiB7XHJcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxyXG4gICAgaW5zdGFsbDogdm0gPT4ge1xyXG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xyXG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cclxuICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudClcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudHNcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IEN1c3RvbUVsZW1lbnQgPSB7XHJcbiAgZnVuY3Rpb25hbDogdHJ1ZSxcclxuICByZW5kZXIoY3JlYXRlRWxlbWVudCwgY29udGV4dCkge1xyXG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgIGNvbnRleHQucHJvcHMuaXMgfHwgY29udGV4dC5wcm9wcy50YWcgfHwgJ2RpdicsXHJcbiAgICAgIGNvbnRleHQuZGF0YSxcclxuICAgICAgY29udGV4dC5jaGlsZHJlblxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEN1c3RvbUVsZW1lbnRNaXhpbiA9IHtcclxuICBjb21wb25lbnRzOiB7XHJcbiAgICBDdXN0b21FbGVtZW50XHJcbiAgfVxyXG59XHJcbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcclxuICBsZXQgZXZ0XHJcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcclxuICAgICAgZGV0YWlsOiBldnREYXRhLFxyXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcclxuICAgIH0pXHJcbiAgfSBlbHNlIHtcclxuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXHJcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXHJcbiAgfVxyXG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxyXG59XHJcbiIsImNvbnN0IHNjb3BlID1cclxuICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDB4MTAwMDAwMDApKS50b1N0cmluZygpICsgJy0nXHJcblxyXG5leHBvcnQgY29uc3QgVk1BVW5pcXVlSWRNaXhpbiA9IHtcclxuICBiZWZvcmVDcmVhdGUoKSB7XHJcbiAgICB0aGlzLnZtYV91aWRfID0gc2NvcGUgKyB0aGlzLl91aWRcclxuICB9XHJcbn1cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxjdXN0b20tZWxlbWVudCBcclxuICAgIDp0YWc9XCJ0YWdcIiBcclxuICAgIDpjbGFzcz1cImNsYXNzZXNcIlxyXG4gICAgY2xhc3M9XCJtZGMtdGhlbWVcIj5cclxuICAgIDxzbG90IC8+XHJcbiAgPC9jdXN0b20tZWxlbWVudD5cclxuPC90ZW1wbGF0ZT5cclxuXHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyBDdXN0b21FbGVtZW50IH0gZnJvbSAnLi4vYmFzZSdcclxuXHJcbmNvbnN0IFRIRU1FX0NPTE9SUyA9IFtcclxuICAncHJpbWFyeScsXHJcbiAgJ3NlY29uZGFyeScsXHJcbiAgJ2JhY2tncm91bmQnLFxyXG4gICdwcmltYXJ5LWxpZ2h0JyxcclxuICAnc2Vjb25kYXJ5LWxpZ2h0JyxcclxuICAnc2Vjb25kYXJ5LWRhcmsnLFxyXG4gICdwcmltYXJ5LWRhcmsnXHJcbl1cclxuXHJcbmNvbnN0IFRIRU1FX1NUWUxFUyA9IFtcclxuICAndGV4dC1wcmltYXJ5JyxcclxuICAndGV4dC1zZWNvbmRhcnknLFxyXG4gICd0ZXh0LWhpbnQnLFxyXG4gICd0ZXh0LWljb24nLFxyXG4gICd0ZXh0LWRpc2FibGVkJ1xyXG5dXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy10aGVtZScsXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgQ3VzdG9tRWxlbWVudFxyXG4gIH0sXHJcbiAgcHJvcHM6IHtcclxuICAgIHRhZzogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICdkaXYnIH0sXHJcbiAgICBjb2xvcjogU3RyaW5nLFxyXG4gICAgYmFja2dyb3VuZDogU3RyaW5nXHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgY2xhc3NlcygpIHtcclxuICAgICAgbGV0IGNsYXNzZXMgPSB7fVxyXG5cclxuICAgICAgaWYgKHRoaXMuY29sb3IgJiYgVEhFTUVfQ09MT1JTLmluZGV4T2YodGhpcy5jb2xvcikgIT09IC0xKSB7XHJcbiAgICAgICAgY2xhc3Nlc1tgbWRjLXRoZW1lLS0ke3RoaXMuY29sb3J9YF0gPSB0cnVlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLmJhY2tncm91bmQgJiYgVEhFTUVfQ09MT1JTLmluZGV4T2YodGhpcy5iYWNrZ3JvdW5kKSAhPT0gLTEpIHtcclxuICAgICAgICBjbGFzc2VzW2BtZGMtdGhlbWUtLSR7dGhpcy5iYWNrZ3JvdW5kfS1iZ2BdID0gdHJ1ZVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jb2xvciAmJiBUSEVNRV9TVFlMRVMuaW5kZXhPZih0aGlzLmNvbG9yKSAhPT0gLTEpIHtcclxuICAgICAgICAgIGNsYXNzZXNbYG1kYy10aGVtZS0tJHt0aGlzLmNvbG9yfS1vbi0ke3RoaXMuYmFja2dyb3VuZH1gXSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGNsYXNzZXNcclxuICAgIH1cclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsImltcG9ydCB7IEJhc2VQbHVnaW4gfSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgbWRjVGhlbWUgZnJvbSAnLi9tZGMtdGhlbWUudnVlJ1xyXG5cclxuZXhwb3J0IHsgbWRjVGhlbWUgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XHJcbiAgbWRjVGhlbWVcclxufSlcclxuIiwiLy8gaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xyXG5pbXBvcnQgeyBhdXRvSW5pdCB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcclxuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXHJcblxyXG5hdXRvSW5pdChwbHVnaW4pXHJcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwia2V5IiwiY29tcG9uZW50Iiwidm0iLCJuYW1lIiwiQ3VzdG9tRWxlbWVudCIsImZ1bmN0aW9uYWwiLCJyZW5kZXIiLCJjcmVhdGVFbGVtZW50IiwiY29udGV4dCIsInByb3BzIiwiaXMiLCJ0YWciLCJkYXRhIiwiY2hpbGRyZW4iLCJzY29wZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwibWRjVGhlbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBTyxTQUFTQSxRQUFULENBQWtCQyxNQUFsQixFQUEwQjtFQUMvQjtFQUNBLE1BQUlDLE9BQU8sSUFBWDtFQUNBLE1BQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztFQUNqQ0QsV0FBT0MsT0FBT0MsR0FBZDtFQUNELEdBRkQsTUFFTyxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7RUFDeEM7RUFDQUgsV0FBT0csT0FBT0QsR0FBZDtFQUNEO0VBQ0QsTUFBSUYsSUFBSixFQUFVO0VBQ1JBLFNBQUtJLEdBQUwsQ0FBU0wsTUFBVDtFQUNEO0VBQ0Y7O0VDWk0sU0FBU00sVUFBVCxDQUFvQkMsVUFBcEIsRUFBZ0M7RUFDckMsU0FBTztFQUNMQyxhQUFTLFFBREo7RUFFTEMsYUFBUyxxQkFBTTtFQUNiLFdBQUssSUFBSUMsR0FBVCxJQUFnQkgsVUFBaEIsRUFBNEI7RUFDMUIsWUFBSUksWUFBWUosV0FBV0csR0FBWCxDQUFoQjtFQUNBRSxXQUFHRCxTQUFILENBQWFBLFVBQVVFLElBQXZCLEVBQTZCRixTQUE3QjtFQUNEO0VBQ0YsS0FQSTtFQVFMSjtFQVJLLEdBQVA7RUFVRDs7RUNYTSxJQUFNTyxnQkFBZ0I7RUFDM0JDLGNBQVksSUFEZTtFQUUzQkMsUUFGMkIsa0JBRXBCQyxhQUZvQixFQUVMQyxPQUZLLEVBRUk7RUFDN0IsV0FBT0QsY0FDTEMsUUFBUUMsS0FBUixDQUFjQyxFQUFkLElBQW9CRixRQUFRQyxLQUFSLENBQWNFLEdBQWxDLElBQXlDLEtBRHBDLEVBRUxILFFBQVFJLElBRkgsRUFHTEosUUFBUUssUUFISCxDQUFQO0VBS0Q7RUFSMEIsQ0FBdEI7O0VDQVA7O0VDQUEsSUFBTUMsUUFDSkMsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxNQUFMLEtBQWdCRixLQUFLQyxLQUFMLENBQVcsVUFBWCxDQUEzQixFQUFtREUsUUFBbkQsS0FBZ0UsR0FEbEU7Ozs7RUNhQSwrSEFBQTs7RUFVQSxnR0FBQTs7QUFRQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQUFBOzs7RUE1QlksMkJBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRVosZUFBZXRCLFdBQVc7RUFDeEJ1QjtFQUR3QixDQUFYLENBQWY7O0VDTEE7QUFDQTtFQUlBOUIsU0FBU0MsTUFBVDs7Ozs7Ozs7In0=
