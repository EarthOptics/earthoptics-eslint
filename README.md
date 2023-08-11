# earthoptics-eslint

This repo provides an ESLint configurations for TypeScript projects.

- [Setup](#setup)
  - [Assumptions](#assumptions)
  - [Install dependencies](#install-dependencies)
    - [Install via `npm`](#install-via-npm)
    - [Or install via `yarn`](#or-install-via-yarn)
  - [Copy config files](#copy-config-files)
  - [Adjust configuration as needed](#adjust-configuration-as-needed)
  - [Recommended IDE extensions](#recommended-ide-extensions)
    - [VS Code](#vs-code)
      - [Base extensions](#base-extensions)
      - [Optional extensions](#optional-extensions)
  - [Create `npm scripts`](#create-npm-scripts)
    - [Vim](#vim)
- [Resources](#resources)
  - [Recommended tools](#recommended-tools)
  - [Guides and tutorials](#guides-and-tutorials)

## Setup

Install dependencies and the config itself.

### Assumptions

- NodeJS is installed.
- You have a `package.json` file in your project.
- You are using Jest for testing.
- You are using TypeScript. Note that the instructions below allow for any version `>=5`, but the
  delicate nature of these linting stacks means any plugin or dependency is subject to change.
- You have a `tsconfig.json` file in your project.

### Install dependencies

Choose one of the two installation methods. The installation includes:

- **Base dependencies:** ESLint and Prettier for linting and formatting, and TypeScript 5
- **Testing dependencies:** Jest and its TypeScript friends
- **This ESLint config:** This module itself

#### Install via `npm`

If your project already has a `package-lock.json` file, use `npm`

```sh
npm i -D 'eslint@^8.45.0' 'prettier@^2.8.8' 'typescript@^5' 'jest@~28.1.3' '@types/jest@~28.1.3' 'ts-jest@^28'
npm i -D https://github.com/EarthOptics/earthoptics-eslint
```

#### Or install via `yarn`

If your project already has a `yarn.lock` file, use `yarn`:

```sh
yarn add -D 'eslint@^8.45.0' 'prettier@^2.8.8' 'typescript@^5' 'jest@~28.1.3' '@types/jest@~28.1.3' 'ts-jest@^28'
yarn add -D https://github.com/EarthOptics/earthoptics-eslint
```

### Copy config files

Copy these files into the same directory where your `package.json` lives.

- _.prettierrc_
- _.\_eslintrc.base.cjs_ -> _.eslintrc.cjs_
- _.editorconfig_
- _.markdownlint.json_ (optional)

### Adjust configuration as needed

See in-code comments within _.eslintrc.cjs_ for details. The [eslint
docs](https://eslint.org/docs/latest/) are also excellent. Also feel free to edit _.prettierrc_ and
_.editorconfig_ and _.markdownlint.json_ as needed.

### Recommended IDE extensions

#### VS Code

##### Base extensions

If you want to enable "format on save" in your IDE, and to enforce EditorConfig settings, you'll
need to install the following extensions.

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

##### Optional extensions

- [Rewrap](https://marketplace.visualstudio.com/items?itemName=stkb.rewrap) for wrapping long lines
  of text in comments and markdown files.
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
  Markdown linting and style checking
- [Markdown
  All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one): all
  you need to write Markdown (keyboard shortcuts, table of contents, auto preview and more)

### Create `npm scripts`

Consider adding these commands to the `scripts` block of your `package.json` file. They will perform
the following actions:

- `npm run lint`: run ESLint on all TypeScript files in the project
- `npm run lint:fix`: same as `npm run lint` plus fix any issues that can be automatically fixed

```json
{
  "scripts": {
    "lint": "eslint --ext .ts,.tsx .",
    "lint:fix": "eslint --fix --ext .ts,.tsx .",
    "prettier": "prettier --write ."
  }
}
```

#### Vim

Google "Vim stuff" 😛

## Resources

### Recommended tools

- [Husky](https://typicode.github.io/husky/) for pre-commit hooks
- [lint-staged](https://github.com/okonet/lint-staged) for only linting staged files (instead of the
  entire project)

### Guides and tutorials

- [Create a reusable ESLint config](https://codinglicks.com/blog/create-a-reusable-eslint-config/)
  was very handy in setting this repo up. It clarified some of the confusion found in the [offical
  eslint guidance](https://eslint.org/docs/latest/extend/shareable-configs) on creating shared
  configs.
