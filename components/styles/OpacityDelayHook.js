import { useState } from "react";

const useOpacityAnimation = () => {
    const [opacity, setOpacity] = useState(100);
    const opacityDecValues = [50, 20, 10, 5, 0];
    const opacityIncValues = [5, 10, 20, 50, 100];


    async function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const opacityIncrease = async () => {
        for (let i of opacityIncValues) {
            await delay(50);
            setOpacity(i);
        }
    };

    const opacityDecrease = async () => {
        for (let i of opacityDecValues) {
            await delay(50);
            setOpacity(i);
        }
    };

    return {opacity, opacityIncrease, opacityDecrease, delay}
}

export {
    useOpacityAnimation
}