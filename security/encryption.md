# Encryption <Badge type="tip" text="3.0.0" />

SailCMS offers tooling for easy and secure encryption. When running SailCMS for the first time, a secure key will be 
created. This key must not be pushed to git. 

You can easily encrypt and decrypt content using the `encrypt` and `decrypt` methods. You don't need to do anything but
bring your content to encrypt/decrypt. This library also offers hashing and hashing verification methods. It also provides
the recommended way to secure passwords in php.

## Hashing and Validating

```php
// Hash a value
$hashed = Security::hash('your value', false); // No extra salt
$salted = Security::hash('other value', true); // salted version

// Validate it
$validate1 = Security::valueMatchHash($hashed, 'your value'); // true
$validate2 = Security::valueMatchHash($salted, 'your value'); // false
```

Note that `valueMatchHash` can detect it's own salted hashes. If it detects that the hash is salted, it will adjust
to try and match it the right way with your given string to match.

## Password Hashing and Validating

SailCMS uses the standard php way of hashing passwords using `password_hash` and `verify_password`. The methods provided
are just a single point of use. In turn this will make your code auto upgrade in the case that security practices change
in the future. They also provide baseline levels of security. Meaning, they will not slow down your server because they are
using safe baselines for hashing costs. These methods are `hashPassword` and `verifyPassword`.