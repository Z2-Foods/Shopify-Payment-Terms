# Shopify Payment Terms Processor

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![Shopify API](https://img.shields.io/badge/Shopify-API-v2025)

A microservice that processes and stores payment terms in Shopify customer metafields.

## Key Features

- 🔄 Processes payment terms from cart to customer metafields
- 🔒 Secure Shopify API integration
- 🛡️ Input validation
- ⚡ Lightweight and fast
- 🏗️ Ready for deployment

## Prerequisites

- Node.js 18+
- Shopify Admin API credentials
- Shopify store with customer metafields enabled

## Environment Variables

```env
shopifyStore=your-store.myshopify.com
apiVersion=2024-01
accessToken=your_shopify_admin_api_token
PORT=3000
```

## Installation

npm install express axios cors dotenv

## Running the Service

node server.js

## API Endpoint

POST /process-payment-terms

Request:
{
  "terms": "net_30",
  "customerId": "123456789"
}
Successful Response:

HTTP 200 - "Form data received successfully"

Error Responses:

- 400 Bad Request - Missing/invalid input
- 500 Internal Server Error - Shopify API failure

## Shopify Metafield Structure
This service creates/updates metafields with:

Namespace: custom

Key: termos

Value: Payment terms string (e.g., "net_30")

## Deployment
Railway

Heroku
heroku create
git push heroku main

## Example Usage
// Frontend implementation example
- fetch('/process-payment-terms', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    terms: 'net_30',
    customerId: '123456789'
  })
});

## Troubleshooting
403 Forbidden Errors

- Verify accessToken has write_customers scope
- Check metafield permissions

Metafield Not Appearing

- Ensure customer exists in Shopify
- Verify namespace/key matches your theme
