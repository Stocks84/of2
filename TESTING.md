# Testing

> [!NOTE]  
> Return back to the [README.md](README.md) file.

## Code Validation

### CSS

I have used the recommended [CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator) to validate all of my CSS files.

| Directory | File | Screenshot | Notes |
| --- | --- | --- | --- |
| static | App.css | ![screenshot](documentation/validation/App.css.png) | |
| static | CustomStyles.css | ![screenshot](documentation/validation/CustomStyles.css.png) | |

### JavaScript

I have used the recommended [ESLint Validator](https://eslint.org) to validate all of my JS files.

| Directory | File | Screenshot | Notes |
| --- | --- | --- | --- |
| components | GameCard.js | ![screenshot](documentation/validation/gamecard_js.png) | |
| components | GameDetails.js | ![screenshot](documentation/validation/gamedetails_js.png) | |
| components | NavBar.js | ![screenshot](documentation/validation/navbar_js.png) | |
| components | SignUpForm.js | ![screenshot](documentation/validation/signupform_js.png) | |
| pages | GameDetailsPage.js | ![screenshot](documentation/validation/gamedetailspage_js.png) | |
| pages | GamesPage.js | ![screenshot](documentation/validation/gamespage_js.png) | |
| pages | HomePage.js | ![screenshot](documentation/validation/homepage_js.png) | |
| pages | LoginPage.js | ![screenshot](documentation/validation/loginpage_js.png) | |
| pages | SignUpPage.js | ![screenshot](documentation/validation/signuppage_js.png) | |
| pages | UserProfilePage.js | ![screenshot](documentation/validation/userprofilepage_js.png) | |


## Browser Compatibility

I've tested my deployed project on multiple browsers to check for compatibility issues.

| Browser | Home | About | Contact | etc | Notes |
| --- | --- | --- | --- | --- | --- |
| Chrome | ![screenshot](documentation/browsers/browser-chrome-home.png) | - | Works as expected |
| Firefox | ![screenshot](documentation/browsers/browser-firefox-home.png) | - | Works as expected |
| Safari | ![screenshot](documentation/browsers/browser-safari-home.png) | - | Works as expected |

## Responsiveness

I've tested my deployed project on multiple devices to check for responsiveness issues.

| Device | Home | Notes |
| --- | --- | --- |
| Mobile (DevTools) | ![screenshot](documentation/responsiveness/responsive-mobile-home.png) | Works as expected |
| Tablet (DevTools) | ![screenshot](documentation/responsiveness/responsive-tablet-home.png) | Works as expected |
| Desktop | ![screenshot](documentation/responsiveness/responsive-desktop-home.png) | Works as expected |


### Manual Testing – Frontend

| Feature         | Steps                                                                 | Expected Result                                     | Actual Result                                     | Pass/Fail | Screenshot |
|-----------------|----------------------------------------------------------------------|-----------------------------------------------------|--------------------------------------------------|-----------|------------|
| Sign Up         | Go to `/signup`, fill out form, submit                               | User account created and redirected to login page   | Works as expected                                | ✅ Pass   | ![Sign Up](documentation/testing/signup.png) |
| Login           | Go to `/login`, enter valid credentials                              | Redirect to `/profile` page, navbar updates         | Works as expected                                | ✅ Pass   | ![Login](documentation/testing/login.png) |
| Invalid Login   | Enter wrong password at `/login`                                     | Error message shown                                 | Error displayed correctly                        | ✅ Pass   | |
| Logout          | Click "Logout" in navbar                                             | User logged out, redirected to `/login`             | Works as expected                                | ✅ Pass   | ![Logout](documentation/testing/logout.png) |
| Navbar Links    | Click "Home", "Games", "Profile"                                     | Navigate to correct page                            | Works as expected                                | ✅ Pass   | |
| Navbar (Mobile) | Resize window, open hamburger menu                                   | Menu expands, links visible                      umentation/testing/ visible                  | ✅ Pass    | ![Navbar Mobile](documentation/testing/navbar-mobile.png) |
| Games List      | Go to `/games`                                                       | Games displayed in grid                             | Works as expected                                | ✅ Pass   | ![Games List](documentation/testing/games-list.png) |
| Load More Games | Click "Load More" on homepage                                        | Additional games load without duplicates            | Works as expected                                | ✅ Pass   | |
| Game Details    | Click a game card → `/games/:id`                                     | Game title, description, and comments displayed     | Works as expected                                | ✅ Pass   | ![Game Details](documentation/testing/game-details.png) |
| Add Comment     | In Game Details, enter text and submit                               | Comment appears below game                          | Works as expected                                | ✅ Pass   | |
| Delete Comment  | Click "Delete" on own comment                                        | Comment removed                                     | Works as expected                                | ✅ Pass   | |
| Like/Unlike     | Click "Like" button, then "Unlike"                                   | Like count updates accordingly                      | Works as expected                                | ✅ Pass   | |
| Profile View    | Go to `/profile`                                                     | User details displayed                              | Works as expected                                | ✅ Pass   | ![Profile View](documentation/testing/profile-view.png) |
| Edit Profile    | On `/profile`, click "Edit Profile", change values, save             | Profile updates and displays new info               | Works as expected                                | ✅ Pass   | ![Edit Profile](documentation/testing/edit-profile.png) |
| Delete Account  | On `/profile`, click "Delete Account" → confirm                      | Account deleted, redirected to `/`                  | Works as expected                                | ✅ Pass   | ![Delete Account](documentation/testing/delete-account.png) |
