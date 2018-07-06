'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Builds Now Time Moment
 */
var NowBuilder = function () {
    function NowBuilder(ctx) {
        (0, _classCallCheck3.default)(this, NowBuilder);
        this.ctx = ctx;
    }

    (0, _createClass3.default)(NowBuilder, [{
        key: 'build',
        value: function build() {
            var now = void 0;
            switch (this.ctx.params.range) {
                case 'hourly':
                case 'daily':
                case 'weekly':
                case 'monthly':
                case 'yearly':
                default:
                    now = (0, _moment2.default)();
                    break;
                case 'custom':
                    now = (0, _moment2.default)(this.ctx.params.custom.end);
                    break;
            }
            return now;
        }
    }]);
    return NowBuilder;
}(); /**
      * Stats Builder Dependencies
      */


exports.default = NowBuilder;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdy1idWlsZGVyLmpzIl0sIm5hbWVzIjpbIk5vd0J1aWxkZXIiLCJjdHgiLCJub3ciLCJwYXJhbXMiLCJyYW5nZSIsImN1c3RvbSIsImVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7Ozs7O0FBQ0E7OztJQUdxQkEsVTtBQUVqQix3QkFBWUMsR0FBWixFQUFpQjtBQUFBO0FBQUUsYUFBS0EsR0FBTCxHQUFXQSxHQUFYO0FBQWlCOzs7O2dDQUU1QjtBQUNKLGdCQUFJQyxZQUFKO0FBQ0Esb0JBQVEsS0FBS0QsR0FBTCxDQUFTRSxNQUFULENBQWdCQyxLQUF4QjtBQUNJLHFCQUFLLFFBQUw7QUFDQSxxQkFBSyxPQUFMO0FBQ0EscUJBQUssUUFBTDtBQUNBLHFCQUFLLFNBQUw7QUFDQSxxQkFBSyxRQUFMO0FBQ0E7QUFDSUYsMEJBQU0sdUJBQU47QUFDSjtBQUNBLHFCQUFLLFFBQUw7QUFDSUEsMEJBQU0sc0JBQU8sS0FBS0QsR0FBTCxDQUFTRSxNQUFULENBQWdCRSxNQUFoQixDQUF1QkMsR0FBOUIsQ0FBTjtBQUNKO0FBWEo7QUFhQSxtQkFBT0osR0FBUDtBQUNIOzs7S0EzQkw7Ozs7O2tCQU9xQkYsVSIsImZpbGUiOiJub3ctYnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBTdGF0cyBCdWlsZGVyIERlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG4vKipcclxuICogQnVpbGRzIE5vdyBUaW1lIE1vbWVudFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm93QnVpbGRlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY3R4KSB7IHRoaXMuY3R4ID0gY3R4OyB9XHJcblxyXG4gICAgYnVpbGQoKSB7XHJcbiAgICAgICAgbGV0IG5vdztcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuY3R4LnBhcmFtcy5yYW5nZSkge1xyXG4gICAgICAgICAgICBjYXNlICdob3VybHknOlxyXG4gICAgICAgICAgICBjYXNlICdkYWlseSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ3dlZWtseSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ21vbnRobHknOlxyXG4gICAgICAgICAgICBjYXNlICd5ZWFybHknOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgbm93ID0gbW9tZW50KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdjdXN0b20nOlxyXG4gICAgICAgICAgICAgICAgbm93ID0gbW9tZW50KHRoaXMuY3R4LnBhcmFtcy5jdXN0b20uZW5kKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub3c7XHJcbiAgICB9XHJcbn1cclxuIl19
