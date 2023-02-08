import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PlatformsIconsList from '../PlatformsIconsList';

describe('Platforms Icons List', () => {
  it('should display all available icons', () => {
    render(
      <PlatformsIconsList
        platforms={[
          {
            platform: { id: 1 }, // Xbox One
          },
          {
            platform: { id: 3 }, // iOS
          },
          {
            platform: { id: 4 }, // PC
          },
          {
            platform: { id: 6 }, // Linux
          },
          {
            platform: { id: 7 }, // Nintendo Switch
          },
          {
            platform: { id: 12 }, // Neo Geo
          },
          {
            platform: { id: 18 }, // PlayStation 4
          },
          {
            platform: { id: 21 }, // Android
          },
          {
            platform: { id: 171 }, // Web
          },
        ]}
      />
    );

    expect(screen.getByTestId('windows-icon')).toBeInTheDocument();
    expect(screen.getByTestId('apple-icon')).toBeInTheDocument();
    expect(screen.getByTestId('playstation-icon')).toBeInTheDocument();
    expect(screen.getByTestId('xbox-icon')).toBeInTheDocument();
    expect(screen.getByTestId('nintendo-icon')).toBeInTheDocument();
    expect(screen.getByTestId('android-icon')).toBeInTheDocument();
    expect(screen.getByTestId('linux-icon')).toBeInTheDocument();
    expect(screen.getByTestId('console-icon')).toBeInTheDocument();
    expect(screen.getByTestId('web-icon')).toBeInTheDocument();
  });
});
