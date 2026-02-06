# Abhiram Gundekari's Portfolio

Professional student portfolio highlighting skills in Python, SQL, and web development.

## 🚀 Step 1: Push Your Code to GitHub
To go live, your code must first be on GitHub. 
1.  Go to [GitHub](https://github.com/new) and create a new repository named `my-portfolio`. **Do not** initialize it with a README or License.
2.  Open the terminal in your editor and run these commands one by one:
    ```bash
    git init
    git add .
    git commit -m "Initial portfolio commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_GITHUB_USERNAME/my-portfolio.git
    git push -u origin main
    ```
    *(Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username)*

## 🌎 Step 2: Go Live with Firebase App Hosting
Once your code is on GitHub, Firebase can host it for you for free.
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click on your project (or create a new one).
3.  In the left sidebar, click **Build** > **App Hosting**.
4.  Click **Get Started** and connect your GitHub account.
5.  Select your `my-portfolio` repository and the `main` branch.
6.  Click **Next** through the settings (Firebase will automatically detect it's a Next.js app).
7.  Click **Finish and Deploy**.

## 🔗 Step 3: Get Your Public URL
1.  Wait a few minutes for the "Initial Deployment" to finish.
2.  Once the status changes to **Success**, look at the top of the App Hosting dashboard.
3.  You will see a link like: `https://your-project-id.web.app`
4.  **That is your public URL!** You can now share this link on LinkedIn, your resume, or with recruiters.

## ✍️ How to Update Your Info Later
If you want to change your summary or links in the future:
1.  **Open the file**: `src/lib/data.ts`
2.  **Update the values**: Change the text or URLs inside the quotes.
3.  **Save and Push**: Run `git add .`, `git commit -m "update info"`, and `git push`. Firebase will see the change and update your live site automatically!
