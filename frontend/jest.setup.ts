const useRouter = jest.spyOn(require('next/router'), 'useRouter'); // eslint-disable-line @typescript-eslint/no-var-requires
useRouter.mockImplementation(() => ({
  route: '/',
  pathname: '',
  query: '',
  asPath: '',
  prefetch: async (url: string, as: string) => null,
}));

// via https://github.com/vercel/next.js/discussions/18855#discussioncomment-285059
jest.mock('next/dynamic', () => (func: () => Promise<any>) => {
  let component: any = null;
  func().then((module: any) => {
    component = module.default;
  });
  const DynamicComponent = (...args) => component(...args);
  DynamicComponent.displayName = 'LoadableComponent';
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});
