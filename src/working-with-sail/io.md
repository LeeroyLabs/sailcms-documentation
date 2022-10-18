## Filesystem I/O

The filesystem feature uses php-league's FlySystem library. By default it only has the `local` adapter. You
can install any of the supported adapters: `ftp`, `stp` `memory`, `s3`, `azure` and `gcp`.

SailCMS configures a few "custom" adapters using the local adapter. You can access the 3 following channels

### Local 

You can use `local://` to the general purpose storage directory for your application in the `storage/fs/<project>` directory.

An example of how to load the file `storage/fs/project/myfile.json` would be:

```php
$fs = \SailCMS\Filesystem::manager();
$fs->read('local://myfile.json');
```

### Cache

You can use `cache://` to access the cache directory of your application. This directory is in the `storage/cache/<project>` 
directory.

An example of how to load the file `storage/cache/project/xxxxxxxxxx.cache.json` would be:

```php
$fs = \SailCMS\Filesystem::manager();
$fs->read('cache://xxxxxxxxxx.cache.json');
```

### Root

You can use `root://` to access the root of Sail. __While we do not recommend the use of it for obvious safety reasons__, It
is still available if you need for specific purposes.

### Note on Local Channels

With the local channels, one key security feature is directory traversal is prohibited. What that means is that you are not
allowed on higher levels than the channel allows. for example:

`local://` root is /storage/fs/<project_name>. That means that you cannot do `local://../../higher_path`. This is not
allowed and is not safe to allow. There is __no__ way around this. Use the proper channel to perform the task you wish
to accomplish.

### How to load an adapter

The filesystem always loads the local adapter, but if you need any other adapter, you can load it in the constructor of
your container or module. Consider the following example:

```php
public function __construct()
{
    $client = new Aws\S3\S3Client($options);
    
    $visibility = new League\Flysystem\AwsS3V3\PortableVisibilityConverter(
        // Optional default for directories
        League\Flysystem\Visibility::PUBLIC // or ::PRIVATE
    );
    
    $s3adapter = new League\Flysystem\AwsS3V3\AwsS3V3Adapter($client, 'bucket-name', '', $visibility);

    \SailCMS\Filesystem::mount('s3', $s3Adapter);
    \SailCMS\Filesystem::init();
}
```

The S3 adapter requires the following IAM permissions

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:GetObjectAcl",
                "s3:PutObjectAcl",
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name",
                "arn:aws:s3:::your-bucket-name/*"
            ]
        }
    ]
}
```

To install any of the adapters and learn how they work, please visit the [FlySystem Docs](https://flysystem.thephpleague.com/docs/)

### Example of read and write

You can easily read and write files using these api calls:

```php
$fs->write('<channel://>filepath', 'file data');
```

and 

```php
$fs->read('<channel://>filepath');
```