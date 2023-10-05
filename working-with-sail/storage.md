# Storage <Badge type="tip" text="3.0.0" />

SailCMS provides an easy to use, no hassle, unified api to deal with files and folders. It supports local and remote file
and can be used at the same time with different providers. 

:::info
Out of the box, it supports Local files only. If you want we offer an S3 adapter to enable communication with Amazon AWS
S3 buckets. Visit the official adapter [GitHub page](https://github.com/LeeroyLabs/sail-fs3).
:::

Here is an example of how to get the public url of a file:

```php
Storage::on('local')->url('myfile.jpg');
// return (similar to): https://yoursite.com/assets/images/myfile.jpg
```

You can do the same thing on a file that's on AWS S3. Like so:

```php
Storage::on('s3')->url('myfile.jpg')
// returns https://your-bucket.s3.ca-central-1.amazonaws.com/images/myfile.jpg
```

To read a file, you would do something like this:

```php
$data = Storage::on('s3')->read('myfile.jpg')->raw();
// raw for an image or get the raw data of the file

$obj = Storage::on('s3')->read('myfile.json')->decode('json');
// json decode a file's content directly

$obj = Storage::on('s3')->read('myfile.json')->decode('base64');
// base64 decode a file's content directly
```

To write a file, you can use either the complete data or a resource stream:

```php
$buffer = some_function_that_opens_a_resource();
$file = Storage::on('local')->store('filename.txt', $buffer);
                
echo $file->url();

// or

$content = 'hello world!';
$file Storage::on('local')->store('filename.txt', $content);
               
echo $file->url();
```

When writing a file you can also set its permission as the third argument. If you don't, the default will be used (public). You
can set the permission later or before saving like this:

```php
$disk = Storage::on('local');

// Recommended
$file = $disk->store('filename.txt', $buffer, 'private');
                            
// Alternate (only if you do not set permission in your write method)
$file = $disk->permissions('private')->store('filename.txt', $buffer);
```

The API enables you to read. write, move, copy, change permissions and delete files and folders. You can also access
some information like mimetype, filesize or existence. As you can see from the examples, everything starts with `Storage::on()`