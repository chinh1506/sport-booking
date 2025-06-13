function NavBar() {
    return (
        <>
            {/* Tìm kiếm */}
            <div className="p-5 max-md:mt-10 animate-slide-in">
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
            </div>

            {/* Bộ lọc thể thao */}
            <div className="px-4 flex flex-wrap gap-2 mb-2 text-sm font-medium animate-fade-in">
                <button className="bg-[var(--color-primary-bg)] text-[var(--color-primary-dark)] px-3 py-1 rounded-full hover:bg-[var(--color-primary-light)] transition">
                    Xé vé gần tôi
                </button>
                <button className="bg-[var(--color-primary-bg)] text-[var(--color-primary-dark)] px-3 py-1 rounded-full hover:bg-[var(--color-primary-light)] transition">
                    Pickleball gần tôi
                </button>
                <button className="bg-[var(--color-primary-bg)] text-[var(--color-primary-dark)] px-3 py-1 rounded-full hover:bg-[var(--color-primary-light)] transition">
                    Cầu lông gần tôi
                </button>
            </div>

            {/* Các biểu tượng bộ môn */}
            <div className="px-4 flex flex-wrap gap-3 mb-4 animate-fade-in">
                {[
                    { label: "Pickleball", emoji: "🥒" },
                    { label: "Cầu lông", emoji: "🏸" },
                    { label: "Bóng đá", emoji: "⚽" },
                    { label: "Tennis", emoji: "🎾" },
                    { label: "B.Chuyền", emoji: "🏐" },
                    { label: "Bóng rổ", emoji: "🏀" },
                    { label: "Phức hợp", emoji: "🏟️" },
                    { label: "Golf", emoji: "🏌️" },
                    { label: "Padel", emoji: "🥎" },
                ].map((item, i) => (
                    <button
                        key={i}
                        className="flex items-center gap-1 px-3 py-1 bg-white border border-[var(--color-primary-light)] text-[var(--color-primary)] text-sm rounded-full hover:bg-[var(--color-primary-bg)] transition"
                    >
                        {item.emoji} {item.label}
                    </button>
                ))}
            </div>
        </>
    );
}

export default NavBar;
