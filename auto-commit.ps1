param(
  [string]$Message = "wwanmt auto commit message"
)

Write-Output "Staging all changes..."
git add -A

Write-Output "Committing with message: $Message"
$commitOutput = git commit -m "$Message" 2>&1
$exit = $LASTEXITCODE
if ($exit -ne 0) {
  if ($commitOutput -match "nothing to commit") {
    Write-Output "No changes to commit."
    exit 0
  } else {
    Write-Error "Git commit failed:`n$commitOutput"
    exit $exit
  }
} else {
  Write-Output "Committed successfully."
}
