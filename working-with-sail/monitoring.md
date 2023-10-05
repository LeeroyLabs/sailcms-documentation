# Monitoring
SailCMS offers a self monitoring feature that can be easily installed to provide you with statistics over time and live health reporting. The monitoring system also offers problem detection and notification. The only thing required is for you to have Python 3 and a few libraries installed. Then setup the cron job to take samples every few minutes.

## Requirements
- Python 3
- pip
- psutil

You read about how to install python3 for your OS [here](https://realpython.com/installing-python/#how-to-install-python-on-macos). Then you can install pip with the help of [this documentation](https://pip.pypa.io/en/stable/installation/).

Once those are installed, you can run

```bash
you@yourhost: pip install psutil
```

Then the monitoring system should work as expected.

## Cron job
To setup the cron job for the monitoring system, on Mac and Linux you can do the following:

Find where your php binary is on the machine using this:

```bash
you@yourhost: which php
you@yourhost: crontab -e
```

Add the following line, taking care of replacing `<php_path>` in the example with your path to php

```bash
*/5 * * * <php_path> sail run:monitoring
```