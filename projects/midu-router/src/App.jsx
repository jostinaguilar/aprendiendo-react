import './App.css';

function Home() {
  return (
    <>
      <h2>Home</h2>
      <p>Welcome to devs! 🚀</p>
      <a href="/about">Go to About</a>
    </>
  );
}

function About() {
  return (
    <>
      <h2>About</h2>
      <p>Starting project of midu-router ⚛️ </p>
      <a href="/">Go to Home</a>
    </>
  );
}

function App() {
  return (
    <>
      <h1>midu-router ⚛️</h1>
      <Home />
      <About />
    </>
  );
}

export default App;
