# --------------------------------------------------------------------------------------------------------------------
# PHP
# --------------------------------------------------------------------------------------------------------------------
FROM php:8.5.10-fpm-alpine

WORKDIR /var/www

# --------------------------------------------------------------------------------------------------------------------
# System dependencies and PHP extensions
# --------------------------------------------------------------------------------------------------------------------

RUN apk add --no-cache mysql-client libstdc++ g++ git zip unzip freetype libpng libjpeg-turbo icu-dev libzip-dev \
    && apk add --no-cache --virtual .build-deps $PHPIZE_DEPS freetype-dev libpng-dev libjpeg-turbo-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" pdo_mysql mysqli bcmath gd intl zip \
    && apk del .build-deps

# --------------------------------------------------------------------------------------------------------------------
# PHP configuration
# --------------------------------------------------------------------------------------------------------------------

COPY php.ini /usr/local/etc/php/conf.d/99-custom.ini
COPY opcache.ini /usr/local/etc/php/conf.d/10-opcache.ini

# --------------------------------------------------------------------------------------------------------------------
# Composer
# --------------------------------------------------------------------------------------------------------------------
COPY --from=composer:2.10.3 /usr/bin/composer /usr/bin/composer

# --------------------------------------------------------------------------------------------------------------------
# Application
# --------------------------------------------------------------------------------------------------------------------

COPY --chown=www-data:www-data . .

# Laravel writable directories
RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# PHP-FPM
EXPOSE 9000

CMD ["php-fpm", "-F"]
