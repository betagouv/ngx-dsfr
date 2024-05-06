# Ngx-DSFR

This MonoRepo holds everything pertaining to the development of the adaptation of the official [French State Design System](https://www.systeme-de-design.gouv.fr/)
( _aka **DSFR**_ ).

See individual `README` files in each folder within the `apps/` and `libs/` directories for further details about each of these
projects.

You will find the `ngx-dsfr` library in the `libs/ngx-dsfr` folder and the `playground` app in the `apps/playground` folder respectively.

<blockquote>
😊 The <code>playground</code> app will enable you to get an interactive documentation of each Component available in the <code>ngx-dsfr</code> library 👍
</blockquote>

## How to use the ngx-dsfr library ?

### Pre-requisites

First things first, in order to properly display anything provided by this library, you need to add to your app
the required stylesheets.

- If you're into an Angular CLI workspace, get into your `angular.json` file.
- If you're into an Nx workspace, get into your `project.json` file.

Then add this:

```
"node_modules/@betagouv/ngx-dsfr/assets/styling/core-styling.css",
"node_modules/@betagouv/ngx-dsfr/assets/icons/system/icons-system.min.css",
```

into the `styles` property of your `build` target:

```json
"targets": {
    "build": {
      "executor": "@angular-devkit/build-angular:browser",
      ...,
      "options": {
        ...,
        "styles": [
          ...,
          "node_modules/@betagouv/ngx-dsfr/assets/styling/core-styling.css",
          "node_modules/@betagouv/ngx-dsfr/assets/icons/system/icons-system.min.css",
          ...
        ],
        ...
      },
```

### The Module system

Just like [@angular/material](https://material.angular.io/), this library has secondary entry-points to make sure you don't need to take
the whole project with you when you're bundling an app that relies on _only a few parts_ of it.

For instance, maybe your app only needs the link and header modules and not the rest of the library. In that case,
instead of having to embark with you the whole weight of `ngx-dsfr`, you just have to:

```typescript
import { DsfrLinkModule } from '@betagouv/ngx-dsfr/link';
import { DsfrHeaderModule } from '@betagouv/ngx-dsfr/header';
```

And only the files enabling these features will be bundled into your built app 😃

Please refer to the associated `README` file for each module in this project to get further details on how to use it 😉

### Icons

With the same goal to enable you to make your reliance on this library as lightweight as possible, you'll need to add
a specific CSS file to your app's configuration for each icon category described in the [DSFR's doc](https://gouvfr.atlassian.net/wiki/spaces/DB/pages/222331396/Ic+nes+-+Icons#S%C3%A9lection-d%E2%80%99ic%C3%B4nes).

_For instance_, if you need to use the `ancient-gate-fill` icon, you'll first need to add

```
"node_modules/@betagouv/ngx-dsfr/assets/icons/buildings/icons-buildings.min.css"
```

to your `angular.json` or `project.json`, just like stated in the **Pre-requisites** section.

## Available DSFR Components in this library

| **Component**            | **DSFR Documentation**                                                                                          |                                                             **Available in this library**                                                             |                         **Import path**                         |
|--------------------------|-----------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------:|
| **Accordion**            | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/accordeon                                 |                                                                          🚫                                                                           |                              _NA_                               |
| **Alert**                | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/alerte                                    |                                                                           ✅                                                                           |                   `@betagouv/ngx-dsfr/alert`                    |
| **Back to top**          | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/retour-en-haut-de-page                    |                                                    ✅ (_as a possible type in the Link Component_)                                                     |                    `@betagouv/ngx-dsfr/link`                    |
| **Badge**                | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/badge                                     |                                                                           ✅                                                                           |                   `@betagouv/ngx-dsfr/badge`                    |
| **Breadcrumb**           | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/fil-d-ariane                              |                                                                          🚫                                                                           |                              _NA_                               |
| **Button**               | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton                                    |                                                                           ✅                                                                           |                   `@betagouv/ngx-dsfr/button`                   |
| **Button group**         | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/groupe-de-boutons                         |                                                                          🚫                                                                           |                              _NA_                               |
| **Callout**              | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/mise-en-avant                             |                                                                          🚫                                                                           |                              _NA_                               |
| **Card**                 | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/carte                                     |                                                                          🚫                                                                           |                              _NA_                               |
| **Checkbox**             | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/case-a-cocher                             |                                                                           ✅                                                                           |                  `@betagouv/ngx-dsfr/checkbox`                  |
| **Consent banner**       | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/gestionnaire-de-consentement              |                                                                          🚫                                                                           |                              _NA_                               |
| **Content**              | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/contenu-medias                            |                                                                          🚫                                                                           |                              _NA_                               |
| **Display**              | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/parametre-d-affichage                     |                                                                          🚫                                                                           |                              _NA_                               |
| **Download**             | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/telechargement-de-fichier                 | ✅ (_as a possible type in the Link Component_)<br/>✅ (_as a possible type in the Tile Component_)<br/>🚫 (_as a possible type in the Card Component_) | `@betagouv/ngx-dsfr/link`<br/>  `@betagouv/ngx-dsfr/tile`       |
| **Error pages**          | https://www.systeme-de-design.gouv.fr/elements-d-interface/modeles/page-d-erreurs                               |                                                                           ✅                                                                           |                 `@betagouv/ngx-dsfr/error-page`                 |
| **Footer**               | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/pied-de-page                              |                                                                           ✅                                                                           |                   `@betagouv/ngx-dsfr/footer`                   |
| **FranceConnect button** | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton-franceconnect                      |                                                                          🚫                                                                           |                              _NA_                               |
| **Header**               | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/en-tete                                   |                                                                           ✅                                                                           |                   `@betagouv/ngx-dsfr/header`                   |
| **Highlight**            | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/mise-en-exergue                           |                                                                          🚫                                                                           |                              _NA_                               |
| **Input**                | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/champ-de-saisie                           |                                                                           ✅                                                                           |                   `@betagouv/ngx-dsfr/input`                    |
| **Link**                 | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/lien                                      |                                                                           ✅                                                                           |                    `@betagouv/ngx-dsfr/link`                    |
| **Modal**                | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/modale                                    |                                                                          🚫                                                                           |                              _NA_                               |
| **Navigation**           | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/navigation-principale                     |                                                                           ✅                                                                           |                 `@betagouv/ngx-dsfr/navigation`                 |
| **Newsletter**           | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/lettre-d-information-et-reseaux-sociaux   |                                                                          🚫                                                                           |                              _NA_                               |
| **Notice**               | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bandeau-d-information-importante          |                                                                          🚫                                                                           |                              _NA_                               |
| **Pagination**           | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/pagination                                |                                                                          🚫                                                                           |                              _NA_                               |
| **Password**             | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/mot-de-passe                              |                                                                           ✅                                                                           |                  `@betagouv/ngx-dsfr/password`                  |
| **Quote**                | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/citation                                  |                                                                          🚫                                                                           |                              _NA_                               |
| **Radio button**         | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton-radio                              |                                                                           ✅                                                                           |                   `@betagouv/ngx-dsfr/radio`                    |
| **Radio rich button**    | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton-radio-riche                        |                                                                          🚫                                                                           |                              _NA_                               |
| **Search**               | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/barre-de-recherche                        |                                                                           ✅                                                                           |                 `@betagouv/ngx-dsfr/search-bar`                 |
| **Select**               | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/liste-deroulante                          |                                                                          🚫                                                                           |                              _NA_                               |
| **Share**                | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/partage                                   |                                                                          🚫                                                                           |                              _NA_                               |
| **Sidemenu**             | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/menu-lateral                              |                                                                          🚫                                                                           |                              _NA_                               |
| **Skiplink**             | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/lien-d-evitement                          |                                                                          🚫                                                                           |                              _NA_                               |
| **Stepper**              | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/indicateur-d-etapes                       |                                                                           ✅                                                                           |                  `@betagouv/ngx-dsfr/stepper`                   |
| **Summary**              | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/sommaire                                  |                                                                          🚫                                                                           |                              _NA_                               |
| **Tab**                  | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/onglet                                    |                                                                           ✅                                                                           |                    `@betagouv/ngx-dsfr/tab`                     |
| **Table**                | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tableau                                   |                                                                          🚫                                                                           |                              _NA_                               |
| **Tag**                  | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tag                                       |                                                                           ✅                                                                           |                    `@betagouv/ngx-dsfr/tag`                     |
| **Tile**                 | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tuile                                     |                                                                           ✅                                                                           |                    `@betagouv/ngx-dsfr/tile`                    |
| **Toggle**               | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/interrupteur                              |                                                                           ✅                                                                           |                   `@betagouv/ngx-dsfr/toggle`                   |
| **Transcription**        | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/transcription                             |                                                                          🚫                                                                           |                              _NA_                               |
| **Translate**            | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/selecteur-de-langue                       |                                                                          🚫                                                                           |                              _NA_                               |
| **Upload**               | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/ajout-de-fichier                          |                                                                           ✅                                                                           |                   `@betagouv/ngx-dsfr/upload`                   |


<hr/>

_This project was generated using [Nx](https://nx.dev)._

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nx/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nx/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nx/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@ngx-dsfr/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nx/angular:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
