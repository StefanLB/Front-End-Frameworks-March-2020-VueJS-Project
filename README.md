![](https://img.shields.io/github/stars/StefanLB/Front-End-Frameworks-March-2020-VueJS-Project)
![](https://img.shields.io/github/issues/StefanLB/Front-End-Frameworks-March-2020-VueJS-Project)
![](https://img.shields.io/github/repo-size/StefanLB/Front-End-Frameworks-March-2020-VueJS-Project)
![](https://img.shields.io/github/license/StefanLB/Front-End-Frameworks-March-2020-VueJS-Project)

# Front-End-Frameworks-March-2020-VueJS-Project
SoftUni Front-end Frameworks Individual Project Assignment



## [Scrollol](https://scrollol-66fd7.web.app/)

### Project Summary

This **Vue.js 2.6** application represents an **entertainment platform** which can be accessed by both anonymous and registered users for the **purpose of sharing content *(images/gifs)***.

When creating a Lol *(post)*, the user provides details regarding it *(such as title, description, image URL)*, as well as a category. Lols can be modified *(liked/disliked/commented/deleted)*. Each user can only like/dislike a specific post once and the actions are mutually exclusive. While browsing, users can filter by category *(a list of all available categories is provided in the left navigation bar)*. Comments can be added to Lols, provided the user is authenticated. Once a comment is added, it can only be deleted by its creator. Users can view and update their profiles, as well as review all their posted Lols. Each user has stats, consisting of: number of posts, total points *(likes-dislikes)*, total likes, total dislikes, total comments received.

---

### Functionality

* **Anonymous users can**:
  * View all Lols *(posts)*;
  * Filter Lols by category;
  * View the about and contacts page;
  * Login;
  * Register.
  
* **Registered users can**:
  * View all Lols *(posts)*;
  * Filter Lols by category;
  * View their added Lols;
  * View a specific Lol’s details;
  * Like/Dislike Lols;
  * Post comments;
  * Delete their comments;
  * Add Lols;
  * Delete their Lols;
  * View their stats *(total posts, points, likes, dislikes, comments)*;
  *	View and update their profile;
  *	View the about and contacts page;
  * Logout.

---

### Built With

* [Vue.js 2.6](https://vuejs.org/) - Web Framework
* [Vuetify](https://vuetifyjs.com/en/) - UI/UX component library
* [Node.js](https://nodejs.org/en/) - JavaScript runtime environment
* [Npm](https://www.npmjs.com/get-npm) - Package manager
* [Firebase](https://firebase.google.com/) - Cloud-hosted NoSQL database/Server/Backend
* [Visual Studio Code](https://code.visualstudio.com/) - IDE

---

### Build and Run

Make sure you have Node.js installed on your machine.
Using the node package manager *(npm)*, install the Vue CLI.

```
npm i @vue/cli
```

All other project dependencies are listed in the **package.json** file. Install them via the package manager.

```
npm i
```

Once all dependencies are installed, build and launch the application via the package manager.

```
npm run serve
```

---

### Cloud Deployment

Deployment to Firebase cloud hosting requires Firebase CLI to be installed on your machine.
For a step-by-step guide, you may refer to the following link: [Deploy Vue.js application to Firebase](https://garywoodfine.com/deploy-vue-js-application-to-firebase/). All credits for the linked tutorial go to its author Gary Woodfine.

**Summary**:

Install Firebase CLI.
```
npm install -g firebase-tools
```

Log into Firebase.
```
firebase login
```

Build the project for production.
```
npm run build
```

Initialize a Firebase project.
```
firebase init
```

Deploy the App to Firebase.
```
firebase deploy
```

This App is currently hosted on https://scrollol-66fd7.web.app/

---

![](https://img.shields.io/github/commit-activity/w/StefanLB/Front-End-Frameworks-March-2020-VueJS-Project)
![](https://img.shields.io/github/forks/StefanLB/Front-End-Frameworks-March-2020-VueJS-Project)
![](https://img.shields.io/github/tag/StefanLB/Front-End-Frameworks-March-2020-VueJS-Project)
