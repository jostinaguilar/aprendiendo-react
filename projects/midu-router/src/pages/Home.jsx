import { Link } from '../Link';

export default function Home() {
  return (
    <>
      <h2>Home</h2>
      <p>Welcome to devs! 🚀</p>
      <Link to={'/about'}>Go to About</Link>
    </>
  );
}
