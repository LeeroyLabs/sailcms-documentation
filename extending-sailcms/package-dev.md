# Package Development

SailCMS, like any good framework or cms, enables developers to extend it by adding packages. Packages come in the form of
a container,module, Middleware or any of the available Adapter Interfaces.

## Developing your package

Like you have read before, you can create a package that provides a container to add multiple features to the cms. While
it's not supported yet, we encourage developers to create a manifest file so that when the `install:package` Commander
method is ready, your package can be installed using that command.

```json
{
    "manifestVersion": 1,
    "requiredMinimumVersion": 3,
    "packageType": "module",
    "namespace": "Acme\\YourPackage"
}
```

### manifestVersion

This tells Sail of what manifest version you are using.

### requiredMinimumVersion

This tells Sail what is the minimum compatible major version. Since SailCMS respects semver, version 3.0.0 should be as
compatible as 3.8.0.

### packageType

This tells Sail what the package is, to configure the developer's project accordingly.

### namespace

This tells Sail the namespace your package is using, this is also used to configure the developer's project accordingly.

