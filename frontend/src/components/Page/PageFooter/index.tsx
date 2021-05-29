import { SocialIcons } from '../PageMenu/SocialIcons';
import { footerParts } from './constants';
import { FooterGroup } from './FooterGroup';
import Mailchimp from './Mailchimp';
import { PartLinks } from './PartLinks';

export const PageFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-10 px-10 sm:px-16 print:hidden">
      <div className="flex flex-wrap flex-col justify-between my-10 gap-8 sm:flex-row sm:gap-4">
        {footerParts.map((part, i) => (
          <FooterGroup title={part.title} key={i}>
            <PartLinks items={part.items} />
          </FooterGroup>
        ))}
        <FooterGroup title="Подпишитесь">
          <div className="space-y-4">
            {false && <Mailchimp />}
            <SocialIcons />
          </div>
        </FooterGroup>
      </div>
      <small className="text-xs leading-tight text-gray-500">
        © 2015–2021 Центр рациональности Кочерга
      </small>
    </footer>
  );
};
