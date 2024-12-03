import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__name">Developed by Sohaib Tahir</p>
        <p className="footer__year">© {currentYear}</p>
      </div>
    </footer>
  );
}

export default Footer;
