import { describe, it } from 'vitest';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '#/features/admin/pages/HomePage/HomePage';

describe('Homepage page', () => {
    it('renders correctly', async () => {
        const { getByText } = render(
            <BrowserRouter>{<HomePage />}</BrowserRouter>,
        )
        console.log(getByText, 'getByText');

    });
});
