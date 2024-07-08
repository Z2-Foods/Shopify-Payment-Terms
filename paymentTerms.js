const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Replace with your actual Shopify store credentials
const shopifyStore = process.env.shopifyStore;
const apiVersion = process.env.apiVersion;
const accessToken = process.env.accessToken;

const app = express();

app.use(express.json());

app.use(cors());

// Handle POST requests to the endpoint for processing Shopify payment terms in the cart
app.post('/process-payment-terms', async (req, res) => {
  const customFieldValue = req.body.terms;
  const customerId = req.body.customerId;

  console.log(`IN THE SERVER`);
  // Check if customFieldValue are not null or undefined
  if (customFieldValue !== null && customerId !== null) {
    // Call the updateMetafields function only when values are not null or undefined
    updateMetafields(customFieldValue, customerId);
     console.log(`SUCESS`);
    res.status(200).send('Form data received successfully');
  } else {
    // Handle the case where values are null or undefined
     console.log(`ERROR`);
    res.status(400).send('Invalid input: values are missing');
  }
});

 // Function to update customer metafields in Shopify
 async function updateMetafields(customMetafieldsValues, customerId) {
  try {
     console.log(customMetafieldsValues);
    console.log(customMetafieldsValues["PaymenTerms"]);
    // Make a PUT request to update customer details and metafields in Shopify
    const response = await axios.post(`https://${shopifyStore}/admin/api/${apiVersion}/customers/${customerId}/metafields.json`, {
        "metafield": {
          "namespace": "custom",
          "key": "termos",
          "value": customMetafieldsValues["PaymenTerms"]
        }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
    });
    console.log('PUT Response:', response.data);
  } catch (error) {
    console.error('PUT Error:', error.response ? error.response.data : error.message);
    
  }
}
// Set the server to listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
