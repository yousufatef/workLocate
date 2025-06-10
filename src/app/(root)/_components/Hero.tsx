import { SearchBar } from "@/components/common/SearchBar";
import { Suspense } from "react";

function Hero() {
    return (
        <div
            className="w-full relative bg-cover bg-center flex flex-col justify-center items-center py-[150px] md:py-[200px]"
            style={{ backgroundImage: "url('/assets/images/hero.png')" }}
        >
            <div className="container">
                <h1 className="text-white text-2xl lg:text-5xl font-bold text-center mb-4 md:mb-6">
                    Discover the Best Workspace for You
                </h1>

                <p className="text-white text-[16px] lg:text-xl text-center mb-10">
                    Find your ideal workspace with our diverse offerings.
                </p>
                <Suspense>
                    <SearchBar />
                </Suspense>
            </div>
        </div>
    );
}

export default Hero;