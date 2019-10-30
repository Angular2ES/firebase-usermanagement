* HACK
at index.html
<script>window.Materialize = window.M</script>
lib of angular2-materialize has changed the name of Materialize to M
this causes an error within materialize.css
* Materialize
changes in angular.json:
  "styles": [
    "node_modules/materialize-css/dist/css/materialize.css",
  ],
  "scripts": [
    "node_modules/jquery/dist/jquery.js",
    "node_modules/hammerjs/hammer.js",
    "node_modules/materialize-css/dist/js/materialize.js"
  ]
MaterializeModule from angular2-materialize within app.module.ts