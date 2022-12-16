# Text

We know working with string is a pain sometimes, especially in French or other accented languages. For that specific 
reason, we provide a nice little set of apis to handle transforming strings.

## deburr

Deburr takes your string and removes all accents from it.

## kebabCase

kebabCase transforms a string like "this is my string" to "this-is-my-string".

## slugify

Slugify is a mix of deburr and kebabcase together but it also transforms `&` into `and` or `et` depending on the current
locale, it also removes all slashes and characters that are not valid in a URL.

## camelCase

camelCase transforms a string like "this is my string" to "thisIsMyString".

## snakeCase

snakCase transforms a string like "this is my string" to "this_is_my_string".

## plurialize

This will singularize the string given (using the given locale) and return all the possibilities for the plural version 
of the word.

for example:

```php
Text::pluralize('person', 'en');
// The above call returns ['persons', 'people']
```

## singularize

This will singularize the string given (using the given locale) and return all the possibilities for the singular 
version of the word.

For example:

```php
Text::pluralizeFirst('leaves', 'en'); 
// The above call returns ['leaf', 'leave', 'leaff']
```

## Note

This Api also offers 1 other method that give you access to the underlying api from `Symfony\Component\String\UnicodeString`.
This gives you the ability to build your own powerful text management code to perform any type of task you need to 
perform on text.

## instance

Returns an instance of the UnicodeString class.