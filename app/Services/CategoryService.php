<?php

namespace App\Services;
use App\Traits\ConsumesExternalService;

class CategoryService
{
    use ConsumesExternalService;

    public $baseUri;

    public function __construct()
    {
        $this->baseUri = config('services.base_uri');
    }
    public function getCategories()
    {
        $response = $this->performRequest('GET', '/api/get_all_cats',NULL,[]);
        return $response;
    }

}
