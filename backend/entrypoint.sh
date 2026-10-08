#!/bin/sh

chmod 666 /app/database/database.sqlite
chmod -R 777 /app/bootstrap/cache
chmod -R 777 /app/storage

composer install
php -r "file_exists('.env') || copy('.env.example', '.env');"
php artisan key:generate --force
php artisan jwt:secret --always-no
php artisan migrate:fresh --seed

exec "$@"
