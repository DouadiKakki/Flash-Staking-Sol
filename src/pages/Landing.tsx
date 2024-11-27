import Banner from "./landing/Banner";
import Benefits from "./landing/Benefits";
import HowTo from "./landing/HowTo";
import Partners from "./landing/Partners";
import Statistics from "./landing/Statistics";
import Testimonials from "./landing/Testimonials";
import WhyStake from "./landing/WhyStake";

export default function Landing() {
    return (
        <div>
            <Banner />
            <Partners />
            <WhyStake />
            <HowTo />
            <Benefits />
            <Statistics />
            <Testimonials />
        </div>
    )
}