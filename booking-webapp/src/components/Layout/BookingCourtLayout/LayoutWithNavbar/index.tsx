import MainLayout from "../MainLayout";
import NavBar from "../Navbar";

type Props = {
    children: React.ReactNode;
};
function LayoutWithNavbar({ children }: Props) {
    return (
        <MainLayout>
            <NavBar />
            {children}
        </MainLayout>
    );
}

export default LayoutWithNavbar;
