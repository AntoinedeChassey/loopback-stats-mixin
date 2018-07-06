"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Builds Parameters object for dynamic remote method
 */
var AcceptBuilder = function () {
    /**
     * Setters
     */
    function AcceptBuilder(ctx) {
        (0, _classCallCheck3.default)(this, AcceptBuilder);
        this.ctx = ctx;
    }
    /**
     * Parse params according ctx type
     */


    (0, _createClass3.default)(AcceptBuilder, [{
        key: "build",
        value: function build() {
            var accepts = [];
            if (this.ctx.type === "relation" || this.ctx.type === "nested") accepts.push({ arg: 'id', type: 'string', required: true, description: this.ctx.Model.definition.name + ' ID' });
            if (this.ctx.type === "relation" && !this.ctx.relation) accepts.push({ arg: 'relation', type: 'string', required: true, description: 'Relationship name' });
            if (this.ctx.type === "nested") accepts.push({ arg: 'nested', type: 'string', required: true, description: 'Nested array property name' });
            accepts.push({ arg: 'range', type: 'string', required: true, description: 'hourly, daily, weekly, monthly, yearly, custom' });
            accepts.push({ arg: 'custom', type: 'object', required: false, description: '{"start": date, "end": date }' });
            accepts.push({ arg: 'where', type: 'object', description: 'where filter ' + (this.ctx.relation || this.ctx.nested || '') });
            accepts.push({ arg: 'groupBy', type: 'string', description: 'group by filter ' });
            return accepts;
        }
    }]);
    return AcceptBuilder;
}();

exports.default = AcceptBuilder;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2VwdC1idWlsZGVyLmpzIl0sIm5hbWVzIjpbIkFjY2VwdEJ1aWxkZXIiLCJjdHgiLCJhY2NlcHRzIiwidHlwZSIsInB1c2giLCJhcmciLCJyZXF1aXJlZCIsImRlc2NyaXB0aW9uIiwiTW9kZWwiLCJkZWZpbml0aW9uIiwibmFtZSIsInJlbGF0aW9uIiwibmVzdGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztJQUdxQkEsYTtBQUNqQjs7O0FBR0EsMkJBQVlDLEdBQVosRUFBaUI7QUFBQTtBQUFFLGFBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUFpQjtBQUNwQzs7Ozs7OztnQ0FHUTtBQUNKLGdCQUFJQyxVQUFVLEVBQWQ7QUFDQSxnQkFBSSxLQUFLRCxHQUFMLENBQVNFLElBQVQsS0FBa0IsVUFBbEIsSUFBZ0MsS0FBS0YsR0FBTCxDQUFTRSxJQUFULEtBQWtCLFFBQXRELEVBQ0lELFFBQVFFLElBQVIsQ0FBYSxFQUFFQyxLQUFLLElBQVAsRUFBYUYsTUFBTSxRQUFuQixFQUE2QkcsVUFBVSxJQUF2QyxFQUE2Q0MsYUFBYSxLQUFLTixHQUFMLENBQVNPLEtBQVQsQ0FBZUMsVUFBZixDQUEwQkMsSUFBMUIsR0FBaUMsS0FBM0YsRUFBYjtBQUNKLGdCQUFJLEtBQUtULEdBQUwsQ0FBU0UsSUFBVCxLQUFrQixVQUFsQixJQUFnQyxDQUFDLEtBQUtGLEdBQUwsQ0FBU1UsUUFBOUMsRUFDSVQsUUFBUUUsSUFBUixDQUFhLEVBQUVDLEtBQUssVUFBUCxFQUFtQkYsTUFBTSxRQUF6QixFQUFtQ0csVUFBVSxJQUE3QyxFQUFtREMsYUFBYSxtQkFBaEUsRUFBYjtBQUNKLGdCQUFJLEtBQUtOLEdBQUwsQ0FBU0UsSUFBVCxLQUFrQixRQUF0QixFQUNJRCxRQUFRRSxJQUFSLENBQWEsRUFBRUMsS0FBSyxRQUFQLEVBQWlCRixNQUFNLFFBQXZCLEVBQWlDRyxVQUFVLElBQTNDLEVBQWlEQyxhQUFhLDRCQUE5RCxFQUFiO0FBQ0pMLG9CQUFRRSxJQUFSLENBQWEsRUFBRUMsS0FBSyxPQUFQLEVBQWdCRixNQUFNLFFBQXRCLEVBQWdDRyxVQUFVLElBQTFDLEVBQWdEQyxhQUFhLGdEQUE3RCxFQUFiO0FBQ0FMLG9CQUFRRSxJQUFSLENBQWEsRUFBRUMsS0FBSyxRQUFQLEVBQWlCRixNQUFNLFFBQXZCLEVBQWlDRyxVQUFVLEtBQTNDLEVBQWtEQyxhQUFhLCtCQUEvRCxFQUFiO0FBQ0FMLG9CQUFRRSxJQUFSLENBQWEsRUFBRUMsS0FBSyxPQUFQLEVBQWdCRixNQUFNLFFBQXRCLEVBQWdDSSxhQUFhLG1CQUFtQixLQUFLTixHQUFMLENBQVNVLFFBQVQsSUFBcUIsS0FBS1YsR0FBTCxDQUFTVyxNQUE5QixJQUF3QyxFQUEzRCxDQUE3QyxFQUFiO0FBQ0FWLG9CQUFRRSxJQUFSLENBQWEsRUFBRUMsS0FBSyxTQUFQLEVBQWtCRixNQUFNLFFBQXhCLEVBQWtDSSxhQUFhLGtCQUEvQyxFQUFiO0FBQ0EsbUJBQU9MLE9BQVA7QUFDSDs7Ozs7a0JBckJnQkYsYSIsImZpbGUiOiJhY2NlcHQtYnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBCdWlsZHMgUGFyYW1ldGVycyBvYmplY3QgZm9yIGR5bmFtaWMgcmVtb3RlIG1ldGhvZFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjZXB0QnVpbGRlciB7XHJcbiAgICAvKipcclxuICAgICAqIFNldHRlcnNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY3R4KSB7IHRoaXMuY3R4ID0gY3R4OyB9XHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlIHBhcmFtcyBhY2NvcmRpbmcgY3R4IHR5cGVcclxuICAgICAqL1xyXG4gICAgYnVpbGQoKSB7XHJcbiAgICAgICAgbGV0IGFjY2VwdHMgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5jdHgudHlwZSA9PT0gXCJyZWxhdGlvblwiIHx8IHRoaXMuY3R4LnR5cGUgPT09IFwibmVzdGVkXCIpXHJcbiAgICAgICAgICAgIGFjY2VwdHMucHVzaCh7IGFyZzogJ2lkJywgdHlwZTogJ3N0cmluZycsIHJlcXVpcmVkOiB0cnVlLCBkZXNjcmlwdGlvbjogdGhpcy5jdHguTW9kZWwuZGVmaW5pdGlvbi5uYW1lICsgJyBJRCcgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuY3R4LnR5cGUgPT09IFwicmVsYXRpb25cIiAmJiAhdGhpcy5jdHgucmVsYXRpb24pXHJcbiAgICAgICAgICAgIGFjY2VwdHMucHVzaCh7IGFyZzogJ3JlbGF0aW9uJywgdHlwZTogJ3N0cmluZycsIHJlcXVpcmVkOiB0cnVlLCBkZXNjcmlwdGlvbjogJ1JlbGF0aW9uc2hpcCBuYW1lJyB9KTtcclxuICAgICAgICBpZiAodGhpcy5jdHgudHlwZSA9PT0gXCJuZXN0ZWRcIilcclxuICAgICAgICAgICAgYWNjZXB0cy5wdXNoKHsgYXJnOiAnbmVzdGVkJywgdHlwZTogJ3N0cmluZycsIHJlcXVpcmVkOiB0cnVlLCBkZXNjcmlwdGlvbjogJ05lc3RlZCBhcnJheSBwcm9wZXJ0eSBuYW1lJyB9KTtcclxuICAgICAgICBhY2NlcHRzLnB1c2goeyBhcmc6ICdyYW5nZScsIHR5cGU6ICdzdHJpbmcnLCByZXF1aXJlZDogdHJ1ZSwgZGVzY3JpcHRpb246ICdob3VybHksIGRhaWx5LCB3ZWVrbHksIG1vbnRobHksIHllYXJseSwgY3VzdG9tJyB9KTtcclxuICAgICAgICBhY2NlcHRzLnB1c2goeyBhcmc6ICdjdXN0b20nLCB0eXBlOiAnb2JqZWN0JywgcmVxdWlyZWQ6IGZhbHNlLCBkZXNjcmlwdGlvbjogJ3tcInN0YXJ0XCI6IGRhdGUsIFwiZW5kXCI6IGRhdGUgfScgfSk7XHJcbiAgICAgICAgYWNjZXB0cy5wdXNoKHsgYXJnOiAnd2hlcmUnLCB0eXBlOiAnb2JqZWN0JywgZGVzY3JpcHRpb246ICd3aGVyZSBmaWx0ZXIgJyArICh0aGlzLmN0eC5yZWxhdGlvbiB8fMKgdGhpcy5jdHgubmVzdGVkIHx8wqAnJykgfSk7XHJcbiAgICAgICAgYWNjZXB0cy5wdXNoKHsgYXJnOiAnZ3JvdXBCeScsIHR5cGU6ICdzdHJpbmcnLCBkZXNjcmlwdGlvbjogJ2dyb3VwIGJ5IGZpbHRlciAnIH0pO1xyXG4gICAgICAgIHJldHVybiBhY2NlcHRzO1xyXG4gICAgfVxyXG59Il19
