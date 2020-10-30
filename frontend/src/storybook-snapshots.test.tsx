// jest-specific-snapshot (which we use in runTest code below) doesn't work with jest-styled-components out of the box.
// So we have to call addSerializer() manually.
// See details: https://github.com/styled-components/jest-styled-components#serializer
import { addSerializer } from 'jest-specific-snapshot';
import { styleSheetSerializer } from 'jest-styled-components';
import { act, create } from 'react-test-renderer';

import initStoryshots, { Stories2SnapsConverter } from '@storybook/addon-storyshots';

addSerializer(styleSheetSerializer);

// via https://spectrum.chat/framer/general/jest-snapshot-testing-framer-motion~90ba2cc1-6e9c-4e5a-8627-620e208011ac?m=MTU5NjY2MjkwMjQxOQ==
jest.mock('framer-motion', () => {
  const AnimatePresence = jest.fn(({ children }) => children);
  const AnimateSharedLayout = jest.fn(({ children }) => children);
  const motion = {
    div: jest.fn(({ children, ...rest }) => <div {...rest}>{children}</div>),
  };
  return {
    AnimatePresence,
    AnimateSharedLayout,
    motion,
  };
});

// via https://github.com/storybookjs/storybook/issues/7745#issuecomment-618150310
const wait = () =>
  act(
    () =>
      new Promise((resolve) => {
        setTimeout(resolve, 10);
      })
  );

const converter = new Stories2SnapsConverter();

const runTest = async (story: any, context: any) => {
  const filename = converter.getSnapshotFileName(context);

  if (!filename) {
    return;
  }

  const storyElement = story.render();
  let tree: any;
  act(() => {
    tree = create(storyElement);
  });

  await wait();

  expect(tree!.toJSON()).toMatchSpecificSnapshot(filename);
  tree!.unmount();
};

initStoryshots({
  asyncJest: true,
  test: ({ story, context, done }) => {
    runTest(story, context).then(done);
  },
});
