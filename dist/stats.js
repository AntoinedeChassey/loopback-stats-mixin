'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _acceptBuilder = require('./builders/accept-builder');

var _acceptBuilder2 = _interopRequireDefault(_acceptBuilder);

var _paramsBuilder = require('./builders/params-builder');

var _paramsBuilder2 = _interopRequireDefault(_paramsBuilder);

var _queryBuilder = require('./builders/query-builder');

var _queryBuilder2 = _interopRequireDefault(_queryBuilder);

var _statsBuilder = require('./builders/stats-builder');

var _statsBuilder2 = _interopRequireDefault(_statsBuilder);

var _nowBuilder = require('./builders/now-builder');

var _nowBuilder2 = _interopRequireDefault(_nowBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  * Stats Mixin
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
 * Stats Mixin Dependencies
 */
exports.default = function (Model, ctx) {
  ctx.Model = Model;
  // Create dynamic statistic method
  Model[ctx.method] = function StatMethod() {
    // Cache block arguments
    ctx.arguments = arguments;
    ctx.params = new _paramsBuilder2.default(ctx).build();
    // Create Promise
    return new _promise2.default(function (resolve, reject) {
      ctx.now = new _nowBuilder2.default(ctx).build();
      ctx.nowISOString = ctx.now.toISOString();
      ctx.stats = new _statsBuilder2.default(ctx);
      // Data Workflow
      _async2.default.waterfall([
      // Create Scope Query
      // We dont pass complete context because we expect specific behaviour
      function (next) {
        var options = {
          type: ctx.type,
          count: ctx.count,
          now: ctx.now,
          nowISOString: ctx.nowISOString,
          params: {
            pk: Model.getIdName(),
            id: ctx.params.id,
            relation: ctx.params.relation,
            custom: ctx.params.custom
          }
        };
        if (ctx.type === 'model') {
          options.params.where = ctx.params.where;
          options.params.range = ctx.params.range;
        }
        new _queryBuilder2.default(options).onComplete(next).build();
      },
      // Get List of Items
      function (query, next) {
        switch (ctx.type) {
          case 'model':
            Model.find(query, next);
            break;
          case 'relation':
            Model.findOne(query, function (err, instance) {
              if (err) return next(err);
              var builder = new _queryBuilder2.default({
                type: ctx.type,
                count: ctx.count,
                now: ctx.now,
                nowISOString: ctx.nowISOString,
                params: {
                  range: ctx.params.range,
                  where: ctx.params.where,
                  custom: ctx.params.custom
                }
              });
              builder.onComplete(function (_err, _query) {
                if (_err) return next(_err);
                instance[ctx.relation || ctx.params.relation](_query, next);
              });
              builder.build();
            });
            break;
          case 'nested':
            Model.findOne(query, function (err, instance) {
              return next(err, instance[ctx.nested]);
            });
            break;
          default:
            next(null, []);
        }
      },
      // Process List of results
      function (list, next) {
        return next(null, ctx.stats.process(list));
      }], function (err, result) {
        if (typeof ctx.params.next === 'function') {
          ctx.params.next(err, result);
        } else {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      });
    });
  };
  /**
   * Dynamically Register Endpoint
   */
  Model.remoteMethod(ctx.method, {
    http: { path: ctx.endpoint, verb: 'get' },
    accepts: new _acceptBuilder2.default(ctx).build(),
    returns: { type: 'array', root: true },
    description: ctx.description
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRzLmpzIl0sIm5hbWVzIjpbIk1vZGVsIiwiY3R4IiwibWV0aG9kIiwiU3RhdE1ldGhvZCIsImFyZ3VtZW50cyIsInBhcmFtcyIsIlBhcmFtc0J1aWxkZXIiLCJidWlsZCIsInJlc29sdmUiLCJyZWplY3QiLCJub3ciLCJOb3dCdWlsZGVyIiwibm93SVNPU3RyaW5nIiwidG9JU09TdHJpbmciLCJzdGF0cyIsIlN0YXRzQnVpbGRlciIsImFzeW5jIiwid2F0ZXJmYWxsIiwib3B0aW9ucyIsInR5cGUiLCJjb3VudCIsInBrIiwiZ2V0SWROYW1lIiwiaWQiLCJyZWxhdGlvbiIsImN1c3RvbSIsIndoZXJlIiwicmFuZ2UiLCJRdWVyeUJ1aWxkZXIiLCJvbkNvbXBsZXRlIiwibmV4dCIsInF1ZXJ5IiwiZmluZCIsImZpbmRPbmUiLCJlcnIiLCJpbnN0YW5jZSIsImJ1aWxkZXIiLCJfZXJyIiwiX3F1ZXJ5IiwibmVzdGVkIiwibGlzdCIsInByb2Nlc3MiLCJyZXN1bHQiLCJyZW1vdGVNZXRob2QiLCJodHRwIiwicGF0aCIsImVuZHBvaW50IiwidmVyYiIsImFjY2VwdHMiLCJBY2NlcHRCdWlsZGVyIiwicmV0dXJucyIsInJvb3QiLCJkZXNjcmlwdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFUQTs7O2tCQXNCZSxVQUFDQSxLQUFELEVBQVFDLEdBQVIsRUFBZ0I7QUFDN0JBLE1BQUlELEtBQUosR0FBWUEsS0FBWjtBQUNBO0FBQ0FBLFFBQU1DLElBQUlDLE1BQVYsSUFBb0IsU0FBU0MsVUFBVCxHQUFzQjtBQUN4QztBQUNBRixRQUFJRyxTQUFKLEdBQWdCQSxTQUFoQjtBQUNBSCxRQUFJSSxNQUFKLEdBQWEsSUFBSUMsdUJBQUosQ0FBa0JMLEdBQWxCLEVBQXVCTSxLQUF2QixFQUFiO0FBQ0E7QUFDQSxXQUFPLHNCQUFZLFVBQUND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N0IsSUFBSWEsS0FBSixDQUFVMkIsT0FBVixDQUFrQkQsSUFBbEIsQ0FBWCxDQUFoQjtBQUFBLE9BeERjLENBQWhCLEVBMERHLFVBQUNOLEdBQUQsRUFBTVEsTUFBTixFQUFpQjtBQUNsQixZQUFJLE9BQU96QyxJQUFJSSxNQUFKLENBQVd5QixJQUFsQixLQUEyQixVQUEvQixFQUEyQztBQUN6QzdCLGNBQUlJLE1BQUosQ0FBV3lCLElBQVgsQ0FBZ0JJLEdBQWhCLEVBQXFCUSxNQUFyQjtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUlSLEdBQUosRUFBUztBQUNQekIsbUJBQU95QixHQUFQO0FBQ0QsV0FGRCxNQUVPO0FBQ0wxQixvQkFBUWtDLE1BQVI7QUFDRDtBQUNGO0FBQ0YsT0FwRUQ7QUFxRUQsS0ExRU0sQ0FBUDtBQTJFRCxHQWhGRDtBQWlGQTs7O0FBR0ExQyxRQUFNMkMsWUFBTixDQUFtQjFDLElBQUlDLE1BQXZCLEVBQStCO0FBQzdCMEMsVUFBTSxFQUFFQyxNQUFNNUMsSUFBSTZDLFFBQVosRUFBc0JDLE1BQU0sS0FBNUIsRUFEdUI7QUFFN0JDLGFBQVMsSUFBSUMsdUJBQUosQ0FBa0JoRCxHQUFsQixFQUF1Qk0sS0FBdkIsRUFGb0I7QUFHN0IyQyxhQUFTLEVBQUUvQixNQUFNLE9BQVIsRUFBaUJnQyxNQUFNLElBQXZCLEVBSG9CO0FBSTdCQyxpQkFBYW5ELElBQUltRDtBQUpZLEdBQS9CO0FBTUQsQyIsImZpbGUiOiJzdGF0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBTdGF0cyBNaXhpbiBEZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCBhc3luYyBmcm9tICdhc3luYyc7XHJcbmltcG9ydCBBY2NlcHRCdWlsZGVyIGZyb20gJy4vYnVpbGRlcnMvYWNjZXB0LWJ1aWxkZXInO1xyXG5pbXBvcnQgUGFyYW1zQnVpbGRlciBmcm9tICcuL2J1aWxkZXJzL3BhcmFtcy1idWlsZGVyJztcclxuaW1wb3J0IFF1ZXJ5QnVpbGRlciBmcm9tICcuL2J1aWxkZXJzL3F1ZXJ5LWJ1aWxkZXInO1xyXG5pbXBvcnQgU3RhdHNCdWlsZGVyIGZyb20gJy4vYnVpbGRlcnMvc3RhdHMtYnVpbGRlcic7XHJcbmltcG9ydCBOb3dCdWlsZGVyIGZyb20gJy4vYnVpbGRlcnMvbm93LWJ1aWxkZXInO1xyXG4vKipcclxuICAqIFN0YXRzIE1peGluXHJcbiAgKiBAQXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXHJcbiAgKiBAU2VlIDxodHRwczovL3R3aXR0ZXIuY29tL2pvaG5jYXNhcnJ1Ymlhcz5cclxuICAqIEBTZWUgPGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2xvb3BiYWNrLXN0YXRzLW1peGluPlxyXG4gICogQFNlZSA8aHR0cHM6Ly9naXRodWIuY29tL2pvbmF0aGFuLWNhc2FycnViaWFzL2xvb3BiYWNrLXN0YXRzLW1peGluPlxyXG4gICogQERlc2NyaXB0aW9uXHJcbiAgKlxyXG4gICogVGhlIGZvbGxvd2luZyBtaXhpbiB3aWxsIGFkZCBzdGF0aXN0aWNzIGZ1bmN0aW9uYWxsaXR5IHRvIG1vZGVscyB3aGljaCBpbmNsdWRlc1xyXG4gICogdGhpcyBtb2R1bGUuXHJcbiAgKlxyXG4gICogSXQgY2FuIGNyZWF0ZSBzdGF0aXN0aWNzIGZyb20gdGhlIGdpdmVuIG1vZGVsLCBhIG1vZGVsIHJlbGF0aW9uc2hpcCBvciBhbiBuZXN0ZWQgb2JqZWN0XHJcbiAgKiovXHJcbmV4cG9ydCBkZWZhdWx0IChNb2RlbCwgY3R4KSA9PiB7XHJcbiAgY3R4Lk1vZGVsID0gTW9kZWw7XHJcbiAgLy8gQ3JlYXRlIGR5bmFtaWMgc3RhdGlzdGljIG1ldGhvZFxyXG4gIE1vZGVsW2N0eC5tZXRob2RdID0gZnVuY3Rpb24gU3RhdE1ldGhvZCgpIHtcclxuICAgIC8vIENhY2hlIGJsb2NrIGFyZ3VtZW50c1xyXG4gICAgY3R4LmFyZ3VtZW50cyA9IGFyZ3VtZW50cztcclxuICAgIGN0eC5wYXJhbXMgPSBuZXcgUGFyYW1zQnVpbGRlcihjdHgpLmJ1aWxkKCk7XHJcbiAgICAvLyBDcmVhdGUgUHJvbWlzZVxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY3R4Lm5vdyA9IG5ldyBOb3dCdWlsZGVyKGN0eCkuYnVpbGQoKTtcclxuICAgICAgY3R4Lm5vd0lTT1N0cmluZyA9IGN0eC5ub3cudG9JU09TdHJpbmcoKTtcclxuICAgICAgY3R4LnN0YXRzID0gbmV3IFN0YXRzQnVpbGRlcihjdHgpO1xyXG4gICAgICAvLyBEYXRhIFdvcmtmbG93XHJcbiAgICAgIGFzeW5jLndhdGVyZmFsbChbXHJcbiAgICAgICAgLy8gQ3JlYXRlIFNjb3BlIFF1ZXJ5XHJcbiAgICAgICAgLy8gV2UgZG9udCBwYXNzIGNvbXBsZXRlIGNvbnRleHQgYmVjYXVzZSB3ZSBleHBlY3Qgc3BlY2lmaWMgYmVoYXZpb3VyXHJcbiAgICAgICAgbmV4dCA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0eXBlOiBjdHgudHlwZSxcclxuICAgICAgICAgICAgY291bnQ6IGN0eC5jb3VudCxcclxuICAgICAgICAgICAgbm93OiBjdHgubm93LFxyXG4gICAgICAgICAgICBub3dJU09TdHJpbmc6IGN0eC5ub3dJU09TdHJpbmcsXHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgIHBrOiBNb2RlbC5nZXRJZE5hbWUoKSxcclxuICAgICAgICAgICAgICBpZDogY3R4LnBhcmFtcy5pZCxcclxuICAgICAgICAgICAgICByZWxhdGlvbjogY3R4LnBhcmFtcy5yZWxhdGlvbixcclxuICAgICAgICAgICAgICBjdXN0b206IGN0eC5wYXJhbXMuY3VzdG9tLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGlmIChjdHgudHlwZSA9PT0gJ21vZGVsJykge1xyXG4gICAgICAgICAgICBvcHRpb25zLnBhcmFtcy53aGVyZSA9IGN0eC5wYXJhbXMud2hlcmU7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucGFyYW1zLnJhbmdlID0gY3R4LnBhcmFtcy5yYW5nZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIG5ldyBRdWVyeUJ1aWxkZXIob3B0aW9ucykub25Db21wbGV0ZShuZXh0KS5idWlsZCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gR2V0IExpc3Qgb2YgSXRlbXNcclxuICAgICAgICAocXVlcnksIG5leHQpID0+IHtcclxuICAgICAgICAgIHN3aXRjaCAoY3R4LnR5cGUpIHtcclxuICAgICAgICAgIGNhc2UgJ21vZGVsJzpcclxuICAgICAgICAgICAgTW9kZWwuZmluZChxdWVyeSwgbmV4dCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAncmVsYXRpb24nOlxyXG4gICAgICAgICAgICBNb2RlbC5maW5kT25lKHF1ZXJ5LCAoZXJyLCBpbnN0YW5jZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBuZXh0KGVycik7XHJcbiAgICAgICAgICAgICAgY29uc3QgYnVpbGRlciA9IG5ldyBRdWVyeUJ1aWxkZXIoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogY3R4LnR5cGUsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogY3R4LmNvdW50LFxyXG4gICAgICAgICAgICAgICAgbm93OiBjdHgubm93LFxyXG4gICAgICAgICAgICAgICAgbm93SVNPU3RyaW5nOiBjdHgubm93SVNPU3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgIHJhbmdlOiBjdHgucGFyYW1zLnJhbmdlLFxyXG4gICAgICAgICAgICAgICAgICB3aGVyZTogY3R4LnBhcmFtcy53aGVyZSxcclxuICAgICAgICAgICAgICAgICAgY3VzdG9tOiBjdHgucGFyYW1zLmN1c3RvbSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgYnVpbGRlci5vbkNvbXBsZXRlKChfZXJyLCBfcXVlcnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChfZXJyKSByZXR1cm4gbmV4dChfZXJyKTtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlW2N0eC5yZWxhdGlvbiB8fCBjdHgucGFyYW1zLnJlbGF0aW9uXShfcXVlcnksIG5leHQpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIGJ1aWxkZXIuYnVpbGQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnbmVzdGVkJzpcclxuICAgICAgICAgICAgTW9kZWwuZmluZE9uZShxdWVyeSwgKGVyciwgaW5zdGFuY2UpID0+IG5leHQoZXJyLCBpbnN0YW5jZVtjdHgubmVzdGVkXSkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6IG5leHQobnVsbCwgW10pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gUHJvY2VzcyBMaXN0IG9mIHJlc3VsdHNcclxuICAgICAgICAobGlzdCwgbmV4dCkgPT4gbmV4dChudWxsLCBjdHguc3RhdHMucHJvY2VzcyhsaXN0KSksXHJcbiAgICAgICAgLy8gRW5kIG9mIEZsb3dcclxuICAgICAgXSwgKGVyciwgcmVzdWx0KSA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjdHgucGFyYW1zLm5leHQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgIGN0eC5wYXJhbXMubmV4dChlcnIsIHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgLyoqXHJcbiAgICogRHluYW1pY2FsbHkgUmVnaXN0ZXIgRW5kcG9pbnRcclxuICAgKi9cclxuICBNb2RlbC5yZW1vdGVNZXRob2QoY3R4Lm1ldGhvZCwge1xyXG4gICAgaHR0cDogeyBwYXRoOiBjdHguZW5kcG9pbnQsIHZlcmI6ICdnZXQnIH0sXHJcbiAgICBhY2NlcHRzOiBuZXcgQWNjZXB0QnVpbGRlcihjdHgpLmJ1aWxkKCksXHJcbiAgICByZXR1cm5zOiB7IHR5cGU6ICdhcnJheScsIHJvb3Q6IHRydWUgfSxcclxuICAgIGRlc2NyaXB0aW9uOiBjdHguZGVzY3JpcHRpb24sXHJcbiAgfSk7XHJcbn07XHJcbiJdfQ==
