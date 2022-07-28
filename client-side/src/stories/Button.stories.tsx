import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from "../components/Buttons/ButtonForStoryBook/Button";

export default {
  title: "Example/Button",
  component: Button,
} as ComponentMeta<typeof Button>;
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;


export const Button1 = Template.bind({});
Button1.args = {
  size: "small",
  label: "Button",
  variant:"contained",
  color:"primary",
  onClick: () => {
    alert("You clicked the Default button");
  },
};
