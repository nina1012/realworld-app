import { Button } from '@/components/button';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`${inter.className}`}>
      Hello World
      <Button className="" type="button" variant="solid">
        Solid
      </Button>
      <Button
        className=""
        type="button"
        variant="outline"
      >
        Outline
      </Button>
    </main>
  );
}
