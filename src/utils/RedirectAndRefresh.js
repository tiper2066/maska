/*
import { usePathname, useRouter } from 'next/navigation';

// 홈 경로일 경우 새로 고침하도록 함 (MaskaProgress 콤포넌트를 리셋하기 위해)
export const redirectAndRefreshHome = (e) => {
    const router = useRouter(); // 라우터 객체 생성
    const pathname = usePathname(); // 라우터 경로

    e.preventDefault();
    // 현재 경로가 홈이면..
    if (pathname === '/') {
        window.location.reload(); // 새로 고침
        return;
    } else {
        // 홈이 아닌 경로면.. 홈으로 이동
        router.push('/');
    }
};
*/

import { usePathname, useRouter } from 'next/navigation';

// 홈 경로일 경우 새로 고침하도록 함 (MaskaProgress 콤포넌트를 리셋하기 위해)
export const useRedirectAndRefreshHome = () => {
    const router = useRouter(); // 라우터 객체 생성
    const pathname = usePathname(); // 라우터 경로

    const redirectAndRefreshHome = (e) => {
        e.preventDefault();
        // 현재 경로가 홈이면..
        if (pathname === '/') {
            window.location.reload(); // 새로 고침
            return;
        } else {
            // 홈이 아닌 경로면.. 홈으로 이동
            router.push('/');
        }
    };

    return { redirectAndRefreshHome };
};
