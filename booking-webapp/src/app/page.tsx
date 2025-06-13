import ComplexList from "@/components/ComplexList";
import { LayoutWithNavbar } from "@/components/Layout";
import LeafletMap from "@/components/LeafletMap";
// import "leaflet/dist/leaflet.css"

export default function Campaign() {
    return (
        <LayoutWithNavbar>
            <ComplexList></ComplexList>
        </LayoutWithNavbar>
    );
}
