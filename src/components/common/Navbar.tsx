import SectionContainer from './SectionContainer';
import NavLink from './NavLink';
import LogoLink from './LogoLink';

const Navbar = () => {
  return (
    <nav className="py-4 flex w-full max-w-[1140px] mx-auto">
      <SectionContainer styles="mx-0 w-full">
        <div className="flex justify-between">
          <div className="text-2xl mr-auto">
            <LogoLink />
          </div>
          <ul className="flex items-center">
            <li>
              <NavLink href="/" isActive={true}>
                <span>Home</span>
              </NavLink>
              <NavLink
                href="/auth/login"
                isActive={false}
              >
                <span>Sign in</span>
              </NavLink>
              <NavLink
                href="/auth/register"
                isActive={false}
              >
                <span>Sign up</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </SectionContainer>
    </nav>
  );
};

export default Navbar;
