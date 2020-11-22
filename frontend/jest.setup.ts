const useRouter = jest.spyOn(require('next/router'), 'useRouter'); // eslint-disable-line @typescript-eslint/no-var-requires
useRouter.mockImplementation(() => ({
  route: '/',
  pathname: '',
  query: '',
  asPath: '',
  prefetch: async (url: string, as: string) => null,
}));
