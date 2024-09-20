import fs from 'fs';

function createIndex() {
  const files = fs.readdirSync('src/components');
  const exportStr = [];
  files.forEach((item) => {
    if (item === 'index.ts') return;
    exportStr.push(`export { default as X${item} } from "./${item}";`);
    fs.writeFileSync(
      `src/components/${item}/index.ts`,
      `import ${item} from "./${item}.vue";

${item}.install = function (Vue: any) {
  Vue.component(${item}.name, ${item});
};
export default ${item};`
    );
    fs.writeFileSync('src/components/index.ts', exportStr.join('\n'));
  });
}
createIndex();
