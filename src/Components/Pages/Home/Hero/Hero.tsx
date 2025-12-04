import "./Hero.css";
import { GiRoundStar } from "react-icons/gi";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function Hero() {

    const imagesChande = [
        "/src/assets/Images/Hero_img/Pizza1.png",
        "/src/assets/Images/Hero_img/Pizza2.png",
        "/src/assets/Images/Hero_img/Pizza3.png",
        "/src/assets/Images/Hero_img/Pizza4.png",
    ];

    const [imagesAnim, setimagesAnim] = useState(0);

    useEffect(() => {
        const timerImageRoute = setInterval(() => {
        setimagesAnim((img) => (img + 1) % imagesChande.length);
        }, 40000);
        return () => clearInterval(timerImageRoute);
    }, []);

    return (
        <>
            <div id="hero">
                <div className="hero container_box">
                    <div className="hero_right">
                        <div className="hero_text">
                            <p>Welcome</p>
                            <h1>Enjoy Your <span>Deliciouse</span> food </h1>
                            <p>
                                Savor our freshly made burgers and cheesy pizzas, crafted with the finest ingredients.<br></br>
                            </p>
                            <Link to="/menu">
                                <button className="hero_btn">Order Now</button>
                            </Link>
                        </div>
                        <div className="hero_cards">

                            <div className="hero_card">
                                <div className="hero_card_img">
                                    <img src="/src/assets/Images/menu_img/dessert_img1.png" alt="" />
                                </div>
                                <div className="hero_card_text">
                                    <p>
                                        Tiramisu
                                        <span>65EGP</span>
                                    </p>
                                    <div className="Hero_star">
                                        <GiRoundStar />
                                        <GiRoundStar />
                                        <GiRoundStar />
                                        <GiRoundStar />
                                        <GiRoundStar />
                                    </div>
                                </div>
                            </div>

                            <div className="hero_card">
                                <div className="hero_card_img">
                                    <img src="/src/assets/Images/menu_img/burger_img1.png" alt="" />
                                </div>
                                <div className="hero_card_text">
                                    <p>
                                        Chicken
                                        <span>90EGP</span>
                                    </p>
                                    <div className="Hero_star">
                                        <GiRoundStar />
                                        <GiRoundStar />
                                        <GiRoundStar />
                                        <GiRoundStar />
                                        <GiRoundStar />
                                    </div>
                                </div>
                            </div>

                            <div className="hero_card">
                                <div className="hero_card_img">
                                    <img src="/src/assets/Images/menu_img/juice_img1.png" alt="" />
                                </div>
                                <div className="hero_card_text">
                                    <p>
                                        Lemonade
                                        <span>30EGP</span>
                                    </p>
                                    <div className="Hero_star">
                                        <GiRoundStar />
                                        <GiRoundStar />
                                        <GiRoundStar />
                                        <GiRoundStar />
                                        <GiRoundStar />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="hero_img">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={imagesChande[imagesAnim]}
                                src={imagesChande[imagesAnim]}
                                alt="Food"
                                initial={{
                                opacity: 0,
                                x: 150,
                                y: -150,
                                rotate: 45,
                                scale: 0.8,
                                }}
                                animate={{
                                opacity: 1,
                                x: 0,
                                y: 0,
                                rotate: 0,
                                scale: 1,
                                transition: { duration: 0.8, ease: "easeOut" },
                                }}
                                exit={{
                                opacity: 0,
                                x: 150,
                                y: 150,
                                rotate: -45,
                                scale: 0.8,
                                transition: { duration: 0.8, ease: "easeIn" },
                                }}
                                className="hero_img_item"
                            />
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Hero;
