# [OLD FASHION](https://INSERT LATER)

Old Fashion is a community-driven web platform where users can discover, share, and engage with a variety of drinking games. Designed for a social audience, the site allows registered users to upload their own game ideas, comment on others, and like their favorites. Each user has a personalized profile showcasing their bio, favorite drink, and uploaded games. Whether you're looking for a fun game for your next party or want to share your own creation, Old Fashion is your go-to spot for all things party games — with a stylish, pub-inspired design.

[![GitHub commit activity](https://img.shields.io/github/commit-activity/t/Stocks84/!!!!!!!)](https://github.com/Stocks84/!!!!!!/commits/main)
[![GitHub last commit](https://img.shields.io/github/last-commit/Stocks84/!!!!!!!!)](https://github.com/Stocks84/!!!!!!!/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/Stocks84/!!!!!!!!)](https://github.com/Stocks84/!!!!)

![screenshot](documentation/mockup.png)

source: [amiresponsive](https://ui.dev/amiresponsive?url=https://!!!!!!!!.herokuapp.com)

## UX

For the SKP design I had to consider the USER’S needs:
-	Website to be simple,
-	Easily fluid to get around the site,
-	Keep their data secure,
-	Option for the owner to have an administration section private only for the owner,
-	Implement CRUD design features & where needed defensive programming.

### Colour Scheme

The color scheme for Old Fashion is inspired by the warm, inviting atmosphere of a classic pub or cocktail lounge. We went with deep, smoky tones paired with subtle golds and warm neutrals to evoke a sense of nostalgia and laid-back social energy — much like the drink it's named after. These colors help create a cozy, stylish environment that encourages users to explore, contribute, and connect. The overall goal was to balance readability with aesthetic, while giving the site a unique personality that feels both fun and mature.

### Typography

For Old Fashion, we chose a typeface that blends modern clarity with vintage charm to complement the site's theme. The primary font is clean and easy to read on all screen sizes, ensuring accessibility without sacrificing style. 

## User Stories

-   As a User I can view a navbar from every page so that I can navigate easily between pages
-   As a user I can create a new account so that I can access all the features for signed up user
-   As a user I can sign in to the app so that I can access functionality for logged in users
-   As a user I can tell if I am logged in or not so that I can log in if I need to
-   As a user I can view the details of a single post so that I can learn more about it
-   As a logged out user I can see sign in and sign up options so that I can sign in/sign up
-   As a logged in user I can like a post so that I can show my support for the posts that interest me
-   As a logged in user I can create posts so that I can share my game with the world

## Features

### Existing Features

- **Sign Up-#1**

    - Once clicked on the navigation bar. The sign up form appears. If not filled correctly pop ups appear informing the user that the field has not been entered or the passwords do not match. Once completed correctly a confirmation message appears. Then a redirect to the login page. 

![screenshot](documentation/features/feature.01.png)

- **Login-#2**

    - Once correct user information is added you are then redirected to the profile page. If in correct login details are added a message will appear informing that the users login information is incorrect.

![screenshot](documentation/features/feature.02.png)

- **User Profile-#3/4**

    - If logged in, you are able to edit your profile or delete your account.
    - Once edited youcan either save changes or cancel.
    - If you delete your account a message will appear to confirm your choice.
    - Login button is now changed to Logout on the navigation bar.

![screenshot](documentation/features/feature.03.png)
![screenshot](documentation/features/feature.04.png)

- **Games-#5/6**

    - This is where all the users games are stored.
    - They are able to add a new game or delete an exsiting game.

![screenshot](documentation/features/feature.05.png)
![screenshot](documentation/features/feature.06.png)

- **Home-#7**

    - This is where all the games are stored.
    - You are able to get here via the navigation home button or via the Old Fashion title in the top left      corner.
    - Access to the view details of the game.

![screenshot](documentation/features/feature.07.png)

- **Game Details-#8/9/10**

    - This is where the user can view the rules, description, the likes, and comments.
    - The user is able to leave a like, or unlike a game.
    - Add a comment and view comments.
    - Edit their comment.
    - Delete their comment with a confirmation message.

![screenshot](documentation/features/feature.08.png)
![screenshot](documentation/features/feature.09.png)
![screenshot](documentation/features/feature.10.png)

- **Mobile View-#11**

    - For navigation there is a drop down menu.

![screenshot](documentation/features/feature.11.png)
