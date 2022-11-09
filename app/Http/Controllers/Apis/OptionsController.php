<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use App\Services\OptionsService;
use Illuminate\Http\Request;

class OptionsController extends Controller
{
    public $optionService;

    public function __construct(OptionsService $authorService)
    {
        $this->optionService = $authorService;
    }
    public function index($property_id,$optionID)
    {
        $response = $this->optionService->getOptions($optionID);
        $response = json_decode($response);
        $properties = $response->data[0];
        $properties->property_id = $property_id;
        return $properties;
    }
}
