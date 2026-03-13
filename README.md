# Abhiram Gundekari's Portfolio

Professional student portfolio highlighting skills in Python, SQL, and web development.

## ✍️ How to Update Your Info
1.  **Open the file**: `src/lib/data.ts`
2.  **Update values**: Change the text inside the quotes for things like `summary`, `email`, or `linkedin`.
3.  **LeetCode**: To update your LeetCode link, change the `leetcode` value in the `socials` section.

## 📜 How to Add/Link Certificates
1.  **Add to List**: In `src/lib/data.ts`, find the `certifications` array. Add a new object with the name, issuer, and date.
2.  **Using a PDF file**: 
    * Upload your certificate PDF to the `public/` folder.
    * In `src/lib/data.ts`, set the `url` to `"/your-file-name.pdf"`.
3.  **Using a Website Link**: Set the `url` to the full web address (e.g., `https://coursera.org/verify/...`).

## 🚀 Step 1: Push Your Code to GitHub
To go live, your code must first be on GitHub. 

1.  Go to [GitHub](https://github.com/new) and create a new repository named `my-portfolio`. 
    * **Note:** Do **not** initialize it with a README, License, or .gitignore.
2.  Open the terminal in your editor and run:
    ```bash
    git init
    git add .
    git commit -m "Initial portfolio commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_GITHUB_USERNAME/my-portfolio.git
    git push -u origin main
    ```

## 🌎 Step 2: Go Live with Firebase App Hosting
Once your code is on GitHub, Firebase can host it for you.
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click on your project.
3.  In the left sidebar, click **Build** > **App Hosting**.
4.  Click **Get Started** and connect your GitHub account.
5.  Select your `my-portfolio` repository and click **Finish and Deploy**.

## 🔗 Step 3: Get Your Public URL
1.  Wait for the deployment to finish.
2.  Once successful, your public URL will appear at the top of the App Hosting dashboard (e.g., `https://your-project.web.app`).
