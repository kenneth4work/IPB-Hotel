<?php

return [
    'ssr' => ['enabled' => false],
    'pages' => [
        'ensure_pages_exist' => true,
        'paths' => [base_path('src/pages')],
        'extensions' => ['tsx'],
    ],
    'testing' => ['ensure_pages_exist' => true],
];
