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

snakeCase transforms a string like "this is my string" to "this_is_my_string".

## plurialize

This will try to pluralize the given string.

## singularize

This will try to singularize the given string.