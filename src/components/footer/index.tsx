export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center py-6 text-center text-black">
      <span>
        Made with ❤️ by{" "}
        <a
          className="text-[#ff00ff] hover:text-[#ff00ff] hover:underline"
          href="https://twitter.com/la_crypta"
          target="_blank"
          rel="noreferrer"
        >
          La Crypta
        </a>
      </span>
    </footer>
  );
};

export default Footer;
