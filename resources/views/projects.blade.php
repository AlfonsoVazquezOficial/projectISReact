<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" href="{{URL::to('/')}}/logo.png">

        <title>Projects</title>

        @viteReactRefresh
        @vite('resources/js/page/Project.jsx')
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>