# Assets <Badge type="tip" text="3.0.0" />

SailCMS offers an easy way to manage and transform assets. You upload any type of file, but images get a more special
treatment. You can easily transform them to fit whatever you need. You can also have auto-transform on upload.

These transforms are performed only once, it serves as a caching mechanism.

## Special Note

SailCMS offers multisite support. Every content and category belongs to each site, but not assets. Other cms solutions
have assets belong to a specific site or optionally ge global. With experience, we found that users get very confused
about that concept. in SailCMS, assets are global elements. Every site can use an asset.

## Note on uploads
__All uploads must be transferred as base64 string__. This is because it's easier to manage within a bi-api formatted system
(Rest API, GraphQL).

## How to upload an asset

You can easily create an asset using the simple api:

```php
$asset = new Asset();
$data  = base64_decode($your_var); // some base64 string without the "base64," part

$url = $asset->upload($data, 'your-filename.jpg');
// returns https://yoursite.com/asset/2022/11/your-filename-xxxxxxx.webp
```

If prefer using the available endpoints, you can call the upload endpoint of the GraphQL API like:

```graphql
uploadAsset(src: String!, filename: String!): String!
```
this will accomplish the same thing.

## How to transform in a template

You can easily call for a transform or its cache by using the `transform` method in twig. This is the way to do it:

```twig
{{ transform('xxxxx_asset_id_xxx', 'name_of_transform', 250, 250) }}
```

you can use the optional width/height and crop arguments.

## Configurations

SailCMS offers plenty configuration for the assets. Here is the list of what they are and what they affect.

```php
'assets' => [
    'adapter' => 'local',
    'optimizeOnUpload' => true,
    'transformOutputFormat' => 'webp',
    'transformQuality' => 92, // 92%
    'maxUploadSize' => 5, // in MB
    'onUploadTransforms' => [
        'thumbnail' => [
            'width' => 100, 
            'height' => 100, 
            'crop' => Transformer::CROP_CC
        ]
    ]
]
```

### adapter

This determins what filesystem adapter to use. By default, it's set to `local`. It can be any valid `FlySystem` adapter.

### optimizeOnUpload

This tells SailCMS that you want to optimize images when uploaded. This means that `jpg` and `png` will be transcoded to the
very optimized and widely supported `webp` format.

### transformOutputFormat

This will set the format to use when creating transforms on images. By default, it's set to `webp`.

### transformQuality

This will set the quality for optimized and transformed images. By default, it's set to 92%. This strikes a good balance
of quality and filesize.

### maxUploadSize

This, set in megabytes, will control the size of upload files. By default, a generous 5mb is set.

### onUploadTransforms

These are the transforms that will be applied everytime and image is uploaded. Every entry is a name with an array of 
configs. That array is required to have at least a width or an height. Whenever one of the two is missing, the transform
will keep ratio and adjust the missing value to what makes more sense.

The `crop` option is to let you decide where to crop from. For most use, `Transformer::CROP_CC` is the best choice.