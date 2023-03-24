# Boot File

SailCMS features a file called `boot.php` in the `config` directory. This file enables you to do whatever task you
need to perform on every call. This code is executed just before application code is executed. At this point in the 
lifecycle, the whole system is available to you but none of your code is executed.

The only part of your code that is executed at this point is the code in the Containers and Modules system methods.