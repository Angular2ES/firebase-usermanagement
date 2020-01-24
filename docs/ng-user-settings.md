## Table of Contents
- [Usage](#usage)
- [API](#api)
- [Example](#example)

<a name="usage"/>

## Usage

```html
<ng-user-settings></ng-user-settings>
```

<a name="api"/>

## API
| option | bind  |  type  |   default    | description  |
|:---------------------|:------:|:------:|:------------:|:-------------------------------------------------------------------------------------------------|
| redirectOnLogout            | `Input()`  | `string` | - | choose the url after succesful logout
| addExtraData            | `Input()`  | `any` | - | add extra user data

<a name="example"/>

## Example
```html
<ng-user-settings [redirectOnLogout]="/login" [addExtraData]="{ age: 18 }"></ng-user-settings>
```