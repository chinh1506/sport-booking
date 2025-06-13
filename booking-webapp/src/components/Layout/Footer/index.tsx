function Footer() {
    return (
        <>
            {/* Footer cố định */}
            <footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-[var(--color-primary)] text-white p-4 flex justify-around text-sm animate-fade-in">
                <button className="flex flex-col items-center">
                    <span className="text-lg">🏠</span>
                    Trang chủ
                </button>
                <button className="flex flex-col items-center">
                    <span className="text-lg">🗺️</span>
                    Bản đồ
                </button>
                <button className="flex flex-col items-center">
                    <span className="text-lg">⭐</span>
                    Nổi bật
                </button>
                <button className="flex flex-col items-center">
                    <span className="text-lg">👤</span>
                    Tài khoản
                </button>
            </footer>
        </>
    );
}

export default Footer;
