'use client';
import useScrollFadeUp from '@/hooks/useScrollFadeUp';
import SecContents from './SecContents';
import Image from 'next/image';

const optionProps = {
    title: 'How to Maska',
    headline: '<span>AI</span>가 자동으로 지켜주는<br >사진·영상 속 개인정보',
    description: [
        '간편한 업로드 과정과 AI 기술을 기반으로',
        '신속한 작업 속도가 번거로움을 해소했어요.',
    ],
};

const SecHowMaska = () => {
    useScrollFadeUp('.fade-up'); // 요소 애니메이션하기
    return (
        <div className='sec_contents how_maska relative '>
            <div>
                <SecContents optionProps={optionProps} />
            </div>
            <div className='bg_img reveal_how_maska_bg fade-up'>
                <Image
                    src='/img/bg_how_maska.svg'
                    alt='how to maska'
                    width={24}
                    height={24}
                />
            </div>
        </div>
    );
};
export default SecHowMaska;
