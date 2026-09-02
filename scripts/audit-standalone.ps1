# Self-contained a11y audit for curated design seeds
# Usage: powershell -File scripts/audit-standalone.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

function HexToRgb([string]$hex) {
  $n = [Convert]::ToInt32($hex.TrimStart('#'), 16)
  return @(($n -shr 16) -band 255, ($n -shr 8) -band 255, $n -band 255)
}

function RelLum($r, $g, $b) {
  $vals = @($r, $g, $b) | ForEach-Object {
    $s = $_ / 255.0
    if ($s -le 0.03928) { $s / 12.92 } else { [Math]::Pow(($s + 0.055) / 1.055, 2.4) }
  }
  return 0.2126 * $vals[0] + 0.7152 * $vals[1] + 0.0722 * $vals[2]
}

function ContrastRatio([string]$fg, [string]$bg) {
  $frgb = HexToRgb $fg; $brgb = HexToRgb $bg
  $l1 = RelLum $frgb[0] $frgb[1] $frgb[2]
  $l2 = RelLum $brgb[0] $brgb[1] $brgb[2]
  $lighter = [Math]::Max($l1, $l2); $darker = [Math]::Min($l1, $l2)
  return ($lighter + 0.05) / ($darker + 0.05)
}

function RgbToHex($r, $g, $b) {
  return ('#{0:x2}{1:x2}{2:x2}' -f [Math]::Round([Math]::Max(0, [Math]::Min(255, $r))), [Math]::Round([Math]::Max(0, [Math]::Min(255, $g))), [Math]::Round([Math]::Max(0, [Math]::Min(255, $b))))
}

function AdjustLightness([string]$hex, [double]$delta) {
  $rgb = HexToRgb $hex
  $factor = 1 + $delta
  return RgbToHex ($rgb[0] * $factor) ($rgb[1] * $factor) ($rgb[2] * $factor)
}

function EnsureContrast([string]$accent, [string]$surface, [double]$minRatio = 4.5, [int]$maxAttempts = 12) {
  $color = $accent
  $ratio = ContrastRatio $color $surface
  if ($ratio -ge $minRatio) { return @{ color = $color; note = $null } }
  $srgb = HexToRgb $surface
  $direction = if ((RelLum $srgb[0] $srgb[1] $srgb[2]) -gt 0.5) { -1 } else { 1 }
  for ($i = 0; $i -lt $maxAttempts; $i++) {
    $color = AdjustLightness $color ($direction * 0.08)
    $ratio = ContrastRatio $color $surface
    if ($ratio -ge $minRatio) {
      return @{ color = $color; note = "Accent nudged for WCAG AA ($([Math]::Round($ratio, 2)):1 on surface)" }
    }
  }
  return @{ color = $color; note = "Accent contrast $([Math]::Round($ratio, 2)):1 — below AA after nudge" }
}

function AuditPalette($colors) {
  $notes = @()
  $inkOnBg = ContrastRatio $colors.ink $colors.bg
  $inkOnSurface = ContrastRatio $colors.ink $colors.surface
  $accentOnSurface = ContrastRatio $colors.accentText $colors.surface
  $mutedOnBg = ContrastRatio $colors.muted $colors.bg
  if ($inkOnBg -lt 4.5) { $notes += "Ink on bg: $([Math]::Round($inkOnBg, 2)):1 (fail)" }
  if ($inkOnSurface -lt 4.5) { $notes += "Ink on surface: $([Math]::Round($inkOnSurface, 2)):1 (fail)" }
  if ($accentOnSurface -lt 4.5) { $notes += "Accent text on surface: $([Math]::Round($accentOnSurface, 2)):1 (fail)" }
  if ($mutedOnBg -lt 3) { $notes += "Muted on bg: $([Math]::Round($mutedOnBg, 2)):1 (fail large text)" }
  return $notes
}

function GenerateSeed([int]$index) {
  $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  $seed = ""
  [uint32]$state = [uint32]($index * 7919 + 104729)
  for ($i = 0; $i -lt 100; $i++) {
    $state = [uint32](([uint64]$state * 1103515245 + 12345) % [uint64]4294967296)
    $seed += $chars[[int]($state % 62)]
  }
  return $seed
}

# Import resolve logic inline (abbreviated - full BASE_PALETTES etc.)
$BASE_PALETTES = @{
  slate = @{ light = @{ bg = '#F8FAFC'; surface = '#FFFFFF'; ink = '#0F172A'; muted = '#475569'; hairline = '#E2E8F0' }; accentHue = 243 }
  warmCream = @{ light = @{ bg = '#FFFBF5'; surface = '#FFFFFF'; ink = '#1C1917'; muted = '#78716C'; hairline = '#E7E5E4' }; accentHue = 25 }
  forest = @{ light = @{ bg = '#F4F7F4'; surface = '#FFFFFF'; ink = '#1A2E1A'; muted = '#4A5D4A'; hairline = '#D4DDD4' }; accentHue = 142 }
  ocean = @{ light = @{ bg = '#F0F7FA'; surface = '#FFFFFF'; ink = '#0C1929'; muted = '#4A6278'; hairline = '#D1E0EA' }; accentHue = 205 }
  ink = @{ light = @{ bg = '#FAFAFA'; surface = '#FFFFFF'; ink = '#171717'; muted = '#525252'; hairline = '#E5E5E5' }; accentHue = 0 }
  sand = @{ light = @{ bg = '#FAF8F5'; surface = '#FFFFFF'; ink = '#292524'; muted = '#78716C'; hairline = '#E7E5E4' }; accentHue = 35 }
  rose = @{ light = @{ bg = '#FDF4F5'; surface = '#FFFFFF'; ink = '#1F1315'; muted = '#6B4F52'; hairline = '#F0D9DC' }; accentHue = 350 }
  mint = @{ light = @{ bg = '#F2FAF6'; surface = '#FFFFFF'; ink = '#0F1F17'; muted = '#3D5A4A'; hairline = '#D4EBE0' }; accentHue = 160 }
  lavender = @{ light = @{ bg = '#F7F5FC'; surface = '#FFFFFF'; ink = '#1A1625'; muted = '#5C5470'; hairline = '#E4DFF0' }; accentHue = 270 }
  charcoal = @{ light = @{ bg = '#F4F4F5'; surface = '#FFFFFF'; ink = '#18181B'; muted = '#52525B'; hairline = '#E4E4E7' }; accentHue = 220 }
  terracotta = @{ light = @{ bg = '#FBF6F3'; surface = '#FFFFFF'; ink = '#2C1810'; muted = '#6B4F3F'; hairline = '#EDD9CE' }; accentHue = 18 }
  steel = @{ light = @{ bg = '#F1F5F9'; surface = '#FFFFFF'; ink = '#0F172A'; muted = '#64748B'; hairline = '#CBD5E1' }; accentHue = 215 }
}
$PALETTE_FAMILIES = @('slate','warmCream','forest','ocean','ink','sand','rose','mint','lavender','charcoal','terracotta','steel')

function HslToHex($h, $s, $l) {
  $hNorm = (($h % 360) + 360) % 360
  $sNorm = [Math]::Max(0, [Math]::Min(100, $s)) / 100.0
  $lNorm = [Math]::Max(0, [Math]::Min(100, $l)) / 100.0
  $c = (1 - [Math]::Abs(2 * $lNorm - 1)) * $sNorm
  $x = $c * (1 - [Math]::Abs((($hNorm / 60) % 2) - 1))
  $m = $lNorm - $c / 2
  $r = 0; $g = 0; $b = 0
  if ($hNorm -lt 60) { $r = $c; $g = $x } elseif ($hNorm -lt 120) { $r = $x; $g = $c } elseif ($hNorm -lt 180) { $g = $c; $b = $x }
  elseif ($hNorm -lt 240) { $g = $x; $b = $c } elseif ($hNorm -lt 300) { $r = $x; $b = $c } else { $r = $c; $b = $x }
  $toHex = { param($n) ([Math]::Round(($n + $m) * 255)).ToString('x2') }
  return "#$(& $toHex $r)$(& $toHex $g)$(& $toHex $b)"
}

function CharSum($s) { $sum = 0; foreach ($ch in $s.ToCharArray()) { $sum += [int][char]$ch }; return $sum }
function VowelRatio($s) { $v = 0; foreach ($ch in $s.ToCharArray()) { if ('aeiouAEIOU'.Contains($ch)) { $v++ } }; return $v / $s.Length }
function PairwiseHueOffset($s) { $sum = 0; for ($i = 0; $i -lt $s.Length - 1; $i++) { $sum += [int][char]$s[$i] + [int][char]$s[$i+1] }; return ($sum % 121) - 60 }
function HasAlternatingPattern($s) {
  if ($s.Length -lt 4) { return $false }
  for ($i = 0; $i -lt $s.Length - 3; $i++) {
    if ($s[$i] -ne $s[$i+1] -and $s[$i] -eq $s[$i+2] -and $s[$i+1] -eq $s[$i+3]) { return $true }
  }
  return $false
}

function ResolveDesign([string]$seed) {
  $zones = @{
    a = $seed.Substring(0, 10); b = $seed.Substring(10, 10); c = $seed.Substring(20, 10)
  }
  $a11yNotes = @()
  $paletteFamily = $PALETTE_FAMILIES[(CharSum $zones.a) % 12]
  $highContrast = HasAlternatingPattern $zones.c
  $base = $BASE_PALETTES[$paletteFamily]
  $warm = VowelRatio $zones.b
  $hue = $base.accentHue + (PairwiseHueOffset $zones.b) + $(if ($warm -gt 0.4) { 10 } else { -5 })
  $rawAccent = HslToHex $hue (45 + $warm * 15) 42
  $rawAccentText = HslToHex $hue (45 + $warm * 7.5) 42
  $baseLight = $base.light
  $accentResult = EnsureContrast $rawAccent $baseLight.surface
  $accentTextResult = EnsureContrast $rawAccentText $baseLight.surface
  if ($accentResult.note) { $a11yNotes += $accentResult.note }
  if ($accentTextResult.note) { $a11yNotes += $accentTextResult.note }
  $lightColors = $baseLight.Clone(); $lightColors.accent = $accentResult.color; $lightColors.accentText = $accentTextResult.color
  $darkAccent = EnsureContrast $rawAccent '#1E293B'
  $darkAccentText = EnsureContrast $rawAccentText '#1E293B'
  if ($darkAccent.note) { $a11yNotes += "Dark: $($darkAccent.note)" }
  if ($darkAccentText.note) { $a11yNotes += "Dark: $($darkAccentText.note)" }
  $darkBgs = @{
    slate = @{ bg = '#0F172A'; surface = '#1E293B' }; warmCream = @{ bg = '#1C1917'; surface = '#292524' }
    forest = @{ bg = '#0F1A0F'; surface = '#1A2E1A' }; ocean = @{ bg = '#0C1929'; surface = '#152A40' }
    ink = @{ bg = '#0A0A0A'; surface = '#171717' }; sand = @{ bg = '#1C1917'; surface = '#292524' }
    rose = @{ bg = '#1A1012'; surface = '#2A1A1E' }; mint = @{ bg = '#0A1510'; surface = '#142820' }
    lavender = @{ bg = '#12101A'; surface = '#1E1A2E' }; charcoal = @{ bg = '#09090B'; surface = '#18181B' }
    terracotta = @{ bg = '#1A1008'; surface = '#2C1810' }; steel = @{ bg = '#0F172A'; surface = '#1E293B' }
  }
  if ($highContrast) {
    $darkColors = @{ bg = '#000000'; surface = '#0A0A0A'; ink = '#FFFFFF'; muted = '#A3A3A3'; hairline = '#333333'; accent = $darkAccent.color; accentText = $darkAccentText.color }
  } else {
    $d = $darkBgs[$paletteFamily]
    $darkColors = @{ bg = $d.bg; surface = $d.surface; ink = '#F1F5F9'; muted = '#94A3B8'; hairline = '#334155'; accent = $darkAccent.color; accentText = $darkAccentText.color }
  }
  $a11yNotes += AuditPalette $lightColors
  $a11yNotes += (AuditPalette $darkColors | ForEach-Object { "Dark: $_" })
  return @{ seedId = $seed.Substring(0, 8); paletteFamily = $paletteFamily; highContrast = $highContrast; colors = @{ light = $lightColors; dark = $darkColors }; a11yNotes = $a11yNotes }
}

$indices = @(1, 7, 13, 23, 37, 42, 58, 71, 89, 103, 127, 211, 333, 512, 777, 999)
$audits = @()
$i = 1
foreach ($idx in $indices) {
  $seed = GenerateSeed $idx
  $spec = ResolveDesign $seed
  $light = $spec.colors.light; $dark = $spec.colors.dark
  $lightR = @{ inkOnBg = (ContrastRatio $light.ink $light.bg); inkOnSurface = (ContrastRatio $light.ink $light.surface); accentTextOnSurface = (ContrastRatio $light.accentText $light.surface) }
  $darkR = @{ inkOnBg = (ContrastRatio $dark.ink $dark.bg); inkOnSurface = (ContrastRatio $dark.ink $dark.surface); accentTextOnSurface = (ContrastRatio $dark.accentText $dark.surface) }
  $all = @($lightR.inkOnBg, $lightR.inkOnSurface, $lightR.accentTextOnSurface, $darkR.inkOnBg, $darkR.inkOnSurface, $darkR.accentTextOnSurface)
  $failures = $spec.a11yNotes | Where-Object { $_ -match '\(fail\)|below AA after nudge' }
  $pass = ($all | Where-Object { $_ -lt 4.5 }).Count -eq 0 -and $failures.Count -eq 0
  $audits += [PSCustomObject]@{ index = $i; seedId = $spec.seedId; palette = $spec.paletteFamily; highContrast = $spec.highContrast; pass = $pass; minContrast = ($all | Measure-Object -Minimum).Minimum; lightR = $lightR; darkR = $darkR; a11yNotes = $spec.a11yNotes; failures = $failures }
  $i++
}

$passing = @($audits | Where-Object { $_.pass })
$failing = @($audits | Where-Object { -not $_.pass })

$lines = @(
  '# Design Lab — Accessibility Audit Report', '', "Generated: $((Get-Date).ToUniversalTime().ToString('o'))", '',
  '## Overview', '', "- **Seeds audited:** $($audits.Count)", "- **Passing:** $($passing.Count)", "- **Failing:** $($failing.Count)",
  '- **WCAG AA threshold (normal text):** 4.5:1', '', '## Summary Table', '',
  '| # | Seed ID | Palette | HC | Pass | Min ratio | Light ink/bg | Light ink/surf | Light accent/surf | Dark ink/bg | Dark ink/surf | Dark accent/surf |',
  '|---|---------|---------|----|------|-----------|--------------|----------------|-------------------|-------------|---------------|------------------|'
)
foreach ($a in $audits) {
  $hc = if ($a.highContrast) { 'yes' } else { 'no' }
  $status = if ($a.pass) { '**PASS**' } else { '**FAIL**' }
  $lines += "| $($a.index) | ``$($a.seedId)`` | $($a.palette) | $hc | $status | $([Math]::Round($a.minContrast, 2)):1 | $([Math]::Round($a.lightR.inkOnBg, 2)) | $([Math]::Round($a.lightR.inkOnSurface, 2)) | $([Math]::Round($a.lightR.accentTextOnSurface, 2)) | $([Math]::Round($a.darkR.inkOnBg, 2)) | $([Math]::Round($a.darkR.inkOnSurface, 2)) | $([Math]::Round($a.darkR.accentTextOnSurface, 2)) |"
}
$lines += '', '## Seeds Failing WCAG AA After Nudging', ''
if ($failing.Count -eq 0) { $lines += 'All 16 curated seeds pass WCAG AA contrast requirements.' }
else { foreach ($a in $failing) { $lines += "- ``$($a.seedId)`` ($($a.palette)): $($a.failures -join '; ')" } }
$lines += '', '## Recommendations', ''
if ($failing.Count -eq 0) { $lines += 'No action required. Base palettes and `ensureContrast` nudging keep all curated seeds within WCAG AA for the audited text pairings.' }

$reportPath = Join-Path (Get-Location) 'design-lab-a11y-report.md'
$lines -join "`n" | Set-Content -Path $reportPath -Encoding utf8
$audits | ConvertTo-Json -Depth 6 | Set-Content -Path 'audit-results.json' -Encoding utf8
Write-Host "Report: $reportPath"
Write-Host "Passing: $($passing.Count) / $($audits.Count)"
