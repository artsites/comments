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

php artisan vendor:publish --provider="ArtSites\Comments\ServiceProvider" --tag="js"
```
If you want to customize views, you can publish views to /resources/views/vendor/comments
```sh
php artisan vendor:publish --provider="ArtSites\Comments\ServiceProvider" --tag="views"
```

Also, you can publish nova resource for adding new features fields
Don't forget replace namespace
```sh
php artisan vendor:publish --provider="ArtSites\Comments\ServiceProvider" --tag="views"
```

### Config
Path `/config/comments.php`

`show_more_count` - comments count when click show more button

For projects which has translated databases with lang path please fill next:
`has_multi_db_lang_path`,
`locale_class`,
`set_method`

### HTML
If you're using multi lang path,
for example:
`example.com/something`, `example.com/ua/something`, `example.com/tr/something`,
make sure that your html tag has correct lang attribute
```html
<html lang="en">
    or
<html lang="ua">
    or
<html lang="tr">

    ...
</html>
```

### ENV
This package use Google reCAPTCHA V3

For creating keys go to:
https://www.google.com/recaptcha/admin/create

Please add generated keys to your env:
```sh
RECAPTCHA_SITE_KEY

RECAPTCHA_SECRET_KEY
```

### Usage

In `model` that should have comments add trait
```sh
use HasComments;
```

Add a `$comments` variable to the `controller` that returns the view
```sh
$model = Model::all();

return view('***', [
    ...
    'comments' => $model->comments()->take(8)->get(),
]);
```

And the final touch, add `HasMany` relation to Nova `resource`
```sh
HasMany::make('Comments', 'comments', \ArtSites\Comments\Nova\Comment::class),
```
