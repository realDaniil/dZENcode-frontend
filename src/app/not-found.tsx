import AnimatedWrapper from '@/components/AnimatedWrapper';
import Link from 'next/link';

export default function NotFound() {
  return (
    <AnimatedWrapper>
      <h2>Упс, такой страницы нету :(</h2>
      <Link href="/">Вернуться домой</Link>
    </AnimatedWrapper>
  );
}
