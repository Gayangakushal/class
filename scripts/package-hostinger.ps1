$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$projectRoot = Split-Path -Parent $PSScriptRoot
$buildRoot = Join-Path $projectRoot 'dist'
$archivePath = Join-Path (Split-Path -Parent $projectRoot) 'deshanpathinayake-hostinger-ready.zip'
if (!(Test-Path -LiteralPath (Join-Path $buildRoot 'index.html'))) { throw 'Build first: index.html missing' }
if (!(Test-Path -LiteralPath (Join-Path $buildRoot '.htaccess'))) { throw '.htaccess missing' }
if (Test-Path -LiteralPath $archivePath) { Remove-Item -LiteralPath $archivePath }
$creating = [System.IO.Compression.ZipFile]::Open($archivePath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
  foreach ($file in Get-ChildItem -LiteralPath $buildRoot -File -Recurse -Force) {
    $entryName = $file.FullName.Substring($buildRoot.Length + 1).Replace('\', '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($creating, $file.FullName, $entryName, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
  }
} finally { $creating.Dispose() }
$zip = [System.IO.Compression.ZipFile]::OpenRead($archivePath)
try {
  $files = @(Get-ChildItem -LiteralPath $buildRoot -File -Recurse -Force)
  if ($zip.Entries.Count -ne $files.Count) { throw 'ZIP file count mismatch' }
  if (!($zip.Entries.FullName -contains 'index.html') -or !($zip.Entries.FullName -contains '.htaccess')) { throw 'Missing root files' }
  foreach ($entry in $zip.Entries) {
    if ($entry.FullName.Contains('\')) { throw 'ZIP entry must use forward slashes' }
    if ($entry.FullName -match '(^|/)(node_modules|\.git|src)/|\.(tsx?|map)$|(^|/)\.env') { throw "Unwanted file: $($entry.FullName)" }
    $sourceFile = Join-Path $buildRoot $entry.FullName
    $stream = $entry.Open()
    $sha = [System.Security.Cryptography.SHA256]::Create()
    try { $hash = [BitConverter]::ToString($sha.ComputeHash($stream)).Replace('-', '') }
    finally { $stream.Dispose(); $sha.Dispose() }
    if ($hash -ne (Get-FileHash -LiteralPath $sourceFile -Algorithm SHA256).Hash) { throw "Content mismatch: $($entry.FullName)" }
  }
  Write-Output "Verified $($zip.Entries.Count) production files, including root index.html and .htaccess"
  $zip.Entries.FullName | Set-Content -Encoding utf8 (Join-Path $projectRoot 'deployment-review/zip-manifest.txt')
} finally { $zip.Dispose() }
Get-Item -LiteralPath $archivePath | Select-Object FullName,Length
Get-FileHash -LiteralPath $archivePath -Algorithm SHA256

