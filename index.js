<?php
// Konfigurasi cookie dan domain
$cookie_header = "csrftoken=62807a7d77c4b3ee9ee73ec9a847e31e;_pinterest_sess=TWc9PSY4bEpTeGNDSU5XbVBZU3NQcjlnZzhka2E3OHh6SGFVTWI3dWoyVlFRVU4wZWN5WjhYSWNRQW1IQTlXdnNobDRwbnZoSWNseUd4SVc5d29Ub0N0SlVJVmk2UVo3ZUFqRnJ0VmRwZzRuRUlHbit5V043VXFNVWhLL2tXcGkyY1BnZ0xzZldBa3ZRQStMSVU4YWVSNFFFRFdVbVhhdzNlbHhnVjA5SUoyZDFWZjhvMEozRVl3Nm5ib0t3aTY3NmFUTDdFa0U2eml2Q0txM1VVOGI3eHdtNUJXRkJnVWE2alJPUTZ2ek81NkNYelZrSzJLZnE2cWE5dENKNmY2aXdNWmU5YVl1WnVxK2VQUE03eHloS083aHdtOFJQczdwZE1uR3BVUWlGOXIreHJoL2g1dXAvOXFQSHJmYmZ1RThHMGxNcmtJUTRidWdKeHlHQldQV3QvMnlld0x4aitacHRHQ2wxcXltRGlhc3ZFSFNLSkdhYUZ5NVBDa3F6VGkzSlcwcnhYdktjaDJFQWFMdkwybVNJQ3JuWk93PT0mNUxwREliN0dhVWI3OGo3dFFoU1owd2s5dm1jPQ==;__Secure-s_a=V1R2UUpIVHlESkE4VUtsbEMvM0hjd3RpL3VZM1FiMFZCNFVpZXZVZTFuZnpwVUlSZExQVHYxdkpMUGVmNHRVMFcxUzV4ZG5yZzFjMTg5bUROMUhrKzNhNmhxbFlzTDRZSUtaTENkWUFNSWw1Y3NHeUw2bTQ1Ui80bStMUTBVTVNwN05WeHBUZll0cU9CT1d1WUVKRHJIcVpwSzFtd2kyYkt3R3JGZC9wYVdQbGJZcnZTKzlIdG5FSkNBMUpobGU1YkFrSlMyK0Fyc0pqeFBmeGVicFk3LzI3aWFSeTNSUzgrTWN6azBoUS9nWHJmMTUrc0x3bERqRklUYUh4b2VSc0NFbWZrc1dqV24yMlhmMk56WnRTdW9JcG5EcG5UNHlYN0xnTTZCTGNqRzQ9Jm5iN0hoQXFDcGFYYTlaTW5Wdk9aajhOakgwZz0=;_auth=1;sessionFunnelEventLogged=1";
$domain = "https://id.pinterest.com/search/pins/?q=";

// Fungsi utama untuk melakukan scraping
function scrapeImages($keyword) {
    global $cookie_header, $domain;
    $url = $domain . urlencode($keyword);
    echo "URL: " . $url . "\n";

    // Inisialisasi cURL untuk mengambil halaman
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Cookie: $cookie_header"
    ]);
    $response = curl_exec($ch);
    curl_close($ch);

    // Ekstraksi tautan gambar
    preg_match_all('/https:\/\/i\.pinimg\.com\/736x\/[^\s"]+\.jpg/', $response, $matches);

    if (count($matches[0]) > 0) {
        echo count($matches[0]) . " tautan gambar ditemukan.\n";
        echo "Tautan gambar yang ditemukan:\n";
        foreach ($matches[0] as $link) {
            echo $link . "\n";
        }
    } else {
        echo "Tidak ada tautan gambar ditemukan.\n";
    }
}

// Ambil kata kunci dari query parameter
if (isset($_GET['query'])) {
    $keyword = $_GET['query'];
    scrapeImages($keyword);
} else {
    echo "Masukkan kata kunci di URL, misalnya: ?query=pinterest\n";
}
?>
