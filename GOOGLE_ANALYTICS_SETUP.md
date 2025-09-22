# Google Analytics Setup Guide

## Overview
Your portfolio website now has Google Analytics integration to track visitor activity, user interactions, and engagement metrics.

## Setup Instructions

### Step 1: Create a Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com)
2. Sign in with your Google account
3. Click "Start measuring"
4. Set up your account name (e.g., "Personal Portfolio")
5. Configure your property:
   - Property name: "Portfolio Website"
   - Time zone: Select your timezone
   - Currency: Select your preferred currency

### Step 2: Create a Web Data Stream
1. Select "Web" as the platform
2. Enter your website URL: `https://yuxiangjiangct.github.io`
3. Stream name: "Portfolio"
4. Click "Create stream"

### Step 3: Get Your Measurement ID
1. After creating the stream, you'll see your Measurement ID
2. It will look like: `G-XXXXXXXXXX`
3. Copy this ID

### Step 4: Configure Your Local Environment
1. Open the `.env` file in your project root
2. Replace `G-XXXXXXXXXX` with your actual Measurement ID:
   ```
   VITE_GA_MEASUREMENT_ID=G-YOUR_ACTUAL_ID
   ```

### Step 5: Deploy Your Changes
1. Build your project:
   ```bash
   npm run build
   ```
2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## What's Being Tracked

### Page Views
- Initial page load
- Session duration
- Bounce rate

### User Interactions
- **Project Cards**:
  - Expanding/collapsing project details
  - Clicking GitHub/Live/Demo links
  - Viewing project images
- **Technology Filters**: Clicking on technology tags
- **External Links**: All outbound link clicks

### Events Structure
- **Category**: Type of interaction (e.g., "Project", "External Link", "Technology")
- **Action**: Specific action taken (e.g., "Click", "Expand", "Filter")
- **Label**: Context-specific information (e.g., project name, technology name)

## Viewing Analytics Data

### Real-time Data
1. Go to Google Analytics dashboard
2. Navigate to Reports → Realtime
3. You can see active users on your site right now

### Historical Data
1. Reports → Engagement → Events
2. Reports → Acquisition → Traffic acquisition
3. Reports → User → Demographics

### Custom Reports
You can create custom reports to track:
- Most viewed projects
- Most clicked technologies
- External link click-through rates
- User engagement patterns

## Privacy Considerations

### GDPR Compliance
Consider adding a cookie consent banner if you have EU visitors. Google Analytics uses cookies to track users.

### Privacy Policy
Update your portfolio to include a privacy policy mentioning:
- You use Google Analytics
- What data is collected
- How it's used
- User rights

## Testing Your Implementation

1. Open your local development server:
   ```bash
   npm run dev
   ```

2. Open browser DevTools Console

3. Look for "Google Analytics initialized" message

4. Interact with your site and check:
   - Network tab for GA requests
   - Google Analytics Realtime dashboard

## Troubleshooting

### No data showing in Google Analytics
- Verify Measurement ID is correct in `.env`
- Check browser console for errors
- Ensure ad blockers are disabled for testing
- Wait 24-48 hours for initial data to appear

### Events not tracking
- Check browser console for errors
- Verify event names match in code
- Use Google Analytics DebugView for testing

## Additional Resources
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)
- [GA4 Event Builder](https://ga-dev-tools.web.app/ga4/event-builder/)
- [Google Analytics Documentation](https://support.google.com/analytics)