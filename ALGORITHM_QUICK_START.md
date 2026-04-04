# Quick Start: Testing the Insurance Quote Algorithm

## 🚀 Test the API Right Now

### Option 1: Health Check (Simplest)

Visit this URL in your browser:
```
http://localhost:3000/api/quotes-advanced
```

You should see:
```json
{
  "status": "healthy",
  "service": "Advanced Insurance Quote API",
  "version": "2.0.0",
  "features": [
    "Risk Assessment Engine",
    "Multi-Carrier Quote Aggregation",
    "Anomaly Detection",
    "Data Anonymization",
    "Quote Normalization"
  ]
}
```

### Option 2: Generate Quotes (Using cURL)

Open your terminal (Command Prompt, PowerShell, or Git Bash) and run:

```bash
curl -X POST http://localhost:3000/api/quotes-advanced \
  -H "Content-Type: application/json" \
  -d '{
    "insuranceType": "auto",
    "zipCode": "29401",
    "email": "test@example.com",
    "phoneNumber": "843-858-3415",
    "age": "35",
    "gender": "male",
    "maritalStatus": "married",
    "state": "SC",
    "vehicleYear": "2020",
    "vehicleMake": "Toyota",
    "vehicleModel": "Camry",
    "coverageLevel": "standard",
    "deductible": "500"
  }'
```

### Option 3: Using Browser DevTools

1. Open your website (http://localhost:3000)
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. Paste and run:

```javascript
fetch('http://localhost:3000/api/quotes-advanced', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    insuranceType: 'auto',
    zipCode: '29401',
    email: 'test@example.com',
    phoneNumber: '843-858-3415',
    age: '35',
    gender: 'male',
    state: 'SC',
    coverageLevel: 'standard',
    deductible: '500'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

---

## 📊 Sample Response

You'll get something like:

```json
{
  "success": true,
  "quotes": [
    {
      "insurerId": "geico",
      "premium": 142,
      "normalizedPremium": 142,
      "providerName": "Geico",
      "coverageDetails": {
        "liability": "Standard",
        "comprehensive": true,
        "collision": true,
        "medical": true,
        "uninsuredMotorist": true,
        "deductible": 500
      },
      "rankScore": -0.084,
      "savingsVsAverage": -8.5,
      "isBestValue": true,
      "timestamp": "2025-04-04T12:00:00.000Z"
    },
    {
      "insurerId": "progressive",
      "premium": 148,
      "providerName": "Progressive",
      "savingsVsAverage": -4.5,
      "isBestValue": true
    },
    // ... more quotes
  ],
  "averagePremium": 155,
  "lowestPremium": 138,
  "highestPremium": 170,
  "totalQuotesReceived": 8,
  "quotesAfterFiltering": 8,
  "requestId": "REQ-1234567890-abc123",
  "timestamp": "2025-04-04T12:00:00.000Z"
}
```

---

## 🧪 Test Different Scenarios

### High-Risk Driver:
```bash
curl -X POST http://localhost:3000/api/quotes-advanced \
  -H "Content-Type: application/json" \
  -d '{
    "insuranceType": "auto",
    "zipCode": "33101",
    "email": "test@example.com",
    "age": "20",
    "gender": "male",
    "state": "FL",
    "atFaultAccidentsInLast3Years": "2",
    "claimsInLast5Years": "1",
    "coverageLevel": "premium",
    "deductible": "250"
  }'
```

### Low-Risk Driver:
```bash
curl -X POST http://localhost:3000/api/quotes-advanced \
  -H "Content-Type: application/json" \
  -d '{
    "insuranceType": "auto",
    "zipCode": "05401",
    "email": "test@example.com",
    "age": "45",
    "gender": "female",
    "state": "VT",
    "maritalStatus": "married",
    "hasPreviousInsurance": "true",
    "yearsWithCurrentInsurer": "10",
    "creditScore": "780",
    "coverageLevel": "basic",
    "deductible": "1000"
  }'
```

### Home Insurance:
```bash
curl -X POST http://localhost:3000/api/quotes-advanced \
  -H "Content-Type: application/json" \
  -d '{
    "insuranceType": "home",
    "zipCode": "29401",
    "email": "test@example.com",
    "state": "SC",
    "homeYearBuilt": "2010",
    "homeSquareFootage": "2000",
    "homeValue": "350000",
    "homeType": "house",
    "coverageLevel": "standard",
    "deductible": "1000"
  }'
```

### Farm Insurance:
```bash
curl -X POST http://localhost:3000/api/quotes-advanced \
  -H "Content-Type: application/json" \
  -d '{
    "insuranceType": "farm",
    "zipCode": "29401",
    "email": "test@example.com",
    "state": "SC",
    "homeValue": "250000",
    "farmSize": "100",
    "coverageLevel": "premium",
    "deductible": "500"
  }'
```

---

## 🎯 What to Look For

### 1. Quote Variations:
- Different premiums for different risk profiles
- High-risk users get higher premiums
- Low-risk users get lower premiums

### 2. Carrier Rankings:
- Top 3 quotes marked as "Best Value"
- Sorted by rank score
- Different insurers for different profiles

### 3. Anomaly Detection:
- Extremely high/low quotes are filtered out
- Minimum 3 quotes always returned

### 4. Data Anonymization:
- Check console logs for anonymized data
- User emails/phones are hashed
- Only ZIP codes and age ranges stored

---

## 🔍 Understanding the Output

### Premium:
- Monthly premium estimate
- Based on risk factors and carrier rates
- Simulated (not actual carrier quotes)

### Rank Score:
- Lower is better
- Combines price and reputation
- Used for sorting quotes

### Savings vs Average:
- Percentage below/above average
- Negative = cheaper than average
- Positive = more expensive than average

### Is Best Value:
- Top 3 quotes get this badge
- Best combination of price and quality

---

## ⚠️ Important Disclaimers

Add to your website:

```
IMPORTANT: The quotes displayed are ESTIMATES based on 
industry data and risk assessment algorithms. They are 
NOT actual insurance quotes and cannot be used to purchase 
insurance. For accurate, bindable quotes, please contact 
our licensed insurance agents at 843-858-3415.
```

---

## 📞 Next Steps

1. ✅ **Test the API** - Use the commands above
2. ✅ **Review Documentation** - Read `INSURANCE_QUOTE_ALGORITHM.md`
3. ✅ **Check Code** - Review files in `src/lib/insurance/`
4. 🔄 **Integrate with Frontend** - Connect to your quote forms
5. 🔄 **Add Disclaimers** - Make clear these are estimates
6. 🔄 **Collect Leads** - Use for real quote follow-ups

---

**Algorithm Status:** ✅ Ready to Use!
**Documentation:** ✅ Complete
**Database:** ✅ Updated

Start testing now! 🚀
