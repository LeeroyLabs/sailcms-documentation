# Tasks

SailCMS comes with a task queue system, from migration or notifications, 
everything that needs to be automatized can be done here.

Here's a list of properties:

`name`
`scheduled_at`
`executed_at`
`executed`
`execution_result`
`execution_success`
`locked`
`handler`
`action`
`retriable`
`retry_count`
`settings`
`priority`
`pid`
`logs`

`scheduled_at` is the time or date where your task will run, `executed_at` is when
the scheduled task is running or when a user has trigger the task manually.

 `execution_result` will output a message depending on some conditions, `execution_success` will be true if it is a 
 success, otherwise it will be false.

If `locked` is true, the task will not be queued again, `locked` will be true if the 
task is a success or if the task has failed too many times (it is set to 3 retries by default).
`retry_count` count each retry and is used for the validation.
You can set `retriable` to false if you the task to be locked at the first failure.

`action` is the command line executed when the task is starting.

`prority` ...

`pid` is the process id in the OS, it serves to kill the process when needed.

By default nothing goes to `log`, but it possible to had log to your need ...

