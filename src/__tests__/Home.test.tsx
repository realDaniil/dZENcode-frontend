import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

test('renders home page with greeting', () => {
  render(<Home />);
  expect(screen.getByText('Привет 👋')).toBeInTheDocument();
});
