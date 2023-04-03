# Fields <Badge type="tip" text="3.0.0" />

The fields classes help structure the entry contents and the entry forms.
All fields have validation _and parsing_ method to help with the content edition. 

::: info 
Fields are not stored directly in the database: they are passed through the [Entry Layout](/cms/entries#entry-layout).  
:::
> 
## Model Field

This class is used to define the data in the entry content. 
A Model Field contains its own settings, and it is stored in a collection through the [Generate Layout Schema](/cms/entries#generate-layout-schema) method.

The property of a Model Field are `labels`, `handle`, `baseConfigs` and `configs`:

- The **labels** property is a LocaleField to identify the field in the admin panel.
- The **handle** is created from the class name. 
There is a validation in the constructor to avoid duplicate handle from your custom fields.
- The **baseConfigs** property is a Collection that contains the [Input Field](#input-field) for your field.
It's used to instantiate the settings of your fields.
- The **configs** property is actually the Collection of field instances with all the parameters that you need in your entry content.

::: info
Because the `configs` property is a Collection, it allows to create data structure easily. 
:::

For example, your custom field could contain different [Input Field](#input-field) to represent a block a content.
```php
...

    public function defaultSettings(): Collection
    {
        return new Collection([
            "blockTitle" => InputTextField::defaultSettings()
            "blockDescription" => InputTextareaField::defaultSettings(true)
        ]);
    }
    
    protected function defineBaseConfigs(): void
    {
        $this->baseConfigs = new Collection([
            "blockTitle" => InputTextField::class
            "blockDescription" => InputTextareaField::class
        ]);
    }

...
```

On this point, this example shows two methods that a child of **SailCMS\Models\Entry\Field** must define. 
There is also the `validate` method that should be created to extend the basic validation done by the [Input Field](#input-field).

```php
...

    protected function validate(mixed $content): ?Collection
    {
        // Nothing to validate
        return null;
    }
...
```

For example, you could want that either the blockTitle or the blockDescription are required :
```php
...

    protected function validate(mixed $content): ?Collection
    {
        $errors = new Collection();

        if (!$content->get('blockTitle') && !$content->get('blockDescription')) {
            $errors->push('You must set at least blockTitle or blockDescription');
        }

        return $errors;
    }
...
```

At last, the Model Field has an `info` method that returns a FieldInfo data type to inform the users about the field.
So, to extend the base Field class, you must also define the `description` and `storingType` methods.
To access all the info fields, there is a GraphQL call that you can use:

```graphql
type Query {
    fields(locale: String): [FieldInfo]
}
    
type FieldInfo {
    name: String!
    fullname: String!
    handle: String!
    description: String!
    storingType: String!
    inputs: [FieldInputInfo]!
}

type FieldInputInfo {
    name: String!
    fullname: String!
    type: String!
    availableSettings: [InputSettings!]!
}

type InputSettings {
    name: String!
    value: String
    choices: [String]
    type: String!
}
```

While the description is only a *string*, the storing type is based on this `enum` :
```php
enum StoringType: string
{
    case INTEGER = 'integer';
    case FLOAT = 'float';
    case STRING = 'string';
    case BOOLEAN = 'boolean';
    case ARRAY = 'array';
}
```

### Adding a custom fields to the list of available fields

After the **SailCMS\Model\Fields\Field** class has been extended, the custom class must be added to the container via the fields methods using in `info` method :

```php
class Container extends AppContainer
{
    ...

    public function fields(): Collection
    {
        return new Collection([
            HeaderBlockField::info()
        ]);
    }
}
```

### Implemented model fields

#### Text Field

This field is the base of the majority of your content. 
You can use it for a title, subtitle and so on...
Its configs contain only a [Text Input Field](#text-input-field).
There is no extra validation for it.

#### Textarea Field

This field is for simple text with line return. 
This is a child of Text Field, the only difference is that the `multiline` flag of the [Text Input Field](#text-input-field) is *true*.
There is no extra validation for it.

#### Number Field

This field is for numbers in your content.
The particularity of this field is that you can set the `precision` value in the *constructor* with the last parameter.
```php
$numberFieldFloat = new NumberField(
    (object)['en' => 'Float', 'fr' => 'Flottant'], [
    [
        'required' => true,
        'min' => 0.03
    ]
 ], 2);
```
According to the *precision* value, his `storingType` will change from *integer* to *float*.
Additionally, the `step` parameter of the input, will be set accordingly.
So, its configs contain only a [Number Input Field](#number-input-field).
There is no extra validation for it.

## Input Field

The use of input fields is to represent html inputs and his attributes to make the content form of an [Entry](/cms/entries#entry).

For each field class, the properties match according to the html attributes needed for the input or DOM element.
However, the `labels` and `required` properties are always needed :
- The **labels** property is a LocaleField to retrieve the fields in the content form.
- The **required** property is used in the [Model Field](#model-field) method called `isRequired()`.

As with the Model Field, there is methods to create when you want to inherit from the base class:
- The `defaultSettings` method is obviously where the default values of your properties are sets.
- The `availableProperties` method is a Collection of the properties that must use the InputSetting type.
```php
public static function availableProperties(): Collection
{
    return new Collection([
        new InputSettings('required', InputSettings::INPUT_TYPE_CHECKBOX),
        new InputSettings('maxLength', InputSettings::INPUT_TYPE_NUMBER),
        new InputSettings('minLength', InputSettings::INPUT_TYPE_NUMBER),
        new InputSettings('pattern', InputSettings::INPUT_TYPE_REGEX),
        new InputSettings('multiline', InputSettings::INPUT_TYPE_CHECKBOX),
    ]);
}
```
- The `storingType` method return the type of field to be able to decoded it in the content.
- The `validate` method is where all the validation of the input is done for the back-end. 
Its musts return a Collection of error strings.
- The `toDBObject` method is used when the [Entry Layout](/cms/entries#entry-layout) generate the schema to store it.

::: warning
For efficiency, all the html attributes of your input must be grouped in an array named settings.
Otherwise, your settings will not be stored in the database nor returned in the GraphQL calls.
:::

```php
public function toDBObject(): stdClass
{
    return (object)[
        'labels' => $this->labels->toDBObject(),
        'settings' => [
            'required' => $this->required,
            'maxLength' => $this->maxLength,
            'minLength' => $this->minLength,
            'pattern' => $this->pattern,
            'multiline' => $this->multiline,
        ]
    ];
}
```

### Implemented input fields

TODO?

#### Text Input Field

This input field is used to represent a text input or a textarea.

The properties of the Text Input are:
- The `maxLength` and `minLength` attributes to restrict the length of the value.
- The `pattern` attribute, a *regex* to put some format validation on the value.
- The `multiline` attribute to specify if the value must live in a text input or a textarea.
At the same time as taking care of line returns.

The `storingType` is obviously a *string*.

#### Number Input Field

This input field is used to represent a number input.

The properties of the Number Input are:
- The `min` and `max` attributes to set the range of possible number.
- The `step` attribute to help the user to increment the input value easily.
At the same time as representing a float or an integer. 
Indeed, if the step contains decimals, it will become a float.

::: info
By default, the **Number Input Field** does not accept negative value, you have to set the `min` property to a negative number in way to achieve that.
:::
The `storingType` is float or an integer according to the `step` attribute.

::: info
The `step` property is automatically sets according the `precision` value of the [Number Field](#number-field).
:::