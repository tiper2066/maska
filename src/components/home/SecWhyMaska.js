'use client';
import useScrollFadeUp from '@/hooks/useScrollFadeUp';
import SecContents from './SecContents';
import Image from 'next/image';

const optionProps = {
    title: 'Why Maska',
    headline: '해킹과 유출,<br >걱정할 필요 없어요',
    description: [
        '마스카는 암호 기술 기반 보안 전문 회사',
        '<strong>펜타시큐리티</strong>가 개발한 솔루션으로 해킹, 유출로부터 안전해요.',
    ],
};

const SecWhyMaska = () => {
    useScrollFadeUp('.fade-up');
    return (
        <div className='sec_contents why_maska relative'>
            <div>
                <SecContents optionProps={optionProps} />
            </div>
            <div className='diagram fade-up'>
                <div className='d_item step1'>
                    <Image
                        src='/img/icon_step1.svg'
                        alt='step image'
                        width={24}
                        height={24}
                    />
                    <p>
                        사진·영상
                        <br />
                        업로드
                    </p>
                </div>
                <Image
                    className='icon_arrow'
                    src='/img/icon_arrow.svg'
                    alt='icon arrow'
                    width={24}
                    height={24}
                />
                <div className='d_item step2'>
                    <Image
                        src='/img/icon_step2.svg'
                        alt='step image'
                        width={24}
                        height={24}
                    />
                    <p>
                        AI로
                        <br />
                        개인정보 인식
                    </p>
                </div>
                <Image
                    className='icon_arrow'
                    src='/img/icon_arrow.svg'
                    alt='icon arrow'
                    width={24}
                    height={24}
                />
                <div className='d_item step3 relative'>
                    <Image
                        src='/img/icon_step3.svg'
                        alt='step image'
                        width={24}
                        height={24}
                    />
                    <p>
                        인식된 개인정보
                        <br />
                        마스카
                    </p>
                    <span className='d_tag'>원본파일 저장X</span>
                </div>
                <Image
                    className='icon_arrow'
                    src='/img/icon_arrow.svg'
                    alt='icon arrow'
                    width={24}
                    height={24}
                />
                <div className='d_item step4'>
                    <Image
                        src='/img/icon_step4.svg'
                        alt='step image'
                        width={24}
                        height={24}
                    />
                    <p>
                        마스카된
                        <br />
                        파일 다운로드
                    </p>
                </div>
            </div>
        </div>
    );
};
export default SecWhyMaska;
