<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Spatie\RouteAttributes\Attributes\Get;

final class WelcomeController extends Controller
{
    #[Get(uri: '/', name: 'welcome')]
    public function index(): View
    {
        return view('welcome');
    }
}
