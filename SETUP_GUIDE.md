# Colonial Penn Demo - Detailed Setup Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Creating the Bland Widget](#creating-the-bland-widget)
3. [Configuring the Widget](#configuring-the-widget)
4. [Building the Support Pathway](#building-the-support-pathway)
5. [Deployment Instructions](#deployment-instructions)
6. [Testing the Integration](#testing-the-integration)

## Project Overview

This Next.js app mimics the Colonial Penn life insurance enrollment flow with these pages:

1. **Get a Quote** (`/`) - Initial quote form
2. **Quote Results** (`/quote/results`) - Display pricing
3. **Beneficiary Info** (`/enrollment/beneficiary`) - Beneficiary details
4. **Payment** (`/enrollment/payment`) - Payment setup
5. **Confirmation** (`/enrollment/confirmation`) - Success page

The Bland web widget is integrated into the layout and available on all pages.

## Creating the Bland Widget

### Step 1: Access Bland Dashboard

1. Log in to [app.bland.ai](https://app.bland.ai)
2. Navigate to the **Web Widgets** section

### Step 2: Create New Widget

Click **Create New Widget** and choose one of two options:

**Option A: Use Existing Pathway**
- Select an existing pathway from the dropdown
- Best if you already have a conversational flow built

**Option B: Create with Agent Prompt**
- Write a system prompt for the AI agent
- Example prompt:

```
You are a helpful customer service agent for Colonial Penn life insurance. 
You specialize in answering questions about:
- Guaranteed Acceptance Whole Life Insurance
- Coverage eligibility (ages 50-85)
- Premium pricing and payment options
- The 30-day try-it-on period
- The 2-year limited benefit period
- Beneficiary requirements
- Application process

Be friendly, concise, and always offer to transfer to a human agent if needed.
```

### Step 3: Configure Basic Settings

**Allowed Domains**
```json
["localhost:3000", "*.vercel.app"]
```

**Messages Per Minute**: 10 (default)

**Timeout**: 3600 seconds (1 hour)

## Configuring the Widget

### Visual Configuration

In the Bland Dashboard, use the visual editor or API to set:

```json
{
  "config": {
    "appearance": {
      "primaryColor": "#003DA5",
      "position": "bottom-right",
      "icon": "chat",
      "headerText": "Need Help?",
      "placeholderText": "Ask about life insurance...",
      "size": "medium"
    },
    "behavior": {
      "autoOpen": false,
      "showWelcomeMessage": true,
      "welcomeMessage": "Hi! I'm here to help with your Colonial Penn application. What questions do you have?"
    }
  }
}
```

### Advanced Configuration via API

If you prefer programmatic configuration:

```bash
curl -X POST https://us.api.bland.ai/v1/widget \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "pathway_id": "YOUR_PATHWAY_ID",
    "allowed_domains": ["localhost:3000", "*.vercel.app"],
    "messages_per_minute": 10,
    "config": {
      "appearance": {
        "primaryColor": "#003DA5",
        "position": "bottom-right"
      },
      "timeoutSeconds": 3600
    }
  }'
```

## Building the Support Pathway

### Recommended Pathway Structure

**1. Greeting Node**
```json
{
  "type": "greeting",
  "message": "How can I help with your Colonial Penn application today?"
}
```

**2. Intent Classification**
```json
{
  "type": "intent_classification",
  "intents": [
    "coverage_questions",
    "pricing_info",
    "eligibility",
    "application_help",
    "policy_details",
    "technical_support"
  ]
}
```

**3. Response Nodes**

For each intent, create a response node with relevant information:

**Coverage Questions:**
```
Colonial Penn offers Guaranteed Acceptance Whole Life Insurance with:
- No medical exam required
- No health questions
- Guaranteed acceptance for ages 50-85
- Coverage amounts vary by age, gender, and state
- Lifetime coverage that never expires
```

**Pricing Information:**
```
Your premium is based on:
- Your age at the time of application
- Your gender
- Your state of residence

Once your premium is set, it's locked in and will never increase. 
You can pay monthly, quarterly, or annually.
```

**Application Help:**
```
I can help guide you through the application process! 
We'll need:
1. Your personal information
2. Beneficiary details
3. Payment information

Would you like help with a specific step?
```

**Policy Details:**
```
Important policy features:
- 30-Day Try-It-On Period: Cancel within 30 days for full refund
- 2-Year Limited Benefit: During first 2 years, natural death returns premiums + 10% interest
- After 2 years: Full coverage regardless of cause of death
```

**4. Transfer Option**

Add a node that transfers to a human agent:
```json
{
  "type": "transfer",
  "message": "I'd be happy to connect you with one of our specialists. One moment please.",
  "transfer_number": "1-877-469-5128"
}
```

### Knowledge Base Integration (Optional)

If you have existing documentation, you can integrate it:

1. Upload documents to Bland's knowledge base
2. Enable knowledge base access in your pathway
3. The AI will automatically reference relevant information

## Deployment Instructions

### Step 1: Update Widget ID

In `app/layout.tsx`, replace the placeholder:

```typescript
Bland('init', {
  widgetId: 'wdg_abc123xyz', // Your actual widget ID
  request_data: {
    userType: 'prospect',
    product: 'GBL',
    page: window.location.pathname
  }
});
```

### Step 2: Deploy to Vercel

```bash
# Build the project
npm run build

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Step 3: Update Widget Domain Settings

After deployment, add your production domain:

```bash
curl -X PATCH https://us.api.bland.ai/v1/widget/YOUR_WIDGET_ID \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "allowed_domains": [
      "localhost:3000",
      "your-app-name.vercel.app"
    ]
  }'
```

## Testing the Integration

### Test Checklist

✅ **Widget Loads**
- Open the app in a browser
- Verify chat icon appears in bottom-right corner
- Icon should use Colonial Penn blue (#003DA5)

✅ **Widget Opens**
- Click the chat icon
- Widget should expand with welcome message
- Styling should match Colonial Penn theme

✅ **Conversation Works**
- Type a question: "What is guaranteed acceptance?"
- Verify AI responds appropriately
- Check response quality and accuracy

✅ **Context Passing**
- Fill out the quote form
- Open the widget
- Ask a personalized question
- Verify the AI has context about the form data

✅ **Mobile Responsiveness**
- Test on mobile device or browser dev tools
- Widget should be mobile-friendly
- Forms should work correctly on small screens

### Test Questions to Try

1. "What is guaranteed acceptance life insurance?"
2. "How much will my premium cost?"
3. "Can I cancel my policy?"
4. "What is the 30-day try-it-on period?"
5. "Do I need a medical exam?"
6. "What ages are eligible?"
7. "Can I change my beneficiaries?"
8. "How does the 2-year limited benefit period work?"

### Monitoring Conversations

View conversation logs in the Bland Dashboard:

1. Go to **Web Widgets**
2. Select your widget
3. Click **Conversations**
4. Review transcripts and metrics

## Advanced Features

### Voice Chat (Optional)

Enable voice input in your widget:

```json
{
  "config": {
    "voice": {
      "enabled": true,
      "inputMethod": "browser"
    }
  }
}
```

### Custom Components

Add interactive components to the widget:

```javascript
// In your client-side code
if (window.Bland) {
  window.Bland('addComponent', {
    type: 'button',
    label: 'View My Quote',
    action: () => {
      window.location.href = '/quote/results';
    }
  });
}
```

### Webhooks for Analytics

Set up a webhook to receive conversation data:

```bash
curl -X PATCH https://us.api.bland.ai/v1/widget/YOUR_WIDGET_ID \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "webhook_url": "https://your-app.vercel.app/api/webhooks/conversations"
  }'
```

## Troubleshooting Common Issues

**Issue: Widget doesn't appear**
- Check browser console for errors
- Verify widget ID is correct
- Ensure domain is in allowed domains list

**Issue: "Access Denied" error**
- Domain not in allowed domains list
- Add via Bland Dashboard or API

**Issue: Widget appears but doesn't respond**
- Check pathway configuration
- Verify pathway is published
- Check conversation logs for errors

**Issue: Styling looks off**
- Verify primaryColor is set to #003DA5
- Check for CSS conflicts
- Clear browser cache

## Next Steps

1. **Customize Responses**: Refine pathway responses based on real user questions
2. **Add Analytics**: Track widget usage and conversation quality
3. **A/B Testing**: Test different widget configurations
4. **Voice Integration**: Enable voice chat for better user experience
5. **Human Handoff**: Set up smooth transfers to live agents
6. **Knowledge Base**: Upload product documentation for more accurate responses

## Support

- **Bland AI Docs**: https://docs.bland.ai
- **Bland AI Support**: Available in your dashboard
- **Vercel Docs**: https://vercel.com/docs
