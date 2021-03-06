<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=100%, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }} ">
    <title>Laravel</title>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.2/font/bootstrap-icons.css">

</head>

<body>
    <!-- React root DOM -->
    <div id="app">
    </div>
    <!-- React JS -->

    <script src="{{ asset('js/app.js') }}" defer></script>
</body>

</html>