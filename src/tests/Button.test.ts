/**
 * @vitest-environment happy-dom
 */

import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import Button from '../components/Button/Button.vue';

describe('Button.vue text', () => {
  const text = 'HAHAHAHA';
  test(`text ${text}`, () => {
    const wrapper = mount(Button, {
      props: { text: text }
    });
    expect(wrapper.text()).toEqual(text);
  });
});
describe('Button.vue type', () => {
  const types = ['primary', 'info'];
  types.forEach((item) => {
    test(`type ${item}`, () => {
      const wrapper = mount(Button, {
        props: { type: item }
      });
      expect(wrapper.classes()).toEqual(expect.arrayContaining([item]));
    });
  });
});

describe('Button.vue size', () => {
  const types = ['small', 'medium', 'large'];
  types.forEach((item) => {
    test(`size ${item}`, () => {
      const wrapper = mount(Button, {
        props: { size: item }
      });
      expect(wrapper.classes()).toEqual(expect.arrayContaining([item]));
    });
  });
});
