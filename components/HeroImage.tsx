import Image from 'next/image'
import {useEffect, useState} from 'react';

interface HeroImageProps {
    width: number;
    height: number;
}

const HeroImage = ({width, height}: HeroImageProps) => {
    const backgrounds = [
        'male1_wide.png',
        'female1_behindback.png',
        'zombie1_hold.png',
        'male2_think.png',
        'female2_cheer.png',
        'robot1_hit.png'
    ];
    const [backgroundIndex, setBackgroundIndex] = useState(0);

    useEffect(() => {
        const changeImageInterval = setInterval(() => {
            setBackgroundIndex(index => (index + 1) % backgrounds.length)
        }, 1000);

        return () => clearInterval(changeImageInterval);
    }, []);

    return (
        <Image
            priority={true}
            className={'animate__animated animate__zoomInRight'}
            src={`/images/${backgrounds[backgroundIndex]}`}
            alt="Hero image"
            width={width}
            height={height} />
    )
}

export default HeroImage;