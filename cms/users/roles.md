# Roles <Badge type="tip" text="3.0.0" />

SailCMS comes equipped with Roles and ACLs. This enables you to control permissions for your users. The system comes
with a bunch of CMS related permissions, but you can always add your own custom permissions.

Within your extension's container, there is a `permissions` method. This is where you would add your permissions to the
system. Here is an example of a custom permission:

```php
public function permissions(): Collection
{
    return new Collection([
        new ACL('YourRoleName', ACLType::READ_WRITE, 'English Description', 'French Description')
    ]);
}
```

This would add the `readwrite_your_role_name` permission in the system. there are 2 types of role ACL, `READ_WRITE` and
`READ`.

All of your custom permissions will automatically appear in the management panel for you to assign.