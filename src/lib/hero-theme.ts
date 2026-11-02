// Whether the dark home hero is still behind the header. The hero writes it
// as the page turns light; the header reads it to switch its own theme.
type Listener = () => void;

let heroDark = true;
const listeners = new Set<Listener>();

export const heroTheme = {
  get: (): boolean => heroDark,
  set(next: boolean): void {
    if (next === heroDark) return;
    heroDark = next;
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
