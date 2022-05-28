# ArtSites/Comments

### Installation
```sh
composer require artsites/comments
```

### Publish
```sh
php artisan vendor:publish --provider="ArtSites\Comments\ServiceProvider" --tag="views"

php artisan vendor:publish --provider="ArtSites\Comments\ServiceProvider" --tag="js"

php artisan vendor:publish --provider="ArtSites\Comments\ServiceProvider" --tag="config"
```
