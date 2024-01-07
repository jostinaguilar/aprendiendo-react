import { Link } from '../Link';

const i18n = {
  en: {
    title: 'About',
    description: 'Starting project of midu-router ⚛️',
    button: 'Go to Home',
  },
  es: {
    title: 'Sobre nosotros',
    description: 'Empezando proyecto de midu-router ⚛️',
    button: 'Ir a inicio',
  },
};

const useI18n = (lang) => {
  return i18n[lang] || i18n.en;
};

export default function About({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'en');

  return (
    <>
      <h2>{i18n.title}</h2>
      <p>{i18n.description}</p>
      <Link to={'/'}>{i18n.button}</Link>
    </>
  );
}
