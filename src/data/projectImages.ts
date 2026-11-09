import sigmaHedgePricer from '../assets/projects/sigma_hedge_pricer.png';
import sigmaHedgeLogo from '../assets/projects/sigma_hedge_logo.png';
import holdoutLogo from '../assets/projects/holdout_logo.svg';
import auraHftLogo from '../assets/projects/aura_hft_logo.svg';
import quantiloLogo from '../assets/projects/quantilo_logo.svg';
import squareyieldLogo from '../assets/projects/squareyield_logo.svg';
import smartCameraRig from '../assets/projects/smart_camera_rig.jpg';

// Card image per project: the app's own logo when it has one, otherwise a screenshot or photo.
// Screenshots of every app stay in the project's gallery.
export const projectImagesMap: Record<string, { src: string; logo?: boolean }> = {
  '01-sigma-hedge': { src: sigmaHedgeLogo, logo: true },
  '02-financial-data-analysis-app': { src: holdoutLogo, logo: true },
  '03-aura-hft': { src: auraHftLogo, logo: true },
  '04-data-explorer': { src: quantiloLogo, logo: true },
  '05-real-estate-analytics-fr': { src: squareyieldLogo, logo: true },
  '06-15-raspberry-pi-project': { src: smartCameraRig },
};

export const defaultProjectImage = { src: sigmaHedgePricer };
