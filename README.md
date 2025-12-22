# Colonial Penn Demo - Vercel App with Bland Web Widget

This is a demo application that mimics the Colonial Penn life insurance enrollment flow with an integrated Bland AI web widget for customer support.

## 🎯 Features

- **Multi-step enrollment flow**: Quote → Beneficiary → Payment → Confirmation
- **Responsive design**: Mobile-friendly interface
- **Colonial Penn branding**: Matches the original design with #003DA5 blue theme
- **Bland Web Widget**: AI-powered chat support integrated throughout the flow
- **Form validation**: Client-side validation for all form fields
- **Progress tracking**: Visual progress indicator across enrollment steps

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Vercel account (free tier works)
- Bland AI account with API key

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Bland Web Widget

#### Create a Widget in Bland Dashboard

1. Go to [https://app.bland.ai](https://app.bland.ai)
2. Navigate to **Web Widgets**
3. Click **Create New Widget**
4. Configure your widget:
   - **Pathway ID**: Use an existing pathway or create one
   - **Allowed Domains**: Add `localhost:3000` and `*.vercel.app`
   - **Appearance**:
     ```json
     {
       "primaryColor": "#003DA5",
       "position": "bottom-right",
       "headerText": "Need Help?",
       "placeholderText": "Ask about life insurance..."
     }
     ```

5. Copy your **Widget ID** (looks like: `wdg_xxxxxxxxxxxxxxxx`)

#### Update the Widget ID in Code

Open `app/layout.tsx` and replace `YOUR_WIDGET_ID` with your actual widget ID (line 45).

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **Import Project**
4. Select your GitHub repository
5. Click **Deploy**

### Post-Deployment: Update Widget Domain

After deploying, update your Bland widget to allow your production domain via the Bland Dashboard or API.

## 📝 Creating a Support Pathway

Create a pathway in Bland to handle common insurance questions:

### Recommended Topics
- Guaranteed acceptance eligibility (ages 50-85)
- Coverage amounts and pricing
- 30-day try-it-on period
- Two-year limited benefit period
- Beneficiary requirements
- Payment options

## 🎨 Customization

### Pass User Context to Widget

Update widget context as the user progresses through the enrollment flow to provide personalized assistance based on their information.

## 📊 Pages Overview

1. **Homepage (/)**: Quote form with personal information
2. **/quote/results**: Displays calculated premium and coverage details
3. **/enrollment/beneficiary**: Beneficiary information collection
4. **/enrollment/payment**: Payment method setup
5. **/enrollment/confirmation**: Application confirmation with policy number

## 🐛 Troubleshooting

**Widget Not Appearing?**
- Verify widget ID is correct in `app/layout.tsx`
- Check that your domain is in the widget's allowed domains list
- Look for console errors

**Forms Not Working?**
- Ensure all required fields are filled
- Check browser console for validation errors

## 📞 Resources

- **Bland AI Documentation**: [https://docs.bland.ai](https://docs.bland.ai)
- **Vercel Documentation**: [https://vercel.com/docs](https://vercel.com/docs)

## 📄 License

This is a demo project for educational purposes.
