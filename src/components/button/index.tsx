export default function ButtonComponent({
  onClick,
  text,
  className,
  whatsapp,
}: {
  onClick?: () => void;
  text: string;
  className: string;
  whatsapp?: string;
}) {
  const buttonClasses = `text-white px-4 py-2 rounded-lg font-bold ${className} shadow-button hover:bg-white hover:text-button hover:shadow-buttonHover transition-all duration-500 ease-in-out cursor-pointer`;
  const message = encodeURIComponent(
    "Olá! Gostaria de saber mais sobre as soluções da pantheo.tech."
  );
  const whatsappLink = `https://wa.me/${whatsapp}?text=${message}`;

  if (whatsapp) {
    return (
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        {text}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {text}
    </button>
  );
}
