const PriceTable = ({ priceProps, user }) => {
    const {
        billing,
        uploadType,
        uploadFileLimit,
        workFileLimit,
        workFileSizeLimit,
        isEdit,
    } = priceProps;

    return (
        <div>
            <h3 className='price_title'>
                {user === 'member' ? '회원' : '비회원'}
            </h3>
            <ul className='list_box'>
                <li>
                    <p className='item_name'>과금 여부</p>
                    {user === 'member' ? (
                        <p className='item_value_blue'>{billing}</p>
                    ) : (
                        <p className='item_value'>{billing}</p>
                    )}
                </li>
                <li>
                    <p className='item_name'>업로드 방식</p>
                    {user === 'member' ? (
                        <p className='item_value_blue'>{uploadType}</p>
                    ) : (
                        <p className='item_value'>{uploadType}</p>
                    )}
                </li>
                <li>
                    <p className='item_name'>
                        {/* {user === 'member'
                            ? '작업 파일 개수 제한'
                            : '업로드 파일 개수 제한'} */}
                        작업 파일 개수 제한
                    </p>
                    {user === 'member' ? (
                        <p className='item_value_blue'>{uploadFileLimit}</p>
                    ) : (
                        <p className='item_value'>{uploadFileLimit}</p>
                    )}
                </li>
                <li>
                    <p className='item_name'>
                        {/* {user === 'member'
                            ? '다운로드 파일 개수 제한'
                            : '작업 파일 개수 제한'} */}
                        다운로드 파일 개수 제한
                    </p>
                    {user === 'member' ? (
                        <p className='item_value_blue'>{workFileLimit}</p>
                    ) : (
                        <p className='item_value'>{workFileLimit}</p>
                    )}
                </li>
                <li>
                    <p className='item_name'>작업 파일 용량 제한</p>
                    {user === 'member' ? (
                        <p className='item_value_blue'>{workFileSizeLimit}</p>
                    ) : (
                        <p className='item_value'>{workFileSizeLimit}</p>
                    )}
                </li>
                <li>
                    <p className='item_name'>마스카 영역 편집</p>
                    {user === 'member' ? (
                        <p className='item_value_blue'>{isEdit}</p>
                    ) : (
                        <p className='item_value'>{isEdit}</p>
                    )}
                </li>
            </ul>
        </div>
    );
};
export default PriceTable;
