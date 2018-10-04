/**
* @module vue-mdc-adapterlayout-app 0.18.2
* @exports VueMDCLayoutApp
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCLayoutApp = factory());
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
    //
    //

    var script = {
      name: 'mdc-layout-app'
    };

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function __vue_render__() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "mdc-layout-app" }, [_c("div", { staticClass: "mdc-layout-app--toolbar-wrapper" }, [_vm._t("toolbar")], 2), _vm._v(" "), _c("div", { staticClass: "mdc-layout-app--main-container" }, [_c("div", { staticClass: "mdc-layout-app--drawer-wrapper" }, [_vm._t("drawer")], 2), _vm._v(" "), _c("div", { staticClass: "mdc-layout-app--content-wrapper" }, [_vm._t("default")], 2)])]);
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
      component.__file = "D:\\workspace\\vue-mdc-adapter\\components\\layout-app\\mdc-layout-app.vue";

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

    var mdcLayoutApp = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

    var plugin = BasePlugin({
      mdcLayoutApp: mdcLayoutApp
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWFwcC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvdW5pcXVlaWQtbWl4aW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2xheW91dC1hcHAvbWRjLWxheW91dC1hcHAudnVlIiwiLi4vLi4vY29tcG9uZW50cy9sYXlvdXQtYXBwL2luZGV4LmpzIiwiLi4vLi4vY29tcG9uZW50cy9sYXlvdXQtYXBwL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdChwbHVnaW4pIHtcclxuICAvLyBBdXRvLWluc3RhbGxcclxuICBsZXQgX1Z1ZSA9IG51bGxcclxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIF9WdWUgPSB3aW5kb3cuVnVlXHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cclxuICAgIF9WdWUgPSBnbG9iYWwuVnVlXHJcbiAgfVxyXG4gIGlmIChfVnVlKSB7XHJcbiAgICBfVnVlLnVzZShwbHVnaW4pXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luKGNvbXBvbmVudHMpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcclxuICAgIGluc3RhbGw6IHZtID0+IHtcclxuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXHJcbiAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRzXHJcbiAgfVxyXG59XHJcbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcclxuICBsZXQgZXZ0XHJcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcclxuICAgICAgZGV0YWlsOiBldnREYXRhLFxyXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcclxuICAgIH0pXHJcbiAgfSBlbHNlIHtcclxuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXHJcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXHJcbiAgfVxyXG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxyXG59XHJcbiIsImNvbnN0IHNjb3BlID1cclxuICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDB4MTAwMDAwMDApKS50b1N0cmluZygpICsgJy0nXHJcblxyXG5leHBvcnQgY29uc3QgVk1BVW5pcXVlSWRNaXhpbiA9IHtcclxuICBiZWZvcmVDcmVhdGUoKSB7XHJcbiAgICB0aGlzLnZtYV91aWRfID0gc2NvcGUgKyB0aGlzLl91aWRcclxuICB9XHJcbn1cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJtZGMtbGF5b3V0LWFwcFwiPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJtZGMtbGF5b3V0LWFwcC0tdG9vbGJhci13cmFwcGVyXCI+XHJcbiAgICAgIDxzbG90IG5hbWU9XCJ0b29sYmFyXCIgLz5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJtZGMtbGF5b3V0LWFwcC0tbWFpbi1jb250YWluZXJcIj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJtZGMtbGF5b3V0LWFwcC0tZHJhd2VyLXdyYXBwZXJcIj5cclxuICAgICAgICA8c2xvdCBuYW1lPVwiZHJhd2VyXCIgLz5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwibWRjLWxheW91dC1hcHAtLWNvbnRlbnQtd3JhcHBlclwiPlxyXG4gICAgICAgIDxzbG90IC8+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtbGF5b3V0LWFwcCdcclxufVxyXG48L3NjcmlwdD5cclxuIiwiaW1wb3J0IHsgQmFzZVBsdWdpbiB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCBtZGNMYXlvdXRBcHAgZnJvbSAnLi9tZGMtbGF5b3V0LWFwcC52dWUnXHJcblxyXG5leHBvcnQgeyBtZGNMYXlvdXRBcHAgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XHJcbiAgbWRjTGF5b3V0QXBwXHJcbn0pXHJcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcclxuaW1wb3J0IHsgYXV0b0luaXQgfSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXHJcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxyXG5cclxuYXV0b0luaXQocGx1Z2luKVxyXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2ZXJzaW9uIiwiaW5zdGFsbCIsImtleSIsImNvbXBvbmVudCIsInZtIiwibmFtZSIsInNjb3BlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJtZGNMYXlvdXRBcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBTyxTQUFTQSxRQUFULENBQWtCQyxNQUFsQixFQUEwQjtJQUMvQjtJQUNBLE1BQUlDLE9BQU8sSUFBWDtJQUNBLE1BQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztJQUNqQ0QsV0FBT0MsT0FBT0MsR0FBZDtJQUNELEdBRkQsTUFFTyxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7SUFDeEM7SUFDQUgsV0FBT0csT0FBT0QsR0FBZDtJQUNEO0lBQ0QsTUFBSUYsSUFBSixFQUFVO0lBQ1JBLFNBQUtJLEdBQUwsQ0FBU0wsTUFBVDtJQUNEO0lBQ0Y7O0lDWk0sU0FBU00sVUFBVCxDQUFvQkMsVUFBcEIsRUFBZ0M7SUFDckMsU0FBTztJQUNMQyxhQUFTLFFBREo7SUFFTEMsYUFBUyxxQkFBTTtJQUNiLFdBQUssSUFBSUMsR0FBVCxJQUFnQkgsVUFBaEIsRUFBNEI7SUFDMUIsWUFBSUksWUFBWUosV0FBV0csR0FBWCxDQUFoQjtJQUNBRSxXQUFHRCxTQUFILENBQWFBLFVBQVVFLElBQXZCLEVBQTZCRixTQUE3QjtJQUNEO0lBQ0YsS0FQSTtJQVFMSjtJQVJLLEdBQVA7SUFVRDs7SUNYRDs7SUNBQSxJQUFNTyxRQUNKQyxLQUFLQyxLQUFMLENBQVdELEtBQUtFLE1BQUwsS0FBZ0JGLEtBQUtDLEtBQUwsQ0FBVyxVQUFYLENBQTNCLEVBQW1ERSxRQUFuRCxLQUFnRSxHQURsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDc0JBOztLQUFBOzs7SUFuQlksMkJBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRVosaUJBQWVaLFdBQVc7SUFDeEJhO0lBRHdCLENBQVgsQ0FBZjs7SUNBQXBCLFNBQVNDLE1BQVQ7Ozs7Ozs7OyJ9
