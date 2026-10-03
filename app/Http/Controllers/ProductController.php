<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProductController extends Controller
{
    public function show(string $id)
    {
        return Inertia::render('Product', ['product' => ['id' => $id]]);
    }
}
