'use strict';
/**
 * Query Builder Dependencies
 */

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
 * Builds Loopback Query
 */
var QueryBuilder = function () {
    /**
     * Setters
     */
    function QueryBuilder(ctx) {
        (0, _classCallCheck3.default)(this, QueryBuilder);
        this.ctx = ctx;
    }

    (0, _createClass3.default)(QueryBuilder, [{
        key: 'onComplete',
        value: function onComplete(next) {
            this.finish = next;return this;
        }
        /**
         * Build Query
         */

    }, {
        key: 'build',
        value: function build() {
            // Build query object in scope
            var query = {};
            // lets add a where statement
            query.where = this.ctx.params.where || {};
            // If stat type is relation, then we set the root id
            if ((this.ctx.type === 'relation' || this.ctx.type === 'nested') && this.ctx.params.id) query.where[this.ctx.params.pk] = this.ctx.params.id;
            // query.where[this.ctx.Model.settings.relations[this.ctx.params.relation].] = this.ctx.params.id;
            // If stat type is relation, then we set the root id
            if (this.ctx.type === 'relation' && this.ctx.params.relation) query.include = this.ctx.params.relation;
            // Set Range
            if (this.ctx.params.range && this.ctx.count.on) {
                query.where[this.ctx.count.on] = {};
                switch (this.ctx.params.range) {
                    case 'hourly':
                        query.where[this.ctx.count.on].gt = (0, _moment2.default)(this.ctx.nowISOString).subtract(24, 'hours').toDate();
                        break;
                    case 'daily':
                        query.where[this.ctx.count.on].gt = (0, _moment2.default)(this.ctx.nowISOString).subtract(7, 'days').toDate();
                        break;
                    case 'weekly':
                        query.where[this.ctx.count.on].gt = (0, _moment2.default)(this.ctx.nowISOString).subtract(4, 'weeks').toDate();
                        break;
                    case 'monthly':
                        query.where[this.ctx.count.on].gt = (0, _moment2.default)(this.ctx.nowISOString).subtract(12, 'months').toDate();
                        break;
                    case 'yearly':
                        query.where[this.ctx.count.on].gt = (0, _moment2.default)(this.ctx.nowISOString).subtract(5, 'years').toDate();
                        break;
                    case 'custom':
                        query.where[this.ctx.count.on].gte = this.ctx.params.custom.start;
                        query.where[this.ctx.count.on].lte = this.ctx.params.custom.end;
                        break;
                }
            }
            // Return result query
            this.finish(null, query);
        }
    }]);
    return QueryBuilder;
}();

exports.default = QueryBuilder;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1ZXJ5LWJ1aWxkZXIuanMiXSwibmFtZXMiOlsiUXVlcnlCdWlsZGVyIiwiY3R4IiwibmV4dCIsImZpbmlzaCIsInF1ZXJ5Iiwid2hlcmUiLCJwYXJhbXMiLCJ0eXBlIiwiaWQiLCJwayIsInJlbGF0aW9uIiwiaW5jbHVkZSIsInJhbmdlIiwiY291bnQiLCJvbiIsImd0Iiwibm93SVNPU3RyaW5nIiwic3VidHJhY3QiLCJ0b0RhdGUiLCJndGUiLCJjdXN0b20iLCJzdGFydCIsImx0ZSIsImVuZCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7Ozs7QUFDQTs7O0lBR3FCQSxZO0FBQ2pCOzs7QUFHQSwwQkFBWUMsR0FBWixFQUFpQjtBQUFBO0FBQUUsYUFBS0EsR0FBTCxHQUFXQSxHQUFYO0FBQWlCOzs7O21DQUN6QkMsSSxFQUFNO0FBQUUsaUJBQUtDLE1BQUwsR0FBY0QsSUFBZCxDQUFvQixPQUFPLElBQVA7QUFBYztBQUNyRDs7Ozs7O2dDQUdRO0FBQ0o7QUFDQSxnQkFBSUUsUUFBUSxFQUFaO0FBQ0E7QUFDQUEsa0JBQU1DLEtBQU4sR0FBYyxLQUFLSixHQUFMLENBQVNLLE1BQVQsQ0FBZ0JELEtBQWhCLElBQXlCLEVBQXZDO0FBQ0E7QUFDQSxnQkFBSSxDQUFDLEtBQUtKLEdBQUwsQ0FBU00sSUFBVCxLQUFrQixVQUFsQixJQUFnQyxLQUFLTixHQUFMLENBQVNNLElBQVQsS0FBa0IsUUFBbkQsS0FBZ0UsS0FBS04sR0FBTCxDQUFTSyxNQUFULENBQWdCRSxFQUFwRixFQUNJSixNQUFNQyxLQUFOLENBQVksS0FBS0osR0FBTCxDQUFTSyxNQUFULENBQWdCRyxFQUE1QixJQUFrQyxLQUFLUixHQUFMLENBQVNLLE1BQVQsQ0FBZ0JFLEVBQWxEO0FBQ0o7QUFDQTtBQUNBLGdCQUFJLEtBQUtQLEdBQUwsQ0FBU00sSUFBVCxLQUFrQixVQUFsQixJQUFnQyxLQUFLTixHQUFMLENBQVNLLE1BQVQsQ0FBZ0JJLFFBQXBELEVBQ0lOLE1BQU1PLE9BQU4sR0FBZ0IsS0FBS1YsR0FBTCxDQUFTSyxNQUFULENBQWdCSSxRQUFoQztBQUNKO0FBQ0EsZ0JBQUksS0FBS1QsR0FBTCxDQUFTSyxNQUFULENBQWdCTSxLQUFoQixJQUF5QixLQUFLWCxHQUFMLENBQVNZLEtBQVQsQ0FBZUMsRUFBNUMsRUFBZ0Q7QUFDNUNWLHNCQUFNQyxLQUFOLENBQVksS0FBS0osR0FBTCxDQUFTWSxLQUFULENBQWVDLEVBQTNCLElBQWlDLEVBQWpDO0FBQ0Esd0JBQVEsS0FBS2IsR0FBTCxDQUFTSyxNQUFULENBQWdCTSxLQUF4QjtBQUNJLHlCQUFLLFFBQUw7QUFDSVIsOEJBQU1DLEtBQU4sQ0FBWSxLQUFLSixHQUFMLENBQVNZLEtBQVQsQ0FBZUMsRUFBM0IsRUFBK0JDLEVBQS9CLEdBQW9DLHNCQUFPLEtBQUtkLEdBQUwsQ0FBU2UsWUFBaEIsRUFBOEJDLFFBQTlCLENBQXVDLEVBQXZDLEVBQTJDLE9BQTNDLEVBQW9EQyxNQUFwRCxFQUFwQztBQUNBO0FBQ0oseUJBQUssT0FBTDtBQUNJZCw4QkFBTUMsS0FBTixDQUFZLEtBQUtKLEdBQUwsQ0FBU1ksS0FBVCxDQUFlQyxFQUEzQixFQUErQkMsRUFBL0IsR0FBb0Msc0JBQU8sS0FBS2QsR0FBTCxDQUFTZSxZQUFoQixFQUE4QkMsUUFBOUIsQ0FBdUMsQ0FBdkMsRUFBMEMsTUFBMUMsRUFBa0RDLE1BQWxELEVBQXBDO0FBQ0E7QUFDSix5QkFBSyxRQUFMO0FBQ0lkLDhCQUFNQyxLQUFOLENBQVksS0FBS0osR0FBTCxDQUFTWSxLQUFULENBQWVDLEVBQTNCLEVBQStCQyxFQUEvQixHQUFvQyxzQkFBTyxLQUFLZCxHQUFMLENBQVNlLFlBQWhCLEVBQThCQyxRQUE5QixDQUF1QyxDQUF2QyxFQUEwQyxPQUExQyxFQUFtREMsTUFBbkQsRUFBcEM7QUFDQTtBQUNKLHlCQUFLLFNBQUw7QUFDSWQsOEJBQU1DLEtBQU4sQ0FBWSxLQUFLSixHQUFMLENBQVNZLEtBQVQsQ0FBZUMsRUFBM0IsRUFBK0JDLEVBQS9CLEdBQW9DLHNCQUFPLEtBQUtkLEdBQUwsQ0FBU2UsWUFBaEIsRUFBOEJDLFFBQTlCLENBQXVDLEVBQXZDLEVBQTJDLFFBQTNDLEVBQXFEQyxNQUFyRCxFQUFwQztBQUNBO0FBQ0oseUJBQUssUUFBTDtBQUNJZCw4QkFBTUMsS0FBTixDQUFZLEtBQUtKLEdBQUwsQ0FBU1ksS0FBVCxDQUFlQyxFQUEzQixFQUErQkMsRUFBL0IsR0FBb0Msc0JBQU8sS0FBS2QsR0FBTCxDQUFTZSxZQUFoQixFQUE4QkMsUUFBOUIsQ0FBdUMsQ0FBdkMsRUFBMEMsT0FBMUMsRUFBbURDLE1BQW5ELEVBQXBDO0FBQ0E7QUFDSix5QkFBSyxRQUFMO0FBQ0lkLDhCQUFNQyxLQUFOLENBQVksS0FBS0osR0FBTCxDQUFTWSxLQUFULENBQWVDLEVBQTNCLEVBQStCSyxHQUEvQixHQUFxQyxLQUFLbEIsR0FBTCxDQUFTSyxNQUFULENBQWdCYyxNQUFoQixDQUF1QkMsS0FBNUQ7QUFDQWpCLDhCQUFNQyxLQUFOLENBQVksS0FBS0osR0FBTCxDQUFTWSxLQUFULENBQWVDLEVBQTNCLEVBQStCUSxHQUEvQixHQUFxQyxLQUFLckIsR0FBTCxDQUFTSyxNQUFULENBQWdCYyxNQUFoQixDQUF1QkcsR0FBNUQ7QUFDQTtBQW5CUjtBQXFCSDtBQUNEO0FBQ0EsaUJBQUtwQixNQUFMLENBQVksSUFBWixFQUFrQkMsS0FBbEI7QUFDSDs7Ozs7a0JBaERnQkosWSIsImZpbGUiOiJxdWVyeS1idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG4vKipcclxuICogUXVlcnkgQnVpbGRlciBEZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuLyoqXHJcbiAqIEJ1aWxkcyBMb29wYmFjayBRdWVyeVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVlcnlCdWlsZGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogU2V0dGVyc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjdHgpIHsgdGhpcy5jdHggPSBjdHg7IH1cclxuICAgIG9uQ29tcGxldGUobmV4dCkgeyB0aGlzLmZpbmlzaCA9IG5leHQ7IHJldHVybiB0aGlzOyB9XHJcbiAgICAvKipcclxuICAgICAqIEJ1aWxkIFF1ZXJ5XHJcbiAgICAgKi9cclxuICAgIGJ1aWxkKCkge1xyXG4gICAgICAgIC8vIEJ1aWxkIHF1ZXJ5IG9iamVjdCBpbiBzY29wZVxyXG4gICAgICAgIGxldCBxdWVyeSA9IHt9O1xyXG4gICAgICAgIC8vIGxldHMgYWRkIGEgd2hlcmUgc3RhdGVtZW50XHJcbiAgICAgICAgcXVlcnkud2hlcmUgPSB0aGlzLmN0eC5wYXJhbXMud2hlcmUgfHwge307XHJcbiAgICAgICAgLy8gSWYgc3RhdCB0eXBlIGlzIHJlbGF0aW9uLCB0aGVuIHdlIHNldCB0aGUgcm9vdCBpZFxyXG4gICAgICAgIGlmICgodGhpcy5jdHgudHlwZSA9PT0gJ3JlbGF0aW9uJyB8fCB0aGlzLmN0eC50eXBlID09PSAnbmVzdGVkJykgJiYgdGhpcy5jdHgucGFyYW1zLmlkKVxyXG4gICAgICAgICAgICBxdWVyeS53aGVyZVt0aGlzLmN0eC5wYXJhbXMucGtdID0gdGhpcy5jdHgucGFyYW1zLmlkO1xyXG4gICAgICAgIC8vIHF1ZXJ5LndoZXJlW3RoaXMuY3R4Lk1vZGVsLnNldHRpbmdzLnJlbGF0aW9uc1t0aGlzLmN0eC5wYXJhbXMucmVsYXRpb25dLl0gPSB0aGlzLmN0eC5wYXJhbXMuaWQ7XHJcbiAgICAgICAgLy8gSWYgc3RhdCB0eXBlIGlzIHJlbGF0aW9uLCB0aGVuIHdlIHNldCB0aGUgcm9vdCBpZFxyXG4gICAgICAgIGlmICh0aGlzLmN0eC50eXBlID09PSAncmVsYXRpb24nICYmIHRoaXMuY3R4LnBhcmFtcy5yZWxhdGlvbilcclxuICAgICAgICAgICAgcXVlcnkuaW5jbHVkZSA9IHRoaXMuY3R4LnBhcmFtcy5yZWxhdGlvbjtcclxuICAgICAgICAvLyBTZXQgUmFuZ2VcclxuICAgICAgICBpZiAodGhpcy5jdHgucGFyYW1zLnJhbmdlICYmIHRoaXMuY3R4LmNvdW50Lm9uKSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5LndoZXJlW3RoaXMuY3R4LmNvdW50Lm9uXSA9IHt9O1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY3R4LnBhcmFtcy5yYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaG91cmx5JzpcclxuICAgICAgICAgICAgICAgICAgICBxdWVyeS53aGVyZVt0aGlzLmN0eC5jb3VudC5vbl0uZ3QgPSBtb21lbnQodGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdCgyNCwgJ2hvdXJzJykudG9EYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdkYWlseSc6XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkud2hlcmVbdGhpcy5jdHguY291bnQub25dLmd0ID0gbW9tZW50KHRoaXMuY3R4Lm5vd0lTT1N0cmluZykuc3VidHJhY3QoNywgJ2RheXMnKS50b0RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3dlZWtseSc6XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkud2hlcmVbdGhpcy5jdHguY291bnQub25dLmd0ID0gbW9tZW50KHRoaXMuY3R4Lm5vd0lTT1N0cmluZykuc3VidHJhY3QoNCwgJ3dlZWtzJykudG9EYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdtb250aGx5JzpcclxuICAgICAgICAgICAgICAgICAgICBxdWVyeS53aGVyZVt0aGlzLmN0eC5jb3VudC5vbl0uZ3QgPSBtb21lbnQodGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdCgxMiwgJ21vbnRocycpLnRvRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcmx5JzpcclxuICAgICAgICAgICAgICAgICAgICBxdWVyeS53aGVyZVt0aGlzLmN0eC5jb3VudC5vbl0uZ3QgPSBtb21lbnQodGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdCg1LCAneWVhcnMnKS50b0RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2N1c3RvbSc6XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkud2hlcmVbdGhpcy5jdHguY291bnQub25dLmd0ZSA9IHRoaXMuY3R4LnBhcmFtcy5jdXN0b20uc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkud2hlcmVbdGhpcy5jdHguY291bnQub25dLmx0ZSA9IHRoaXMuY3R4LnBhcmFtcy5jdXN0b20uZW5kO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJldHVybiByZXN1bHQgcXVlcnlcclxuICAgICAgICB0aGlzLmZpbmlzaChudWxsLCBxdWVyeSk7XHJcbiAgICB9XHJcbn0iXX0=
