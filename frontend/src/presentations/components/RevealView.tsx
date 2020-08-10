import { useCallback } from 'react';
import Reveal from 'reveal.js';

// import RevealNotes from 'reveal.js/plugin/notes/notes.js';
import {
    PresentationPageFragment, SlideFragmentsBlockFragment
} from '../wagtail/fragments.generated';

const SlideFragment: React.FC<{
  fragment: SlideFragmentsBlockFragment['fragments'][0];
}> = ({ fragment }) => {
  switch (fragment.__typename) {
    case 'SlideFragmentsBlock_RichTextBlock':
    case 'SlideFragmentsBlock_RawHtmlBlock':
      return <div dangerouslySetInnerHTML={{ __html: fragment.value }} />;
    default:
      return (
        <div>ОШИБКА: тип фрагмента {fragment.__typename} не поддерживается</div>
      );
  }
};

const Slide: React.FC<{
  slide: PresentationPageFragment['slides'][0];
}> = ({ slide }) => {
  switch (slide.__typename) {
    case 'SlideTitleBlock':
      return (
        <section>
          <h2>{slide.title}</h2>
        </section>
      );
    case 'SlideRichTextBlock':
    case 'SlideRawHtmlBlock':
      return <section dangerouslySetInnerHTML={{ __html: slide.value }} />;
    case 'SlideFragmentsBlock':
      return (
        <section>
          {slide.fragments.map((fragment) => (
            <div className="fragment" key={fragment.id}>
              <SlideFragment fragment={fragment} />
            </div>
          ))}
        </section>
      );
    default:
      return (
        <section>
          ОШИБКА: тип слайда {slide.__typename} не поддерживается
        </section>
      );
  }
};

const RevealView: React.FC<{
  slides: PresentationPageFragment['slides'];
}> = ({ slides }) => {
  const setRef = useCallback((node: HTMLDivElement) => {
    const deck = new Reveal(node, {
      embedded: true,
      //   plugins: [RevealMarkdown],
      // plugins: [RevealNotes],
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
