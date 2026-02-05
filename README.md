# Abhiram Gundekari's Portfolio

Professional student portfolio highlighting skills in Python, SQL, and web development.

## ✍️ How to Update Your Information
All the data for your site (name, summary, skills, and links) is stored in one file:
1. Open `src/lib/data.ts`.
2. Find the `socials` object to update your **GitHub**, **LinkedIn**, or **LeetCode** links.
3. Find the `summary` field to change your "About Me" text.

## 🚀 Finalizing Your Portfolio
To make your resume, profile picture, and certificates appear on the site, ensure these files are in your `public` folder with these exact filenames:
- **Profile Photo**: `profile.jpg`
- **Resume**: `resume.pdf`
- **UNIX & Linux Certificate**: `unix-linux-certificate.pdf`
- **Internship 1 Certificate**: `eduskills-internship-1.pdf`
- **Internship 2 Certificate**: `eduskills-internship-2.pdf`

## 🐙 Step 1: Add your code to GitHub

1.  **Create a Repository**: Go to [GitHub](https://github.com/new) and create a new repository named `my-portfolio`. Keep it "Public".
2.  **Open Terminal**: Use the terminal in your IDE.
3.  **Run these commands**:
    ```bash
    git init
    git add .
    git commit -m "initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_GITHUB_USERNAME/my-portfolio.git
    git push -u origin main
    ```
    *(Replace `YOUR_GITHUB_USERNAME` with your actual GitHub name!)*

## 🌎 Step 2: How to Publish (Go Live)

Once your code is on GitHub, use **Firebase App Hosting** to host it for free.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Select your project.
3.  In the left-hand menu, click on **App Hosting**.
4.  Click **Get Started** and connect your GitHub account.
5.  Select your `my-portfolio` repository and the `main` branch.
6.  Firebase will automatically detect it's a Next.js app. Follow the prompts to finish the setup.
7.  Firebase will provide you with a public URL (e.g., `your-project.web.app`) once the build finishes!
