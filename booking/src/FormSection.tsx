import * as React from 'react';

import styled from 'styled-components';

import { Section, Header } from './components/ui';

interface HeaderProps {
  valid: boolean;
}

const FormHeader = styled(Header)`
  font-weight: bold;
  color: ${(props: HeaderProps) => (props.valid ? 'black' : 'red')};
  margin-bottom: 4px;
`;

interface Props {
  title?: string;
  children: React.ReactNode;
  valid?: boolean;
}

const FormSection = ({ title = '', children, valid = true }: Props) => (
  <Section>
    <FormHeader valid={valid}>{title ? title + ':' : ''}</FormHeader>
    {children}
  </Section>
);

export default FormSection;
