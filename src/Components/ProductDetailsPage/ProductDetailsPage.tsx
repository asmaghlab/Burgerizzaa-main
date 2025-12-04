import { Helmet } from "react-helmet-async";
import ProductDetails from "../Pages/Menu/ProductDetails";

function ProductDetailsPage() {
    return (
        <>
            <Helmet>
                <title>Product Details </title>
                <meta
                    name="description"
                    content="Check out the delicious details of our burgers at Burgerizza!"
                />
            </Helmet>

            <div id="background_home">
                <section className="section">
                <ProductDetails />
                </section>
            </div>
        </>
    );
}

export default ProductDetailsPage;
