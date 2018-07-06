'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _acceptBuilder = require('./builders/accept-builder');

var _acceptBuilder2 = _interopRequireDefault(_acceptBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wrapper JS Mixin
 * @Author Jonathan Casarrubias
 * @See <https://twitter.com/johncasarrubias>
 * @See <https://www.npmjs.com/package/loopback-stats-mixin>
 * @See <https://github.com/jonathan-casarrubias/loopback-stats-mixin>
 * @Description
 *
 * The following mixin will add statistics functionallity to models which includes
 * this module.
 *
 * It can create statistics from the given model, a model relationship or an nested object
 **/
/**
 * Stats Wrapper Mixin Dependencies
 */
exports.default = function (Model, ctx) {
  ctx.Model = Model;
  // Create dynamic statistic method
  Model[ctx.method] = function StatWrapperMethod() {
    ctx.result = {};
    ctx.args = arguments;
    ctx.next = ctx.args[arguments.length - 1];
    // Create Promise
    _async2.default.each(ctx.wraps, function (item, next) {
      ctx.args[ctx.args.length - 1] = function (err, dataset) {
        if (err) return next(err);
        ctx.result[item] = dataset;
        next();
      };
      if (Model[item]) {
        Model[item].apply(Model, (0, _from2.default)(ctx.args));
      } else {
        next(new Error(Model.definition.name + '.' + item + ' does not exist, verify your configuration.'));
      }
    }, function (err) {
      if (typeof ctx.next === 'function') {
        ctx.next(err, ctx.result);
      }
    });
  };
  /**
   * Dynamically Register Endpoint
   */
  Model.remoteMethod(ctx.method, {
    http: { path: ctx.endpoint, verb: 'get' },
    accepts: new _acceptBuilder2.default(ctx).build(),
    returns: { type: 'object', root: true },
    description: ctx.description
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRzX3dyYXBwZXIuanMiXSwibmFtZXMiOlsiTW9kZWwiLCJjdHgiLCJtZXRob2QiLCJTdGF0V3JhcHBlck1ldGhvZCIsInJlc3VsdCIsImFyZ3MiLCJhcmd1bWVudHMiLCJuZXh0IiwibGVuZ3RoIiwiYXN5bmMiLCJlYWNoIiwid3JhcHMiLCJpdGVtIiwiZXJyIiwiZGF0YXNldCIsImFwcGx5IiwiRXJyb3IiLCJkZWZpbml0aW9uIiwibmFtZSIsInJlbW90ZU1ldGhvZCIsImh0dHAiLCJwYXRoIiwiZW5kcG9pbnQiLCJ2ZXJiIiwiYWNjZXB0cyIsIkFjY2VwdEJ1aWxkZXIiLCJidWlsZCIsInJldHVybnMiLCJ0eXBlIiwicm9vdCIsImRlc2NyaXB0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFMQTs7O2tCQWtCZSxVQUFDQSxLQUFELEVBQVFDLEdBQVIsRUFBZ0I7QUFDN0JBLE1BQUlELEtBQUosR0FBWUEsS0FBWjtBQUNBO0FBQ0FBLFFBQU1DLElBQUlDLE1BQVYsSUFBb0IsU0FBU0MsaUJBQVQsR0FBNkI7QUFDL0NGLFFBQUlHLE1BQUosR0FBYSxFQUFiO0FBQ0FILFFBQUlJLElBQUosR0FBV0MsU0FBWDtBQUNBTCxRQUFJTSxJQUFKLEdBQVdOLElBQUlJLElBQUosQ0FBU0MsVUFBVUUsTUFBVixHQUFtQixDQUE1QixDQUFYO0FBQ0E7QUFDQUMsb0JBQU1DLElBQU4sQ0FBV1QsSUFBSVUsS0FBZixFQUFzQixVQUFDQyxJQUFELEVBQU9MLElBQVAsRUFBZ0I7QUFDcENOLFVBQUlJLElBQUosQ0FBU0osSUFBSUksSUFBSixDQUFTRyxNQUFULEdBQWtCLENBQTNCLElBQWdDLFVBQUNLLEdBQUQsRUFBTUMsT0FBTixFQUFrQjtBQUNoRCxZQUFJRCxHQUFKLEVBQVMsT0FBT04sS0FBS00sR0FBTCxDQUFQO0FBQ1RaLFlBQUlHLE1BQUosQ0FBV1EsSUFBWCxJQUFtQkUsT0FBbkI7QUFDQVA7QUFDRCxPQUpEO0FBS0EsVUFBSVAsTUFBTVksSUFBTixDQUFKLEVBQWlCO0FBQ2ZaLGNBQU1ZLElBQU4sRUFBWUcsS0FBWixDQUFrQmYsS0FBbEIsRUFBeUIsb0JBQVdDLElBQUlJLElBQWYsQ0FBekI7QUFDRCxPQUZELE1BRU87QUFDTEUsYUFBSyxJQUFJUyxLQUFKLENBQVVoQixNQUFNaUIsVUFBTixDQUFpQkMsSUFBakIsR0FBd0IsR0FBeEIsR0FBOEJOLElBQTlCLEdBQXFDLDZDQUEvQyxDQUFMO0FBQ0Q7QUFDRixLQVhELEVBV0csZUFBTztBQUNSLFVBQUksT0FBT1gsSUFBSU0sSUFBWCxLQUFvQixVQUF4QixFQUFvQztBQUNsQ04sWUFBSU0sSUFBSixDQUFTTSxHQUFULEVBQWNaLElBQUlHLE1BQWxCO0FBQ0Q7QUFDRixLQWZEO0FBZ0JELEdBckJEO0FBc0JBOzs7QUFHQUosUUFBTW1CLFlBQU4sQ0FBbUJsQixJQUFJQyxNQUF2QixFQUErQjtBQUM3QmtCLFVBQU0sRUFBRUMsTUFBTXBCLElBQUlxQixRQUFaLEVBQXNCQyxNQUFNLEtBQTVCLEVBRHVCO0FBRTdCQyxhQUFTLElBQUlDLHVCQUFKLENBQWtCeEIsR0FBbEIsRUFBdUJ5QixLQUF2QixFQUZvQjtBQUc3QkMsYUFBUyxFQUFFQyxNQUFNLFFBQVIsRUFBa0JDLE1BQU0sSUFBeEIsRUFIb0I7QUFJN0JDLGlCQUFhN0IsSUFBSTZCO0FBSlksR0FBL0I7QUFNRCxDIiwiZmlsZSI6InN0YXRzX3dyYXBwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogU3RhdHMgV3JhcHBlciBNaXhpbiBEZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCBhc3luYyBmcm9tICdhc3luYyc7XHJcbmltcG9ydCBBY2NlcHRCdWlsZGVyIGZyb20gJy4vYnVpbGRlcnMvYWNjZXB0LWJ1aWxkZXInO1xyXG4vKipcclxuICogV3JhcHBlciBKUyBNaXhpblxyXG4gKiBAQXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXHJcbiAqIEBTZWUgPGh0dHBzOi8vdHdpdHRlci5jb20vam9obmNhc2FycnViaWFzPlxyXG4gKiBAU2VlIDxodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9sb29wYmFjay1zdGF0cy1taXhpbj5cclxuICogQFNlZSA8aHR0cHM6Ly9naXRodWIuY29tL2pvbmF0aGFuLWNhc2FycnViaWFzL2xvb3BiYWNrLXN0YXRzLW1peGluPlxyXG4gKiBARGVzY3JpcHRpb25cclxuICpcclxuICogVGhlIGZvbGxvd2luZyBtaXhpbiB3aWxsIGFkZCBzdGF0aXN0aWNzIGZ1bmN0aW9uYWxsaXR5IHRvIG1vZGVscyB3aGljaCBpbmNsdWRlc1xyXG4gKiB0aGlzIG1vZHVsZS5cclxuICpcclxuICogSXQgY2FuIGNyZWF0ZSBzdGF0aXN0aWNzIGZyb20gdGhlIGdpdmVuIG1vZGVsLCBhIG1vZGVsIHJlbGF0aW9uc2hpcCBvciBhbiBuZXN0ZWQgb2JqZWN0XHJcbiAqKi9cclxuZXhwb3J0IGRlZmF1bHQgKE1vZGVsLCBjdHgpID0+IHtcclxuICBjdHguTW9kZWwgPSBNb2RlbDtcclxuICAvLyBDcmVhdGUgZHluYW1pYyBzdGF0aXN0aWMgbWV0aG9kXHJcbiAgTW9kZWxbY3R4Lm1ldGhvZF0gPSBmdW5jdGlvbiBTdGF0V3JhcHBlck1ldGhvZCgpIHtcclxuICAgIGN0eC5yZXN1bHQgPSB7fTtcclxuICAgIGN0eC5hcmdzID0gYXJndW1lbnRzO1xyXG4gICAgY3R4Lm5leHQgPSBjdHguYXJnc1thcmd1bWVudHMubGVuZ3RoIC0gMV07XHJcbiAgICAvLyBDcmVhdGUgUHJvbWlzZVxyXG4gICAgYXN5bmMuZWFjaChjdHgud3JhcHMsIChpdGVtLCBuZXh0KSA9PiB7XHJcbiAgICAgIGN0eC5hcmdzW2N0eC5hcmdzLmxlbmd0aCAtIDFdID0gKGVyciwgZGF0YXNldCkgPT4ge1xyXG4gICAgICAgIGlmIChlcnIpIHJldHVybiBuZXh0KGVycik7XHJcbiAgICAgICAgY3R4LnJlc3VsdFtpdGVtXSA9IGRhdGFzZXQ7XHJcbiAgICAgICAgbmV4dCgpO1xyXG4gICAgICB9O1xyXG4gICAgICBpZiAoTW9kZWxbaXRlbV0pIHtcclxuICAgICAgICBNb2RlbFtpdGVtXS5hcHBseShNb2RlbCwgQXJyYXkuZnJvbShjdHguYXJncykpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5leHQobmV3IEVycm9yKE1vZGVsLmRlZmluaXRpb24ubmFtZSArICcuJyArIGl0ZW0gKyAnIGRvZXMgbm90IGV4aXN0LCB2ZXJpZnkgeW91ciBjb25maWd1cmF0aW9uLicpKTtcclxuICAgICAgfVxyXG4gICAgfSwgZXJyID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiBjdHgubmV4dCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGN0eC5uZXh0KGVyciwgY3R4LnJlc3VsdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcbiAgLyoqXHJcbiAgICogRHluYW1pY2FsbHkgUmVnaXN0ZXIgRW5kcG9pbnRcclxuICAgKi9cclxuICBNb2RlbC5yZW1vdGVNZXRob2QoY3R4Lm1ldGhvZCwge1xyXG4gICAgaHR0cDogeyBwYXRoOiBjdHguZW5kcG9pbnQsIHZlcmI6ICdnZXQnIH0sXHJcbiAgICBhY2NlcHRzOiBuZXcgQWNjZXB0QnVpbGRlcihjdHgpLmJ1aWxkKCksXHJcbiAgICByZXR1cm5zOiB7IHR5cGU6ICdvYmplY3QnLCByb290OiB0cnVlIH0sXHJcbiAgICBkZXNjcmlwdGlvbjogY3R4LmRlc2NyaXB0aW9uLFxyXG4gIH0pO1xyXG59O1xyXG4iXX0=
