var util = require('util');
var assert = require('assert');

module.exports = function(parentType, subTypeName, defaultErrorCode) {
	assert(subTypeName, 'subTypeName is required');
	
	//define new error type
	
	var SubType = (function(message, code) {
		//handle constructor call without 'new'
		if (! (this instanceof SubType)) {
			return new SubType(message);
		}
		
		//populate error details
		this.name = subTypeName; 
		this.code = code !== undefined ? code : defaultErrorCode;
		this.message = message || '';
		
		//include stack trace in error object
		Error.captureStackTrace(this, this.constructor);
	});
	
	//inherit the base prototype chain
	util.inherits(SubType, parentType);
	
	
	//override the toString method to error type name and inspected message (to expand objects)
	SubType.prototype.toString = function() {
		return this.name + ': ' + util.inspect(this.message);
	};
	
	return SubType;
};

