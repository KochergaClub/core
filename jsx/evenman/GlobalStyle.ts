import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
main {
  margin-bottom: 200px;
}

textarea {
  line-height: 1.5;
}

@font-face {
  font-family: 'Intro';
  src: local('Intro'), url('/static/fonts/intro.woff2') format('woff2'), url('/static/fonts/intro.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

.ui-disabled {
  background-color: lightgrey;
  opacity: 0.6;
  pointer-events: none;
}

hr {
  border: 0;
  height: 1px;
  width: 100%;
  background: #ddd;
  margin-top: 20px;
  margin-bottom: 20px;
}

.SingleDatePickerInput {
  line-height: 1.2;
}
.DateInput.DateInput {
  width: 90px;
  line-height: inherit;
}
.DateInput input {
  font-size: 0.9em;
  line-height: inherit;
  border-bottom: none;
  padding: 0 4px;
}
`;

export default GlobalStyle;
