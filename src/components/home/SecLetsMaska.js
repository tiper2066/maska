'use client';
import useScrollFadeUp from '@/hooks/useScrollFadeUp';
import PriceTable from './PriceTable';
import SecContents from './SecContents';
import Image from 'next/image';

const optionProps = {
    title: "Let's Maska",
    headline: '회원이 되어 더 자유롭게<br /><span>마스카</span>하세요',
};

const userPriceProps = {
    billing: '무료',
    uploadType: '단일 파일 업로드',
    uploadFileLimit: '2개/일',
    workFileLimit: '2개/일',
    workFileSizeLimit: '1GB/개',
    isEdit: '불가능',
};
const memberPriceProps = {
    billing: '무료',
    uploadType: '다중 파일 업로드',
    uploadFileLimit: '무제한',
    workFileLimit: '20개/일',
    workFileSizeLimit: '3GB/개',
    isEdit: '가능',
};

const SecLetsMaska = () => {
    useScrollFadeUp('.fade-up'); // 요소 애니메이션하기

    return (
        <div className='sec_contents lets_maska relative'>
            <div>
                <SecContents optionProps={optionProps} />
            </div>
            <Image
                className='reveal_let_maska_bg1 fade-up'
                src='/img/bg_lets_maska_cloud.svg'
                alt='lets maska cloud'
                width={24}
                height={24}
            />
            <div className='price_table'>
                <PriceTable priceProps={userPriceProps} user='nonMember' />
                <PriceTable priceProps={memberPriceProps} user='member' />
            </div>
            <div className='bg_img reveal_let_maska_bg2 fade-up'>
                <Image
                    src='/img/bg_lets_maska.svg'
                    alt='lets maska'
                    width={24}
                    height={24}
                />
            </div>
        </div>
    );
};
export default SecLetsMaska;
