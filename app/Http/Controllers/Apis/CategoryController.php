<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public $categoryService;

    public function __construct(CategoryService $authorService)
    {
        $this->categoryService = $authorService;
    }
    public function index()
    {
        $response = $this->categoryService->getCategories();
        $response = json_decode($response);
        $categories = $response->data->categories;
        return $categories;
    }
}
