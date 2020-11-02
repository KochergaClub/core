import React from 'react';

import { Modal } from './index';

export default {
  title: 'Components/Modal',
  component: Modal,
};

export const ModalStory = () => (
  <div>
    <Modal._Overlay />
    <Modal._Content>
      <Modal.Header close={() => 1}>Заголовок</Modal.Header>
      <Modal.Body>Основной текст</Modal.Body>
      <Modal.Footer>Футер</Modal.Footer>
    </Modal._Content>
  </div>
);
ModalStory.storyName = 'Basic';

export const LargeModalStory = () => (
  <div>
    <Modal._Overlay />
    <Modal._Content>
      <Modal.Header close={() => 1}>Заголовок</Modal.Header>
      <Modal.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Diam in arcu cursus
        euismod quis viverra nibh. In egestas erat imperdiet sed euismod nisi.
        Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Nisl
        pretium fusce id velit. Morbi tempus iaculis urna id volutpat.
        Adipiscing commodo elit at imperdiet dui. Vitae aliquet nec ullamcorper
        sit. Nisi scelerisque eu ultrices vitae auctor eu augue. Nibh praesent
        tristique magna sit amet. Ut sem nulla pharetra diam. Mattis enim ut
        tellus elementum sagittis vitae et leo. Leo in vitae turpis massa sed
        elementum. Elit duis tristique sollicitudin nibh sit amet commodo nulla.
        Libero nunc consequat interdum varius sit amet mattis vulputate. Tellus
        pellentesque eu tincidunt tortor aliquam nulla facilisi. Tellus id
        interdum velit laoreet id donec ultrices. Egestas congue quisque egestas
        diam in arcu cursus. Integer malesuada nunc vel risus commodo. Amet
        mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Quis
        auctor elit sed vulputate mi sit amet mauris. Urna nec tincidunt
        praesent semper feugiat nibh sed pulvinar. Imperdiet massa tincidunt
        nunc pulvinar sapien et ligula. Adipiscing vitae proin sagittis nisl
        rhoncus mattis. Diam phasellus vestibulum lorem sed risus ultricies
        tristique nulla. Platea dictumst vestibulum rhoncus est pellentesque
        elit. Libero justo laoreet sit amet. Feugiat vivamus at augue eget.
        Vitae aliquet nec ullamcorper sit. Amet luctus venenatis lectus magna
        fringilla urna porttitor rhoncus. Diam ut venenatis tellus in. Volutpat
        odio facilisis mauris sit amet massa. Est pellentesque elit ullamcorper
        dignissim cras tincidunt lobortis. Urna porttitor rhoncus dolor purus
        non enim praesent elementum. Id velit ut tortor pretium. In eu mi
        bibendum neque egestas. Amet nulla facilisi morbi tempus iaculis. Magna
        ac placerat vestibulum lectus mauris ultrices eros. Id aliquet risus
        feugiat in ante. Amet nulla facilisi morbi tempus iaculis urna id
        volutpat lacus. Dolor purus non enim praesent elementum facilisis leo
        vel fringilla. Suspendisse interdum consectetur libero id faucibus nisl
        tincidunt.
      </Modal.Body>
      <Modal.Footer>Футер</Modal.Footer>
    </Modal._Content>
  </div>
);
