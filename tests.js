//noinspection JSUnusedGlobalSymbols
var assert = require('assert');
//noinspection JSUnusedGlobalSymbols
var JavascriptObjectTemplate = require('./index');

//noinspection JSUnusedGlobalSymbols
var testTemplate = new JavascriptObjectTemplate({
    number: 1234,
    string: 'string',
    boolean: true,
    array: [],
    object: {
        field: 'value'
    },
    multiple: null
});

assert.notEqual(testTemplate, null, 'Template is null');

assert.strictEqual(testTemplate.get('number'), 1234, 'Template get number');
assert.strictEqual(testTemplate.get('string'), 'string', 'Template get string');
assert.strictEqual(testTemplate.get('boolean'), true, 'Template get boolean');
assert.strictEqual(typeof testTemplate.get('array'), 'object', 'Template get array type');
assert.strictEqual(testTemplate.get('array').length, 0, 'Template get array length');
assert.strictEqual(testTemplate.get('object.field'), 'value', 'Template get object');

testTemplate.set('object.field', 'newValue');

assert.strictEqual(testTemplate.get('object.field'), 'newValue', 'Template set layout value');

testTemplate.set('string', 1);

assert.strictEqual(testTemplate.get('string'), 'string', 'Template set layout value (wrong type)');

assert.strictEqual(testTemplate.get('multiple'), null, 'Template get layout value (multiple types)');

testTemplate.set('multiple', 1);

assert.strictEqual(testTemplate.get('multiple'), 1, 'Template set layout value (multiple types)');

testTemplate.set('multiple', 'string');

assert.strictEqual(testTemplate.get('multiple'), 'string', 'Template set layout value (multiple types)');

testTemplate.set('object.newField', 'newValue');

assert.strictEqual(testTemplate.get('object.newField'), null, 'Template set non-layout value');