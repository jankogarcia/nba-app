import React from 'react';
import { Link } from "react-router-dom";
import style from './header.css';
import FontAwesome from 'react-fontawesome';
import SideNav from './SideNav/sidenav';

const Header = (props) => {

    const getNavBars = () => (
        <div className={style.bars}>
            <FontAwesome name='bars'
                onClick={props.onOpenNav}
                style={{
                    color: '#dfdfdf',
                    padding: '10px',
                    cursor: 'pointer'
                }}
            />
        </div>
    )
    
    const getLogo = () => (
        <Link to="/" className={style.logo}>
            <img alt="nba logo" src="/images/nba_logo.png"></img>
        </Link>
    )
    
    return(
        <header className={style.header}>
            <SideNav {...props}/>
            <div className={style.headerOpt}>
                {getNavBars()}
                {getLogo()}
            </div>
        </header>
    )
}

export default Header;