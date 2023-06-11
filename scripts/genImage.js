const fs = require("fs");
const path = require("path");

function getFileList(path, files = []) {
  const list = fs.readdirSync(path, { encoding: 'utf-8' });
  list.forEach(item => {
      const isFile = fs.statSync(`${path}/${item}`).isFile();
      if (isFile) {
        files.push(item);
      } else {
        getFileList(`${path}/${item}`, files);
      }
  })
  return files;
}

const imagePath = path.resolve(__dirname, "../assets/images");

const templatePath = path.resolve(__dirname, "../src/index.html");

const images = getFileList(imagePath);
images.sort()

const templateContent = fs.readFileSync(templatePath, { encoding: 'utf-8' });

const newTemplateContent = templateContent.replace(/\<body\s*?\>/i, function () {

  return `<body><script>var images = ${JSON.stringify(images)}</script>`
})

fs.writeFileSync(path.resolve(__dirname, "../dist/index.html"), newTemplateContent)
console.log(newTemplateContent)