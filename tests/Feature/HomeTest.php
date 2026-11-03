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

    public function test_legal_pages_render_the_react_page(): void
    {
        foreach (['/kebijakan-privasi', '/syarat-ketentuan', '/kebijakan-refund', '/kebijakan-cookie'] as $path) {
            $this->get($path)->assertOk()->assertInertia(fn (Assert $page) => $page->component('Home'));
        }
    }

    public function test_pages_send_security_headers_and_no_external_fonts(): void
    {
        $this->get('/')
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('X-Frame-Options', 'SAMEORIGIN')
            ->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
            ->assertDontSee('fonts.googleapis.com');
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
