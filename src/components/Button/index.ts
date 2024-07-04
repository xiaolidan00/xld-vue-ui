import Button from './Button.vue';

Button.install = function (Vue: any) {
  Vue.component(Button.name, Button);
};
export default Button;
