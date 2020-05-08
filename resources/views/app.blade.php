<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Forumv2</title>
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,700" rel="stylesheet">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href='https://css.gg/css' rel='stylesheet'>
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <style>
            * {
                padding:0;
                margin:0;
                box-sizing: border-box !important;
            }
            body {
                background-color:#F3F3F3;
                min-height: 100vh;
            }
        </style>
    </head>
    <body>
        <div id="app"></div>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
