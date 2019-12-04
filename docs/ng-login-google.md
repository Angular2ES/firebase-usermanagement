## Table of Contents
- [Usage](#usage)
- [API](#api)
- [Example](#example)

<a name="usage"/>

## Usage

```html
<ng-login-google></ng-login-google>
```

<a name="api"/>

## API
| option | bind  |  type  |   default    | description  |
|:---------------------|:------:|:------:|:------------:|:-------------------------------------------------------------------------------------------------|
| redirectOnSucces            | `Input()`  | `string` | - | choose the url after succesful register
| googleProviderConfig            | `Input()`  | `string` | `popup` | set the login with the following options: 'redirect', 'popup'
| onSucces            | `Output()`  | `userCredentials`   | - | this event will be fired when the login was succesful, The userCredentials is emitted
| onFailed            | `Output()`  | `any` | - | this event will be fired when the login was failed, The error is emitted

<a name="example"/>

## Example
```html
<ng-login-google [redirectOnSucces]="/home" [googleProviderConfig]="redirect"></ng-login-google>
```