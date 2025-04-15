const FooterSimple = ({ align }) => {
    return (
        <footer
            className={
                align === 'right'
                    ? 'footer simple right'
                    : align === 'center'
                    ? 'footer simple center'
                    : 'footer simple' // default, 좌측 배치
            }
        >
            <div className='footer_warpper simple'>
                <div>
                    <p>&copy; 2025 Penta Security Inc. All rights reserved.</p>
                </div>
                <div>
                    <p>개인정보취급방침 &nbsp;|&nbsp; 표준 서비스 계약서</p>
                </div>
            </div>
        </footer>
    );
};
export default FooterSimple;
