// Shared by the 2D timeline and the lazily loaded 3D scene. Kept separate so
// importing it never pulls three.js into the main bundle.

/** Seconds from the l2q:stamp signal until the 3D stamp touches the quotation. */
export const STAMP_CONTACT = 0.42;

/**
 * Resolves when the hero's 3D layer is ready or has been ruled out, so the
 * timeline starts with the right stamp. Gives up after `timeout` ms.
 */
export function waitFor3D(el: HTMLElement, timeout = 2500): Promise<void> {
  if (el.dataset.threeD !== "pending") return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => {
      el.removeEventListener("ss3d:ready", done);
      window.clearTimeout(timer);
      resolve();
    };
    const timer = window.setTimeout(done, timeout);
    el.addEventListener("ss3d:ready", done);
  });
}
