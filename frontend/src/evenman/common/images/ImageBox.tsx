import styled from 'styled-components';

const Container = styled.div<{ displayOverlay?: boolean }>`
  position: relative; /* allows overlay positioning */

  /* Otherwise child dropdowns get covered by other position: relative elements, e.g. react-toggle.
   (this feels like a dirty hack, is there a better solution?) */
  /* z-index: 1; */

  > .image-container > img {
    display: block;
  }

  > .image-container {
    background-color: white; /* allows to darken transparent images on hover */
  }

  &:hover {
    > .image-container {
      filter: brightness(50%);
      transition: filter 0.3s;
    }
  }

  ${(props) =>
    props.displayOverlay
      ? ''
      : `
  > .overlay {
    display: none;
  }

  &:hover {
    > .overlay {
      display: block;
    }
  }
  `}
`;

const Overlay = styled.div.attrs(() => ({ className: 'overlay' }))`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

interface Props {
  src?: string;
  empty: () => JSX.Element;
  displayOverlay?: boolean; // sometimes we want to show overlay even if the ImageBox is not hovered, e.g. if there's an open DropdownMenu (see ImageEditor)
}

const ImageBox: React.FC<Props> = ({
  src,
  empty,
  displayOverlay,
  children,
}) => {
  return (
    <Container displayOverlay={displayOverlay}>
      <div className="image-container">{src ? <img src={src} /> : empty()}</div>
      <Overlay>{children}</Overlay>
    </Container>
  );
};

export default ImageBox;
