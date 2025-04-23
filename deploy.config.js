module.exports = {
  // 部署目标配置
  targets: {
    development: {
      host: 'localhost',
      port: 8080,
      path: '/var/www/html',
    },
    production: {
      host: 'your-production-server.com',
      port: 22,
      path: '/var/www/html',
    },
  },

  // 构建配置
  build: {
    // 构建输出目录
    outputDir: 'dist',
    
    // 是否生成 sourcemap
    sourcemap: false,
    
    // 是否压缩代码
    minify: true,
    
    // 是否生成 gzip 压缩文件
    gzip: true,
    
    // 是否生成 brotli 压缩文件
    brotli: true,
  },

  // 部署前执行的命令
  beforeDeploy: [
    'npm run build',
    'npm run test',
  ],

  // 部署后执行的命令
  afterDeploy: [
    'pm2 restart silent-witness',
  ],
}; 