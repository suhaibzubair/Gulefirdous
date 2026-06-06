import "./Footer.css"
import logo from "../../../assets/images/urqaalogo.svg"
import { Link } from 'react-router-dom';
import { footerLinks, footerCommunity,footerResources,footerSupport} from '../../../constants/Constants'
export default function Footer() {

    return (
        <div className='b_g_footer'>
            <footer className="Footer">
                <div className='Footer_inner'>
                    <div className='footer_container'>
                    <div className='footer_logo'>
                            <div>
                                <a href="/" className="header__logo logo_name_container">

                                    <img
                                        className='logo_image'
                                        src={logo}
                                        alt="Clexu"
                                        width={160.51}
                                        height={62.88}
                                        margin-top ={70}
                                    />
                                </a>
                            </div>
                            <div className='footer_logo_details'>
                            329 Queensberry Street, North Melbourne VIC 3051, Australia.
                            <br/>
                            <br/>
                            123 456 7890 
                            <br/>
                            <br/>
                            support@skola.com
                            <br/>
                            </div>
                         
                        </div>
                        <div className='links_title_container'>
                            <div className='links_title'><b>Our Company</b></div>
                            {footerLinks.map(item => (
                                <Link key={item.key} to={item.path} className='links_child'>{item.name}</Link>
                            ))}
                        </div>
                        <div className='m_l_120px links_title_container'>
                            <div className='links_title'><b>Topics</b></div>
                            {footerCommunity.map(item => (
                                <Link key={item.key} to={item.path} className='links_child'>{item.name}</Link>
                            ))}
                        </div>
                        <div className='m_l_120px links_title_container'>
                            <div className='links_title'><b>Tracks</b></div>
                            {footerResources.map(item => (
                                <Link key={item.key} to={item.path} className='links_child'>{item.name}</Link>
                            ))}
                        </div>
                        <div className='m_l_120px links_title_container'>
                            <div className='links_title'><b>Support</b></div>
                            {footerSupport.map(item => (
                                <Link key={item.key} to={item.path} className='links_child'>{item.name}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

