import Link from 'next/link';

const LoginButton: React.FC = () => (
  <Link href="/my" passHref>
    <a className="no-underline">
      <button className="border-0 text-black bg-white rounded-full h-10 font-bold text-sm px-6 cursor-pointer">
        Войти
      </button>
    </a>
  </Link>
);

export default LoginButton;
