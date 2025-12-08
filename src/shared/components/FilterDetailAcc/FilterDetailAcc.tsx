import "./index.scss"

function FilterDetailAcc() {
    return (
        <div className="filter-accounts">
            <div className={'buttonFilter'}>
                <span>Thông tin cá nhân</span>
            </div>
            <div className={'buttonFilter'}>
                <span>Khóa học (E-Learning)</span>
                &nbsp;&nbsp;
                <span>2</span>
            </div>
            <div className={'buttonFilter'}>
                <span>Lớp học offline</span>
                &nbsp;&nbsp;
                <span>2</span>
            </div>
            <div className={'buttonFilter'}>
                <span>Kỳ thì</span>
                &nbsp;&nbsp;
                <span>2</span>
            </div>
        </div>
    );
}

export default FilterDetailAcc;
