import {
    Box,
    Progress,
    Text,
    Button,
    VStack,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Link,
    useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // Next.js App Router

const MaskaProgress = ({ files, onCancelledFiles, currentCount, maxCount }) => {
    const router = useRouter(); // 라우터 객체 생성
    // 각각의 선택 파일 상태를 객체로 생성함
    const [fileStatuses, setFileStatuses] = useState(
        files.map(() => ({
            status: '마스카 대기 중', // 최초 대기중으로 설정
            progress: 0, // 최초 프로그레스바 진행 시작점을 0% 으로 설정
        }))
    );
    const [activeFiles, setActiveFiles] = useState(files); // 마스카 과정 중인 파일들 저장
    const [cancelledCount, setCancelledCount] = useState(0); // 마스카 취소 건수
    const [isModalOpen, setIsModalOpen] = useState(false); // 취소 모달 오픈 여부
    const [selectedFileIndex, setSelectedFileIndex] = useState(null); // 선택된 파일 순서
    const timersRef = useRef([]); // 타이머 참조
    const intervalsRef = useRef([]); // 인터벌 참조

    // 새로 추가: 페이지 이탈 확인 모달 관련 상태
    const {
        isOpen: isNavigationModalOpen,
        onOpen: onNavigationModalOpen,
        onClose: onNavigationModalClose,
    } = useDisclosure();
    const hasUnsavedChanges = activeFiles.length > 0; // 활성 파일이 있으면 저장되지 않은 변경사항이 있다고 간주

    // 프로그레스 시작 핸들러 함수
    const startFileProgress = (index) => {
        // 파일들의 엑티브가 끝나거나 '마스카 완료'상태면...
        if (
            !activeFiles[index] ||
            fileStatuses[index]?.status === '마스카 완료'
        )
            return; // 모든 과정을 중지함

        // 파일들이 엑티브 상태(전달 받은 파일이 있다면)라면... 1초 후에
        timersRef.current[index] = setTimeout(() => {
            // 파일들의 상태를 '마스카 진행 중' 상태로 바꾸고...
            setFileStatuses((prev) => {
                const newStatuses = [...prev];
                if (newStatuses[index]) {
                    newStatuses[index] = {
                        ...newStatuses[index],
                        status: '마스카 진행 중',
                    };
                }
                return newStatuses;
            });

            let progress = fileStatuses[index]?.progress || 0; // 멈춰진 진행률 또는 0으로 진행율을 저장함

            // ********************** 프로그레스바 진행 시간 설정 ( 0.02초(20ms) : 1% = 2초(2000ms) : 100% )
            // 0.02초 마다 진행율을 증가 시켜서 intervalRef 참조 변수에 저장함
            intervalsRef.current[index] = setInterval(() => {
                // 0.02초 마다 프로그레스 진행률을 1씩 증가 시킨다. (진행속도는 2초지만, 랜더링 시간 때문에 다소 지연됨)
                progress += 1;
                setFileStatuses((prev) => {
                    const newStatuses = [...prev];
                    if (newStatuses[index]) {
                        newStatuses[index] = {
                            ...newStatuses[index],
                            progress,
                        };
                    }
                    return newStatuses;
                });
                // 만일 진행율이 100을 넘기면...
                if (progress >= 100) {
                    clearInterval(intervalsRef.current[index]); // 프로그레스 진행을 멈추고..
                    // 상태를 '마스카 완료' 로 변경함
                    setFileStatuses((prev) => {
                        const newStatuses = [...prev];
                        if (newStatuses[index]) {
                            newStatuses[index] = {
                                ...newStatuses[index],
                                status: '마스카 완료',
                            };
                        }
                        return newStatuses;
                    });
                }
            }, 20);
        }, 1000);
    };

    // 취소 건수와 취소 파일 변수가 변경될 때마다 부모컴포넌트의 onCancelledFiles 함수를 호출함
    useEffect(() => {
        // 취소 건수가 0보다 크면
        if (cancelledCount > 0) {
            onCancelledFiles(cancelledCount); // 취소 파일 수 업데이트
            setCancelledCount(0); // 취소 건수는 다시 0으로 초기화
        }
    }, [cancelledCount, onCancelledFiles]);

    // 콤포넌트 최초 접속 시
    useEffect(() => {
        timersRef.current.forEach((timer) => clearTimeout(timer)); // 기존 타이머 제거
        intervalsRef.current.forEach((interval) => clearInterval(interval)); // 기존 인터벌 제거
        timersRef.current = []; // 기존 타이머 초기화
        intervalsRef.current = []; // 기존 인터벌 초기화

        // 선택된 파일별로 순차적으로 프로그레스바 진행 시작함
        activeFiles.forEach((_, index) => {
            timersRef.current[index] = setTimeout(() => {
                startFileProgress(index);
            }, index * 1000); // 1초 간격으로 실행
        });

        // 위에서 실행된 타이머와 인터벌 이벤트 메모리에서 제거
        return () => {
            timersRef.current.forEach((timer) => clearTimeout(timer));
            intervalsRef.current.forEach((interval) => clearInterval(interval));
        };
    }, [activeFiles]);

    // 새로 추가: beforeunload 이벤트 핸들러 (브라우저 창 닫기, 새로고침, 뒤로가기 등)
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (!hasUnsavedChanges) return;

            // 표준 방식으로 브라우저에 확인 메시지 표시
            e.preventDefault();
            const message =
                '마스카 작업 파일이 사라집니다. 확인하지 않고 화면을 나가시겠습니까?';
            e.returnValue = message; // Chrome에서는 이 값이 사용됨
            return message; // 다른 브라우저에서는 이 값이 사용됨
        };

        // popstate 이벤트 핸들러 (뒤로가기)
        const handlePopState = (e) => {
            if (!hasUnsavedChanges) return;

            // 뒤로가기 이벤트를 중지하고 대신 모달 표시
            // history API를 사용하여 현재 상태를 다시 push하여 뒤로가기를 방지
            window.history.pushState(null, '', window.location.pathname);
            onNavigationModalOpen();
        };

        // 이벤트 리스너 등록
        // window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        // Next.js 15.2.4에서는 App Router를 사용하므로,
        // 페이지 로드 시 history 스택에 현재 상태를 추가해야 popstate 이벤트를 감지할 수 있음
        window.history.pushState(null, '', window.location.pathname);

        return () => {
            // window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [hasUnsavedChanges, onNavigationModalOpen]);

    // 새로 추가: 나가기 버튼 클릭 시 처리
    const handleNavigationContinue = useCallback(() => {
        onNavigationModalClose();
        // 현재 스크립트의 실행이 완료된 후 뒤로가기 동작 수행
        setTimeout(() => {
            // window.history.back();
            router.push('/');
        }, 0);
    }, [onNavigationModalClose, router]);

    // 새로 추가: 작업 확인하기 버튼 클릭 시 처리
    const handleNavigationCancel = useCallback(() => {
        onNavigationModalClose();
    }, [onNavigationModalClose]);

    // 파일 크기 KB, MB, GBFH 설정하는 함수
    const formatFileSize = (size) => {
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
        if (size < 1024 * 1024 * 1024)
            return `${(size / (1024 * 1024)).toFixed(1)} MB`;
        return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    };

    // 마스카 대기 및 진행 중일 경우 취소 버튼 클릭 시 타이머, 인터벌 초기화

    const handleCancelClick = (index) => {
        if (
            fileStatuses[index]?.status === '마스카 대기 중' ||
            fileStatuses[index]?.status === '마스카 진행 중'
        ) {
            clearTimeout(timersRef.current[index]);
            clearInterval(intervalsRef.current[index]);
            setSelectedFileIndex(index); // 현재 선택 파일 업데이트
            setIsModalOpen(true); // 취소 모달 창 열기
        } else if (fileStatuses[index]?.status === '마스카 완료') {
            // 파일 이름에서 확장자 확인
            const file = files[index];
            const videoExtensions = ['.avi', '.mkv', '.mp4', '.mov'];
            const isVideoFile = videoExtensions.some((ext) =>
                file?.name?.toLowerCase().endsWith(ext)
            );

            if (isVideoFile) {
                // 비디오 파일일 경우 특정 경로로 이동
                router.push('/preview-user-video');
            } else {
                // 비디오 파일이 아닌 경우 기존 경로로 이동
                router.push('/preview-user-img');
            }
        }
    };

    // 마스카 취소 모달창에서 '아니오' 버튼 클릭 시 호출 함수, 모달 창 닫고, 각각의 마스카 진행 상태를 업데이트 함
    const handleContinue = () => {
        setIsModalOpen(false); // 모달 창 닫고
        const index = selectedFileIndex;
        if (index !== null && fileStatuses[index]) {
            if (fileStatuses[index].status === '마스카 대기 중') {
                timersRef.current[index] = setTimeout(() => {
                    setFileStatuses((prev) => {
                        const newStatuses = [...prev];
                        if (newStatuses[index]) {
                            newStatuses[index] = {
                                ...newStatuses[index],
                                status: '마스카 진행 중',
                            };
                        }
                        return newStatuses;
                    });

                    let progress = fileStatuses[index]?.progress || 0;
                    intervalsRef.current[index] = setInterval(() => {
                        progress += 1;
                        setFileStatuses((prev) => {
                            const newStatuses = [...prev];
                            if (newStatuses[index]) {
                                newStatuses[index] = {
                                    ...newStatuses[index],
                                    progress,
                                };
                            }
                            return newStatuses;
                        });

                        if (progress >= 100) {
                            clearInterval(intervalsRef.current[index]);
                            setFileStatuses((prev) => {
                                const newStatuses = [...prev];
                                if (newStatuses[index]) {
                                    newStatuses[index] = {
                                        ...newStatuses[index],
                                        status: '마스카 완료',
                                    };
                                }
                                return newStatuses;
                            });
                        }
                    }, 50);
                }, 2000);
            } else if (fileStatuses[index].status === '마스카 진행 중') {
                let progress = fileStatuses[index]?.progress || 0;
                intervalsRef.current[index] = setInterval(() => {
                    progress += 1;
                    setFileStatuses((prev) => {
                        const newStatuses = [...prev];
                        if (newStatuses[index]) {
                            newStatuses[index] = {
                                ...newStatuses[index],
                                progress,
                            };
                        }
                        return newStatuses;
                    });

                    if (progress >= 100) {
                        clearInterval(intervalsRef.current[index]);
                        setFileStatuses((prev) => {
                            const newStatuses = [...prev];
                            if (newStatuses[index]) {
                                newStatuses[index] = {
                                    ...newStatuses[index],
                                    status: '마스카 완료',
                                };
                            }
                            return newStatuses;
                        });
                    }
                }, 50);
            }
        }
        setSelectedFileIndex(null);
    };

    // 마스카 취소 모달창에서 '취소' 버튼 클릭 시, 모달 창 닫고, 해당 진행 상태 표시를 제거함
    const handleConfirmCancel = () => {
        setIsModalOpen(false);
        const index = selectedFileIndex;

        if (index !== null) {
            clearTimeout(timersRef.current[index]);
            clearInterval(intervalsRef.current[index]);

            // 한 번만 취소 카운트를 증가시킴
            setCancelledCount(1);

            setActiveFiles((prev) => prev.filter((_, i) => i !== index));
            setFileStatuses((prev) => prev.filter((_, i) => i !== index));

            timersRef.current = timersRef.current.filter((_, i) => i !== index);
            intervalsRef.current = intervalsRef.current.filter(
                (_, i) => i !== index
            );
        }

        setSelectedFileIndex(null);
    };

    // 남은 건수 계산: 최대 건수(maxCount)에서 현재 활성 파일 수(currentCount)를 뺌
    const remainingCount = maxCount - currentCount + cancelledCount;

    return (
        <>
            <div
                className="file_upload_container relative"
                style={{
                    padding: '1.875rem',
                    justifyContent: 'flex-start',
                    backgroundColor: 'var(--clr-light-blue)',
                    height: 'auto',
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ marginBottom: '1.875rem' }}
                >
                    <div className="flex_horizontal">
                        <Text className=" maska_status_title">
                            마스카 진행상황
                        </Text>
                        {/* ----- 대기 순서 및 대기 시간 마우스 오버 팝업 ----- */}
                        <Popover placement="top" trigger="hover">
                            <PopoverTrigger>
                                <Text className="maska_wating_badge flex_horizontal">
                                    대기 순서 n 번째
                                    <Image
                                        className="icon_waiting"
                                        src="/img/icon_waiting.svg"
                                        alt="icon waiting"
                                        width={24}
                                        height={24}
                                    />
                                </Text>
                            </PopoverTrigger>
                            <PopoverContent
                                borderRadius="0.625rem"
                                width="31.25rem"
                            >
                                <PopoverBody
                                    sx={{
                                        padding: '3.125rem 1.875rem',
                                        '& p': {
                                            fontSize: 'var(--fs-20)',
                                        },
                                        '& p:nth-of-type(3)': {
                                            fontSize: 'var(--fs-24)',
                                            margin: '1rem 0',
                                        },
                                        '& p:nth-of-type(3) span': {
                                            fontWeight: 'var(--fw-700)',
                                        },
                                    }}
                                >
                                    <p>
                                        지금 서버 사용량이 많아 대기 중입니다.
                                    </p>
                                    <p>새로 고침 시, 대기가 취소됩니다. </p>
                                    <p>
                                        대기 순서: <span>n번째</span>
                                    </p>
                                    <HStack spacing={4}>
                                        <Progress
                                            value={80}
                                            size="sm"
                                            flex="1" // 가로로 늘어나게
                                            sx={{
                                                borderRadius: '1.875rem',
                                                '& > div:first-of-type': {
                                                    backgroundColor:
                                                        'var(--clr-sky-blue)', // 실제 진행바 부분 색상
                                                },
                                            }}
                                        />
                                        <Text
                                            sx={{
                                                fontSize: 'var(--fs-18)',
                                                fontWeight: 'var(--fw-600)',
                                                color: 'var(--clr-sky-blue)',
                                            }}
                                        >
                                            n초 남음
                                        </Text>
                                    </HStack>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Text className="badge_chance">
                        {`${remainingCount}/${maxCount}건 가능`}
                    </Text>
                </Box>
                {/* ------  마스카 진행 아이템 블럭  ----- */}
                {activeFiles.map((file, index) => (
                    <Box
                        key={index}
                        p={4}
                        borderWidth="1px"
                        bg="white"
                        style={{
                            borderColor:
                                fileStatuses[index]?.status === '마스카 대기 중'
                                    ? 'var(--clr-primary)'
                                    : fileStatuses[index]?.status ===
                                      '마스카 진행 중'
                                    ? 'var(--clr-sky-blue)'
                                    : fileStatuses[index]?.status ===
                                      '마스카 완료'
                                    ? 'var(--clr-primary)'
                                    : 'gray.500', // 기본 색상
                            borderRadius: '0.625rem',
                            marginBottom: '0.938rem',
                        }}
                    >
                        <HStack justify="space-between" spacing={10}>
                            <VStack
                                align="start"
                                spacing={1}
                                minWidth="12.5rem"
                            >
                                <Text
                                    fontSize="var(--fs-18)"
                                    style={{ textAlign: 'left' }}
                                >
                                    {file.name}
                                </Text>
                                <Text fontSize="18px">
                                    {formatFileSize(file.size)}
                                </Text>
                            </VStack>
                            <HStack
                                mt={2}
                                spacing={3}
                                style={{ position: 'relative', width: '100%' }}
                            >
                                <VStack
                                    style={{
                                        width: '100%',
                                    }}
                                    justify="space-between"
                                    align="flex-start"
                                    spacing={4}
                                >
                                    {/* 마스카 진행 상태 뱃지  */}
                                    <Text
                                        color={
                                            fileStatuses[index]?.status ===
                                            '마스카 대기 중'
                                                ? 'var(--clr-primary)'
                                                : fileStatuses[index]
                                                      ?.status ===
                                                  '마스카 진행 중'
                                                ? 'var(--clr-white)'
                                                : fileStatuses[index]
                                                      ?.status === '마스카 완료'
                                                ? 'var(--clr-white)'
                                                : 'gray.500' // 기본 색상
                                        }
                                        bgColor={
                                            fileStatuses[index]?.status ===
                                            '마스카 대기 중'
                                                ? 'var(--clr-yellow)'
                                                : fileStatuses[index]
                                                      ?.status ===
                                                  '마스카 진행 중'
                                                ? 'var(--clr-sky-blue)'
                                                : fileStatuses[index]
                                                      ?.status === '마스카 완료'
                                                ? 'var(--clr-primary)'
                                                : 'gray.500' // 기본 색상
                                        }
                                        className="maska_status_badge"
                                    >
                                        {fileStatuses[index]?.status ===
                                        '마스카 완료'
                                            ? fileStatuses[index]?.status
                                            : fileStatuses[index]?.status +
                                              '..'}
                                    </Text>
                                    {/* 프로그레스바와 진행률 */}
                                    <HStack
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <Progress
                                            value={
                                                fileStatuses[index]?.progress
                                            }
                                            size="sm"
                                            sx={{
                                                '& > div:first-of-type': {
                                                    backgroundColor:
                                                        fileStatuses[index]
                                                            ?.status ===
                                                        '마스카 완료'
                                                            ? 'var(--clr-primary)'
                                                            : 'var(--clr-sky-blue)',
                                                },
                                                borderRadius: '1.875rem',
                                            }}
                                            flex="1"
                                        />
                                        <Text
                                            className="percentage"
                                            color={
                                                fileStatuses[index]?.status ===
                                                '마스카 완료'
                                                    ? 'var(--clr-primary)'
                                                    : 'var(--clr-sky-blue)'
                                            }
                                        >
                                            {fileStatuses[index]?.progress}%
                                        </Text>
                                    </HStack>
                                </VStack>
                            </HStack>
                            <Button
                                variant="ghost"
                                onClick={() => handleCancelClick(index)}
                            >
                                {fileStatuses[index]?.status ===
                                '마스카 완료' ? (
                                    <Image
                                        className="icon_arrow_complete"
                                        src="/img/icon_arrow_complete.svg"
                                        alt="maska complete icon"
                                        width={24}
                                        height={24}
                                    />
                                ) : (
                                    <Image
                                        className="icon_cancel_x"
                                        src="/img/icon_cancel_x.svg"
                                        alt="cancel x icon"
                                        width={24}
                                        height={24}
                                    />
                                )}
                            </Button>
                        </HStack>
                    </Box>
                ))}
            </div>

            {/* ------ 마스카 진행 취소 모달 ------- */}
            <Modal isOpen={isModalOpen} onClose={handleContinue} isCentered>
                <ModalOverlay />
                <ModalContent
                    sx={{
                        padding: '30px 50px 20px 50px',
                    }}
                >
                    <ModalHeader
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Text
                            sx={{
                                fontSize: 'var(--fs-20)',
                                fontWeight: 'VAR(--fw-400)',
                                textAlign: 'center',
                                width: '100%',
                            }}
                        >
                            작업중인 마스카를 취소하시겠습니까?
                        </Text>
                    </ModalHeader>
                    <ModalFooter
                        className="flex_horizontal"
                        style={{ gap: '1rem', justifyContent: 'center' }}
                    >
                        <Link
                            onClick={handleContinue}
                            className="btn_round btn_outline btn_md"
                        >
                            아니요
                        </Link>
                        <Link
                            className="btn_round btn_md"
                            onClick={handleConfirmCancel}
                        >
                            취소하기
                        </Link>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* ------ 새로 추가: 페이지 이탈 확인 모달 ------- */}
            <Modal
                isOpen={isNavigationModalOpen}
                onClose={handleNavigationCancel}
                isCentered
            >
                <ModalOverlay />
                <ModalContent
                    sx={{
                        padding: '30px 30px 20px 30px',
                    }}
                >
                    <ModalHeader
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Text
                            sx={{
                                fontSize: 'var(--fs-20)',
                                fontWeight: 'VAR(--fw-400)',
                                textAlign: 'center',
                                width: '100%',
                            }}
                        >
                            마스카 작업 파일이 사라집니다. <br />
                            확인하지 않고 화면을 나가시겠습니까?
                        </Text>
                    </ModalHeader>
                    <ModalFooter
                        className="flex_horizontal"
                        style={{ gap: '1rem', justifyContent: 'center' }}
                    >
                        <Link
                            mr={3}
                            className="btn_round btn_outline btn_md"
                            onClick={handleNavigationContinue}
                        >
                            나가기
                        </Link>
                        <Link
                            onClick={handleNavigationCancel}
                            className="btn_round btn_md"
                        >
                            작업 확인하기
                        </Link>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default MaskaProgress;
