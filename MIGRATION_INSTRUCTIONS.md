# Backend Migration Instructions

## Overview
This document provides instructions for the backend developer to manually migrate 2 hardcoded projects from `projects.json` to the MongoDB database.

## Why Manual Migration?
Frontend migration attempts failed with generic "Server error" (500) responses from the backend. The backend requires specific fields that couldn't be determined from the frontend alone. Manual migration by the backend developer ensures data integrity and proper field mapping.

## Backend API Endpoint
```
POST https://portfoliobackend-83lp.onrender.com/api/projectRoutes
```

## Projects to Migrate

### 1. CAAPA Pathogenic Variant Annotation

```json
{
  "title": "CAAPA Pathogenic Variant Annotation",
  "shortDescription": "Interactive platform for exploring genetic variation and functional annotations in African-ancestry populations",
  "briefDescription": "Interactive platform for exploring genetic variation and functional annotations in African-ancestry populations",
  "description": "Interactive platform for exploring genetic variation and functional annotations in African-ancestry populations",
  "detailedProjectOverview": "This project provides an interactive platform for exploring genetic variation and functional annotations specifically focused on African-ancestry populations. It enables researchers to analyze pathogenic variants in the context of diverse genetic backgrounds.",
  "technologies": ["Next.js", "React", "TypeScript", "TailwindCSS"],
  "status": "completed",
  "slug": "caapa-variant-annotation",
  "featured": true,
  "images": ["/video1.mp4", "/video2.mp4", "/video3.mp4"],
  "githubUrl": "",
  "liveUrl": "",
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-01-15T00:00:00.000Z"
}
```

### 2. TB scRNA-seq Analysis

```json
{
  "title": "TB scRNA-seq Analysis",
  "shortDescription": "Single-cell RNA sequencing analysis of tuberculosis infection patterns",
  "briefDescription": "Single-cell RNA sequencing analysis of tuberculosis infection patterns",
  "description": "Single-cell RNA sequencing analysis of tuberculosis infection patterns",
  "detailedProjectOverview": "This project involves single-cell RNA sequencing (scRNA-seq) analysis to investigate tuberculosis infection patterns at the cellular level. The analysis helps identify specific cell populations and their responses to TB infection, providing insights into disease mechanisms.",
  "technologies": ["R", "Python", "Bioconductor", "Seurat"],
  "status": "in-progress",
  "slug": "tb-scrna-seq",
  "featured": true,
  "images": ["/one.jpg", "/five.jpg", "/six.jpg", "/seven.jpg", "/eight.jpg", "/nine.jpg", "/ten.jpg"],
  "githubUrl": "",
  "liveUrl": "",
  "createdAt": "2024-02-01T00:00:00.000Z",
  "updatedAt": "2024-02-01T00:00:00.000Z"
}
```

## Required Fields (Based on Successful Test Project)

Based on successful project creation, the backend requires these fields:

### Required Fields:
- `title` (String) - Project title
- `shortDescription` (String) - Short description **(Research field)**
- `briefDescription` (String) - Brief description **(Research field)**
- `description` (String) - Main description
- `detailedProjectOverview` (String) - Detailed overview **(Research field)**
- `technologies` (Array of Strings) - Technologies used
- `status` (String) - Project status: "completed", "in-progress", or "planned"
- `slug` (String) - URL-friendly slug (unique)
- `featured` (Boolean) - Whether project is featured

### Optional Fields:
- `images` (Array of Strings) - Image/video URLs
- `githubUrl` (String) - GitHub repository URL
- `liveUrl` (String) - Live project URL
- `createdAt` (ISO Date String) - Creation timestamp
- `updatedAt` (ISO Date String) - Last update timestamp

## Notes for Backend Developer

### Field Descriptions:
1. **shortDescription**, **briefDescription**, and **detailedProjectOverview** are research-specific fields that were added to support academic/research projects.

2. The **slug** field must be unique across all projects in the database.

3. The backend will auto-generate MongoDB `_id` fields upon insertion.

4. For empty GitHub/Live URLs, use empty strings `""` rather than `null`.

### Validation:
- Ensure slugs are unique before insertion
- Validate that all required fields are present
- Check that `technologies` array is not empty
- Verify `status` is one of: "completed", "in-progress", "planned"

## Frontend Compatibility

Once these projects are added to the database by the backend:

### ✅ What will work immediately:
- **Manage Projects page** (`/admin/projects`) - All projects (2 migrated + existing) will appear in the list
- **Edit functionality** - Edit button will work for all database projects
- **Delete functionality** - Delete button will work for all database projects
- **Create new projects** - Continue working as expected

### ❌ What will NOT work yet (requires future updates):
- **View button (eye icon)** - Individual project pages are still hardcoded HTML pages:
  - `/caapa-variant-annotation` (currently hardcoded)
  - `/tb-scrna-seq` (currently hardcoded)
  
  These pages need to be converted to dynamic pages that fetch from the database using the slug.

## Verification Steps

After migration, the frontend developer can verify success by:

1. Logging into admin panel at `/admin/login`
2. Navigate to "Manage Projects" (`/admin/projects`)
3. Verify all migrated projects appear in the list (2 migrated + existing)
4. Click "Edit" button on any migrated project - should load the edit form with data
5. Make a small edit and save - should update successfully

## Questions?

If the backend encounters any issues during migration, please check:
- Are all required fields present in the request?
- Is the slug unique?
- Are technologies provided as an array?
- Is the authentication token valid (if required)?

Contact frontend developer if any field requirements are unclear or if additional fields need to be included.
