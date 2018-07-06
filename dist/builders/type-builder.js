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
      var type = this.ctx.params.range;
      if (this.ctx.params.range === 'custom') {
        var start = (0, _moment2.default)(this.ctx.params.custom.start);
        var end = (0, _moment2.default)(this.ctx.params.custom.end);
        ['hour', 'day', 'week', 'month', 'year'].forEach(function (item) {
          var plural = [item, 's'].join('');
          var diff = end.diff(start, plural);
          if (diff > 1 && diff < 25) {
            type = item === 'week' ? end.diff(start, 'days') : diff;
            switch (item) {
              case 'hour':
                type = 'hourly';break;
              case 'day':
                type = 'daily';break;
              case 'week':
                type = 'weekly';break;
              case 'month':
                type = 'monthly';break;
              case 'year':
                type = 'yearly';break;
            }
          }
        });
      }
      return type;
    }
  }]);
  return NowBuilder;
}(); /**
      * Stats Builder Dependencies
      */


exports.default = NowBuilder;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGUtYnVpbGRlci5qcyJdLCJuYW1lcyI6WyJOb3dCdWlsZGVyIiwiY3R4IiwidHlwZSIsInBhcmFtcyIsInJhbmdlIiwic3RhcnQiLCJjdXN0b20iLCJlbmQiLCJmb3JFYWNoIiwicGx1cmFsIiwiaXRlbSIsImpvaW4iLCJkaWZmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUdBOzs7Ozs7QUFDQTs7O0lBR3FCQSxVO0FBRW5CLHNCQUFZQyxHQUFaLEVBQWlCO0FBQUE7QUFBRSxTQUFLQSxHQUFMLEdBQVdBLEdBQVg7QUFBaUI7Ozs7NEJBRTVCO0FBQ04sVUFBSUMsT0FBTyxLQUFLRCxHQUFMLENBQVNFLE1BQVQsQ0FBZ0JDLEtBQTNCO0FBQ0EsVUFBSSxLQUFLSCxHQUFMLENBQVNFLE1BQVQsQ0FBZ0JDLEtBQWhCLEtBQTBCLFFBQTlCLEVBQXdDO0FBQ3RDLFlBQUlDLFFBQVEsc0JBQU8sS0FBS0osR0FBTCxDQUFTRSxNQUFULENBQWdCRyxNQUFoQixDQUF1QkQsS0FBOUIsQ0FBWjtBQUNBLFlBQUlFLE1BQU0sc0JBQU8sS0FBS04sR0FBTCxDQUFTRSxNQUFULENBQWdCRyxNQUFoQixDQUF1QkMsR0FBOUIsQ0FBVjtBQUNBLFNBQUMsTUFBRCxFQUFTLEtBQVQsRUFBZ0IsTUFBaEIsRUFBd0IsT0FBeEIsRUFBaUMsTUFBakMsRUFBeUNDLE9BQXpDLENBQWlELGdCQUFRO0FBQ3ZELGNBQUlDLFNBQVMsQ0FBQ0MsSUFBRCxFQUFPLEdBQVAsRUFBWUMsSUFBWixDQUFpQixFQUFqQixDQUFiO0FBQ0EsY0FBSUMsT0FBT0wsSUFBSUssSUFBSixDQUFTUCxLQUFULEVBQWdCSSxNQUFoQixDQUFYO0FBQ0EsY0FBSUcsT0FBTyxDQUFQLElBQVlBLE9BQU8sRUFBdkIsRUFBMkI7QUFDekJWLG1CQUFPUSxTQUFTLE1BQVQsR0FBa0JILElBQUlLLElBQUosQ0FBU1AsS0FBVCxFQUFnQixNQUFoQixDQUFsQixHQUE0Q08sSUFBbkQ7QUFDQSxvQkFBUUYsSUFBUjtBQUNFLG1CQUFLLE1BQUw7QUFBYVIsdUJBQU8sUUFBUCxDQUFpQjtBQUM5QixtQkFBSyxLQUFMO0FBQVlBLHVCQUFPLE9BQVAsQ0FBZ0I7QUFDNUIsbUJBQUssTUFBTDtBQUFhQSx1QkFBTyxRQUFQLENBQWlCO0FBQzlCLG1CQUFLLE9BQUw7QUFBY0EsdUJBQU8sU0FBUCxDQUFrQjtBQUNoQyxtQkFBSyxNQUFMO0FBQWFBLHVCQUFPLFFBQVAsQ0FBaUI7QUFMaEM7QUFPRDtBQUNGLFNBYkQ7QUFjRDtBQUNELGFBQU9BLElBQVA7QUFDRDs7O0tBaENIOzs7OztrQkFPcUJGLFUiLCJmaWxlIjoidHlwZS1idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFN0YXRzIEJ1aWxkZXIgRGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbi8qKlxyXG4gKiBCdWlsZHMgTm93IFRpbWUgTW9tZW50XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3dCdWlsZGVyIHtcclxuXHJcbiAgY29uc3RydWN0b3IoY3R4KSB7IHRoaXMuY3R4ID0gY3R4OyB9XHJcblxyXG4gIGJ1aWxkKCkge1xyXG4gICAgbGV0IHR5cGUgPSB0aGlzLmN0eC5wYXJhbXMucmFuZ2U7XHJcbiAgICBpZiAodGhpcy5jdHgucGFyYW1zLnJhbmdlID09PSAnY3VzdG9tJykge1xyXG4gICAgICBsZXQgc3RhcnQgPSBtb21lbnQodGhpcy5jdHgucGFyYW1zLmN1c3RvbS5zdGFydCk7XHJcbiAgICAgIGxldCBlbmQgPSBtb21lbnQodGhpcy5jdHgucGFyYW1zLmN1c3RvbS5lbmQpO1xyXG4gICAgICBbJ2hvdXInLCAnZGF5JywgJ3dlZWsnLCAnbW9udGgnLCAneWVhciddLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgbGV0IHBsdXJhbCA9IFtpdGVtLCAncyddLmpvaW4oJycpO1xyXG4gICAgICAgIGxldCBkaWZmID0gZW5kLmRpZmYoc3RhcnQsIHBsdXJhbCk7XHJcbiAgICAgICAgaWYgKGRpZmYgPiAxICYmIGRpZmYgPCAyNSkge1xyXG4gICAgICAgICAgdHlwZSA9IGl0ZW0gPT09ICd3ZWVrJyA/IGVuZC5kaWZmKHN0YXJ0LCAnZGF5cycpIDogZGlmZjtcclxuICAgICAgICAgIHN3aXRjaCAoaXRlbSkge1xyXG4gICAgICAgICAgICBjYXNlICdob3VyJzogdHlwZSA9ICdob3VybHknOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZGF5JzogdHlwZSA9ICdkYWlseSc7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd3ZWVrJzogdHlwZSA9ICd3ZWVrbHknOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbW9udGgnOiB0eXBlID0gJ21vbnRobHknOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAneWVhcic6IHR5cGUgPSAneWVhcmx5JzsgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0eXBlO1xyXG4gIH1cclxufVxyXG4iXX0=
