<?php

namespace App\Services;
use App\Traits\ConsumesExternalService;

class PropertiesService
{
    use ConsumesExternalService;

    public $baseUri;

    public function __construct()
    {
        $this->baseUri = config('services.base_uri');
    }
    public function getProperties($id)
    {
        $response = $this->performRequest('GET', '/api/properties?cat='.$id,NULL,[]);
        return $response;
    }

}
