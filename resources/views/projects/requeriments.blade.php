<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" href="{{URL::to('/')}}/logo.png">
        <meta name="csrf-token" content="{{ csrf_token() }}">


        <title>Requeriments</title>

        @viteReactRefresh
        @vite('resources/js/page/Requeriments.jsx')
    </head>
    <body>
        @csrf
        <div id="app"></div>
    </body>
</html>