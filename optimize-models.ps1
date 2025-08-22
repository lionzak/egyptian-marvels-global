# List of models
$models = @(
    "tutankhamun_mask",
    "rosetta_stone",
    "narmer_palette",
    "bust_of_nefertiti",
    "ankh"
)

# Ensure you're in the root of the project
$basePath = "public\models"

foreach ($model in $models) {
    $input = "$basePath\$model.glb"
    $webpOutput = "$basePath\$model-optimized-webp.glb"
    $finalOutput = "$basePath\$model-optimized.glb"

    if (Test-Path $input) {
        Write-Host "Optimizing $model..."

        # Convert textures to WebP
        npx gltf-transform webp $input $webpOutput --slots "baseColor"

        # Resize texture dimensions
        npx gltf-transform resize $webpOutput $finalOutput --width 1024 --height 1024

        Write-Host "$model done.`n"
    } else {
        Write-Warning "File not found: $input"
    }
}
