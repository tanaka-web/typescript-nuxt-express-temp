module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    'vue/multi-word-component-names': 0
  },
  overrides: [
    {
      files: ['infrastructure/**/*.ts'],
      rules: {
        camelcase: 0,
        'no-useless-constructor': 0
      }
    },
    {
      files: ['domain/model/**/*.ts'],
      rules: {
        'no-useless-constructor': 0,
        'no-redeclare': 0
      }
    },
    {
      files: ['api/controller/*.ts'],
      rules: {
        'no-console': 0
      }
    }
  ]
}
