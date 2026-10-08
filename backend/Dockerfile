FROM webdevops/php-nginx:8.3-alpine

WORKDIR /app

COPY . .

ENV WEB_DOCUMENT_ROOT=/app/public

RUN chmod 777 /app/database
RUN chmod 666 /app/database/database.sqlite
RUN chmod -R 777 /app/bootstrap/cache
RUN chmod -R 777 /app/storage

RUN composer install
RUN php -r "file_exists('.env') || copy('.env.example', '.env');"
RUN php artisan key:generate --force
RUN php artisan jwt:secret --always-no
RUN php artisan migrate:fresh --seed
