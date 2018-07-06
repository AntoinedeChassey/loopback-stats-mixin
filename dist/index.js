'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _stats = require('./stats');

var _stats2 = _interopRequireDefault(_stats);

var _stats_wrapper = require('./stats_wrapper');

var _stats_wrapper2 = _interopRequireDefault(_stats_wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _util.deprecate)(function (app) {
  app.loopback.modelBuilder.mixins.define('Stats', _stats2.default);
  app.loopback.modelBuilder.mixins.define('StatsWrapper', _stats_wrapper2.default);
}, 'DEPRECATED: Use mixinSources, see https://github.com/jonathan-casarrubias/loopback-stats-mixin#mixinsources');
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImFwcCIsImxvb3BiYWNrIiwibW9kZWxCdWlsZGVyIiwibWl4aW5zIiwiZGVmaW5lIiwiU3RhdHMiLCJTdGF0c1dyYXBwZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZSxxQkFDYixlQUFPO0FBQ0xBLE1BQUlDLFFBQUosQ0FBYUMsWUFBYixDQUEwQkMsTUFBMUIsQ0FBaUNDLE1BQWpDLENBQXdDLE9BQXhDLEVBQWlEQyxlQUFqRDtBQUNBTCxNQUFJQyxRQUFKLENBQWFDLFlBQWIsQ0FBMEJDLE1BQTFCLENBQWlDQyxNQUFqQyxDQUF3QyxjQUF4QyxFQUF3REUsdUJBQXhEO0FBQ0QsQ0FKWSxFQUtiLDZHQUxhLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2RlcHJlY2F0ZX0gZnJvbSAndXRpbCc7XHJcbmltcG9ydCBTdGF0cyBmcm9tICcuL3N0YXRzJztcclxuaW1wb3J0IFN0YXRzV3JhcHBlciBmcm9tICcuL3N0YXRzX3dyYXBwZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVwcmVjYXRlKFxyXG4gIGFwcCA9PiB7XHJcbiAgICBhcHAubG9vcGJhY2subW9kZWxCdWlsZGVyLm1peGlucy5kZWZpbmUoJ1N0YXRzJywgU3RhdHMpO1xyXG4gICAgYXBwLmxvb3BiYWNrLm1vZGVsQnVpbGRlci5taXhpbnMuZGVmaW5lKCdTdGF0c1dyYXBwZXInLCBTdGF0c1dyYXBwZXIpO1xyXG4gIH0sXHJcbiAgJ0RFUFJFQ0FURUQ6IFVzZSBtaXhpblNvdXJjZXMsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vam9uYXRoYW4tY2FzYXJydWJpYXMvbG9vcGJhY2stc3RhdHMtbWl4aW4jbWl4aW5zb3VyY2VzJ1xyXG4pO1xyXG4iXX0=
