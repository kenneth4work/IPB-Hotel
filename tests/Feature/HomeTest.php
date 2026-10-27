<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HomeTest extends TestCase
{
    public function test_health_endpoint_is_available(): void
    {
        $this->get('/up')->assertOk();
    }

    public function test_home_renders_the_react_page_without_a_database_connection(): void
    {
        config(['database.default' => 'mysql', 'database.connections.mysql.port' => 1]);

        $this->get('/')
            ->assertOk()
            ->assertSee('IPB Convention Hotel - Di Jantung Kota Bogor')
            ->assertInertia(fn (Assert $page) => $page->component('Home'));
    }

    public function test_inertia_visits_receive_the_page_as_json(): void
    {
        $version = $this->get('/')->viewData('page')['version'];

        $this->get('/', [
            'X-Inertia' => 'true',
            'X-Inertia-Version' => $version,
            'X-Requested-With' => 'XMLHttpRequest',
        ])
            ->assertOk()
            ->assertHeader('X-Inertia', 'true')
            ->assertJsonPath('component', 'Home');
    }
}
