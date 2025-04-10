# SoftCasino
<h3>SoftCasino</h3>
SoftCasino is online gambling casino. People can sign up, play official Soft games or just chat around with other people. SoftCasino has loyality system which rewards people who play continuously, people can buy online merch which is set by admin, also they can change profile settings like username, see how much amount they have won and other statistics and on top of everything SoftCasino doesnt save your credit card information so you can safely input your credit card info our service will use it only once and wont save it on the site.

<h3>Project architecture</h3>
The SPA (front end) is devided into folders. Into the main folder (src) we have api, components, constans, context, hooks, layouts, page, utils and the main.jsx and app.jsx. The website requester which makes calls to our back end server is placed inside the api folder. components folder contains all of the reusable components, constants holds certain site needed constants, context folder is managing the auth context for the website, hooks folder holds important hooks for forms, fetch, router guards and chat, layouts folder holds each page layout (the whole page is being treated as an layout), page folder holds the main wrapper in which the layout pages go and the login and the register page and utils holds utils for our arcade and slot games. The registered users can do all CRUD operations. Guests can only see the shop page and game page.

<h2>How to run</h2>
<h3>React</h3>
Open the front end folder (SoftCasino) with vs code and type into the terminal npm run dev.

<h3>Express</h3>
Open the back end folder (server) with vs code and type npm run start to run it or just node src/index.js.

<h2>Some pictures from the app</h2>

![image](https://github.com/user-attachments/assets/3744716c-ad77-4e34-9ea7-7160e52cd3bb)

![image](https://github.com/user-attachments/assets/23062c04-6163-4eb9-b4c9-b2530064b9d3)

![image](https://github.com/user-attachments/assets/8ec69c3b-0f7c-4977-b056-869b800bcc49)

![image](https://github.com/user-attachments/assets/c4ea2573-631d-4ba4-b5ee-37d64b3dd442)
