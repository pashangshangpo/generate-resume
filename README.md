# generate-resume
生成简历工具

## 使用说明

由于使用到了chrome headless, 因此需要你的chrome版本大于59, 主要是用chrome来生成pdf文件, 尝试过使用其他的一些html to pdf方案, 但是效果不太好, 最后还是觉得chrome生成的pdf效果好一些

如果你需要修改模板, 或者新增模板则需要安装pm2, 如果只使用默认的模板则不需要安装

```
npm install pm2 -g
```

git clone https://github.com/pashangshangpo/generate-resume.git

## 示例
新建一个test.js

```
const toPdf = require('./index')

toPdf(
  'default',
  {
    name: 'pashangshangpo',
    sex: '男',
    age: 21,
    tel: '18000000000',
    email: 'pssp@pashangshangpo.com',
    education: '本科',
    expectCity: '北京',
    expectedSalary: '面议',
    jobIntension: 'Web前端工程师',
    currentState: '求职中',
    personalWebsite: [
      {
        name: 'github',
        url: 'https://github.com/pashangshangpo?tab=repositories'
      },
      {
        name: '博客2',
        url: '网址2'
      }
    ],
    toIntroduceMyself: '个人介绍.........',
    workExperience: [
      {
        time: '2017.01 ~ 至今',
        company: 'xx科技有限公司 | Web前端工程师',
        describe: '负责什么.....'
      },
      {
        time: '2013.02 ~ 2017.01',
        company: 'xx科技有限公司 | Web前端工程师',
        describe: '负责什么....'
      }
    ],
    projectExperience: [
      {
        name: '项目1名称',
        describes: [
          '项目背景: xxxx',
          '项目难点: xxxxxx',
          '其他描述......'
        ]
      },
      {
        name: '项目2名称',
        describes: [
          '项目背景: xxxx',
          '项目难点: xxxxxx',
          '其他描述......'
        ]
      },
      {
        name: '项目3名称',
        describes: [
          '项目背景: xxxx',
          '项目难点: xxxxxx',
          '其他描述......'
        ]
      }
    ],
    works: [
      {
        name: '开源项目',
        list: [
          {
            name: '项目名1',
            describe: '项目描述',
            url: '项目地址'
          },
          {
            name: '项目名2',
            describe: '项目描述',
            url: '项目地址'
          },
          {
            name: '项目名3',
            describe: '项目描述',
            url: '项目地址'
          }
        ]
      },
      {
        name: '演讲和讲义',
        list: [
          {
            name: 'xxxx年xx月团队分享: 简短的描述信息',
            url: '有相关链接最好了'
          },
          {
            name: 'xxxx年xx月团队分享: 简短的描述信息'
          }
        ]
      }
    ],
    outputFileName: '姓名_xx年工作经验_应聘Web前端工程师'
  },
  __dirname
)
```

执行node test.js后, 即可在输出的目录看到生成的相关文件

## 参数说明

```
/**
 * .def: (templateName, config, outputDir) => undefined
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
 ```

如果不想用默认的模板, 可以在template中自己新建一个, 然后使用的时候把相应的模板名传递过去, 模板的使用语法可以看下[art-template](https://aui.github.io/art-template/), 如果是自己新建模板, 则config可以自己定义, 不需要按照默认的来写

如果需要调试样式和模板, 则使用npm run start, 然后打开 http://127.0.0.1:8123 即可看到效果

## 注意事项

如果使用了npm run start, 之后希望生成pdf, 则需要先执行一下pm2 delete generate-resume, 然后再使用node test.js进行输出pdf