# Views <Badge type="tip" text="3.0.0" />

Breeze ODM offers a way to programmatically create and use views for your application. 

## createView

Views are very useful when your queries become complex, or you have to do many queries to build your data. You can
create a view that gathers that data and makes it easy to query afterward. Views also will boost performance for those
complex queries. We have seen betwen 50-125x boost in performance on some of our own projects using views.

the `createView` method will perform a `viewExists` before running the creation process. 3 things can happen. First, 
your view creation process completes without any issues. In this case, you will receive a `true` boolean value. If 
the view already exists, you will receive a `false` boolean value. If any other problems occur, it will throw an exception
with the reason.

```php
$this->createView('name', ['...your pipeline...']);
```

## viewExists

This enables you to look up if a view already exists with the given name.

```php
if ($this->viewExists('name_here')) {
    // do nothing!
    return;
}
```

## useView

You could always create a model that uses a view's name as the collection name. But `useView` offers a way to call a 
view within a model that is using a real collection. This enables you to not create models just for this purpose.

```php
$this->useView('view_name')->find(['query here'])->exec();
```