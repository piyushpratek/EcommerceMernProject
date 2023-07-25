// react-rating-stars-component.d.ts

declare module 'react-rating-stars-component' {
    import { FC } from 'react';

    interface ReactStarsProps {
        edit?: boolean;
        color?: string;
        activeColor?: string;
        size?: number;
        value?: number;
        isHalf?: boolean;
        // Add other prop types based on the library's API if needed
        // For example:
        // count?: number;
        // onChange?: (newRating: number) => void;
    }

    const ReactStars: FC<ReactStarsProps>;

    export default ReactStars;
}
