import * as React from 'react';

import { A, HR, RichText } from './';

export default {
  title: "Общее/Текст",
};

export const LinkStory = () => (
  <>
    <div>
      Ссылки выглядят так: <A href="https://kocherga.club">Кочерга</A>.
    </div>
    <div>
      При этом не стилизируются по умолчанию (
      <a href="https://kocherga.club">пример</a>).
    </div>
  </>
);

LinkStory.storyName = "Ссылка";

export const HRStory = () => (
  <>
    <div>Текст над чертой (в div).</div>
    <HR />
    <div>Текст под чертой (в div).</div>
    <p>
      Теперь тест отступа вокруг черты для параграфов. Этот текст в параграфе
      над чертой.
    </p>
    <HR />
    <p>А это текст в параграфе под чертой.</p>
  </>
);

HRStory.storyName = "Горизонтальная черта";

export const RichTextStory = () => (
  <RichText>
    <p>
      Внутри RichText автоматически работают кастомные стили{" "}
      <a href="http://example.com">для ссылок</a>.
    </p>
    <HR />
    <p>И для горизонтальных линий.</p>
  </RichText>
);

RichTextStory.storyName = "RichText";

export const ParagraphStory = () => (
  <section>
    <p>
      Рационалисты, как известно, любят мету. Мета-уровень (от греческого
      "после" или "за пределами") — это уровень осмысления, выходящий за рамки
      объектного.
    </p>
    <p>
      Например, если разговор о моральных поступках можно считать объектным
      уровнем обсуждения, на котором речь идёт о конкретных действиях (зачастую
      в рамках конкретной морально-этической системы), то мета-обсуждением был
      бы диалог о различных моральных взглядах и выборе между ними. Другими
      словами, мы выходим за пределы конкретной системы и получаем возможность
      рассматривать её во всей полноте, а также сравнивать с другими системами,
      оценивать их плюсы и минусы.
    </p>
    <p>
      Можно выйти на уровень ещё выше и разбирать саму концепцию моральной
      системы и то, насколько наше текущее понимание этой концепции основывается
      на здравых предпосылках (существует целый раздел философии, занимающийся
      такими вопросами: мета-этика).
    </p>
  </section>
);

ParagraphStory.storyName = "Параграфы";

export const ListStory = () => (
  <section>
    <p>Текст до списка.</p>
    <ul>
      <li>Элемент 1</li>
      <li>Элемент 2</li>
      <li>Элемент 3</li>
    </ul>
    <p>Текст после списка.</p>
  </section>
);

ListStory.storyName = "Список";
