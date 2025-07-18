import Footer from "../Footer";
import Header from "../Header";

type Props = {
    children: React.ReactNode;
};

function MainLayout({ children }: Props) {
    return (
        <div className="flex flex-col min-h-screen bg-[var(--color-primary-bg)] pt-20 pb-24 text-[var(--color-primary-dark)] transition-all duration-300">
            <Header></Header>
            {children}
            <Footer></Footer>
        </div>
    );
}

export default MainLayout;
