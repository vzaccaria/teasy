# 0.4.3 (2015.9.22)

#### Bug fixed

- **Fix #45 zeromq crash:** bump version of `electron-prebuilt`.


# 0.4.2 (2015.9.15)

#### Bug fixed

- **run start-hot breaks chrome refresh(CTRL+R) (#42)**: bump `electron-debug` to `0.2.1`


# 0.4.1 (2015.9.11)

#### Improvements

- **use electron-prebuilt version for packaging (#33)**


# 0.4.0 (2015.9.5)

#### Improvements

- **update dependencies**


# 0.3.0 (2015.8.31)

#### Improvements

- **eslint-config-airbnb**


# 0.2.10 (2015.8.27)

#### Features

- **custom placeholder icon**

#### Improvements

- **electron-renderer as target:** via [webpack-target-electron-renderer](https://github.com/chentsulin/webpack-target-electron-renderer)


# 0.2.9 (2015.8.18)

#### Bug fixed

- **Fix hot-reload**


# 0.2.8 (2015.8.13)

#### Improvements

- **bump electron-debug**
- **babelrc**
- **organize webpack scripts**


# 0.2.7 (2015.7.9)

#### Bug fixed

- **defaultProps:** fix typos.


# 0.2.6 (2015.7.3)

#### Features

- **menu**

#### Bug fixed

- **package.js:** include webpack build.


# 0.2.5 (2015.7.1)

#### Features

- **NPM Script:** support multi-platform
- **package:** `--all` option


# 0.2.4 (2015.6.9)

#### Bug fixed

- **Eslint:** typo, [#17](https://github.com/chentsulin/electron-react-boilerplate/issues/17) and improve `.eslintrc`


# 0.2.3 (2015.6.3)

#### Features

- **Package Version:** use latest release electron version as default
- **Ignore Large peerDependencies**

#### Bug fixed

- **Npm Script:** typo, [#6](https://github.com/chentsulin/electron-react-boilerplate/pull/6)
- **Missing css:** [#7](https://github.com/chentsulin/electron-react-boilerplate/pull/7)


# 0.2.2 (2015.6.2)

#### Features

- **electron-debug**

#### Bug fixed

- **Webpack:** add `.json` and `.node` to extensions for imitating node require.
- **Webpack:** set `node_modules` to externals for native module support.


# 0.2.1 (2015.5.30)

#### Bug fixed

- **Webpack:** #1, change build target to `atom`.


# 0.2.0 (2015.5.30)

#### Features

- **Ignore:** `test`, `tools`, `release` folder and devDependencies in `package.json`.
- **Support asar**
- **Support icon**


# 0.1.0 (2015.5.27)

#### Features

- **Webpack:** babel, react-hot, ...
- **Flux:** actions, api, components, containers, stores..
- **Package:** darwin (osx), linux and win32 (windows) platform.
