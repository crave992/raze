import AccountMenu
    from "@molecules/accountMenu/AccountMenu";
import style
    from "./layout.module.scss";

export default function AccountLayout(props) {

    return (
        <div className={`mainWrapper`}>
            <div className="section__inner">
                <div className={style.accountLayout}>
                    <div className={style.accountSidebar}>
                        <AccountMenu/>
                    </div>
                    <div className={style.accountMain}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}
