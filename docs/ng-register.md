## Table of Contents
- [Usage](#usage)
- [API](#api)
- [Example](#example)

<a name="usage"/>

## Usage

```html
<ng-register></ng-register>
```

<a name="api"/>

## API
| option | bind  |  type  |   default    | description  |
|:---------------------|:------:|:------:|:------------:|:-------------------------------------------------------------------------------------------------|
| redirectOnSucces            | `Input()`  | `string` | - | choose the url after succesful register
| extraData            | `Input()`  | `Object` | - | Send extra data to the database on registering the user

<a name="example"/>

## Example
```html
<ng-register [redirectOnSucces]="/home" [extraData]="{ displayName: Jan }"></ng-register>
```