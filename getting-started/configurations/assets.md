# Assets

This configuration is to be used for all assets in your project.

<br/>

Defaults:
```php
'assets' => [
    'adapter' => 'local',
    'optimizeOnUpload' => true,
    'transformOutputFormat' => 'webp',
    'transformQuality' => 92, // 92%
    'maxUploadSize' => 5, // in MB
    'extensionBlackList' => ['exe', 'php', 'sh', 'sql'],
    'onUploadTransforms' => [
        'thumbnail' => [
            'width' => 150, 
            'height' => 150, 
            'crop' => Transformer::CROP_CC
        ]
    ]
]
```

## adapter

Tells SailCMS what I/O adapter to use. By default, it's set to `local`. If you are using our `FS3` extension, you would
put `s3` as the adapter value.

## optimizeOnUpload

This enables auto optimization when user is uploading assets. Works on images only.

## transformOutputFormat

This sets the image format to use when optimizing. By default, it's set to `webp` and we recommend leaving it this way
as `webp` is the best quality/filesize ratio codec.

## transformQuality

This sets the quality of the images when optimizing. By default, it's set to 92%.

## maxUploadSize

This sets the maximum filesize of uploads in megabytes. By default, it's set to 5mb.

## extensionBlackList

This sets the file extensions that are not allowed to be uploaded. By default, we set a set of dangerous file extensions
in the case of a cms.

## onUploadTransforms

This sets the transforms to be perfomed at upload time. By default, we set `thumbnail`, this is used by the adminitration
panel for the asset manager.