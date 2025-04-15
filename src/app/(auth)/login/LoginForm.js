// ************ 회원가입을 위한 폼 ************
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    VStack,
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    Checkbox,
    Button,
    Link,
    Divider,
    Box,
    Text,
    FormControl,
    FormErrorMessage,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Image from 'next/image';
// import dynamic from 'next/dynamic'; // 구글 아이콘 라이브러리 동적 임포트 시 필요

// 동적 임포트로 아이콘 최적화
/*
const FcGoogle = dynamic(
    () => import('react-icons/fc').then((mod) => mod.FcGoogle),
    { ssr: false, loading: () => <span>G</span> } // 로딩 중일 경우 표시 추가
);
*/

// AuthData 경로 수정
import AuthData from '@/data/AuthData';

export default function LoginForm() {
    const router = useRouter();
    const { authEmail, authPassword, authUnsubscribing } = AuthData;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [capsLockOn, setCapsLockOn] = useState(false);
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [lockUntil, setLockUntil] = useState(null);

    const isLockedOut = lockUntil && new Date() < new Date(lockUntil);

    // 이메일 유효성 검사
    const validateEmail = (email) => {
        if (!email.trim()) {
            return '이메일을 입력해주세요.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.length > 320 || /\s/.test(email) || !emailRegex.test(email)) {
            return '이메일 형식(user@email.com)으로 입력해주세요.';
        }
        if (email === authUnsubscribing) {
            return '최근에 탈퇴한 이메일입니다.';
        }
        if (email !== authEmail) {
            return '등록되지 않은 이메일입니다.';
        }
        return '';
    };

    // 비번 유효성 검사
    const validatePassword = (password) => {
        if (!password.trim()) {
            return '비밀번호를 입력해주세요.';
        }
        if (password !== authPassword) {
            return '비밀번호가 올바르지 않습니다.';
        }
        return '';
    };

    // 로그인 클릭 이벤트 함수
    const handleLogin = () => {
        if (isLockedOut) return;

        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);

        setEmailError(emailValidation);
        setPasswordError(passwordValidation);

        if (!emailValidation && !passwordValidation) {
            setFailedAttempts(0);
            router.push('/main-member');
        } else {
            setFailedAttempts((prev) => {
                const newCount = prev + 1;
                if (newCount >= 5) {
                    const lockTime = new Date();
                    lockTime.setMinutes(lockTime.getMinutes() + 10);
                    setLockUntil(lockTime);
                }
                return newCount;
            });
        }
    };

    // 비번 표시 토글 함수
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Caps Lock 켜짐 체크 함수
    const handleCapsLock = (e) => {
        setCapsLockOn(e.getModifierState && e.getModifierState('CapsLock'));
    };

    return (
        <VStack spacing={6} align='stretch'>
            <FormControl isInvalid={emailError}>
                {/* isRequired 대체 요소 */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '-0.3rem',
                        left: '-0.5rem',
                        color: 'var(--clr-red)',
                    }}
                >
                    *
                </Box>
                <Input
                    placeholder='이메일(user@email.com)'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size='lg'
                    focusBorderColor='blue.500'
                    // autoComplete='off' // 자동완성 기능 제거
                    // 자동완성 시 배경이 바뀌는 것을 방지하는고 항상 흰색으로 고정함
                    sx={{
                        backgroundColor: 'white',
                        '&:-webkit-autofill': {
                            backgroundColor: 'white !important',
                            boxShadow: '0 0 0px 1000px white inset !important',
                            WebkitTextFillColor: 'black !important', // kebab-case를 camelCase로 수정
                        },
                        '&:-webkit-autofill:focus': {
                            backgroundColor: 'white !important',
                            boxShadow: '0 0 0px 1000px white inset !important',
                        },
                    }}
                />
                {emailError && (
                    <FormErrorMessage pl={4}>{emailError}</FormErrorMessage>
                )}
            </FormControl>

            <FormControl isInvalid={passwordError}>
                {/* isRequired 대체 요소 */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '-0.3rem',
                        left: '-0.5rem',
                        color: 'var(--clr-red)',
                    }}
                >
                    *
                </Box>
                <InputGroup size='lg'>
                    <Input
                        placeholder='비밀번호'
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleCapsLock}
                        onKeyUp={handleCapsLock}
                        focusBorderColor='blue.500'
                    />
                    <InputRightElement>
                        <IconButton
                            variant='ghost'
                            onClick={togglePasswordVisibility}
                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            aria-label={
                                showPassword ? 'Hide password' : 'Show password'
                            }
                        />
                    </InputRightElement>
                </InputGroup>
                {passwordError && (
                    <FormErrorMessage pl={4}>{passwordError}</FormErrorMessage>
                )}
                {capsLockOn && (
                    <Text color='var(--clr-red)' fontSize='sm' mt={1} pl={4}>
                        &lt;Caps Lock&gt;이 켜져 있습니다.
                    </Text>
                )}
            </FormControl>

            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
            >
                <Checkbox
                    isChecked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    colorScheme='blue'
                >
                    아이디 기억하기
                </Checkbox>
                <Link href='/temp-pw-issue' className='forget_pw'>
                    비밀번호를 잊으셨나요?
                </Link>
            </Box>

            <Button
                colorScheme='blue'
                size='lg'
                onClick={handleLogin}
                mt={6}
                w='full'
                className='btn_round btn_lg'
                _active={{
                    bg: 'var(--clr-primary)', // 누른 상태 배경색
                    color: 'whiteAlpha.900', // 누른 상태 텍스트 색상
                }}
                _hover={{
                    bg: 'var(--clr-primary)',
                    color: 'whiteAlpha.900',
                }}
            >
                {isLockedOut ? '로그인이 잠시 제한되었습니다.' : '로그인하기'}
            </Button>

            <Link href='/signup'>
                <Text sx={{ textAlign: 'center' }} className='non_maska'>
                    아직 마스카 계정이 없으신가요?
                </Text>
            </Link>

            {/* 구분선 */}
            <Box
                position='relative'
                textAlign='center'
                w='50%'
                mx='auto'
                py='20px'
            >
                <Divider borderStyle='dashed' borderColor='gray.300' />
                <Text
                    position='absolute'
                    top='50%'
                    left='50%'
                    transform='translate(-50%, -50%)'
                    bg='white'
                    px={4}
                    color='gray.500'
                    fontSize='sm'
                    bgColor='var(--clr-light-blue)'
                >
                    또는
                </Text>
            </Box>

            <Button
                variant='outline'
                size='lg'
                onClick={() => console.log('구글 로그인 시도')}
                w='full'
                leftIcon={
                    <Image
                        src='/img/icon_google.svg'
                        width={30}
                        height={30}
                        alt='Google Icon'
                        className='icon_google'
                    />
                }
                className='btn_round btn_outline btn_lg'
            >
                Google 계정으로 로그인
            </Button>
        </VStack>
    );
}
