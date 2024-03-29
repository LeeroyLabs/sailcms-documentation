# Extending Commander

Commander is using Symfony's Console library to run. That being said, this means you have to implement a
Symfony Console Command class. These have some specific things you can do. Please read the documentation
about Commands [here](https://symfony.com/doc/current/console.html#creating-a-command).

To create a Commander Command, you must either have a container or module existing to install it in. You can create your Command
using the following:

```bash
php sail create:command location locationName commandName
```

for example

```bash
php sail create:command container MyContainer MyCommand
```

Once created, within your container or module class, there is a `cli` phase method. This method must return an array of
commands that you want to add. These must be the name of the class for the command. We recommend using the `ClassName::class`.
shortcut to insure the fqn name. You can create more than one per container or module. These commands will be loaded into
the CLI automatically for you.

Adding commands to handle your application's Cron jobs is the recommended way of running cron jobs in SailCMS.