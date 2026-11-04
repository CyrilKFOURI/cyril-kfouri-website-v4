import sigmaHedgePricer from '../assets/projects/sigma_hedge_pricer.png';
import fdaHome from '../assets/projects/fda_home.jpg';
import auraHftTerminal from '../assets/projects/aura_hft_terminal.jpg';
import dataExplorerOverview from '../assets/projects/data_explorer_overview.png';
import realEstateHome from '../assets/projects/real_estate_home.jpg';
import smartCameraRig from '../assets/projects/smart_camera_rig.jpg';

export const projectImagesMap: Record<string, string> = {
  '01-sigma-hedge': sigmaHedgePricer,
  '02-financial-data-analysis-app': fdaHome,
  '03-aura-hft': auraHftTerminal,
  '04-data-explorer': dataExplorerOverview,
  '05-real-estate-analytics-fr': realEstateHome,
  '06-15-raspberry-pi-project': smartCameraRig,
};

export const defaultProjectImage = sigmaHedgePricer;
