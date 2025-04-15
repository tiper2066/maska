// *********************************** 현재 이 프로젝트에서는 사용하지 않음
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 로그인 함수
    const login = async (email, password) => {
        try {
            // 여기에 실제 로그인 API 호출 로직을 구현합니다
            // 예: const response = await fetch('/api/login', { ... })

            // 임시 예시 (실제 구현 시 변경 필요)
            const mockUser = { id: 1, name: '사용자', email };
            setUser(mockUser);

            // 로컬 스토리지에 토큰 저장 (실제 API에서 받은 토큰 사용)
            localStorage.setItem('auth-token', 'sample-token');
            return true;
        } catch (error) {
            console.error('로그인 실패:', error);
            return false;
        }
    };

    // 로그아웃 함수
    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth-token');
    };

    // 앱 시작 시 로그인 상태 체크
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const token = localStorage.getItem('auth-token');

                if (token) {
                    // 토큰이 있으면 사용자 정보를 가져옵니다
                    // 실제로는 API를 통해 토큰 유효성 검증 필요
                    // const response = await fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } });

                    // 임시 예시 (실제 구현 시 변경 필요)
                    setUser({
                        id: 1,
                        name: '사용자',
                        email: 'user@example.com',
                    });
                }
            } catch (error) {
                console.error('인증 확인 실패:', error);
                localStorage.removeItem('auth-token');
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// 커스텀 훅 - 다른 컴포넌트에서 쉽게 인증 상태에 접근할 수 있게 함
export function useAuth() {
    return useContext(AuthContext);
}
