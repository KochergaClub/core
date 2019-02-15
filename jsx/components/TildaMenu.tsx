import * as React from 'react';

import styled from 'styled-components';

import TildaMenuItems from './TildaMenuItems';
import { Burger, Row } from '@kocherga/frontkit';

const Container = styled('div')<{ hideOnMobile: boolean }>`
  width: 100%;
  height: 60px;
  padding: 0 40px;

  background-color: black;
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 980px) {
    display: ${props => props.hideOnMobile ? 'none': 'flex'};
    flex-direction: column;
    height: auto;
    padding: 20px 0;
  }
`;

const VkIcon = () => (
  <svg version="1.1" id="Layer_1" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 48 48" enableBackground="new 0 0 48 48"> <path style={{"fill": " #ffffff"}} d="M47.761,24c0,13.121-10.639,23.76-23.76,23.76C10.878,47.76,0.239,37.121,0.239,24c0-13.123,10.639-23.76,23.762-23.76 C37.122,0.24,47.761,10.877,47.761,24 M35.259,28.999c-2.621-2.433-2.271-2.041,0.89-6.25c1.923-2.562,2.696-4.126,2.45-4.796 c-0.227-0.639-1.64-0.469-1.64-0.469l-4.71,0.029c0,0-0.351-0.048-0.609,0.106c-0.249,0.151-0.414,0.505-0.414,0.505 s-0.742,1.982-1.734,3.669c-2.094,3.559-2.935,3.747-3.277,3.524c-0.796-0.516-0.597-2.068-0.597-3.171 c0-3.449,0.522-4.887-1.02-5.259c-0.511-0.124-0.887-0.205-2.195-0.219c-1.678-0.016-3.101,0.007-3.904,0.398 c-0.536,0.263-0.949,0.847-0.697,0.88c0.31,0.041,1.016,0.192,1.388,0.699c0.484,0.656,0.464,2.131,0.464,2.131 s0.282,4.056-0.646,4.561c-0.632,0.347-1.503-0.36-3.37-3.588c-0.958-1.652-1.68-3.481-1.68-3.481s-0.14-0.344-0.392-0.527 c-0.299-0.222-0.722-0.298-0.722-0.298l-4.469,0.018c0,0-0.674-0.003-0.919,0.289c-0.219,0.259-0.018,0.752-0.018,0.752 s3.499,8.104,7.463,12.23c3.638,3.784,7.764,3.36,7.764,3.36h1.867c0,0,0.566,0.113,0.854-0.189 c0.265-0.288,0.256-0.646,0.256-0.646s-0.034-2.512,1.129-2.883c1.15-0.36,2.624,2.429,4.188,3.497 c1.182,0.812,2.079,0.633,2.079,0.633l4.181-0.056c0,0,2.186-0.136,1.149-1.858C38.281,32.451,37.763,31.321,35.259,28.999"></path> </svg>
);

const FbIcon = () => (
  <svg style={{"fill":"#ffffff"}} version="1.1" id="Layer_1" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 48 48" enableBackground="new 0 0 48 48"> <path d="M47.761,24c0,13.121-10.638,23.76-23.758,23.76C10.877,47.76,0.239,37.121,0.239,24c0-13.124,10.638-23.76,23.764-23.76 C37.123,0.24,47.761,10.876,47.761,24 M20.033,38.85H26.2V24.01h4.163l0.539-5.242H26.2v-3.083c0-1.156,0.769-1.427,1.308-1.427 h3.318V9.168L26.258,9.15c-5.072,0-6.225,3.796-6.225,6.224v3.394H17.1v5.242h2.933V38.85z"></path> </svg>
)

const SocialIcons = () => (
  <Row gutter={10}>
    <a href="https://www.facebook.com/kocherga.club/"><FbIcon /></a>
    <a href="http://vk.com/kocherga_club"><VkIcon /></a>
  </Row>
);

const Logo = () => (
  <a href="/">
    <img src="https://static.tildacdn.com/272f116a-f437-4a32-b57e-679d87acf228/textlogo.png" />
  </a>
);

const Line = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 980px) {
    flex-direction: column;
  }
`;

interface MobileHeaderProps {
  expanded: boolean;
  setExpand: (flag: boolean) => void;
}

class MobileHeader extends React.Component<MobileHeaderProps> {
  MobileHeaderComponent = styled.div`
    display: none;
    @media screen and (max-width: 980px) {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 100%;
      height: 72px;
      padding: 0 20px;

      background: black;
      color: white;
      font-size: 24px;
      font-weight: 300;
    }
  `;

  switchExpand = () => {
    this.props.setExpand(!this.props.expanded);
  }

  render() {
    return (
      <this.MobileHeaderComponent onClick={this.switchExpand}>
        <div>Антикафе Кочерга</div>
        <Burger color="white" opened={this.props.expanded} />
      </this.MobileHeaderComponent>
    );
  }
}

class TildaMenu extends React.Component {
  state = {
    hideOnMobile: true,
  };

  setMobileExpanded = (flag: boolean) => {
    this.setState({
      hideOnMobile: !flag,
    })
  }

  render() {
    return (
      <div>
        <MobileHeader expanded={!this.state.hideOnMobile} setExpand={this.setMobileExpanded} />
        <Container hideOnMobile={this.state.hideOnMobile}>
          <Line>
            <Logo />
            <TildaMenuItems />
          </Line>
          <SocialIcons />
        </Container>
      </div>
    );
  }
}

export default TildaMenu;
