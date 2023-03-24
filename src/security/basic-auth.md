# Basic Authentication

SailCMS offers very easy to manage `HTTP Basic Authentication`. You can create new user/pass combinations using the 
Commander command :

```shell
php sail create:auth
```

This commande will ask you for a username and password. Once this is done, in your `config/general.php` you can
activate the `useBasicAuthentication` option. Then simply use the credentials you just created.