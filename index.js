/**
 * @file 入口文件
 * @author pashangshangpo
 * @createTime 2018年5月19日 上午11:38
 */

const fs = require('fs')
const http = require('http')
const { execSync } = require('child_process')
const { join } = require('path')
const template = require('art-template')
const RenderPDF = require('chrome-headless-render-pdf')

template.defaults.escape = false

/**
 * @start-def: convert: (config, outputDir) => undefined
 *   templateName: String 模板名
 *   config: Object
 *     name: String 姓名
 *     age: number 年龄
 *     sex: String 性别
 *     tel: String 手机号
 *     email: String 邮箱
 *     education: String 学历
 *     expectCity: String 期望城市
 *     expectedSalary: String 期望薪资
 *     jobIntension: String 求职意向
 *     currentState: String 当前状态 如: 在职, 求职中
 *     personalWebsite: Array [Item] 个人网站
 *       Item: Object
 *         name: String 名称
 *         url: String 网址
 *     toIntroduceMyself: String 自我介绍
 *     workExperience: Array [Item] 工作经历
 *       Item: Object
 *         time: String 时间
 *         company: String 公司
 *         describe: String 描述
 *     projectExperience: Array [Item] 项目经验
 *       Item: Object
 *         name: String 名称
 *         describes: Array 描述列表
 *     works: Array [Item] 作品
 *       Item: Object
 *         name: String 类名
 *         list: Array [Item] 作品列表
 *           Item: Object
 *             name: String 作品名
 *             describe: String 作品描述
 *             url: String 作品地址
 *     outputFileName: String 输出的文件名
 *   outputDir: String 输出目录路径
 */

const outputFile = (templateName, config) => {
  const html = template(join(__dirname, 'template', templateName, 'index.html'), config)
  const tempOutput = join(__dirname, 'output')

  if (!fs.existsSync(tempOutput)) {
    fs.mkdirSync(tempOutput)
  }

  execSync(`cp -r template/${templateName} ${tempOutput}`, { cwd: __dirname })
  fs.writeFileSync(join(tempOutput, templateName, 'index.html'), html)
}

module.exports = (templateName, config, outputDir) => {
  const port = 8123
  const currentTemplate = join(__dirname, 'output', templateName)

  outputFile(templateName, config)

  http.createServer((req, res) => {
    let url = req.url
    if (url === '/') {
      url = '/index.html'
    }

    if (fs.existsSync(join(currentTemplate, url))) {
      res.end(fs.readFileSync(join(currentTemplate, url)).toString())
    }
    else {
      res.end()
    }
  }).listen(port)

  if (process.argv.slice(2)[0] !== 'dev') {
    RenderPDF.generateSinglePdf(
      `http://127.0.0.1:${port}`,
      join(outputDir, config.outputFileName + '.pdf'),
      {
        noMargins: true,
        includeBackground: true
      }
    ).then(() => {
      process.exit(0)
    })
  }
}