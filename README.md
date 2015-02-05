# JavascriptObjectTemplates
Templates for Javascript Objects

## How to use?
Create a template using a layout object describing the type and default value.
If the default value is null, then the field can be of any type.

```javascript
var JOT = require('JavascriptObjectTemplates');

// Create new template
var template = new JOT({
    myString: 'myStringValue',
    myNumber: 1234
    multipleValues: null,
    subObject: {
        subNumber: 5678
    }
});
```
**Note:** This will be foundation for all following examples.

### get(selector)
Get a value from the template.

```javascript
template.get('myString'); // 'myStringValue'
template.get('myNumber'); // 1234
template.get('subObject.subNumber'); // 5678
```

### set(selector, value)
Set a value to the template.

**Note:** Only accepts same type unless it's default value was null.

```javascript
template.set('myString', 'myNewStringValue'); // true
template.get('myString'); // 'myNewStringValue'

template.set('myString', 1234); // false (because the type is different)
template.get('myString'); // 'myNewStringValue'

template.set('myBoolean', true); // false (because the field isn't defined in layout)
```

### merge(object)
Set multiple values from an object.

```javascript
template.get('myString'); // 'myStringValue'
template.get('myNumber'); // 1234

template.merge({
    myString: 'myObjectStringValue',
    myNumber: 'example',
    myBoolean: false,
    subObject: {
        subNumber: 0
    }
});

template.get('myString'); // 'myObjectStringValue'
template.get('myNumber'); // 1234 (because the type is different)
template.get('myBoolean'); // undefined (because the field isn't defined in layout)
template.get('subObject.subNumber'); // 0
```

### getObject()
Get the template as object.

Can be used together with `reset()` to allow the template to be used multiple times.

```javascript
template.set('myString', 'myNewStringValue');
template.set('myNumber', 5678); // false (because the type is different)

template.getObject();
/*
{
    myString: 'myNewStringValue',
    myNumber: 5678
    multipleValues: null,
    subObject: {
        subNumber: 5678
    }
}
*/
```

### reset()
Resets the template back to default values.

Can be used together with `getObject()` to allow the template to be used multiple times.

```javascript
template.set('myString', 'myNewStringValue');
template.set('myNumber', 5678); // false (because the type is different)

template.getObject();
/*
{
    myString: 'myNewStringValue',
    myNumber: 5678
    multipleValues: null,
    subObject: {
        subNumber: 5678
    }
}
*/

template.reset();

template.getObject();
/*
{
    myString: 'myStringValue',
    myNumber: 1234
    multipleValues: null,
    subObject: {
        subNumber: 5678
    }
}
*/
```