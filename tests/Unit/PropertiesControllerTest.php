<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;

class PropertiesControllerTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    protected $category_id = 13;
    public function testPropertiesFetchPropertyBasedOnCategory()
    {
        $client = new Client([
            'base_uri' => 'https://staging.mazaady.com',
            'verify'  => false,
        ]);
        $response = $client->request('GET','/api/properties?cat='.$this->category_id);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(true), true);

        $this->assertArrayHasKey('data', $data);

    }
}
