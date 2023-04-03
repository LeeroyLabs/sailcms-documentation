# Queue <Badge type="tip" text="3.0.0" />

SailCMS comes equipped with a Queue Manager. This is useful when you have background.

__NOTE__: The Queue is not a cron runner. If you need to use crons, please create a CLI command for your task and schedule
it in your server's crontab.

## Setup the Queue Manager

For the Queue Manager to function, you need to setup a cron to execute the Queue Manager. We suggest this configuration

```bash
*/2 * * * * /usr/bin/php sail run:queue
```

## Add task to queue

To add a task in the Queue, you need to create an instance of the `Task` class. Then simply call the `add` method.

```php
$settings = new Collection([
    'key1' => 'value',
    'key2' => 'value',
    //etc...
]);

$task = new Task(
    'task_name',          // name for reference
    true,                 // can this task be retried if it fails?
    HandlerClass::class,  // handler for the task
    'actionName',         // method to execute on that handler
    $settings,            // your settings
    Task::PRIORITY_NORMAL // Priority level
);
Queue::add($task);
```

Ok, that was easy! As you see, `$settings` can be anything you need for your task to run. The Priority is how important 
is your task. SailCMS supports 4 priorities:

- Task::PRIORITY_LOW
- Task::PRIORITY_NORMAL
- Task::PRIORITY_HIGH
- Task::PRIORITY_URGENT

## Important Note

When you want your task to fail (ex: something went wrong, or something is missing), do not return empty values because
the Queue Manager will think it succeeded without output. If you want it to detect failure, throw an exception, it will
catch it and tell you the message in the queue logs.