import SectionContainer from './SectionContainer';
import LogoLink from './LogoLink';

const Footer = () => {
  return (
    <footer className="bg-zinc-100 py-4 absolute w-full">
      <SectionContainer styles="!text-left">
        <LogoLink />
        <span className="text-xs text-[#bbb]">
          An interactive learning project from{' '}
          <a
            className="text-primary"
            href="https://thinkster.io"
          >
            Thinkster
          </a>
          . Code &amp; design licensed under MIT.
        </span>
      </SectionContainer>
    </footer>
  );
};

export default Footer;
