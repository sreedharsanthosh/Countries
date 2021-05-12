import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
    overflow-x: hidden,
  }
  input {
      background: ${({ theme }) => theme.input}
  }
  select {x 
      background: ${({ theme }) => theme.select}
  }
  button {
      background: ${({ theme }) => theme.button}
  }`;
