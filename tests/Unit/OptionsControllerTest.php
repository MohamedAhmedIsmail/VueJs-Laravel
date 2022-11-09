<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;

class OptionsControllerTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    protected $option_id= 53;
    public function testOptionsFetchOptionsBasedOnParentOption()
    {
        $client = new Client([
            'base_uri' => 'https://staging.mazaady.com',
            'verify'  => false,
        ]);
        $response = $client->request('GET','/api/get-options-child/'.$this->option_id);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(true), true);
        $this->assertArrayHasKey('data', $data);
    }
}
