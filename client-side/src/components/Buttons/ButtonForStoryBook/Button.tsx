import * as React from "react";
import { Button as MButton } from "@material-ui/core"

type ButtonStyle = {
  [property: string]: string;
}

type variant= 'outlined'|'contained'

type color= 'primary'|'secondary'

type size= 'small'|'medium'|'large'

type label= 'Button' | 'बटन'

export interface ButtonProps {
  variant:variant;
  label: label;
  color:color,
  size: size;
  onClick: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = ({ label,variant,color,size, onClick }) => {
  return (
    <MButton  variant={variant} color={color} size={size} onClick={onClick}>{label}</MButton>
  );
};
export default Button;