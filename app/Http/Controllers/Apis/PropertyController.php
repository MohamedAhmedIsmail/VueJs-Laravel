<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use App\Services\PropertiesService;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public $propertyService;

    public function __construct(PropertiesService $authorService)
    {
        $this->propertyService = $authorService;
    }
    public function index($subCategoryID)
    {
        $response = $this->propertyService->getProperties($subCategoryID);
        $response = json_decode($response);
        $properties = $response->data;
        return $properties;
    }
}
