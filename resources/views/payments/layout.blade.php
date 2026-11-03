<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>@yield('title') · IPB Convention Hotel</title>
    <style>
        * { box-sizing: border-box; }
        body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 16px; background: #FDFBF7; color: #1e293b; font: 500 15px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
        main { width: 100%; max-width: 480px; background: #fff; border: 1px solid #E7D6C1; border-radius: 20px; padding: 28px; }
        h1 { margin: 0 0 8px; font-size: 22px; line-height: 1.3; }
        p { margin: 0 0 16px; color: #475569; }
        dl { display: grid; grid-template-columns: auto 1fr; gap: 6px 16px; margin: 0 0 20px; padding: 16px; background: #FDFBF7; border-radius: 12px; font-size: 14px; }
        dt { color: #475569; }
        dd { margin: 0; font-weight: 700; text-align: right; overflow-wrap: anywhere; }
        .badge { display: inline-block; margin-bottom: 12px; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; }
        .ok { background: #DCFCE7; color: #14532D; }
        .wait { background: #FEF3C7; color: #78350F; }
        .bad { background: #FFE4E6; color: #881337; }
        .actions { display: flex; flex-wrap: wrap; gap: 10px; }
        .btn { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 10px 18px; border: 0; border-radius: 12px; font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; }
        .primary { background: #1E3A2B; color: #fff; }
        .secondary { background: #F1F5F9; color: #1e293b; }
        .danger { background: #fff; color: #881337; border: 1px solid #FDA4AF; }
        .btn:focus-visible { outline: 3px solid #1E3A2B; outline-offset: 2px; box-shadow: 0 0 0 2px #fff; }
        .note { font-size: 13px; padding: 10px 12px; border-radius: 10px; background: #FEF3C7; color: #78350F; }
    </style>
</head>
<body>
    <main>
        @yield('content')
    </main>
</body>
</html>
