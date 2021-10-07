# lwc-conference-app

URL: [https://lwc-conference-doles.herokuapp.com/](https://lwc-conference-doles.herokuapp.com/)

API: [https://lwc-conference-doles.herokuapp.com/api/sessions](https://lwc-conference-doles.herokuapp.com/api/sessions)

##### Description

This repsotiroy is largely the follow along code for the following Trailhead Projects:

- [Build Your First Application with Lightning Web Components Open Source](https://trailhead.salesforce.com/en/content/learn/projects/build-your-first-app-with-lightning-web-components-open-source?trail_id=build-apps-lightning-web-components-open-source)
- [Access Salesforce Data with Lightning Web Components Open Source](https://trailhead.salesforce.com/en/content/learn/projects/access-salesforce-data-with-lightning-web-components-open-source?trail_id=build-apps-lightning-web-components-open-source)

##### Discovery

This was a nice foray into LWC OSS and using tools such as [create-lwc-app](https://github.com/muenzpraeger/create-lwc-app) to instantly scaffold projects and get right to developing. After completing these couple Trailheads, I did a litte more exploring myself. Simply, I wanted to alter the application to show conference data from both the API ([https://conference-lwc-app.herokuapp.com/api/sessions](https://conference-lwc-app.herokuapp.com/api/sessions)) and my own Salesforce org. While this is precisely what the Trailheads walks you through, I wanted to show both simutaneously, and deploy the finished product to Heroku. Altering the application to handle shwoing data from both sources wasn't too complicated. The major pain point I had was deploying to Heroku which would serve up both my API (data retrieved from my Salesforce org) and the frontend application. I looked everywhere I could online for guidance to no avail, and initially even had the frontend and backend in two seperate repos/deployments. However, I wanted a definitive answer and got guidance from the contributors of [create-lwc-app](https://github.com/muenzpraeger/create-lwc-app) when I posted a question/issue: [Deploying to Heroku w/ basic Express server #921](https://github.com/muenzpraeger/create-lwc-app/issues/921).
