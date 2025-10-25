import { Helmet } from "react-helmet";
import Menu from "../Pages/Menu/Menu";

function MenuPage() {
    return (
        <>
            <Helmet>
                <title>Menu</title>
                <meta
                    name="description"
                    content="Explore our delicious burger menu at Burgerizza. Burgers, sides, drinks, and more!"
                />
            </Helmet>

            <div id="background_home">
                <section className="section">
                    <Menu />
                </section>
            </div>
        </>
    );
}

export default MenuPage;
