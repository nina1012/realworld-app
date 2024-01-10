import SectionContainer from './SectionContainer';
import NavLink from './NavLink';
import LogoLink from './LogoLink';
import { useUser } from '@/features/auth/api/get-auth-user';
import { Conditional } from './Conditional';
import Image from 'next/image';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { CiSettings } from 'react-icons/ci';

const Navbar = () => {
  const { data } = useUser();

  return (
    <nav className="py-4 flex w-full max-w-[1140px] mx-auto">
      <SectionContainer styles="mx-0 w-full">
        <div className="flex justify-between">
          <div className="text-2xl mr-auto">
            <LogoLink />
          </div>
          <ul className="flex items-center">
            <Conditional condition={!!data}>
              <NavLink href="/" isActive={true}>
                <span>Home</span>
              </NavLink>
              <NavLink
                href="/editor/new"
                icon={HiOutlinePencilSquare}
                isActive={true}
              >
                <span>New Article</span>
              </NavLink>
              <NavLink
                href="/settings"
                icon={CiSettings}
                isActive={true}
              >
                <span>Settings</span>
              </NavLink>
              <NavLink href="/auth/me" isActive={true}>
                <span>{data?.user?.username}</span>
              </NavLink>
            </Conditional>
            <Conditional condition={!data}>
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
            </Conditional>
          </ul>
        </div>
      </SectionContainer>
    </nav>
  );
};

export default Navbar;
