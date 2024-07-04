import * as comps from './components';
export * from './components';
export const allComps = comps;
export default {
  install: (Vue: any) => {
    for (const k in comps) {
      const c = comps[k as keyof typeof comps];
      Vue.component(c.name, c);
    }
  }
};
