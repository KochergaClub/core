import styled from 'styled-components';

const HeroWithImage = styled.div<{ image: string }>`
  min-height: 400px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${(props) => props.image});
  background-size: cover;
  background-position: center;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default HeroWithImage;
