$imageUrls = @{
    "logo.png" = "https://picsum.photos/150/50"
    "profile.jpg" = "https://picsum.photos/400/400"
    "portfolio-1.jpg" = "https://picsum.photos/600/400?random=1"
    "portfolio-2.jpg" = "https://picsum.photos/600/400?random=2"
    "portfolio-3.jpg" = "https://picsum.photos/600/400?random=3"
    "portfolio-4.jpg" = "https://picsum.photos/600/400?random=4"
    "portfolio-5.jpg" = "https://picsum.photos/600/400?random=5"
    "portfolio-6.jpg" = "https://picsum.photos/600/400?random=6"
    "client-1.jpg" = "https://picsum.photos/100/100?random=7"
    "client-2.jpg" = "https://picsum.photos/100/100?random=8"
    "blog-1.jpg" = "https://picsum.photos/400/250?random=9"
    "blog-2.jpg" = "https://picsum.photos/400/250?random=10"
    "blog-3.jpg" = "https://picsum.photos/400/250?random=11"
}

foreach ($image in $imageUrls.GetEnumerator()) {
    $outputPath = "images/$($image.Key)"
    Invoke-WebRequest -Uri $image.Value -OutFile $outputPath
    Write-Host "Downloaded $($image.Key)"
}
