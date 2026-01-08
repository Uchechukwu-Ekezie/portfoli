# Cloudinary Setup Guide

This guide will help you set up Cloudinary for image uploads in your portfolio application.

## Step 1: Create a Cloudinary Account

1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Click "Sign Up for Free"
3. Create your account (free tier is sufficient)

## Step 2: Get Your Cloudinary Credentials

1. After logging in, go to your **Dashboard**
2. You'll see your account details:
   - **Cloud Name** (e.g., `dxxxxx123`)
   - **API Key**
   - **API Secret**

## Step 3: Create an Upload Preset

1. In your Cloudinary Dashboard, click on **Settings** (gear icon in top right)
2. Go to the **Upload** tab
3. Scroll down to **Upload presets**
4. Click **Add upload preset**
5. Configure the preset:
   - **Preset name**: Give it a name (e.g., `portfolio_uploads`)
   - **Signing Mode**: Select **Unsigned** (important for frontend uploads)
   - **Folder**: Optionally set a folder name (e.g., `portfolio/projects`)
   - Leave other settings as default or customize as needed
6. Click **Save**

## Step 4: Update Your .env.local File

Open your `.env.local` file and replace the placeholder values:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_here
```

Replace with your actual values:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxxxxx123
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=portfolio_uploads
```

## Step 5: Restart Your Development Server

After updating `.env.local`, restart your Next.js dev server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 6: Test the Upload

1. Go to [http://localhost:3000/admin/projects/new](http://localhost:3000/admin/projects/new)
2. Fill in the project details
3. Upload an image using the image upload section
4. You should see the image preview
5. Click "Create Project"
6. The upload progress will show:
   - "Uploading X image(s) to Cloudinary..."
   - "✓ Images uploaded successfully"
   - "Creating project..."

## How It Works

1. **Frontend Upload**: When you select images, they're stored temporarily in browser memory
2. **Cloudinary Upload**: On form submit, images are uploaded to Cloudinary first
3. **Get URLs**: Cloudinary returns secure URLs for each uploaded image
4. **Backend Storage**: These URLs are sent to your backend and stored in the database
5. **Display**: When viewing projects, images are loaded from Cloudinary URLs

## Benefits

- ✅ **No Backend Storage**: Images are hosted on Cloudinary's CDN
- ✅ **Fast Loading**: Cloudinary optimizes and serves images quickly
- ✅ **Automatic Optimization**: Images are compressed and optimized
- ✅ **Transformations**: You can resize/crop images via URL parameters
- ✅ **Free Tier**: Up to 25GB storage and 25GB bandwidth per month

## Troubleshooting

### Error: "Cloudinary configuration missing"
- Make sure you've added the environment variables to `.env.local`
- Restart your dev server after adding them
- Check that variable names start with `NEXT_PUBLIC_`

### Error: "Upload failed"
- Verify your Cloud Name is correct
- Make sure your Upload Preset exists and is set to **Unsigned**
- Check your internet connection

### Images not showing after upload
- Check the browser console for errors
- Verify the URLs are being returned from Cloudinary
- Check if your backend is saving the URLs correctly

## Example URLs

Uploaded images will have URLs like:
```
https://res.cloudinary.com/dxxxxx123/image/upload/v1234567890/portfolio/projects/abc123.jpg
```

These URLs can be used directly in `<img>` tags and are globally accessible.
