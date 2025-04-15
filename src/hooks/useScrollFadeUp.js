'use client';

import { useEffect } from 'react';

const useScrollFadeUp = (selector) => {
    useEffect(() => {
        const handleScrollAnimation = () => {
            const elements = document.querySelectorAll(selector);
            const triggerBottom = window.innerHeight;

            elements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top <= triggerBottom) {
                    el.classList.add('show');
                }
            });
        };

        window.addEventListener('scroll', handleScrollAnimation);
        window.addEventListener('load', handleScrollAnimation);
        handleScrollAnimation();

        return () => {
            window.removeEventListener('scroll', handleScrollAnimation);
            window.removeEventListener('load', handleScrollAnimation);
        };
    }, []);
};
export default useScrollFadeUp;
