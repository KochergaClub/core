import styled from 'styled-components';

import { Button, Row } from '@kocherga/frontkit';

const Input = styled.input`
  padding: 12px 16px;
  border: none;
`;

const Mailchimp = () => (
  <Row stretch gutter={12}>
    <Input type="email" placeholder="Ваш E-mail" />
    <Button>Send</Button>
  </Row>
);

export default Mailchimp;
