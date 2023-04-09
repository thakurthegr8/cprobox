export default function (from, to, subject, text) {
  return {
    from,
    to,
    subject,
    text,
    html: text,
  };
}
