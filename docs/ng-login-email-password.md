## Table of Contents
- [Usage](#usage)
- [API](#api)
- [Example](#example)

<a name="usage"/>

## Usage

```html
<ng-login-email-password></ng-login-email-password>
```

<a name="api"/>

## API
| option | bind  |  type  |   default    | description  |
|:---------------------|:------:|:------:|:------------:|:-------------------------------------------------------------------------------------------------|
| redirectOnSucces     | `Input()`  | `string` | - | choose the url after succesful register
| onSucces             | `Output()` | - | this event will be fired when the login was succesful, The userCredentials is emitted
| onFailed             | `Output()` | - | this event will be fired when the login was failed, The error is emitted
