# iMovie - Software Practice Agile

Creator: Zihan Zhang

Website: https://imovies-zihan.netlify.app/

GitLab: https://gitlab.com/H-Blues/iMovie-SPA

YouTube: https://youtu.be/uZYiR_33yTo

## Objective

- Automate the build process of a React SPA project.
- Implement the e2e tests through cypress.
- Implement basic CI&CD.

## Overview

This is a continous assignment in module "Agile Software Practice". It is mainly for automated installation, bundling, testing and deploying for a React Web App development project: [iMovie - Find you like](https://github.com/H-Blues/iMovie).

You can access the project presentation video demo via this YouTube link: https://youtu.be/uZYiR_33yTo.

Thanks for my lecturer: Diarmuid O'Connor. His tutor made me learn a lot.

## Setup Requirements

I used `npm` to manage packages in this project, and uploaded the `package.json` file. Enter `npm install` to install all the dependencies demanded.

After installing all packages, use `npm start` to run this project. Open http://localhost:3000 to view it in your browser.

Scripts listed here:

- `npm install` - install npm dependencies
- `npm start` - start the react project
- `npm run build` - bundle up this application
- `npx cypress run` - cypress E2E tests
- `npx cypress run --component` - cypress components tests
- `npm run start:ci` - run cypress E2E tests in headless mode
- `npm run start:ci:component` - run cypress components tests in headless mode

Notice: API Key is necessary to run successfully. Files `.env` and `cypress.env.json` should be created in root folder. The content in the file is like:

```js
// .env
REACT_APP_TMDB_KEY = <<Your_TMDB_API>>
FAST_REFRESH = false

// .cypress.env.json
{
  "TMDB_KEY": <<Your_TMDB_API>>
}
```

## Feature

### Automated E2E Tests

#### 1. Functionalities

- Navigation test
  - site header menu navigation
  - navigation from home page to list page
  - navigation from list page to detail page
  - navigation between movie/tv detail page to person detail page
  - navigation from favourite page to detail page
- Base test

  - the homepage contents
  - movie list, tv list and people list pages contents
  - detail page contents

- Favourite feature test

  - select and remove functions in selecting favourites
  - displays the right movie cards in favourite page

- Filtering feature test

  - filter by name in movie and tv pages
  - filter by genre in movie and tv pages
  - combined filtering

- Pagination feature test

  - display different pages via page number
  - back or forward via arrows

- Sorting feature test

  - sort by name in movie and tv pages
  - sort by time in movie and tv pages

![e2etest](https://github.com/H-Blues/iMovie-SPA/blob/main/screenshots/e2e-test.png?raw=true)

#### 2. Error/Exception testing

Use ` Cypress.on('fail', (error) => {})` to handle some exception. Refer to the document in Cypress webiste: [Uncaught Exceptions](https://docs.cypress.io/api/events/catalog-of-events#Examples).

#### 3. Cypress Custom commands

Check all custom commands in file [`cypress/support/commands.js`](https://github.com/H-Blues/iMovie-SPA/blob/main/cypress/support/commands.js). Refer to the document in Cypress website: [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands#Syntax). Syntax used:

```js
Cypress.Commands.add(name, callbackFn);
Cypress.Commands.add(name, options, callbackFn);
Cypress.Commands.addAll(callbackObj);
```

### Automated Component Tests

- display basic elements in components
- test whether the wanted function is called when events happen on a component
- add environment configuration in `cypress.config.js`
- add configuration of automated components test in `.gitlab-ci.yml`

### Continuous Integration

Check continuous integration configuration file: [.gitlab-ci.yml](https://github.com/H-Blues/iMovie-SPA/blob/main/.gitlab-ci.yml).

#### 1. Pipeline

Four stages in pipeline: install, build, test, deploy.

#### 2. Branching policy

- develop branch - execute Install and build jobs only.
- main branch - perform Install, build, and test jobs.

```
components_test:
  image: cypress/browsers:node14.16.0-chrome90-ff88
  stage: test
  only:
    - main
  script:
    - echo "Run tests in headless mode"
    - npm run start:ci:components

e2e_test:
  image: cypress/browsers:node14.16.0-chrome90-ff88
  stage: test
  only:
    - main
  script:
    - echo "Run tests in headless mode"
    - npm run start:ci

netlify:
  stage: deploy
  only:
    - main
  script:
    - echo "Visit this project at https://imovies-zihan.netlify.app/"
```

### Source Control

#### 1. Branch-Edit-Merge workflow

Eight branches created in this project.

- `main`
- `develop`
- `test_navigation`
- `test_base`
- `test_filtering`
- `test_sort`
- `test_pagination`
- `test_components`

#### 2. Git History

Here is a screenshot of part git history:

![git_history](https://github.com/H-Blues/iMovie-SPA/blob/main/screenshots/git-history-example.png?raw=true)

> Refer to git commit message standards: https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/

#### 3.Pull Request

This is changed by Yifei Ma.

### Bundling & Code splitting

This feature is to split code into various bundles which can then be loaded on demand or in parallel.

Check codes in `src/pages/` and `src/index.js`

The effect of code splitting can be presented as follows
![code-splitting](https://github.com/H-Blues/iMovie-SPA/blob/main/screenshots/code-splitting.png?raw=true)

### Continuous Deployment

Use `Netlify` to implement the simple continuous deployment, and it will delivery every time if there is update in `main` branch in gitlab.

Visit the project: https://imovies-zihan.netlify.app/
