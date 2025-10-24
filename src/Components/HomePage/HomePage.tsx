import Categories from "../Pages/Home/Categories/Categories";
import Test from "../Pages/Home/Test/Test";
import Deals from "../Pages/Home/Deals/Deals";
import Hero from "../Pages/Home/Hero/Hero";
import OurMenu from "../Pages/Home/OurMenu/OurMenu";
import OurStories from "../Pages/Home/OurStories/OurStories";


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Footer from "../Footer/Footer";

function HomePage() {

    const queryClient = new QueryClient()

    return (
    <>
    <div id="background_home">
        <section className="section">
            <Hero/>
            <Deals/>
            <Categories/>
            <OurStories/>

            <QueryClientProvider client={queryClient}>
                <OurMenu/>
            </QueryClientProvider>

            <Test/>

        </section>
    </div>
    </>
    )

}

export default HomePage;
