/** @type {import('style-dictionary').Config} */
export default {
  usesDtcg: true, // Use Design Token Standard format

  // extracted from https://www.figma.com/design/JrDADDCPPDV6rl6jL5oHHn/Riviera-Dev-2015
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
          destination: './src/styles/_theme.vars.scss'
        }
      ]
    }
  }
};
