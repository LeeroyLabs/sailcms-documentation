# Cron Jobs <Badge type="tip" text="3.0.0" />

For the sake of documentation, let's say you have added a `run:custom-cron` command. You add this to the crontab file

```shell
0 0 * * * /usr/bin/php /path/to/project/sail run:custom-cron
```

This would run your cron every night at midnight.