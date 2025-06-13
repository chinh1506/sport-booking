import { LayoutWithNavbar } from "@/components/Layout";
import LeafletMap from "@/components/LeafletMap";
// import "leaflet/dist/leaflet.css"

export default function Campaign() {
    return (
        <LayoutWithNavbar>
            <div className="px-4 font-semibold text-[var(--color-primary-dark)] mb-2 animate-fade-in">
                Bạn muốn tìm kiếm nhiều hơn
            </div>

            {/* Danh sách sân */}
            <div className="px-4 space-y-4 animate-fade-in">
                {/* Sân 1 */}
                <div className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex-shrink-0 w-14 h-14 bg-[var(--color-primary-bg)] flex items-center justify-center rounded-full text-2xl">
                        🏸
                    </div>
                    <div className="flex-1 space-y-1 text-sm">
                        <div className="flex flex-wrap gap-1">
                            <span className="bg-[var(--color-primary-light)] text-white px-2 py-0.5 rounded-full text-xs">
                                Đơn ngày
                            </span>
                            <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full text-xs">Sự kiện</span>
                        </div>
                        <h3 className="font-semibold text-[var(--color-primary)] text-base">
                            CLB Cầu Lông TPT Sport - Làng đại học
                        </h3>
                        <p className="text-gray-700">(1.8km) Đ. Tôn Thất Tùng, Dĩ An, Bình Dương</p>
                        <p className="text-gray-500 text-xs">⏰ 06:00 - 22:00 | 📞 0374 857 068</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 py-1.5 rounded-full text-sm transition">
                            Đặt lịch
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex-shrink-0 w-14 h-14 bg-[var(--color-primary-bg)] flex items-center justify-center rounded-full text-2xl">
                        🏸
                    </div>
                    <div className="flex-1 space-y-1 text-sm">
                        <div className="flex flex-wrap gap-1">
                            <span className="bg-[var(--color-primary-light)] text-white px-2 py-0.5 rounded-full text-xs">
                                Đơn ngày
                            </span>
                            <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full text-xs">Sự kiện</span>
                        </div>
                        <h3 className="font-semibold text-[var(--color-primary)] text-base">
                            CLB Cầu Lông TPT Sport - Làng đại học
                        </h3>
                        <p className="text-gray-700">(1.8km) Đ. Tôn Thất Tùng, Dĩ An, Bình Dương</p>
                        <p className="text-gray-500 text-xs">⏰ 06:00 - 22:00 | 📞 0374 857 068</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 py-1.5 rounded-full text-sm transition">
                            Đặt lịch
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex-shrink-0 w-14 h-14 bg-[var(--color-primary-bg)] flex items-center justify-center rounded-full text-2xl">
                        🏸
                    </div>
                    <div className="flex-1 space-y-1 text-sm">
                        <div className="flex flex-wrap gap-1">
                            <span className="bg-[var(--color-primary-light)] text-white px-2 py-0.5 rounded-full text-xs">
                                Đơn ngày
                            </span>
                            <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full text-xs">Sự kiện</span>
                        </div>
                        <h3 className="font-semibold text-[var(--color-primary)] text-base">
                            CLB Cầu Lông TPT Sport - Làng đại học
                        </h3>
                        <p className="text-gray-700">(1.8km) Đ. Tôn Thất Tùng, Dĩ An, Bình Dương</p>
                        <p className="text-gray-500 text-xs">⏰ 06:00 - 22:00 | 📞 0374 857 068</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 py-1.5 rounded-full text-sm transition">
                            Đặt lịch
                        </button>
                    </div>
                </div>

                {/* Sân 2 */}
                <div className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex-shrink-0 w-14 h-14 bg-[var(--color-primary-bg)] flex items-center justify-center rounded-full text-2xl">
                        🌅
                    </div>
                    <div className="flex-1 space-y-1 text-sm">
                        <div className="flex flex-wrap gap-1">
                            <span className="bg-[var(--color-primary-light)] text-white px-2 py-0.5 rounded-full text-xs">
                                Đơn ngày
                            </span>
                            <span className="bg-orange-200 text-orange-900 px-2 py-0.5 rounded-full text-xs">
                                Đơn tháng
                            </span>
                            <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full text-xs">Sự kiện</span>
                        </div>
                        <h3 className="font-semibold text-[var(--color-primary)] text-base">Sân Hoa Thiên Lý</h3>
                        <p className="text-gray-700">104 Nguyễn Văn Cừ</p>
                        <p className="text-gray-500 text-xs">⏰ Giờ mở cửa không xác định</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 py-1.5 rounded-full text-sm transition">
                            Đặt lịch
                        </button>
                    </div>
                </div>
            </div>
        </LayoutWithNavbar>
    );
}
