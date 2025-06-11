/** @type {import('style-dictionary').Config} */
export default {
  usesDtcg: true, // Use Design Token Standard format

  // extracted from "../../Riviera Dev 2025.fig"
  source: [
    '../../../contracts/design-token/*.tokens.json'
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
          destination: '../../../generated/styles/_theme.vars.scss'
        }
      ]
    }
  }
};
