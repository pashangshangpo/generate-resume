/**
 * @file pm2配置
 * @author pashangshangpo
 * @createTime 2018年5月19日 下午2:49
 */

module.exports = {
  apps: [
    {
      name: 'generate-resume',
      script: './test.js',
      args: 'dev',
      watch: [
        'index.js',
        'test.js',
        'template'
      ],
      ignore_watch: [
        'node_modules'
      ]
    }
  ]
}
