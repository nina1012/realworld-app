import { APP_NAME } from '@/config/constants';
import SectionContainer from '../common/SectionContainer';

const Banner = () => {
  return (
    <div className="w-full text-white bg-primary">
      <SectionContainer styles="text-center">
        <div className="p-8">
          <h1
            style={{
              textShadow:
                '0px 1px 3px rgba(0, 0, 0, 0.3) ',
            }}
            className="text-[56px] font-titillium font-bold text-shadow-[0px_1px_3px_rgba(0,0,0,0.3)] mb-4"
          >
            {APP_NAME}
          </h1>
          <p className="text-2xl font-extralight">
            A place to share your knowledge.
          </p>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Banner;
