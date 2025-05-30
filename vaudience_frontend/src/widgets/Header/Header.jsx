import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserIcon from "@/assets/user.svg";
import Logo from "@/assets/logo.svg";
import Bookmark from "@/assets/bookmark.svg";
import Bash from "@/assets/bash.svg";
import "./Header.scss";
import { ROUTES } from "@/shared/lib/const";
import { aboutUser, logoutUser } from "@/enteties/user/index.js";
import { filterByCategory, resetFilter } from "@/enteties/product/model/productSlice.js";
import { setActiveCategory } from "@/enteties/category/index.js";
import { getUserCart } from "@/enteties/cart/api/api.js";
import {clearFavorite, getFavorites} from "@/enteties/favorite/index.js";
import {clearCart} from "@/enteties/cart/index.js";
import Dropdown from "@/shared/ui/Dropdown/Dropdown.jsx";
import DropdownToggle from "@/shared/ui/Dropdown/DropdownToggle.jsx";
import DropdownMenu from "@/shared/ui/Dropdown/DropdownMenu.jsx";
import DropdownItem from "@/shared/ui/Dropdown/DropdownItem.jsx";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.cart || 0);
  const cartCount = cart.reduce((acc, cur) => cur.quantity + acc, 0);
  const bookmarkCount = useSelector((state) => state.favorite.favorite.length || 0);

  useEffect(() => {
    const accessToken =
      localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    if (accessToken) {
      dispatch(aboutUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getUserCart({ id: currentUser.id }));
      dispatch(getFavorites(currentUser.id));
    }
  }, [currentUser, dispatch]);

  const loginOut = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    dispatch(clearFavorite());
    navigate("./");
  };

  const changeCategory = (categoryId) => {
    dispatch(filterByCategory(categoryId));
    dispatch(setActiveCategory(categoryId));
  };

  const clearCategory = () => {
    dispatch(resetFilter());
    dispatch(setActiveCategory(null));
  };

  return (
    <header className="header">
      <div className="header__container container">
        {/* Левая часть: меню */}
        <div className="header__menu">
          <nav className="navigation-menu">
            <ul className="navigation-menu__list">
              <li className="navigation-menu-link btn-reset">
                <Link to="/" onClick={clearCategory}>
                  НОВИНКИ
                </Link>
              </li>

              <li className="navigation-menu-link btn-reset">
                <Link to="/#news" onClick={() => changeCategory(2)}>
                  ОДЕЖДА
                </Link>
              </li>

              <li className="navigation-menu-link btn-reset">
                <Link to="/#news" onClick={() => changeCategory(6)}>
                  АКСЕССУАРЫ
                </Link>
              </li>

              <li className="navigation-menu-link btn-reset">
                <Link to="/about">
                  О НАС
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Центральная часть: логотип */}
        <div className="header__logo">
          <Link to="/" title="Product">
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        {/* Правая часть: блок пользователя */}
        <div className="header__user">
          {/* Пользователь */}
          {currentUser && Object.keys(currentUser).length > 0 ? (
              <Dropdown>
                <DropdownToggle>
                  <img src={UserIcon} alt="user" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem as={Link} to={ROUTES.PROFILE}>
                    Профиль
                  </DropdownItem>
                  <DropdownItem as="button" onClick={loginOut}>
                    Выйти
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
          ) : (
            <Link to="/login" title="Auth">
              <button className="btn-reset header__user-btn">
                <img src={UserIcon} className="header__user-icon" alt="User" />
              </button>
            </Link>
          )}

          {/* Закладки */}
          <div className="header__bookmark" title="Закладки">
            <Link to="/bookmark">
              <img src={Bookmark} alt="bookmark btn" />
              <div className="header__bookmark-counter btn">{bookmarkCount}</div>
            </Link>
          </div>

          {/* Корзина */}
          <div className="header__bash" title="Корзина">
            <Link to="/cart" title="Корзина">
              <img src={Bash} alt="Bash Icon" />
              <div className="header__bash-counter btn">{cartCount}</div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
