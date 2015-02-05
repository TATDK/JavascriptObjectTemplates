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
    multipleValues: null
});
```

### get(selector)

### set(selector, value)

### merge(object)

### toObject()

### reset()
