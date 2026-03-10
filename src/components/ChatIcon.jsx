function ChatIcons() {
  return (
    <div className="fixed bottom-24 right-5 flex flex-col gap-3 z-[9999]">
      {/* ZALO */}
      <a
        href="https://zalo.me/0934215227"
        target="_blank"
        rel="noopener noreferrer"
        className="chat-btn"
      >
        <img
          src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zalo.svg"
          alt="zalo"
          className="w-6 h-6"
        />
      </a>

      {/* MESSENGER */}
      <a
        href="https://m.me/thienvo123456"
        target="_blank"
        rel="noopener noreferrer"
        className="chat-btn"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.15 2 11.1c0 2.77 1.38 5.24 3.54 6.86V22l3.09-1.7c1.02.28 2.11.43 3.37.43 5.52 0 10-4.15 10-9.1S17.52 2 12 2zm1.12 11.9l-2.56-2.73-4.88 2.73 5.37-5.7 2.65 2.73 4.79-2.73-5.37 5.7z" />
        </svg>
      </a>
    </div>
  );
}

export default ChatIcons;
