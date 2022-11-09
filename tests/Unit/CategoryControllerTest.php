<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;

class CategoryControllerTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testCategoryFetchData()
    {
        $client = new Client([
            'base_uri' => 'https://staging.mazaady.com',
            'verify'  => false,
        ]);
        $response = $client->request('GET','/api/get_all_cats');
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(true), true);
        $this->assertArrayHasKey('data', $data);

    }
}
