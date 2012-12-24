/*
  QuoJS 2.2.0
  (c) 2011, 2012 Javi Jiménez Villar (@soyjavi)
  http://quojs.tapquo.com
*/

(function($$) {
  var READY_EXPRESSION, SHORTCUTS, SHORTCUTS_EVENTS;
  READY_EXPRESSION = /complete|loaded|interactive/;
  SHORTCUTS = ["touch", "tap"];
  SHORTCUTS_EVENTS = {
    touch: "touchstart",
    tap: "tap"
  };
  SHORTCUTS.forEach(function(event) {
    $$.fn[event] = function(callback) {
      return $$(document.body).delegate(this.selector, SHORTCUTS_EVENTS[event], callback);
    };
    return this;
  });
  $$.fn.on = function(event, selector, callback) {
    if (selector === undefined || $$.toType(selector) === "function") {
      return this.bind(event, selector);
    } else {
      return this.delegate(selector, event, callback);
    }
  };
  $$.fn.off = function(event, selector, callback) {
    if (selector === undefined || $$.toType(selector) === "function") {
      return this.unbind(event, selector);
    } else {
      return this.undelegate(selector, event, callback);
    }
  };
  $$.fn.ready = function(callback) {
    if (READY_EXPRESSION.test(document.readyState)) {
      callback($$);
    } else {
      $$.fn.addEvent(document, "DOMContentLoaded", function() {
        return callback($$);
      });
    }
    return this;
  };
})(Quo);
