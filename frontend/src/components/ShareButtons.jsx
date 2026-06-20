function ShareButtons({ article }) {
  const shareUrl = window.location.href;

  return (
    <div className="flex gap-2">
      <a
        href={`https://wa.me/?text=${shareUrl}`}
        target="_blank"
        className="px-3 py-1 bg-green-500 text-white rounded"
      >
        WhatsApp
      </a>

      <a
        href={`https://t.me/share/url?url=${shareUrl}`}
        target="_blank"
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        Telegram
      </a>

      <button
        onClick={() => navigator.clipboard.writeText(shareUrl)}
        className="px-3 py-1 bg-gray-700 text-white rounded"
      >
        Copy Link
      </button>
    </div>
  );
}

export default ShareButtons;