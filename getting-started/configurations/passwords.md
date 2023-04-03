# Passwords

This categories sets the security rules for all passwords in the cms.

<Br/>

defaults:
```php
'passwords' => [
    'minLength' => 8,
    'maxLength' => 64,
    'enforceAlphanum' => true,
    'enforceUpperLower' => true,
    'enforceSpecialChars' => true
]
```

## minLength & maxLength

The minimum and maximum length of a password. This should never be set to lower than 8.

## enforceAlphanum

Force user to have alpha and numeric characters in the password.

## enforceUpperLower

Force user to have at least 1 uppercase and 1 lowercase character in the password.

## enforceSpecialChars

Force user to have a least 1 special character in the password.