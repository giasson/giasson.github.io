!function(e){"function"==typeof require&&"object"==typeof exports&&"object"==typeof module?e(require("knockout"),exports):"function"==typeof define&&define.amd?define(["knockout","exports"],e):e(ko,ko.validation={})}(function(e,exports){function t(e,t,n){return t.validator(e(),void 0===n.params?!0:n.params)?!0:(e.error=exports.formatMessage(n.message||t.message,n.params),e.__valid__(!1),!1)}function n(e,t,n){e.isValidating(!0);var i=function(i){var r=!1,a="";return e.__valid__()?(i.message?(r=i.isValid,a=i.message):r=i,r||(e.error=exports.formatMessage(a||n.message||t.message,n.params),e.__valid__(r)),void e.isValidating(!1)):void e.isValidating(!1)};t.validator(e(),n.params||!0,i)}if(void 0===typeof e)throw"Knockout is required, please ensure it is loaded before loading this validation plug-in";"function"==typeof define&&define.amd&&(exports=e.validation={});var i={registerExtenders:!0,messagesOnModified:!0,errorsAsTitleOnModified:!1,messageTemplate:null,insertMessages:!0,parseInputAttributes:!1,writeInputAttributes:!1,decorateElement:!1,errorClass:null,errorElementClass:"validationElement",errorMessageClass:"validationMessage",grouping:{deep:!1,observable:!0}},r=e.utils.extend({},i),a=["required","pattern","min","max","step"],o=function(e){window.setImmediate?window.setImmediate(e):window.setTimeout(e,0)},s=function(){var e=(new Date).getTime(),t={},n="__ko_validation__";return{isArray:function(e){return e.isArray||"[object Array]"===Object.prototype.toString.call(e)},isObject:function(e){return null!==e&&"object"==typeof e},values:function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(e[n]);return t},getValue:function(e){return"function"==typeof e?e():e},hasAttribute:function(e,t){return null!==e.getAttribute(t)},isValidatable:function(e){return e&&e.rules&&e.isValid&&e.isModified},insertAfter:function(e,t){e.parentNode.insertBefore(t,e.nextSibling)},newId:function(){return e+=1},getConfigOptions:function(e){var t=s.contextFor(e);return t||r},setDomData:function(e,i){var r=e[n];r||(e[n]=r=s.newId()),t[r]=i},getDomData:function(e){var i=e[n];return i?t[i]:void 0},contextFor:function(e){switch(e.nodeType){case 1:case 8:var t=s.getDomData(e);if(t)return t;if(e.parentNode)return s.contextFor(e.parentNode)}return void 0},isEmptyVal:function(e){return void 0===e?!0:null===e?!0:""===e?!0:void 0}}}(),l=function(){var t=0;return{utils:s,init:function(n,i){t>0&&!i||(n=n||{},n.errorElementClass=n.errorElementClass||n.errorClass||r.errorElementClass,n.errorMessageClass=n.errorMessageClass||n.errorClass||r.errorMessageClass,e.utils.extend(r,n),r.registerExtenders&&exports.registerExtenders(),t=1)},configure:function(e){exports.init(e)},reset:function(){r=$.extend(r,i)},group:function(t,n){var n=e.utils.extend(r.grouping,n),i=e.observableArray([]),a=null,o=function l(t,r){var a=[],o=e.utils.unwrapObservable(t);r=void 0!==r?r:n.deep?1:-1,e.isObservable(t)&&(t.isValid||t.extend({validatable:!0}),i.push(t)),o&&(s.isArray(o)?a=o:s.isObject(o)&&(a=s.values(o))),0!==r&&e.utils.arrayForEach(a,function(e){e&&!e.nodeType&&l(e,r+1)})};return n.observable?(o(t),a=e.computed(function(){var t=[];return e.utils.arrayForEach(i(),function(e){e.isValid()||t.push(e.error)}),t})):a=function(){var n=[];return i([]),o(t),e.utils.arrayForEach(i(),function(e){e.isValid()||n.push(e.error)}),n},a.showAllMessages=function(t){void 0==t&&(t=!0),a(),e.utils.arrayForEach(i(),function(e){e.isModified(t)})},t.errors=a,t.isValid=function(){return 0===t.errors().length},t.isAnyMessageShown=function(){var t=!1;return a(),e.utils.arrayForEach(i(),function(e){!e.isValid()&&e.isModified()&&(t=!0)}),t},a},formatMessage:function(e,t){return"function"==typeof e?e(t):e.replace(/\{0\}/gi,t)},addRule:function(e,t){return e.extend({validatable:!0}),e.rules.push(t),e},addAnonymousRule:function(e,t){var n=s.newId();void 0===t.message&&(t.message="Error"),exports.rules[n]=t,exports.addRule(e,{rule:n,params:t.params})},addExtender:function(t){e.extenders[t]=function(e,n){return n.message||n.onlyIf?exports.addRule(e,{rule:t,message:n.message,params:s.isEmptyVal(n.params)?!0:n.params,condition:n.onlyIf}):exports.addRule(e,{rule:t,params:n})}},registerExtenders:function(){if(r.registerExtenders)for(var t in exports.rules)exports.rules.hasOwnProperty(t)&&(e.extenders[t]||exports.addExtender(t))},insertValidationMessage:function(e){var t=document.createElement("SPAN");return t.className=s.getConfigOptions(e).errorMessageClass,s.insertAfter(e,t),t},parseInputValidationAttributes:function(t,n){e.utils.arrayForEach(a,function(e){s.hasAttribute(t,e)&&exports.addRule(n(),{rule:e,params:t.getAttribute(e)||!0})})},writeInputValidationAttributes:function(t,n){var i=n();if(i&&i.rules){var r=i.rules();e.utils.arrayForEach(a,function(n){var i,a=e.utils.arrayFirst(r,function(e){return e.rule.toLowerCase()===n.toLowerCase()});a&&(i=a.params,"pattern"==a.rule&&a.params instanceof RegExp&&(i=a.params.source),t.setAttribute(n,i))}),r=null}}}}();l.rules={},l.rules.required={validator:function(e,t){var n,i=/^\s+|\s+$/g;return void 0===e||null===e?!t:(n=e,"string"==typeof e&&(n=e.replace(i,"")),t?(n+"").length>0:!0)},message:"This field is required."},l.rules.min={validator:function(e,t){return s.isEmptyVal(e)||e>=t},message:"Please enter a value greater than or equal to {0}."},l.rules.max={validator:function(e,t){return s.isEmptyVal(e)||t>=e},message:"Please enter a value less than or equal to {0}."},l.rules.minLength={validator:function(e,t){return s.isEmptyVal(e)||e.length>=t},message:"Please enter at least {0} characters."},l.rules.maxLength={validator:function(e,t){return s.isEmptyVal(e)||e.length<=t},message:"Please enter no more than {0} characters."},l.rules.pattern={validator:function(e,t){return s.isEmptyVal(e)||null!=e.match(t)},message:"Please check this value."},l.rules.step={validator:function(e,t){return s.isEmptyVal(e)||100*e%(100*t)===0},message:"The value must increment by {0}"},l.rules.email={validator:function(e,t){return t?s.isEmptyVal(e)||t&&/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e):!0},message:"Please enter a proper email address"},l.rules.date={validator:function(e,t){return t?s.isEmptyVal(e)||t&&!/Invalid|NaN/.test(new Date(e)):!0},message:"Please enter a proper date"},l.rules.dateISO={validator:function(e,t){return t?s.isEmptyVal(e)||t&&/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(e):!0},message:"Please enter a proper date"},l.rules.number={validator:function(e,t){return t?s.isEmptyVal(e)||t&&/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(e):!0},message:"Please enter a number"},l.rules.digit={validator:function(e,t){return t?s.isEmptyVal(e)||t&&/^\d+$/.test(e):!0},message:"Please enter a digit"},l.rules.phoneUS={validator:function(e,t){return t?"string"!=typeof e?!1:s.isEmptyVal(e)?!0:(e=e.replace(/\s+/g,""),t&&e.length>9&&e.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)):!0},message:"Please specify a valid phone number"},l.rules.equal={validator:function(e,t){var n=t;return e===s.getValue(n)},message:"Values must equal"},l.rules.notEqual={validator:function(e,t){var n=t;return e!==s.getValue(n)},message:"Please choose another value."},l.rules.unique={validator:function(t,n){var i=s.getValue(n.collection),r=s.getValue(n.externalValue),a=0;return t&&i?(e.utils.arrayFilter(e.utils.unwrapObservable(i),function(e){t===(n.valueAccessor?n.valueAccessor(e):e)&&a++}),(void 0!==r&&t!==r?1:2)>a):!0},message:"Please make sure the value is unique."},function(){l.registerExtenders()}(),e.bindingHandlers.validationCore=function(){return{init:function(t,n){var i=s.getConfigOptions(t);if(i.parseInputAttributes&&o(function(){exports.parseInputValidationAttributes(t,n)}),i.insertMessages&&s.isValidatable(n())){var r=exports.insertValidationMessage(t);i.messageTemplate?e.renderTemplate(i.messageTemplate,{field:n()},null,r,"replaceNode"):e.applyBindingsToNode(r,{validationMessage:n()})}i.writeInputAttributes&&s.isValidatable(n())&&exports.writeInputValidationAttributes(t,n),i.decorateElement&&s.isValidatable(n())&&e.applyBindingsToNode(t,{validationElement:n()})},update:function(){}}}(),function(){var t=e.bindingHandlers.value.init;e.bindingHandlers.value.init=function(n,i,r,a,o){return t(n,i,r),e.bindingHandlers.validationCore.init(n,i,r,a,o)}}(),e.bindingHandlers.validationMessage={update:function(t,n){var i=n(),r=s.getConfigOptions(t),a=(e.utils.unwrapObservable(i),!1),o=!1;i.extend({validatable:!0}),a=i.isModified(),o=i.isValid();var l=function(){return!r.messagesOnModified||a?o?null:i.error:null},c=function(){return a?!o:!1};e.bindingHandlers.text.update(t,l),e.bindingHandlers.visible.update(t,c)}},e.bindingHandlers.validationElement={update:function(t,n){var i=n(),r=s.getConfigOptions(t),a=(e.utils.unwrapObservable(i),!1),o=!1;i.extend({validatable:!0}),a=i.isModified(),o=i.isValid();var l=function(){var e={},t=a?!o:!1;return r.decorateElement||(t=!1),e[r.errorElementClass]=t,e};e.bindingHandlers.css.update(t,l);var c=t.getAttribute("data-orig-title"),d=t.title,u=("true"==t.getAttribute("data-orig-title"),function(){return!r.errorsAsTitleOnModified||a?o?{title:c||d,"data-orig-title":null}:{title:i.error,"data-orig-title":c||d}:void 0});e.bindingHandlers.attr.update(t,u)}},e.bindingHandlers.validationOptions=function(){return{init:function(t,n){var i=e.utils.unwrapObservable(n());if(i){var a=e.utils.extend({},r);e.utils.extend(a,i),s.setDomData(t,a)}}}}(),e.extenders.validation=function(t,n){return e.utils.arrayForEach(s.isArray(n)?n:[n],function(e){exports.addAnonymousRule(t,e)}),t},e.extenders.validatable=function(t,n){if(n&&!s.isValidatable(t)){t.error=null,t.rules=e.observableArray(),t.isValidating=e.observable(!1),t.__valid__=e.observable(!0),t.isModified=e.observable(!1);var i=e.computed(function(){t(),t.rules();return exports.validateObservable(t),!0});t.isValid=e.computed(function(){return t.__valid__()});var r=t.subscribe(function(){t.isModified(!0)});t._disposeValidation=function(){t.isValid.dispose(),t.rules.removeAll(),t.isModified._subscriptions.change=[],t.isValidating._subscriptions.change=[],t.__valid__._subscriptions.change=[],r.dispose(),i.dispose(),delete t.rules,delete t.error,delete t.isValid,delete t.isValidating,delete t.__valid__,delete t.isModified}}else n===!1&&s.isValidatable(t)&&t._disposeValidation&&t._disposeValidation();return t},l.validateObservable=function(e){for(var i,r,a=0,o=e.rules(),s=o.length;s>a;a++)if(r=o[a],!r.condition||r.condition())if(i=exports.rules[r.rule],i.async||r.async)n(e,i,r);else if(!t(e,i,r))return!1;return e.error=null,e.__valid__(!0),!0},e.validatedObservable=function(t){if(!exports.utils.isObject(t))return e.observable(t).extend({validatable:!0});var n=e.observable(t);return n.errors=exports.group(t),n.isValid=e.computed(function(){return 0===n.errors().length}),n},l.localize=function(e){var t;for(t in e)exports.rules.hasOwnProperty(t)&&(exports.rules[t].message=e[t])},e.applyBindingsWithValidation=function(t,n,i){var r,a,o=arguments.length;o>2?(r=n,a=i):2>o?r=document.body:arguments[1].nodeType?r=n:a=arguments[1],exports.init(),a&&exports.utils.setDomData(r,a),e.applyBindings(t,n)};var c=e.applyBindings;e.applyBindings=function(e,t){exports.init(),c(e,t)},e.utils.extend(exports,l)});