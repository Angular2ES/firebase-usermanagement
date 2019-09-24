
import {
  apply,
  mergeWith,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function schemTest(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // const { name } = _options;
    const sourceTemplate = url('./files')

    const sourceParamTemplates = apply(sourceTemplate, [
      template ({
        ..._options,
        ...strings
      })
    ])
    return mergeWith(sourceParamTemplates);//(tree, _context);

    tree.create('schemTest.js', `console.log('${name}');`);
    return tree;

  }
}
