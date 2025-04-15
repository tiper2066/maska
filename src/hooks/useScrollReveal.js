'use client';

import { useEffect } from 'react';

const useScrollReveal = (selector, options = {}) => {
    useEffect(() => {
        // window가 정의되어 있는지 확인 (클라이언트 사이드 보장)
        if (typeof window !== 'undefined') {
            const ScrollReveal = require('scrollreveal').default; // 클라이언트에서만 동적 import
            ScrollReveal().reveal(selector, options);
        }
    }, [selector, options]);
};

export default useScrollReveal;
