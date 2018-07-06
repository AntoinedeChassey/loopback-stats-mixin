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

var _typeBuilder = require('./type-builder');

var _typeBuilder2 = _interopRequireDefault(_typeBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Builds Statistic Array from List of Resuls
 */
/**
 * Stats Builder Dependencies
 */
var StatsBuilder = function () {
    function StatsBuilder(ctx) {
        (0, _classCallCheck3.default)(this, StatsBuilder);
        this.ctx = ctx;
    }

    (0, _createClass3.default)(StatsBuilder, [{
        key: 'process',
        value: function process(list) {
            var _this = this;

            this.list = list;
            if (this.ctx.params.groupBy && this.ctx.params.groupBy.length > 0) {
                var result = {};
                this.list.forEach(function (item) {
                    return result[item[_this.ctx.params.groupBy]] = _this.calculate(item[_this.ctx.params.groupBy]);
                });
                return result;
            } else {
                return this.calculate();
            }
        }
    }, {
        key: 'calculate',
        value: function calculate(group) {
            var dataset = [];
            var iterator = this.getIteratorCount();
            for (var i = 0, dateIndex = iterator; i <= iterator; i++, dateIndex--) {
                var current = this.getCurrentMoment(dateIndex);
                var count = this.getCurrentCount(current, group);
                dataset.push({
                    date: current.toISOString(),
                    universal: parseInt(current.format('x')),
                    count: count === 0 ? 0 : this.ctx.count.avg ? count / this.list.length : count
                });
            }
            return dataset;
        }
    }, {
        key: 'getCurrentCount',
        value: function getCurrentCount(current, group) {
            var _this2 = this;

            var count = 0;
            this.list.forEach(function (item) {
                if (group && item[_this2.ctx.params.groupBy] !== group) return;
                var itemDate = (0, _moment2.default)(item[_this2.ctx.count.on]);
                var itemFactor = _this2.getFactor(item);
                switch (_this2.ctx.params.range) {
                    case 'hourly':
                        if (current.isSame(itemDate, 'hour')) count = count + itemFactor;
                        break;
                    case 'daily':
                        if (current.isSame(itemDate, 'day')) count = count + itemFactor;
                        break;
                    case 'weekly':
                        if (current.isSame(itemDate, 'week')) count = count + itemFactor;
                        break;
                    case 'monthly':
                        if (current.isSame(itemDate, 'month')) count = count + itemFactor;
                        break;
                    case 'yearly':
                        if (current.isSame(itemDate, 'year')) count = count + itemFactor;
                        break;
                }
            });
            return count;
        }
    }, {
        key: 'getFactor',
        value: function getFactor(item) {
            var value = void 0;
            // When count by index, the factor will always be 1
            if (this.ctx.count.by === 'index') {
                value = 1;
            } else {
                // We get the value from the property, can be number or boolean
                // When number we set that value as factor, else we evaluate
                // the value depending on true/false value and this.ctx.count.as value
                if (this.ctx.count.by.match(/\./)) {
                    value = this.ctx.count.by.split('.').reduce(function (a, b) {
                        return a[b] ? a[b] : 0;
                    }, item);
                } else {
                    value = item[this.ctx.count.by];
                }
                // When value is boolean we set 0, 1 or this.ctx.count.as to set a value when true
                if (typeof value === 'boolean' && value === true) {
                    value = this.ctx.count.as ? this.ctx.count.as : 1;
                } else if (typeof value === 'boolean' && value === false) {
                    value = 0;
                }
            }
            // Make sure we send back a number
            return typeof value === 'number' ? value : parseInt(value);
        }
    }, {
        key: 'getCurrentMoment',
        value: function getCurrentMoment(index) {
            var current = void 0;
            switch (this.ctx.params.range) {
                case 'hourly':
                    current = (0, _moment2.default)(this.ctx.nowISOString).subtract(index, 'hours');
                    break;
                case 'daily':
                    current = (0, _moment2.default)(this.ctx.nowISOString).subtract(index, 'days');
                    break;
                case 'weekly':
                    current = (0, _moment2.default)(this.ctx.nowISOString).subtract(index, 'weeks');
                    break;
                case 'monthly':
                    current = (0, _moment2.default)(this.ctx.nowISOString).subtract(index, 'months');
                    break;
                case 'yearly':
                    current = (0, _moment2.default)(this.ctx.nowISOString).subtract(index, 'years');
                    break;
            }
            return current;
        }
    }, {
        key: 'getIteratorCount',
        value: function getIteratorCount() {
            var _this3 = this;

            var iterator = void 0;
            switch (this.ctx.params.range) {
                case 'hourly':
                    iterator = 24; // 24 hours
                    break;
                case 'daily':
                    iterator = 7; // seven days
                    break;
                case 'weekly':
                    iterator = 4; // 4 weeks
                    break;
                case 'monthly':
                    iterator = 12; // 12 months
                    break;
                case 'yearly':
                    iterator = 5; // 5 years
                    break;
                case 'custom':
                    var start = (0, _moment2.default)(this.ctx.params.custom.start);
                    var end = (0, _moment2.default)(this.ctx.params.custom.end);
                    iterator = 0;
                    ['hour', 'day', 'week', 'month', 'year'].forEach(function (item) {
                        var plural = [item, 's'].join('');
                        var diff = end.diff(start, plural);
                        if (diff > 1 && diff < 25) {
                            iterator = diff;
                            _this3.ctx.params.range = new _typeBuilder2.default(_this3.ctx).build();
                        }
                    });
                    break;
            }
            return iterator;
        }
    }]);
    return StatsBuilder;
}();

exports.default = StatsBuilder;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRzLWJ1aWxkZXIuanMiXSwibmFtZXMiOlsiU3RhdHNCdWlsZGVyIiwiY3R4IiwibGlzdCIsInBhcmFtcyIsImdyb3VwQnkiLCJsZW5ndGgiLCJyZXN1bHQiLCJmb3JFYWNoIiwiaXRlbSIsImNhbGN1bGF0ZSIsImdyb3VwIiwiZGF0YXNldCIsIml0ZXJhdG9yIiwiZ2V0SXRlcmF0b3JDb3VudCIsImkiLCJkYXRlSW5kZXgiLCJjdXJyZW50IiwiZ2V0Q3VycmVudE1vbWVudCIsImNvdW50IiwiZ2V0Q3VycmVudENvdW50IiwicHVzaCIsImRhdGUiLCJ0b0lTT1N0cmluZyIsInVuaXZlcnNhbCIsInBhcnNlSW50IiwiZm9ybWF0IiwiYXZnIiwiaXRlbURhdGUiLCJvbiIsIml0ZW1GYWN0b3IiLCJnZXRGYWN0b3IiLCJyYW5nZSIsImlzU2FtZSIsInZhbHVlIiwiYnkiLCJtYXRjaCIsInNwbGl0IiwicmVkdWNlIiwiYSIsImIiLCJhcyIsImluZGV4Iiwibm93SVNPU3RyaW5nIiwic3VidHJhY3QiLCJzdGFydCIsImN1c3RvbSIsImVuZCIsInBsdXJhbCIsImpvaW4iLCJkaWZmIiwiVHlwZUJ1aWxkZXIiLCJidWlsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7Ozs7QUFDQTs7O0FBTEE7OztJQVFxQkEsWTtBQUVqQiwwQkFBWUMsR0FBWixFQUFpQjtBQUFBO0FBQUUsYUFBS0EsR0FBTCxHQUFXQSxHQUFYO0FBQWlCOzs7O2dDQUU1QkMsSSxFQUFNO0FBQUE7O0FBQ1osaUJBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBLGdCQUFJLEtBQUtELEdBQUwsQ0FBU0UsTUFBVCxDQUFnQkMsT0FBaEIsSUFBMkIsS0FBS0gsR0FBTCxDQUFTRSxNQUFULENBQWdCQyxPQUFoQixDQUF3QkMsTUFBeEIsR0FBaUMsQ0FBaEUsRUFBbUU7QUFDakUsb0JBQUlDLFNBQVMsRUFBYjtBQUNBLHFCQUFLSixJQUFMLENBQVVLLE9BQVYsQ0FBa0I7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QWdCMEMsTUFBaEIsQ0FBdUJDLEdBQTlCLENBQVY7QUFDQWxDLCtCQUFXLENBQVg7QUFDQSxxQkFBQyxNQUFELEVBQVMsS0FBVCxFQUFnQixNQUFoQixFQUF3QixPQUF4QixFQUFnQyxNQUFoQyxFQUF3Q0wsT0FBeEMsQ0FBZ0QsZ0JBQVE7QUFDcEQsNEJBQUl3QyxTQUFTLENBQUN2QyxJQUFELEVBQU8sR0FBUCxFQUFZd0MsSUFBWixDQUFpQixFQUFqQixDQUFiO0FBQ0EsNEJBQUlDLE9BQVNILElBQUlHLElBQUosQ0FBU0wsS0FBVCxFQUFnQkcsTUFBaEIsQ0FBYjtBQUNBLDRCQUFJRSxPQUFPLENBQVAsSUFBWUEsT0FBTyxFQUF2QixFQUEyQjtBQUN2QnJDLHVDQUFXcUMsSUFBWDtBQUNBLG1DQUFLaEQsR0FBTCxDQUFTRSxNQUFULENBQWdCNEIsS0FBaEIsR0FBd0IsSUFBSW1CLHFCQUFKLENBQWdCLE9BQUtqRCxHQUFyQixFQUEwQmtELEtBQTFCLEVBQXhCO0FBQ0g7QUFDSixxQkFQRDtBQVFKO0FBNUJKO0FBOEJBLG1CQUFPdkMsUUFBUDtBQUNIOzs7OztrQkF6SWdCWixZIiwiZmlsZSI6InN0YXRzLWJ1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogU3RhdHMgQnVpbGRlciBEZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IFR5cGVCdWlsZGVyIGZyb20gJy4vdHlwZS1idWlsZGVyJztcclxuLyoqXHJcbiAqIEJ1aWxkcyBTdGF0aXN0aWMgQXJyYXkgZnJvbSBMaXN0IG9mIFJlc3Vsc1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHNCdWlsZGVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjdHgpIHsgdGhpcy5jdHggPSBjdHg7IH1cclxuICAgIFxyXG4gICAgcHJvY2VzcyhsaXN0KSB7XHJcbiAgICAgIHRoaXMubGlzdCA9IGxpc3Q7XHJcbiAgICAgIGlmICh0aGlzLmN0eC5wYXJhbXMuZ3JvdXBCeSAmJiB0aGlzLmN0eC5wYXJhbXMuZ3JvdXBCeS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9O1xyXG4gICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKGl0ZW0gPT4gKHJlc3VsdFtpdGVtW3RoaXMuY3R4LnBhcmFtcy5ncm91cEJ5XV0gPSB0aGlzLmNhbGN1bGF0ZShpdGVtW3RoaXMuY3R4LnBhcmFtcy5ncm91cEJ5XSkpKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGN1bGF0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlKGdyb3VwKSB7XHJcbiAgICAgICAgbGV0IGRhdGFzZXQgPSBbXTtcclxuICAgICAgICBsZXQgaXRlcmF0b3IgPSB0aGlzLmdldEl0ZXJhdG9yQ291bnQoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgZGF0ZUluZGV4ID0gaXRlcmF0b3I7IGkgPD0gaXRlcmF0b3I7IGkrKyAsIGRhdGVJbmRleC0tKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5nZXRDdXJyZW50TW9tZW50KGRhdGVJbmRleCk7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMuZ2V0Q3VycmVudENvdW50KGN1cnJlbnQsIGdyb3VwKTtcclxuICAgICAgICAgICAgZGF0YXNldC5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGRhdGU6IGN1cnJlbnQudG9JU09TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIHVuaXZlcnNhbDogcGFyc2VJbnQoY3VycmVudC5mb3JtYXQoJ3gnKSksXHJcbiAgICAgICAgICAgICAgICBjb3VudDogY291bnQgPT09IDAgPyAwIDogdGhpcy5jdHguY291bnQuYXZnID8gKGNvdW50IC8gdGhpcy5saXN0Lmxlbmd0aCkgOiBjb3VudFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGFzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudENvdW50KGN1cnJlbnQsIGdyb3VwKSB7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmxpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgaWYgKGdyb3VwICYmIGl0ZW1bdGhpcy5jdHgucGFyYW1zLmdyb3VwQnldICE9PSBncm91cCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgaXRlbURhdGUgPSBtb21lbnQoaXRlbVt0aGlzLmN0eC5jb3VudC5vbl0pO1xyXG4gICAgICAgICAgICBsZXQgaXRlbUZhY3RvciA9IHRoaXMuZ2V0RmFjdG9yKGl0ZW0pO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY3R4LnBhcmFtcy5yYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaG91cmx5JzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5pc1NhbWUoaXRlbURhdGUsICdob3VyJykpIGNvdW50ID0gY291bnQgKyBpdGVtRmFjdG9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZGFpbHknOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LmlzU2FtZShpdGVtRGF0ZSwgJ2RheScpKSBjb3VudCA9IGNvdW50ICsgaXRlbUZhY3RvcjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3dlZWtseSc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXNTYW1lKGl0ZW1EYXRlLCAnd2VlaycpKSBjb3VudCA9IGNvdW50ICsgaXRlbUZhY3RvcjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRobHknOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LmlzU2FtZShpdGVtRGF0ZSwgJ21vbnRoJykpIGNvdW50ID0gY291bnQgKyBpdGVtRmFjdG9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcmx5JzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5pc1NhbWUoaXRlbURhdGUsICd5ZWFyJykpIGNvdW50ID0gY291bnQgKyBpdGVtRmFjdG9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEZhY3RvcihpdGVtKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlO1xyXG4gICAgICAgIC8vIFdoZW4gY291bnQgYnkgaW5kZXgsIHRoZSBmYWN0b3Igd2lsbCBhbHdheXMgYmUgMVxyXG4gICAgICAgIGlmICh0aGlzLmN0eC5jb3VudC5ieSA9PT0gJ2luZGV4JykgwqB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBXZSBnZXQgdGhlIHZhbHVlIGZyb20gdGhlIHByb3BlcnR5LCBjYW4gYmUgbnVtYmVyIG9yIGJvb2xlYW5cclxuICAgICAgICAgICAgLy8gV2hlbiBudW1iZXIgd2Ugc2V0IHRoYXQgdmFsdWUgYXMgZmFjdG9yLCBlbHNlIHdlIGV2YWx1YXRlXHJcbiAgICAgICAgICAgIC8vIHRoZSB2YWx1ZSBkZXBlbmRpbmcgb24gdHJ1ZS9mYWxzZSB2YWx1ZSBhbmQgdGhpcy5jdHguY291bnQuYXMgdmFsdWVcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3R4LmNvdW50LmJ5Lm1hdGNoKC9cXC4vKSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmN0eC5jb3VudC5ieS5zcGxpdCgnLicpLnJlZHVjZSgoYSwgYikgPT4gYVtiXSA/IGFbYl0gOiAwLCBpdGVtKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gaXRlbVt0aGlzLmN0eC5jb3VudC5ieV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gV2hlbiB2YWx1ZSBpcyBib29sZWFuIHdlIHNldCAwLCAxIG9yIHRoaXMuY3R4LmNvdW50LmFzIHRvIHNldCBhIHZhbHVlIHdoZW4gdHJ1ZVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgJiYgdmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5jdHguY291bnQuYXMgPyB0aGlzLmN0eC5jb3VudC5hcyA6IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgJiYgdmFsdWUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIHNlbmQgYmFjayBhIG51bWJlclxyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gdmFsdWUgOiBwYXJzZUludCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudE1vbWVudChpbmRleCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50O1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jdHgucGFyYW1zLnJhbmdlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hvdXJseSc6XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW9tZW50KHRoaXMuY3R4Lm5vd0lTT1N0cmluZykuc3VidHJhY3QoaW5kZXgsICdob3VycycpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RhaWx5JzpcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtb21lbnQodGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdChpbmRleCwgJ2RheXMnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd3ZWVrbHknOlxyXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG1vbWVudCh0aGlzLmN0eC5ub3dJU09TdHJpbmcpLnN1YnRyYWN0KGluZGV4LCAnd2Vla3MnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtb250aGx5JzpcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtb21lbnQodGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdChpbmRleCwgJ21vbnRocycpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3llYXJseSc6XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW9tZW50KHRoaXMuY3R4Lm5vd0lTT1N0cmluZykuc3VidHJhY3QoaW5kZXgsICd5ZWFycycpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjdXJyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZXJhdG9yQ291bnQoKSB7XHJcbiAgICAgICAgbGV0IGl0ZXJhdG9yO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jdHgucGFyYW1zLnJhbmdlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hvdXJseSc6XHJcbiAgICAgICAgICAgICAgICBpdGVyYXRvciA9IDI0OyAvLyAyNCBob3Vyc1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RhaWx5JzpcclxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gNzsgLy8gc2V2ZW4gZGF5c1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3dlZWtseSc6XHJcbiAgICAgICAgICAgICAgICBpdGVyYXRvciA9IDQ7IC8vIDQgd2Vla3NcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtb250aGx5JzpcclxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gMTI7IC8vIDEyIG1vbnRoc1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3llYXJseSc6XHJcbiAgICAgICAgICAgICAgICBpdGVyYXRvciA9IDU7IC8vIDUgeWVhcnNcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdjdXN0b20nOlxyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gbW9tZW50KHRoaXMuY3R4LnBhcmFtcy5jdXN0b20uc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZCA9IG1vbWVudCh0aGlzLmN0eC5wYXJhbXMuY3VzdG9tLmVuZCk7XHJcbiAgICAgICAgICAgICAgICBpdGVyYXRvciA9IDA7XHJcbiAgICAgICAgICAgICAgICBbJ2hvdXInLCAnZGF5JywgJ3dlZWsnLCAnbW9udGgnLCd5ZWFyJ10uZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGx1cmFsID0gW2l0ZW0sICdzJ10uam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZmYgICA9IGVuZC5kaWZmKHN0YXJ0LCBwbHVyYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaWZmID4gMSAmJiBkaWZmIDwgMjUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlcmF0b3IgPSBkaWZmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5wYXJhbXMucmFuZ2UgPSBuZXcgVHlwZUJ1aWxkZXIodGhpcy5jdHgpLmJ1aWxkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXRlcmF0b3I7XHJcbiAgICB9XHJcbn1cclxuIl19
