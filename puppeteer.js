import puppeteer from "puppeteer"
import * as fs from "fs"
import prettier from "prettier"
import ext2mui from "./ext2mui.js"

let customColumnMapper = (col, res) => {}
if (fs.existsSync('./customColumnMapper.js')) {
  const module = await import('./customColumnMapper.js')
  customColumnMapper = module.default
  console.log('Using customColumnMapper')
}

let customContentReplacer = (a) => a
if (fs.existsSync('./customContentReplacer.js')) {
  const module = await import('./customContentReplacer.js')
  customContentReplacer = module.default
  console.log('Using customContentReplacer')
}

const run = async() => {
  const url = process.env.E2M_URL
  const namespaces = process.env.E2M_NS.split(',')
  fs.rmdirSync("./output", { recursive: true })
  fs.mkdirSync("./output")
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-web-security",
      "--disable-features=IsolateOrigins",
      "--disable-site-isolation-trials"
    ],
    ignoreHTTPSErrors: true

  })
  let page = await browser.newPage()
  page.on("console", (msg) => console.log(msg.text()))
  await page.goto(url)

  page.on("pageerror", function (err) {
    console.debug("!Page error: ",  err)
  })

  page.on("error", function (err) {
    console.debug("!Error: ",  err)
  })

    // we cannot pass 'customColumnMapper' as a function, so we pass it as a string
  const results = JSON.parse(await page.evaluate(ext2mui, namespaces, customColumnMapper.toString()))

  console.log("Found " + Object.keys(results).length + " grids.")

  for (const fullName in results) {
    const pieces = fullName.split(":")
    const viewName = pieces[0]
    const fileName = pieces[1] === "unknown" ? "columns.ts" : `${pieces[1]}.columns.ts`
    const path = `./output/${viewName}`
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }
    let content =  JSON.stringify(results[fullName])
    content = customContentReplacer(content)

    // replace renderCell stringyfied function with actual function
    content = content.replace(/"renderCell":"(function\([^^)]*\){)(.*?)}"/g, '"renderCell":$1/*$2*/}')

    content = "import { GridColDef } from '@mui/x-data-grid'\n\nexport const columns: GridColDef[] = " + content
    fs.writeFileSync(`${path}/${fileName}`, prettier.format(content, {
      semi: false,
      parser: "typescript",
      trailingComma: "none"
    }))
  }

  await browser.close()
}

await run()
