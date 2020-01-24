## Table of Contents
- [Usage](#usage)
- [API](#api)
- [Example](#example)

<a name="usage"/>

## Usage
`import { GroupModule } from 'ng-usermanagement';`

```html
<ng-group-settings></ng-group-settings>
```

<a name="api"/>

## API
| option | bind  |  type  |   default    | description  |
|:---------------------|:------:|:------:|:------------:|:-------------------------------------------------------------------------------------------------|
| extraGroupData            | `Input()`  | `any` | - | Add extra group when updating the database

<a name="example"/>

## Example
```html
<ng-group-settings [extraGroupData]="{ description: 'example' }"></ng-group-settings>
```