# Fields

The fields classes help structure the entry contents and the entry forms.
All fields have validation _and parsing_ method to help with the content edition. 

> **Note**  
> Fields are not stored directly in the database: they are passed through the [Entry Layout](/cms/entries#entry-layout).  

## Model Field

This class is used to define the data in the entry content. 
A Model Field contains its own settings, and it is stored in a collection through the [Generate Layout Schema](/cms/entries#generate-layout-schema) method.

The property of a Model Field are `labels`, `handle`, `baseConfigs` and `configs`:

- The **labels** property is a LocaleField to identify the field in the admin panel.
- The **handle** is created from the class name. 
There is a validation in the constructor to avoid duplicate handle from your custom fields.
- The **baseConfigs** property is a Collection that contains the [Type Field](#type-field) for your field.
It's used to instantiate the settings of your fields.
- The **configs** property is actually the Collection of field instances with all the parameters that you need in your entry content.

> **Note**  
> Because the `configs` property is a Collection, it allows to create data structure easily. 

[//]: # (TODO NEED TO TEST THAT)
For example, your custom field could contain different [Type Field](#type-field) to represent a block a content.
```php
...

    public function defaultSettings(): Collection
    {
        return new Collection([
            "blockTitle" => InputTextField::defaultSettings()
            "blockDescription" => InputTextareaField::defaultSettings()
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
There is also the `validate` method that should be created to extend the basic validation done by the [Type Fields](#type-field).

```php
...

    protected function validate(mixed $content): ?Collection
    {
        // Nothing to validate
        return null;
    }
...
```

[//]: # (TODO NEED TO DO THAT)
For example, you could want that either the blockTitle or the blockDescription are required :
```php
...

    protected function validate(mixed $content): ?Collection
    {
        // Nothing to validate
        return null;
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

[//]: # (TODO registering fields)

### Implemented model fields

#### Text Fieldconfiguration

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
The particularity of this field is that you can set the `precision` value in the *constructor*.
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

## Type Field

### Implemented type fields

#### Text Input Field

#### Number Input Field