Add-Type -AssemblyName System.Drawing

function Process-Image {
    param (
        [string]$SourcePath,
        [string]$BackupPath,
        [string]$OutputPath,
        [float]$Angle,
        [int]$CropX,
        [int]$CropY,
        [int]$CropWidth,
        [int]$CropHeight,
        [float]$Contrast = 1.18,
        [float]$Brightness = 1.05
    )

    if (-not (Test-Path $SourcePath)) {
        Write-Host "Source file not found: $SourcePath" -ForegroundColor Red
        return
    }

    # Backup if it doesn't exist yet
    if (-not (Test-Path $BackupPath)) {
        $parent = Split-Path $BackupPath
        if (-not (Test-Path $parent)) {
            New-Item -ItemType Directory -Force -Path $parent | Out-Null
        }
        Copy-Item $SourcePath $BackupPath
        Write-Host "Backed up original to $BackupPath"
    }

    Write-Host "Processing $SourcePath..."
    # Load from backup so we always process clean original
    $srcImg = [System.Drawing.Bitmap]::FromFile($BackupPath)
    
    # Create rotated bitmap
    $rotatedBmp = New-Object System.Drawing.Bitmap -ArgumentList $srcImg.Width, $srcImg.Height
    $g = [System.Drawing.Graphics]::FromImage($rotatedBmp)
    $g.Clear([System.Drawing.Color]::White)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Rotation transform
    $g.TranslateTransform($srcImg.Width / 2, $srcImg.Height / 2)
    $g.RotateTransform($Angle)
    $g.TranslateTransform(-$srcImg.Width / 2, -$srcImg.Height / 2)

    # Contrast & Brightness adjustments via ColorMatrix
    $c = $Contrast
    $t = ((1.0 - $c) / 2.0) + ($Brightness - 1.0)
    
    $colorMatrix = New-Object System.Drawing.Imaging.ColorMatrix
    $colorMatrix.Matrix00 = $c
    $colorMatrix.Matrix11 = $c
    $colorMatrix.Matrix22 = $c
    $colorMatrix.Matrix33 = 1.0
    $colorMatrix.Matrix44 = 1.0
    $colorMatrix.Matrix40 = $t
    $colorMatrix.Matrix41 = $t
    $colorMatrix.Matrix42 = $t

    $imgAttr = New-Object System.Drawing.Imaging.ImageAttributes
    $imgAttr.SetColorMatrix($colorMatrix)

    # Draw image with color matrix
    $destRect = New-Object System.Drawing.Rectangle -ArgumentList 0, 0, $srcImg.Width, $srcImg.Height
    $g.DrawImage($srcImg, $destRect, 0, 0, $srcImg.Width, $srcImg.Height, [System.Drawing.GraphicsUnit]::Pixel, $imgAttr)
    $g.Dispose()

    # Crop
    $croppedBmp = New-Object System.Drawing.Bitmap -ArgumentList $CropWidth, $CropHeight
    $g2 = [System.Drawing.Graphics]::FromImage($croppedBmp)
    $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    
    $srcRect = New-Object System.Drawing.Rectangle -ArgumentList $CropX, $CropY, $CropWidth, $CropHeight
    $destRectCropped = New-Object System.Drawing.Rectangle -ArgumentList 0, 0, $CropWidth, $CropHeight
    $g2.DrawImage($rotatedBmp, $destRectCropped, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g2.Dispose()

    # Save
    $croppedBmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

    $srcImg.Dispose()
    $rotatedBmp.Dispose()
    $croppedBmp.Dispose()
    Write-Host "Saved successfully to $OutputPath" -ForegroundColor Green
}

# 1. Best in Network Security
Process-Image `
    -SourcePath "src/assets/recognitions/9d65638e-025d-4218-acaf-1ffc1862c6cb.jpg" `
    -BackupPath "src/assets/originals/recognitions/9d65638e-025d-4218-acaf-1ffc1862c6cb.jpg" `
    -OutputPath "src/assets/recognitions/9d65638e-025d-4218-acaf-1ffc1862c6cb.jpg" `
    -Angle -1.07 `
    -CropX 130 `
    -CropY 75 `
    -CropWidth 1810 `
    -CropHeight 1340

# 2. Best Capstone Project
Process-Image `
    -SourcePath "src/assets/recognitions/2b4f06f2-069a-441c-b3e4-6206a6e35be0.jpg" `
    -BackupPath "src/assets/originals/recognitions/2b4f06f2-069a-441c-b3e4-6206a6e35be0.jpg" `
    -OutputPath "src/assets/recognitions/2b4f06f2-069a-441c-b3e4-6206a6e35be0.jpg" `
    -Angle -1.07 `
    -CropX 130 `
    -CropY 75 `
    -CropWidth 1810 `
    -CropHeight 1340

# 3. Dean's Lister
Process-Image `
    -SourcePath "src/assets/recognitions/ac6459bf-a6f0-4810-8a90-f299302054b8.jpg" `
    -BackupPath "src/assets/originals/recognitions/ac6459bf-a6f0-4810-8a90-f299302054b8.jpg" `
    -OutputPath "src/assets/recognitions/ac6459bf-a6f0-4810-8a90-f299302054b8.jpg" `
    -Angle -1.07 `
    -CropX 130 `
    -CropY 75 `
    -CropWidth 1810 `
    -CropHeight 1340

# 4. Graduate with High Honors
Process-Image `
    -SourcePath "src/assets/recognitions/a8ee83f3-5316-41e6-acc2-b1233be58f8f.jpg" `
    -BackupPath "src/assets/originals/recognitions/a8ee83f3-5316-41e6-acc2-b1233be58f8f.jpg" `
    -OutputPath "src/assets/recognitions/a8ee83f3-5316-41e6-acc2-b1233be58f8f.jpg" `
    -Angle 0.3 `
    -CropX 35 `
    -CropY 30 `
    -CropWidth 1960 `
    -CropHeight 1460
