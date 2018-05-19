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
 *     workExperience: Array [Item] 工作经验
 *       Item: String
 *     projectExperience: Array [Item] 项目经验
 *       Item: String
 *     works: Array [Item] 作品
 *       Item: Object
 *         name: String 名称
 *         list: Array [Item] 作品列表
 *           Item: String
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
  }).listen(8123)
}