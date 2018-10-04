/**
* @module vue-mdc-adaptertypography 0.18.2
* @exports VueMDCTypography
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"@material/tabs":"0.38.0","material-components-web":"0.38.2"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCTypography = factory());
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

    /* global CustomEvent */

    var scope = Math.floor(Math.random() * Math.floor(0x10000000)).toString() + '-';

    var typos = ['headline1', 'headline2', 'headline3', 'headline4', 'headline5', 'headline6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline'];

    var mdcTypoMixin = function mdcTypoMixin(name) {
      return {
        render: function render(createElement) {
          var _class;

          return createElement(this.tag, {
            class: (_class = {
              'mdc-typo': true
            }, defineProperty(_class, name, true), defineProperty(_class, 'mdc-typography--' + this.typo, true), _class),
            attrs: this.$attrs,
            on: this.$listeners
          }, this.$slots.default);
        }
      };
    };

    function mdcTypoPropMixin(defaultTag, defaultTypo, validTypos) {
      return {
        props: {
          tag: {
            type: String,
            default: defaultTag
          },
          typo: {
            type: String,
            default: defaultTypo,
            validator: function validator(value) {
              return validTypos.indexOf(value) !== -1;
            }
          }
        }
      };
    }

    var mdcTextSection = {
      name: 'mdc-text-section',
      props: {
        tag: {
          type: String,
          default: 'section'
        }
      },
      render: function render(createElement) {
        return createElement(this.tag, {
          class: {
            'mdc-typography': true,
            'mdc-text-section': true
          },
          attrs: this.$attrs,
          on: this.$listeners
        }, this.$slots.default);
      }
    };

    var mdcText = {
      name: 'mdc-text',
      mixins: [mdcTypoMixin('mdc-text'), mdcTypoPropMixin('p', 'body1', typos)]
    };

    var mdcDisplay = {
      name: 'mdc-display',
      mixins: [mdcTypoMixin('mdc-display'), mdcTypoPropMixin('h1', 'headline4', ['headline4', 'headline3', 'headline2', 'headline1'])]
    };

    var mdcHeadline = {
      name: 'mdc-headline',
      mixins: [mdcTypoMixin('mdc-headline'), mdcTypoPropMixin('h2', 'headline5', ['headline5'])]
    };

    var mdcTitle = {
      name: 'mdc-title',
      mixins: [mdcTypoMixin('mdc-title'), mdcTypoPropMixin('h3', 'headline6', ['headline6'])]
    };

    var mdcSubHeading = {
      name: 'mdc-subheading',
      mixins: [mdcTypoMixin('mdc-subheading'), mdcTypoPropMixin('h4', 'subtitle2', ['subtitle1', 'subtitle2'])]
    };

    var mdcBody = {
      name: 'mdc-body',
      mixins: [mdcTypoMixin('mdc-body'), mdcTypoPropMixin('p', 'body1', ['body1', 'body2'])]
    };

    var mdcCaption = {
      name: 'mdc-caption',
      mixins: [mdcTypoMixin('mdc-caption'), mdcTypoPropMixin('span', 'caption', ['caption'])]
    };

    var plugin = BasePlugin({
      mdcTextSection: mdcTextSection,
      mdcText: mdcText,
      mdcBody: mdcBody,
      mdcCaption: mdcCaption,
      mdcDisplay: mdcDisplay,
      mdcHeadline: mdcHeadline,
      mdcSubHeading: mdcSubHeading,
      mdcTitle: mdcTitle
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwb2dyYXBoeS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvdW5pcXVlaWQtbWl4aW4uanMiLCIuLi8uLi9jb21wb25lbnRzL3R5cG9ncmFwaHkvbWRjLXR5cG9ncmFwaHkuanMiLCIuLi8uLi9jb21wb25lbnRzL3R5cG9ncmFwaHkvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL3R5cG9ncmFwaHkvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0KHBsdWdpbikge1xyXG4gIC8vIEF1dG8taW5zdGFsbFxyXG4gIGxldCBfVnVlID0gbnVsbFxyXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xyXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcclxuICB9XHJcbiAgaWYgKF9WdWUpIHtcclxuICAgIF9WdWUudXNlKHBsdWdpbilcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4oY29tcG9uZW50cykge1xyXG4gIHJldHVybiB7XHJcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxyXG4gICAgaW5zdGFsbDogdm0gPT4ge1xyXG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xyXG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cclxuICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudClcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudHNcclxuICB9XHJcbn1cclxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50KGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xyXG4gIGxldCBldnRcclxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xyXG4gICAgICBkZXRhaWw6IGV2dERhdGEsXHJcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxyXG4gICAgfSlcclxuICB9IGVsc2Uge1xyXG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcclxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcclxuICB9XHJcbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXHJcbn1cclxuIiwiY29uc3Qgc2NvcGUgPVxyXG4gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoMHgxMDAwMDAwMCkpLnRvU3RyaW5nKCkgKyAnLSdcclxuXHJcbmV4cG9ydCBjb25zdCBWTUFVbmlxdWVJZE1peGluID0ge1xyXG4gIGJlZm9yZUNyZWF0ZSgpIHtcclxuICAgIHRoaXMudm1hX3VpZF8gPSBzY29wZSArIHRoaXMuX3VpZFxyXG4gIH1cclxufVxyXG4iLCJjb25zdCB0eXBvcyA9IFtcclxuICAnaGVhZGxpbmUxJyxcclxuICAnaGVhZGxpbmUyJyxcclxuICAnaGVhZGxpbmUzJyxcclxuICAnaGVhZGxpbmU0JyxcclxuICAnaGVhZGxpbmU1JyxcclxuICAnaGVhZGxpbmU2JyxcclxuICAnc3VidGl0bGUxJyxcclxuICAnc3VidGl0bGUyJyxcclxuICAnYm9keTEnLFxyXG4gICdib2R5MicsXHJcbiAgJ2NhcHRpb24nLFxyXG4gICdidXR0b24nLFxyXG4gICdvdmVybGluZSdcclxuXVxyXG5cclxuZXhwb3J0IGNvbnN0IG1kY1R5cG9NaXhpbiA9IG5hbWUgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICByZW5kZXIoY3JlYXRlRWxlbWVudCkge1xyXG4gICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChcclxuICAgICAgICB0aGlzLnRhZyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjbGFzczoge1xyXG4gICAgICAgICAgICAnbWRjLXR5cG8nOiB0cnVlLFxyXG4gICAgICAgICAgICBbbmFtZV06IHRydWUsXHJcbiAgICAgICAgICAgIFtgbWRjLXR5cG9ncmFwaHktLSR7dGhpcy50eXBvfWBdOiB0cnVlXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYXR0cnM6IHRoaXMuJGF0dHJzLFxyXG4gICAgICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGhpcy4kc2xvdHMuZGVmYXVsdFxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWRjVHlwb1Byb3BNaXhpbihkZWZhdWx0VGFnLCBkZWZhdWx0VHlwbywgdmFsaWRUeXBvcykge1xyXG4gIHJldHVybiB7XHJcbiAgICBwcm9wczoge1xyXG4gICAgICB0YWc6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgZGVmYXVsdDogZGVmYXVsdFRhZ1xyXG4gICAgICB9LFxyXG4gICAgICB0eXBvOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIGRlZmF1bHQ6IGRlZmF1bHRUeXBvLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsdWUgPT4gdmFsaWRUeXBvcy5pbmRleE9mKHZhbHVlKSAhPT0gLTFcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1kY1RleHRTZWN0aW9uID0ge1xyXG4gIG5hbWU6ICdtZGMtdGV4dC1zZWN0aW9uJyxcclxuICBwcm9wczoge1xyXG4gICAgdGFnOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZGVmYXVsdDogJ3NlY3Rpb24nXHJcbiAgICB9XHJcbiAgfSxcclxuICByZW5kZXIoY3JlYXRlRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgIHRoaXMudGFnLFxyXG4gICAgICB7XHJcbiAgICAgICAgY2xhc3M6IHtcclxuICAgICAgICAgICdtZGMtdHlwb2dyYXBoeSc6IHRydWUsXHJcbiAgICAgICAgICAnbWRjLXRleHQtc2VjdGlvbic6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF0dHJzOiB0aGlzLiRhdHRycyxcclxuICAgICAgICBvbjogdGhpcy4kbGlzdGVuZXJzXHJcbiAgICAgIH0sXHJcbiAgICAgIHRoaXMuJHNsb3RzLmRlZmF1bHRcclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBtZGNUZXh0ID0ge1xyXG4gIG5hbWU6ICdtZGMtdGV4dCcsXHJcbiAgbWl4aW5zOiBbbWRjVHlwb01peGluKCdtZGMtdGV4dCcpLCBtZGNUeXBvUHJvcE1peGluKCdwJywgJ2JvZHkxJywgdHlwb3MpXVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbWRjRGlzcGxheSA9IHtcclxuICBuYW1lOiAnbWRjLWRpc3BsYXknLFxyXG4gIG1peGluczogW1xyXG4gICAgbWRjVHlwb01peGluKCdtZGMtZGlzcGxheScpLFxyXG4gICAgbWRjVHlwb1Byb3BNaXhpbignaDEnLCAnaGVhZGxpbmU0JywgW1xyXG4gICAgICAnaGVhZGxpbmU0JyxcclxuICAgICAgJ2hlYWRsaW5lMycsXHJcbiAgICAgICdoZWFkbGluZTInLFxyXG4gICAgICAnaGVhZGxpbmUxJ1xyXG4gICAgXSlcclxuICBdXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBtZGNIZWFkbGluZSA9IHtcclxuICBuYW1lOiAnbWRjLWhlYWRsaW5lJyxcclxuICBtaXhpbnM6IFtcclxuICAgIG1kY1R5cG9NaXhpbignbWRjLWhlYWRsaW5lJyksXHJcbiAgICBtZGNUeXBvUHJvcE1peGluKCdoMicsICdoZWFkbGluZTUnLCBbJ2hlYWRsaW5lNSddKVxyXG4gIF1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1kY1RpdGxlID0ge1xyXG4gIG5hbWU6ICdtZGMtdGl0bGUnLFxyXG4gIG1peGluczogW1xyXG4gICAgbWRjVHlwb01peGluKCdtZGMtdGl0bGUnKSxcclxuICAgIG1kY1R5cG9Qcm9wTWl4aW4oJ2gzJywgJ2hlYWRsaW5lNicsIFsnaGVhZGxpbmU2J10pXHJcbiAgXVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbWRjU3ViSGVhZGluZyA9IHtcclxuICBuYW1lOiAnbWRjLXN1YmhlYWRpbmcnLFxyXG4gIG1peGluczogW1xyXG4gICAgbWRjVHlwb01peGluKCdtZGMtc3ViaGVhZGluZycpLFxyXG4gICAgbWRjVHlwb1Byb3BNaXhpbignaDQnLCAnc3VidGl0bGUyJywgWydzdWJ0aXRsZTEnLCAnc3VidGl0bGUyJ10pXHJcbiAgXVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbWRjQm9keSA9IHtcclxuICBuYW1lOiAnbWRjLWJvZHknLFxyXG4gIG1peGluczogW1xyXG4gICAgbWRjVHlwb01peGluKCdtZGMtYm9keScpLFxyXG4gICAgbWRjVHlwb1Byb3BNaXhpbigncCcsICdib2R5MScsIFsnYm9keTEnLCAnYm9keTInXSlcclxuICBdXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBtZGNDYXB0aW9uID0ge1xyXG4gIG5hbWU6ICdtZGMtY2FwdGlvbicsXHJcbiAgbWl4aW5zOiBbXHJcbiAgICBtZGNUeXBvTWl4aW4oJ21kYy1jYXB0aW9uJyksXHJcbiAgICBtZGNUeXBvUHJvcE1peGluKCdzcGFuJywgJ2NhcHRpb24nLCBbJ2NhcHRpb24nXSlcclxuICBdXHJcbn1cclxuIiwiaW1wb3J0IHsgQmFzZVBsdWdpbiB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCB7XHJcbiAgbWRjVGV4dFNlY3Rpb24sXHJcbiAgbWRjVGV4dCxcclxuICBtZGNCb2R5LFxyXG4gIG1kY0NhcHRpb24sXHJcbiAgbWRjRGlzcGxheSxcclxuICBtZGNIZWFkbGluZSxcclxuICBtZGNTdWJIZWFkaW5nLFxyXG4gIG1kY1RpdGxlXHJcbn0gZnJvbSAnLi9tZGMtdHlwb2dyYXBoeS5qcydcclxuXHJcbmV4cG9ydCB7XHJcbiAgbWRjVGV4dFNlY3Rpb24sXHJcbiAgbWRjVGV4dCxcclxuICBtZGNCb2R5LFxyXG4gIG1kY0NhcHRpb24sXHJcbiAgbWRjRGlzcGxheSxcclxuICBtZGNIZWFkbGluZSxcclxuICBtZGNTdWJIZWFkaW5nLFxyXG4gIG1kY1RpdGxlXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xyXG4gIG1kY1RleHRTZWN0aW9uLFxyXG4gIG1kY1RleHQsXHJcbiAgbWRjQm9keSxcclxuICBtZGNDYXB0aW9uLFxyXG4gIG1kY0Rpc3BsYXksXHJcbiAgbWRjSGVhZGxpbmUsXHJcbiAgbWRjU3ViSGVhZGluZyxcclxuICBtZGNUaXRsZVxyXG59KVxyXG4iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXHJcbmltcG9ydCB7IGF1dG9Jbml0IH0gZnJvbSAnLi4vYmFzZSdcclxuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xyXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cclxuXHJcbmF1dG9Jbml0KHBsdWdpbilcclxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJrZXkiLCJjb21wb25lbnQiLCJ2bSIsIm5hbWUiLCJzY29wZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwidHlwb3MiLCJtZGNUeXBvTWl4aW4iLCJyZW5kZXIiLCJjcmVhdGVFbGVtZW50IiwidGFnIiwiY2xhc3MiLCJ0eXBvIiwiYXR0cnMiLCIkYXR0cnMiLCJvbiIsIiRsaXN0ZW5lcnMiLCIkc2xvdHMiLCJkZWZhdWx0IiwibWRjVHlwb1Byb3BNaXhpbiIsImRlZmF1bHRUYWciLCJkZWZhdWx0VHlwbyIsInZhbGlkVHlwb3MiLCJwcm9wcyIsInR5cGUiLCJTdHJpbmciLCJ2YWxpZGF0b3IiLCJpbmRleE9mIiwidmFsdWUiLCJtZGNUZXh0U2VjdGlvbiIsIm1kY1RleHQiLCJtaXhpbnMiLCJtZGNEaXNwbGF5IiwibWRjSGVhZGxpbmUiLCJtZGNUaXRsZSIsIm1kY1N1YkhlYWRpbmciLCJtZGNCb2R5IiwibWRjQ2FwdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUFPLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCO0lBQy9CO0lBQ0EsTUFBSUMsT0FBTyxJQUFYO0lBQ0EsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0lBQ2pDRCxXQUFPQyxPQUFPQyxHQUFkO0lBQ0QsR0FGRCxNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztJQUN4QztJQUNBSCxXQUFPRyxPQUFPRCxHQUFkO0lBQ0Q7SUFDRCxNQUFJRixJQUFKLEVBQVU7SUFDUkEsU0FBS0ksR0FBTCxDQUFTTCxNQUFUO0lBQ0Q7SUFDRjs7SUNaTSxTQUFTTSxVQUFULENBQW9CQyxVQUFwQixFQUFnQztJQUNyQyxTQUFPO0lBQ0xDLGFBQVMsUUFESjtJQUVMQyxhQUFTLHFCQUFNO0lBQ2IsV0FBSyxJQUFJQyxHQUFULElBQWdCSCxVQUFoQixFQUE0QjtJQUMxQixZQUFJSSxZQUFZSixXQUFXRyxHQUFYLENBQWhCO0lBQ0FFLFdBQUdELFNBQUgsQ0FBYUEsVUFBVUUsSUFBdkIsRUFBNkJGLFNBQTdCO0lBQ0Q7SUFDRixLQVBJO0lBUUxKO0lBUkssR0FBUDtJQVVEOzs7Ozs7Ozs7Ozs7Ozs7OztJQ1hEOztJQ0FBLElBQU1PLFFB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
