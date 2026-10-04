$base = "c:\Users\HP\Desktop\StatementExtract\statementextractor\src\app"
Get-ChildItem -Path $base -Recurse -Filter "page.tsx" | ForEach-Object {
    $lc = (Get-Content $_.FullName | Measure-Object -Line).Lines
    $rel = $_.FullName.Replace($base + "\", "")
    if ($lc -lt 150) {
        Write-Output "$rel : $lc lines"
    }
}
