export default{
    //tests文件夹下
    roots: ['<rootDir>/src/tests'],
    testRegex: '(.+)\\.test\\.(jsx?|tsx?)$',
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
  };