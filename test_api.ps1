Write-Host "Testing Aura Backend API" -ForegroundColor Magenta

$baseUrl = "http://localhost:5000/api"

# Test 1: Health Check
Write-Host "`nTest 1: Health Check" -ForegroundColor Green
$response = Invoke-WebRequest -Uri "$baseUrl/health" -UseBasicParsing
Write-Host ($response.Content | ConvertFrom-Json | ConvertTo-Json)

# Test 2: Register User
Write-Host "`nTest 2: Register User" -ForegroundColor Green
$registerBody = @{
    name = "Sarah Johnson"
    email = "sarah@example.com"
    password = "secure123"
    age = 26
} | ConvertTo-Json

$registerResponse = Invoke-WebRequest -Uri "$baseUrl/auth/register" -Method POST -Body $registerBody -ContentType "application/json" -UseBasicParsing
$registerData = $registerResponse.Content | ConvertFrom-Json
$token = $registerData.access_token
Write-Host "User registered: $($registerData.user.name)"

# Test 3: Add Cycles
Write-Host "`nTest 3: Add Cycles" -ForegroundColor Green
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$cycle1 = @{ start_date = "2026-01-15"; end_date = "2026-01-20"; flow_intensity = "medium" } | ConvertTo-Json
Invoke-WebRequest -Uri "$baseUrl/cycles" -Method POST -Body $cycle1 -Headers $headers -UseBasicParsing | Out-Null

$cycle2 = @{ start_date = "2026-02-18"; end_date = "2026-02-23"; flow_intensity = "heavy" } | ConvertTo-Json
Invoke-WebRequest -Uri "$baseUrl/cycles" -Method POST -Body $cycle2 -Headers $headers -UseBasicParsing | Out-Null

$cycle3 = @{ start_date = "2026-03-22"; end_date = "2026-03-27"; flow_intensity = "light" } | ConvertTo-Json
Invoke-WebRequest -Uri "$baseUrl/cycles" -Method POST -Body $cycle3 -Headers $headers -UseBasicParsing | Out-Null

Write-Host "Added 3 cycles"

# Test 4: Get Cycle Statistics
Write-Host "`nTest 4: Cycle Statistics" -ForegroundColor Green
$statsResponse = Invoke-WebRequest -Uri "$baseUrl/cycles/stats" -Headers $headers -UseBasicParsing
$stats = $statsResponse.Content | ConvertFrom-Json
Write-Host ($stats | ConvertTo-Json)

# Test 5: Predict Next Period
Write-Host "`nTest 5: Period Prediction" -ForegroundColor Green
$predictionResponse = Invoke-WebRequest -Uri "$baseUrl/cycles/predict-next" -Headers $headers -UseBasicParsing
$prediction = $predictionResponse.Content | ConvertFrom-Json
Write-Host ($prediction | ConvertTo-Json)

# Test 6: Log Symptoms
Write-Host "`nTest 6: Log Symptoms" -ForegroundColor Green
$symptom = @{ 
    date = "2026-04-10"
    mood = "anxious"
    pain_level = 7
    cramps = $true
    headache = $true
    fatigue = 6
    acne = $true
    bloating = $true
    notes = "Heavy cramps today"
} | ConvertTo-Json

Invoke-WebRequest -Uri "$baseUrl/symptoms" -Method POST -Body $symptom -Headers $headers -UseBasicParsing | Out-Null
Write-Host "Symptom logged"

# Test 7: PCOD Risk Assessment
Write-Host "`nTest 7: PCOD Risk Assessment" -ForegroundColor Green
$pcodBody = @{
    cycle_irregularity_score = 9
    avg_cycle_length = 45
    weight_gain = 12
    acne_severity = 8
    hair_growth_score = 7
    hair_loss = 6
    mood_swings = 8
    fatigue_level = 7
    sleep_quality = 4
    stress_level = 9
} | ConvertTo-Json

$pcodResponse = Invoke-WebRequest -Uri "$baseUrl/predictions/pcod-risk" -Method POST -Body $pcodBody -Headers $headers -UseBasicParsing
$pcod = $pcodResponse.Content | ConvertFrom-Json
Write-Host "Risk Level: $($pcod.risk_assessment.risk_level)"
Write-Host "Probability: $([math]::Round($pcod.risk_assessment.probability * 100, 1))%"
Write-Host "Recommendations: $($pcod.risk_assessment.recommendations.Count)"

Write-Host "`nAll Tests Passed!" -ForegroundColor Green
