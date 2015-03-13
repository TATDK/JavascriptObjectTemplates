var assert = require('assert');
var util = require('util');
var JavascriptObjectTemplate = require('./index');

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
assert.strictEqual(util.isArray(testTemplate.get('array')), true, 'Template get array');
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

assert.strictEqual(testTemplate.get('object.newField'), undefined, 'Template set non-layout value');

testTemplate.merge({
    number: 5678,
    object: {
        field: 'newFieldValue',
        newField: 'ignoreThis'
    },
    newObject: {
        ignore: 'this'
    }
});

assert.strictEqual(testTemplate.get('number'), 5678, 'Template merge number');
assert.strictEqual(testTemplate.get('object.field'), 'newFieldValue', 'Template merge object.field');
assert.strictEqual(testTemplate.get('object.newField'), undefined, 'Template merge object.newField');
assert.strictEqual(testTemplate.get('newObject'), undefined, 'Template merge newObject');

assert.notStrictEqual(testTemplate, testTemplate.clone(), 'Template clone');
assert.deepEqual(testTemplate.getObject(), testTemplate.clone().getObject(), 'Template clone getObject');