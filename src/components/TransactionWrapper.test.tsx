import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TransactionWrapper from './TransactionWrapper';

describe('TransactionWrapper', () => {
  it('does not expose an unverified transaction action', () => {
    render(<TransactionWrapper />);

    expect(screen.getByText('Transaction temporarily disabled')).toBeInTheDocument();
    expect(screen.getByText(/previous mint contract has not been independently verified/i)).toBeInTheDocument();
  });
});
