# Inputs

One of the biggest problems with security on web applications is that developers often forget or downplay the need for
user input sanity checks and filtration. This problem, commonly known as XSS or SQL Injection/DB Injection.

SailCMS takes care of this problem by providing safe to use inputs in each `Request` instance. This means that in your code
(controller) you could do this:

```php
$this->request->post('the_key');
$this->request->get('other_key');
```

These are sanitized by default, so you don't have to worry about this security risk. On the other hand, if you need to
a raw value, you ca pass `true` as a second argument to those methods, this will skip the filtering system.