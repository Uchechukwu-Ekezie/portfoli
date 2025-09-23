# Deployment Guide

## Environment Variables for Production

Create a `.env.production` file with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-production-secret-key-here
NEXTAUTH_URL=https://your-domain.com

# Admin Credentials
ADMIN_EMAIL=admin@your-domain.com
ADMIN_PASSWORD_HASH=$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj5TN5.ZK.M6

# Email Configuration (if using contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Vercel Deployment

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard:**
   - `NEXTAUTH_SECRET`: Generate a secure secret
   - `NEXTAUTH_URL`: Your production domain
   - `ADMIN_EMAIL`: Admin email
   - `ADMIN_PASSWORD_HASH`: Admin password hash

3. **Deploy**: Vercel will automatically build and deploy

## Generate Secure Secret

```bash
openssl rand -base64 32
```

## Common Deployment Issues

### 1. Environment Variables Missing
- Ensure all required environment variables are set in your deployment platform
- Check that `NEXTAUTH_SECRET` is properly configured

### 2. Build Failures
- Run `npm run build` locally to test
- Check for TypeScript errors
- Ensure all dependencies are installed

### 3. Authentication Issues
- Verify `NEXTAUTH_URL` matches your production domain
- Check that admin credentials are properly hashed

## Testing Locally

```bash
# Test production build
npm run build
npm run start

# Test with production environment
NODE_ENV=production npm run start
```
