import * as path from "node:path";

/**
 * Compute relative path to a root file with posix separator
 * @param pathFromRoot
 * @returns {string}
 */
const getPosixRelativePathFromRoot = (pathFromRoot) => {
  const relativeRoot = path.relative( path.resolve(process.cwd()),path.join( import.meta.dirname, '..', '..', '..' )).replaceAll(path.sep, path.posix.sep);
  return path.posix.join(relativeRoot, pathFromRoot);
}
/** @type {import('style-dictionary').Config} */
export default {
  usesDtcg: true, // Use Design Token Standard format

  // extracted from "../../Riviera Dev 2025.fig"
  source: [
    getPosixRelativePathFromRoot( 'contracts/design-token/*.tokens.json')
  ],

  log: {
    warnings: 'disabled'
  },

  platforms: {
    css: {
      options: {
        outputReferences: true
      },
      transformGroup: 'css',
      files: [
        {
          format: 'css/variables',
          destination: getPosixRelativePathFromRoot('frontend/apps/todo-ui/src/styles/generated/_theme.vars.scss')
        }
      ]
    }
  }
};
