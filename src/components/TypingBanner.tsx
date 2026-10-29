import { useEffect, useState } from "react";
import { siteLinks } from "../content/site";

const addresses = [siteLinks.home, siteLinks.blog];

export function TypingBanner() {
  const [addressIndex, setAddressIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const address = addresses[addressIndex];
    const complete = length === address.length;
    const delay = deleting ? 45 : complete ? 2000 : length === 0 ? 450 : 85;
    const timer = window.setTimeout(() => {
      if (!deleting && complete) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setAddressIndex((index) => (index + 1) % addresses.length);
      } else setLength((current) => current + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [addressIndex, length, deleting, reducedMotion]);

  return (
    <a
      className="hero-banner typing-banner"
      href={addresses[addressIndex]}
      target="_blank"
      rel="noreferrer"
      aria-label={`访问${addressIndex === 0 ? "个人主页" : "博客"}：${addresses[addressIndex]}`}
    >
      <span className="typing-stack" aria-hidden="true">
        <span className="typing-measure">{siteLinks.blog}</span>
        <span className="typing-text">
          {reducedMotion
            ? addresses[addressIndex]
            : addresses[addressIndex].slice(0, length)}
          <span className="typing-cursor" />
        </span>
      </span>
      <span className="hero-banner-arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
