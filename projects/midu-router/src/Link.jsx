import { BUTTONS, EVENTS } from './conts';

function navigate(href) {
  window.history.pushState({}, '', href);

  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  window.dispatchEvent(navigationEvent);
}

export function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === BUTTONS.primary; // primary click
    const isModifiedEvent =
      event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
    const isManegeableEvent = target === undefined || target === '_self';

    if (isMainEvent && isManegeableEvent && !isModifiedEvent) {
      event.preventDefault();
      navigate(to);
      window.scrollTo(0, 0);
    }
  };

  return <a href={to} onClick={handleClick} target={target} {...props} />;
}
