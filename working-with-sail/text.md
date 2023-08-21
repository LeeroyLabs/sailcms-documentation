# Text <Badge type="tip" text="3.0.0" />

We know working with string is a pain sometimes, especially in French or other accented languages. For that specific 
reason, we provide a powerful class named `Text`.

To get the ball rolling, everything starts with the `from` method.

```php
$txt = Text::from('hello world');
```

Everything afterward can be daisy-chained.

:::warning
to be compatible will everything you need to end your use of Text with the `->value()` method. If you use the
stringable interface, this can be omitted.
:::

## General features

### length

Get the length of the string

### value

Get the string value after all methods have been executed on the string.

## Crypto

### hash

Hash string to any supported algorithm.

### sha1

Calculate sha1 hash of the string.

### sha256

Hash string using sha256 algorithm.

### sha512

Hash string using sha512 algorithm.

### md5

Calculate md5 hash of the string.

### encrypt

Encrypt string using SailCMS encryption feature.

### decrypt

Decrypt a string using SailCMS encryption feature.

### encode

Base64 encode the string

### decode

Base64 decode the string

### crc32

Calculate crc32 for the string

## Transforms

### plurialize

Plurialize the string. Normally, you should use this on a single word.

```php
Text::from('category')->pluralize()->value();
// Would generate "categories"
```

### singularize

Singularize the string. Normally, you should use this on a single word.

```php
Text::from('categories')->singularize()->value();
// Would generate "category"
```

### deburr

Remove all accents from a string.

```php
Text::From('éàîô')->deburr()->value();
// Would generate "eaio"
```

### lower

Change case of string to lower.

### upper

Change case of string to upper.

### capitalize

Capitalize the first letter of the sentence or each word.

```php
Text::from('hello world')->capitalize()->value();
// Would generate "Hello World"

Text::from('hello world')->capitalize(true)->value();
// Would generate "Hello world"
```

### kebab

Change every space in the string to a dash

```php
Text::from('hello world')->kebab()->value();
// Would generate "hello-world"
```

### slug

Transform string into a slug or url valid string.

```php
Text::From('Hello World Hè!')->slug()->value();
// Would generate "hello-world-he"
```

### camel

Transforms the string using camel case.

```php
Text::from('hello world')->camel()->value();
// Would generate "helloWorld"
```

### snake

Transforms the string using snake case.

```php
Text::from('hello world')->camel()->value();
// Would generate "hello-world"
```

### reverse

Reverses the string characters. For example `hello world` would become `dlrow olleh`.

### trim

Removes spaces and empty characters from both ends of the string.

### trimLeft

Removes spaces and empty characters from the left side of the string.

### trimRight

Removes spaces and empty characters from the right side of the string.

### hex

Transforms string into hexadecimal string. For example, `apple` would be `6170706c65`. You can use the `bin` method
to transform the string back.

### bin

Transform string from hexadecimal string to binary string. For example, `6170706c65` would be `apple`.

### binary

Transform text to binary format (1s and 0s). For example, `apple` would become `1100001 1110000 1110000 1101100 1100101`.
You can use the `text` method to turn binary to regular text.

### text

Transform text to normal text. For example, `1100001 1110000 1110000 1101100 1100101` would become `apple`.

### pad

Pad a string so the total length is the given length. You can pad using the character of your choice and in the direction
you want (left, right, both).

```php
Text::from('hello world')->pad(20, '!', STR_PAD_RIGHT)->value();
// Would generate "hello world!!!!!!!!!"
```

### replace

Replace one or many substrings in your string. It works exactly like `str_replace`. It offers support for case-sensitive
and case-insensitive replacement.

### shuffle

Shuffle the characters of the string around randomly.

### safe

Remove all dangerous characters from the string. (XSS prevents among other things). This method also removes all html
tags.

### stripTags

Remove all html tags from the string.

### split

Split the string by given separating character(s).

### explode

Alias for `split`.

### specialChars

Run a simpler version of the `safe` method.

### entities

Encoded the html entities in thes string.

### chunks

Split the string into chunks based on the given length for each chunk.

### format

Formats a string with given parameters. Think of `vsprintf` when using this method.

```php
Text::from('Hello %s', ['World'])->value();
// Would generate "Hello World"
```

### truncate

Truncates a string to the given length. Adds whatever end string to the string. By default, the end string is `...`.

:::info
Your string will be truncated to not be longer than the limit you set (including the end string)
:::

### safeTruncate

Truncates the string just like `truncate` but is aware of words. It will truncate to the closest full world before adding
the end string.

:::info
Your string might be a little less than your limit since word boundaries are respected.
:::

### basename

### url

### extension

### br

### nl

### censor

### concat

### merge

### with

### substr

### substring

## Utilities

### random

Generate a random string of given length

```php
Text::from()->random(10)->value(); 
// would generate something like "gSv4G10mE0"
```

### uuid

Generates a version 4 or 5 valid UUID string.

```php
Text::from()->uuid(4);
Text::from()->uuid(5, 'ba36d08b-0d1c-45e6-99d2-e7efe7d51381', 'yourname');
```

## Validators

### isEmail

Checks if string is a valid email address.

### isDomain

Checks if string is a valid domain.

### isURL

Checks if string is valid URL.

### isMacAddress

Checks if string is a valid mac address.

### isIP

Checks if string is a valid IP.

### isJSON

Checks if string is valid JSON.

:::warning
This method detects if the string is json but does not validate the json itself. In a subsequent version this will use
php 8.3's `json_validate` method.
:::

### isPostal

Checks if the string is a valid Canadian postal code.

### isZip

Checks if the string is a valid US Zip code.

### startsWith

Checks if the string starts with the given string.

### endsWith

Checks if the string ends with the given string.

### contains

Checks if string is found in the initial string.