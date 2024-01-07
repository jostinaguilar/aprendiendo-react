import { Link } from '../Link';

export default function Page404() {
  return (
    <>
      <div>
        <h2>This is not Fine</h2>
        <img
          src="https://midu.dev/images/this-is-fine-404.gif"
          alt="this is not fine"
        />
      </div>
      <Link to={'/'}>Go to Home</Link>
    </>
  );
}
