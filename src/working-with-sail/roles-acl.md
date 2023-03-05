# Roles and Permissions

SailCMS has a very solid Permission handling system. Everything starts with Roles. Once you create a role, you can assign
different permissions from the system's ACL list and your custom list.

To add ACL groups, you can define them during the `permissions` phase of your container.

```php
public function permissions(): Collection
{
    return new Collection([
        new ACL('YourACLGroup', ACLType::READ),
        new ACL('YourACLGroup', ACLType::READ_WRITE),
    ]);
}
```

Here `YourACLGroup` can be anything you want, or any feature you implement that requires permissions. For example,
SailCMS declares ACLs for User management like so:

```php
return new Collection([
    new ACL('User', ACLType::READ_WRITE),
    new ACL('User', ACLType::READ)
]);
```

There is a series of names you cannot used, these are reserved group names. Here is the complete list of reserved ACL
group names:

- role
- user
- entry_type
- entry_type_layout
- asset
- emails
- categories
- register

## Verify permissions in a model

To verify a permission within a model, you can use the supplied `hasPermission` method. To do so, you need to prep your
model to given this method a little context.

Within the `init` method of your model (init is a method you can implement), you must declare with what ACL group you will
be working with, within this model.

```php
public function init(): void
{
    $this->setPermissionGroup('your_group');
}
```
__NOTE__: the name of your ACL group name is transformed to snakecase, so if you set 'YourGroup' as the name, it will be
transformed to `your_group` everywhere you want to use it.

Then once you want to verify the permission, you can do one of the following:

```php
$this->hasPermission();     // Check write permission
// or
$this->hasPermission(true); // Check read permission
```

The greate thing about this method is that it will take care of checking the permission but will also stop execution by
throwing a `ACLException`, `DatabaseException` or `PermissionException` depending on the type of error that comes up.
This means you don't have to wrap anything in an if-else statement.

```php
public function yourCall(): void
{   
    // This throws if permission is not allowed or if ACL group does not exist
    $this->hasPermission();
    
    // This code will execute if the permission is allowed
    // your code here
}
```

## Verify permissions out of model

To verify a permission outside of a model, you must call ACL yourself to check on the permission, this is typically how
you would do that:

```php
if (!ACL::hasPermission(User::$currentUser, ACL::write('your_acl_group'))) {
    // Do what you want when permission is not allowed
}
```

You can check for `ACL::read`, `ACL::write` and `ACL::readwrite`.

## Check if user has a given role

You can always check if a user has the given role, you can provider either an `ObjectId`, `User` instance or `string` of
the user id to check if he has the role.

```php
ACL::hasRole('xxxxxx', 'super-administrator');
```

## Note for Commander

Your Commander commands are a very special citizen in SailCMS, Commander commands do not adhere to Roles and ACLs. If you execute
a command with Commander, if that specific call checks for permission, you will be allowed to perform it because Commander
runs as administrator.

This means, be careful of what you are doing and __do not__ call Commander commands you don't recognize.