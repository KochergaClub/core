import { Button, Row } from '~/frontkit';

const Mailchimp = () => (
  <Row stretch gutter={12}>
    <input
      className="px-4 py-3 border-0"
      type="email"
      placeholder="Ваш E-mail"
    />
    <Button>Send</Button>
  </Row>
);

export default Mailchimp;
