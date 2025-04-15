import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MaskaProgress from './MaskaProgress';

const FileUploadComponent = () => {
    const [selectedFiles, setSelectedFiles] = useState([]); // 선택된 파일들
    const [isValidFiles, setIsValidFiles] = useState(false); // 파일들의 유효성 여부
    const [showError, setShowError] = useState(false); // 에러 Alert 보임 여부
    const [currentCount, setCurrentCount] = useState(0); // 현재 마스카 진행 건수, 초기값 0
    const [errorType, setErrorType] = useState(null); // 에러 타입 ('format' 또는 'count')
    const [maxCount] = useState(2); // 마스카 진행 최대 건수
    const fileInputRef = useRef(null); // 파일 선택 인풋 필드 참조

    // 유효한 파일 타입 설정
    const allowedFileTypes = [
        'image/jpeg',
        'image/png',
        'video/x-msvideo',
        'video/x-matroska',
        'video/mp4',
        'video/quicktime',
    ];

    // 파일 업로드 버튼 클릭 이벤트 핸들러
    const handleButtonClick = () => {
        fileInputRef.current.click(); // 파일 인풋 클릭 발생 강제 트리거
    };

    const remainingCount = maxCount - currentCount; // 남은 건수 저장

    // 마스카 과정 취소 시 호출할 함수
    const handleCancelledFiles = (cancelledCount) => {
        // 취소된 건수만큼 현재 건수에서 차감
        setCurrentCount((prev) => Math.max(0, prev - cancelledCount));
    };

    // 파일 업로드 인풋에 파일이 변경되면 호출될 핸들러 함수
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            // 최대 건수 초과 체크
            if (currentCount + files.length > maxCount) {
                setErrorType('count');
                setShowError(true);
                fileInputRef.current.value = null;
                return;
            }

            // 파일 타입 유효성 체크
            const allValid = files.every((file) =>
                allowedFileTypes.includes(file.type)
            );

            if (allValid) {
                setSelectedFiles(files);
                setIsValidFiles(true);
                setShowError(false);
                setErrorType(null);
                setCurrentCount((prev) => prev + files.length);
            } else {
                setSelectedFiles([]);
                setIsValidFiles(false);
                setErrorType('format');
                setShowError(true);
                fileInputRef.current.value = null;
            }
        }
    };

    // 유효하지 않은 파일로 인해 에러 발생 시 3초 후에 Alert 창을 닫음
    useEffect(() => {
        if (showError) {
            const timer = setTimeout(() => {
                setShowError(false);
                setErrorType(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showError]);

    return (
        <>
            {/* ---- 선택한 파일들이 유효하지 않거나 선택한 파일이 없다면... 최초 파일 업로드 콤포넌트를 표시함 ---- */}
            {!isValidFiles || selectedFiles.length === 0 ? (
                <div className='file_upload_container relative'>
                    <div className='badge_chance'>{`${remainingCount}/${maxCount}건 가능`}</div>
                    <div className='align_center'>
                        <Image
                            className='icon_pic inline_block'
                            src='/img/icon_image.svg'
                            alt='image icon'
                            width={24}
                            height={24}
                        />
                    </div>
                    <Link
                        href=''
                        className='btn_round btn_xl'
                        onClick={handleButtonClick}
                    >
                        영상⋅사진 올리기
                    </Link>
                    <input
                        type='file'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        style={{ display: 'none' }}
                    />
                    {/* ---- 유효하지 않은 파일을 선택해서 에러가 발생하면, Alert 창을 표시함 ---- */}
                    {showError && (
                        <Alert
                            status='error'
                            background='black'
                            width='fit-content'
                            position='fixed'
                            bottom='20px'
                            left='50%'
                            transform='translateX(-50%)'
                            borderRadius='md'
                            color='white'
                            zIndex={10}
                        >
                            <AlertIcon color='white' />
                            {errorType === 'count' ? (
                                <>
                                    <AlertTitle>최대 건수 초과</AlertTitle>
                                    <AlertDescription>
                                        최대 {maxCount}건만 업로드할 수
                                        있습니다.
                                    </AlertDescription>
                                </>
                            ) : (
                                <>
                                    <AlertTitle>파일 형식 오류</AlertTitle>
                                    <AlertDescription>
                                        지원하지 않는 형식이 포함되어 있습니다.
                                        다른 파일로 다시 시도하세요.
                                    </AlertDescription>
                                </>
                            )}
                        </Alert>
                    )}
                    <p className='sub_desc'>
                        또는
                        <br />
                        <span>해당영역으로 드래그</span>
                    </p>
                    <p className='type'>
                        업로드 가능 형식{' '}
                        <span>jpg, png, avi, mkv, mp4, mov</span>
                    </p>
                </div>
            ) : (
                //* ---- 선택한 파일들이 유효하다면지 마스카 진행 콤포넌트를 표시함 ----
                <MaskaProgress
                    files={selectedFiles} // 선택한 파일 전달
                    onCancelledFiles={handleCancelledFiles} // 취소 핸들 함수
                    currentCount={currentCount} // 현재 선택 건수
                    maxCount={maxCount} // 최대 건수
                />
            )}
        </>
    );
};

export default FileUploadComponent;
