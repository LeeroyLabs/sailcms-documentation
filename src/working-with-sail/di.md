# Dependency Injection

SailCMS supports Dependency Injection on classes used in GraphQL and Routes. If you don't know what DI is, please
visit [Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection)
on the subject.

The only thing __important to understand__, any dependency must allow to be instantiated without any arguments. Here
is an example of DI.

```php
class YourController extends AppController
{
    private DependencyType $yourDep;
    
    public function __construct(DependencyType $yourDep) 
    {
        $this->yourDep = $yourDep;
    }
}
```

You might be asking what is the point of this, this helps you not have to write repetitive code to initialize your
dependencies on every method as it will be done for you.

To enjoy the benefits of DI, you must have a constructor on your class (controller or other). You do not need to do
anything special to profit from DI, it will be detected automatically.
