import { useCallback } from 'react';
import Reveal from 'reveal.js';
import RevealNotes from 'reveal.js/plugin/notes/notes.js';

import { PresentationPageFragment } from '../wagtail/fragments.generated';

const Slide: React.FC<{
  slide: PresentationPageFragment['slides'][0];
}> = ({ slide }) => {
  console.log(slide.__typename);
  switch (slide.__typename) {
    case 'SlideTitleBlock':
      return (
        <section>
          <h2>{slide.title}</h2>
        </section>
      );
    case 'SlideRichTextBlock':
      return <section dangerouslySetInnerHTML={{ __html: slide.value }} />;
    case 'SlideRawHtmlBlock':
      return <section dangerouslySetInnerHTML={{ __html: slide.value }} />;
    default:
      return <section>ОШИБКА: неизвестный тип слайда</section>;
  }
};

const RevealView: React.FC<{
  slides: PresentationPageFragment['slides'];
}> = ({ slides }) => {
  const setRef = useCallback((node: HTMLDivElement) => {
    const deck = new Reveal(node, {
      embedded: true,
      //   plugins: [RevealMarkdown],
      plugins: [RevealNotes],
    });
    deck.initialize();
    console.log('intiialized');
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div ref={setRef} className="reveal">
        <div className="slides">
          {slides.map((slide) => (
            <Slide key={slide.id} slide={slide} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevealView;
