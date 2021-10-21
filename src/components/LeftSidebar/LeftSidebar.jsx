import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './LeftSidebar.module.css';
const LeftSidebar = () => {
    return (
        <div>
            <div className={style.leftSidebarContainer}>
                <div className={style.topFilters}>
                    <div className={style.containerFilters}>
                        <NavLink activeClassName={style.backClr} className={style.filter + ' ' + style.filterList + ' ' + style.inboxImg } to='/inbox'>
                            Inbox
                            <p className={style.count}>2</p>
                        </NavLink>
                    </div>
                    <div className={style.containerFilters}>
                        <NavLink activeClassName={style.backClr} className={style.filter + ' ' + style.filterList + ' ' + style.todayImg } to='/today'>
                            Today
                            <p className={style.count}>2</p>
                        </NavLink>
                    </div>
                    <div className={style.containerFilters}>
                        <NavLink activeClassName={style.backClr} className={style.filter + ' ' + style.filterList + ' ' + style.upcomingImg } to='/upcoming'>
                            Upcoming
                        </NavLink>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default LeftSidebar;

