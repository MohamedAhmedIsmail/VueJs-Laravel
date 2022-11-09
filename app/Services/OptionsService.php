<?php

namespace App\Services;
use App\Traits\ConsumesExternalService;

class OptionsService
{
    use ConsumesExternalService;

    public $baseUri;

    public function __construct()
    {
        $this->baseUri = config('services.base_uri');
    }
    public function getOptions($id)
    {
        $response = $this->performRequest('GET', '/api/get-options-child/'.$id,NULL,[]);
        return $response;
    }

}
