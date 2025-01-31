$cssLink = '    <link href="styles/responsive.css" rel="stylesheet">'
$projectCssLink = '    <link href="../styles/responsive.css" rel="stylesheet">'

# Get all HTML files except index.html
$htmlFiles = Get-ChildItem -Path . -Filter *.html -Recurse | Where-Object { $_.Name -ne "index.html" }

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Check if file is in projects directory
    $linkToAdd = if ($file.DirectoryName -like "*projects*") { $projectCssLink } else { $cssLink }
    
    # Add CSS link after Bootstrap CSS if it doesn't exist
    if ($content -notlike "*responsive.css*") {
        $content = $content -replace '(<link href="https://cdn\.jsdelivr\.net/npm/bootstrap[^>]+>)', "`$1`n$linkToAdd"
        Set-Content -Path $file.FullName -Value $content
    }
}
