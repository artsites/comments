# ArtSites/Comments

### Installation
```sh
composer require artsites/comments
```

### Migration
```sh
php artisan migrate
```

### Publish
```sh
php artisan vendor:publish --provider="ArtSites\Comments\ServiceProvider" --tag="config"
```
```sh
php artisan vendor:publish --provider="ArtSites\Comments\ServiceProvider" --tag="js"
```
### Optional publish
> If you want to customize views, you can publish views to `/resources/views/vendor/comments`
```sh
php artisan vendor:publish --provider="ArtSites\Comments\ServiceProvider" --tag="views"
```

> Also, you can publish nova resource to `/app/Nova/Comment.php` for adding new features fields

```sh
php artisan vendor:publish --provider="ArtSites\Comments\ServiceProvider" --tag="nova-resource"
```

> **Warning**
> Don't forget replace namespace

### Config
> Path `/config/comments.php`

> `show_more_count` - comments count when click show more button

### ENV
> This package use Google reCAPTCHA V3

> For creating keys go to:
https://www.google.com/recaptcha/admin/create

> Please add generated keys to your env:
```sh
RECAPTCHA_SITE_KEY

RECAPTCHA_SECRET_KEY
```

### Usage

> In `model` that should have comments add trait
```sh
use ArtSites\Comments\Models\Traits\HasComments;

class SomeModel extends Model
{
  use HasComments;
  ...
}
```

> Add a `$comments` variable to the `controller` that returns the view
```sh
$model = Model::first();

return view('***', [
    ...
    'model' => $model,
    'comments' => $model->getComments(),
]);
```

> For adding template on view, you need add:
```sh
@include('comments::layout', ['comments' => $comments, 'model' => $model])
```

> And the final touch, add `HasMany` relation to Nova `resource`
```sh
use Laravel\Nova\Fields\HasMany;

HasMany::make('Comments', 'comments', \ArtSites\Comments\Nova\Comment::class),
```
