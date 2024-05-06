# Ngx-DSFR

This library aims to enable developers to use the [DSFR](https://gouvfr.atlassian.net/wiki/spaces/DB/overview?homepageId=145359476) in their Angular application 😊

The DSFR is the official Design System to be used in any web app linked to the French 🇫🇷 government.

This project is built on top of the [@gouvfr/dsfr](https://www.npmjs.com/package/@gouvfr/dsfr) package and currently uses the version **1.7.2**.

## How to update to a new version of the DSFR while working on this library ?

1. Update the NPM package
   ```shell
   npm update @gouvfr/dsfr --save
   ```
2. Copy / Paste all fonts into `libs/ngx-dsfr/assets/fonts`
3. Copy / Paste all icons folders, from `~/@gouvfr/dsfr/dist/icons` into `libs/ngx-dsfr/assets/icons`
4. Copy / Paste all icons CSS definition files ( the `.min` version ), from `~/@gouvfr/dsfr/dist/utility/icons` into each associated folder in `libs/ngx-dsfr/assets/icons` :
   for instance, put `~/@gouvfr/dsfr/dist/utility/icons/icons-buildings/icons-buildings.min.css` into `libs/ngx-dsfr/assets/icons/buildings`
5. Copy / Paste the content of the core styling file `~/@gouvfr/dsfr/dist/core/core.min.css` into `libs/ngx-dsfr/assets/styling/core-styling.css`
6. Rebuild the `ngx-dsfr` library
   ```shell
   nx build ngx-dsfr
   ```
7. Re-establish a link between the new build of your library and this workspace, so that
   you can use it in the `playground` app
   ```shell
   npm link # Inside dist/libs/ngx-dsfr
   npm link @betagouv/ngx-dsfr # Inside the root of this workspace
   ```

## How to use this library ?

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

| **Component**            | **DSFR Documentation**                                                                                          |         **Available in this library**          |         **Import path**         |
|--------------------------|-----------------------------------------------------------------------------------------------------------------|:----------------------------------------------:|:-------------------------------:|
| **Accordion**            | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/accordeon                                 |                       🚫                       |              _NA_               |
| **Alert**                | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/alerte                                    |                       ✅                        |   `@betagouv/ngx-dsfr/alert`    |
| **Back to top**          | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/retour-en-haut-de-page                    | ✅ (_as a possible type in the Link Component_) |    `@betagouv/ngx-dsfr/link`    |
| **Badge**                | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/badge                                     |                       ✅                        |   `@betagouv/ngx-dsfr/badge`    |
| **Breadcrumb**           | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/fil-d-ariane                              |                       🚫                       |              _NA_               |
| **Button**               | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton                                    |                       ✅                        |   `@betagouv/ngx-dsfr/button`   |
| **Button group**         | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/groupe-de-boutons                         |                       🚫                       |              _NA_               |
| **Callout**              | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/mise-en-avant                             |                       🚫                       |              _NA_               |
| **Card**                 | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/carte                                     |                       🚫                       |              _NA_               |
| **Checkbox**             | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/case-a-cocher                             |                       ✅                        |  `@betagouv/ngx-dsfr/checkbox`  |
| **Consent banner**       | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/gestionnaire-de-consentement              |                       🚫                       |              _NA_               |
| **Content**              | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/contenu-medias                            |                       🚫                       |              _NA_               |
| **Display**              | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/parametre-d-affichage                     |                       🚫                       |              _NA_               |
| **Download**             | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/telechargement-de-fichier                 |                       🚫                       |              _NA_               |
| **Error pages**          | https://www.systeme-de-design.gouv.fr/elements-d-interface/modeles/page-d-erreurs                               |                       ✅                        | `@betagouv/ngx-dsfr/error-page` |
| **Footer**               | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/pied-de-page                              |                       ✅                        |   `@betagouv/ngx-dsfr/footer`   |
| **FranceConnect button** | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton-franceconnect                      |                       🚫                       |              _NA_               |
| **Header**               | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/en-tete                                   |                       ✅                        |   `@betagouv/ngx-dsfr/header`   |
| **Highlight**            | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/mise-en-exergue                           |                       🚫                       |              _NA_               |
| **Input**                | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/champ-de-saisie                           |                       ✅                        |   `@betagouv/ngx-dsfr/input`    |
| **Link**                 | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/lien                                      |                       ✅                        |    `@betagouv/ngx-dsfr/link`    |
| **Modal**                | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/modale                                    |                       🚫                       |              _NA_               |
| **Navigation**           | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/navigation-principale                     |                       ✅                        | `@betagouv/ngx-dsfr/navigation` |
| **Newsletter**           | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/lettre-d-information-et-reseaux-sociaux   |                       🚫                       |              _NA_               |
| **Notice**               | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bandeau-d-information-importante          |                       🚫                       |              _NA_               |
| **Pagination**           | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/pagination                                |                       🚫                       |              _NA_               |
| **Password**             | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/mot-de-passe                              |                       ✅                        |  `@betagouv/ngx-dsfr/password`  |
| **Quote**                | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/citation                                  |                       🚫                       |              _NA_               |
| **Radio button**         | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton-radio                              |                       ✅                        |   `@betagouv/ngx-dsfr/radio`    |
| **Radio rich button**    | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton-radio-riche                        |                       🚫                       |              _NA_               |
| **Search**               | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/barre-de-recherche                        |                       ✅                        | `@betagouv/ngx-dsfr/search-bar` |
| **Select**               | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/liste-deroulante                          |                       ✅                       |   `@betagouv/ngx-dsfr/select`   |
| **Share**                | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/partage                                   |                       🚫                       |              _NA_               |
| **Sidemenu**             | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/menu-lateral                              |                       🚫                       |              _NA_               |
| **Skiplink**             | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/lien-d-evitement                          |                       🚫                       |              _NA_               |
| **Stepper**              | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/indicateur-d-etapes                       |                       ✅                        |  `@betagouv/ngx-dsfr/stepper`   |
| **Summary**              | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/sommaire                                  |                       🚫                       |              _NA_               |
| **Tab**                  | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/onglet                                    |                       ✅                        |    `@betagouv/ngx-dsfr/tab`     |
| **Table**                | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tableau                                   |                       🚫                       |              _NA_               |
| **Tag**                  | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tag                                       |                       ✅                        |    `@betagouv/ngx-dsfr/tag`     |
| **Tile**                 | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tuile                                     |                       ✅                        |    `@betagouv/ngx-dsfr/tile`    |
| **Toggle**               | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/interrupteur                              |                       ✅                        |   `@betagouv/ngx-dsfr/toggle`   |
| **Transcription**        | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/transcription                             |                       🚫                       |              _NA_               |
| **Translate**            | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/selecteur-de-langue                       |                       🚫                       |              _NA_               |
| **Upload**               | https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/ajout-de-fichier                          |                       🚫                       |              _NA_               |

<hr>

_This library was generated with [Nx](https://nx.dev)._

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Build

Run `nx build ngx-dsfr` to build the project. The build artifacts will be stored in the `dist/libs/ngx-dsfr` directory.

The `build` phase actually goes through 3 steps:

- the actual build of the library through the `package` executor
  of the `@nx/angular` Nx plugin. It uses [ng-packagr](https://github.com/ng-packagr/ng-packagr)
  under the hood
- a second step where some CSS paths are rewritten within the CSS files copied
  from the `@gouvfr/dsfr` project to match the new project structure. The `adapt-css-paths` executor
  from our own `@ngx-dsfr/architect` Nx plugin is used here
- a third step where the `core-styling.scss` file is compiled into CSS, thanks to the [sass](https://www.npmjs.com/package/sass) package

## Running unit tests

Run `nx test ngx-dsfr` to execute the unit tests.
