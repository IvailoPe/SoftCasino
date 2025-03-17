export default function Information({ text, h3 }) {
  if (h3) {
    return <h3>{text}</h3>;
  }

  return <p>{text}</p>;
}
