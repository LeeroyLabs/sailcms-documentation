# Fields

The fields classes are used in the [Entry Layout](/cms/entries#entry-layout) structure the entry contents.
All fields have also some validation and parsing method to help with the content edition.

## Model Field

Those classes are used to define the data in the entry content. 
Each Model Field instance is stored in a collection that is passed to the [Generate Layout Schema](/cms/entries#generate-layout-schema) method. 

The Model Field has an `info` method that is accessible in GraphQL 
and return a FieldInfo data type to inform the users about the field.

```php
class FieldInfo
{
    public function __construct(
        public readonly string $name,
        public readonly string $fullname,
        public readonly string $handle,
        public readonly string $description,
        public readonly string $storingType,
        public readonly array  $inputs
    )
    {
    }
}
```

So, to extend the base Field class, you must define the `description` and `storingType` methods.

### Implemented model fields

#### Text Field

## Type Field

### Implemented type fields

#### Text Input Field